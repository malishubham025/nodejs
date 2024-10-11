const express=require("express");
const app=express();
const redis = require("./redis.js");
// console.log(redis);


async function fun() {
    redis.set("mykey", "value"); 
    // await redis.set("foo", "bar", "EX", 20);
// console.log(redis);
    const value=await redis.get("foo");
    console.log(await redis.ttl("foo")); 
    console.log(value);
}
fun();
app.listen(3000,()=>{
    console.log("running");
})