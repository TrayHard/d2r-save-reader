export function readUInt32LE(buffer: Buffer, offset: number): number {
  return buffer.readUInt32LE(offset);
}

export function readUInt16LE(buffer: Buffer, offset: number): number {
  return buffer.readUInt16LE(offset);
}

export function readUInt8(buffer: Buffer, offset: number): number {
  return buffer.readUInt8(offset);
}

export function readAsciiString(
  buffer: Buffer,
  offset: number,
  maxLength: number
): string {
  let end = offset;
  const max = Math.min(buffer.length, offset + maxLength);
  while (end < max && buffer[end] !== 0) {
    end++;
  }
  return buffer.toString("ascii", offset, end);
}
