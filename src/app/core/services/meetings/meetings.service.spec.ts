import { provideHttpClient } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { Program } from "../../interfaces/reuniones.interface";
import { MeetingsService } from "./meetings.service";
import { ProgramValidationsService } from "../program/program-validations.service";
import { environment } from "src/environments/environment";

describe('MeetingsService', () => {
  let service: MeetingsService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(MeetingsService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpTesting.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("updates a program with the flat ProgramUpdateRequest expected by the API", () => {
    const program = {
      id: 501,
      meeting: { id: 101 },
      congregation: { id: 1 },
      weekNumber: 34,
      startTimeOpeningSong: [19, 0],
      startTimeIntro: [19, 5, 0],
      startTimeIntermediateSong: "19:46",
      startTimeConclusionWords: [20, 36],
      startTimeFinalSong: [20, 39],
      event: "  Asamblea regional  ",
      openingPrayer: { id: 12 },
      president: { id: 18 },
      assistantAdviser: null,
      finalPrayer: null,
    } as Program;

    service.saveOrUpdateProgram(program).subscribe();

    const request = httpTesting.expectOne((request) => request.url.endsWith("/program/501"));
    expect(request.request.method).toBe("PUT");
    expect(request.request.body).toEqual({
      meetingId: 101,
      congregationId: 1,
      weekNumber: 34,
      startTimeOpeningSong: "19:00",
      startTimeIntro: "19:05:00",
      startTimeIntermediateSong: "19:46",
      startTimeConclusionWords: "20:36",
      startTimeFinalSong: "20:39",
      event: "  Asamblea regional  ",
      openingPrayerId: 12,
      presidentId: 18,
      assistantAdviserId: null,
      finalPrayerId: null,
    });
    const updatedProgram = {
      ...program,
      event: "Asamblea regional",
      startTimeOpeningSong: "19:00:00",
    } as Program;
    request.flush(updatedProgram);

    expect(program.event).toBe("Asamblea regional");
    expect(program.startTimeOpeningSong).toBe("19:00:00");
  });

  it("adapts the flat programs endpoint to the model used by the program screen", () => {
    let programs: Program[] = [];

    service.getWeeksValids(2, 0, 4).subscribe((data) => (programs = data));

    const request = httpTesting.expectOne((candidate) => candidate.url.endsWith("/meetings/programs/2") &&
      candidate.params.get("page") === "0" && candidate.params.get("size") === "4");
    expect(request.request.method).toBe("GET");
    request.flush({
      content: [{
        id: 731,
        week: [2026, 9, 21],
        weekNumber: 39,
        weeklyBibleReading: "JEREMÍAS 36,37",
        meetingUrl: "https://wol.jw.org/example",
        openingSong: "74",
        intermediateSong: "142",
        finalSong: "134",
        startTimeOpeningSong: [18, 30],
        startTimeIntro: [18, 35],
        startTimeIntermediateSong: [19, 16],
        startTimeFinalSong: [20, 9],
        startTimeConclusionWords: [20, 6],
        validations: [{
          userId: 131, fullName: "Participante", severity: "ERROR",
          items: [{ code: "MULTIPLE_ASSIGNMENTS_SAME_WEEK", severity: "ERROR", message: "Tiene más de una asignación esta semana.", related: [] }],
        }],
        assignments: [
          {
            id: 5778,
            number: 1,
            title: "Jehová ayuda a quienes apoyan su Reino",
            section: "TESOROS DE LA BIBLIA",
            duration: 10,
            durationUnit: "mins.",
            responsible: {
              id: 131,
              fullName: "Leonardo Sánchez",
            },
            startTime: [18, 36],
            room: "A",
          },
        ],
      }],
      last: true,
      totalPages: 1,
      totalElements: 1,
      number: 0,
      size: 4,
    });

    expect(programs).toHaveSize(1);
    expect(programs[0].meeting.week).toBe(Date.UTC(2026, 8, 21));
    expect(programs[0].meeting.url).toBe("https://wol.jw.org/example");
    expect(programs[0].congregation.id).toBe(2);
    expect(programs[0].weeklyPrograms[0]).toEqual(
      jasmine.objectContaining({ id: 5778, program: 731, room: "A", startTime: [18, 36] }),
    );
    expect(programs[0].weeklyPrograms[0].assignment).toEqual(
      jasmine.objectContaining({ number: 1, sectionMeeting: "TESOROS DE LA BIBLIA", time: 10 }),
    );
    expect(TestBed.inject(ProgramValidationsService).validationsFor(731, 131)?.severity).toBe("ERROR");
  });

  it("uses the environment configuration when pagination is omitted", () => {
    const previousSize = environment.pagination.programsPageSize;
    environment.pagination.programsPageSize = 7;
    try {
      service.getWeeksValids(2).subscribe();
      const request = httpTesting.expectOne((candidate) => candidate.url.endsWith("/meetings/programs/2"));
      expect(request.request.params.get("page")).toBe(String(environment.pagination.initialPage));
      expect(request.request.params.get("size")).toBe("7");
      request.flush({ content: [], last: true });
    } finally {
      environment.pagination.programsPageSize = previousSize;
    }
  });

  it("allows a query to override the global page and size", () => {
    service.getWeeksValids(2, 3, 25).subscribe();
    const request = httpTesting.expectOne((candidate) => candidate.url.endsWith("/meetings/programs/2"));
    expect(request.request.params.get("page")).toBe("3");
    expect(request.request.params.get("size")).toBe("25");
    request.flush({ content: [], last: true });
  });
});
