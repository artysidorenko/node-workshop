var http = require('http');
var fs = require('fs');
var handler = require('./handler.js');
var server = http.createServer(handler);
server.listen(3000, function(){
  console.log('Server is listening on port 3000 - ready to accept requests.')
});
