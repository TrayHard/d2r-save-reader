import TsvReader from "./read-utils/tsvreader";
import { ArmorTsvRow, GemsTsvRow, ItemStatCostTsvRow, ItemTypesTsvRow, MagicAffixTsvRow, MiscTsvRow, PropertiesTsvRow, RareAffixTsvRow, RunesTsvRow, SetItemsTsvRow, TsvReaderResult, UniqueTsvRow, WeaponTsvRow } from "./types";

const tsvReader = new TsvReader();

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

function initializeReader(constants: unknown) {
  // check if constants is an object
  if (typeof constants !== "object" || constants === null) {
    throw new Error("Constants must be an object");
  }

  // check if constants has the required properties
  if (typeof constants.rareprefix !== "object" || constants.rareprefix === null) {
    throw new Error("Constants must have a rareprefix property");
  }
  if (typeof constants.magicprefix !== "object" || constants.magicprefix === null) {
    throw new Error("Constants must have a magicprefix property");
  }
  if (typeof constants.magicsuffix !== "object" || constants.magicsuffix === null) {
    throw new Error("Constants must have a magicsuffix property");
  }
  if (typeof constants.properties !== "object" || constants.properties === null) {
    throw new Error("Constants must have a properties property");
  }
  if (typeof constants.itemstatcost !== "object" || constants.itemstatcost === null) {
    throw new Error("Constants must have a itemstatcost property");
  }
  if (typeof constants.runes !== "object" || constants.runes === null) {
    throw new Error("Constants must have a runes property");
  }
  if (typeof constants.setitems !== "object" || constants.setitems === null) {
    throw new Error("Constants must have a setitems property");
  }
}

export default initializeReader;