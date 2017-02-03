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

    var momentTimestamp = moment.utc(message.timestamp);
    var $messages = jQuery('.messages');
    var $message = jQuery('<li class="list-group-item"></li>');

    console.log('New Message: ' + message.text);
    console.log('New Timestamp: ' + message.timestamp);

    $message.append('<p><strong>' + message.name + ' ' + momentTimestamp.local().format('h:mma') + '</strong></p>');
    $message.append('<p>' + message.text + '</p>');
    $messages.append($message);
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
