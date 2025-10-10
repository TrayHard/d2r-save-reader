import fs from "fs";
import path from "path";
import { readSave } from "../src/readUtils";

const charInputArg = process.argv[2] || "scripts/test.d2s";
const charInputPath = path.isAbsolute(charInputArg) ? charInputArg : path.resolve(process.cwd(), charInputArg);

const stashInputArg = process.argv[3] || "scripts/test.d2i";
const stashInputPath = path.isAbsolute(stashInputArg) ? stashInputArg : path.resolve(process.cwd(), stashInputArg);

if (!fs.existsSync(stashInputPath)) {
  console.error(`Input file not found: ${stashInputPath}`);
  process.exit(1);
}

if (!fs.existsSync(charInputPath)) {
  console.error(`Input file not found: ${charInputPath}`);
  process.exit(1);
}

const charBuffer = fs.readFileSync(charInputPath);
const stashBuffer = fs.readFileSync(stashInputPath);

try {
  const charResult = readSave(charBuffer);
  const stashResult = readSave(stashBuffer);
  if (charResult !== undefined) {
    console.dir(charResult, { depth: null });
  }
  if (stashResult !== undefined) {
    console.dir(stashResult, { depth: null });
  }
} catch (error) {
  console.error(error instanceof Error ? error.stack || error.message : error);
  process.exit(1);
}


