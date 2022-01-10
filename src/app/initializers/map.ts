import { IMap, IMapNode, Element } from 'content-interfaces';

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
  isDefaultAvailable: false,
  x: 0,
  y: 0,
  description: '',
  combat: {
    elementHardCap: {
      [Element.Dark]: 0,
      [Element.Earth]: 0,
      [Element.Fire]: 0,
      [Element.Ice]: 0,
      [Element.Light]: 0,
      [Element.Thunder]: 0,
      [Element.Neutral]: 0,
    },
    elementSaturation: {
      [Element.Dark]: 0,
      [Element.Earth]: 0,
      [Element.Fire]: 0,
      [Element.Ice]: 0,
      [Element.Light]: 0,
      [Element.Thunder]: 0,
      [Element.Neutral]: 0,
    },
    usesDefaultHardCap: true,
    usesDefaultSaturation: true,
    grid: {}
  },
  staminaCost: 1,
  unlocksMap: '',
  abilities: [],
  drops: []
});
