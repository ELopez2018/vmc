import { provideHttpClient } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { Program } from "../../interfaces/reuniones.interface";
import { MeetingsService } from "./meetings.service";

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
});
