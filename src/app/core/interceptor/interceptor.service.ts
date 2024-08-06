import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenMock } from './Mocks/token.mock';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers: HttpHeaders;
    let token = TokenMock
    headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
      Fuente: 'web',
    });
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
