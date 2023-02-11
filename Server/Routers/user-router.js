const express = require("express");
const routes = express.Router();

const register = require("../controllers/user/register-user");
const authenticateUser = require("../controllers/user/authenticateUser");

routes.post("/register", register);
routes.post("/authenticate", authenticateUser);

module.exports = routes;