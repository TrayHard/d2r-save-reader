import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

function getScriptDir() {
  const __filename = fileURLToPath(import.meta.url);
  return path.dirname(__filename);
}

function readAccountJson(scriptDir) {
  const preferred = path.join(scriptDir, "@account.json");
  const fallback = path.join(scriptDir, "account.json");
  const filePath = fs.existsSync(preferred) ? preferred : fallback;
  if (!fs.existsSync(filePath)) {
    throw new Error(
      "Neither @account.json nor account.json found next to the script"
    );
  }
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw);
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function base64ToBufferStrict(b64) {
  const sanitized = b64.replace(/\s+/g, "");
  return Buffer.from(sanitized, "base64");
}

function sanitizeFileName(value) {
  return String(value).replace(/[\\/:*?"<>|]/g, "_");
}

function writeCharacters(characters, outDir) {
  const charsDir = path.join(outDir, "characters");
  ensureDir(charsDir);
  for (const c of characters || []) {
    const name = sanitizeFileName(c.name ?? "character");
    const buf = base64ToBufferStrict(c.saveData ?? "");
    const filePath = path.join(charsDir, `${name}.d2s`);
    fs.writeFileSync(filePath, buf);
  }
}

function groupStashes(sharedStashTabs) {
  const groups = new Map();
  for (const tab of sharedStashTabs || []) {
    const key = `${tab.season ?? 0}|${tab.hardcore ? "hc" : "sc"}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(tab);
  }
  return groups;
}

function writeStashes(sharedStashTabs, outDir) {
  const stashesDir = path.join(outDir, "stashes");
  ensureDir(stashesDir);
  const groups = groupStashes(sharedStashTabs);
  for (const [key, tabs] of groups.entries()) {
    const [seasonStr, mode] = key.split("|");
    const season = Number(seasonStr);
    tabs.sort((a, b) => (a.index ?? 0) - (b.index ?? 0));
    const buffers = tabs.map((t) => base64ToBufferStrict(t.saveData ?? ""));
    const totalLength = buffers.reduce((sum, b) => sum + b.length, 0);
    const out = Buffer.allocUnsafe(totalLength);
    let offset = 0;
    for (const b of buffers) {
      b.copy(out, offset);
      offset += b.length;
    }
    const filePath = path.join(stashesDir, `${season}-${mode}.d2i`);
    fs.writeFileSync(filePath, out);
  }
}

function main() {
  try {
    const scriptDir = getScriptDir();
    const account = readAccountJson(scriptDir);
    const accountId = account.id;
    if (accountId === undefined || accountId === null) {
      throw new Error("Account id is required in account.json");
    }
    const outRoot = path.join(scriptDir, "accounts", String(accountId));
    ensureDir(outRoot);
    writeCharacters(account.characters ?? [], outRoot);
    writeStashes(account.sharedStashTabs ?? [], outRoot);
    console.log(`Written account ${accountId} data to ${outRoot}`);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`Error: ${message}`);
    process.exit(1);
  }
}

main();
