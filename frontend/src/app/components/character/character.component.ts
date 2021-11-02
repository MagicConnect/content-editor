import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions, } from '@ngx-formly/core';
import { newCharacter } from '../../../../../shared/initializers';
import { AbilityTrigger } from '../../../../../shared/interfaces';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent {

  @Input() model = newCharacter();

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
          key: 'Archetype',
          className: 'col-3',
          type: 'select',
          templateOptions: {
            label: 'Archetype',
            placeholder: 'Choose archetype...',
            description: 'Archetype gives them a rough outline for stat gain.',
            required: true,
            options: [
              { value: 'Archer',    label: 'Archer' },
              { value: 'Attacker',  label: 'Attacker' },
              { value: 'Caster',    label: 'Caster'  },
              { value: 'Defender',  label: 'Defender' },
              { value: 'Healer',    label: 'Healer'  },
            ],
          },
        },
        {
          key: 'Weapon',
          className: 'col-3',
          type: 'select',
          templateOptions: {
            label: 'Weapon',
            placeholder: 'Choose weapon...',
            description: 'This is their only weapon choice.',
            required: true,
            options: [
              { value: 'Axe',             label: 'Axe' },
              { value: 'Bow',             label: 'Bow' },
              { value: 'Dagger',          label: 'Dagger' },
              { value: 'Greatsword',      label: 'Greatsword' },
              { value: 'Knuckles',        label: 'Knuckles' },
              { value: 'Staff',           label: 'Staff' },
              { value: 'SwordAndShield',  label: 'Sword & Shield' },
            ],
          },
        },
        {
          key: 'Star Rating',
          className: 'col-3',
          type: 'select',
          templateOptions: {
            label: 'Star Rating',
            placeholder: 'Choose star rating...',
            description: 'This determines caps (level, LB, stats).',
            required: true,
            options: [
              { value: 3, label: '★★★' },
              { value: 4, label: '★★★★' },
              { value: 5, label: '★★★★★' },
            ],
          },
        },
      ]
    },

    {
      fieldGroupClassName: 'row',
      fieldGroup: [
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

  addLBAbility(lb: number) {
    const abilities = this.model.lbRewards.abilities[lb] ?? [];
    this.model.lbRewards.abilities[lb] = abilities;

    abilities.push({
      name: '',
      trigger: AbilityTrigger.Always,

      effects: [],
      conditions: []
    });
  }

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
