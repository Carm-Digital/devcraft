import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..", "src");

function walk(dir, files = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, files);
    else if (/\.(tsx?|jsx?|css)$/.test(ent.name)) files.push(p);
  }
  return files;
}

function applyCommon(c) {
  c = c.replace(/#F1E83B/g, "#00D4FF");
  c = c.replace(/#f8fafc/g, "#F5F4F0");
  c = c.replace(/bg-\[#f8fafc\]/g, "bg-[#F5F4F0]");
  c = c.replace(/bg-slate-50\/80/g, "bg-[#F5F4F0]/80");
  c = c.replace(/hover:bg-slate-50/g, "hover:bg-[#F5F4F0]");
  c = c.replace(/bg-slate-50/g, "bg-[#F5F4F0]");
  c = c.replace(/from-slate-50/g, "from-[#F5F4F0]");
  c = c.replace(/text-amber-400/g, "text-[#00D4FF]");
  c = c.replace(/text-amber-500/g, "text-[#00D4FF]");
  c = c.replace(/text-amber-600/g, "text-[#00D4FF]");
  c = c.replace(/bg-amber-500/g, "bg-[#00D4FF]");
  c = c.replace(/color: #F1E83B/g, "color: #00D4FF");
  return c;
}

for (const file of walk(root)) {
  let c = fs.readFileSync(file, "utf8");
  const orig = c;
  c = applyCommon(c);
  if (!file.endsWith("globals.css")) {
    c = c.replace(/#0a0e1a/g, "#0d0f14");
  }
  if (c !== orig) fs.writeFileSync(file, c, "utf8");
}
console.log("replace-colors: ok");
