import { ItemType, IWeapon, Stat, Weapon } from '@magicconnect/content-interfaces';

export const newWeapon = (): IWeapon => ({
  id: '',
  name: '',
  art: '',
  itemType: ItemType.Weapon,
  weaponType: Weapon.Axe,
  sellValue: 100,
  description: '',
  stars: 1,
  primaryStat: Stat.Attack,
  secondaryStat: '' as any,

  abilities: [],
  allowedExtraDupeItems: []
});
