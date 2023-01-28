const { match } = require('assert')
var express = require('express')
var app = express()
const fs = require('fs')
var server = app.listen(3000, function() {
})
function getExtension(filename){
  return filename.split('.').pop();
}
/*app.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' })
  fs.createReadStream("index.html").pipe(res)
})
app.get('/dist/output.css', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/css' })
  fs.createReadStream("dist/output.css").pipe(res)  
})*/
app.all('*', (req, res) => {
  let extension = getExtension(req.url)
  let dontCheck = false
  switch (extension) {
    case "/":
      res.writeHead(200, {'Content-Type': 'text/html'})
      fs.createReadStream("index.html").pipe(res)
      dontCheck = true
      break
    case "html":
      res.writeHead(200, {'Content-Type': 'text/html'})
      break
    case "css":
      res.writeHead(200, {'Content-Type': 'text/css'})
      break
    case "js":
      res.writeHead(200, {'Content-Type': "text/javascript"})
      break
    case "png":
      res.writeHead(200, {'Content-Type': 'image/png'})
      break
    default:
      res.writeHead(200, {'Content-Type': 'text/html'})
      fs.createReadStream("nopage.html").pipe(res)
      dontCheck = true
  }
  if (!(dontCheck)) {
    fs.createReadStream(req.url.substring(1)).pipe(res)
  } 
})
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