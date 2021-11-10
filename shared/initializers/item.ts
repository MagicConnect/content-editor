import { IItem, ItemType } from '../interfaces';

export const newItem = (): IItem => ({
  name: '',
  sellValue: 100,
  description: '',
  itemType: ItemType.None,
});