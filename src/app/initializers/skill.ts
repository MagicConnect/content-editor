
import { ISkill } from 'content-interfaces';

export const newSkill = (): ISkill => ({
  id: '',
  name: '',
  description: '',
  actions: [],
  cooldown: 0,
  hpCost: 0,
  mpCost: 0,
  spcCost: 0
});
