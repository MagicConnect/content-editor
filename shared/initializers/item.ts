import { IItem, ItemType } from '../interfaces';

export const newItem = (): IItem => ({
  name: 'Item Name',
  sellValue: 100,
  description: '',
  itemType: ItemType.None,
});