import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IWeapon } from '../../../../../shared/interfaces';
import { ModManagerService } from '../../services/mod-manager.service';

import { cloneDeep } from 'lodash';
import { newWeapon } from '../../../../../shared/initializers';

@Component({
  selector: 'app-weapon-list',
  templateUrl: './weapon-list.component.html',
  styleUrls: ['./weapon-list.component.scss']
})
export class WeaponListComponent implements OnInit {

  public weapons: IWeapon[] = [];

  public currentWeapon?: IWeapon;

  public editIndex = -1;
  public modalRef?: BsModalRef;

  constructor(
    private modalService: BsModalService,
    public mod: ModManagerService
  ) { }

  ngOnInit() {
    this.mod.weapons$.subscribe(weapons => this.weapons = [...weapons]);
  }

  openEditModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { keyboard: false, class: 'big-modal' });
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

}
