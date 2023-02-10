const mongoose = require("mongoose");

const tasksSchema = mongoose.Schema({
    tasks: [
        {
            assinged: String,
        },
        {
            completed: String
        }
    ],
    userCreated:{
        type : String,
        required: true,
    },
    userAssigned: {
        type : String,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model("tasks", tasksSchema);