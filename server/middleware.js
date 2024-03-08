const express=require("express");
const mysql=require('mysql');

function middleware(req,res,next){
    const conn=mysql.createConnection({
        host:"localhost",
        user:"root",
        database:"project",
        password:" ",
    })
    conn.connect((err)=>{
        if(err){
            console.log(err);
            res.end();
        }
        else{
            console.log("hello from middleware");
            next();
        }
    })
    
    
}
module.exports=middleware;