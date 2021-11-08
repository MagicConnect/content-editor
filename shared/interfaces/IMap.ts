
export interface IMap {
  name: string;
  nodes: IMapNode[];
  nodeConnections: Record<number, number[]>;

  activeStarts: string;
  activeEnds: string;
}

export interface IMapNode {
  id: number;
  name: string;
  x: number;
  y: number;
  description: string;
  combat: IMapCombat;
  staminaCost: number;
  unlocksMap: string;
}

export interface IMapCombat {
  grid: IMapCombatGrid[][];
}

export interface IMapCombatGrid {
  enemy: IMapCombatEnemy;
}

export interface IMapCombatEnemy {
  name: string;
  level: number;
  width: number;
  height: number;
}

export interface ICombatReward {
  xp: number;
  currency: Record<string, number>;
}