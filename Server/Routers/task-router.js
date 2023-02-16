const express = require("express");
const routes = express.Router();
const authenticate = require("../middleware/authenticate");

const addTask = require("../controllers/tasks/addTask");
const fetchTask = require("../controllers/tasks/fetchTask");
const deleteTask = require("../controllers/tasks/deleteTask");
const completeTask = require("../controllers/tasks/completeTask");
const redoTask = require("../controllers/tasks/redoTask");
const updateTask = require("../controllers/tasks/updateTask");
const username = require("../controllers/tasks/username");

routes.post("/addTask",authenticate, addTask );
routes.get("/fetchTask",authenticate, fetchTask );
routes.post("/deleteTask", deleteTask );
routes.post("/updateTask", updateTask );
routes.post("/completeTask", completeTask );
routes.post("/redoTask", redoTask);
routes.get('/username', username);


module.exports = routes;