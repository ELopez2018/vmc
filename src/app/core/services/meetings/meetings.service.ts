import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Servers } from '../../constants/servers';
import { HttpClient } from '@angular/common/http';
import { Meeting, Program, WeeklyProgram } from '../../interfaces/reuniones.interface';
import { OtherAssignment } from '../../enums/meetings.enums';

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
    return this.httpClient.get<Program[]>(url)
  }
  getByNumberWeek(week: number): Observable<Meeting> {
    const url = `${this.server}/meetings/by-number-week?numberWeek=${week}`
    return this.httpClient.get<Meeting>(url)
  }
  updateMeeting(meeting: Meeting) {
    const url = `${this.server}/meetings`
    return this.httpClient.put<Meeting>(url, meeting)
  }
  getOtherAssigmenList(otherAssignment: OtherAssignment, numberWeek: number): Observable<any> {
    const params = `?otherAssignment=${otherAssignment}&numberWeek=${numberWeek}`
    const url = `${this.server}/meetings/search-publisher${params}`
    return this.httpClient.get<any[]>(url)
  }
  getWeeksValids(): Observable<any> {
    const url = `${this.server}/meetings/current-weeks`
    return this.httpClient.get<Program[]>(url).pipe(
      map(data => {
        data.forEach(program => {
          if (program.weeklyProgram) {
            program.weeklyProgram.sort((a, b) => a.assignment.number - b.assignment.number);
          }
        });
        return data; // Devuelve los datos transformados
      })
    )
  }
  getUpdateWeeksFromJW(): Observable<any> {
    const url = `${this.server}/meetings/automatic`
    return this.httpClient.get(url)
  }
  saveOrUpdateWeeklyProgram(weeklyProgram: WeeklyProgram) {
    const url = `${this.server}/meetings/weekly-program`
    return this.httpClient.post<WeeklyProgram>(url, weeklyProgram)
  }
  saveOrUpdateProgram(program: Program) {
    const url = `${this.server}/meetings/program`
    return this.httpClient.post<Program>(url, program)
  }
}
