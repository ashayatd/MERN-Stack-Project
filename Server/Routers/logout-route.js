const express = require("express");
const routes = express.Router();

const logout = require("../controllers/user/logout-user");

routes.post("/logout", logout);

module.exports = routes;