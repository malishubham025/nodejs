const express=require("express");
const app=express();
const cluster=require("cluster");
const os=require("os");
const cpu=os.cpus().length;



if(cluster.isPrimary){
    // console.log("hi");
    for(let i=0;i<cpu;i++){
        cluster.fork();
    }

}
else{
    app.get("/",(req,res)=>{
        res.send(`hello ${process.pid}`);
    })
    
    app.get("/home",(req,res)=>{
        res.send("home");
    })
    
    app.get("/home/:id",(req,res)=>{
        console.log(req.params);
        res.send("home");
    })
    
    
    app.listen(3000,()=>{
        console.log(`cpu running on ${process.pid}`);
    })
}
