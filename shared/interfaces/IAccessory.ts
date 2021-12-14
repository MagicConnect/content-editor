import { PrimaryStat } from './BuildingBlocks';
import { IItem } from './IItem';

export type IAccessory = IItem & {   
  stars: 1|2|3|4|5;                       // accessory rarity   
  primaryStat: PrimaryStat;               // accessory main stat

  abilities: string[];                    // accessory base abilities (un-upgraded)    
}