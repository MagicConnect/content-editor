import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Archetype, ArchetypeStatMatrix, Stat, StatAllocationMatrix } from 'content-interfaces';
import { ModManagerService } from '../../services/mod-manager.service';

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
    [Archetype.Attacker]: 0,
    [Archetype.Caster]: 0,
    [Archetype.Defender]: 0,
    [Archetype.Healer]: 0,
    [Archetype.Ranger]: 0,
  };

  @Input() model: Record<Stat, number> = {
    [Stat.Attack]: 0,
    [Stat.Defense]: 0,
    [Stat.Magic]: 0,
    [Stat.Special]: 0,

    [Stat.Accuracy]: 0,
    [Stat.Critical]: 0,
    [Stat.HP]: 0,
    [Stat.MP]: 0,
    [Stat.MagicEvasion]: 0,
    [Stat.MeleeEvasion]: 0,
  };

  archetypes = this.mod.archetypes;

  form = new FormGroup({});

  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [

    // primary stats
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          key: Stat.HP,
          className: 'col-2',
          type: 'input',
          templateOptions: {
            label: 'HP',
            placeholder: 'Enter HP here...',
            min: 0
          },
        },
        {
          key: Stat.Attack,
          className: 'col-2',
          type: 'input',
          templateOptions: {
            label: 'Attack',
            placeholder: 'Enter attack here...',
            min: 0
          },
        },
        {
          key: Stat.Defense,
          className: 'col-2',
          type: 'input',
          templateOptions: {
            label: 'Defense',
            placeholder: 'Enter defense here...',
            min: 0
          },
        },
        {
          key: Stat.Magic,
          className: 'col-2',
          type: 'input',
          templateOptions: {
            label: 'Magic',
            placeholder: 'Enter magic here...',
            min: 0
          },
        },
        {
          key: Stat.Special,
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
          key: Stat.MP,
          className: 'col-2',
          type: 'input',
          templateOptions: {
            label: 'MP',
            placeholder: 'Enter MP here...',
            min: 0
          },
        },
        {
          key: Stat.MeleeEvasion,
          className: 'col-2',
          type: 'input',
          templateOptions: {
            label: 'Melee Evasion',
            placeholder: 'Enter melee evasion here...',
            min: 0
          },
        },
        {
          key: Stat.MagicEvasion,
          className: 'col-2',
          type: 'input',
          templateOptions: {
            label: 'Magic Evasion',
            placeholder: 'Enter magic evasion here...',
            min: 0
          },
        },
        {
          key: Stat.Accuracy,
          className: 'col-2',
          type: 'input',
          templateOptions: {
            label: 'Accuracy',
            placeholder: 'Enter accuracy here...',
            min: 0
          },
        },
        {
          key: Stat.Critical,
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

  constructor(public mod: ModManagerService) { }

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
