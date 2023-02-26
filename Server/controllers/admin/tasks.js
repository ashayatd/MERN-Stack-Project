const task = require("../../models/tasks");
const jwt = require("jsonwebtoken");

const fetchTasks = async (req, res)=>{

    try {
        let userId = req.params.userId;
        console.log(userId);
        let userID = jwt.verify(userId, process.env.SECRET_KEY)._id; // userId-->token
        const userTasks = await task.find({userCreated:userID});
        console.log("User Tasks",userTasks);
        return res.status(201).json(userTasks);
        
    } catch (error) {
        console.log("error in Admin Fetch tasks: ", error);
        return res.status(200);
    }
}
module.exports = fetchTasks;