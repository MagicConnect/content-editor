import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { IStoreItemBundle, ItemType } from 'content-interfaces';

import { sortBy } from 'lodash';
import { ModManagerService } from '../../services/mod-manager.service';

@Component({
  selector: 'app-store-entry-form',
  templateUrl: './store-entry-form.component.html',
  styleUrls: ['./store-entry-form.component.scss']
})
export class StoreEntryFormComponent {
  @Output() remove = new EventEmitter();
  @Input() index = 0;

  form = new FormGroup({});

  @Input() model: IStoreItemBundle = {
    itemType: ItemType.Crystal,
    quantity: -1,
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
          templateOptions: {
            label: 'Item',
            placeholder: 'Pick item...',
            description: 'If you don\'t see any items, add one.',
            required: true,
            options: sortBy(Object.values(this.mod.filteredItems).filter(Boolean), ['name', 'itemType']).map((x: any) => ({ label: x.name, value: x.id, itemType: x.itemType }))
          },
        },
        {
          key: 'quantity',
          className: 'col-4',
          type: 'input',
          templateOptions: {
            label: 'Quantity',
            placeholder: 'Enter quantity here... (-1 for infinite)',
            description: '',
            required: true,
            min: -1,
          },
        },
      ]
    }
  ];

  constructor(private mod: ModManagerService) {}

}
