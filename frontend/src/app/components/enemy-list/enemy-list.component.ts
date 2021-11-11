import { Component, OnInit, TemplateRef } from '@angular/core';
import { cloneDeep, sum } from 'lodash';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { newEnemy } from '../../../../../shared/initializers';
import { IEnemy, IMap, IMapNode } from '../../../../../shared/interfaces';
import { ModManagerService } from '../../services/mod-manager.service';

@Component({
  selector: 'app-enemy-list',
  templateUrl: './enemy-list.component.html',
  styleUrls: ['./enemy-list.component.scss']
})
export class EnemyListComponent implements OnInit {

  public enemies: IEnemy[] = [];
  private maps: IMap[] = [];

  public currentEnemy?: IEnemy;

  public editIndex = -1;
  public modalRef?: BsModalRef;

  public get canSaveCurrentEnemy(): boolean {
    if(!this.currentEnemy) return false;
    return this.currentEnemy.name?.length >= 2
        && !this.isCurrentEnemyDuplicateName
        && this.currentEnemy.primaryStat
        && sum(Object.values(this.currentEnemy.basePoints)) > 0
        && sum(Object.values(this.currentEnemy.levelPoints)) > 0;
  }

  public get isCurrentEnemyDuplicateName(): boolean {
    if(!this.currentEnemy) return false;
    return !!this.enemies.find(b => b.name === this.currentEnemy?.name);
  }

  constructor(
    private modalService: BsModalService,
    public mod: ModManagerService
  ) { }

  ngOnInit() {
    this.mod.enemies$.subscribe(enemies => this.enemies = [...enemies]);
    this.mod.maps$.subscribe(maps => this.maps = [...maps]);
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

  enemyCurrentlyUsedIn(enemy: IEnemy): string[] {
    const isEnemyUsedInMapNode = (node: IMapNode) => node.combat.grid.flat().filter(Boolean).filter(e => e.enemy.name === enemy.name).length > 0;

    return this.maps.map(map => {
      return map.nodes.filter(node => {
        return isEnemyUsedInMapNode(node);
      }).map(n => `${map.name}: ${n.name}`);
    }).flat().filter(mapList => mapList.length > 0);
  }

  isEnemyCurrentlyInUse(enemy: IEnemy): boolean {
    return this.enemyCurrentlyUsedIn(enemy).length > 0;
  }

}
