const express=require("express");
const http=require("http");
const app=express();
const path = require("path");
const {Server}=require("socket.io")
const {Peer}=require("peerjs");
app.use(express.static(path.resolve("./public")))
let  m=new Map([]);
const server=http.createServer(app);
const io = new Server(server);
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on("join_room",(room)=>{
        socket.join(room);
        console.log(socket.id+"joined room ",room);
    })
    socket.on("call",(room)=>{
        console.log(room);
        if(!m.get(room)){
            m.set(room,[socket.id]);
        }
        else{
            let arr=m.get(room);
            arr.push(socket.id);
            m.set(room,arr);
        }
        console.log(m.get(room));
    })
});
// var peer = new Peer();
// conn.on('open', function(){
//     // here you have conn.id
//     conn.send('hi!');
//   });
// app.post("/join_room",)
app.get("/",function(req,res){
    res.sendFile("/public/index.html");
})
server.listen(3000,()=>{
    console.log("server is running");
})