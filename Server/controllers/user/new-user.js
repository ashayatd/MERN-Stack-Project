const user = require("../../models/registerModel");
const bcrypt = require("bcryptjs");

async function register(req, res) {
  console.log("Reached Inside Register Route");
  try {
    let { email, password, username } = req.body.data; // input from user
    if (!(email && username && password)) {
      res.status(200);
      return res.send(JSON.stringify({ message: "all input required" }));
    }

    const oldUser = await user.findOne({ username });
    if (oldUser) {
      return (
        res.status(409),
        res.send(
          JSON.stringify({
            message: "Already Register username please login",
          })
        )
      );
    }

    const salt = bcrypt.genSaltSync(10);

    const hashedPassword = bcrypt.hashSync(password, salt);
    console.log(hashedPassword);

    const Createuser = await user.create({
      email,
      username,
      password: hashedPassword,
    });

    console.log("Created the Data");

    return res.status(201).json(Createuser);
  } catch (err) {
    console.log("Error in Register route:", err.message);
    return res.status(200);
  }
}

module.exports = register;
