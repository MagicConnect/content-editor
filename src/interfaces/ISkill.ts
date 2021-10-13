
// pattern

import { Element, Stat, StatusEffect } from './BuildingBlocks';

export enum SkillActionPattern {
  SingleTarget = 'SingleTarget',                    // single target attack
  All = 'All',                                      // all targets
  SmallSquare = 'SmallSquare',                      // 2x2 square
  BigSquare = 'BigSquare',                          // 3x3 square
  VerticalLine = 'VerticalLine',                    // vertical line
  HorizontalLine = 'HorizontalLine',                // horizontal line
  DiagonalLeftRightLine = 'DiagonalLeftRightLine',  // diagonal line from left to right
  DiagonalRightLeftLine = 'DiagonalRightLeftLine',  // diagonal line from right to left
  Cross = 'Cross',                                  // vertical line + horizontal line
  DiagonalCross = 'DiagonalCross',                  // diagonal line LtR + diagonal line RtL
}

export interface ISkillAction {
  pattern: SkillActionPattern;                                            // attack pattern
  castTime: number;                                                       // cast time in round (0 = instant, 1+ = delay)
  element: Element;                                                       // element of the attack
  push: number;                                                           // # of tiles to push the target away from the caster
  pull: number;                                                           // # of tiles to pull the target towards the caster
  statusEffectChanges: Array<{ effect: StatusEffect, value: number }>;    // status effect changes to the target
  statScaling: Record<Stat, number>;                                      // stat scaling of the attack, eg { ATK: 200 } for 200% ATK
  hits: number;                                                           // the number of hits the attack will do
  dropsTrap: boolean;                                                     // whether the attack drops a trap that does this attack later, as opposed to casting it right away
}

export interface ISkill {
  name: string;             // name of the skill
  description: string;      // description of the skill
  mpCost: number;           // MP cost of the skill
  spcCost: number;          // SPC cost of the skill
  cooldown: number;         // cooldown of the skill in rounds

  actions: ISkillAction[];  // attack sequence for the skill
}
