const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();


//=========================================================================>>Create Carts
const createcart = async (req, res) => {
    const { productID, userid, qty } = req.body;

    try {
        const newcart = await prisma.cart.create({
            data: {
                Pro_id: productID,
                Quantity: qty,
                UserId: userid
            },
            include: {
                pro: true,
                user: true,
            }
        })

        res.json({
            newcart
        })
    } catch (error) {
        res.json({
            error
        })
    }
}

//=========================================================================>>UpdateCarts


const UpdateCarts = async (req, res, next) => {
    try {
        const { qty } = req.body;
        const { Cart_ID } = req.params
        if (!qty) {
            res.json({
                status: "Erorr",
                message: "please checking Data "
            })
            return;
        }
        const findcarts = await prisma.cart.findFirst({
            where: {
                Cart_ID: + Cart_ID,
            }
        });
        if (!findcarts) {
            res.json({
                status: "Erorr",
                message: "User Is not Found In Database"
            })
            return
        }
        const updatecarts = await prisma.cart.update({
            where: {
                Cart_ID: parseInt(Cart_ID)
            },
            data: {
                Quantity: qty
            },
            include: {
                pro: true,
                user: true
            }
        });
        res.status(200).json({
            status: "Sucess",
            message: "Update Sucessfully",
            updatecarts
        })
    } catch (error) {
        res.json({
            status: "Erorr",
        });
    }
};

//===========================================================================>>GetOneCarts


const Getonecarts = async (req, res) => {
    try {
        const { Cart_ID } = req.params;
        const CartS = await prisma.cart.findFirst({
            where: {
                Cart_ID: +Cart_ID,
            },
        });
        if (!CartS) {
            res.json({
                status: "Erorr",
                message: "Cart is not fount in Database Now"
            });
        } else {
            res.json({
                status: "Success",
                CartS
            })
        }
    } catch (error) {
        res.json({
            Error
        });
    };
}

//============================================================================>>Delete Carts
const DeleteCarts = async (req, res,) => {
    const { Cart_ID } = req.params;

    const CARTS = await prisma.cart.delete({
        where: {
            Cart_ID: parseInt(Cart_ID)
        },
    });
    res.json({
        status: "Success",
        message: "Carts Delete SuccessFull!",
        CARTS
    })
}
//=============================================================================>>Get Allcarts

const GetallCarts = async (req, res) => {
    try {
        const Carting = await prisma.cart.findMany();
        res.json({
            Carting
        });
    } catch (error) {
        console.log(error)
    }
};



module.exports = {
    createcart,
    UpdateCarts,
    Getonecarts,
    DeleteCarts,
    GetallCarts
}