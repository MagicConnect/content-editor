import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLoggingIn = false;
  private _hasLoggedIn = false;

  public get loginInProcess(): boolean {
    return this._isLoggingIn;
  }

  public get loggedIn(): boolean {
    return this._hasLoggedIn;
  }

  constructor(private http: HttpClient, private api: ApiService) { }

  login(email: string, password: string): Observable<any> {
    this._isLoggingIn = true;

    const res = this.http.post(this.api.loginUrl, { email, password })
      .pipe(tap(() => this._isLoggingIn = false))
      .pipe(catchError(v => {
        return throwError(v);
      }));

    res.subscribe(() => {
      this._hasLoggedIn = true;
    });

    return res;
  }

  logout() {
    this._hasLoggedIn = false;
  }
}
