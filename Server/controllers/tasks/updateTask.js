const task = require("../../models/tasks");

const updateTask = (req, res)=>{
    try {
        let { ide, newTitle } = req.body;
        console.log(ide,"  ", newTitle);
        const id = { "_id": ide };
        const newData = {$set: {title: newTitle}};
        const update = task.updateMany(id, newData, (error, res)=>{
            if(error) throw Error;
        });
        if(update){
            console.log("updated");
        }

        return res.status(201);
      } catch (error) {
        // console.log("CompleteTask Error: ", error.message);
      }
}
 module.exports = updateTask;