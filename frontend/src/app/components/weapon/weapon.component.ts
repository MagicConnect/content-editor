import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { AbilityTrigger, IAbility, IWeapon, PrimaryStat, SecondaryStat } from '../../../../../shared/interfaces';

const newWeapon: () => IWeapon = () => ({
  name: '',
  sellValue: 0,
  description: '',
  stars: 1,
  primaryStat: PrimaryStat.Attack,
  secondaryStat: undefined,

  abilities: [],

  lbRewards: {
    abilities: {},
    stats: {
      [PrimaryStat.Attack]: 0,
      [PrimaryStat.Defense]: 0,
      [PrimaryStat.Magic]: 0,
      [PrimaryStat.Special]: 0,

      [SecondaryStat.Accuracy]: 0,
      [SecondaryStat.Critical]: 0,
      [SecondaryStat.HP]: 0,
      [SecondaryStat.MP]: 0,
      [SecondaryStat.MagicEvasion]: 0,
      [SecondaryStat.MeleeEvasion]: 0,
    },
    skills: {}
  }
});

@Component({
  selector: 'app-weapon',
  templateUrl: './weapon.component.html',
  styleUrls: ['./weapon.component.scss']
})
export class WeaponComponent {

  @Input() model: IWeapon = newWeapon();

  form = new FormGroup({});

  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          key: 'name',
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
          key: 'description',
          className: 'col-3',
          type: 'input',
          templateOptions: {
            label: 'Description',
            placeholder: 'Enter description here...',
            description: 'It should be less than 100 characters.',
            required: false,
            maxLength: 100,
          },
        },
        {
          key: 'stars',
          className: 'col-3',
          type: 'select',
          templateOptions: {
            label: 'Star Rating',
            placeholder: 'Choose star rating...',
            description: 'This determines caps (level, LB, stats).',
            required: true,
            options: [
              { value: 1, label: '★' },
              { value: 2, label: '★★' },
              { value: 3, label: '★★★' },
              { value: 4, label: '★★★★' },
              { value: 5, label: '★★★★★' },
            ],
          },
        },
      ],
    },

    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          key: 'primaryStat',
          className: 'col-3',
          type: 'select',
          templateOptions: {
            label: 'Primary Stat',
            placeholder: 'Choose primary stat...',
            description: 'Primary stat is the only stat boosted by chips.',
            required: true,
            options: [
              { value: 'attack',  label: 'Attack' },
              { value: 'defense', label: 'Defense' },
              { value: 'magic',   label: 'Magic' },
              { value: 'special', label: 'Special'  },
            ],
          },
        },
        {
          key: 'secondaryStat',
          className: 'col-3',
          type: 'select',
          templateOptions: {
            label: 'Secondary Stat',
            placeholder: 'Choose secondary stat...',
            description: 'Secondary stat has separate and lesser growth from the main stat.',
            options: [
              { value: '',        label: 'None' },
              { value: 'attack',  label: 'Attack' },
              { value: 'defense', label: 'Defense' },
              { value: 'magic',   label: 'Magic' },
              { value: 'special', label: 'Special'  },
            ],
          },
        },
      ]
    }
  ];

  constructor() { }

  addAbility() {
    (this.model.abilities as IAbility[]).push({
      name: '',
      trigger: AbilityTrigger.Always,

      effects: [],
      conditions: []
    });
  }

  removeAbility(index: number) {
    this.model.abilities.splice(index, 1);
  }

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

}
