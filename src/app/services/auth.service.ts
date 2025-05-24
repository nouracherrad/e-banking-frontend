import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {jwtDecode} from 'jwt-decode';
import {Router} from '@angular/router';
interface CustomJwtPayload {
  sub: string;
  scope: string[] | string;
}
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isAuthenticated: boolean = false;
  roles: any;
  username: any;
  accessToken!: any; // solution à TS2564

  constructor(private http: HttpClient , private router:Router) {}

  public login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded");

    const body = new HttpParams()
      .set("username", username)
      .set("password", password);

    return this.http.post("http://localhost:8085/auth/login", body.toString(), { headers });
  }

  loadProfile(data: { 'access-token': string }) { // solution à TS7053
    this.isAuthenticated = true;
    this.accessToken = data['access-token'];
console.log("ha ana token",this.accessToken);
    let decodeJwt: any = jwtDecode(this.accessToken);
    this.username = decodeJwt.sub;
    this.roles = decodeJwt.scope;
    window.localStorage.setItem("access-token", this.accessToken);
  }
  logout() {
    this.isAuthenticated = true;
    this.accessToken=undefined;
    this.username=undefined;
    this.roles=undefined;
    window.localStorage.removeItem("access-token");
    this.router.navigateByUrl("/login");

  }
  loadJwtTokenFromLocalStorage() {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem("access-token");
      if (token) {
        this.accessToken = token;
      }
    }
  }

}
