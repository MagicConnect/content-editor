import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorage } from 'ngx-webstorage';
import { BehaviorSubject, Observable } from 'rxjs';

import { IBanner, ICharacter, IChip, IContentPack, IEnemy, IItem, IMap, IShop, ItemType, IWeapon } from '../../../../shared/interfaces';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ModManagerService {

  private banners: BehaviorSubject<IBanner[]> = new BehaviorSubject<IBanner[]>([]);
  public banners$: Observable<IBanner[]> = this.banners.asObservable();

  private characters: BehaviorSubject<ICharacter[]> = new BehaviorSubject<ICharacter[]>([]);
  public characters$: Observable<ICharacter[]> = this.characters.asObservable();

  private chips: BehaviorSubject<IChip[]> = new BehaviorSubject<IChip[]>([]);
  public chips$: Observable<IChip[]> = this.chips.asObservable();

  private enemies: BehaviorSubject<IEnemy[]> = new BehaviorSubject<IEnemy[]>([]);
  public enemies$: Observable<IEnemy[]> = this.enemies.asObservable();

  private items: BehaviorSubject<IItem[]> = new BehaviorSubject<IItem[]>([]);
  public items$: Observable<IItem[]> = this.items.asObservable();

  private maps: BehaviorSubject<IMap[]> = new BehaviorSubject<IMap[]>([]);
  public maps$: Observable<IMap[]> = this.maps.asObservable();

  private shops: BehaviorSubject<IShop[]> = new BehaviorSubject<IShop[]>([]);
  public shops$: Observable<IShop[]> = this.shops.asObservable();

  private weapons: BehaviorSubject<IWeapon[]> = new BehaviorSubject<IWeapon[]>([]);
  public weapons$: Observable<IWeapon[]> = this.weapons.asObservable();

  public get stars() {
    return ['★', '★★', '★★★', '★★★★', '★★★★★'];
  }

  public get shopTokens(): IItem[] {
    return this.currentPack.items.filter(i => i.itemType === ItemType.ShopToken);
  }

  public get filteredCharacters(): Array<{ name: string, stars: string }> {
    return this.currentPack.characters.map(c => ({ name: c.name, stars: this.stars[c.stars - 1] }));
  }

  public get filteredChips(): Array<{ name: string, stars: string }> {
    return this.currentPack.chips.map(c => ({ name: c.name, stars: this.stars[c.stars - 1] }));
  }

  public get filteredWeapons(): Array<{ name: string, stars: string }> {
    return this.currentPack.weapons.map(c => ({ name: c.name, stars: this.stars[c.stars - 1] }));
  }

  public get filteredItems(): Array<{ name: string, itemType: ItemType }> {
    return this.currentPack.items.map(c => ({ name: c.name, itemType: c.itemType }));
  }

  @LocalStorage() public currentPack!: IContentPack;

  constructor(private http: HttpClient, private auth: AuthService, private api: ApiService) {}

  public init() {
    if(!this.currentPack) {
      this.resetPack();
    };

    this.sync();
  }

  // Management-related
  public export(): void {
    const data = JSON.stringify(this.currentPack, null, 4);
    const blob = new Blob([data], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `magicon-content-${Date.now()}.json`;
    a.click();
  }

  public import(contentPack: IContentPack): void {
    this.currentPack = contentPack;
    this.syncAndSave();
  }

  public reset(): void {
    this.resetPack();
    this.syncAndSave();
  }

  public importNet() {
    this.http.get(this.api.contentUrl)
      .subscribe((d) => {
        const importPack: IContentPack = d as IContentPack;
        this.currentPack = importPack;

        this.sync();
      });
  }

  public exportNet() {
    this.http.put(this.api.contentUrl, this.currentPack).subscribe(() => {});
  }

  // Pack-related
  private resetPack(): void {
    this.currentPack = {
      banners: [],
      characters: [],
      chips: [],
      enemies: [],
      items: [],
      shops: [],
      weapons: [],
      maps: [],
    };
  }

  private sync(): void {
    this.banners.next(this.currentPack.banners);
    this.characters.next(this.currentPack.characters);
    this.chips.next(this.currentPack.chips);
    this.enemies.next(this.currentPack.enemies);
    this.items.next(this.currentPack.items);
    this.maps.next(this.currentPack.maps);
    this.shops.next(this.currentPack.shops);
    this.weapons.next(this.currentPack.weapons);
  }

  private save(): void {
    this.currentPack = this.currentPack;

    if(this.auth.loggedIn) {
      this.exportNet();
    }
  }

  private syncAndSave(): void {
    this.sync();
    this.save();
  }

  // Banner-related
  public addBanner(banner: IBanner): void {
    this.currentPack.banners.push(banner);
    this.syncAndSave();
  }

  public editBanner(banner: IBanner, index: number): void {
    this.currentPack.banners[index] = banner;
    this.syncAndSave();
  }

  public deleteBanner(banner: IBanner): void {
    this.currentPack.banners = this.currentPack.banners.filter(b => b !== banner);
    this.syncAndSave();
  }

  // Character-related
  public addCharacter(character: ICharacter): void {
    this.currentPack.characters.push(character);
    this.syncAndSave();
  }

  public editCharacter(character: ICharacter, index: number): void {
    this.currentPack.characters[index] = character;
    this.syncAndSave();
  }

  public deleteCharacter(character: ICharacter): void {
    this.currentPack.characters = this.currentPack.characters.filter(c => c !== character);
    this.syncAndSave();
  }

  // Chip-related
  public addChip(chip: IChip): void {
    this.currentPack.chips.push(chip);
    this.syncAndSave();
  }

  public editChip(chip: IChip, index: number): void {
    this.currentPack.chips[index] = chip;
    this.syncAndSave();
  }

  public deleteChip(chip: IChip): void {
    this.currentPack.chips = this.currentPack.chips.filter(c => c !== chip);
    this.syncAndSave();
  }

  // Enemy-related
  public addEnemy(enemy: IEnemy): void {
    this.currentPack.enemies.push(enemy);
    this.syncAndSave();
  }

  public editEnemy(enemy: IEnemy, index: number): void {
    this.currentPack.enemies[index] = enemy;
    this.syncAndSave();
  }

  public deleteEnemy(enemy: IEnemy): void {
    this.currentPack.enemies = this.currentPack.enemies.filter(e => e !== enemy);
    this.syncAndSave();
  }

  // Item-related
  public addItem(item: IItem): void {
    this.currentPack.items.push(item);
    this.syncAndSave();
  }

  public editItem(item: IItem, index: number): void {
    this.currentPack.items[index] = item;
    this.syncAndSave();
  }

  public deleteItem(item: IItem): void {
    this.currentPack.items = this.currentPack.items.filter(i => i !== item);
    this.syncAndSave();
  }

  // Map-related
  public addMap(map: IMap): void {
    this.currentPack.maps.push(map);
    this.syncAndSave();
  }

  public editMap(map: IMap, index: number): void {
    this.currentPack.maps[index] = map;
    this.syncAndSave();
  }

  public deleteMap(map: IMap): void {
    this.currentPack.maps = this.currentPack.maps.filter(m => m !== map);
    this.syncAndSave();
  }

  // Shop-related
  public addShop(shop: IShop): void {
    this.currentPack.shops.push(shop);
    this.syncAndSave();
  }

  public editShop(shop: IShop, index: number): void {
    this.currentPack.shops[index] = shop;
    this.syncAndSave();
  }

  public deleteShop(shop: IShop): void {
    this.currentPack.shops = this.currentPack.shops.filter(s => s !== shop);
    this.syncAndSave();
  }

  // Weapon-related
  public addWeapon(weapon: IWeapon): void {
    this.currentPack.weapons.push(weapon);
    this.syncAndSave();
  }

  public editWeapon(weapon: IWeapon, index: number): void {
    this.currentPack.weapons[index] = weapon;
    this.syncAndSave();
  }

  public deleteWeapon(weapon: IWeapon): void {
    this.currentPack.weapons = this.currentPack.weapons.filter(w => w !== weapon);
    this.syncAndSave();
  }

}
