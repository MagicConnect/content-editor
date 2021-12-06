import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { IItem, ItemType } from '../../../../../shared/interfaces';
import { newItem } from '../../../../../shared/initializers';
import { ModManagerService } from '../../services/mod-manager.service';
import { sortBy } from 'lodash';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {

  @Input() model: IItem = newItem();

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
            description: 'It should be less than 500 characters.',
            maxLength: 500,
          },
        },
        {
          key: 'itemType',
          className: 'col-3',
          type: 'better-select',
          templateOptions: {
            label: 'Type',
            placeholder: 'Choose type...',
            description: 'It determines if the item has any special utility.',
            options: [... new Set(['None', ...Object.values(ItemType).filter(Boolean).sort()])].map(x => ({ label: x, value: x }))
          },
        },
        {
          key: 'sellValue',
          className: 'col-3',
          type: 'input',
          templateOptions: {
            label: 'Sell Value',
            placeholder: 'Enter sell value here...',
            description: 'How much the item sells for.',
            required: false,
            min: 0
          },
        },

        {
          key: 'art',
          className: 'col-3',
          type: 'better-select',
          templateOptions: {
            label: 'Base Art',
            placeholder: 'Choose base art...',
            description: 'This determines the splash art for the item.',
            required: true,
            options: this.mod.allArtData.items.map(art => ({ value: art, label: art })),
          },
        },

        {
          key: 'name',
          className: 'col-3',
          type: 'better-select',
          hideExpression: () => this.model.itemType !== ItemType.CosmeticCharacter,
          templateOptions: {
            label: 'Character',
            placeholder: 'Pick character...',
            description: 'If you don\'t see any characters, add one.',
            options: sortBy(Object.values(this.mod.filteredCharacters).filter(Boolean), ['name', 'stars']).map((x: any) => ({ label: x.name, value: x.name, stars: x.stars })),
            groupProp: 'stars'
          },
        },
      ]
    },
  ];

  constructor(private mod: ModManagerService) {}

}
