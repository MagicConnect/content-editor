import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public get baseUrl(): string {
    return environment.apiUrl;
  }

  public get meUrl(): string {
    return `${this.baseUrl}/me`;
  }

  public get contentUrl(): string {
    return `${this.baseUrl}/content`;
  }

  public get contentUrlRaw(): string {
    return 'https://gamedata.magic-connect.com/content.json';
  }

  constructor() { }
}
