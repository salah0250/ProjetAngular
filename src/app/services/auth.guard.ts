import { Assignment } from '../assignments/assignment.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
@Injectable({
    providedIn: 'root'
  })
  export class AuthGuard implements CanActivate {
    constructor(private router: Router) {}
  
    canActivate(route: ActivatedRouteSnapshot): boolean {
        const currentUserItem = localStorage.getItem('currentUser');
        if (currentUserItem) {
          const currentUser = JSON.parse(currentUserItem);
          if (currentUser) {
            return true;
          }
        }
        localStorage.setItem('redirectUrl', route.url.join('/'));
        this.router.navigate(['/login']);
        return false;
      }
  }