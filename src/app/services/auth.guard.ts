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
          // Check the user's role and the route they're trying to access
          if (route.routeConfig && route.routeConfig.path && route.routeConfig.path.includes('assignment-detail/:id/assignment-edit') && currentUser.role !== 'admin') {
            // If the user is not an admin and they're trying to access the assignment-edit route, redirect them
            this.router.navigate(['/login']);
            return false;
          } else if (route.routeConfig && route.routeConfig.path && route.routeConfig.path.includes('delete') && currentUser.role !== 'enseignant') {
            // If the user is not a teacher and they're trying to access the delete route, redirect them
            this.router.navigate(['/login']);
            return false;
          } else if (route.routeConfig && route.routeConfig.path && route.routeConfig.path.includes('ajout-devoir') && !currentUser) {
            // If the user is not logged in and they're trying to access the ajout-devoir route, redirect them
            this.router.navigate(['/login']);
            return false;
          }
          // If none of the above conditions are met, allow the user to access the route
          return true;
        }
      }
      localStorage.setItem('redirectUrl', route.url.join('/'));
      this.router.navigate(['/login']);
      return false;
    }
  }