var io = require('socket.io')
  , fs = require('fs')
  , Chance = require('chance');

var chance = new Chance();

String.prototype.capitalize = function() {
    return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

function generateRandomName () {
  return chance.prefix() + ' ' +
         chance.word().capitalize() + ' ' +
         chance.word().capitalize();
}

function createChat (server) {
  function emitToAll (message) {
    chatIo.sockets.emit('message', { text: message });
  }

  var numGuests = 0;
  var nicknames = {};
  var chatIo = io.listen(server);

  chatIo.sockets.on('connection', function (socket) {
    var guestNumber = numGuests++;
    var nickname = generateRandomName();
    nicknames[guestNumber] = nickname;

    socket.on('message', function (data) {
      emitToAll(nicknames[guestNumber] + ': ' + data.text);
    });

    socket.on('nicknameChangeRequest', function (data) {
      // ensure not taken
      console.log(data);
      nicknames[guestNumber] = data.text;
    });
  });
}

exports.createChat = createChat;