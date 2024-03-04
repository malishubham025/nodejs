const fs=require("fs");
fs.writeFileSync("index.txt","Hello there");
const res=fs.readFileSync("index.txt","utf-8");
console.log(res);
fs.writeFile("index.txt","hello there async",function(err){
    if(err)
    {
        console.log(err);
    }
})
fs.readFile("index.txt","utf-8",function(err,res){
        if(err){
            console.log(err);
        }
        else{
            console.log(res);
        }
})
fs.appendFile("index.txt","\n append async ",(err)=>{
    if(err)
    {
        console.log(err);
    }
})
fs.copyFileSync("index.txt","copy.txt");
// fs.unlinkSync("copy.txt");