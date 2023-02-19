const express = require("express");
const routes = express.Router();

const addTask = require("../controllers/tasks/addTask");
const fetchTask = require("../controllers/tasks/fetchTask");
const deleteTask = require("../controllers/tasks/deleteTask");
const completeTask = require("../controllers/tasks/completeTask");
const redoTask = require("../controllers/tasks/redoTask");
const updateTask = require("../controllers/tasks/updateTask");
const username = require("../controllers/tasks/username");
const authenticate = require("../middleware/authenticate");


routes.post("/addTask",authenticate, addTask );
routes.get("/fetchTask",authenticate, fetchTask );
routes.post("/deleteTask",authenticate, deleteTask );
routes.post("/updateTask",authenticate, updateTask );
routes.post("/completeTask",authenticate, completeTask );
routes.post("/redoTask",authenticate, redoTask);
routes.get('/username',authenticate, username);


module.exports = routes;