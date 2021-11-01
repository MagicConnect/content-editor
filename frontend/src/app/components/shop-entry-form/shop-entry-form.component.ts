import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { IShopBuyable } from '../../../../../shared/interfaces';

@Component({
  selector: 'app-shop-entry-form',
  templateUrl: './shop-entry-form.component.html',
  styleUrls: ['./shop-entry-form.component.scss']
})
export class ShopEntryFormComponent {

  @Output() remove = new EventEmitter();
  @Input() index = 0;

  form = new FormGroup({});

  @Input() model: IShopBuyable = {
    name: '',
    cost: 100,
    quantity: -1
  };

  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          key: 'name',
          className: 'col-6',
          type: 'input',
          templateOptions: {
            label: 'Entry Name',
            placeholder: 'Enter name here...',
            description: '',
            required: true,
            maxLength: 50,
          },
        },
        {
          key: 'cost',
          className: 'col-3',
          type: 'input',
          templateOptions: {
            label: 'Cost',
            placeholder: 'Enter cost here...',
            description: '',
            required: true,
            min: 0,
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
      ]
    }
  ];

}
