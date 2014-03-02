
/**
 * Module dependencies
 */

var ip = require('ip');
var sio = require('socket.io');
var http = require('http');
var fs = require('fs');
var w = window;

var html = fs.readFileSync(__dirname + '/template.html', 'utf8');
html = html.replace(/{{ip}}/gi, ip.address());

var server = http.createServer(function(req, res){
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(html);
}).listen(8889);

var io = sio.listen(server);

io.set('log level', 0);

io.sockets.on('connection', function(socket){

  socket.on('tap', function(){
    w.$('.movie.active')
      .removeClass('active')
      .find('a').click();
  });

  socket.on('swipeleft', function(){
    if(w.$('.movie.active').index() > 0) {
      w.$('.movie.active').removeClass('active')
        .prev().addClass('active');
    }
  });

  socket.on('swiperight', function(){
    if(w.$('.movie.active').index() < w.$('.movie').length - 1) {
      w.$('.movie.active').removeClass('active')
        .next().addClass('active');
    }
  });

  socket.on('doubletap', function(){
    if(w.$('body').hasClass('sidebar-open')) {
      w.$('.play-button').click();
    }
  });



});
