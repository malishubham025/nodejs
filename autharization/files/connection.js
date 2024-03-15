const mysql=require("mysql");
const conn=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:" ",
    database:"project"
});
function connection(){
    conn.connect((err)=>{
        if(err){
            return false;
        }
        else{
            return true;
        }
    })
    
};
module.exports={conn,connection};