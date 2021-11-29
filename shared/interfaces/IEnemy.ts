import { Archetype, PrimaryStat, Stat } from './BuildingBlocks';
import { IAbility } from './IAbility';
import { ISkill } from './ISkill';

export interface IEnemy {
  name: string;                           // character name

  primaryStat: PrimaryStat;               // primary character stat, used for basic attack scaling
  basePoints: Record<Archetype, number>;  // base stat points bought per class
  baseStats: Record<Stat, number>;        // base stat values (lv1, lb0)

  levelPoints: Record<Archetype, number>; // level stat points bought per class
  levelStats: Record<Stat, number>;       // stats gained per level

  abilities: string[];                    // character abilities
  skills: ISkill[];
}
