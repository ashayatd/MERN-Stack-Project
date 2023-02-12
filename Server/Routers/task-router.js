const express = require("express");
const routes = express.Router();
const authenticate = require("../middleware/authenticate");

const addTask = require("../controllers/tasks/addTask");
const fetchTask = require("../controllers/tasks/fetchTask");

routes.post("/addTask",authenticate, addTask );
routes.get("/fetchTask",authenticate, fetchTask );
// routes.post("/deleteTask",authenticate );
// routes.post("/updateTask",authenticate );
// routes.post("/completeTask",authenticate );
// routes.post("/redoTask",authenticate );

module.exports = routes;