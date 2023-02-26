const user = require("../../models/userModel");
const pendingmodel = require("../../models/pendinguserModel"); 
const pendinguser = require("../../models/pendinguserModel");
const bcrypt = require("bcryptjs");

async function register(req, res) {
  console.log("Reached Inside Register Route");
  try {
    let { email, password, username, role } = req.body.data; // input from user
    // console.log(email, password, username, role );
    if (!(email && username && password)) {
      res.status(200);
      return res.send(JSON.stringify({ message: "all input required" }));
    }

    const oldUser = await user.findOne({ username }); 
    const pendingUser = await pendingmodel.findOne({username}); 
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
    if(pendingUser){
      return (
        res.status(410),
        res.send(
          JSON.stringify({
            message: "Already Registered, please wait till authentication",
          })
        )
      );
    }

    const salt = bcrypt.genSaltSync(10);

    const hashedPassword = bcrypt.hashSync(password, salt); // created hashed Password

    if(role==="admin"){
      const createPendingUser = await pendinguser.create({
        email,
        username,
        password: hashedPassword,
        role: role
      });
      if(createPendingUser){
        console.log("Created the Data");
        res.status(201).json({msg:"Your Request Generate"});
      }

    }

    else{
      const Createuser = await user.create({
        email,
        username,
        password: hashedPassword,
        role: role
      });
      if(Createuser){
        console.log("Created the Data");
        return res.status(202).json({msg:"Your Request Generate"});
      }
      else{
        return res.status(200);
      }
    }

  } catch (err) {
    console.log("Error in Register route:", err.message);
    return res.status(200);
  }
}

module.exports = register;