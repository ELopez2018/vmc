import { TestBed } from "@angular/core/testing";
import { of, Subject } from "rxjs";
import { DataService } from "src/app/core/services/data/data.service";
import { LoaderService } from "src/app/core/services/loader/loader.service";
import { MeetingsService } from "src/app/core/services/meetings/meetings.service";
import { UsersService } from "src/app/core/services/users/users.service";
import { ProgramValidationsService } from "src/app/core/services/program/program-validations.service";
import { Program } from "src/app/core/interfaces/reuniones.interface";
import { SearchPublisherComponent } from "./search-publisher.component";

describe("SearchPublisherComponent week indicators", () => {
  let component: SearchPublisherComponent;
  let response: Subject<Program[]>;
  let meetings: jasmine.Spy;
  let validations: ProgramValidationsService;

  beforeEach(() => {
    validations = TestBed.inject(ProgramValidationsService);
    response = new Subject<Program[]>();
    meetings = jasmine.createSpy("getProgramsByDateRange").and.returnValue(response);
    component = new SearchPublisherComponent(
      { getCongregation$: () => of({ id: 2 }), getMeeting: () => of([]) } as unknown as DataService,
      { getLoaderSearchPublisher$: () => of(false) } as unknown as LoaderService,
      { getPublishersByAssignment: () => of({ frequent: [], brothers: [], sisters: [] }) } as unknown as UsersService,
      null!, { getProgramsByDateRange: meetings } as unknown as MeetingsService, validations,
    );
    component.week = "2026-01-05";
    component.ngOnInit();
  });

  afterEach(() => component.ngOnDestroy());

  it("loads the exact previous week even across years and keeps backend messages", () => {
    expect(meetings).toHaveBeenCalledWith("2025-12-29", "2026-01-05", 2);
    expect(component.weekStatusLoading).toBeTrue();
    response.next([{ id: 1, meeting: { week: "2026-01-05" }, president: { id: 7 }, weeklyPrograms: [] }] as unknown as Program[]);
    validations.setProgramValidations(1, [{ userId: 7, fullName: "Publicador", severity: "ERROR", items: [
      { code: "DUPLICATE", severity: "ERROR", message: "Mensaje del backend", related: [] },
    ] }]);
    expect(component.weekStatuses.get(7)?.current).toEqual(["Presidencia"]);
    expect(component.assignmentAlerts(7)).toEqual(["Mensaje del backend"]);
    expect(component.assignmentAlerts(8)).toEqual([]);
    expect(component.weekStatusLoading).toBeFalse();
    validations.setProgramValidations(1, []);
    expect(component.assignmentAlerts(7)).toEqual([]);
  });

  it("reports unavailable indicators without blocking selection", () => {
    const selected = jasmine.createSpy("selected");
    component.onClicked.subscribe(selected);
    response.error(new Error("offline"));
    expect(component.weekStatusError).toContain("no están disponibles");
    expect(component.weekStatusLoading).toBeFalse();
    component.selected({ user: { id: 7 } });
    expect(selected).toHaveBeenCalledWith({ id: 7 });
  });

  it("cancels the week request when closing the modal", () => {
    component.ngOnDestroy();
    expect(response.observed).toBeFalse();
  });
});
