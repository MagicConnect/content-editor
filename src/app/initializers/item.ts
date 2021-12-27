import { IItem, ItemType } from 'content-interfaces';

export const newItem = (): IItem => ({
  id: '',
  name: '',
  art: '',
  sellValue: 100,
  description: '',
  itemType: ItemType.None,
});
