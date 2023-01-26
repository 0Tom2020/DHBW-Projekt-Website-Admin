import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AdminUser} from "@services/api.model";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private http: HttpClient) {}

  loginUser(email: string, password: string) {
    return this.http.post<AdminUser>(environment.backend + '/auth/login', {
      email, password
    },{withCredentials: true});
  }

  logoutUser(): Observable<any> {
    return this.http.post(environment.backend + '/auth/logout', {},{withCredentials: true});
  }

   getWhoAmI(): Observable<AdminUser> {
    return this.http.get<AdminUser>(environment.backend + '/auth/whoami', {withCredentials: true});
  }
}
