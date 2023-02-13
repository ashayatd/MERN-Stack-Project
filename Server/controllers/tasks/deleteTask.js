const task = require("../../models/tasks");

const deleteTask = async (req, res) => {
  try {
    let { ide } = req.body;
    const result = await task.deleteOne( { "_id" : ide});
    return res.status(201);
  } 
  catch (error) {
    console.log("Error in Delete Task function:", error.message);
  }
};

module.exports = deleteTask;
