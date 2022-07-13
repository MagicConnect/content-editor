import { IStore } from 'content-interfaces';

export const newStore = (): IStore => ({
  id: '',
  name: '',
  items: [],
  cost: 0,
});
