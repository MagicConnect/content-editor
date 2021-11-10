import { ILimitBreak } from './ILimitBreak';
import { PrimaryStat } from './BuildingBlocks';
import { IAbility } from './IAbility';
import { IItem } from './IItem';

export type IWeapon = IItem & {      
  stars: 1|2|3|4|5;                       // weapon rarity   
  primaryStat: PrimaryStat;               // weapon main stat
  secondaryStat?: PrimaryStat;            // weapon secondary stat

  abilities: IAbility[];                  // weapon base abilities (un-upgraded)   

  lbRewards: ILimitBreak;                 // weapon limit break rewards
}