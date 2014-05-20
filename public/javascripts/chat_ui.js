$(function() {
  var socket = io.connect('http://localhost:8080');

  var chatRoom = new Chat(socket);

  $('form').on('submit', function (event) {
    event.preventDefault();
    var message = $('input').val();
    chatRoom.sendMessage(message);

    $('input').val('');
  });

  socket.on('message', function (data) {
    $('#messages').append($('<li>').text(data.text));
  });
});