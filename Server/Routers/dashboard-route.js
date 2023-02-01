const express = require("express");
const authenticate = require("../middleware/authenticate");
const routes = express.Router();


routes.post("/login", authenticate, async(req, res)=>{
    console.log("console of dashboard request");
    res.send(req.rootUser);
    const data = await res.json();
    });
    

module.exports = routes;