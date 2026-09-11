import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Servers, Apis } from '../../constants/servers';
import { Observable } from 'rxjs';
import { WeeklyProgram, WeeklyProgramUpsertByTitleRequest } from '../../interfaces/reuniones.interface';
import { WeeklyProgramCreateRequest, WeeklyProgramResponse, WeeklyProgramUpdateRequest } from '../../interfaces/weekly-programs.interface';

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

  /** CRUD actual de una fila semanal. */
  findById(id: number): Observable<WeeklyProgramResponse> {
    return this.httpClient.get<WeeklyProgramResponse>(`${this.server}${this.api.WEEKLYPROGRAM}/${id}`);
  }

  create(request: WeeklyProgramCreateRequest): Observable<WeeklyProgramResponse> {
    return this.httpClient.post<WeeklyProgramResponse>(`${this.server}${this.api.WEEKLYPROGRAM}`, request);
  }

  updateById(id: number, request: WeeklyProgramUpdateRequest): Observable<WeeklyProgramResponse> {
    return this.httpClient.put<WeeklyProgramResponse>(`${this.server}${this.api.WEEKLYPROGRAM}/${id}`, { ...request, id });
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.server}${this.api.WEEKLYPROGRAM}/${id}`);
  }

}
