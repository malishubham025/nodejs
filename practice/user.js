// var  um=new Map();
// function getUser(id){
//     return  um.get(id);
// }
// function setUser(user,id){
//     um.set(id,user);
// }
// module.exports={
//     getUser,
//     setUser
// }
const s="hello@123@123@123itsme";
const jwt=require("jsonwebtoken");
function setUser(user){
    const payload={
        ...user
    }
    return jwt.sign(payload,s)
}
function getUser(id){
    if(!id)return null;
    try{
        return jwt.verify(id,s);
    }
    catch(error){
        console.log(error);
        return null;
    }
}
module.exports={
    getUser,
    setUser
}