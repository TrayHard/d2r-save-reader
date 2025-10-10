import { ArmorTsvRow, GemsTsvRow, ItemStatCostTsvRow, ItemTypesTsvRow, MagicAffixTsvRow, MiscTsvRow, PropertiesTsvRow, RareAffixTsvRow, RunesTsvRow, SetItemsTsvRow, TsvReaderResult, UniqueTsvRow, WeaponTsvRow } from "./types";
// const rareprefix = tsvReader.readFileSync("global/excel/rareprefix.txt");
// const magicprefix = tsvReader.readFileSync("global/excel/magicprefix.txt");
// const magicsuffix = tsvReader.readFileSync("global/excel/magicsuffix.txt");
// const properties = tsvReader.readFileSync("global/excel/properties.txt");
// const itemstatcost = tsvReader.readFileSync("global/excel/itemstatcost.txt");
// const runes = tsvReader.readFileSync("global/excel/runes.txt");
// const setitems = tsvReader.readFileSync("global/excel/setitems.txt");

type Constants = {
  armor: TsvReaderResult<ArmorTsvRow>;
  gems: TsvReaderResult<GemsTsvRow>;
  itemstatcost: TsvReaderResult<ItemStatCostTsvRow>;
  itemtypes: TsvReaderResult<ItemTypesTsvRow>;
  magicprefix: TsvReaderResult<MagicAffixTsvRow>;
  magicsuffix: TsvReaderResult<MagicAffixTsvRow>;
  misc: TsvReaderResult<MiscTsvRow>;
  properties: TsvReaderResult<PropertiesTsvRow>;
  rareprefix: TsvReaderResult<RareAffixTsvRow>;
  raresuffix: TsvReaderResult<RareAffixTsvRow>;
  runes: TsvReaderResult<RunesTsvRow>;
  setitems: TsvReaderResult<SetItemsTsvRow>;
  uniqueitems: TsvReaderResult<UniqueTsvRow>;
  weapon: TsvReaderResult<WeaponTsvRow>;
};

type UnknownRecord = Record<string, unknown>;

function isObject(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null;
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((v) => typeof v === "string");
}

function isRecordOfStringValues(value: unknown): value is Record<string, string> {
  if (!isObject(value)) return false;
  return Object.values(value).every((v) => typeof v === "string");
}

function isTsvReaderResult(value: unknown): value is TsvReaderResult<Record<string, string>> {
  if (!isObject(value)) return false;
  const record = value as UnknownRecord;
  const headers = record.headers;
  const rows = record.rows;
  return isStringArray(headers) && Array.isArray(rows) && rows.every((row) => isRecordOfStringValues(row));
}

export function isConstants(value: unknown): value is Constants {
  if (!isObject(value)) return false;
  const v = value as UnknownRecord;
  return (
    isTsvReaderResult(v.armor) &&
    isTsvReaderResult(v.gems) &&
    isTsvReaderResult(v.itemstatcost) &&
    isTsvReaderResult(v.itemtypes) &&
    isTsvReaderResult(v.magicprefix) &&
    isTsvReaderResult(v.magicsuffix) &&
    isTsvReaderResult(v.misc) &&
    isTsvReaderResult(v.properties) &&
    isTsvReaderResult(v.rareprefix) &&
    isTsvReaderResult(v.raresuffix) &&
    isTsvReaderResult(v.runes) &&
    isTsvReaderResult(v.setitems) &&
    isTsvReaderResult(v.uniqueitems) &&
    isTsvReaderResult(v.weapon)
  );
}

function initializeReader(constants: unknown) {
  if (!isConstants(constants)) {
    throw new Error("Constants structure does not match expected shape");
  }
}

export default initializeReader;