
import { IBanner } from 'content-interfaces';

export const newBanner = (): IBanner => ({
  id: '',
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
