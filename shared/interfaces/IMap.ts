
export interface IMap {
  name: string;
  nodes: IMapNode[];
  nodeConnections: Record<number, number[]>;

  activeStarts: string;
  activeEnds: string;

  unlocksMap: string;
}

export interface IMapNode {
  name: string;
  x: number;
  y: number;
  description: string;
  combat: IMapCombat;
  staminaCost: number;
}

export interface IMapCombat {
  grid: IMapCombatGrid[][];
}

export interface IMapCombatGrid {
  enemy: IMapCombatEnemy;
}

export interface IMapCombatEnemy {
  enemy: string;
  level: number;
  width: number;
  height: number;
}

export interface ICombatReward {
  xp: number;
  currency: Record<string, number>;
}