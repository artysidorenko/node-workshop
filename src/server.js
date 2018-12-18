var http = require('http');

var message = "I may not be a girl but I'm happy to be part of the node girls workshop";

function handler (request, response) {
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(message);
  response.end();
}

var server = http.createServer(handler);
server.listen(3000, function()  {
  console.log("Server listening on port 3000. Ready to accept requests!");
});
