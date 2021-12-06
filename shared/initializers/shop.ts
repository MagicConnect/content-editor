
import { IShop, ShopReset } from '../interfaces';

export const newShop = (): IShop => ({
  name: '',
  shopReset: ShopReset.None,
  description: '',
  activeStarts: '',
  activeEnds: '',
  characters: [],
  chips: [],
  items: [],
  weapons: [],
  currencyItem: ''
});