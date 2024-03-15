const Um=new Map();
function setUser(id,user){
    Um.set(id,user);
}
function getUser(id){
    return Um.get(id);
}
module.exports={setUser,getUser};