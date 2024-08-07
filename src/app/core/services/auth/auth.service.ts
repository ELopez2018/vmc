import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Servers, Apis } from '../../constants/servers';
import { Observable, tap } from 'rxjs';
import { Congregation } from '../../interfaces/reuniones.interface';
import { Credentials } from '../../interfaces/auth.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DataService } from '../data/data.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtUtils!: JwtHelperService;
  private server = Servers.URL
  private api = Apis
  constructor(
    private httpClient: HttpClient,
    private dataService: DataService
  ) {
    this.jwtUtils = new JwtHelperService()
  }

  login(credential: Credentials): Observable<any> {
    const url = `${this.server}${this.api.AUTH}/login`
    return this.httpClient.post<any>(url, credential).pipe(tap(data => {
      localStorage.setItem("token", JSON.stringify(data))
      this.dataService.setConfigFromStorage();
    }
    ))
  }

}
