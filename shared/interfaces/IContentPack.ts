
import { IBanner } from './IBanner';
import { ICharacter } from './ICharacter';
import { IChip } from './IChip';
import { IItem } from './IItem';
import { IWeapon } from './IWeapon';
import { IShop } from './IShop';
import { IEnemy } from './IEnemy';

export interface IContentPack {
  banners: IBanner[];
  characters: ICharacter[];
  chips: IChip[];
  enemies: IEnemy[];
  items: IItem[];
  shops: IShop[];
  weapons: IWeapon[];
}