$(function() {
  var socket = io.connect('http://localhost:8080');

  var chatRoom = new Chat(socket);

  $('form').on('submit', function (event) {
    event.preventDefault();
    
    var message = $('input').val();
    if (message[0] === '/') {
      chatRoom.processCommand(message);
    } else {
      chatRoom.sendMessage(message);
    }

    $('input').val('');
  });

  socket.on('message', function (data) {
    $('#messages').append($('<li>').text(data.text));
  });

  socket.on('roomList', function (data) {
    $('#room-list').html('');
    _.each(data.roomList, function (username) {
      $('#room-list').append($('<li>').html(username));
    });
  });
});
