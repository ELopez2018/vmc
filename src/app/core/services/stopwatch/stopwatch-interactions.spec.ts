import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { fakeAsync, TestBed, tick } from "@angular/core/testing";
import { of } from "rxjs";
import { AssignmentComponent } from "src/app/pages/assignment/assignment.component";
import { ProgramAssignmentSectionComponent } from "src/app/pages/entre-semana/components/programs/components/program-assignment-section/program-assignment-section.component";
import { AssignmentService } from "../assignment/assignment.service";
import { StopwatchService } from "./stopwatch.service";
import { ProgramPdf } from "../../interfaces/print-pdf.interface";
import { SectionMeeting } from "../../enums/meetings.enums";

describe("Controles del registro del cronómetro", () => {
  const storageKey = "vmc.stopwatches.v1";
  let service: StopwatchService;
  let now: number;
  const row = {
    id: 7, room: "A", assignment: {
      id: 3, number: 4, title: "Empiece conversaciones", time: 3, timeType: "mins.",
      sectionMeeting: SectionMeeting.SEAMOS_MEJORES_MAESTROS, meeting: { week: Date.UTC(2026, 9, 5) },
    },
  };

  beforeEach(async () => {
    localStorage.removeItem(storageKey);
    now = 0;
    spyOn(performance, "now").and.callFake(() => now);
    await TestBed.configureTestingModule({
      imports: [AssignmentComponent, ProgramAssignmentSectionComponent],
      providers: [
        provideHttpClient(), provideHttpClientTesting(),
        { provide: AssignmentService, useValue: { getAllAssignment: () => of({ content: [{ ...row.assignment, id: 7 }] }) } },
      ],
    }).compileComponents();
    service = TestBed.inject(StopwatchService);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
    localStorage.removeItem(storageKey);
  });

  function render(view: "asignaciones" | "programa") {
    if (view === "asignaciones") {
      const fixture = TestBed.createComponent(AssignmentComponent);
      fixture.detectChanges();
      return fixture;
    }
    const fixture = TestBed.createComponent(ProgramAssignmentSectionComponent);
    fixture.componentInstance.week = { id: 100, weeklyPrograms: [row] } as ProgramPdf;
    fixture.componentInstance.sectionMeeting = SectionMeeting.SEAMOS_MEJORES_MAESTROS;
    fixture.detectChanges();
    return fixture;
  }

  for (const view of ["asignaciones", "programa"] as const) {
    for (const running of [true, false]) {
      it(`doble clic pone a cero y detiene en ${view} con running=${running}`, fakeAsync(() => {
        service.start(7);
        now = 1000;
        if (!running) service.stop(7);
        const fixture = render(view);
        const counter = fixture.nativeElement.querySelector(".inline-timer") as HTMLElement;
        counter.click();
        tick(100);
        counter.click();
        now = 2000;
        tick(1000);
        fixture.detectChanges();
        expect(service.getState(7)).toEqual({ elapsed: 0, running: false });
        expect(service.hasRecord(7)).toBeTrue();
        const resetCounter = fixture.nativeElement.querySelector(".inline-timer") as HTMLElement;
        expect(resetCounter.textContent).toContain("00:00.00");
        expect(resetCounter.classList.contains("inline-timer--running")).toBeFalse();
        expect(JSON.parse(localStorage.getItem(storageKey)!).timers[0])
          .toEqual(jasmine.objectContaining({ id: 7, elapsed: 0, running: false }));
      }));

      it(`la × elimina el registro en ${view} con running=${running} sin activar el contador`, fakeAsync(() => {
        service.start(7);
        now = 1000;
        if (!running) service.stop(7);
        const fixture = render(view);
        const start = spyOn(service, "start").and.callThrough();
        const reset = spyOn(service, "reset").and.callThrough();
        const removeButton = fixture.nativeElement.querySelector(".inline-timer-remove") as HTMLButtonElement;
        expect(removeButton.getAttribute("aria-label")).toBe("Eliminar registro del cronómetro");
        removeButton.click();
        tick(1000);
        fixture.detectChanges();
        expect(service.hasRecord(7)).toBeFalse();
        expect(service.getState(7)).toEqual({ elapsed: 0, running: false });
        expect(localStorage.getItem(storageKey)).toBeNull();
        expect(fixture.nativeElement.querySelector(".inline-timer")).toBeNull();
        expect(start).not.toHaveBeenCalled();
        expect(reset).not.toHaveBeenCalled();
      }));
    }

    it(`un clic reanuda un registro a cero en ${view}`, fakeAsync(() => {
      service.reset(7);
      const fixture = render(view);
      (fixture.nativeElement.querySelector(".inline-timer") as HTMLElement).click();
      now = 500;
      tick(500);
      expect(service.getState(7)).toEqual({ elapsed: 500, running: true });
      service.stop(7);
    }));
  }
});
