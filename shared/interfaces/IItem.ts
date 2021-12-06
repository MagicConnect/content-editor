
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
}

export interface IItem {
  name: string;
  art: string;
  description: string;
  sellValue: number;
  itemType: ItemType;

  cosmeticCharacterFor?: string;
}