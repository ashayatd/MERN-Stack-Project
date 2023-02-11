const express = require("express");
const routes = express.Router();

const login = require("../controllers/user/login-user");

routes.post("/login", login);

module.exports = routes;