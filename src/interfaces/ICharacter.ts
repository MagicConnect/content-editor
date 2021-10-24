import { ILimitBreak } from '.';
import { Archetype, PrimaryStat, Stat, Weapon } from './BuildingBlocks';
import { IAbility } from './IAbility';
import { ISkill } from './ISkill';

export interface ICharacter {
  name: string;                           // character name
  archetype: Archetype;                   // character class/archetype
  weapon: Weapon;                         // weapon used by the character
  stars: number;                          // character star value (3-5*)

  primaryStat: PrimaryStat;               // primary character stat, used for basic attack scaling
  baseStats: Record<Stat, number>;        // base stat values (lv1, lb0)
  levelStats: Record<Stat, number>;       // stats gained per level

  abilities: IAbility[];                  // character abilities
  skills: ISkill[];                       // character skills
  specialSkill: ISkill;                   // character special ability

  lbRewards: ILimitBreak;                 // rewards gained for a specific LB (can change stats, abilities, attacks, etc)
}
