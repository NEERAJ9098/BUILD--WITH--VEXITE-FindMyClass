/**
 * FindMyClass — Local Development Server
 * 
 * Serves static assets and provides the secure /api/ai endpoint locally.
 * Loads secrets from .env (which is strictly gitignored).
 */

const http = require("http");
const fs = require("fs");
const path = require("path");

// Load .env variables locally
function loadEnv() {
  const envPath = path.join(__dirname, ".env");
  if (fs.existsSync(envPath)) {
    try {
      const content = fs.readFileSync(envPath, "utf-8");
      content.split("\n").forEach((line) => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith("#")) {
          const idx = trimmed.indexOf("=");
          if (idx !== -1) {
            const key = trimmed.substring(0, idx).trim();
            const val = trimmed.substring(idx + 1).trim();
            if (!process.env[key]) {
              process.env[key] = val.replace(/^["']|["']$/g, "");
            }
          }
        }
      });
    } catch (e) {
      console.warn("Could not read .env file:", e.message);
    }
  }
}

loadEnv();

const aiHandler = require("./api/ai");

const PORT = parseInt(process.env.PORT, 10) || 3000;
const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".ico": "image/x-icon"
};

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  const pathname = parsedUrl.pathname;

  // Route API endpoint
  if (pathname === "/api/ai") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", async () => {
      req.body = body;
      try {
        await aiHandler(req, res);
      } catch (err) {
        console.error("Handler error:", err);
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({
          success: false,
          message: "AI navigation is temporarily unavailable. You can still search campus locations manually."
        }));
      }
    });
    return;
  }

  // Static File Serving
  let relativePath = pathname === "/" ? "index.html" : pathname.replace(/^\//, "");
  let filePath = path.join(__dirname, relativePath);

  // Security check: stay within workspace directory
  if (!filePath.startsWith(__dirname)) {
    res.statusCode = 403;
    res.end("Forbidden");
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/plain");
      res.end("404 Not Found");
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";

    res.writeHead(200, { "Content-Type": contentType });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`\n🚀 FindMyClass server running at http://localhost:${PORT}`);
  console.log(`🔒 Secure AI endpoint active at http://localhost:${PORT}/api/ai`);
  if (process.env.API_KEY && process.env.API_KEY.length > 5) {
    console.log(`✅ API Key loaded securely from environment (process.env.API_KEY)`);
  } else {
    console.log(`⚠️  No API_KEY in environment. Update your local .env file with your key.`);
  }
});
