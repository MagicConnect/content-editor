import { IMap, IMapNode } from '../interfaces';

export const newMap = (): IMap => ({
  name: '',
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
    grid: [
      [],
      [],
      [],
      []
    ] 
  },
  staminaCost: 1,
  unlocksMap: '',
  abilities: []
});