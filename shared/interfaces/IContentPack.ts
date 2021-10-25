
import { IBanner } from './IBanner';
import { ICharacter } from './ICharacter';
import { IChip } from './IChip';
import { IItem } from './IItem';
import { IWeapon } from './IWeapon';
import { IShop } from './IShop';

export interface IContentPack {
  banners: IBanner[];
  characters: ICharacter[];
  chips: IChip[];
  items: IItem[];
  shops: IShop[];
  weapons: IWeapon[];
}