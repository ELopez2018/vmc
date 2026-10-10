import {
  DashboardComponent,
  LoginGuard,
  NotFoundComponent,
  PublisherListComponent,
  isAdminEmail
} from "./chunk-WGBBHCG5.js";
import {
  CongregationsService,
  UsersCreateOrUpdateComponent
} from "./chunk-5I7EVSHF.js";
import {
  CongregationMock,
  require_sweetalert2_all
} from "./chunk-7XONH5AH.js";
import {
  AssignmentSheetPrinterComponent,
  ModalService,
  PrinterComponent,
  SharedModule,
  WeeklyProgramService
} from "./chunk-HOK7MI44.js";
import {
  MAT_DIALOG_DATA,
  MatAutocomplete,
  MatAutocompleteTrigger,
  MatCard,
  MatChipGrid,
  MatChipInput,
  MatChipRemove,
  MatChipRow,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
  MatInput,
  MatProgressBar,
  MatTab,
  MatTabGroup,
  MatTabsModule,
  MaterialModule,
  MeetingsService,
  ProgramValidationsService,
  Router,
  RouterModule,
  takeUntilDestroyed
} from "./chunk-5TOJZSZF.js";
import "./chunk-CN37YKRR.js";
import {
  Utils
} from "./chunk-M2KX2K5L.js";
import {
  Apis,
  AsyncPipe,
  COMMA,
  CommonModule,
  Component,
  CookieService,
  DataService,
  DefaultValueAccessor,
  DestroyRef,
  ENTER,
  FormControl,
  FormControlDirective,
  FormControlName,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  HttpClient,
  HttpParams,
  Inject,
  Injectable,
  MatButton,
  MatButtonModule,
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatError,
  MatFabButton,
  MatFormField,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatHint,
  MatIcon,
  MatIconButton,
  MatIconModule,
  MatLabel,
  MatOption,
  MatProgressSpinner,
  MatRow,
  MatRowDef,
  MatSelect,
  MatSnackBar,
  MatTable,
  MatTableDataSource,
  MatTableModule,
  MatTooltip,
  MaxLengthValidator,
  MinValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModule,
  NumberValueAccessor,
  ReactiveFormsModule,
  Servers,
  Subscription,
  UsersService,
  Validators,
  ViewChild,
  __async,
  __spreadProps,
  __spreadValues,
  __toESM,
  catchError,
  finalize,
  forkJoin,
  inject,
  map,
  of,
  setClassMetadata,
  startWith,
  take,
  tap,
  ɵNgNoValidate,
  ɵsetClassDebugInfo,
  ɵɵInheritDefinitionFeature,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-MIOFCSIM.js";

// src/app/core/Class/base-component.ts
var BaseComponent = class _BaseComponent {
  constructor() {
    this.subs = new Subscription();
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  addSubscription(sub) {
    this.subs.add(sub);
  }
  static {
    this.\u0275fac = function BaseComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BaseComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BaseComponent, selectors: [["app-base-component"]], standalone: false, decls: 0, vars: 0, template: function BaseComponent_Template(rf, ctx) {
    }, encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BaseComponent, [{
    type: Component,
    args: [{ selector: "app-base-component", template: "", standalone: false }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BaseComponent, { className: "BaseComponent", filePath: "src/app/core/class/base-component.ts", lineNumber: 10 });
})();

// src/app/pages/publisher-privileges/publisher-privileges.component.ts
var _c0 = ["fruitInput"];
function PublisherPrivilegesComponent_For_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-chip-row", 22);
    \u0275\u0275listener("removed", function PublisherPrivilegesComponent_For_34_Template_mat_chip_row_removed_0_listener() {
      const designation_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.remove(designation_r3));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "button", 23)(3, "mat-icon");
    \u0275\u0275text(4, "cancel");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const designation_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", designation_r3, " ");
  }
}
function PublisherPrivilegesComponent_For_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const fruit_r5 = ctx.$implicit;
    \u0275\u0275property("value", fruit_r5);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", fruit_r5, " ");
  }
}
var PublisherPrivilegesComponent = class _PublisherPrivilegesComponent extends BaseComponent {
  constructor(dataService, modalService, usersService) {
    super();
    this.dataService = dataService;
    this.modalService = modalService;
    this.usersService = usersService;
    this.separatorKeysCodes = [ENTER, COMMA];
    this.fruitCtrl = new FormControl("");
    this.designations = ["Publicador"];
    this.allDesignations = [];
    this.designationsList = [];
    this.disabledSave = false;
    this.addSubscription(this.dataService.getPublisher().subscribe((data) => {
      this.publisher = data;
      console.log({ data });
    }));
    this.addSubscription(this.dataService.getDesignations().subscribe((data) => {
      this.designationsList = [...data];
      this.allDesignations = data.map((data2) => data2.description);
    }));
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(startWith(null), map((fruit) => fruit ? this._filter(fruit) : this.allDesignations.slice()));
  }
  ngOnInit() {
  }
  add(event) {
    const value = (event.value || "").trim();
    if (value && !this.designations.includes(value)) {
      this.designations.push(value);
    }
    event.chipInput.clear();
    this.fruitCtrl.setValue(null);
  }
  remove(fruit) {
    const index = this.designations.indexOf(fruit);
    if (index >= 0) {
      this.designations.splice(index, 1);
    }
  }
  selected(event) {
    const value = event.option.viewValue;
    if (value && !this.designations.includes(value)) {
      this.designations.push(value);
    }
    this.fruitInput.nativeElement.value = "";
    this.fruitCtrl.setValue(null);
  }
  _filter(value) {
    const filterValue = value.toLowerCase();
    return this.allDesignations.filter((fruit) => fruit.toLowerCase().includes(filterValue));
  }
  save() {
    this.disabledSave = true;
    const designations = this.designations.map((data) => {
      const matchedDesignation = this.designationsList.find((i) => i.description === data);
      return matchedDesignation;
    });
    const publisher = __spreadValues({}, this.publisher);
    publisher.designations = designations;
    this.usersService.save(publisher).subscribe((data) => {
      this.disabledSave = false;
    }, (error) => {
      this.disabledSave = false;
    });
  }
  openModal() {
    this.modalService.selectPublisher().then((data) => {
      this.publisher = data;
      this.designations = [...this.publisher.designations.map((i) => i.description)];
    });
  }
  get disabled() {
    return this.disabledSave;
  }
  static {
    this.\u0275fac = function PublisherPrivilegesComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _PublisherPrivilegesComponent)(\u0275\u0275directiveInject(DataService), \u0275\u0275directiveInject(ModalService), \u0275\u0275directiveInject(UsersService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PublisherPrivilegesComponent, selectors: [["publisher-privileges"]], viewQuery: function PublisherPrivilegesComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c0, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.fruitInput = _t.first);
      }
    }, features: [\u0275\u0275InheritDefinitionFeature], decls: 55, vars: 10, consts: [["chipGrid", ""], ["fruitInput", ""], ["auto", "matAutocomplete"], [1, "page-container"], [1, "section-card"], [1, "header-row"], [1, "publisher-info"], [1, "avatar"], [1, "publisher-data"], [1, "publisher-name"], [1, "publisher-contact"], [1, "separator"], ["mat-raised-button", "", "color", "primary", 3, "click"], [1, "section-title"], ["appearance", "outline", 1, "full-width"], ["aria-label", "Nombramientos"], ["placeholder", "Agregar privilegio...", 3, "matChipInputTokenEnd", "formControl", "matChipInputFor", "matAutocomplete", "matChipInputSeparatorKeyCodes"], [3, "optionSelected"], [3, "value"], [1, "actions"], ["mat-raised-button", "", "color", "primary", 3, "click", "disabled"], [1, "history-placeholder"], [3, "removed"], ["matChipRemove", ""]], template: function PublisherPrivilegesComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "div", 3)(1, "mat-card", 4)(2, "div", 5)(3, "div", 6)(4, "div", 7)(5, "mat-icon");
        \u0275\u0275text(6, "person");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "div", 8)(8, "div", 9);
        \u0275\u0275text(9);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "div", 10)(11, "span");
        \u0275\u0275text(12);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "span", 11);
        \u0275\u0275text(14, "\u2022");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(15, "span");
        \u0275\u0275text(16);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(17, "button", 12);
        \u0275\u0275listener("click", function PublisherPrivilegesComponent_Template_button_click_17_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.openModal());
        });
        \u0275\u0275elementStart(18, "mat-icon");
        \u0275\u0275text(19, "groups");
        \u0275\u0275elementEnd();
        \u0275\u0275text(20, " Publicadores ");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(21, "mat-card", 4)(22, "div", 13)(23, "mat-icon");
        \u0275\u0275text(24, "workspace_premium");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(25, "span");
        \u0275\u0275text(26, "Privilegios");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(27, "form")(28, "mat-form-field", 14)(29, "mat-label");
        \u0275\u0275text(30, "Nombramientos");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(31, "mat-chip-grid", 15, 0);
        \u0275\u0275repeaterCreate(33, PublisherPrivilegesComponent_For_34_Template, 5, 1, "mat-chip-row", null, \u0275\u0275repeaterTrackByIdentity);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(35, "input", 16, 1);
        \u0275\u0275listener("matChipInputTokenEnd", function PublisherPrivilegesComponent_Template_input_matChipInputTokenEnd_35_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.add($event));
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(37, "mat-autocomplete", 17, 2);
        \u0275\u0275listener("optionSelected", function PublisherPrivilegesComponent_Template_mat_autocomplete_optionSelected_37_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.selected($event));
        });
        \u0275\u0275repeaterCreate(39, PublisherPrivilegesComponent_For_40_Template, 2, 2, "mat-option", 18, \u0275\u0275repeaterTrackByIdentity);
        \u0275\u0275pipe(41, "async");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(42, "div", 19)(43, "button", 20);
        \u0275\u0275listener("click", function PublisherPrivilegesComponent_Template_button_click_43_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.save());
        });
        \u0275\u0275elementStart(44, "mat-icon");
        \u0275\u0275text(45, "save");
        \u0275\u0275elementEnd();
        \u0275\u0275text(46, " Guardar ");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(47, "mat-card", 4)(48, "div", 13)(49, "mat-icon");
        \u0275\u0275text(50, "history");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(51, "span");
        \u0275\u0275text(52, "Hist\xF3rico de Asignaciones");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(53, "div", 21);
        \u0275\u0275text(54, " Sin registros por ahora ");
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        const chipGrid_r6 = \u0275\u0275reference(32);
        const auto_r7 = \u0275\u0275reference(38);
        \u0275\u0275advance(9);
        \u0275\u0275textInterpolate(ctx.publisher.fullName);
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(ctx.publisher.cellPhone);
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate(ctx.publisher.email);
        \u0275\u0275advance(17);
        \u0275\u0275repeater(ctx.designations);
        \u0275\u0275advance(2);
        \u0275\u0275property("formControl", ctx.fruitCtrl)("matChipInputFor", chipGrid_r6)("matAutocomplete", auto_r7)("matChipInputSeparatorKeyCodes", ctx.separatorKeysCodes);
        \u0275\u0275advance(4);
        \u0275\u0275repeater(\u0275\u0275pipeBind1(41, 8, ctx.filteredFruits));
        \u0275\u0275advance(4);
        \u0275\u0275property("disabled", ctx.disabled);
      }
    }, dependencies: [SharedModule, MatIcon, MatButton, MatAutocomplete, MatOption, MatAutocompleteTrigger, MatCard, MatChipGrid, MatChipInput, MatChipRemove, MatChipRow, MatFormField, MatLabel, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, NgForm, FormsModule, ReactiveFormsModule, FormControlDirective, CommonModule, AsyncPipe], styles: ["\n\n.example-chip-list[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.page-container[_ngcontent-%COMP%] {\n  padding: 40px;\n  background: #f5f7fb;\n  min-height: 100vh;\n}\n.section-card[_ngcontent-%COMP%] {\n  margin-bottom: 30px;\n  padding: 30px;\n  border-radius: 14px;\n  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);\n}\n.header-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 20px;\n}\n.publisher-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n.avatar[_ngcontent-%COMP%] {\n  width: 60px;\n  height: 60px;\n  border-radius: 50%;\n  background: #e8eaf6;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 28px;\n  color: #3f51b5;\n}\n.publisher-name[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-weight: 600;\n}\n.publisher-contact[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #666;\n  margin-top: 4px;\n}\n.separator[_ngcontent-%COMP%] {\n  margin: 0 6px;\n}\n.section-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-size: 18px;\n  font-weight: 600;\n  margin-bottom: 20px;\n  color: #1a237e;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.actions[_ngcontent-%COMP%] {\n  margin-top: 20px;\n  display: flex;\n  justify-content: flex-end;\n}\n.history-placeholder[_ngcontent-%COMP%] {\n  padding: 20px;\n  text-align: center;\n  color: #777;\n}\n/*# sourceMappingURL=publisher-privileges.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PublisherPrivilegesComponent, [{
    type: Component,
    args: [{ selector: "publisher-privileges", imports: [SharedModule, FormsModule, ReactiveFormsModule, CommonModule], template: '<div class="page-container">\n\n  <!-- PERFIL PUBLICADOR -->\n  <mat-card class="section-card">\n\n    <div class="header-row">\n\n      <div class="publisher-info">\n\n        <div class="avatar">\n          <mat-icon>person</mat-icon>\n        </div>\n\n        <div class="publisher-data">\n          <div class="publisher-name">{{ publisher.fullName }}</div>\n          <div class="publisher-contact">\n            <span>{{ publisher.cellPhone }}</span>\n            <span class="separator">\u2022</span>\n            <span>{{ publisher.email }}</span>\n          </div>\n        </div>\n\n      </div>\n\n      <button mat-raised-button color="primary" (click)="openModal()">\n        <mat-icon>groups</mat-icon>\n        Publicadores\n      </button>\n\n    </div>\n\n  </mat-card>\n\n\n  <!-- PRIVILEGIOS -->\n  <mat-card class="section-card">\n\n    <div class="section-title">\n      <mat-icon>workspace_premium</mat-icon>\n      <span>Privilegios</span>\n    </div>\n\n    <form>\n\n      <mat-form-field appearance="outline" class="full-width">\n\n        <mat-label>Nombramientos</mat-label>\n\n        <mat-chip-grid #chipGrid aria-label="Nombramientos">\n\n          @for (designation of designations; track designation) {\n          <mat-chip-row (removed)="remove(designation)">\n\n            {{designation}}\n\n            <button matChipRemove>\n              <mat-icon>cancel</mat-icon>\n            </button>\n\n          </mat-chip-row>\n          }\n\n        </mat-chip-grid>\n\n        <input\n          placeholder="Agregar privilegio..."\n          #fruitInput\n          [formControl]="fruitCtrl"\n          [matChipInputFor]="chipGrid"\n          [matAutocomplete]="auto"\n          [matChipInputSeparatorKeyCodes]="separatorKeysCodes"\n          (matChipInputTokenEnd)="add($event)" />\n\n        <mat-autocomplete #auto="matAutocomplete" (optionSelected)="selected($event)">\n          @for (fruit of filteredFruits | async; track fruit) {\n          <mat-option [value]="fruit">\n            {{fruit}}\n          </mat-option>\n          }\n        </mat-autocomplete>\n\n      </mat-form-field>\n\n    </form>\n\n    <div class="actions">\n      <button mat-raised-button color="primary" [disabled]="disabled" (click)="save()">\n        <mat-icon>save</mat-icon>\n        Guardar\n      </button>\n    </div>\n\n  </mat-card>\n\n\n  <!-- HISTORICO -->\n  <mat-card class="section-card">\n\n    <div class="section-title">\n      <mat-icon>history</mat-icon>\n      <span>Hist\xF3rico de Asignaciones</span>\n    </div>\n\n    <div class="history-placeholder">\n      Sin registros por ahora\n    </div>\n\n  </mat-card>\n\n</div>', styles: ["/* src/app/pages/publisher-privileges/publisher-privileges.component.scss */\n.example-chip-list {\n  width: 100%;\n}\n.page-container {\n  padding: 40px;\n  background: #f5f7fb;\n  min-height: 100vh;\n}\n.section-card {\n  margin-bottom: 30px;\n  padding: 30px;\n  border-radius: 14px;\n  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);\n}\n.header-row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 20px;\n}\n.publisher-info {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n.avatar {\n  width: 60px;\n  height: 60px;\n  border-radius: 50%;\n  background: #e8eaf6;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 28px;\n  color: #3f51b5;\n}\n.publisher-name {\n  font-size: 20px;\n  font-weight: 600;\n}\n.publisher-contact {\n  font-size: 14px;\n  color: #666;\n  margin-top: 4px;\n}\n.separator {\n  margin: 0 6px;\n}\n.section-title {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-size: 18px;\n  font-weight: 600;\n  margin-bottom: 20px;\n  color: #1a237e;\n}\n.full-width {\n  width: 100%;\n}\n.actions {\n  margin-top: 20px;\n  display: flex;\n  justify-content: flex-end;\n}\n.history-placeholder {\n  padding: 20px;\n  text-align: center;\n  color: #777;\n}\n/*# sourceMappingURL=publisher-privileges.component.css.map */\n"] }]
  }], () => [{ type: DataService }, { type: ModalService }, { type: UsersService }], { fruitInput: [{
    type: ViewChild,
    args: ["fruitInput"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PublisherPrivilegesComponent, { className: "PublisherPrivilegesComponent", filePath: "src/app/pages/publisher-privileges/publisher-privileges.component.ts", lineNumber: 22 });
})();

// src/app/core/services/program/program.service.ts
var ProgramService = class _ProgramService {
  constructor(httpClient, programValidations) {
    this.httpClient = httpClient;
    this.programValidations = programValidations;
    this.server = Servers.URL;
    this.api = Apis;
  }
  getAll() {
    const url = `${this.server}${this.api.PROGRAM}`;
    return this.httpClient.get(url);
  }
  getById(id) {
    const url = `${this.server}${this.api.PROGRAM}/${id}`;
    return this.httpClient.get(url);
  }
  getByCongregation(congregationId) {
    const url = `${this.server}${this.api.PROGRAM}/congregation/${congregationId}`;
    return this.httpClient.get(url);
  }
  /** El backend normaliza la fecha recibida al lunes de esa semana. */
  getProgramsByWeek(filters = {}) {
    let params = new HttpParams();
    if (filters.congregationId != null && filters.congregationId > 0) {
      params = params.set("congregationId", String(filters.congregationId));
    }
    if (filters.date) {
      params = params.set("date", filters.date);
    }
    const url = `${this.server}${this.api.PROGRAM}/by-week`;
    return this.httpClient.get(url, { params });
  }
  create(program) {
    const url = `${this.server}${this.api.PROGRAM}`;
    return this.httpClient.post(url, program).pipe(tap((response) => this.programValidations.applyValidations(response.validations)));
  }
  update(id, program) {
    const url = `${this.server}${this.api.PROGRAM}/${id}`;
    return this.httpClient.put(url, program).pipe(tap((response) => this.programValidations.applyValidations(response.validations)));
  }
  delete(id) {
    const url = `${this.server}${this.api.PROGRAM}/${id}`;
    return this.httpClient.delete(url).pipe(tap((response) => {
      this.programValidations.applyValidations(response.validations);
      this.programValidations.removeProgram(response.id);
    }));
  }
  static {
    this.\u0275fac = function ProgramService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ProgramService)(\u0275\u0275inject(HttpClient), \u0275\u0275inject(ProgramValidationsService));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ProgramService, factory: _ProgramService.\u0275fac, providedIn: "root" });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProgramService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }, { type: ProgramValidationsService }], null);
})();

// src/app/pages/entre-semana/manager/programs/program-form-dialog/program-form-dialog.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function ProgramFormDialogComponent_For_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 5);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const congregation_r1 = ctx.$implicit;
    \u0275\u0275property("value", congregation_r1.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(congregation_r1.name);
  }
}
function ProgramFormDialogComponent_For_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 5);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const meeting_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("value", meeting_r2.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.getMeetingLabel(meeting_r2));
  }
}
function ProgramFormDialogComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 9);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.getProgramError());
  }
}
var ProgramFormDialogComponent = class _ProgramFormDialogComponent {
  constructor(data, dialogRef, programService, snackBar) {
    this.data = data;
    this.dialogRef = dialogRef;
    this.programService = programService;
    this.snackBar = snackBar;
    this.saving = false;
    this.programForm = new FormGroup({
      meetingId: new FormControl(null, Validators.required),
      congregationId: new FormControl(null, Validators.required),
      weekNumber: new FormControl(null, [Validators.min(1)]),
      event: new FormControl(null, [Validators.maxLength(255)])
    });
  }
  ngOnInit() {
    this.patchInitialValue();
  }
  onMeetingChange(meetingId) {
    const meeting = this.data.meetings.find((item) => item.id === meetingId);
    this.programForm.patchValue({ weekNumber: meeting?.weekNumber ?? null });
  }
  save() {
    if (this.programForm.invalid) {
      this.programForm.markAllAsTouched();
      return;
    }
    this.saving = true;
    const request = this.buildRequest();
    const saveRequest$ = this.data.program?.id ? this.programService.update(this.data.program.id, request) : this.programService.create(request);
    saveRequest$.pipe(finalize(() => {
      this.saving = false;
    })).subscribe({
      next: () => {
        this.notify(this.data.program?.id ? "Programa actualizado." : "Programa creado.");
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.notify(this.getErrorMessage(error, "No se pudo guardar el programa."));
      }
    });
  }
  getMeetingLabel(meeting) {
    if (!meeting) {
      return "Sin reunion";
    }
    const selectedMeetingId = this.programForm.get("meetingId")?.value;
    const event = selectedMeetingId === meeting.id ? this.programForm.get("event")?.value : null;
    return `Semana ${meeting.weekNumber ?? ""}${meeting.week ? " - " + Utils.showDayOfMeeting(meeting.week, this.getSelectedCongregationDay(), false, event) : ""}`;
  }
  getProgramError() {
    if (this.programForm.get("meetingId")?.hasError("required")) {
      return "Selecciona la reunion.";
    }
    if (this.programForm.get("congregationId")?.hasError("required")) {
      return "Selecciona la congregacion.";
    }
    return null;
  }
  patchInitialValue() {
    const program = this.data.program;
    const congregationId = program?.congregation?.id ?? this.data.congregationId ?? null;
    const meetingId = program?.meeting?.id ?? this.data.meetingId ?? null;
    const meeting = this.data.meetings.find((item) => item.id === meetingId);
    this.programForm.reset({
      meetingId,
      congregationId,
      weekNumber: program?.weekNumber ?? meeting?.weekNumber ?? null,
      event: program?.event ?? null
    });
  }
  getSelectedCongregationDay() {
    const congregationId = this.programForm.get("congregationId")?.value ?? this.data.congregationId;
    return this.data.congregations.find((congregation) => congregation.id === congregationId)?.day ?? 1;
  }
  buildRequest() {
    const formValue = this.programForm.getRawValue();
    const program = this.data.program;
    return {
      meetingId: Number(formValue.meetingId),
      congregationId: Number(formValue.congregationId),
      weekNumber: formValue.weekNumber ?? null,
      startTimeOpeningSong: this.toApiTime(program?.startTimeOpeningSong),
      startTimeIntro: this.toApiTime(program?.startTimeIntro),
      startTimeIntermediateSong: this.toApiTime(program?.startTimeIntermediateSong),
      startTimeConclusionWords: this.toApiTime(program?.startTimeConclusionWords),
      startTimeFinalSong: this.toApiTime(program?.startTimeFinalSong),
      event: formValue.event?.trim() || null,
      openingPrayerId: program?.openingPrayer?.id ?? null,
      presidentId: program?.president?.id ?? null,
      assistantAdviserId: program?.assistantAdviser?.id ?? null,
      finalPrayerId: program?.finalPrayer?.id ?? null
    };
  }
  toApiTime(value) {
    if (!value) {
      return null;
    }
    if (Array.isArray(value)) {
      const [hours = 0, minutes = 0, seconds] = value;
      const normalizedTime = [hours, minutes].map((item) => item.toString().padStart(2, "0")).join(":");
      return seconds === void 0 ? normalizedTime : `${normalizedTime}:${seconds.toString().padStart(2, "0")}`;
    }
    return value;
  }
  notify(message) {
    this.snackBar.open(message, "Cerrar", {
      duration: 4500,
      horizontalPosition: "end",
      verticalPosition: "top"
    });
  }
  getErrorMessage(error, fallback) {
    if (typeof error === "string") {
      return error || fallback;
    }
    const fieldErrors = error?.errors?.map((item) => item.message).filter(Boolean).join(" ");
    return fieldErrors || error?.message || fallback;
  }
  static {
    this.\u0275fac = function ProgramFormDialogComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ProgramFormDialogComponent)(\u0275\u0275directiveInject(MAT_DIALOG_DATA), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(ProgramService), \u0275\u0275directiveInject(MatSnackBar));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProgramFormDialogComponent, selectors: [["vmc-program-form-dialog"]], decls: 33, vars: 5, consts: [["mat-dialog-title", ""], [1, "program-form", 3, "ngSubmit", "formGroup"], [1, "program-form__grid", "program-form__grid--main"], ["appearance", "outline"], ["formControlName", "congregationId"], [3, "value"], ["formControlName", "meetingId", 3, "selectionChange"], ["matInput", "", "type", "number", "formControlName", "weekNumber", "min", "1"], ["matInput", "", "type", "text", "formControlName", "event", "maxlength", "255"], [1, "program-form__error"], ["align", "end"], ["mat-button", "", "type", "button", "mat-dialog-close", "", 3, "disabled"], ["mat-flat-button", "", "color", "primary", "type", "button", 3, "click", "disabled"]], template: function ProgramFormDialogComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "h2", 0);
        \u0275\u0275text(1);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(2, "mat-dialog-content")(3, "form", 1);
        \u0275\u0275listener("ngSubmit", function ProgramFormDialogComponent_Template_form_ngSubmit_3_listener() {
          return ctx.save();
        });
        \u0275\u0275elementStart(4, "div", 2)(5, "mat-form-field", 3)(6, "mat-label");
        \u0275\u0275text(7, "Congregacion");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "mat-select", 4);
        \u0275\u0275repeaterCreate(9, ProgramFormDialogComponent_For_10_Template, 2, 2, "mat-option", 5, _forTrack0);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(11, "mat-form-field", 3)(12, "mat-label");
        \u0275\u0275text(13, "Semana");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "mat-select", 6);
        \u0275\u0275listener("selectionChange", function ProgramFormDialogComponent_Template_mat_select_selectionChange_14_listener($event) {
          return ctx.onMeetingChange($event.value);
        });
        \u0275\u0275repeaterCreate(15, ProgramFormDialogComponent_For_16_Template, 2, 2, "mat-option", 5, _forTrack0);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(17, "mat-form-field", 3)(18, "mat-label");
        \u0275\u0275text(19, "Numero de semana");
        \u0275\u0275elementEnd();
        \u0275\u0275element(20, "input", 7);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "mat-form-field", 3)(22, "mat-label");
        \u0275\u0275text(23, "Evento");
        \u0275\u0275elementEnd();
        \u0275\u0275element(24, "input", 8);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(25, ProgramFormDialogComponent_Conditional_25_Template, 2, 1, "p", 9);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(26, "mat-dialog-actions", 10)(27, "button", 11);
        \u0275\u0275text(28, "Cancelar");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(29, "button", 12);
        \u0275\u0275listener("click", function ProgramFormDialogComponent_Template_button_click_29_listener() {
          return ctx.save();
        });
        \u0275\u0275elementStart(30, "mat-icon");
        \u0275\u0275text(31, "save");
        \u0275\u0275elementEnd();
        \u0275\u0275text(32, " Guardar ");
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275textInterpolate((ctx.data.program == null ? null : ctx.data.program.id) ? "Editar programa" : "Nuevo programa");
        \u0275\u0275advance(2);
        \u0275\u0275property("formGroup", ctx.programForm);
        \u0275\u0275advance(6);
        \u0275\u0275repeater(ctx.data.congregations);
        \u0275\u0275advance(6);
        \u0275\u0275repeater(ctx.data.meetings);
        \u0275\u0275advance(10);
        \u0275\u0275conditional(ctx.getProgramError() ? 25 : -1);
        \u0275\u0275advance(2);
        \u0275\u0275property("disabled", ctx.saving);
        \u0275\u0275advance(2);
        \u0275\u0275property("disabled", ctx.saving);
      }
    }, dependencies: [CommonModule, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, NgControlStatusGroup, MaxLengthValidator, MinValidator, FormGroupDirective, FormControlName, MatDialogModule, MatDialogClose, MatDialogTitle, MatDialogActions, MatDialogContent, MaterialModule, MatIcon, MatButton, MatOption, MatInput, MatFormField, MatLabel, MatSelect], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\n.program-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n  min-width: min(860px, 82vw);\n  padding-top: 6px;\n}\n.program-form__grid--main[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(240px, 1.5fr) minmax(260px, 1.6fr) minmax(150px, 0.85fr) minmax(180px, 1fr);\n  gap: 14px;\n  padding-top: 8px;\n}\n.program-form__error[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #b91c1c;\n  font-weight: 650;\n}\n[_nghost-%COMP%]     .program-form__grid--main .mat-mdc-form-field-infix {\n  min-height: 48px;\n}\n[_nghost-%COMP%]     .program-form__grid--main .mdc-notched-outline__notch {\n  max-width: calc(100% - 24px);\n}\n@media (max-width: 900px) {\n  .program-form[_ngcontent-%COMP%] {\n    min-width: 0;\n  }\n  .program-form__grid--main[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, minmax(190px, 1fr));\n  }\n}\n@media (max-width: 560px) {\n  .program-form__grid--main[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=program-form-dialog.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProgramFormDialogComponent, [{
    type: Component,
    args: [{ selector: "vmc-program-form-dialog", standalone: true, imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MaterialModule], template: '<h2 mat-dialog-title>{{ data.program?.id ? "Editar programa" : "Nuevo programa" }}</h2>\n\n<mat-dialog-content>\n  <form class="program-form" [formGroup]="programForm" (ngSubmit)="save()">\n    <div class="program-form__grid program-form__grid--main">\n      <mat-form-field appearance="outline">\n        <mat-label>Congregacion</mat-label>\n        <mat-select formControlName="congregationId">\n          @for (congregation of data.congregations; track congregation.id) {\n          <mat-option [value]="congregation.id">{{ congregation.name }}</mat-option>\n          }\n        </mat-select>\n      </mat-form-field>\n\n      <mat-form-field appearance="outline">\n        <mat-label>Semana</mat-label>\n        <mat-select formControlName="meetingId" (selectionChange)="onMeetingChange($event.value)">\n          @for (meeting of data.meetings; track meeting.id) {\n          <mat-option [value]="meeting.id">{{ getMeetingLabel(meeting) }}</mat-option>\n          }\n        </mat-select>\n      </mat-form-field>\n\n      <mat-form-field appearance="outline">\n        <mat-label>Numero de semana</mat-label>\n        <input matInput type="number" formControlName="weekNumber" min="1">\n      </mat-form-field>\n\n      <mat-form-field appearance="outline">\n        <mat-label>Evento</mat-label>\n        <input matInput type="text" formControlName="event" maxlength="255">\n      </mat-form-field>\n    </div>\n\n    @if (getProgramError()) {\n    <p class="program-form__error">{{ getProgramError() }}</p>\n    }\n  </form>\n</mat-dialog-content>\n\n<mat-dialog-actions align="end">\n  <button mat-button type="button" mat-dialog-close [disabled]="saving">Cancelar</button>\n  <button mat-flat-button color="primary" type="button" (click)="save()" [disabled]="saving">\n    <mat-icon>save</mat-icon>\n    Guardar\n  </button>\n</mat-dialog-actions>\n', styles: ["/* src/app/pages/entre-semana/manager/programs/program-form-dialog/program-form-dialog.component.scss */\n:host {\n  display: block;\n}\n.program-form {\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n  min-width: min(860px, 82vw);\n  padding-top: 6px;\n}\n.program-form__grid--main {\n  display: grid;\n  grid-template-columns: minmax(240px, 1.5fr) minmax(260px, 1.6fr) minmax(150px, 0.85fr) minmax(180px, 1fr);\n  gap: 14px;\n  padding-top: 8px;\n}\n.program-form__error {\n  margin: 0;\n  color: #b91c1c;\n  font-weight: 650;\n}\n:host ::ng-deep .program-form__grid--main .mat-mdc-form-field-infix {\n  min-height: 48px;\n}\n:host ::ng-deep .program-form__grid--main .mdc-notched-outline__notch {\n  max-width: calc(100% - 24px);\n}\n@media (max-width: 900px) {\n  .program-form {\n    min-width: 0;\n  }\n  .program-form__grid--main {\n    grid-template-columns: repeat(2, minmax(190px, 1fr));\n  }\n}\n@media (max-width: 560px) {\n  .program-form__grid--main {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=program-form-dialog.component.css.map */\n"] }]
  }], () => [{ type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }, { type: MatDialogRef }, { type: ProgramService }, { type: MatSnackBar }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProgramFormDialogComponent, { className: "ProgramFormDialogComponent", filePath: "src/app/pages/entre-semana/manager/programs/program-form-dialog/program-form-dialog.component.ts", lineNumber: 27 });
})();

// src/app/pages/entre-semana/manager/programs/programs.component.ts
var _forTrack02 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.week;
function ProgramsComponent_For_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 5);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const congregation_r1 = ctx.$implicit;
    \u0275\u0275property("value", congregation_r1.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(congregation_r1.name);
  }
}
function ProgramsComponent_For_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 5);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const week_r2 = ctx.$implicit;
    \u0275\u0275property("value", week_r2.week);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(week_r2.label);
  }
}
function ProgramsComponent_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-progress-bar", 10);
  }
}
function ProgramsComponent_th_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 27);
    \u0275\u0275text(1, "No");
    \u0275\u0275elementEnd();
  }
}
function ProgramsComponent_td_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 28);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const program_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(program_r3.weekNumber);
  }
}
function ProgramsComponent_th_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 27);
    \u0275\u0275text(1, "Semana");
    \u0275\u0275elementEnd();
  }
}
function ProgramsComponent_td_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 28);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const program_r4 = ctx.$implicit;
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r4.getProgramWeekLabel(program_r4));
  }
}
function ProgramsComponent_th_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 27);
    \u0275\u0275text(1, "Congregacion");
    \u0275\u0275elementEnd();
  }
}
function ProgramsComponent_td_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 28);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const program_r6 = ctx.$implicit;
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r4.getProgramCongregationLabel(program_r6));
  }
}
function ProgramsComponent_th_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 27);
    \u0275\u0275text(1, "Partes");
    \u0275\u0275elementEnd();
  }
}
function ProgramsComponent_td_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 28);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    const program_r7 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate((tmp_2_0 = program_r7.weeklyPrograms == null ? null : program_r7.weeklyPrograms.length) !== null && tmp_2_0 !== void 0 ? tmp_2_0 : 0);
  }
}
function ProgramsComponent_th_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 27);
    \u0275\u0275text(1, "Evento");
    \u0275\u0275elementEnd();
  }
}
function ProgramsComponent_td_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 29);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const program_r8 = ctx.$implicit;
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r4.getEventLabel(program_r8));
  }
}
function ProgramsComponent_th_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "th", 27);
  }
}
function ProgramsComponent_td_48_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 30)(1, "button", 31);
    \u0275\u0275listener("click", function ProgramsComponent_td_48_Template_button_click_1_listener() {
      const program_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.selectedEdit(program_r10));
    });
    \u0275\u0275elementStart(2, "mat-icon");
    \u0275\u0275text(3, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "button", 32);
    \u0275\u0275listener("click", function ProgramsComponent_td_48_Template_button_click_4_listener() {
      const program_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.toDelete(program_r10));
    });
    \u0275\u0275elementStart(5, "mat-icon");
    \u0275\u0275text(6, "delete");
    \u0275\u0275elementEnd()()();
  }
}
function ProgramsComponent_tr_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 33);
  }
}
function ProgramsComponent_tr_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 34);
  }
}
function ProgramsComponent_Conditional_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 25);
    \u0275\u0275element(1, "mat-spinner", 35);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Cargando programas\u2026");
    \u0275\u0275elementEnd()();
  }
}
function ProgramsComponent_Conditional_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275text(1, "No hay datos para la semana seleccionada.");
    \u0275\u0275elementEnd();
  }
}
var ProgramsComponent = class _ProgramsComponent {
  constructor(programService, meetingsService, congregationsService, snackBar, dialog) {
    this.programService = programService;
    this.meetingsService = meetingsService;
    this.congregationsService = congregationsService;
    this.snackBar = snackBar;
    this.dialog = dialog;
    this.destroyRef = inject(DestroyRef);
    this.programList = [];
    this.congregations = [];
    this.meetings = [];
    this.weekOptions = [];
    this.displayedColumns = ["weekNumber", "week", "congregation", "weeklyPrograms", "event", "actions"];
    this.selectedCongregationId = null;
    this.selectedWeek = null;
    this.catalogLoading = true;
    this.loading = false;
  }
  ngOnInit() {
    this.loadCatalogs();
  }
  loadCatalogs() {
    this.catalogLoading = true;
    forkJoin({
      congregations: this.congregationsService.getAllCongregations().pipe(catchError(() => of([]))),
      meetings: this.meetingsService.getAllMeetings().pipe(catchError(() => of([])))
    }).pipe(finalize(() => {
      this.catalogLoading = false;
    }), takeUntilDestroyed(this.destroyRef)).subscribe(({ congregations, meetings }) => {
      this.congregations = this.normalizeArray(congregations);
      this.meetings = this.normalizeArray(meetings);
      this.weekOptions = this.buildWeekOptions();
      this.selectedWeek = this.resolveDefaultWeek(this.selectedWeek);
      this.selectedCongregationId = this.resolveDefaultCongregationId();
      this.loadPrograms();
    });
  }
  get isLoading() {
    return this.catalogLoading || this.loading;
  }
  loadPrograms() {
    this.loading = true;
    this.programService.getProgramsByWeek({ congregationId: this.selectedCongregationId, date: this.selectedWeek }).pipe(finalize(() => {
      this.loading = false;
    }), takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (programs) => {
        this.programList = [...programs].sort((a, b) => (a.weekNumber ?? 0) - (b.weekNumber ?? 0));
      },
      error: (error) => this.handleLoadError(error)
    });
  }
  onFilterCongregationChange(congregationId) {
    this.selectedCongregationId = congregationId;
    this.loadPrograms();
  }
  onWeekChange(week) {
    this.selectedWeek = week;
    this.loadPrograms();
  }
  getProgramCongregationLabel(program) {
    return program.congregation?.name?.trim() || "Sin congregacion";
  }
  openCreateDialog() {
    this.openProgramDialog(null, this.resolveSelectedMeetingId());
  }
  selectedEdit(program) {
    this.openProgramDialog(program, program.meeting?.id ?? null);
  }
  toDelete(program) {
    if (!confirm(`Eliminar el programa de la semana ${program.weekNumber}?`)) {
      return;
    }
    this.programService.delete(program.id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.notify("Programa eliminado.");
        this.loadPrograms();
      },
      error: (error) => {
        this.notify(this.getErrorMessage(error, "No se pudo eliminar el programa."));
      }
    });
  }
  getMeetingLabel(meeting, meetingDay = this.getSelectedCongregationDay()) {
    if (!meeting) {
      return "Sin reunion";
    }
    return `Semana ${meeting.weekNumber ?? ""}${meeting.week ? " - " + Utils.showDayOfMeeting(meeting.week, meetingDay) : ""}`;
  }
  getProgramWeekLabel(program) {
    const week = program.meeting?.week;
    if (!week) {
      return "Sin fecha";
    }
    return Utils.showDayOfMeeting(week, program.congregation?.day ?? this.getSelectedCongregationDay(), false, program.event);
  }
  getEventLabel(program) {
    return program.event?.trim() || "Sin evento";
  }
  openProgramDialog(program, meetingId) {
    this.dialog.open(ProgramFormDialogComponent, {
      autoFocus: false,
      width: "min(980px, 96vw)",
      maxWidth: "96vw",
      data: {
        congregations: this.congregations,
        meetings: this.meetings,
        program,
        congregationId: program?.congregation?.id ?? this.selectedCongregationId,
        meetingId
      }
    }).afterClosed().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((saved) => {
      if (saved) {
        this.loadPrograms();
      }
    });
  }
  handleLoadError(error) {
    this.programList = [];
    if (error?.status === 404) {
      this.selectedCongregationId = null;
      this.notify("La congregacion seleccionada no existe. Se recargo el catalogo.");
      this.loadCatalogs();
      return;
    }
    this.notify(this.getErrorMessage(error, "No se pudieron cargar los programas."));
  }
  buildWeekOptions() {
    const weekMap = /* @__PURE__ */ new Map();
    this.meetings.forEach((meeting) => {
      const week = this.normalizeWeekValue(meeting.week);
      if (!week || weekMap.has(week)) {
        return;
      }
      weekMap.set(week, {
        week,
        label: this.getMeetingLabel(meeting, this.getSelectedCongregationDay()),
        meetingId: meeting.id ?? null
      });
    });
    return [...weekMap.values()].sort((a, b) => new Date(a.week).getTime() - new Date(b.week).getTime());
  }
  resolveDefaultWeek(preferredWeek) {
    if (preferredWeek && this.weekOptions.some((option) => option.week === preferredWeek)) {
      return preferredWeek;
    }
    const today = /* @__PURE__ */ new Date();
    const currentWeek = this.weekOptions.find((option) => this.isDateInWeek(today, option.week));
    if (currentWeek) {
      return currentWeek.week;
    }
    return this.weekOptions.find((option) => new Date(option.week).getTime() > today.getTime())?.week ?? this.weekOptions.at(-1)?.week ?? null;
  }
  resolveSelectedMeetingId() {
    const weekOptionMeetingId = this.weekOptions.find((option) => option.week === this.selectedWeek)?.meetingId;
    if (weekOptionMeetingId) {
      return weekOptionMeetingId;
    }
    return this.meetings.find((meeting) => this.normalizeWeekValue(meeting.week) === this.selectedWeek)?.id ?? null;
  }
  getSelectedCongregationDay() {
    return this.congregations.find((congregation) => congregation.id === this.selectedCongregationId)?.day ?? 1;
  }
  resolveDefaultCongregationId() {
    const storedCongregation = this.readStorageObject("congregation");
    const storedCongregationId = storedCongregation?.id ?? null;
    if (storedCongregationId && this.congregations.some((congregation) => congregation.id === storedCongregationId)) {
      return storedCongregationId;
    }
    return this.congregations[0]?.id ?? null;
  }
  normalizeWeekValue(week) {
    if (!week) {
      return null;
    }
    if (typeof week === "string") {
      return week.split("T")[0];
    }
    if (typeof week === "number") {
      return new Date(week).toISOString().split("T")[0];
    }
    if (Array.isArray(week)) {
      const [year, month, day] = week;
      if (typeof year === "number" && typeof month === "number" && typeof day === "number") {
        return `${year.toString().padStart(4, "0")}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
      }
    }
    if (week instanceof Date) {
      return week.toISOString().split("T")[0];
    }
    return null;
  }
  isDateInWeek(date, week) {
    const weekStart = /* @__PURE__ */ new Date(`${week}T00:00:00`);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    return date >= weekStart && date <= weekEnd;
  }
  normalizeArray(value) {
    if (Array.isArray(value)) {
      return value;
    }
    if (value && typeof value === "object" && Array.isArray(value.content)) {
      return value.content;
    }
    return [];
  }
  notify(message) {
    this.snackBar.open(message, "Cerrar", {
      duration: 4500,
      horizontalPosition: "end",
      verticalPosition: "top"
    });
  }
  getErrorMessage(error, fallback) {
    if (typeof error === "string") {
      return error || fallback;
    }
    const fieldErrors = error?.errors?.map((item) => item.message).filter(Boolean).join(" ");
    return fieldErrors || error?.message || fallback;
  }
  readStorageObject(storageKey) {
    const storageValue = localStorage.getItem(storageKey);
    if (!storageValue) {
      return null;
    }
    try {
      return JSON.parse(storageValue);
    } catch {
      return null;
    }
  }
  static {
    this.\u0275fac = function ProgramsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ProgramsComponent)(\u0275\u0275directiveInject(ProgramService), \u0275\u0275directiveInject(MeetingsService), \u0275\u0275directiveInject(CongregationsService), \u0275\u0275directiveInject(MatSnackBar), \u0275\u0275directiveInject(MatDialog));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProgramsComponent, selectors: [["vmc-programs"]], decls: 53, vars: 13, consts: [[1, "program-admin"], [1, "program-admin__toolbar"], [1, "program-admin__filters"], ["appearance", "outline"], [3, "selectionChange", "value"], [3, "value"], [3, "selectionChange", "value", "disabled"], [1, "program-admin__commands"], ["mat-stroked-button", "", "color", "primary", "type", "button", 3, "click", "disabled"], ["mat-flat-button", "", "color", "primary", "type", "button", 3, "click", "disabled"], ["mode", "indeterminate"], [1, "program-admin__table"], ["mat-table", "", 3, "dataSource"], ["matColumnDef", "weekNumber"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "week"], ["matColumnDef", "congregation"], ["matColumnDef", "weeklyPrograms"], ["matColumnDef", "event"], ["mat-cell", "", "class", "program-admin__event", 4, "matCellDef"], ["matColumnDef", "actions"], ["mat-cell", "", "class", "program-admin__row-actions", 4, "matCellDef"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["role", "status", "aria-live", "polite", 1, "program-admin__loading"], [1, "program-admin__empty"], ["mat-header-cell", ""], ["mat-cell", ""], ["mat-cell", "", 1, "program-admin__event"], ["mat-cell", "", 1, "program-admin__row-actions"], ["mat-icon-button", "", "color", "primary", "type", "button", "matTooltip", "Editar", 3, "click"], ["mat-icon-button", "", "color", "warn", "type", "button", "matTooltip", "Eliminar", 3, "click"], ["mat-header-row", ""], ["mat-row", ""], ["diameter", "40"]], template: function ProgramsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "section", 0)(1, "div", 1)(2, "div", 2)(3, "mat-form-field", 3)(4, "mat-label");
        \u0275\u0275text(5, "Congregacion");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "mat-select", 4);
        \u0275\u0275listener("selectionChange", function ProgramsComponent_Template_mat_select_selectionChange_6_listener($event) {
          return ctx.onFilterCongregationChange($event.value);
        });
        \u0275\u0275elementStart(7, "mat-option", 5);
        \u0275\u0275text(8, "Todas las congregaciones");
        \u0275\u0275elementEnd();
        \u0275\u0275repeaterCreate(9, ProgramsComponent_For_10_Template, 2, 2, "mat-option", 5, _forTrack02);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(11, "mat-form-field", 3)(12, "mat-label");
        \u0275\u0275text(13, "Semana");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "mat-select", 6);
        \u0275\u0275listener("selectionChange", function ProgramsComponent_Template_mat_select_selectionChange_14_listener($event) {
          return ctx.onWeekChange($event.value);
        });
        \u0275\u0275elementStart(15, "mat-option", 5);
        \u0275\u0275text(16, "Semana actual");
        \u0275\u0275elementEnd();
        \u0275\u0275repeaterCreate(17, ProgramsComponent_For_18_Template, 2, 2, "mat-option", 5, _forTrack1);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(19, "div", 7)(20, "button", 8);
        \u0275\u0275listener("click", function ProgramsComponent_Template_button_click_20_listener() {
          return ctx.loadPrograms();
        });
        \u0275\u0275elementStart(21, "mat-icon");
        \u0275\u0275text(22, "refresh");
        \u0275\u0275elementEnd();
        \u0275\u0275text(23, " Actualizar ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "button", 9);
        \u0275\u0275listener("click", function ProgramsComponent_Template_button_click_24_listener() {
          return ctx.openCreateDialog();
        });
        \u0275\u0275elementStart(25, "mat-icon");
        \u0275\u0275text(26, "add");
        \u0275\u0275elementEnd();
        \u0275\u0275text(27, " Nuevo ");
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(28, ProgramsComponent_Conditional_28_Template, 1, 0, "mat-progress-bar", 10);
        \u0275\u0275elementStart(29, "div", 11)(30, "table", 12);
        \u0275\u0275elementContainerStart(31, 13);
        \u0275\u0275template(32, ProgramsComponent_th_32_Template, 2, 0, "th", 14)(33, ProgramsComponent_td_33_Template, 2, 1, "td", 15);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(34, 16);
        \u0275\u0275template(35, ProgramsComponent_th_35_Template, 2, 0, "th", 14)(36, ProgramsComponent_td_36_Template, 2, 1, "td", 15);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(37, 17);
        \u0275\u0275template(38, ProgramsComponent_th_38_Template, 2, 0, "th", 14)(39, ProgramsComponent_td_39_Template, 2, 1, "td", 15);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(40, 18);
        \u0275\u0275template(41, ProgramsComponent_th_41_Template, 2, 0, "th", 14)(42, ProgramsComponent_td_42_Template, 2, 1, "td", 15);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(43, 19);
        \u0275\u0275template(44, ProgramsComponent_th_44_Template, 2, 0, "th", 14)(45, ProgramsComponent_td_45_Template, 2, 1, "td", 20);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(46, 21);
        \u0275\u0275template(47, ProgramsComponent_th_47_Template, 1, 0, "th", 14)(48, ProgramsComponent_td_48_Template, 7, 0, "td", 22);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275template(49, ProgramsComponent_tr_49_Template, 1, 0, "tr", 23)(50, ProgramsComponent_tr_50_Template, 1, 0, "tr", 24);
        \u0275\u0275elementEnd();
        \u0275\u0275template(51, ProgramsComponent_Conditional_51_Template, 4, 0, "div", 25)(52, ProgramsComponent_Conditional_52_Template, 2, 0, "div", 26);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(6);
        \u0275\u0275property("value", ctx.selectedCongregationId);
        \u0275\u0275advance();
        \u0275\u0275property("value", null);
        \u0275\u0275advance(2);
        \u0275\u0275repeater(ctx.congregations);
        \u0275\u0275advance(5);
        \u0275\u0275property("value", ctx.selectedWeek)("disabled", ctx.weekOptions.length === 0);
        \u0275\u0275advance();
        \u0275\u0275property("value", null);
        \u0275\u0275advance(2);
        \u0275\u0275repeater(ctx.weekOptions);
        \u0275\u0275advance(3);
        \u0275\u0275property("disabled", ctx.isLoading);
        \u0275\u0275advance(4);
        \u0275\u0275property("disabled", !ctx.selectedCongregationId || ctx.isLoading);
        \u0275\u0275advance(4);
        \u0275\u0275conditional(ctx.isLoading ? 28 : -1);
        \u0275\u0275advance(2);
        \u0275\u0275property("dataSource", ctx.programList);
        \u0275\u0275advance(19);
        \u0275\u0275property("matHeaderRowDef", ctx.displayedColumns);
        \u0275\u0275advance();
        \u0275\u0275property("matRowDefColumns", ctx.displayedColumns);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.isLoading ? 51 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(!ctx.isLoading && ctx.programList.length === 0 ? 52 : -1);
      }
    }, dependencies: [CommonModule, MaterialModule, MatIcon, MatButton, MatIconButton, MatProgressSpinner, MatOption, MatFormField, MatLabel, MatProgressBar, MatSelect, MatTable, MatHeaderCellDef, MatHeaderRowDef, MatColumnDef, MatCellDef, MatRowDef, MatHeaderCell, MatCell, MatHeaderRow, MatRow, MatTooltip], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\n.program-admin[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 18px;\n}\n.program-admin__toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n}\n.program-admin__filters[_ngcontent-%COMP%], \n.program-admin__commands[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.program-admin__filters[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%] {\n  width: min(42vw, 440px);\n  min-width: 360px;\n}\n.program-admin__table[_ngcontent-%COMP%] {\n  position: relative;\n  overflow-x: auto;\n  border: 1px solid #d7dde8;\n  border-radius: 8px;\n  background: #fff;\n}\n.program-admin__loading[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  z-index: 1;\n  display: flex;\n  min-height: 190px;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  color: #334155;\n  background: rgba(255, 255, 255, 0.82);\n}\ntable[_ngcontent-%COMP%] {\n  width: 100%;\n  min-width: 720px;\n}\n.program-admin__row-actions[_ngcontent-%COMP%] {\n  white-space: nowrap;\n}\n.program-admin__event[_ngcontent-%COMP%] {\n  max-width: 280px;\n  color: #334155;\n}\n.program-admin__empty[_ngcontent-%COMP%] {\n  padding: 28px;\n  text-align: center;\n  color: #64748b;\n}\n@media (max-width: 1100px) {\n  .program-admin__toolbar[_ngcontent-%COMP%] {\n    align-items: stretch;\n    flex-direction: column;\n  }\n}\n@media (max-width: 640px) {\n  .program-admin__filters[_ngcontent-%COMP%], \n   .program-admin__commands[_ngcontent-%COMP%] {\n    align-items: stretch;\n    flex-direction: column;\n  }\n  .program-admin__filters[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%] {\n    width: 100%;\n    min-width: 0;\n  }\n}\n/*# sourceMappingURL=programs.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProgramsComponent, [{
    type: Component,
    args: [{ selector: "vmc-programs", imports: [CommonModule, MaterialModule], template: '<section class="program-admin">\n  <div class="program-admin__toolbar">\n    <div class="program-admin__filters">\n      <mat-form-field appearance="outline">\n        <mat-label>Congregacion</mat-label>\n        <mat-select [value]="selectedCongregationId" (selectionChange)="onFilterCongregationChange($event.value)">\n          <mat-option [value]="null">Todas las congregaciones</mat-option>\n          @for (congregation of congregations; track congregation.id) {\n          <mat-option [value]="congregation.id">{{ congregation.name }}</mat-option>\n          }\n        </mat-select>\n      </mat-form-field>\n\n      <mat-form-field appearance="outline">\n        <mat-label>Semana</mat-label>\n        <mat-select [value]="selectedWeek" (selectionChange)="onWeekChange($event.value)"\n          [disabled]="weekOptions.length === 0">\n          <mat-option [value]="null">Semana actual</mat-option>\n          @for (week of weekOptions; track week.week) {\n          <mat-option [value]="week.week">{{ week.label }}</mat-option>\n          }\n        </mat-select>\n      </mat-form-field>\n    </div>\n\n    <div class="program-admin__commands">\n      <button mat-stroked-button color="primary" type="button" (click)="loadPrograms()" [disabled]="isLoading">\n        <mat-icon>refresh</mat-icon>\n        Actualizar\n      </button>\n\n      <button mat-flat-button color="primary" type="button" (click)="openCreateDialog()"\n        [disabled]="!selectedCongregationId || isLoading">\n        <mat-icon>add</mat-icon>\n        Nuevo\n      </button>\n    </div>\n  </div>\n\n  @if (isLoading) {\n  <mat-progress-bar mode="indeterminate"></mat-progress-bar>\n  }\n\n  <div class="program-admin__table">\n    <table mat-table [dataSource]="programList">\n      <ng-container matColumnDef="weekNumber">\n        <th mat-header-cell *matHeaderCellDef>No</th>\n        <td mat-cell *matCellDef="let program">{{ program.weekNumber }}</td>\n      </ng-container>\n\n      <ng-container matColumnDef="week">\n        <th mat-header-cell *matHeaderCellDef>Semana</th>\n        <td mat-cell *matCellDef="let program">{{ getProgramWeekLabel(program) }}</td>\n      </ng-container>\n\n      <ng-container matColumnDef="congregation">\n        <th mat-header-cell *matHeaderCellDef>Congregacion</th>\n        <td mat-cell *matCellDef="let program">{{ getProgramCongregationLabel(program) }}</td>\n      </ng-container>\n\n      <ng-container matColumnDef="weeklyPrograms">\n        <th mat-header-cell *matHeaderCellDef>Partes</th>\n        <td mat-cell *matCellDef="let program">{{ program.weeklyPrograms?.length ?? 0 }}</td>\n      </ng-container>\n\n      <ng-container matColumnDef="event">\n        <th mat-header-cell *matHeaderCellDef>Evento</th>\n        <td mat-cell *matCellDef="let program" class="program-admin__event">{{ getEventLabel(program) }}</td>\n      </ng-container>\n\n      <ng-container matColumnDef="actions">\n        <th mat-header-cell *matHeaderCellDef></th>\n        <td mat-cell *matCellDef="let program" class="program-admin__row-actions">\n          <button mat-icon-button color="primary" type="button" (click)="selectedEdit(program)" matTooltip="Editar">\n            <mat-icon>edit</mat-icon>\n          </button>\n          <button mat-icon-button color="warn" type="button" (click)="toDelete(program)" matTooltip="Eliminar">\n            <mat-icon>delete</mat-icon>\n          </button>\n        </td>\n      </ng-container>\n\n      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>\n      <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>\n    </table>\n\n    @if (isLoading) {\n    <div class="program-admin__loading" role="status" aria-live="polite">\n      <mat-spinner diameter="40"></mat-spinner>\n      <span>Cargando programas\u2026</span>\n    </div>\n    }\n\n    @if (!isLoading && programList.length === 0) {\n    <div class="program-admin__empty">No hay datos para la semana seleccionada.</div>\n    }\n  </div>\n</section>\n', styles: ["/* src/app/pages/entre-semana/manager/programs/programs.component.scss */\n:host {\n  display: block;\n}\n.program-admin {\n  display: flex;\n  flex-direction: column;\n  gap: 18px;\n}\n.program-admin__toolbar {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n}\n.program-admin__filters,\n.program-admin__commands {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.program-admin__filters mat-form-field {\n  width: min(42vw, 440px);\n  min-width: 360px;\n}\n.program-admin__table {\n  position: relative;\n  overflow-x: auto;\n  border: 1px solid #d7dde8;\n  border-radius: 8px;\n  background: #fff;\n}\n.program-admin__loading {\n  position: absolute;\n  inset: 0;\n  z-index: 1;\n  display: flex;\n  min-height: 190px;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  color: #334155;\n  background: rgba(255, 255, 255, 0.82);\n}\ntable {\n  width: 100%;\n  min-width: 720px;\n}\n.program-admin__row-actions {\n  white-space: nowrap;\n}\n.program-admin__event {\n  max-width: 280px;\n  color: #334155;\n}\n.program-admin__empty {\n  padding: 28px;\n  text-align: center;\n  color: #64748b;\n}\n@media (max-width: 1100px) {\n  .program-admin__toolbar {\n    align-items: stretch;\n    flex-direction: column;\n  }\n}\n@media (max-width: 640px) {\n  .program-admin__filters,\n  .program-admin__commands {\n    align-items: stretch;\n    flex-direction: column;\n  }\n  .program-admin__filters mat-form-field {\n    width: 100%;\n    min-width: 0;\n  }\n}\n/*# sourceMappingURL=programs.component.css.map */\n"] }]
  }], () => [{ type: ProgramService }, { type: MeetingsService }, { type: CongregationsService }, { type: MatSnackBar }, { type: MatDialog }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProgramsComponent, { className: "ProgramsComponent", filePath: "src/app/pages/entre-semana/manager/programs/programs.component.ts", lineNumber: 27 });
})();

// src/app/pages/entre-semana/manager/weekly-programs-admin/weekly-programs-admin.component.ts
var import_sweetalert2 = __toESM(require_sweetalert2_all());

// src/app/pages/entre-semana/manager/weekly-programs-admin/weekly-program-form-dialog/weekly-program-form-dialog.component.ts
var _forTrack03 = ($index, $item) => $item.id;
function WeeklyProgramFormDialogComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 2);
    \u0275\u0275text(1, "No hay asignaciones disponibles en este programa. Importe o cree la asignaci\xF3n desde el flujo de reuniones antes de a\xF1adir una parte.");
    \u0275\u0275elementEnd();
  }
}
function WeeklyProgramFormDialogComponent_For_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 5);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const assignment_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("value", assignment_r1.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.assignmentLabel(assignment_r1));
  }
}
function WeeklyProgramFormDialogComponent_For_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 5);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const user_r3 = ctx.$implicit;
    \u0275\u0275property("value", user_r3.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(user_r3.fullName);
  }
}
function WeeklyProgramFormDialogComponent_For_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 5);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const user_r4 = ctx.$implicit;
    \u0275\u0275property("value", user_r4.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(user_r4.fullName);
  }
}
var WeeklyProgramFormDialogComponent = class _WeeklyProgramFormDialogComponent {
  constructor(data, dialogRef, weeklyProgramService, usersService, snackBar) {
    this.data = data;
    this.dialogRef = dialogRef;
    this.weeklyProgramService = weeklyProgramService;
    this.usersService = usersService;
    this.snackBar = snackBar;
    this.saving = false;
    this.users = [];
    this.assignments = [];
    this.form = new FormGroup({
      assignmentId: new FormControl(null, Validators.required),
      responsibleId: new FormControl(null),
      assistantId: new FormControl(null),
      startTime: new FormControl(null),
      room: new FormControl(null, [Validators.maxLength(1)]),
      notificationSentAt: new FormControl(null)
    });
  }
  ngOnInit() {
    this.assignments = this.uniqueAssignments();
    const row = this.data.row;
    this.form.reset({
      assignmentId: row?.assignment?.id ?? null,
      responsibleId: row?.responsible?.id ?? null,
      assistantId: row?.assistant?.id ?? null,
      startTime: row?.startTime?.slice(0, 5) ?? null,
      room: row?.room ?? null,
      notificationSentAt: this.toDateTimeLocal(row?.notificationSentAt ?? null)
    });
    const congregationId = this.data.congregation?.id ?? this.data.program.congregation?.id;
    if (congregationId)
      this.loadUsers(congregationId);
  }
  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const request = this.buildRequest();
    if (!request) {
      this.notify("La asignaci\xF3n seleccionada ya no est\xE1 disponible.");
      return;
    }
    this.saving = true;
    const request$ = this.data.row ? this.weeklyProgramService.updateById(this.data.row.id, __spreadProps(__spreadValues({}, request), { id: this.data.row.id })) : this.weeklyProgramService.create(request);
    request$.pipe(finalize(() => this.saving = false)).subscribe({
      next: () => {
        this.notify(this.data.row ? "Parte actualizada." : "Parte creada.");
        this.dialogRef.close(true);
      },
      error: (error) => this.notify(this.errorMessage(error, "No se pudo guardar la parte."))
    });
  }
  assignmentLabel(assignment) {
    return `${assignment.number ?? "\u2014"} \xB7 ${assignment.sectionMeeting ?? "Sin secci\xF3n"} \xB7 ${assignment.title ?? "Sin t\xEDtulo"}`;
  }
  loadUsers(congregationId) {
    this.usersService.getUsersByCongregation(congregationId).subscribe({
      next: (users) => this.users = this.normalizeUsers(users),
      error: () => this.notify("No se pudo cargar el listado de publicadores.")
    });
  }
  buildRequest() {
    const value = this.form.getRawValue();
    const assignmentId = value.assignmentId;
    const congregationId = this.data.program.congregation?.id ?? this.data.congregation?.id;
    if (!assignmentId || !this.assignments.some((assignment) => assignment.id === assignmentId) || !this.data.program.id || !congregationId)
      return null;
    return {
      assignmentId,
      programId: this.data.program.id,
      congregationId,
      responsibleId: value.responsibleId ?? null,
      assistantId: value.assistantId ?? null,
      startTime: value.startTime || null,
      room: value.room?.trim().toUpperCase() || null,
      notificationSentAt: value.notificationSentAt || null
    };
  }
  uniqueAssignments() {
    const source = [...(this.data.program.weeklyPrograms ?? []).map((item) => item.assignment), this.data.row?.assignment].filter(Boolean);
    return [...new Map(source.map((item) => [item.id, item])).values()].sort((a, b) => (a.number ?? 9999) - (b.number ?? 9999));
  }
  normalizeUsers(value) {
    const users = Array.isArray(value) ? value : Array.isArray(value?.content) ? value.content : [];
    return users.filter((user) => !!user?.id && !user.deletedAt);
  }
  toDateTimeLocal(value) {
    return value ? value.slice(0, 16) : null;
  }
  errorMessage(error, fallback) {
    if (typeof error === "string")
      return error || fallback;
    return error?.errors?.map((item) => item.message).filter(Boolean).join(" ") || error?.message || fallback;
  }
  notify(message) {
    this.snackBar.open(message, "Cerrar", { duration: 4500, horizontalPosition: "end", verticalPosition: "top" });
  }
  static {
    this.\u0275fac = function WeeklyProgramFormDialogComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _WeeklyProgramFormDialogComponent)(\u0275\u0275directiveInject(MAT_DIALOG_DATA), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(WeeklyProgramService), \u0275\u0275directiveInject(UsersService), \u0275\u0275directiveInject(MatSnackBar));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _WeeklyProgramFormDialogComponent, selectors: [["vmc-weekly-program-form-dialog"]], decls: 53, vars: 7, consts: [["mat-dialog-title", ""], [1, "weekly-program-form", 3, "ngSubmit", "formGroup"], [1, "weekly-program-form__notice"], ["appearance", "outline", 1, "weekly-program-form__wide"], ["formControlName", "assignmentId"], [3, "value"], [1, "weekly-program-form__grid"], ["appearance", "outline"], ["matInput", "", "formControlName", "room", "maxlength", "1", "autocomplete", "off"], ["matInput", "", "type", "time", "formControlName", "startTime"], ["formControlName", "responsibleId"], ["formControlName", "assistantId"], ["matInput", "", "type", "datetime-local", "formControlName", "notificationSentAt"], ["align", "end"], ["mat-button", "", "type", "button", "mat-dialog-close", "", 3, "disabled"], ["mat-flat-button", "", "color", "primary", "type", "button", 3, "click", "disabled"]], template: function WeeklyProgramFormDialogComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "h2", 0);
        \u0275\u0275text(1);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(2, "mat-dialog-content")(3, "form", 1);
        \u0275\u0275listener("ngSubmit", function WeeklyProgramFormDialogComponent_Template_form_ngSubmit_3_listener() {
          return ctx.save();
        });
        \u0275\u0275template(4, WeeklyProgramFormDialogComponent_Conditional_4_Template, 2, 0, "p", 2);
        \u0275\u0275elementStart(5, "mat-form-field", 3)(6, "mat-label");
        \u0275\u0275text(7, "Asignaci\xF3n");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "mat-select", 4);
        \u0275\u0275repeaterCreate(9, WeeklyProgramFormDialogComponent_For_10_Template, 2, 2, "mat-option", 5, _forTrack03);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "mat-error");
        \u0275\u0275text(12, "Selecciona una asignaci\xF3n.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(13, "div", 6)(14, "mat-form-field", 7)(15, "mat-label");
        \u0275\u0275text(16, "Sala");
        \u0275\u0275elementEnd();
        \u0275\u0275element(17, "input", 8);
        \u0275\u0275elementStart(18, "mat-hint");
        \u0275\u0275text(19, "Una letra; se guardar\xE1 en may\xFAscula.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(20, "mat-form-field", 7)(21, "mat-label");
        \u0275\u0275text(22, "Hora");
        \u0275\u0275elementEnd();
        \u0275\u0275element(23, "input", 9);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "mat-form-field", 7)(25, "mat-label");
        \u0275\u0275text(26, "Responsable");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(27, "mat-select", 10)(28, "mat-option", 5);
        \u0275\u0275text(29, "Sin asignar");
        \u0275\u0275elementEnd();
        \u0275\u0275repeaterCreate(30, WeeklyProgramFormDialogComponent_For_31_Template, 2, 2, "mat-option", 5, _forTrack03);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(32, "mat-form-field", 7)(33, "mat-label");
        \u0275\u0275text(34, "Ayudante");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(35, "mat-select", 11)(36, "mat-option", 5);
        \u0275\u0275text(37, "Sin asignar");
        \u0275\u0275elementEnd();
        \u0275\u0275repeaterCreate(38, WeeklyProgramFormDialogComponent_For_39_Template, 2, 2, "mat-option", 5, _forTrack03);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(40, "mat-form-field", 3)(41, "mat-label");
        \u0275\u0275text(42, "Notificaci\xF3n enviada");
        \u0275\u0275elementEnd();
        \u0275\u0275element(43, "input", 12);
        \u0275\u0275elementStart(44, "mat-hint");
        \u0275\u0275text(45, "D\xE9jalo vac\xEDo si sigue pendiente.");
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275elementStart(46, "mat-dialog-actions", 13)(47, "button", 14);
        \u0275\u0275text(48, "Cancelar");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(49, "button", 15);
        \u0275\u0275listener("click", function WeeklyProgramFormDialogComponent_Template_button_click_49_listener() {
          return ctx.save();
        });
        \u0275\u0275elementStart(50, "mat-icon");
        \u0275\u0275text(51, "save");
        \u0275\u0275elementEnd();
        \u0275\u0275text(52, "Guardar");
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275textInterpolate(ctx.data.row ? "Editar parte semanal" : "Nueva parte semanal");
        \u0275\u0275advance(2);
        \u0275\u0275property("formGroup", ctx.form);
        \u0275\u0275advance();
        \u0275\u0275conditional(!ctx.assignments.length ? 4 : -1);
        \u0275\u0275advance(5);
        \u0275\u0275repeater(ctx.assignments);
        \u0275\u0275advance(19);
        \u0275\u0275property("value", null);
        \u0275\u0275advance(2);
        \u0275\u0275repeater(ctx.users);
        \u0275\u0275advance(6);
        \u0275\u0275property("value", null);
        \u0275\u0275advance(2);
        \u0275\u0275repeater(ctx.users);
        \u0275\u0275advance(9);
        \u0275\u0275property("disabled", ctx.saving);
        \u0275\u0275advance(2);
        \u0275\u0275property("disabled", ctx.saving || !ctx.assignments.length);
      }
    }, dependencies: [CommonModule, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, MaxLengthValidator, FormGroupDirective, FormControlName, MatDialogModule, MatDialogClose, MatDialogTitle, MatDialogActions, MatDialogContent, MaterialModule, MatIcon, MatButton, MatOption, MatInput, MatFormField, MatLabel, MatHint, MatError, MatSelect], styles: ["\n\n.weekly-program-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  padding-top: 8px;\n}\n.weekly-program-form__grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 0 16px;\n}\n.weekly-program-form__wide[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.weekly-program-form__notice[_ngcontent-%COMP%] {\n  margin: 0 0 16px;\n  color: #9a3412;\n}\n@media (max-width: 620px) {\n  .weekly-program-form__grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=weekly-program-form-dialog.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(WeeklyProgramFormDialogComponent, [{
    type: Component,
    args: [{ selector: "vmc-weekly-program-form-dialog", standalone: true, imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MaterialModule], template: `<h2 mat-dialog-title>{{ data.row ? 'Editar parte semanal' : 'Nueva parte semanal' }}</h2>
<mat-dialog-content>
  <form class="weekly-program-form" [formGroup]="form" (ngSubmit)="save()">
    @if (!assignments.length) { <p class="weekly-program-form__notice">No hay asignaciones disponibles en este programa. Importe o cree la asignaci\xF3n desde el flujo de reuniones antes de a\xF1adir una parte.</p> }
    <mat-form-field appearance="outline" class="weekly-program-form__wide"><mat-label>Asignaci\xF3n</mat-label><mat-select formControlName="assignmentId">@for (assignment of assignments; track assignment.id) { <mat-option [value]="assignment.id">{{ assignmentLabel(assignment) }}</mat-option> }</mat-select><mat-error>Selecciona una asignaci\xF3n.</mat-error></mat-form-field>
    <div class="weekly-program-form__grid">
      <mat-form-field appearance="outline"><mat-label>Sala</mat-label><input matInput formControlName="room" maxlength="1" autocomplete="off"><mat-hint>Una letra; se guardar\xE1 en may\xFAscula.</mat-hint></mat-form-field>
      <mat-form-field appearance="outline"><mat-label>Hora</mat-label><input matInput type="time" formControlName="startTime"></mat-form-field>
      <mat-form-field appearance="outline"><mat-label>Responsable</mat-label><mat-select formControlName="responsibleId"><mat-option [value]="null">Sin asignar</mat-option>@for (user of users; track user.id) { <mat-option [value]="user.id">{{ user.fullName }}</mat-option> }</mat-select></mat-form-field>
      <mat-form-field appearance="outline"><mat-label>Ayudante</mat-label><mat-select formControlName="assistantId"><mat-option [value]="null">Sin asignar</mat-option>@for (user of users; track user.id) { <mat-option [value]="user.id">{{ user.fullName }}</mat-option> }</mat-select></mat-form-field>
      <mat-form-field appearance="outline" class="weekly-program-form__wide"><mat-label>Notificaci\xF3n enviada</mat-label><input matInput type="datetime-local" formControlName="notificationSentAt"><mat-hint>D\xE9jalo vac\xEDo si sigue pendiente.</mat-hint></mat-form-field>
    </div>
  </form>
</mat-dialog-content>
<mat-dialog-actions align="end"><button mat-button type="button" mat-dialog-close [disabled]="saving">Cancelar</button><button mat-flat-button color="primary" type="button" (click)="save()" [disabled]="saving || !assignments.length"><mat-icon>save</mat-icon>Guardar</button></mat-dialog-actions>
`, styles: ["/* src/app/pages/entre-semana/manager/weekly-programs-admin/weekly-program-form-dialog/weekly-program-form-dialog.component.scss */\n.weekly-program-form {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  padding-top: 8px;\n}\n.weekly-program-form__grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 0 16px;\n}\n.weekly-program-form__wide {\n  width: 100%;\n}\n.weekly-program-form__notice {\n  margin: 0 0 16px;\n  color: #9a3412;\n}\n@media (max-width: 620px) {\n  .weekly-program-form__grid {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=weekly-program-form-dialog.component.css.map */\n"] }]
  }], () => [{ type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }, { type: MatDialogRef }, { type: WeeklyProgramService }, { type: UsersService }, { type: MatSnackBar }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(WeeklyProgramFormDialogComponent, { className: "WeeklyProgramFormDialogComponent", filePath: "src/app/pages/entre-semana/manager/weekly-programs-admin/weekly-program-form-dialog/weekly-program-form-dialog.component.ts", lineNumber: 22 });
})();

// src/app/pages/entre-semana/manager/weekly-programs-admin/weekly-programs-admin.component.ts
var _forTrack04 = ($index, $item) => $item.id;
var _forTrack12 = ($index, $item) => $item.week;
function WeeklyProgramsAdminComponent_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 5);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const congregation_r1 = ctx.$implicit;
    \u0275\u0275property("value", congregation_r1.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(congregation_r1.name);
  }
}
function WeeklyProgramsAdminComponent_For_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 5);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const week_r2 = ctx.$implicit;
    \u0275\u0275property("value", week_r2.week);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(week_r2.label);
  }
}
function WeeklyProgramsAdminComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-progress-bar", 10);
  }
}
function WeeklyProgramsAdminComponent_th_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 29);
    \u0275\u0275text(1, "Sala");
    \u0275\u0275elementEnd();
  }
}
function WeeklyProgramsAdminComponent_td_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 30);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(row_r3.room || "\u2014");
  }
}
function WeeklyProgramsAdminComponent_th_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 29);
    \u0275\u0275text(1, "Hora");
    \u0275\u0275elementEnd();
  }
}
function WeeklyProgramsAdminComponent_td_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 30);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(row_r4.startTime || "\u2014");
  }
}
function WeeklyProgramsAdminComponent_th_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 29);
    \u0275\u0275text(1, "No.");
    \u0275\u0275elementEnd();
  }
}
function WeeklyProgramsAdminComponent_td_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 30);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    const row_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate((tmp_2_0 = row_r5.assignment == null ? null : row_r5.assignment.number) !== null && tmp_2_0 !== void 0 ? tmp_2_0 : "\u2014");
  }
}
function WeeklyProgramsAdminComponent_th_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 29);
    \u0275\u0275text(1, "Secci\xF3n");
    \u0275\u0275elementEnd();
  }
}
function WeeklyProgramsAdminComponent_td_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 30);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate((row_r6.assignment == null ? null : row_r6.assignment.sectionMeeting) || "\u2014");
  }
}
function WeeklyProgramsAdminComponent_th_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 29);
    \u0275\u0275text(1, "T\xEDtulo");
    \u0275\u0275elementEnd();
  }
}
function WeeklyProgramsAdminComponent_td_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 30);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r7 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate((row_r7.assignment == null ? null : row_r7.assignment.title) || "\u2014");
  }
}
function WeeklyProgramsAdminComponent_th_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 29);
    \u0275\u0275text(1, "Responsable");
    \u0275\u0275elementEnd();
  }
}
function WeeklyProgramsAdminComponent_td_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 30);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r8 = ctx.$implicit;
    const ctx_r8 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r8.personName(row_r8.responsible));
  }
}
function WeeklyProgramsAdminComponent_th_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 29);
    \u0275\u0275text(1, "Ayudante");
    \u0275\u0275elementEnd();
  }
}
function WeeklyProgramsAdminComponent_td_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 30);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r10 = ctx.$implicit;
    const ctx_r8 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r8.personName(row_r10.assistant));
  }
}
function WeeklyProgramsAdminComponent_th_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 29);
    \u0275\u0275text(1, "Notificaci\xF3n");
    \u0275\u0275elementEnd();
  }
}
function WeeklyProgramsAdminComponent_td_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 30);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r11 = ctx.$implicit;
    const ctx_r8 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r8.notificationLabel(row_r11));
  }
}
function WeeklyProgramsAdminComponent_th_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "th", 29);
  }
}
function WeeklyProgramsAdminComponent_td_53_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 31)(1, "button", 32);
    \u0275\u0275listener("click", function WeeklyProgramsAdminComponent_td_53_Template_button_click_1_listener() {
      const row_r13 = \u0275\u0275restoreView(_r12).$implicit;
      const ctx_r8 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r8.edit(row_r13));
    });
    \u0275\u0275elementStart(2, "mat-icon");
    \u0275\u0275text(3, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "button", 33);
    \u0275\u0275listener("click", function WeeklyProgramsAdminComponent_td_53_Template_button_click_4_listener() {
      const row_r13 = \u0275\u0275restoreView(_r12).$implicit;
      const ctx_r8 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r8.remove(row_r13));
    });
    \u0275\u0275elementStart(5, "mat-icon");
    \u0275\u0275text(6, "delete");
    \u0275\u0275elementEnd()()();
  }
}
function WeeklyProgramsAdminComponent_tr_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 34);
  }
}
function WeeklyProgramsAdminComponent_tr_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 35);
  }
}
function WeeklyProgramsAdminComponent_Conditional_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27);
    \u0275\u0275element(1, "mat-spinner", 36);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Cargando partes semanales\u2026");
    \u0275\u0275elementEnd()();
  }
}
function WeeklyProgramsAdminComponent_Conditional_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28);
    \u0275\u0275text(1, "No hay partes para la congregaci\xF3n y semana seleccionadas.");
    \u0275\u0275elementEnd();
  }
}
var WeeklyProgramsAdminComponent = class _WeeklyProgramsAdminComponent {
  constructor(congregationsService, meetingsService, programService, weeklyProgramService, dialog, snackBar) {
    this.congregationsService = congregationsService;
    this.meetingsService = meetingsService;
    this.programService = programService;
    this.weeklyProgramService = weeklyProgramService;
    this.dialog = dialog;
    this.snackBar = snackBar;
    this.destroyRef = inject(DestroyRef);
    this.congregations = [];
    this.meetings = [];
    this.weekOptions = [];
    this.programs = [];
    this.rows = [];
    this.selectedCongregationId = null;
    this.selectedWeek = null;
    this.catalogLoading = true;
    this.loading = false;
    this.displayedColumns = ["room", "startTime", "number", "section", "title", "responsible", "assistant", "notification", "actions"];
  }
  ngOnInit() {
    this.loadCatalogs();
  }
  loadCatalogs() {
    this.catalogLoading = true;
    forkJoin({
      congregations: this.congregationsService.getAllCongregations().pipe(catchError(() => of([]))),
      meetings: this.meetingsService.getAllMeetings().pipe(catchError(() => of([])))
    }).pipe(finalize(() => this.catalogLoading = false), takeUntilDestroyed(this.destroyRef)).subscribe(({ congregations, meetings }) => {
      this.congregations = this.normalizeArray(congregations);
      this.meetings = this.normalizeArray(meetings);
      this.weekOptions = this.buildWeekOptions();
      this.selectedCongregationId = this.resolveCongregation();
      this.selectedWeek = this.resolveWeek();
      this.loadWeek();
    });
  }
  get isLoading() {
    return this.catalogLoading || this.loading;
  }
  loadWeek() {
    this.loading = true;
    this.programService.getProgramsByWeek({ congregationId: this.selectedCongregationId, date: this.selectedWeek }).pipe(finalize(() => this.loading = false), takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (programs) => {
        this.programs = programs ?? [];
        this.weekOptions = this.buildWeekOptions();
        const selected = this.selectedCongregationId == null ? this.programs : this.programs.filter((p) => p.congregation?.id === this.selectedCongregationId);
        this.rows = selected.flatMap((program) => (program.weeklyPrograms ?? []).map((row) => this.toResponse(row, program)));
        this.rows.sort((a, b) => (a.room ?? "").localeCompare(b.room ?? "") || (a.assignment?.number ?? 9999) - (b.assignment?.number ?? 9999));
      },
      error: (error) => this.handleLoadError(error)
    });
  }
  onCongregationChange(value) {
    this.selectedCongregationId = value;
    this.loadWeek();
  }
  onWeekChange(value) {
    this.selectedWeek = value;
    this.loadWeek();
  }
  create() {
    const program = this.getSelectedProgram();
    if (!program) {
      this.notify("Selecciona una congregaci\xF3n y una semana que tengan programa.");
      return;
    }
    this.openDialog(null, program);
  }
  edit(row) {
    const program = this.programs.find((item) => item.id === row.programId);
    if (program)
      this.openDialog(row, program);
  }
  remove(row) {
    return __async(this, null, function* () {
      const confirmation = yield import_sweetalert2.default.fire({
        title: "\xBFEliminar esta parte?",
        text: `Se eliminar\xE1 ${row.assignment?.title ?? "la parte sin t\xEDtulo"} de la sala ${row.room ?? "sin sala"}.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "S\xED, eliminar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#d33",
        reverseButtons: true
      });
      if (!confirmation.isConfirmed)
        return;
      import_sweetalert2.default.fire({
        title: "Eliminando...",
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => import_sweetalert2.default.showLoading()
      });
      this.weeklyProgramService.delete(row.id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: () => {
          import_sweetalert2.default.fire("Eliminada", "La parte semanal fue eliminada.", "success");
          this.loadWeek();
        },
        error: (error) => import_sweetalert2.default.fire("No se pudo eliminar", this.errorMessage(error, "Int\xE9ntalo de nuevo."), "error")
      });
    });
  }
  weekLabel(meeting) {
    const event = this.programs.find((program) => program.meeting?.id === meeting.id && program.congregation?.id === this.selectedCongregationId)?.event;
    return `Semana ${meeting.weekNumber ?? ""}${meeting.week ? " - " + Utils.showDayOfMeeting(meeting.week, this.selectedCongregation()?.day ?? 1, false, event) : ""}`;
  }
  personName(person) {
    return person?.fullName?.trim() || "\u2014";
  }
  notificationLabel(row) {
    return row.notificationSentAt ? "Enviada" : "Pendiente";
  }
  openDialog(row, program) {
    this.dialog.open(WeeklyProgramFormDialogComponent, {
      width: "min(820px, 96vw)",
      maxWidth: "96vw",
      autoFocus: false,
      data: { row, program, congregation: this.selectedCongregation() }
    }).afterClosed().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((saved) => {
      if (saved)
        this.loadWeek();
    });
  }
  toResponse(row, program) {
    return {
      id: row.id,
      assignment: row.assignment ?? null,
      responsible: row.responsible ?? null,
      assistant: row.assistant ?? null,
      congregation: row.congregation ?? program.congregation ?? null,
      programId: row.programId ?? row.program ?? program.id,
      startTime: this.timeValue(row.startTime),
      room: row.room ?? null,
      notificationSentAt: this.dateTimeValue(row.notificationSentAt)
    };
  }
  timeValue(value) {
    if (Array.isArray(value))
      return value.slice(0, 3).map((v) => String(v).padStart(2, "0")).join(":");
    return typeof value === "string" ? value.slice(0, 8) : null;
  }
  dateTimeValue(value) {
    return typeof value === "string" ? value : null;
  }
  buildWeekOptions() {
    const seen = /* @__PURE__ */ new Set();
    return this.meetings.map((m) => ({ week: this.weekValue(m.week), label: this.weekLabel(m) })).filter((x) => !!x.week && !seen.has(x.week) && !!seen.add(x.week)).sort((a, b) => a.week.localeCompare(b.week));
  }
  weekValue(value) {
    if (typeof value === "string")
      return value.split("T")[0];
    if (typeof value === "number" && Number.isFinite(value))
      return new Date(value).toISOString().split("T")[0];
    if (Array.isArray(value) && value.length >= 3)
      return `${value[0]}-${String(value[1]).padStart(2, "0")}-${String(value[2]).padStart(2, "0")}`;
    return "";
  }
  resolveCongregation() {
    const raw = localStorage.getItem("congregation");
    try {
      const id = raw ? JSON.parse(raw)?.id : null;
      return this.congregations.some((c) => c.id === id) ? id : this.congregations[0]?.id ?? null;
    } catch {
      return this.congregations[0]?.id ?? null;
    }
  }
  resolveWeek() {
    const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    return this.weekOptions.find((x) => {
      const start = new Date(x.week);
      const end = new Date(start);
      end.setDate(end.getDate() + 6);
      return new Date(today) >= start && new Date(today) <= end;
    })?.week ?? this.weekOptions.find((x) => x.week >= today)?.week ?? this.weekOptions.at(-1)?.week ?? null;
  }
  selectedCongregation() {
    return this.congregations.find((c) => c.id === this.selectedCongregationId);
  }
  getSelectedProgram() {
    return this.programs.find((p) => p.congregation?.id === this.selectedCongregationId);
  }
  normalizeArray(value) {
    return Array.isArray(value) ? value : Array.isArray(value?.content) ? value.content : [];
  }
  handleLoadError(error) {
    this.rows = [];
    if (error?.status === 404) {
      this.notify("El programa o cat\xE1logo cambi\xF3. Se recargaron los datos.");
      this.loadCatalogs();
    } else
      this.notify(this.errorMessage(error, "No se pudieron cargar las partes de la semana."));
  }
  errorMessage(error, fallback) {
    if (typeof error === "string")
      return error || fallback;
    return error?.errors?.map((item) => item.message).filter(Boolean).join(" ") || error?.message || fallback;
  }
  notify(message) {
    this.snackBar.open(message, "Cerrar", { duration: 4500, horizontalPosition: "end", verticalPosition: "top" });
  }
  static {
    this.\u0275fac = function WeeklyProgramsAdminComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _WeeklyProgramsAdminComponent)(\u0275\u0275directiveInject(CongregationsService), \u0275\u0275directiveInject(MeetingsService), \u0275\u0275directiveInject(ProgramService), \u0275\u0275directiveInject(WeeklyProgramService), \u0275\u0275directiveInject(MatDialog), \u0275\u0275directiveInject(MatSnackBar));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _WeeklyProgramsAdminComponent, selectors: [["vmc-weekly-programs-admin"]], decls: 58, vars: 11, consts: [[1, "weekly-admin"], [1, "weekly-admin__toolbar"], [1, "weekly-admin__filters"], ["appearance", "outline"], [3, "selectionChange", "value"], [3, "value"], [3, "selectionChange", "value", "disabled"], [1, "weekly-admin__commands"], ["mat-stroked-button", "", "color", "primary", "type", "button", 3, "click", "disabled"], ["mat-flat-button", "", "color", "primary", "type", "button", 3, "click", "disabled"], ["mode", "indeterminate"], [1, "weekly-admin__table"], ["mat-table", "", 3, "dataSource"], ["matColumnDef", "room"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "startTime"], ["matColumnDef", "number"], ["matColumnDef", "section"], ["matColumnDef", "title"], ["matColumnDef", "responsible"], ["matColumnDef", "assistant"], ["matColumnDef", "notification"], ["matColumnDef", "actions"], ["mat-cell", "", "class", "weekly-admin__actions", 4, "matCellDef"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["role", "status", "aria-live", "polite", 1, "weekly-admin__loading"], [1, "weekly-admin__empty"], ["mat-header-cell", ""], ["mat-cell", ""], ["mat-cell", "", 1, "weekly-admin__actions"], ["mat-icon-button", "", "color", "primary", "matTooltip", "Editar", 3, "click"], ["mat-icon-button", "", "color", "warn", "matTooltip", "Eliminar", 3, "click"], ["mat-header-row", ""], ["mat-row", ""], ["diameter", "40"]], template: function WeeklyProgramsAdminComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "section", 0)(1, "div", 1)(2, "div", 2)(3, "mat-form-field", 3)(4, "mat-label");
        \u0275\u0275text(5, "Congregaci\xF3n");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "mat-select", 4);
        \u0275\u0275listener("selectionChange", function WeeklyProgramsAdminComponent_Template_mat_select_selectionChange_6_listener($event) {
          return ctx.onCongregationChange($event.value);
        });
        \u0275\u0275repeaterCreate(7, WeeklyProgramsAdminComponent_For_8_Template, 2, 2, "mat-option", 5, _forTrack04);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(9, "mat-form-field", 3)(10, "mat-label");
        \u0275\u0275text(11, "Semana");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "mat-select", 6);
        \u0275\u0275listener("selectionChange", function WeeklyProgramsAdminComponent_Template_mat_select_selectionChange_12_listener($event) {
          return ctx.onWeekChange($event.value);
        });
        \u0275\u0275repeaterCreate(13, WeeklyProgramsAdminComponent_For_14_Template, 2, 2, "mat-option", 5, _forTrack12);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(15, "div", 7)(16, "button", 8);
        \u0275\u0275listener("click", function WeeklyProgramsAdminComponent_Template_button_click_16_listener() {
          return ctx.loadWeek();
        });
        \u0275\u0275elementStart(17, "mat-icon");
        \u0275\u0275text(18, "refresh");
        \u0275\u0275elementEnd();
        \u0275\u0275text(19, "Actualizar");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "button", 9);
        \u0275\u0275listener("click", function WeeklyProgramsAdminComponent_Template_button_click_20_listener() {
          return ctx.create();
        });
        \u0275\u0275elementStart(21, "mat-icon");
        \u0275\u0275text(22, "add");
        \u0275\u0275elementEnd();
        \u0275\u0275text(23, "Nueva parte");
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(24, WeeklyProgramsAdminComponent_Conditional_24_Template, 1, 0, "mat-progress-bar", 10);
        \u0275\u0275elementStart(25, "div", 11)(26, "table", 12);
        \u0275\u0275elementContainerStart(27, 13);
        \u0275\u0275template(28, WeeklyProgramsAdminComponent_th_28_Template, 2, 0, "th", 14)(29, WeeklyProgramsAdminComponent_td_29_Template, 2, 1, "td", 15);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(30, 16);
        \u0275\u0275template(31, WeeklyProgramsAdminComponent_th_31_Template, 2, 0, "th", 14)(32, WeeklyProgramsAdminComponent_td_32_Template, 2, 1, "td", 15);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(33, 17);
        \u0275\u0275template(34, WeeklyProgramsAdminComponent_th_34_Template, 2, 0, "th", 14)(35, WeeklyProgramsAdminComponent_td_35_Template, 2, 1, "td", 15);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(36, 18);
        \u0275\u0275template(37, WeeklyProgramsAdminComponent_th_37_Template, 2, 0, "th", 14)(38, WeeklyProgramsAdminComponent_td_38_Template, 2, 1, "td", 15);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(39, 19);
        \u0275\u0275template(40, WeeklyProgramsAdminComponent_th_40_Template, 2, 0, "th", 14)(41, WeeklyProgramsAdminComponent_td_41_Template, 2, 1, "td", 15);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(42, 20);
        \u0275\u0275template(43, WeeklyProgramsAdminComponent_th_43_Template, 2, 0, "th", 14)(44, WeeklyProgramsAdminComponent_td_44_Template, 2, 1, "td", 15);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(45, 21);
        \u0275\u0275template(46, WeeklyProgramsAdminComponent_th_46_Template, 2, 0, "th", 14)(47, WeeklyProgramsAdminComponent_td_47_Template, 2, 1, "td", 15);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(48, 22);
        \u0275\u0275template(49, WeeklyProgramsAdminComponent_th_49_Template, 2, 0, "th", 14)(50, WeeklyProgramsAdminComponent_td_50_Template, 2, 1, "td", 15);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(51, 23);
        \u0275\u0275template(52, WeeklyProgramsAdminComponent_th_52_Template, 1, 0, "th", 14)(53, WeeklyProgramsAdminComponent_td_53_Template, 7, 0, "td", 24);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275template(54, WeeklyProgramsAdminComponent_tr_54_Template, 1, 0, "tr", 25)(55, WeeklyProgramsAdminComponent_tr_55_Template, 1, 0, "tr", 26);
        \u0275\u0275elementEnd();
        \u0275\u0275template(56, WeeklyProgramsAdminComponent_Conditional_56_Template, 4, 0, "div", 27)(57, WeeklyProgramsAdminComponent_Conditional_57_Template, 2, 0, "div", 28);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(6);
        \u0275\u0275property("value", ctx.selectedCongregationId);
        \u0275\u0275advance();
        \u0275\u0275repeater(ctx.congregations);
        \u0275\u0275advance(5);
        \u0275\u0275property("value", ctx.selectedWeek)("disabled", !ctx.weekOptions.length);
        \u0275\u0275advance();
        \u0275\u0275repeater(ctx.weekOptions);
        \u0275\u0275advance(3);
        \u0275\u0275property("disabled", ctx.isLoading);
        \u0275\u0275advance(4);
        \u0275\u0275property("disabled", ctx.isLoading);
        \u0275\u0275advance(4);
        \u0275\u0275conditional(ctx.isLoading ? 24 : -1);
        \u0275\u0275advance(2);
        \u0275\u0275property("dataSource", ctx.rows);
        \u0275\u0275advance(28);
        \u0275\u0275property("matHeaderRowDef", ctx.displayedColumns);
        \u0275\u0275advance();
        \u0275\u0275property("matRowDefColumns", ctx.displayedColumns);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.isLoading ? 56 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(!ctx.isLoading && !ctx.rows.length ? 57 : -1);
      }
    }, dependencies: [CommonModule, MaterialModule, MatIcon, MatButton, MatIconButton, MatProgressSpinner, MatOption, MatFormField, MatLabel, MatProgressBar, MatSelect, MatTable, MatHeaderCellDef, MatHeaderRowDef, MatColumnDef, MatCellDef, MatRowDef, MatHeaderCell, MatCell, MatHeaderRow, MatRow, MatTooltip], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\n.weekly-admin[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 18px;\n}\n.weekly-admin__toolbar[_ngcontent-%COMP%], \n.weekly-admin__filters[_ngcontent-%COMP%], \n.weekly-admin__commands[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.weekly-admin__toolbar[_ngcontent-%COMP%] {\n  justify-content: space-between;\n}\n.weekly-admin__filters[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%] {\n  width: min(42vw, 420px);\n  min-width: 280px;\n}\n.weekly-admin__table[_ngcontent-%COMP%] {\n  position: relative;\n  overflow-x: auto;\n  border: 1px solid #d7dde8;\n  border-radius: 8px;\n  background: #fff;\n}\ntable[_ngcontent-%COMP%] {\n  width: 100%;\n  min-width: 1050px;\n}\n.weekly-admin__actions[_ngcontent-%COMP%] {\n  white-space: nowrap;\n}\n.weekly-admin__empty[_ngcontent-%COMP%] {\n  padding: 28px;\n  text-align: center;\n  color: #64748b;\n}\n.weekly-admin__loading[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  z-index: 1;\n  display: flex;\n  min-height: 190px;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  color: #334155;\n  background: rgba(255, 255, 255, 0.82);\n}\n@media (max-width: 900px) {\n  .weekly-admin__toolbar[_ngcontent-%COMP%], \n   .weekly-admin__filters[_ngcontent-%COMP%], \n   .weekly-admin__commands[_ngcontent-%COMP%] {\n    align-items: stretch;\n    flex-direction: column;\n  }\n  .weekly-admin__filters[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%] {\n    width: 100%;\n    min-width: 0;\n  }\n}\n/*# sourceMappingURL=weekly-programs-admin.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(WeeklyProgramsAdminComponent, [{
    type: Component,
    args: [{ selector: "vmc-weekly-programs-admin", standalone: true, imports: [CommonModule, MaterialModule], template: `<section class="weekly-admin">
  <div class="weekly-admin__toolbar">
    <div class="weekly-admin__filters">
      <mat-form-field appearance="outline"><mat-label>Congregaci\xF3n</mat-label><mat-select [value]="selectedCongregationId" (selectionChange)="onCongregationChange($event.value)">@for (congregation of congregations; track congregation.id) { <mat-option [value]="congregation.id">{{ congregation.name }}</mat-option> }</mat-select></mat-form-field>
      <mat-form-field appearance="outline"><mat-label>Semana</mat-label><mat-select [value]="selectedWeek" (selectionChange)="onWeekChange($event.value)" [disabled]="!weekOptions.length">@for (week of weekOptions; track week.week) { <mat-option [value]="week.week">{{ week.label }}</mat-option> }</mat-select></mat-form-field>
    </div>
    <div class="weekly-admin__commands"><button mat-stroked-button color="primary" type="button" (click)="loadWeek()" [disabled]="isLoading"><mat-icon>refresh</mat-icon>Actualizar</button><button mat-flat-button color="primary" type="button" (click)="create()" [disabled]="isLoading"><mat-icon>add</mat-icon>Nueva parte</button></div>
  </div>
  @if (isLoading) { <mat-progress-bar mode="indeterminate"></mat-progress-bar> }
  <div class="weekly-admin__table"><table mat-table [dataSource]="rows">
    <ng-container matColumnDef="room"><th mat-header-cell *matHeaderCellDef>Sala</th><td mat-cell *matCellDef="let row">{{ row.room || '\u2014' }}</td></ng-container>
    <ng-container matColumnDef="startTime"><th mat-header-cell *matHeaderCellDef>Hora</th><td mat-cell *matCellDef="let row">{{ row.startTime || '\u2014' }}</td></ng-container>
    <ng-container matColumnDef="number"><th mat-header-cell *matHeaderCellDef>No.</th><td mat-cell *matCellDef="let row">{{ row.assignment?.number ?? '\u2014' }}</td></ng-container>
    <ng-container matColumnDef="section"><th mat-header-cell *matHeaderCellDef>Secci\xF3n</th><td mat-cell *matCellDef="let row">{{ row.assignment?.sectionMeeting || '\u2014' }}</td></ng-container>
    <ng-container matColumnDef="title"><th mat-header-cell *matHeaderCellDef>T\xEDtulo</th><td mat-cell *matCellDef="let row">{{ row.assignment?.title || '\u2014' }}</td></ng-container>
    <ng-container matColumnDef="responsible"><th mat-header-cell *matHeaderCellDef>Responsable</th><td mat-cell *matCellDef="let row">{{ personName(row.responsible) }}</td></ng-container>
    <ng-container matColumnDef="assistant"><th mat-header-cell *matHeaderCellDef>Ayudante</th><td mat-cell *matCellDef="let row">{{ personName(row.assistant) }}</td></ng-container>
    <ng-container matColumnDef="notification"><th mat-header-cell *matHeaderCellDef>Notificaci\xF3n</th><td mat-cell *matCellDef="let row">{{ notificationLabel(row) }}</td></ng-container>
    <ng-container matColumnDef="actions"><th mat-header-cell *matHeaderCellDef></th><td mat-cell *matCellDef="let row" class="weekly-admin__actions"><button mat-icon-button color="primary" (click)="edit(row)" matTooltip="Editar"><mat-icon>edit</mat-icon></button><button mat-icon-button color="warn" (click)="remove(row)" matTooltip="Eliminar"><mat-icon>delete</mat-icon></button></td></ng-container>
    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr><tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
  </table>@if (isLoading) { <div class="weekly-admin__loading" role="status" aria-live="polite"><mat-spinner diameter="40"></mat-spinner><span>Cargando partes semanales\u2026</span></div> } @if (!isLoading && !rows.length) { <div class="weekly-admin__empty">No hay partes para la congregaci\xF3n y semana seleccionadas.</div> }</div>
</section>
`, styles: ["/* src/app/pages/entre-semana/manager/weekly-programs-admin/weekly-programs-admin.component.scss */\n:host {\n  display: block;\n}\n.weekly-admin {\n  display: flex;\n  flex-direction: column;\n  gap: 18px;\n}\n.weekly-admin__toolbar,\n.weekly-admin__filters,\n.weekly-admin__commands {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.weekly-admin__toolbar {\n  justify-content: space-between;\n}\n.weekly-admin__filters mat-form-field {\n  width: min(42vw, 420px);\n  min-width: 280px;\n}\n.weekly-admin__table {\n  position: relative;\n  overflow-x: auto;\n  border: 1px solid #d7dde8;\n  border-radius: 8px;\n  background: #fff;\n}\ntable {\n  width: 100%;\n  min-width: 1050px;\n}\n.weekly-admin__actions {\n  white-space: nowrap;\n}\n.weekly-admin__empty {\n  padding: 28px;\n  text-align: center;\n  color: #64748b;\n}\n.weekly-admin__loading {\n  position: absolute;\n  inset: 0;\n  z-index: 1;\n  display: flex;\n  min-height: 190px;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  color: #334155;\n  background: rgba(255, 255, 255, 0.82);\n}\n@media (max-width: 900px) {\n  .weekly-admin__toolbar,\n  .weekly-admin__filters,\n  .weekly-admin__commands {\n    align-items: stretch;\n    flex-direction: column;\n  }\n  .weekly-admin__filters mat-form-field {\n    width: 100%;\n    min-width: 0;\n  }\n}\n/*# sourceMappingURL=weekly-programs-admin.component.css.map */\n"] }]
  }], () => [{ type: CongregationsService }, { type: MeetingsService }, { type: ProgramService }, { type: WeeklyProgramService }, { type: MatDialog }, { type: MatSnackBar }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(WeeklyProgramsAdminComponent, { className: "WeeklyProgramsAdminComponent", filePath: "src/app/pages/entre-semana/manager/weekly-programs-admin/weekly-programs-admin.component.ts", lineNumber: 27 });
})();

// src/app/pages/entre-semana/manager/manager.component.ts
var ManagerComponent = class _ManagerComponent {
  constructor(dataService, meetingsService) {
    this.dataService = dataService;
    this.meetingsService = meetingsService;
    this.programList = [];
    this.meetings = [];
    this.semanasSalaAuxiliar = [];
    this.porAsignar = "por asignar";
    this.congregation = CongregationMock;
    this.showSpinner = false;
    this.meetingDay = 1;
    this.items = [];
  }
  ngOnInit() {
    this.dataService.getPublisher().subscribe((data) => {
      this.Superintendente = data;
    });
    this.dataService.getCongregation$().subscribe((data) => {
      this.congregation = data;
      this.meetingDay = data.day;
    });
    this.getPrograms();
    this.items = [
      { label: "Dashboard", icon: "pi pi-home" },
      { label: "Transactions", icon: "pi pi-chart-line" },
      { label: "Products", icon: "pi pi-list" }
    ];
    this.activeItem = this.items[0];
  }
  onActiveItemChange(event) {
    this.activeItem = event;
  }
  getPrograms() {
    this.showSpinner = true;
    this.meetingsService.getCurrentToLast().subscribe((data) => {
      this.meetings = [...data];
      this.showSpinner = false;
    }, (error) => {
      console.error(error);
      this.showSpinner = false;
    });
  }
  selectedEdit(item) {
    console.log(item);
  }
  parceDate(date) {
    return Utils.showDayOfMeeting(date, this.congregation.day);
  }
  static {
    this.\u0275fac = function ManagerComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ManagerComponent)(\u0275\u0275directiveInject(DataService), \u0275\u0275directiveInject(MeetingsService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ManagerComponent, selectors: [["vmc-manager"]], decls: 16, vars: 0, consts: [[1, "container-fluid"], [1, "row"], [1, "col-md-12"], [1, "text-center"], ["animationDuration", "0ms"], ["label", "Programas", 1, "p-4"], [1, "p-4"], [1, "col-md-12", "my-4"], ["label", "Semanas"]], template: function ManagerComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h2", 3);
        \u0275\u0275text(4, "Administrador de Programa");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(5, "div", 1)(6, "div", 2)(7, "mat-tab-group", 4)(8, "mat-tab", 5)(9, "div", 6)(10, "div", 1)(11, "div", 7);
        \u0275\u0275element(12, "vmc-programs");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(13, "mat-tab", 8)(14, "div", 6);
        \u0275\u0275element(15, "vmc-weekly-programs-admin");
        \u0275\u0275elementEnd()()()()()();
      }
    }, dependencies: [CommonModule, MatTabsModule, MatTab, MatTabGroup, ProgramsComponent, WeeklyProgramsAdminComponent], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=manager.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ManagerComponent, [{
    type: Component,
    args: [{ selector: "vmc-manager", imports: [CommonModule, MatTabsModule, ProgramsComponent, WeeklyProgramsAdminComponent], template: '<div class="container-fluid">\n  <div class="row">\n    <div class="col-md-12">\n      <h2 class="text-center">Administrador de Programa</h2>\n    </div>\n  </div>\n  <div class="row">\n    <div class="col-md-12">\n      <mat-tab-group animationDuration="0ms">\n        <mat-tab label="Programas" class="p-4">\n          <div class="p-4">\n            <div class="row">\n              <div class="col-md-12 my-4">\n                <vmc-programs></vmc-programs>\n              </div>\n            </div>\n          </div>\n        </mat-tab>\n        <mat-tab label="Semanas">\n          <div class="p-4">\n            <vmc-weekly-programs-admin></vmc-weekly-programs-admin>\n          </div>\n        </mat-tab>\n      </mat-tab-group>\n    </div>\n  </div>\n</div>\n', styles: ["/* src/app/pages/entre-semana/manager/manager.component.scss */\n:host {\n  display: block;\n}\n/*# sourceMappingURL=manager.component.css.map */\n"] }]
  }], () => [{ type: DataService }, { type: MeetingsService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ManagerComponent, { className: "ManagerComponent", filePath: "src/app/pages/entre-semana/manager/manager.component.ts", lineNumber: 17 });
})();

// src/app/core/guards/admin.guard.ts
var AdminGuard = () => {
  const router = inject(Router);
  const dataService = inject(DataService);
  const cookieService = inject(CookieService);
  const httpClient = inject(HttpClient);
  const storageAdmin = isAdminEmail(readCurrentUserEmail(cookieService));
  if (storageAdmin) {
    dataService.setIsAdmin(true);
    return true;
  }
  const userId = readCurrentUserId();
  if (userId) {
    const url = `${Servers.URL}${Apis.AUTH}/user/by-id?userId=${userId}`;
    return httpClient.get(url).pipe(map((publisher) => {
      localStorage.setItem("publisher", JSON.stringify(publisher));
      dataService.setPublisher(publisher);
      const admin = isAdminEmail(publisher.email);
      dataService.setIsAdmin(admin);
      return admin ? true : router.createUrlTree(["/tablero/entre-semana"]);
    }), catchError(() => of(router.createUrlTree(["/tablero/entre-semana"]))));
  }
  return dataService.getIsAdmin().pipe(take(1), map((stateAdmin) => stateAdmin ? true : router.createUrlTree(["/tablero/entre-semana"])));
};
function readCurrentUserEmail(cookieService) {
  const publisher = readStorageObject("publisher") ?? readCookieObject(cookieService, "publisher");
  if (publisher?.email) {
    return publisher.email;
  }
  const token = readAccessToken();
  if (!token) {
    return null;
  }
  try {
    const decodedToken = decodeTokenPayload(token);
    return decodedToken?.email ?? decodedToken?.data?.email ?? decodedToken?.sub ?? null;
  } catch {
    return null;
  }
}
function readCurrentUserId() {
  const token = readAccessToken();
  if (!token) {
    return null;
  }
  try {
    const decodedToken = decodeTokenPayload(token);
    return decodedToken?.userId ?? decodedToken?.data?.id ?? null;
  } catch {
    return null;
  }
}
function decodeTokenPayload(token) {
  const payload = token.split(".")[1];
  if (!payload) {
    return null;
  }
  const normalizedPayload = payload.replace(/-/g, "+").replace(/_/g, "/");
  const paddedPayload = normalizedPayload.padEnd(normalizedPayload.length + (4 - normalizedPayload.length % 4) % 4, "=");
  try {
    const decodedPayload = atob(paddedPayload);
    const jsonPayload = decodeURIComponent(decodedPayload.split("").map((character) => `%${character.charCodeAt(0).toString(16).padStart(2, "0")}`).join(""));
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}
function readAccessToken() {
  const tokenStorage = localStorage.getItem("token");
  if (!tokenStorage) {
    return null;
  }
  try {
    const parsedToken = JSON.parse(tokenStorage);
    return typeof parsedToken?.token === "string" ? parsedToken.token : null;
  } catch {
    return tokenStorage;
  }
}
function readStorageObject(storageKey) {
  const storageValue = localStorage.getItem(storageKey);
  if (!storageValue) {
    return null;
  }
  try {
    return JSON.parse(storageValue);
  } catch {
    return null;
  }
}
function readCookieObject(cookieService, cookieName) {
  const cookieValue = cookieService.get(cookieName);
  if (!cookieValue) {
    return null;
  }
  try {
    return JSON.parse(cookieValue);
  } catch {
    return null;
  }
}

// src/app/pages/congregations/congregations-list/congregations-list.component.ts
function CongregationsListComponent_th_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 18);
    \u0275\u0275text(1, "Nombre");
    \u0275\u0275elementEnd();
  }
}
function CongregationsListComponent_td_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 19);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r1.name);
  }
}
function CongregationsListComponent_th_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 18);
    \u0275\u0275text(1, "N\xFAmero");
    \u0275\u0275elementEnd();
  }
}
function CongregationsListComponent_td_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 19);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r2.number);
  }
}
function CongregationsListComponent_th_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 18);
    \u0275\u0275text(1, "D\xEDa");
    \u0275\u0275elementEnd();
  }
}
function CongregationsListComponent_td_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 19);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r3 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r3.parseDay(c_r3.day));
  }
}
function CongregationsListComponent_th_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 18);
    \u0275\u0275text(1, "Hora");
    \u0275\u0275elementEnd();
  }
}
function CongregationsListComponent_td_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 19);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r5.hour);
  }
}
function CongregationsListComponent_th_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 18);
    \u0275\u0275text(1, "Color Fuente");
    \u0275\u0275elementEnd();
  }
}
function CongregationsListComponent_td_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 19)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const c_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275styleProp("color", c_r6.fontColorPublisher);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r6.fontColorPublisher);
  }
}
function CongregationsListComponent_th_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 18);
    \u0275\u0275text(1, "Acciones");
    \u0275\u0275elementEnd();
  }
}
function CongregationsListComponent_td_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 19)(1, "mat-icon", 20);
    \u0275\u0275listener("click", function CongregationsListComponent_td_27_Template_mat_icon_click_1_listener() {
      const c_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.onEdit(c_r8));
    });
    \u0275\u0275text(2, "edit");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "mat-icon", 21);
    \u0275\u0275listener("click", function CongregationsListComponent_td_27_Template_mat_icon_click_3_listener() {
      const c_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.onDelete(c_r8));
    });
    \u0275\u0275text(4, "delete");
    \u0275\u0275elementEnd()();
  }
}
function CongregationsListComponent_tr_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 22);
  }
}
function CongregationsListComponent_tr_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 23);
  }
}
function CongregationsListComponent_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275text(1, "No hay congregaciones registradas.");
    \u0275\u0275elementEnd();
  }
}
var CongregationsListComponent = class _CongregationsListComponent {
  onAdd() {
    throw new Error("Method not implemented.");
  }
  constructor(congregationsService) {
    this.congregationsService = congregationsService;
    this.displayedColumns = ["name", "number", "day", "hour", "fontColorPublisher", "actions"];
    this.dataSource = new MatTableDataSource([]);
  }
  ngOnInit() {
    this.congregationsService.getAllCongregations().subscribe((data) => {
      this.dataSource.data = data;
    });
  }
  parseDay(day) {
    const days = ["Domingo", "Lunes", "Martes", "Mi\xE9rcoles", "Jueves", "Viernes", "S\xE1bado"];
    return days[day] || "Desconocido";
  }
  onEdit(congregation) {
    console.log("Editar", congregation);
  }
  onDelete(congregation) {
    console.log("Eliminar", congregation);
  }
  static {
    this.\u0275fac = function CongregationsListComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CongregationsListComponent)(\u0275\u0275directiveInject(CongregationsService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CongregationsListComponent, selectors: [["vmc-congregations-list"]], decls: 31, vars: 4, consts: [[1, "congregations-table-container"], [1, "table-header"], [1, "table-title"], ["mat-fab", "", "color", "primary", "title", "Agregar Congregaci\xF3n", 1, "add-btn", "icon-stack", 3, "click"], [1, "icon-base"], [1, "icon-plus"], ["mat-table", "", 1, "congregations-table", "mat-elevation-z2", 3, "dataSource"], ["matColumnDef", "name"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "number"], ["matColumnDef", "day"], ["matColumnDef", "hour"], ["matColumnDef", "fontColorPublisher"], ["matColumnDef", "actions"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], [1, "empty-message"], ["mat-header-cell", ""], ["mat-cell", ""], ["title", "Editar", 1, "action-icon", 2, "color", "#2563eb", "cursor", "pointer", 3, "click"], ["title", "Eliminar", 1, "action-icon", "ml-2", 2, "color", "#ef4444", "cursor", "pointer", "margin-left", "14px", 3, "click"], ["mat-header-row", ""], ["mat-row", ""]], template: function CongregationsListComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2", 2);
        \u0275\u0275text(3, "Congregaciones");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "button", 3);
        \u0275\u0275listener("click", function CongregationsListComponent_Template_button_click_4_listener() {
          return ctx.onAdd();
        });
        \u0275\u0275elementStart(5, "mat-icon", 4);
        \u0275\u0275text(6, "holiday_village");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "mat-icon", 5);
        \u0275\u0275text(8, "add_circle");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(9, "table", 6);
        \u0275\u0275elementContainerStart(10, 7);
        \u0275\u0275template(11, CongregationsListComponent_th_11_Template, 2, 0, "th", 8)(12, CongregationsListComponent_td_12_Template, 2, 1, "td", 9);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(13, 10);
        \u0275\u0275template(14, CongregationsListComponent_th_14_Template, 2, 0, "th", 8)(15, CongregationsListComponent_td_15_Template, 2, 1, "td", 9);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(16, 11);
        \u0275\u0275template(17, CongregationsListComponent_th_17_Template, 2, 0, "th", 8)(18, CongregationsListComponent_td_18_Template, 2, 1, "td", 9);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(19, 12);
        \u0275\u0275template(20, CongregationsListComponent_th_20_Template, 2, 0, "th", 8)(21, CongregationsListComponent_td_21_Template, 2, 1, "td", 9);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(22, 13);
        \u0275\u0275template(23, CongregationsListComponent_th_23_Template, 2, 0, "th", 8)(24, CongregationsListComponent_td_24_Template, 3, 3, "td", 9);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(25, 14);
        \u0275\u0275template(26, CongregationsListComponent_th_26_Template, 2, 0, "th", 8)(27, CongregationsListComponent_td_27_Template, 5, 0, "td", 9);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275template(28, CongregationsListComponent_tr_28_Template, 1, 0, "tr", 15)(29, CongregationsListComponent_tr_29_Template, 1, 0, "tr", 16);
        \u0275\u0275elementEnd();
        \u0275\u0275template(30, CongregationsListComponent_Conditional_30_Template, 2, 0, "div", 17);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(9);
        \u0275\u0275property("dataSource", ctx.dataSource);
        \u0275\u0275advance(19);
        \u0275\u0275property("matHeaderRowDef", ctx.displayedColumns);
        \u0275\u0275advance();
        \u0275\u0275property("matRowDefColumns", ctx.displayedColumns);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.dataSource.data.length === 0 ? 30 : -1);
      }
    }, dependencies: [MatTableModule, MatTable, MatHeaderCellDef, MatHeaderRowDef, MatColumnDef, MatCellDef, MatRowDef, MatHeaderCell, MatCell, MatHeaderRow, MatRow, MatIconModule, MatIcon, MatButtonModule, MatFabButton], styles: ["\n\n.icon-stack[_ngcontent-%COMP%] {\n  position: relative;\n}\n.icon-base[_ngcontent-%COMP%] {\n  font-size: 28px;\n}\n.icon-plus[_ngcontent-%COMP%] {\n  position: absolute;\n  right: -6px;\n  bottom: -6px;\n  font-size: 20px;\n  color: #fff200;\n  background: var(--vmc-primary);\n  border-radius: 50%;\n  box-shadow: 0 1px 4px 0 rgba(30, 64, 175, 0.18);\n}\n.table-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 24px;\n  gap: 16px;\n}\n.add-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n}\n.add-btn[_ngcontent-%COMP%] {\n  box-shadow: 0 2px 8px 0 rgba(30, 64, 175, 0.12);\n  background: var(--vmc-primary) !important;\n}\n.add-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #fff;\n  font-size: 28px;\n}\n.action-icon[_ngcontent-%COMP%] {\n  vertical-align: middle;\n  font-size: 22px;\n}\n.congregations-table-container[_ngcontent-%COMP%]   .mat-icon-button[_ngcontent-%COMP%] {\n  box-shadow: none !important;\n  border: none !important;\n  background: transparent !important;\n  outline: none !important;\n}\n.congregations-table-container[_ngcontent-%COMP%] {\n  max-width: 900px;\n  margin: 40px auto;\n  background: var(--vmc-accent-soft);\n  border-radius: 18px;\n  box-shadow: 0 2px 16px 0 rgba(30, 64, 175, 0.08);\n  padding: 32px 24px 24px 24px;\n}\n.table-title[_ngcontent-%COMP%] {\n  color: var(--vmc-primary-800);\n  font-weight: 700;\n  margin-bottom: 24px;\n  font-size: 2rem;\n  letter-spacing: 0.5px;\n}\n.congregations-table[_ngcontent-%COMP%] {\n  width: 100%;\n  background: white;\n  border-radius: 12px;\n  overflow: hidden;\n}\nth.mat-header-cell[_ngcontent-%COMP%] {\n  background: var(--vmc-primary);\n  color: #fff;\n  font-weight: 600;\n  font-size: 1rem;\n  border-bottom: 2px solid var(--vmc-primary-900);\n}\ntd.mat-cell[_ngcontent-%COMP%] {\n  font-size: 0.98rem;\n  color: #1e293b;\n  border-bottom: 1px solid #e0e7ef;\n}\n.empty-message[_ngcontent-%COMP%] {\n  text-align: center;\n  color: #64748b;\n  margin-top: 32px;\n  font-size: 1.1rem;\n}\n/*# sourceMappingURL=congregations-list.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CongregationsListComponent, [{
    type: Component,
    args: [{ selector: "vmc-congregations-list", standalone: true, imports: [MatTableModule, MatIconModule, MatButtonModule], template: '<div class="congregations-table-container">\r\n  <div class="table-header">\r\n    <h2 class="table-title">Congregaciones</h2>\r\n    <button mat-fab color="primary" class="add-btn icon-stack" (click)="onAdd()" title="Agregar Congregaci\xF3n">\r\n      <mat-icon class="icon-base">holiday_village</mat-icon>\r\n      <mat-icon class="icon-plus">add_circle</mat-icon>\r\n    </button>\r\n  </div>\r\n  <table mat-table [dataSource]="dataSource" class="congregations-table mat-elevation-z2">\r\n    <!-- Nombre -->\r\n    <ng-container matColumnDef="name">\r\n      <th mat-header-cell *matHeaderCellDef>Nombre</th>\r\n      <td mat-cell *matCellDef="let c">{{ c.name }}</td>\r\n    </ng-container>\r\n    <!-- N\xFAmero -->\r\n    <ng-container matColumnDef="number">\r\n      <th mat-header-cell *matHeaderCellDef>N\xFAmero</th>\r\n      <td mat-cell *matCellDef="let c">{{ c.number }}</td>\r\n    </ng-container>\r\n    <!-- D\xEDa -->\r\n    <ng-container matColumnDef="day">\r\n      <th mat-header-cell *matHeaderCellDef>D\xEDa</th>\r\n      <td mat-cell *matCellDef="let c">{{ parseDay(c.day) }}</td>\r\n    </ng-container>\r\n    <!-- Hora -->\r\n    <ng-container matColumnDef="hour">\r\n      <th mat-header-cell *matHeaderCellDef>Hora</th>\r\n      <td mat-cell *matCellDef="let c">{{ c.hour }}</td>\r\n    </ng-container>\r\n    <!-- Color Fuente -->\r\n    <ng-container matColumnDef="fontColorPublisher">\r\n      <th mat-header-cell *matHeaderCellDef>Color Fuente</th>\r\n      <td mat-cell *matCellDef="let c">\r\n        <span [style.color]="c.fontColorPublisher">{{ c.fontColorPublisher }}</span>\r\n      </td>\r\n    </ng-container>\r\n    <!-- Acciones -->\r\n    <ng-container matColumnDef="actions">\r\n      <th mat-header-cell *matHeaderCellDef>Acciones</th>\r\n      <td mat-cell *matCellDef="let c">\r\n        <mat-icon class="action-icon" style="color: #2563eb; cursor: pointer" (click)="onEdit(c)" title="Editar">edit</mat-icon>\r\n        <mat-icon class="action-icon ml-2" style="color: #ef4444; cursor: pointer; margin-left: 14px;" (click)="onDelete(c)" title="Eliminar">delete</mat-icon>\r\n      </td>\r\n    </ng-container>\r\n    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>\r\n    <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>\r\n  </table>\r\n  @if ( dataSource.data.length === 0 ) {\r\n  <div class="empty-message">No hay congregaciones registradas.</div>\r\n  }\r\n</div>\r\n', styles: ["/* src/app/pages/congregations/congregations-list/congregations-list.component.scss */\n.icon-stack {\n  position: relative;\n}\n.icon-base {\n  font-size: 28px;\n}\n.icon-plus {\n  position: absolute;\n  right: -6px;\n  bottom: -6px;\n  font-size: 20px;\n  color: #fff200;\n  background: var(--vmc-primary);\n  border-radius: 50%;\n  box-shadow: 0 1px 4px 0 rgba(30, 64, 175, 0.18);\n}\n.table-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 24px;\n  gap: 16px;\n}\n.add-btn {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n}\n.add-btn {\n  box-shadow: 0 2px 8px 0 rgba(30, 64, 175, 0.12);\n  background: var(--vmc-primary) !important;\n}\n.add-btn mat-icon {\n  color: #fff;\n  font-size: 28px;\n}\n.action-icon {\n  vertical-align: middle;\n  font-size: 22px;\n}\n.congregations-table-container .mat-icon-button {\n  box-shadow: none !important;\n  border: none !important;\n  background: transparent !important;\n  outline: none !important;\n}\n.congregations-table-container {\n  max-width: 900px;\n  margin: 40px auto;\n  background: var(--vmc-accent-soft);\n  border-radius: 18px;\n  box-shadow: 0 2px 16px 0 rgba(30, 64, 175, 0.08);\n  padding: 32px 24px 24px 24px;\n}\n.table-title {\n  color: var(--vmc-primary-800);\n  font-weight: 700;\n  margin-bottom: 24px;\n  font-size: 2rem;\n  letter-spacing: 0.5px;\n}\n.congregations-table {\n  width: 100%;\n  background: white;\n  border-radius: 12px;\n  overflow: hidden;\n}\nth.mat-header-cell {\n  background: var(--vmc-primary);\n  color: #fff;\n  font-weight: 600;\n  font-size: 1rem;\n  border-bottom: 2px solid var(--vmc-primary-900);\n}\ntd.mat-cell {\n  font-size: 0.98rem;\n  color: #1e293b;\n  border-bottom: 1px solid #e0e7ef;\n}\n.empty-message {\n  text-align: center;\n  color: #64748b;\n  margin-top: 32px;\n  font-size: 1.1rem;\n}\n/*# sourceMappingURL=congregations-list.component.css.map */\n"] }]
  }], () => [{ type: CongregationsService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CongregationsListComponent, { className: "CongregationsListComponent", filePath: "src/app/pages/congregations/congregations-list/congregations-list.component.ts", lineNumber: 15 });
})();

// src/app/pages/dashboard/dashboad-routing.module.ts
var routes = [
  {
    path: "",
    component: DashboardComponent,
    children: [
      {
        path: "",
        redirectTo: "entre-semana",
        pathMatch: "full"
      },
      {
        path: "entre-semana",
        loadChildren: () => import("./entre-semana.module-JU4FZW2N.js").then((m) => m.EntreSemanaModule),
        canActivate: [LoginGuard]
      },
      {
        path: "imprimir",
        component: PrinterComponent,
        canActivate: [LoginGuard]
      },
      {
        path: "imprimir/:tipo",
        component: PrinterComponent,
        canActivate: [LoginGuard]
      },
      {
        path: "publicador",
        component: UsersCreateOrUpdateComponent,
        canActivate: [LoginGuard]
      },
      {
        path: "publicador/:id",
        component: UsersCreateOrUpdateComponent,
        canActivate: [LoginGuard]
      },
      {
        path: "publicadores",
        component: PublisherListComponent,
        canActivate: [LoginGuard]
      },
      {
        path: "privilegios",
        component: PublisherPrivilegesComponent,
        canActivate: [LoginGuard, AdminGuard]
      },
      {
        path: "administrador",
        component: ManagerComponent,
        canActivate: [LoginGuard, AdminGuard]
      },
      {
        path: "congregaciones",
        component: CongregationsListComponent,
        canActivate: [LoginGuard, AdminGuard]
      },
      {
        path: "hojas-asignacion",
        component: AssignmentSheetPrinterComponent,
        canActivate: [LoginGuard]
      },
      {
        path: "notificaciones",
        loadComponent: () => import("./notifications.component-QXAZGMQ3.js").then((m) => m.NotificationsComponent),
        canActivate: [LoginGuard]
      },
      {
        path: "**",
        component: NotFoundComponent
      }
    ]
  }
];
var DashboardRoutingModule = class _DashboardRoutingModule {
  static {
    this.\u0275fac = function DashboardRoutingModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DashboardRoutingModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _DashboardRoutingModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DashboardRoutingModule, [{
    type: NgModule,
    args: [{
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
    }]
  }], null, null);
})();

// src/app/pages/dashboard/dashboard.module.ts
var DashboardModule = class _DashboardModule {
  static {
    this.\u0275fac = function DashboardModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DashboardModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _DashboardModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
      CommonModule,
      DashboardRoutingModule
    ] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DashboardModule, [{
    type: NgModule,
    args: [{
      declarations: [],
      imports: [
        CommonModule,
        DashboardRoutingModule
      ]
    }]
  }], null, null);
})();
export {
  DashboardModule
};
//# sourceMappingURL=dashboard.module-4FYWFR4A.js.map
