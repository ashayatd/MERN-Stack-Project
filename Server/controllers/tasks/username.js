const user = require("../../models/userModel");
const jwt = require("jsonwebtoken");

const usernameField = async (req, res)=>{
    try {
        console.log("usernameField got hit")
        // let user = jwt.verify(req.cookies.jwt, process.env.SECRET_KEY)._id;
        const rootuser = await user.findOne({token:req.cookies.jwt});
        console.log(rootuser);
        res.status(201).json({UserName:rootuser.username});

    } catch (error) {
        console.log("error in username route" + error.stack);
    }
}

module.exports = usernameField;
