import { BitReader } from "./bitreader";

class ItemsReader {
  private reader: BitReader;

  constructor(reader: BitReader, offset?: number) {
    if (offset) {
      reader.SeekByte(offset);
    }
    if (reader.ReadUInt16() !== 0x4A4D) {
      throw new Error('Invalid item header');
    }
    this.reader = reader;
  }

  public readItem() {
    const item = this.reader.ReadUInt16();
    console.log('item: ', item);
  }
}