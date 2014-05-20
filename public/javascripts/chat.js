function Chat (socket) {
  this.socket = socket;
}

Chat.prototype.sendMessage = function (message) {
  this.socket.emit('message', { text: message });
};