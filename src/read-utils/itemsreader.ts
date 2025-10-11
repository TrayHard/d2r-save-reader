import { TEarAttributes, TItem } from "../types";
import { BitReader } from "./bitreader";
import { HUFFMAN } from "./huffman";

export class ItemsReader {
  private reader: BitReader;
  private itemCount: number;

  constructor(reader: BitReader, offset?: number) {
    if (offset) {
      reader.SeekByte(offset);
    }
    if (reader.ReadUInt16() !== 0x4A4D) {
      throw new Error('Invalid item header');
    }
    this.reader = reader;
    this.itemCount = reader.ReadUInt16();
  }

  public readItems() {
    const items = [];
    for (let i = 0; i < this.itemCount; i++) {
      items.push(this.readItem());
    }
    return items;
  }

  public readItem() {
    const item = {} as TItem;
    this.readItemFlags(item);
    return item;
  }

  private readItemFlags(item: TItem) {
    this.reader.SkipBits(4);
    item.identified = this.reader.ReadBit() === 1;
    this.reader.SkipBits(6);
    item.socketed = this.reader.ReadBit() === 1;
    this.reader.SkipBits(1);
    item.new = this.reader.ReadBit() === 1;
    this.reader.SkipBits(2);
    item.is_ear = this.reader.ReadBit() === 1;
    item.starter_item = this.reader.ReadBit() === 1;
    this.reader.SkipBits(3);
    item.simple_item = this.reader.ReadBit() === 1;
    item.ethereal = this.reader.ReadBit() === 1;
    this.reader.SkipBits(1);
    item.personalized = this.reader.ReadBit() === 1;
    this.reader.SkipBits(1);
    item.given_runeword = this.reader.ReadBit() === 1;
    this.reader.SkipBits(5);
    item.version = this.reader.ReadUInt16(3).toString(2);

    item.location_id = this.reader.ReadUInt8(3);
    item.equipped_id = this.reader.ReadUInt8(4);
    item.position_x = this.reader.ReadUInt8(4);
    item.position_y = this.reader.ReadUInt8(4);
    item.alt_position_id = this.reader.ReadUInt8(3);

    if (item.is_ear) {
      const charClass = this.reader.ReadUInt8(3);
      const level = this.reader.ReadUInt8(7);
      const arr = new Uint8Array(15);
      for (let i = 0; i < arr.length; i++) {
        arr[i] = this.reader.ReadUInt8(7);
        if (arr[i] === 0x00) {
          break;
        }
      }
      const name = BitReader.fromBuffer(Buffer.from(arr)).ReadString(15).trim().replace(/\0/g, "");
      item.ear_attributes = {
        class: charClass,
        level: level,
        name: name,
      } as TEarAttributes;
    } else {
      let itemType = "";
      //props to d07riv
      //https://github.com/d07RiV/d07riv.github.io/blob/master/d2r.html#L11-L20
      for (let i = 0; i < 4; i++) {
        let node = HUFFMAN as any;
        do {
          node = node[this.reader.ReadBit()];
        } while (Array.isArray(node));
        itemType += node;
      }
      itemType = itemType.trim().replace(/\0/g, "");
      // let details = _GetItemTXT(item, constants);
      // item.categories = details?.c;
      // if (item?.categories.includes("Any Armor")) {
      //   item.type_id = types.ItemType.Armor;
      // } else if (item?.categories.includes("Weapon")) {
      //   item.type_id = types.ItemType.Weapon;
      //   details = constants.weapon_items[item.type];
      // } else {
      //   item.type_id = types.ItemType.Other;
      // }

      // let bits = item.simple_item ? 1 : 3;
      // if (item.categories?.includes("Quest")) {
      //   item.quest_difficulty = reader.ReadUInt16(constants.magical_properties[356].sB) - constants.magical_properties[356].sA;
      //   bits = 1;
      // }
      // item.nr_of_items_in_sockets = reader.ReadUInt8(bits);
    }
  }
}