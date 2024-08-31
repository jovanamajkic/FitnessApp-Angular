import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly TOKEN_KEY = 'token';
  private readonly USER_KEY = 'user';

  constructor() { }

  saveToken(token: string){
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null{
    return localStorage.getItem(this.TOKEN_KEY);
  }

  saveUser(user: User){
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  getUser(): any{
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  clear(): void {
    localStorage.clear();
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }
}
