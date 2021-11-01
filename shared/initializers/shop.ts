
import { IShop } from '../interfaces';

export const newShop = (): IShop => ({
  name: 'Shop Name',
  description: '',
  activeStarts: '',
  activeEnds: '',
  characters: [],
  chips: [],
  items: [],
  weapons: [],
  currencyItem: ''
});