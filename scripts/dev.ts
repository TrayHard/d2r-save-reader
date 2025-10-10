import fs from "fs";
import path from "path";
import { readSave } from "../src/readUtils";

const inputArg = process.argv[2] || "tests/test.d2s";
const inputPath = path.isAbsolute(inputArg) ? inputArg : path.resolve(process.cwd(), inputArg);

if (!fs.existsSync(inputPath)) {
  console.error(`Input file not found: ${inputPath}`);
  process.exit(1);
}

const buffer = fs.readFileSync(inputPath);

try {
  const result = readSave(buffer);
  console.log("readSave() done");
  if (result !== undefined) {
    console.dir(result, { depth: null });
  }
} catch (error) {
  console.error(error instanceof Error ? error.stack || error.message : error);
  process.exit(1);
}


