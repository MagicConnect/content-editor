import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { IStore, ItemType } from '@magicconnect/content-interfaces';
import { newStore } from 'src/app/initializers/store';
import { ModManagerService } from 'src/app/services/mod-manager.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent {

  @Input() model: IStore = newStore();

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
            placeholder: 'Enter bundle name here...',
            description: 'It should be less than 50 characters.',
            required: true,
            maxLength: 50,
          },
        },
        {
          key: 'cost',
          className: 'col-4', //could be 'col-3'?
          type: 'input',
          templateOptions: {
            label: 'Cost',
            placeholder: 'Enter bundle cost here...',
            description: 'Should be an integer representing the cost, eg. 499 for $4.99.',
            required: true,
            min: 0,
            max: 99999,
          },
        },
      ]
    }
  ];

  constructor(private mod: ModManagerService) { }

  add() {
    this.model.items.push({ itemType: ItemType.Crystal, quantity: -1 });
  }

  remove(index: number) {
    this.model.items.splice(index, 1);
  }
}
