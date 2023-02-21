const express = require("express");
const app = express();
const routes = express.Router();
var cookieParser = require('cookie-parser');


app.use(cookieParser());


require("dotenv").config();

const connection = require("./helper/connection");
const userRoutes = require("../Server/Routers/user-router");
const loginRoute = require("../Server/Routers/login-router");
const taskRoutes = require("./Routers/task-router");
const adminRouter = require("./Routers/admin-router");

app.use(express.json());

const PORT = process.env.PORT;

connection();

app.use('/user',userRoutes);
app.use('/loguser',loginRoute);
app.use('/api', taskRoutes);
app.use('/admin', adminRouter);

app.get('/logout', (req,res)=>{
    res.clearCookie("jwt");
    res.end();
});


app.listen(PORT,()=>{
    console.log(`app is running on port ${PORT}`)
})