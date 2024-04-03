import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Servers } from '../../constants/servers';
import { HttpClient } from '@angular/common/http';
import { Week } from '../../interfaces/reuniones.interface';

@Injectable({
  providedIn: 'root'
})
export class MeetingsService {
  private server = Servers.URL
  constructor(private httpClient: HttpClient) { }
  getAllWeek(): Observable<any> {
    const url = `${this.server}/meetings`
    return this.httpClient.get(url)
  }

  getCurrentWeek(): Observable<any> {
    const url = `${this.server}/meetings/current`
    return this.httpClient.get(url)
  }
  getByNumberWeek(week: number): Observable<Week> {
    const url = `${this.server}/meetings/by-number-week?numberWeek=${week}`
    return this.httpClient.get<Week>(url)
  }
}
