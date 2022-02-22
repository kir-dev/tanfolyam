var http = require('http')

http
  .createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'})
    response.end('Helló, világ!\n')
  })
  .listen(8000)

console.log('A szerver itt fut: http://localhost:8000/')
