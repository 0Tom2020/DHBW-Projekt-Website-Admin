import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AdminUser} from "@services/api.model";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private http: HttpClient) {}

  loginUser(email: string, password: string) {
    return this.http.post<AdminUser>('http://localhost:8080/auth/login', {
      email, password
    },{withCredentials: true});
  }

  logoutUser(): Observable<any> {
    return this.http.post('http://localhost:8080/auth/logout', {},{withCredentials: true});
  }

   getWhoAmI(): Observable<AdminUser> {
    return this.http.get<AdminUser>('http://localhost:8080/auth/whoami', {withCredentials: true});
  }
}
