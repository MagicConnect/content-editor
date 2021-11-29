import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IBanner, IChip, IShop } from '../../../../../shared/interfaces';
import { ModManagerService } from '../../services/mod-manager.service';

import { cloneDeep } from 'lodash';
import { newChip } from '../../../../../shared/initializers';

@Component({
  selector: 'app-chip-list',
  templateUrl: './chip-list.component.html',
  styleUrls: ['./chip-list.component.scss']
})
export class ChipListComponent implements OnInit {

  private allChips: IChip[] = [];

  public chips: IChip[] = [];
  public banners: IBanner[] = [];
  public shops: IShop[] = [];

  public currentChip?: IChip;

  public editIndex = -1;
  public modalRef?: BsModalRef;

  public get canSaveCurrentChip(): boolean {
    if(!this.currentChip) return false;
    return this.currentChip.name?.length >= 2
        && !this.isCurrentChipDuplicateName
        && this.currentChip.primaryStat
        && this.currentChip.stars >= 1;
  }

  public get isCurrentChipDuplicateName(): boolean {
    if(!this.currentChip) return false;
    return !!this.chips.filter((x, i) => i !== this.editIndex).find(b => b.name === this.currentChip?.name);
  }

  constructor(
    private modalService: BsModalService,
    public mod: ModManagerService
  ) { }

  ngOnInit() {
    this.mod.chips$.subscribe(chips => this.chips = this.allChips = [...chips]);
    this.mod.banners$.subscribe(banners => this.banners = [...banners]);
    this.mod.shops$.subscribe(shops => this.shops = [...shops]);
  }

  openEditModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { keyboard: false, backdrop: 'static', class: 'big-modal' });
  }

  addNewChip(template: TemplateRef<any>) {
    this.currentChip = newChip();

    this.openEditModal(template);
  }

  editChip(template: TemplateRef<any>, chip: IChip) {
    this.currentChip = cloneDeep(chip);
    this.openEditModal(template);
    this.editIndex = this.allChips.findIndex(i => i.name === chip.name);
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

  chipCurrentlyUsedIn(chip: IChip): string[] {
    const banners = this.banners.filter(banner => banner.chips.find(c => c.name === chip.name)).map(b => `Banner: ${b.name}`);

    const shops = this.shops.filter(shop => shop.chips.find(c => c.name === chip.name)).map(s => `Shop: ${s.name}`);

    return [...banners, ...shops];
  }

  isChipCurrentlyInUse(chip: IChip): boolean {
    return this.chipCurrentlyUsedIn(chip).length > 0;
  }

}
