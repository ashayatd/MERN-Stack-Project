const express = require("express");
const Route = express.Router();
const users = require("../controllers/admin/displayusernames");
const task = require("../controllers/admin/tasks");
const admincompletetask = require("../controllers/admin/admincompletetask");

Route.get('/users',users);
Route.get('/users-tasks', task);
Route.post('/task-completed', admincompletetask);
Route.post('/reverse-task', adminreversetask);

module.exports = Route;