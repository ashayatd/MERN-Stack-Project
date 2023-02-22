const mongoose = require("mongoose");
const jwt = require(`jsonwebtoken`);

const pendinguserschema = mongoose.Schema({
    email: {type:String, default:null},
    username: {type:String, require:true, unique: true},
    password: {type:String, default:null},
    token: {type: String, require:true, },
    role: {type:String, default:"admin"} // Role of User
})

// Generate Auth Token
pendinguserschema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        console.log("admincreatetoken :", token)
        this.token = token;
        await this.save();
        return token;
    }

    catch(err){
        console.log(err);
    }
}

module.exports = mongoose.model("pendinguser", pendinguserschema);