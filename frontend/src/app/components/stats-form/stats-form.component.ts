import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Archetype, ArchetypeStatMatrix, PrimaryStat, SecondaryStat, Stat, StatAllocationMatrix } from '../../../../../shared/interfaces';

@Component({
  selector: 'app-stats-form',
  templateUrl: './stats-form.component.html',
  styleUrls: ['./stats-form.component.scss']
})
export class StatsFormComponent {

  @Input() pointBuyEnabled = false;
  @Input() maxPoints = 25;
  @Input() statKey!: keyof ArchetypeStatMatrix;

  @Input() statPointModel: Record<Archetype, number> = {
    [Archetype.Archer]: 0,
    [Archetype.Attacker]: 0,
    [Archetype.Caster]: 0,
    [Archetype.Defender]: 0,
    [Archetype.Healer]: 0,
  };

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

  public archetypes: Array<{ name: Archetype, color: string }> = [
    { name: Archetype.Archer,     color: 'primary' },
    { name: Archetype.Attacker,   color: 'danger' },
    { name: Archetype.Caster,     color: 'secondary' },
    { name: Archetype.Defender,   color: 'warning' },
    { name: Archetype.Healer,     color: 'success' },
  ];

  form = new FormGroup({});

  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [

    // primary stats
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          key: SecondaryStat.HP,
          className: 'col-2',
          type: 'input',
          templateOptions: {
            label: 'HP',
            placeholder: 'Enter HP here...',
            min: 0
          },
        },
        {
          key: PrimaryStat.Attack,
          className: 'col-2',
          type: 'input',
          templateOptions: {
            label: 'Attack',
            placeholder: 'Enter attack here...',
            min: 0
          },
        },
        {
          key: PrimaryStat.Defense,
          className: 'col-2',
          type: 'input',
          templateOptions: {
            label: 'Defense',
            placeholder: 'Enter defense here...',
            min: 0
          },
        },
        {
          key: PrimaryStat.Magic,
          className: 'col-2',
          type: 'input',
          templateOptions: {
            label: 'Magic',
            placeholder: 'Enter magic here...',
            min: 0
          },
        },
        {
          key: PrimaryStat.Special,
          className: 'col-2',
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
          key: SecondaryStat.MP,
          className: 'col-2',
          type: 'input',
          templateOptions: {
            label: 'MP',
            placeholder: 'Enter MP here...',
            min: 0
          },
        },
        {
          key: SecondaryStat.MeleeEvasion,
          className: 'col-2',
          type: 'input',
          templateOptions: {
            label: 'Melee Evasion',
            placeholder: 'Enter melee evasion here...',
            min: 0
          },
        },
        {
          key: SecondaryStat.MagicEvasion,
          className: 'col-2',
          type: 'input',
          templateOptions: {
            label: 'Magic Evasion',
            placeholder: 'Enter magic evasion here...',
            min: 0
          },
        },
        {
          key: SecondaryStat.Accuracy,
          className: 'col-2',
          type: 'input',
          templateOptions: {
            label: 'Accuracy',
            placeholder: 'Enter accuracy here...',
            min: 0
          },
        },
        {
          key: SecondaryStat.Critical,
          className: 'col-2',
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

  totalPoints(): number {
    return Object.values(this.statPointModel).reduce((a, b) => a + b, 0);
  }

  buyPoint(archetype: Archetype, multiplier: 1|-1) {
    const subType = this.statKey;
    const matrix: Record<string, number> = StatAllocationMatrix[archetype][subType];

    const myMatrix = this.statPointModel;
    const myStats: Record<string, number> = this.model;

    if(multiplier === -1 && myMatrix[archetype] <= 0) return;

    myMatrix[archetype] += multiplier;

    Object.keys(matrix).forEach(stat => {
      const valueIncrease = matrix[stat] * multiplier;

      myStats[stat] ??= 0;
      myStats[stat] += valueIncrease;

      const formControl = this.fields
        .map(x => (x.fieldGroup || []))
        .flat()
        .find((x: FormlyFieldConfig) => x.key === stat)
        ?.formControl;

      if(!formControl) return;

      formControl.setValue((formControl.value ?? 0) + (valueIncrease ?? 0));
    });

  }

}
