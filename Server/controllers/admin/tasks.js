const task = require("../../models/tasks");

const fetchTasks = async (req, res)=>{
    try {
        let userId = req.body;
        const userTasks = await task.find({_id:userId});
        return res.status(201).json(userTasks);
        
    } catch (error) {
        console.log("error in Admin Fetch tasks: ", error);
        return res.status(200);
    }
}
module.exports=fetchTasks;