import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { sortBy, isUndefined } from 'lodash';
import { LocalStorage } from 'ngx-webstorage';
import { BehaviorSubject, Observable } from 'rxjs';

import { v4 as uuid } from 'uuid';

import { Archetype, IAbility, IArtPack, IBanner, ICharacter, IAccessory, IContentPack, IEnemy, IItem, IMap, IShop, ISkill, ItemType, IWeapon, Stat } from 'content-interfaces';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { IIdentifiable } from 'content-interfaces/lib/IIdentifiable';

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

  private accessories: BehaviorSubject<IAccessory[]> = new BehaviorSubject<IAccessory[]>([]);
  public accessories$: Observable<IAccessory[]> = this.accessories.asObservable();

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
    accessories: [],
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

  public get mapNames(): Array<{ id: string, name: string }> {
    return this.currentPack.maps.map(c => ({ id: c.id, name: c.name }));
  }

  public get filteredCharacters(): Array<{ id: string, name: string, stars: string }> {
    return this.currentPack.characters.map(c => ({ id: c.id, name: c.name, stars: this.stars[c.stars - 1] }));
  }

  public get filteredAccessories(): Array<{ id: string, name: string, stars: string }> {
    return this.currentPack.accessories.map(c => ({ id: c.id, name: c.name, stars: this.stars[c.stars - 1] }));
  }

  public get filteredWeapons(): Array<{ id: string, name: string, stars: string }> {
    return this.currentPack.weapons.map(c => ({ id: c.id, name: c.name, stars: this.stars[c.stars - 1] }));
  }

  public get filteredEnemies(): Array<{ id: string, name: string }> {
    return this.currentPack.enemies.map(c => ({ id: c.id, name: c.name }));
  }

  public get filteredItems(): Array<{ id: string, name: string, itemType: ItemType }> {
    return this.currentPack.items.map(c => ({ id: c.id, name: c.name, itemType: c.itemType }));
  }

  public get chooseableAbilities(): Array<{ id: string, name: string, description: string }> {
    return sortBy(this.currentPack.abilities.map(a => ({ id: a.id, name: a.name, description: a.description })), 'name');
  }

  public get chooseableSkills(): Array<{ id: string, name: string, description: string }> {
    return sortBy(this.currentPack.skills.map(a => ({ id: a.id, name: a.name, description: a.description })), 'name');
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
    this.http.put(this.api.contentUrl, this.currentPack).subscribe((res) => {
      console.log(res);
    },
    (err) => {
      console.error(err);
      if(!err.error) return;

      const validationErrors = err.error.validationErrors.map((errs: any) => {
        return errs.context.filter((e: any) => e.key).map((e: any) => e.key).join('.');
      });

      alert(`If you see this message, screenshot it and send it to Seiyria. These fields need to be changed either to be a number or to have data:
      \n${validationErrors.join('\n')}`);
    });
  }

  // Pack-related
  private ensurePackData(): void {
    if(!this.currentPack.abilities) this.currentPack.abilities = [];
    if(!this.currentPack.accessories) this.currentPack.accessories = [];
    if(!this.currentPack.banners) this.currentPack.banners = [];
    if(!this.currentPack.characters) this.currentPack.characters = [];
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
      accessories: [],
      banners: [],
      characters: [],
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
    this.accessories.next(this.currentPack.accessories ?? []);
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
      if(!obj) return;

      Object.keys(obj).map(key => {
        if (typeof obj[key] === 'string') {
          obj[key] = obj[key].trim();
        } else {
          trimAll(obj[key]);
        }
      });
    };

    // ensure something is a number
    const ensureNumber = (val: number | string) => +val;

    trimAll(this.currentPack);

    // ensure ability->baseValue is a number
    this.currentPack.abilities.forEach(a => {
      a.effects.forEach(e => {
        if(isUndefined(e.props.baseValue)) return;

        e.props.baseValue = ensureNumber(e.props.baseValue);
      });

      Object.values(a.lbChanges).forEach(c => {
        c.effects.forEach(e => {
          if(isUndefined(e.props.baseValue)) return;

          e.props.baseValue = ensureNumber(e.props.baseValue);
        });
      });
    });

    // delete empty strings
    this.currentPack.weapons.forEach(w => {
      if(w.secondaryStat) return;

      delete w.secondaryStat;
    });

    // ensure item->sellValue is a number
    this.currentPack.items.forEach(i => {
      i.sellValue = ensureNumber(i.sellValue);
    });

    // ensure shop->{quantity,cost}
    this.currentPack.shops.forEach(s => {
      s.items.forEach(i => {
        i.quantity = ensureNumber(i.quantity);
        i.cost = ensureNumber(i.cost);
      });
    });

    // ensure skill->{hpCost,mpCost,spcCost,statScaling[],actions[].statusEffectChanges[]}
    this.currentPack.skills.forEach(s => {

      if(!isUndefined(s.hpCost)) {
        s.hpCost = ensureNumber(s.hpCost);
      }

      if(!isUndefined(s.mpCost)) {
        s.mpCost = ensureNumber(s.mpCost);
      }

      if(!isUndefined(s.spcCost)) {
        s.spcCost = ensureNumber(s.spcCost);
      }

      if(!isUndefined(s.cooldown)) {
        s.cooldown = ensureNumber(s.cooldown);
      }

      s.actions.forEach(a => {
        if(a.hits) {
          a.hits = ensureNumber(a.hits);
        }

        if(a.statScaling) {
          Object.keys(a.statScaling).forEach(key => {
            if(isUndefined(a.statScaling[key as Stat])) return;
            a.statScaling[key as Stat] = ensureNumber(a.statScaling[key as Stat]);
          });
        }

        a.statusEffectChanges.forEach(e => {
          if(!isUndefined(e.value)) {
            e.value = ensureNumber(e.value);
          }

          if(!isUndefined(e.duration)) {
            e.duration = ensureNumber(e.duration);
          }
        });

      });

    });

  }

  public rerollID(ident: IIdentifiable): void {
    ident.id = uuid();
  }

  private ensureID(ident: IIdentifiable): void {
    if(ident.id) return;

    this.rerollID(ident);
  }

  // Ability-related
  public addAbility(ability: IAbility): void {
    if(!this.currentPack.abilities) this.currentPack.abilities = [];

    if(!ability.id) ability.id = uuid();

    this.currentPack.abilities.push(ability);
    this.syncAndSave();
  }

  public editAbility(ability: IAbility, index: number): void {
    this.currentPack.abilities[index] = ability;
    this.syncAndSave();
  }

  public deleteAbility(ability: IAbility): void {
    this.currentPack.abilities = this.currentPack.abilities.filter(a => a !== ability);
    this.syncAndSave();
  }

  public getAbilityDescription(id: string): string {
    return this.chooseableAbilities.find(x => x.id === id)?.description ?? 'Unknown';
  }

  public getSkillDescription(id: string): string {
    return this.chooseableSkills.find(x => x.id === id)?.description ?? 'Unknown';
  }

  // Accessory-related
  public addAccessory(acc: IAccessory): void {
    if(!this.currentPack.accessories) this.currentPack.accessories = [];

    this.ensureID(acc);

    this.currentPack.accessories.push(acc);
    this.syncAndSave();
  }

  public editAccessory(acc: IAccessory, index: number): void {
    this.currentPack.accessories[index] = acc;

    this.syncAndSave();
  }

  public deleteAccessory(acc: IAccessory): void {
    this.currentPack.accessories = this.currentPack.accessories.filter(c => c !== acc);
    this.syncAndSave();
  }

  // Banner-related
  public addBanner(banner: IBanner): void {
    if(!this.currentPack.banners) this.currentPack.banners = [];

    this.ensureID(banner);

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

    this.ensureID(character);

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

  // Enemy-related
  public addEnemy(enemy: IEnemy): void {
    if(!this.currentPack.enemies) this.currentPack.enemies = [];

    this.ensureID(enemy);

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
    if(!this.currentPack.items) this.currentPack.items = [];

    this.ensureID(item);

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
    if(!this.currentPack.maps) this.currentPack.maps = [];

    this.ensureID(map);

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

    this.ensureID(shop);

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

    this.ensureID(skill);

    this.currentPack.skills.push(skill);
    this.syncAndSave();
  }

  public editSkill(skill: ISkill, index: number): void {
    this.currentPack.skills[index] = skill;

    this.syncAndSave();
  }

  public deleteSkill(skill: ISkill): void {
    this.currentPack.skills = this.currentPack.skills.filter(s => s !== skill);
    this.syncAndSave();
  }

  // Weapon-related
  public addWeapon(weapon: IWeapon): void {
    if(!this.currentPack.weapons) this.currentPack.weapons = [];

    this.ensureID(weapon);

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
