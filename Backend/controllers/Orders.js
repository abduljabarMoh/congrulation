const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();



//====================================================================>>CreateOrders
const CreateOders = async (req, res, next) => {
    try {
        const { Item_price, Total_price, Address, itemname, qtity, Cart_ID, UserID } = req.body;

        if (!Item_price || !Total_price || !Address || !itemname || !qtity || !Cart_ID || !UserID) {
            res.json({
                status: "Error",
                message: "Fadlan iska Dhamaystir Xogta"
            });
            return;
        };



        // const Delivery_Price = 0.15 * Item_price

        // console.log(Delivery_Price)


        const NewOders = await prisma.Oreds.create({
            data: {
                Item_price: Item_price,
                total_price: Total_price,
                address: Address,
                Item_name: itemname,
                Item_quantity: qtity,
                Cart_ID: Cart_ID,
                userId: UserID
            },
            include: {
                users: true,
                cart: true
            }

        });

        res.json({
            status: "Success",
            message: "Saved Recod",
            NewOders
        })



    } catch (error) {
        console.log(error)
    }
}








//====================================================================>>UpdateOders
const UpdateOrders = async (req, res, next) => {
    try {
        const { Address, itemname, qtity } = req.body;
        const { Ored_id } = req.params
        if (!Address || !itemname || !qtity) {
            res.json({
                status: "Erorr",
                message: "please checking Data "
            })
            return;
        }
        const Findorders = await prisma.Oreds.findFirst({
            where: {
                Ored_id: + Ored_id,
            }
        });
        if (!Findorders) {
            res.json({
                status: "Erorr",
                message: "Oders Is not Found In Database"
            })
            return
        }
        const updateOrders = await prisma.Oreds.update({
            where: {
                Ored_id: parseInt(Ored_id)
            },
            data: {

                address: Address,
                Item_name: itemname,
                Item_quantity: qtity
            },
        });
        res.status(200).json({
            status: "Sucess",
            message: "Update Sucessfully",
            updateOrders
        })
    } catch (error) {
        console.log(error)
    }
};







//=====================================================================>>GetAllorders


const Getallorders = async (req, res) => {
    try {
        const getorders = await prisma.Oreds.findMany();
        res.json({
            getorders
        });

    } catch (error) {
        res.json({
            status: "Error",
            message: "Data is not Found"
        });
    }
};







//========================================================================>>GetoneOrders

const Getoneorders = async (req, res) => {
    try {
        const { Ored_id } = req.params;
        const OneOrder = await prisma.Oreds.findFirst({
            where: {
                Ored_id: +Ored_id,
            }, include: {
                users: {
                    select: {
                        UserID: true,
                        Firstname: true,
                        lastname: true,
                        u_email: true,
                        u_addres: true,
                    },
                },
            }
        });
        if (!OneOrder) {
            res.json({
                status: "Erorr",
                message: "Orders is not found in Database"
            });
        } else {
            res.json({
                status: "Success",
                OneOrder
            })
        }
    } catch (error) {
        console.log(error)
    };
}









//=========================================================================>>DeteleOrders

const deleteOders = async (req, res,) => {
    try {
        const { Ored_id } = req.params;

        const ordersdle = await prisma.Oreds.delete({
            where: {
                Ored_id: parseInt(Ored_id)
            },
        });
        res.json({
            status: "Success",
            message: "Delete orders",
            ordersdle
        })
    } catch (error) {
        console.log(error)
    }
}








module.exports = {
    CreateOders,
    UpdateOrders,
    Getallorders,
    Getoneorders,
    deleteOders
}