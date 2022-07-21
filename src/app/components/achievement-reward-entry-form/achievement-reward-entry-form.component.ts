import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { IAchievementReward } from '@magicconnect/content-interfaces';
import { sortBy } from 'lodash';
import { ModManagerService } from '../../services/mod-manager.service';

@Component({
  selector: 'app-achievement-reward-entry-form',
  templateUrl: './achievement-reward-entry-form.component.html',
  styleUrls: ['./achievement-reward-entry-form.component.scss']
})
export class AchievementRewardEntryFormComponent {

  @Input() type: 'weapon' | 'character' | 'item' | 'accessory' = 'item';

  @Output() remove = new EventEmitter();
  @Input() index = 0;

  form = new FormGroup({});

  @Input() model: IAchievementReward = {
    name: '',
    quantity: 0
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
            options: sortBy(Object.values(this.mod.filteredCharacters).filter(Boolean), ['name', 'stars']).map((x: any) => ({ label: x.name, value: x.id, stars: x.stars })),
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
            options: sortBy(Object.values(this.mod.filteredWeapons).filter(Boolean), ['name', 'stars']).map((x: any) => ({ label: x.name, value: x.id, stars: x.stars })),
            groupProp: 'stars'
          },
        },
        {
          key: 'name',
          className: 'col-4',
          type: 'better-select',
          hideExpression: () => this.type !== 'accessory',
          templateOptions: {
            label: 'Accessory',
            placeholder: 'Pick accessory...',
            description: 'If you don\'t see any accessories, add one.',
            options: sortBy(Object.values(this.mod.filteredAccessories).filter(Boolean), ['name', 'stars']).map((x: any) => ({ label: x.name, value: x.id, stars: x.stars })),
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
            options: sortBy(Object.values(this.mod.filteredItems).filter(Boolean), ['name', 'itemType']).map((x: any) => ({ label: x.name, value: x.id, itemType: x.itemType })),
            groupProp: 'itemType'
          },
        },
        {
          key: 'quantity',
          className: 'col-4',
          type: 'input',
          defaultValue: false,
          templateOptions: {
            label: 'Quantity',
            description: 'The amount to give. Generally only needed for currency-type.',
            minimum: 1
          },
        },
      ]
    }
  ];

  constructor(private mod: ModManagerService) {}

}
