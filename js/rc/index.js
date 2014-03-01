
/**
 * Module dependencies
 */

var ip = require('ip');
var sio = require('socket.io');
var http = require('http');
var fs = require('fs');

var html = fs.readFileSync(__dirname + '/template.html', 'utf8');
html = html.replace('{{ip}}', ip.address());

var server = http.createServer(function(req, res){
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(html);
}).listen(8889);

var io = sio.listen(server);
