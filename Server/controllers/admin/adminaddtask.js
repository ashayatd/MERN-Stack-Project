const taskModel = require("../../models/tasks");
const jwt = require("jsonwebtoken");

const adminaddtask = async (req, res) => {
  console.log("reached Add Task");
  try {
    let { task, status, userCreated } = req.body;
    console.log(task, status, userCreated);
    let userID = jwt.verify(userCreated, process.env.SECRET_KEY)._id;

    if (!task.title) {
      res.status(200);
      return res.send(JSON.stringify({ message: "Please Fill The Box!" }));
    }

    const createTask = await taskModel.create({
      task: {
        title: task.title,
        description: task.description,
      },
      status,
      userCreated: userID,
    });
    if (createTask) {
        console.log("data created from admin side");
        res.status(201).json({ msg: "Data create" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = adminaddtask;
