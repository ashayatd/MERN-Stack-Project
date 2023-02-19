

const registerauthenticate = async (req, res, next) =>{
try {
    let { email, password, username, role } = req.body.data;
    if(role === "admin"){
        res.status(201).json(JSON.stringify({msg: "You're in the analysis period, Please Login later"}));
    }
} catch (error) {
    console.log(error)
}
}
module.exports = registerauthenticate;