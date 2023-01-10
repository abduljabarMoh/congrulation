const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();


//===========================================================================>> CreateRivews

const CreateRive = async (req, res) => {
    try {

        const { productID, Rating, reaction } = req.body;


        if (!productID || !Rating || !reaction) {
            res.json({
                status: "Error",
                message: "Plze provider data"
            })
        }

        const NewRevi = await prisma.Reviews.create({

            data: {
                pro_id: productID,
                body: reaction,
                rating: Rating,
                UserID: req.Users.UserID
            },
            include: {
                product: true,
                user: true
            },
        })

        res.json({
            NewRevi
        })
    } catch (error) {

        console.log(error),
            res.json({
                status: "Error",
                message: "waxa ayaa qaldan"
            })

    }


}






//===========================================================================>> updateReviws

const UpdateReviws = async (req, res, next) => {
    try {
        const { reaction, Rating } = req.body;
        const { Rev_id } = req.params
        if (!reaction || !Rating) {
            res.json({
                status: "Erorr",
                message: "please Provider data "
            })
            return;
        }
        const findreviws = await prisma.Reviews.findFirst({
            where: {
                Rev_id: + Rev_id,
            }
        });
        if (!findreviws) {
            res.json({
                status: "Erorr",
                message: "User Is not Found In Database"
            })
            return
        }


        const UpdateReviws = await prisma.Reviews.update({
            where: {
                Rev_id: parseInt(Rev_id)
            },
            data: {
                body: reaction,
                rating: Rating
            },
            include: {
                product: true,
                user: true
            }
        });
        res.status(200).json({
            status: "Sucess",
            message: "Update Sucessfully",
            UpdateReviws
        })
    } catch (error) {
        res.json({
            status: "Erorr",
        });
    }
};




//=================================================================================>>getone Reviwes


const getoneReviws = async (req, res) => {
    try {
        const { Rev_id } = req.params;
        const Reaviwe = await prisma.Reviews.findFirst({
            where: {
                Rev_id: +Rev_id,
            },
        });
        if (!Reaviwe) {
            res.json({
                status: "Erorr",
                message: "Cart is not fount in Database Now"
            });
        } else {
            res.json({
                status: "Success",
                Reaviwe
            })
        }
    } catch (error) {
        res.json({
            Error
        });
    };
}




//============================================================================>>Delete reviws
const DeleteReviws = async (req, res,) => {
    const { Rev_id } = req.params;

    const Revis = await prisma.Reviews.delete({
        where: {
            Rev_id: parseInt(Rev_id)
        },
    });
    res.json({
        status: "Success",
        message: "Reviws Delete SuccessFull!",
        Revis
    })
}


//==========================================================================>>GetallReviws

const Getallreviws = async (req, res) => {
    try {
        const Allreviws = await prisma.Reviews.findMany();
        res.json({
            Allreviws
        });
    } catch (error) {
        console.log(error)
    }
};


const DeleteAllRe = async (req, res) => {
    try {
        await prisma.Reviews.deleteMany();
        res.json({
            message: 'All posts were delete',
        });
    } catch (error) {
        console.log(error)
    }
};



module.exports = {
    CreateRive,
    UpdateReviws,
    getoneReviws,
    DeleteReviws,
    Getallreviws,
    DeleteAllRe
}