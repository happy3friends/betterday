import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
  private BELEPES_PATH = 'login';
  private REG_PATH = 'signup';

  constructor(private  authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.check(null, state);
  }

  private check(route?: Route, state?: RouterStateSnapshot) {
    return new Observable<boolean>((observer) => {
      this.authService.authGuardCheckUserIsLoggedIn()
        .subscribe((loggedIn: boolean) => {
          if (route != null && route.path === this.BELEPES_PATH
            || state != null && state.url === `/${this.BELEPES_PATH}`) {
            // loginra akar lepni a user
            if (loggedIn) {
              // be van lepve ezert elzavarom a domain gyokerebe es majd a router redirect eliranyitja
              // az alap home-ra, igy nem kell itt tudni hogy mi az alap home route
              this.router.navigate(['/']);
              observer.next(false);
              return observer.complete();
            }
            // nem vagyok belepve ezert engedem hogy a loginra lepj
            observer.next(true);
            return observer.complete();
          }
          if (route != null && route.path === this.REG_PATH
            || state != null && state.url === `/${this.REG_PATH}`) {
            // signeupra akar lepni a user
            if (loggedIn) {
              // be van lepve ezert elzavarom a domain gyokerebe es majd a router redirect eliranyitja
              // az alap home-ra, igy nem kell itt tudni hogy mi az alap home route
              this.router.navigate(['/']);
              observer.next(false);
              return observer.complete();
            }
            // nem vagyok belepve ezert engedem hogy a signeupra lepj
            observer.next(true);
            return observer.complete();
          }
          if (!loggedIn) {
            // nem vagy belepve es olyan helyre akarsz menni ami vedett , ezert elzavarlak a loginra :D
            this.router.navigate([`/${this.BELEPES_PATH}`]);
            observer.next(false);
            return observer.complete();
          }
          // be vagy lepve
          observer.next(true);
          return observer.complete();
        });
    });
  }
}
