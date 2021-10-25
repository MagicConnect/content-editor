
export type BannerType = 'characters' | 'chips' | 'weapons';

export interface IBannerRollable {
  name: string;
  weight: number;
}

export interface IBanner {
  name: string;
  description: string;
  type: BannerType;

  activeStarts: Date;
  activeEnds: Date;

  characters: IBannerRollable[];
  chips: IBannerRollable[];
  weapons: IBannerRollable[];
}