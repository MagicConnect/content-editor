import { Component, OnInit, TemplateRef } from '@angular/core';
import { cloneDeep } from 'lodash';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { newShop } from '../../initializers';
import { IShop } from 'content-interfaces';
import { ModManagerService } from '../../services/mod-manager.service';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss']
})
export class ShopListComponent implements OnInit {

  public searchText = '';
  public searchResults: IShop[] = [];

  private allShops: IShop[] = [];

  public shops: IShop[] = [];

  public currentShop?: IShop;

  public editIndex = -1;
  public modalRef?: BsModalRef;

  public get canSaveCurrentShop(): boolean {
    if(!this.currentShop) return false;
    return this.currentShop.name?.length >= 2
        && !this.isCurrentShopDuplicateName
        && !!this.currentShop.currencyItem
        && (
           this.currentShop.characters.length > 0
        || this.currentShop.items.length > 0
        || this.currentShop.accessories.length > 0
        || this.currentShop.weapons.length > 0
        )
        && this.currentShop.characters.every(c => c.name)
        && this.currentShop.items.every(c => c.name)
        && this.currentShop.accessories.every(c => c.name)
        && this.currentShop.weapons.every(c => c.name);
  }

  public get isCurrentShopClone(): boolean {
    if(!this.currentShop) return false;
    return this.currentShop.name.includes('(Clone)');
  }

  public get isCurrentShopDuplicateName(): boolean {
    if(!this.currentShop) return false;
    return !!this.shops.filter((x, i) => i !== this.editIndex).find(b => b.name === this.currentShop?.name);
  }

  constructor(
    private modalService: BsModalService,
    public mod: ModManagerService
  ) { }

  ngOnInit() {
    this.mod.shops$.subscribe(shops => {
      this.shops = this.allShops = [...shops];
      this.filter();
    });
  }

  filter() {
    if(!this.searchText) {
      this.searchResults = this.allShops.slice(0);
      return;
    }

    this.searchResults = this.allShops.filter(a => {
      return a.name.toLowerCase().includes(this.searchText.toLowerCase())
          || a.description.toLowerCase().includes(this.searchText.toLowerCase())
          || a.currencyItem.toLowerCase().includes(this.searchText.toLowerCase())
          || a.characters.some(b => b.name.toLowerCase().includes(this.searchText.toLowerCase()))
          || a.items.some(b => b.name.toLowerCase().includes(this.searchText.toLowerCase()))
          || a.accessories.some(b => b.name.toLowerCase().includes(this.searchText.toLowerCase()))
          || a.weapons.some(b => b.name.toLowerCase().includes(this.searchText.toLowerCase()));
    });
  }

  openEditModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { keyboard: false, backdrop: 'static', class: 'big-modal' });
  }

  addNewShop(template: TemplateRef<any>) {
    this.currentShop = newShop();

    this.openEditModal(template);
  }

  cloneShop(template: TemplateRef<any>, shop: IShop) {
    this.currentShop = cloneDeep(shop);
    this.currentShop.name = `${this.currentShop.name} (Clone)`;
    this.openEditModal(template);
  }

  editShop(template: TemplateRef<any>, shop: IShop) {
    this.currentShop = cloneDeep(shop);
    this.openEditModal(template);
    this.mod.rerollID(this.currentShop);
    this.editIndex = this.allShops.findIndex(i => i.name === shop.name);
  }

  confirmShopEdit() {
    if(!this.currentShop || !this.currentShop.name) return;

    if(this.editIndex === -1) {
      this.mod.addShop(this.currentShop);
    } else {
      this.mod.editShop(this.currentShop, this.editIndex);
    }

    this.cancelEdit();
  }

  deleteShop(shop: IShop) {
    if(!confirm('Are you sure you want to delete this shop?')) return;

    this.mod.deleteShop(shop);
  }

  cancelEdit() {
    if(this.modalRef) this.modalRef.hide();

    this.currentShop = undefined;
    this.editIndex = -1;
  }

}
