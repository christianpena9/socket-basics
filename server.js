var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');
var now = moment();

app.use(express.static(__dirname + '/public'));

var clientInfo = {};

//tells when the user has connected to a socket
io.on('connection', function(socket) {
    console.log('user connected via socket.io');

    socket.on('disconnect', function() {
        var userData = clientInfo[socket.id];

        if( typeof userData !== 'undefined' ) {
            socket.leave(userData.room);
            io.to(userData.room).emit('message', {
                name: 'System',
                text: userData.name + ' has left!',
                timestamp: moment().valueOf()
            });
            delete clientInfo[socket.id];
        }
    });

    socket.on('joinRoom', function(req) {
        clientInfo[socket.id] = req;
        socket.join(req.room);
        socket.broadcast.to(req.room).emit('message',{
            name: 'System',
            text: req.name + ' has joined!',
            timestamp: moment().valueOf()
        });
    });

    socket.on('message', function(message) {
        console.log('Message Recieved: ' + message.text);
        //io.emit sends the data to everyone, including the sender

        message.timestamp = moment().valueOf();
        console.log('Message Timestamp: ' + message.timestamp);
        //broadcast.emit sends the date just to everyone
        io.to(clientInfo[socket.id].room).emit('message', message);
    });

    socket.emit('message', {
        name: 'System',
        text: 'Welcome to the chat application!',
        timestamp: now.valueOf()
    });
});

http.listen(PORT, function() {
    console.log('Server started!');
});
