import { IAccessory, ItemType, Stat } from '../interfaces';

export const newAccessory = (): IAccessory => ({
  name: '',
  art: '',
  itemType: ItemType.Accessory,
  sellValue: 100,
  description: '',
  stars: 1,
  primaryStat: Stat.Defense,

  abilities: []
});