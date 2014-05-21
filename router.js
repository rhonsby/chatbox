var url = require('url');
var fs = require('fs');
var mime = require('mime');

function writeHead (err, resp, path) {
  if (err) {
    resp.writeHead(404);
  } else {
    resp.writeHead(200, mime.lookup(path));
  }
}

function router (req, resp) {
  var path = url.parse(req.url).pathname;
  if (path === '/') {
    fs.readFile('./public/index.html', { 'encoding': 'utf8' }, function (err, data) {
      writeHead(err, resp, path);
      resp.end(data);
    });
  } else {
    fs.readFile('.' + path, { 'encoding': 'utf8' }, function (err, data) {
      writeHead(err, resp, path);
      resp.end(data);
    });
  }
}

exports.router = router;
