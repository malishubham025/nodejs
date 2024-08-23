const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
const multer=require("multer");
const path = require("path");
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
mongoose.connect("mongodb://127.0.0.1:27017/images").then(()=>{
    console.log("connected");
}).catch((err)=>{
    console.log(err);
})
let Schema=new mongoose.Schema({
    name:String
})
let model=mongoose.model("image_multer",Schema);
app.get("/",async (req,res)=>{
    // res.render("index",{"images":images});
    try{
    let images=await model.find();
    res.render("index", { images }); 
    }
    catch (err){
        console.log(err);
        res.send("Error fetching images");
    }
})
// multer.diskStorage();
const disk=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./uploads")
    },
    filename:(req,file,cb)=>{
        model.collection.insertOne({name:file.originalname}).then(()=>{
            console.log("inserted");
        }).catch((err)=>{
            console.log(err);
        });
        cb(null,`${ file.originalname}`);
    },
   
})

const upload=multer({storage:disk});
app.post("/upload",upload.single("img"),(req,res)=>{
    console.log("hi");
    console.log(req.body.file);
    res.redirect("/");
})

app.listen(3000,function(){
    console.log("running ");
})