const mongoose=require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/practice").then(()=>{
    console.log("connected");
}).catch((err)=>{
    console.log(err);
})
const schema=new mongoose.Schema({
    id:Number,
    name:String
})
const model=mongoose.model("user",schema);
