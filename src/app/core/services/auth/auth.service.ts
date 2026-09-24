import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Servers, Apis } from "../../constants/servers";
import { map, Observable, switchMap, tap } from "rxjs";
import { Congregation, Publisher } from "../../interfaces/reuniones.interface";
import { Credentials, LoginResponse } from "../../interfaces/auth.interface";
import { JwtHelperService } from "@auth0/angular-jwt";
import { DataService } from "../data/data.service";
import { LoaderService } from "../loader/loader.service";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { SessionExpirationService } from "../session/session-expiration.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  jwtUtils!: JwtHelperService;
  private token: any = "token";
  private congregacion!: Congregation;
  private server = Servers.URL;
  private api = Apis;
  constructor(private cookieService: CookieService, private router: Router, private httpClient: HttpClient, private dataService: DataService, private loaderService: LoaderService, private sessionExpirationService: SessionExpirationService) {
    this.jwtUtils = new JwtHelperService();
  }

  login(credential: Credentials): Observable<LoginResponse> {
    const url = `${this.server}${this.api.AUTH}/login`;
    return this.httpClient.post<LoginResponse>(url, credential).pipe(
      tap((data) => {
        localStorage.setItem("token", JSON.stringify(data));
        this.token = this.jwtUtils.decodeToken(data.token) ?? "";
        this.setCongregation(data.congregation);
        this.sessionExpirationService.startMonitoring();
      }),
      switchMap((loginResponse) =>
        this.getByUserId(this.token.userId).pipe(map(() => loginResponse)),
      ),
      tap(() => this.dataService.loadMeetingParts()),
    );
  }

  private setCongregation(congregation: Congregation): void {
    this.congregacion = congregation;
    this.dataService.setCongregation(congregation);
    this.cookieService.set("congregation", JSON.stringify(congregation), { path: "/", sameSite: "Lax" });
    localStorage.setItem("congregation", JSON.stringify(congregation));
  }

  getByUserId(userId: number): Observable<Publisher> {
    this.loaderService.setLoaderSearchPublisher(true);
    const url = `${this.server}${this.api.AUTH}/user/by-id?userId=${userId}`;
    return this.httpClient.get<Publisher>(url).pipe(
      tap((data) => {
        const publisher: Publisher = {
          ...data,
          congregation: this.congregacion,
        };
        this.dataService.setPublisher(publisher);
        localStorage.setItem("publisher", JSON.stringify(publisher));
        this.cookieService.set("publisher", JSON.stringify(publisher), { path: "/", sameSite: "Lax" });
      }),
    );
  }
}
