const pendinguserModel = require("../../models/pendinguserModel");

const fetchrequests = async (req, res)=>{
    try {
      const data  = await pendinguserModel.find();
      if(data){
        return res.status(201).json(data);
      }
      else{
        return res.status(200);
      }
    } catch (error) {
        console.group(error);
    }
}

module.exports = fetchrequests;