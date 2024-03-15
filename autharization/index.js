const express=require("express");
const app=express();
const {getUser,setUser}=require("./files/Usermap");
const cookieParser=require("cookie-parser");
const {v4:uuidv4}=require("uuid");
const bodyParser=require("body-parser");
const {conn,connection}=require("./files/connection")
app.set('view engine',"ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.render("index");
})
app.get("/login",function(req,res){
    res.render("login");
})
app.post("/login",(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    const username=req.body.username;
    const user={
        "email":email,
        "password":password,
        "username":username
    }
    if(connection){
        conn.query("select * from user_login where  password=? and email=?",[password,email],function(err,result){
            if(err){
                console.log(err);
                res.redirect("/login");
            }
            else if(result.length>0){
                const sessionId=uuidv4();
                setUser(sessionId,user);
                res.cookie("uid",sessionId);
                res.redirect("/");
            }
            else{
                res.redirect("/login");
            }
        })
    }
});
app.get("/signup",(req,res)=>{
    res.render("signup");
})
app.post("/signup",(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    const username=req.body.username;
    const user={
        "email":email,
        "password":password,
        "username":username
    }
    if(connection){
        conn.query("insert into user_login (username,password,email) values (?,?,?)",[username,password,email],function(err){
            if(err){
                console.log(err);
                
                res.redirect("/signup");
            }
            else{
                const sessionId=uuidv4();
                setUser(sessionId,user);
                res.cookie("uid",sessionId);
                res.redirect("/");
            }
        })
    }
    
})
app.listen(3000,function(){
    console.log("running...");
})