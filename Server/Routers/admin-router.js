const express = require("express");
const Route = express.Router();
const users = require("../controllers/admin/displayusernames");
const task = reequire("../controllers/admin/tasks");

Route.get('/users',users);
Route.get('/useres-tasks',task)

module.exports = Route;