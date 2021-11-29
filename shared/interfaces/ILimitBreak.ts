import { ISkill } from './ISkill';
import { Archetype, Stat } from './BuildingBlocks';

export interface ILimitBreak {
  skills: Record<number, ISkill[]>;      // skills changed for the earned LB (specific LBs)
};