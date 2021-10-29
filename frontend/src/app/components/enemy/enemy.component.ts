import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { newEnemy } from '../../../../../shared/initializers';

@Component({
  selector: 'app-enemy',
  templateUrl: './enemy.component.html',
  styleUrls: ['./enemy.component.scss']
})
export class EnemyComponent {

  @Input() model = newEnemy();

  form = new FormGroup({});

  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [

    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          key: 'Name',
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
          key: 'Primary Stat',
          className: 'col-3',
          type: 'select',
          templateOptions: {
            label: 'Primary Stat',
            placeholder: 'Choose primary stat...',
            description: 'Primary stat is the stat used for basic attacks.',
            required: true,
            options: [
              { value: 'Attack',  label: 'Attack' },
              { value: 'Defense', label: 'Defense' },
              { value: 'Magic',   label: 'Magic' },
              { value: 'Special', label: 'Special'  },
            ],
          },
        },
      ]
    },
  ];

  constructor() { }

  addSkill() {
    this.model.skills.push({
      name: '',
      description: '',
      actions: [],
      cooldown: 0,
      hpCost: 0,
      mpCost: 0,
      spcCost: 0
    });
  }

  removeSkill(index: number) {
    this.model.skills.splice(index, 1);
  }

}
