import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IBanner, IShop, IWeapon } from '../../../../../shared/interfaces';
import { ModManagerService } from '../../services/mod-manager.service';

import { cloneDeep } from 'lodash';
import { newWeapon } from '../../../../../shared/initializers';

@Component({
  selector: 'app-weapon-list',
  templateUrl: './weapon-list.component.html',
  styleUrls: ['./weapon-list.component.scss']
})
export class WeaponListComponent implements OnInit {

  public searchText = '';
  public searchResults: IWeapon[] = [];

  private allWeapons: IWeapon[] = [];

  public weapons: IWeapon[] = [];
  public banners: IBanner[] = [];
  public shops: IShop[] = [];

  public currentWeapon?: IWeapon;

  public editIndex = -1;
  public modalRef?: BsModalRef;

  public get canSaveCurrentWeapon(): boolean {
    if(!this.currentWeapon) return false;
    return this.currentWeapon.name?.length >= 2
        && !this.isCurrentWeaponDuplicateName
        && this.currentWeapon.primaryStat
        && this.currentWeapon.stars >= 1
        && !!this.currentWeapon.weaponType;
  }

  public get isCurrentWeaponClone(): boolean {
    if(!this.currentWeapon) return false;
    return this.currentWeapon.name.includes('(Clone)');
  }

  public get isCurrentWeaponDuplicateName(): boolean {
    if(!this.currentWeapon) return false;
    return !!this.weapons.filter((x, i) => i !== this.editIndex).find(b => b.name === this.currentWeapon?.name);
  }

  public get isCurrentWeaponDuplicateArt(): boolean {
    if(!this.currentWeapon) return false;
    return !!this.weapons.filter((x, i) => i !== this.editIndex).find(b => b.art === this.currentWeapon?.art);
  }

  constructor(
    private modalService: BsModalService,
    public mod: ModManagerService
  ) { }

  ngOnInit() {
    this.mod.weapons$.subscribe(weapons => {
      this.weapons = this.allWeapons = [...weapons];
      this.filter();
    });
    this.mod.banners$.subscribe(banners => this.banners = [...banners]);
    this.mod.shops$.subscribe(shops => this.shops = [...shops]);
  }

  filter() {
    if(!this.searchText) {
      this.searchResults = this.allWeapons.slice(0);
      return;
    }

    this.searchResults = this.allWeapons.filter(a => {
      return a.name.toLowerCase().includes(this.searchText.toLowerCase())
          || a.weaponType.toLowerCase().includes(this.searchText.toLowerCase())
          || a.description.toLowerCase().includes(this.searchText.toLowerCase())
          || a.primaryStat.toLowerCase().includes(this.searchText.toLowerCase())
          || a.secondaryStat?.toLowerCase().includes(this.searchText.toLowerCase())
          || a.abilities.some(a => a.toLowerCase().includes(this.searchText.toLowerCase()))
          || this.weaponCurrentlyUsedIn(a).some(a => a.toLowerCase().includes(this.searchText.toLowerCase()));
    });
  }

  openEditModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { keyboard: false, backdrop: 'static', class: 'big-modal' });
  }

  addNewWeapon(template: TemplateRef<any>) {
    this.currentWeapon = newWeapon();

    this.openEditModal(template);
  }

  cloneWeapon(template: TemplateRef<any>, weapon: IWeapon) {
    this.currentWeapon = cloneDeep(weapon);
    this.currentWeapon.name = `${this.currentWeapon.name} (Clone)`;
    this.openEditModal(template);
  }

  editWeapon(template: TemplateRef<any>, weapon: IWeapon) {
    this.currentWeapon = cloneDeep(weapon);
    this.openEditModal(template);
    this.editIndex = this.allWeapons.findIndex(i => i.name === weapon.name);
  }

  confirmWeaponEdit() {
    if(!this.currentWeapon || !this.currentWeapon.name) return;

    if(this.editIndex === -1) {
      this.mod.addWeapon(this.currentWeapon);
    } else {
      this.mod.editWeapon(this.currentWeapon, this.editIndex);
    }

    this.cancelEdit();
  }

  deleteWeapon(weapon: IWeapon) {
    if(!confirm('Are you sure you want to delete this weapon?')) return;

    this.mod.deleteWeapon(weapon);
  }

  cancelEdit() {
    if(this.modalRef) this.modalRef.hide();

    this.currentWeapon = undefined;
    this.editIndex = -1;
  }

  weaponCurrentlyUsedIn(weapon: IWeapon): string[] {
    const banners = this.banners.filter(banner => banner.weapons.find(w => w.name === weapon.name)).map(b => `Banner: ${b.name}`);

    const shops = this.shops.filter(shop => shop.weapons.find(w => w.name === weapon.name)).map(s => `Shop: ${s.name}`);

    return [...banners, ...shops];
  }

  isWeaponCurrentlyInUse(weapon: IWeapon): boolean {
    return this.weaponCurrentlyUsedIn(weapon).length > 0;
  }

}
