const task = require("../../models/tasks");

const callalltasks  = async (req, res)=>{
    try {
        const alltasks = await task.find();
        if(alltasks){
            return res.status(201).json(alltasks);  
        }
        else{
            return res.status(200);
        }
        
    } catch (error) {
        console.log(error);
    }
}
module.exports = callalltasks;