const task = require("../../models/Tasks");

const adminaddtask = async (req, res)=>{
    try {
        let { title, description, status, userCreated } = req.body;
        if (!(title)) {
            res.status(200);
            return res.send(JSON.stringify({ message: "Please Fill The Box!" }));
        }

        const createTask = await task.create({
            task: {
                title,
                description
            },
            status,
            userCreated
        })
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = adminaddtask;