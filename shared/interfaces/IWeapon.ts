import { ILimitBreak } from './ILimitBreak';
import { PrimaryStat, SecondaryStat } from './BuildingBlocks';
import { IAbility } from './IAbility';

export interface IWeapon {
  name: string;                           // weapon name
  description: string;                    // weapon description         
  stars: 1|2|3|4|5;                       // weapon rarity   
  primaryStat: PrimaryStat;               // weapon main stat
  secondaryStat: SecondaryStat;           // weapon secondary stat

  abilities: IAbility[];                  // weapon base abilities (un-upgraded)   

  lbRewards: ILimitBreak;                 // weapon limit break rewards
}