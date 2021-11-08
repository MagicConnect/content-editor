import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

import { sortBy } from 'lodash';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { newMapBattle } from '../../../../../shared/initializers';
import { IEnemy, IMapNode } from '../../../../../shared/interfaces';
import { ModManagerService } from '../../services/mod-manager.service';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss']
})
export class BattleComponent implements OnInit {

  @Input() model: IMapNode = newMapBattle();

  form = new FormGroup({});

  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          key: 'name',
          className: 'col-3',
          type: 'input',
          templateOptions: {
            label: 'Name',
            placeholder: 'Enter name here...',
            description: 'It should be less than 30 characters.',
            required: true,
            maxLength: 30,
          },
        },
        {
          key: 'description',
          className: 'col-3',
          type: 'input',
          templateOptions: {
            label: 'Description',
            placeholder: 'Enter description here...',
            description: 'It should be less than 100 characters.',
            required: true,
            maxLength: 100,
          },
        },
        {
          key: 'staminaCost',
          className: 'col-3',
          type: 'input',
          templateOptions: {
            label: 'Stamina Cost',
            placeholder: 'Enter stamina cost here...',
            description: 'The amount of stamina required to do this battle.',
            required: true,
            min: 0,
            max: 100
          },
        },
        {
          key: 'unlocksMap',
          className: 'col-3',
          type: 'input',
          templateOptions: {
            label: 'Map Unlock',
            placeholder: 'Enter unlocked map here...',
            description: 'THIS IS TEMPORARY AND SHOULD BE A DROPDOWN',
            required: true,
            maxLength: 100,
          },
        },
      ]
    }
  ];

  private modalRef!: BsModalRef;

  public editingGridSpace: { x: number, y: number, enemy: string | undefined, level: number } = { x: 0, y: 0, enemy: undefined, level: 1 };

  public enemies: IEnemy[] = [];

  constructor(private modalService: BsModalService, private mod: ModManagerService) { }

  ngOnInit() {
    this.mod.enemies$.subscribe(enemies => this.enemies = sortBy([...enemies], 'name'));
  }

  chooseEnemyFor(template: TemplateRef<any>, row: number, cell: number): void {
    if(cell > 3) return;

    this.editingGridSpace.x = cell;
    this.editingGridSpace.y = row;
    this.editingGridSpace.enemy = this.model.combat.grid[row]?.[cell]?.enemy?.name;
    this.editingGridSpace.level = this.model.combat.grid[row]?.[cell]?.enemy?.level ?? 1;
    this.modalRef = this.modalService.show(template, { backdrop: true });
  }

  clearEnemyFor(event: any, row: number, cell: number): void {
    event.preventDefault();
    event.stopPropagation();

    if(cell > 3) return;

    delete this.model.combat.grid[row][cell];
  }

  confirmAddMonster(): void {
    this.model.combat.grid[this.editingGridSpace.y][this.editingGridSpace.x] = {
      enemy: {
        name: this.editingGridSpace.enemy ?? '',
        level: this.editingGridSpace.level,
        width: 1,
        height: 1
      }
    };

    this.modalRef.hide();
    this.resetEditGridSpace();
  }

  cancelAddMonster(): void {
    this.modalRef.hide();
    this.resetEditGridSpace();
  }

  resetEditGridSpace(): void {
    this.editingGridSpace = { x: 0, y: 0, enemy: '', level: 1 };
  }

}
