import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { PrimaryStat, SecondaryStat, Stat } from '../../../../../shared/interfaces';

@Component({
  selector: 'app-stats-form',
  templateUrl: './stats-form.component.html',
  styleUrls: ['./stats-form.component.scss']
})
export class StatsFormComponent {

  @Input() model: Record<Stat, number> = {
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
  };

  form = new FormGroup({});

  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [

    // hp / mp
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          key: SecondaryStat.HP,
          className: 'col-3',
          type: 'input',
          templateOptions: {
            label: 'HP',
            placeholder: 'Enter HP here...',
            min: 0
          },
        },
        {
          key: SecondaryStat.MP,
          className: 'col-3',
          type: 'input',
          templateOptions: {
            label: 'MP',
            placeholder: 'Enter MP here...',
            min: 0
          },
        },
      ]
    },

    // primary stats
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          key: PrimaryStat.Attack,
          className: 'col-3',
          type: 'input',
          templateOptions: {
            label: 'Attack',
            placeholder: 'Enter attack here...',
            min: 0
          },
        },
        {
          key: PrimaryStat.Defense,
          className: 'col-3',
          type: 'input',
          templateOptions: {
            label: 'Defense',
            placeholder: 'Enter defense here...',
            min: 0
          },
        },
        {
          key: PrimaryStat.Magic,
          className: 'col-3',
          type: 'input',
          templateOptions: {
            label: 'Magic',
            placeholder: 'Enter magic here...',
            min: 0
          },
        },
        {
          key: PrimaryStat.Special,
          className: 'col-3',
          type: 'input',
          templateOptions: {
            label: 'Special',
            placeholder: 'Enter special here...',
            min: 0
          },
        },
      ]
    },

    // secondary stats
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          key: SecondaryStat.MeleeEvasion,
          className: 'col-3',
          type: 'input',
          templateOptions: {
            label: 'Melee Evasion',
            placeholder: 'Enter melee evasion here...',
            min: 0
          },
        },
        {
          key: SecondaryStat.MagicEvasion,
          className: 'col-3',
          type: 'input',
          templateOptions: {
            label: 'Magic Evasion',
            placeholder: 'Enter magic evasion here...',
            min: 0
          },
        },
        {
          key: SecondaryStat.Accuracy,
          className: 'col-3',
          type: 'input',
          templateOptions: {
            label: 'Accuracy',
            placeholder: 'Enter accuracy here...',
            min: 0
          },
        },
        {
          key: SecondaryStat.Critical,
          className: 'col-3',
          type: 'input',
          templateOptions: {
            label: 'Critical',
            placeholder: 'Enter critical here...',
            min: 0
          },
        },
      ]
    }
  ];

  constructor() { }

}
