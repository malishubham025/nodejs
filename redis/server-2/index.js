const express=require("express");
const app=express();
const redis = require("./redis.js");
const axios=require("axios");
const { json } = require("body-parser");
const publisher=require("./publisher.js");
const subscriber=require("./subscriber.js");
// console.log(redis);


// async function fun() {
//     // redis.set("mykey", "value"); 
//     // await redis.set("foo", "bar", "EX", 20);
// // console.log(redis);
//     // const value=await redis.get("foo");
//     // console.log(await redis.ttl("foo")); 
//     // console.log(value);
// }
// fun();
// async function getData(){
//     let data=await axios.get("https://jsonplaceholder.typicode.com/todos");
//     return data;
// }
subscriber.subscribe("message");
app.get("/todos", async (req, res) => {
    try {
        // Await the result of redis.get, since it's an async operation
        const cachedTodos = await redis.get("todos");

        if (cachedTodos) {
            // If cached data exists, parse it and send it in response
            let d = JSON.parse(cachedTodos);
            return res.json(d);
        } else {
            // If no cached data, fetch from API and store it in Redis
            let data = await axios.get("https://jsonplaceholder.typicode.com/todos");
            await redis.set("todos", JSON.stringify(data.data), "EX", 100); // set with expiration of 100 seconds
            return res.json(data.data);
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});
app.get("/publish",async (req,res)=>{
    console.log(req.query); 
   
    await publisher.publish("message","hello");
    res.send("sent");
})
subscriber.on("message",(channel,message)=>{
    console.log(message);
})
app.listen(3001,()=>{
    console.log("running");
})