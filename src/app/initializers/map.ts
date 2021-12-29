import { IMap, IMapNode } from 'content-interfaces';

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
    grid: {}
  },
  staminaCost: 1,
  unlocksMap: '',
  abilities: [],
  drops: []
});
