const um=new Map();

function setUser(id,user){
    um.set(id,user);
}
function getUser(id){
    return um.get(id);
}
module.exports={setUser,getUser};