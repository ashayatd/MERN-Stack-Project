
const logout = async (req, res)=>{
    try{
        console.log("reached Logout Try");
        const token = req.cookies.jwt;
        console.log("Ati Fast TOken",token);
    }
    catch(error){
        res.status(402).json(JSON.stringify({msg:"Can't Logout!"}));
        console.log(error.message);
    }
}

module.exports = logout;

