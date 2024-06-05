const express=require("express");
const http=require("http");
const app=express();
const path = require("path");
const Server=require("socket.io")

app.use(express.static(path.resolve("./public")))

const server=http.createServer(app);
app.get("/",function(req,res){
    res.sendFile("/public/index.html");
})
server.listen(9000,()=>{
    console.log("server is running");
})