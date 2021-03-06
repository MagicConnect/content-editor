import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { IAbilityUtility } from '@magicconnect/content-interfaces';
import { newAbilityUtility } from '../../initializers';

import { AbilityCondition, AbilityEffect, AbilityTarget, AbilityTrigger } from '@magicconnect/content-interfaces';

@Component({
  selector: 'app-ability-content-form',
  templateUrl: './ability-content-form.component.html',
  styleUrls: ['./ability-content-form.component.scss']
})
export class AbilityContentFormComponent implements OnInit {

  form = new FormGroup({});

  @Input() model: IAbilityUtility = newAbilityUtility();
  @Input() showAllFields = true;

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
            required: true,
            maxLength: 500,
          },
        },
        {
          key: 'trigger',
          className: 'col-4',
          type: 'better-select',
          hideExpression: () => !this.showAllFields,
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

  ngOnInit() {
    setInterval(() => {
      if(this.model.name && !this.model.name.startsWith('AG-')) return;

      this.fields[0].fieldGroup![0].formControl!.setValue(this.autoName());
    }, 5000);
  }

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

  autoName(): string {
    const uc = (s: string) => (s || '').replace(/[^A-Z]/g, '');

    const baseString = this.model.effects.map(x => {
      return [
        uc(x.value),
        uc(x.target),
        (x.props.baseValue || 0) + (x.props.isPercent ? '%' : ''),
        x.props.skillName,
        x.props.monsterType,
        x.props.statusEffect,
        x.props.element
      ].filter(Boolean).join('-');
    }).join('|');

    return `AG-${uc(this.model.trigger)}-${baseString}`;
  }

}
