const express=require("express");
const app=express();
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
const multer=require("multer");
app.get("/",(req,res)=>{
    res.render("index");
})
// multer.diskStorage();
const disk=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./uploads")
    },
    filename:(req,file,cb)=>{
        cb(null,`${ file.originalname}`);
    },
   
})
const upload=multer({storage:disk});
app.post("/upload",upload.single("img"),(req,res)=>{
    console.log("hi");
    console.log(req.body.file);
    res.render("index");
})

app.listen(3000,function(){
    console.log("running ");
})