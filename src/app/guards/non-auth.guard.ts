import {Injectable} from '@angular/core';
import {
    CanActivate,
    CanActivateChild,
    Route,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    Router
} from '@angular/router';
import {catchError, map, Observable, of} from 'rxjs';
import {ApiService} from "@services/api.service";
import {AppService} from "@services/app.service";

@Injectable({
    providedIn: 'root'
})
export class NonAuthGuard implements CanActivate, CanActivateChild {
    constructor(private router: Router, private apiService: ApiService, private appService: AppService) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
      if (this.appService.user) {
        this.router.navigate(['/'])
        return false;
      }

      return this.apiService.getWhoAmI().pipe(
        map(user => {
          if (user) {
            this.appService.user = user
            this.router.navigate(['/'])
            return false;
          } else  {
            return true;
          }
        }), catchError((err) => {
          console.log(err)
          return of(true)
        })
      );
    }
    canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this.canActivate(next, state);
    }
}
