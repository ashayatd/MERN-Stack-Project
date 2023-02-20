const task = require("../../models/tasks");

async function addTask(req, res) {

    try {
        let userCreated = jwt.verify(req.cookies.jwt, process.env.SECRET_KEY)._id;
        let { title, description, status } = req.body; // input from user
        if (!(title)) {
            res.status(200);
            return res.send(JSON.stringify({ message: "Please Fill The Box!" }));
        }
        const taskCreate = await task.create({
            task: {
                title,
                description
            },
            status,
            userCreated
        });
        return res.status(201).json(taskCreate);

    } catch (err) {
        console.log("Error in taks route:", err.message);
        return res.status(200);
    }

}

module.exports = addTask;