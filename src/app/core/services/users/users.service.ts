import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Apis, Servers } from '../../constants/servers';
import { Observable, tap } from 'rxjs';
import { Publisher } from '../../interfaces/reuniones.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private server = Servers.URL
  private api = Apis
  constructor(private httpClient: HttpClient) { }

  getAllUsers(): Observable<any> {
    const url = `${this.server}${this.api.USERS}`
    return this.httpClient.get(url)
  }

  getUsersByCongregation(congregationId: number): Observable<any> {
    const url = `${this.server}${this.api.USERS}/by-congregation/${congregationId}`
    return this.httpClient.get(url)
  }

  save(publisher: Publisher): Observable<any> {
    const url = `${this.server}${this.api.USERS}`
    return this.httpClient.post<Publisher>(url, publisher)
      .pipe(tap(data => console.log(data)))
  }
}
