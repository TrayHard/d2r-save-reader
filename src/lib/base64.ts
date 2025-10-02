export function bufferFromBase64(input: string): Buffer {
  return Buffer.from(input, "base64");
}
