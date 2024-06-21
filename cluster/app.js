const express=require("express");
const app=require(express);

app.get("/",(req,res)=>{
    res.send("hello");
})

app.get("/home",(req,res)=>{
    res.send("home");
})

app.get("/home/:id",(req,res)=>{
    console.log(req.params.id);
    res.send("home");
})


app.listen(3000,()=>{
    console.log("hi");
})