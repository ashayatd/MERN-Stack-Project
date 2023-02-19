const express = require("express");
const Route = express.Router();
const users = require("../controllers/admin/displayusernames");
const task = require("../controllers/admin/tasks");
const admincompletetask = require("../controllers/admin/admincompletetask");
const adminreversetask = require("../controllers/admin/adminreversetask");
const adminupdatetitle = require("../controllers/admin/adminupdatetitle");
const adminaddtask = require("../controllers/admin/adminaddtask");
const admindeleteTask = require("../controllers/admin/admindeleteTask");
const adminauth = require("../../Server/middleware/admin_authenticate");

Route.get('/users', users);
Route.get('/users-tasks', task);
Route.post('/task-completed', admincompletetask);
Route.post('/reverse-task', adminreversetask);
Route.post('/adminupdatetitle',adminupdatetitle);
Route.post('/adminaddtask',adminaddtask);
Route.post('/admindeleteTask', admindeleteTask);


module.exports = Route;