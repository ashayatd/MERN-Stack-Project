const express = require("express");
const authenticate = require("../middleware/authenticate");
const routes = express.Router();
const app = express();
const user = require("../user/login-user"); 

// routes.post("/login", authenticate, async (req, res) => {
//   console.log("console of dashboard request");
//   res.send(req.rootUser);
// });

routes.get("/dashboard", authenticate, async (req, res) => {
  console.log(req.cookies);
  const data = user.find();
  res.json(JSON.stringify({ msg: "Data" }));
});

module.exports = routes;
