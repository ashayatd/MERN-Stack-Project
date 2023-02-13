const mongoose = require("mongoose");

const tasksSchema = mongoose.Schema({
    task: {
            title: { type: String, require: true },
            description: { type: String, require: false },
        },
    status: { type: Boolean
        },
    userCreated: {
        type: String,
        required: true,
        }
})

module.exports = mongoose.model("tasks", tasksSchema);