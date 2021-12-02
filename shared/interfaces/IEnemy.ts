import { Archetype, PrimaryStat, Stat } from './BuildingBlocks';

export interface IEnemy {
  name: string;                           // character name
  art: string;
  spritesheet: string;

  primaryStat: PrimaryStat;               // primary character stat, used for basic attack scaling
  basePoints: Record<Archetype, number>;  // base stat points bought per class
  baseStats: Record<Stat, number>;        // base stat values (lv1, lb0)

  levelPoints: Record<Archetype, number>; // level stat points bought per class
  levelStats: Record<Stat, number>;       // stats gained per level

  abilities: string[];                    // character abilities
  skills: string[];                       // character skills
}
