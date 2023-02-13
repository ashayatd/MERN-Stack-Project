const express = require("express");
const routes = express.Router();
const authenticate = require("../middleware/authenticate");

const addTask = require("../controllers/tasks/addTask");
const fetchTask = require("../controllers/tasks/fetchTask");
const deleteTask = require("../controllers/tasks/deleteTask");
const completeTask = require("../controllers/tasks/completeTask");

routes.post("/addTask",authenticate, addTask );
routes.get("/fetchTask",authenticate, fetchTask );
routes.post("/deleteTask", deleteTask );
// routes.post("/updateTask",authenticate );
routes.post("/completeTask", completeTask );
// routes.post("/redoTask",authenticate );

module.exports = routes;