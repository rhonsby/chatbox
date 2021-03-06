function Chat (socket) {
  this.socket = socket;
}

Chat.prototype.sendMessage = function (message) {
  this.socket.emit('message', { text: message });
};

Chat.prototype.processCommand = function (message) {
  var command = message.split(' ', 1)[0];
  var cmdText = message.slice(message.indexOf(' ') + 1);

  switch (command) {
  case '/nick':
    console.log('nick');
    console.log(command);
    this.socket.emit('nicknameChangeRequest', { text: cmdText });
    break;
  case '/join':
    this.socket.emit('changeRoomRequest', { text: cmdText });
    break;
  default:
    console.log('No command: ' + command);
    break;
  }
};
