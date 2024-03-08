const {getUser,setUser} =require("./auth");
const express=require("express");
function authenticateUser(req,res,next){
    const id=req.cookies?.uuid;
    if(!id){
        res.redirect("/login");
    }
    const user=getUser(id);
    if(!user){
        res.redirect("/login");
    }
    req.user=user;
    next();

}
module.exports={authenticateUser};