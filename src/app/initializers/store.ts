import { IStore } from 'content-interfaces';

export const newStore = (): IStore => ({
  name: '',
  items: [],
  cost: 0,
});
