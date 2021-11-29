import { Component, OnInit, TemplateRef } from '@angular/core';
import { cloneDeep } from 'lodash';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { newItem } from '../../../../../shared/initializers';
import { IBanner, IItem, IShop } from '../../../../../shared/interfaces';
import { ModManagerService } from '../../services/mod-manager.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  private allItems: IItem[] = [];

  public items: IItem[] = [];
  public banners: IBanner[] = [];
  public shops: IShop[] = [];

  public currentItem?: IItem;

  public editIndex = -1;
  public modalRef?: BsModalRef;

  public get canSaveCurrentItem(): boolean {
    if(!this.currentItem) return false;
    return this.currentItem.name?.length >= 2
        && !this.isCurrentItemDuplicateName
        && this.currentItem.sellValue > 0
        && !!this.currentItem.itemType;
  }

  public get isCurrentItemDuplicateName(): boolean {
    if(!this.currentItem) return false;
    return !!this.items.filter((x, i) => i !== this.editIndex).find(b => b.name === this.currentItem?.name);
  }

  constructor(
    private modalService: BsModalService,
    public mod: ModManagerService
  ) { }

  ngOnInit() {
    this.mod.items$.subscribe(items => this.items = this.allItems = [...items]);
    this.mod.banners$.subscribe(banners => this.banners = [...banners]);
    this.mod.shops$.subscribe(shops => this.shops = [...shops]);
  }

  openEditModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { keyboard: false, backdrop: 'static', class: 'big-modal' });
  }

  addNewItem(template: TemplateRef<any>) {
    this.currentItem = newItem();

    this.openEditModal(template);
  }

  editItem(template: TemplateRef<any>, item: IItem) {
    this.currentItem = cloneDeep(item);
    this.openEditModal(template);
    this.editIndex = this.allItems.findIndex(i => i.name === item.name);
  }

  confirmItemEdit() {
    if(!this.currentItem || !this.currentItem.name) return;

    if(this.editIndex === -1) {
      this.mod.addItem(this.currentItem);
    } else {
      this.mod.editItem(this.currentItem, this.editIndex);
    }

    this.cancelEdit();
  }

  deleteItem(item: IItem) {
    if(!confirm('Are you sure you want to delete this item?')) return;

    this.mod.deleteItem(item);
  }

  cancelEdit() {
    if(this.modalRef) this.modalRef.hide();

    this.currentItem = undefined;
    this.editIndex = -1;
  }

  itemCurrentlyUsedIn(item: IItem): string[] {
    const banners = this.banners.filter(banner => banner.items.find(i => i.name === item.name)).map(b => `Banner: ${b.name}`);

    const shops = this.shops.filter(shop => shop.currencyItem === item.name || shop.items.find(i => i.name === item.name)).map(s => `Shop: ${s.name}`);

    return [...banners, ...shops];
  }

  isItemCurrentlyInUse(item: IItem): boolean {
    return this.itemCurrentlyUsedIn(item).length > 0;
  }
}
