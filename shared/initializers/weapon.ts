import { Archetype, ItemType, IWeapon, Stat } from '../interfaces';

export const newWeapon = (): IWeapon => ({
  name: '',
  itemType: ItemType.Weapon,
  sellValue: 100,
  description: '',
  stars: 1,
  primaryStat: Stat.Attack,
  secondaryStat: '' as any,

  abilities: []
});