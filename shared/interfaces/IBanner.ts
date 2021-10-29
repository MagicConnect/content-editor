
export type BannerType = 'characters' | 'chips' | 'items' | 'weapons';

export interface IBannerRollable {
  name: string;
  weight: number;
}

export interface IBanner {
  name: string;
  description: string;
  type: BannerType;

  activeStarts: string;
  activeEnds: string;

  characters: IBannerRollable[];
  chips: IBannerRollable[];
  items: IBannerRollable[];
  weapons: IBannerRollable[];
}