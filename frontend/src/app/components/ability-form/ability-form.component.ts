import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

import { AbilityCondition, AbilityEffect, AbilityTarget, AbilityTrigger, IAbility } from '../../../../../shared/interfaces';

@Component({
  selector: 'app-ability-form',
  templateUrl: './ability-form.component.html',
  styleUrls: ['./ability-form.component.scss']
})
export class AbilityFormComponent {

  @Input() index = -1;
  @Output() remove = new EventEmitter();

  form = new FormGroup({});

  @Input() model: IAbility = {
    name: '',
    trigger: AbilityTrigger.Always,
    effects: [],
    conditions: []
  };

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
          key: 'trigger',
          className: 'col-4',
          type: 'select',
          templateOptions: {
            label: 'Trigger',
            placeholder: 'Choose trigger...',
            description: 'Trigger affects what sets off the ability.',
            required: true,
            options: Object.values(AbilityTrigger).sort().map(x => ({ label: x, value: x }))
          },
        },
      ]
    },
  ];

  constructor() { }

  addCondition() {
    this.model.conditions.push({ value: AbilityCondition.None, props: {} });
  }

  removeCondition(index: number) {
    this.model.conditions.splice(index, 1);
  }

  addEffect() {
    this.model.effects.push({ value: AbilityEffect.None, target: AbilityTarget.Self, props: {}});
  }

  removeEffect(index: number) {
    this.model.effects.splice(index, 1);
  }


}
