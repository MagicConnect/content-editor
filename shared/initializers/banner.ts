
import { IBanner } from '../interfaces';

export const newBanner = (): IBanner => ({
  name: '',
  art: '',
  description: '',
  type: 'characters',
  activeStarts: '',
  activeEnds: '',

  characters: [],
  accessories: [],
  items: [],
  weapons: [],
});