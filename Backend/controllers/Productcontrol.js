const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();


//=================================================>>CreateProductsj
const CreateProduct = async (req, res) => {
    try {
        const { name, price, des, dis, img, qtity, SubID } = req.body;
        if (!name || !price || !des || !dis || !img || !qtity || !SubID) {
            res.json({
                status: "Error",
                message: "Plze Provider Data"
            })
            return;
        }


        if (req.Users.Role !== "Admin") {
            res.json({
                status: "Error",
                message: "You are not allowed"
            })
            return;
        }




        const Newproduct = await prisma.products.create({
            data: {
                Pro_name: name,
                Pro_price: price,
                Pro_desc: des,
                Pro_disc: dis,
                Pro_images: img,
                Pro_qtity: qtity,
                SubID: SubID,
                UserID: req.Users.UserID
            },
            include: {
                SubCate: true,
                user: true,
            }
        });
        res.json({
            status: "Success",
            message: "Saved Product",
            Newproduct
        })
    } catch (error) {
        console.log(error)
    }
}










//======================================================================>> UpdateProduct

const UpdateProducts = async (req, res, next) => {
    const { name, price, des, dis, img, qtity, } = req.body;
    try {



        if (req.Users.Role !== "Admin") {
            res.json({
                status: "Error",
                message: "You are not allowed"
            })
            return;
        }



        const { Pro_id } = req.params
        if (!name || !price || !des || !dis || !img || !qtity) {
            res.json({
                status: "Erorr",
                message: "please checking Data "
            })
            return;
        }
        const FindProduct = await prisma.products.findFirst({
            where: {
                Pro_id: + Pro_id,
            }
        });
        if (!FindProduct) {
            res.json({
                status: "Erorr",
                message: "Product  Is not Found In Database"
            });
            return
        }


        const Produc = await prisma.products.update({
            where: {
                Pro_id: parseInt(Pro_id)
            },
            data: {
                Pro_name: name,
                Pro_price: price,
                Pro_desc: des,
                Pro_images: img,
                Pro_disc: dis,
                Pro_qtity: qtity,
                UserID: req.Users.UserID
            },
        });
        res.status(200).json({
            status: "Sucess",
            message: "Update Sucessfully",
            Produc
        })
    } catch (error) {
        console.log(error)
    }
};





//==========================================================================>> GetoneProduct

const GetoneProdut = async (req, res) => {
    try {
        const { Pro_id } = req.params;
        const PRODUCT = await prisma.products.findFirst({
            where: {
                Pro_id: +Pro_id,
            },
            include: {
                reviwe:{
                    select:{
                        Rev_id:true,
                        rating: true,
                        body: true,
                        
                    },
                    
                },
                user: {
                    select:{
                        Firstname: true,
                        lastname: true,
                        u_email: true,
                        u_addres: true
                    }
                }
            },
            
        });
        if (!PRODUCT) {
            res.json({
                status: "Erorr",
                message: "Product is not Found in Database"
            });
        } else {
            res.json({
                status: "Success",
                PRODUCT
            })
        }
    } catch (error) {
        res.json({
            Error
        });
    };
}


//==============================================================================>>






const Getproduct = async (req, res) => {
    try {
        const Getallproducts = await prisma.products.findMany();
        res.json({
            Getallproducts
        });
    } catch (error) {
        console.log(error)
        res.json({
            status: "Error",
            message: "Data is not Found"
        });
    }
};










//====================================================>>Deleteproduct

const Deletepro = async (req, res,) => {



    //========================================================CheckRoles
    if (req.Users.Role !== "Admin") {
        res.json({
            status: "Error",
            message: "You are not allowed"
        })
        return;
    }




    const { Pro_id } = req.params;

    const Pro = await prisma.products.delete({
        where: {
            Pro_id: parseInt(Pro_id)
        },
    });
    res.json({
        status: "Success",
        message: "product  Delete SuccessFull!",
        Pro
    })
}

module.exports = {
    CreateProduct,
    UpdateProducts,
    GetoneProdut,
    Getproduct,
    Deletepro
}