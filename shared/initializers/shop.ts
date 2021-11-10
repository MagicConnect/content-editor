
import { IShop } from '../interfaces';

export const newShop = (): IShop => ({
  name: '',
  description: '',
  activeStarts: '',
  activeEnds: '',
  characters: [],
  chips: [],
  items: [],
  weapons: [],
  currencyItem: ''
});