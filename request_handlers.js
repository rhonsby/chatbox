function index (req, resp) {
  fs.readFile('./public/index.html', function (err, data) {
    if (err) throw err;
    resp.writeHead(200, {'Content-Type': 'text/html'});
    resp.end(data);
  });
}

exports.index = index;
