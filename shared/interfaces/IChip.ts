import { ILimitBreak } from './ILimitBreak';
import { PrimaryStat } from './BuildingBlocks';
import { IAbility } from './IAbility';

export interface IChip {
  name: string;                           // chip name
  description: string;                    // chip description         
  stars: 1|2|3|4|5;                       // chip rarity   
  mainStat: PrimaryStat;                  // chip main stat

  abilities: IAbility[];                  // chip base abilities (un-upgraded)   

  lbRewards: ILimitBreak;                 // chip limit break rewards 
}