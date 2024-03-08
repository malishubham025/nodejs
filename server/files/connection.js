const mysql=require('mysql');
const conn=mysql.createConnection({
    user:"root",
    host:"localhost",
    password:" ",
    database:"project"
});
function connection(){

    conn.connect((err)=>{
        if(err){
            console.log(err);
            return false;
        }
        else{
            console.log("connected");
            return true;
        }
    })

};
module.exports={connection,conn};