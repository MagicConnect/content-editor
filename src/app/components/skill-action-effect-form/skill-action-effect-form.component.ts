import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { ISkillActionStatusEffect, Stat, StatusEffect } from '@magicconnect/content-interfaces';

@Component({
  selector: 'app-skill-action-effect-form',
  templateUrl: './skill-action-effect-form.component.html',
  styleUrls: ['./skill-action-effect-form.component.scss']
})
export class SkillActionEffectFormComponent {

  @Output() remove = new EventEmitter();
  @Input() index = 0;

  form = new FormGroup({});

  @Input() model: ISkillActionStatusEffect = {
    effect: StatusEffect.ACCDown,
    value: 0,
    valueScaleStat: undefined,
    duration: 0,
    probability: 100
  };

  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          key: 'effect',
          className: 'col-3',
          type: 'better-select',
          templateOptions: {
            label: 'Status Effect',
            placeholder: 'Choose status effect...',
            description: 'Status effect is the type of effect inflicted on the target.',
            required: true,
            options: Object.values(StatusEffect).filter(Boolean).sort().map(x => ({ label: x, value: x }))
          },
        },
        {
          key: 'value',
          className: 'col-2',
          type: 'input',
          templateOptions: {
            label: 'Effect Value',
            placeholder: 'Enter effect value here...',
            description: 'Effect value varies between effects.',
            required: true,
            min: 0
          },
        },
        {
          key: 'valueScaleStat',
          className: 'col-3',
          type: 'better-select',
          templateOptions: {
            label: 'Scale Stat',
            placeholder: 'Choose scale stat...',
            description: 'If selected, value applied to effect will be multiplied by the casters scale stat.',
            options: [{ label: 'None', value: '' }]
                      .concat(Object.values(Stat).filter(Boolean).sort().map(x => ({ label: x, value: x })))
          },
        },
        {
          key: 'duration',
          className: 'col-2',
          type: 'input',
          templateOptions: {
            label: 'Duration',
            placeholder: 'Enter duration here...',
            description: 'Duration is calculated in rounds.',
            required: true,
            min: 0
          },
        },
        {
          key: 'probability',
          className: 'col-2',
          type: 'input',
          templateOptions: {
            label: 'Probability',
            placeholder: 'Enter probability here...',
            description: 'Probability is the % chance of the effect being applied.',
            required: true,
            min: 0,
            max: 100
          },
        },
      ]
    },
  ];

}
