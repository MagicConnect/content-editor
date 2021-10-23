import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { AbilityEffect, AbilityTarget, IAbilityEffect } from '../../../../../interfaces';

@Component({
  selector: 'app-ability-effect-form',
  templateUrl: './ability-effect-form.component.html',
  styleUrls: ['./ability-effect-form.component.scss']
})
export class AbilityEffectFormComponent implements OnInit {

  @Input() index = -1;
  @Output() remove = new EventEmitter();

  form = new FormGroup({});

  @Input() model: IAbilityEffect = {
    value: AbilityEffect.None,
    target: AbilityTarget.Self,
    props: {}
  };

  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          key: 'value',
          className: 'col-4',
          type: 'select',
          templateOptions: {
            label: 'Effect Type',
            placeholder: 'Choose effect type...',
            description: 'Effect type affects what the effect itself does.',
            required: true,
            options: Object.values(AbilityEffect).filter(Boolean).sort().map(x => ({ label: x, value: x }))
          },
        },
        {
          key: 'target',
          className: 'col-4',
          type: 'select',
          templateOptions: {
            label: 'Effect Target',
            placeholder: 'Choose effect target...',
            description: 'Effect target affects who the effect applies to.',
            required: true,
            options: Object.values(AbilityTarget).filter(Boolean).sort().map(x => ({ label: x, value: x }))
          },
        },
      ]
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
