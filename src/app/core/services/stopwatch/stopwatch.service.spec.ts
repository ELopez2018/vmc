import { fakeAsync, TestBed, tick } from "@angular/core/testing";

import { StopwatchService } from "./stopwatch.service";
import { StopwatchModalComponent } from "src/app/shared/components/stopwatch-modal/stopwatch-modal.component";

describe("StopwatchService", () => {
  let service: StopwatchService;
  let now: number;
  const storageKey = "vmc.stopwatches.v1";
  let restoredServices: StopwatchService[];

  beforeEach(() => {
    localStorage.removeItem(storageKey);
    restoredServices = [];
    now = 0;
    spyOn(performance, "now").and.callFake(() => now);

    TestBed.configureTestingModule({});
    service = TestBed.inject(StopwatchService);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
    restoredServices.forEach((restored) => restored.ngOnDestroy());
    localStorage.removeItem(storageKey);
  });

  function reloadService(): StopwatchService {
    const restored = new StopwatchService();
    restoredServices.push(restored);
    return restored;
  }

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("calculates elapsed time from the browser clock", () => {
    service.start(1);

    now = 61500;
    service.stop(1);

    expect(service.getState(1).elapsed).toBe(61500);
  });

  it("keeps elapsed time when resuming", () => {
    service.start(1);
    now = 1000;
    service.stop(1);

    now = 5000;
    service.start(1);
    now = 7000;
    service.stop(1);

    expect(service.getState(1).elapsed).toBe(3000);
  });

  it("recovers paused times for each assignment after reloading", () => {
    service.start(1);
    now = 61500;
    service.stop(1);
    service.start(2);
    now = 63750;
    service.stop(2);
    service.ngOnDestroy();

    const restored = reloadService();
    expect(restored.getState(1)).toEqual({ elapsed: 61500, running: false });
    expect(restored.getState(2)).toEqual({ elapsed: 2250, running: false });
    expect(restored.hasActivity(1)).toBeTrue();
    let elapsed: number;
    restored.getState$(1).subscribe((state) => elapsed = state.elapsed);
    expect(elapsed!).toBe(61500);

    const modal = new StopwatchModalComponent(restored);
    modal.assignmentId = 1;
    modal.ngOnInit();
    expect(modal.formattedTime).toBe("01:01.50");
    expect(modal.running).toBeFalse();
    modal.toggleStop();
    now = 64750;
    restored.stop(1);
    expect(modal.elapsed).toBe(62500);
    modal.ngOnDestroy();
  });

  it("continues a running timer across reloads using the saved wall clock", () => {
    let wallClock = 1000000;
    spyOn(Date, "now").and.callFake(() => wallClock);
    service.start(1);
    now = 1500;
    wallClock += 1500;
    window.dispatchEvent(new Event("pagehide"));
    expect(JSON.parse(localStorage.getItem(storageKey)!).timers[0])
      .toEqual({ id: 1, elapsed: 1500, running: true, savedAt: 1001500 });
    service.ngOnDestroy();

    now = 0; // performance.now() starts again in the new page.
    wallClock += 3500;
    const restored = reloadService();
    expect(restored.getState(1)).toEqual({ elapsed: 5000, running: true });
    now = 300;
    restored.stop(1);
    expect(restored.getState(1)).toEqual({ elapsed: 5300, running: false });
  });

  it("checkpoints running timers once per second instead of on every render tick", fakeAsync(() => {
    let wallClock = 1000000;
    spyOn(Date, "now").and.callFake(() => wallClock);
    const writes = spyOn(Storage.prototype, "setItem").and.callThrough();
    service.start(1);
    expect(writes).toHaveBeenCalledTimes(1);
    now = 950;
    wallClock += 950;
    tick(950);
    expect(writes).toHaveBeenCalledTimes(1);
    now = 1000;
    wallClock += 50;
    tick(50);
    expect(writes).toHaveBeenCalledTimes(2);
    expect(JSON.parse(localStorage.getItem(storageKey)!).timers[0].elapsed).toBe(1000);
    service.stop(1);
  }));

  it("persists reset without erasing other assignments", () => {
    service.start(1);
    now = 1000;
    service.stop(1);
    service.start(2);
    now = 2500;
    service.stop(2);
    service.reset(1);
    const restored = reloadService();
    expect(restored.getState(1)).toEqual({ elapsed: 0, running: false });
    expect(restored.hasRecord(1)).toBeTrue();
    expect(restored.getState(2)).toEqual({ elapsed: 1500, running: false });
    service.reset(2);
    expect(JSON.parse(localStorage.getItem(storageKey)!).timers)
      .toEqual(jasmine.arrayContaining([
        jasmine.objectContaining({ id: 1, elapsed: 0, running: false }),
        jasmine.objectContaining({ id: 2, elapsed: 0, running: false }),
      ]));
  });

  it("removes a running record from storage without deleting other timers", () => {
    service.start(2);
    now = 1000;
    service.stop(2);
    service.start(1);
    service.remove(1);
    expect(service.hasRecord(1)).toBeFalse();
    const restored = reloadService();
    expect(restored.hasRecord(1)).toBeFalse();
    expect(restored.getState(1)).toEqual({ elapsed: 0, running: false });
    expect(restored.getState(2)).toEqual({ elapsed: 1000, running: false });
    service.remove(2);
    expect(localStorage.getItem(storageKey)).toBeNull();
  });

  it("keeps a reset timer stopped when reopening the modal and allows starting from zero", () => {
    service.start(1);
    now = 1000;
    service.reset(1);
    const modal = new StopwatchModalComponent(service);
    modal.assignmentId = 1;
    modal.ngOnInit();
    expect(modal.formattedTime).toBe("00:00.00");
    expect(modal.running).toBeFalse();
    modal.toggleStop();
    expect(modal.running).toBeTrue();
    now = 1500;
    service.stop(1);
    expect(modal.elapsed).toBe(500);
    modal.ngOnDestroy();
  });

  for (const stored of ["{invalid", "null", JSON.stringify({ version: 2, timers: [] })]) {
    it(`ignores unsupported or corrupt saved data: ${stored}`, () => {
      localStorage.setItem(storageKey, stored);
      expect(reloadService().getState(1)).toEqual({ elapsed: 0, running: false });
    });
  }

  it("ignores invalid timer entries while recovering valid ones", () => {
    localStorage.setItem(storageKey, JSON.stringify({ version: 1, timers: [
      null,
      { id: 1, elapsed: -1, running: false, savedAt: 1000 },
      { id: "2", elapsed: 1000, running: false, savedAt: 1000 },
      { id: 3, elapsed: 1000, running: "false", savedAt: 1000 },
      { id: 4, elapsed: 2500, running: false, savedAt: 1000 },
    ] }));
    const restored = reloadService();
    expect(restored.hasActivity(1)).toBeFalse();
    expect(restored.hasActivity(2)).toBeFalse();
    expect(restored.hasActivity(3)).toBeFalse();
    expect(restored.getState(4)).toEqual({ elapsed: 2500, running: false });
  });

  it("keeps working when browser storage is unavailable or full", () => {
    spyOn(Storage.prototype, "getItem").and.throwError("Storage unavailable");
    spyOn(Storage.prototype, "setItem").and.throwError("Storage quota exceeded");
    spyOn(Storage.prototype, "removeItem").and.throwError("Storage unavailable");
    const restored = reloadService();
    expect(() => restored.start(1)).not.toThrow();
    now = 1250;
    expect(() => restored.stop(1)).not.toThrow();
    expect(restored.getState(1).elapsed).toBe(1250);
    expect(() => restored.reset(1)).not.toThrow();
    // Allow the test cleanup to remove only its own key.
    (Storage.prototype.removeItem as jasmine.Spy).and.callThrough();
  });
});
