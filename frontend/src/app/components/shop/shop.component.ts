import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { newShop } from '../../../../../shared/initializers';
import { IShop } from '../../../../../shared/interfaces';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent {

  @Input() model: IShop = newShop();

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
          className: 'col-9',
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
          key: 'currencyItem',
          className: 'col-4',
          type: 'input',
          templateOptions: {
            label: 'Currency Item',
            placeholder: 'Enter currency item here...',
            description: 'It should match the name of an existing item.',
            required: true,
            maxLength: 100,
          },
        },
        {
          key: 'activeStarts',
          className: 'col-4',
          type: 'input',
          templateOptions: {
            label: 'Start Date/Time',
            placeholder: 'Enter start date/time here...',
            description: 'YYYY/MM/DD HH:MM, -1 for permanent',
            required: true,
            maxLength: 16,
          },
        },
        {
          key: 'activeEnds',
          className: 'col-4',
          type: 'input',
          templateOptions: {
            label: 'End Date/Time',
            placeholder: 'Enter end date/time here...',
            description: 'YYYY/MM/DD HH:MM, -1 for permanent',
            required: true,
            maxLength: 16,
          },
        },
      ]
    }
  ];

  constructor() { }

  add(type: keyof IShop & 'characters'|'weapons'|'items'|'chips') {
    this.model[type].push({ name: '', cost: 100, quantity: -1 });
  }

  remove(type: keyof IShop & 'characters'|'weapons'|'items'|'chips', index: number) {
    this.model[type].splice(index, 1);
  }

}
