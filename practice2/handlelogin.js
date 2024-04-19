const conn=require("./connection");
const {getUser,setUser}=require("./map");
function handlelogin(req,res,next){
    const id=req.cookies.userid;
    if(!id){
        res.redirect("/login");
    }
    else{
        const user=getUser(id);
        if(!user){
            res.redirect("/login");  
        }
        else{
        next();
        }
    }
    // next();
};
module.exports={handlelogin};