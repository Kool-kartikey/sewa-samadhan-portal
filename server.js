/**
 * S.A.M.A.D.H.A.N — Zero-Dependency Native HTTP Server
 * Serves the standalone UDSC Grievance Redressal Portal on localhost.
 * 
 * Usage: node server.js [PORT]
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = parseInt(process.argv[2] || process.env.PORT || '3000', 10);
const PUBLIC_DIR = path.resolve(__dirname);

const SECURITY_HEADERS = {
  'Cache-Control': 'no-cache, no-store, must-revalidate',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Referrer-Policy': 'no-referrer'
};

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  let reqPath = '/';
  try {
    reqPath = decodeURI((req.url || '/').split('?')[0]);
  } catch {
    res.writeHead(400, { 'Content-Type': 'text/plain', ...SECURITY_HEADERS });
    res.end('400 Bad Request');
    return;
  }

  let safePath = path.normalize(reqPath).replace(/^(\.\.[\/\\])+/, '');
  if (safePath === '/' || safePath === '\\') {
    safePath = 'index.html';
  } else if (safePath === '/admin' || safePath === '\\admin') {
    safePath = 'admin.html';
  } else {
    safePath = safePath.replace(/^[\/\\]+/, '');
  }

  const filePath = path.resolve(PUBLIC_DIR, safePath);
  if (filePath !== PUBLIC_DIR && !filePath.startsWith(PUBLIC_DIR + path.sep)) {
    res.writeHead(403, { 'Content-Type': 'text/plain', ...SECURITY_HEADERS });
    res.end('403 Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback to index.html for SPA routing
      const fallbackPath = path.join(PUBLIC_DIR, 'index.html');
      fs.readFile(fallbackPath, (fallbackErr, content) => {
        if (fallbackErr) {
          res.writeHead(404, { 'Content-Type': 'text/plain', ...SECURITY_HEADERS });
          res.end('404 Not Found');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8', ...SECURITY_HEADERS });
        res.end(content);
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      ...SECURITY_HEADERS
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`================================================================`);
  console.log(`🏛️ S.A.M.A.D.H.A.N — UDSC 24/7 Grievance Portal is LIVE!`);
  console.log(`🔗 Local Address:        http://localhost:${PORT}`);
  console.log(`📱 Same Wi-Fi / LAN Phone: http://192.168.1.6:${PORT}`);
  console.log(`📜 DPDP Act 2023 Compliant | ISO 10002:2018 Complaint Standard`);
  console.log(`================================================================`);
});
