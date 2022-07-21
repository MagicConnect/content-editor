import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Element, ISkill, SkillActionPattern, SkillValidTargets, Stat } from '@magicconnect/content-interfaces';
import { newSkill } from '../../initializers';
import { ModManagerService } from '../../services/mod-manager.service';

@Component({
  selector: 'app-skill-form',
  templateUrl: './skill-form.component.html',
  styleUrls: ['./skill-form.component.scss']
})
export class SkillFormComponent {

  form = new FormGroup({});

  @Input() model: ISkill = newSkill();

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
            maxLength: 500,
          },
        },
        {
          key: 'art',
          className: 'col-3',
          type: 'better-select',
          templateOptions: {
            label: 'Base Art',
            placeholder: 'Choose base art...',
            description: 'This determines the icon art for the skill.',
            required: true,
            options: this.mod.allArtData.skillicons.map(art => ({ value: art, label: art })),
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

  constructor(public mod: ModManagerService) { }

  addAction() {
    this.model.actions.push({
      castTime: 0,
      dropsTrap: false,
      canTargetDead: false,
      elements: [],
      hits: 1,
      pattern: SkillActionPattern.SingleTarget,
      pull: 0,
      push: 0,
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
      statusEffectChanges: [],
      validTargets: SkillValidTargets.Enemies
    });
  }

  removeAction(index: number) {
    this.model.actions.splice(index, 1);
  }

  recommendedElements() {
    const elements = {
      [Element.Neutral]: 0,
      [Element.Fire]: 0,
      [Element.Ice]: 0,
      [Element.Light]: 0,
      [Element.Dark]: 0,
      [Element.Thunder]: 0,
      [Element.Earth]: 0
    };

    this.model.actions.forEach(act => {
      act.elements.forEach(el => {
        elements[el]++;
      });
    });

    this.model.generatedElements = elements;
  }

}
