import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Apis, Servers } from "../../constants/servers";
import { Program, ProgramByWeekFilters, ProgramCreateRequest, ProgramUpdateRequest } from "../../interfaces/reuniones.interface";

@Injectable({
  providedIn: "root",
})
export class ProgramService {
  private readonly server = Servers.URL;
  private readonly api = Apis;

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Program[]> {
    const url = `${this.server}${this.api.PROGRAM}`;
    return this.httpClient.get<Program[]>(url);
  }

  getById(id: number): Observable<Program> {
    const url = `${this.server}${this.api.PROGRAM}/${id}`;
    return this.httpClient.get<Program>(url);
  }

  getByCongregation(congregationId: number): Observable<Program[]> {
    const url = `${this.server}${this.api.PROGRAM}/congregation/${congregationId}`;
    return this.httpClient.get<Program[]>(url);
  }

  /** El backend normaliza la fecha recibida al lunes de esa semana. */
  getProgramsByWeek(filters: ProgramByWeekFilters = {}): Observable<Program[]> {
    let params = new HttpParams();

    if (filters.congregationId != null && filters.congregationId > 0) {
      params = params.set("congregationId", String(filters.congregationId));
    }

    if (filters.date) {
      params = params.set("date", filters.date);
    }

    const url = `${this.server}${this.api.PROGRAM}/by-week`;
    return this.httpClient.get<Program[]>(url, { params });
  }

  create(program: ProgramCreateRequest): Observable<Program> {
    const url = `${this.server}${this.api.PROGRAM}`;
    return this.httpClient.post<Program>(url, program);
  }

  update(id: number, program: ProgramUpdateRequest): Observable<Program> {
    const url = `${this.server}${this.api.PROGRAM}/${id}`;
    return this.httpClient.put<Program>(url, program);
  }

  delete(id: number): Observable<void> {
    const url = `${this.server}${this.api.PROGRAM}/${id}`;
    return this.httpClient.delete<void>(url);
  }
}
