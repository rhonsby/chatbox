var io = require('socket.io')
  , fs = require('fs');

function createChat (server) {
  function emitToAll (message) {
    chatIo.sockets.emit('message', { text: message });
  }

  var chatIo = io.listen(server);
  chatIo.sockets.on('connection', function (socket) {
    socket.on('message', function (data) {
      emitToAll(data.text);
    });
  });
}

exports.createChat = createChat;