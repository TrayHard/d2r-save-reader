<a href="https://www.buymeacoffee.com/krisives" target="_blank"><img
src="https://cdn.buymeacoffee.com/buttons/v2/arial-orange.png" alt="Buy Me A
Coffee" height="50px" ></a>

# Diablo II Save File Format

Diablo II stores your game character on disk as a .d2s file. This
is a binary file format that encodes all of the stats, items, name,
and other pieces of data.

Integers are stored in [little endian](https://en.wikipedia.org/wiki/Endianness)
byte order, which is the native byte ordering on a x86 architecture Diablo II
is based on.

## Header

Each .d2s file starts with a 765 byte header, after which data
is of variable length.

| Hex   | Byte | Length | Desc                                                    |
| ----- | ---- | ------ | ------------------------------------------------------- |
| 0x00  | 0    | 4      | Signature (always 0xAA55AA55)                           |
| 0x04  | 4    | 4      | [Version ID](#versions)                                 |
| 0x08  | 8    | 4      | File size                                               |
| 0x0C  | 12   | 4      | [Checksum](#checksum)                                   |
| 0x10  | 16   | 4      | [Active Weapon](#active-weapon)                         |
| 0x14  | 20   | 16     | [Legacy Character Name](#character-name)                |
| 0x24  | 36   | 1      | [Character Status](#character-status)                   |
| 0x25  | 37   | 1      | [Character Progression](#Character-progression)         |
| 0x26  | 38   | 2      | ?                                                       |
| 0x28  | 40   | 1      | [Character Class](#character-class)                     |
| 0x29  | 41   | 2      | ?                                                       |
| 0x2B  | 43   | 1      | [Level](#level)                                         |
| 0x2C  | 44   | 4      | ?                                                       |
| 0x30  | 48   | 4      | Time                                                    |
| 0x34  | 52   | 4      | ?                                                       |
| 0x38  | 56   | 64     | [Hotkeys](#hotkeys)                                     |
| 0x78  | 120  | 4      | Left Mouse                                              |
| 0x7C  | 124  | 4      | Right Mouse                                             |
| 0x80  | 128  | 4      | Left Mouse (weapon switch)                              |
| 0x84  | 132  | 4      | Right Mouse (weapon switch)                             |
| 0x88  | 136  | 32     | [Character Menu Appearance](#character-menu-appearance) |
| 0xA8  | 168  | 3      | [Spawn location](#spawn-location)                       |
| 0xAB  | 171  | 4      | [Map](#map)                                             |
| 0xAF  | 175  | 2      | ?                                                       |
| 0xB1  | 177  | 2      | Merc flags - 01 00 means merc is dead                   |
| 0xB3  | 179  | 4      | Merc ID                                                 |
| 0xB7  | 183  | 2      | Merc Name ID                                            |
| 0xB9  | 185  | 2      | Merc Type                                               |
| 0xBB  | 187  | 4      | Merc Experience                                         |
| 0xBF  | 191  | 144    | ?                                                       |
| 0xD3  | 191  | 4      | Character experience                                    |
| 0x14F | 335  | 298    | [Quest](#quest)                                         |
| 0x279 | 633  | 81     | [Waypoint](#waypoint)                                   |
| 0x2CA | 714  | 51     | [NPC](#npc)                                             |
| 0x2FD | 765  |        | [Stats](#stats)                                         |
|       |      |        | [Items](#items)                                         |

### Versions

File version. The following values are known:

- `71` is 1.00 through v1.06
- `87` is 1.07 or Expansion Set v1.08
- `89` is standard game v1.08
- `92` is v1.09 (both the standard game and the Expansion Set.)
- `96` is v1.10+
- `99` is Diablo 2 Resurrected (our most common case)

### Checksum

To calculate the checksum set the value of it in the .d2s data
to be zero and iterate through all the bytes in the data calculating
a 32-bit checksum:

<details><summary>code in C</summary>

```C
    sum = (sum << 1) + data[i];
```

</details>

<details><summary>code in JavaScript</summary>

source: https://github.com/krisives/d2s-format/issues/5

```js
const fs = require("fs");
const path = require("path");
const file = path.join(process.cwd(), "path_to_save.d2s");

function calculateSum(data) {
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    let ch = data[i];
    if (i >= 12 && i < 16) {
      ch = 0;
    }
    ch += sum < 0;
    sum = (sum << 1) + ch;
  }

  return sum;
}

function littleToBigEndian(number) {
  return new DataView(
    Int32Array.of(
      new DataView(Int32Array.of(number).buffer).getUint32(0, true)
    ).buffer
  );
}

function ashex(buffer) {
  return buffer.getUint32(0, false).toString(16);
}

async function readSafeFile() {
  return await new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });
}

async function writeCheckSumToSafeFile(data) {
  return await new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject(err);
      resolve();
    });
  });
}

readSafeFile().then((data) => {
  const sum = calculateSum(data);
  const bufferSum = littleToBigEndian(sum);
  const hex = ashex(bufferSum);
  const newData = data;
  for (let i = 0; i < 4; i++) {
    newData[12 + i] = bufferSum.getInt8(i);
  }
  writeCheckSumToSafeFile(newData).then(() => console.log(hex));
});
```

</details>

If the checksum is invalid, Diablo II will not open the save file.

### Active Weapon

TODO

### Character Name

Character names are store as an array of 16 characters which contain
a null terminated string padded with `0x00` for the remaining bytes.
Characters are stored as 8-bit ASCII, but remember that valid must
follow these rules:

- Must be 2-15 in length
- Must begin with a letter
- May contain up to one hyphen (`-`) or underscore (`_`)
- May contain letters

_It has been stored in `0x14` before, but it's stored in `0x10B` in D2R._

### Character Status

This is a 8-bit field:

| Bit | Desc               | Value |
| --- | ------------------ | ----- |
| 0   | isNewbie           | 0x01  |
| 1   | isError            | 0x02  |
| 2   | isHardcore         | 0x04  |
| 3   | Died at least once | 0x08  |
| 4   | isSaveProgress     | 0x10  |
| 5   | isExpansion        | 0x20  |
| 6   | isLadder           | 0x40  |
| 7   | isNeedsRenaming    | 0x80  |

### Character Progression

TODO

### Character Class

| ID  | Class       |
| --- | ----------- |
| 0   | Amazon      |
| 1   | Sorceress   |
| 2   | Necromancer |
| 3   | Paladin     |
| 4   | Barbarian   |
| 5   | Druid       |
| 6   | Assassin    |

### Level

This level value is visible only in character select screen
and must be the same as this in [Stats](#stats) section.

### Hotkeys

TODO

### Character Menu Appearance

32 byte structure which defines how the character looks in the menu
Does not change in-game look

### Spawn location

3 bytes of data that indicates where the character will be spawned.
Each byte is representitive of one of the difficulties:
`Normal`, `Nightmare`, and `Hell`. Inside of each byte each bit represents the act.
Each byte is a bitfield structured like this:

| 7       | 6       | 5       | 4       | 3       | 2, 1, 0          |
| ------- | ------- | ------- | ------- | ------- | ---------------- |
| Active? | Unknown | Unknown | Unknown | Unknown | Which act (0-4)? |

### Map

TODO

### Quest

`0x014F-0x152` - 4 bytes - [quests header identifier = 0x57, 0x6f, 0x6f, 0x21 "Woo!"]
`0x0153-0x156` - 4 bytes - [version = 0x6, 0x0, 0x0, 0x0]
`0x0157-0x158` - 2 bytes - [quests header length = 0x2a, 0x01]

Each quest block - 96 bytes.
`0x0159` - Normal
`0x01b9` - Nightmare
`0x0219` - Hell

### Waypoint

#### Header

`0x279-0x27A` - waypoints header = ["W", "S"]
`0x27B-0x27E` - waypoints header version = [0x01, 0x00, 0x00, 0x00]
`0x27F-0x280` - waypoints header length = [0x50, 0x00]

Three structures are in place, 24 bytes for each difficulty:
`0x281-0x298` - Normal
`0x299-0x2B0` - Nightmare
`0x2B1-0x2C8` - Hell

The contents of this structure are as follows

| byte | bytesize | contents                                            |
| ---- | -------- | --------------------------------------------------- |
| 0    | 2 bytes  | {0x02, 0x01} Unknown purpose                        |
| 2    | 5 bytes  | Waypoint bitfield in order of least significant bit |
| 7    | 17 bytes | unknown                                             |

In the waypoint bitfield, a bit value of 1 means that the waypoint is enabled
It is in an order from lowest to highest, so 0 is Rogue encampment (ACT I) etc.
The first waypoint in each difficulty is always activated.

### NPC

TODO

### Stats

TODO (9-bit encoding)

### Items

Offset: Starts on 0x355

Items are stored in lists described by this header:

| Byte  | Size | Desc        |
| ----- | ---- | ----------- |
| 0x355 | 2    | "JM" header |
| 0x357 | 2    | Item Count  |

After this come N items. Each item starts with a basic 14-byte
structure. Many fields in this structure are not "byte-aligned"
and are described by their bit position and sizes.

| Bit | Size | Desc                                      |
| --- | ---- | ----------------------------------------- |
| 0   | 16   | "JM" (separate from the list header)      |
| 16  | 4    | ?                                         |
| 20  | 1    | Identified                                |
| 21  | 6    | ?                                         |
| 27  | 1    | Socketed                                  |
| 28  | 1    | ?                                         |
| 29  | 1    | Picked up since last save                 |
| 30  | 2    | ?                                         |
| 32  | 1    | Ear                                       |
| 33  | 1    | Starter Gear                              |
| 34  | 3    | ?                                         |
| 37  | 1    | Compact                                   |
| 38  | 1    | Ethereal                                  |
| 39  | 1    | ?                                         |
| 40  | 1    | Personalized                              |
| 41  | 1    | ?                                         |
| 42  | 1    | [Runeword](#runeword)                     |
| 43  | 15   | ?                                         |
| 58  | 3    | [Parent](#parent)                         |
| 61  | 4    | [Equipped](#equipped)                     |
| 65  | 4    | Column                                    |
| 69  | 3    | Row                                       |
| 72  | 1    | ?                                         |
| 73  | 3    | [Stash](#parent)                          |
| 76  | 4    | ?                                         |
| 80  | 24   | Type code (3 letters)                     |
| 108 |      | [Extended Item Data](#extended-item-data) |

### Extended Item Data

If the item is marked as `Compact` (bit 37 is set) no extended
item information will exist and the item is finished.

Items with extended information store bits based on information in the item header. For example, an item marked as `Socketed` will store an
extra 3-bit integer encoding how many sockets the item has.

| Bit | Size | Desc                                |
| --- | ---- | ----------------------------------- |
| 108 |      | [Sockets](#sockets)                 |
|     |      | [Custom Graphics](#custom-graphics) |
|     |      | [Class Specific](#class-specific)   |
|     |      | [Quality](#quality)                 |
|     |      | [Mods](#mods)                       |

### Custom Graphics

Custom graphics are denoted by a single bit, which if
set means a 3-bit number for the graphic index follows. If the
bit is not set the 3-bits are not present.

| Bit | Size | Desc                     |
| --- | ---- | ------------------------ |
| 0   | 1    | Item has custom graphics |
| 1   | 3    | Alternate graphic index  |

### Class Specific

Class items like Barbarian helms or Amazon bows have special
properties specific to those kinds of items. If the first bit
is empty the remaining 11 bits will not be present.

| Bit | Size | Desc                         |
| --- | ---- | ---------------------------- |
| 0   | 1    | Item has class specific data |
| 1   | 11   | Class specific bits          |

### Quality

Item quality is encoded as a 4-bit integer.

#### Low Quality

### Mods

After each item is a list of mods. The list is a series of key value
pairs where the key is a 9-bit number and the value depends on the key.
The list ends when key `511` (`0x1ff`) is found which is all 9-bits
being set.

Using the file `ItemStatCost.txt` as a tab-delimited CSV file you can
extract the `ID` column which maps to the 9-bit keys. The columns
`Save Bits` and `Param Bits` describe how large the mod is.

The only exception is min-max style modifiers which use the next row
in the CSV to store the "max" portion of the mod. The bit sizes of
these two can be different and you should sum them to get the total
size.

#### Runeword

TODO

#### Parent

All items are located somewhere and have a "parent" which
can be another item, such as when inserting a jewel.

| Value | Desc     |
| ----- | -------- |
| 0     | Stored   |
| 1     | Equipped |
| 2     | Belt     |
| 4     | Cursor   |
| 6     | Item     |

For items that are "stored" a 3-bit integer encoded starting at
bit 73 describes where to store the item:

| Value | Desc          |
| ----- | ------------- |
| 1     | Inventory     |
| 4     | Horadric Cube |
| 5     | Stash         |

### Equipped

Items that are equipped describe their slot:

| Value | Slot                     |
| ----- | ------------------------ |
| 1     | Helmet                   |
| 2     | Amulet                   |
| 3     | Armor                    |
| 4     | Weapon (Right)           |
| 5     | Weapon (Left)            |
| 6     | Ring (Right)             |
| 7     | Ring (Left)              |
| 8     | Belt                     |
| 9     | Boots                    |
| 10    | Gloves                   |
| 11    | Alternate Weapon (Right) |
| 12    | Alternate Weapon (Left)  |

### Sockets
