import { ILimitBreak } from './ILimitBreak';
import { Archetype, PrimaryStat, Stat, Weapon } from './BuildingBlocks';
import { ISkill } from './ISkill';

export interface ICharacter {
  name: string;                           // character name
  archetype: Archetype;                   // character class/archetype
  weapon: Weapon;                         // weapon used by the character
  stars: 3|4|5;                           // character star value (3-5*)

  primaryStat: PrimaryStat;               // primary character stat, used for basic attack scaling
  basePoints: Record<Archetype, number>;  // base stat points bought per class
  baseStats: Record<Stat, number>;        // base stat values (lv1, lb0)

  levelPoints: Record<Archetype, number>; // level stat points bought per class
  levelStats: Record<Stat, number>;       // stats gained per level

  abilities: string[];                  // character abilities
  skills: ISkill[];                       // character skills
  specialSkill: ISkill;                   // character special ability

  lbRewards: ILimitBreak;                 // rewards gained for a specific LB (can change stats, abilities, attacks, etc)
}
