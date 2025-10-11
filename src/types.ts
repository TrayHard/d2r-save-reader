export type TsvReaderResult<T> = {
  headers: string[];
  rows: T extends Record<string, string> ? T[] : never;
};

export type ArmorTsvRow = {
  name: string;
  version: string;
  compactsave: string;
  rarity: string;
  spawnable: string;
  minac: string;
  maxac: string;
  speed: string;
  reqstr: string;
  reqdex: string;
  block: string;
  durability: string;
  nodurability: string;
  level: string;
  ShowLevel: string;
  levelreq: string;
  cost: string;
  "gamble cost": string;
  code: string;
  namestr: string;
  "magic lvl": string;
  "auto prefix": string;
  alternategfx: string;
  normcode: string;
  ubercode: string;
  ultracode: string;
  component: string;
  invwidth: string;
  invheight: string;
  hasinv: string;
  gemsockets: string;
  gemapplytype: string;
  flippyfile: string;
  invfile: string;
  uniqueinvfile: string;
  setinvfile: string;
  rArm: string;
  lArm: string;
  Torso: string;
  Legs: string;
  rSPad: string;
  lSPad: string;
  useable: string;
  stackable: string;
  minstack: string;
  maxstack: string;
  spawnstack: string;
  Transmogrify: string;
  TMogType: string;
  TMogMin: string;
  TMogMax: string;
  type: string;
  type2: string;
  dropsound: string;
  dropsfxframe: string;
  usesound: string;
  unique: string;
  transparent: string;
  transtbl: string;
  "*quivered": string;
  lightradius: string;
  belt: string;
  quest: string;
  questdiffcheck: string;
  missiletype: string;
  durwarning: string;
  qntwarning: string;
  mindam: string;
  maxdam: string;
  StrBonus: string;
  DexBonus: string;
  gemoffset: string;
  bitfield1: string;
  CharsiMin: string;
  CharsiMax: string;
  CharsiMagicMin: string;
  CharsiMagicMax: string;
  CharsiMagicLvl: string;
  GheedMin: string;
  GheedMax: string;
  GheedMagicMin: string;
  GheedMagicMax: string;
  GheedMagicLvl: string;
  AkaraMin: string;
  AkaraMax: string;
  AkaraMagicMin: string;
  AkaraMagicMax: string;
  AkaraMagicLvl: string;
  FaraMin: string;
  FaraMax: string;
  FaraMagicMin: string;
  FaraMagicMax: string;
  FaraMagicLvl: string;
  LysanderMin: string;
  LysanderMax: string;
  LysanderMagicMin: string;
  LysanderMagicMax: string;
  LysanderMagicLvl: string;
  DrognanMin: string;
  DrognanMax: string;
  DrognanMagicMin: string;
  DrognanMagicMax: string;
  DrognanMagicLvl: string;
  HratliMin: string;
  HratliMax: string;
  HratliMagicMin: string;
  HratliMagicMax: string;
  HratliMagicLvl: string;
  AlkorMin: string;
  AlkorMax: string;
  AlkorMagicMin: string;
  AlkorMagicMax: string;
  AlkorMagicLvl: string;
  OrmusMin: string;
  OrmusMax: string;
  OrmusMagicMin: string;
  OrmusMagicMax: string;
  OrmusMagicLvl: string;
  ElzixMin: string;
  ElzixMax: string;
  ElzixMagicMin: string;
  ElzixMagicMax: string;
  ElzixMagicLvl: string;
  AshearaMin: string;
  AshearaMax: string;
  AshearaMagicMin: string;
  AshearaMagicMax: string;
  AshearaMagicLvl: string;
  CainMin: string;
  CainMax: string;
  CainMagicMin: string;
  CainMagicMax: string;
  CainMagicLvl: string;
  HalbuMin: string;
  HalbuMax: string;
  HalbuMagicMin: string;
  HalbuMagicMax: string;
  HalbuMagicLvl: string;
  JamellaMin: string;
  JamellaMax: string;
  JamellaMagicMin: string;
  JamellaMagicMax: string;
  JamellaMagicLvl: string;
  LarzukMin: string;
  LarzukMax: string;
  LarzukMagicMin: string;
  LarzukMagicMax: string;
  LarzukMagicLvl: string;
  MalahMin: string;
  MalahMax: string;
  MalahMagicMin: string;
  MalahMagicMax: string;
  MalahMagicLvl: string;
  AnyaMin: string;
  AnyaMax: string;
  AnyaMagicMin: string;
  AnyaMagicMax: string;
  AnyaMagicLvl: string;
  Transform: string;
  InvTrans: string;
  SkipName: string;
  NightmareUpgrade: string;
  HellUpgrade: string;
  Nameable: string;
  PermStoreItem: string;
  diablocloneweight: string;
};

export type GemsTsvRow = {
  name: string;
  letter: string;
  transform: string;
  code: string;
  weaponMod1Code: string;
  weaponMod1Param: string;
  weaponMod1Min: string;
  weaponMod1Max: string;
  weaponMod2Code: string;
  weaponMod2Param: string;
  weaponMod2Min: string;
  weaponMod2Max: string;
  weaponMod3Code: string;
  weaponMod3Param: string;
  weaponMod3Min: string;
  weaponMod3Max: string;
  helmMod1Code: string;
  helmMod1Param: string;
  helmMod1Min: string;
  helmMod1Max: string;
  helmMod2Code: string;
  helmMod2Param: string;
  helmMod2Min: string;
  helmMod2Max: string;
  helmMod3Code: string;
  helmMod3Param: string;
  helmMod3Min: string;
  helmMod3Max: string;
  shieldMod1Code: string;
  shieldMod1Param: string;
  shieldMod1Min: string;
  shieldMod1Max: string;
  shieldMod2Code: string;
  shieldMod2Param: string;
  shieldMod2Min: string;
  shieldMod2Max: string;
  shieldMod3Code: string;
  shieldMod3Param: string;
  shieldMod3Min: string;
  shieldMod3Max: string;
};

export type ItemStatCostTsvRow = {
  Stat: string;
  "*ID": string;
  "Send Other": string;
  Signed: string;
  "Send Bits": string;
  "Send Param Bits": string;
  UpdateAnimRate: string;
  Saved: string;
  CSvSigned: string;
  CSvBits: string;
  CSvParam: string;
  fCallback: string;
  fMin: string;
  MinAccr: string;
  Encode: string;
  Add: string;
  Multiply: string;
  ValShift: string;
  "1.09-Save Bits": string;
  "1.09-Save Add": string;
  "Save Bits": string;
  "Save Add": string;
  "Save Param Bits": string;
  keepzero: string;
  op: string;
  "op param": string;
  "op base": string;
  "op stat1": string;
  "op stat2": string;
  "op stat3": string;
  direct: string;
  maxstat: string;
  damagerelated: string;
  itemevent1: string;
  itemeventfunc1: string;
  itemevent2: string;
  itemeventfunc2: string;
  descpriority: string;
  descfunc: string;
  descval: string;
  descstrpos: string;
  descstrneg: string;
  descstr2: string;
  dgrp: string;
  dgrpfunc: string;
  dgrpval: string;
  dgrpstrpos: string;
  dgrpstrneg: string;
  dgrpstr2: string;
  stuff: string;
  advdisplay: string;
  "*eol": string;
};

export type ItemTypesTsvRow = {
  ItemType: string;
  Code: string;
  Equiv1: string;
  Equiv2: string;
  Repair: string;
  Body: string;
  BodyLoc1: string;
  BodyLoc2: string;
  Shoots: string;
  Quiver: string;
  Throwable: string;
  Reload: string;
  ReEquip: string;
  AutoStack: string;
  Magic: string;
  Rare: string;
  Normal: string;
  Beltable: string;
  MaxSockets1: string;
  MaxSocketsLevelThreshold1: string;
  MaxSockets2: string;
  MaxSocketsLevelThreshold2: string;
  MaxSockets3: string;
  TreasureClass: string;
  Rarity: string;
  StaffMods: string;
  Class: string;
  VarInvGfx: string;
  InvGfx1: string;
  InvGfx2: string;
  InvGfx3: string;
  InvGfx4: string;
  InvGfx5: string;
  InvGfx6: string;
  StorePage: string;
  "*eol": string;
};

export type MagicAffixTsvRow = {
  Name: string;
  version: string;
  spawnable: string;
  rare: string;
  level: string;
  maxlevel: string;
  levelreq: string;
  classspecific: string;
  class: string;
  classlevelreq: string;
  frequency: string;
  group: string;
  mod1code: string;
  mod1param: string;
  mod1min: string;
  mod1max: string;
  mod2code: string;
  mod2param: string;
  mod2min: string;
  mod2max: string;
  mod3code: string;
  mod3param: string;
  mod3min: string;
  mod3max: string;
  transformcolor: string;
  itype1: string;
  itype2: string;
  itype3: string;
  itype4: string;
  itype5: string;
  itype6: string;
  itype7: string;
  etype1: string;
  etype2: string;
  etype3: string;
  etype4: string;
  etype5: string;
  multiply: string;
  add: string;
};

export type MiscTsvRow = {
  name: string;
  compactsave: string;
  version: string;
  level: string;
  ShowLevel: string;
  levelreq: string;
  reqstr: string;
  reqdex: string;
  rarity: string;
  spawnable: string;
  speed: string;
  nodurability: string;
  cost: string;
  "gamble cost": string;
  code: string;
  alternategfx: string;
  namestr: string;
  component: string;
  invwidth: string;
  invheight: string;
  hasinv: string;
  gemsockets: string;
  gemapplytype: string;
  flippyfile: string;
  invfile: string;
  uniqueinvfile: string;
  Transmogrify: string;
  TMogType: string;
  TMogMin: string;
  TMogMax: string;
  useable: string;
  type: string;
  type2: string;
  dropsound: string;
  dropsfxframe: string;
  usesound: string;
  unique: string;
  transparent: string;
  transtbl: string;
  lightradius: string;
  belt: string;
  autobelt: string;
  stackable: string;
  minstack: string;
  maxstack: string;
  spawnstack: string;
  quest: string;
  questdiffcheck: string;
  missiletype: string;
  spellicon: string;
  pSpell: string;
  state: string;
  cstate1: string;
  cstate2: string;
  len: string;
  stat1: string;
  calc1: string;
  stat2: string;
  calc2: string;
  stat3: string;
  calc3: string;
  spelldesc: string;
  spelldescstr: string;
  spelldescstr2: string;
  spelldesccalc: string;
  spelldesccolor: string;
  durwarning: string;
  qntwarning: string;
  gemoffset: string;
  BetterGem: string;
  bitfield1: string;
  CharsiMin: string;
  CharsiMax: string;
  CharsiMagicMin: string;
  CharsiMagicMax: string;
  CharsiMagicLvl: string;
  GheedMin: string;
  GheedMax: string;
  GheedMagicMin: string;
  GheedMagicMax: string;
  GheedMagicLvl: string;
  AkaraMin: string;
  AkaraMax: string;
  AkaraMagicMin: string;
  AkaraMagicMax: string;
  AkaraMagicLvl: string;
  FaraMin: string;
  FaraMax: string;
  FaraMagicMin: string;
  FaraMagicMax: string;
  FaraMagicLvl: string;
  LysanderMin: string;
  LysanderMax: string;
  LysanderMagicMin: string;
  LysanderMagicMax: string;
  LysanderMagicLvl: string;
  DrognanMin: string;
  DrognanMax: string;
  DrognanMagicMin: string;
  DrognanMagicMax: string;
  DrognanMagicLvl: string;
  HratliMin: string;
  HratliMax: string;
  HratliMagicMin: string;
  HratliMagicMax: string;
  HratliMagicLvl: string;
  AlkorMin: string;
  AlkorMax: string;
  AlkorMagicMin: string;
  AlkorMagicMax: string;
  AlkorMagicLvl: string;
  OrmusMin: string;
  OrmusMax: string;
  OrmusMagicMin: string;
  OrmusMagicMax: string;
  OrmusMagicLvl: string;
  ElzixMin: string;
  ElzixMax: string;
  ElzixMagicMin: string;
  ElzixMagicMax: string;
  ElzixMagicLvl: string;
  AshearaMin: string;
  AshearaMax: string;
  AshearaMagicMin: string;
  AshearaMagicMax: string;
  AshearaMagicLvl: string;
  CainMin: string;
  CainMax: string;
  CainMagicMin: string;
  CainMagicMax: string;
  CainMagicLvl: string;
  HalbuMin: string;
  HalbuMax: string;
  HalbuMagicMin: string;
  HalbuMagicMax: string;
  HalbuMagicLvl: string;
  MalahMin: string;
  MalahMax: string;
  MalahMagicMin: string;
  MalahMagicMax: string;
  MalahMagicLvl: string;
  LarzukMin: string;
  LarzukMax: string;
  LarzukMagicMin: string;
  LarzukMagicMax: string;
  LarzukMagicLvl: string;
  AnyaMin: string;
  AnyaMax: string;
  AnyaMagicMin: string;
  AnyaMagicMax: string;
  AnyaMagicLvl: string;
  JamellaMin: string;
  JamellaMax: string;
  JamellaMagicMin: string;
  JamellaMagicMax: string;
  JamellaMagicLvl: string;
  Transform: string;
  InvTrans: string;
  SkipName: string;
  NightmareUpgrade: string;
  HellUpgrade: string;
  mindam: string;
  maxdam: string;
  PermStoreItem: string;
  multibuy: string;
  Nameable: string;
  diablocloneweight: string;
};

export type PropertiesTsvRow = {
  code: string;
  "*Enabled": string;
  func1: string;
  stat1: string;
  set1: string;
  val1: string;
  func2: string;
  stat2: string;
  set2: string;
  val2: string;
  func3: string;
  stat3: string;
  set3: string;
  val3: string;
  func4: string;
  stat4: string;
  set4: string;
  val4: string;
  func5: string;
  stat5: string;
  set5: string;
  val5: string;
  func6: string;
  stat6: string;
  set6: string;
  val6: string;
  func7: string;
  stat7: string;
  set7: string;
  val7: string;
  "*Tooltip": string;
  "*Parameter": string;
  "*Min": string;
  "*Max": string;
  "*Notes": string;
  "*eol": string;
};

export type RareAffixTsvRow = {
  name: string;
  version: string;
  itype1: string;
  itype2: string;
  itype3: string;
  itype4: string;
  itype5: string;
  itype6: string;
  itype7: string;
  etype1: string;
  etype2: string;
  etype3: string;
  etype4: string;
};

export type RunesTsvRow = {
  Name: string;
  "*Rune Name": string;
  complete: string;
  firstLadderSeason: string;
  lastLadderSeason: string;
  "*Patch Release": string;
  itype1: string;
  itype2: string;
  itype3: string;
  itype4: string;
  itype5: string;
  itype6: string;
  etype1: string;
  etype2: string;
  etype3: string;
  "*RunesUsed": string;
  Rune1: string;
  Rune2: string;
  Rune3: string;
  Rune4: string;
  Rune5: string;
  Rune6: string;
  T1Code1: string;
  T1Param1: string;
  T1Min1: string;
  T1Max1: string;
  T1Code2: string;
  T1Param2: string;
  T1Min2: string;
  T1Max2: string;
  T1Code3: string;
  T1Param3: string;
  T1Min3: string;
  T1Max3: string;
  T1Code4: string;
  T1Param4: string;
  T1Min4: string;
  T1Max4: string;
  T1Code5: string;
  T1Param5: string;
  T1Min5: string;
  T1Max5: string;
  T1Code6: string;
  T1Param6: string;
  T1Min6: string;
  T1Max6: string;
  T1Code7: string;
  T1Param7: string;
  T1Min7: string;
  T1Max7: string;
  "*eol": string;
};

export type SetItemsTsvRow = {
  "index": string;
  "*ID": string;
  "set": string;
  "item": string;
  "*ItemName": string;
  "rarity": string;
  "lvl": string;
  "lvl req": string;
  "chrtransform": string;
  "invtransform": string;
  "invfile": string;
  "flippyfile": string;
  "dropsound": string;
  "dropsfxframe": string;
  "usesound": string;
  "cost mult": string;
  "cost add": string;
  "add func": string;
  "prop1": string;
  "par1": string;
  "min1": string;
  "max1": string;
  "prop2": string;
  "par2": string;
  "min2": string;
  "max2": string;
  "prop3": string;
  "par3": string;
  "min3": string;
  "max3": string;
  "prop4": string;
  "par4": string;
  "min4": string;
  "max4": string;
  "prop5": string;
  "par5": string;
  "min5": string;
  "max5": string;
  "prop6": string;
  "par6": string;
  "min6": string;
  "max6": string;
  "prop7": string;
  "par7": string;
  "min7": string;
  "max7": string;
  "prop8": string;
  "par8": string;
  "min8": string;
  "max8": string;
  "prop9": string;
  "par9": string;
  "min9": string;
  "max9": string;
  "aprop1a": string;
  "apar1a": string;
  "amin1a": string;
  "amax1a": string;
  "aprop1b": string;
  "apar1b": string;
  "amin1b": string;
  "amax1b": string;
  "aprop2a": string;
  "apar2a": string;
  "amin2a": string;
  "amax2a": string;
  "aprop2b": string;
  "apar2b": string;
  "amin2b": string;
  "amax2b": string;
  "aprop3a": string;
  "apar3a": string;
  "amin3a": string;
  "amax3a": string;
  "aprop3b": string;
  "apar3b": string;
  "amin3b": string;
  "amax3b": string;
  "aprop4a": string;
  "apar4a": string;
  "amin4a": string;
  "amax4a": string;
  "aprop4b": string;
  "apar4b": string;
  "amin4b": string;
  "amax4b": string;
  "aprop5a": string;
  "apar5a": string;
  "amin5a": string;
  "amax5a": string;
  "aprop5b": string;
  "apar5b": string;
  "amin5b": string;
  "amax5b": string;
  "diablocloneweight": string;
  "*eol": string;
};

export type UniqueTsvRow = {
  index: string;
  "*ID": string;
  version: string;
  enabled: string;
  firstLadderSeason: string;
  lastLadderSeason: string;
  rarity: string;
  nolimit: string;
  lvl: string;
  "lvl req": string;
  code: string;
  "*ItemName": string;
  carry1: string;
  "cost mult": string;
  "cost add": string;
  chrtransform: string;
  invtransform: string;
  flippyfile: string;
  invfile: string;
  dropsound: string;
  dropsfxframe: string;
  usesound: string;
  prop1: string;
  par1: string;
  min1: string;
  max1: string;
  prop2: string;
  par2: string;
  min2: string;
  max2: string;
  prop3: string;
  par3: string;
  min3: string;
  max3: string;
  prop4: string;
  par4: string;
  min4: string;
  max4: string;
  prop5: string;
  par5: string;
  min5: string;
  max5: string;
  prop6: string;
  par6: string;
  min6: string;
  max6: string;
  prop7: string;
  par7: string;
  min7: string;
  max7: string;
  prop8: string;
  par8: string;
  min8: string;
  max8: string;
  prop9: string;
  par9: string;
  min9: string;
  max9: string;
  prop10: string;
  par10: string;
  min10: string;
  max10: string;
  prop11: string;
  par11: string;
  min11: string;
  max11: string;
  prop12: string;
  par12: string;
  min12: string;
  max12: string;
  diablocloneweight: string;
  "*eol": string;
};

export type WeaponTsvRow = {
  name: string;
  type: string;
  type2: string;
  code: string;
  alternategfx: string;
  namestr: string;
  version: string;
  compactsave: string;
  rarity: string;
  spawnable: string;
  Transmogrify: string;
  TMogType: string;
  TMogMin: string;
  TMogMax: string;
  mindam: string;
  maxdam: string;
  "1or2handed": string;
  "2handed": string;
  "2handmindam": string;
  "2handmaxdam": string;
  minmisdam: string;
  maxmisdam: string;
  rangeadder: string;
  speed: string;
  StrBonus: string;
  DexBonus: string;
  reqstr: string;
  reqdex: string;
  durability: string;
  nodurability: string;
  level: string;
  ShowLevel: string;
  levelreq: string;
  cost: string;
  "gamble cost": string;
  "magic lvl": string;
  "auto prefix": string;
  normcode: string;
  ubercode: string;
  ultracode: string;
  wclass: string;
  "2handedwclass": string;
  component: string;
  "hit class": string;
  invwidth: string;
  invheight: string;
  stackable: string;
  minstack: string;
  maxstack: string;
  spawnstack: string;
  flippyfile: string;
  invfile: string;
  uniqueinvfile: string;
  setinvfile: string;
  hasinv: string;
  gemsockets: string;
  gemapplytype: string;
  "*comment": string;
  useable: string;
  dropsound: string;
  dropsfxframe: string;
  usesound: string;
  unique: string;
  transparent: string;
  transtbl: string;
  "*quivered": string;
  lightradius: string;
  belt: string;
  quest: string;
  questdiffcheck: string;
  missiletype: string;
  durwarning: string;
  qntwarning: string;
  gemoffset: string;
  bitfield1: string;
  CharsiMin: string;
  CharsiMax: string;
  CharsiMagicMin: string;
  CharsiMagicMax: string;
  CharsiMagicLvl: string;
  GheedMin: string;
  GheedMax: string;
  GheedMagicMin: string;
  GheedMagicMax: string;
  GheedMagicLvl: string;
  AkaraMin: string;
  AkaraMax: string;
  AkaraMagicMin: string;
  AkaraMagicMax: string;
  AkaraMagicLvl: string;
  FaraMin: string;
  FaraMax: string;
  FaraMagicMin: string;
  FaraMagicMax: string;
  FaraMagicLvl: string;
  LysanderMin: string;
  LysanderMax: string;
  LysanderMagicMin: string;
  LysanderMagicMax: string;
  LysanderMagicLvl: string;
  DrognanMin: string;
  DrognanMax: string;
  DrognanMagicMin: string;
  DrognanMagicMax: string;
  DrognanMagicLvl: string;
  HratliMin: string;
  HratliMax: string;
  HratliMagicMin: string;
  HratliMagicMax: string;
  HratliMagicLvl: string;
  AlkorMin: string;
  AlkorMax: string;
  AlkorMagicMin: string;
  AlkorMagicMax: string;
  AlkorMagicLvl: string;
  OrmusMin: string;
  OrmusMax: string;
  OrmusMagicMin: string;
  OrmusMagicMax: string;
  OrmusMagicLvl: string;
  ElzixMin: string;
  ElzixMax: string;
  ElzixMagicMin: string;
  ElzixMagicMax: string;
  ElzixMagicLvl: string;
  AshearaMin: string;
  AshearaMax: string;
  AshearaMagicMin: string;
  AshearaMagicMax: string;
  AshearaMagicLvl: string;
  CainMin: string;
  CainMax: string;
  CainMagicMin: string;
  CainMagicMax: string;
  CainMagicLvl: string;
  HalbuMin: string;
  HalbuMax: string;
  HalbuMagicMin: string;
  HalbuMagicMax: string;
  HalbuMagicLvl: string;
  JamellaMin: string;
  JamellaMax: string;
  JamellaMagicMin: string;
  JamellaMagicMax: string;
  JamellaMagicLvl: string;
  LarzukMin: string;
  LarzukMax: string;
  LarzukMagicMin: string;
  LarzukMagicMax: string;
  LarzukMagicLvl: string;
  AnyaMin: string;
  AnyaMax: string;
  AnyaMagicMin: string;
  AnyaMagicMax: string;
  AnyaMagicLvl: string;
  MalahMin: string;
  MalahMax: string;
  MalahMagicMin: string;
  MalahMagicMax: string;
  MalahMagicLvl: string;
  Transform: string;
  InvTrans: string;
  SkipName: string;
  NightmareUpgrade: string;
  HellUpgrade: string;
  Nameable: string;
  PermStoreItem: string;
  diablocloneweight: string;
};

export type TEarAttributes = {
  class: number;
  level: number;
  name: string;
}

export type TItem = {
  version: string;
  identified: boolean;
  socketed: boolean;
  new: boolean;
  is_ear: boolean;
  starter_item: boolean;
  simple_item: boolean;
  ethereal: boolean;
  personalized: boolean;
  given_runeword: boolean;

  location_id: number;
  equipped_id: number;
  position_x: number;
  position_y: number;
  alt_position_id: number;

  ear_attributes: TEarAttributes;
}

export type TConstantClass = {
  id: number,
  n: string,
  c: string,
  as: string,
  ts: string[],
  co: string,
  s: {
    lpl: number,
    mpl: number,
    spl: number,
    lpv: number,
    spv: number,
    mpe: number,
  },
  a: {
    str: number,
    dex: number,
    int: number,
    vit: number,
    stam: number,
    hpadd: string,
  }
}

export type TConstantSkill = {
  id: number,
  s: string,
  n: string,
  c?: string,
}

export type TConstantRareName = {
  id: number,
  n?: string,
  tc?: string,
}

export type TConstantMagicPrefix = {
  id: number,
  n?: string,
  tc?: string,
}

export type TConstantPropertyNode = {
  type: string,
  s?: string,
  f: number,
  val?: number,
}

export type TConstantMagicalProperty = {
  id: number,
  s: string,
  e?: number,
  cB?: number,
  cS?: number,
  sS?: number,
  sB?: number,
  sA?: number,
  sP?: number,
  so?: number,
  dF?: number,
  dV?: number,
  dP?: string,
  dN?: string,
  dg?: number,
  dgF?: number,
  dgP?: string,
  d2?: string,
  o?: number,
  op?: number,
  ob?: string,
  os?: string[],
  vS?: number,
  np?: number,
  dR?: string,
  dE?: string,
}

type TMagicalPropertyOnItem = { prop: string, p?: number, min?: number, max?: number };

export type TConstantRuneword = {
  id: number,
  n?: string,
  types?: string[],
  r?: string[],
  m: Array<TMagicalPropertyOnItem>
}

export type TConstantSetItem = {
  id: number,
  n?: string,
  i?: string,
  c?: string,
  tc?: string,
  lvl?: string,
  m: Array<TMagicalPropertyOnItem>
}

export type TConstantUniqueItem = {
  id: number,
  n?: string,
  i?: string,
  c?: string,
  tc?: string,
  lvl?: string,
  m: Array<TMagicalPropertyOnItem>
}

// Throwables, keys, bolts, arrows, tomes, etc.
export type TConstantStackableItem = {
  n?: string,
}

export type TConstantArmorItem = {
  nc: string,
  exc?: string,
  elc?: string,
  iq?: number,
  n?: string,
  minac?: number,
  maxac?: number,
  durability?: number,
  mind?: number,
  maxd?: number,
  rs?: number,
  rd?: number,
  hi?: number,
  gt?: number,
  i?: string,
  ui?: string,
  si?: string,
  iw?: number,
  ih?: number,
  it?: number,
  type?: string,
  lvl?: string,
  gemsockets?: number,
  spawnable?: number,
  nodurability?: number,
  ig: string[],
  eq1n?: string,
  eq2n?: string,
  c: string[],
}

export type TConstantWeaponItem = {
  nc: string,
  exc?: string,
  elc?: string,
  iq?: number,
  n?: string,
  s?: number,
  durability?: number,
  mind?: number,
  maxd?: number,
  minmd?: number,
  maxmd?: number,
  min2d?: number,
  max2d?: number,
  rs?: number,
  rd?: number,
  hi?: number,
  gt?: number,
  i?: string,
  ui?: string,
  si?: string,
  iw?: number,
  ih?: number,
  it?: number,
  type?: string,
  lvl?: string,
  gemsockets?: number,
  spawnable?: number,
  handed1or2?: number,
  handed2?: number,
  nodurability?: number,
  ig?: string[],
  eq1n?: string,
  eq2n?: string,
  c: string[],
}

export type TConstantMiscItem = {
  iq: number,
  n?: string,
  s?: number,
  hi?: number,
  gt?: number,
  i?: string,
  ui?: string,
  iw?: number,
  ih?: number,
  it?: number,
  type?: string,
  lvl?: string,
  gemsockets?: number,
  spawnable?: number,
  nodurability?: number,
  ig: string[],
  eq1n?: string,
  eq2n?: string,
  c: string[],
  m?: Array<Array<TMagicalPropertyOnItem> | null>
}

export type TConstantData = {
  classes: Array<TConstantClass>;
  skills: Array<TConstantSkill>;
  rare_names: Array<TConstantRareName | null>;
  magic_prefixes: Array<TConstantMagicPrefix | null>;
  magic_suffixes: Array<TConstantMagicPrefix | null>;
  properties: Record<string, Array<TConstantPropertyNode>>;
  magical_properties: Array<TConstantMagicalProperty>;
  runewords: Array<TConstantRuneword | null>;
  set_items: Array<TConstantSetItem>;
  unq_items: Array<TConstantUniqueItem>;
  stackables: Record<string, TConstantStackableItem>;
  armor_items: Record<string, TConstantArmorItem>;
  weapon_items: Record<string, TConstantWeaponItem>;
  other_items: Record<string, TConstantMiscItem>;
}