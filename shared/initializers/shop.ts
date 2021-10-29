
import { IShop } from '../interfaces';

export const newShop = (): IShop => ({
  name: 'Banner Name',
  description: '',
  activeStarts: '',
  activeEnds: '',
  characters: [],
  chips: [],
  items: [],
  currencyItem: ''
});