
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

  characters: IShopBuyable[];
  chips: IShopBuyable[];
  items: IShopBuyable[];
}