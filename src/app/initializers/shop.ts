
import { IShop, ShopReset } from 'content-interfaces';

export const newShop = (): IShop => ({
  id: '',
  name: '',
  shopReset: ShopReset.None,
  description: '',
  activeStarts: '',
  activeEnds: '',
  characters: [],
  accessories: [],
  items: [],
  weapons: [],
  currencyItem: ''
});
