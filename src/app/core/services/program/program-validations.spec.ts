import { provideHttpClient } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { Observable } from "rxjs";
import { PersonValidation, ProgramValidations, ValidationSeverity } from "../../interfaces/program-validations.interface";
import { Program, WeeklyProgram } from "../../interfaces/reuniones.interface";
import { ProgramPdf } from "../../interfaces/print-pdf.interface";
import { MeetingsService } from "../meetings/meetings.service";
import { WeeklyProgramService } from "../weeklyProgram/WeeklyProgram.service";
import { ProgramService } from "./program.service";
import { ProgramValidationsService } from "./program-validations.service";
import { ProgramWeekComponent } from "src/app/pages/entre-semana/components/programs/components/program-week/program-week.component";
import { SectionMeeting } from "../../enums/meetings.enums";
import { environment } from "src/environments/environment";

function person(userId = 11, severity: ValidationSeverity = "ERROR"): PersonValidation {
  return {
    userId, fullName: `Participante ${userId}`, severity,
    items: [{
      code: "FUTURE_RULE", severity, message: `Aviso de la persona ${userId}`,
      related: [{ programId: 100, weeklyProgramId: null, week: "2026-10-05", role: "presidente", number: null, title: null }],
    }],
  };
}

describe("Migración de validaciones del programa", () => {
  let store: ProgramValidationsService;
  let http: HttpTestingController;
  let weekly: WeeklyProgramService;
  let programs: ProgramService;
  let meetings: MeetingsService;
  const updated: ProgramValidations[] = [
    { programId: 100, week: "2026-10-05", persons: [person(12, "INFO")] },
    { programId: 101, week: "2026-10-12", persons: [] },
    { programId: 999, week: "2026-10-19", persons: [person(11)] },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [ProgramWeekComponent], providers: [provideHttpClient(), provideHttpClientTesting()] });
    store = TestBed.inject(ProgramValidationsService);
    http = TestBed.inject(HttpTestingController);
    weekly = TestBed.inject(WeeklyProgramService);
    programs = TestBed.inject(ProgramService);
    meetings = TestBed.inject(MeetingsService);
    store.setProgramValidations(100, [person()]);
    store.setProgramValidations(101, [person()]);
    store.setProgramValidations(102, [person()]);
  });

  afterEach(() => http.verify());

  function expectReplaced(): void {
    expect(store.validationsFor(100, 11)).toBeUndefined();
    expect(store.validationsFor(100, 12)?.severity).toBe("INFO");
    expect(store.validationsByProgram().get(101)).toEqual([]);
    expect(store.validationsFor(999, 11)).toBeDefined();
    expect(store.validationsFor(102, 11)).toBeDefined();
  }

  it("sustituye las personas, limpia arrays vacíos y conserva programas no recibidos", () => {
    const before = store.validationsByProgram();
    store.applyValidations(updated);
    expectReplaced();
    expect(store.validationsByProgram()).not.toBe(before);
    expect(store.validationsFor(100, null)).toBeUndefined();
    expect(store.validationsFor(100, undefined)).toBeUndefined();
    expect(store.validationsFor(5000, 11)).toBeUndefined();
  });

  const mutations: { name: string; method: string; url: string; call: () => Observable<unknown>; body: () => object }[] = [
    { name: "POST semanal", method: "POST", url: "/weeklyProgram", call: () => weekly.create({ assignmentId: 1, programId: 100 }), body: () => ({ id: 7, programId: 100, validations: updated }) },
    { name: "PUT semanal", method: "PUT", url: "/weeklyProgram/7", call: () => weekly.updateById(7, { id: 7, assignmentId: 1, programId: 100 }), body: () => ({ id: 7, programId: 100, validations: updated }) },
    { name: "upsert por título", method: "POST", url: "/weeklyProgram/upsert-by-title", call: () => weekly.upsertByTitle({ programId: 100, congregationId: 2, title: "Parte", number: 1, sectionMeeting: "TESOROS", timeType: "mins.", showTips: false, room: "A" }), body: () => [{ id: 7, program: 100, validations: updated }, { id: 8, program: 100, validations: updated }] },
    { name: "DELETE semanal con cuerpo", method: "DELETE", url: "/weeklyProgram/7", call: () => weekly.delete(7), body: () => ({ id: 7, programId: 100, validations: updated }) },
    { name: "POST programa", method: "POST", url: "/program", call: () => programs.create({ meetingId: 1, congregationId: 2 }), body: () => ({ id: 100, validations: updated }) },
    { name: "PUT programa", method: "PUT", url: "/program/100", call: () => programs.update(100, { meetingId: 1, congregationId: 2 }), body: () => ({ id: 100, validations: updated }) },
    { name: "POST semanal legado", method: "POST", url: "/meetings/weekly-program", call: () => meetings.saveOrUpdateWeeklyProgram({ program: 100 } as WeeklyProgram), body: () => ({ id: 7, validations: updated }) },
    { name: "guardado de presidencia y oraciones", method: "PUT", url: "/program/100", call: () => meetings.saveOrUpdateProgram({ id: 100, meeting: { id: 1 }, congregation: { id: 2 } } as Program), body: () => ({ id: 100, validations: updated }) },
  ];

  for (const mutation of mutations) {
    it(`aplica todas las semanas tras ${mutation.name}`, () => {
      let received: unknown;
      mutation.call().subscribe((response) => received = response);
      const request = http.expectOne((candidate) => candidate.url.endsWith(mutation.url));
      expect(request.request.method).toBe(mutation.method);
      request.flush(mutation.body());
      expect(received).toEqual(mutation.body());
      expectReplaced();
    });

    it(`conserva el estado si falla ${mutation.name}`, () => {
      const before = store.validationsByProgram();
      let failed = false;
      mutation.call().subscribe({ error: () => failed = true });
      http.expectOne((candidate) => candidate.url.endsWith(mutation.url))
        .flush({ message: "No se pudo guardar" }, { status: 400, statusText: "Bad Request" });
      expect(failed).toBeTrue();
      expect(store.validationsByProgram()).toBe(before);
    });
  }

  it("elimina el programa y reevalúa los restantes tras DELETE 200", () => {
    programs.delete(100).subscribe((response) => expect(response.id).toBe(100));
    http.expectOne((request) => request.url.endsWith("/program/100"))
      .flush({ id: 100, congregationId: 2, validations: updated });
    expect(store.validationsByProgram().has(100)).toBeFalse();
    expect(store.validationsByProgram().get(101)).toEqual([]);
    expect(store.validationsFor(999, 11)).toBeDefined();
  });

  it("conserva las validaciones si DELETE programa falla", () => {
    const before = store.validationsByProgram();
    programs.delete(100).subscribe({ error: () => undefined });
    http.expectOne((request) => request.url.endsWith("/program/100"))
      .flush({}, { status: 400, statusText: "Bad Request" });
    expect(store.validationsByProgram()).toBe(before);
  });

  it("crea una fila con ids, conserva la fuente y aplica sus validaciones", () => {
    const row = {
      assignment: { id: 3, meeting: { id: 5 }, showTips: true, sourceHtml: "<p>Fuente</p>" },
      program: 100, congregation: { id: 2 }, room: "B", startTime: [19, 30],
    } as WeeklyProgram;
    let saved: WeeklyProgram;
    weekly.save([row]).subscribe((response) => saved = response[0]);
    const request = http.expectOne((candidate) => candidate.url.endsWith("/weeklyProgram"));
    expect(request.request.body).toEqual(jasmine.objectContaining({ assignmentId: 3, programId: 100, room: "B", startTime: "19:30" }));
    expect(Array.isArray(request.request.body)).toBeFalse();
    request.flush({ id: 7, assignment: { id: 3 }, programId: 100, room: "B", validations: updated });
    expect(saved!.assignment.sourceHtml).toBe("<p>Fuente</p>");
    expect(saved!.assignment.meeting.id).toBe(5);
    expectReplaced();
  });

  it("hidrata el rango filtrado desde todas las páginas sin perder los detalles legados", () => {
    const detailed = { id: 100, weeklyPrograms: [] as WeeklyProgram[], meeting: { initialSong: { title: "Canción" } } };
    let result: Program[];
    meetings.getProgramsByDateRange("2026-10-05", "2026-10-12", 2).subscribe((data) => result = data);
    http.expectOne((request) => request.url.includes("/meetings/get-programs-by-date-range"))
      .flush([detailed]);
    const overview = http.expectOne((request) => request.url.endsWith("/meetings/programs/2") &&
      request.params.get("page") === String(environment.pagination.initialPage));
    expect(overview.request.params.get("size")).toBe(String(environment.pagination.batchSize));
    expect(overview.request.params.get("startDate")).toBe("2026-10-05");
    expect(overview.request.params.get("endDate")).toBe("2026-10-12");
    overview
      .flush({ content: [{ programId: 100, validations: [person(12, "INFO")] }], totalPages: 2, last: false });
    expect(store.validationsFor(100, 11)).toBeDefined();
    http.expectOne((request) => request.url.endsWith("/meetings/programs/2") &&
      request.params.get("startDate") === "2026-10-05" && request.params.get("endDate") === "2026-10-12" &&
      request.params.get("size") === String(environment.pagination.batchSize) && request.params.get("page") === "1")
      .flush({ content: [{ programId: 101, validations: [] }], totalPages: 2, last: true });
    expect(result![0].meeting.initialSong?.title).toBe("Canción");
    expect(store.validationsFor(100, 11)).toBeUndefined();
    expect(store.validationsFor(100, 12)?.severity).toBe("INFO");
    expect(store.validationsByProgram().get(101)).toEqual([]);
  });

  it("repinta responsables, ayudantes, presidencia y oraciones de semanas visibles", async () => {
    await TestBed.compileComponents();
    const fixture = TestBed.createComponent(ProgramWeekComponent);
    const publisher = { id: 11, fullName: "Participante 11" } as Program["president"];
    fixture.componentInstance.semana = {
      id: 100, event: null, meeting: { week: Date.UTC(2026, 9, 5), url: "", introTime: 5, timeType: "mins." },
      congregation: { name: "Congregación" }, president: publisher, assistantAdviser: publisher,
      openingPrayer: publisher, finalPrayer: publisher,
      weeklyPrograms: [{
        id: 7, room: "A", responsible: publisher, assistant: publisher, responsibleB: publisher, assistantB: publisher,
        assignment: { number: 4, title: "Empiece conversaciones", sectionMeeting: SectionMeeting.SEAMOS_MEJORES_MAESTROS, time: 3, timeType: "mins." },
      }],
    } as ProgramPdf;
    fixture.componentInstance.roomA = true;
    fixture.detectChanges();
    const nextFixture = TestBed.createComponent(ProgramWeekComponent);
    nextFixture.componentInstance.semana = { ...fixture.componentInstance.semana, id: 101 };
    nextFixture.componentInstance.roomA = true;
    nextFixture.detectChanges();
    const spans = () => Array.from(fixture.nativeElement.querySelectorAll("span[style], div[style]")) as HTMLElement[];
    const participantSpans = () => spans().filter((span) => span.textContent?.includes("Participante 11") && span.style.color);
    expect(participantSpans().length).toBeGreaterThanOrEqual(8);
    expect(participantSpans().every((span) => span.style.color === "rgb(255, 0, 0)")).toBeTrue();
    expect(fixture.componentInstance.getPublisherAlertText(publisher)).toBe("Aviso de la persona 11");

    store.applyValidations([
      { programId: 100, week: "2026-10-05", persons: [person(11, "INFO")] },
      { programId: 101, week: "2026-10-12", persons: [] },
    ]);
    fixture.detectChanges();
    nextFixture.detectChanges();
    expect(participantSpans().every((span) => span.style.color === "rgb(0, 0, 255)")).toBeTrue();
    const nextSpans = Array.from(nextFixture.nativeElement.querySelectorAll("span[style], div[style]")) as HTMLElement[];
    expect(nextSpans.filter((span) => span.textContent?.includes("Participante 11") && span.style.color)
      .every((span) => span.style.color === "rgb(0, 0, 0)")).toBeTrue();

    store.applyValidations([{ programId: 100, week: "2026-10-05", persons: [] }]);
    fixture.detectChanges();
    expect(participantSpans().every((span) => span.style.color === "rgb(0, 0, 0)")).toBeTrue();
    expect(fixture.componentInstance.getPublisherAlertText(publisher)).toBe("");
    expect(fixture.componentInstance.getPublisherAlertStyle(null)).toEqual({ color: "#dc3545", "font-style": "italic" });
  });
});
