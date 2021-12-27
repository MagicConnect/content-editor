import { Component, OnInit, TemplateRef } from '@angular/core';
import { cloneDeep } from 'lodash';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { newBanner } from '../../initializers';
import { IBanner } from 'content-interfaces';
import { ModManagerService } from '../../services/mod-manager.service';

@Component({
  selector: 'app-banner-list',
  templateUrl: './banner-list.component.html',
  styleUrls: ['./banner-list.component.scss']
})
export class BannerListComponent implements OnInit {

  public searchText = '';
  public searchResults: IBanner[] = [];

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
        || this.currentBanner.accessories.length > 0
        || this.currentBanner.weapons.length > 0
        )
        && this.currentBanner.characters.every(c => c.name)
        && this.currentBanner.items.every(c => c.name)
        && this.currentBanner.accessories.every(c => c.name)
        && this.currentBanner.weapons.every(c => c.name);
  }

  public get isCurrentBannerClone(): boolean {
    if(!this.currentBanner) return false;
    return this.currentBanner.name.includes('(Clone)');
  }

  public get isCurrentBannerDuplicateName(): boolean {
    if(!this.currentBanner) return false;
    return !!this.banners.filter((x, i) => i !== this.editIndex).find(b => b.name === this.currentBanner?.name);
  }

  public get isCurrentBannerDuplicateArt(): boolean {
    if(!this.currentBanner) return false;
    return !!this.banners.filter((x, i) => i !== this.editIndex).find(b => b.art === this.currentBanner?.art);
  }

  constructor(
    private modalService: BsModalService,
    public mod: ModManagerService
  ) { }

  ngOnInit() {
    this.mod.banners$.subscribe(banners => {
      this.banners = this.allBanners = [...banners];
      this.filter();
    });
  }

  filter() {
    if(!this.searchText) {
      this.searchResults = this.allBanners.slice(0);
      return;
    }

    this.searchResults = this.allBanners.filter(a => {
      return a.name.toLowerCase().includes(this.searchText.toLowerCase())
          || a.description.toLowerCase().includes(this.searchText.toLowerCase())
          || a.characters.filter(c => c.name.toLowerCase().includes(this.searchText.toLowerCase())).length > 0
          || a.items.filter(i => i.name.toLowerCase().includes(this.searchText.toLowerCase())).length > 0
          || a.accessories.filter(c => c.name.toLowerCase().includes(this.searchText.toLowerCase())).length > 0
          || a.weapons.filter(w => w.name.toLowerCase().includes(this.searchText.toLowerCase())).length > 0;
    });
  }

  openEditModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { keyboard: false, backdrop: 'static', class: 'big-modal' });
  }

  addNewBanner(template: TemplateRef<any>) {
    this.currentBanner = newBanner();

    this.openEditModal(template);
  }

  cloneBanner(template: TemplateRef<any>, banner: IBanner) {
    this.currentBanner = cloneDeep(banner);
    this.currentBanner.name = `${this.currentBanner.name} (Clone)`;
    this.mod.rerollID(this.currentBanner);
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
