
import { Archetype, Stat, Weapon, ICharacter, CharacterSpeed } from 'content-interfaces';

export const newCharacter = (): ICharacter => ({
  id: '',
  name: '',
  art: '',
  headArt: '',
  title: '',
  spritesheet: '',
  reinforceItem: '',
  speed: CharacterSpeed.Normal,

  spritesheetData: {
    attackFrames: 0,
    castFrames: 0,
    deadFrames: 0,
    idleFrames: 0,
    moveFrames: 0,
    moveEndFrames: 0,
    onDeathFrames: 0,
    onHitFrames: 0
  },

  stars: 3,
  primaryStat: Stat.Attack,
  archetype: Archetype.Attacker,
  weapon: Weapon.Axe,

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
    [Stat.Evasion]: 0,
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
    [Stat.Evasion]: 0,
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
    [Stat.Evasion]: 0,
  },

  abilities: [],

  skills: [],

  specialSkill: ''
});
