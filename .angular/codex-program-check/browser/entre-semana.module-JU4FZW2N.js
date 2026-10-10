import {
  CongregationMock,
  require_sweetalert2_all
} from "./chunk-7XONH5AH.js";
import {
  AssignmentSourceComponent,
  ModalService,
  ModalTitleEnums,
  ModalTypeEnums,
  ProgramFiltersComponent,
  SharedModule,
  WeeklyProgramService
} from "./chunk-HOK7MI44.js";
import {
  DateAdapter,
  MAT_DATE_LOCALE,
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle,
  MatDatepickerToggleIcon,
  MatInput,
  MatInputModule,
  MatMenu,
  MatMenuItem,
  MatMenuTrigger,
  MatNativeDateModule,
  MeetingsService,
  NgbModal,
  NgbTooltip,
  NgbTooltipModule,
  ProgramValidationsService,
  RouterModule,
  takeUntilDestroyed
} from "./chunk-5TOJZSZF.js";
import {
  AssignmentService,
  Utils,
  isAssemblyEvent,
  isSpecialEventWeek,
  needsOverseerTalkTitle
} from "./chunk-M2KX2K5L.js";
import {
  ADMIN_EMAIL,
  AssignmentType,
  BehaviorSubject,
  CommonModule,
  Component,
  DataService,
  DestroyRef,
  EventEmitter,
  FormsModule,
  Inject,
  Injectable,
  Input,
  LoaderService,
  MEETING_PARTS,
  MatButtonModule,
  MatFabButton,
  MatFormField,
  MatFormFieldModule,
  MatIcon,
  MatIconModule,
  MatLabel,
  MatMiniFabButton,
  MatSuffix,
  MatTooltip,
  MeetingRoom,
  ModalResult,
  NgIf,
  NgModule,
  NgStyle,
  NgTemplateOutlet,
  Output,
  ProgramChangeType,
  ReactiveFormsModule,
  Subject,
  UpperCasePipe,
  WeeklyProgramChangeType,
  __spreadProps,
  __spreadValues,
  __toESM,
  environment,
  inject,
  isExplainingBeliefsSpeechAssignment,
  map,
  of,
  setClassMetadata,
  switchMap,
  takeUntil,
  tap,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵpropertyInterpolate,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-MIOFCSIM.js";

// src/app/core/enums/meetings.enums.ts
var SectionMeeting;
(function(SectionMeeting2) {
  SectionMeeting2["TESOROS_DE_LA_BIBLIA"] = "TESOROS DE LA BIBLIA";
  SectionMeeting2["SEAMOS_MEJORES_MAESTROS"] = "SEAMOS MEJORES MAESTROS";
  SectionMeeting2["NUESTRA_VIDA_CRISTIANA"] = "NUESTRA VIDA CRISTIANA";
})(SectionMeeting || (SectionMeeting = {}));
var OtherAssignment;
(function(OtherAssignment2) {
  OtherAssignment2["OPENING_PRAYER"] = "openingPrayer";
  OtherAssignment2["PRESIDENT"] = "president";
  OtherAssignment2["FINAL_PRAYER"] = "finalPrayer";
})(OtherAssignment || (OtherAssignment = {}));

// src/app/pages/entre-semana/components/programs/program-assignment.util.ts
function normalizeProgramTitle(value) {
  return (value ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, " ").trim().toLowerCase();
}
function includesMeetingPartTitle(title, meetingPartTitle) {
  const normalizedTitle = normalizeProgramTitle(title);
  const titleVariants = [
    [MEETING_PARTS.STARTING_A_CONVERSATION, "Empiece conversaciones", "Empecemos conversaciones"],
    [MEETING_PARTS.FOLLOWING_UP, "Haga revisitas", "Hagamos revisitas"],
    [MEETING_PARTS.MAKING_DISCIPLES, "Haga disc\xEDpulos", "Hagamos disc\xEDpulos"],
    [MEETING_PARTS.WHAT_WOULD_YOU_SAY, "\xBFQu\xE9 dir\xEDa?", "\xBFQu\xE9 dir\xEDas?"]
  ];
  const meetingPartTitles = titleVariants.find(([catalogTitle]) => catalogTitle === meetingPartTitle) ?? [meetingPartTitle];
  return normalizedTitle.length > 0 && meetingPartTitles.some((candidate) => {
    const normalizedCandidate = normalizeProgramTitle(candidate);
    return normalizedCandidate.length > 0 && normalizedTitle.includes(normalizedCandidate);
  });
}
function isSpeechAssignment(assignment) {
  if (!assignment || assignment.sectionMeeting !== SectionMeeting.SEAMOS_MEJORES_MAESTROS) {
    return false;
  }
  const isNamedStudentAssignment = [
    MEETING_PARTS.STARTING_A_CONVERSATION,
    MEETING_PARTS.FOLLOWING_UP,
    MEETING_PARTS.EXPLAINING_YOUR_BELIEFS,
    MEETING_PARTS.WHAT_WOULD_YOU_SAY,
    MEETING_PARTS.MAKING_DISCIPLES
  ].some((meetingPartTitle) => includesMeetingPartTitle(assignment.title, meetingPartTitle));
  return includesMeetingPartTitle(assignment.title, MEETING_PARTS.SPEECH) || assignment.sectionMeeting === SectionMeeting.SEAMOS_MEJORES_MAESTROS && [7, 8].includes(assignment.number) && !isNamedStudentAssignment;
}
function isCongregationBibleStudyAssignment(assignment) {
  if (!assignment) {
    return false;
  }
  return includesMeetingPartTitle(assignment.title, MEETING_PARTS.CONGREGATION_BIBLE_STUDY) || assignment.sectionMeeting === SectionMeeting.NUESTRA_VIDA_CRISTIANA && normalizeProgramTitle(assignment.tips).includes("conductor/lector");
}

// src/app/pages/entre-semana/components/programs/programs.component.ts
var import_sweetalert2 = __toESM(require_sweetalert2_all());

// src/app/pages/entre-semana/components/programs/components/publisher-warning.util.ts
function getPublisherAlertText(validation) {
  return (validation?.items ?? []).map((item) => item.message).filter(Boolean).join("\n");
}
function getPublisherAlertColor(validation) {
  if (!validation)
    return "#000000";
  return validation.severity === "ERROR" ? "#FF0000" : "#0000FF";
}
function getPublisherAlertStyle(publisher, validation) {
  if (!publisher) {
    return { color: "#dc3545", "font-style": "italic" };
  }
  return { color: getPublisherAlertColor(validation) };
}

// src/app/core/services/stopwatch/stopwatch.service.ts
var StopwatchService = class _StopwatchService {
  constructor() {
    this.storageKey = "vmc.stopwatches.v1";
    this.refreshIntervalMs = 50;
    this.persistIntervalMs = 1e3;
    this.lastPersistedAt = Number.NEGATIVE_INFINITY;
    this.handleWindowResume = () => {
      this.syncRunningTimers();
      this.persistTimers(false);
    };
    this.handlePageHide = () => this.persistTimers();
    this.timers = /* @__PURE__ */ new Map();
    this.recordIds = /* @__PURE__ */ new Set();
    this.intervals = /* @__PURE__ */ new Map();
    this.subjects = /* @__PURE__ */ new Map();
    this.startedAt = /* @__PURE__ */ new Map();
    this.elapsedBeforeStart = /* @__PURE__ */ new Map();
    this.restoreTimers();
    if (typeof window !== "undefined") {
      window.addEventListener("visibilitychange", this.handleWindowResume);
      window.addEventListener("focus", this.handleWindowResume);
      window.addEventListener("pageshow", this.handleWindowResume);
      window.addEventListener("pagehide", this.handlePageHide);
    }
  }
  ngOnDestroy() {
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
  ensureState(id) {
    if (!this.timers.has(id)) {
      this.timers.set(id, { elapsed: 0, running: false });
    }
    return this.timers.get(id);
  }
  /** Returns (creating if needed) the subject for an ID without touching timers. */
  ensureSubject(id) {
    if (!this.subjects.has(id)) {
      const state = this.ensureState(id);
      this.subjects.set(id, new BehaviorSubject(__spreadValues({}, state)));
    }
    return this.subjects.get(id);
  }
  /** Observable: emits while running. */
  getState$(id) {
    return this.ensureSubject(id).asObservable();
  }
  /** Synchronous read: same object reference mutated by the interval. */
  getState(id) {
    return this.ensureState(id);
  }
  start(id) {
    const state = this.ensureState(id);
    if (state.running)
      return;
    this.recordIds.add(id);
    state.running = true;
    this.elapsedBeforeStart.set(id, state.elapsed);
    this.startedAt.set(id, this.now());
    const subject = this.ensureSubject(id);
    subject.next(__spreadValues({}, state));
    const interval = setInterval(() => {
      this.syncTimer(id);
      this.persistTimers(false);
    }, this.refreshIntervalMs);
    this.intervals.set(id, interval);
    this.persistTimers();
  }
  stop(id) {
    const state = this.timers.get(id);
    if (!state)
      return;
    this.syncTimer(id, false);
    state.running = false;
    clearInterval(this.intervals.get(id));
    this.intervals.delete(id);
    this.startedAt.delete(id);
    this.elapsedBeforeStart.delete(id);
    this.subjects.get(id)?.next(__spreadValues({}, state));
    this.persistTimers();
  }
  reset(id) {
    this.recordIds.add(id);
    this.resetState(id);
    this.persistTimers();
  }
  /** Eliminar también el registro persistido, conservando los observadores activos. */
  remove(id) {
    this.resetState(id);
    this.recordIds.delete(id);
    this.timers.delete(id);
    this.persistTimers();
  }
  hasRecord(id) {
    return this.recordIds.has(id);
  }
  resetState(id) {
    clearInterval(this.intervals.get(id));
    this.intervals.delete(id);
    this.startedAt.delete(id);
    this.elapsedBeforeStart.delete(id);
    const state = this.ensureState(id);
    state.elapsed = 0;
    state.running = false;
    this.subjects.get(id)?.next(__spreadValues({}, state));
  }
  hasActivity(id) {
    const state = this.timers.get(id);
    return !!state && (state.elapsed > 0 || state.running);
  }
  syncRunningTimers() {
    this.timers.forEach((state, id) => {
      if (state.running) {
        this.syncTimer(id);
      }
    });
  }
  syncTimer(id, emit = true) {
    const state = this.timers.get(id);
    const startedAt = this.startedAt.get(id);
    if (!state || !state.running || startedAt === void 0)
      return;
    const elapsedBeforeStart = this.elapsedBeforeStart.get(id) ?? state.elapsed;
    state.elapsed = elapsedBeforeStart + Math.max(0, this.now() - startedAt);
    if (emit) {
      this.subjects.get(id)?.next(__spreadValues({}, state));
    }
  }
  /** Guardar como máximo una vez por segundo, además de cada acción del usuario. */
  persistTimers(force = true) {
    if (typeof window === "undefined")
      return;
    const savedAt = Date.now();
    if (!force && savedAt - this.lastPersistedAt < this.persistIntervalMs)
      return;
    this.lastPersistedAt = savedAt;
    try {
      const timers = [];
      this.timers.forEach((state, id) => {
        this.syncTimer(id, false);
        if (this.recordIds.has(id)) {
          timers.push(__spreadProps(__spreadValues({ id }, state), { savedAt }));
        }
      });
      if (timers.length) {
        window.localStorage.setItem(this.storageKey, JSON.stringify({ version: 1, timers }));
      } else {
        window.localStorage.removeItem(this.storageKey);
      }
    } catch {
    }
  }
  restoreTimers() {
    if (typeof window === "undefined")
      return;
    try {
      const raw = window.localStorage.getItem(this.storageKey);
      if (!raw)
        return;
      const stored = JSON.parse(raw);
      if (!stored || typeof stored !== "object" || !("version" in stored) || stored.version !== 1 || !("timers" in stored) || !Array.isArray(stored.timers))
        return;
      const runningIds = [];
      for (const entry of stored.timers) {
        if (!this.isStoredTimer(entry))
          continue;
        const elapsed = entry.elapsed + (entry.running ? Math.max(0, Date.now() - entry.savedAt) : 0);
        if (!Number.isFinite(elapsed))
          continue;
        this.timers.set(entry.id, { elapsed, running: false });
        this.recordIds.add(entry.id);
        if (entry.running)
          runningIds.push(entry.id);
      }
      for (const id of runningIds)
        this.start(id);
    } catch {
    }
  }
  isStoredTimer(value) {
    if (!value || typeof value !== "object")
      return false;
    const entry = value;
    return Number.isInteger(entry.id) && entry.id > 0 && typeof entry.elapsed === "number" && Number.isFinite(entry.elapsed) && entry.elapsed >= 0 && typeof entry.running === "boolean" && typeof entry.savedAt === "number" && Number.isFinite(entry.savedAt) && entry.savedAt >= 0;
  }
  now() {
    if (typeof performance !== "undefined" && typeof performance.now === "function") {
      return performance.now();
    }
    return Date.now();
  }
  static {
    this.\u0275fac = function StopwatchService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _StopwatchService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _StopwatchService, factory: _StopwatchService.\u0275fac, providedIn: "root" });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StopwatchService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [], null);
})();

// src/app/shared/components/stopwatch-modal/stopwatch-modal.component.ts
function StopwatchModalComponent_span_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.assignmentTitle);
  }
}
var StopwatchModalComponent = class _StopwatchModalComponent {
  constructor(stopwatchService) {
    this.stopwatchService = stopwatchService;
    this.closed = new EventEmitter();
    this.elapsed = 0;
    this.running = false;
  }
  ngOnInit() {
    const current = this.stopwatchService.getState(this.assignmentId);
    this.elapsed = current.elapsed;
    this.running = current.running;
    if (!this.stopwatchService.hasRecord(this.assignmentId)) {
      this.stopwatchService.start(this.assignmentId);
    }
    this.sub = this.stopwatchService.getState$(this.assignmentId).subscribe((state) => {
      this.elapsed = state.elapsed;
      this.running = state.running;
    });
  }
  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
  get formattedTime() {
    return _StopwatchModalComponent.format(this.elapsed);
  }
  static format(ms) {
    const totalSec = Math.floor(ms / 1e3);
    const cs = Math.floor(ms % 1e3 / 10);
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor(totalSec % 3600 / 60);
    const s = totalSec % 60;
    const base = h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
    return `${base}.${pad(cs)}`;
  }
  toggleStop() {
    if (this.running) {
      this.stopwatchService.stop(this.assignmentId);
    } else {
      this.stopwatchService.start(this.assignmentId);
    }
  }
  close() {
    this.closed.emit();
  }
  onOverlayClick(event) {
    this.close();
  }
  static {
    this.\u0275fac = function StopwatchModalComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _StopwatchModalComponent)(\u0275\u0275directiveInject(StopwatchService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _StopwatchModalComponent, selectors: [["vmc-stopwatch-modal"]], inputs: { assignmentId: "assignmentId", assignmentTitle: "assignmentTitle" }, outputs: { closed: "closed" }, decls: 17, vars: 7, consts: [[1, "stopwatch-modal-overlay", 3, "click"], [1, "stopwatch-modal-panel", 3, "click"], [1, "stopwatch-modal-header"], [1, "stopwatch-modal-title"], [1, "pi", "pi-stopwatch"], ["class", "stopwatch-modal-subtitle", 4, "ngIf"], [1, "stopwatch-display"], [1, "stopwatch-time"], [1, "stopwatch-actions"], [1, "btn-stopwatch", "btn-stop", 3, "click"], [1, "btn-stopwatch", 3, "click"], [1, "pi", "pi-sign-out"], [1, "stopwatch-modal-subtitle"]], template: function StopwatchModalComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275listener("click", function StopwatchModalComponent_Template_div_click_0_listener($event) {
          return ctx.onOverlayClick($event);
        });
        \u0275\u0275elementStart(1, "div", 1);
        \u0275\u0275listener("click", function StopwatchModalComponent_Template_div_click_1_listener($event) {
          return $event.stopPropagation();
        });
        \u0275\u0275elementStart(2, "div", 2)(3, "span", 3);
        \u0275\u0275element(4, "i", 4);
        \u0275\u0275text(5, " Cron\xF3metro");
        \u0275\u0275elementEnd();
        \u0275\u0275template(6, StopwatchModalComponent_span_6_Template, 2, 1, "span", 5);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "div", 6)(8, "span", 7);
        \u0275\u0275text(9);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(10, "div", 8)(11, "button", 9);
        \u0275\u0275listener("click", function StopwatchModalComponent_Template_button_click_11_listener() {
          return ctx.toggleStop();
        });
        \u0275\u0275element(12, "i");
        \u0275\u0275text(13);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "button", 10);
        \u0275\u0275listener("click", function StopwatchModalComponent_Template_button_click_14_listener() {
          return ctx.close();
        });
        \u0275\u0275element(15, "i", 11);
        \u0275\u0275text(16, " Salir ");
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(6);
        \u0275\u0275property("ngIf", ctx.assignmentTitle);
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(ctx.formattedTime);
        \u0275\u0275advance(2);
        \u0275\u0275classProp("btn-resume", !ctx.running);
        \u0275\u0275advance();
        \u0275\u0275classMap(ctx.running ? "pi pi-pause" : "pi pi-play");
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.running ? "Parar" : "Reanudar", " ");
      }
    }, dependencies: [CommonModule, NgIf], styles: ['\n\n[_nghost-%COMP%] {\n  display: contents;\n}\n.stopwatch-modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  background: rgba(0, 0, 0, 0.55);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 9999;\n  overflow: hidden;\n}\n.stopwatch-modal-panel[_ngcontent-%COMP%] {\n  background: #fff;\n  border-radius: 12px;\n  padding: 2rem;\n  width: 380px;\n  max-width: 90vw;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 1.5rem;\n  box-sizing: border-box;\n}\n.stopwatch-modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.25rem;\n}\n.stopwatch-modal-title[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 700;\n  color: #333;\n  letter-spacing: 0.5px;\n}\n.stopwatch-modal-subtitle[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: #888;\n  text-align: center;\n  max-width: 300px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.stopwatch-display[_ngcontent-%COMP%] {\n  background: #f5f5f5;\n  border-radius: 8px;\n  padding: 1rem 2rem;\n  width: 100%;\n  text-align: center;\n}\n.stopwatch-time[_ngcontent-%COMP%] {\n  font-size: 2.8rem;\n  font-weight: 700;\n  font-family: "Courier New", monospace;\n  color: #2d2d2d;\n  letter-spacing: 2px;\n}\n.stopwatch-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  width: 100%;\n  justify-content: center;\n  align-items: stretch;\n}\n.btn-stopwatch[_ngcontent-%COMP%] {\n  flex: 1 1 0;\n  min-width: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.4rem;\n  padding: 0.6rem 1rem;\n  border: none;\n  border-radius: 6px;\n  font-size: 0.9rem;\n  font-weight: 600;\n  cursor: pointer;\n  white-space: nowrap;\n  transition: opacity 0.2s, transform 0.1s;\n}\n.btn-stopwatch[_ngcontent-%COMP%]:hover:not(:disabled) {\n  opacity: 0.85;\n  transform: translateY(-1px);\n}\n.btn-stopwatch[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\n.btn-stop[_ngcontent-%COMP%] {\n  background: #e74c3c;\n  color: #fff;\n}\n.btn-resume[_ngcontent-%COMP%] {\n  background: #27ae60;\n  color: #fff;\n}\n.btn-close[_ngcontent-%COMP%] {\n  background: #95a5a6;\n  color: #fff;\n}\n/*# sourceMappingURL=stopwatch-modal.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StopwatchModalComponent, [{
    type: Component,
    args: [{ selector: "vmc-stopwatch-modal", standalone: true, imports: [CommonModule], template: `<div class="stopwatch-modal-overlay" (click)="onOverlayClick($event)">\r
  <div class="stopwatch-modal-panel" (click)="$event.stopPropagation()">\r
    <div class="stopwatch-modal-header">\r
      <span class="stopwatch-modal-title"><i class="pi pi-stopwatch"></i> Cron\xF3metro</span>\r
      <span *ngIf="assignmentTitle" class="stopwatch-modal-subtitle">{{ assignmentTitle }}</span>\r
    </div>\r
\r
    <div class="stopwatch-display">\r
      <span class="stopwatch-time">{{ formattedTime }}</span>\r
    </div>\r
\r
    <div class="stopwatch-actions">\r
      <button class="btn-stopwatch btn-stop" (click)="toggleStop()" [class.btn-resume]="!running">\r
        <i [class]="running ? 'pi pi-pause' : 'pi pi-play'"></i>\r
        {{ running ? 'Parar' : 'Reanudar' }}\r
      </button>\r
      <button class="btn-stopwatch" (click)="close()">\r
        <i class="pi pi-sign-out"></i>\r
        Salir\r
      </button>\r
    </div>\r
  </div>\r
</div>\r
`, styles: ['/* src/app/shared/components/stopwatch-modal/stopwatch-modal.component.scss */\n:host {\n  display: contents;\n}\n.stopwatch-modal-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  background: rgba(0, 0, 0, 0.55);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 9999;\n  overflow: hidden;\n}\n.stopwatch-modal-panel {\n  background: #fff;\n  border-radius: 12px;\n  padding: 2rem;\n  width: 380px;\n  max-width: 90vw;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 1.5rem;\n  box-sizing: border-box;\n}\n.stopwatch-modal-header {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.25rem;\n}\n.stopwatch-modal-title {\n  font-size: 1.1rem;\n  font-weight: 700;\n  color: #333;\n  letter-spacing: 0.5px;\n}\n.stopwatch-modal-subtitle {\n  font-size: 0.8rem;\n  color: #888;\n  text-align: center;\n  max-width: 300px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.stopwatch-display {\n  background: #f5f5f5;\n  border-radius: 8px;\n  padding: 1rem 2rem;\n  width: 100%;\n  text-align: center;\n}\n.stopwatch-time {\n  font-size: 2.8rem;\n  font-weight: 700;\n  font-family: "Courier New", monospace;\n  color: #2d2d2d;\n  letter-spacing: 2px;\n}\n.stopwatch-actions {\n  display: flex;\n  gap: 1rem;\n  width: 100%;\n  justify-content: center;\n  align-items: stretch;\n}\n.btn-stopwatch {\n  flex: 1 1 0;\n  min-width: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.4rem;\n  padding: 0.6rem 1rem;\n  border: none;\n  border-radius: 6px;\n  font-size: 0.9rem;\n  font-weight: 600;\n  cursor: pointer;\n  white-space: nowrap;\n  transition: opacity 0.2s, transform 0.1s;\n}\n.btn-stopwatch:hover:not(:disabled) {\n  opacity: 0.85;\n  transform: translateY(-1px);\n}\n.btn-stopwatch:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\n.btn-stop {\n  background: #e74c3c;\n  color: #fff;\n}\n.btn-resume {\n  background: #27ae60;\n  color: #fff;\n}\n.btn-close {\n  background: #95a5a6;\n  color: #fff;\n}\n/*# sourceMappingURL=stopwatch-modal.component.css.map */\n'] }]
  }], () => [{ type: StopwatchService }], { assignmentId: [{
    type: Input
  }], assignmentTitle: [{
    type: Input
  }], closed: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(StopwatchModalComponent, { className: "StopwatchModalComponent", filePath: "src/app/shared/components/stopwatch-modal/stopwatch-modal.component.ts", lineNumber: 13 });
})();
function pad(n) {
  return n.toString().padStart(2, "0");
}

// src/app/pages/entre-semana/components/programs/components/program-assignment-section/program-assignment-section.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function ProgramAssignmentSectionComponent_vmc_stopwatch_modal_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "vmc-stopwatch-modal", 4);
    \u0275\u0275listener("closed", function ProgramAssignmentSectionComponent_vmc_stopwatch_modal_0_Template_vmc_stopwatch_modal_closed_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeStopwatch());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("assignmentId", ctx_r1.activeStopwatchId)("assignmentTitle", ctx_r1.activeStopwatchTitle);
  }
}
function ProgramAssignmentSectionComponent_Conditional_1_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 9);
    \u0275\u0275listener("click", function ProgramAssignmentSectionComponent_Conditional_1_Conditional_8_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onAddAssignment());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "edit");
    \u0275\u0275elementEnd()();
  }
}
function ProgramAssignmentSectionComponent_Conditional_1_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0, 3);
  }
  if (rf & 2) {
    \u0275\u0275nextContext(2);
    const sectionRows_r5 = \u0275\u0275reference(4);
    \u0275\u0275property("ngTemplateOutlet", sectionRows_r5);
  }
}
function ProgramAssignmentSectionComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "fieldset", 2)(1, "legend")(2, "span", 5);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 6)(5, "button", 7);
    \u0275\u0275listener("click", function ProgramAssignmentSectionComponent_Conditional_1_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleSection());
    });
    \u0275\u0275elementStart(6, "mat-icon");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(8, ProgramAssignmentSectionComponent_Conditional_1_Conditional_8_Template, 3, 0, "button", 8);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(9, ProgramAssignmentSectionComponent_Conditional_1_Conditional_9_Template, 1, 1, "ng-container", 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.legendClass + " program-section-legend my-md-2");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.title);
    \u0275\u0275advance(2);
    \u0275\u0275attribute("aria-expanded", !ctx_r1.sectionCollapsed);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.sectionCollapsed ? "expand_more" : "expand_less");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isAdmin ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.sectionCollapsed ? 9 : -1);
  }
}
function ProgramAssignmentSectionComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0, 3);
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const sectionRows_r5 = \u0275\u0275reference(4);
    \u0275\u0275property("ngTemplateOutlet", sectionRows_r5);
  }
}
function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_0_Conditional_1_span_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 26);
    \u0275\u0275listener("click", function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_0_Conditional_1_span_14_Template_span_click_0_listener($event) {
      \u0275\u0275restoreView(_r8);
      const item_r7 = \u0275\u0275nextContext(3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.onInlineTimerClick(ctx_r1.getItemId(item_r7));
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "button", 27);
    \u0275\u0275listener("click", function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_0_Conditional_1_span_14_Template_button_click_2_listener($event) {
      \u0275\u0275restoreView(_r8);
      const item_r7 = \u0275\u0275nextContext(3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      $event.stopPropagation();
      return \u0275\u0275resetView(ctx_r1.removeStopwatch(ctx_r1.getItemId(item_r7)));
    });
    \u0275\u0275text(3, " \xD7 ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r7 = \u0275\u0275nextContext(3).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("inline-timer--running", ctx_r1.stopwatchService.getState(ctx_r1.getItemId(item_r7)).running);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.formatElapsed(ctx_r1.stopwatchService.getState(ctx_r1.getItemId(item_r7)).elapsed), " ");
  }
}
function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 13)(1, "div", 14)(2, "div", 15);
    \u0275\u0275listener("click", function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_0_Conditional_1_Template_div_click_2_listener() {
      \u0275\u0275restoreView(_r6);
      const item_r7 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onWeeklyProgramChange(item_r7, ctx_r1.weeklyProgramChangeType.START_TIME));
    });
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 16)(5, "button", 17);
    \u0275\u0275listener("click", function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_0_Conditional_1_Template_button_click_5_listener($event) {
      \u0275\u0275restoreView(_r6);
      const item_r7 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.toggleAssignment(item_r7);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(6, "mat-icon");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "span", 18);
    \u0275\u0275listener("click", function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_0_Conditional_1_Template_span_click_8_listener() {
      \u0275\u0275restoreView(_r6);
      const item_r7 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onWeeklyProgramChange(item_r7, ctx_r1.weeklyProgramChangeType.NUMBER));
    });
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 19);
    \u0275\u0275listener("click", function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_0_Conditional_1_Template_span_click_10_listener() {
      \u0275\u0275restoreView(_r6);
      const item_r7 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onWeeklyProgramChange(item_r7, ctx_r1.weeklyProgramChangeType.TITLE));
    });
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 20);
    \u0275\u0275listener("click", function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_0_Conditional_1_Template_button_click_12_listener($event) {
      \u0275\u0275restoreView(_r6);
      const item_r7 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.openStopwatch(item_r7);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275element(13, "i", 21);
    \u0275\u0275elementEnd();
    \u0275\u0275template(14, ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_0_Conditional_1_span_14_Template, 4, 3, "span", 22);
    \u0275\u0275element(15, "vmc-assignment-source", 23);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "div", 24)(17, "span", 25);
    \u0275\u0275listener("click", function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_0_Conditional_1_Template_span_click_17_listener() {
      \u0275\u0275restoreView(_r6);
      const item_r7 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onWeeklyProgramChange(item_r7, ctx_r1.weeklyProgramChangeType.RESPONSIBLE));
    });
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_26_0;
    const item_r7 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.adapterTime(item_r7.startTime), " ");
    \u0275\u0275advance();
    \u0275\u0275property("title", item_r7.assignment.title + " (" + item_r7.assignment.time + item_r7.assignment.timeType + ")");
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-expanded", !ctx_r1.isAssignmentCollapsed(item_r7));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.isAssignmentCollapsed(item_r7) ? "expand_more" : "expand_less");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item_r7.assignment.number, ". ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item_r7.assignment.title + " (" + item_r7.assignment.time + " " + item_r7.assignment.timeType + ")", " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.stopwatchService.hasRecord(ctx_r1.getItemId(item_r7)));
    \u0275\u0275advance();
    \u0275\u0275property("assignment", item_r7.assignment)("compact", true);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngStyle", ctx_r1.getPublisherAlertStyle(item_r7.responsible))("ngbTooltip", ctx_r1.getPublisherAlertText(item_r7.responsible))("placement", ctx_r1.publisherTooltipPlacement);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (tmp_26_0 = item_r7 == null ? null : item_r7.responsible == null ? null : item_r7.responsible.fullName) !== null && tmp_26_0 !== void 0 ? tmp_26_0 : ctx_r1.porAsignar, " ");
  }
}
function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_0_Conditional_2_span_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 26);
    \u0275\u0275listener("click", function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_0_Conditional_2_span_14_Template_span_click_0_listener($event) {
      \u0275\u0275restoreView(_r10);
      const item_r7 = \u0275\u0275nextContext(3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.onInlineTimerClick(ctx_r1.getItemId(item_r7));
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "button", 27);
    \u0275\u0275listener("click", function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_0_Conditional_2_span_14_Template_button_click_2_listener($event) {
      \u0275\u0275restoreView(_r10);
      const item_r7 = \u0275\u0275nextContext(3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      $event.stopPropagation();
      return \u0275\u0275resetView(ctx_r1.removeStopwatch(ctx_r1.getItemId(item_r7)));
    });
    \u0275\u0275text(3, " \xD7 ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r7 = \u0275\u0275nextContext(3).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("inline-timer--running", ctx_r1.stopwatchService.getState(ctx_r1.getItemId(item_r7)).running);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.formatElapsed(ctx_r1.stopwatchService.getState(ctx_r1.getItemId(item_r7)).elapsed), " ");
  }
}
function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_0_Conditional_2_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 33);
    \u0275\u0275listener("click", function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_0_Conditional_2_Conditional_17_Template_span_click_0_listener() {
      \u0275\u0275restoreView(_r11);
      const item_r7 = \u0275\u0275nextContext(3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onWeeklyProgramChange(item_r7, ctx_r1.weeklyProgramChangeType.TIPS));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r7 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r7.assignment.tips, " ");
  }
}
function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_0_Conditional_2_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 32);
    \u0275\u0275text(1, "Sala auxiliar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 25);
    \u0275\u0275listener("click", function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_0_Conditional_2_Conditional_19_Template_span_click_2_listener() {
      \u0275\u0275restoreView(_r12);
      const item_r7 = \u0275\u0275nextContext(3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onWeeklyProgramChange(item_r7, ctx_r1.weeklyProgramChangeType.RESPONSIBLE_B));
    });
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_18_0;
    const item_r7 = \u0275\u0275nextContext(3).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngStyle", ctx_r1.getPublisherAlertStyle(item_r7.responsibleB))("ngbTooltip", ctx_r1.getPublisherAlertText(item_r7.responsibleB))("placement", ctx_r1.publisherTooltipPlacement);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (tmp_18_0 = item_r7 == null ? null : item_r7.responsibleB == null ? null : item_r7.responsibleB.fullName) !== null && tmp_18_0 !== void 0 ? tmp_18_0 : ctx_r1.porAsignar, " ");
  }
}
function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_0_Conditional_2_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32);
    \u0275\u0275text(1, "Sala principal");
    \u0275\u0275elementEnd();
  }
}
function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 28)(1, "div", 14)(2, "div", 15);
    \u0275\u0275listener("click", function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_0_Conditional_2_Template_div_click_2_listener() {
      \u0275\u0275restoreView(_r9);
      const item_r7 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onWeeklyProgramChange(item_r7, ctx_r1.weeklyProgramChangeType.START_TIME));
    });
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 16)(5, "button", 17);
    \u0275\u0275listener("click", function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_0_Conditional_2_Template_button_click_5_listener($event) {
      \u0275\u0275restoreView(_r9);
      const item_r7 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.toggleAssignment(item_r7);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(6, "mat-icon");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "span", 18);
    \u0275\u0275listener("click", function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_0_Conditional_2_Template_span_click_8_listener() {
      \u0275\u0275restoreView(_r9);
      const item_r7 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onWeeklyProgramChange(item_r7, ctx_r1.weeklyProgramChangeType.NUMBER));
    });
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 19);
    \u0275\u0275listener("click", function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_0_Conditional_2_Template_span_click_10_listener() {
      \u0275\u0275restoreView(_r9);
      const item_r7 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onWeeklyProgramChange(item_r7, ctx_r1.weeklyProgramChangeType.TITLE));
    });
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 20);
    \u0275\u0275listener("click", function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_0_Conditional_2_Template_button_click_12_listener($event) {
      \u0275\u0275restoreView(_r9);
      const item_r7 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.openStopwatch(item_r7);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275element(13, "i", 21);
    \u0275\u0275elementEnd();
    \u0275\u0275template(14, ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_0_Conditional_2_span_14_Template, 4, 3, "span", 22);
    \u0275\u0275element(15, "vmc-assignment-source", 23);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "div", 29);
    \u0275\u0275template(17, ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_0_Conditional_2_Conditional_17_Template, 2, 1, "span", 30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 24);
    \u0275\u0275template(19, ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_0_Conditional_2_Conditional_19_Template, 4, 4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 31);
    \u0275\u0275template(21, ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_0_Conditional_2_Conditional_21_Template, 2, 0, "div", 32);
    \u0275\u0275elementStart(22, "span", 25);
    \u0275\u0275listener("click", function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_0_Conditional_2_Template_span_click_22_listener() {
      \u0275\u0275restoreView(_r9);
      const item_r7 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onWeeklyProgramChange(item_r7, ctx_r1.weeklyProgramChangeType.RESPONSIBLE));
    });
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_29_0;
    const item_r7 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.adapterTime(item_r7.startTime), " ");
    \u0275\u0275advance();
    \u0275\u0275property("title", item_r7.assignment.title + " (" + item_r7.assignment.time + item_r7.assignment.timeType + ")");
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-expanded", !ctx_r1.isAssignmentCollapsed(item_r7));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.isAssignmentCollapsed(item_r7) ? "expand_more" : "expand_less");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item_r7.assignment.number, ". ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item_r7.assignment.title + " (" + item_r7.assignment.time + " " + item_r7.assignment.timeType + ")", " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.stopwatchService.hasRecord(ctx_r1.getItemId(item_r7)));
    \u0275\u0275advance();
    \u0275\u0275property("assignment", item_r7.assignment)("compact", true);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(item_r7.assignment.showTips ? 17 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(item_r7.assignment.number == 3 ? 19 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(item_r7.assignment.number == 3 ? 21 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("ngStyle", ctx_r1.getPublisherAlertStyle(item_r7.responsible))("ngbTooltip", ctx_r1.getPublisherAlertText(item_r7.responsible))("placement", ctx_r1.publisherTooltipPlacement);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (tmp_29_0 = item_r7 == null ? null : item_r7.responsible == null ? null : item_r7.responsible.fullName) !== null && tmp_29_0 !== void 0 ? tmp_29_0 : ctx_r1.porAsignar, " ");
  }
}
function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275template(1, ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_0_Conditional_1_Template, 19, 13)(2, ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_0_Conditional_2_Template, 24, 16);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r7 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("program-assignment-row--treasures-assignment-3", item_r7.assignment.number == 3)("program-assignment-row--collapsed", ctx_r1.isAssignmentCollapsed(item_r7));
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r7.assignment.number == 1 || item_r7.assignment.number == 2 ? 1 : 2);
  }
}
function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_1_span_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 26);
    \u0275\u0275listener("click", function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_1_span_16_Template_span_click_0_listener($event) {
      \u0275\u0275restoreView(_r14);
      const item_r7 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.onInlineTimerClick(ctx_r1.getItemId(item_r7));
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "button", 27);
    \u0275\u0275listener("click", function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_1_span_16_Template_button_click_2_listener($event) {
      \u0275\u0275restoreView(_r14);
      const item_r7 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      $event.stopPropagation();
      return \u0275\u0275resetView(ctx_r1.removeStopwatch(ctx_r1.getItemId(item_r7)));
    });
    \u0275\u0275text(3, " \xD7 ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r7 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("inline-timer--running", ctx_r1.stopwatchService.getState(ctx_r1.getItemId(item_r7)).running);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.formatElapsed(ctx_r1.stopwatchService.getState(ctx_r1.getItemId(item_r7)).elapsed), " ");
  }
}
function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_1_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 42);
    \u0275\u0275listener("click", function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_1_Conditional_19_Template_span_click_0_listener() {
      \u0275\u0275restoreView(_r15);
      const item_r7 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onWeeklyProgramChange(item_r7, ctx_r1.weeklyProgramChangeType.TIPS));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r7 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r7.assignment.tips, " ");
  }
}
function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_1_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 25);
    \u0275\u0275listener("click", function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_1_Conditional_25_Template_span_click_0_listener() {
      \u0275\u0275restoreView(_r16);
      const item_r7 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onWeeklyProgramChange(item_r7, ctx_r1.weeklyProgramChangeType.ASSISTANT_B));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r7 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngStyle", ctx_r1.getPublisherAlertStyle(item_r7.assistantB))("ngbTooltip", ctx_r1.getPublisherAlertText(item_r7.assistantB))("placement", ctx_r1.publisherTooltipPlacement);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (item_r7 == null ? null : item_r7.assistantB) ? "/" + item_r7.assistantB.fullName : "/" + ctx_r1.porAsignar, " ");
  }
}
function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_1_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 25);
    \u0275\u0275listener("click", function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_1_Conditional_31_Template_span_click_0_listener() {
      \u0275\u0275restoreView(_r17);
      const item_r7 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onWeeklyProgramChange(item_r7, ctx_r1.weeklyProgramChangeType.ASSISTANT));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r7 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngStyle", ctx_r1.getPublisherAlertStyle(item_r7.assistant))("ngbTooltip", ctx_r1.getPublisherAlertText(item_r7.assistant))("placement", ctx_r1.publisherTooltipPlacement);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (item_r7 == null ? null : item_r7.assistant) ? "/" + item_r7.assistant.fullName : "/" + ctx_r1.porAsignar, " ");
  }
}
function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 34)(1, "div", 28)(2, "div", 14)(3, "div", 35);
    \u0275\u0275listener("click", function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_1_Template_div_click_3_listener() {
      \u0275\u0275restoreView(_r13);
      const item_r7 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onWeeklyProgramChange(item_r7, ctx_r1.weeklyProgramChangeType.START_TIME));
    });
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 36)(6, "button", 17);
    \u0275\u0275listener("click", function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_1_Template_button_click_6_listener($event) {
      \u0275\u0275restoreView(_r13);
      const item_r7 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.toggleAssignment(item_r7);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(7, "mat-icon");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "span", 18);
    \u0275\u0275listener("click", function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_1_Template_span_click_9_listener() {
      \u0275\u0275restoreView(_r13);
      const item_r7 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onWeeklyProgramChange(item_r7, ctx_r1.weeklyProgramChangeType.NUMBER));
    });
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span", 19);
    \u0275\u0275listener("click", function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_1_Template_span_click_11_listener() {
      \u0275\u0275restoreView(_r13);
      const item_r7 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onWeeklyProgramChange(item_r7, ctx_r1.weeklyProgramChangeType.TITLE));
    });
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span", 37)(14, "button", 20);
    \u0275\u0275listener("click", function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_1_Template_button_click_14_listener($event) {
      \u0275\u0275restoreView(_r13);
      const item_r7 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.openStopwatch(item_r7);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275element(15, "i", 21);
    \u0275\u0275elementEnd();
    \u0275\u0275template(16, ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_1_span_16_Template, 4, 3, "span", 22);
    \u0275\u0275elementEnd();
    \u0275\u0275element(17, "vmc-assignment-source", 23);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "div", 29);
    \u0275\u0275template(19, ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_1_Conditional_19_Template, 2, 1, "span", 38);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 39)(21, "div", 32);
    \u0275\u0275text(22, "Sala auxiliar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "span", 25);
    \u0275\u0275listener("click", function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_1_Template_span_click_23_listener() {
      \u0275\u0275restoreView(_r13);
      const item_r7 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onWeeklyProgramChange(item_r7, ctx_r1.weeklyProgramChangeType.RESPONSIBLE_B));
    });
    \u0275\u0275text(24);
    \u0275\u0275elementEnd();
    \u0275\u0275template(25, ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_1_Conditional_25_Template, 2, 4, "span", 40);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "div", 41)(27, "div", 32);
    \u0275\u0275text(28, "Sala principal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "span", 25);
    \u0275\u0275listener("click", function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_1_Template_span_click_29_listener() {
      \u0275\u0275restoreView(_r13);
      const item_r7 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onWeeklyProgramChange(item_r7, ctx_r1.weeklyProgramChangeType.RESPONSIBLE));
    });
    \u0275\u0275text(30);
    \u0275\u0275elementEnd();
    \u0275\u0275template(31, ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_1_Conditional_31_Template, 2, 4, "span", 40);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_27_0;
    let tmp_32_0;
    const item_r7 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("program-assignment-row--collapsed", ctx_r1.isAssignmentCollapsed(item_r7));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.adapterTime(item_r7.startTime), " ");
    \u0275\u0275advance();
    \u0275\u0275property("title", item_r7.assignment.title + " (" + item_r7.assignment.time + item_r7.assignment.timeType + ")");
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-expanded", !ctx_r1.isAssignmentCollapsed(item_r7));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.isAssignmentCollapsed(item_r7) ? "expand_more" : "expand_less");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item_r7.assignment.number, ". ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item_r7.assignment.title + " (" + item_r7.assignment.time + " " + item_r7.assignment.timeType + ")", " ");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r1.stopwatchService.hasRecord(ctx_r1.getItemId(item_r7)));
    \u0275\u0275advance();
    \u0275\u0275property("assignment", item_r7.assignment)("compact", true);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(item_r7.assignment.showTips ? 19 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngStyle", ctx_r1.getPublisherAlertStyle(item_r7.responsibleB))("ngbTooltip", ctx_r1.getPublisherAlertText(item_r7.responsibleB))("placement", ctx_r1.publisherTooltipPlacement);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (tmp_27_0 = item_r7 == null ? null : item_r7.responsibleB == null ? null : item_r7.responsibleB.fullName) !== null && tmp_27_0 !== void 0 ? tmp_27_0 : ctx_r1.porAsignar, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.isSpeech(item_r7) && !ctx_r1.isExplainingBeliefsSpeech(item_r7) ? 25 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngStyle", ctx_r1.getPublisherAlertStyle(item_r7.responsible))("ngbTooltip", ctx_r1.getPublisherAlertText(item_r7.responsible))("placement", ctx_r1.publisherTooltipPlacement);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (tmp_32_0 = item_r7 == null ? null : item_r7.responsible == null ? null : item_r7.responsible.fullName) !== null && tmp_32_0 !== void 0 ? tmp_32_0 : ctx_r1.porAsignar, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.isSpeech(item_r7) && !ctx_r1.isExplainingBeliefsSpeech(item_r7) ? 31 : -1);
  }
}
function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_2_Conditional_0_span_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 26);
    \u0275\u0275listener("click", function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_2_Conditional_0_span_15_Template_span_click_0_listener($event) {
      \u0275\u0275restoreView(_r19);
      const item_r7 = \u0275\u0275nextContext(3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.onInlineTimerClick(ctx_r1.getItemId(item_r7));
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "button", 27);
    \u0275\u0275listener("click", function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_2_Conditional_0_span_15_Template_button_click_2_listener($event) {
      \u0275\u0275restoreView(_r19);
      const item_r7 = \u0275\u0275nextContext(3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      $event.stopPropagation();
      return \u0275\u0275resetView(ctx_r1.removeStopwatch(ctx_r1.getItemId(item_r7)));
    });
    \u0275\u0275text(3, " \xD7 ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r7 = \u0275\u0275nextContext(3).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("inline-timer--running", ctx_r1.stopwatchService.getState(ctx_r1.getItemId(item_r7)).running);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.formatElapsed(ctx_r1.stopwatchService.getState(ctx_r1.getItemId(item_r7)).elapsed), " ");
  }
}
function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_2_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12)(1, "div", 45)(2, "div", 14)(3, "div", 46);
    \u0275\u0275listener("click", function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_2_Conditional_0_Template_div_click_3_listener() {
      \u0275\u0275restoreView(_r18);
      const item_r7 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onWeeklyProgramChange(item_r7, ctx_r1.weeklyProgramChangeType.START_TIME));
    });
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 47)(6, "button", 17);
    \u0275\u0275listener("click", function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_2_Conditional_0_Template_button_click_6_listener($event) {
      \u0275\u0275restoreView(_r18);
      const item_r7 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.toggleAssignment(item_r7);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(7, "mat-icon");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "span", 18);
    \u0275\u0275listener("click", function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_2_Conditional_0_Template_span_click_9_listener() {
      \u0275\u0275restoreView(_r18);
      const item_r7 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onWeeklyProgramChange(item_r7, ctx_r1.weeklyProgramChangeType.NUMBER));
    });
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span", 19);
    \u0275\u0275listener("click", function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_2_Conditional_0_Template_span_click_11_listener() {
      \u0275\u0275restoreView(_r18);
      const item_r7 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onWeeklyProgramChange(item_r7, ctx_r1.weeklyProgramChangeType.TITLE));
    });
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "button", 20);
    \u0275\u0275listener("click", function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_2_Conditional_0_Template_button_click_13_listener($event) {
      \u0275\u0275restoreView(_r18);
      const item_r7 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.openStopwatch(item_r7);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275element(14, "i", 21);
    \u0275\u0275elementEnd();
    \u0275\u0275template(15, ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_2_Conditional_0_span_15_Template, 4, 3, "span", 22);
    \u0275\u0275element(16, "vmc-assignment-source", 23);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "div", 24)(18, "span", 25);
    \u0275\u0275listener("click", function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_2_Conditional_0_Template_span_click_18_listener() {
      \u0275\u0275restoreView(_r18);
      const item_r7 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onWeeklyProgramChange(item_r7, ctx_r1.weeklyProgramChangeType.RESPONSIBLE));
    });
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r7 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("program-assignment-row--collapsed", ctx_r1.isAssignmentCollapsed(item_r7));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.adapterTime(item_r7.startTime), " ");
    \u0275\u0275advance();
    \u0275\u0275property("title", item_r7.assignment.title + " (" + item_r7.assignment.time + item_r7.assignment.timeType + ")");
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-expanded", !ctx_r1.isAssignmentCollapsed(item_r7));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.isAssignmentCollapsed(item_r7) ? "expand_more" : "expand_less");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item_r7.assignment.number, ". ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item_r7.assignment.title + " (" + item_r7.assignment.time + " " + item_r7.assignment.timeType + ")", " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.stopwatchService.hasRecord(ctx_r1.getItemId(item_r7)));
    \u0275\u0275advance();
    \u0275\u0275property("assignment", item_r7.assignment)("compact", true);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngStyle", ctx_r1.getPublisherAlertStyle(item_r7.responsible))("ngbTooltip", ctx_r1.getPublisherAlertText(item_r7.responsible))("placement", ctx_r1.publisherTooltipPlacement);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r7.responsible ? item_r7.responsible.fullName : ctx_r1.porAsignar, " ");
  }
}
function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_2_Conditional_1_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 52);
    \u0275\u0275listener("click", function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_2_Conditional_1_Conditional_13_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r21);
      const item_r7 = \u0275\u0275nextContext(3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.onWeeklyProgramChange(item_r7, ctx_r1.weeklyProgramChangeType.TITLE);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "campaign");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "Falta el t\xEDtulo del discurso");
    \u0275\u0275elementEnd()();
  }
}
function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_2_Conditional_1_span_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 26);
    \u0275\u0275listener("click", function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_2_Conditional_1_span_16_Template_span_click_0_listener($event) {
      \u0275\u0275restoreView(_r22);
      const item_r7 = \u0275\u0275nextContext(3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.onInlineTimerClick(ctx_r1.getItemId(item_r7));
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "button", 27);
    \u0275\u0275listener("click", function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_2_Conditional_1_span_16_Template_button_click_2_listener($event) {
      \u0275\u0275restoreView(_r22);
      const item_r7 = \u0275\u0275nextContext(3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      $event.stopPropagation();
      return \u0275\u0275resetView(ctx_r1.removeStopwatch(ctx_r1.getItemId(item_r7)));
    });
    \u0275\u0275text(3, " \xD7 ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r7 = \u0275\u0275nextContext(3).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("inline-timer--running", ctx_r1.stopwatchService.getState(ctx_r1.getItemId(item_r7)).running);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.formatElapsed(ctx_r1.stopwatchService.getState(ctx_r1.getItemId(item_r7)).elapsed), " ");
  }
}
function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_2_Conditional_1_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "vmc-assignment-source", 23);
  }
  if (rf & 2) {
    const item_r7 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275property("assignment", item_r7.assignment)("compact", true);
  }
}
function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_2_Conditional_1_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 51);
    \u0275\u0275text(1, "Encargado");
    \u0275\u0275elementEnd();
  }
}
function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_2_Conditional_1_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 42);
    \u0275\u0275listener("click", function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_2_Conditional_1_Conditional_20_Template_span_click_0_listener() {
      \u0275\u0275restoreView(_r23);
      const item_r7 = \u0275\u0275nextContext(3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onWeeklyProgramChange(item_r7, ctx_r1.weeklyProgramChangeType.TIPS));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r7 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r7.assignment.tips, " ");
  }
}
function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_2_Conditional_1_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 25);
    \u0275\u0275listener("click", function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_2_Conditional_1_Conditional_24_Template_span_click_0_listener() {
      \u0275\u0275restoreView(_r24);
      const item_r7 = \u0275\u0275nextContext(3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onWeeklyProgramChange(item_r7, ctx_r1.weeklyProgramChangeType.ASSISTANT));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r7 = \u0275\u0275nextContext(3).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngStyle", ctx_r1.getPublisherAlertStyle(item_r7.assistant))("ngbTooltip", ctx_r1.getPublisherAlertText(item_r7.assistant))("placement", ctx_r1.publisherTooltipPlacement);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r7.assistant ? "/" + item_r7.assistant.fullName : "/" + ctx_r1.porAsignar, " ");
  }
}
function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12)(1, "div", 48)(2, "div", 14)(3, "div", 46);
    \u0275\u0275listener("click", function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_2_Conditional_1_Template_div_click_3_listener() {
      \u0275\u0275restoreView(_r20);
      const item_r7 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onWeeklyProgramChange(item_r7, ctx_r1.weeklyProgramChangeType.START_TIME));
    });
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 47)(6, "button", 17);
    \u0275\u0275listener("click", function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_2_Conditional_1_Template_button_click_6_listener($event) {
      \u0275\u0275restoreView(_r20);
      const item_r7 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.toggleAssignment(item_r7);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(7, "mat-icon");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "span", 18);
    \u0275\u0275listener("click", function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_2_Conditional_1_Template_span_click_9_listener() {
      \u0275\u0275restoreView(_r20);
      const item_r7 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onWeeklyProgramChange(item_r7, ctx_r1.weeklyProgramChangeType.NUMBER));
    });
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span", 19);
    \u0275\u0275listener("click", function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_2_Conditional_1_Template_span_click_11_listener() {
      \u0275\u0275restoreView(_r20);
      const item_r7 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onWeeklyProgramChange(item_r7, ctx_r1.weeklyProgramChangeType.TITLE));
    });
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275template(13, ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_2_Conditional_1_Conditional_13_Template, 5, 0, "button", 49);
    \u0275\u0275elementStart(14, "button", 20);
    \u0275\u0275listener("click", function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_2_Conditional_1_Template_button_click_14_listener($event) {
      \u0275\u0275restoreView(_r20);
      const item_r7 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.openStopwatch(item_r7);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275element(15, "i", 21);
    \u0275\u0275elementEnd();
    \u0275\u0275template(16, ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_2_Conditional_1_span_16_Template, 4, 3, "span", 22)(17, ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_2_Conditional_1_Conditional_17_Template, 1, 2, "vmc-assignment-source", 23);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "div", 50);
    \u0275\u0275template(19, ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_2_Conditional_1_Conditional_19_Template, 2, 0, "span", 51)(20, ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_2_Conditional_1_Conditional_20_Template, 2, 1, "span", 38);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 24)(22, "span", 25);
    \u0275\u0275listener("click", function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_2_Conditional_1_Template_span_click_22_listener() {
      \u0275\u0275restoreView(_r20);
      const item_r7 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onWeeklyProgramChange(item_r7, ctx_r1.weeklyProgramChangeType.RESPONSIBLE));
    });
    \u0275\u0275text(23);
    \u0275\u0275elementEnd();
    \u0275\u0275template(24, ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_2_Conditional_1_Conditional_24_Template, 2, 4, "span", 40);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r7 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("program-assignment-row--collapsed", ctx_r1.isAssignmentCollapsed(item_r7))("program-assignment-row--pending-title", ctx_r1.needsOverseerTalkTitle(item_r7));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.adapterTime(item_r7.startTime), " ");
    \u0275\u0275advance();
    \u0275\u0275property("title", item_r7.assignment.title + " (" + item_r7.assignment.time + item_r7.assignment.timeType + ")");
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-expanded", !ctx_r1.isAssignmentCollapsed(item_r7));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.isAssignmentCollapsed(item_r7) ? "expand_more" : "expand_less");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item_r7.assignment.number, ". ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item_r7.assignment.title + " (" + item_r7.assignment.time + " " + item_r7.assignment.timeType + ")", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.needsOverseerTalkTitle(item_r7) ? 13 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.stopwatchService.hasRecord(ctx_r1.getItemId(item_r7)));
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.isSpecialEventWeek ? 17 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.isSpecialEventWeek ? 19 : item_r7.assignment.showTips ? 20 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngStyle", ctx_r1.getPublisherAlertStyle(item_r7.responsible))("ngbTooltip", ctx_r1.getPublisherAlertText(item_r7.responsible))("placement", ctx_r1.publisherTooltipPlacement);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r7.responsible ? item_r7.responsible.fullName : ctx_r1.porAsignar, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.isSpecialEventWeek ? 24 : -1);
  }
}
function ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_2_Conditional_0_Template, 20, 15, "div", 43)(1, ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_2_Conditional_1_Template, 25, 19, "div", 44);
  }
  if (rf & 2) {
    const item_r7 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(!ctx_r1.isCongregationBibleStudy(item_r7) ? 0 : 1);
  }
}
function ProgramAssignmentSectionComponent_ng_template_3_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_0_Template, 3, 5, "div", 10)(1, ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_1_Template, 32, 22, "div", 11)(2, ProgramAssignmentSectionComponent_ng_template_3_For_1_Conditional_2_Template, 2, 1);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(ctx_r1.sectionMeeting == ctx_r1.treasuresSection ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.sectionMeeting == ctx_r1.teachersSection ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.sectionMeeting == ctx_r1.livingSection ? 2 : -1);
  }
}
function ProgramAssignmentSectionComponent_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, ProgramAssignmentSectionComponent_ng_template_3_For_1_Template, 3, 3, null, null, _forTrack0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r1.sectionItems);
  }
}
var ProgramAssignmentSectionComponent = class _ProgramAssignmentSectionComponent {
  constructor(stopwatchService) {
    this.stopwatchService = stopwatchService;
    this.programValidations = inject(ProgramValidationsService);
    this.sectionMeeting = "";
    this.title = "";
    this.legendClass = "";
    this.room = MeetingRoom.MAIN;
    this.isAdmin = false;
    this.porAsignar = "por asignar";
    this.renderFieldset = true;
    this.addAssignment = new EventEmitter();
    this.weeklyProgramChange = new EventEmitter();
    this.weeklyProgramChangeType = WeeklyProgramChangeType;
    this.treasuresSection = SectionMeeting.TESOROS_DE_LA_BIBLIA;
    this.teachersSection = SectionMeeting.SEAMOS_MEJORES_MAESTROS;
    this.livingSection = SectionMeeting.NUESTRA_VIDA_CRISTIANA;
    this.publisherTooltipPlacement = "top";
    this.sectionCollapsed = false;
    this.collapsedAssignmentKeys = /* @__PURE__ */ new Set();
    this.activeStopwatchId = null;
    this.activeStopwatchTitle = "";
    this.clickTimers = /* @__PURE__ */ new Map();
  }
  ngOnDestroy() {
    this.clickTimers.forEach((t) => clearTimeout(t));
  }
  getItemId(item) {
    return item.id ?? item.assignment?.id ?? 0;
  }
  openStopwatch(item) {
    this.activeStopwatchId = this.getItemId(item);
    this.activeStopwatchTitle = item.assignment?.title ?? "";
  }
  closeStopwatch() {
    this.activeStopwatchId = null;
  }
  /** 1 clic = parar/reanudar · 2 clics = poner a cero y detener */
  onInlineTimerClick(id) {
    if (this.clickTimers.has(id)) {
      clearTimeout(this.clickTimers.get(id));
      this.clickTimers.delete(id);
      this.stopwatchService.reset(id);
      return;
    }
    const state = this.stopwatchService.getState(id);
    if (state.running) {
      this.stopwatchService.stop(id);
    } else {
      this.stopwatchService.start(id);
    }
    const timer = setTimeout(() => this.clickTimers.delete(id), 300);
    this.clickTimers.set(id, timer);
  }
  removeStopwatch(id) {
    clearTimeout(this.clickTimers.get(id));
    this.clickTimers.delete(id);
    this.stopwatchService.remove(id);
    if (this.activeStopwatchId === id)
      this.closeStopwatch();
  }
  formatElapsed(ms) {
    const totalSec = Math.floor(ms / 1e3);
    const cs = Math.floor(ms % 1e3 / 10);
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor(totalSec % 3600 / 60);
    const s = totalSec % 60;
    const pad2 = (n) => n.toString().padStart(2, "0");
    const base = h > 0 ? `${pad2(h)}:${pad2(m)}:${pad2(s)}` : `${pad2(m)}:${pad2(s)}`;
    return `${base}.${pad2(cs)}`;
  }
  get sectionItems() {
    const items = this.week?.weeklyPrograms ?? [];
    return items.filter((item) => {
      if (item.assignment.sectionMeeting !== this.sectionMeeting) {
        return false;
      }
      return this.sectionMeeting === this.livingSection || item.room === this.room;
    });
  }
  adapterTime(dateTime) {
    return Utils.adapterTime(dateTime);
  }
  /** En semanas con evento distinto de asamblea el estudio bíblico debe llevar el título del discurso del superintendente. */
  needsOverseerTalkTitle(item) {
    return needsOverseerTalkTitle(this.week?.event, item?.assignment?.title);
  }
  get isSpecialEventWeek() {
    return isSpecialEventWeek(this.week?.event);
  }
  onAddAssignment() {
    this.addAssignment.emit({ program: this.week, sectionMeeting: this.sectionMeeting });
  }
  onWeeklyProgramChange(item, type) {
    this.weeklyProgramChange.emit({ item, type });
  }
  toggleSection() {
    this.sectionCollapsed = !this.sectionCollapsed;
  }
  toggleAssignment(item) {
    const key = this.getAssignmentCollapseKey(item);
    if (this.collapsedAssignmentKeys.has(key)) {
      this.collapsedAssignmentKeys.delete(key);
      return;
    }
    this.collapsedAssignmentKeys.add(key);
  }
  isAssignmentCollapsed(item) {
    return this.collapsedAssignmentKeys.has(this.getAssignmentCollapseKey(item));
  }
  getPublisherAlertText(publisher) {
    return getPublisherAlertText(this.programValidations.validationsFor(this.week.id, publisher?.id));
  }
  getPublisherAlertStyle(publisher) {
    return getPublisherAlertStyle(publisher, this.programValidations.validationsFor(this.week.id, publisher?.id));
  }
  isSpeech(item) {
    return isSpeechAssignment(item.assignment);
  }
  isCongregationBibleStudy(item) {
    return isCongregationBibleStudyAssignment(item.assignment);
  }
  isExplainingBeliefsSpeech(item) {
    return isExplainingBeliefsSpeechAssignment(item.assignment);
  }
  getAssignmentCollapseKey(item) {
    return `${this.sectionMeeting}:${item.id ?? item.assignment?.id ?? item.assignment?.number ?? "unknown"}`;
  }
  static {
    this.\u0275fac = function ProgramAssignmentSectionComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ProgramAssignmentSectionComponent)(\u0275\u0275directiveInject(StopwatchService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProgramAssignmentSectionComponent, selectors: [["vmc-program-assignment-section"]], inputs: { week: "week", sectionMeeting: "sectionMeeting", title: "title", legendClass: "legendClass", room: "room", isAdmin: "isAdmin", porAsignar: "porAsignar", renderFieldset: "renderFieldset" }, outputs: { addAssignment: "addAssignment", weeklyProgramChange: "weeklyProgramChange" }, decls: 5, vars: 2, consts: [["sectionRows", ""], [3, "assignmentId", "assignmentTitle", "closed", 4, "ngIf"], [1, "mb-0"], [3, "ngTemplateOutlet"], [3, "closed", "assignmentId", "assignmentTitle"], [1, "section-title-text"], [1, "section-actions"], ["type", "button", "aria-label", "Colapsar seccion", 1, "section-action-button", 3, "click"], ["type", "button", "aria-label", "Editar seccion", 1, "section-action-button"], ["type", "button", "aria-label", "Editar seccion", 1, "section-action-button", 3, "click"], [1, "row", "px-3", "program__tesoros", "program-assignment-row", 3, "program-assignment-row--treasures-assignment-3", "program-assignment-row--collapsed"], [1, "row", "px-3", "program__tesoros", "program-assignment-row", "program-assignment-row--teachers", 3, "program-assignment-row--collapsed"], [1, "row", "px-3", "program__tesoros", "program-assignment-row"], [1, "col-md-9", "mt-1"], [1, "row", "program-assignment-line"], [1, "col-md-1", "ms-2", "ms-xl-2", "width-timeStart", "program-time-start", "hover", 3, "click"], [1, "col-md-11", "big-title", "program-assignment-title", "p-0", "ps-xl-2", "m-0", 3, "title"], ["type", "button", "aria-label", "Colapsar asignacion", 1, "assignment-collapse-button", 3, "click"], [1, "title-number", "hover", 3, "click"], [1, "hover", "program__title-asingment", 3, "click"], ["type", "button", "ngbTooltip", "Cron\xF3metro", "placement", "top", 1, "assignment-stopwatch-btn", 3, "click"], [1, "pi", "pi-stopwatch"], ["class", "inline-timer", "ngbTooltip", "1 clic: parar/reanudar \xB7 2 clics: poner a cero y detener", "placement", "top", 3, "inline-timer--running", "click", 4, "ngIf"], [1, "program-assignment-detail", 3, "assignment", "compact"], [1, "col-md-3", "mb-3", "mb-md-0", "program-assignment-detail"], ["container", "body", "tooltipClass", "tooltip-publisher-alert", 1, "hover", "text-publisher", 3, "click", "ngStyle", "ngbTooltip", "placement"], ["ngbTooltip", "1 clic: parar/reanudar \xB7 2 clics: poner a cero y detener", "placement", "top", 1, "inline-timer", 3, "click"], ["type", "button", "aria-label", "Eliminar registro del cron\xF3metro", "title", "Eliminar registro del cron\xF3metro", 1, "inline-timer-remove", 3, "click"], [1, "col-md-5", "mt-1"], [1, "col-md-1", "mt-0", "md:mt-1", "text-end", "text-title-custom", "program-assignment-detail", "d-none", "d-xl-block"], [1, "hover", "d-xl-inline"], [1, "col-md-2", "mb-3", "mb-md-0", "program-assignment-detail"], [1, "d-md-none", "text-title-custom"], [1, "hover", "d-xl-inline", 3, "click"], [1, "row", "px-3", "program__tesoros", "program-assignment-row", "program-assignment-row--teachers"], [1, "col-md-1", "mx-2", "width-timeStart", "program-time-start", "hover", 3, "click"], [1, "col-md-11", "big-title", "program-assignment-title", "p-0", "m-0", 3, "title"], [1, "assignment-stopwatch-controls"], [1, "hover", "d-none", "d-xl-inline"], [1, "col-md-3", "pe-0", "mb-3", "mb-md-0", "program-assignment-detail"], ["container", "body", "tooltipClass", "tooltip-publisher-alert", 1, "hover", "text-publisher", 3, "ngStyle", "ngbTooltip", "placement"], [1, "col-md-3", "mb-3", "pe-0", "mb-md-0", "program-assignment-detail"], [1, "hover", "d-none", "d-xl-inline", 3, "click"], [1, "row", "px-3", "program__tesoros", "program-assignment-row", 3, "program-assignment-row--collapsed"], [1, "row", "px-3", "program__tesoros", "program-assignment-row", 3, "program-assignment-row--collapsed", "program-assignment-row--pending-title"], [1, "col-md-9"], [1, "col-md-1", "width-timeStart", "ms-2", "program-time-start", "hover", 3, "click"], [1, "col-md-11", "big-title", "program-assignment-title", "p-0", "m-0", "ps-xl-2", "hover", 3, "title"], [1, "col-md-8"], ["type", "button", "ngbTooltip", "Cambia el t\xEDtulo por el discurso del superintendente", "placement", "top", 1, "assignment-pending-badge"], [1, "col-md-1", "mt-0", "text-end", "text-title-custom", "program-assignment-detail", "d-none", "d-xl-block"], [1, "d-none", "d-xl-inline"], ["type", "button", "ngbTooltip", "Cambia el t\xEDtulo por el discurso del superintendente", "placement", "top", 1, "assignment-pending-badge", 3, "click"]], template: function ProgramAssignmentSectionComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, ProgramAssignmentSectionComponent_vmc_stopwatch_modal_0_Template, 1, 2, "vmc-stopwatch-modal", 1)(1, ProgramAssignmentSectionComponent_Conditional_1_Template, 10, 7, "fieldset", 2)(2, ProgramAssignmentSectionComponent_Conditional_2_Template, 1, 1, "ng-container", 3)(3, ProgramAssignmentSectionComponent_ng_template_3_Template, 2, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
      }
      if (rf & 2) {
        \u0275\u0275property("ngIf", ctx.activeStopwatchId !== null);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.renderFieldset ? 1 : 2);
      }
    }, dependencies: [CommonModule, NgIf, NgTemplateOutlet, NgStyle, SharedModule, MatIcon, AssignmentSourceComponent, NgbTooltipModule, NgbTooltip, StopwatchModalComponent], styles: ['@charset "UTF-8";\n\n\n\n[_nghost-%COMP%] {\n  display: block;\n}\nlegend[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  margin-bottom: -2px;\n  color: white;\n  width: 100%;\n  height: 40px;\n  line-height: 40px;\n  padding-left: 10px;\n  position: relative;\n}\n.program__title-asingment[_ngcontent-%COMP%] {\n  font-style: normal;\n}\n.program__title-tesoros[_ngcontent-%COMP%] {\n  background-color: #2a6b77;\n}\n.program__title-maestros[_ngcontent-%COMP%] {\n  background-color: #bd8a00;\n}\n.program__title-vida[_ngcontent-%COMP%] {\n  background-color: #7a0026;\n}\n.title-number[_ngcontent-%COMP%] {\n  display: inline-block;\n  width: 20px;\n  text-align: right;\n}\n.text-title-custom[_ngcontent-%COMP%] {\n  font-size: 10px;\n  font-weight: bold;\n  line-height: 20px;\n}\n.big-title[_ngcontent-%COMP%] {\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.hover[_ngcontent-%COMP%]:hover {\n  cursor: pointer;\n}\n.text-publisher[_ngcontent-%COMP%] {\n  font-size: 13px;\n}\n.program-assignment-line[_ngcontent-%COMP%] {\n  align-items: flex-start;\n  flex-wrap: nowrap;\n  max-width: 100%;\n  overflow: hidden;\n  width: 100%;\n}\n.program-assignment-row[_ngcontent-%COMP%]    > [class*=col-][_ngcontent-%COMP%], \n.program-assignment-line[_ngcontent-%COMP%]    > [class*=col-][_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.program-time-start[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  flex: 0 0 42px;\n  max-width: 42px;\n  width: 42px;\n  margin-right: 8px;\n  color: #455a64;\n  font-size: 0.78rem;\n  font-weight: 700;\n  line-height: 1.4;\n  white-space: nowrap;\n}\n.program-assignment-title[_ngcontent-%COMP%] {\n  flex: 1 1 0;\n  max-width: calc(100% - 50px);\n  min-width: 0;\n  width: auto;\n}\n.program-assignment-title[_ngcontent-%COMP%]    > vmc-assignment-source[_ngcontent-%COMP%] {\n  display: block;\n  max-width: 42rem;\n  min-width: 0;\n  width: 100%;\n}\n.program-assignment-row--collapsed[_ngcontent-%COMP%]   .program-assignment-title[_ngcontent-%COMP%]    > vmc-assignment-source[_ngcontent-%COMP%] {\n  display: none !important;\n}\n@media (max-width: 767.98px) {\n  legend[_ngcontent-%COMP%] {\n    height: auto;\n    min-height: 36px;\n    line-height: 1.2;\n    padding: 9px 36px 9px 10px;\n  }\n  .program-time-start[_ngcontent-%COMP%] {\n    flex-basis: 38px;\n    max-width: 38px;\n    margin: 2px 6px 0 0 !important;\n    font-size: 0.74rem;\n  }\n  .program-assignment-title[_ngcontent-%COMP%] {\n    white-space: normal;\n  }\n  .big-title[_ngcontent-%COMP%] {\n    overflow: visible;\n    text-overflow: clip;\n  }\n  .text-publisher[_ngcontent-%COMP%] {\n    display: inline-block;\n    margin-bottom: 6px;\n  }\n}\n@media (min-width: 768px) and (max-width: 1180px) {\n  .program__title-asingment[_ngcontent-%COMP%] {\n    font-size: calc(1em - 2px);\n  }\n}\n@media (min-width: 768px) and (max-width: 1180px) {\n  .program-assignment-title[_ngcontent-%COMP%] {\n    align-items: center;\n    display: flex;\n    flex-wrap: wrap;\n  }\n  .program__title-asingment[_ngcontent-%COMP%] {\n    flex: 1 1 0;\n    min-width: 0;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n  .assignment-stopwatch-btn[_ngcontent-%COMP%], \n   .inline-timer[_ngcontent-%COMP%] {\n    flex: 0 0 auto;\n  }\n  .assignment-stopwatch-controls[_ngcontent-%COMP%] {\n    align-items: center;\n    display: inline-flex;\n    flex: 0 0 auto;\n    white-space: nowrap;\n  }\n  .program-assignment-title[_ngcontent-%COMP%]    > vmc-assignment-source[_ngcontent-%COMP%] {\n    flex: 0 0 100%;\n  }\n}\n@media (min-width: 768px) and (max-width: 1180px) {\n  .program-assignment-row--teachers[_ngcontent-%COMP%]    > .col-md-5[_ngcontent-%COMP%] {\n    flex: 0 0 68% !important;\n    max-width: 68% !important;\n  }\n  .program-assignment-row--teachers[_ngcontent-%COMP%]    > .col-md-3[_ngcontent-%COMP%] {\n    flex: 0 0 11.833333% !important;\n    max-width: 11.833333% !important;\n  }\n  .program-assignment-row--treasures-assignment-3[_ngcontent-%COMP%]    > .col-md-5[_ngcontent-%COMP%] {\n    flex: 0 0 50%;\n    max-width: 50%;\n  }\n}\n@media (min-width: 1366px) {\n  .width-timeStart[_ngcontent-%COMP%] {\n    width: 36px;\n  }\n  .big-title[_ngcontent-%COMP%] {\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n  legend[_ngcontent-%COMP%] {\n    font-size: 1rem;\n    margin-bottom: -2px;\n    color: white;\n    width: 44vw;\n    height: 35px;\n    padding-left: 10px;\n    position: relative;\n    line-height: 35px;\n  }\n}\n@media (min-width: 1600px) {\n  .width-timeStart[_ngcontent-%COMP%] {\n    width: 36px;\n  }\n  legend[_ngcontent-%COMP%] {\n    font-size: 1rem;\n    margin-bottom: -2px;\n    color: white;\n    width: 39vw;\n    padding-left: 10px;\n    position: relative;\n  }\n}\n.program-assignment-row--pending-title[_ngcontent-%COMP%] {\n  position: relative;\n  border-radius: 8px;\n  background:\n    linear-gradient(\n      135deg,\n      #fff2df 0%,\n      #ffe6c6 100%);\n  box-shadow: inset 3px 0 0 #e07a12;\n  animation: _ngcontent-%COMP%_pending-title-pulse 2.4s ease-in-out infinite;\n}\n@keyframes _ngcontent-%COMP%_pending-title-pulse {\n  0%, 100% {\n    box-shadow: inset 3px 0 0 #e07a12;\n  }\n  50% {\n    box-shadow: inset 3px 0 0 #e07a12, 0 0 0 3px rgba(224, 122, 18, 0.12);\n  }\n}\n.assignment-pending-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  margin-left: 6px;\n  padding: 1px 8px;\n  border: 1px solid rgba(224, 122, 18, 0.35);\n  border-radius: 10px;\n  background: #fff;\n  color: #b45309;\n  font-size: 0.72rem;\n  font-weight: 600;\n  line-height: 1.5;\n  vertical-align: middle;\n  cursor: pointer;\n  transition: background-color 0.15s ease, color 0.15s ease;\n}\n.assignment-pending-badge[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 15px;\n  width: 15px;\n  height: 15px;\n}\n.assignment-pending-badge[_ngcontent-%COMP%]:hover {\n  background: #fff7ec;\n  color: #92400e;\n}\n@media (prefers-reduced-motion: reduce) {\n  .program-assignment-row--pending-title[_ngcontent-%COMP%] {\n    animation: none;\n  }\n}\n.assignment-stopwatch-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 26px;\n  min-height: 26px;\n  background: none;\n  border: none;\n  padding: 0 5px;\n  line-height: 1;\n  vertical-align: middle;\n  cursor: pointer;\n  color: #e67e22;\n  opacity: 0.75;\n  transition: opacity 0.15s, transform 0.15s;\n}\n.assignment-stopwatch-btn[_ngcontent-%COMP%]:hover {\n  opacity: 1;\n  transform: scale(1.15);\n}\n.assignment-stopwatch-btn[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  vertical-align: middle;\n}\n.inline-timer-remove[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 20px;\n  height: 20px;\n  padding: 0;\n  border: 0;\n  border-radius: 50%;\n  background: transparent;\n  color: inherit;\n  font: inherit;\n  cursor: pointer;\n}\n.inline-timer-remove[_ngcontent-%COMP%]:hover, \n.inline-timer-remove[_ngcontent-%COMP%]:focus-visible {\n  background: #dc3545;\n  color: #fff;\n}\n.inline-timer[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 3px;\n  margin-left: 4px;\n  min-height: 24px;\n  padding: 2px 8px;\n  border-radius: 10px;\n  background: #f0f0f0;\n  color: #555;\n  font-size: 1rem;\n  font-family: "Courier New", monospace;\n  font-weight: 600;\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n  vertical-align: middle;\n  transition: background 0.2s;\n}\n.inline-timer[_ngcontent-%COMP%]:hover {\n  background: #e0e0e0;\n}\n.inline-timer.inline-timer--running[_ngcontent-%COMP%] {\n  background: #fff3cd;\n  color: #856404;\n}\n/*# sourceMappingURL=program-assignment-section.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProgramAssignmentSectionComponent, [{
    type: Component,
    args: [{ selector: "vmc-program-assignment-section", imports: [CommonModule, SharedModule, NgbTooltipModule, AssignmentSourceComponent, StopwatchModalComponent], template: `<vmc-stopwatch-modal *ngIf="activeStopwatchId !== null" [assignmentId]="activeStopwatchId"\r
  [assignmentTitle]="activeStopwatchTitle" (closed)="closeStopwatch()">\r
</vmc-stopwatch-modal>\r
\r
@if (renderFieldset) {\r
<fieldset class="mb-0">\r
  <legend [class]="legendClass + ' program-section-legend my-md-2'">\r
    <span class="section-title-text">{{ title }}</span>\r
    <span class="section-actions">\r
      <button class="section-action-button" type="button" [attr.aria-expanded]="!sectionCollapsed"\r
        aria-label="Colapsar seccion" (click)="toggleSection()">\r
        <mat-icon>{{ sectionCollapsed ? "expand_more" : "expand_less" }}</mat-icon>\r
      </button>\r
      @if (isAdmin) {\r
      <button class="section-action-button" type="button" aria-label="Editar seccion" (click)="onAddAssignment()">\r
        <mat-icon>edit</mat-icon>\r
      </button>\r
      }\r
    </span>\r
  </legend>\r
\r
  @if (!sectionCollapsed) {\r
  <ng-container [ngTemplateOutlet]="sectionRows"></ng-container>\r
  }\r
</fieldset>\r
} @else {\r
<ng-container [ngTemplateOutlet]="sectionRows"></ng-container>\r
}\r
\r
<ng-template #sectionRows>\r
  @for (item of sectionItems; track item.id) {\r
  @if (sectionMeeting == treasuresSection) {\r
  <div class="row px-3 program__tesoros program-assignment-row"\r
    [class.program-assignment-row--treasures-assignment-3]="item.assignment.number == 3"\r
    [class.program-assignment-row--collapsed]="isAssignmentCollapsed(item)">\r
    @if (item.assignment.number == 1 || item.assignment.number == 2) {\r
    <div class="col-md-9 mt-1">\r
      <div class="row program-assignment-line">\r
        <div class="col-md-1 ms-2 ms-xl-2 width-timeStart program-time-start hover"\r
          (click)="onWeeklyProgramChange(item, weeklyProgramChangeType.START_TIME)">\r
          {{ adapterTime(item.startTime) }}\r
        </div>\r
        <div class="col-md-11 big-title program-assignment-title p-0 ps-xl-2 m-0"\r
          [title]="item.assignment.title + ' (' + item.assignment.time + item.assignment.timeType + ')'">\r
          <button class="assignment-collapse-button" type="button" [attr.aria-expanded]="!isAssignmentCollapsed(item)"\r
            aria-label="Colapsar asignacion" (click)="toggleAssignment(item); $event.stopPropagation()">\r
            <mat-icon>{{ isAssignmentCollapsed(item) ? "expand_more" : "expand_less" }}</mat-icon>\r
          </button>\r
          <span class="title-number hover" (click)="onWeeklyProgramChange(item, weeklyProgramChangeType.NUMBER)">\r
            {{ item.assignment.number }}.\r
          </span>\r
\r
          <span class="hover program__title-asingment"\r
            (click)="onWeeklyProgramChange(item, weeklyProgramChangeType.TITLE)">\r
            {{ item.assignment.title + " (" + item.assignment.time + " " + item.assignment.timeType + ")" }}\r
          </span>\r
          <button class="assignment-stopwatch-btn" type="button" ngbTooltip="Cron\xF3metro" placement="top"\r
            (click)="openStopwatch(item); $event.stopPropagation()">\r
            <i class="pi pi-stopwatch"></i>\r
          </button>\r
          <span\r
            *ngIf="stopwatchService.hasRecord(getItemId(item))"\r
            class="inline-timer" [class.inline-timer--running]="stopwatchService.getState(getItemId(item)).running"\r
            ngbTooltip="1 clic: parar/reanudar \xB7 2 clics: poner a cero y detener" placement="top"\r
            (click)="onInlineTimerClick(getItemId(item)); $event.stopPropagation()">\r
            {{ formatElapsed(stopwatchService.getState(getItemId(item)).elapsed) }}\r
            <button type="button" class="inline-timer-remove" aria-label="Eliminar registro del cron\xF3metro"\r
              title="Eliminar registro del cron\xF3metro" (click)="$event.stopPropagation(); removeStopwatch(getItemId(item))">\r
              &times;\r
            </button>\r
          </span>\r
          <vmc-assignment-source class="program-assignment-detail" [assignment]="item.assignment"\r
            [compact]="true"></vmc-assignment-source>\r
        </div>\r
      </div>\r
    </div>\r
    <div class="col-md-3 mb-3 mb-md-0 program-assignment-detail">\r
      <span class="hover text-publisher" [ngStyle]="getPublisherAlertStyle(item.responsible)"\r
        (click)="onWeeklyProgramChange(item, weeklyProgramChangeType.RESPONSIBLE)"\r
        [ngbTooltip]="getPublisherAlertText(item.responsible)" [placement]="publisherTooltipPlacement" container="body"\r
        tooltipClass="tooltip-publisher-alert">\r
        {{ item?.responsible?.fullName ?? porAsignar }}\r
      </span>\r
    </div>\r
    } @else {\r
    <div class="col-md-5 mt-1">\r
      <div class="row program-assignment-line">\r
        <div class="col-md-1 ms-2 ms-xl-2 width-timeStart program-time-start hover"\r
          (click)="onWeeklyProgramChange(item, weeklyProgramChangeType.START_TIME)">\r
          {{ adapterTime(item.startTime) }}\r
        </div>\r
        <div class="col-md-11 big-title program-assignment-title p-0 ps-xl-2 m-0"\r
          [title]="item.assignment.title + ' (' + item.assignment.time + item.assignment.timeType + ')'">\r
          <button class="assignment-collapse-button" type="button" [attr.aria-expanded]="!isAssignmentCollapsed(item)"\r
            aria-label="Colapsar asignacion" (click)="toggleAssignment(item); $event.stopPropagation()">\r
            <mat-icon>{{ isAssignmentCollapsed(item) ? "expand_more" : "expand_less" }}</mat-icon>\r
          </button>\r
          <span class="title-number hover" (click)="onWeeklyProgramChange(item, weeklyProgramChangeType.NUMBER)">\r
            {{ item.assignment.number }}.\r
          </span>\r
\r
          <span class="hover program__title-asingment"\r
            (click)="onWeeklyProgramChange(item, weeklyProgramChangeType.TITLE)">\r
            {{ item.assignment.title + " (" + item.assignment.time + " " + item.assignment.timeType + ")" }}\r
          </span>\r
          <button class="assignment-stopwatch-btn" type="button" ngbTooltip="Cron\xF3metro" placement="top"\r
            (click)="openStopwatch(item); $event.stopPropagation()">\r
            <i class="pi pi-stopwatch"></i>\r
          </button>\r
          <span\r
            *ngIf="stopwatchService.hasRecord(getItemId(item))"\r
            class="inline-timer" [class.inline-timer--running]="stopwatchService.getState(getItemId(item)).running"\r
            ngbTooltip="1 clic: parar/reanudar \xB7 2 clics: poner a cero y detener" placement="top"\r
            (click)="onInlineTimerClick(getItemId(item)); $event.stopPropagation()">\r
            {{ formatElapsed(stopwatchService.getState(getItemId(item)).elapsed) }}\r
            <button type="button" class="inline-timer-remove" aria-label="Eliminar registro del cron\xF3metro"\r
              title="Eliminar registro del cron\xF3metro" (click)="$event.stopPropagation(); removeStopwatch(getItemId(item))">\r
              &times;\r
            </button>\r
          </span>\r
          <vmc-assignment-source class="program-assignment-detail" [assignment]="item.assignment"\r
            [compact]="true"></vmc-assignment-source>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <div class="col-md-1 mt-0 md:mt-1 text-end text-title-custom program-assignment-detail d-none d-xl-block">\r
      @if (item.assignment.showTips) {\r
      <span class="hover  d-xl-inline" (click)="onWeeklyProgramChange(item, weeklyProgramChangeType.TIPS)">\r
        {{ item.assignment.tips }}\r
      </span>\r
      }\r
    </div>\r
\r
    <div class="col-md-3 mb-3 mb-md-0 program-assignment-detail">\r
      @if (item.assignment.number == 3) {\r
      <div class="d-md-none text-title-custom">Sala auxiliar</div>\r
      <span class="hover text-publisher" [ngStyle]="getPublisherAlertStyle(item.responsibleB)"\r
        (click)="onWeeklyProgramChange(item, weeklyProgramChangeType.RESPONSIBLE_B)"\r
        [ngbTooltip]="getPublisherAlertText(item.responsibleB)" [placement]="publisherTooltipPlacement" container="body"\r
        tooltipClass="tooltip-publisher-alert">\r
        {{ item?.responsibleB?.fullName ?? porAsignar }}\r
      </span>\r
      }\r
    </div>\r
    <div class="col-md-2 mb-3 mb-md-0 program-assignment-detail">\r
      @if (item.assignment.number == 3) {\r
      <div class="d-md-none text-title-custom">Sala principal</div>\r
      }\r
      <span class="hover text-publisher" [ngStyle]="getPublisherAlertStyle(item.responsible)"\r
        (click)="onWeeklyProgramChange(item, weeklyProgramChangeType.RESPONSIBLE)"\r
        [ngbTooltip]="getPublisherAlertText(item.responsible)" [placement]="publisherTooltipPlacement" container="body"\r
        tooltipClass="tooltip-publisher-alert">\r
        {{ item?.responsible?.fullName ?? porAsignar }}\r
      </span>\r
    </div>\r
    }\r
  </div>\r
  }\r
\r
  @if (sectionMeeting == teachersSection) {\r
  <div class="row px-3 program__tesoros program-assignment-row program-assignment-row--teachers"\r
    [class.program-assignment-row--collapsed]="isAssignmentCollapsed(item)">\r
    <div class="col-md-5 mt-1">\r
      <div class="row program-assignment-line">\r
        <div class="col-md-1 mx-2 width-timeStart program-time-start hover"\r
          (click)="onWeeklyProgramChange(item, weeklyProgramChangeType.START_TIME)">\r
          {{ adapterTime(item.startTime) }}\r
        </div>\r
\r
        <div class="col-md-11 big-title program-assignment-title p-0 m-0"\r
          [title]="item.assignment.title + ' (' + item.assignment.time + item.assignment.timeType + ')'">\r
          <button class="assignment-collapse-button" type="button" [attr.aria-expanded]="!isAssignmentCollapsed(item)"\r
            aria-label="Colapsar asignacion" (click)="toggleAssignment(item); $event.stopPropagation()">\r
            <mat-icon>{{ isAssignmentCollapsed(item) ? "expand_more" : "expand_less" }}</mat-icon>\r
          </button>\r
          <span class="title-number hover" (click)="onWeeklyProgramChange(item, weeklyProgramChangeType.NUMBER)">\r
            {{ item.assignment.number }}.\r
          </span>\r
          <span class="hover program__title-asingment"\r
            (click)="onWeeklyProgramChange(item, weeklyProgramChangeType.TITLE)">\r
            {{ item.assignment.title + " (" + item.assignment.time + " " + item.assignment.timeType + ")" }}\r
          </span>\r
          <span class="assignment-stopwatch-controls">\r
            <button class="assignment-stopwatch-btn" type="button" ngbTooltip="Cron\xF3metro" placement="top"\r
              (click)="openStopwatch(item); $event.stopPropagation()">\r
              <i class="pi pi-stopwatch"></i>\r
            </button>\r
            <span\r
              *ngIf="stopwatchService.hasRecord(getItemId(item))"\r
              class="inline-timer" [class.inline-timer--running]="stopwatchService.getState(getItemId(item)).running"\r
              ngbTooltip="1 clic: parar/reanudar \xB7 2 clics: poner a cero y detener" placement="top"\r
              (click)="onInlineTimerClick(getItemId(item)); $event.stopPropagation()">\r
              {{ formatElapsed(stopwatchService.getState(getItemId(item)).elapsed) }}\r
              <button type="button" class="inline-timer-remove" aria-label="Eliminar registro del cron\xF3metro"\r
                title="Eliminar registro del cron\xF3metro" (click)="$event.stopPropagation(); removeStopwatch(getItemId(item))">\r
                &times;\r
              </button>\r
            </span>\r
          </span>\r
          <vmc-assignment-source class="program-assignment-detail" [assignment]="item.assignment"\r
            [compact]="true"></vmc-assignment-source>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <div class="col-md-1 mt-0 md:mt-1 text-end text-title-custom program-assignment-detail d-none d-xl-block">\r
      @if (item.assignment.showTips) {\r
      <span class="hover d-none d-xl-inline" (click)="onWeeklyProgramChange(item, weeklyProgramChangeType.TIPS)">\r
        {{ item.assignment.tips }}\r
      </span>\r
      }\r
    </div>\r
\r
    <div class="col-md-3 pe-0 mb-3 mb-md-0 program-assignment-detail">\r
      <div class="d-md-none text-title-custom">Sala auxiliar</div>\r
      <span class="hover text-publisher" [ngStyle]="getPublisherAlertStyle(item.responsibleB)"\r
        (click)="onWeeklyProgramChange(item, weeklyProgramChangeType.RESPONSIBLE_B)"\r
        [ngbTooltip]="getPublisherAlertText(item.responsibleB)" [placement]="publisherTooltipPlacement" container="body"\r
        tooltipClass="tooltip-publisher-alert">\r
        {{ item?.responsibleB?.fullName ?? porAsignar }}\r
      </span>\r
      @if (!isSpeech(item) && !isExplainingBeliefsSpeech(item)) {\r
      <span class="hover text-publisher" [ngStyle]="getPublisherAlertStyle(item.assistantB)"\r
        (click)="onWeeklyProgramChange(item, weeklyProgramChangeType.ASSISTANT_B)"\r
        [ngbTooltip]="getPublisherAlertText(item.assistantB)" [placement]="publisherTooltipPlacement" container="body"\r
        tooltipClass="tooltip-publisher-alert">\r
        {{ item?.assistantB ? "/" + item.assistantB.fullName : "/" + porAsignar }}\r
      </span>\r
      }\r
    </div>\r
\r
    <div class="col-md-3 mb-3 pe-0 mb-md-0 program-assignment-detail">\r
      <div class="d-md-none text-title-custom">Sala principal</div>\r
      <span class="hover text-publisher" [ngStyle]="getPublisherAlertStyle(item.responsible)"\r
        (click)="onWeeklyProgramChange(item, weeklyProgramChangeType.RESPONSIBLE)"\r
        [ngbTooltip]="getPublisherAlertText(item.responsible)" [placement]="publisherTooltipPlacement" container="body"\r
        tooltipClass="tooltip-publisher-alert">\r
        {{ item?.responsible?.fullName ?? porAsignar }}\r
      </span>\r
      @if (!isSpeech(item) && !isExplainingBeliefsSpeech(item)) {\r
      <span class="hover text-publisher" [ngStyle]="getPublisherAlertStyle(item.assistant)"\r
        (click)="onWeeklyProgramChange(item, weeklyProgramChangeType.ASSISTANT)"\r
        [ngbTooltip]="getPublisherAlertText(item.assistant)" [placement]="publisherTooltipPlacement" container="body"\r
        tooltipClass="tooltip-publisher-alert">\r
        {{ item?.assistant ? "/" + item.assistant.fullName : "/" + porAsignar }}\r
      </span>\r
      }\r
    </div>\r
  </div>\r
  }\r
\r
  @if (sectionMeeting == livingSection) {\r
  @if (!isCongregationBibleStudy(item)) {\r
  <div class="row px-3 program__tesoros program-assignment-row"\r
    [class.program-assignment-row--collapsed]="isAssignmentCollapsed(item)">\r
    <div class="col-md-9">\r
      <div class="row program-assignment-line">\r
        <div class="col-md-1 width-timeStart ms-2 program-time-start hover"\r
          (click)="onWeeklyProgramChange(item, weeklyProgramChangeType.START_TIME)">\r
          {{ adapterTime(item.startTime) }}\r
        </div>\r
        <div class="col-md-11 big-title program-assignment-title p-0 m-0 ps-xl-2 hover"\r
          [title]="item.assignment.title + ' (' + item.assignment.time + item.assignment.timeType + ')'">\r
          <button class="assignment-collapse-button" type="button" [attr.aria-expanded]="!isAssignmentCollapsed(item)"\r
            aria-label="Colapsar asignacion" (click)="toggleAssignment(item); $event.stopPropagation()">\r
            <mat-icon>{{ isAssignmentCollapsed(item) ? "expand_more" : "expand_less" }}</mat-icon>\r
          </button>\r
          <span class="title-number hover" (click)="onWeeklyProgramChange(item, weeklyProgramChangeType.NUMBER)">\r
            {{ item.assignment.number }}.\r
          </span>\r
          <span class="hover program__title-asingment"\r
            (click)="onWeeklyProgramChange(item, weeklyProgramChangeType.TITLE)">\r
            {{ item.assignment.title + " (" + item.assignment.time + " " + item.assignment.timeType + ")" }}\r
          </span>\r
          <button class="assignment-stopwatch-btn" type="button" ngbTooltip="Cron\xF3metro" placement="top"\r
            (click)="openStopwatch(item); $event.stopPropagation()">\r
            <i class="pi pi-stopwatch"></i>\r
          </button>\r
          <span\r
            *ngIf="stopwatchService.hasRecord(getItemId(item))"\r
            class="inline-timer" [class.inline-timer--running]="stopwatchService.getState(getItemId(item)).running"\r
            ngbTooltip="1 clic: parar/reanudar \xB7 2 clics: poner a cero y detener" placement="top"\r
            (click)="onInlineTimerClick(getItemId(item)); $event.stopPropagation()">\r
            {{ formatElapsed(stopwatchService.getState(getItemId(item)).elapsed) }}\r
            <button type="button" class="inline-timer-remove" aria-label="Eliminar registro del cron\xF3metro"\r
              title="Eliminar registro del cron\xF3metro" (click)="$event.stopPropagation(); removeStopwatch(getItemId(item))">\r
              &times;\r
            </button>\r
          </span>\r
          <vmc-assignment-source class="program-assignment-detail" [assignment]="item.assignment"\r
            [compact]="true"></vmc-assignment-source>\r
        </div>\r
      </div>\r
    </div>\r
    <div class="col-md-3 mb-3 mb-md-0 program-assignment-detail">\r
      <span class="hover text-publisher" [ngStyle]="getPublisherAlertStyle(item.responsible)"\r
        (click)="onWeeklyProgramChange(item, weeklyProgramChangeType.RESPONSIBLE)"\r
        [ngbTooltip]="getPublisherAlertText(item.responsible)" [placement]="publisherTooltipPlacement" container="body"\r
        tooltipClass="tooltip-publisher-alert">\r
        {{ item.responsible ? item.responsible.fullName : porAsignar }}\r
      </span>\r
    </div>\r
  </div>\r
  } @else {\r
  <div class="row px-3 program__tesoros program-assignment-row"\r
    [class.program-assignment-row--collapsed]="isAssignmentCollapsed(item)"\r
    [class.program-assignment-row--pending-title]="needsOverseerTalkTitle(item)">\r
    <div class="col-md-8">\r
      <div class="row program-assignment-line">\r
        <div class="col-md-1 width-timeStart ms-2 program-time-start hover"\r
          (click)="onWeeklyProgramChange(item, weeklyProgramChangeType.START_TIME)">\r
          {{ adapterTime(item.startTime) }}\r
        </div>\r
        <div class="col-md-11 big-title program-assignment-title p-0 m-0 ps-xl-2 hover"\r
          [title]="item.assignment.title + ' (' + item.assignment.time + item.assignment.timeType + ')'">\r
          <button class="assignment-collapse-button" type="button" [attr.aria-expanded]="!isAssignmentCollapsed(item)"\r
            aria-label="Colapsar asignacion" (click)="toggleAssignment(item); $event.stopPropagation()">\r
            <mat-icon>{{ isAssignmentCollapsed(item) ? "expand_more" : "expand_less" }}</mat-icon>\r
          </button>\r
          <span class="title-number hover" (click)="onWeeklyProgramChange(item, weeklyProgramChangeType.NUMBER)">\r
            {{ item.assignment.number }}.\r
          </span>\r
          <span class="hover program__title-asingment"\r
            (click)="onWeeklyProgramChange(item, weeklyProgramChangeType.TITLE)">\r
            {{ item.assignment.title + " (" + item.assignment.time + " " + item.assignment.timeType + ")" }}\r
          </span>\r
          @if (needsOverseerTalkTitle(item)) {\r
          <button class="assignment-pending-badge" type="button"\r
            ngbTooltip="Cambia el t\xEDtulo por el discurso del superintendente" placement="top"\r
            (click)="onWeeklyProgramChange(item, weeklyProgramChangeType.TITLE); $event.stopPropagation()">\r
            <mat-icon>campaign</mat-icon>\r
            <span>Falta el t\xEDtulo del discurso</span>\r
          </button>\r
          }\r
          <button class="assignment-stopwatch-btn" type="button" ngbTooltip="Cron\xF3metro" placement="top"\r
            (click)="openStopwatch(item); $event.stopPropagation()">\r
            <i class="pi pi-stopwatch"></i>\r
          </button>\r
          <span\r
            *ngIf="stopwatchService.hasRecord(getItemId(item))"\r
            class="inline-timer" [class.inline-timer--running]="stopwatchService.getState(getItemId(item)).running"\r
            ngbTooltip="1 clic: parar/reanudar \xB7 2 clics: poner a cero y detener" placement="top"\r
            (click)="onInlineTimerClick(getItemId(item)); $event.stopPropagation()">\r
            {{ formatElapsed(stopwatchService.getState(getItemId(item)).elapsed) }}\r
            <button type="button" class="inline-timer-remove" aria-label="Eliminar registro del cron\xF3metro"\r
              title="Eliminar registro del cron\xF3metro" (click)="$event.stopPropagation(); removeStopwatch(getItemId(item))">\r
              &times;\r
            </button>\r
          </span>\r
          @if (!isSpecialEventWeek) {\r
          <vmc-assignment-source class="program-assignment-detail" [assignment]="item.assignment"\r
            [compact]="true"></vmc-assignment-source>\r
          }\r
        </div>\r
      </div>\r
    </div>\r
    <div class="col-md-1 mt-0 text-end text-title-custom program-assignment-detail d-none d-xl-block">\r
      @if (isSpecialEventWeek) {\r
      <span class="d-none d-xl-inline">Encargado</span>\r
      } @else if (item.assignment.showTips) {\r
      <span class="hover d-none d-xl-inline" (click)="onWeeklyProgramChange(item, weeklyProgramChangeType.TIPS)">\r
        {{ item.assignment.tips }}\r
      </span>\r
      }\r
    </div>\r
    <div class="col-md-3 mb-3 mb-md-0 program-assignment-detail">\r
      <span class="hover text-publisher" [ngStyle]="getPublisherAlertStyle(item.responsible)"\r
        (click)="onWeeklyProgramChange(item, weeklyProgramChangeType.RESPONSIBLE)"\r
        [ngbTooltip]="getPublisherAlertText(item.responsible)" [placement]="publisherTooltipPlacement" container="body"\r
        tooltipClass="tooltip-publisher-alert">\r
        {{ item.responsible ? item.responsible.fullName : porAsignar }}\r
      </span>\r
      @if (!isSpecialEventWeek) {\r
      <span class="hover text-publisher" [ngStyle]="getPublisherAlertStyle(item.assistant)"\r
        (click)="onWeeklyProgramChange(item, weeklyProgramChangeType.ASSISTANT)"\r
        [ngbTooltip]="getPublisherAlertText(item.assistant)" [placement]="publisherTooltipPlacement" container="body"\r
        tooltipClass="tooltip-publisher-alert">\r
        {{ item.assistant ? "/" + item.assistant.fullName : "/" + porAsignar }}\r
      </span>\r
      }\r
    </div>\r
  </div>\r
  }\r
  }\r
  }\r
</ng-template>\r
`, styles: ['@charset "UTF-8";\n\n/* src/app/pages/entre-semana/components/programs/components/program-assignment-section/program-assignment-section.component.scss */\n:host {\n  display: block;\n}\nlegend {\n  font-size: 0.8rem;\n  margin-bottom: -2px;\n  color: white;\n  width: 100%;\n  height: 40px;\n  line-height: 40px;\n  padding-left: 10px;\n  position: relative;\n}\n.program__title-asingment {\n  font-style: normal;\n}\n.program__title-tesoros {\n  background-color: #2a6b77;\n}\n.program__title-maestros {\n  background-color: #bd8a00;\n}\n.program__title-vida {\n  background-color: #7a0026;\n}\n.title-number {\n  display: inline-block;\n  width: 20px;\n  text-align: right;\n}\n.text-title-custom {\n  font-size: 10px;\n  font-weight: bold;\n  line-height: 20px;\n}\n.big-title {\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.hover:hover {\n  cursor: pointer;\n}\n.text-publisher {\n  font-size: 13px;\n}\n.program-assignment-line {\n  align-items: flex-start;\n  flex-wrap: nowrap;\n  max-width: 100%;\n  overflow: hidden;\n  width: 100%;\n}\n.program-assignment-row > [class*=col-],\n.program-assignment-line > [class*=col-] {\n  min-width: 0;\n}\n.program-time-start {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  flex: 0 0 42px;\n  max-width: 42px;\n  width: 42px;\n  margin-right: 8px;\n  color: #455a64;\n  font-size: 0.78rem;\n  font-weight: 700;\n  line-height: 1.4;\n  white-space: nowrap;\n}\n.program-assignment-title {\n  flex: 1 1 0;\n  max-width: calc(100% - 50px);\n  min-width: 0;\n  width: auto;\n}\n.program-assignment-title > vmc-assignment-source {\n  display: block;\n  max-width: 42rem;\n  min-width: 0;\n  width: 100%;\n}\n.program-assignment-row--collapsed .program-assignment-title > vmc-assignment-source {\n  display: none !important;\n}\n@media (max-width: 767.98px) {\n  legend {\n    height: auto;\n    min-height: 36px;\n    line-height: 1.2;\n    padding: 9px 36px 9px 10px;\n  }\n  .program-time-start {\n    flex-basis: 38px;\n    max-width: 38px;\n    margin: 2px 6px 0 0 !important;\n    font-size: 0.74rem;\n  }\n  .program-assignment-title {\n    white-space: normal;\n  }\n  .big-title {\n    overflow: visible;\n    text-overflow: clip;\n  }\n  .text-publisher {\n    display: inline-block;\n    margin-bottom: 6px;\n  }\n}\n@media (min-width: 768px) and (max-width: 1180px) {\n  .program__title-asingment {\n    font-size: calc(1em - 2px);\n  }\n}\n@media (min-width: 768px) and (max-width: 1180px) {\n  .program-assignment-title {\n    align-items: center;\n    display: flex;\n    flex-wrap: wrap;\n  }\n  .program__title-asingment {\n    flex: 1 1 0;\n    min-width: 0;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n  .assignment-stopwatch-btn,\n  .inline-timer {\n    flex: 0 0 auto;\n  }\n  .assignment-stopwatch-controls {\n    align-items: center;\n    display: inline-flex;\n    flex: 0 0 auto;\n    white-space: nowrap;\n  }\n  .program-assignment-title > vmc-assignment-source {\n    flex: 0 0 100%;\n  }\n}\n@media (min-width: 768px) and (max-width: 1180px) {\n  .program-assignment-row--teachers > .col-md-5 {\n    flex: 0 0 68% !important;\n    max-width: 68% !important;\n  }\n  .program-assignment-row--teachers > .col-md-3 {\n    flex: 0 0 11.833333% !important;\n    max-width: 11.833333% !important;\n  }\n  .program-assignment-row--treasures-assignment-3 > .col-md-5 {\n    flex: 0 0 50%;\n    max-width: 50%;\n  }\n}\n@media (min-width: 1366px) {\n  .width-timeStart {\n    width: 36px;\n  }\n  .big-title {\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n  legend {\n    font-size: 1rem;\n    margin-bottom: -2px;\n    color: white;\n    width: 44vw;\n    height: 35px;\n    padding-left: 10px;\n    position: relative;\n    line-height: 35px;\n  }\n}\n@media (min-width: 1600px) {\n  .width-timeStart {\n    width: 36px;\n  }\n  legend {\n    font-size: 1rem;\n    margin-bottom: -2px;\n    color: white;\n    width: 39vw;\n    padding-left: 10px;\n    position: relative;\n  }\n}\n.program-assignment-row--pending-title {\n  position: relative;\n  border-radius: 8px;\n  background:\n    linear-gradient(\n      135deg,\n      #fff2df 0%,\n      #ffe6c6 100%);\n  box-shadow: inset 3px 0 0 #e07a12;\n  animation: pending-title-pulse 2.4s ease-in-out infinite;\n}\n@keyframes pending-title-pulse {\n  0%, 100% {\n    box-shadow: inset 3px 0 0 #e07a12;\n  }\n  50% {\n    box-shadow: inset 3px 0 0 #e07a12, 0 0 0 3px rgba(224, 122, 18, 0.12);\n  }\n}\n.assignment-pending-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  margin-left: 6px;\n  padding: 1px 8px;\n  border: 1px solid rgba(224, 122, 18, 0.35);\n  border-radius: 10px;\n  background: #fff;\n  color: #b45309;\n  font-size: 0.72rem;\n  font-weight: 600;\n  line-height: 1.5;\n  vertical-align: middle;\n  cursor: pointer;\n  transition: background-color 0.15s ease, color 0.15s ease;\n}\n.assignment-pending-badge mat-icon {\n  font-size: 15px;\n  width: 15px;\n  height: 15px;\n}\n.assignment-pending-badge:hover {\n  background: #fff7ec;\n  color: #92400e;\n}\n@media (prefers-reduced-motion: reduce) {\n  .program-assignment-row--pending-title {\n    animation: none;\n  }\n}\n.assignment-stopwatch-btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 26px;\n  min-height: 26px;\n  background: none;\n  border: none;\n  padding: 0 5px;\n  line-height: 1;\n  vertical-align: middle;\n  cursor: pointer;\n  color: #e67e22;\n  opacity: 0.75;\n  transition: opacity 0.15s, transform 0.15s;\n}\n.assignment-stopwatch-btn:hover {\n  opacity: 1;\n  transform: scale(1.15);\n}\n.assignment-stopwatch-btn i {\n  font-size: 1.25rem;\n  vertical-align: middle;\n}\n.inline-timer-remove {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 20px;\n  height: 20px;\n  padding: 0;\n  border: 0;\n  border-radius: 50%;\n  background: transparent;\n  color: inherit;\n  font: inherit;\n  cursor: pointer;\n}\n.inline-timer-remove:hover,\n.inline-timer-remove:focus-visible {\n  background: #dc3545;\n  color: #fff;\n}\n.inline-timer {\n  display: inline-flex;\n  align-items: center;\n  gap: 3px;\n  margin-left: 4px;\n  min-height: 24px;\n  padding: 2px 8px;\n  border-radius: 10px;\n  background: #f0f0f0;\n  color: #555;\n  font-size: 1rem;\n  font-family: "Courier New", monospace;\n  font-weight: 600;\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n  vertical-align: middle;\n  transition: background 0.2s;\n}\n.inline-timer:hover {\n  background: #e0e0e0;\n}\n.inline-timer.inline-timer--running {\n  background: #fff3cd;\n  color: #856404;\n}\n/*# sourceMappingURL=program-assignment-section.component.css.map */\n'] }]
  }], () => [{ type: StopwatchService }], { week: [{
    type: Input
  }], sectionMeeting: [{
    type: Input
  }], title: [{
    type: Input
  }], legendClass: [{
    type: Input
  }], room: [{
    type: Input
  }], isAdmin: [{
    type: Input
  }], porAsignar: [{
    type: Input
  }], renderFieldset: [{
    type: Input
  }], addAssignment: [{
    type: Output
  }], weeklyProgramChange: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProgramAssignmentSectionComponent, { className: "ProgramAssignmentSectionComponent", filePath: "src/app/pages/entre-semana/components/programs/components/program-assignment-section/program-assignment-section.component.ts", lineNumber: 25 });
})();

// src/app/pages/entre-semana/components/programs/components/program-week/program-week.component.ts
function ProgramWeekComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "article", 3)(2, "div", 4)(3, "span", 5);
    \u0275\u0275text(4, "Evento especial");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h2");
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "uppercase");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p")(9, "mat-icon", 6);
    \u0275\u0275text(10, "event");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(7, 2, ctx_r0.semana.event));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.showDayOfMeeting(ctx_r0.semana.meeting.week));
  }
}
function ProgramWeekComponent_Conditional_2_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275element(1, "span", 29);
    \u0275\u0275elementStart(2, "mat-icon", 30);
    \u0275\u0275text(3, "auto_awesome");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 31)(5, "span", 32);
    \u0275\u0275text(6, "Semana especial");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "strong");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "span", 33);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r0.semana.event);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.showDayOfMeeting(ctx_r0.semana.meeting.week));
  }
}
function ProgramWeekComponent_Conditional_2_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275textInterpolate1(" | ", ctx_r0.semana.meeting.weeklyBibleReading, " ");
  }
}
function ProgramWeekComponent_Conditional_2_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " | LECTURA SEMANAL DE LA BIBLIA ");
  }
}
function ProgramWeekComponent_Conditional_2_Conditional_40_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 34);
    \u0275\u0275text(1, "Presidente:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 35)(3, "span", 36);
    \u0275\u0275listener("click", function ProgramWeekComponent_Conditional_2_Conditional_40_Template_span_click_3_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onProgramChange(ctx_r0.assignmentType.PRESIDENT));
    });
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngStyle", ctx_r0.getPublisherAlertStyle(ctx_r0.semana.president))("ngbTooltip", ctx_r0.getPublisherAlertText(ctx_r0.semana.president));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.semana.president ? ctx_r0.semana.president.fullName : ctx_r0.porAsignar, " ");
  }
}
function ProgramWeekComponent_Conditional_2_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 22);
    \u0275\u0275element(1, "div", 37);
    \u0275\u0275elementStart(2, "div", 38);
    \u0275\u0275text(3, "Consejero de la sala auxiliar:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 35)(5, "span", 39);
    \u0275\u0275listener("click", function ProgramWeekComponent_Conditional_2_Conditional_41_Template_span_click_5_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onProgramChange(ctx_r0.assignmentType.ASSISTANT_ADVISER));
    });
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngStyle", ctx_r0.getPublisherAlertStyle(ctx_r0.semana.assistantAdviser))("ngbTooltip", ctx_r0.getPublisherAlertText(ctx_r0.semana.assistantAdviser))("placement", ctx_r0.publisherTooltipPlacement);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.semana.assistantAdviser ? ctx_r0.semana.assistantAdviser.fullName : ctx_r0.porAsignar, " ");
  }
}
function ProgramWeekComponent_Conditional_2_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 25)(1, "div", 40);
    \u0275\u0275element(2, "span", 41);
    \u0275\u0275elementStart(3, "span", 42);
    \u0275\u0275listener("click", function ProgramWeekComponent_Conditional_2_Conditional_42_Template_span_click_3_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onProgramChange(ctx_r0.programChangeType.START_TIME_OPENING_SONG));
    });
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 43);
    \u0275\u0275listener("click", function ProgramWeekComponent_Conditional_2_Conditional_42_Template_span_click_5_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onProgramChange(ctx_r0.programChangeType.OPENING_SONG));
    });
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 43);
    \u0275\u0275listener("click", function ProgramWeekComponent_Conditional_2_Conditional_42_Template_span_click_7_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onProgramChange(ctx_r0.programChangeType.OPENING_SONG));
    });
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 34);
    \u0275\u0275text(10, "Oraci\xF3n:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 35)(12, "span", 39);
    \u0275\u0275listener("click", function ProgramWeekComponent_Conditional_2_Conditional_42_Template_span_click_12_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onProgramChange(ctx_r0.assignmentType.OPENING_PRAYER));
    });
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_4_0;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.adapterTime(ctx_r0.semana.startTimeOpeningSong), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" Canci\xF3n ", (tmp_4_0 = ctx_r0.semana.meeting.initialSong == null ? null : ctx_r0.semana.meeting.initialSong.songNumber) !== null && tmp_4_0 !== void 0 ? tmp_4_0 : ctx_r0.semana.meeting.openingSong, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", ctx_r0.semana.meeting.initialSong == null ? null : ctx_r0.semana.meeting.initialSong.title, " ", ctx_r0.semana.meeting.initialSong == null ? null : ctx_r0.semana.meeting.initialSong.source, " ");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngStyle", ctx_r0.getPublisherAlertStyle(ctx_r0.semana.openingPrayer))("ngbTooltip", ctx_r0.getPublisherAlertText(ctx_r0.semana.openingPrayer))("placement", ctx_r0.publisherTooltipPlacement);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.semana.openingPrayer ? ctx_r0.semana.openingPrayer.fullName : ctx_r0.porAsignar, " ");
  }
}
function ProgramWeekComponent_Conditional_2_Conditional_43_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 26)(1, "div", 44);
    \u0275\u0275element(2, "span", 45);
    \u0275\u0275elementStart(3, "span", 42);
    \u0275\u0275listener("click", function ProgramWeekComponent_Conditional_2_Conditional_43_Template_span_click_3_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onProgramChange(ctx_r0.programChangeType.START_TIME_INTRO));
    });
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 46);
    \u0275\u0275listener("click", function ProgramWeekComponent_Conditional_2_Conditional_43_Template_span_click_5_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onProgramChange(ctx_r0.programChangeType.INTRO_TIME));
    });
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.adapterTime(ctx_r0.semana.startTimeIntro), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" Palabras de introducci\xF3n (", ctx_r0.semana.meeting.introTime + " " + ctx_r0.semana.meeting.timeType, ") ");
  }
}
function ProgramWeekComponent_Conditional_2_Conditional_46_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 52);
    \u0275\u0275listener("click", function ProgramWeekComponent_Conditional_2_Conditional_46_Conditional_8_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.addAssignment.emit({ program: ctx_r0.semana, sectionMeeting: ctx_r0.livingSection }));
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "edit");
    \u0275\u0275elementEnd()();
  }
}
function ProgramWeekComponent_Conditional_2_Conditional_46_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 25)(1, "div", 53)(2, "span", 42);
    \u0275\u0275listener("click", function ProgramWeekComponent_Conditional_2_Conditional_46_Conditional_9_Template_span_click_2_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.onProgramChange(ctx_r0.programChangeType.START_TIME_INTERMEDIATE_SONG));
    });
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 54);
    \u0275\u0275listener("click", function ProgramWeekComponent_Conditional_2_Conditional_46_Conditional_9_Template_span_click_4_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.onProgramChange(ctx_r0.programChangeType.INTERMEDIATE_SONG));
    });
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 43);
    \u0275\u0275listener("click", function ProgramWeekComponent_Conditional_2_Conditional_46_Conditional_9_Template_span_click_6_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.onProgramChange(ctx_r0.programChangeType.OPENING_SONG));
    });
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "vmc-program-assignment-section", 55);
    \u0275\u0275listener("weeklyProgramChange", function ProgramWeekComponent_Conditional_2_Conditional_46_Conditional_9_Template_vmc_program_assignment_section_weeklyProgramChange_8_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.onWeeklyProgramChange($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_5_0;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.adapterTime(ctx_r0.semana.startTimeIntermediateSong), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" Canci\xF3n ", (tmp_5_0 = ctx_r0.semana.meeting.middleSong == null ? null : ctx_r0.semana.meeting.middleSong.songNumber) !== null && tmp_5_0 !== void 0 ? tmp_5_0 : ctx_r0.semana.meeting.intermediateSong, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", ctx_r0.semana.meeting.middleSong == null ? null : ctx_r0.semana.meeting.middleSong.title, " ", ctx_r0.semana.meeting.middleSong == null ? null : ctx_r0.semana.meeting.middleSong.source, " ");
    \u0275\u0275advance();
    \u0275\u0275property("week", ctx_r0.semana)("sectionMeeting", ctx_r0.livingSection)("room", ctx_r0.room)("isAdmin", false)("porAsignar", ctx_r0.porAsignar)("renderFieldset", false);
  }
}
function ProgramWeekComponent_Conditional_2_Conditional_46_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "fieldset")(1, "legend", 47)(2, "span", 48);
    \u0275\u0275text(3, "NUESTRA VIDA CRISTIANA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 49)(5, "button", 50);
    \u0275\u0275listener("click", function ProgramWeekComponent_Conditional_2_Conditional_46_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.toggleSection(ctx_r0.livingSection));
    });
    \u0275\u0275elementStart(6, "mat-icon");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(8, ProgramWeekComponent_Conditional_2_Conditional_46_Conditional_8_Template, 3, 0, "button", 51);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(9, ProgramWeekComponent_Conditional_2_Conditional_46_Conditional_9_Template, 9, 10);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275attribute("aria-expanded", !ctx_r0.isSectionCollapsed(ctx_r0.livingSection));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.isSectionCollapsed(ctx_r0.livingSection) ? "expand_more" : "expand_less");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isAdmin ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r0.isSectionCollapsed(ctx_r0.livingSection) ? 9 : -1);
  }
}
function ProgramWeekComponent_Conditional_2_Conditional_47_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 25)(1, "div", 56);
    \u0275\u0275element(2, "span", 41);
    \u0275\u0275elementStart(3, "span", 42);
    \u0275\u0275listener("click", function ProgramWeekComponent_Conditional_2_Conditional_47_Template_span_click_3_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onProgramChange(ctx_r0.programChangeType.START_TIME_CONCLUSION_WORDS));
    });
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " Palabras de conclusi\xF3n ");
    \u0275\u0275elementEnd();
    \u0275\u0275element(6, "div", 57);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.adapterTime(ctx_r0.semana.startTimeConclusionWords), " ");
  }
}
function ProgramWeekComponent_Conditional_2_Conditional_48_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 25)(1, "div", 56);
    \u0275\u0275element(2, "span", 41);
    \u0275\u0275elementStart(3, "span", 42);
    \u0275\u0275listener("click", function ProgramWeekComponent_Conditional_2_Conditional_48_Template_span_click_3_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onProgramChange(ctx_r0.programChangeType.START_TIME_FINAL_SONG));
    });
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 54);
    \u0275\u0275listener("click", function ProgramWeekComponent_Conditional_2_Conditional_48_Template_span_click_5_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onProgramChange(ctx_r0.programChangeType.FINAL_SONG));
    });
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 43);
    \u0275\u0275listener("click", function ProgramWeekComponent_Conditional_2_Conditional_48_Template_span_click_7_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onProgramChange(ctx_r0.programChangeType.OPENING_SONG));
    });
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 34);
    \u0275\u0275text(10, "Oracion:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 58);
    \u0275\u0275listener("click", function ProgramWeekComponent_Conditional_2_Conditional_48_Template_div_click_11_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onProgramChange(ctx_r0.assignmentType.FINAL_PRAYER));
    });
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_4_0;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.adapterTime(ctx_r0.semana.startTimeFinalSong), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" Canci\xF3n ", (tmp_4_0 = ctx_r0.semana.meeting.lastSong == null ? null : ctx_r0.semana.meeting.lastSong.songNumber) !== null && tmp_4_0 !== void 0 ? tmp_4_0 : ctx_r0.semana.meeting.finalSong, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", ctx_r0.semana.meeting.lastSong == null ? null : ctx_r0.semana.meeting.lastSong.title, " ", ctx_r0.semana.meeting.lastSong == null ? null : ctx_r0.semana.meeting.lastSong.source, " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngStyle", ctx_r0.getPublisherAlertStyle(ctx_r0.semana.finalPrayer))("ngbTooltip", ctx_r0.getPublisherAlertText(ctx_r0.semana.finalPrayer))("placement", ctx_r0.publisherTooltipPlacement);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.semana.finalPrayer ? ctx_r0.semana.finalPrayer.fullName : ctx_r0.porAsignar, " ");
  }
}
function ProgramWeekComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275template(0, ProgramWeekComponent_Conditional_2_Conditional_0_Template, 11, 2, "div", 7);
    \u0275\u0275elementStart(1, "div", 8)(2, "div", 9)(3, "div", 10);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 11)(6, "div", 12);
    \u0275\u0275text(7, "Programa para la reuni\xF3n de entre semana");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 13)(9, "div", 14)(10, "a", 15);
    \u0275\u0275listener("click", function ProgramWeekComponent_Conditional_2_Template_a_click_10_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.openFilters.emit());
    });
    \u0275\u0275elementStart(11, "mat-icon", 16);
    \u0275\u0275text(12, "calendar_month");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "mat-icon", 17);
    \u0275\u0275text(14, "search");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "a", 18);
    \u0275\u0275listener("click", function ProgramWeekComponent_Conditional_2_Template_a_click_15_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.printAssignments.emit(ctx_r0.semana));
    });
    \u0275\u0275elementStart(16, "mat-icon", 16);
    \u0275\u0275text(17, "assignment_turned_in");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "button", 19)(19, "mat-icon", 16);
    \u0275\u0275text(20, "printer_outline");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "mat-menu", null, 0)(23, "button", 20);
    \u0275\u0275listener("click", function ProgramWeekComponent_Conditional_2_Template_button_click_23_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.print.emit({ program: ctx_r0.semana, orientation: "normal" }));
    });
    \u0275\u0275elementStart(24, "mat-icon");
    \u0275\u0275text(25, "crop_portrait");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "span");
    \u0275\u0275text(27, "Normal");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "button", 20);
    \u0275\u0275listener("click", function ProgramWeekComponent_Conditional_2_Template_button_click_28_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.print.emit({ program: ctx_r0.semana, orientation: "landscape" }));
    });
    \u0275\u0275elementStart(29, "mat-icon");
    \u0275\u0275text(30, "crop_landscape");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "span");
    \u0275\u0275text(32, "Landscape");
    \u0275\u0275elementEnd()()()()()();
    \u0275\u0275elementStart(33, "div", 21)(34, "div", 22)(35, "div", 23)(36, "a", 24);
    \u0275\u0275text(37);
    \u0275\u0275elementEnd();
    \u0275\u0275template(38, ProgramWeekComponent_Conditional_2_Conditional_38_Template, 1, 1)(39, ProgramWeekComponent_Conditional_2_Conditional_39_Template, 1, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275template(40, ProgramWeekComponent_Conditional_2_Conditional_40_Template, 5, 3);
    \u0275\u0275elementEnd();
    \u0275\u0275template(41, ProgramWeekComponent_Conditional_2_Conditional_41_Template, 7, 4, "div", 22)(42, ProgramWeekComponent_Conditional_2_Conditional_42_Template, 14, 8, "div", 25)(43, ProgramWeekComponent_Conditional_2_Conditional_43_Template, 7, 2, "div", 26);
    \u0275\u0275elementStart(44, "vmc-program-assignment-section", 27);
    \u0275\u0275listener("addAssignment", function ProgramWeekComponent_Conditional_2_Template_vmc_program_assignment_section_addAssignment_44_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onAddAssignment($event));
    })("weeklyProgramChange", function ProgramWeekComponent_Conditional_2_Template_vmc_program_assignment_section_weeklyProgramChange_44_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onWeeklyProgramChange($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "vmc-program-assignment-section", 28);
    \u0275\u0275listener("addAssignment", function ProgramWeekComponent_Conditional_2_Template_vmc_program_assignment_section_addAssignment_45_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onAddAssignment($event));
    })("weeklyProgramChange", function ProgramWeekComponent_Conditional_2_Template_vmc_program_assignment_section_weeklyProgramChange_45_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onWeeklyProgramChange($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(46, ProgramWeekComponent_Conditional_2_Conditional_46_Template, 10, 4, "fieldset")(47, ProgramWeekComponent_Conditional_2_Conditional_47_Template, 7, 1, "div", 25)(48, ProgramWeekComponent_Conditional_2_Conditional_48_Template, 13, 8, "div", 25);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const printOptions_r12 = \u0275\u0275reference(22);
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r0.isSpecialEventWeek ? 0 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.semana.congregation.name, " ");
    \u0275\u0275advance(14);
    \u0275\u0275property("matMenuTriggerFor", printOptions_r12);
    \u0275\u0275advance(18);
    \u0275\u0275propertyInterpolate("href", ctx_r0.semana.meeting.url, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.showDayOfMeeting(ctx_r0.semana.meeting.week), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.semana.meeting.weeklyBibleReading ? 38 : 39);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.roomA ? 40 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.roomA ? 41 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.roomA ? 42 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.roomA ? 43 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("week", ctx_r0.semana)("sectionMeeting", ctx_r0.treasuresSection)("room", ctx_r0.room)("isAdmin", ctx_r0.isAdmin)("porAsignar", ctx_r0.porAsignar);
    \u0275\u0275advance();
    \u0275\u0275property("week", ctx_r0.semana)("sectionMeeting", ctx_r0.teachersSection)("room", ctx_r0.room)("isAdmin", ctx_r0.isAdmin)("porAsignar", ctx_r0.porAsignar);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.roomA ? 46 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.roomA ? 47 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.roomA ? 48 : -1);
  }
}
var ProgramWeekComponent = class _ProgramWeekComponent {
  constructor() {
    this.programValidations = inject(ProgramValidationsService);
    this.roomA = false;
    this.room = MeetingRoom.MAIN;
    this.isAdmin = false;
    this.porAsignar = "por asignar";
    this.meetingDay = 1;
    this.print = new EventEmitter();
    this.printAssignments = new EventEmitter();
    this.openFilters = new EventEmitter();
    this.programChange = new EventEmitter();
    this.weeklyProgramChange = new EventEmitter();
    this.addAssignment = new EventEmitter();
    this.assignmentType = AssignmentType;
    this.programChangeType = ProgramChangeType;
    this.treasuresSection = SectionMeeting.TESOROS_DE_LA_BIBLIA;
    this.teachersSection = SectionMeeting.SEAMOS_MEJORES_MAESTROS;
    this.livingSection = SectionMeeting.NUESTRA_VIDA_CRISTIANA;
    this.publisherTooltipPlacement = "top";
    this.collapsedSectionKeys = /* @__PURE__ */ new Set();
  }
  showDayOfMeeting(fechaSemana) {
    return Utils.showDayOfMeeting(fechaSemana, this.meetingDay, false, this.semana?.event);
  }
  get isAssemblyWeek() {
    return isAssemblyEvent(this.semana?.event);
  }
  get isSpecialEventWeek() {
    return isSpecialEventWeek(this.semana?.event);
  }
  adapterTime(dateTime) {
    return Utils.adapterTime(dateTime);
  }
  onProgramChange(type) {
    this.programChange.emit({ program: this.semana, type });
  }
  onWeeklyProgramChange(event) {
    this.weeklyProgramChange.emit(event);
  }
  onAddAssignment(event) {
    this.addAssignment.emit(event);
  }
  toggleSection(sectionMeeting) {
    if (this.collapsedSectionKeys.has(sectionMeeting)) {
      this.collapsedSectionKeys.delete(sectionMeeting);
      return;
    }
    this.collapsedSectionKeys.add(sectionMeeting);
  }
  isSectionCollapsed(sectionMeeting) {
    return this.collapsedSectionKeys.has(sectionMeeting);
  }
  getPublisherAlertText(publisher) {
    return getPublisherAlertText(this.programValidations.validationsFor(this.semana.id, publisher?.id));
  }
  getPublisherAlertStyle(publisher) {
    return getPublisherAlertStyle(publisher, this.programValidations.validationsFor(this.semana.id, publisher?.id));
  }
  static {
    this.\u0275fac = function ProgramWeekComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ProgramWeekComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProgramWeekComponent, selectors: [["vmc-program-week"]], inputs: { semana: "semana", roomA: "roomA", room: "room", isAdmin: "isAdmin", porAsignar: "porAsignar", meetingDay: "meetingDay" }, outputs: { print: "print", printAssignments: "printAssignments", openFilters: "openFilters", programChange: "programChange", weeklyProgramChange: "weeklyProgramChange", addAssignment: "addAssignment" }, decls: 3, vars: 4, consts: [["printOptions", "matMenu"], [1, "container-fluid", "p-0", "program__body", "pb-4", "pt-1", "mb-4", "shadow-page"], [1, "program-event-shell"], [1, "program-event-card"], [1, "program-event-card__content"], [1, "program-event-card__eyebrow"], ["aria-hidden", "true"], [1, "program-special-banner"], [1, "row", "program__header", "text-center", "text-md-start"], [1, "col-md-3", "h3", "d-none", "d-xl-inline"], [1, "program__congregacion", "ps-3", "pt-md-2"], [1, "col-md-7", "d-none", "d-xl-inline", "h2", "text-center", "text-md-end", "pe-md-5"], [1, "program__title", "pt-2"], [1, "col-12", "col-md-12", "col-xl-2", "d-flex", "justify-content-end", "pe-5", "py-2"], [1, "d-flex", "justify-content-end"], [1, "me-2", "program-filter-icon", 3, "click"], [1, "icon-lg", "hover"], [1, "program-filter-icon__search", "hover"], [1, "me-2", 3, "click"], ["type", "button", "aria-label", "Imprimir programa", 1, "program-print-trigger", 3, "matMenuTriggerFor"], ["mat-menu-item", "", "type", "button", 3, "click"], [1, "mt-3", "program__reunion", "pe-xl-4"], [1, "row", "px-3"], [1, "col-md-7", "fw-bold", "text-md-start"], ["target", "_blank", 3, "href"], [1, "row", "px-3", "program-line"], [1, "row", "px-3", "program__tesoros", "program-line"], ["title", "TESOROS DE LA BIBLIA", "legendClass", "program__title-tesoros", 3, "addAssignment", "weeklyProgramChange", "week", "sectionMeeting", "room", "isAdmin", "porAsignar"], ["title", "SEAMOS MEJORES MAESTROS", "legendClass", "program__title-maestros", 3, "addAssignment", "weeklyProgramChange", "week", "sectionMeeting", "room", "isAdmin", "porAsignar"], ["aria-hidden", "true", 1, "program-special-banner__glow"], ["aria-hidden", "true", 1, "program-special-banner__icon"], [1, "program-special-banner__text"], [1, "program-special-banner__eyebrow"], [1, "program-special-banner__date"], [1, "col-md-2", "text-md-end", "text-title-custom"], [1, "col-md-3", "text-md-start", "hover", "text-publisher"], ["placement", "end", "container", "body", "tooltipClass", "tooltip-publisher-alert", 3, "click", "ngStyle", "ngbTooltip"], [1, "col-md-6"], [1, "col-md-3", "text-md-end", "text-title-custom"], ["container", "body", "tooltipClass", "tooltip-publisher-alert", 3, "click", "ngStyle", "ngbTooltip", "placement"], [1, "col-md-7", "ps-2", "ps-xl-3", "text-md-start"], [1, "ms-md-1"], [1, "program-time-start", "hover", 3, "click"], [1, "ms-md-2", "fw-bold", "hover", 3, "click"], [1, "col-md-12", "ps-xl-3", "text-md-start"], [1, "ms-xl-1"], [1, "hover", "ps-2", 3, "click"], [1, "program__title-vida", "program-section-legend", "my-md-2"], [1, "section-title-text"], [1, "section-actions"], ["type", "button", "aria-label", "Colapsar seccion", 1, "section-action-button", 3, "click"], ["type", "button", "aria-label", "Editar seccion", 1, "section-action-button"], ["type", "button", "aria-label", "Editar seccion", 1, "section-action-button", 3, "click"], [1, "col-md-12", "mt-1"], [1, "fw-bold", "hover", 3, "click"], ["title", "", "legendClass", "", 3, "weeklyProgramChange", "week", "sectionMeeting", "room", "isAdmin", "porAsignar", "renderFieldset"], [1, "col-md-7", "mt-1"], [1, "col-md-2", "mt-1", "text-end", "text-title-custom"], ["container", "body", "tooltipClass", "tooltip-publisher-alert", 1, "col-md-3", "hover", "text-publisher", 3, "click", "ngStyle", "ngbTooltip", "placement"]], template: function ProgramWeekComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 1);
        \u0275\u0275template(1, ProgramWeekComponent_Conditional_1_Template, 13, 4, "div", 2)(2, ProgramWeekComponent_Conditional_2_Template, 49, 23);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275classProp("program__body--special", ctx.isSpecialEventWeek);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.isAssemblyWeek ? 1 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(!ctx.isAssemblyWeek ? 2 : -1);
      }
    }, dependencies: [CommonModule, NgStyle, UpperCasePipe, SharedModule, MatIcon, MatMenu, MatMenuItem, MatMenuTrigger, NgbTooltipModule, NgbTooltip, ProgramAssignmentSectionComponent], styles: ['\n\n[_nghost-%COMP%] {\n  display: block;\n}\n.program-print-trigger[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0;\n  border: 0;\n  background: transparent;\n  color: inherit;\n}\n.program__body[_ngcontent-%COMP%] {\n  background-color: white;\n}\n.program__body--special[_ngcontent-%COMP%] {\n  position: relative;\n  box-shadow: 0 0 0 1px rgba(234, 138, 0, 0.28), 0 10px 30px rgba(234, 138, 0, 0.14);\n}\n.program__body--special[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  inset: 0 auto 0 0;\n  width: 3px;\n  border-radius: 3px;\n  background:\n    linear-gradient(\n      180deg,\n      #f7a13b,\n      #e07a12);\n}\n.program-special-banner[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin: 10px 14px 0;\n  padding: 12px 16px;\n  overflow: hidden;\n  border: 1px solid rgba(224, 122, 18, 0.24);\n  border-radius: 12px;\n  background:\n    linear-gradient(\n      135deg,\n      #fff7ec 0%,\n      #fdefdc 100%);\n  color: #7a4306;\n}\n.program-special-banner__glow[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -60%;\n  right: -40px;\n  width: 180px;\n  height: 180px;\n  border-radius: 50%;\n  background:\n    radial-gradient(\n      circle,\n      rgba(247, 161, 59, 0.28) 0%,\n      rgba(247, 161, 59, 0) 70%);\n  pointer-events: none;\n}\n.program-special-banner__icon[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  color: #e07a12;\n}\n.program-special-banner__text[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n  line-height: 1.25;\n}\n.program-special-banner__eyebrow[_ngcontent-%COMP%] {\n  font-size: 0.68rem;\n  font-weight: 600;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n  opacity: 0.75;\n}\n.program-special-banner__text[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.program-special-banner__date[_ngcontent-%COMP%] {\n  margin-left: auto;\n  font-size: 0.78rem;\n  font-weight: 600;\n  white-space: nowrap;\n  opacity: 0.8;\n}\n@media (max-width: 767px) {\n  .program-special-banner[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n  .program-special-banner__date[_ngcontent-%COMP%] {\n    margin-left: 0;\n    width: 100%;\n  }\n}\n.program__header[_ngcontent-%COMP%] {\n  padding: 10px 0 0 0;\n  border-top: none;\n  border-bottom-style: double;\n  width: 100%;\n}\nlegend[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  margin-bottom: -2px;\n  color: white;\n  width: 100%;\n  height: 40px;\n  line-height: 40px;\n  padding-left: 10px;\n  position: relative;\n}\n.program__title-vida[_ngcontent-%COMP%] {\n  background-color: #7a0026;\n}\n.text-title-custom[_ngcontent-%COMP%] {\n  font-size: 10px;\n  font-weight: bold;\n  line-height: 20px;\n}\n.hover[_ngcontent-%COMP%]:hover {\n  cursor: pointer;\n}\n.text-publisher[_ngcontent-%COMP%] {\n  font-size: 13px;\n}\n.program-line[_ngcontent-%COMP%] {\n  align-items: flex-start;\n}\n.program-time-start[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 42px;\n  margin-right: 8px;\n  color: #455a64;\n  font-size: 0.78rem;\n  font-weight: 700;\n  line-height: 1.4;\n  white-space: nowrap;\n}\n.icon-lg[_ngcontent-%COMP%] {\n  color: rgb(124, 123, 123);\n  font-size: 42px;\n  height: 42px;\n  width: 42px;\n}\n.program-filter-icon[_ngcontent-%COMP%] {\n  display: inline-flex;\n  height: 42px;\n  position: relative;\n  width: 42px;\n}\n.program-filter-icon__search[_ngcontent-%COMP%] {\n  background-color: white;\n  border-radius: 50%;\n  bottom: 0;\n  color: rgb(124, 123, 123);\n  font-size: 20px;\n  height: 20px;\n  line-height: 20px;\n  position: absolute;\n  right: 0;\n  width: 20px;\n}\n@media (max-width: 767.98px) {\n  .program__reunion[_ngcontent-%COMP%] {\n    font-size: 0.92rem;\n  }\n  .program-line[_ngcontent-%COMP%]    > [class*=col-][_ngcontent-%COMP%] {\n    min-width: 0;\n  }\n  .program-time-start[_ngcontent-%COMP%] {\n    min-width: 38px;\n    margin-right: 6px;\n    font-size: 0.74rem;\n    vertical-align: text-top;\n  }\n  .text-title-custom[_ngcontent-%COMP%] {\n    text-align: start;\n  }\n  .text-publisher[_ngcontent-%COMP%] {\n    display: inline-block;\n    margin-bottom: 8px;\n  }\n}\n@media (min-width: 1366px) {\n  .program__header[_ngcontent-%COMP%] {\n    width: 100%;\n    padding: 0 0 0 0;\n    border-top: none;\n    border-bottom-style: double;\n  }\n  legend[_ngcontent-%COMP%] {\n    font-size: 1rem;\n    margin-bottom: -2px;\n    color: white;\n    width: 44vw;\n    height: 35px;\n    padding-left: 10px;\n    position: relative;\n    line-height: 35px;\n  }\n}\n@media (min-width: 1600px) {\n  legend[_ngcontent-%COMP%] {\n    font-size: 1rem;\n    margin-bottom: -2px;\n    color: white;\n    width: 39vw;\n    padding-left: 10px;\n    position: relative;\n  }\n}\n/*# sourceMappingURL=program-week.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProgramWeekComponent, [{
    type: Component,
    args: [{ selector: "vmc-program-week", imports: [CommonModule, SharedModule, NgbTooltipModule, ProgramAssignmentSectionComponent], template: `<div class="container-fluid p-0 program__body pb-4 pt-1 mb-4 shadow-page"
  [class.program__body--special]="isSpecialEventWeek">
  @if (isAssemblyWeek) {
  <div class="program-event-shell">
    <article class="program-event-card">
      <div class="program-event-card__content">
        <span class="program-event-card__eyebrow">Evento especial</span>
        <h2>{{ semana.event | uppercase }}</h2>
        <p>
          <mat-icon aria-hidden="true">event</mat-icon>
          <span>{{ showDayOfMeeting(semana.meeting.week) }}</span>
        </p>
      </div>
    </article>
  </div>
  }

  @if (!isAssemblyWeek) {
  @if (isSpecialEventWeek) {
  <div class="program-special-banner">
    <span class="program-special-banner__glow" aria-hidden="true"></span>
    <mat-icon class="program-special-banner__icon" aria-hidden="true">auto_awesome</mat-icon>
    <div class="program-special-banner__text">
      <span class="program-special-banner__eyebrow">Semana especial</span>
      <strong>{{ semana.event }}</strong>
    </div>
    <span class="program-special-banner__date">{{ showDayOfMeeting(semana.meeting.week) }}</span>
  </div>
  }

  <div class="row program__header text-center text-md-start">
    <div class="col-md-3 h3 d-none d-xl-inline">
      <div class="program__congregacion ps-3 pt-md-2">
        {{ semana.congregation.name }}
      </div>
    </div>
    <div class="col-md-7 d-none d-xl-inline h2 text-center text-md-end pe-md-5">
      <div class="program__title pt-2">Programa para la reuni\xF3n de entre semana</div>
    </div>
    <div class="col-12 col-md-12 col-xl-2 d-flex justify-content-end pe-5 py-2">
      <div class="d-flex justify-content-end">
        <a class="me-2 program-filter-icon" (click)="openFilters.emit()">
          <mat-icon class="icon-lg hover">calendar_month</mat-icon>
          <mat-icon class="program-filter-icon__search hover">search</mat-icon>
        </a>
        <a class="me-2" (click)="printAssignments.emit(semana)">
          <mat-icon class="icon-lg hover">assignment_turned_in</mat-icon>
        </a>
        <button
          type="button"
          class="program-print-trigger"
          [matMenuTriggerFor]="printOptions"
          aria-label="Imprimir programa"
        >
          <mat-icon class="icon-lg hover">printer_outline</mat-icon>
        </button>
        <mat-menu #printOptions="matMenu">
          <button mat-menu-item type="button" (click)="print.emit({ program: semana, orientation: 'normal' })">
            <mat-icon>crop_portrait</mat-icon>
            <span>Normal</span>
          </button>
          <button mat-menu-item type="button" (click)="print.emit({ program: semana, orientation: 'landscape' })">
            <mat-icon>crop_landscape</mat-icon>
            <span>Landscape</span>
          </button>
        </mat-menu>
      </div>
    </div>
  </div>

  <div class="mt-3 program__reunion pe-xl-4">
    <div class="row px-3">
      <div class="col-md-7 fw-bold text-md-start">
        <a href="{{ semana.meeting.url }}" target="_blank">
          {{ showDayOfMeeting(semana.meeting.week) }}
        </a>
        @if (semana.meeting.weeklyBibleReading) {
        |
        {{ semana.meeting.weeklyBibleReading }}
        } @else {
        | LECTURA SEMANAL DE LA BIBLIA
        }
      </div>

      @if (roomA) {
      <div class="col-md-2 text-md-end text-title-custom">Presidente:</div>
      <div class="col-md-3 text-md-start hover text-publisher">
        <span (click)="onProgramChange(assignmentType.PRESIDENT)" [ngStyle]="getPublisherAlertStyle(semana.president)"
          [ngbTooltip]="getPublisherAlertText(semana.president)"
          placement="end" container="body"
          tooltipClass="tooltip-publisher-alert">
          {{ semana.president ? semana.president.fullName : porAsignar }}
        </span>
      </div>
      }
    </div>

    @if (roomA) {
    <div class="row px-3">
      <div class="col-md-6"></div>
      <div class="col-md-3 text-md-end text-title-custom">Consejero de la sala auxiliar:</div>
      <div class="col-md-3 text-md-start hover text-publisher">
        <span (click)="onProgramChange(assignmentType.ASSISTANT_ADVISER)"
          [ngStyle]="getPublisherAlertStyle(semana.assistantAdviser)"
          [ngbTooltip]="getPublisherAlertText(semana.assistantAdviser)" [placement]="publisherTooltipPlacement"
          container="body" tooltipClass="tooltip-publisher-alert">
          {{ semana.assistantAdviser ? semana.assistantAdviser.fullName : porAsignar }}
        </span>
      </div>
    </div>
    }

    @if (roomA) {
    <div class="row px-3 program-line">
      <div class="col-md-7 ps-2 ps-xl-3 text-md-start">
        <span class="ms-md-1"></span>
        <span class="program-time-start hover" (click)="onProgramChange(programChangeType.START_TIME_OPENING_SONG)">
          {{ adapterTime(semana.startTimeOpeningSong) }}
        </span>
        <span class="ms-md-2 fw-bold hover" (click)="onProgramChange(programChangeType.OPENING_SONG)">
          Canci\xF3n {{ semana.meeting.initialSong?.songNumber ?? semana.meeting.openingSong }}
        </span>
        <span class="ms-md-2 fw-bold hover" (click)="onProgramChange(programChangeType.OPENING_SONG)">
          {{ semana.meeting.initialSong?.title }} {{ semana.meeting.initialSong?.source }}
        </span>
      </div>
      <div class="col-md-2 text-md-end text-title-custom">Oraci\xF3n:</div>
      <div class="col-md-3 text-md-start hover text-publisher">
        <span (click)="onProgramChange(assignmentType.OPENING_PRAYER)"
          [ngStyle]="getPublisherAlertStyle(semana.openingPrayer)"
          [ngbTooltip]="getPublisherAlertText(semana.openingPrayer)" [placement]="publisherTooltipPlacement"
          container="body" tooltipClass="tooltip-publisher-alert">
          {{ semana.openingPrayer ? semana.openingPrayer.fullName : porAsignar }}
        </span>
      </div>
    </div>
    }

    @if (roomA) {
    <div class="row px-3 program__tesoros program-line">
      <div class="col-md-12 ps-xl-3 text-md-start">
        <span class="ms-xl-1"></span>
        <span class="program-time-start hover" (click)="onProgramChange(programChangeType.START_TIME_INTRO)">
          {{ adapterTime(semana.startTimeIntro) }}
        </span>
        <span class="hover ps-2" (click)="onProgramChange(programChangeType.INTRO_TIME)">
          Palabras de introducci\xF3n ({{ semana.meeting.introTime + " " + semana.meeting.timeType }})
        </span>
      </div>
    </div>
    }

    <vmc-program-assignment-section [week]="semana" [sectionMeeting]="treasuresSection" title="TESOROS DE LA BIBLIA"
      legendClass="program__title-tesoros" [room]="room" [isAdmin]="isAdmin" [porAsignar]="porAsignar"
      (addAssignment)="onAddAssignment($event)"
      (weeklyProgramChange)="onWeeklyProgramChange($event)"></vmc-program-assignment-section>

    <vmc-program-assignment-section [week]="semana" [sectionMeeting]="teachersSection" title="SEAMOS MEJORES MAESTROS"
      legendClass="program__title-maestros" [room]="room" [isAdmin]="isAdmin" [porAsignar]="porAsignar"
      (addAssignment)="onAddAssignment($event)"
      (weeklyProgramChange)="onWeeklyProgramChange($event)"></vmc-program-assignment-section>

    @if (roomA) {
    <fieldset>
      <legend class="program__title-vida program-section-legend my-md-2">
        <span class="section-title-text">NUESTRA VIDA CRISTIANA</span>
        <span class="section-actions">
          <button class="section-action-button" type="button" [attr.aria-expanded]="!isSectionCollapsed(livingSection)"
            aria-label="Colapsar seccion" (click)="toggleSection(livingSection)">
            <mat-icon>{{ isSectionCollapsed(livingSection) ? "expand_more" : "expand_less" }}</mat-icon>
          </button>
          @if (isAdmin) {
          <button class="section-action-button" type="button" aria-label="Editar seccion"
            (click)="addAssignment.emit({ program: semana, sectionMeeting: livingSection })">
            <mat-icon>edit</mat-icon>
          </button>
          }
        </span>
      </legend>
      @if (!isSectionCollapsed(livingSection)) {
      <div class="row px-3 program-line">
        <div class="col-md-12 mt-1">
          <span class="program-time-start hover"
            (click)="onProgramChange(programChangeType.START_TIME_INTERMEDIATE_SONG)">
            {{ adapterTime(semana.startTimeIntermediateSong) }}
          </span>
          <span class="fw-bold hover" (click)="onProgramChange(programChangeType.INTERMEDIATE_SONG)">
            Canci\xF3n {{ semana.meeting.middleSong?.songNumber ?? semana.meeting.intermediateSong }}
          </span>
          <span class="ms-md-2 fw-bold hover" (click)="onProgramChange(programChangeType.OPENING_SONG)">
            {{ semana.meeting.middleSong?.title }} {{ semana.meeting.middleSong?.source }}
          </span>
        </div>
      </div>

      <vmc-program-assignment-section [week]="semana" [sectionMeeting]="livingSection" title="" legendClass=""
        [room]="room" [isAdmin]="false" [porAsignar]="porAsignar" [renderFieldset]="false"
        (weeklyProgramChange)="onWeeklyProgramChange($event)"></vmc-program-assignment-section>
      }
    </fieldset>
    }

    @if (roomA) {
    <div class="row px-3 program-line">
      <div class="col-md-7 mt-1">
        <span class="ms-md-1"></span>
        <span class="program-time-start hover" (click)="onProgramChange(programChangeType.START_TIME_CONCLUSION_WORDS)">
          {{ adapterTime(semana.startTimeConclusionWords) }}
        </span>
        Palabras de conclusi\xF3n
      </div>
      <div class="col-md-2 mt-1 text-end text-title-custom"></div>
    </div>
    }

    @if (roomA) {
    <div class="row px-3 program-line">
      <div class="col-md-7 mt-1">
        <span class="ms-md-1"></span>
        <span class="program-time-start hover" (click)="onProgramChange(programChangeType.START_TIME_FINAL_SONG)">
          {{ adapterTime(semana.startTimeFinalSong) }}
        </span>
        <span class="fw-bold hover" (click)="onProgramChange(programChangeType.FINAL_SONG)">
          Canci\xF3n {{ semana.meeting.lastSong?.songNumber ?? semana.meeting.finalSong }}
        </span>
        <span class="ms-md-2 fw-bold hover" (click)="onProgramChange(programChangeType.OPENING_SONG)">
          {{ semana.meeting.lastSong?.title }} {{ semana.meeting.lastSong?.source }}
        </span>
      </div>
      <div class="col-md-2 text-md-end text-title-custom">Oracion:</div>
      <div class="col-md-3 hover text-publisher" (click)="onProgramChange(assignmentType.FINAL_PRAYER)"
        [ngStyle]="getPublisherAlertStyle(semana.finalPrayer)" [ngbTooltip]="getPublisherAlertText(semana.finalPrayer)"
        [placement]="publisherTooltipPlacement" container="body"
        tooltipClass="tooltip-publisher-alert">
        {{ semana.finalPrayer ? semana.finalPrayer.fullName : porAsignar }}
      </div>
    </div>
    }
  </div>
  }
</div>
`, styles: ['/* src/app/pages/entre-semana/components/programs/components/program-week/program-week.component.scss */\n:host {\n  display: block;\n}\n.program-print-trigger {\n  display: inline-flex;\n  align-items: center;\n  padding: 0;\n  border: 0;\n  background: transparent;\n  color: inherit;\n}\n.program__body {\n  background-color: white;\n}\n.program__body--special {\n  position: relative;\n  box-shadow: 0 0 0 1px rgba(234, 138, 0, 0.28), 0 10px 30px rgba(234, 138, 0, 0.14);\n}\n.program__body--special::before {\n  content: "";\n  position: absolute;\n  inset: 0 auto 0 0;\n  width: 3px;\n  border-radius: 3px;\n  background:\n    linear-gradient(\n      180deg,\n      #f7a13b,\n      #e07a12);\n}\n.program-special-banner {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin: 10px 14px 0;\n  padding: 12px 16px;\n  overflow: hidden;\n  border: 1px solid rgba(224, 122, 18, 0.24);\n  border-radius: 12px;\n  background:\n    linear-gradient(\n      135deg,\n      #fff7ec 0%,\n      #fdefdc 100%);\n  color: #7a4306;\n}\n.program-special-banner__glow {\n  position: absolute;\n  top: -60%;\n  right: -40px;\n  width: 180px;\n  height: 180px;\n  border-radius: 50%;\n  background:\n    radial-gradient(\n      circle,\n      rgba(247, 161, 59, 0.28) 0%,\n      rgba(247, 161, 59, 0) 70%);\n  pointer-events: none;\n}\n.program-special-banner__icon {\n  flex: 0 0 auto;\n  color: #e07a12;\n}\n.program-special-banner__text {\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n  line-height: 1.25;\n}\n.program-special-banner__eyebrow {\n  font-size: 0.68rem;\n  font-weight: 600;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n  opacity: 0.75;\n}\n.program-special-banner__text strong {\n  font-size: 1rem;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.program-special-banner__date {\n  margin-left: auto;\n  font-size: 0.78rem;\n  font-weight: 600;\n  white-space: nowrap;\n  opacity: 0.8;\n}\n@media (max-width: 767px) {\n  .program-special-banner {\n    flex-wrap: wrap;\n  }\n  .program-special-banner__date {\n    margin-left: 0;\n    width: 100%;\n  }\n}\n.program__header {\n  padding: 10px 0 0 0;\n  border-top: none;\n  border-bottom-style: double;\n  width: 100%;\n}\nlegend {\n  font-size: 0.8rem;\n  margin-bottom: -2px;\n  color: white;\n  width: 100%;\n  height: 40px;\n  line-height: 40px;\n  padding-left: 10px;\n  position: relative;\n}\n.program__title-vida {\n  background-color: #7a0026;\n}\n.text-title-custom {\n  font-size: 10px;\n  font-weight: bold;\n  line-height: 20px;\n}\n.hover:hover {\n  cursor: pointer;\n}\n.text-publisher {\n  font-size: 13px;\n}\n.program-line {\n  align-items: flex-start;\n}\n.program-time-start {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 42px;\n  margin-right: 8px;\n  color: #455a64;\n  font-size: 0.78rem;\n  font-weight: 700;\n  line-height: 1.4;\n  white-space: nowrap;\n}\n.icon-lg {\n  color: rgb(124, 123, 123);\n  font-size: 42px;\n  height: 42px;\n  width: 42px;\n}\n.program-filter-icon {\n  display: inline-flex;\n  height: 42px;\n  position: relative;\n  width: 42px;\n}\n.program-filter-icon__search {\n  background-color: white;\n  border-radius: 50%;\n  bottom: 0;\n  color: rgb(124, 123, 123);\n  font-size: 20px;\n  height: 20px;\n  line-height: 20px;\n  position: absolute;\n  right: 0;\n  width: 20px;\n}\n@media (max-width: 767.98px) {\n  .program__reunion {\n    font-size: 0.92rem;\n  }\n  .program-line > [class*=col-] {\n    min-width: 0;\n  }\n  .program-time-start {\n    min-width: 38px;\n    margin-right: 6px;\n    font-size: 0.74rem;\n    vertical-align: text-top;\n  }\n  .text-title-custom {\n    text-align: start;\n  }\n  .text-publisher {\n    display: inline-block;\n    margin-bottom: 8px;\n  }\n}\n@media (min-width: 1366px) {\n  .program__header {\n    width: 100%;\n    padding: 0 0 0 0;\n    border-top: none;\n    border-bottom-style: double;\n  }\n  legend {\n    font-size: 1rem;\n    margin-bottom: -2px;\n    color: white;\n    width: 44vw;\n    height: 35px;\n    padding-left: 10px;\n    position: relative;\n    line-height: 35px;\n  }\n}\n@media (min-width: 1600px) {\n  legend {\n    font-size: 1rem;\n    margin-bottom: -2px;\n    color: white;\n    width: 39vw;\n    padding-left: 10px;\n    position: relative;\n  }\n}\n/*# sourceMappingURL=program-week.component.css.map */\n'] }]
  }], null, { semana: [{
    type: Input
  }], roomA: [{
    type: Input
  }], room: [{
    type: Input
  }], isAdmin: [{
    type: Input
  }], porAsignar: [{
    type: Input
  }], meetingDay: [{
    type: Input
  }], print: [{
    type: Output
  }], printAssignments: [{
    type: Output
  }], openFilters: [{
    type: Output
  }], programChange: [{
    type: Output
  }], weeklyProgramChange: [{
    type: Output
  }], addAssignment: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProgramWeekComponent, { className: "ProgramWeekComponent", filePath: "src/app/pages/entre-semana/components/programs/components/program-week/program-week.component.ts", lineNumber: 26 });
})();

// src/app/pages/entre-semana/components/programs/programs.component.ts
var _forTrack02 = ($index, $item) => $item.id;
function ProgramsComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 5)(1, "div", 6)(2, "h5", 7);
    \u0275\u0275text(3, "Buscar programas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 8);
    \u0275\u0275listener("click", function ProgramsComponent_ng_template_0_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeFiltersModal());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 9)(6, "vmc-program-filters", 10);
    \u0275\u0275listener("filter", function ProgramsComponent_ng_template_0_Template_vmc_program_filters_filter_6_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onFiltersSelected($event));
    });
    \u0275\u0275elementEnd()()();
  }
}
function ProgramsComponent_For_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "vmc-program-week", 11);
    \u0275\u0275listener("print", function ProgramsComponent_For_6_Template_vmc_program_week_print_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.print($event.program, $event.orientation));
    })("printAssignments", function ProgramsComponent_For_6_Template_vmc_program_week_printAssignments_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.printAssig($event));
    })("openFilters", function ProgramsComponent_For_6_Template_vmc_program_week_openFilters_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      const filtersModal_r4 = \u0275\u0275reference(1);
      return \u0275\u0275resetView(ctx_r1.openFiltersModal(filtersModal_r4));
    })("programChange", function ProgramsComponent_For_6_Template_vmc_program_week_programChange_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.changeProgram($event.program, $event.type));
    })("weeklyProgramChange", function ProgramsComponent_For_6_Template_vmc_program_week_weeklyProgramChange_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.changeWeeklyProgram($event.item, $event.type));
    })("addAssignment", function ProgramsComponent_For_6_Template_vmc_program_week_addAssignment_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.addAssign($event.program, $event.sectionMeeting));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const semana_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("semana", semana_r5)("roomA", ctx_r1.RoomA)("room", ctx_r1.room)("isAdmin", ctx_r1.isAdmin)("porAsignar", ctx_r1.porAsignar)("meetingDay", ctx_r1.meetingDay);
  }
}
var ProgramsComponent = class _ProgramsComponent {
  constructor(meetingsService, modalService, dataService, weeklyProgramService, ngbModal) {
    this.meetingsService = meetingsService;
    this.modalService = modalService;
    this.dataService = dataService;
    this.weeklyProgramService = weeklyProgramService;
    this.ngbModal = ngbModal;
    this.filtrar = new EventEmitter();
    this.semanas = [];
    this.semanasAllRooms = [];
    this.RoomA = false;
    this.room = MeetingRoom.MAIN;
    this.porAsignar = "por asignar";
    this.isAdmin = false;
    this.congregation = CongregationMock;
    this.assignmentType = "";
    this.showSpinner = false;
    this.meetingDay = 1;
  }
  ngOnChanges(changes) {
    if (changes["semanas"]) {
      this.updateWeeksForPrint();
    }
  }
  ngOnInit() {
    this.dataService.getPublisher().subscribe((data) => {
      this.superintendente = data;
      this.isAdmin = data.email === ADMIN_EMAIL;
    });
    this.dataService.getCongregation$().subscribe((data) => {
      this.congregation = data;
      this.meetingDay = data.day;
    });
    this.updateWeeksForPrint();
  }
  updateWeeksForPrint() {
    this.semanasAllRooms = this.dataService.makePDfVersion(this.semanas);
  }
  showDayOfMeeting(fechaSemana) {
    return Utils.showDayOfMeeting(fechaSemana, this.meetingDay);
  }
  adapterTime(dateTime) {
    return Utils.adapterTime(dateTime);
  }
  saveWeeklyProgram(weeklyProgram) {
    return this.weeklyProgramService.upsertByTitle(this.mapWeeklyProgramUpsertByTitleRequest(weeklyProgram)).pipe(tap((savedPrograms) => {
      for (const saved of savedPrograms) {
        const program = this.semanas.find((week) => week.id === saved.program);
        const stored = program?.weeklyPrograms.find((row) => row.id === saved.id);
        if (stored) {
          Object.assign(stored, saved, { assignment: __spreadValues(__spreadValues({}, stored.assignment), saved.assignment) });
        } else if (program) {
          program.weeklyPrograms = [...program.weeklyPrograms, saved];
        }
      }
      this.updateWeeksForPrint();
    }));
  }
  updateWeeklyProgram(weeklyProgram) {
    if (weeklyProgram.id == null) {
      throw new Error("La asignaci\xF3n semanal no tiene id.");
    }
    const assignmentId$ = weeklyProgram.assignment?.id != null ? of(weeklyProgram.assignment.id) : this.weeklyProgramService.findById(weeklyProgram.id).pipe(map((stored) => {
      const assignmentId = stored.assignment?.id;
      if (assignmentId == null) {
        throw new Error("No se pudo obtener el assignmentId de la asignaci\xF3n semanal.");
      }
      return assignmentId;
    }));
    return assignmentId$.pipe(switchMap((assignmentId) => this.saveWeeklyProgramUpdate(weeklyProgram, assignmentId)));
  }
  saveWeeklyProgramUpdate(weeklyProgram, assignmentId) {
    const request = {
      id: weeklyProgram.id,
      assignmentId,
      responsibleId: weeklyProgram.responsible?.id ?? null,
      assistantId: weeklyProgram.assistant?.id ?? null,
      congregationId: weeklyProgram.congregation?.id ?? null,
      programId: weeklyProgram.program,
      startTime: this.mapTimeToSaveRequest(weeklyProgram.startTime),
      room: weeklyProgram.room?.trim().toUpperCase() || null,
      notificationSentAt: this.mapNotificationDateTime(weeklyProgram.notificationSentAt)
    };
    return this.weeklyProgramService.updateById(weeklyProgram.id, request).pipe(map((saved) => __spreadProps(__spreadValues({}, weeklyProgram), {
      id: saved.id,
      // El DTO resumido no incluye meeting ni showTips: conservar el contexto
      // necesario para volver a abrir el selector tras guardar al responsable.
      assignment: saved.assignment ? __spreadValues(__spreadValues({}, weeklyProgram.assignment), saved.assignment) : weeklyProgram.assignment,
      responsible: saved.responsible,
      assistant: saved.assistant,
      congregation: saved.congregation ? __spreadValues(__spreadValues({}, weeklyProgram.congregation), saved.congregation) : weeklyProgram.congregation,
      program: saved.programId,
      startTime: saved.startTime,
      room: saved.room ?? "",
      notificationSentAt: saved.notificationSentAt
    })));
  }
  mapWeeklyProgramUpsertByTitleRequest(weeklyProgram) {
    return {
      weeklyProgramId: weeklyProgram.id,
      programId: weeklyProgram.program,
      congregationId: weeklyProgram.congregation.id,
      title: weeklyProgram.assignment.title,
      number: weeklyProgram.assignment.number,
      sectionMeeting: weeklyProgram.assignment.sectionMeeting,
      time: weeklyProgram.assignment.time,
      timeType: weeklyProgram.assignment.timeType,
      showTips: weeklyProgram.assignment.showTips,
      responsibleId: weeklyProgram.responsible?.id ?? null,
      assistantId: weeklyProgram.assistant?.id ?? null,
      startTime: this.mapTimeToSaveRequest(weeklyProgram.startTime),
      room: weeklyProgram.room
    };
  }
  mapTimeToSaveRequest(time) {
    if (!time) {
      return null;
    }
    if (Array.isArray(time)) {
      const [hours, minutes, seconds = 0] = time;
      return `${this.padTimeSegment(hours)}:${this.padTimeSegment(minutes)}:${this.padTimeSegment(seconds)}`;
    }
    if (typeof time === "string") {
      const [hours = "00", minutes = "00", seconds = "00"] = time.split(":");
      return `${this.padTimeSegment(hours)}:${this.padTimeSegment(minutes)}:${this.padTimeSegment(seconds)}`;
    }
    return null;
  }
  padTimeSegment(value) {
    return Number(value ?? 0).toString().padStart(2, "0");
  }
  filter(weeks) {
    return weeks.filter((week) => Utils.showFirstDateOfWeek(week.week));
  }
  getDataFromJW() {
    this.meetingsService.getUpdateWeeksFromJW().subscribe((data) => {
    });
  }
  changeProgram(program, type) {
    console.log("changeProgram");
    let item = this.filterProgram(program) ?? program;
    switch (type) {
      case ProgramChangeType.START_TIME_OPENING_SONG:
        this.modalService.selectedHour(item.startTimeOpeningSong).then((data) => {
          if (data === ModalResult.CLOSE) {
            return;
          }
          item.startTimeOpeningSong = data;
          program.startTimeOpeningSong = data;
          this.meetingsService.saveOrUpdateProgram(item).subscribe((data2) => {
          });
        }).catch((data) => {
          console.info(data);
        });
        break;
      case ProgramChangeType.START_TIME_INTRO:
        this.modalService.selectedHour(item.startTimeIntro).then((data) => {
          if (data === ModalResult.CLOSE) {
            return;
          }
          item.startTimeIntro = data;
          program.startTimeIntro = data;
          this.meetingsService.saveOrUpdateProgram(item).subscribe((data2) => {
            console.info(data2);
          });
        }).catch((data) => {
          console.info(data);
        });
        break;
      case ProgramChangeType.START_TIME_INTERMEDIATE_SONG:
        this.modalService.selectedHour(item.startTimeIntermediateSong).then((data) => {
          if (data === ModalResult.CLOSE) {
            return;
          }
          item.startTimeIntermediateSong = data;
          program.startTimeIntermediateSong = data;
          this.meetingsService.saveOrUpdateProgram(item).subscribe((data2) => {
            console.info(data2);
          });
        }).catch((data) => {
          console.info(data);
        });
        break;
      case ProgramChangeType.START_TIME_CONCLUSION_WORDS:
        this.modalService.selectedHour(item.startTimeConclusionWords).then((data) => {
          if (data === ModalResult.CLOSE) {
            return;
          }
          item.startTimeConclusionWords = data;
          program.startTimeConclusionWords = data;
          this.meetingsService.saveOrUpdateProgram(item).subscribe((data2) => {
            console.info(data2);
          });
        }).catch((data) => {
          console.info(data);
        });
        break;
      case ProgramChangeType.START_TIME_FINAL_SONG:
        this.modalService.selectedHour(item.startTimeFinalSong).then((data) => {
          if (data === ModalResult.CLOSE) {
            return;
          }
          item.startTimeFinalSong = data;
          program.startTimeFinalSong = data;
          this.meetingsService.saveOrUpdateProgram(item).subscribe((data2) => {
          });
        }).catch((data) => {
          console.info(data);
        });
        break;
      case AssignmentType.OPENING_PRAYER:
        this.modalService.assignPublisherProgram(item, AssignmentType.OPENING_PRAYER).then((data) => {
          if (data === ModalResult.CLOSE) {
            return;
          }
          if (data) {
            item.openingPrayer = data;
            program.openingPrayer = data;
            this.meetingsService.saveOrUpdateProgram(item).subscribe((data2) => {
            });
            return;
          }
          if (data == null) {
            import_sweetalert2.default.fire({
              title: "\xBFEst\xE1s seguro?",
              text: `Esta a punto de borrar la oraci\xF3n inicial del programa semanal`,
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "S\xED, b\xF3rralo!"
            }).then((result) => {
              if (result.isConfirmed) {
                item.openingPrayer = data;
                program.openingPrayer = data;
                this.meetingsService.saveOrUpdateProgram(item).subscribe((data2) => {
                });
              }
            });
          }
        }).catch((data) => {
          console.info(data);
        });
        break;
      case AssignmentType.FINAL_PRAYER:
        this.modalService.assignPublisherProgram(item, AssignmentType.FINAL_PRAYER).then((data) => {
          if (data === ModalResult.CLOSE) {
            return;
          }
          if (data) {
            item.finalPrayer = data;
            program.finalPrayer = data;
            this.meetingsService.saveOrUpdateProgram(item).subscribe((data2) => {
            });
            return;
          }
          if (data == null) {
            import_sweetalert2.default.fire({
              title: "\xBFEst\xE1s seguro?",
              text: `Esta a punto de borrar la oraci\xF3n final del programa semanal`,
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "S\xED, b\xF3rralo!"
            }).then((result) => {
              if (result.isConfirmed) {
                item.finalPrayer = data;
                program.finalPrayer = data;
                this.meetingsService.saveOrUpdateProgram(item).subscribe((data2) => {
                });
              }
            });
          }
        }).catch((data) => {
          console.info(data);
        });
        break;
      case AssignmentType.PRESIDENT:
        this.modalService.assignPublisherProgram(item, AssignmentType.PRESIDENT).then((data) => {
          if (data === ModalResult.CLOSE) {
            return;
          }
          if (data) {
            item.president = data;
            program.president = data;
            this.meetingsService.saveOrUpdateProgram(item).subscribe((data2) => {
              console.info(data2);
            });
            return;
          }
          if (data == null) {
            import_sweetalert2.default.fire({
              title: "\xBFEst\xE1s seguro?",
              text: `Esta a punto de borrar el presidente del programa semanal`,
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "S\xED, b\xF3rralo!"
            }).then((result) => {
              if (result.isConfirmed) {
                item.president = data;
                program.president = data;
                this.meetingsService.saveOrUpdateProgram(item).subscribe((data2) => {
                  console.info(data2);
                });
              }
            });
          }
        }).catch((data) => {
          console.info(data);
        });
        break;
      case AssignmentType.ASSISTANT_ADVISER:
        this.modalService.assignPublisherProgram(item, AssignmentType.ASSISTANT_ADVISER).then((data) => {
          if (data === ModalResult.CLOSE) {
            return;
          }
          if (data) {
            item.assistantAdviser = data;
            program.assistantAdviser = data;
            this.meetingsService.saveOrUpdateProgram(item).subscribe((data2) => {
              console.info(data2);
            });
            return;
          }
          if (data == null) {
            import_sweetalert2.default.fire({
              title: "\xBFEst\xE1s seguro?",
              text: `Esta a punto de borrar el consejero auxiliar del programa semanal`,
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "S\xED, b\xF3rralo!"
            }).then((result) => {
              if (result.isConfirmed) {
                item.assistantAdviser = data;
                program.assistantAdviser = data;
                this.meetingsService.saveOrUpdateProgram(item).subscribe((data2) => {
                  console.info(data2);
                });
              }
            });
          }
        }).catch((data) => {
          console.info(data);
        });
        break;
      case ProgramChangeType.OPENING_SONG:
        this.modalService.changeSong(item, item.meeting.openingSong).then((data) => {
          if (data === ModalResult.CLOSE) {
            return;
          }
          if (data) {
            item.meeting.openingSong = data;
            program.meeting.openingSong = data;
            this.meetingsService.updateMeeting(item.meeting).subscribe((data2) => {
              console.info(data2);
            });
            return;
          }
          if (data == null) {
            import_sweetalert2.default.fire({
              title: "\xBFEst\xE1s seguro?",
              text: `Esta a punto de borrar la canci\xF3n inicial del programa semanal`,
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "S\xED, b\xF3rralo!"
            }).then((result) => {
              if (result.isConfirmed) {
                item.meeting.openingSong = data;
                program.meeting.openingSong = data;
                this.meetingsService.updateMeeting(item.meeting).subscribe((data2) => {
                  console.info(data2);
                });
              }
            });
          }
        }).catch((data) => {
          console.info(data);
        });
        break;
      case ProgramChangeType.INTERMEDIATE_SONG:
        this.modalService.changeSong(item, item.meeting.intermediateSong).then((data) => {
          if (data === ModalResult.CLOSE) {
            return;
          }
          if (data) {
            item.meeting.intermediateSong = data;
            program.meeting.intermediateSong = data;
            this.meetingsService.updateMeeting(item.meeting).subscribe((data2) => {
              console.info(data2);
            });
            return;
          }
          if (data == null) {
            import_sweetalert2.default.fire({
              title: "\xBFEst\xE1s seguro?",
              text: `Esta a punto de borrar la canci\xF3n intermedia del programa semanal`,
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "S\xED, b\xF3rralo!"
            }).then((result) => {
              if (result.isConfirmed) {
                item.meeting.intermediateSong = data;
                program.meeting.intermediateSong = data;
                this.meetingsService.updateMeeting(item.meeting).subscribe((data2) => {
                  console.info(data2);
                });
              }
            });
          }
        }).catch((data) => {
          console.info(data);
        });
        break;
      case ProgramChangeType.FINAL_SONG:
        this.modalService.changeSong(item, item.meeting.finalSong).then((data) => {
          if (data === ModalResult.CLOSE) {
            return;
          }
          if (data) {
            item.meeting.finalSong = data;
            program.meeting.finalSong = data;
            this.meetingsService.updateMeeting(item.meeting).subscribe((data2) => {
              console.info(data2);
            });
            return;
          }
          if (data == null) {
            import_sweetalert2.default.fire({
              title: "\xBFEst\xE1s seguro?",
              text: `Esta a punto de borrar la canci\xF3n final del programa semanal`,
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "S\xED, b\xF3rralo!"
            }).then((result) => {
              if (result.isConfirmed) {
                item.meeting.finalSong = data;
                program.meeting.finalSong = data;
                this.meetingsService.updateMeeting(item.meeting).subscribe((data2) => {
                  console.info(data2);
                });
              }
            });
          }
        }).catch((data) => {
          console.info(data);
        });
        break;
      default:
        break;
    }
  }
  selectAssignmentType(item, type) {
    if (isSpeechAssignment(item.assignment)) {
      this.assignmentType = AssignmentType.SPEECH;
      return;
    }
    if (isCongregationBibleStudyAssignment(item.assignment)) {
      this.assignmentType = AssignmentType.CONGREGATION_BIBLE_STUDY;
    } else {
      switch (item.assignment.number) {
        case 1:
          this.assignmentType = AssignmentType.ASSIGNMENT_1;
          break;
        case 2:
          this.assignmentType = AssignmentType.ASSIGNMENT_2;
          break;
        case 3:
          this.assignmentType = AssignmentType.ASSIGNMENT_3;
          break;
        default:
          this.assignmentType = this.selectAssignmentTypeByTitle(item.assignment.title);
      }
    }
    if (this.assignmentType === AssignmentType.WHAT_WOULD_YOU_SAY) {
      this.assignmentType = this.resolveWhatWouldYouSayAssignmentType(type);
    } else if (this.isAssistantChange(type) && this.assignmentType === AssignmentType.CONGREGATION_BIBLE_STUDY) {
      this.assignmentType = AssignmentType.CONGREGATION_BIBLE_STUDY_READER;
    } else if (this.isAssistantChange(type) && this.assignmentType !== AssignmentType.CONGREGATION_BIBLE_STUDY) {
      this.assignmentType += "Assistant";
    }
  }
  mapNotificationDateTime(value) {
    return typeof value === "string" ? value : null;
  }
  isAssistantChange(type) {
    return type === WeeklyProgramChangeType.ASSISTANT || type === WeeklyProgramChangeType.ASSISTANT_B;
  }
  selectAssignmentTypeByTitle(title) {
    if (includesMeetingPartTitle(title, MEETING_PARTS.WHAT_HE_DID)) {
      return AssignmentType.WHAT_HE_DID;
    }
    if (includesMeetingPartTitle(title, MEETING_PARTS.IMITATE)) {
      return AssignmentType.IMITATE;
    }
    if (includesMeetingPartTitle(title, MEETING_PARTS.STARTING_A_CONVERSATION)) {
      return AssignmentType.STARTING_A_CONVERSATION;
    }
    if (includesMeetingPartTitle(title, MEETING_PARTS.FOLLOWING_UP)) {
      return AssignmentType.FOLLOWING_UP;
    }
    if (includesMeetingPartTitle(title, MEETING_PARTS.EXPLAINING_YOUR_BELIEFS)) {
      return AssignmentType.EXPLAINING_YOUR_BELIEFS;
    }
    if (this.isWhatWouldYouSayTitle(title)) {
      return AssignmentType.WHAT_WOULD_YOU_SAY;
    }
    if (includesMeetingPartTitle(title, MEETING_PARTS.MAKING_DISCIPLES)) {
      return AssignmentType.MAKING_DISCIPLES;
    }
    if (includesMeetingPartTitle(title, MEETING_PARTS.CONGREGATION_BIBLE_STUDY)) {
      return AssignmentType.CONGREGATION_BIBLE_STUDY;
    }
    if (includesMeetingPartTitle(title, MEETING_PARTS.LOCAL_NEEDS)) {
      return AssignmentType.LOCAL_NEEDS;
    }
    if (includesMeetingPartTitle(title, MEETING_PARTS.SPEECH)) {
      return AssignmentType.SPEECH;
    }
    return "";
  }
  isWhatWouldYouSayTitle(title) {
    return includesMeetingPartTitle(title, MEETING_PARTS.WHAT_WOULD_YOU_SAY);
  }
  resolveWhatWouldYouSayAssignmentType(type) {
    return type === WeeklyProgramChangeType.ASSISTANT || type === WeeklyProgramChangeType.ASSISTANT_B ? AssignmentType.WHAT_WOULD_YOU_SAY_ASSISTANT : AssignmentType.WHAT_WOULD_YOU_SAY;
  }
  changeWeeklyProgram(item, type) {
    const target = this.getWeeklyPublisherTarget(type);
    const isRestrictedExplainingBeliefsSpeech = isExplainingBeliefsSpeechAssignment(item.assignment);
    if (target) {
      if (target.field === "assistant" && isRestrictedExplainingBeliefsSpeech) {
        this.showNoAssistantRestriction();
        return;
      }
      this.resolveAssignmentType(item, type);
      this.getOrCreateWeeklyProgramForRoom(item, target.room).subscribe({
        next: (weeklyProgram) => {
          if (!weeklyProgram) {
            console.error("No se encontr\xF3 el programa semanal para la sala", target.room);
            return;
          }
          const week = this.findProgramForItem(item)?.meeting?.week ?? weeklyProgram.assignment?.meeting?.week ?? null;
          this.modalService.assignPublisherWeeklyProgram(weeklyProgram, this.assignmentType, target.modalType, target.room, isRestrictedExplainingBeliefsSpeech, week).then((data) => this.handlePublisherSelection(item, target, weeklyProgram, data)).catch((error) => console.error("No se pudo abrir el selector de publicadores", error));
        },
        error: (error) => console.error("No se pudo preparar la asignaci\xF3n para la sala", target.room, error)
      });
      return;
    }
    switch (type) {
      case WeeklyProgramChangeType.START_TIME:
        this.modalService.selectedHour(item.startTime).then((data) => {
          if (data === ModalResult.CLOSE) {
            return;
          }
          item.startTime = data;
          this.saveWeeklyProgram(item).subscribe((data2) => {
            console.log("saved startTime", data2);
          });
        }).catch((data) => {
          console.info(data);
        });
        break;
      case WeeklyProgramChangeType.TITLE:
        this.modalService.setTitleAndTime(item).then((data) => {
          if (data === ModalResult.CLOSE) {
            return;
          }
          item = data;
          this.saveWeeklyProgram(item).subscribe((data2) => {
            console.log("saved setTitleAndTime", data2);
          });
        }).catch((data) => {
          console.info(data);
        });
        break;
      default:
        break;
    }
  }
  showNoAssistantRestriction() {
    this.modalService.info("Asignaci\xF3n sin ayudante", "La fuente identifica esta parte como un discurso. Solo se puede asignar a hermanos y no lleva ayudante en ninguna sala.", ModalTitleEnums.INFORMACION, ModalTypeEnums.INFO).catch(() => void 0);
  }
  resolveAssignmentType(item, type) {
    if (item.assignment.sectionMeeting.includes(SectionMeeting.NUESTRA_VIDA_CRISTIANA) && !isCongregationBibleStudyAssignment(item.assignment) && !includesMeetingPartTitle(item.assignment.title, MEETING_PARTS.LOCAL_NEEDS)) {
      this.assignmentType = AssignmentType.OTHER_PART_LIVING_AS_CHRISTIANS;
    } else {
      this.selectAssignmentType(item, type);
    }
    return this.assignmentType;
  }
  getWeeklyPublisherTarget(type) {
    switch (type) {
      case WeeklyProgramChangeType.RESPONSIBLE:
        return {
          room: MeetingRoom.MAIN,
          field: "responsible",
          viewField: "responsible",
          modalType: WeeklyProgramChangeType.RESPONSIBLE
        };
      case WeeklyProgramChangeType.ASSISTANT:
        return {
          room: MeetingRoom.MAIN,
          field: "assistant",
          viewField: "assistant",
          modalType: WeeklyProgramChangeType.ASSISTANT
        };
      case WeeklyProgramChangeType.RESPONSIBLE_B:
        return {
          room: MeetingRoom.AUXILIARY,
          field: "responsible",
          viewField: "responsibleB",
          modalType: WeeklyProgramChangeType.RESPONSIBLE
        };
      case WeeklyProgramChangeType.ASSISTANT_B:
        return {
          room: MeetingRoom.AUXILIARY,
          field: "assistant",
          viewField: "assistantB",
          modalType: WeeklyProgramChangeType.ASSISTANT
        };
      default:
        return null;
    }
  }
  getOrCreateWeeklyProgramForRoom(item, room) {
    const existing = this.filterRoom(item, room);
    if (existing) {
      return of(existing);
    }
    const program = this.findProgramForItem(item);
    if (!program) {
      return of(null);
    }
    const weeklyProgram = {
      assignment: item.assignment,
      congregation: item.congregation,
      program: item.program,
      startTime: item.startTime,
      room,
      responsible: null,
      assistant: null
    };
    return this.weeklyProgramService.save([weeklyProgram]).pipe(map((savedPrograms) => {
      const saved = savedPrograms.find((candidate) => this.matchesWeeklyProgram(candidate, item, room));
      if (!saved) {
        return null;
      }
      const stored = program.weeklyPrograms.find((candidate) => candidate.id === saved.id);
      if (stored) {
        Object.assign(stored, saved);
        return stored;
      }
      program.weeklyPrograms = [...program.weeklyPrograms, saved];
      return saved;
    }));
  }
  handlePublisherSelection(item, target, weeklyProgram, data) {
    if (data === ModalResult.CLOSE) {
      return;
    }
    if (data) {
      this.persistPublisherAssignment(item, target, weeklyProgram, data);
      return;
    }
    if (data == null) {
      const role = target.field === "responsible" ? "responsable" : "ayudante";
      const roomSuffix = target.room === MeetingRoom.AUXILIARY ? " B" : "";
      import_sweetalert2.default.fire({
        title: "\xBFEst\xE1s seguro?",
        text: `Esta a punto de borrar el ${role}${roomSuffix} de la asignaci\xF3n`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "S\xED, b\xF3rralo!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.persistPublisherAssignment(item, target, weeklyProgram, null);
        }
      });
    }
  }
  persistPublisherAssignment(item, target, weeklyProgram, publisher) {
    const request = __spreadProps(__spreadValues({}, weeklyProgram), { [target.field]: publisher });
    this.updateWeeklyProgram(request).subscribe({
      next: (saved) => {
        Object.assign(weeklyProgram, saved);
        this.setPdfPublisher(item, target.viewField, publisher);
        if (publisher && target.field === "assistant" && this.assignmentType === AssignmentType.CONGREGATION_BIBLE_STUDY_READER) {
          this.modalService.info("Recordatorio", "Los hermanos deben ser lectores aprobados por el cuerpo de Ancianos (sfl 1:2.8). Si ya fue aprobado vaya al modulo PRIVILEGIOS.", ModalTitleEnums.INFORMACION, ModalTypeEnums.INFO);
        }
      },
      error: (error) => console.error("No se pudo guardar la asignaci\xF3n", error)
    });
  }
  setPdfPublisher(item, field, publisher) {
    item[field] = publisher;
  }
  findProgramForItem(item) {
    return this.semanas.find((week) => week.id === item.program) ?? this.semanas.find((week) => week.weeklyPrograms.some((weeklyProgram) => weeklyProgram.id === item.id));
  }
  matchesWeeklyProgram(candidate, item, room) {
    return candidate.room?.toUpperCase() === room && this.matchesAssignment(candidate.assignment, item.assignment);
  }
  matchesAssignment(left, right) {
    if (left?.id != null && right?.id != null) {
      if (left.id === right.id) {
        return true;
      }
    }
    return left?.sectionMeeting === right?.sectionMeeting && left?.number === right?.number && normalizeProgramTitle(left?.title) === normalizeProgramTitle(right?.title);
  }
  addAssign(item, sectionMeeting) {
    this.modalService.AddAssignment(item, sectionMeeting);
  }
  print(week, orientation) {
    const program = this.semanas.find((candidate) => candidate.id === week.id) ?? week;
    this.dataService.setMeeting([program]);
    this.modalService.printer(orientation);
  }
  printAssig(week) {
    const program = this.semanas.find((candidate) => candidate.id === week.id) ?? week;
    this.dataService.setMeeting([program]);
    this.modalService.printerAssig();
  }
  filterRoom(item, room = MeetingRoom.AUXILIARY) {
    const program = this.findProgramForItem(item);
    return program?.weeklyPrograms.find((weeklyProgram) => weeklyProgram.room?.toUpperCase() === room && this.matchesAssignment(weeklyProgram.assignment, item.assignment));
  }
  filterProgram(item, room = MeetingRoom.AUXILIARY) {
    return this.semanas.find((p) => p.id == item.id);
  }
  consultar(filtros) {
    this.filtrar.emit(filtros);
  }
  openFiltersModal(content) {
    this.filtersModalRef = this.ngbModal.open(content, {
      backdrop: "static",
      centered: true,
      animation: true,
      fullscreen: "sm",
      windowClass: "program-filter-modal-window"
    });
  }
  closeFiltersModal() {
    this.filtersModalRef?.dismiss();
    this.filtersModalRef = void 0;
  }
  onFiltersSelected(filtros) {
    this.consultar(filtros);
    this.filtersModalRef?.close();
    this.filtersModalRef = void 0;
  }
  static {
    this.\u0275fac = function ProgramsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ProgramsComponent)(\u0275\u0275directiveInject(MeetingsService), \u0275\u0275directiveInject(ModalService), \u0275\u0275directiveInject(DataService), \u0275\u0275directiveInject(WeeklyProgramService), \u0275\u0275directiveInject(NgbModal));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProgramsComponent, selectors: [["vmc-programs"]], inputs: { semanas: "semanas", semanasAllRooms: "semanasAllRooms", RoomA: "RoomA", room: "room" }, outputs: { filtrar: "filtrar" }, features: [\u0275\u0275NgOnChangesFeature], decls: 7, vars: 0, consts: [["filtersModal", ""], [1, "program"], [1, "container-wrapper", "p-0", "p-md-1"], [1, "wrapper"], [3, "semana", "roomA", "room", "isAdmin", "porAsignar", "meetingDay"], [1, "program-filter-modal"], [1, "program-filter-modal__header"], [1, "program-filter-modal__title"], ["type", "button", "aria-label", "Cerrar", 1, "btn-close", 3, "click"], [1, "program-filter-modal__body"], [3, "filter"], [3, "print", "printAssignments", "openFilters", "programChange", "weeklyProgramChange", "addAssignment", "semana", "roomA", "room", "isAdmin", "porAsignar", "meetingDay"]], template: function ProgramsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, ProgramsComponent_ng_template_0_Template, 7, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
        \u0275\u0275elementStart(2, "div", 1)(3, "div", 2)(4, "div", 3);
        \u0275\u0275repeaterCreate(5, ProgramsComponent_For_6_Template, 1, 6, "vmc-program-week", 4, _forTrack02);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(5);
        \u0275\u0275repeater(ctx.semanasAllRooms);
      }
    }, dependencies: [CommonModule, SharedModule, ProgramFiltersComponent, ProgramWeekComponent], styles: ["\n\n[_nghost-%COMP%] {\n  display: flex;\n  flex: 1 1 0;\n  flex-direction: column;\n  min-height: 0;\n  min-width: 0;\n}\n.program[_ngcontent-%COMP%] {\n  display: flex;\n  flex: 1 1 0;\n  flex-direction: column;\n  min-height: 0;\n  padding: 0;\n  background-color: rgb(241, 239, 239);\n  margin: 0 auto;\n  width: 100%;\n  overflow: hidden;\n}\n.program[_ngcontent-%COMP%]   .container-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  flex: 1 1 0;\n  flex-direction: column;\n  min-height: 0;\n}\n.program[_ngcontent-%COMP%]   .wrapper[_ngcontent-%COMP%] {\n  flex: 1 1 0;\n  min-height: 0;\n  overflow: auto;\n}\n.program-filter-modal[_ngcontent-%COMP%] {\n  background: #fff;\n  border-radius: 8px;\n  overflow: hidden;\n}\n.program-filter-modal__header[_ngcontent-%COMP%] {\n  align-items: center;\n  background: #f8f9fa;\n  border-bottom: 1px solid #e7eaee;\n  display: flex;\n  justify-content: space-between;\n  padding: 0.9rem 1rem;\n}\n.program-filter-modal__title[_ngcontent-%COMP%] {\n  color: #2f3438;\n  font-size: 1.05rem;\n  font-weight: 600;\n  margin: 0;\n}\n.program-filter-modal__body[_ngcontent-%COMP%] {\n  padding: 1rem;\n}\n/*# sourceMappingURL=programs.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProgramsComponent, [{
    type: Component,
    args: [{ selector: "vmc-programs", imports: [CommonModule, SharedModule, ProgramFiltersComponent, ProgramWeekComponent], template: '<ng-template #filtersModal>\n  <div class="program-filter-modal">\n    <div class="program-filter-modal__header">\n      <h5 class="program-filter-modal__title">Buscar programas</h5>\n      <button type="button" class="btn-close" aria-label="Cerrar" (click)="closeFiltersModal()"></button>\n    </div>\n    <div class="program-filter-modal__body">\n      <vmc-program-filters (filter)="onFiltersSelected($event)"></vmc-program-filters>\n    </div>\n  </div>\n</ng-template>\n\n<div class="program">\n  <div class="container-wrapper p-0 p-md-1">\n    <div class="wrapper">\n      @for (semana of semanasAllRooms; track semana.id) {\n      <vmc-program-week\n        [semana]="semana"\n        [roomA]="RoomA"\n        [room]="room"\n        [isAdmin]="isAdmin"\n        [porAsignar]="porAsignar"\n        [meetingDay]="meetingDay"\n        (print)="print($event.program, $event.orientation)"\n        (printAssignments)="printAssig($event)"\n        (openFilters)="openFiltersModal(filtersModal)"\n        (programChange)="changeProgram($event.program, $event.type)"\n        (weeklyProgramChange)="changeWeeklyProgram($event.item, $event.type)"\n        (addAssignment)="addAssign($event.program, $event.sectionMeeting)"\n      ></vmc-program-week>\n      }\n    </div>\n  </div>\n</div>\n', styles: ["/* src/app/pages/entre-semana/components/programs/programs.component.scss */\n:host {\n  display: flex;\n  flex: 1 1 0;\n  flex-direction: column;\n  min-height: 0;\n  min-width: 0;\n}\n.program {\n  display: flex;\n  flex: 1 1 0;\n  flex-direction: column;\n  min-height: 0;\n  padding: 0;\n  background-color: rgb(241, 239, 239);\n  margin: 0 auto;\n  width: 100%;\n  overflow: hidden;\n}\n.program .container-wrapper {\n  display: flex;\n  flex: 1 1 0;\n  flex-direction: column;\n  min-height: 0;\n}\n.program .wrapper {\n  flex: 1 1 0;\n  min-height: 0;\n  overflow: auto;\n}\n.program-filter-modal {\n  background: #fff;\n  border-radius: 8px;\n  overflow: hidden;\n}\n.program-filter-modal__header {\n  align-items: center;\n  background: #f8f9fa;\n  border-bottom: 1px solid #e7eaee;\n  display: flex;\n  justify-content: space-between;\n  padding: 0.9rem 1rem;\n}\n.program-filter-modal__title {\n  color: #2f3438;\n  font-size: 1.05rem;\n  font-weight: 600;\n  margin: 0;\n}\n.program-filter-modal__body {\n  padding: 1rem;\n}\n/*# sourceMappingURL=programs.component.css.map */\n"] }]
  }], () => [{ type: MeetingsService }, { type: ModalService }, { type: DataService }, { type: WeeklyProgramService }, { type: NgbModal }], { filtrar: [{
    type: Output
  }], semanas: [{
    type: Input
  }], semanasAllRooms: [{
    type: Input
  }], RoomA: [{
    type: Input
  }], room: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProgramsComponent, { className: "ProgramsComponent", filePath: "src/app/pages/entre-semana/components/programs/programs.component.ts", lineNumber: 42 });
})();

// src/app/pages/entre-semana/entre-semana.component.ts
function EntreSemanaComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 3);
    \u0275\u0275listener("click", function EntreSemanaComponent_Conditional_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.clearDateFilter());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "filter_alt_off");
    \u0275\u0275elementEnd()();
  }
}
var EntreSemanaComponent = class _EntreSemanaComponent {
  constructor(meetingsService, modalService, dataService, assignmentService) {
    this.meetingsService = meetingsService;
    this.modalService = modalService;
    this.dataService = dataService;
    this.assignmentService = assignmentService;
    this.dateFilterStorageKey = "vmc.weeks.date-filter";
    this.destroyRef = inject(DestroyRef);
    this.pageSize = environment.pagination.programsPageSize;
    this.requestedPages = /* @__PURE__ */ new Set();
    this.loadedPages = /* @__PURE__ */ new Map();
    this.cancelInitialProgramLoad$ = new Subject();
    this.searchRequestId = 0;
    this.initialized = false;
    this.loadedCongregationId = null;
    this.meetingRoom = MeetingRoom;
    this.programList = [];
    this.semanas = [];
    this.semanasSalaAuxiliar = [];
    this.porAsignar = "por asignar";
    this.congregation = {};
    this.assignmentType = "";
    this.showSpinner = false;
    this.meetingDay = 1;
    this.semanasAllRooms = [];
    this.hasStoredDateFilter = false;
    this.loaderService = inject(LoaderService);
    this.loaderService.hideMatspinner();
    this.dataService.getPublisher().subscribe((data) => {
      this.superintendente = data;
    });
    this.dataService.getCongregation$().subscribe((data) => {
      if (!this.isValidCongregation(data)) {
        return;
      }
      this.congregation = data;
      this.meetingDay = data.day;
      if (this.initialized) {
        this.initializeProgramsForCongregation();
      }
    });
  }
  ngOnInit() {
    this.initialized = true;
    this.initializeProgramsForCongregation();
  }
  initializeProgramsForCongregation() {
    if (!this.isValidCongregation(this.congregation) || this.loadedCongregationId === this.congregation.id) {
      return;
    }
    this.loadedCongregationId = this.congregation.id;
    this.semanas = [];
    this.semanasAllRooms = [];
    this.programList = [];
    this.requestedPages.clear();
    this.loadedPages.clear();
    this.loaderService.showMatspinner();
    const storedDateFilter = this.readStoredDateFilter();
    this.hasStoredDateFilter = storedDateFilter !== null;
    if (storedDateFilter) {
      this.consultar(storedDateFilter, false);
      return;
    }
    this.getPrograms();
  }
  getPrograms(page = environment.pagination.initialPage) {
    if (!this.isValidCongregation(this.congregation)) {
      this.loaderService.hideMatspinner();
      return;
    }
    if (this.requestedPages.has(page)) {
      return;
    }
    this.requestedPages.add(page);
    this.meetingsService.getWeeksValids(this.congregation.id, page, this.pageSize).pipe(takeUntil(this.cancelInitialProgramLoad$), takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (data) => this.onSuccess(data, page),
      error: this.onError.bind(this)
    });
  }
  onSuccess(data, page) {
    this.loadedPages.set(page, data);
    this.refreshProgramsFromLoadedPages();
    this.hideInitialLoaderIfReady(page, data);
    if (localStorage.getItem("week")) {
      this.filterByWeekNumber(parseInt(localStorage.getItem("week") ?? ""));
    }
    if (data.length >= this.pageSize) {
      this.getPrograms(page + 1);
    }
  }
  refreshProgramsFromLoadedPages() {
    const loadedPrograms = [...this.loadedPages.entries()].sort(([currentPage], [nextPage]) => currentPage - nextPage).flatMap(([, programs]) => programs);
    this.programList = loadedPrograms;
    this.semanas = [...this.programList];
    this.semanasAllRooms = this.dataService.makePDfVersion([...this.programList]);
    this.semanasSalaAuxiliar = [...this.filterWeekByRoom(MeetingRoom.AUXILIARY, this.programList)];
    this.dataService.setMeeting([...this.programList]);
  }
  hideInitialLoaderIfReady(page, data) {
    if (page === environment.pagination.initialPage || data.length < this.pageSize) {
      this.loaderService.hideMatspinner();
    }
  }
  onError(error) {
    console.error(error);
    this.loaderService.hideMatspinner();
  }
  showDayOfMeeting(fechaSemana) {
    return Utils.showDayOfMeeting(fechaSemana, this.meetingDay);
  }
  adapterTime(dateTime) {
    return Utils.adapterTime(dateTime);
  }
  filter(weeks) {
    return weeks.filter((week) => Utils.showFirstDateOfWeek(week.week));
  }
  getDataFromJW() {
    this.meetingsService.getUpdateWeeksFromJW().subscribe((data) => {
    });
  }
  changeProgram(item, type) {
    switch (type) {
      case ProgramChangeType.START_TIME_OPENING_SONG:
        this.modalService.selectedHour(item.startTimeOpeningSong).then((data) => {
          if (data === ModalResult.CLOSE) {
            return;
          }
          item.startTimeOpeningSong = data;
          this.meetingsService.saveOrUpdateProgram(item).subscribe((data2) => {
            console.info(data2);
          });
        }).catch((data) => {
          console.info(data);
        });
        break;
      case ProgramChangeType.START_TIME_INTRO:
        this.modalService.selectedHour(item.startTimeIntro).then((data) => {
          if (data === ModalResult.CLOSE) {
            return;
          }
          item.startTimeIntro = data;
          this.meetingsService.saveOrUpdateProgram(item).subscribe((data2) => {
            console.info(data2);
          });
        }).catch((data) => {
          console.info(data);
        });
        break;
      case ProgramChangeType.START_TIME_INTERMEDIATE_SONG:
        this.modalService.selectedHour(item.startTimeIntermediateSong).then((data) => {
          if (data === ModalResult.CLOSE) {
            return;
          }
          item.startTimeIntermediateSong = data;
          this.meetingsService.saveOrUpdateProgram(item).subscribe((data2) => {
            console.info(data2);
          });
        }).catch((data) => {
          console.info(data);
        });
        break;
      case ProgramChangeType.START_TIME_CONCLUSION_WORDS:
        this.modalService.selectedHour(item.startTimeConclusionWords).then((data) => {
          if (data === ModalResult.CLOSE) {
            return;
          }
          item.startTimeConclusionWords = data;
          this.meetingsService.saveOrUpdateProgram(item).subscribe((data2) => {
            console.info(data2);
          });
        }).catch((data) => {
          console.info(data);
        });
        break;
      case ProgramChangeType.START_TIME_FINAL_SONG:
        this.modalService.selectedHour(item.startTimeFinalSong).then((data) => {
          if (data === ModalResult.CLOSE) {
            return;
          }
          item.startTimeFinalSong = data;
          this.meetingsService.saveOrUpdateProgram(item).subscribe((data2) => {
          });
        }).catch((data) => {
          console.info(data);
        });
        break;
      case AssignmentType.OPENING_PRAYER:
        this.modalService.assignPublisherProgram(item, AssignmentType.OPENING_PRAYER).then((data) => {
          item.openingPrayer = data;
          this.meetingsService.saveOrUpdateProgram(item).subscribe((data2) => {
          });
        }).catch((data) => {
          console.info(data);
        });
        break;
      case AssignmentType.FINAL_PRAYER:
        this.modalService.assignPublisherProgram(item, AssignmentType.FINAL_PRAYER).then((data) => {
          item.finalPrayer = data;
          this.meetingsService.saveOrUpdateProgram(item).subscribe((data2) => {
          });
        }).catch((data) => {
          console.info(data);
        });
        break;
      case AssignmentType.PRESIDENT:
        this.modalService.assignPublisherProgram(item, AssignmentType.PRESIDENT).then((data) => {
          item.president = data;
          this.meetingsService.saveOrUpdateProgram(item).subscribe((data2) => {
            console.info(data2);
          });
        }).catch((data) => {
          console.info(data);
        });
        break;
      case AssignmentType.ASSISTANT_ADVISER:
        this.modalService.assignPublisherProgram(item, AssignmentType.ASSISTANT_ADVISER).then((data) => {
          item.assistantAdviser = data;
          this.meetingsService.saveOrUpdateProgram(item).subscribe((data2) => {
            console.info(data2);
          });
        }).catch((data) => {
          console.info(data);
        });
        break;
      case ProgramChangeType.OPENING_SONG:
        this.modalService.changeSong(item, item.meeting.openingSong).then((data) => {
          item.meeting.openingSong = data;
          this.meetingsService.updateMeeting(item.meeting).subscribe((data2) => {
            console.info(data2);
          });
        }).catch((data) => {
          console.info(data);
        });
        break;
      case ProgramChangeType.INTERMEDIATE_SONG:
        this.modalService.changeSong(item, item.meeting.intermediateSong).then((data) => {
          item.meeting.intermediateSong = data;
          this.meetingsService.updateMeeting(item.meeting).subscribe((data2) => {
            console.info(data2);
          });
        }).catch((data) => {
          console.info(data);
        });
        break;
      case ProgramChangeType.FINAL_SONG:
        this.modalService.changeSong(item, item.meeting.finalSong).then((data) => {
          item.meeting.finalSong = data;
          this.meetingsService.updateMeeting(item.meeting).subscribe((data2) => {
            console.info(data2);
          });
        }).catch((data) => {
          console.info(data);
        });
        break;
      default:
        break;
    }
  }
  selectAssignmentType(item, type) {
    switch (item.assignment.number) {
      case 1:
        this.assignmentType = AssignmentType.ASSIGNMENT_1;
        break;
      case 2:
        this.assignmentType = AssignmentType.ASSIGNMENT_2;
        break;
      case 3:
        this.assignmentType = AssignmentType.ASSIGNMENT_3;
        break;
      default:
        this.assignmentType = this.selectAssignmentTypeByTitle(item.assignment.title);
        if (this.assignmentType === AssignmentType.WHAT_WOULD_YOU_SAY) {
          this.assignmentType = this.resolveWhatWouldYouSayAssignmentType(type);
        } else if (type === WeeklyProgramChangeType.ASSISTANT && this.assignmentType === AssignmentType.CONGREGATION_BIBLE_STUDY) {
          this.assignmentType = AssignmentType.CONGREGATION_BIBLE_STUDY_READER;
        } else if (type === WeeklyProgramChangeType.ASSISTANT && this.assignmentType !== AssignmentType.CONGREGATION_BIBLE_STUDY) {
          this.assignmentType += "Assistant";
        }
    }
  }
  selectAssignmentTypeByTitle(title) {
    if (title.includes(MEETING_PARTS.WHAT_HE_DID)) {
      return AssignmentType.WHAT_HE_DID;
    }
    if (title.includes(MEETING_PARTS.IMITATE)) {
      return AssignmentType.IMITATE;
    }
    if (title.includes(MEETING_PARTS.STARTING_A_CONVERSATION)) {
      return AssignmentType.STARTING_A_CONVERSATION;
    }
    if (title.includes(MEETING_PARTS.FOLLOWING_UP)) {
      return AssignmentType.FOLLOWING_UP;
    }
    if (title.includes(MEETING_PARTS.EXPLAINING_YOUR_BELIEFS)) {
      return AssignmentType.EXPLAINING_YOUR_BELIEFS;
    }
    if (this.isWhatWouldYouSayTitle(title)) {
      return AssignmentType.WHAT_WOULD_YOU_SAY;
    }
    if (title.includes(MEETING_PARTS.MAKING_DISCIPLES)) {
      return AssignmentType.MAKING_DISCIPLES;
    }
    if (title.includes(MEETING_PARTS.CONGREGATION_BIBLE_STUDY)) {
      return AssignmentType.CONGREGATION_BIBLE_STUDY;
    }
    if (title.includes(MEETING_PARTS.LOCAL_NEEDS)) {
      return AssignmentType.LOCAL_NEEDS;
    }
    return "";
  }
  isWhatWouldYouSayTitle(title) {
    return includesMeetingPartTitle(title, MEETING_PARTS.WHAT_WOULD_YOU_SAY);
  }
  resolveWhatWouldYouSayAssignmentType(type) {
    return type === WeeklyProgramChangeType.ASSISTANT || type === WeeklyProgramChangeType.ASSISTANT_B ? AssignmentType.WHAT_WOULD_YOU_SAY_ASSISTANT : AssignmentType.WHAT_WOULD_YOU_SAY;
  }
  changeWeeklyProgram(item, type) {
    if (item.assignment.sectionMeeting.includes(SectionMeeting.NUESTRA_VIDA_CRISTIANA) && !item.assignment.title.includes(MEETING_PARTS.CONGREGATION_BIBLE_STUDY) && !item.assignment.title.includes(MEETING_PARTS.LOCAL_NEEDS)) {
      this.assignmentType = AssignmentType.OTHER_PART_LIVING_AS_CHRISTIANS;
    } else {
      this.selectAssignmentType(item, type);
    }
    switch (type) {
      case WeeklyProgramChangeType.RESPONSIBLE:
        this.modalService.assignPublisherWeeklyProgram(item, this.assignmentType).then((data) => {
          item.responsible = data;
          this.meetingsService.saveOrUpdateWeeklyProgram(item).subscribe((data2) => {
            console.log("saved responsible", data2);
          });
        }).catch((data) => {
          console.info(data);
        });
        break;
      case WeeklyProgramChangeType.ASSISTANT:
        this.modalService.assignPublisherWeeklyProgram(item, this.assignmentType).then((data) => {
          item.assistant = data;
          this.meetingsService.saveOrUpdateWeeklyProgram(item).subscribe((data2) => {
            console.log("saved assistant", data2);
          });
        }).catch((data) => {
          console.info(data);
        });
        break;
      case WeeklyProgramChangeType.START_TIME:
        this.modalService.selectedHour(item.startTime).then((data) => {
          if (data === ModalResult.CLOSE) {
            return;
          }
          console.log("startTime", data);
          item.startTime = data;
          this.meetingsService.saveOrUpdateWeeklyProgram(item).subscribe((data2) => {
            console.log("saved startTime", data2);
          });
        }).catch((data) => {
          console.info(data);
        });
        break;
      case WeeklyProgramChangeType.TITLE:
        this.modalService.setTitleAndTime(item).then((data) => {
          item = data;
          this.assignmentService.updateAssignment(item.assignment).subscribe((data2) => {
            console.log("saved setTitleAndTime", data2);
          });
        }).catch((data) => {
          console.info(data);
        });
        break;
      default:
        break;
    }
  }
  addAssign(item, sectionMeeting) {
    console.log(item, sectionMeeting);
    this.modalService.AddAssignment(item, sectionMeeting);
  }
  filterWeekByRoom(room, weeks) {
    return weeks.filter((i) => {
      return i.weeklyPrograms.filter((b) => b.room == room)?.length > 0;
    });
  }
  select() {
    this.semanasSalaAuxiliar = this.semanasSalaAuxiliar.map((i) => {
      i.weeklyPrograms = i.weeklyPrograms.filter((a) => a.room === MeetingRoom.AUXILIARY);
      return i;
    });
  }
  goToPrint() {
    this.dataService.setMeeting([...this.programList]);
  }
  filterByWeekNumber(event) {
    let weeks = [...this.programList];
    if (event == 0) {
      weeks = [...this.programList];
    } else {
      weeks = weeks.filter((week) => week.meeting.weekNumber === event);
    }
    this.semanas = this.filterWeekByRoom(MeetingRoom.MAIN, weeks);
    this.semanasSalaAuxiliar = [...this.filterWeekByRoom(MeetingRoom.AUXILIARY, weeks)];
    this.semanasAllRooms = this.dataService.makePDfVersion([...weeks]);
    this.dataService.setMeeting([...weeks]);
  }
  consultar($event, persistFilter = true) {
    if (!this.isValidCongregation(this.congregation)) {
      return;
    }
    const dateFilter = this.normalizeDateFilter($event);
    if (!dateFilter) {
      this.modalService.errorHandler("Selecciona una fecha inicial y una fecha final validas.", "Filtro de fechas");
      return;
    }
    if (persistFilter) {
      this.storeDateFilter(dateFilter);
    }
    this.cancelInitialProgramLoad$.next();
    const requestId = ++this.searchRequestId;
    this.loaderService.showMatspinner();
    this.requestedPages.clear();
    this.loadedPages.clear();
    this.programList = [];
    this.semanas = [];
    this.semanasSalaAuxiliar = [];
    this.semanasAllRooms = [];
    this.dataService.setMeeting([]);
    this.meetingsService.getProgramsByDateRange(dateFilter.fechaDesde, dateFilter.fechaHasta, this.congregation.id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (data) => {
        if (requestId !== this.searchRequestId) {
          return;
        }
        this.programList = [...data];
        this.semanas = [...data];
        this.semanasSalaAuxiliar = [...this.filterWeekByRoom(MeetingRoom.AUXILIARY, data)];
        this.semanasAllRooms = this.dataService.makePDfVersion(data);
        this.dataService.setMeeting([...data]);
        this.loaderService.hideMatspinner();
      },
      error: (error) => {
        if (requestId !== this.searchRequestId) {
          return;
        }
        console.error(error);
        this.loaderService.hideMatspinner();
        this.modalService.errorHandler("No se han podido obtener los programas", "Error");
      }
    });
  }
  clearDateFilter() {
    localStorage.removeItem(this.dateFilterStorageKey);
    this.hasStoredDateFilter = false;
    this.cancelInitialProgramLoad$.next();
    this.searchRequestId++;
    this.requestedPages.clear();
    this.loadedPages.clear();
    this.programList = [];
    this.semanas = [];
    this.semanasSalaAuxiliar = [];
    this.semanasAllRooms = [];
    this.dataService.setMeeting([]);
    this.loaderService.showMatspinner();
    this.getPrograms();
  }
  storeDateFilter(dateFilter) {
    localStorage.setItem(this.dateFilterStorageKey, JSON.stringify(dateFilter));
    this.hasStoredDateFilter = true;
  }
  readStoredDateFilter() {
    const storedValue = localStorage.getItem(this.dateFilterStorageKey);
    if (!storedValue) {
      return null;
    }
    try {
      const dateFilter = this.normalizeDateFilter(JSON.parse(storedValue));
      if (!dateFilter) {
        localStorage.removeItem(this.dateFilterStorageKey);
      }
      return dateFilter;
    } catch {
      localStorage.removeItem(this.dateFilterStorageKey);
      return null;
    }
  }
  normalizeDateFilter(filter) {
    const fechaDesde = this.normalizeDateValue(filter?.fechaDesde);
    const fechaHasta = this.normalizeDateValue(filter?.fechaHasta);
    if (!fechaDesde || !fechaHasta || fechaHasta < fechaDesde) {
      return null;
    }
    return { fechaDesde, fechaHasta };
  }
  isValidCongregation(congregation) {
    return typeof congregation?.id === "number" && Number.isInteger(congregation.id) && congregation.id > 0;
  }
  normalizeDateValue(value) {
    if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return Number.isFinite((/* @__PURE__ */ new Date(`${value}T00:00:00`)).getTime()) ? value : null;
    }
    const date = value instanceof Date ? value : new Date(value);
    if (!Number.isFinite(date.getTime())) {
      return null;
    }
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  static {
    this.\u0275fac = function EntreSemanaComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _EntreSemanaComponent)(\u0275\u0275directiveInject(MeetingsService), \u0275\u0275directiveInject(ModalService), \u0275\u0275directiveInject(DataService), \u0275\u0275directiveInject(AssignmentService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EntreSemanaComponent, selectors: [["vmc-entre-semana"]], standalone: false, decls: 3, vars: 5, consts: [[1, "entre-semana"], [3, "filtrar", "semanas", "semanasAllRooms", "RoomA", "room"], ["mat-fab", "", "type", "button", "aria-label", "Eliminar filtro de fechas", "matTooltip", "Eliminar filtro de fechas", 1, "entre-semana__clear-filter"], ["mat-fab", "", "type", "button", "aria-label", "Eliminar filtro de fechas", "matTooltip", "Eliminar filtro de fechas", 1, "entre-semana__clear-filter", 3, "click"]], template: function EntreSemanaComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "vmc-programs", 1);
        \u0275\u0275listener("filtrar", function EntreSemanaComponent_Template_vmc_programs_filtrar_1_listener($event) {
          return ctx.consultar($event);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275template(2, EntreSemanaComponent_Conditional_2_Template, 3, 0, "button", 2);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275property("semanas", ctx.semanas)("semanasAllRooms", ctx.semanasAllRooms)("RoomA", true)("room", ctx.meetingRoom.MAIN);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.hasStoredDateFilter ? 2 : -1);
      }
    }, dependencies: [ProgramsComponent, MatIcon, MatFabButton, MatTooltip], styles: ["\n\n[_nghost-%COMP%] {\n  display: flex;\n  height: 100%;\n  min-height: 0;\n  min-width: 0;\n  overflow: hidden;\n}\n.entre-semana[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n  display: flex;\n  flex: 1 1 0;\n  background-color: rgb(241, 239, 239);\n  min-height: 0;\n  min-width: 0;\n  overflow: hidden;\n  position: relative;\n  width: 100%;\n  margin: 0 auto;\n}\n.entre-semana__clear-filter[_ngcontent-%COMP%] {\n  bottom: 24px;\n  position: fixed;\n  right: 24px;\n  z-index: 1050;\n}\n@media (min-width: 1366px) {\n  .entre-semana[_ngcontent-%COMP%] {\n    padding: 10px 20px 10px 20px;\n    margin: 0;\n  }\n}\n@media (max-width: 575.98px) {\n  .entre-semana__clear-filter[_ngcontent-%COMP%] {\n    bottom: 16px;\n    right: 16px;\n  }\n}\n/*# sourceMappingURL=entre-semana.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EntreSemanaComponent, [{
    type: Component,
    args: [{ selector: "vmc-entre-semana", standalone: false, template: '<div class="entre-semana">\n  <vmc-programs [semanas]="semanas" [semanasAllRooms]="semanasAllRooms" [RoomA]="true" [room]="meetingRoom.MAIN"\n    (filtrar)="consultar($event)"\r\n  ></vmc-programs>\n\n  @if (hasStoredDateFilter) {\n    <button\n      mat-fab\n      type="button"\n      class="entre-semana__clear-filter"\n      aria-label="Eliminar filtro de fechas"\n      matTooltip="Eliminar filtro de fechas"\n      (click)="clearDateFilter()"\n    >\n      <mat-icon>filter_alt_off</mat-icon>\n    </button>\n  }\n</div>\n', styles: ["/* src/app/pages/entre-semana/entre-semana.component.scss */\n:host {\n  display: flex;\n  height: 100%;\n  min-height: 0;\n  min-width: 0;\n  overflow: hidden;\n}\n.entre-semana {\n  box-sizing: border-box;\n  display: flex;\n  flex: 1 1 0;\n  background-color: rgb(241, 239, 239);\n  min-height: 0;\n  min-width: 0;\n  overflow: hidden;\n  position: relative;\n  width: 100%;\n  margin: 0 auto;\n}\n.entre-semana__clear-filter {\n  bottom: 24px;\n  position: fixed;\n  right: 24px;\n  z-index: 1050;\n}\n@media (min-width: 1366px) {\n  .entre-semana {\n    padding: 10px 20px 10px 20px;\n    margin: 0;\n  }\n}\n@media (max-width: 575.98px) {\n  .entre-semana__clear-filter {\n    bottom: 16px;\n    right: 16px;\n  }\n}\n/*# sourceMappingURL=entre-semana.component.css.map */\n"] }]
  }], () => [{ type: MeetingsService }, { type: ModalService }, { type: DataService }, { type: AssignmentService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EntreSemanaComponent, { className: "EntreSemanaComponent", filePath: "src/app/pages/entre-semana/entre-semana.component.ts", lineNumber: 32 });
})();

// src/app/pages/entre-semana/entre-semana-routing.module.ts
var routes = [
  { path: "", component: EntreSemanaComponent }
];
var EntreSemanaRoutingModule = class _EntreSemanaRoutingModule {
  static {
    this.\u0275fac = function EntreSemanaRoutingModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _EntreSemanaRoutingModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _EntreSemanaRoutingModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EntreSemanaRoutingModule, [{
    type: NgModule,
    args: [{
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
    }]
  }], null, null);
})();

// src/app/pages/entre-semana/components/calendar-filter/calendar-filter/calendar-filter.module.ts
var Modules = [
  CommonModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatIconModule,
  MatButtonModule
];
var CalendarFilterModule = class _CalendarFilterModule {
  static {
    this.\u0275fac = function CalendarFilterModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CalendarFilterModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _CalendarFilterModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
      Modules,
      CommonModule,
      MatFormFieldModule,
      MatInputModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatIconModule,
      MatButtonModule
    ] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CalendarFilterModule, [{
    type: NgModule,
    args: [{
      declarations: [],
      imports: [...Modules],
      exports: [...Modules]
    }]
  }], null, null);
})();

// src/app/pages/entre-semana/components/calendar-filter/calendar-filter.component.ts
var CalendarFilterComponent = class _CalendarFilterComponent {
  constructor(_adapter, _locale) {
    this._adapter = _adapter;
    this._locale = _locale;
    this.onChange = new EventEmitter();
    this._locale = "co";
    this._adapter.setLocale(this._locale);
  }
  ngOnInit() {
  }
  getWeekNumber(event) {
    const date = new Date(event.value);
    const targetDate = new Date(date.valueOf());
    const dayNum = (targetDate.getDay() + 6) % 7;
    targetDate.setDate(targetDate.getDate() - dayNum + 3);
    const firstThursday = new Date(targetDate.getFullYear(), 0, 4);
    const firstThursdayDayNum = (firstThursday.getDay() + 6) % 7;
    firstThursday.setDate(firstThursday.getDate() - firstThursdayDayNum + 3);
    const weekNumber = 1 + Math.round(((targetDate.getTime() - firstThursday.getTime()) / 864e5 - 3 + (firstThursday.getDay() + 6) % 7) / 7);
    this.onChange.emit(weekNumber);
    localStorage.setItem("week", `${weekNumber}`);
    return weekNumber;
  }
  reset() {
    this.onChange.emit(0);
    localStorage.removeItem("week");
  }
  static {
    this.\u0275fac = function CalendarFilterComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CalendarFilterComponent)(\u0275\u0275directiveInject(DateAdapter), \u0275\u0275directiveInject(MAT_DATE_LOCALE));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CalendarFilterComponent, selectors: [["vmc-calendar-filter"]], outputs: { onChange: "onChange" }, decls: 14, vars: 2, consts: [["picker", ""], [1, "row", "p-0", "m-0"], [1, "col-md-11", "p-0", "m-0"], ["appearance", "fill", 1, "example-full-width", "me-2"], ["matInput", "", 3, "dateChange", "matDatepicker"], ["matIconSuffix", "", 3, "for"], ["matDatepickerToggleIcon", ""], ["mat-mini-fab", "", "color", "primary", "aria-label", "reset", 3, "click"]], template: function CalendarFilterComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "mat-form-field", 3)(3, "mat-label");
        \u0275\u0275text(4, "Filtro por semana");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "input", 4);
        \u0275\u0275listener("dateChange", function CalendarFilterComponent_Template_input_dateChange_5_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.getWeekNumber($event));
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "mat-datepicker-toggle", 5)(7, "mat-icon", 6);
        \u0275\u0275text(8, "keyboard_arrow_down");
        \u0275\u0275elementEnd()();
        \u0275\u0275element(9, "mat-datepicker", null, 0);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "button", 7);
        \u0275\u0275listener("click", function CalendarFilterComponent_Template_button_click_11_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.reset());
        });
        \u0275\u0275elementStart(12, "mat-icon");
        \u0275\u0275text(13, "home");
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        const picker_r2 = \u0275\u0275reference(10);
        \u0275\u0275advance(5);
        \u0275\u0275property("matDatepicker", picker_r2);
        \u0275\u0275advance();
        \u0275\u0275property("for", picker_r2);
      }
    }, dependencies: [CalendarFilterModule, MatFormField, MatLabel, MatSuffix, MatInput, MatDatepicker, MatDatepickerInput, MatDatepickerToggle, MatDatepickerToggleIcon, MatIcon, MatMiniFabButton], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CalendarFilterComponent, [{
    type: Component,
    args: [{ selector: "vmc-calendar-filter", imports: [CalendarFilterModule], template: '<div class="row p-0 m-0">\n  <div class="col-md-11 p-0 m-0">\n    <mat-form-field class="example-full-width me-2" appearance="fill">\n      <mat-label>Filtro por semana</mat-label>\n      <input matInput [matDatepicker]="picker" (dateChange)="getWeekNumber($event)" >\n      <!-- <mat-hint>DD/MM/YYYY</mat-hint> -->\n      <mat-datepicker-toggle matIconSuffix [for]="picker">\n        <mat-icon matDatepickerToggleIcon>keyboard_arrow_down</mat-icon>\n\n      </mat-datepicker-toggle>\n      <mat-datepicker #picker></mat-datepicker>\n    </mat-form-field>\n    <button mat-mini-fab color="primary"  aria-label="reset" (click)="reset()">\n      <mat-icon>home</mat-icon>\n    </button>\n  </div>\n</div>\n\n' }]
  }], () => [{ type: DateAdapter }, { type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DATE_LOCALE]
  }] }], { onChange: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CalendarFilterComponent, { className: "CalendarFilterComponent", filePath: "src/app/pages/entre-semana/components/calendar-filter/calendar-filter.component.ts", lineNumber: 13 });
})();

// src/app/pages/entre-semana/entre-semana.module.ts
var EntreSemanaModule = class _EntreSemanaModule {
  static {
    this.\u0275fac = function EntreSemanaModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _EntreSemanaModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _EntreSemanaModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
      CommonModule,
      EntreSemanaRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      ProgramsComponent,
      CalendarFilterComponent,
      SharedModule
    ] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EntreSemanaModule, [{
    type: NgModule,
    args: [{
      declarations: [
        EntreSemanaComponent
      ],
      imports: [
        CommonModule,
        EntreSemanaRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        ProgramsComponent,
        CalendarFilterComponent,
        SharedModule
      ]
    }]
  }], null, null);
})();
export {
  EntreSemanaModule
};
//# sourceMappingURL=entre-semana.module-JU4FZW2N.js.map
