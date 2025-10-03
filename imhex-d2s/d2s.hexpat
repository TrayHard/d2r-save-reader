#include <std/string.pat>
#include <std/mem.pat>

#pragma endian little
#pragma magic [55 AA 55 AA] @ 0x00   // сигнатура D2S в начале файла
#pragma magic [10 1E] @ 0x29        // unknown offset

enum D2Class: u8 {
  Amazon=0, Sorceress=1, Necromancer=2, Paladin=3,
  Barbarian=4, Druid=5, Assassin=6
};

bitfield D2StatusFlags {
  isNewbie:         1;  // 0x01
  isError:          1;  // 0x02
  isHardcore:       1;  // 0x04
  hasDeaths:        1;  // 0x08 - умер хотя бы раз (может быть на софткоре тоже)
  IsSaveProcess:    1;  // 0x10
  IsExpansion:      1;  // 0x20
  IsLadder:         1;  // 0x40
  IsNeedsRenaming:  1;  // 0x80
};

/*
struct D2Attributes {
  strength: 10;
  energy: 10;
  dexterity: 10;
  vitality: 10;
  unusedStats: 10;
  unusedSkills: 8; 
}
*/

bitfield D2Waypoints {
  // Act 1
  RogueEncampment:      1;
  ColdPlains:           1;
  StonyField:           1;
  DarkWood:             1;
  BlackMarsh:           1;
  OuterCloister:        1;
  Jail1:                1;
  InnerCloister:        1;
  Catacombs2:           1;
  // Act 2
  LutGholein:           1;
  Sewers2:              1;
  DryHills:             1;
  HallsOfTheDead2:      1;
  FarOasis:             1;
  LostCity:             1;
  PalaceCellar1:        1;
  ArcaneSanctuary:      1;
  CanyonOfTheMagi:      1;
  // Act 3
  KurastDocks:          1;
  SpiderForest:         1;
  GreatMarsh:           1;
  FlayerJungle:         1;
  LowerKurast:          1;
  KurastBazaar:         1;
  UppeKurast:           1;
  Travincal:            1;
  DuranceOfHate2:       1;
  // Act 4
  PandemoniumFortress:  1;
  CityOfTheDamned:      1;
  RiverOfFlame:         1;
  // Act 5
  Harrogath:            1;
  FrigidHighlands:      1;
  ArreatPlateau:        1;
  CrystallinePassage:   1;
  GlacialTrail:         1;
  HallsOfPain:          1;
  FrozenTundra:         1;
  TheAncientsWay:       1;
  WorldstoneKeep2:      1;
};

bitfield D2Act2Waypoints {
};

bitfield D2Act3Waypoints {
};

// ---- D2R v99 ----
u32 signature   @ 0x00;   // ВСЕГДА 0xAA55AA55
u32 version     @ 0x04;   // D2R: 0x00000063 (v99)
u32 file_size   @ 0x08;   // ПРОВЕРЕНО
u32 checksum    @ 0x0C;
char name[15]   @ 0x10B;  // Имя персонажа

// Эти офсеты могут отличаться между патчами — проверь на своих сейвах:
D2StatusFlags status                @ 0x24;     // ПРОВЕРЕНО
u8            progression           @ 0x25;     // нужна расшифровка
D2Class       char_cls              @ 0x28;     // ПРОВЕРЕНО
u16           junk1                 @ 0x29;     // [10 1E]
u8            level                 @ 0x2B;     // ПРОВЕРЕНО
u32           last_played           @ 0x30;     // ПРОВЕРЕНО - unix seconds
u32           junk2                 @ 0x34;     // [FF FF FF FF]
// u32           assigned_skills   @ 0x38;   // 38-77
u32           left_skill            @ 0x78;     // 
u32           right_skill           @ 0x7C;     // 
u32           left_swap_skill       @ 0x80;     // 
u32           right_swap_skill      @ 0x84;     // 
u32           experience            @ 0xD3;     // ПРОВЕРЕНО
// u32           apperance  @ 0x88;   // 

/* Location: 80-84: Act 1-5 */
u8            location_normal       @ 0xA8;     // ПРОВЕРЕНО
u8            location_nightmare    @ 0xA9;     // ПРОВЕРЕНО
u8            location_hell         @ 0xAA;     // ПРОВЕРЕНО

u32           map_id                @ 0xAB;     // непонятно зачем

/* Mercenary */
u16           dead_merc             @ 0xB1;     // В 0xB1 01 == мерк умер
u32           merc_id               @ 0xB3;     // ? (hex-string)
u16           merc_name_id          @ 0xB7;     // ?
u16           merc_type             @ 0xB9;     // ?
u32           merc_experience       @ 0xBB;     // ПРОВЕРЕНО

u8            quest_normal[96]      @ 0x159;
u8            quest_nightmare[96]   @ 0x1b9;
u8            quest_hell[96]        @ 0x219;

D2Waypoints   waypoints_normal      @ 0x283;  // ПРОВЕРЕНО
D2Waypoints   waypoints_nightmare   @ 0x29B;  // ПРОВЕРЕНО
D2Waypoints   waypoints_hell        @ 0x2B3;  // ПРОВЕРЕНО

u16           items_count           @ 0x357;  // ПРОВЕРЕНО
D2Attributes  attributes            @ 0x2FC;  // ПРОВЕРЕНО

//  0x00BF PreviewData
//  0x014F Quests
//  0x0279 Waypoints
//  0x02c9 NPCDialog
//  0x02FC Attributes