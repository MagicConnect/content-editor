import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { AbilityEffect, AbilityTarget, Element, IAbilityEffect, MonsterType, Stat, StatusEffect } from '@magicconnect/content-interfaces';


@Component({
  selector: 'app-ability-effect-form',
  templateUrl: './ability-effect-form.component.html',
  styleUrls: ['./ability-effect-form.component.scss']
})
export class AbilityEffectFormComponent {

  @Input() index = -1;
  @Output() remove = new EventEmitter();

  form = new FormGroup({});

  @Input() model: IAbilityEffect = {
    value: AbilityEffect.None,
    target: AbilityTarget.Self,
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
            label: 'Effect Type',
            placeholder: 'Choose effect type...',
            description: 'Effect type affects what the effect itself does.',
            required: true,
            options: Object.values(AbilityEffect).filter(Boolean).sort().map(x => ({ label: x, value: x }))
          },
        },
        {
          key: 'target',
          className: 'col-4',
          type: 'better-select',
          templateOptions: {
            label: 'Effect Target',
            placeholder: 'Choose effect target...',
            description: 'Effect target affects who the effect applies to.',
            required: true,
            options: Object.values(AbilityTarget).filter(Boolean).sort().map(x => ({ label: x, value: x }))
          },
        },
        {
          key: 'props.baseValue',
          className: 'col-4',
          type: 'input',
          hideExpression: (model: IAbilityEffect) => {
            const matches = [AbilityEffect.AttackElementBasic, AbilityEffect.AttackElementSkill, AbilityEffect.AttackElementSpecial].includes(model.value);
            if(matches) delete model.props.baseValue;

            return matches;
          },
          templateOptions: {
            label: 'Base Value',
            placeholder: 'Choose base value...',
            description: 'Base value determines the base for the effect.',
          },
        },
        {
          key: 'props.isPercent',
          className: 'col-4',
          type: 'checkbox',
          hideExpression: (model: IAbilityEffect) => {
            const matches = [AbilityEffect.AttackElementBasic, AbilityEffect.AttackElementSkill, AbilityEffect.AttackElementSpecial, AbilityEffect.GenerateElementOnBasicAttack, AbilityEffect.GenerateElementOnSkill,
            AbilityEffect.GenerateElementOnSpecial].includes(model.value);
            if(matches) delete model.props.isPercent;

            return matches;
          },
          defaultValue: false,
          templateOptions: {
            label: 'Is Percent',
            description: 'Whether the referenced value should be a % or not.',
          },
        },
        {
          key: 'props.effectTarget',
          className: 'col-4',
          type: 'better-select',
          hideExpression: (model: IAbilityEffect) => {
            const matches = ![AbilityEffect.HPLeech].includes(model.value);
            if(matches) delete model.props.effectTarget;

            return matches;
          },
          templateOptions: {
            label: 'Effect Secondary Target',
            placeholder: 'Choose effect secondary target...',
            description: 'Effect secondary target affects who the secondary effect applies to.',
            options: Object.values(AbilityTarget).filter(Boolean).sort().map(x => ({ label: x, value: x }))
          },
        },
        {
          key: 'props.baseStat',
          className: 'col-4',
          type: 'better-select',
          hideExpression: (model: IAbilityEffect) => {
            const matches = ![
              AbilityEffect.StatBoost, AbilityEffect.ConvertStat,
              AbilityEffect.OutgoingStatDamage, AbilityEffect.IncomingStatDamage
            ].includes(model.value);
            if(matches) delete model.props.baseStat;

            return matches;
          },
          templateOptions: {
            label: 'Effect Base Stat',
            placeholder: 'Choose effect base stat...',
            description: 'Effect base stat determines the stat used for calculations.',
            options: Object.values(Stat).filter(Boolean).sort().map(x => ({ label: x, value: x }))
          },
        },
        {
          key: 'props.convertToStat',
          className: 'col-4',
          type: 'better-select',
          hideExpression: (model: IAbilityEffect) => {
            const matches = ![AbilityEffect.ConvertStat].includes(model.value);
            if(matches) delete model.props.convertToStat;

            return matches;
          },
          templateOptions: {
            label: 'Effect Convert Stat',
            placeholder: 'Choose effect convert stat...',
            description: 'Effect convert stat determines the stat converted to from the base stat.',
            options: Object.values(Stat).filter(Boolean).sort().map(x => ({ label: x, value: x }))
          },
        },
        {
          key: 'props.skillName',
          className: 'col-4',
          type: 'input',
          hideExpression: (model: IAbilityEffect) => {
            const matches = ![AbilityEffect.ModifyBaseSkill].includes(model.value);
            if(matches) delete model.props.skillName;

            return matches;
          },
          templateOptions: {
            label: 'Modify Skill',
            placeholder: 'Choose modified skill...',
            description: 'Modify Skill determines which skill gets changed numerically.'
          },
        },
        {
          key: 'props.monsterType',
          className: 'col-4',
          type: 'better-select',
          hideExpression: (model: IAbilityEffect) => {
            const matches = ![AbilityEffect.IncomingMonsterTypeDamage, AbilityEffect.OutgoingMonsterTypeDamage].includes(model.value);
            if(matches) delete model.props.monsterType;

            return matches;
          },
          templateOptions: {
            label: 'Monster Type',
            placeholder: 'Choose monster type...',
            description: 'Monster type determines the type used for boosts or reductions.',
            options: Object.values(MonsterType).filter(Boolean).sort().map(x => ({ label: x, value: x }))
          },
        },
        {
          key: 'props.statusEffect',
          className: 'col-4',
          type: 'better-select',
          hideExpression: (model: IAbilityEffect) => {
            const matches = ![
              AbilityEffect.ResistStatusEffect, AbilityEffect.InflictStatusEffect,
              AbilityEffect.BasicAttackStatusEffect, AbilityEffect.SkillStatusEffect,
              AbilityEffect.SpecialStatusEffect, AbilityEffect.StatusEffectDuration,
            ].includes(model.value);
            if(matches) delete model.props.statusEffect;

            return matches;
          },
          templateOptions: {
            label: 'Status Effect',
            placeholder: 'Choose status effect...',
            description: 'Status effect determines the effect used for calculations.',
            options: Object.values(StatusEffect).filter(Boolean).sort().map(x => ({ label: x, value: x }))
          },
        },
        {
          key: 'props.element',
          className: 'col-4',
          type: 'better-select',
          hideExpression: (model: IAbilityEffect) => {
            const matches = ![
              AbilityEffect.IncomingElementDamage, AbilityEffect.OutgoingElementDamage,
              AbilityEffect.AttackElementBasic, AbilityEffect.AttackElementSkill,
              AbilityEffect.GenerateElementOnBasicAttack, AbilityEffect.AttackElementSpecial,
              AbilityEffect.GenerateElementOnSkill, AbilityEffect.GenerateElementOnSpecial
            ].includes(model.value);
            if(matches) delete model.props.element;

            return matches;
          },
          templateOptions: {
            label: 'Element',
            placeholder: 'Choose element...',
            description: 'Element determines the element used for incoming or outgoing attacks.',
            options: Object.values(Element).filter(Boolean).sort().map(x => ({ label: x, value: x }))
          },
        },
        {
          key: 'props.surviveDeathReboundValue',
          className: 'col-4',
          type: 'input',
          hideExpression: (model: IAbilityEffect) => {
            const matches = ![AbilityEffect.SurviveDeath].includes(model.value);
            if(matches) delete model.props.surviveDeathReboundValue;

            return matches;
          },
          templateOptions: {
            label: 'Rebound Value',
            placeholder: 'Choose rebound value...',
            description: 'Rebound value is how much HP the character will survive with.',
            min: 0
          },
        },
      ]
    },
  ];

  constructor() { }

}
