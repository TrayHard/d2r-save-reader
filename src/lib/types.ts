export interface D2RCharacterHeader {
  magic: number;
  version: number;
  headerSize: number;
  checksum: number;
  activeWeaponSet: number;
  characterName: string;
}

export interface D2RCharacter {
  header: D2RCharacterHeader;
  // Add more sections as needed (stats, skills, quests, waypoints, inventory, mercenary, etc.)
}

export interface D2RSharedStashHeader {
  magic: number;
  version: number;
  length: number;
}

export interface D2RSharedStash {
  header: D2RSharedStashHeader;
}

export interface ParseOptions {
  // future: toggles for strictness, validation, etc.
}
