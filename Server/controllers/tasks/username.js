const username = require("../../models/userModel");
const jwt = require("jsonwebtoken");

const usernameField = async (req, res)=>{
    try {
        console.log("usernameField got hit")
        let user = jwt.verify(req.cookies.jwt, process.env.SECRET_KEY)._id;
        const rootuser = await task.find({token:user});
        console.log(rootuser);
        res.status(201).json(rootuser);

    } catch (error) {
        console.log("error in username route" +error.message);
    }
}

module.exports = usernameField;
