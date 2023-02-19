const user = require("../../models/userModel");

const makeadmin = async (req, res)=>{
    try {
        const {ide} = req.body;
        const id = { "_id": ide };
        const newData = {$set: {user:{role: "admin"}}};
        const update = user.updateOne(id, newData, (error, res)=>{
            if(error) throw Error;
        });
        if(update){
            console.log("updated");
        }
        return res.status(201);

    } catch (error) {
        console.log(error);
    }
}

module.exports = makeadmin;