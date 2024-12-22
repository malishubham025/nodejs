const socket = io();
function handleSubmit(e){
    // console.log(e.target.);
    e.preventDefault();
    let name = e.target.elements.room_name.value; 
    // alert(name);
    socket.emit("join_room",name);
}
function handleCall(e){
    e.preventDefault();
    let name = e.target.elements.room_name.value; 
    console.log(name);
    socket.emit("call",name);
    var peer = new Peer();
}