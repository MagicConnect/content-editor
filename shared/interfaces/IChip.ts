import { ILimitBreak } from './ILimitBreak';
import { PrimaryStat } from './BuildingBlocks';
import { IAbility } from './IAbility';
import { IItem } from './IItem';

export type IChip = IItem & {   
  stars: 1|2|3|4|5;                       // chip rarity   
  primaryStat: PrimaryStat;               // chip main stat

  abilities: string[];                    // chip base abilities (un-upgraded)   

  lbRewards: ILimitBreak;                 // chip limit break rewards 
}