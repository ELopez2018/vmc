import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Servers } from '../../constants/servers';
import { HttpClient } from '@angular/common/http';
import { Meeting } from '../../interfaces/reuniones.interface';
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
    return this.httpClient.get(url)
  }
  getByNumberWeek(week: number): Observable<Meeting> {
    const url = `${this.server}/meetings/by-number-week?numberWeek=${week}`
    return this.httpClient.get<Meeting>(url)
  }
  updateMeeting(meeting: Meeting) {
    const url = `${this.server}/meetings`
    return this.httpClient.put<Meeting>(url,meeting)
  }
  getOtherAssigmenList(otherAssignment: OtherAssignment, numberWeek: number): Observable<any> {
    const params=`?otherAssignment=${otherAssignment}&numberWeek=${numberWeek}`
    const url = `${this.server}/meetings/search-publisher${params}`
    return this.httpClient.get<any[]>(url)
  }
  getWeeksValids(): Observable<any> {
    const url = `${this.server}/meetings/current-weeks`
    return this.httpClient.get(url)
  }


  // /current-weeks
}
