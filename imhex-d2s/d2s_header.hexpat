// d2s_header.hexpat — минимальный заголовок .d2s
// Открывай .d2s, затем в Patterns -> Run, увидишь дерево D2S_Header.

#include <std/mem.pat>
#include <std/string.pat>

little_endian();   // D2S — little-endian

// Класс персонажа
enum D2Class : u8 {
    Amazon = 0, Sorceress = 1, Necromancer = 2, Paladin = 3,
    Barbarian = 4, Druid = 5, Assassin = 6
};

// Часто нужные флаги статуса (минимум для старта; дополни под свою версию)
bitfield D2StatusFlags : u8 {
    unknown0 : 1;       // 0x01
    hardcore : 1;       // 0x02 (пример: true = HC)
    unknown2 : 1;       // 0x04
    expansion: 1;       // 0x08 (LoD/D2R)
    ladder   : 1;       // 0x10 (исторический для ladder)
    dead     : 1;       // 0x20 (HC dead)
    unknown6 : 1;       // 0x40
    unknown7 : 1;       // 0x80
};

struct D2S_Header {
    u32 signature;        // 0x00 -> 0xAA55AA55
    u32 version;          // 0x04
    u32 file_size;        // 0x08
    u32 checksum;         // 0x0C (фактическое значение из файла)
    u32 active_weapon;    // 0x10 (0/1)
    char name[16];        // 0x14 (zero-terminated)
    D2StatusFlags status; // 0x24
    u8  progression;      // 0x25 (этап прохождения)
    u16 unknown_26;       // 0x26
    D2Class char_class;   // 0x28
    u8  unknown_29;       // 0x29
    u8  level;            // 0x2B
    u32 unknown_2C;       // 0x2C
    u32 timestamp;        // 0x30 (unix-like)
    u32 unknown_34;       // 0x34
    u8  hotkeys[64];      // 0x38..0x77
    u32 left_mouse;       // 0x78
    u32 right_mouse;      // 0x7C
    u32 left_mouse_ws;    // 0x80
    u32 right_mouse_ws;   // 0x84
    // ... далее — секции квестов/вейпоинтов/умений/предметов
} d2s @ 0x0;

// Базовые проверки сразу подсветят «не тот файл»
[[assert(d2s.signature == 0xAA55AA55, "Not a D2S file")]]
[[assert(d2s.char_class <= Assassin, "Unknown D2 class id")]]
