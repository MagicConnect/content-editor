import { Archetype, PrimaryStat, Stat, Weapon } from './BuildingBlocks';
import { IAbility } from './IAbility';

export interface ICharacter {
  name: string;                           // character name
  archetype: Archetype;                   // character class/archetype
  weapon: Weapon;                         // weapon used by the character
  stars: number;                          // character star value (3-5*)

  primaryStat: PrimaryStat;               // primary character stat, used for basic attack scaling
  baseStats: Record<Stat, number>;        // base stat values (lv1, lb0)
  levelStats: Record<Stat, number>;       // stats gained per level

  abilities: Record<string, IAbility>;    // character abilities
  specialAbility: IAbility;               // character special ability

  lbRewards: Record<number, {             // rewards gained for a specific LB (can change stats, abilities, attacks, etc)
    ability: Record<string, IAbility>,    // abilities changed for the earned LB
    stats: Record<Stat, number>           // stats changed for the earned LB
  }>;
}
