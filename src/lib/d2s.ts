import { readAsciiString, readUInt32LE, readUInt8 } from "./binary";
import { bufferFromBase64 } from "./base64";
import type { D2RCharacter, D2RCharacterHeader, ParseOptions } from "./types";

// Notes:
// - D2R .d2s header is based on legacy D2 with updates. Magic often 0xAA55AA55 ('55 AA 55 AA' LE)
// - Name is an ASCII null-terminated string in early header; in D2R typically up to 16 chars
// - This minimal parser validates magic and extracts a few stable fields.

const LEGACY_MAGIC = 0xaa55aa55;

export function parseD2SFromBase64(
  base64: string,
  options?: ParseOptions
): D2RCharacter {
  const buffer = bufferFromBase64(base64);
  return parseD2S(buffer, options);
}

export function parseD2S(
  buffer: Buffer,
  _options?: ParseOptions
): D2RCharacter {
  if (buffer.length < 0x40) {
    throw new Error("Buffer too small to be a valid D2R .d2s file");
  }

  const magic = readUInt32LE(buffer, 0x00);
  const version = readUInt32LE(buffer, 0x04);
  const headerSize = readUInt32LE(buffer, 0x08);
  const checksum = readUInt32LE(buffer, 0x0c);

  // Name: commonly at 0x10 with max 16 (legacy). D2R appears compatible here.
  const characterName = readAsciiString(buffer, 0x10, 16);

  // Active weapon set flag is often at 0x2C (byte)
  const activeWeaponSet = readUInt8(buffer, 0x2c);

  const header: D2RCharacterHeader = {
    magic,
    version,
    headerSize,
    checksum,
    activeWeaponSet,
    characterName,
  };

  if (magic !== LEGACY_MAGIC) {
    // Some mods or different versions might vary, but for D2R we expect 0xAA55AA55
    throw new Error("Unsupported .d2s magic. Not a recognized D2/D2R save");
  }

  const result: D2RCharacter = {
    header,
  };

  return result;
}

export function charBase64ToJson(
  base64: string,
  options?: ParseOptions
): D2RCharacter {
  return parseD2SFromBase64(base64, options);
}

export function charD2SToJson(
  buffer: Buffer,
  options?: ParseOptions
): D2RCharacter {
  return parseD2S(buffer, options);
}
