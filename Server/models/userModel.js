const mongoose = require("mongoose");
const jwt = require(`jsonwebtoken`);

const userSchema = mongoose.Schema({
    email: {type:String, default:null},
    username: {type:String, require:true, unique: true},
    password: {type:String, default:null},
    tokens: [{
        token: String
    }],
})

// Generate Auth Token
userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        // console.log(token);
        return token;
    }
    
    catch(err){
        console.log(err);
    }
}

module.exports = mongoose.model("user", userSchema);