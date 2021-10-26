import { IChip, PrimaryStat, SecondaryStat } from '../interfaces';

export const newChip = (): IChip => ({
  name: 'Chip Name',
  sellValue: 0,
  description: '',
  stars: 1,
  primaryStat: PrimaryStat.Defense,

  abilities: [],

  lbRewards: {
    abilities: {},
    stats: {
      [PrimaryStat.Attack]: 0,
      [PrimaryStat.Defense]: 0,
      [PrimaryStat.Magic]: 0,
      [PrimaryStat.Special]: 0,

      [SecondaryStat.Accuracy]: 0,
      [SecondaryStat.Critical]: 0,
      [SecondaryStat.HP]: 0,
      [SecondaryStat.MP]: 0,
      [SecondaryStat.MagicEvasion]: 0,
      [SecondaryStat.MeleeEvasion]: 0,
    },
    skills: {}
  }
});