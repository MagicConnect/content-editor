
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
  Sticker = 'Sticker'
}

export interface IItem {
  name: string;
  art: string;
  description: string;
  sellValue: number;
  itemType: ItemType;
}