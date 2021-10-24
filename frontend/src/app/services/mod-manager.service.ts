import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModManagerService {

  public get stars() {
    return ['★', '★★', '★★★', '★★★★', '★★★★★'];
  }

  public currentPack = {
    id: '',
    chips: [],
    items: [],
    weapons: [],
  };

  constructor() { }
}
