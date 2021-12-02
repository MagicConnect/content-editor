import { Archetype, IChip, ItemType, Stat } from '../interfaces';

export const newChip = (): IChip => ({
  name: '',
  art: '',
  itemType: ItemType.Chip,
  sellValue: 100,
  description: '',
  stars: 1,
  primaryStat: Stat.Defense,

  abilities: []
});