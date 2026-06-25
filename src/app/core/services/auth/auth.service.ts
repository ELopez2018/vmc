import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Servers, Apis } from "../../constants/servers";
import { map, Observable, switchMap, tap } from "rxjs";
import { Congregation, Publisher } from "../../interfaces/reuniones.interface";
import { Credentials } from "../../interfaces/auth.interface";
import { JwtHelperService } from "@auth0/angular-jwt";
import { DataService } from "../data/data.service";
import { LoaderService } from "../loader/loader.service";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  jwtUtils!: JwtHelperService;
  private token: any = "token";
  private congregacion!: Congregation;
  private server = Servers.URL;
  private api = Apis;
  constructor(private cookieService: CookieService, private router: Router, private httpClient: HttpClient, private dataService: DataService, private loaderService: LoaderService) {
    this.jwtUtils = new JwtHelperService();
  }

  login(credential: Credentials): Observable<any> {
    const url = `${this.server}${this.api.AUTH}/login`;
    return this.httpClient.post<any>(url, credential).pipe(
      tap((data) => {
        localStorage.setItem("token", JSON.stringify(data));
        this.token = this.jwtUtils.decodeToken(data.token) ?? "";
      }),
      switchMap((loginResponse) =>
        this.getByCongregationId(this.token.congregationId).pipe(
          switchMap((congregation) =>
            this.getByUserId(this.token.userId).pipe(
              map((publisher) => ({
                loginResponse,
                congregation,
                publisher,
              })),
            ),
          ),
        ),
      ),
      map(({ loginResponse }) => loginResponse),
    );
  }

  getByCongregationId(id: number): Observable<Congregation> {
    const url = `${this.server}${this.api.AUTH}/congregation/by-id?congregationId=${id}`;
    return this.httpClient.get<Congregation>(url).pipe(
      tap((data) => {
        this.congregacion = data;
        this.dataService.setCongregation(data);
        this.cookieService.set("congregation", JSON.stringify(data), { path: "/", sameSite: "Lax" });
        localStorage.setItem("congregation", JSON.stringify(data));
      }),
    );
  }

  getByUserId(userId: Number): Observable<any> {
    this.loaderService.setLoaderSearchPublisher(true);
    const url = `${this.server}${this.api.AUTH}/user/by-id?userId=${userId}`;
    return this.httpClient.get<any>(url).pipe(
      tap((data) => {
        const publisher: Publisher = {
          ...data,
          congregation: this.congregacion,
        };
        this.dataService.setPublisher(publisher);
        localStorage.setItem("publisher", JSON.stringify(publisher));
        this.cookieService.set("publisher", JSON.stringify(publisher), { path: "/", sameSite: "Lax" });
        this.router.navigateByUrl("/tablero");
      }),
    );
  }
}
