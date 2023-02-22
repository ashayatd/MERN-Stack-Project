const taskModel = require("../../models/tasks");
const user = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.API_KEY);

const adminaddtask = async (req, res) => {
  console.log("reached Add Task");
  try {
    let { task, status, userCreated } = req.body;
    console.log(task, status, userCreated);
    let userID = await jwt.verify(userCreated, process.env.SECRET_KEY)._id;
    let MainUser = await user.findOne({token: userCreated});

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
      const msg = {
        to: `${MainUser.email}`, // Change to your recipient
        from: 'vigifo8663@mirtox.com', // Change to your verified sender
        subject: 'Tasks added..!',
        text: 'Some Task Has been added to your Dashboard, Please have a look on them.',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        }
        sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })
        console.log("data created from admin side");
        res.status(201).json({ msg: "Data create" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = adminaddtask;
