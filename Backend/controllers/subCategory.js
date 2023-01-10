const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();



//========================================================>>subcategory
const createsubcategory = async (req, res) => {
    try {
        const { sub_name, img, CAtID } = req.body;


        CheckSubname = await prisma.SubCategory.findFirst({
            where: {
                Sub_name: sub_name
            },
        });




        if (CheckSubname) {
            res.json({
                status: "Error",
                message: "SubCategory Is Exist In DataBase"
            })
        }




        if (!sub_name || !img || !CAtID) {
            res.json({
                status: "Something is worng",
                message: "please Checking Data"
            });
            return;

        }


        if (req.Users.Role !== "Admin") {
            res.json({
                status: "Error",
                message: "You are not allowed"
            })
            return;
        }



        const NewSubcategory = await prisma.SubCategory.create({
            data: {
                Sub_name: sub_name,
                imase: img,
                CategoryID: CAtID,
                UserID: req.Users.UserID
            },

            include: {
                category: true,
                users: true

            }

        });
        res.json({
            status: "Success",
            message: "Sucessfully save",
            NewSubcategory
        })

    } catch (error) {
        console.log(error)
        res.json({
            error
        })
    }


};






//=========================================================>>Updatesubcategory

const Updatesubcategory = async (req, res) => {

    const { sub_name, img, } = req.body;

    try {


        if (req.Users.Role !== "Admin") {
            res.json({
                status: "Error",
                message: "You are not allowed"
            })
            return;
        }



        if (!sub_name || !img) {
            res.json({
                status: "error",
                message: "Please provider information"
            })
            return;
        }
        const { SubID } = req.params;
        const subCat = await prisma.SubCategory.update({
            where: {
                SubID: Number(SubID),
            },
            data: {
                Sub_name: sub_name,
                imase: img,
                UserID: req.Users.UserID
            },
        });

        res.json({
            status: "Success",
            message: "Update succesfully",
            subCat
        });
    } catch (error) {
        console.log(error)
    }
};





//=========================================================>> GetoneSubcategory
const Getonesubcategory = async (req, res) => {
    try {
        const { SubID } = req.params;
        const subcate = await prisma.SubCategory.findFirst({
            where: {
                SubID: +SubID,
            },
        });
        if (!subcate) {
            res.json({
                status: "Erorr",
                message: "subcategory is not fount in Database Now"
            });
        } else {
            res.json({
                status: "Success",
                subcate
            })
        }
    } catch (error) {
        res.json({
            Error
        });
    };
}
//=========================================================>>Deletesubcategory
const Deletesubcatgory = async (req, res,) => {


    if (req.Users.Role !== "Admin") {
        res.json({
            status: "Error",
            message: "You are not allowed"
        })
        return;
    }

    const { SubID } = req.params;

    const SubCATE = await prisma.SubCategory.delete({
        where: {
            SubID: parseInt(SubID)
        },
    });
    res.json({
        status: "Success",
        message: "subcategory Delete SuccessFull!",
        SubCATE
    })
}


//=========================================================>>Getallsubcategoty
const Getallsubcategory = async (req, res) => {
    try {
        const getting = await prisma.SubCategory.findMany();
        res.json({
            getting
        });
    } catch (error) {
        res.json({
            status: "Error",
            message: "Data is not Found"
        });
    }
};












module.exports = {
    createsubcategory,
    Updatesubcategory,
    Getonesubcategory,
    Deletesubcatgory,
    Getallsubcategory
}