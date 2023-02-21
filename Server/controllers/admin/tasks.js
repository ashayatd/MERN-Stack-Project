const task = require("../../models/tasks");
const jwt = require("jsonwebtoken");

const fetchTasks = async (req, res)=>{
    try {
        let userId = req.params.userId;
        let userID = jwt.verify(userId, process.env.SECRET_KEY)._id; // userId-->token
        if(userId==="Select user"){
            return res.status(200).json({msg: "Please Select the User"});
        }
        const userTasks = await task.find({userCreated:userID});
        return res.status(201).json(userTasks);
        
    } catch (error) {
        console.log("error in Admin Fetch tasks: ", error);
        return res.status(200);
    }
}
module.exports = fetchTasks;