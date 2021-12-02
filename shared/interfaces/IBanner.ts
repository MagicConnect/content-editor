
export type BannerType = 'characters' | 'chips' | 'items' | 'weapons';

export interface IBannerRollable {
  name: string;
  isBannerSpecial: boolean;
}

export interface IBanner {
  name: string;
  art: string;
  description: string;
  type: BannerType;

  activeStarts: string;
  activeEnds: string;

  characters: IBannerRollable[];
  chips: IBannerRollable[];
  items: IBannerRollable[];
  weapons: IBannerRollable[];
}