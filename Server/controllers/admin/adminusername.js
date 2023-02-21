const user = require("../../models/userModel");
const jwt = require("jsonwebtoken");


const usernameField = async (req, res)=>{
    try {
        const rootuser = await user.findOne({token:req.cookies.jwt});
        return res.status(201).json({UserName:rootuser.username});

    } catch (error) {
        console.log("error in username route" + error.stack);
    }
}

module.exports = usernameField;
