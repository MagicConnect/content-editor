import { IStore } from '@magicconnect/content-interfaces';

export const newStore = (): IStore => ({
  id: '',
  name: '',
  items: [],
  cost: 0,
});
