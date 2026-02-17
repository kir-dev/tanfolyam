import http from 'http';

const port = 3000;

http
  .createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
    // res.end('Mikor érkezik már az ösztöndíj?');
  })
  .listen(port);

console.log(`A szerver a http://localhost:${port} címen fut`);
