var url = require('url');
var fs = require('fs');
var mime = require('mime');

function fail (resp) {
  resp.writeHead(404);
  resp.end('you fail');
}

function router (req, resp) {
  var path = url.parse(req.url).pathname;
  if (path === '/') {
    fs.readFile('./public/index.html', {'encoding': 'utf8'}, function (err, data) {
      if (err) {
        fail(resp)
      } else {
        resp.writeHead(200, {'Content-Type': 'text/html'});
        resp.end(data);
      }
    });
  } else {
    console.log(path)
    fs.readFile('.' + path, {'encoding': 'utf8'}, function (err, data) {
      if (err)  {
        fail(resp)
      } else {
        resp.writeHead(200, {'Content-Type': mime.lookup(path)});
        resp.end(data);
      }
    });
  }
}

exports.router = router;