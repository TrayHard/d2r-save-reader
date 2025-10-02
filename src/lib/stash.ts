import { readUInt32LE } from "./binary";
import { bufferFromBase64 } from "./base64";
import type {
  D2RSharedStash,
  D2RSharedStashHeader,
  ParseOptions,
} from "./types";

// D2R shared stash (.d2i or similar) starts with a header like '55 AA 55 AA' and version
const LEGACY_MAGIC = 0xaa55aa55;

export function parseSharedStashFromBase64(
  base64: string,
  options?: ParseOptions
): D2RSharedStash {
  const buffer = bufferFromBase64(base64);
  return parseSharedStash(buffer, options);
}

export function parseSharedStash(
  buffer: Buffer,
  _options?: ParseOptions
): D2RSharedStash {
  if (buffer.length < 16) {
    throw new Error("Buffer too small to be a valid D2R shared stash file");
  }
  const magic = readUInt32LE(buffer, 0x00);
  const version = readUInt32LE(buffer, 0x04);
  const length = readUInt32LE(buffer, 0x08);

  if (magic !== LEGACY_MAGIC) {
    throw new Error(
      "Unsupported shared stash magic. Not a recognized D2/D2R stash"
    );
  }

  const header: D2RSharedStashHeader = { magic, version, length };
  return { header };
}

export function stashBase64ToJson(
  base64: string,
  options?: ParseOptions
): D2RSharedStash {
  return parseSharedStashFromBase64(base64, options);
}

export function stashD2SToJson(
  buffer: Buffer,
  options?: ParseOptions
): D2RSharedStash {
  return parseSharedStash(buffer, options);
}
