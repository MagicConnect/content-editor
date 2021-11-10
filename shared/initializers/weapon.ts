import { Archetype, ItemType, IWeapon, Stat } from '../interfaces';

export const newWeapon = (): IWeapon => ({
  name: '',
  itemType: ItemType.Weapon,
  sellValue: 100,
  description: '',
  stars: 1,
  primaryStat: Stat.Attack,
  secondaryStat: '' as any,

  abilities: [],

  lbRewards: {
    abilities: {},
    statPoints: {
      [Archetype.Archer]: 0,
      [Archetype.Attacker]: 0,
      [Archetype.Caster]: 0,
      [Archetype.Defender]: 0,
      [Archetype.Healer]: 0,
    },
    stats: {
      [Stat.Attack]: 0,
      [Stat.Defense]: 0,
      [Stat.Magic]: 0,
      [Stat.Special]: 0,

      [Stat.Accuracy]: 0,
      [Stat.Critical]: 0,
      [Stat.HP]: 0,
      [Stat.MP]: 0,
      [Stat.MagicEvasion]: 0,
      [Stat.MeleeEvasion]: 0,
    },
    skills: {}
  }
});