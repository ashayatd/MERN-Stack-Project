const mongoose = require("mongoose");

const loginSchema = mongoose.Schema({
    username: {type:String, default:null},
    password: {type:String, default:null},
    token: {type:String}
})

module.exports = mongoose.model("loginUser", loginSchema);