const mongoose = require("mongoose");
const jwt = require(`jsonwebtoken`);

const registerSchema = mongoose.Schema({
    email: {type:String, default:null},
    username: {type:String, require:true, unique: true, default:null},
    password: {type:String, default:null},
    tokens: [{
        token: String
    }]
})

// Generate Auth Token
registerSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    }
    catch(err){
        console.log(err);
    }
}

module.exports = mongoose.model("registerUser", registerSchema);