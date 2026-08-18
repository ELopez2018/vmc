import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface TimerState {
  elapsed: number; // ms
  running: boolean;
}

@Injectable({ providedIn: "root" })
export class StopwatchService implements OnDestroy {
  private readonly refreshIntervalMs = 50;
  private readonly handleWindowResume = () => this.syncRunningTimers();

  // timers holds the single mutable object per ID; updates mutate it in place.
  private timers = new Map<number, TimerState>();
  private intervals = new Map<number, ReturnType<typeof setInterval>>();
  private subjects = new Map<number, BehaviorSubject<TimerState>>();
  private startedAt = new Map<number, number>();
  private elapsedBeforeStart = new Map<number, number>();

  constructor() {
    if (typeof window !== "undefined") {
      window.addEventListener("visibilitychange", this.handleWindowResume);
      window.addEventListener("focus", this.handleWindowResume);
      window.addEventListener("pageshow", this.handleWindowResume);
    }
  }

  ngOnDestroy(): void {
    this.intervals.forEach((interval) => clearInterval(interval));
    this.intervals.clear();

    if (typeof window !== "undefined") {
      window.removeEventListener("visibilitychange", this.handleWindowResume);
      window.removeEventListener("focus", this.handleWindowResume);
      window.removeEventListener("pageshow", this.handleWindowResume);
    }
  }

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

  /** Observable: emits while running. */
  getState$(id: number) {
    return this.ensureSubject(id).asObservable();
  }

  /** Synchronous read: same object reference mutated by the interval. */
  getState(id: number): TimerState {
    return this.ensureState(id);
  }

  start(id: number): void {
    const state = this.ensureState(id);
    if (state.running) return;
    state.running = true;
    this.elapsedBeforeStart.set(id, state.elapsed);
    this.startedAt.set(id, this.now());

    const subject = this.ensureSubject(id);
    subject.next({ ...state });

    const interval = setInterval(() => {
      this.syncTimer(id);
    }, this.refreshIntervalMs);
    this.intervals.set(id, interval);
  }

  stop(id: number): void {
    const state = this.timers.get(id);
    if (!state) return;
    this.syncTimer(id, false);
    state.running = false;
    clearInterval(this.intervals.get(id));
    this.intervals.delete(id);
    this.startedAt.delete(id);
    this.elapsedBeforeStart.delete(id);
    this.subjects.get(id)?.next({ ...state });
  }

  reset(id: number): void {
    clearInterval(this.intervals.get(id));
    this.intervals.delete(id);
    this.startedAt.delete(id);
    this.elapsedBeforeStart.delete(id);
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

  private syncRunningTimers(): void {
    this.timers.forEach((state, id) => {
      if (state.running) {
        this.syncTimer(id);
      }
    });
  }

  private syncTimer(id: number, emit = true): void {
    const state = this.timers.get(id);
    const startedAt = this.startedAt.get(id);
    if (!state || !state.running || startedAt === undefined) return;

    const elapsedBeforeStart = this.elapsedBeforeStart.get(id) ?? state.elapsed;
    state.elapsed = elapsedBeforeStart + Math.max(0, this.now() - startedAt);

    if (emit) {
      this.subjects.get(id)?.next({ ...state });
    }
  }

  private now(): number {
    if (typeof performance !== "undefined" && typeof performance.now === "function") {
      return performance.now();
    }

    return Date.now();
  }
}
