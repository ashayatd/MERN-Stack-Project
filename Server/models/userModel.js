const mongoose = require("mongoose");
const jwt = require(`jsonwebtoken`);

const userSchema = mongoose.Schema({
    email: {type:String, default:null},
    username: {type:String, require:true, unique: true},
    password: {type:String, default:null},
    token: String,
    role: {type:String, default:"user"} // Role of User
})

// Generate Auth Token
userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.token = token;
        await this.save();
        return token;
    }
    
    catch(err){
        console.log(err);
    }
}

module.exports = mongoose.model("user", userSchema);