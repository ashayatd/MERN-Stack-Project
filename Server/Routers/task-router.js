const express = require("express");
const routes = express.Router();
const authenticate = require("../middleware/authenticate");

const addTask = require("../controllers/tasks/addTask");

routes.post("/addTask",authenticate, addTask );
// routes.post("/deleteTask",authenticate );
// routes.post("/updateTask",authenticate );

module.exports = routes;