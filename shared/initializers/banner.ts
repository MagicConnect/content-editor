
import { IBanner } from '../interfaces';

export const newBanner = (): IBanner => ({
  name: '',
  description: '',
  type: 'characters',
  activeStarts: '',
  activeEnds: '',

  characters: [],
  chips: [],
  items: [],
  weapons: [],
});