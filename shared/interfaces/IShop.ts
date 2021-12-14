
export enum ShopReset {
  None = 'None',
  Daily = 'Daily',
  Weekly = 'Weekly',
  Monthly = 'Monthly',
}

export interface IShopBuyable {
  name: string;
  cost: number;
  quantity: number;
}

export interface IShop {
  name: string;
  description: string;
  currencyItem: string;
  activeStarts: string;
  activeEnds: string;
  shopReset: ShopReset;

  characters: IShopBuyable[];
  accessories: IShopBuyable[];
  items: IShopBuyable[];
  weapons: IShopBuyable[];
}