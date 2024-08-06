import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Servers, Apis } from '../../constants/servers';
import { Observable } from 'rxjs';
import { Congregation } from '../../interfaces/reuniones.interface';

@Injectable({
  providedIn: 'root'
})
export class CongregationsService {
  private server = Servers.URL
  private api = Apis
  constructor(private httpClient: HttpClient) { }

  getAllCongregations(): Observable<Congregation[]> {
    const url = `${this.server}${this.api.CONGREGATIONS}`
    return this.httpClient.get<Congregation[]>(url)
  }

}
