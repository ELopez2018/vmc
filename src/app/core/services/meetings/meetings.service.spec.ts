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

  it('imports a WOL URL as JSON and reads source and message without a second POST', () => {
    const url = 'https://wol.jw.org/es/wol/d/r4/lp-s/202026409';
    const response = { source: '1. Parte | 10\n', message: 'Se crearon los programas de las congregaciones Central' };
    service.importWeekFromWol(url).subscribe(result => expect(result).toEqual(response));
    const request = httpTesting.expectOne(req => req.url.endsWith('/meetings/get-data-from-jw-by-week'));
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({ url });
    expect(request.request.responseType).toBe('json');
    request.flush(response);
  });

  it('preserves missing introduction data as null', () => {
    service.getWeeksValids(1).subscribe(programs => {
      expect(programs[0].meeting.introTime).toBeNull();
      expect(programs[0].meeting.timeType).toBeNull();
    });
    httpTesting.expectOne(req => req.url.endsWith('/meetings/programs/1')).flush({
      content: [{ id: 1, week: [2026, 10, 12], introTime: null, timeType: null }],
    });
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
        introTime: 5,
        timeType: "mins.",
        openingSong: "74",
        intermediateSong: "142",
        finalSong: "134",
        initialSong: { id: 74, songNumber: 74, title: "Canción inicial", source: "Fuente inicial" },
        middleSong: { id: 142, songNumber: 142, title: "Canción intermedia", source: "Fuente intermedia" },
        lastSong: { id: 134, songNumber: 134, title: "Canción final", source: "Fuente final" },
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
            sourceText: "Referencia bíblica",
            sourceHtml: "<p>Referencia bíblica</p>",
            sourceLinks: '[{"text":"Referencia","url":"https://wol.jw.org/es/wol/d/r4/lp-s/202026244"}]',
            sourceUrl: "https://wol.jw.org/es/wol/d/r4/lp-s/202026244",
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
    expect(programs[0].meeting.introTime).toBe(5);
    expect(programs[0].meeting.timeType).toBe("mins.");
    expect(programs[0].meeting.initialSong).toEqual(jasmine.objectContaining({
      songNumber: 74, title: "Canción inicial", source: "Fuente inicial",
    }));
    expect(programs[0].meeting.middleSong).toEqual(jasmine.objectContaining({
      songNumber: 142, title: "Canción intermedia", source: "Fuente intermedia",
    }));
    expect(programs[0].meeting.lastSong).toEqual(jasmine.objectContaining({
      songNumber: 134, title: "Canción final", source: "Fuente final",
    }));
    expect(programs[0].congregation.id).toBe(2);
    expect(programs[0].weeklyPrograms[0]).toEqual(
      jasmine.objectContaining({ id: 5778, program: 731, room: "A", startTime: [18, 36] }),
    );
    expect(programs[0].weeklyPrograms[0].assignment).toEqual(
      jasmine.objectContaining({
        number: 1, sectionMeeting: "TESOROS DE LA BIBLIA", time: 10,
        sourceText: "Referencia bíblica", sourceHtml: "<p>Referencia bíblica</p>",
        sourceLinks: '[{"text":"Referencia","url":"https://wol.jw.org/es/wol/d/r4/lp-s/202026244"}]',
        sourceUrl: "https://wol.jw.org/es/wol/d/r4/lp-s/202026244",
      }),
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

  it("requests the WOL preview through the API with the complete URL as a query parameter", () => {
    const url = "https://wol.jw.org/es/wol/bc/r4/lp-s/202026244/1/0?ref=1&lang=es";
    let html = "";
    service.getWolPreview(url).subscribe((response) => html = response.html);
    const request = httpTesting.expectOne((candidate) => candidate.url.endsWith("/meetings/wol-preview"));
    expect(request.request.method).toBe("GET");
    expect(request.request.params.get("url")).toBe(url);
    request.flush({ url, html: "<p>Referencia</p>" });
    expect(html).toBe("<p>Referencia</p>");
  });

  it("preserves null song relations and source fields for old weeks", () => {
    let program!: Program;
    service.getWeeksValids(2).subscribe((response) => program = response[0]);
    httpTesting.expectOne((candidate) => candidate.url.endsWith("/meetings/programs/2")).flush({
      content: [{ id: 1, week: [2026, 11, 16], initialSong: null, middleSong: null, lastSong: null,
        openingSong: "74", intermediateSong: "142", finalSong: "134",
        assignments: [{ id: 6, number: 6, title: "Parte antigua", section: "SEAMOS MEJORES MAESTROS",
          sourceText: null, sourceHtml: null, sourceLinks: null, sourceUrl: null }],
      }],
    });
    expect(program.meeting.initialSong).toBeNull();
    expect(program.meeting.middleSong).toBeNull();
    expect(program.meeting.lastSong).toBeNull();
    expect(program.meeting.openingSong).toBe("74");
    expect(program.weeklyPrograms[0].assignment.sourceHtml).toBeNull();
    expect(program.weeklyPrograms[0].assignment.sourceLinks).toBeNull();
  });
});
