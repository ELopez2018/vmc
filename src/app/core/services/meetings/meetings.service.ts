import { Injectable } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { Servers } from "../../constants/servers";
import { HttpClient } from "@angular/common/http";
import { Meeting, Program, WeeklyProgram } from "../../interfaces/reuniones.interface";
import { OtherAssignment } from "../../enums/meetings.enums";
import { DataService } from "../data/data.service";

@Injectable({
  providedIn: "root",
})
export class MeetingsService {
  private server = Servers.URL;
  constructor(private httpClient: HttpClient) {}
  getAllPrograms(): Observable<any> {
    const url = `${this.server}/meetings/all-program`;
    return this.httpClient.get(url);
  }

  getAllMeetings(): Observable<any> {
    const url = `${this.server}/meetings`;
    return this.httpClient.get(url);
  }

  getCurrentToLast(): Observable<Meeting[]> {
    const url = `${this.server}/meetings/current-Last`;
    return this.httpClient.get<Meeting[]>(url);
  }
  getByNumberWeek(week: number): Observable<Meeting> {
    const url = `${this.server}/meetings/by-number-week?numberWeek=${week}`;
    return this.httpClient.get<Meeting>(url);
  }
  updateMeeting(meeting: Meeting) {
    const url = `${this.server}/meetings`;
    return this.httpClient.put<Meeting>(url, meeting);
  }
  getOtherAssigmenList(otherAssignment: OtherAssignment, numberWeek: number): Observable<any> {
    const params = `?otherAssignment=${otherAssignment}&numberWeek=${numberWeek}`;
    const url = `${this.server}/meetings/search-publisher${params}`;
    return this.httpClient.get<any[]>(url);
  }
  ///meetings/weekly-program/2?page=0&size=4
  getWeeksValids(congregationId: Number, page: number = 0, size: number = 4): Observable<any> {
    const url = `${this.server}/meetings/current-weeks/${congregationId}?page=${page}&size=${size}`;
    return this.httpClient.get<Program[]>(url).pipe(
      map((data) => {
        if (!data) {
          return []; // Devuelve un array vacío si data es null o undefined
        }
        data.forEach((program) => {
          if (program.weeklyPrograms) {
            program.weeklyPrograms.sort((a, b) => a.assignment.number - b.assignment.number);
          }
        });
        return data ?? []; // Devuelve los datos transformados
      }),
    );
  }
  /**
   *   getWeeksValids(congregationId: Number): Observable<any> {
    const url = `${this.server}/meetings/current-weeks/${congregationId}`;
    return this.httpClient.get<Program[]>(url).pipe(
      map((data) => {
        data.forEach((program) => {
          if (program.weeklyProgram) {
            program.weeklyProgram.sort((a, b) => a.assignment.number - b.assignment.number);
          }
        });
        return data ?? []; // Devuelve los datos transformados
      }),
    );
  }
   */

  getUpdateWeeksFromJW(): Observable<any> {
    const url = `${this.server}/meetings/automatic`;
    return this.httpClient.get(url);
  }
  saveOrUpdateWeeklyProgram(weeklyProgram: WeeklyProgram) {
    const url = `${this.server}/meetings/weekly-program`;
    return this.httpClient.post<WeeklyProgram>(url, weeklyProgram);
  }
  saveOrUpdateProgram(program: Program) {
    const url = `${this.server}/program`;
    return this.httpClient.put<Program>(url, program);
  }

  getProgramsByDateRange(fechaDesde: any, fechaHasta: any, congregationId: number): Observable<Program[]> {
    fechaDesde = new Date(fechaDesde);
    fechaHasta = new Date(fechaHasta);
    fechaDesde = fechaDesde.toISOString().split("T")[0];
    fechaHasta = fechaHasta.toISOString().split("T")[0];

    const url = `${this.server}/meetings/get-programs-by-date-range?congregationId=${congregationId}&startDate=${fechaDesde}&endDate=${fechaHasta}`;
    return this.httpClient.get<Program[]>(url);
  }

  
}
