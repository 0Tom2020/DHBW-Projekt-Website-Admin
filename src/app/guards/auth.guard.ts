import {Injectable} from '@angular/core';
import {
    CanActivate,
    CanActivateChild,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    Router
} from '@angular/router';
import {catchError, map, Observable, of} from 'rxjs';
import {AppService} from '@services/app.service';
import {ApiService} from "@services/api.service";
import {error} from "protractor";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private router: Router, private appService: AppService, private apiService: ApiService) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {

      if (this.appService.user) {
        return true
      }

      return this.apiService.getWhoAmI().pipe(
        map(user => {
          if (user) {
            this.appService.user = user
            return true
          } else  {
            this.router.navigate(['/login'], { queryParams: { redirect_to: state.url }})
            return false;
          }
        }), catchError((err) => {
          console.log(err)
          this.router.navigate(['/login'], { queryParams: { redirect_to: state.url }})
          return of(false)
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
