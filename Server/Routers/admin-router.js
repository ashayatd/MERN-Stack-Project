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
const makeadmin = require("../controllers/admin/makeadmin");
const authenticate = require("../controllers/admin/authenticate");

Route.get('/users', adminauth , users);
Route.get('/users-tasks/:userId', adminauth , task);
Route.post('/task-completed', adminauth , admincompletetask);
Route.post('/reverse-task', adminauth ,adminreversetask);
Route.post('/adminupdatetitle', adminauth , adminupdatetitle);
Route.post('/adminaddtask', adminauth , adminaddtask);
Route.post('/admindeleteTask', adminauth ,  admindeleteTask);
Route.post('/makeadmin', adminauth , makeadmin);
Route.post('/authenticate', authenticate);

module.exports = Route;