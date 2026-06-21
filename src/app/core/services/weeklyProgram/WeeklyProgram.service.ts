import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Servers, Apis } from '../../constants/servers';
import { Observable } from 'rxjs';
import { WeeklyProgram, WeeklyProgramUpsertByTitleRequest } from '../../interfaces/reuniones.interface';

@Injectable({
  providedIn: 'root'
})
export class WeeklyProgramService {
  private server = Servers.URL
  private api = Apis
  constructor(private httpClient: HttpClient) { }
  save(weeklyProgram: WeeklyProgram[]): Observable<WeeklyProgram[]> {
    const url = `${this.server}${this.api.WEEKLYPROGRAM}`
    return this.httpClient.post<WeeklyProgram[]>(url, weeklyProgram)
  }

  upsertByTitle(weeklyProgram: WeeklyProgramUpsertByTitleRequest): Observable<WeeklyProgram> {
    const url = `${this.server}${this.api.WEEKLYPROGRAM}/upsert-by-title`
    const body = weeklyProgram

    return this.httpClient.post<WeeklyProgram>(url, body)
  }

}
