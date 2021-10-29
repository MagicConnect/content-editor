import { Component, OnInit, TemplateRef } from '@angular/core';
import { cloneDeep } from 'lodash';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { newEnemy } from '../../../../../shared/initializers';
import { IEnemy } from '../../../../../shared/interfaces';
import { ModManagerService } from '../../services/mod-manager.service';

@Component({
  selector: 'app-enemy-list',
  templateUrl: './enemy-list.component.html',
  styleUrls: ['./enemy-list.component.scss']
})
export class EnemyListComponent implements OnInit {

  public enemies: IEnemy[] = [];

  public currentEnemy?: IEnemy;

  public editIndex = -1;
  public modalRef?: BsModalRef;

  constructor(
    private modalService: BsModalService,
    public mod: ModManagerService
  ) { }

  ngOnInit() {
    this.mod.enemies$.subscribe(enemies => this.enemies = [...enemies]);
  }

  openEditModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { keyboard: false, backdrop: 'static', class: 'big-modal' });
  }

  addNewEnemy(template: TemplateRef<any>) {
    this.currentEnemy = newEnemy();

    this.openEditModal(template);
  }

  editEnemy(template: TemplateRef<any>, enemy: IEnemy, index: number) {
    this.currentEnemy = cloneDeep(enemy);
    this.openEditModal(template);
    this.editIndex = index;
  }

  confirmEnemyEdit() {
    if(!this.currentEnemy || !this.currentEnemy.name) return;

    if(this.editIndex === -1) {
      this.mod.addEnemy(this.currentEnemy);
    } else {
      this.mod.editEnemy(this.currentEnemy, this.editIndex);
    }

    this.cancelEdit();
  }

  deleteEnemy(enemy: IEnemy) {
    if(!confirm('Are you sure you want to delete this enemy?')) return;

    this.mod.deleteEnemy(enemy);
  }

  cancelEdit() {
    if(this.modalRef) this.modalRef.hide();

    this.currentEnemy = undefined;
    this.editIndex = -1;
  }

}
