var http = require('http');
var path = require('path');
var router = require('./router');
var chat = require('./lib/chat_server')

var server = http.createServer(function (req, resp) {
  router.router(req, resp);
}).listen(8080);

chat.createChat(server);

console.log('Server running at http://127.0.0.1:8080/');