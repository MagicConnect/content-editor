
import { ISkill, Element } from 'content-interfaces';

export const newSkill = (): ISkill => ({
  id: '',
  name: '',
  description: '',
  actions: [],
  cooldown: 0,
  hpCost: 0,
  spcCost: 0,

  generatedElements: {
    [Element.Neutral]: 0,
    [Element.Fire]: 0,
    [Element.Ice]: 0,
    [Element.Light]: 0,
    [Element.Dark]: 0,
    [Element.Thunder]: 0,
    [Element.Earth]: 0,
  },

  consumedElements: {
    [Element.Neutral]: 0,
    [Element.Fire]: 0,
    [Element.Ice]: 0,
    [Element.Light]: 0,
    [Element.Dark]: 0,
    [Element.Thunder]: 0,
    [Element.Earth]: 0,
  },
});
