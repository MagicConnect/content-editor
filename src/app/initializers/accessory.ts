import { IAccessory, ItemType, Stat } from '@magicconnect/content-interfaces';

export const newAccessory = (): IAccessory => ({
  id: '',
  name: '',
  art: '',
  itemType: ItemType.Accessory,
  sellValue: 100,
  description: '',
  stars: 1,
  primaryStat: Stat.Defense,

  abilities: [],
  allowedExtraDupeItems: []
});
