-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('Admin', 'supperadmin', 'user');

-- CreateEnum
CREATE TYPE "mon" AS ENUM ('ispaid', 'notpaid');

-- CreateTable
CREATE TABLE "Users" (
    "UserID" SERIAL NOT NULL,
    "Firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "u_email" TEXT NOT NULL,
    "u_password" TEXT NOT NULL,
    "u_phone" TEXT NOT NULL,
    "u_addres" TEXT NOT NULL,
    "joidat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Role" "Roles" NOT NULL DEFAULT 'user',

    CONSTRAINT "Users_pkey" PRIMARY KEY ("UserID")
);

-- CreateTable
CREATE TABLE "Oreds" (
    "Ored_id" SERIAL NOT NULL,
    "Item_price" INTEGER NOT NULL,
    "Item_name" TEXT NOT NULL,
    "Item_quantity" INTEGER NOT NULL,
    "total_price" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "phone_number" INTEGER NOT NULL DEFAULT 634806536,
    "produts" JSONB[],
    "Role" "mon" NOT NULL DEFAULT 'notpaid',
    "userId" INTEGER NOT NULL,
    "Cart_ID" INTEGER NOT NULL,

    CONSTRAINT "Oreds_pkey" PRIMARY KEY ("Ored_id")
);

-- CreateTable
CREATE TABLE "Category" (
    "cat_ID" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "UserID" INTEGER NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("cat_ID")
);

-- CreateTable
CREATE TABLE "SubCategory" (
    "SubID" SERIAL NOT NULL,
    "Sub_name" TEXT NOT NULL,
    "imase" TEXT NOT NULL,
    "CategoryID" INTEGER NOT NULL,
    "UserID" INTEGER NOT NULL,

    CONSTRAINT "SubCategory_pkey" PRIMARY KEY ("SubID")
);

-- CreateTable
CREATE TABLE "products" (
    "Pro_id" SERIAL NOT NULL,
    "Pro_name" TEXT NOT NULL,
    "Pro_price" INTEGER NOT NULL,
    "Pro_desc" TEXT NOT NULL,
    "Pro_images" TEXT NOT NULL,
    "Pro_disc" INTEGER NOT NULL,
    "Pro_qtity" INTEGER NOT NULL,
    "UserID" INTEGER NOT NULL,
    "SubID" INTEGER NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("Pro_id")
);

-- CreateTable
CREATE TABLE "Reviews" (
    "Rev_id" SERIAL NOT NULL,
    "rating" INTEGER NOT NULL,
    "body" TEXT,
    "UserID" INTEGER NOT NULL,
    "pro_id" INTEGER NOT NULL,
    "createat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reviews_pkey" PRIMARY KEY ("Rev_id")
);

-- CreateTable
CREATE TABLE "cart" (
    "Cart_ID" SERIAL NOT NULL,
    "Quantity" INTEGER NOT NULL DEFAULT 0,
    "UserId" INTEGER NOT NULL,
    "Pro_id" INTEGER NOT NULL,

    CONSTRAINT "cart_pkey" PRIMARY KEY ("Cart_ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_u_email_key" ON "Users"("u_email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_u_phone_key" ON "Users"("u_phone");

-- CreateIndex
CREATE UNIQUE INDEX "Oreds_Item_name_key" ON "Oreds"("Item_name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_type_key" ON "Category"("type");

-- CreateIndex
CREATE UNIQUE INDEX "SubCategory_Sub_name_key" ON "SubCategory"("Sub_name");

-- CreateIndex
CREATE UNIQUE INDEX "products_Pro_name_key" ON "products"("Pro_name");

-- CreateIndex
CREATE UNIQUE INDEX "Reviews_UserID_key" ON "Reviews"("UserID");

-- AddForeignKey
ALTER TABLE "Oreds" ADD CONSTRAINT "Oreds_Cart_ID_fkey" FOREIGN KEY ("Cart_ID") REFERENCES "cart"("Cart_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Oreds" ADD CONSTRAINT "Oreds_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "Users"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubCategory" ADD CONSTRAINT "SubCategory_CategoryID_fkey" FOREIGN KEY ("CategoryID") REFERENCES "Category"("cat_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubCategory" ADD CONSTRAINT "SubCategory_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "Users"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "Users"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_SubID_fkey" FOREIGN KEY ("SubID") REFERENCES "SubCategory"("SubID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "Users"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_pro_id_fkey" FOREIGN KEY ("pro_id") REFERENCES "products"("Pro_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_Pro_id_fkey" FOREIGN KEY ("Pro_id") REFERENCES "products"("Pro_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "Users"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;
