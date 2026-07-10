import { createServer } from "http";
import { createReadStream, statSync, existsSync } from "fs";
import { join, extname, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dist = join(__dirname, "dist");
const PORT = Number(process.env.PORT) || 3001;
const BASE = (process.env.BASE_PATH || "").replace(/\/$/, "");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "application/javascript",
  ".xml": "application/xml",
  ".txt": "text/plain",
  ".ico": "image/x-icon",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

function serve404(res) {
  const p = join(dist, "404.html");
  res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
  if (existsSync(p)) createReadStream(p).pipe(res);
  else res.end("<h1>404 — Page not found</h1>");
}

const server = createServer((req, res) => {
  let url = req.url.split("?")[0];

  if (BASE && url.startsWith(BASE)) {
    url = url.slice(BASE.length) || "/";
  }
  if (!url.startsWith("/")) url = "/" + url;

  let filePath = join(dist, url);

  try {
    if (existsSync(filePath) && statSync(filePath).isDirectory()) {
      filePath = join(filePath, "index.html");
    }
    if (!existsSync(filePath) && !url.endsWith("/")) {
      const withHtml = filePath + ".html";
      if (existsSync(withHtml)) filePath = withHtml;
    }
    if (!existsSync(filePath)) {
      serve404(res);
      return;
    }
    const ext = extname(filePath);
    const ct = MIME[ext] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": ct });
    createReadStream(filePath).pipe(res);
  } catch {
    serve404(res);
  }
});

server.listen(PORT, "0.0.0.0", () =>
  console.log(`Static server → http://localhost:${PORT}${BASE}/`)
);
