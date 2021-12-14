import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IBanner, IAccessory, IShop } from 'content-interfaces';
import { ModManagerService } from '../../services/mod-manager.service';

import { cloneDeep } from 'lodash';
import { newAccessory } from '../../../../../shared/initializers';

@Component({
  selector: 'app-accessory-list',
  templateUrl: './accessory-list.component.html',
  styleUrls: ['./accessory-list.component.scss']
})
export class AccessoryListComponent implements OnInit {

  public searchText = '';
  public searchResults: IAccessory[] = [];

  private allAccessories: IAccessory[] = [];

  public accessories: IAccessory[] = [];
  public banners: IBanner[] = [];
  public shops: IShop[] = [];

  public currentAccessory?: IAccessory;

  public editIndex = -1;
  public modalRef?: BsModalRef;

  public get canSaveCurrentAccessory(): boolean {
    if(!this.currentAccessory) return false;
    return this.currentAccessory.name?.length >= 2
        && !this.isCurrentAccessoryDuplicateName
        && !this.isCurrentAccessoryClone
        && this.currentAccessory.primaryStat
        && this.currentAccessory.stars >= 1;
  }

  public get isCurrentAccessoryClone(): boolean {
    if(!this.currentAccessory) return false;
    return this.currentAccessory.name.includes('(Clone)');
  }

  public get isCurrentAccessoryDuplicateName(): boolean {
    if(!this.currentAccessory) return false;
    return !!this.accessories.filter((x, i) => i !== this.editIndex).find(b => b.name === this.currentAccessory?.name);
  }

  public get isCurrentAccessoryDuplicateArt(): boolean {
    if(!this.currentAccessory) return false;
    return !!this.accessories.filter((x, i) => i !== this.editIndex).find(b => b.art === this.currentAccessory?.art);
  }

  constructor(
    private modalService: BsModalService,
    public mod: ModManagerService
  ) { }

  ngOnInit() {
    this.mod.accessories$.subscribe(accessories => {
      this.accessories = this.allAccessories = [...accessories];
      this.filter();
    });

    this.mod.banners$.subscribe(banners => this.banners = [...banners]);
    this.mod.shops$.subscribe(shops => this.shops = [...shops]);
  }

  filter() {
    if(!this.searchText) {
      this.searchResults = this.allAccessories.slice(0);
      return;
    }

    this.searchResults = this.allAccessories.filter(a => {
      return a.name.toLowerCase().includes(this.searchText.toLowerCase())
          || a.description.toLowerCase().includes(this.searchText.toLowerCase())
          || a.primaryStat.toLowerCase().includes(this.searchText.toLowerCase())
          || a.abilities.some(a => a.toLowerCase().includes(this.searchText.toLowerCase()))
          || this.accessoryCurrentlyUsedIn(a).some(a => a.toLowerCase().includes(this.searchText.toLowerCase()));
    });
  }

  openEditModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { keyboard: false, backdrop: 'static', class: 'big-modal' });
  }

  addNewAccessory(template: TemplateRef<any>) {
    this.currentAccessory = newAccessory();

    this.openEditModal(template);
  }

  cloneAccessory(template: TemplateRef<any>, acc: IAccessory) {
    this.currentAccessory = cloneDeep(acc);
    this.currentAccessory.name = `${this.currentAccessory.name} (Clone)`;
    this.openEditModal(template);
  }

  editAccessory(template: TemplateRef<any>, acc: IAccessory) {
    this.currentAccessory = cloneDeep(acc);
    this.openEditModal(template);
    this.editIndex = this.allAccessories.findIndex(i => i.name === acc.name);
  }

  confirmAccessoryEdit() {
    if(!this.currentAccessory || !this.currentAccessory.name) return;

    if(this.editIndex === -1) {
      this.mod.addAccessory(this.currentAccessory);
    } else {
      this.mod.editAccessory(this.currentAccessory, this.editIndex);
    }

    this.cancelEdit();
  }

  deleteAccessory(acc: IAccessory) {
    if(!confirm('Are you sure you want to delete this accessory?')) return;

    this.mod.deleteAccessory(acc);
  }

  cancelEdit() {
    if(this.modalRef) this.modalRef.hide();

    this.currentAccessory = undefined;
    this.editIndex = -1;
  }

  accessoryCurrentlyUsedIn(acc: IAccessory): string[] {
    const banners = this.banners.filter(banner => banner.accessories.find(c => c.name === acc.name)).map(b => `Banner: ${b.name}`);

    const shops = this.shops.filter(shop => shop.accessories.find(c => c.name === acc.name)).map(s => `Shop: ${s.name}`);

    return [...banners, ...shops];
  }

  isAccessoryCurrentlyInUse(acc: IAccessory): boolean {
    return this.accessoryCurrentlyUsedIn(acc).length > 0;
  }

}
