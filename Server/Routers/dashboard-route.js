const express = require("express");
const authenticate = require("../middleware/authenticate");
const routes = express.Router();
const app = express();
const user = require("../models/registerModel");

// routes.post("/login", authenticate, async (req, res) => {
//   console.log("console of dashboard request");
//   res.send(req.rootUser);
// });

routes.get("/dashboard", authenticate, async (req, res) => {
  //const data = user.find();
  res.end();
  // console.log(data);
  // res.send(data);

});

module.exports = routes;
