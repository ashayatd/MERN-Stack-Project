const express = require("express");
const app = express();
const routes = express.Router();

require("dotenv").config();

const connection = require("./helper/connection");
const userRoutes = require("../Server/Routers/user-router");
const loginRoute = require("../Server/Routers/login-router");
const dashboard = require("../Server/Routers/dashboard-route");
routes.use(express.json());
const PORT = process.env.PORT;

connection();

routes.use('/user',userRoutes);
routes.use('/loguser',loginRoute);

routes.get('/dashboard', dashboard);


app.listen(PORT,()=>{
    console.log(`app is running on port ${PORT}`)
})