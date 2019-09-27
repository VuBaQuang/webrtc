const io = require('socket.io')(3000);


const arrUserInfo=[];


io.on('connection', socket => {

socket.on('Nguoi dung dang ky',user=>{
    arrUserInfo.push(user);
    socket.emit('Danh sach online',arrUserInfo);
    io.imit('Co nguoi dung moi',user);
});

});