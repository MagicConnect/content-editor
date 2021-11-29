import { Component, OnInit, TemplateRef } from '@angular/core';
import { cloneDeep } from 'lodash';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { newBanner } from '../../../../../shared/initializers';
import { IBanner } from '../../../../../shared/interfaces';
import { ModManagerService } from '../../services/mod-manager.service';

@Component({
  selector: 'app-banner-list',
  templateUrl: './banner-list.component.html',
  styleUrls: ['./banner-list.component.scss']
})
export class BannerListComponent implements OnInit {

  private allBanners: IBanner[] = [];

  public banners: IBanner[] = [];

  public currentBanner?: IBanner;

  public editIndex = -1;
  public modalRef?: BsModalRef;

  public get canSaveCurrentBanner(): boolean {
    if(!this.currentBanner) return false;

    return this.currentBanner.name?.length >= 2
        && !this.isCurrentBannerDuplicateName
        && this.currentBanner.type
        && (
           this.currentBanner.characters.length > 0
        || this.currentBanner.items.length > 0
        || this.currentBanner.chips.length > 0
        || this.currentBanner.weapons.length > 0
        );
  }

  public get isCurrentBannerDuplicateName(): boolean {
    if(!this.currentBanner) return false;
    return !!this.banners.filter((x, i) => i !== this.editIndex).find(b => b.name === this.currentBanner?.name);
  }

  constructor(
    private modalService: BsModalService,
    public mod: ModManagerService
  ) { }

  ngOnInit() {
    this.mod.banners$.subscribe(banners => this.banners = this.allBanners = [...banners]);
  }

  openEditModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { keyboard: false, backdrop: 'static', class: 'big-modal' });
  }

  addNewBanner(template: TemplateRef<any>) {
    this.currentBanner = newBanner();

    this.openEditModal(template);
  }

  editBanner(template: TemplateRef<any>, banner: IBanner) {
    this.currentBanner = cloneDeep(banner);
    this.openEditModal(template);
    this.editIndex = this.allBanners.findIndex(i => i.name === banner.name);
  }

  confirmBannerEdit() {
    if(!this.currentBanner || !this.currentBanner.name) return;

    if(this.editIndex === -1) {
      this.mod.addBanner(this.currentBanner);
    } else {
      this.mod.editBanner(this.currentBanner, this.editIndex);
    }

    this.cancelEdit();
  }

  deleteBanner(banner: IBanner) {
    if(!confirm('Are you sure you want to delete this banner?')) return;

    this.mod.deleteBanner(banner);
  }

  cancelEdit() {
    if(this.modalRef) this.modalRef.hide();

    this.currentBanner = undefined;
    this.editIndex = -1;
  }

}
