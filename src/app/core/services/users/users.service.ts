import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Apis, Servers } from '../../constants/servers';
import { Observable, tap } from 'rxjs';
import { Publisher } from '../../interfaces/reuniones.interface';
import { LoaderService } from '../loader/loader.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private server = Servers.URL
  private api = Apis
  constructor(private httpClient: HttpClient, private loaderService: LoaderService) { }

  getAllUsers(): Observable<any> {
    const url = `${this.server}${this.api.USERS}`
    return this.httpClient.get(url)
  }

  getUsersByCongregation(congregationId: number): Observable<any> {
    this.loaderService.setLoaderSearchPublisher(true);
    const url = `${this.server}${this.api.USERS}/by-congregation/${congregationId}`
    return this.httpClient.get(url)
      .pipe(tap(data => {
        this.loaderService.setLoaderSearchPublisher(false);
      }))
  }

  save(publisher: Publisher): Observable<any> {
    const url = `${this.server}${this.api.USERS}`
    return this.httpClient.post<Publisher>(url, publisher)
      .pipe(tap(data => console.log(data)))
  }
}
