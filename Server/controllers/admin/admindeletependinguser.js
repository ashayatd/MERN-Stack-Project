const pendingusers = require("../../models/pendinguserModel");

const admindelete = async (req, res) =>{
    try {
        let { __v, _id, email, password, role, username} = req.body;
        const userawailable = await pendingusers.deleteOne({username:username});
        if(userawailable){
            res.status(201).json(JSON.stringify({msg:"User Not Approved, deleted"}));
        }
    } catch (error) {
        console.log(error)
    }
}
module.exports = admindelete;