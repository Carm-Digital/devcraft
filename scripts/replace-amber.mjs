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

/** Ordre : motifs les plus longs / spécifiques en premier */
const REPLACEMENTS = [
  ["focus:ring-amber-500/20", "focus:ring-[#00D4FF]/20"],
  ["focus:ring-amber-500/40", "focus:ring-[#00D4FF]/40"],
  ["hover:shadow-amber-900/30", "hover:shadow-[#0d0f14]/30"],
  ["shadow-amber-900/30", "shadow-[#0d0f14]/30"],
  ["shadow-amber-900/20", "shadow-[#0d0f14]/20"],
  ["hover:border-amber-400/50", "hover:border-[#00D4FF]/50"],
  ["hover:border-amber-300", "hover:border-[#00D4FF]/40"],
  ["hover:bg-amber-400", "hover:bg-[#00D4FF]"],
  ["border-amber-200", "border-[#00D4FF]/20"],
  ["border-amber-100", "border-[#00D4FF]/10"],
  ["bg-amber-100", "bg-[#00D4FF]/10"],
  ["bg-amber-50/50", "bg-[#00D4FF]/10"],
  ["bg-amber-50", "bg-[#00D4FF]/5"],
  ["from-amber-50", "from-[#00D4FF]/5"],
  ["to-amber-50", "to-[#00D4FF]/5"],
  ["text-amber-800", "text-[#00D4FF]"],
  ["text-amber-900", "text-[#00D4FF]"],
  ["text-amber-400", "text-[#00D4FF]"],
  ["text-amber-600", "text-[#00D4FF]"],
  ["focus:border-amber-500", "focus:border-[#00D4FF]"],
  ["focus:ring-amber-500", "focus:ring-[#00D4FF]"],
  ["focus-visible:outline-amber-500", "focus-visible:outline-[#00D4FF]"],
  ["focus-visible:outline-amber-400", "focus-visible:outline-[#00D4FF]"],
  ["outline-amber-400", "outline-[#00D4FF]"],
  ["outline-amber-500", "outline-[#00D4FF]"],
  ["bg-amber-500", "bg-[#00D4FF]"],
  ["ring-amber-300", "ring-[#00D4FF]/40"],
  ["hover:bg-amber-700", "hover:bg-[#0099c9]"],
  ["bg-amber-600", "bg-[#00a8cc]"],
];

function apply(c) {
  for (const [from, to] of REPLACEMENTS) {
    c = c.split(from).join(to);
  }
  return c;
}

for (const file of walk(root)) {
  let c = fs.readFileSync(file, "utf8");
  const orig = c;
  c = apply(c);
  if (c !== orig) fs.writeFileSync(file, c, "utf8");
}
console.log("replace-amber: ok");
