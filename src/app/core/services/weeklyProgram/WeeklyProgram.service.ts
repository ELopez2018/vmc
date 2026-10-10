import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Servers, Apis } from '../../constants/servers';
import { concatMap, from, map, Observable, tap, toArray } from 'rxjs';
import { WeeklyProgram, WeeklyProgramUpsertByTitleRequest } from '../../interfaces/reuniones.interface';
import { WeeklyProgramCreateRequest, WeeklyProgramResponse, WeeklyProgramUpdateRequest } from '../../interfaces/weekly-programs.interface';
import { WeeklyProgramDeleteResponse } from '../../interfaces/program-validations.interface';
import { ProgramValidationsService } from '../program/program-validations.service';

@Injectable({
  providedIn: 'root'
})
export class WeeklyProgramService {
  private server = Servers.URL
  private api = Apis
  constructor(private httpClient: HttpClient, private programValidations: ProgramValidationsService) { }
  save(weeklyProgram: WeeklyProgram[]): Observable<WeeklyProgram[]> {
    // El CRUD recibe una fila con ids; no acepta un array de entidades legadas.
    return from(weeklyProgram).pipe(
      concatMap((row) => {
        if (row.assignment?.id == null) throw new Error('La asignación no tiene id.');
        const request: WeeklyProgramCreateRequest = {
          assignmentId: row.assignment.id,
          programId: row.program,
          congregationId: row.congregation.id,
          responsibleId: row.responsible?.id ?? null,
          assistantId: row.assistant?.id ?? null,
          startTime: Array.isArray(row.startTime)
            ? row.startTime.map((part) => String(part).padStart(2, '0')).join(':')
            : row.startTime ?? null,
          room: row.room,
          notificationSentAt: typeof row.notificationSentAt === 'string' ? row.notificationSentAt : null,
        };
        const saved$ = row.id == null ? this.create(request) : this.updateById(row.id, { ...request, id: row.id });
        return saved$.pipe(map((saved) => ({
          ...row,
          id: saved.id,
          assignment: saved.assignment ? { ...row.assignment, ...saved.assignment } : row.assignment,
          responsible: saved.responsible,
          assistant: saved.assistant,
          congregation: saved.congregation ? { ...row.congregation, ...saved.congregation } : row.congregation,
          program: saved.programId,
          startTime: saved.startTime,
          room: saved.room ?? row.room,
          notificationSentAt: saved.notificationSentAt,
          validations: saved.validations,
        }) as WeeklyProgram));
      }),
      toArray(),
    );
  }

  upsertByTitle(weeklyProgram: WeeklyProgramUpsertByTitleRequest): Observable<WeeklyProgram[]> {
    const url = `${this.server}${this.api.WEEKLYPROGRAM}/upsert-by-title`
    const body = weeklyProgram

    return this.httpClient.post<WeeklyProgram[]>(url, body).pipe(
      tap((response) => this.programValidations.applyValidations(response[0]?.validations)),
    );
  }

  /** CRUD actual de una fila semanal. */
  findById(id: number): Observable<WeeklyProgramResponse> {
    return this.httpClient.get<WeeklyProgramResponse>(`${this.server}${this.api.WEEKLYPROGRAM}/${id}`);
  }

  create(request: WeeklyProgramCreateRequest): Observable<WeeklyProgramResponse> {
    return this.httpClient.post<WeeklyProgramResponse>(`${this.server}${this.api.WEEKLYPROGRAM}`, request).pipe(
      tap((response) => this.programValidations.applyValidations(response.validations)),
    );
  }

  updateById(id: number, request: WeeklyProgramUpdateRequest): Observable<WeeklyProgramResponse> {
    return this.httpClient.put<WeeklyProgramResponse>(`${this.server}${this.api.WEEKLYPROGRAM}/${id}`, { ...request, id }).pipe(
      tap((response) => this.programValidations.applyValidations(response.validations)),
    );
  }

  delete(id: number): Observable<WeeklyProgramDeleteResponse> {
    return this.httpClient.delete<WeeklyProgramDeleteResponse>(`${this.server}${this.api.WEEKLYPROGRAM}/${id}`).pipe(
      tap((response) => this.programValidations.applyValidations(response.validations)),
    );
  }

}
