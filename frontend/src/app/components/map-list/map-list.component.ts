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

  public maps: IMap[] = [];

  public currentMap?: IMap;

  public editIndex = -1;
  public modalRef?: BsModalRef;

  constructor(
    private modalService: BsModalService,
    public mod: ModManagerService
  ) { }

  ngOnInit() {
    this.mod.maps$.subscribe(maps => this.maps = [...maps]);
  }

  openEditModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { keyboard: false, backdrop: 'static', class: 'big-modal' });
  }

  addNewMap(template: TemplateRef<any>) {
    this.currentMap = newMap();

    this.openEditModal(template);
  }

  editMap(template: TemplateRef<any>, map: IMap, index: number) {
    this.currentMap = cloneDeep(map);
    this.openEditModal(template);
    this.editIndex = index;
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
