var fs = require('fs');
var querystring = require('querystring');

function handler(request, response)  {

  let endpoint = request.url;
  console.log(endpoint);

  if (endpoint==="/") {
    response.writeHead(200, {"Content-Type": "text/html"});
    fs.readFile(__dirname + '/../public/index.html', function(error, file) {
      if (error)  {console.log(error); return;}
      response.end(file);
    });
  }

  else if (endpoint.slice(-3)=="png"||endpoint.slice(-3)=="jpg")  {
    let contentType = "image/" + endpoint.slice(-3);
    response.writeHead(200, {"Content-Type": contentType});
    fs.readFile(__dirname + '/../public' + endpoint, function(error, file) {
      if (error)  {console.log(error); return;}
      response.end(file);
    });
  }

  else if (endpoint.slice(-3)=="css")  {
    let contentType = "text/" + endpoint.slice(-3);
    response.writeHead(200, {"Content-Type": contentType});
    fs.readFile(__dirname + '/../public' + endpoint, function(error, file) {
      if (error)  {console.log(error); return;}
      response.end(file);
    });
  }

  else if (endpoint==="/create/post") {
    var rawBlogText = "";
    request.on('data', function(stream) {
      rawBlogText += stream;
    });
    request.on('end', function()  {
      var parsedBlogText = querystring.parse(rawBlogText);
      console.log(parsedBlogText);
      fs.readFile(__dirname + '/posts.json', function(error, file)  {
        if (error) {console.log(error); return;}
        let blogObj = JSON.parse(file);
        let now = Date.now();
        blogObj[now] = parsedBlogText.post;
        let newFile = JSON.stringify(blogObj);
        console.log(newFile);
        fs.writeFile(__dirname + '/posts.json', newFile, function(error) {
          if (error)  {console.log(error); return;}
          console.log('successfully written to posts.json')
        });
      });

      response.writeHead(303, {"Location": "/"});
      response.end();
    });
  }

  else if (endpoint==="/script.js")  {
    response.writeHead(200, {"Content-Type": "text/javascript"});
    fs.readFile(__dirname + '/../public/script.js', function(error, file)  {
      if (error)  {console.log(error); return;}
      response.end(file);
    });
  }

  else if (endpoint==="/posts") {
    response.writeHead(200, {"Content-Type": "application/json"});
    fs.readFile(__dirname + '/posts.json', function(error, file)  {
      if (error)  {console.log(error); return;}
      response.end(file);
    });
  }

  else {
    response.writeHead(404, {"Content-Type": "text/html"});
    response.write("404 - Page Not Found. Check Your URL.")
    response.end();
  }
};

module.exports = handler;
