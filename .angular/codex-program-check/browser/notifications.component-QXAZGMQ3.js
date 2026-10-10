import {
  NotificationService
} from "./chunk-CN37YKRR.js";
import {
  AssignmentService,
  Utils
} from "./chunk-M2KX2K5L.js";
import {
  Component,
  DataService,
  EventEmitter,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  Input,
  MatButtonModule,
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatIcon,
  MatIconButton,
  MatPaginator,
  MatProgressSpinner,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
  MatTableModule,
  MatTooltip,
  MatTooltipModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgSelectOption,
  Output,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  Subject,
  ViewChild,
  __spreadProps,
  __spreadValues,
  distinctUntilChanged,
  environment,
  inject,
  setClassMetadata,
  takeUntil,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-MIOFCSIM.js";

// src/app/pages/notifications/notifications.component.ts
var _forTrack0 = ($index, $item) => $item.value;
function NotificationsComponent_For_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    \u0275\u0275property("value", item_r1.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r1.label);
  }
}
function NotificationsComponent_For_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    \u0275\u0275property("value", item_r2.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r2.label);
  }
}
function NotificationsComponent_For_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    \u0275\u0275property("value", item_r3.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r3.label);
  }
}
function NotificationsComponent_Conditional_35_th_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 28);
    \u0275\u0275text(1, "Fecha");
    \u0275\u0275elementEnd();
  }
}
function NotificationsComponent_Conditional_35_td_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 29);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r4 = ctx.$implicit;
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r4.parceDate(row_r4.assignment == null ? null : row_r4.assignment.meeting == null ? null : row_r4.assignment.meeting.week, row_r4.event), " ");
  }
}
function NotificationsComponent_Conditional_35_th_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 28);
    \u0275\u0275text(1, "Nombre");
    \u0275\u0275elementEnd();
  }
}
function NotificationsComponent_Conditional_35_td_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 29);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (row_r6.user == null ? null : row_r6.user.fullName) || "-", " ");
  }
}
function NotificationsComponent_Conditional_35_th_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 28);
    \u0275\u0275text(1, "N\xFAmero");
    \u0275\u0275elementEnd();
  }
}
function NotificationsComponent_Conditional_35_td_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 29);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r7 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r7.number || "-", " ");
  }
}
function NotificationsComponent_Conditional_35_th_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 28);
    \u0275\u0275text(1, "Titulo");
    \u0275\u0275elementEnd();
  }
}
function NotificationsComponent_Conditional_35_td_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 29);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r8 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (row_r8.assignment == null ? null : row_r8.assignment.title) || "-", " ");
  }
}
function NotificationsComponent_Conditional_35_th_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 28);
    \u0275\u0275text(1, "Tipo");
    \u0275\u0275elementEnd();
  }
}
function NotificationsComponent_Conditional_35_td_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 29);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r9 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r9.assignmentType || "-", " ");
  }
}
function NotificationsComponent_Conditional_35_th_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 28);
    \u0275\u0275text(1, "Email");
    \u0275\u0275elementEnd();
  }
}
function NotificationsComponent_Conditional_35_td_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 29);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r10 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (row_r10.user == null ? null : row_r10.user.email) || "-", " ");
  }
}
function NotificationsComponent_Conditional_35_th_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 30);
    \u0275\u0275text(1, "Notificaciones");
    \u0275\u0275elementEnd();
  }
}
function NotificationsComponent_Conditional_35_td_21_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-progress-spinner", 33);
  }
}
function NotificationsComponent_Conditional_35_td_21_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "email");
    \u0275\u0275elementEnd();
  }
}
function NotificationsComponent_Conditional_35_td_21_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-progress-spinner", 33);
  }
}
function NotificationsComponent_Conditional_35_td_21_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "notifications_active");
    \u0275\u0275elementEnd();
  }
}
function NotificationsComponent_Conditional_35_td_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 31)(1, "button", 32);
    \u0275\u0275listener("click", function NotificationsComponent_Conditional_35_td_21_Template_button_click_1_listener() {
      const row_r12 = \u0275\u0275restoreView(_r11).$implicit;
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.onSendEmail(row_r12));
    });
    \u0275\u0275template(2, NotificationsComponent_Conditional_35_td_21_Conditional_2_Template, 1, 0, "mat-progress-spinner", 33)(3, NotificationsComponent_Conditional_35_td_21_Conditional_3_Template, 2, 0, "mat-icon");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 34);
    \u0275\u0275listener("click", function NotificationsComponent_Conditional_35_td_21_Template_button_click_4_listener() {
      const row_r12 = \u0275\u0275restoreView(_r11).$implicit;
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.onSendReminder(row_r12));
    });
    \u0275\u0275template(5, NotificationsComponent_Conditional_35_td_21_Conditional_5_Template, 1, 0, "mat-progress-spinner", 33)(6, NotificationsComponent_Conditional_35_td_21_Conditional_6_Template, 2, 0, "mat-icon");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r12 = ctx.$implicit;
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", row_r12.notificationSentAt || ctx_r4.isLoading(row_r12));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r4.isLoading(row_r12) ? 2 : 3);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r4.isLoading(row_r12));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r4.isLoading(row_r12) ? 5 : 6);
  }
}
function NotificationsComponent_Conditional_35_tr_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 35);
  }
}
function NotificationsComponent_Conditional_35_tr_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 36);
  }
}
function NotificationsComponent_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 13);
    \u0275\u0275elementContainerStart(1, 14);
    \u0275\u0275template(2, NotificationsComponent_Conditional_35_th_2_Template, 2, 0, "th", 15)(3, NotificationsComponent_Conditional_35_td_3_Template, 2, 1, "td", 16);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(4, 17);
    \u0275\u0275template(5, NotificationsComponent_Conditional_35_th_5_Template, 2, 0, "th", 15)(6, NotificationsComponent_Conditional_35_td_6_Template, 2, 1, "td", 16);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(7, 18);
    \u0275\u0275template(8, NotificationsComponent_Conditional_35_th_8_Template, 2, 0, "th", 15)(9, NotificationsComponent_Conditional_35_td_9_Template, 2, 1, "td", 16);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(10, 19);
    \u0275\u0275template(11, NotificationsComponent_Conditional_35_th_11_Template, 2, 0, "th", 15)(12, NotificationsComponent_Conditional_35_td_12_Template, 2, 1, "td", 16);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(13, 20);
    \u0275\u0275template(14, NotificationsComponent_Conditional_35_th_14_Template, 2, 0, "th", 15)(15, NotificationsComponent_Conditional_35_td_15_Template, 2, 1, "td", 16);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(16, 21);
    \u0275\u0275template(17, NotificationsComponent_Conditional_35_th_17_Template, 2, 0, "th", 15)(18, NotificationsComponent_Conditional_35_td_18_Template, 2, 1, "td", 16);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(19, 22);
    \u0275\u0275template(20, NotificationsComponent_Conditional_35_th_20_Template, 2, 0, "th", 23)(21, NotificationsComponent_Conditional_35_td_21_Template, 7, 4, "td", 24);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(22, NotificationsComponent_Conditional_35_tr_22_Template, 1, 0, "tr", 25)(23, NotificationsComponent_Conditional_35_tr_23_Template, 1, 0, "tr", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275element(24, "mat-paginator", 27);
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275property("dataSource", ctx_r4.dataSource);
    \u0275\u0275advance(22);
    \u0275\u0275property("matHeaderRowDef", ctx_r4.displayedColumns);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r4.displayedColumns)("matRowDefTrackBy", ctx_r4.trackByUserId);
    \u0275\u0275advance();
    \u0275\u0275property("pageSize", ctx_r4.pageSize)("pageSizeOptions", ctx_r4.pageSizeOptions);
  }
}
var NotificationsComponent = class _NotificationsComponent {
  constructor(assignmentService, dataService, fb) {
    this.assignmentService = assignmentService;
    this.dataService = dataService;
    this.fb = fb;
    this.rows = [];
    this.pageSize = environment.pagination.pageSize;
    this.pageSizeOptions = [...environment.pagination.pageSizeOptions];
    this.sendEmail = new EventEmitter();
    this.sendReminder = new EventEmitter();
    this.displayedColumns = ["week", "fullName", "number", "title", "assignmentType", "email", "actions"];
    this.dataSource = new MatTableDataSource([]);
    this.valuesComboSemanas = [];
    this.valuesComboSecciones = [];
    this.valuesComboParticipantes = [];
    this.dataSourceAllRaws = new MatTableDataSource([]);
    this.destroy$ = new Subject();
    this.notify = inject(NotificationService);
    this.loadingByKey = /* @__PURE__ */ new Set();
    this.trackByUserId = (_, item) => item.user?.id ?? item.programId;
  }
  ngOnInit() {
    this.filtersForm = this.fb.group({
      week: [""],
      section: [""],
      participant: [""],
      search: [""]
    });
    this.dataService.getMeeting().subscribe((data) => {
      console.log("Programas recibidos:", data);
      this.fitroComboSemanas(data);
      this.fitroComboSeccion(data);
      this.dataSource.data = this.parseProgram(data);
      this.dataSourceAllRaws.data = this.parseProgram(data);
    });
    this.filtersForm.get("week").valueChanges.pipe(distinctUntilChanged(), takeUntil(this.destroy$)).subscribe(() => this.applyFilters());
    this.filtersForm.get("section").valueChanges.pipe(distinctUntilChanged(), takeUntil(this.destroy$)).subscribe(() => this.applyFilters());
    this.filtersForm.get("participant").valueChanges.pipe(distinctUntilChanged(), takeUntil(this.destroy$)).subscribe(() => this.applyFilters());
    this.filtersForm.get("search").valueChanges.pipe(distinctUntilChanged(), takeUntil(this.destroy$)).subscribe(() => this.applyFilters());
  }
  applyFilters() {
    const week = (this.filtersForm.get("week").value ?? "").toString().trim();
    const section = (this.filtersForm.get("section").value ?? "").toString().trim();
    const participant = (this.filtersForm.get("participant").value ?? "").toString().trim();
    this.dataSource.data = this.dataSourceAllRaws.data.filter((row) => {
      const okWeek = !week || row.assignment?.meeting?.week?.toString() == week;
      const okSection = !section || row.assignment?.sectionMeeting == section;
      const okParticipant = !participant || row.user.fullName.toString().trim() == participant.toString().trim();
      return okWeek && okSection && okParticipant;
    });
  }
  // Opcional: botón "Limpiar"
  clearFilters() {
    this.filtersForm.reset({
      week: "",
      section: "",
      participant: "",
      search: ""
    });
    this.dataSource.data = [...this.dataSourceAllRaws.data];
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  parseProgram(program) {
    let users = [];
    const participantes = /* @__PURE__ */ new Set();
    program.forEach((item) => {
      const programId = item.id;
      item.weeklyPrograms.forEach((wp) => {
        participantes.add(wp.assistant?.fullName || "");
        participantes.add(wp.responsible?.fullName || "");
        if (wp.assistant) {
          users.push({
            programId: wp.id,
            user: wp.assistant,
            assignmentType: "Ayudante",
            assignment: wp.assignment,
            event: item.event,
            notificationSentAt: wp.notificationSentAt,
            number: wp.assignment?.number
          });
        }
        if (wp.responsible) {
          users.push({
            programId: wp.id,
            user: wp.responsible,
            assignmentType: "Responsable",
            assignment: wp.assignment,
            event: item.event,
            notificationSentAt: wp.notificationSentAt,
            number: wp.assignment?.number
          });
        }
      });
    });
    this.valuesComboParticipantes = Array.from(participantes).map((n) => (n ?? "").trim()).filter((n) => n.length > 0).sort((a, b) => a.localeCompare(b, "es", { sensitivity: "base" })).map((name) => ({ value: name, label: name }));
    return users;
  }
  fitroComboSemanas(program) {
    this.valuesComboSemanas = program.map((p) => ({ value: p.meeting.week, label: Utils.showDayOfMeeting(p.meeting.week, 3, false, p.event) }));
  }
  fitroComboSeccion(program) {
    this.valuesComboSecciones = this.getUniqueSectionMeetings(program);
  }
  getUniqueSectionMeetings(programs) {
    const map = /* @__PURE__ */ new Map();
    for (const program of programs ?? []) {
      for (const wp of program?.weeklyPrograms ?? []) {
        const value = wp?.assignment?.sectionMeeting?.trim();
        if (!value)
          continue;
        if (!map.has(value)) {
          map.set(value, { value, label: value });
        }
      }
    }
    return Array.from(map.values()).sort((a, b) => a.label.localeCompare(b.label));
  }
  ngOnChanges(changes) {
    if (changes["rows"]) {
      this.dataSource.data = this.rows ?? [];
      if (this.paginator)
        this.dataSource.paginator = this.paginator;
    }
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  designationsText(row) {
    const list = row?.user?.designations ?? [];
    if (!list.length)
      return "-";
    return list.map((d) => d.description).join(", ");
  }
  onSendEmail(row) {
    this.loadingByKey.add(row.programId);
    const body = {
      userId: row.user.id,
      programId: row.programId,
      templateNumber: 1,
      assignmentType: row.assignmentType
    };
    this.sendNotifications(body);
  }
  onSendReminder(row) {
    this.loadingByKey.add(row.programId);
    const body = {
      userId: row.user.id,
      programId: row.programId,
      templateNumber: 2,
      assignmentType: row.assignmentType
    };
    this.sendNotifications(body);
  }
  parceDate(dateStr, event) {
    return Utils.showDayOfMeeting(dateStr, 3, false, event);
  }
  sendNotifications(body) {
    this.assignmentService.sendNotifications(body).subscribe({
      next: (resp) => {
        this.updateNotificationSentAtInPlace(this.dataSource.data, body.programId);
        this.notify.success("Notificaci\xF3n enviada correctamente", "\xA1Hecho!");
        this.loadingByKey.delete(body.programId);
      },
      error: (err) => {
        this.loadingByKey.delete(body.programId);
        this.notify.error(err.message, "Ups. algo sali\xF3 mal");
        console.error(err);
      }
    });
  }
  updateNotificationSentAtInPlace(rows, programId) {
    const row = rows.find((r) => r.programId === programId);
    this.dataSource.data = rows.map((r) => {
      if (r.programId === programId) {
        return __spreadProps(__spreadValues({}, r), { notificationSentAt: (/* @__PURE__ */ new Date()).toISOString() });
      }
      return r;
    });
  }
  isLoading(row) {
    return this.loadingByKey.has(row.programId);
  }
  static {
    this.\u0275fac = function NotificationsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NotificationsComponent)(\u0275\u0275directiveInject(AssignmentService), \u0275\u0275directiveInject(DataService), \u0275\u0275directiveInject(FormBuilder));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NotificationsComponent, selectors: [["vmc-notifications"]], viewQuery: function NotificationsComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(MatPaginator, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.paginator = _t.first);
      }
    }, inputs: { rows: "rows", pageSize: "pageSize", pageSizeOptions: "pageSizeOptions" }, outputs: { sendEmail: "sendEmail", sendReminder: "sendReminder" }, features: [\u0275\u0275NgOnChangesFeature], decls: 36, vars: 2, consts: [[3, "formGroup"], [1, "row", "bg-white", "border", "rounded-3", "shadow-sm", "p-3", "g-3", "align-items-end", "mb-3"], [1, "col-12", "col-md-6", "col-lg-4"], ["for", "combo1", 1, "form-label", "fw-semibold", "mb-1"], ["id", "combo1", "aria-label", "Semana", "formControlName", "week", 1, "form-select"], ["value", ""], [3, "value"], [1, "form-text"], ["for", "combo2", 1, "form-label", "fw-semibold", "mb-1"], ["id", "combo2", "aria-label", "Secci\xF3n", "formControlName", "section", 1, "form-select"], ["for", "combo3", 1, "form-label", "fw-semibold", "mb-1"], ["id", "combo3", "aria-label", "Participante", "formControlName", "participant", 1, "form-select"], [1, "table-wrap"], ["mat-table", "", 1, "mat-elevation-z1", 3, "dataSource"], ["matColumnDef", "week"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "fullName"], ["matColumnDef", "number"], ["matColumnDef", "title"], ["matColumnDef", "assignmentType"], ["matColumnDef", "email"], ["matColumnDef", "actions"], ["mat-header-cell", "", "class", "actions-col", 4, "matHeaderCellDef"], ["mat-cell", "", "class", "actions-col", 4, "matCellDef"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns", "matRowDefTrackBy"], ["showFirstLastButtons", "", 3, "pageSize", "pageSizeOptions"], ["mat-header-cell", ""], ["mat-cell", ""], ["mat-header-cell", "", 1, "actions-col"], ["mat-cell", "", 1, "actions-col"], ["mat-icon-button", "", "type", "button", "aria-label", "Enviar email informativo", "matTooltip", "Enviar email informativo", 1, "btn-mat", 3, "click", "disabled"], ["diameter", "18", "mode", "indeterminate", "aria-label", "Enviando..."], ["mat-icon-button", "", "type", "button", "aria-label", "Enviar email recordatorio", "matTooltip", "Enviar email recordatorio", 1, "btn-mat", 3, "click", "disabled"], ["mat-header-row", ""], ["mat-row", ""]], template: function NotificationsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "form", 0)(1, "div", 1)(2, "h5");
        \u0275\u0275text(3, "Filtros");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "div", 2)(5, "label", 3);
        \u0275\u0275text(6, "Semana");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "select", 4)(8, "option", 5);
        \u0275\u0275text(9, "Selecciona una opci\xF3n");
        \u0275\u0275elementEnd();
        \u0275\u0275repeaterCreate(10, NotificationsComponent_For_11_Template, 2, 2, "option", 6, _forTrack0);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "div", 7);
        \u0275\u0275text(13, "Elige la semana.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(14, "div", 2)(15, "label", 8);
        \u0275\u0275text(16, "Secci\xF3n");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "select", 9)(18, "option", 5);
        \u0275\u0275text(19, "Selecciona una opci\xF3n");
        \u0275\u0275elementEnd();
        \u0275\u0275repeaterCreate(20, NotificationsComponent_For_21_Template, 2, 2, "option", 6, _forTrack0);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(22, "div", 7);
        \u0275\u0275text(23, "Filtra por secci\xF3n.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(24, "div", 2)(25, "label", 10);
        \u0275\u0275text(26, "Participante");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(27, "select", 11)(28, "option", 5);
        \u0275\u0275text(29, "Selecciona una opci\xF3n");
        \u0275\u0275elementEnd();
        \u0275\u0275repeaterCreate(30, NotificationsComponent_For_31_Template, 2, 2, "option", 6, _forTrack0);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "div", 7);
        \u0275\u0275text(33, "Filtra por participante.");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(34, "div", 12);
        \u0275\u0275template(35, NotificationsComponent_Conditional_35_Template, 25, 6);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275property("formGroup", ctx.filtersForm);
        \u0275\u0275advance(10);
        \u0275\u0275repeater(ctx.valuesComboSemanas);
        \u0275\u0275advance(10);
        \u0275\u0275repeater(ctx.valuesComboSecciones);
        \u0275\u0275advance(10);
        \u0275\u0275repeater(ctx.valuesComboParticipantes);
        \u0275\u0275advance(5);
        \u0275\u0275conditional(ctx.dataSource && ctx.dataSource.data.length > 0 ? 35 : -1);
      }
    }, dependencies: [MatIcon, MatTableModule, MatTable, MatHeaderCellDef, MatHeaderRowDef, MatColumnDef, MatCellDef, MatRowDef, MatHeaderCell, MatCell, MatHeaderRow, MatRow, MatPaginator, MatTooltipModule, MatTooltip, MatButtonModule, MatIconButton, ReactiveFormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, MatProgressSpinner], styles: ["\n\n.table-wrap[_ngcontent-%COMP%] {\n  width: 100%;\n  overflow: auto;\n}\ntable[_ngcontent-%COMP%] {\n  width: 100%;\n  min-width: 900px;\n}\n.actions-col[_ngcontent-%COMP%] {\n  width: 120px;\n  white-space: nowrap;\n  text-align: center;\n}\n.actions-col[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin: 0 4px;\n}\n.btn-mat[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  pointer-events: all !important;\n  opacity: 0.6;\n}\n/*# sourceMappingURL=notifications.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NotificationsComponent, [{
    type: Component,
    args: [{ selector: "vmc-notifications", imports: [MatIcon, MatTableModule, MatPaginator, MatTooltipModule, MatButtonModule, ReactiveFormsModule, MatProgressSpinner], template: '<form [formGroup]="filtersForm">\r\n  <div class="row bg-white border rounded-3 shadow-sm p-3 g-3 align-items-end mb-3">\r\n    <h5>Filtros</h5>\r\n\r\n    <!-- Combo 1 -->\r\n    <div class="col-12 col-md-6 col-lg-4">\r\n      <label for="combo1" class="form-label fw-semibold mb-1">Semana</label>\r\n      <select id="combo1" class="form-select" aria-label="Semana" formControlName="week">\r\n        <option value="">Selecciona una opci\xF3n</option>\r\n        @for (item of valuesComboSemanas; track item.value) {\r\n        <option [value]="item.value">{{ item.label }}</option>\r\n        }\r\n      </select>\r\n      <div class="form-text">Elige la semana.</div>\r\n    </div>\r\n\r\n    <!-- Combo 2 -->\r\n    <div class="col-12 col-md-6 col-lg-4">\r\n      <label for="combo2" class="form-label fw-semibold mb-1">Secci\xF3n</label>\r\n      <select id="combo2" class="form-select" aria-label="Secci\xF3n" formControlName="section">\r\n        <option value="">Selecciona una opci\xF3n</option>\r\n        @for (item of valuesComboSecciones; track item.value) {\r\n        <option [value]="item.value">{{ item.label }}</option>\r\n        }\r\n      </select>\r\n      <div class="form-text">Filtra por secci\xF3n.</div>\r\n    </div>\r\n\r\n    <!-- Combo 3 -->\r\n    <div class="col-12 col-md-6 col-lg-4">\r\n      <label for="combo3" class="form-label fw-semibold mb-1">Participante</label>\r\n      <select id="combo3" class="form-select" aria-label="Participante" formControlName="participant">\r\n        <option value="">Selecciona una opci\xF3n</option>\r\n        @for (item of valuesComboParticipantes; track item.value) {\r\n        <option [value]="item.value">{{ item.label }}</option>\r\n        }\r\n      </select>\r\n      <div class="form-text">Filtra por participante.</div>\r\n    </div>\r\n  </div>\r\n</form>\r\n\r\n<div class="table-wrap">\r\n  @if(dataSource && dataSource.data.length > 0){\r\n  <table mat-table [dataSource]="dataSource" class="mat-elevation-z1">\r\n    <!-- Fecha -->\r\n    <ng-container matColumnDef="week">\r\n      <th mat-header-cell *matHeaderCellDef>Fecha</th>\r\n      <td mat-cell *matCellDef="let row">\r\n        {{ parceDate(row.assignment?.meeting?.week, row.event) }}\n      </td>\r\n    </ng-container>\r\n\r\n    <!-- Nombre -->\r\n    <ng-container matColumnDef="fullName">\r\n      <th mat-header-cell *matHeaderCellDef>Nombre</th>\r\n      <td mat-cell *matCellDef="let row">\r\n        {{ row.user?.fullName || "-" }}\r\n      </td>\r\n    </ng-container>\r\n\r\n        <!-- number -->\r\n    <ng-container matColumnDef="number">\r\n      <th mat-header-cell *matHeaderCellDef>N\xFAmero</th>\r\n      <td mat-cell *matCellDef="let row">\r\n        {{ row.number || "-" }}\r\n      </td>\r\n    </ng-container>\r\n\r\n    <!-- Titulo -->\r\n    <ng-container matColumnDef="title">\r\n      <th mat-header-cell *matHeaderCellDef>Titulo</th>\r\n      <td mat-cell *matCellDef="let row">\r\n        {{ row.assignment?.title || "-" }}\r\n      </td>\r\n    </ng-container>\r\n\r\n    <!-- Tipo -->\r\n    <ng-container matColumnDef="assignmentType">\r\n      <th mat-header-cell *matHeaderCellDef>Tipo</th>\r\n      <td mat-cell *matCellDef="let row">\r\n        {{ row.assignmentType || "-" }}\r\n      </td>\r\n    </ng-container>\r\n\r\n    <!-- Email -->\r\n    <ng-container matColumnDef="email">\r\n      <th mat-header-cell *matHeaderCellDef>Email</th>\r\n      <td mat-cell *matCellDef="let row">\r\n        {{ row.user?.email || "-" }}\r\n      </td>\r\n    </ng-container>\r\n\r\n    <!-- Acciones -->\r\n    <ng-container matColumnDef="actions">\r\n      <th mat-header-cell *matHeaderCellDef class="actions-col">Notificaciones</th>\r\n      <td mat-cell *matCellDef="let row" class="actions-col">\r\n        <button\r\n          class="btn-mat"\r\n          mat-icon-button\r\n          type="button"\r\n          aria-label="Enviar email informativo"\r\n          matTooltip="Enviar email informativo"\r\n          (click)="onSendEmail(row)"\r\n          [disabled]="row.notificationSentAt || isLoading(row)"\r\n        >\r\n          @if (isLoading(row)) {\r\n          <mat-progress-spinner diameter="18" mode="indeterminate" aria-label="Enviando..." />\r\n          } @else {\r\n          <mat-icon>email</mat-icon>\r\n          }\r\n        </button>\r\n\r\n        <button\r\n          class="btn-mat"\r\n          mat-icon-button\r\n          type="button"\r\n          aria-label="Enviar email recordatorio"\r\n          matTooltip="Enviar email recordatorio"\r\n          (click)="onSendReminder(row)"\r\n          [disabled]="isLoading(row)"\r\n        >\r\n          @if (isLoading(row)) {\r\n          <mat-progress-spinner diameter="18" mode="indeterminate" aria-label="Enviando..." />\r\n          } @else {\r\n          <mat-icon>notifications_active</mat-icon>\r\n          }\r\n        </button>\r\n      </td>\r\n    </ng-container>\r\n\r\n    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>\r\n\r\n    <!-- \u2705 trackBy va as\xED (NO [matRowDefTrackBy]) -->\r\n    <tr mat-row *matRowDef="let row; columns: displayedColumns; trackBy: trackByUserId"></tr>\r\n  </table>\r\n\r\n  <mat-paginator [pageSize]="pageSize" [pageSizeOptions]="pageSizeOptions" showFirstLastButtons></mat-paginator>\r\n  }\r\n</div>\r\n', styles: ["/* src/app/pages/notifications/notifications.component.scss */\n.table-wrap {\n  width: 100%;\n  overflow: auto;\n}\ntable {\n  width: 100%;\n  min-width: 900px;\n}\n.actions-col {\n  width: 120px;\n  white-space: nowrap;\n  text-align: center;\n}\n.actions-col button {\n  margin: 0 4px;\n}\n.btn-mat:disabled {\n  cursor: not-allowed;\n  pointer-events: all !important;\n  opacity: 0.6;\n}\n/*# sourceMappingURL=notifications.component.css.map */\n"] }]
  }], () => [{ type: AssignmentService }, { type: DataService }, { type: FormBuilder }], { rows: [{
    type: Input
  }], pageSize: [{
    type: Input
  }], pageSizeOptions: [{
    type: Input
  }], sendEmail: [{
    type: Output
  }], sendReminder: [{
    type: Output
  }], paginator: [{
    type: ViewChild,
    args: [MatPaginator]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NotificationsComponent, { className: "NotificationsComponent", filePath: "src/app/pages/notifications/notifications.component.ts", lineNumber: 51 });
})();
export {
  NotificationsComponent
};
//# sourceMappingURL=notifications.component-QXAZGMQ3.js.map
