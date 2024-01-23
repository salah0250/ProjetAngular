import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

interface User {
  Email: string;
  password: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  /*
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
  */ 
  constructor(private http: HttpClient) {}

  isLogged(Email: string, password: string): Observable<string | null> {
    return this.http.post<User>('https://back-end-assignment.onrender.com/api/users', { Email, password }).pipe(
      map(user => user ? user.role : null),
      catchError(() => of(null))
    );
  }
}