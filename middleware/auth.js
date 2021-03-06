
require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async(req,res,next)=>{
    try {
    if(!req.header("Authorization"))
    {
        throw new Error("Token Required");
    }
    const token = req.header("Authorization").replace("Bearer ","");
    console.log(token);
    const user_with_token = jwt.verify(token,process.env.JWT_KEY);
    console.log(user_with_token);
    const user = await User.findOne({_id:user_with_token._id});
    console.log(user);
    if(!user)
    {
        res.status(400).send("Something Went Wrong")
    }
    else{
        req.profile = user;
        next();
    }
    } catch (error) {
        res.send(error.message);
    }
}

module.exports = auth;
