// create web server
// run this file by node comments.js
// open browser and go to http://localhost:3000
var http = require('http');
var fs = require('fs');
var url = require('url');
var comments = [];

var server = http.createServer(function(request, response) {
  var parseUrl = url.parse(request.url, true);
  var path = parseUrl.pathname;
  if (path === '/') {
    fs.readFile('./index.html', function(err, data) {
      if (err) {
        response.statusCode = 404;
        response.setHeader('Content-Type', 'text/plain');
        response.end('Not Found');
      } else {
        response.setHeader('Content-Type', 'text/html; charset=utf-8');
        response.end(data);
      }
    });
  } else if (path === '/comments') {
    if (request.method === 'GET') {
      response.end(JSON.stringify(comments));
    } else if (request.method === 'POST') {
      var comment = '';
      request.on('data', function(chunk) {
        comment += chunk;
      });
      request.on('end', function() {
        var newComment = JSON.parse(comment);
        comments.push(newComment);
        response.end(JSON.stringify(comments));
      });
    }
  } else {
    response.statusCode = 404;
    response.setHeader('Content-Type', 'text/plain');
    response.end('Not Found');
  }
});

server.listen(3000, function() {
  console.log('Server is running at http://localhost:3000');
});