import { Component, OnInit, TemplateRef } from '@angular/core';
import { cloneDeep } from 'lodash';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { newItem } from '../../../../../shared/initializers';
import { IItem } from '../../../../../shared/interfaces';
import { ModManagerService } from '../../services/mod-manager.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  public items: IItem[] = [];

  public currentItem?: IItem;

  public editIndex = -1;
  public modalRef?: BsModalRef;

  constructor(
    private modalService: BsModalService,
    public mod: ModManagerService
  ) { }

  ngOnInit() {
    this.mod.items$.subscribe(items => this.items = [...items]);
  }

  openEditModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { keyboard: false, backdrop: 'static', class: 'big-modal' });
  }

  addNewItem(template: TemplateRef<any>) {
    this.currentItem = newItem();

    this.openEditModal(template);
  }

  editItem(template: TemplateRef<any>, item: IItem, index: number) {
    this.currentItem = cloneDeep(item);
    this.openEditModal(template);
    this.editIndex = index;
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
}
