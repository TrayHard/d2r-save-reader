import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  charBase64ToJson,
  charD2SToJson,
  stashBase64ToJson,
  stashD2SToJson,
} from "../dist/esm/index.js";

function printUsageAndExit() {
  console.error(
    [
      "Usage:",
      "  node scripts/dev-cli.js [--char|--stash] (-f <file>|-b <base64>)",
      "",
      "Examples:",
      "  node scripts/dev-cli.js --char -f ./samples/hero.d2s",
      "  node scripts/dev-cli.js --char -b BASE64_STRING",
      "  node scripts/dev-cli.js --stash -f ./samples/shared.d2i",
      "  node scripts/dev-cli.js --stash -b BASE64_STRING",
    ].join("\n")
  );
  process.exit(1);
}

function parseArgs(argv) {
  const args = { mode: null, file: null, base64: null };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--char") args.mode = "char";
    else if (a === "--stash") args.mode = "stash";
    else if (a === "-f") {
      i++;
      args.file = argv[i];
    } else if (a === "-b") {
      i++;
      args.base64 = argv[i];
    } else if (a === "-h" || a === "--help") {
      printUsageAndExit();
    }
  }
  return args;
}

async function main() {
  const { mode, file, base64 } = parseArgs(process.argv);
  if (!mode || (!file && !base64) || (file && base64)) {
    printUsageAndExit();
    return;
  }

  try {
    let result;
    if (mode === "char") {
      if (file) {
        const buf = fs.readFileSync(path.resolve(file));
        result = charD2SToJson(buf);
      } else {
        result = charBase64ToJson(base64);
      }
    } else if (mode === "stash") {
      if (file) {
        const buf = fs.readFileSync(path.resolve(file));
        result = stashD2SToJson(buf);
      } else {
        result = stashBase64ToJson(base64);
      }
    } else {
      printUsageAndExit();
      return;
    }

    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`Error: ${message}`);
    process.exit(1);
  }
}

main();
