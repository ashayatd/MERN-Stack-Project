const express = require("express");
const app = express();
const routes = express.Router();
var cookieParser = require('cookie-parser');
app.use(cookieParser());

require("dotenv").config();

const connection = require("./helper/connection");
const userRoutes = require("../Server/Routers/user-router");
const loginRoute = require("../Server/Routers/login-router");
const dashboard = require("../Server/Routers/dashboard-route");

app.use(express.json());

const PORT = process.env.PORT;

connection();

app.use('/user',userRoutes);
app.use('/loguser',loginRoute);
app.use('/dashboard', dashboard);
app.get('/logout', (req,res)=>{
    res.clearCookie("jwt");
    res.end();
});


app.listen(PORT,()=>{
    console.log(`app is running on port ${PORT}`)
})