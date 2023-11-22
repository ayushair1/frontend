import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  public setRole(role: string) {
    sessionStorage.setItem('role', role);
  }

  public getRole(): string | null{
    return sessionStorage.getItem('role');
  }

  public setToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  public getToken(): string | null{
    return sessionStorage.getItem('token');
  }
  public clear() {
    sessionStorage.clear();
  }

  public isLoggedIn() {
    return this.getRole() && this.getToken();
  }
}
