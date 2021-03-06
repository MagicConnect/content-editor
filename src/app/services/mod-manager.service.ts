import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { sortBy, isUndefined, isNumber } from 'lodash';
import { LocalStorage } from 'ngx-webstorage';
import { BehaviorSubject, Observable } from 'rxjs';
import * as jsonPatch from 'fast-json-patch';

import { v4 as uuid } from 'uuid';

import { Archetype, IAbility, IArtPack, IBanner, ICharacter, IAccessory, IContentPack, IEnemy, IItem, IMap, IShop, ISkill, ItemType, IWeapon, Stat, IIdentifiable, Element, IAchievement, IMapNode, IUnitSpritesheetData, IStore, ICalendarBonus } from '@magicconnect/content-interfaces';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ModManagerService {

  // content pack
  @LocalStorage() public currentPack!: IContentPack;

  // json patch observer
  private packObserver!: jsonPatch.Observer<any>;

  private newMessage: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public newMessage$: Observable<string> = this.newMessage.asObservable();

  // observables
  private abilities: BehaviorSubject<IAbility[]> = new BehaviorSubject<IAbility[]>([]);
  public abilities$: Observable<IAbility[]> = this.abilities.asObservable();

  private accessories: BehaviorSubject<IAccessory[]> = new BehaviorSubject<IAccessory[]>([]);
  public accessories$: Observable<IAccessory[]> = this.accessories.asObservable();

  private achievements: BehaviorSubject<IAchievement[]> = new BehaviorSubject<IAchievement[]>([]);
  public achievements$: Observable<IAchievement[]> = this.achievements.asObservable();

  private banners: BehaviorSubject<IBanner[]> = new BehaviorSubject<IBanner[]>([]);
  public banners$: Observable<IBanner[]> = this.banners.asObservable();

  private calendarBonuses: BehaviorSubject<ICalendarBonus[]> = new BehaviorSubject<ICalendarBonus[]>([]);
  public calendarBonuses$: Observable<ICalendarBonus[]> = this.calendarBonuses.asObservable();

  private characters: BehaviorSubject<ICharacter[]> = new BehaviorSubject<ICharacter[]>([]);
  public characters$: Observable<ICharacter[]> = this.characters.asObservable();

  private enemies: BehaviorSubject<IEnemy[]> = new BehaviorSubject<IEnemy[]>([]);
  public enemies$: Observable<IEnemy[]> = this.enemies.asObservable();

  private items: BehaviorSubject<IItem[]> = new BehaviorSubject<IItem[]>([]);
  public items$: Observable<IItem[]> = this.items.asObservable();

  private maps: BehaviorSubject<IMap[]> = new BehaviorSubject<IMap[]>([]);
  public maps$: Observable<IMap[]> = this.maps.asObservable();

  private shops: BehaviorSubject<IShop[]> = new BehaviorSubject<IShop[]>([]);
  public shops$: Observable<IShop[]> = this.shops.asObservable();

  private stores: BehaviorSubject<IStore[]> = new BehaviorSubject<IStore[]>([]);
  public stores$: Observable<IStore[]> = this.stores.asObservable();

  private skills: BehaviorSubject<ISkill[]> = new BehaviorSubject<ISkill[]>([]);
  public skills$: Observable<ISkill[]> = this.skills.asObservable();

  private weapons: BehaviorSubject<IWeapon[]> = new BehaviorSubject<IWeapon[]>([]);
  public weapons$: Observable<IWeapon[]> = this.weapons.asObservable();

  // art pack
  private artData: IArtPack = {
    meta: { fileExt: 'webp', basePath: 'assets/art' },
    achievements: [],
    banners: [],
    characterheads: [],
    characters: [],
    charactersheets: [],
    accessories: [],
    enemies: [],
    enemysheets: [],
    items: [],
    maps: [],
    npcs: [],
    skillicons: [],
    weapons: []
  };

  // miscellaneous data for views
  public get allArtData(): IArtPack {
    return this.artData;
  }

  public get stars() {
    return ['???', '??????', '?????????', '????????????', '???????????????'];
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
    return this.currentPack.items.filter(i => [ItemType.ShopToken, ItemType.Gold, ItemType.Crystal].includes(i.itemType));
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

  public get filteredMaps(): Array<{ id: string, name: string, nodes: IMapNode[] }> {
    return this.currentPack.maps.map(c => ({ id: c.id, name: c.name, nodes: c.nodes }));
  }

  public get filteredAchievements(): Array<{ id: string, name: string }> {
    return this.currentPack.achievements.map(c => ({ id: c.id, name: c.name }));
  }

  public get chooseableAbilities(): Array<{ id: string, name: string, description: string }> {
    return sortBy(this.currentPack.abilities.map(a => ({ id: a.id, name: a.name, description: a.description })), 'name');
  }

  public get chooseableSkills(): Array<{ id: string, name: string, description: string }> {
    return sortBy(this.currentPack.skills.map(a => ({ id: a.id, name: a.name, description: a.description })), 'name');
  }

  public get chooseableItems(): Array<{ id: string, name: string, description: string }> {
    return sortBy(this.currentPack.items.map(a => ({ id: a.id, name: a.name, description: a.description })), 'name');
  }

  // notification tooltip
  private _notificationTimeout: any;

  // loading
  private _loading = false;

  public get isLoading(): boolean {
    return this._loading;
  }

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private api: ApiService
  ) {}

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

  public notify(message: string) {
    if(this._notificationTimeout) clearTimeout(this._notificationTimeout);

    this.newMessage.next(message);

    this._notificationTimeout = setTimeout(() => {
      this.newMessage.next('');
    }, 5000);
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

    this.http.get(this.api.contentUrlRaw)
      .subscribe((d) => {
        const importPack: IContentPack = d as IContentPack;
        this.currentPack = importPack;

        this._loading = false;

        this.packObserver = jsonPatch.observe(this.currentPack);

        this.ensurePackData();

        this.sync();
      }, () => {
        alert('Failed to load content pack from server. Please try again later.');
      });
  }

  public exportNet() {

    const patches = jsonPatch.generate(this.packObserver);
    if(patches.length > 0) {
      this.http.patch(this.api.contentUrl, patches).subscribe(res => {
        console.log('Saved patches.');
      },
      (err) => {
        console.error(err);
        if(!err.error) return;

        const validationErrors = err.error.validationErrors.map((errs: any) => {
          return errs.prettyPathString;
        });

        alert(`If you see this message, screenshot it and send it to Seiyria. These fields need to be changed either to be a number or to have data:
        \n${validationErrors.join('\n')}`);
      });
    }
  }

  // Pack-related
  private ensurePackData(): void {
    if(!this.currentPack.abilities) this.currentPack.abilities = [];
    if(!this.currentPack.accessories) this.currentPack.accessories = [];
    if(!this.currentPack.achievements) this.currentPack.achievements = [];
    if(!this.currentPack.banners) this.currentPack.banners = [];
    if(!this.currentPack.calendarBonuses) this.currentPack.calendarBonuses = [];
    if(!this.currentPack.characters) this.currentPack.characters = [];
    if(!this.currentPack.enemies) this.currentPack.enemies = [];
    if(!this.currentPack.items) this.currentPack.items = [];
    if(!this.currentPack.maps) this.currentPack.maps = [];
    if(!this.currentPack.shops) this.currentPack.shops = [];
    if(!this.currentPack.stores) this.currentPack.stores = [];
    if(!this.currentPack.skills) this.currentPack.skills = [];
    if(!this.currentPack.weapons) this.currentPack.weapons = [];
  }

  private resetPack(): void {
    this.currentPack = {
      abilities: [],
      accessories: [],
      achievements: [],
      banners: [],
      calendarBonuses: [],
      characters: [],
      enemies: [],
      items: [],
      maps: [],
      shops: [],
      stores: [],
      skills: [],
      weapons: [],
    };
  }

  private sync(): void {
    this.abilities.next(this.currentPack.abilities ?? []);
    this.accessories.next(this.currentPack.accessories ?? []);
    this.achievements.next(this.currentPack.achievements ?? []);
    this.banners.next(this.currentPack.banners ?? []);
    this.calendarBonuses.next(this.currentPack.calendarBonuses ?? []);
    this.characters.next(this.currentPack.characters ?? []);
    this.enemies.next(this.currentPack.enemies ?? []);
    this.items.next(this.currentPack.items ?? []);
    this.maps.next(this.currentPack.maps ?? []);
    this.shops.next(this.currentPack.shops ?? []);
    this.stores.next(this.currentPack.stores ?? []);
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

    const ensureInteger = (val: number | string) =>  +val.toString().replace(/[^0-9]*/, '');

    trimAll(this.currentPack);

    // ensure ability->baseValue is a number
    this.currentPack.abilities.forEach(a => {
      a.effects.forEach(e => {

        if(!isUndefined(e.props.baseValue)) {
          e.props.baseValue = ensureNumber(e.props.baseValue);
        }

        if(!isUndefined(e.props.surviveDeathReboundValue)) {
          e.props.surviveDeathReboundValue = ensureNumber(e.props.surviveDeathReboundValue);
        }

      });

      Object.values(a.abilityChanges).forEach(c => {
        c.effects.forEach(e => {

          if(!isUndefined(e.props.baseValue)) {
            e.props.baseValue = ensureNumber(e.props.baseValue);
          }

          if(!isUndefined(e.props.surviveDeathReboundValue)) {
            e.props.surviveDeathReboundValue = ensureNumber(e.props.surviveDeathReboundValue);
          }
        });
      });

      a.conditions.forEach(c => {
        if(!isUndefined(c.props.alliesCount)) {
          c.props.alliesCount = ensureNumber(c.props.alliesCount);
        }

        if(!isUndefined(c.props.archetypesInParty)) {
          c.props.archetypesInParty = ensureNumber(c.props.archetypesInParty);
        }

        if(!isUndefined(c.props.enemyCount)) {
          c.props.enemyCount = ensureNumber(c.props.enemyCount);
        }

        if(!isUndefined(c.props.firstTurns)) {
          c.props.firstTurns = ensureNumber(c.props.firstTurns);
        }

        if(!isUndefined(c.props.hpValue)) {
          c.props.hpValue = ensureNumber(c.props.hpValue);
        }

        if(!isUndefined(c.props.spcValue)) {
          c.props.spcValue = ensureNumber(c.props.spcValue);
        }

      });
    });

    // delete empty strings
    this.currentPack.weapons.forEach(w => {
      if(w.secondaryStat) return;

      delete w.secondaryStat;
    });

    this.currentPack.calendarBonuses.forEach(c => {
      c.rewardItems.forEach(i => {
        i.quantity = ensureNumber(i.quantity);
        i.day = ensureNumber(i.day);
      });;
    });

    // ensure character->skill->lb is a number
    this.currentPack.characters.forEach(c => {
      c.skills.forEach(s => {
        s.lb = ensureNumber(s.lb);
      });
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

    // ensure store->quantity is a number
    this.currentPack.stores.forEach(s => {
      s.items.forEach(i => {
        i.quantity = ensureNumber(i.quantity);
      });
      s.cost = ensureInteger(s.cost);
    });

    // ensure skill->{hpCost,spcCost,statScaling[],actions[].statusEffectChanges[]}
    this.currentPack.skills.forEach(s => {

      if(!isUndefined(s.hpCost)) {
        s.hpCost = ensureNumber(s.hpCost);
      }

      if(!isUndefined(s.spcCost)) {
        s.spcCost = ensureNumber(s.spcCost);
      }

      if(!isUndefined(s.cooldown)) {
        s.cooldown = ensureNumber(s.cooldown);
      }

      Object.keys(s.generatedElements).forEach(el => {
        s.generatedElements[el as Element] = ensureNumber(s.generatedElements[el as Element]);
      });

      Object.keys(s.consumedElements).forEach(el => {
        s.consumedElements[el as Element] = ensureNumber(s.consumedElements[el as Element]);
      });

      s.actions.forEach(a => {
        a.hits = ensureNumber(a.hits);
        a.push = ensureNumber(a.push);
        a.pull = ensureNumber(a.pull);

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

          if(!isUndefined(e.probability)) {
            e.probability = ensureNumber(e.probability);
          }
        });

      });

    });

    // achievements->requirements->statValue
    this.currentPack.achievements.forEach(a => {
      if(!a.lockedBy) delete a.lockedBy;

      a.requirements.statValue = ensureNumber(a.requirements.statValue);

      if(!isNumber(a.requirements.mapNodeId) || a.requirements.mapNodeId === -1) delete a.requirements.mapNodeId;
      if(!a.requirements.mapName) delete a.requirements.mapNodeId;

      a.rewards.accessories.forEach(r => r.quantity = ensureNumber(r.quantity));
      a.rewards.characters.forEach(r => r.quantity = ensureNumber(r.quantity));
      a.rewards.items.forEach(r => r.quantity = ensureNumber(r.quantity));
      a.rewards.weapons.forEach(r => r.quantity = ensureNumber(r.quantity));

    });

    // character->spritesheetData
    this.currentPack.characters.forEach(char => {
      if(!char.spritesheetData) return;

      Object.keys(char.spritesheetData).forEach(spriteKey => {
        const key = spriteKey as keyof IUnitSpritesheetData;
        char.spritesheetData[key] = ensureNumber(char.spritesheetData[key]);
      });
    });

    // enemy->spritesheetData
    this.currentPack.enemies.forEach(char => {
      if(!char.spritesheetData) return;

      Object.keys(char.spritesheetData).forEach(spriteKey => {
        const key = spriteKey as keyof IUnitSpritesheetData;
        char.spritesheetData[key] = ensureNumber(char.spritesheetData[key]);
      });
    });

    console.log('Saving: ', this.currentPack);

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

    this.ensureID(ability);

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

  // Achievement-related
  public addAchievement(ach: IAchievement): void {
    if(!this.currentPack.achievements) this.currentPack.achievements = [];

    this.ensureID(ach);
    this.currentPack.achievements.push(ach);
    this.syncAndSave();
  }

  public editAchievement(ach: IAchievement, index: number): void {
    this.currentPack.achievements[index] = ach;
    this.syncAndSave();
  }

  public deleteAchievement(ach: IAchievement): void {
    this.currentPack.achievements = this.currentPack.achievements.filter(a => a !== ach);
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

  // CalendarBonus-related
  public addCalendarBonus(calendarBonus: ICalendarBonus): void {
    if(!this.currentPack.calendarBonuses) this.currentPack.calendarBonuses = [];

    this.ensureID(calendarBonus);

    this.currentPack.calendarBonuses.push(calendarBonus);
    this.syncAndSave();
  }

  public editCalendarBonus(calendarBonus: ICalendarBonus, index: number): void {
    this.currentPack.calendarBonuses[index] = calendarBonus;
    this.syncAndSave();
  }

  public deleteCalendarBonus(calendarBonus: ICalendarBonus): void {
    this.currentPack.calendarBonuses = this.currentPack.calendarBonuses.filter(c => c !== calendarBonus);
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

  // Store-related
  public addStore(store: IStore): void {
    if(!this.currentPack.stores) this.currentPack.stores = [];

    this.ensureID(store);

    this.currentPack.stores.push(store);
    this.syncAndSave();
  }

  public editStore(store: IStore, index: number): void {
    this.currentPack.stores[index] = store;
    this.syncAndSave();
  }

  public deleteStore(store: IStore): void {
    this.currentPack.stores = this.currentPack.stores.filter(s => s !== store);
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
