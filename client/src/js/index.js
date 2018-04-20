import io from 'socket.io-client';

$(function () {
  var socket = io();

  $('form').submit(function () {
    socket.emit('chat message', $('#m').val());
    $('#m').val('');

    return false;
  });

  socket.on('chat message', function (msg) {
    $('#messages').append($('<li>').text(msg));
  });
});

/**
 * TODO:
 * Broadcast a message to connected users when someone connects or disconnects
 * Add support for nicknames
 * Don’t send the same message to the user that sent it himself. Instead, append the message directly as soon as he presses enter.
 * Add “{user} is typing” functionality
 * Show who’s online
 * Add private messaging
 * Share your improvements!
 */