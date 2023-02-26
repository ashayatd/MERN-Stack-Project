const task = require("../../models/tasks");

const completeTask = async (req, res) => {
  try {
    let { ide } = req.body;
    const id = { "_id": ide };
    const newStatus = {$set: {status: true}};
    const update = task.updateOne(id, newStatus, (error, res)=>{
        if(error) throw Error;
    });
    if(update){
        console.log("data Transfered", ide);
    }
    return res.status(201);
  } catch (error) {
    console.log("CompleteTask Error: ", error.message);
  }
};
module.exports = completeTask;
