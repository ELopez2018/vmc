import { TestBed } from "@angular/core/testing";

import { StopwatchService } from "./stopwatch.service";

describe("StopwatchService", () => {
  let service: StopwatchService;
  let now: number;

  beforeEach(() => {
    now = 0;
    spyOn(performance, "now").and.callFake(() => now);

    TestBed.configureTestingModule({});
    service = TestBed.inject(StopwatchService);
  });

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
});
