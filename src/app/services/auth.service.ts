import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LocalStorage } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLoggingIn = false;
  private _hasLoggedIn = false;

  @LocalStorage() private token!: string;

  public get idToken(): string {
    return this.token;
  }

  public get loginInProcess(): boolean {
    return this._isLoggingIn;
  }

  public get loggedIn(): boolean {
    return this._hasLoggedIn;
  }

  constructor(private auth: AngularFireAuth) { }

  async login(email: string, password: string): Promise<any> {
    this._isLoggingIn = true;

    try {
      const res = await this.auth.signInWithEmailAndPassword(email, password);
      const currentUser = await this.auth.currentUser;
      this.token = await currentUser?.getIdToken() ?? '';
      this._hasLoggedIn = true;
      return res;

    } catch (err) {
      console.error(err);

    } finally {
      this._isLoggingIn = false;
    }

  }

  logout() {
    this.token = '';
    this._hasLoggedIn = false;
  }
}
