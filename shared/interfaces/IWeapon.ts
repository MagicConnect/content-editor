import { Weapon } from './BuildingBlocks';
import { PrimaryStat } from './BuildingBlocks';
import { IItem } from './IItem';

export type IWeapon = IItem & {
  weaponType: Weapon;                     // the type of weapon
  stars: 1|2|3|4|5;                       // weapon rarity   
  primaryStat: PrimaryStat;               // weapon main stat
  secondaryStat?: PrimaryStat;            // weapon secondary stat

  abilities: string[];                    // weapon base abilities (un-upgraded)
}