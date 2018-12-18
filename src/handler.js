var fs = require('fs');
var querystring = require('querystring');

function handler (request, response) {

  var endpoint = request.url;
  console.log(endpoint);

  var method = request.method;
  console.log(method);

  if (endpoint.slice(-3)==="css") {
    response.writeHead(200, {"Content-Type": "text/css"});
    fs.readFile(__dirname + '/../public/' + endpoint.slice(1), function(error, file)  {
      if (error)  {console.log(error); return;}
      response.end(file);
    });
  }
  else if (endpoint.slice(-3)==="jpg")  {
    response.writeHead(200, {"Content-Type": "image/jpeg"});
    fs.readFile(__dirname + '/../public/' + endpoint.slice(1), function(error, file)  {
      if (error)  {console.log(error); return;}
      response.end(file);
    });
  }
  else if(endpoint==="/node")  {message="I am Node!";}
  else if(endpoint==="/girl")  {message="I am (she) Node!";}
  else if(endpoint==="/")  {
    response.writeHead(200, {"Content-Type": "text/html"});
    fs.readFile(__dirname + '/../public/index.html', function(error, file)  {
      if (error)  {console.log(error); return;}
      response.end(file);
    });
  }
  else if(endpoint==="/create-post")  {
    var allTheData = "";
    request.on('data', function(chunkOfData)  {
      allTheData += chunkOfData;
    });
    request.on('end', function()  {
      var convertedData = querystring.parse(allTheData);
      console.log(convertedData);
      response.writeHead(303, {"Location": "/"})
      response.end();
    })
  }
  else {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(message);
    response.end();
  }
}

module.exports = handler;
