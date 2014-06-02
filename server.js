var http = require('http');
var path = require('path');
var router = require('./router');
var chat = require('./lib/chat_server');

var port = process.env.PORT || 8080;

var server = http.createServer(function (req, resp) {
  router.router(req, resp);
}).listen(port);

chat.createChat(server);

console.log('Server running...');