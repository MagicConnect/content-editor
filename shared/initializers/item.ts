import { IItem } from '../interfaces';

export const newItem = (): IItem => ({
  name: 'Item Name',
  sellValue: 100,
  description: '',
});