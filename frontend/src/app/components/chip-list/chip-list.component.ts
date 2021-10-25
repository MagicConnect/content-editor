import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LocalStorage } from 'ngx-webstorage';
import { IChip, PrimaryStat, SecondaryStat } from '../../../../../shared/interfaces';
import { ModManagerService } from '../../services/mod-manager.service';

import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-chip-list',
  templateUrl: './chip-list.component.html',
  styleUrls: ['./chip-list.component.scss']
})
export class ChipListComponent implements OnInit {

  public currentChip?: IChip;
  @LocalStorage('chip-list') public data!: IChip[];

  public editIndex = -1;
  public modalRef?: BsModalRef;

  constructor(
    private modalService: BsModalService,
    public mod: ModManagerService
  ) {}

  ngOnInit() {
    if(!this.data) this.data = [];
  }

  openEditModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { keyboard: false, class: 'big-modal' });
  }

  saveData() {
    this.data = this.data.slice();
  }

  addNewChip(template: TemplateRef<any>) {
    this.currentChip = {
      name: 'Chip Name',
      description: '',
      stars: 1,
      primaryStat: PrimaryStat.Defense,

      abilities: [],

      lbRewards: {
        abilities: {},
        stats: {
          [PrimaryStat.Attack]: 0,
          [PrimaryStat.Defense]: 0,
          [PrimaryStat.Magic]: 0,
          [PrimaryStat.Special]: 0,

          [SecondaryStat.Accuracy]: 0,
          [SecondaryStat.Critical]: 0,
          [SecondaryStat.HP]: 0,
          [SecondaryStat.MP]: 0,
          [SecondaryStat.MagicEvasion]: 0,
          [SecondaryStat.MeleeEvasion]: 0,
        },
        skills: {}
      }
    };

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
      this.data.push(this.currentChip);
    } else {
      this.data[this.editIndex] = this.currentChip;
    }

    this.saveData();
    this.cancelEdit();
  }

  deleteChip(chip: IChip) {
    if(!confirm('Are you sure you want to delete this chip?')) return;

    this.data = this.data.filter(c => c !== chip);
    this.saveData();
  }

  cancelEdit() {
    if(this.modalRef) this.modalRef.hide();

    this.currentChip = undefined;
    this.editIndex = -1;
  }

}
