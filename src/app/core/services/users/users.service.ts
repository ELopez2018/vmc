import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Apis, Servers } from '../../constants/servers';
import { Observable } from 'rxjs';

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
}
