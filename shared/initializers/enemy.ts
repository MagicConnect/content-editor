
import { Archetype, Stat, IEnemy } from '../interfaces';

export const newEnemy = (): IEnemy => ({
  name: '',

  primaryStat: Stat.Attack,

  basePoints: {
    [Archetype.Archer]: 0,
    [Archetype.Attacker]: 0,
    [Archetype.Caster]: 0,
    [Archetype.Defender]: 0,
    [Archetype.Healer]: 0,
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
    [Archetype.Archer]: 0,
    [Archetype.Attacker]: 0,
    [Archetype.Caster]: 0,
    [Archetype.Defender]: 0,
    [Archetype.Healer]: 0,
  },

  levelStats: {
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

  abilities: [],
  skills: []
});