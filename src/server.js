var http = require('http');
var fs = require('fs');
var querystring = require('querystring');
var handler = require('./handler.js');

var message = "I may not be a girl but I'm happy to be part of the node girls workshop";



var server = http.createServer(handler);
server.listen(3000, function()  {
  console.log("Server listening on port 3000. Ready to accept requests!");
});
