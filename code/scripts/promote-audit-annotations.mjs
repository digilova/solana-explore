import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const sourcePath = resolve("lib/tokensXyzAudit.ts");

function readInput() {
  const fileArg = process.argv[2];
  if (fileArg) return readFileSync(resolve(fileArg), "utf8");

  if (process.platform === "darwin") {
    return execFileSync("pbpaste", { encoding: "utf8" });
  }

  throw new Error("Pass a JSON file path: npm run promote-audit -- path/to/annotations.json");
}

function assertAnnotation(value, index) {
  if (!value || typeof value !== "object") throw new Error(`Annotation ${index + 1} is not an object.`);

  const requiredStrings = ["id", "author", "text", "createdAt", "updatedAt"];
  for (const key of requiredStrings) {
    if (typeof value[key] !== "string" || value[key].trim() === "") {
      throw new Error(`Annotation ${index + 1} is missing string field "${key}".`);
    }
  }

  for (const key of ["xPct", "yPct"]) {
    if (typeof value[key] !== "number" || !Number.isFinite(value[key]) || value[key] < 0 || value[key] > 100) {
      throw new Error(`Annotation ${index + 1} has invalid "${key}".`);
    }
  }
}

const parsed = JSON.parse(readInput());
if (!Array.isArray(parsed)) throw new Error("Expected copied annotation JSON to be an array.");
parsed.forEach(assertAnnotation);

const normalized = parsed.map((annotation) => ({
  id: annotation.id,
  xPct: Number(annotation.xPct.toFixed(3)),
  yPct: Number(annotation.yPct.toFixed(3)),
  author: annotation.author,
  text: annotation.text,
  createdAt: annotation.createdAt,
  updatedAt: annotation.updatedAt,
}));

const source = readFileSync(sourcePath, "utf8");
const replacement = `export const SEED_AUDIT_ANNOTATIONS: AuditAnnotation[] = ${JSON.stringify(normalized, null, 2)};\n\nexport function cloneSeedAuditAnnotations`;
const nextSource = source.replace(
  /export const SEED_AUDIT_ANNOTATIONS: AuditAnnotation\[\] = \[[\s\S]*?\];\n\nexport function cloneSeedAuditAnnotations/,
  replacement,
);

if (nextSource === source) {
  throw new Error("Could not find SEED_AUDIT_ANNOTATIONS in lib/tokensXyzAudit.ts.");
}

writeFileSync(sourcePath, nextSource);
console.log(`Promoted ${normalized.length} audit annotations to ${sourcePath}.`);
