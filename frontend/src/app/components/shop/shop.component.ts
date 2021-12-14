import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { newShop } from '../../../../../shared/initializers';
import { IShop, ShopReset } from '../../../../../shared/interfaces';
import { ModManagerService } from '../../services/mod-manager.service';

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
          className: 'col-4',
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
          className: 'col-4',
          type: 'input',
          templateOptions: {
            label: 'Description',
            placeholder: 'Enter description here...',
            description: 'It should be less than 500 characters.',
            maxLength: 500,
          },
        },
        {
          key: 'shopReset',
          className: 'col-4',
          type: 'better-select',
          templateOptions: {
            label: 'Shop Reset',
            placeholder: 'Choose shop reset period...',
            description: 'Most shops don\'t reset.',
            required: true,
            options: Object.values(ShopReset).filter(Boolean).map(x => ({ label: x, value: x }))
          },
        },
        {
          key: 'currencyItem',
          className: 'col-4',
          type: 'better-select',
          templateOptions: {
            label: 'Currency Item',
            placeholder: 'Enter currency item here...',
            description: 'If you don\'t see any currency items, add one.',
            required: true,
            options: Object.values(this.mod.shopTokens).filter(Boolean).sort().map(x => ({ label: x.name, value: x.name }))
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

  constructor(private mod: ModManagerService) { }

  add(type: keyof IShop & 'characters'|'weapons'|'items'|'accessories') {
    this.model[type].push({ name: '', cost: 100, quantity: -1 });
  }

  remove(type: keyof IShop & 'characters'|'weapons'|'items'|'accessories', index: number) {
    this.model[type].splice(index, 1);
  }

}
