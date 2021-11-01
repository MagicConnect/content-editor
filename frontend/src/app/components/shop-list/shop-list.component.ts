import { Component, OnInit, TemplateRef } from '@angular/core';
import { cloneDeep } from 'lodash';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { newShop } from '../../../../../shared/initializers';
import { IShop } from '../../../../../shared/interfaces';
import { ModManagerService } from '../../services/mod-manager.service';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss']
})
export class ShopListComponent implements OnInit {

  public shops: IShop[] = [];

  public currentShop?: IShop;

  public editIndex = -1;
  public modalRef?: BsModalRef;

  constructor(
    private modalService: BsModalService,
    public mod: ModManagerService
  ) { }

  ngOnInit() {
    this.mod.shops$.subscribe(shops => this.shops = [...shops]);
  }

  openEditModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { keyboard: false, backdrop: 'static', class: 'big-modal' });
  }

  addNewShop(template: TemplateRef<any>) {
    this.currentShop = newShop();

    this.openEditModal(template);
  }

  editShop(template: TemplateRef<any>, shop: IShop, index: number) {
    this.currentShop = cloneDeep(shop);
    this.openEditModal(template);
    this.editIndex = index;
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
