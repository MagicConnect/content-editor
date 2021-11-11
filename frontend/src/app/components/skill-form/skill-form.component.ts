import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Element, ISkill, SkillActionPattern, SkillValidTargets, Stat } from '../../../../../shared/interfaces';

@Component({
  selector: 'app-skill-form',
  templateUrl: './skill-form.component.html',
  styleUrls: ['./skill-form.component.scss']
})
export class SkillFormComponent {

  @Output() remove = new EventEmitter();
  @Input() index = 0;

  form = new FormGroup({});

  @Input() model: ISkill = {
    name: '',
    description: '',
    actions: [],
    cooldown: 0,
    hpCost: 0,
    mpCost: 0,
    spcCost: 0
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
          key: 'description',
          className: 'col-8',
          type: 'input',
          templateOptions: {
            label: 'Description',
            placeholder: 'Enter description here...',
            description: 'It should be less than 500 characters.',
            required: true,
            maxLength: 500,
          },
        },
      ]
    },

    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          key: 'hpCost',
          className: 'col-3',
          type: 'input',
          templateOptions: {
            label: 'HP Cost',
            placeholder: 'Enter HP cost here...',
            description: 'Most skills will cost 0 HP.',
            required: true,
            min: 0
          },
        },
        {
          key: 'mpCost',
          className: 'col-3',
          type: 'input',
          templateOptions: {
            label: 'MP Cost',
            placeholder: 'Enter MP cost here...',
            description: 'Most skills will cost some MP.',
            required: true,
            min: 0
          },
        },
        {
          key: 'spcCost',
          className: 'col-3',
          type: 'input',
          templateOptions: {
            label: 'SPC Cost',
            placeholder: 'Enter SPC cost here...',
            description: 'Most basic skills will not cost SPC, most skills that take SPC will take 25.',
            required: true,
            min: 0
          },
        },
        {
          key: 'cooldown',
          className: 'col-3',
          type: 'input',
          templateOptions: {
            label: 'Cooldown',
            placeholder: 'Enter cooldown here...',
            description: 'Powerful skills will probably have a cooldown.',
            required: true,
            min: 0
          },
        },
      ]
    },
  ];

  constructor() { }

  addAction() {
    this.model.actions.push({
      castTime: 0,
      dropsTrap: false,
      elements: [],
      hits: 1,
      pattern: SkillActionPattern.SingleTarget,
      pull: 0,
      push: 0,
      statScaling: {
        [Stat.HP]: 0,
        [Stat.MP]: 0,
        [Stat.Attack]: 0,
        [Stat.Defense]: 0,
        [Stat.Magic]: 0,
        [Stat.Special]: 0,
        [Stat.Accuracy]: 0,
        [Stat.Critical]: 0,
        [Stat.MagicEvasion]: 0,
        [Stat.MeleeEvasion]: 0,
      },
      statusEffectChanges: [],
      validTargets: SkillValidTargets.Enemies
    });
  }

  removeAction(index: number) {
    this.model.actions.splice(index, 1);
  }

}
