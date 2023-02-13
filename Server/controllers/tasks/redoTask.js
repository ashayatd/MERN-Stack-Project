const task = require("../../models/tasks");

const redoTask = async (req, res)=>{
    try {
        let { ide } = req.body;
        const id = { "_id": ide };
        const newStatus = {$set: {status: false}};
        const update = task.updateOne(id, newStatus, (error, res)=>{
            if(error) throw Error;
        });
        if(update){
            console.log("Data Reverted");
        }

        return res.status(201);
      } catch (error) {
        console.log("CompleteTask Error: ", error.message);
      }

}
module.exports = redoTask;