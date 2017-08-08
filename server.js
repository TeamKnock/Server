//ws://127.0.0.1:8080/socket.io/?EIO=3&transport=websocket
var io = require('socket.io')({
    transports: ['websocket'],
});

var userList = new Array();

var USER_COUNT = 0;

var io = io.attach(8000);

console.log('\n======Beta 0.05ver=======\n');
console.log('\n======Knock=======\n');
console.log("Server is On");
console.log('Time :  ' + new Date());
console.log('\n=============\n');


io.on('connection', function (socket) {

    //유저 접속 카운트 갱신 ++
    UserConnect();

	socket.on('joinRoom')
	
    //이동
    socket.on('move', function (data) {
        socket.broadcast.to(socket.room).emit('move', data);
    });

    //채팅 
    socket.on('chat', function (data) {
        console.log('[Chat] ' + new Date() + ' : ' + data.name + ' >> ' + data.message);
        io.sockets.in(socket.room).emit('chat', data);
    });

    //연결 해제
    socket.on('disconnect', function (data) {
        //유저 접속 카운트 갱신 --
        UserDisconnect();
    });

});


function UserConnect() {
    ++USER_COUNT;
    UserCountLog(new Date());
}

function UserDisconnect() {
    --USER_COUNT;
    UserCountLog(new Date());
}

function UserCountLog(date) {
    console.log('\n==========');
    console.log('[UserCount] ' + date + '\n현재 연결중인 유저수는 총 ' + USER_COUNT + " 명");
    console.log('==========\n');
}

