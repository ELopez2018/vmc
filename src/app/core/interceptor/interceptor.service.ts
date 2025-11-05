import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenMock } from './Mocks/token.mock';
import { Servers, Apis } from '../constants/servers';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  private server = Servers.URL
  private api = Apis
  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const tokenStr = localStorage.getItem("token")
    let tokenObj;
    if(tokenStr){
      tokenObj = JSON.parse(tokenStr)
    }
    let headers: HttpHeaders;
    switch (req.url) {
      case `${this.server}${this.api.AUTH}/login`:
        headers = new HttpHeaders({
          'Content-Type': 'application/json',
        });
        break;
      default:
        headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + tokenObj?.token,
        });
    }




    const REQ_CLONE = req.clone({
      headers,
    });
    return next.handle(REQ_CLONE).pipe(catchError(this.manejarError));
  }
  manejarError(error: HttpErrorResponse) {
    return throwError(error.error);
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
