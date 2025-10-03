#include <std/string.pat>
#include <std/mem.pat>

#pragma endian little
#pragma magic [55 AA 55 AA] @ 0x00   // сигнатура D2S в начале файла
#pragma magic [10 1E] @ 0x29        // unknown offset

// Класс персонажа (enum — как в доке: enum Name : uXX { ... })
enum D2Class: u8 {
  Amazon=0, Sorceress=1, Necromancer=2, Paladin=3,
  Barbarian=4, Druid=5, Assassin=6
};

// Статусные биты — правильный синтаксис bitfield без базового типа в объявлении
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


//  0x00BF PreviewData
//  0x014F Quests
//  0x0279 Waypoints
//  0x02c9 NPCDialog
//  0x02FC Attributes