import { Component, OnInit, TemplateRef } from '@angular/core';
import { IStore } from 'content-interfaces';
import { cloneDeep } from 'lodash';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { newStore } from 'src/app/initializers/store';
import { ModManagerService } from 'src/app/services/mod-manager.service';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.scss']
})
export class StoreListComponent implements OnInit {

  public searchText = '';
  public searchResults: IStore[] = [];

  private allStores: IStore[] = [];

  public stores: IStore[] = [];

  public currentStore?: IStore;

  public editIndex = -1;
  public modalRef?: BsModalRef;

  public get canSaveCurrentStore(): boolean {
    if(!this.currentStore) return false;
    return this.currentStore.name?.length >= 2
        && !this.isCurrentStoreDuplicateName
        && this.currentStore.cost > 0
        && this.currentStore.items.length > 0
        && this.currentStore.items.every(c => !!c.itemType && c.quantity > 0)
        && this.currentStore.cost.toString().includes('.');//isNan(this.currentStore.cost);
  }

  public get isCurrentStoreClone(): boolean {
    if(!this.currentStore) return false;
    return this.currentStore.name.includes('(Clone)');
  }

  public get isCurrentStoreDuplicateName(): boolean {
    if(!this.currentStore) return false;
    return !!this.stores.filter((x, i) => i !== this.editIndex).find(b => b.name === this.currentStore?.name);
  }

  constructor(
    private modalService: BsModalService,
    public mod: ModManagerService
  ) { }

  ngOnInit() {
    this.mod.stores$.subscribe(stores => {
      this.stores = this.allStores = [...stores];
      this.filter();
    });
  }

  filter() {
    if(!this.searchText) {
      this.searchResults = this.allStores.slice(0);
      return;
    }

    this.searchResults = this.allStores.filter(a => {
      return a.name.toLowerCase().includes(this.searchText.toLowerCase())
          || a.items.some(b => b.itemType.toLowerCase().includes(this.searchText.toLowerCase()));
    });
  }

  openEditModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { keyboard: false, backdrop: 'static', class: 'big-modal' });
  }

  addNewStore(template: TemplateRef<any>) {
    this.currentStore = newStore();

    this.openEditModal(template);
  }

  cloneStore(template: TemplateRef<any>, store: IStore) {
    this.currentStore = cloneDeep(store);
    this.currentStore.name = `${this.currentStore.name} (Clone)`;
    this.mod.rerollID(this.currentStore);
    this.openEditModal(template);
  }

  editStore(template: TemplateRef<any>, store: IStore) {
    this.currentStore = cloneDeep(store);
    this.openEditModal(template);
    this.editIndex = this.allStores.findIndex(i => i.name === store.name);
  }

  confirmStoreEdit() {
    if(!this.currentStore || !this.currentStore.name) return;

    if(this.editIndex === -1) {
      this.mod.addStore(this.currentStore);
    } else {
      this.mod.editStore(this.currentStore, this.editIndex);
    }

    this.cancelEdit();
  }

  deleteStore(store: IStore) {
    if(!confirm('Are you sure you want to delete this store?')) return;

    this.mod.deleteStore(store);
  }

  cancelEdit() {
    if(this.modalRef) this.modalRef.hide();

    this.currentStore = undefined;
    this.editIndex = -1;
  }

}
