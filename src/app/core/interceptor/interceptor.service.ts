import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Servers, Apis } from "../constants/servers";
import { DataService } from "../services/data/data.service";
import { SessionExpirationService } from "../services/session/session-expiration.service";

@Injectable({
  providedIn: "root",
})
export class InterceptorService implements HttpInterceptor {
  private server = Servers.URL;
  private api = Apis;

  constructor(
    private dataService: DataService,
    private sessionExpirationService: SessionExpirationService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.dataService.getAccessToken();
    const isLoginRequest = req.url === `${this.server}${this.api.AUTH}/login`;

    if (!isLoginRequest && accessToken && !this.dataService.hasValidToken()) {
      this.sessionExpirationService.notifyExpiredSession();
      return throwError(
        () =>
          new HttpErrorResponse({
            status: 401,
            statusText: "Unauthorized",
            url: req.url,
            error: "La sesión venció o el token ya no es válido.",
          }),
      );
    }

    let headers: HttpHeaders;

    switch (req.url) {
      case `${this.server}${this.api.AUTH}/login`:
        headers = new HttpHeaders({
          "Content-Type": "application/json",
        });
        break;
      default:
        headers = new HttpHeaders({
          "Content-Type": "application/json",
          ...(accessToken ? { Authorization: "Bearer " + accessToken } : {}),
        });
    }

    const REQ_CLONE = req.clone({
      headers,
    });

    return next.handle(REQ_CLONE).pipe(catchError((error) => this.manejarError(error, isLoginRequest)));
  }

  private manejarError(error: HttpErrorResponse, isLoginRequest: boolean) {
    if (isLoginRequest) {
      return throwError(() => error);
    }

    if (!isLoginRequest && (error.status === 401 || error.status === 403)) {
      this.sessionExpirationService.notifyExpiredSession();
    }

    return throwError(() => error.error ?? error);
  }
}

// private httpOptions = {
//     headers: new HttpHeaders({
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + token,
//         mimeType: "multipart/form-data",
//     }),
// };

// public setHttpOption() {
//     this.httpOptions = {
//         headers: new HttpHeaders({
//             "Content-Type": "application/json",
//             Authorization: "Bearer " + token,
//         }),
//     };
// }
