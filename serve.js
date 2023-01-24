var express = require('express')
var app = express()
const fs = require('fs')
var server = app.listen(3000, function() {
})
app.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' })
  fs.createReadStream("index.html").pipe(res)
})
app.get('/styles.css', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/css' })
  fs.createReadStream("styles.css").pipe(res)  
})
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