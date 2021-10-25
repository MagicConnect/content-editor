import { Injectable } from '@angular/core';
import { LocalStorage } from 'ngx-webstorage';

import { IContentPack } from '../../../../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ModManagerService {

  public get stars() {
    return ['★', '★★', '★★★', '★★★★', '★★★★★'];
  }

  @LocalStorage() public currentPack!: IContentPack;

  constructor() {
    this.init();
  }

  private init() {
    if(!this.currentPack) {
      this.currentPack = {
        banners: [],
        characters: [],
        chips: [],
        items: [],
        shops: [],
        weapons: []
      }
    };
  }
}
