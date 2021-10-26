
import { Archetype, PrimaryStat, SecondaryStat, Weapon } from '../interfaces';
import { ICharacter } from '../interfaces/ICharacter';

export const newCharacter = (): ICharacter => ({
  name: 'Character Name',
  stars: 1,
  primaryStat: PrimaryStat.Attack,
  archetype: Archetype.Archer,
  weapon: Weapon.Bow,

  baseStats: {
    [PrimaryStat.Attack]: 0,
    [PrimaryStat.Defense]: 0,
    [PrimaryStat.Magic]: 0,
    [PrimaryStat.Special]: 0,

    [SecondaryStat.Accuracy]: 0,
    [SecondaryStat.Critical]: 0,
    [SecondaryStat.HP]: 0,
    [SecondaryStat.MP]: 0,
    [SecondaryStat.MagicEvasion]: 0,
    [SecondaryStat.MeleeEvasion]: 0,
  },

  levelStats: {
    [PrimaryStat.Attack]: 0,
    [PrimaryStat.Defense]: 0,
    [PrimaryStat.Magic]: 0,
    [PrimaryStat.Special]: 0,

    [SecondaryStat.Accuracy]: 0,
    [SecondaryStat.Critical]: 0,
    [SecondaryStat.HP]: 0,
    [SecondaryStat.MP]: 0,
    [SecondaryStat.MagicEvasion]: 0,
    [SecondaryStat.MeleeEvasion]: 0,
  },

  abilities: [],

  skills: [],

  specialSkill: {
    name: '',
    description: '',
    cooldown: 0,
    hpCost: 0,
    mpCost: 0,
    spcCost: 0,
    actions: []
  },

  lbRewards: {
    abilities: {},
    stats: {
      [PrimaryStat.Attack]: 0,
      [PrimaryStat.Defense]: 0,
      [PrimaryStat.Magic]: 0,
      [PrimaryStat.Special]: 0,

      [SecondaryStat.Accuracy]: 0,
      [SecondaryStat.Critical]: 0,
      [SecondaryStat.HP]: 0,
      [SecondaryStat.MP]: 0,
      [SecondaryStat.MagicEvasion]: 0,
      [SecondaryStat.MeleeEvasion]: 0,
    },
    skills: {}
  }
});