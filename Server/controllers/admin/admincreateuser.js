const user = require("../../models/userModel");


const admincreateuser = async (req, res)=>{
try {
    let { __v, _id, email, password, role, username} = req.body;
    console.log("element", __v, _id, email, password, role, username);

    const Createuser = await user.create({
        email,
        username,
        password,
        role
      });

    if(Createuser){
        res.status(201).JSON.stringify({msg:"You are now admin"});
    }
} catch (error) {
    console.log("admincreate:", error);
}
}
module.exports = admincreateuser;

