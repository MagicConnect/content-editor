import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public get baseUrl(): string {
    return environment.apiUrl;
  }

  public get contentUrl(): string {
    return `${this.baseUrl}/content`;
  }

  constructor() { }
}
