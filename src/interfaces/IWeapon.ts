import { PrimaryStat, SecondaryStat } from './BuildingBlocks';
import { IAbility } from './IAbility';

export interface IWeapon {
  name: string;                           // weapon name
  description: string;                    // weapon description         
  stars: 1|2|3|4|5;                       // weapon rarity   
  mainStat: PrimaryStat;                  // weapon main stat
  secondaryStat: SecondaryStat;           // weapon secondary stat

  abilities: IAbility[];                  // weapon base abilities (un-upgraded)   

  lbRewards: Record<number, {             // rewards gained for a specific LB (can change stats, abilities, attacks, etc)
    abilities: Record<number, IAbility[]> // abilities changed for the earned LB
    stats: Record<PrimaryStat, number>    // stats changed for the earned LB
  }>;
}