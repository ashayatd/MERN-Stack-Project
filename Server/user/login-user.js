const user = require("../models/registerModel");
const bcrypt = require("bcryptjs");
const { json } = require("stream/consumers");


const login = async (req, res)=>{
    try{
        const {Username, Password} = req.body.data;
        console.log(JSON.stringify(req.body));
        if(!Username || !Password){
            return res.status(409).json({message:"Please Fill the Data"})
        }
        const username = Username;
        const userLogin = await user.findOne({username});
        console.log(userLogin);
        if(!userLogin){
            return res.status(410).json({message: "User Not Found"})
        }

        if(userLogin.Password == "null" || userLogin.password === null){
            res.status(409).json({message:"Invalid Credentials"});
            return;
        }
        const isMatch = bcrypt.compare(Password, userLogin.password);
        const token   = await userLogin.generateAuthToken();
        console.log(token);
        
        if(!isMatch){
            res.status(409).json({message:"Invalid Credentials"});
        }
        else{
            res.status(200).cookie("jwtoken", token,{
                expires:new Date(Date.now() + 2589200000),
                httpOnly:true
            }).json({message:"User signin Successfully"});
        }
    }
    catch(err){
        console.log("error: ", err.message);
    }
} 

module.exports = login; 