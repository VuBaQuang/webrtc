const socket = io('http://localhost:3000');

socket.on('Danh sach online',arrUserInfo=>{
   console.log(arrUserInfo);
});
socket.on('Co nguoi dung moi',user=>{
    console.log(user);
});
function openStream() {
    const config = {audio: false, video: true};
    return navigator.mediaDevices.getUserMedia(config);
};


function playStream(idTagVideo, stream) {
    const video = document.getElementById(idTagVideo);
    video.srcObject = stream;
    video.play();
};

var peer = new Peer({key:'peerjs',host: 'webrtckma.herokuapp.com',secure:true,port:443});

peer.on('open', id => {
    $('#myPeer').append(id)

    $(document).on('click', '#btnSignUp', function () {
        const username = $('#txtUserName').val();

        socket.emit('Nguoi dung dang ky', {name: username,peerId:id});
    });
});


//Caller
$(document).on('click', '#btnCall', function () {
    const id = $('#remoteId').val();
    openStream()
        .then(stream => {
            playStream('localStream', stream);
            const call = peer.call(id, stream);
            call.on('stream', remoteStream => playStream('remoteStream', remoteStream));
        });
});
//Callee
peer.on('call', call => {
    openStream()
        .then(stream => {
            call.answer(stream);
            playStream('localStream', stream);

            call.on('stream', remoteStream => playStream('remoteStream', remoteStream));
        })
});

