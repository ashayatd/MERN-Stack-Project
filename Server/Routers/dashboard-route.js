const express = require("express");
const routes = express.Router();

routes.post("/login",authenticate, (req, res)=>{
    console.log("console of dashboard request");
    res.send(req.rootUser);
    });
    const data = await res.json();

module.exports = routes;