const express=require("express");
const app=express();
const session=require("express-session");
app.use(express.static(__dirname))
app.use(session({
    secret:"qjdehjbd",
    resave:false,
    saveUninitialized:false
}))
app.get("/",(req,res)=>{
    if(!req.session)console.log("nno");
    console.log(req.session);
    res.sendFile("indexed.html");
})
app.get("/api",(req,res)=>{
    if(req.session.appid!=undefined){
        console.log(req.session);
    res.send("hi");
    }
    else{
        console.log(req.session);
        res.send("not ok");
    }
})

app.post("/api",(req,res)=>{
    console.log(req.session);   
    req.session.appid=1;
    console.log(req.session);
    
    res.send("hi");
})

app.listen(3000,()=>{
    console.log("listning..");
})