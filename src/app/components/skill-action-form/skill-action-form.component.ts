import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Element, ISkillAction, SkillActionPattern, SkillValidTargets, Stat, StatusEffect } from '@magicconnect/content-interfaces';

@Component({
  selector: 'app-skill-action-form',
  templateUrl: './skill-action-form.component.html',
  styleUrls: ['./skill-action-form.component.scss']
})
export class SkillActionFormComponent {

  @Output() remove = new EventEmitter();
  @Input() index = 0;

  elements = Object.values(Element).filter(x => x !== Element.Neutral);

  form = new FormGroup({});

  @Input() model: ISkillAction = {
    pattern: SkillActionPattern.SingleTarget,
    validTargets: SkillValidTargets.Enemies,
    castTime: 0,
    elements: [],
    push: 0,
    pull: 0,
    statusEffectChanges: [],
    statScaling: {
      [Stat.HP]: 0,
      [Stat.Attack]: 0,
      [Stat.Defense]: 0,
      [Stat.Magic]: 0,
      [Stat.Special]: 0,
      [Stat.Accuracy]: 0,
      [Stat.Critical]: 0,
      [Stat.Evasion]: 0,
    },
    hits: 1,
    dropsTrap: false,
    canTargetDead: false
  };

  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          key: 'pattern',
          className: 'col-3',
          type: 'better-select',
          templateOptions: {
            label: 'Action Pattern',
            placeholder: 'Choose action pattern...',
            description: 'Action pattern is the layout of where damage or healing is spread.',
            required: true,
            options: Object.values(SkillActionPattern).filter(Boolean).sort().map(x => ({ label: x, value: x }))
          },
        },
        {
          key: 'validTargets',
          className: 'col-3',
          type: 'better-select',
          templateOptions: {
            label: 'Valid Targets',
            placeholder: 'Choose valid targets...',
            description: 'Valid targets affects who can be targetted by this action.',
            required: true,
            options: Object.values(SkillValidTargets).filter(Boolean).sort().map(x => ({ label: x, value: x }))
          },
        },
        {
          key: 'castTime',
          className: 'col-3',
          type: 'input',
          templateOptions: {
            label: 'Cast Time',
            placeholder: 'Enter cast time value here...',
            description: 'Cast time affects how long the action takes to happen.',
            required: true,
            min: 0
          },
        },
        {
          key: 'hits',
          className: 'col-3',
          type: 'input',
          templateOptions: {
            label: 'Hits',
            placeholder: 'Enter hits here...',
            description: 'Hits affects how many times the action should be repeated.',
            required: true,
            min: 0
          },
        },
        {
          key: 'push',
          className: 'col-3',
          type: 'input',
          templateOptions: {
            label: 'Push',
            placeholder: 'Enter push value here...',
            description: 'Push affects how many tiles each target should be pushed back.',
            required: true,
            min: 0
          },
        },
        {
          key: 'pull',
          className: 'col-3',
          type: 'input',
          templateOptions: {
            label: 'Pull',
            placeholder: 'Enter pull value here...',
            description: 'Pull affects how many tiles each target should be pulled closer.',
            required: true,
            min: 0
          },
        },
        {
          key: 'dropsTrap',
          className: 'col-3',
          type: 'checkbox',
          defaultValue: false,
          templateOptions: {
            label: 'Drops Trap',
            description: 'Whether the ability drops a trap that fires later.',
          },
        },
        {
          key: 'canTargetDead',
          className: 'col-3',
          type: 'checkbox',
          defaultValue: false,
          templateOptions: {
            label: 'Can Target Dead',
            description: 'Whether the ability can target a dead creature.',
          },
        },
      ]
    },
  ];

  addStatusEffect() {
    this.model.statusEffectChanges.push({
      effect: StatusEffect.ACCDown,
      value: 0,
      valueScaleStat: undefined,
      duration: 1,
      probability: 100
    });
  }

  removeStatusEffect(index: number) {
    this.model.statusEffectChanges.splice(index, 1);
  }

  toggleElement(element: Element) {
    if (this.model.elements.includes(element)) {
      this.model.elements.splice(this.model.elements.indexOf(element), 1);
    } else {
      this.model.elements.push(element);
    }
  }

}
