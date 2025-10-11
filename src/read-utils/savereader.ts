import { BitReader } from "./bitreader";
import { ItemsReader } from "./itemsreader";

export const SAVE_HEADER = 0xaa55aa55;

enum D2_CLASSES {
  Amazon = 0,
  Sorceress = 1,
  Necromancer = 2,
  Paladin = 3,
  Barbarian = 4,
  Druid = 5,
  Assassin = 6,
};

export class SaveReader {
  private reader: BitReader;

  constructor(buffer: Buffer) {
    this.reader = BitReader.fromBuffer(buffer);
  }

  public checkHeader() {
    const header = this.reader.ReadUInt32();
    if (header !== SAVE_HEADER) {
      throw new Error("Not a recognized D2R save file");
    }
    return true;
  }

  public checkIfStash() {
    this.reader.SeekByte(0x04);
    const version = this.reader.ReadUInt8();
    return version !== 0x63;
  }

  public readCharacterName() {
    this.reader.SeekByte(0x10B);
    return this.reader.ReadNullTerminatedString();
  }

  public readCharacterClass() {
    this.reader.SeekByte(0x28);
    return D2_CLASSES[this.reader.ReadUInt8()];
  }

  public readLevel() {
    this.reader.SeekByte(0x2B);
    return this.reader.ReadUInt8();
  }
  
  public readStatus() {
    this.reader.SeekByte(0x24);
    const status = this.reader.ReadUInt8();
    const isHardcore = (status & 0x04) !== 0;
    const isClassic = (status & 0x01) !== 0;
    const isLadder = (status & 0x40) !== 0;
    return { isHardcore, isClassic, isLadder };
  }
  
  public readAttributes() {
    this.reader.SeekByte(0x2FD);
    if (this.reader.ReadString(4) !== 'gf') {
      throw new Error('Invalid attributes header');
    }
    const attributes = {};
  }
  
  public readItems() {
    this.reader.SeekByte(0x355);
    return new ItemsReader(this.reader).readItems();
  }
}
