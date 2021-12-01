import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

import { sortBy } from 'lodash';

import { IBannerRollable } from '../../../../../shared/interfaces';
import { ModManagerService } from '../../services/mod-manager.service';

@Component({
  selector: 'app-weighted-entry-form',
  templateUrl: './weighted-entry-form.component.html',
  styleUrls: ['./weighted-entry-form.component.scss']
})
export class WeightedEntryFormComponent {

  @Input() type: 'weapon' | 'character' | 'item' | 'chip' = 'item';

  @Output() remove = new EventEmitter();
  @Input() index = 0;

  form = new FormGroup({});

  @Input() model: IBannerRollable = {
    name: '',
    isBannerSpecial: false
  };

  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          key: 'name',
          className: 'col-4',
          type: 'better-select',
          hideExpression: () => this.type !== 'character',
          templateOptions: {
            label: 'Character',
            placeholder: 'Pick character...',
            description: 'If you don\'t see any characters, add one.',
            options: sortBy(Object.values(this.mod.filteredCharacters).filter(Boolean), ['name', 'stars']).map((x: any) => ({ label: x.name, value: x.name, stars: x.stars })),
            groupProp: 'stars'
          },
        },
        {
          key: 'name',
          className: 'col-4',
          type: 'better-select',
          hideExpression: () => this.type !== 'weapon',
          templateOptions: {
            label: 'Weapon',
            placeholder: 'Pick weapon...',
            description: 'If you don\'t see any weapons, add one.',
            options: sortBy(Object.values(this.mod.filteredWeapons).filter(Boolean), ['name', 'stars']).map((x: any) => ({ label: x.name, value: x.name, stars: x.stars })),
            groupProp: 'stars'
          },
        },
        {
          key: 'name',
          className: 'col-4',
          type: 'better-select',
          hideExpression: () => this.type !== 'chip',
          templateOptions: {
            label: 'Chip',
            placeholder: 'Pick chip...',
            description: 'If you don\'t see any chips, add one.',
            options: sortBy(Object.values(this.mod.filteredChips).filter(Boolean), ['name', 'stars']).map((x: any) => ({ label: x.name, value: x.name, stars: x.stars })),
            groupProp: 'stars'
          },
        },
        {
          key: 'name',
          className: 'col-4',
          type: 'better-select',
          hideExpression: () => this.type !== 'item',
          templateOptions: {
            label: 'Item',
            placeholder: 'Pick item...',
            description: 'If you don\'t see any items, add one.',
            options: sortBy(Object.values(this.mod.filteredItems).filter(Boolean), ['name', 'itemType']).map((x: any) => ({ label: x.name, value: x.name, itemType: x.itemType })),
            groupProp: 'itemType'
          },
        },
        {
          key: 'isBannerSpecial',
          className: 'col-4',
          type: 'checkbox',
          defaultValue: false,
          templateOptions: {
            label: 'Is Special',
            description: 'Whether the entry should roll separately from others in its star rating group.',
          },
        },
      ]
    }
  ];

  constructor(private mod: ModManagerService) {}


}
