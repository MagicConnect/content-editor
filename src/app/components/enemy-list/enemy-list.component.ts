import { Component, OnInit, TemplateRef } from '@angular/core';
import { cloneDeep, sum } from 'lodash';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { newEnemy } from '../../initializers';
import { IEnemy, IMap, IMapNode } from '@magicconnect/content-interfaces';
import { ModManagerService } from '../../services/mod-manager.service';

@Component({
  selector: 'app-enemy-list',
  templateUrl: './enemy-list.component.html',
  styleUrls: ['./enemy-list.component.scss']
})
export class EnemyListComponent implements OnInit {

  public searchText = '';
  public searchResults: IEnemy[] = [];

  private allEnemies: IEnemy[] = [];

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

  public get isCurrentEnemyClone(): boolean {
    if(!this.currentEnemy) return false;
    return this.currentEnemy.name.includes('(Clone)');
  }

  public get isCurrentEnemyDuplicateName(): boolean {
    if(!this.currentEnemy) return false;
    return !!this.enemies.filter((x, i) => i !== this.editIndex).find(b => b.name === this.currentEnemy?.name);
  }

  public get isCurrentEnemyDuplicateArt(): boolean {
    if(!this.currentEnemy) return false;
    return !!this.enemies.filter((x, i) => i !== this.editIndex).find(b => b.art === this.currentEnemy?.art || b.spritesheet === this.currentEnemy?.spritesheet);
  }

  constructor(
    private modalService: BsModalService,
    public mod: ModManagerService
  ) { }

  ngOnInit() {
    this.mod.enemies$.subscribe(enemies => {
      this.enemies = this.allEnemies = [...enemies];
      this.filter();
    });

    this.mod.maps$.subscribe(maps => this.maps = [...maps]);
  }

  filter() {
    if(!this.searchText) {
      this.searchResults = this.allEnemies.slice(0);
      return;
    }

    this.searchResults = this.allEnemies.filter(a => {
      return a.name.toLowerCase().includes(this.searchText.toLowerCase())
          || a.primaryStat.toLowerCase().includes(this.searchText.toLowerCase())
          || a.abilities.some(b => b.toLowerCase().includes(this.searchText.toLowerCase()))
          || a.skills.some(b => b.toLowerCase().includes(this.searchText.toLowerCase()))
          || this.enemyCurrentlyUsedIn(a).some(b => b.toLowerCase().includes(this.searchText.toLowerCase()));
    });
  }

  openEditModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { keyboard: false, backdrop: 'static', class: 'big-modal' });
  }

  addNewEnemy(template: TemplateRef<any>) {
    this.currentEnemy = newEnemy();

    this.openEditModal(template);
  }

  cloneEnemy(template: TemplateRef<any>, enemy: IEnemy) {
    this.currentEnemy = cloneDeep(enemy);
    this.currentEnemy.name = `${this.currentEnemy.name} (Clone)`;
    this.mod.rerollID(this.currentEnemy);
    this.openEditModal(template);
  }

  editEnemy(template: TemplateRef<any>, enemy: IEnemy) {
    this.currentEnemy = cloneDeep(enemy);
    this.openEditModal(template);
    this.editIndex = this.allEnemies.findIndex(i => i.name === enemy.name);
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
    const combatPlaces = (node: IMapNode) => Object.values(node.combat.grid).map(x => Object.values(x)).flat();
    const isEnemyUsedInMapNode = (node: IMapNode) => combatPlaces(node).filter(Boolean).filter(e => e.enemy.name === enemy.id).length > 0;

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
