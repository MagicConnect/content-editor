import { IAccessory, ItemType, Stat } from 'content-interfaces';

console.log(ItemType);

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