const express=require("express");
const app=express();
const {v4:uuidv4}=require("uuid");
const {authenticateUser}=require("./middleware");
const bodyParser=require("body-parser");
const {conn,connection}=require("./connection");
const { setUser } = require("./user");
const coockieParser=require("cookie-parser");
app.use(coockieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.get("/",function(req,res){
    res.render("login");
})
app.post("/login",function(req,res){
    const email=req.body.email;
    const password=req.body.password;
    if(connection){
        conn.query("SELECT * FROM user_login WHERE password=? AND email=?", [password, email], function(err, result) {
            if(result.length>=1){
                // const sessionId=uuidv4();
                const tocken=setUser({
                    email:email,
                    password:password,
                    // id:sessionId
                });
                res.cookie("userid",tocken);
                res.redirect("/info");
            }
            else{
                res.redirect("/");
            }
        })
    }

});
app.get("/info",authenticateUser,function(req,res){
    res.render("info");
});

app.listen(3000,function(){
    console.log("running");
})