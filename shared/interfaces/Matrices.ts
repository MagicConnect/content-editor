
import { Archetype, Stat } from './BuildingBlocks';

export interface ArchetypeStatMatrix {
  baseStatPoints: Record<Stat, number>;
  levelupPoints: Record<Stat, number>;
  limitBreakPoints: Record<Stat, number>;
}

// pick 25 LB points, 25 levelup points, 25 base stat points

export const StatAllocationMatrix: Record<Archetype, ArchetypeStatMatrix> = {
  [Archetype.Attacker]: {
    baseStatPoints: {
      [Stat.Attack]: 6,
      [Stat.Defense]: 2,
      [Stat.Magic]: 0,
      [Stat.Special]: 0,
  
      [Stat.HP]: 40,
      [Stat.MP]: 0,
      [Stat.Accuracy]: 0,
      [Stat.Critical]: 0,
      [Stat.MagicEvasion]: 0,
      [Stat.MeleeEvasion]: 0,
    },

    levelupPoints: {
      [Stat.Attack]: 4,
      [Stat.Defense]: 0,
      [Stat.Magic]: 0,
      [Stat.Special]: 1,
  
      [Stat.HP]: 6,
      [Stat.MP]: 0,
      [Stat.Accuracy]: 0,
      [Stat.Critical]: 0,
      [Stat.MagicEvasion]: 0,
      [Stat.MeleeEvasion]: 0,
    },

    limitBreakPoints: {
      [Stat.Attack]: 4,
      [Stat.Defense]: 0,
      [Stat.Magic]: 0,
      [Stat.Special]: 2,
  
      [Stat.HP]: 20,
      [Stat.MP]: 10,
      [Stat.Accuracy]: 0,
      [Stat.Critical]: 0,
      [Stat.MagicEvasion]: 0,
      [Stat.MeleeEvasion]: 0,
    }
  },

  [Archetype.Caster]: {
    baseStatPoints: {
      [Stat.Attack]: 1,
      [Stat.Defense]: 0,
      [Stat.Magic]: 5,
      [Stat.Special]: 2,
  
      [Stat.HP]: 10,
      [Stat.MP]: 30,
      [Stat.Accuracy]: 0,
      [Stat.Critical]: 0,
      [Stat.MagicEvasion]: 0,
      [Stat.MeleeEvasion]: 0,
    },

    levelupPoints: {
      [Stat.Attack]: 0,
      [Stat.Defense]: 0,
      [Stat.Magic]: 4,
      [Stat.Special]: 2,
  
      [Stat.HP]: 2,
      [Stat.MP]: 4,
      [Stat.Accuracy]: 0,
      [Stat.Critical]: 0,
      [Stat.MagicEvasion]: 0,
      [Stat.MeleeEvasion]: 0,
    },

    limitBreakPoints: {
      [Stat.Attack]: 2,
      [Stat.Defense]: 0,
      [Stat.Magic]: 4,
      [Stat.Special]: 2,
  
      [Stat.HP]: 10,
      [Stat.MP]: 30,
      [Stat.Accuracy]: 0,
      [Stat.Critical]: 0,
      [Stat.MagicEvasion]: 0,
      [Stat.MeleeEvasion]: 0,
    }
  },

  [Archetype.Defender]: {
    baseStatPoints: {
      [Stat.Attack]: 1,
      [Stat.Defense]: 5,
      [Stat.Magic]: 1,
      [Stat.Special]: 1,
  
      [Stat.HP]: 30,
      [Stat.MP]: 5,
      [Stat.Accuracy]: 0,
      [Stat.Critical]: 0,
      [Stat.MagicEvasion]: 0,
      [Stat.MeleeEvasion]: 0,
    },

    levelupPoints: {
      [Stat.Attack]: 2,
      [Stat.Defense]: 4,
      [Stat.Magic]: 0,
      [Stat.Special]: 2,
  
      [Stat.HP]: 4,
      [Stat.MP]: 2,
      [Stat.Accuracy]: 0,
      [Stat.Critical]: 0,
      [Stat.MagicEvasion]: 0,
      [Stat.MeleeEvasion]: 0,
    },

    limitBreakPoints: {
      [Stat.Attack]: 2,
      [Stat.Defense]: 6,
      [Stat.Magic]: 2,
      [Stat.Special]: 2,
  
      [Stat.HP]: 30,
      [Stat.MP]: 10,
      [Stat.Accuracy]: 0,
      [Stat.Critical]: 0,
      [Stat.MagicEvasion]: 0,
      [Stat.MeleeEvasion]: 0,
    }
  },

  [Archetype.Healer]: {
    baseStatPoints: {
      [Stat.Attack]: 1,
      [Stat.Defense]: 1,
      [Stat.Magic]: 4,
      [Stat.Special]: 2,
  
      [Stat.HP]: 15,
      [Stat.MP]: 15,
      [Stat.Accuracy]: 0,
      [Stat.Critical]: 0,
      [Stat.MagicEvasion]: 0,
      [Stat.MeleeEvasion]: 0,
    },

    levelupPoints: {
      [Stat.Attack]: 0,
      [Stat.Defense]: 1,
      [Stat.Magic]: 2,
      [Stat.Special]: 2,
  
      [Stat.HP]: 4,
      [Stat.MP]: 2,
      [Stat.Accuracy]: 0,
      [Stat.Critical]: 0,
      [Stat.MagicEvasion]: 0,
      [Stat.MeleeEvasion]: 0,
    },

    limitBreakPoints: {
      [Stat.Attack]: 2,
      [Stat.Defense]: 2,
      [Stat.Magic]: 4,
      [Stat.Special]: 4,
  
      [Stat.HP]: 20,
      [Stat.MP]: 20,
      [Stat.Accuracy]: 0,
      [Stat.Critical]: 0,
      [Stat.MagicEvasion]: 0,
      [Stat.MeleeEvasion]: 0,
    }
  },
  
  [Archetype.Ranger]: {
    baseStatPoints: {
      [Stat.Attack]: 4,
      [Stat.Defense]: 1,
      [Stat.Magic]: 2,
      [Stat.Special]: 1,
  
      [Stat.HP]: 20,
      [Stat.MP]: 10,
      [Stat.Accuracy]: 0,
      [Stat.Critical]: 0,
      [Stat.MagicEvasion]: 0,
      [Stat.MeleeEvasion]: 0,
    },

    levelupPoints: {
      [Stat.Attack]: 2,
      [Stat.Defense]: 0,
      [Stat.Magic]: 2,
      [Stat.Special]: 3,
  
      [Stat.HP]: 4,
      [Stat.MP]: 2,
      [Stat.Accuracy]: 0,
      [Stat.Critical]: 0,
      [Stat.MagicEvasion]: 0,
      [Stat.MeleeEvasion]: 0,
    },

    limitBreakPoints: {
      [Stat.Attack]: 4,
      [Stat.Defense]: 0,
      [Stat.Magic]: 4,
      [Stat.Special]: 4,
  
      [Stat.HP]: 20,
      [Stat.MP]: 10,
      [Stat.Accuracy]: 0,
      [Stat.Critical]: 0,
      [Stat.MagicEvasion]: 0,
      [Stat.MeleeEvasion]: 0,
    }
  },
}