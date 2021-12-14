
import { IBanner } from './IBanner';
import { ICharacter } from './ICharacter';
import { IAccessory } from './IAccessory';
import { IItem } from './IItem';
import { IWeapon } from './IWeapon';
import { IShop } from './IShop';
import { IEnemy } from './IEnemy';
import { IMap } from './IMap';
import { IAbility } from './IAbility';
import { ISkill } from '.';

export interface IContentPack {
  abilities: IAbility[];
  accessories: IAccessory[];
  banners: IBanner[];
  characters: ICharacter[];
  enemies: IEnemy[];
  items: IItem[];
  maps: IMap[];
  shops: IShop[];
  skills: ISkill[];
  weapons: IWeapon[];
}

export interface IArtPack {
  meta: {
    fileExt: string;
    basePath: string;
  };

  accessories: string[];
  banners: string[];
  characters: string[];
  charactersheets: string[];
  enemies: string[];
  enemysheets: string[];
  items: string[];
  maps: string[];
  weapons: string[];
}