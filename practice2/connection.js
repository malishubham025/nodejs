const mysql=require("mysql");
const conn=mysql.createConnection({
    user:"root",
    password:" ",
    host:"localhost",
    database:"project"
})
conn.connect((err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("connected");
    }
})
module.exports={conn}