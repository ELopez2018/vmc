import { Injectable } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { Servers } from "../../constants/servers";
import { HttpClient } from "@angular/common/http";
import {
  BackendTime,
  Meeting,
  Program,
  ProgramUpdateRequest,
  WeeklyProgram,
} from "../../interfaces/reuniones.interface";
import { OtherAssignment } from "../../enums/meetings.enums";
import { DataService } from "../data/data.service";

/**
 * Contrato de lectura de `GET /meetings/programs/{congregationId}`.
 *
 * El endpoint entrega una proyección plana, mientras que la aplicación usa
 * `Program` con `meeting` y `weeklyPrograms` anidados. Se conserva esa
 * diferencia únicamente en este borde de la API.
 */
interface ProgramOverviewResponse {
  /** Identificadores explícitos recomendados para operaciones de escritura. */
  programId?: number;
  meetingId?: number;
  id: number;
  week: number[] | string;
  weekNumber: number;
  weeklyBibleReading: string;
  meetingUrl?: string | null;
  openingSong?: string | null;
  intermediateSong?: string | null;
  finalSong?: string | null;
  startTimeOpeningSong?: BackendTime | null;
  startTimeIntro?: BackendTime | null;
  startTimeIntermediateSong?: BackendTime | null;
  startTimeFinalSong?: BackendTime | null;
  startTimeConclusionWords?: BackendTime | null;
  event?: string | null;
  openingPrayer?: Program["openingPrayer"];
  president?: Program["president"];
  assistantAdviser?: Program["assistantAdviser"];
  finalPrayer?: Program["finalPrayer"];
  assignments?: ProgramAssignmentOverviewResponse[];
}

interface ProgramAssignmentOverviewResponse {
  weeklyProgramId?: number;
  assignmentId?: number;
  id: number;
  number: number;
  title: string;
  section: string;
  duration?: number | null;
  durationUnit?: string | null;
  sourceText?: string | null;
  sourceHtml?: string | null;
  sourceLinks?: string | null;
  sourceUrl?: string | null;
  responsible?: WeeklyProgram["responsible"];
  assistant?: WeeklyProgram["assistant"];
  startTime?: BackendTime | null;
  room?: string | null;
}

/** Respuesta paginada de Spring Data del endpoint de programas. */
interface ProgramOverviewPageResponse {
  content?: ProgramOverviewResponse[];
  last?: boolean;
  totalPages?: number;
  totalElements?: number;
  number?: number;
  size?: number;
}

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
  getWeeksValids(congregationId: number, page: number = 0, size: number = 4): Observable<Program[]> {
    const url = `${this.server}/meetings/programs/${congregationId}?page=${page}&size=${size}`;

    return this.httpClient.get<ProgramOverviewPageResponse>(url).pipe(
      map((data) => this.sortProgramsByAssignmentNumber((data?.content ?? []).map((program) => this.toProgram(program, congregationId)))),
    );
  }

  getUpdateWeeksFromJW(): Observable<any> {
    const url = `${this.server}/meetings/automatic`;
    return this.httpClient.get(url);
  }
  saveOrUpdateWeeklyProgram(weeklyProgram: WeeklyProgram) {
    const url = `${this.server}/meetings/weekly-program`;
    return this.httpClient.post<WeeklyProgram>(url, weeklyProgram);
  }
  saveOrUpdateProgram(program: Program) {
    const url = `${this.server}/program/${program.id}`;
    const request: ProgramUpdateRequest = {
      meetingId: program.meeting.id,
      congregationId: program.congregation.id,
      weekNumber: program.weekNumber,
      startTimeOpeningSong: this.toApiTime(program.startTimeOpeningSong),
      startTimeIntro: this.toApiTime(program.startTimeIntro),
      startTimeIntermediateSong: this.toApiTime(program.startTimeIntermediateSong),
      startTimeConclusionWords: this.toApiTime(program.startTimeConclusionWords),
      startTimeFinalSong: this.toApiTime(program.startTimeFinalSong),
      event: program.event,
      openingPrayerId: program.openingPrayer?.id ?? null,
      presidentId: program.president?.id ?? null,
      assistantAdviserId: program.assistantAdviser?.id ?? null,
      finalPrayerId: program.finalPrayer?.id ?? null,
    };

    return this.httpClient.put<Program>(url, request).pipe(
      tap((updatedProgram) => Object.assign(program, updatedProgram)),
    );
  }

  private toApiTime(value: BackendTime | null | undefined): string | null {
    if (!value) {
      return null;
    }

    if (!Array.isArray(value)) {
      return value;
    }

    const [hours = 0, minutes = 0, seconds] = value;
    const normalizedTime = [hours, minutes].map((item) => item.toString().padStart(2, "0")).join(":");

    return seconds === undefined ? normalizedTime : `${normalizedTime}:${seconds.toString().padStart(2, "0")}`;
  }

  getProgramsByDateRange(fechaDesde: any, fechaHasta: any, congregationId: number): Observable<Program[]> {
    fechaDesde = new Date(fechaDesde);
    fechaHasta = new Date(fechaHasta);
    fechaDesde = fechaDesde.toISOString().split("T")[0];
    fechaHasta = fechaHasta.toISOString().split("T")[0];

    const url = `${this.server}/meetings/get-programs-by-date-range?congregationId=${congregationId}&startDate=${fechaDesde}&endDate=${fechaHasta}`;
    return this.httpClient.get<Program[]>(url).pipe(
      map((programs) => this.sortProgramsByAssignmentNumber(programs)),
    );
  }

  /**
   * El API no garantiza el orden de las partes. Mantiene cada programa en el
   * orden ascendente de `assignment.number` para todas las pantallas y filtros.
   */
  private sortProgramsByAssignmentNumber(programs: Program[] | null | undefined): Program[] {
    return (programs ?? []).map((program) => ({
      ...program,
      weeklyPrograms: [...(program.weeklyPrograms ?? [])].sort(
        (current, next) => this.assignmentNumber(current) - this.assignmentNumber(next),
      ),
    }));
  }

  private assignmentNumber(weeklyProgram: WeeklyProgram): number {
    const number = weeklyProgram?.assignment?.number;

    return typeof number === "number" && Number.isFinite(number) ? number : Number.MAX_SAFE_INTEGER;
  }

  private toProgram(response: ProgramOverviewResponse, congregationId: number): Program {
    const programId = response.programId ?? response.id;
    const meetingId = response.meetingId ?? response.id;
    const meeting = {
      id: meetingId,
      week: this.toIsoDate(response.week),
      weekNumber: response.weekNumber,
      openingSong: response.openingSong ?? "",
      intermediateSong: response.intermediateSong ?? "",
      finalSong: response.finalSong ?? "",
      weeklyBibleReading: response.weeklyBibleReading ?? "",
      url: response.meetingUrl ?? "",
      introTime: 0,
      timeType: "",
    };
    const congregation = { id: congregationId, name: "", number: "", hour: "", day: 0 };

    return {
      id: programId,
      meeting,
      weekNumber: response.weekNumber,
      startTimeOpeningSong: response.startTimeOpeningSong ?? [0, 0],
      startTimeIntro: response.startTimeIntro ?? [0, 0],
      startTimeIntermediateSong: response.startTimeIntermediateSong ?? [0, 0],
      startTimeFinalSong: response.startTimeFinalSong ?? [0, 0],
      startTimeConclusionWords: response.startTimeConclusionWords ?? [0, 0],
      openingPrayer: response.openingPrayer ?? null,
      president: response.president ?? null,
      assistantAdviser: response.assistantAdviser ?? null,
      finalPrayer: response.finalPrayer ?? null,
      congregation,
      event: response.event ?? null,
      weeklyPrograms: (response.assignments ?? []).map((assignment) => ({
        id: assignment.weeklyProgramId ?? assignment.id,
        assignment: {
          id: assignment.assignmentId,
          title: assignment.title,
          number: assignment.number,
          sectionMeeting: assignment.section,
          time: assignment.duration ?? undefined,
          timeType: assignment.durationUnit ?? "",
          showTips: false,
          sourceText: assignment.sourceText,
          sourceHtml: assignment.sourceHtml,
          sourceLinks: assignment.sourceLinks,
          sourceUrl: assignment.sourceUrl,
          meeting,
        },
        responsible: assignment.responsible ?? null,
        assistant: assignment.assistant ?? null,
        congregation,
        program: programId,
        startTime: assignment.startTime ?? null,
        room: assignment.room ?? "A",
      })),
    };
  }

  private toIsoDate(value: number[] | string): number {
    if (typeof value === "string") {
      return new Date(`${value}T00:00:00`).getTime();
    }

    const [year, month, day] = value;
    return Date.UTC(year, month - 1, day);
  }

  
}
