import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { AbilityTrigger, IAbility, IChip, PrimaryStat, SecondaryStat } from '../../../../../shared/interfaces';

const newChip: () => IChip = () => ({
  id: '',
  name: '',
  description: '',
  stars: 1,
  primaryStat: PrimaryStat.Defense,

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
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss']
})
export class ChipComponent {

  @Output() save = new EventEmitter();

  @Input() model: IChip = newChip();

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
      ]
    },
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
