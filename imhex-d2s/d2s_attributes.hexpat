// Предпочтительная совместимость с std
import std.mem;
import std.io;
import std.core;

const u32 ATTR_START = 0x2FC;

// ===== Карта длины значений (в битах) по ID =====
const u16 ATTR_BITS[16] = {
    /*0*/10, /*1*/10, /*2*/10, /*3*/10,
    /*4*/10, /*5*/ 8, /*6*/21, /*7*/21,
    /*8*/21, /*9*/21, /*10*/21,/*11*/21,
    /*12*/ 7, /*13*/32,/*14*/25,/*15*/25
};

// ===== Вспомогательные типы и функции чтения битового потока =====
struct BitsRead { u64 value; u32 nextPos; };

fn bit_reverse(u32 v, u8 nbits) {
    u32 r = 0;
    for (u8 i = 0, i < nbits, i = i + 1) {
        r = (r << 1) | ((v >> i) & 1);
    }
    return r;
};

// читаем N бит из произвольной битовой позиции (LSB-first), без реверса
fn read_bits_raw(u32 base, u32 bitpos, u8 nbits) {
    u64 acc = 0;
    for (u8 i = 0, i < nbits, i = i + 1) {
        u32 byteOff = base + ((bitpos + i) >> 3);
        u8  bitOff  = (bitpos + i) & 7;
        u8  b       = u8(std::mem::read_unsigned(byteOff, 1));
        u8  bit     = (b >> bitOff) & 1;
        acc = acc | (u64(bit) << i); // LSB-first сборка
    }
    return acc;
};

// читаем N бит и затем реверсируем их (нужно для ID и VALUE)
fn read_bits_reversed(u32 base, u32 bitpos, u8 nbits) {
    u64 raw = read_bits_raw(base, bitpos, nbits);
    BitsRead res;
    res.value = u64(bit_reverse(u32(raw), nbits));
    res.nextPos = bitpos + nbits;
    return res;
};

// ===== Контейнер для атрибутов (значения по умолчанию 0) =====
struct D2S_Attributes {
    u16 strength;
    u16 energy;
    u16 dexterity;
    u16 vitality;
    u16 unused_stats;
    u8  unused_skills;
    u32 hp;           // 21 бит → поместим в u32
    u32 hp_max;
    u32 mana;
    u32 mana_max;
    u32 stamina;
    u32 stamina_max;
    u8  level;        // 7 бит
    u32 experience;   // 32 бит
    u32 gold;         // 25 бит → u32
    u32 gold_stash;   // 25 бит → u32
};

D2S_Attributes Stats;

// ===== Основной парсер потока атрибутов =====
fn parse_attributes(u32 base, u32 bitStart) {
    u32 pos = bitStart;
    while (true) {
        // 1) читаем 9 бит ID (реверс)
        BitsRead idRes = read_bits_reversed(base, pos, 9);
        u32 id = u32(idRes.value);
        pos = idRes.nextPos;

        // 2) терминатор 0x1FF?
        if (id == 0x1FF)
            break;

        // 3) длина значения
        if (id >= 16)
            break; // неизвестный ID

        u8 nbits = u8(ATTR_BITS[id]);

        // 4) читаем value (реверс)
        BitsRead valRes = read_bits_reversed(base, pos, nbits);
        u64 val = valRes.value;

        // 5) сохраняем в именованное поле
        if (id == 0)       Stats.strength      = u16(val);
        else if (id == 1)  Stats.energy        = u16(val);
        else if (id == 2)  Stats.dexterity     = u16(val);
        else if (id == 3)  Stats.vitality      = u16(val);
        else if (id == 4)  Stats.unused_stats  = u16(val);
        else if (id == 5)  Stats.unused_skills = u8(val);
        else if (id == 6)  Stats.hp            = u32(val);
        else if (id == 7)  Stats.hp_max        = u32(val);
        else if (id == 8)  Stats.mana          = u32(val);
        else if (id == 9)  Stats.mana_max      = u32(val);
        else if (id == 10) Stats.stamina       = u32(val);
        else if (id == 11) Stats.stamina_max   = u32(val);
        else if (id == 12) Stats.level         = u8(val);
        else if (id == 13) Stats.experience    = u32(val);
        else if (id == 14) Stats.gold          = u32(val);
        else if (id == 15) Stats.gold_stash    = u32(val);

        pos = valRes.nextPos;
    }
};

// ===== Маркер секции и запуск парсера =====
u8 attributes_marker @ ATTR_START;
parse_attributes(ATTR_START, 0);
