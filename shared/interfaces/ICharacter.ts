import { Archetype, PrimaryStat, Stat, Weapon } from './BuildingBlocks';

export interface ICharacterAbility {
  name: string;                           // the name of the ability group
  abilities: string[];                    // the abilities in the group
}

export interface ICharacter {
  name: string;                           // character name
  art: string;                            // character base splash art
  spritesheet: string;                    // character base spritesheet

  archetype: Archetype;                   // character class/archetype
  weapon: Weapon;                         // weapon used by the character
  stars: 3|4|5;                           // character star value (3-5*)

  primaryStat: PrimaryStat;               // primary character stat, used for basic attack scaling
  basePoints: Record<Archetype, number>;  // base stat points bought per class
  baseStats: Record<Stat, number>;        // base stat values (lv1, lb0)

  levelPoints: Record<Archetype, number>; // level stat points bought per class
  levelStats: Record<Stat, number>;       // stats gained per level

  lbPoints: Record<Archetype, number>;    // lb stat points bought per class
  lbStats: Record<Stat, number>;          // stats gained per lb

  abilities: ICharacterAbility[];         // character abilities
  skills: string[];                       // character skills
  specialSkill: string;                   // character special ability
}
