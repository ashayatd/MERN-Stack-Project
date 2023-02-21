const user = require("../../models/userModel");

const makeadmin = async (req, res)=>{
    try {
        let { token } = req.body;
        console.log("this is", token);
        const id = { "token": token };
        const newData = {$set: {role: "admin"}};
        const update = await user.updateOne(id, newData, (error, res)=>{
            if(error) throw Error;
        });
        if(update){
            console.log("updated");
            return res.status(201).json(JSON.stringify({msg : "Now You're an Admin, Please Login Again"}));
        }

    } catch (error) {
        console.log(error);
    }
}

module.exports = makeadmin;