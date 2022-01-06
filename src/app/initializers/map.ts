import { Element, IMap, IMapNode } from 'content-interfaces';

export const newMap = (): IMap => ({
  id: '',
  name: '',
  art: '',
  nodes: [],
  nodeConnections: {},

  activeStarts: '',
  activeEnds: ''
});

export const newMapBattle = (): IMapNode => ({
  id: -1,
  name: 'New Battle',
  x: 0,
  y: 0,
  description: '',
  combat: {
    grid: {},
    usesDefaultSaturation: true,
    usesDefaultHardCap: true,
    elementSaturation: {
      [Element.Neutral]: 0,
      [Element.Fire]: 0,
      [Element.Ice]: 0,
      [Element.Light]: 0,
      [Element.Dark]: 0,
      [Element.Thunder]: 0,
      [Element.Earth]: 0,
    },
    elementHardCap: {
      [Element.Neutral]: 0,
      [Element.Fire]: 0,
      [Element.Ice]: 0,
      [Element.Light]: 0,
      [Element.Dark]: 0,
      [Element.Thunder]: 0,
      [Element.Earth]: 0,
    }
  },
  staminaCost: 1,
  unlocksMap: '',
  abilities: [],
  drops: []
});
