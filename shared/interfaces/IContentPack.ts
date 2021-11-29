
import { IBanner } from './IBanner';
import { ICharacter } from './ICharacter';
import { IChip } from './IChip';
import { IItem } from './IItem';
import { IWeapon } from './IWeapon';
import { IShop } from './IShop';
import { IEnemy } from './IEnemy';
import { IMap } from './IMap';
import { IAbility } from './IAbility';

export interface IContentPack {
  abilities: IAbility[];
  banners: IBanner[];
  characters: ICharacter[];
  chips: IChip[];
  enemies: IEnemy[];
  items: IItem[];
  shops: IShop[];
  weapons: IWeapon[];
  maps: IMap[];
}