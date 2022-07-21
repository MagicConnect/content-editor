import { Component, OnInit, TemplateRef } from '@angular/core';
import { IAchievement } from '@magicconnect/content-interfaces';
import { cloneDeep } from 'lodash';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { newAchievement } from '../../initializers';
import { ModManagerService } from '../../services/mod-manager.service';

@Component({
  selector: 'app-achievement-list',
  templateUrl: './achievement-list.component.html',
  styleUrls: ['./achievement-list.component.scss']
})
export class AchievementListComponent implements OnInit {

  public searchText = '';
  public searchResults: IAchievement[] = [];

  private allItems: IAchievement[] = [];
  private items: IAchievement[] = [];

  public currentItem?: IAchievement;

  public editIndex = -1;
  public modalRef?: BsModalRef;

  public get canSaveCurrentItem(): boolean {
    if(!this.currentItem) return false;
    return this.currentItem.name?.length >= 2
        && this.currentItem.requirements.statValue > 0
        && this.currentItem.lockedBy !== this.currentItem.id
        && !this.isCurrentItemDuplicateName;
  }

  public get isCurrentItemClone(): boolean {
    if(!this.currentItem) return false;
    return this.currentItem.name.includes('(Clone)');
  }

  public get isCurrentItemDuplicateName(): boolean {
    if(!this.currentItem) return false;
    return !!this.items.filter((x, i) => i !== this.editIndex).find(b => b.name === this.currentItem?.name);
  }

  public get isCurrentItemDuplicateArt(): boolean {
    if(!this.currentItem) return false;
    return !!this.items.filter((x, i) => i !== this.editIndex).find(b => b.art === this.currentItem?.art);
  }

  constructor(
    private modalService: BsModalService,
    public mod: ModManagerService
  ) { }

  ngOnInit() {
    this.mod.achievements$.subscribe(items => {
      this.items = this.allItems = [...items];
      this.filter();
    });
  }

  filter() {
    if(!this.searchText) {
      this.searchResults = this.allItems.slice(0);
      return;
    }

    this.searchResults = this.allItems.filter(a => {
      return a.name.toLowerCase().includes(this.searchText.toLowerCase())
          || a.requirements.stat.toLowerCase().includes(this.searchText.toLowerCase());
    });
  }

  openEditModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { keyboard: false, backdrop: 'static', class: 'big-modal' });
  }

  addNewItem(template: TemplateRef<any>) {
    this.currentItem = newAchievement();

    this.openEditModal(template);
  }

  cloneItem(template: TemplateRef<any>, item: IAchievement) {
    this.currentItem = cloneDeep(item);
    this.currentItem.name = `${this.currentItem.name} (Clone)`;
    this.mod.rerollID(this.currentItem);
    this.openEditModal(template);
  }

  editItem(template: TemplateRef<any>, item: IAchievement) {
    this.currentItem = cloneDeep(item);
    this.openEditModal(template);
    this.editIndex = this.allItems.findIndex(i => i.name === item.name);
  }

  confirmItemEdit() {
    if(!this.currentItem || !this.currentItem.name) return;

    if(this.editIndex === -1) {
      this.mod.addAchievement(this.currentItem);
    } else {
      this.mod.editAchievement(this.currentItem, this.editIndex);
    }

    this.cancelEdit();
  }

  deleteItem(item: IAchievement) {
    if(!confirm('Are you sure you want to delete this achievement?')) return;

    this.mod.deleteAchievement(item);
  }

  cancelEdit() {
    if(this.modalRef) this.modalRef.hide();

    this.currentItem = undefined;
    this.editIndex = -1;
  }

  mapName(id: string): string {
    if(!id) return '';

    return this.mod.filteredMaps.find(x => x.id === id)?.name ?? 'UNKNOWN';
  }

  mapNodeName(mapId: string, id: number): string {
    if(!mapId || !id || id === -1) return '';

    return this.mod.filteredMaps.find(x => x.id === mapId)?.nodes.find(n => n.id === id)?.name ?? 'UNKNOWN';
  }

  achievementName(id: string): string {
    if(!id) return '';

    return this.mod.filteredAchievements.find(x => x.id === id)?.name ?? 'UNKNOWN';
  }

}
