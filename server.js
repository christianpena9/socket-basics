var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

//tells when the user has connected to a socket
io.on('connection', function() {
    console.log('user connected via socket.io');
});

http.listen(PORT, function() {
    console.log('Server started!');
});
