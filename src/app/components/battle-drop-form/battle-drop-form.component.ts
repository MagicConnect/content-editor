import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { sortBy } from 'lodash';
import { IMapNodeDroppable } from 'content-interfaces';
import { ModManagerService } from '../../services/mod-manager.service';

@Component({
  selector: 'app-battle-drop-form',
  templateUrl: './battle-drop-form.component.html',
  styleUrls: ['./battle-drop-form.component.scss']
})
export class BattleDropFormComponent {

  @Output() remove = new EventEmitter();
  @Input() index = 0;

  form = new FormGroup({});

  @Input() model: IMapNodeDroppable = {
    name: '',
    dropPercent: 100,
    quantity: 1,
    onlyOneTime: false
  };

  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          key: 'name',
          className: 'col-3',
          type: 'better-select',
          templateOptions: {
            label: 'Item',
            placeholder: 'Pick item...',
            description: 'If you don\'t see any items, add one.',
            options: sortBy(Object.values(this.mod.filteredItems).filter(Boolean), ['name', 'itemType']).map((x: any) => ({ label: x.name, value: x.id, itemType: x.itemType })),
            groupProp: 'itemType'
          },
        },
        {
          key: 'dropPercent',
          className: 'col-3',
          type: 'input',
          templateOptions: {
            label: 'Drop Percent Chance',
            placeholder: 'Enter drop % here...',
            description: '',
            required: true,
            min: 0,
            max: 100
          },
        },
        {
          key: 'quantity',
          className: 'col-3',
          type: 'input',
          templateOptions: {
            label: 'Quantity',
            placeholder: 'Enter quantity here... (-1 for infinite)',
            description: '',
            required: true,
            min: -1,
          },
        },
        {
          key: 'onlyOneTime',
          className: 'col-3',
          hideExpression: (model) => +model.dropPercent !== 100,
          type: 'checkbox',
          templateOptions: {
            label: 'One Time Drop?',
            description: 'If checked, the item will only ever drop once (even if the mission is run multiple times).'
          },
        },
      ]
    }
  ];

  constructor(private mod: ModManagerService) {}

}
