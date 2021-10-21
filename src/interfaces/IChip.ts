import { PrimaryStat } from './BuildingBlocks';
import { IAbility } from './IAbility';

export interface IChip {
  name: string;                           // chip name
  description: string;                    // chip description         
  stars: 1|2|3|4|5;                       // chip rarity   
  mainStat: PrimaryStat;                  // chip main stat

  abilities: IAbility[];                  // chip base abilities (un-upgraded)   

  lbRewards: Record<number, {             // rewards gained for a specific LB (can change stats, abilities, attacks, etc)
    abilities: Record<number, IAbility[]> // abilities changed for the earned LB
    stats: Record<PrimaryStat, number>    // stats changed for the earned LB
  }>;
}