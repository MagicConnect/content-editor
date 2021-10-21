import { MonsterType, Stat, StatusEffect } from './BuildingBlocks';

// enums for abilities
export enum AbilityTrigger {
  OnSelfDeath = 'OnSelfDeath',
  OnAllyDeath = 'OnAllyDeath',
  OnEnemyDeath = 'OnEnemyDeath',

  OnSelfHit = 'OnSelfHit',
  OnAllyHit = 'OnAllyHit',
  OnEnemyHit = 'OnEnemyHit',

  OnSelfHeal = 'OnSelfHeal',
  OnAllyHeal = 'OnAllyHeal',
  OnEnemyHeal = 'OnEnemyHeal',

  OnRoundStart = 'OnRoundStart',
  OnRoundEnd = 'OnRoundEnd',

  OnCombatStart = 'OnCombatStart'
}

export enum AbilityEffect {

  // stat related
  StatBoost = 'StatBoost',
  ConvertStat = 'ConvertStat',

  HPRegen = 'HPRegen',
  MPRegen = 'MPRegen',
  HPLeech = 'HPLeech',
  MPLeech = 'MPLeech',
  SpecialGaugeBoost = 'SpecialGaugeBoost',
  SpecialGaugeRegen = 'SpecialGaugeRegen',
  SpecialGaugeLeech = 'SpecialGaugeLeech',

  MagicEvasion = 'MagicEvasion',
  PhysicalEvasion = 'PhysicalEvasion',

  CooldownReduction = 'CooldownReduction',

  // damage related
  OutgoingStatDamage = 'OutgoingStatDamage',
  IncomingStatDamage = 'IncomingStatDamage',

  OutgoingSkillDamage = 'OutgoingSkillDamage',
  OutgoingSpecialDamage = 'OutgoingSpecialDamage',
  OutgoingBasicAttackDamage = 'OutgoingBasicAttackDamage',
  OutgoingMonsterTypeDamage = 'OutgoingMonsterTypeDamage',
  IncomingMonsterTypeDamage = 'IncomingMonsterTypeDamage',

  OutgoingElementDamage = 'OutgoingElementDamage',
  IncomingElementDamage = 'IncomingElementDamage',

  DamageBoostSingleTarget = 'DamageBoostSingleTarget',
  DamageBoostMultiTarget = 'DamageBoostMultiTarget',

  NegateDamageInstances = 'NegateDamageInstances',

  // status effect related
  ResistStatusEffect = 'ResistStatusEffect',
  InflictStatusEffect = 'InflictStatusEffect',

  BasicAttackStatusEffect = 'BasicAttackStatusEffect',
  PhysicalAttackStatusEffect = 'PhysicalAttackStatusEffect',
  MagicalAttackStatusEffect = 'MagicalAttackStatusEffect',
  SkillStatusEffect = 'SkillStatusEffect',
  SpecialStatusEffect = 'SpecialStatusEffect',

  StatusEffectDuration = 'StatusEffectDuration',

  // explosion
  BasicAttackExplodes = 'BasicAttackExplodes',
  PhysicalAttackExplodes = 'PhysicalAttackExplodes',
  MagicalAttackExplodes = 'MagicalAttackExplodes',
  SkillExplodes = 'SkillExplodes',
  SpecialExplodes = 'SpecialExplodes',

  // misc
  PhysicalAttackElement = 'PhysicalAttackElement',
  MagicalAttackElement = 'MagicalAttackElement',

  SurviveDeath = 'SurviveDeath',
  AdditionalHit = 'AdditionalHit',

  CastSpeed = 'CastSpeed',
  Overheal = 'Overheal',

  ModifyBaseAbility = 'ModifyBaseAbility'

}

export enum AbilityTarget {
  Self = 'Self',

  AllEnemies = 'AllEnemies',
  AllAllies = 'AllAllies',
  AllAlliesAndSelf = 'AllAlliesAndSelf',

  AllyIsArcher = 'AllyIsArcher',
  AllyIsNotArcher = 'AllyIsNotArcher',
  AllyIsAttacker = 'AllyIsAttacker',
  AllyNotAttacker = 'AllyNotAttacker',
  AllyIsCaster = 'AllyIsCaster',
  AllyNotCaster = 'AllyNotCaster',
  AllyIsDefender = 'AllyIsDefender',
  AllyNotDefender = 'AllyNotDefender',
  AllyIsHealer = 'AllyIsHealer',
  AllyNotHealer = 'AllyNotHealer',

}

export enum AbilityCondition {
  Always = 'Always',

  AboveHP = 'AboveHP',
  BelowHP = 'BelowHP',
  AboveMP = 'AboveMP',
  BelowMP = 'BelowMP',
  AboveSPC = 'AboveSPC',
  BelowSPC = 'BelowSPC',

  EnemiesAlive = 'EnemiesAlive',
  EnemiesDead = 'EnemiesDead',
  AlliesAlive = 'AlliesAlive',
  AlliesDead = 'AlliesDead',

  SelfStatusEffect = 'SelfStatusEffect',
  SelfNoStatusEffect = 'SelfNoStatusEffect',

  ArchersInParty = 'ArchersInParty',
  AttackersInParty = 'AttackersInParty',
  CastersInParty = 'CastersInParty',
  DefendersInParty = 'DefendersInParty',
  HealersInParty = 'HealersInParty',

  FirstTurns = 'FirstTurns'
}

// interfaces for ability props / abilities

export interface IAbilityEffectProps {
  isPercent?: boolean;                  // if this ability effect should change by a percent, this is true

  baseValue?: number;                   // the base value of the effect (used for effects that rely on stats)
  baseStat?: Stat;                      // the base stat to scale the ability from
  convertToStat?: Stat;                 // the stat to convert the base stat to
  skillName?: string;                   // the skill name to modify
  target?: AbilityTarget;               // the target of the ability (used for effects like leech)
  monsterType?: MonsterType;            // the monster type affected by the ability
  statusEffect?: StatusEffect;          // the status effect referenced by the ability
  explodeRadius?: number;               // the explode radius of the ability
  element?: Element;                    // the element imbued by the ability
  surviveDeathReboundValue?: number;    // the survive HP rebound value
}

export interface IAbilityConditionProps {
  isPercent?: boolean;                  // whether or not the condition relies on a percent

  hpValue?: number;                     // the hp value to check for for the ability condition
  mpValue?: number;                     // the mp value to check for for the ability condition
  spcValue?: number;                    // the spc value to check for for the ability condition
  enemiesAlive?: number;                // the number of enemies alive to check for for the ability condition
  enemiesDead?: number;                 // the number of enemies dead to check for for the ability condition
  alliesAlive?: number;                 // the number of allies alive to check for for the ability condition
  alliesDead?: number;                  // the number of allies dead to check for for the ability condition

  selfStatusEffect?: string;            // the status effect to check for on self for the ability condition

  archersInParty?: number;              // the number of archers in the party to check for for the ability condition
  attackersInParty?: number;            // the number of attackers in the party to check for for the ability condition
  castersInParty?: number;              // the number of casters in the party to check for for the ability condition
  defendersInParty?: number;            // the number of defenders in the party to check for for the ability condition
  healersInParty?: number;              // the number of healers in the party to check for for the ability condition

  firstTurns?: number;                  // the number of turns at the start of combat that the ability applies for
}

export interface IAbility {
  name: string;

  trigger: AbilityTrigger;
  target: AbilityTarget;
  effects: Array<{ value: AbilityEffect, props: IAbilityEffectProps }>;
  conditions: Array<{ value: AbilityCondition, props: IAbilityConditionProps }>;
}
