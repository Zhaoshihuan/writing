const http = require('http');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'sample-essays-frontend');
const port = process.env.PORT || 3000;

const mimeTypes = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
};

const server = http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0] || '/';
  if (urlPath === '/') {
    urlPath = '/index.html';
  }

  const filePath = path.join(publicDir, decodeURIComponent(urlPath));

  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
      res.end('404 Not Found');
      return;
    }

    if (stats.isDirectory()) {
      const indexPath = path.join(filePath, 'index.html');
      fs.readFile(indexPath, (indexErr, data) => {
        if (indexErr) {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
          res.end('404 Not Found');
          return;
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html; charset=UTF-8');
        res.end(data);
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, data) => {
      if (readErr) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
        res.end('Server error');
        return;
      }
      res.statusCode = 200;
      res.setHeader('Content-Type', contentType);
      res.end(data);
    });
  });
});

server.listen(port, () => {
  console.log(`✅ 网站已启动: http://localhost:${port}`);
});
