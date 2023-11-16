import { Injectable } from '@angular/core';

interface User {
  login: string;
  password: string;
  role: 'user' | 'admin';
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private users: User[] = [
    { login: 'user1', password: 'pass1', role: 'user' },
    { login: 'admin', password: 'pass2', role: 'admin' },
    // add more users as needed
  ];

  isLogged(login: string, password: string): boolean {
    return this.users.some(user => user.login === login && user.password === password);
  }

  isAdmin(login: string, password: string): boolean {
    const user = this.users.find(user => user.login === login && user.password === password);
    return user ? user.role === 'admin' : false;
  }
}