var http = require('http');
var fs = require('fs');

var message = "I may not be a girl but I'm happy to be part of the node girls workshop";

function handler (request, response) {

  var endpoint = request.url;
  console.log(endpoint);

  var method = request.method;
  console.log(method);

  if(endpoint=="/node")  {message="I am Node!";}
  if(endpoint=="/girl")  {message="I am (she) Node!";}

  if(endpoint==="/")  {
    response.writeHead(200, {"Content-Type": "text/html"});
    fs.readFile(__dirname + '/../public/index.html', function(error, file)  {
      if (error)  {console.log(error); return;}
      response.end(file);
    });
  }
  else {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(message);
    response.end();
  }
}

var server = http.createServer(handler);
server.listen(3000, function()  {
  console.log("Server listening on port 3000. Ready to accept requests!");
});
