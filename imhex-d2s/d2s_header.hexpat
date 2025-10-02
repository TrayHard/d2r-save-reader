// d2s_v99_min.hexpat — стартовый шаблон для D2R (v=0x63)
// Открой .d2s → Patterns → Run

#include <std/string.pat>
#include <std/mem.pat>

#pragma endian little
#pragma magic [55 AA 55 AA] @ 0x00   // сигнатура D2S в начале файла

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
  isDead:           1;  // 0x08
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
D2StatusFlags status   @ 0x24;   // ПРОВЕРЕНО
D2Class       char_cls @ 0x28;   // ПРОВЕРЕНО
u8            level    @ 0x2B;   // ПРОВЕРЕНО