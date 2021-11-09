import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IChip } from '../../../../../shared/interfaces';
import { ModManagerService } from '../../services/mod-manager.service';

import { cloneDeep, sum } from 'lodash';
import { newChip } from '../../../../../shared/initializers';

@Component({
  selector: 'app-chip-list',
  templateUrl: './chip-list.component.html',
  styleUrls: ['./chip-list.component.scss']
})
export class ChipListComponent implements OnInit {

  public chips: IChip[] = [];

  public currentChip?: IChip;

  public editIndex = -1;
  public modalRef?: BsModalRef;

  public get canSaveCurrentChip(): boolean {
    if(!this.currentChip) return false;
    return this.currentChip.name?.length >= 2
        && this.currentChip.primaryStat
        && this.currentChip.stars >= 1
        && sum(Object.values(this.currentChip.lbRewards.statPoints)) > 0;
  }

  constructor(
    private modalService: BsModalService,
    public mod: ModManagerService
  ) { }

  ngOnInit() {
    this.mod.chips$.subscribe(chips => this.chips = [...chips]);
  }

  openEditModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { keyboard: false, backdrop: 'static', class: 'big-modal' });
  }

  addNewChip(template: TemplateRef<any>) {
    this.currentChip = newChip();

    this.openEditModal(template);
  }

  editChip(template: TemplateRef<any>, chip: IChip, index: number) {
    this.currentChip = cloneDeep(chip);
    this.openEditModal(template);
    this.editIndex = index;
  }

  confirmChipEdit() {
    if(!this.currentChip || !this.currentChip.name) return;

    if(this.editIndex === -1) {
      this.mod.addChip(this.currentChip);
    } else {
      this.mod.editChip(this.currentChip, this.editIndex);
    }

    this.cancelEdit();
  }

  deleteChip(chip: IChip) {
    if(!confirm('Are you sure you want to delete this chip?')) return;

    this.mod.deleteChip(chip);
  }

  cancelEdit() {
    if(this.modalRef) this.modalRef.hide();

    this.currentChip = undefined;
    this.editIndex = -1;
  }

}
