var  um=new Map();
function getUser(id){
    return  um.get(id);
}
function setUser(user,id){
    um.set(id,user);
}
module.exports={
    getUser,
    setUser
}