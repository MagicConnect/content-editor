import { Component, OnInit, TemplateRef } from '@angular/core';
import { cloneDeep } from 'lodash';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { newMap } from '../../../../../shared/initializers';
import { IMap } from '../../../../../shared/interfaces';
import { ModManagerService } from '../../services/mod-manager.service';

@Component({
  selector: 'app-map-list',
  templateUrl: './map-list.component.html',
  styleUrls: ['./map-list.component.scss']
})
export class MapListComponent implements OnInit {

  public searchText = '';
  public searchResults: IMap[] = [];

  private allMaps: IMap[] = [];

  public maps: IMap[] = [];

  public currentMap?: IMap;

  public editIndex = -1;
  public modalRef?: BsModalRef;

  public get canSaveCurrentMap(): boolean {
    if(!this.currentMap) return false;
    return this.currentMap.name?.length >= 2
        && !this.isCurrentMapDuplicateName
        && this.currentMap.nodes.length >= 1
        && this.currentMap.nodes.every(x => x.name
          && x.drops.every(d => d.name
                             && d.dropPercent > 0
                             && d.dropPercent <= 100
                             && d.quantity >= 1)
          && x.combat.grid.flat().every(c => c && c.enemy.name && c.enemy.level >= 1)
          );
  }

  public get isCurrentMapClone(): boolean {
    if(!this.currentMap) return false;
    return this.currentMap.name.includes('(Clone)');
  }

  public get isCurrentMapDuplicateName(): boolean {
    if(!this.currentMap) return false;
    return !!this.maps.filter((x, i) => i !== this.editIndex).find(b => b.name === this.currentMap?.name);
  }

  public get isCurrentMapDuplicateArt(): boolean {
    if(!this.currentMap) return false;
    return !!this.maps.filter((x, i) => i !== this.editIndex).find(b => b.art === this.currentMap?.art);
  }

  constructor(
    private modalService: BsModalService,
    public mod: ModManagerService
  ) { }

  ngOnInit() {
    this.mod.maps$.subscribe(maps => {
      this.maps = this.allMaps = [...maps];
      this.filter();
    });
  }

  filter() {
    if(!this.searchText) {
      this.searchResults = this.allMaps.slice(0);
      return;
    }

    this.searchResults = this.allMaps.filter(a => {
      return a.name.toLowerCase().includes(this.searchText.toLowerCase())
          || a.nodes.find(b => b.name.toLowerCase().includes(this.searchText.toLowerCase()));
    });
  }

  openEditModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { keyboard: false, backdrop: 'static', class: 'big-modal' });
  }

  addNewMap(template: TemplateRef<any>) {
    this.currentMap = newMap();

    this.openEditModal(template);
  }

  cloneMap(template: TemplateRef<any>, map: IMap) {
    this.currentMap = cloneDeep(map);
    this.currentMap.name = `${this.currentMap.name} (Clone)`;
    this.openEditModal(template);
  }

  editMap(template: TemplateRef<any>, map: IMap) {
    this.currentMap = cloneDeep(map);
    this.openEditModal(template);
    this.editIndex = this.allMaps.findIndex(i => i.name === map.name);
  }

  confirmMapEdit() {
    if(!this.currentMap || !this.currentMap.name) return;

    if(this.editIndex === -1) {
      this.mod.addMap(this.currentMap);
    } else {
      this.mod.editMap(this.currentMap, this.editIndex);
    }

    this.cancelEdit();
  }

  deleteMap(map: IMap) {
    if(!confirm('Are you sure you want to delete this map?')) return;

    this.mod.deleteMap(map);
  }

  cancelEdit() {
    if(this.modalRef) this.modalRef.hide();

    this.currentMap = undefined;
    this.editIndex = -1;
  }

}
