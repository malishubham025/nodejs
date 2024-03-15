const {getUser}=require("./user");

function authenticateUser(req,res,next){
    const id=req.cookies?.userid
    
    if(!id){
        res.redirect("/");
    }
    const user=getUser(id);
    if(!user){
        res.redirect("/");
    }
    req.user=user;
    next();

};
module.exports ={authenticateUser};