import { SaveReader } from "./read-utils/savereader";


export function readSave(saveFile: Buffer) {
  const saveReader = new SaveReader(saveFile);
  saveReader.checkHeader();
  if (saveReader.checkIfStash()) {
    console.log('This is a stash file');
    readStash(saveReader);
  } else {
    console.log('This is a character file');
    readCharacter(saveReader);
  }
  // читаем заголовок сейва
  // начинаем читать предметы

}

export function readCharacter(saveReader: SaveReader) {
  const characterName = saveReader.readCharacterName();
  const characterClass = saveReader.readCharacterClass();
  const level = saveReader.readLevel();
  const status = saveReader.readStatus();
  const items = saveReader.readItems();
  console.log('characterName: ', characterName);
  console.log('characterClass: ', characterClass);
  console.log('level: ', level);
  console.log('status: ', status);
  console.log('items: ', items);
}

export function readStash(saveReader: SaveReader) {
  // const stashName = saveReader.readStashName();
  // console.log('stashName: ', stashName);
}