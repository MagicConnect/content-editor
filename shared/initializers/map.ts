import { IMap } from '../interfaces';

export const newMap = (): IMap => ({
  name: '',
  nodes: [],
  nodeConnections: [],

  activeStarts: '',
  activeEnds: '',

  unlocksMap: ''
});