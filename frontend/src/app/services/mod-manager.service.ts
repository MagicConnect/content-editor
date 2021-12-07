import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { sortBy } from 'lodash';
import { LocalStorage } from 'ngx-webstorage';
import { BehaviorSubject, Observable } from 'rxjs';

import { Archetype, IAbility, IArtPack, IBanner, ICharacter, IChip, IContentPack, IEnemy, IItem, IMap, IShop, ISkill, ItemType, IWeapon } from '../../../../shared/interfaces';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ModManagerService {

  // content pack
  @LocalStorage() public currentPack!: IContentPack;

  private abilities: BehaviorSubject<IAbility[]> = new BehaviorSubject<IAbility[]>([]);
  public abilities$: Observable<IAbility[]> = this.abilities.asObservable();

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

  private skills: BehaviorSubject<ISkill[]> = new BehaviorSubject<ISkill[]>([]);
  public skills$: Observable<ISkill[]> = this.skills.asObservable();

  private weapons: BehaviorSubject<IWeapon[]> = new BehaviorSubject<IWeapon[]>([]);
  public weapons$: Observable<IWeapon[]> = this.weapons.asObservable();

  // art pack
  private artData: IArtPack = {
    meta: { fileExt: 'webp', basePath: 'assets/art' },
    banners: [],
    characters: [],
    charactersheets: [],
    chips: [],
    enemies: [],
    enemysheets: [],
    items: [],
    maps: [],
    weapons: []
  };

  // miscellaneous data for views
  public get allArtData(): IArtPack {
    return this.artData;
  }

  public get stars() {
    return ['★', '★★', '★★★', '★★★★', '★★★★★'];
  }

  public get archetypes(): Array<{ name: Archetype, color: string }> {
    return [
      { name: Archetype.Attacker,   color: 'danger' },
      { name: Archetype.Caster,     color: 'secondary' },
      { name: Archetype.Defender,   color: 'warning' },
      { name: Archetype.Healer,     color: 'success' },
      { name: Archetype.Ranger,     color: 'primary' },
    ];
  };

  public get shopTokens(): IItem[] {
    return this.currentPack.items.filter(i => i.itemType === ItemType.ShopToken);
  }

  public get mapNames(): Array<{ name: string }> {
    return this.currentPack.maps.map(c => ({ name: c.name }));
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

  public get chooseableAbilities(): Array<{ name: string, description: string }> {
    return sortBy(this.currentPack.abilities.map(a => ({ name: a.name, description: a.description })), 'name');
  }

  public get chooseableSkills(): Array<{ name: string, description: string }> {
    return sortBy(this.currentPack.skills.map(a => ({ name: a.name, description: a.description })), 'name');
  }

  // loading
  private _loading = false;

  public get isLoading(): boolean {
    return this._loading;
  }

  constructor(private http: HttpClient, private auth: AuthService, private api: ApiService) {}

  public init() {
    if(!this.currentPack) {
      this.resetPack();
    };

    this.sync();
    this.fetchArt();
  }

  private async fetchArt(): Promise<void> {
    const artDataRef = await fetch('https://art.magic-connect.com/artdata.json');
    const artData = await artDataRef.json();

    this.artData = artData;
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
    this._loading = true;

    this.http.get(this.api.contentUrl)
      .subscribe((d) => {
        const importPack: IContentPack = d as IContentPack;
        this.currentPack = importPack;
        this.ensurePackData();

        this.sync();

        this._loading = false;
      });
  }

  public exportNet() {
    this.http.put(this.api.contentUrl, this.currentPack).subscribe(() => {});
  }

  // Pack-related
  private ensurePackData(): void {
    if(!this.currentPack.abilities) this.currentPack.abilities = [];
    if(!this.currentPack.banners) this.currentPack.banners = [];
    if(!this.currentPack.characters) this.currentPack.characters = [];
    if(!this.currentPack.chips) this.currentPack.chips = [];
    if(!this.currentPack.enemies) this.currentPack.enemies = [];
    if(!this.currentPack.items) this.currentPack.items = [];
    if(!this.currentPack.maps) this.currentPack.maps = [];
    if(!this.currentPack.shops) this.currentPack.shops = [];
    if(!this.currentPack.skills) this.currentPack.skills = [];
    if(!this.currentPack.weapons) this.currentPack.weapons = [];
  }

  private resetPack(): void {
    this.currentPack = {
      abilities: [],
      banners: [],
      characters: [],
      chips: [],
      enemies: [],
      items: [],
      maps: [],
      shops: [],
      skills: [],
      weapons: [],
    };
  }

  private sync(): void {
    this.abilities.next(this.currentPack.abilities ?? []);
    this.banners.next(this.currentPack.banners ?? []);
    this.characters.next(this.currentPack.characters ?? []);
    this.chips.next(this.currentPack.chips ?? []);
    this.enemies.next(this.currentPack.enemies ?? []);
    this.items.next(this.currentPack.items ?? []);
    this.maps.next(this.currentPack.maps ?? []);
    this.shops.next(this.currentPack.shops ?? []);
    this.skills.next(this.currentPack.skills ?? []);
    this.weapons.next(this.currentPack.weapons ?? []);
  }

  private save(): void {
    this.currentPack = this.currentPack;

    this.cleanData();

    if(this.auth.loggedIn) {
      this.exportNet();
    }
  }

  private syncAndSave(): void {
    this.sync();
    this.save();
  }

  private cleanData(): void {

    // trim all strings recursively from the data
    const trimAll = (obj: any) => {
      Object.keys(obj).map(key => {
        if (typeof obj[key] === 'string') {
          obj[key] = obj[key].trim();
        } else {
          trimAll(obj[key]);
        }
      });
    };

    trimAll(this.currentPack);
  }

  // Ability-related
  public addAbility(ability: IAbility): void {
    if(!this.currentPack.abilities) this.currentPack.abilities = [];
    this.currentPack.abilities.push(ability);
    this.syncAndSave();
  }

  public editAbility(ability: IAbility, index: number): void {
    const oldName = this.currentPack.abilities[index].name;
    this.currentPack.abilities[index] = ability;

    this.currentPack.characters.forEach(c => {
      c.abilities = c.abilities.map(a => {
        return { ...a, abilities: a.abilities.map(b => b === oldName ? ability.name : b) };
      });
    });

    this.currentPack.chips.forEach(c => {
      c.abilities = c.abilities.map(a => a === oldName ? ability.name : a);
    });

    this.currentPack.enemies.forEach(c => {
      c.abilities = c.abilities.map(a => a === oldName ? ability.name : a);
    });

    this.currentPack.weapons.forEach(c => {
      c.abilities = c.abilities.map(a => a === oldName ? ability.name : a);
    });

    this.syncAndSave();
  }

  public deleteAbility(ability: IAbility): void {
    this.currentPack.abilities = this.currentPack.abilities.filter(a => a !== ability);
    this.syncAndSave();
  }

  public getAbilityDescription(name: string): string {
    return this.chooseableAbilities.find(x => x.name === name)?.description ?? 'Unknown';
  }

  public getSkillDescription(name: string): string {
    return this.chooseableSkills.find(x => x.name === name)?.description ?? 'Unknown';
  }

  // Banner-related
  public addBanner(banner: IBanner): void {
    if(!this.currentPack.banners) this.currentPack.banners = [];
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
    if(!this.currentPack.characters) this.currentPack.characters = [];
    this.currentPack.characters.push(character);
    this.syncAndSave();
  }

  public editCharacter(character: ICharacter, index: number): void {
    const oldName = this.currentPack.characters[index].name;
    this.currentPack.characters[index] = character;

    this.currentPack.banners.forEach(c => {
      c.characters = c.characters.map(a => ({...a, name: a.name === oldName ? character.name : a.name }));
    });

    this.currentPack.shops.forEach(c => {
      c.characters = c.characters.map(a => ({...a, name: a.name === oldName ? character.name : a.name }));
    });

    this.syncAndSave();
  }

  public deleteCharacter(character: ICharacter): void {
    this.currentPack.characters = this.currentPack.characters.filter(c => c !== character);
    this.syncAndSave();
  }

  // Chip-related
  public addChip(chip: IChip): void {
    if(!this.currentPack.chips) this.currentPack.chips = [];
    this.currentPack.chips.push(chip);
    this.syncAndSave();
  }

  public editChip(chip: IChip, index: number): void {
    const oldName = this.currentPack.chips[index].name;
    this.currentPack.chips[index] = chip;

    this.currentPack.banners.forEach(c => {
      c.chips = c.chips.map(a => ({...a, name: a.name === oldName ? chip.name : a.name }));
    });

    this.currentPack.shops.forEach(c => {
      c.chips = c.chips.map(a => ({...a, name: a.name === oldName ? chip.name : a.name }));
    });

    this.syncAndSave();
  }

  public deleteChip(chip: IChip): void {
    this.currentPack.chips = this.currentPack.chips.filter(c => c !== chip);
    this.syncAndSave();
  }

  // Enemy-related
  public addEnemy(enemy: IEnemy): void {
    if(!this.currentPack.enemies) this.currentPack.enemies = [];
    this.currentPack.enemies.push(enemy);
    this.syncAndSave();
  }

  public editEnemy(enemy: IEnemy, index: number): void {
    const oldName = this.currentPack.enemies[index].name;
    this.currentPack.enemies[index] = enemy;

    this.currentPack.maps.forEach(c => {
      c.nodes.forEach(n => {
        n.combat.grid.forEach(row => {
          row.forEach(cell => {
            if(!cell || !cell.enemy || cell.enemy.name !== oldName) return;

            cell.enemy.name = enemy.name;
          });
        });
      });
    });

    this.syncAndSave();
  }

  public deleteEnemy(enemy: IEnemy): void {
    this.currentPack.enemies = this.currentPack.enemies.filter(e => e !== enemy);
    this.syncAndSave();
  }

  // Item-related
  public addItem(item: IItem): void {
    if(!this.currentPack.items) this.currentPack.items = [];
    this.currentPack.items.push(item);
    this.syncAndSave();
  }

  public editItem(item: IItem, index: number): void {
    const oldName = this.currentPack.items[index].name;
    this.currentPack.items[index] = item;

    this.currentPack.banners.forEach(c => {
      c.items = c.items.map(a => ({...a, name: a.name === oldName ? item.name : a.name }));
    });

    this.currentPack.shops.forEach(c => {
      c.items = c.items.map(a => ({...a, name: a.name === oldName ? item.name : a.name }));
    });

    this.syncAndSave();
  }

  public deleteItem(item: IItem): void {
    this.currentPack.items = this.currentPack.items.filter(i => i !== item);
    this.syncAndSave();
  }

  // Map-related
  public addMap(map: IMap): void {
    if(!this.currentPack.maps) this.currentPack.maps = [];
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
    if(!this.currentPack.shops) this.currentPack.shops = [];
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

  // Skill-related
  public addSkill(skill: ISkill): void {
    if(!this.currentPack.skills) this.currentPack.skills = [];
    this.currentPack.skills.push(skill);
    this.syncAndSave();
  }

  public editSkill(skill: ISkill, index: number): void {
    const oldName = this.currentPack.skills[index].name;
    this.currentPack.skills[index] = skill;

    this.currentPack.characters.forEach(c => {
      c.skills = c.skills.map(a => a === oldName ? skill.name : a);
    });

    this.currentPack.enemies.forEach(c => {
      c.skills = c.skills.map(a => a === oldName ? skill.name : a);
    });

    this.syncAndSave();
  }

  public deleteSkill(skill: ISkill): void {
    this.currentPack.skills = this.currentPack.skills.filter(s => s !== skill);
    this.syncAndSave();
  }

  // Weapon-related
  public addWeapon(weapon: IWeapon): void {
    if(!this.currentPack.weapons) this.currentPack.weapons = [];
    this.currentPack.weapons.push(weapon);
    this.syncAndSave();
  }

  public editWeapon(weapon: IWeapon, index: number): void {
    const oldName = this.currentPack.weapons[index].name;
    this.currentPack.weapons[index] = weapon;

    this.currentPack.banners.forEach(c => {
      c.weapons = c.weapons.map(a => ({...a, name: a.name === oldName ? weapon.name : a.name }));
    });

    this.currentPack.shops.forEach(c => {
      c.weapons = c.weapons.map(a => ({...a, name: a.name === oldName ? weapon.name : a.name }));
    });

    this.syncAndSave();
  }

  public deleteWeapon(weapon: IWeapon): void {
    this.currentPack.weapons = this.currentPack.weapons.filter(w => w !== weapon);
    this.syncAndSave();
  }

}
