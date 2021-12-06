
import { Archetype, Stat, Weapon, ICharacter } from '../interfaces';

export const newCharacter = (): ICharacter => ({
  name: '',
  art: '',
  spritesheet: '',
  
  stars: 3,
  primaryStat: Stat.Attack,
  archetype: Archetype.Ranger,
  weapon: Weapon.Bow,

  basePoints: {
    [Archetype.Attacker]: 0,
    [Archetype.Caster]: 0,
    [Archetype.Defender]: 0,
    [Archetype.Healer]: 0,
    [Archetype.Ranger]: 0,
  },

  baseStats: {
    [Stat.Attack]: 0,
    [Stat.Defense]: 0,
    [Stat.Magic]: 0,
    [Stat.Special]: 0,

    [Stat.Accuracy]: 90,
    [Stat.Critical]: 5,
    [Stat.HP]: 0,
    [Stat.MP]: 0,
    [Stat.MagicEvasion]: 0,
    [Stat.MeleeEvasion]: 0,
  },

  levelPoints: {
    [Archetype.Attacker]: 0,
    [Archetype.Caster]: 0,
    [Archetype.Defender]: 0,
    [Archetype.Healer]: 0,
    [Archetype.Ranger]: 0,
  },

  levelStats: {
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

  lbPoints: {
    [Archetype.Attacker]: 0,
    [Archetype.Caster]: 0,
    [Archetype.Defender]: 0,
    [Archetype.Healer]: 0,
    [Archetype.Ranger]: 0,
  },

  lbStats: {
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

  abilities: [],

  skills: [],

  specialSkill: ''
});