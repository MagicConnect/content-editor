import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { IBannerRollable } from '../../../../../shared/interfaces';

@Component({
  selector: 'app-weighted-entry-form',
  templateUrl: './weighted-entry-form.component.html',
  styleUrls: ['./weighted-entry-form.component.scss']
})
export class WeightedEntryFormComponent {

  @Output() remove = new EventEmitter();
  @Input() index = 0;

  form = new FormGroup({});

  @Input() model: IBannerRollable = {
    name: '',
    weight: 1
  };

  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          key: 'name',
          className: 'col-8',
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
          key: 'weight',
          className: 'col-4',
          type: 'input',
          templateOptions: {
            label: 'Weight',
            placeholder: 'Enter weight here...',
            description: '',
            required: true,
            min: 0,
          },
        },
      ]
    }
  ];


}
