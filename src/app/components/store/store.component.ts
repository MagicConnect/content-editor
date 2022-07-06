import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { IStore } from 'content-interfaces';
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
          className: 'col-4',
          type: 'input',
          templateOptions: {
            label: 'Cost',
            placeholder: 'Enter bundle cost here...',
            description: 'It should be less than 50 characters.',
            required: true,
            maxLength: 50,
            type: 'number',
          },
        },
      ]
    }
  ];

  constructor(private mod: ModManagerService) { }

  // add(type: keyof IStore & 'items') {
  //   this.model[type].push({ itemType: '', quantity: -1 });
  // }

  // remove(type: keyof IStore & 'items', index: number) {
  //   this.model[type].splice(index, 1);
  // }
}
