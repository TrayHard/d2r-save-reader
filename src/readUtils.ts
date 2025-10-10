import { BitReader } from "./read-utils/bitreader";

const SAVE_HEADER = 0xaa55aa55;

export function readSave(saveFile: Buffer) {
  const reader = BitReader.fromBuffer(saveFile);
  // читаем заголовок сейва
  const header = reader.ReadUInt32();

  console.log('header: ', header.toString(16));

  if (header !== SAVE_HEADER) {
    throw new Error("Not a recognized D2R save file");
  }
  // определяем это персонаж или стеш
  // читаем имя персонажа
  reader.SeekByte(0x10B);
  const characterName = reader.ReadNullTerminatedString();
  console.log('characterName: ', characterName);
  // читаем класс персонажа
  // читаем уровень персонажа
  // читаем hc\sc, isClassic, isLadder
  // начинаем читать предметы
}