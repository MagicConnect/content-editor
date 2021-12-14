
export enum ItemType {
  None = 'None',
  
  Weapon = 'Weapon',
  Accessory = 'Accessory',
  ShopToken = 'ShopToken',

  WeaponThreeStarDraw = 'WeaponThreeStarDraw',
  WeaponFourStarDraw = 'WeaponFourStarDraw',
  WeaponFiveStarDraw = 'WeaponFiveStarDraw',

  AccessoryThreeStarDraw = 'AccessoryThreeStarDraw',
  AccessoryFourStarDraw = 'AccessoryFourStarDraw',
  AccessoryFiveStarDraw = 'AccessoryFiveStarDraw',

  CharacterThreeStarDraw = 'CharacterThreeStarDraw',
  CharacterFourStarDraw = 'CharacterFourStarDraw',
  CharacterFiveStarDraw = 'CharacterFiveStarDraw',
  CharacterFiveStarDrawChoose = 'CharacterFiveStarDrawChoose',

  Sticker = 'Sticker',

  CosmeticBackdrop = 'CosmeticBackdrop',
  CosmeticCharacter = 'CosmeticCharacter',
  CosmeticBanner = 'CosmeticBanner',

  LBSmall = 'LBSmall',
  LBMedium = 'LBMedium',
  LBLarge = 'LBLarge',

  EssenceHP = 'EssenceHP',
  EssenceMP = 'EssenceMP',
  EssenceATK = 'EssenceATK',
  EssenceDEF = 'EssenceDEF',
  EssenceMAG = 'EssenceMAG',
  EssenceSPC = 'EssenceSPC',
  EssenceCRT = 'EssenceCRT',

  ReinforcePurpleSmall = 'ReinforcePurpleSmall',
  ReinforcePurpleMedium = 'ReinforcePurpleMedium',
  ReinforcePurpleLarge = 'ReinforcePurpleLarge',

  ReinforceBlueSmall = 'ReinforceBlueSmall',
  ReinforceBlueMedium = 'ReinforceBlueMedium',
  ReinforceBlueLarge = 'ReinforceBlueLarge',

  ReinforceGreenSmall = 'ReinforceGreenSmall',
  ReinforceGreenMedium = 'ReinforceGreenMedium',
  ReinforceGreenLarge = 'ReinforceGreenLarge',

  ReinforceYellowSmall = 'ReinforceYellowSmall',
  ReinforceYellowMedium = 'ReinforceYellowMedium',
  ReinforceYellowLarge = 'ReinforceYellowLarge',

  ReinforceRedSmall = 'ReinforceRedSmall',
  ReinforceRedMedium = 'ReinforceRedMedium',
  ReinforceRedLarge = 'ReinforceRedLarge',

  ReinforceRainbowSmall = 'ReinforceRainbowSmall',
  ReinforceRainbowMedium = 'ReinforceRainbowMedium',
  ReinforceRainbowLarge = 'ReinforceRainbowLarge',

  XPWeaponSmall = 'XPWeaponSmall',
  XPWeaponMedium = 'XPWeaponMedium',
  XPWeaponLarge = 'XPWeaponLarge',

  XPCharacterSmall = 'XPCharacterSmall',
  XPCharacterMedium = 'XPCharacterMedium',
  XPCharacterLarge = 'XPCharacterLarge',

  XPChipSmall = 'XPChipSmall',
  XPChipMedium = 'XPChipMedium',
  XPChipLarge = 'XPChipLarge',
}

export interface IItem {
  name: string;
  art: string;
  description: string;
  sellValue: number;
  itemType: ItemType;

  cosmeticCharacterFor?: string;
}