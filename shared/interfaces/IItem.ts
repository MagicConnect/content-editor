
export enum ItemType {
  None = 'None',
  
  Weapon = 'Weapon',
  Chip = 'Chip',
  ShopToken = 'ShopToken',

  WeaponThreeStarDraw = 'WeaponThreeStarDraw',
  WeaponFourStarDraw = 'WeaponFourStarDraw',
  WeaponFiveStarDraw = 'WeaponFiveStarDraw',

  ChipThreeStarDraw = 'ChipThreeStarDraw',
  ChipFourStarDraw = 'ChipFourStarDraw',
  ChipFiveStarDraw = 'ChipFiveStarDraw',

  CharacterThreeStarDraw = 'CharacterThreeStarDraw',
  CharacterFourStarDraw = 'CharacterFourStarDraw',
  CharacterFiveStarDraw = 'CharacterFiveStarDraw',

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
}

export interface IItem {
  name: string;
  art: string;
  description: string;
  sellValue: number;
  itemType: ItemType;

  cosmeticCharacterFor?: string;
}