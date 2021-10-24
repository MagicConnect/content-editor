import { IAbility } from './IAbility';
import { ISkill } from './ISkill';
import { Stat } from './BuildingBlocks';

export interface ILimitBreak {
  abilities?: Record<number, IAbility[]>; // abilities changed for the earned LB (specific LBs)
  skills?: Record<number, ISkill[]>;      // skills changed for the earned LB (specific LBs)
  stats?: Record<Stat, number>;           // stats changed for the earned LB (every LB, instead of specific ones)
};