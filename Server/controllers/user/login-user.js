const user = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const pendinguser = require("../../models/pendinguserModel");

const login = async (req, res) => {
  try {
    const { Username, Password } = req.body.data;
    //  console.log(JSON.stringify(req.body));

    if (!Username || !Password) {
      return res.status(409).json({ message: "Please Fill the Data" });
    }

    const username = Username;
    const userPending = await pendinguser.findOne({ username });
    if (userPending) {
      return res
        .status(410)
        .json(
          ({
            message:
              "Registration done, Admin Authentication will take some time",
          })
        );
    }
    const userLogin = await user.findOne({ username });
    console.log("User Login:", userLogin);
    if (!userLogin) {
      return res.status(410).json({ message: "User Not Found" });
    }

    if (userLogin.Password == "null" || userLogin.password === null) {
      res.status(409).json({ message: "Invalid Credentials" });
      return;
    }
    const isMatch = bcrypt.compare(Password, userLogin.password);
    const token = await userLogin.generateAuthToken();
    // console.log(token);

    if (!isMatch) {
      console.log("Login failed");
      res.status(409).json({ message: "Invalid Credentials" });
    } else {
      res
        .status(200)
        .cookie("jwt", token, {
          expires: new Date(Date.now() + 2589200000),
          httpOnly: true,
        })
        .json({ message: "User signin Successfully", role: userLogin.role });
    }
  } catch (err) {
    console.log("error: ", err.message);
  }
};

module.exports = login;
