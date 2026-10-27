import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly isLoggedIn = signal(false);
  private readonly users = [{ username: 'admin', password: 'admin123', name: 'Admin' }];

  login(username: string, password: string): boolean {
    const user = this.users.find(account => account.username === username && account.password === password);
    if (user) this.isLoggedIn.set(true);
    return !!user;
  }

  register(name: string, username: string, password: string): boolean {
    if (this.users.some(user => user.username === username)) return false;
    this.users.push({ name, username, password });
    this.isLoggedIn.set(true);
    return true;
  }

  logout(): void {
    this.isLoggedIn.set(false);
  }
}