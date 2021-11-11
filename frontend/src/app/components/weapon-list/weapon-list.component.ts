import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IBanner, IShop, IWeapon } from '../../../../../shared/interfaces';
import { ModManagerService } from '../../services/mod-manager.service';

import { cloneDeep, sum } from 'lodash';
import { newWeapon } from '../../../../../shared/initializers';

@Component({
  selector: 'app-weapon-list',
  templateUrl: './weapon-list.component.html',
  styleUrls: ['./weapon-list.component.scss']
})
export class WeaponListComponent implements OnInit {

  public weapons: IWeapon[] = [];
  public banners: IBanner[] = [];
  public shops: IShop[] = [];

  public currentWeapon?: IWeapon;

  public editIndex = -1;
  public modalRef?: BsModalRef;

  public get canSaveCurrentWeapon(): boolean {
    if(!this.currentWeapon) return false;
    return this.currentWeapon.name?.length >= 2
        && this.currentWeapon.primaryStat
        && this.currentWeapon.stars >= 1;
  }

  constructor(
    private modalService: BsModalService,
    public mod: ModManagerService
  ) { }

  ngOnInit() {
    this.mod.weapons$.subscribe(weapons => this.weapons = [...weapons]);
    this.mod.banners$.subscribe(banners => this.banners = [...banners]);
    this.mod.shops$.subscribe(shops => this.shops = [...shops]);
  }

  openEditModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { keyboard: false, backdrop: 'static', class: 'big-modal' });
  }

  addNewWeapon(template: TemplateRef<any>) {
    this.currentWeapon = newWeapon();

    this.openEditModal(template);
  }

  editWeapon(template: TemplateRef<any>, weapon: IWeapon, index: number) {
    this.currentWeapon = cloneDeep(weapon);
    this.openEditModal(template);
    this.editIndex = index;
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
