
import { IBanner } from '@magicconnect/content-interfaces';

export const newBanner = (): IBanner => ({
  id: '',
  name: '',
  art: '',
  description: '',
  activeStarts: '',
  activeEnds: '',
  rollItem: '',

  characters: [],
  accessories: [],
  items: [],
  weapons: [],
});
