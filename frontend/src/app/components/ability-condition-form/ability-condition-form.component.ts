import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { AbilityCondition, IAbilityCondition, StatusEffect } from '../../../../../shared/interfaces';

@Component({
  selector: 'app-ability-condition-form',
  templateUrl: './ability-condition-form.component.html',
  styleUrls: ['./ability-condition-form.component.scss']
})
export class AbilityConditionFormComponent {

  @Input() index = -1;
  @Output() remove = new EventEmitter();

  form = new FormGroup({});

  @Input() model: IAbilityCondition = {
    value: AbilityCondition.None,
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
          type: 'better-select',
          templateOptions: {
            label: 'Condition Type',
            placeholder: 'Choose condition type...',
            description: 'Condition type filters when the effect can happen.',
            required: true,
            options: Object.values(AbilityCondition).filter(Boolean).sort().map(x => ({ label: x, value: x }))
          },
        },
        {
          key: 'props.isPercent',
          className: 'col-4',
          type: 'checkbox',
          hideExpression: (model: IAbilityCondition) => {
            const matches = [AbilityCondition.FirstTurns, AbilityCondition.FrontlineCharacters, AbilityCondition.NotFrontlineCharacters].includes(model.value);
            if(matches) delete model.props.isPercent;

            return matches;
          },
          defaultValue: false,
          templateOptions: {
            label: 'Is Percent',
            description: 'Whether the checked value should be checked as a % or not.',
          },
        },
        {
          key: 'props.hpValue',
          className: 'col-4',
          type: 'input',
          hideExpression: (model: IAbilityCondition) => {
            const matches = ![AbilityCondition.AboveHP, AbilityCondition.BelowHP].includes(model.value);
            if(matches) delete model.props.hpValue;

            return matches;
          },
          templateOptions: {
            label: 'HP Value',
            placeholder: 'Choose HP value...',
            description: 'HP value determines what HP is required.',
            min: 0
          },
        },
        {
          key: 'props.mpValue',
          className: 'col-4',
          type: 'input',
          hideExpression: (model: IAbilityCondition) => {
            const matches = ![AbilityCondition.AboveMP, AbilityCondition.BelowMP].includes(model.value);
            if(matches) delete model.props.mpValue;

            return matches;
          },
          templateOptions: {
            label: 'MP Value',
            placeholder: 'Choose MP value...',
            description: 'MP value determines what MP is required.',
            min: 0
          },
        },
        {
          key: 'props.spcValue',
          className: 'col-4',
          type: 'input',
          hideExpression: (model: IAbilityCondition) => {
            const matches = ![AbilityCondition.AboveSPC, AbilityCondition.BelowSPC].includes(model.value);
            if(matches) delete model.props.spcValue;

            return matches;
          },
          templateOptions: {
            label: 'SPC Value',
            placeholder: 'Choose SPC value...',
            description: 'SPC value determines what SPC is required.',
            min: 0
          },
        },
        {
          key: 'props.enemyCount',
          className: 'col-4',
          type: 'input',
          hideExpression: (model: IAbilityCondition) => {
            const matches = ![AbilityCondition.EnemiesDead, AbilityCondition.EnemiesAlive].includes(model.value);
            if(matches) delete model.props.enemyCount;

            return matches;
          },
          templateOptions: {
            label: 'Enemy Count',
            placeholder: 'Choose Enemy Count value...',
            description: 'Enemy Count value determines how many enemies are required.',
            min: 0,
            max: 16
          },
        },
        {
          key: 'props.alliesCount',
          className: 'col-4',
          type: 'input',
          hideExpression: (model: IAbilityCondition) => {
            const matches = ![AbilityCondition.AlliesDead, AbilityCondition.AlliesAlive].includes(model.value);
            if(matches) delete model.props.alliesCount;

            return matches;
          },
          templateOptions: {
            label: 'Ally Count',
            placeholder: 'Choose Ally Count value...',
            description: 'Ally Count value determines how many allies are required.',
            min: 0,
            max: 4
          },
        },
        {
          key: 'props.selfStatusEffect',
          className: 'col-4',
          type: 'better-select',
          hideExpression: (model: IAbilityCondition) => {
            const matches = ![AbilityCondition.SelfNoStatusEffect, AbilityCondition.SelfStatusEffect].includes(model.value);
            if(matches) delete model.props.selfStatusEffect;

            return matches;
          },
          templateOptions: {
            label: 'Status Effect',
            placeholder: 'Choose Status Effect...',
            description: 'Status Effect determines which status is required.',
            options: Object.values(StatusEffect).filter(Boolean).sort().map(x => ({ label: x, value: x }))
          },
        },
        {
          key: 'props.archetypesInParty',
          className: 'col-4',
          type: 'input',
          hideExpression: (model: IAbilityCondition) => {
            const matches = ![
              AbilityCondition.ArchersInParty,
              AbilityCondition.AttackersInParty,
              AbilityCondition.CastersInParty,
              AbilityCondition.DefendersInParty,
              AbilityCondition.HealersInParty
            ].includes(model.value);
            if(matches) delete model.props.archetypesInParty;

            return matches;
          },
          templateOptions: {
            label: '# Matching Archetypes',
            placeholder: 'Choose # Matching Archetypes...',
            description: 'Chooses how many of a matching archetype required.',
            min: 0,
            max: 4
          },
        },
        {
          key: 'props.firstTurns',
          className: 'col-4',
          type: 'input',
          hideExpression: (model: IAbilityCondition) => {
            const matches = ![AbilityCondition.FirstTurns].includes(model.value);
            if(matches) delete model.props.firstTurns;

            return matches;
          },
          templateOptions: {
            label: '# Turns',
            placeholder: 'Choose # Turns...',
            description: 'Chooses how many turns the condition matches for.',
            min: 0,
            max: 10
          },
        },
      ]
    },
  ];

  constructor() { }

}
