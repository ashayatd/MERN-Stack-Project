const express = require("express");
const Route = express.Router();
const users = require("../controllers/admin/displayusernames");

Route.get('/users',users);
// Route.get('/useres-tasks',tasks)

module.exports = Route;