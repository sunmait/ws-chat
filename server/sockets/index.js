const socketIo = require('socket.io');

module.exports = (http) => {
  const io = socketIo(http);

  io.on('connection', onConnection);
  function onConnection(socket) {
    socket.broadcast.emit('hi');

    socket.on('disconnect', function () {
      // stub
    });

    socket.on('chat message', function (msg) {
      io.emit('chat message', msg);
    });
  }
};

