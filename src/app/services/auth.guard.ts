import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = JSON.parse(localStorage.getItem('user') as string);

    if (user && route.routeConfig?.path === 'register') { // ellenőrizzük, hogy az útvonal register-e és ha igen, akkor a homera irányítunk
      this.router.navigate(['/home'], { queryParams: { cartUnauthorized: true } });
      return false;
    }

    if (user) {
      return true;
    } else {
      // Ha a felhasználó nincs bejelentkezve, visszairányítjuk a /home-ra
      this.router.navigate(['/home'], { queryParams: { cartUnauthorized: true } });
      return false;
    }
  }
}
