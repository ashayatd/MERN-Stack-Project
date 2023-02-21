const jwt = require("jsonwebtoken");
const user = require("../../models/userModel");

const authenticateUser = async(req, res)=>{
    try {
        const token = req.cookies.jwt;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const rootuser = await user.findOne({id:verifyToken._id, "token":token, role: "admin"});
        if(!rootuser){throw new Error(`User Not Found! Go to Register`)}
        res.sendStatus(201);
    } 
    catch (error) {
        res.status(402).json(JSON.stringify({msg:"Unauthorised user!" + error.message}));
        console.log(error);
    }
}

module.exports = authenticateUser;