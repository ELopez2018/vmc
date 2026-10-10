import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface TimerState {
  elapsed: number; // ms
  running: boolean;
}

interface StoredTimer extends TimerState {
  id: number;
  savedAt: number;
}

@Injectable({ providedIn: "root" })
export class StopwatchService implements OnDestroy {
  private readonly storageKey = "vmc.stopwatches.v1";
  private readonly refreshIntervalMs = 50;
  private readonly persistIntervalMs = 1000;
  private lastPersistedAt = Number.NEGATIVE_INFINITY;
  private readonly handleWindowResume = () => {
    this.syncRunningTimers();
    this.persistTimers(false);
  };
  private readonly handlePageHide = () => this.persistTimers();

  // timers holds the single mutable object per ID; updates mutate it in place.
  private timers = new Map<number, TimerState>();
  private recordIds = new Set<number>();
  private intervals = new Map<number, ReturnType<typeof setInterval>>();
  private subjects = new Map<number, BehaviorSubject<TimerState>>();
  private startedAt = new Map<number, number>();
  private elapsedBeforeStart = new Map<number, number>();

  constructor() {
    this.restoreTimers();
    if (typeof window !== "undefined") {
      window.addEventListener("visibilitychange", this.handleWindowResume);
      window.addEventListener("focus", this.handleWindowResume);
      window.addEventListener("pageshow", this.handleWindowResume);
      window.addEventListener("pagehide", this.handlePageHide);
    }
  }

  ngOnDestroy(): void {
    this.persistTimers();
    this.intervals.forEach((interval) => clearInterval(interval));
    this.intervals.clear();

    if (typeof window !== "undefined") {
      window.removeEventListener("visibilitychange", this.handleWindowResume);
      window.removeEventListener("focus", this.handleWindowResume);
      window.removeEventListener("pageshow", this.handleWindowResume);
      window.removeEventListener("pagehide", this.handlePageHide);
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
    this.recordIds.add(id);
    state.running = true;
    this.elapsedBeforeStart.set(id, state.elapsed);
    this.startedAt.set(id, this.now());

    const subject = this.ensureSubject(id);
    subject.next({ ...state });

    const interval = setInterval(() => {
      this.syncTimer(id);
      this.persistTimers(false);
    }, this.refreshIntervalMs);
    this.intervals.set(id, interval);
    this.persistTimers();
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
    this.persistTimers();
  }

  reset(id: number): void {
    this.recordIds.add(id);
    this.resetState(id);
    this.persistTimers();
  }

  /** Eliminar también el registro persistido, conservando los observadores activos. */
  remove(id: number): void {
    this.resetState(id);
    this.recordIds.delete(id);
    this.timers.delete(id);
    this.persistTimers();
  }

  hasRecord(id: number): boolean {
    return this.recordIds.has(id);
  }

  private resetState(id: number): void {
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

  /** Guardar como máximo una vez por segundo, además de cada acción del usuario. */
  private persistTimers(force = true): void {
    if (typeof window === "undefined") return;
    const savedAt = Date.now();
    if (!force && savedAt - this.lastPersistedAt < this.persistIntervalMs) return;
    this.lastPersistedAt = savedAt;

    try {
      const timers: StoredTimer[] = [];
      this.timers.forEach((state, id) => {
        this.syncTimer(id, false);
        if (this.recordIds.has(id)) {
          timers.push({ id, ...state, savedAt });
        }
      });
      if (timers.length) {
        window.localStorage.setItem(this.storageKey, JSON.stringify({ version: 1, timers }));
      } else {
        window.localStorage.removeItem(this.storageKey);
      }
    } catch {
      // El cronómetro sigue funcionando si el navegador bloquea el almacenamiento.
    }
  }

  private restoreTimers(): void {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(this.storageKey);
      if (!raw) return;
      const stored: unknown = JSON.parse(raw);
      if (!stored || typeof stored !== "object" || !("version" in stored) || stored.version !== 1 ||
          !("timers" in stored) || !Array.isArray(stored.timers)) return;

      const runningIds: number[] = [];
      for (const entry of stored.timers) {
        if (!this.isStoredTimer(entry)) continue;
        // performance.now() se reinicia con la página; savedAt conserva la referencia entre cargas.
        const elapsed = entry.elapsed + (entry.running ? Math.max(0, Date.now() - entry.savedAt) : 0);
        if (!Number.isFinite(elapsed)) continue;
        this.timers.set(entry.id, { elapsed, running: false });
        this.recordIds.add(entry.id);
        if (entry.running) runningIds.push(entry.id);
      }
      for (const id of runningIds) this.start(id);
    } catch {
      // Ignorar datos corruptos o almacenamiento no disponible al cargar la página.
    }
  }

  private isStoredTimer(value: unknown): value is StoredTimer {
    if (!value || typeof value !== "object") return false;
    const entry = value as Partial<StoredTimer>;
    return Number.isInteger(entry.id) && entry.id! > 0 &&
      typeof entry.elapsed === "number" && Number.isFinite(entry.elapsed) && entry.elapsed >= 0 &&
      typeof entry.running === "boolean" &&
      typeof entry.savedAt === "number" && Number.isFinite(entry.savedAt) && entry.savedAt >= 0;
  }

  private now(): number {
    if (typeof performance !== "undefined" && typeof performance.now === "function") {
      return performance.now();
    }

    return Date.now();
  }
}
