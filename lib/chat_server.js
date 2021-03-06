var io = require('socket.io');
var fs = require('fs');
var Chance = require('chance');
var  _ = require('underscore');
var chance = new Chance();

String.prototype.capitalize = function() {
    return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

function generateRandomName () {
  return chance.word().capitalize() + ' ' + chance.word().capitalize();
}

function createChat (server) {
  function emitToRoom (room, message) {
    chatIo.sockets.in(room).emit('message', { text: message });
  }

  function joinRoom(socket, room) {
    socket.leave(currentRooms[socket.id]);
    updateRoomList(currentRooms[socket.id]);

    currentRooms[socket.id] = room;
    socket.join(room);
    updateRoomList(room);
  }

  function updateRoomList(room) {
    var users = _.map(chatIo.sockets.clients(room), function (socket) {
      return nicknames[socket.id];
    });

    chatIo.sockets.in(room).emit('roomList', { roomList: users });
  }

  var numGuests = 0;
  var nicknames = {};
  var currentRooms = {};
  var chatIo = io.listen(server);

  chatIo.sockets.on('connection', function (socket) {
    numGuests++;
    var nickname = generateRandomName();
    nicknames[socket.id] = nickname;
    joinRoom(socket, 'lobby');

    socket.on('message', function (data) {
      emitToRoom(currentRooms[socket.id], nicknames[socket.id] + ': ' + data.text);
    });

    socket.on('nicknameChangeRequest', function (data) {
      nicknames[socket.id] = data.text;
      updateRoomList(currentRooms[socket.id]);
    });

    socket.on('changeRoomRequest', function (data) {
      joinRoom(socket, data.text);
    });

    socket.on('disconnect', function () {
      socket.leave(currentRooms[socket.id]);
      updateRoomList(currentRooms[socket.id]);
    });
  });
}

exports.createChat = createChat;
