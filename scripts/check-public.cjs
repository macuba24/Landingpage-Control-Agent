/**
 * Vite copies `public/` into `dist/` as-is. A file `public/index.html` overwrites
 * the SPA shell from the project root and breaks production (wrong page on Vercel).
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const publicDir = path.join(root, "public");
const forbidden = ["index.html", "index.htm"];

for (const name of forbidden) {
  const file = path.join(publicDir, name);
  if (fs.existsSync(file)) {
    console.error(
      `\n[check-public] FEHLER: ${path.join("public", name)} existiert.\n` +
        "Das überschreibt beim Build die React-app index.html. Datei löschen.\n",
    );
    process.exit(1);
  }
}

console.log("[check-public] OK (kein public/index.html)");
