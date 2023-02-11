const task = require("../../models/tasks");
const jwt = require("jsonwebtoken");

async function fetchTask(req, res) {
    try {
        let user = jwt.verify(req.cookies.jwt, process.env.SECRET_KEY)._id;
        const tasks = await task.find({userCreated:user});
        return res.status(201).json(tasks);
    } catch (err) {
        console.log("Error in fetch tasks route:", err.message);
        return res.status(200);
    }
}

module.exports = fetchTask;