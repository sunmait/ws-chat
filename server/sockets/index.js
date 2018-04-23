const socketIo = require('socket.io');

module.exports = (http) => {
  const io = socketIo(http);

  io.on('connection', onConnection);

  function onConnection(socket) {
    const {username} = socket.handshake.query;

    socket.broadcast.emit('user joined', username);

    socket.on('disconnect', onDisconnect(socket, io, username));
    socket.on('chat message', onChatMessage(socket, io, username));
    socket.on('user is typing', onUserIsTyping(socket, io));
  }
};

function onDisconnect(socket, io, username) {
  return () => {
    socket.broadcast.emit('user left', username);
  };
}

function onChatMessage(socket, io, username) {
  return (msg) => {
    io.emit('chat message', msg, username);
  };
}

function onUserIsTyping(socket, io) {
  return (username) => {
    socket.broadcast.emit('user is typing', username);
  };
}