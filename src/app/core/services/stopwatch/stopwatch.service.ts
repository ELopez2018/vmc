import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface TimerState {
  elapsed: number; // ms
  running: boolean;
}

@Injectable({ providedIn: "root" })
export class StopwatchService {
  // timers holds the single mutable object per ID — interval mutates it in place
  private timers = new Map<number, TimerState>();
  private intervals = new Map<number, ReturnType<typeof setInterval>>();
  private subjects = new Map<number, BehaviorSubject<TimerState>>();

  /** Returns (creating if needed) the mutable state object for an ID. */
  private ensureState(id: number): TimerState {
    if (!this.timers.has(id)) {
      this.timers.set(id, { elapsed: 0, running: false });
    }
    return this.timers.get(id)!;
  }

  /** Returns (creating if needed) the subject for an ID without touching timers. */
  private ensureSubject(id: number): BehaviorSubject<TimerState> {
    if (!this.subjects.has(id)) {
      const state = this.ensureState(id);
      this.subjects.set(id, new BehaviorSubject<TimerState>({ ...state }));
    }
    return this.subjects.get(id)!;
  }

  /** Observable — emits every 100 ms while running. */
  getState$(id: number) {
    return this.ensureSubject(id).asObservable();
  }

  /** Synchronous read — same object reference mutated by the interval. */
  getState(id: number): TimerState {
    return this.ensureState(id);
  }

  start(id: number): void {
    const state = this.ensureState(id);
    if (state.running) return;
    state.running = true;
    const subject = this.ensureSubject(id);
    subject.next({ ...state });

    const interval = setInterval(() => {
      state.elapsed += 100;
      subject.next({ ...state });
    }, 100);
    this.intervals.set(id, interval);
  }

  stop(id: number): void {
    const state = this.timers.get(id);
    if (!state) return;
    state.running = false;
    clearInterval(this.intervals.get(id));
    this.intervals.delete(id);
    this.subjects.get(id)?.next({ ...state });
  }

  reset(id: number): void {
    clearInterval(this.intervals.get(id));
    this.intervals.delete(id);
    const state = this.ensureState(id);
    // mutate in place so any existing reference stays valid
    state.elapsed = 0;
    state.running = false;
    this.subjects.get(id)?.next({ ...state });
  }

  hasActivity(id: number): boolean {
    const state = this.timers.get(id);
    return !!state && (state.elapsed > 0 || state.running);
  }
}
