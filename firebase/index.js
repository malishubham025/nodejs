// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

const { required } = require("nodemon/lib/config");

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyD7teaeoM5f2s3fl35DqFN01Ri78RMTDcQ",
//   authDomain: "databasetest-d94ee.firebaseapp.com",
//   projectId: "databasetest-d94ee",
//   storageBucket: "databasetest-d94ee.appspot.com",
//   messagingSenderId: "852517921642",
//   appId: "1:852517921642:web:f6bebb91387ed08e963b13",
//   measurementId: "G-9M094EWKMJ"
// };



// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const express=require("express");
const app=express();
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}))
const mongoose=require("mongoose");
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
const add=require("./middlewares/authenticate");
mongoose.connect("mongodb://127.0.0.1:27017/wt_cp").then((res,err)=>{
  if(err){
    console.log(err);
  }
  else{
    console.log("mongodb connected");
  }
});
const AdminSchema=new mongoose.Schema({
  _id:"Number",
  username:"String",
  password:"String"
})

const Usermodel=mongoose.model("communitie",{});
app.get("/",function(req,res){
  // Usermodel.create({
  //   _id:2,
  //   username:"shubham",
  //   password:"mali"
  // }).then((res,err)=>{
  //   if(err){
  //     console.log(err);
  //   }
  //   else{
  //     console.log("inserted !");
  //   }
  // })
  // Usermodel.ins
  Usermodel.find().then((responce)=>{
    res.render("index",{"res":responce});
  })
  
})
app.post("/",(req,res)=>{
  console.log(add(1,2));
})
app.get("/info",function(req,res){
  res.render("info");
})
app.listen(3000,function(){
  console.log("running");
})