const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken')

const protect = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]

    console.log(req.headers.authorization)
    if (!token) {
        res.status(403).json({
            message: "you don't have token ",
            status: "Error"
        });
        return;
    }

    const Deco = jwt.verify(token, process.env.Jwt_SEC, (error, data) => {
        if (error) {

            res.status(403).json({
                message: "you are not token",
                status: "Error"
            });
            return
        }
        return data;
    })

    // req.Users = Deco.Users;

    // next()
    const checkuser = await prisma.Users.findFirst({
        where: {
            UserID: Deco.Users
        }
    })

    if (checkuser) {
        req.Users = checkuser
        next();
    } else {
        res.json({
            status: "Error",
            message: "You Are Not Allowed "
        })
    }
}




module.exports = {
    protect
}