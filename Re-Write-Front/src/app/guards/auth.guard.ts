import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  currentUser;
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isLoggedIn.pipe(
      take(1),
      map((isLoggedIn: boolean) => {
        const itemStr = localStorage.getItem("currentUser")
        if (itemStr == null) {
          this.authService.logout();
          return;
        }
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const item = JSON.parse(itemStr)
        const now = new Date();
        if (now.getTime() > item.expiry) {
          isLoggedIn = false;
          // If the item is expired, delete the item from storage
          // and return null
          localStorage.removeItem("currentUser");
          this.authService.logout();
          return false;
        } else {
          localStorage.removeItem("currentUser");
          const now = new Date()
          const item = {
            'currentUser': this.currentUser.currentUser,
            expiry: now.getTime() + 180000,
          }
          localStorage.setItem("currentUser", JSON.stringify(item));
          return true;
        }
      }))
  }
}
