var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

//tells when the user has connected to a socket
io.on('connection', function(socket) {
    console.log('user connected via socket.io');

    socket.on('message', function(message) {
        console.log('Message Recieved: ' + message.text);
        //io.emit sends the data to everyone, including the sender

        //broadcast.emit sends the date just to everyone
        io.emit('message', message);
    });

    socket.emit('message', {
        text: 'Welcome to the chat application!'
    });
});

http.listen(PORT, function() {
    console.log('Server started!');
});
