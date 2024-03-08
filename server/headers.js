const express=require("express");
const bodyParser=require("body-parser");
const app=express();
const coockieParser=require("cookie-parser");
const {v4:uuidv4}=require("uuid");
const {connection,conn}=require("./files/connection");
const {authenticateUser}=require("./files/user_auth")
const {getUser,setUser}=require("./files/auth");
app.set('view engine',"ejs");
app.use(bodyParser.urlencoded({extended:true}));
const middleware =require("./middleware");
// app.use(middleware);
app.use(coockieParser());
app.get("/",function(req,res){
    // // console.log(req.headers.connection);
    // res.setHeader("name", "shuhbam");
    // res.setHeader("surname", "mali");
    // res.send("hello");
    res.render("signup");
});
app.get("/login",function(req,res){
   res.render("login");
})
app.post("/login", function(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    
    if (connection) {
        conn.query("SELECT * FROM user_login WHERE password=? AND email=?", [password, email], function(err, result) {
            if (err) {
                console.log(err);
                res.render("login");
            } else if (result.length == 1) {
                const user = {
                    "email": email,
                    "password": password,
                }
                const sessionId = uuidv4();
                setUser(sessionId, user);
                res.cookie("uuid", sessionId);
                res.redirect("/info");
            } else {
                res.redirect("/login");
            }
        });
    }
});

app.post("/signup",function(req,res)
{
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
                
                res.render("signup");
            }
            else{
                const sessionId=uuidv4();
                setUser(sessionId,user);
                res.cookie("uid",sessionId);
                res.redirect("/info");
            }
        })
    }
    
})
app.get("/info",authenticateUser,(req,res)=>{
    res.render("info");
})
app.listen(3000,function(){
    console.log("running")
})