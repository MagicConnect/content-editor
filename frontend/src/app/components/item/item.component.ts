import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { IItem, ItemType } from '../../../../../shared/interfaces';
import { newItem } from '../../../../../shared/initializers';

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
            options: Object.values(ItemType).filter(Boolean).sort().map(x => ({ label: x, value: x }))
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
      ]
    },
  ];

}
