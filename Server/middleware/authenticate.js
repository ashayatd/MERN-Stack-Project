const jwt = require("jsonwebtoken");
const user = require("../models/userModel");

const authenticate = async(req, res, next)=>{
    try {
        const token = req.cookies.jwt;
        // console.dir(`Token From Cookies: ${JSON.stringify(token)}`);
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const rootuser = await user.findOne(
            {id:verifyToken._id, "token":token}
            );
        
        if(!rootuser){throw new Error(`User Not Found! Go to Register`)}
        req.token = token;
        req.rootUser = rootuser;
        req.userID = rootuser._id;
        
        next();
        
    } 
    catch (error) {
        res.status(402).json(JSON.stringify({msg:"Unauthorised user!"}));
        console.log(error);
    }
}

module.exports = authenticate;