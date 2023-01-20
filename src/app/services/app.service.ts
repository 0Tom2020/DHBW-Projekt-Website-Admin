import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Gatekeeper} from 'gatekeeper-client-sdk';
import {ApiService} from "@services/api.service";
import {catchError, map, Observable, of} from "rxjs";
import {AdminUser} from "@services/api.model";

@Injectable({
    providedIn: 'root'
})
export class AppService {
    public user: AdminUser = null;

    constructor(private router: Router, private toastr: ToastrService, private apiService: ApiService) {}

    loginByAuth({email, password}): Observable<boolean> {
        return this.apiService.loginUser(email, password).pipe(
          map(response => {
            if (response) {
              this.user = response
              return true;
            } else {
              return false;
            }
          }), catchError(err => {
            this.toastr.error(err.error.message)
            return of(false);
          })
        )
    }

    logout() {
        return this.apiService.logoutUser().pipe(
          map(value => {
            this.user = null;
            this.router.navigate(['/login']);
          }),
          catchError((err) => {
            this.toastr.error("Ein Fehler ist aufgetreten!")
            console.log(err)
            return of(false)
          })
        )
    }
}
