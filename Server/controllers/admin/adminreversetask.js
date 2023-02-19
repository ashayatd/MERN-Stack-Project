const task = require("../../models/tasks");

const adminreversetask = async (req, res)=>{
    try {
        let { ide } = req.body;
        const id = { "_id": ide };
        const newStatus = {$set: {status: false}};
        const update = task.updateOne(id, newStatus, (error, res)=>{
            if(error) throw Error;
        });
        if(update){
            console.log("data Transfered");
        }
        return res.status(201);

    } catch (error) {
       console.log(error); 
    }
}
module.exports =adminreversetask;