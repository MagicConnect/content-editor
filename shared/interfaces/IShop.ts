
export interface IShopBuyable {
  name: string;
  cost: number;
  quantity: number;
}

export interface IShop {
  name: string;
  description: string;
  currency: string;
  activeStarts: Date;
  activeEnds: Date;

  characters: IShopBuyable[];
  chips: IShopBuyable[];
  items: IShopBuyable[];
}