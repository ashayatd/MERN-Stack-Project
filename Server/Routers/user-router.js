const express = require("express");
const routes = express.Router();

const register = require("../controllers/user/register-user");

routes.post("/register", register);

module.exports = routes;