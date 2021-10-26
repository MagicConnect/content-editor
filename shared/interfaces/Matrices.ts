
import { PrimaryStat, SecondaryStat, Stat } from '.';
import { Archetype } from './BuildingBlocks';

export interface ArchetypeStatMatrix {
  baseStatPoints: Record<Stat, number>;
  levelupPoints: Record<Stat, number>;
  limitBreakPoints: Record<Stat, number>;
}

// pick 25 LB points, 25 levelup points, 25 base stat points

export const StatAllocationMatrix: Record<Archetype, ArchetypeStatMatrix> = {
  [Archetype.Archer]: {
    baseStatPoints: {
      [PrimaryStat.Attack]: 4,
      [PrimaryStat.Defense]: 1,
      [PrimaryStat.Magic]: 2,
      [PrimaryStat.Special]: 1,
  
      [SecondaryStat.HP]: 20,
      [SecondaryStat.MP]: 10,
      [SecondaryStat.Accuracy]: 0,
      [SecondaryStat.Critical]: 0,
      [SecondaryStat.MagicEvasion]: 0,
      [SecondaryStat.MeleeEvasion]: 0,
    },

    levelupPoints: {
      [PrimaryStat.Attack]: 1,
      [PrimaryStat.Defense]: 0,
      [PrimaryStat.Magic]: 1,
      [PrimaryStat.Special]: 0,
  
      [SecondaryStat.HP]: 2,
      [SecondaryStat.MP]: 1,
      [SecondaryStat.Accuracy]: 0,
      [SecondaryStat.Critical]: 0,
      [SecondaryStat.MagicEvasion]: 0,
      [SecondaryStat.MeleeEvasion]: 0,
    },

    limitBreakPoints: {
      [PrimaryStat.Attack]: 2,
      [PrimaryStat.Defense]: 0,
      [PrimaryStat.Magic]: 2,
      [PrimaryStat.Special]: 2,
  
      [SecondaryStat.HP]: 10,
      [SecondaryStat.MP]: 5,
      [SecondaryStat.Accuracy]: 0,
      [SecondaryStat.Critical]: 0,
      [SecondaryStat.MagicEvasion]: 0,
      [SecondaryStat.MeleeEvasion]: 0,
    }
  },

  [Archetype.Attacker]: {
    baseStatPoints: {
      [PrimaryStat.Attack]: 6,
      [PrimaryStat.Defense]: 2,
      [PrimaryStat.Magic]: 0,
      [PrimaryStat.Special]: 0,
  
      [SecondaryStat.HP]: 40,
      [SecondaryStat.MP]: 0,
      [SecondaryStat.Accuracy]: 0,
      [SecondaryStat.Critical]: 0,
      [SecondaryStat.MagicEvasion]: 0,
      [SecondaryStat.MeleeEvasion]: 0,
    },

    levelupPoints: {
      [PrimaryStat.Attack]: 2,
      [PrimaryStat.Defense]: 0,
      [PrimaryStat.Magic]: 0,
      [PrimaryStat.Special]: 0,
  
      [SecondaryStat.HP]: 3,
      [SecondaryStat.MP]: 0,
      [SecondaryStat.Accuracy]: 0,
      [SecondaryStat.Critical]: 0,
      [SecondaryStat.MagicEvasion]: 0,
      [SecondaryStat.MeleeEvasion]: 0,
    },

    limitBreakPoints: {
      [PrimaryStat.Attack]: 3,
      [PrimaryStat.Defense]: 0,
      [PrimaryStat.Magic]: 0,
      [PrimaryStat.Special]: 2,
  
      [SecondaryStat.HP]: 10,
      [SecondaryStat.MP]: 5,
      [SecondaryStat.Accuracy]: 0,
      [SecondaryStat.Critical]: 0,
      [SecondaryStat.MagicEvasion]: 0,
      [SecondaryStat.MeleeEvasion]: 0,
    }
  },

  [Archetype.Caster]: {
    baseStatPoints: {
      [PrimaryStat.Attack]: 1,
      [PrimaryStat.Defense]: 0,
      [PrimaryStat.Magic]: 5,
      [PrimaryStat.Special]: 2,
  
      [SecondaryStat.HP]: 10,
      [SecondaryStat.MP]: 30,
      [SecondaryStat.Accuracy]: 0,
      [SecondaryStat.Critical]: 0,
      [SecondaryStat.MagicEvasion]: 0,
      [SecondaryStat.MeleeEvasion]: 0,
    },

    levelupPoints: {
      [PrimaryStat.Attack]: 0,
      [PrimaryStat.Defense]: 0,
      [PrimaryStat.Magic]: 2,
      [PrimaryStat.Special]: 0,
  
      [SecondaryStat.HP]: 1,
      [SecondaryStat.MP]: 2,
      [SecondaryStat.Accuracy]: 0,
      [SecondaryStat.Critical]: 0,
      [SecondaryStat.MagicEvasion]: 0,
      [SecondaryStat.MeleeEvasion]: 0,
    },

    limitBreakPoints: {
      [PrimaryStat.Attack]: 1,
      [PrimaryStat.Defense]: 0,
      [PrimaryStat.Magic]: 4,
      [PrimaryStat.Special]: 1,
  
      [SecondaryStat.HP]: 5,
      [SecondaryStat.MP]: 15,
      [SecondaryStat.Accuracy]: 0,
      [SecondaryStat.Critical]: 0,
      [SecondaryStat.MagicEvasion]: 0,
      [SecondaryStat.MeleeEvasion]: 0,
    }
  },

  [Archetype.Defender]: {
    baseStatPoints: {
      [PrimaryStat.Attack]: 1,
      [PrimaryStat.Defense]: 5,
      [PrimaryStat.Magic]: 1,
      [PrimaryStat.Special]: 1,
  
      [SecondaryStat.HP]: 30,
      [SecondaryStat.MP]: 5,
      [SecondaryStat.Accuracy]: 0,
      [SecondaryStat.Critical]: 0,
      [SecondaryStat.MagicEvasion]: 0,
      [SecondaryStat.MeleeEvasion]: 0,
    },

    levelupPoints: {
      [PrimaryStat.Attack]: 1,
      [PrimaryStat.Defense]: 1,
      [PrimaryStat.Magic]: 0,
      [PrimaryStat.Special]: 0,
  
      [SecondaryStat.HP]: 2,
      [SecondaryStat.MP]: 1,
      [SecondaryStat.Accuracy]: 0,
      [SecondaryStat.Critical]: 0,
      [SecondaryStat.MagicEvasion]: 0,
      [SecondaryStat.MeleeEvasion]: 0,
    },

    limitBreakPoints: {
      [PrimaryStat.Attack]: 1,
      [PrimaryStat.Defense]: 3,
      [PrimaryStat.Magic]: 1,
      [PrimaryStat.Special]: 1,
  
      [SecondaryStat.HP]: 15,
      [SecondaryStat.MP]: 5,
      [SecondaryStat.Accuracy]: 0,
      [SecondaryStat.Critical]: 0,
      [SecondaryStat.MagicEvasion]: 0,
      [SecondaryStat.MeleeEvasion]: 0,
    }
  },

  [Archetype.Healer]: {
    baseStatPoints: {
      [PrimaryStat.Attack]: 1,
      [PrimaryStat.Defense]: 1,
      [PrimaryStat.Magic]: 4,
      [PrimaryStat.Special]: 2,
  
      [SecondaryStat.HP]: 15,
      [SecondaryStat.MP]: 15,
      [SecondaryStat.Accuracy]: 0,
      [SecondaryStat.Critical]: 0,
      [SecondaryStat.MagicEvasion]: 0,
      [SecondaryStat.MeleeEvasion]: 0,
    },

    levelupPoints: {
      [PrimaryStat.Attack]: 0,
      [PrimaryStat.Defense]: 1,
      [PrimaryStat.Magic]: 1,
      [PrimaryStat.Special]: 0,
  
      [SecondaryStat.HP]: 2,
      [SecondaryStat.MP]: 1,
      [SecondaryStat.Accuracy]: 0,
      [SecondaryStat.Critical]: 0,
      [SecondaryStat.MagicEvasion]: 0,
      [SecondaryStat.MeleeEvasion]: 0,
    },

    limitBreakPoints: {
      [PrimaryStat.Attack]: 1,
      [PrimaryStat.Defense]: 1,
      [PrimaryStat.Magic]: 2,
      [PrimaryStat.Special]: 2,
  
      [SecondaryStat.HP]: 10,
      [SecondaryStat.MP]: 10,
      [SecondaryStat.Accuracy]: 0,
      [SecondaryStat.Critical]: 0,
      [SecondaryStat.MagicEvasion]: 0,
      [SecondaryStat.MeleeEvasion]: 0,
    }
  }
}