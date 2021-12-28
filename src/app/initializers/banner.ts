
import { IBanner } from 'content-interfaces';

export const newBanner = (): IBanner => ({
  id: '',
  name: '',
  art: '',
  description: '',
  activeStarts: '',
  activeEnds: '',

  characters: [],
  accessories: [],
  items: [],
  weapons: [],
});
