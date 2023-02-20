const user = require("../../models/userModel");

const makeadmin = async (req, res)=>{
    try {
        let {ide} = req.body;
        console.log("this is",ide);
        const id = { "_id": ide };
        const newData = {$set: {role: "admin"}};
        const update = user.updateOne(id, newData, (error, res)=>{
            if(error) throw Error;
        });
        if(update){
            console.log("updated");
            return res.Status(201);
        }

    } catch (error) {
        console.log(error);
    }
}

module.exports = makeadmin;