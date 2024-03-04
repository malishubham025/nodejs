const express=require("express");
const app=express();
app.get("/",function(req,res){
    res.setHeader("name", "shuhbam");
    res.setHeader("surname", "mali");
    res.send("hello");

})
app.listen(3000,function(){
    console.log("running")
})