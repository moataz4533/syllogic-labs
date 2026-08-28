import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const dir = join(process.cwd(), "public/media");
const chunks = join(dir, "b64");
if (!existsSync(chunks)) process.exit(0);

mkdirSync(dir, { recursive: true });
const stems = [...new Set(
  readdirSync(chunks)
    .filter((f) => f.endsWith(".txt"))
    .map((f) => f.split(".")[0]),
)];

for (const stem of stems) {
  const dest = join(dir, `${stem}.jpg`);
  if (existsSync(dest) && readFileSync(dest).byteLength > 8000) continue;
  const parts = readdirSync(chunks)
    .filter((f) => f.startsWith(`${stem}.`) && f.endsWith(".txt"))
    .sort();
  const b64 = parts.map((f) => readFileSync(join(chunks, f), "utf8")).join("");
  writeFileSync(dest, Buffer.from(b64, "base64"));
  console.log("assembled", dest, parts.length, "parts");
}
