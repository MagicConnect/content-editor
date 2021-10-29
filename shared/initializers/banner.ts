
import { IBanner } from '../interfaces';

export const newBanner = (): IBanner => ({
  name: 'Banner Name',
  description: '',
  type: 'characters',
  activeStarts: '',
  activeEnds: '',

  characters: [],
  chips: [],
  items: [],
  weapons: [],
});