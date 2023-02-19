const user = require("../../models/userModel");
const jwt = require("jsonwebtoken");

const displayusernames = async (req, res)=>{
    try {
        const Users = await user.find({role:"user"});
        console.log(Users);
        res.status(201).json({users: Users});
    } catch (error) {
        console.log(error)
    }
}

module.exports = displayusernames;