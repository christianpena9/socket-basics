var socket = io();
var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');

console.log(name + ' wants to join ' + room);

$('.room-title').text(room);

socket.on('connect', function() {
    console.log("connected to socket.io server.");
    socket.emit('joinRoom', {
        name: name,
        room: room
    });
});

socket.on('message', function(message) {
    console.log('New Message: ' + message.text);
    console.log('New Timestamp: ' + message.timestamp);

    var momentTimestamp = moment.utc(message.timestamp);

    $message = jQuery('.messages');
    $message.append('<p><strong>' + message.name + ' ' + momentTimestamp.local().format('h:mma') + '</strong></p>');
    $message.append('<p>' + message.text + '</p>');

    //jQuery('.messages').append('<p><strong>'+ momentTimestamp.local().format('h:mma') + '</strong>: ' + message.text + '</p>');
});

// Handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function(event) {
    event.preventDefault();

    $message = $form.find('input[name=message]');

    socket.emit('message', {
        name: name,
        text: $message.val()
    });

    $message.val('');
});
