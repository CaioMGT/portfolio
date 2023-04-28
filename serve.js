// This is unrelated to the website, it's just the web server I use when testing locally.
const { match } = require("assert");
var express = require("express");
var app = express();
const fs = require("fs");
var server = app.listen(3000, function () {});
function getExtension(filename) {
  return filename.split(".").pop();
}
app.all("*", (req, res) => {
  let extension = getExtension(req.url);
  let dontCheck = false;
  switch (extension) {
    case "/":
      res.writeHead(200, { "Content-Type": "text/html" });
      fs.createReadStream("./dist/index.html").pipe(res);
      dontCheck = true;
      break;
    case "html":
      res.writeHead(200, { "Content-Type": "text/html" });
      break;
    case "css":
      res.writeHead(200, { "Content-Type": "text/css" });
      break;
    case "js":
      res.writeHead(200, { "Content-Type": "text/javascript" });
      break;
    case "png":
      res.writeHead(200, { "Content-Type": "image/png" });
      break;
    case "ico":
      dontCheck = true;
      break;
    case "svg":
      res.writeHead(200, { "Content-Type": "image/svg+xml" });
      break;
    case "mp4":
      res.writeHead(200, { "Content-Type": "video/mp4" });
      break;
    case "wav":
      res.writeHead(200, { "Content-Type": "audio/wav" });
      break;
    default:
      res.writeHead(200, { "Content-Type": "text/html" });
      //This technically means I won't get a 404 page anymore, but this only affects me locally as github already handles 404 pages on Github Poges
      fs.createReadStream("./dist" + req.path + ".html").pipe(res);
      dontCheck = true;
  }
  if (!dontCheck) {
    try {
      fs.createReadStream("./dist" + req.path).pipe(res);
    } catch (err) {
      console.log(err);
      res.writeHead(404, "Could not find file");
      res.end();
    }
  }
});
/*app.get('/devnetlogo.png', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'image/png'})
  fs.createReadStream("devnetlogo.png").pipe(res)
})
app.get('/components/topbar.js', (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/javascript'})
  fs.createReadStream('components/topbar.js').pipe(res)
})*/
/*const server = http.createServer((req, res) => {
switch (req.url) {
  case "/styles.css" :
    res.writeHead(200, { 'Content-Type': 'text/css' })
    fs.createReadStream("styles.css").pipe(res)
  default:
    res.writeHead(200, { 'Content-Type': 'text/html' })
    fs.createReadStream("index.html").pipe(res)
  }
  console.log(req.url)
})

server.listen(process.env.PORT || 3000)*/
