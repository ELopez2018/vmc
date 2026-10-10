import {
  AssignmentTypesService,
  SharedModule
} from "./chunk-HOK7MI44.js";
import {
  ActivatedRoute,
  DateAdapter,
  MAT_DATE_LOCALE,
  MAT_DIALOG_DATA,
  MatCard,
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle,
  MatDialogRef,
  MatInput,
  MatSlideToggle
} from "./chunk-5TOJZSZF.js";
import {
  NotificationService
} from "./chunk-CN37YKRR.js";
import {
  Apis,
  CommonModule,
  Component,
  DataService,
  DefaultValueAccessor,
  FormBuilder,
  FormControl,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  HttpClient,
  Inject,
  Injectable,
  MatButton,
  MatError,
  MatFormField,
  MatIcon,
  MatIconButton,
  MatLabel,
  MatOption,
  MatProgressSpinner,
  MatSelect,
  MatSuffix,
  MatTooltip,
  NgClass,
  NgControlStatus,
  NgControlStatusGroup,
  Optional,
  ReactiveFormsModule,
  Servers,
  UsersService,
  Validators,
  __spreadProps,
  __spreadValues,
  finalize,
  map,
  of,
  setClassMetadata,
  switchMap,
  ɵNgNoValidate,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction2,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-MIOFCSIM.js";

// src/app/core/services/congregations/congregations.service.ts
var CongregationsService = class _CongregationsService {
  constructor(httpClient) {
    this.httpClient = httpClient;
    this.server = Servers.URL;
    this.api = Apis;
  }
  getAllCongregations() {
    const url = `${this.server}${this.api.CONGREGATIONS}`;
    return this.httpClient.get(url);
  }
  getById(id) {
    const url = `${this.server}${this.api.CONGREGATIONS}/by-id?congregationId=${id}`;
    return this.httpClient.get(url);
  }
  static {
    this.\u0275fac = function CongregationsService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CongregationsService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _CongregationsService, factory: _CongregationsService.\u0275fac, providedIn: "root" });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CongregationsService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/core/services/user-assignment-types/user-assignment-types.service.ts
var UserAssignmentTypesService = class _UserAssignmentTypesService {
  constructor(httpClient) {
    this.httpClient = httpClient;
    this.server = Servers.URL;
    this.api = Apis;
  }
  updateBulk(request) {
    const url = `${this.server}${this.api.USER_ASSIGNMENT_TYPES}/bulk`;
    return this.httpClient.put(url, request);
  }
  static {
    this.\u0275fac = function UserAssignmentTypesService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _UserAssignmentTypesService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _UserAssignmentTypesService, factory: _UserAssignmentTypesService.\u0275fac, providedIn: "root" });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UserAssignmentTypesService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/shared/components/users-create-or-update/users-create-or-update.component.ts
var _c0 = (a0, a1) => ({ "type-ayudante": a0, "type-encargado": a1 });
var _forTrack0 = ($index, $item) => $item.id;
function UsersCreateOrUpdateComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2)(1, "h2");
    \u0275\u0275text(2, "Editar publicador");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 11);
    \u0275\u0275listener("click", function UsersCreateOrUpdateComponent_Conditional_1_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeDialog());
    });
    \u0275\u0275elementStart(4, "mat-icon");
    \u0275\u0275text(5, "close");
    \u0275\u0275elementEnd()()();
  }
}
function UsersCreateOrUpdateComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-form-field", 6)(1, "mat-label");
    \u0275\u0275text(2, "Congregaci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "input", 12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("value", ctx_r1.congregationSelected.name);
  }
}
function UsersCreateOrUpdateComponent_Conditional_10_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    \u0275\u0275property("value", item_r4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r4.name, " ");
  }
}
function UsersCreateOrUpdateComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-form-field", 6)(1, "mat-label");
    \u0275\u0275text(2, "Congregaci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "mat-select", 13);
    \u0275\u0275listener("selectionChange", function UsersCreateOrUpdateComponent_Conditional_10_Template_mat_select_selectionChange_3_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onChange());
    });
    \u0275\u0275twoWayListener("valueChange", function UsersCreateOrUpdateComponent_Conditional_10_Template_mat_select_valueChange_3_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.congregationSelected, $event) || (ctx_r1.congregationSelected = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275repeaterCreate(4, UsersCreateOrUpdateComponent_Conditional_10_For_5_Template, 2, 2, "mat-option", 14, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("value", ctx_r1.congregationSelected);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.allCongregations);
  }
}
function UsersCreateOrUpdateComponent_Conditional_17_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Requerido");
    \u0275\u0275elementEnd();
  }
}
function UsersCreateOrUpdateComponent_Conditional_17_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Requerido");
    \u0275\u0275elementEnd();
  }
}
function UsersCreateOrUpdateComponent_Conditional_17_Conditional_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Correo inv\xE1lido");
    \u0275\u0275elementEnd();
  }
}
function UsersCreateOrUpdateComponent_Conditional_17_Conditional_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Requerido");
    \u0275\u0275elementEnd();
  }
}
function UsersCreateOrUpdateComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "form", 7)(1, "mat-form-field", 6)(2, "mat-label");
    \u0275\u0275text(3, "Tipo de Documento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "mat-select", 15)(5, "mat-option", 16);
    \u0275\u0275text(6, "C\xE9dula Ciudadan\xEDa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "mat-option", 17);
    \u0275\u0275text(8, "C\xE9dula Extranjer\xEDa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "mat-option", 18);
    \u0275\u0275text(10, "Tarjeta I");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "mat-option", 19);
    \u0275\u0275text(12, "Pasaporte");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "mat-option", 20);
    \u0275\u0275text(14, "Permiso Temporal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "mat-option", 21);
    \u0275\u0275text(16, "DNI");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(17, UsersCreateOrUpdateComponent_Conditional_17_Conditional_17_Template, 2, 0, "mat-error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "mat-form-field", 6)(19, "mat-label");
    \u0275\u0275text(20, "N\xFAmero documento");
    \u0275\u0275elementEnd();
    \u0275\u0275element(21, "input", 22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "mat-form-field", 6)(23, "mat-label");
    \u0275\u0275text(24, "Primer Nombre");
    \u0275\u0275elementEnd();
    \u0275\u0275element(25, "input", 23);
    \u0275\u0275template(26, UsersCreateOrUpdateComponent_Conditional_17_Conditional_26_Template, 2, 0, "mat-error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "mat-form-field", 6)(28, "mat-label");
    \u0275\u0275text(29, "Segundo Nombre");
    \u0275\u0275elementEnd();
    \u0275\u0275element(30, "input", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "mat-form-field", 6)(32, "mat-label");
    \u0275\u0275text(33, "Primer Apellido");
    \u0275\u0275elementEnd();
    \u0275\u0275element(34, "input", 25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "mat-form-field", 6)(36, "mat-label");
    \u0275\u0275text(37, "Segundo Apellido");
    \u0275\u0275elementEnd();
    \u0275\u0275element(38, "input", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "mat-form-field", 6)(40, "mat-label");
    \u0275\u0275text(41, "Tel\xE9fono");
    \u0275\u0275elementEnd();
    \u0275\u0275element(42, "input", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "mat-form-field", 6)(44, "mat-label");
    \u0275\u0275text(45, "Correo electr\xF3nico");
    \u0275\u0275elementEnd();
    \u0275\u0275element(46, "input", 28);
    \u0275\u0275template(47, UsersCreateOrUpdateComponent_Conditional_17_Conditional_47_Template, 2, 0, "mat-error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "mat-form-field", 6)(49, "mat-label");
    \u0275\u0275text(50, "G\xE9nero");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "mat-select", 29)(52, "mat-option", 30);
    \u0275\u0275text(53, "Masculino");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "mat-option", 31);
    \u0275\u0275text(55, "Femenino");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(56, UsersCreateOrUpdateComponent_Conditional_17_Conditional_56_Template, 2, 0, "mat-error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "mat-form-field", 6)(58, "mat-label");
    \u0275\u0275text(59, "Fecha de nacimiento");
    \u0275\u0275elementEnd();
    \u0275\u0275element(60, "input", 32)(61, "mat-datepicker-toggle", 33)(62, "mat-datepicker", 34, 0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_3_0;
    let tmp_4_0;
    let tmp_5_0;
    let tmp_6_0;
    const picker_r5 = \u0275\u0275reference(63);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("formGroup", ctx_r1.formulario);
    \u0275\u0275advance(17);
    \u0275\u0275conditional(((tmp_3_0 = ctx_r1.formulario.get("documentType")) == null ? null : tmp_3_0.hasError("required")) ? 17 : -1);
    \u0275\u0275advance(9);
    \u0275\u0275conditional(((tmp_4_0 = ctx_r1.formulario.get("firstName")) == null ? null : tmp_4_0.hasError("required")) ? 26 : -1);
    \u0275\u0275advance(21);
    \u0275\u0275conditional(((tmp_5_0 = ctx_r1.formulario.get("email")) == null ? null : tmp_5_0.hasError("email")) ? 47 : -1);
    \u0275\u0275advance(9);
    \u0275\u0275conditional(((tmp_6_0 = ctx_r1.formulario.get("gender")) == null ? null : tmp_6_0.hasError("required")) ? 56 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275property("matDatepicker", picker_r5);
    \u0275\u0275advance();
    \u0275\u0275property("for", picker_r5);
  }
}
function UsersCreateOrUpdateComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275element(1, "mat-progress-spinner", 35);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Cargando tipos de asignaci\xF3n");
    \u0275\u0275elementEnd()();
  }
}
function UsersCreateOrUpdateComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "mat-icon");
    \u0275\u0275text(2, "error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "No se pudieron cargar los tipos de asignaci\xF3n");
    \u0275\u0275elementEnd()();
  }
}
function UsersCreateOrUpdateComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "mat-icon");
    \u0275\u0275text(2, "info");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "Sin tipos de asignaci\xF3n");
    \u0275\u0275elementEnd()();
  }
}
function UsersCreateOrUpdateComponent_Conditional_27_For_46_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 46)(1, "div", 47)(2, "span", 48);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 49);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 50);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "mat-slide-toggle", 51);
    \u0275\u0275listener("change", function UsersCreateOrUpdateComponent_Conditional_27_For_46_Template_mat_slide_toggle_change_8_listener($event) {
      const assignmentType_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onPermissionChange(assignmentType_r8, $event.checked));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const assignmentType_r8 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(assignmentType_r8.number);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", assignmentType_r8.description, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(5, _c0, assignmentType_r8.type === "Ayudante", assignmentType_r8.type === "Encargado" || assignmentType_r8.type === "Estudiante"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" (", assignmentType_r8.type, ")\n");
    \u0275\u0275advance();
    \u0275\u0275property("checked", ctx_r1.isPermissionEnabled(assignmentType_r8));
  }
}
function UsersCreateOrUpdateComponent_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 36)(1, "div", 37)(2, "span", 38);
    \u0275\u0275text(3, "Selecci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 39);
    \u0275\u0275listener("click", function UsersCreateOrUpdateComponent_Conditional_27_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setAllPermissions(true));
    });
    \u0275\u0275elementStart(5, "mat-icon");
    \u0275\u0275text(6, "done_all");
    \u0275\u0275elementEnd();
    \u0275\u0275text(7, " Activar todas ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 39);
    \u0275\u0275listener("click", function UsersCreateOrUpdateComponent_Conditional_27_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setAllPermissions(false));
    });
    \u0275\u0275elementStart(9, "mat-icon");
    \u0275\u0275text(10, "remove_done");
    \u0275\u0275elementEnd();
    \u0275\u0275text(11, " Desactivar todas ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 37)(13, "span", 38);
    \u0275\u0275text(14, "Perfiles");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "button", 39);
    \u0275\u0275listener("click", function UsersCreateOrUpdateComponent_Conditional_27_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.applyBrotherPermissions());
    });
    \u0275\u0275elementStart(16, "mat-icon");
    \u0275\u0275text(17, "man");
    \u0275\u0275elementEnd();
    \u0275\u0275text(18, " Hermano ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "button", 39);
    \u0275\u0275listener("click", function UsersCreateOrUpdateComponent_Conditional_27_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.applySisterPermissions());
    });
    \u0275\u0275elementStart(20, "mat-icon");
    \u0275\u0275text(21, "woman");
    \u0275\u0275elementEnd();
    \u0275\u0275text(22, " Hermana ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div", 40)(24, "span", 38);
    \u0275\u0275text(25, "Perfiles configurables");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "div", 41)(27, "button", 39);
    \u0275\u0275listener("click", function UsersCreateOrUpdateComponent_Conditional_27_Template_button_click_27_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.applyConfiguredPermissionProfile("elder"));
    });
    \u0275\u0275elementStart(28, "mat-icon");
    \u0275\u0275text(29);
    \u0275\u0275elementEnd();
    \u0275\u0275text(30, " Anciano ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "button", 42);
    \u0275\u0275listener("click", function UsersCreateOrUpdateComponent_Conditional_27_Template_button_click_31_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveConfiguredPermissionProfile("elder"));
    });
    \u0275\u0275elementStart(32, "mat-icon");
    \u0275\u0275text(33, "save");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(34, "div", 41)(35, "button", 39);
    \u0275\u0275listener("click", function UsersCreateOrUpdateComponent_Conditional_27_Template_button_click_35_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.applyConfiguredPermissionProfile("ministerialServant"));
    });
    \u0275\u0275elementStart(36, "mat-icon");
    \u0275\u0275text(37);
    \u0275\u0275elementEnd();
    \u0275\u0275text(38, " Siervo ministerial ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "button", 43);
    \u0275\u0275listener("click", function UsersCreateOrUpdateComponent_Conditional_27_Template_button_click_39_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveConfiguredPermissionProfile("ministerialServant"));
    });
    \u0275\u0275elementStart(40, "mat-icon");
    \u0275\u0275text(41, "save");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(42, "p", 44);
    \u0275\u0275text(43, " Para configurar Anciano o Siervo ministerial, marca los permisos deseados y pulsa el icono de guardar junto al perfil. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "div", 45);
    \u0275\u0275repeaterCreate(45, UsersCreateOrUpdateComponent_Conditional_27_For_46_Template, 9, 8, "div", 46, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(29);
    \u0275\u0275textInterpolate(ctx_r1.isPermissionProfileConfigured("elder") ? "verified" : "person");
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.isPermissionProfileConfigured("ministerialServant") ? "verified" : "person");
    \u0275\u0275advance(8);
    \u0275\u0275repeater(ctx_r1.assignmentTypes);
  }
}
function UsersCreateOrUpdateComponent_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 10)(1, "button", 52);
    \u0275\u0275listener("click", function UsersCreateOrUpdateComponent_Conditional_28_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.save());
    });
    \u0275\u0275elementStart(2, "mat-icon");
    \u0275\u0275text(3, "save");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.disabledSave);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.isSaving ? "Guardando" : "Guardar", " ");
  }
}
var UsersCreateOrUpdateComponent = class _UsersCreateOrUpdateComponent {
  constructor(adapter, locale, dataService, fb, usersService, congregationsService, assignmentTypesService, userAssignmentTypesService, notify, routes, dialogData, dialogRef) {
    this.adapter = adapter;
    this.locale = locale;
    this.dataService = dataService;
    this.fb = fb;
    this.usersService = usersService;
    this.congregationsService = congregationsService;
    this.assignmentTypesService = assignmentTypesService;
    this.userAssignmentTypesService = userAssignmentTypesService;
    this.notify = notify;
    this.routes = routes;
    this.dialogData = dialogData;
    this.dialogRef = dialogRef;
    this.permissionProfilesStorageKey = "vmc.assignment-permission-profiles";
    this.allCongregations = [];
    this.assignmentTypes = [];
    this.isAdmin = false;
    this.isSaving = false;
    this.isLoadingAssignmentTypes = false;
    this.assignmentTypesLoadFailed = false;
    this.isDialog = false;
    this.configuredPermissionProfiles = {
      elder: [],
      ministerialServant: []
    };
    this.userId = null;
    this.locale = "co";
    this.adapter.setLocale(this.locale);
    this.isDialog = Boolean(this.dialogRef);
  }
  ngOnInit() {
    this.configuredPermissionProfiles = this.readPermissionProfiles();
    this.makeForm();
    this.loadCurrentCongregation();
    this.loadAdminState();
    this.getAllCong();
    this.loadAssignmentTypes();
    this.loadPublisherForEdit();
  }
  makeFormWithData(publisher) {
    this.currentPublisher = publisher;
    this.userId = publisher.id;
    this.formulario = this.fb.group({
      id: new FormControl(publisher.id),
      fullName: new FormControl(publisher.fullName),
      image: new FormControl(publisher.image),
      firstName: new FormControl(publisher.firstName, [Validators.required, Validators.maxLength(80)]),
      secondName: new FormControl(publisher.secondName, [Validators.maxLength(80)]),
      lastName: new FormControl(publisher.lastName, [Validators.maxLength(80)]),
      surname: new FormControl(publisher.surname, [Validators.maxLength(80)]),
      birthdate: new FormControl(publisher.birthdate),
      gender: new FormControl(publisher.gender, [Validators.required]),
      documentNumber: new FormControl(publisher.documentNumber),
      documentType: new FormControl(publisher.documentType, [Validators.required]),
      cellPhone: new FormControl(publisher.cellPhone, [Validators.maxLength(30)]),
      phone: new FormControl(publisher.phone, [Validators.maxLength(30)]),
      email: new FormControl(publisher.email, [Validators.email, Validators.maxLength(120)]),
      congregation: new FormControl(publisher.congregation ?? this.congregationSelected ?? null),
      congregationId: new FormControl(this.resolveCongregationId(publisher), [Validators.required]),
      assignmentTypePermissions: new FormControl(this.buildAssignmentTypePermissions(publisher.assignmentTypePermissions), [this.assignmentTypePermissionsValidator.bind(this)])
    });
  }
  makeForm() {
    this.formulario = this.fb.group({
      id: new FormControl(null),
      fullName: new FormControl(null),
      image: new FormControl(null),
      firstName: new FormControl(null, [Validators.required, Validators.maxLength(80)]),
      secondName: new FormControl(null, [Validators.maxLength(80)]),
      lastName: new FormControl(null, [Validators.maxLength(80)]),
      surname: new FormControl(null, [Validators.maxLength(80)]),
      birthdate: new FormControl(null),
      gender: new FormControl("Femenino", [Validators.required]),
      documentNumber: new FormControl(null),
      documentType: new FormControl("CC", [Validators.required]),
      cellPhone: new FormControl(null, [Validators.maxLength(30)]),
      phone: new FormControl(null, [Validators.maxLength(30)]),
      email: new FormControl(null, [Validators.email, Validators.maxLength(120)]),
      congregation: new FormControl(this.congregationSelected ?? null),
      congregationId: new FormControl(this.congregationSelected?.id ?? null, [Validators.required]),
      assignmentTypePermissions: new FormControl(this.buildAssignmentTypePermissions(), [this.assignmentTypePermissionsValidator.bind(this)])
    });
  }
  get permissions() {
    return this.formulario?.get("assignmentTypePermissions")?.value ?? [];
  }
  get disabledSave() {
    return this.isSaving || this.isLoadingAssignmentTypes;
  }
  getAllCong() {
    this.congregationsService.getAllCongregations().subscribe({
      next: (data) => this.allCongregations = data,
      error: (error) => this.notify.error(this.getErrorMessage(error, "No se pudieron cargar las congregaciones."), "Error")
    });
  }
  save() {
    if (this.isLoadingAssignmentTypes) {
      this.notify.warning("Espera a que terminen de cargar los tipos de asignaci\xF3n.", "Cargando");
      return;
    }
    if (this.assignmentTypesLoadFailed) {
      this.notify.error("No se pueden guardar permisos sin cargar los tipos de asignaci\xF3n.", "Error");
      return;
    }
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      this.notify.warning(this.getFormValidationMessage(), "Revisa el formulario", 12e3);
      return;
    }
    const publisher = this.buildPublisherPayload();
    this.isSaving = true;
    this.usersService.save(publisher).pipe(switchMap((savedPublisher) => {
      const userId = savedPublisher.id ?? publisher.id;
      if (!userId || this.assignmentTypes.length === 0) {
        return of(savedPublisher);
      }
      return this.userAssignmentTypesService.updateBulk({
        userId,
        assignments: this.getAssignmentTypePermissionsForBulk(userId).map((permission) => ({
          assignmentTypeId: permission.assignmentTypeId,
          enabled: permission.enabled
        }))
      }).pipe(map((assignmentTypePermissions) => __spreadProps(__spreadValues({}, savedPublisher), {
        assignmentTypePermissions
      })));
    }), finalize(() => this.isSaving = false)).subscribe({
      next: (savedPublisher) => {
        this.notify.success("El publicador fue almacenado correctamente.", "Listo");
        this.currentPublisher = savedPublisher;
        this.userId = savedPublisher.id ?? this.userId;
        this.dataService.getPublishersFromDB();
        if (this.isDialog) {
          this.dialogRef?.close(savedPublisher);
          return;
        }
        if (!this.userId) {
          this.formulario.reset();
          this.makeForm();
        } else {
          this.makeFormWithData(savedPublisher);
        }
      },
      error: (error) => this.notify.error(this.getErrorMessage(error, "No se puede guardar."), "No se puede guardar", 12e3)
    });
  }
  onChange() {
    this.formulario.patchValue({
      congregation: this.congregationSelected,
      congregationId: this.congregationSelected?.id ?? null
    });
  }
  closeDialog() {
    this.dialogRef?.close();
  }
  isPermissionEnabled(assignmentType) {
    return Boolean(this.permissions.find((permission) => permission.assignmentTypeId === assignmentType.id)?.enabled);
  }
  onPermissionChange(assignmentType, enabled) {
    const permissions = enabled ? this.upsertEnabledAssignmentTypePermission(assignmentType) : this.permissions.filter((permission) => permission.assignmentTypeId !== assignmentType.id);
    this.formulario.get("assignmentTypePermissions")?.setValue(permissions);
    this.formulario.get("assignmentTypePermissions")?.markAsDirty();
  }
  setAllPermissions(enabled) {
    this.setEnabledAssignmentTypes(enabled ? this.assignmentTypes : []);
  }
  applyBrotherPermissions() {
    this.setEnabledAssignmentTypes(this.assignmentTypes.filter((assignmentType) => this.isStudentAssignment(assignmentType) || this.isBibleReadingAssignment(assignmentType)));
  }
  applySisterPermissions() {
    this.setEnabledAssignmentTypes(this.assignmentTypes.filter((assignmentType) => this.isStudentAssignment(assignmentType) && !this.isStudentTalkAssignment(assignmentType)));
  }
  applyConfiguredPermissionProfile(profile) {
    const assignmentTypeIds = this.configuredPermissionProfiles[profile];
    if (assignmentTypeIds.length === 0) {
      this.notify.warning(`Primero configura el perfil ${this.getPermissionProfileLabel(profile)}.`, "Perfil sin configurar");
      return;
    }
    const enabledIds = new Set(assignmentTypeIds);
    this.setEnabledAssignmentTypes(this.assignmentTypes.filter((assignmentType) => enabledIds.has(assignmentType.id)));
  }
  saveConfiguredPermissionProfile(profile) {
    const enabledAssignmentTypeIds = this.assignmentTypes.filter((assignmentType) => this.isPermissionEnabled(assignmentType)).map((assignmentType) => assignmentType.id);
    if (enabledAssignmentTypeIds.length === 0) {
      this.notify.warning("Activa al menos un permiso antes de guardar el perfil.", "Perfil vac\xEDo");
      return;
    }
    this.configuredPermissionProfiles = __spreadProps(__spreadValues({}, this.configuredPermissionProfiles), {
      [profile]: enabledAssignmentTypeIds
    });
    localStorage.setItem(this.permissionProfilesStorageKey, JSON.stringify(this.configuredPermissionProfiles));
    this.notify.success(`Perfil ${this.getPermissionProfileLabel(profile)} guardado en este dispositivo.`, "Perfil guardado");
  }
  isPermissionProfileConfigured(profile) {
    return this.configuredPermissionProfiles[profile].length > 0;
  }
  loadCurrentCongregation() {
    this.dataService.getCongregation$().subscribe((data) => {
      if (!data?.id) {
        return;
      }
      this.congregationSelected = data;
      const currentCongregationId = this.formulario?.get("congregationId")?.value;
      if (this.currentPublisher?.id || currentCongregationId) {
        return;
      }
      this.formulario?.patchValue({
        congregation: data,
        congregationId: data.id
      });
    });
  }
  loadAdminState() {
    this.dataService.getIsAdmin().subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });
  }
  loadAssignmentTypes() {
    this.isLoadingAssignmentTypes = true;
    this.assignmentTypesLoadFailed = false;
    this.assignmentTypesService.getAll().pipe(finalize(() => this.isLoadingAssignmentTypes = false)).subscribe({
      next: (assignmentTypes) => {
        this.assignmentTypes = assignmentTypes;
        this.syncAssignmentTypePermissions();
      },
      error: (error) => {
        this.assignmentTypesLoadFailed = true;
        this.notify.error(this.getErrorMessage(error, "No se pudieron cargar los tipos de asignaci\xF3n."), "Error");
      }
    });
  }
  loadPublisherForEdit() {
    if (this.dialogData?.publisherId) {
      this.userId = this.dialogData.publisherId;
      this.loadPublisherById(this.dialogData.publisherId);
      return;
    }
    const routeUserId = Number(this.routes.snapshot.paramMap.get("id"));
    if (!routeUserId) {
      return;
    }
    this.userId = routeUserId;
    this.loadPublisherById(routeUserId);
  }
  loadPublisherById(userId) {
    this.usersService.getById(userId).subscribe({
      next: (publisher) => this.makeFormWithData(publisher),
      error: (error) => this.notify.error(this.getErrorMessage(error, "No se pudo cargar el publicador."), "Error")
    });
  }
  syncAssignmentTypePermissions() {
    if (!this.formulario || this.assignmentTypes.length === 0) {
      return;
    }
    const currentPermissions = this.permissions.length > 0 ? this.permissions : this.currentPublisher?.assignmentTypePermissions;
    const control = this.formulario.get("assignmentTypePermissions");
    control?.setValue(this.buildAssignmentTypePermissions(currentPermissions));
    control?.updateValueAndValidity();
  }
  buildAssignmentTypePermissions(existingPermissions = []) {
    const existingByAssignmentTypeId = new Map(existingPermissions.map((permission) => [permission.assignmentTypeId, permission]));
    return this.assignmentTypes.reduce((permissions, assignmentType) => {
      const existingPermission = existingByAssignmentTypeId.get(assignmentType.id);
      if (!existingPermission?.enabled) {
        return permissions;
      }
      const userId = existingPermission?.userId ?? this.userId ?? this.currentPublisher?.id ?? null;
      permissions.push({
        userId,
        assignmentTypeId: assignmentType.id,
        assignmentTypeDescription: assignmentType.description,
        assignmentTypeNumber: assignmentType.number,
        enabled: true
      });
      return permissions;
    }, []);
  }
  getAssignmentTypePermissions(userId) {
    const resolvedUserId = userId ?? this.userId ?? this.currentPublisher?.id ?? null;
    return this.permissions.map((permission) => __spreadProps(__spreadValues({}, permission), {
      userId: resolvedUserId,
      enabled: true
    }));
  }
  getAssignmentTypePermissionsForBulk(userId) {
    const enabledAssignmentTypeIds = new Set(this.getAssignmentTypePermissions(userId).map((permission) => permission.assignmentTypeId));
    const resolvedUserId = userId ?? this.userId ?? this.currentPublisher?.id ?? null;
    return this.assignmentTypes.map((assignmentType) => ({
      userId: resolvedUserId,
      assignmentTypeId: assignmentType.id,
      assignmentTypeDescription: assignmentType.description,
      assignmentTypeNumber: assignmentType.number,
      enabled: enabledAssignmentTypeIds.has(assignmentType.id)
    }));
  }
  upsertEnabledAssignmentTypePermission(assignmentType) {
    const existingPermission = this.permissions.find((permission) => permission.assignmentTypeId === assignmentType.id);
    const enabledPermission = {
      userId: existingPermission?.userId ?? this.userId ?? this.currentPublisher?.id ?? null,
      assignmentTypeId: assignmentType.id,
      assignmentTypeDescription: assignmentType.description,
      assignmentTypeNumber: assignmentType.number,
      enabled: true
    };
    if (existingPermission) {
      return this.permissions.map((permission) => permission.assignmentTypeId === assignmentType.id ? enabledPermission : permission);
    }
    return [...this.permissions, enabledPermission].sort((a, b) => (a.assignmentTypeNumber ?? 0) - (b.assignmentTypeNumber ?? 0));
  }
  setEnabledAssignmentTypes(assignmentTypes) {
    const permissions = assignmentTypes.map((assignmentType) => this.toEnabledPermission(assignmentType));
    const control = this.formulario.get("assignmentTypePermissions");
    control?.setValue(permissions);
    control?.markAsDirty();
    control?.updateValueAndValidity();
  }
  toEnabledPermission(assignmentType) {
    return {
      userId: this.userId ?? this.currentPublisher?.id ?? null,
      assignmentTypeId: assignmentType.id,
      assignmentTypeDescription: assignmentType.description,
      assignmentTypeNumber: assignmentType.number,
      enabled: true
    };
  }
  isStudentAssignment(assignmentType) {
    const type = this.normalizeCatalogValue(assignmentType.type);
    return type === "estudiante" || type === "ayudante";
  }
  isBibleReadingAssignment(assignmentType) {
    return assignmentType.number === 3 && this.normalizeCatalogValue(assignmentType.type) === "encargado" && this.normalizeCatalogValue(assignmentType.sectionMeetingTitle) === "tesoros de la biblia";
  }
  isStudentTalkAssignment(assignmentType) {
    return this.normalizeCatalogValue(assignmentType.description) === "discurso" && this.normalizeCatalogValue(assignmentType.type) === "estudiante" && this.normalizeCatalogValue(assignmentType.sectionMeetingTitle) === "seamos mejores maestros";
  }
  normalizeCatalogValue(value) {
    return (value ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase();
  }
  getPermissionProfileLabel(profile) {
    return profile === "elder" ? "Anciano" : "Siervo ministerial";
  }
  readPermissionProfiles() {
    const emptyProfiles = { elder: [], ministerialServant: [] };
    const storedValue = localStorage.getItem(this.permissionProfilesStorageKey);
    if (!storedValue) {
      return emptyProfiles;
    }
    try {
      const storedProfiles = JSON.parse(storedValue);
      return {
        elder: this.normalizeStoredAssignmentTypeIds(storedProfiles.elder),
        ministerialServant: this.normalizeStoredAssignmentTypeIds(storedProfiles.ministerialServant)
      };
    } catch {
      localStorage.removeItem(this.permissionProfilesStorageKey);
      return emptyProfiles;
    }
  }
  normalizeStoredAssignmentTypeIds(value) {
    if (!Array.isArray(value)) {
      return [];
    }
    return [...new Set(value.filter((item) => typeof item === "number" && Number.isInteger(item) && item > 0))];
  }
  assignmentTypePermissionsValidator(control) {
    const permissions = control.value;
    if (!Array.isArray(permissions)) {
      return { assignmentTypePermissions: true };
    }
    const hasInvalidPermission = permissions.some((permission) => !permission.assignmentTypeId || !permission.assignmentTypeDescription || typeof permission.enabled !== "boolean");
    return hasInvalidPermission ? { assignmentTypePermissions: true } : null;
  }
  buildPublisherPayload() {
    const values = this.formulario.getRawValue();
    const congregationId = values.congregationId ?? this.currentPublisher?.congregationId ?? this.currentPublisher?.myCongregationId ?? values.congregation?.id ?? this.congregationSelected?.id;
    const congregation = values.congregation ?? this.currentPublisher?.congregation ?? this.allCongregations.find((item) => item.id === congregationId) ?? (this.congregationSelected?.id === congregationId ? this.congregationSelected : void 0);
    return __spreadProps(__spreadValues(__spreadValues({}, this.currentPublisher), values), {
      fullName: this.buildFullName(values),
      congregation,
      congregationId,
      myCongregationId: congregationId,
      designations: this.currentPublisher?.designations ?? [],
      assignmentTypePermissions: this.getAssignmentTypePermissions(values.id)
    });
  }
  resolveCongregationId(publisher) {
    return publisher?.congregation?.id ?? publisher?.congregationId ?? publisher?.myCongregationId ?? this.congregationSelected?.id ?? null;
  }
  buildFullName(values) {
    const nameParts = [values.firstName, values.secondName, values.surname, values.lastName].filter(Boolean);
    const generatedFullName = nameParts.join(" ").trim();
    const currentFullName = values.fullName ?? this.currentPublisher?.fullName ?? "";
    const hasIncompleteNameParts = !values.surname && !values.lastName;
    if (this.currentPublisher?.id && hasIncompleteNameParts && this.wordCount(currentFullName) > this.wordCount(generatedFullName)) {
      return currentFullName;
    }
    return generatedFullName || currentFullName;
  }
  wordCount(value) {
    return value.trim().split(/\s+/).filter(Boolean).length;
  }
  getFormValidationMessage() {
    const messages = [];
    if (this.hasControlError("firstName", "required")) {
      messages.push("El primer nombre es requerido");
    }
    if (this.hasControlError("documentType", "required")) {
      messages.push("El tipo de documento es requerido");
    }
    if (this.hasControlError("gender", "required")) {
      messages.push("El g\xE9nero es requerido");
    }
    if (this.hasControlError("congregationId", "required")) {
      messages.push("La congregaci\xF3n es requerida");
    }
    if (this.hasControlError("email", "email")) {
      messages.push("El correo electr\xF3nico no tiene un formato v\xE1lido");
    }
    if (this.formulario.get("assignmentTypePermissions")?.invalid) {
      messages.push("Los permisos de asignaci\xF3n no est\xE1n completos");
    }
    return messages.join(". ");
  }
  hasControlError(controlName, errorName) {
    return Boolean(this.formulario.get(controlName)?.hasError(errorName));
  }
  getErrorMessage(error, fallback) {
    if (typeof error === "string") {
      return error;
    }
    const fieldErrors = error?.errors;
    if (Array.isArray(fieldErrors) && fieldErrors.length > 0) {
      return fieldErrors.map((item) => item.message).join(". ");
    }
    return error?.message ?? error?.error?.message ?? fallback;
  }
  static {
    this.\u0275fac = function UsersCreateOrUpdateComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _UsersCreateOrUpdateComponent)(\u0275\u0275directiveInject(DateAdapter), \u0275\u0275directiveInject(MAT_DATE_LOCALE), \u0275\u0275directiveInject(DataService), \u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(UsersService), \u0275\u0275directiveInject(CongregationsService), \u0275\u0275directiveInject(AssignmentTypesService), \u0275\u0275directiveInject(UserAssignmentTypesService), \u0275\u0275directiveInject(NotificationService), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(MAT_DIALOG_DATA, 8), \u0275\u0275directiveInject(MatDialogRef, 8));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UsersCreateOrUpdateComponent, selectors: [["users-create-or-update"]], decls: 29, vars: 11, consts: [["picker", ""], [1, "page-container"], [1, "dialog-header"], [1, "section-card"], [1, "section-title"], [1, "form-grid"], ["appearance", "outline"], [1, "form-grid", 3, "formGroup"], [1, "state-row"], [1, "state-row", "state-row--error"], [1, "actions"], ["mat-icon-button", "", "type", "button", "aria-label", "Cerrar", 3, "click"], ["matInput", "", "disabled", "", "required", "", 3, "value"], ["required", "", 3, "selectionChange", "valueChange", "value"], [3, "value"], ["formControlName", "documentType"], ["value", "CC"], ["value", "CE"], ["value", "TI"], ["value", "PP"], ["value", "PPT"], ["value", "DNI"], ["matInput", "", "formControlName", "documentNumber"], ["matInput", "", "formControlName", "firstName"], ["matInput", "", "formControlName", "secondName"], ["matInput", "", "formControlName", "surname"], ["matInput", "", "formControlName", "lastName"], ["matInput", "", "formControlName", "cellPhone"], ["matInput", "", "formControlName", "email"], ["formControlName", "gender"], ["value", "Masculino"], ["value", "Femenino"], ["matInput", "", "formControlName", "birthdate", 3, "matDatepicker"], ["matIconSuffix", "", 3, "for"], ["touchUi", ""], ["mode", "indeterminate", "diameter", "28"], ["aria-label", "Acciones r\xE1pidas de permisos", 1, "permission-actions"], [1, "permission-actions__group"], [1, "permission-actions__label"], ["mat-stroked-button", "", "type", "button", 3, "click"], [1, "permission-actions__group", "permission-actions__group--configurable"], [1, "permission-profile-action"], ["mat-icon-button", "", "type", "button", "aria-label", "Guardar selecci\xF3n como perfil Anciano", "matTooltip", "Guardar la selecci\xF3n actual como perfil Anciano", 3, "click"], ["mat-icon-button", "", "type", "button", "aria-label", "Guardar selecci\xF3n como perfil Siervo ministerial", "matTooltip", "Guardar la selecci\xF3n actual como perfil Siervo ministerial", 3, "click"], [1, "permission-actions__hint"], [1, "permission-grid"], [1, "permission-item"], [1, "permission-copy"], [1, "permission-number"], [1, "permission-name"], [1, "permission-type", 3, "ngClass"], ["color", "primary", 3, "change", "checked"], ["mat-raised-button", "", "color", "primary", 3, "click", "disabled"]], template: function UsersCreateOrUpdateComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 1);
        \u0275\u0275template(1, UsersCreateOrUpdateComponent_Conditional_1_Template, 6, 0, "div", 2);
        \u0275\u0275elementStart(2, "mat-card", 3)(3, "div", 4)(4, "mat-icon");
        \u0275\u0275text(5, "groups");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "span");
        \u0275\u0275text(7, "Congregaci\xF3n");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(8, "div", 5);
        \u0275\u0275template(9, UsersCreateOrUpdateComponent_Conditional_9_Template, 4, 1, "mat-form-field", 6)(10, UsersCreateOrUpdateComponent_Conditional_10_Template, 6, 1, "mat-form-field", 6);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(11, "mat-card", 3)(12, "div", 4)(13, "mat-icon");
        \u0275\u0275text(14, "person_add");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(15, "span");
        \u0275\u0275text(16, "Registro de Publicador");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(17, UsersCreateOrUpdateComponent_Conditional_17_Template, 64, 7, "form", 7);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "mat-card", 3)(19, "div", 4)(20, "mat-icon");
        \u0275\u0275text(21, "assignment_ind");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(22, "span");
        \u0275\u0275text(23, "Tipos de asignaci\xF3n");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(24, UsersCreateOrUpdateComponent_Conditional_24_Template, 4, 0, "div", 8)(25, UsersCreateOrUpdateComponent_Conditional_25_Template, 5, 0, "div", 9)(26, UsersCreateOrUpdateComponent_Conditional_26_Template, 5, 0, "div", 8)(27, UsersCreateOrUpdateComponent_Conditional_27_Template, 47, 2);
        \u0275\u0275elementEnd();
        \u0275\u0275template(28, UsersCreateOrUpdateComponent_Conditional_28_Template, 5, 2, "div", 10);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275classProp("page-container--dialog", ctx.isDialog);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.isDialog ? 1 : -1);
        \u0275\u0275advance(8);
        \u0275\u0275conditional(!ctx.isAdmin && ctx.congregationSelected ? 9 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.isAdmin && ctx.congregationSelected ? 10 : -1);
        \u0275\u0275advance(7);
        \u0275\u0275conditional(ctx.formulario ? 17 : -1);
        \u0275\u0275advance(7);
        \u0275\u0275conditional(ctx.isLoadingAssignmentTypes ? 24 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(!ctx.isLoadingAssignmentTypes && ctx.assignmentTypesLoadFailed ? 25 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(!ctx.isLoadingAssignmentTypes && !ctx.assignmentTypesLoadFailed && ctx.assignmentTypes.length === 0 ? 26 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(!ctx.isLoadingAssignmentTypes && !ctx.assignmentTypesLoadFailed && ctx.assignmentTypes.length > 0 ? 27 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.formulario ? 28 : -1);
      }
    }, dependencies: [SharedModule, MatIcon, MatButton, MatIconButton, MatProgressSpinner, MatOption, MatCard, MatDatepicker, MatDatepickerInput, MatDatepickerToggle, MatInput, MatFormField, MatLabel, MatError, MatSuffix, MatSelect, MatSlideToggle, MatTooltip, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormsModule, ReactiveFormsModule, FormGroupDirective, FormControlName, CommonModule, NgClass], styles: ["\n\n.example-form[_ngcontent-%COMP%] {\n  min-width: 150px;\n  max-width: 500px;\n  width: 100%;\n}\n.example-full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.page-container[_ngcontent-%COMP%] {\n  padding: 40px;\n  background: #f5f7fb;\n  min-height: 100vh;\n}\n.page-container--dialog[_ngcontent-%COMP%] {\n  min-height: auto;\n  max-height: 92vh;\n  overflow: auto;\n  padding: 24px;\n}\n.dialog-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n  margin-bottom: 18px;\n}\n.dialog-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #111827;\n  font-size: 22px;\n  font-weight: 600;\n}\n.section-card[_ngcontent-%COMP%] {\n  margin-bottom: 30px;\n  padding: 30px;\n  border-radius: 8px;\n  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);\n}\n.section-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-size: 20px;\n  font-weight: 600;\n  margin-bottom: 20px;\n  color: #1a237e;\n}\n.form-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 20px;\n}\n.state-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  min-height: 40px;\n  color: #374151;\n}\n.state-row--error[_ngcontent-%COMP%] {\n  color: #b91c1c;\n}\n.permission-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));\n  gap: 12px;\n}\n.permission-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 16px;\n  margin-bottom: 8px;\n}\n.permission-actions__group[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 8px;\n  padding: 12px;\n  border: 1px solid #d6dbe6;\n  border-radius: 10px;\n  background: #f8fafc;\n}\n.permission-actions__group--configurable[_ngcontent-%COMP%] {\n  flex: 1 1 420px;\n}\n.permission-actions__label[_ngcontent-%COMP%] {\n  flex-basis: 100%;\n  color: #475569;\n  font-size: 12px;\n  font-weight: 700;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n}\n.permission-profile-action[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 2px;\n}\n.permission-profile-action[_ngcontent-%COMP%]   button[mat-icon-button][_ngcontent-%COMP%] {\n  flex: 0 0 40px;\n  height: 40px;\n  padding: 0;\n  width: 40px;\n}\n.permission-actions__hint[_ngcontent-%COMP%] {\n  margin: 0 0 16px;\n  color: #64748b;\n  font-size: 13px;\n}\n.permission-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n  min-height: 56px;\n  padding: 10px 12px;\n  border: 1px solid #d6dbe6;\n  border-radius: 8px;\n  background: #ffffff;\n}\n.permission-copy[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  min-width: 0;\n}\n.permission-number[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 28px;\n  height: 28px;\n  border-radius: 50%;\n  background: #eef2ff;\n  color: #1a237e;\n  font-weight: 600;\n  font-size: 13px;\n}\n.permission-name[_ngcontent-%COMP%] {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  color: #111827;\n}\n.actions[_ngcontent-%COMP%] {\n  margin-top: 30px;\n  display: flex;\n  justify-content: flex-end;\n}\nbutton[_ngcontent-%COMP%] {\n  padding: 10px 25px;\n  font-size: 15px;\n  border-radius: 8px;\n}\n.permission-type[_ngcontent-%COMP%] {\n  color: #6b7280;\n  font-size: 13px;\n}\n.type-ayudante[_ngcontent-%COMP%] {\n  color: red;\n}\n.type-encargado[_ngcontent-%COMP%] {\n  color: blue;\n}\n@media (max-width: 575.98px) {\n  .page-container[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .section-card[_ngcontent-%COMP%] {\n    padding: 18px;\n  }\n  .permission-actions__group[_ngcontent-%COMP%], \n   .permission-profile-action[_ngcontent-%COMP%], \n   .permission-actions__group[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:not([mat-icon-button]) {\n    width: 100%;\n  }\n  .permission-profile-action[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:not([mat-icon-button]) {\n    flex: 1;\n  }\n  .permission-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=users-create-or-update.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UsersCreateOrUpdateComponent, [{
    type: Component,
    args: [{ selector: "users-create-or-update", imports: [SharedModule, FormsModule, ReactiveFormsModule, CommonModule], template: `<div class="page-container" [class.page-container--dialog]="isDialog">
  @if (isDialog) {
  <div class="dialog-header">
    <h2>Editar publicador</h2>
    <button mat-icon-button type="button" aria-label="Cerrar" (click)="closeDialog()">
      <mat-icon>close</mat-icon>
    </button>
  </div>
  }

  <mat-card class="section-card">
    <div class="section-title">
      <mat-icon>groups</mat-icon>
      <span>Congregaci\xF3n</span>
    </div>

    <div class="form-grid">
      @if (!isAdmin && congregationSelected) {
      <mat-form-field appearance="outline">
        <mat-label>Congregaci\xF3n</mat-label>
        <input matInput [value]="congregationSelected.name" disabled required>
      </mat-form-field>
      }

      @if (isAdmin && congregationSelected) {
      <mat-form-field appearance="outline">
        <mat-label>Congregaci\xF3n</mat-label>
        <mat-select (selectionChange)="onChange()" [(value)]="congregationSelected" required>
          @for (item of allCongregations; track item.id) {
          <mat-option [value]="item">
            {{ item.name }}
          </mat-option>
          }
        </mat-select>
      </mat-form-field>
      }
    </div>
  </mat-card>

  <mat-card class="section-card">
    <div class="section-title">
      <mat-icon>person_add</mat-icon>
      <span>Registro de Publicador</span>
    </div>

    @if (formulario) {
    <form [formGroup]="formulario" class="form-grid">
      <mat-form-field appearance="outline">
        <mat-label>Tipo de Documento</mat-label>
        <mat-select formControlName="documentType">
          <mat-option value="CC">C\xE9dula Ciudadan\xEDa</mat-option>
          <mat-option value="CE">C\xE9dula Extranjer\xEDa</mat-option>
          <mat-option value="TI">Tarjeta I</mat-option>
          <mat-option value="PP">Pasaporte</mat-option>
          <mat-option value="PPT">Permiso Temporal</mat-option>
          <mat-option value="DNI">DNI</mat-option>
        </mat-select>
        @if (formulario.get("documentType")?.hasError("required")) {
        <mat-error>Requerido</mat-error>
        }
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>N\xFAmero documento</mat-label>
        <input matInput formControlName="documentNumber"/>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Primer Nombre</mat-label>
        <input matInput formControlName="firstName"/>
        @if (formulario.get("firstName")?.hasError("required")) {
        <mat-error>Requerido</mat-error>
        }
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Segundo Nombre</mat-label>
        <input matInput formControlName="secondName"/>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Primer Apellido</mat-label>
        <input matInput formControlName="surname"/>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Segundo Apellido</mat-label>
        <input matInput formControlName="lastName"/>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Tel\xE9fono</mat-label>
        <input matInput formControlName="cellPhone"/>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Correo electr\xF3nico</mat-label>
        <input matInput formControlName="email"/>
        @if (formulario.get("email")?.hasError("email")) {
        <mat-error>Correo inv\xE1lido</mat-error>
        }
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>G\xE9nero</mat-label>
        <mat-select formControlName="gender">
          <mat-option value="Masculino">Masculino</mat-option>
          <mat-option value="Femenino">Femenino</mat-option>
        </mat-select>
        @if (formulario.get("gender")?.hasError("required")) {
        <mat-error>Requerido</mat-error>
        }
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Fecha de nacimiento</mat-label>
        <input matInput [matDatepicker]="picker" formControlName="birthdate">
        <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker touchUi #picker></mat-datepicker>
      </mat-form-field>
    </form>
    }
  </mat-card>

  <mat-card class="section-card">
    <div class="section-title">
      <mat-icon>assignment_ind</mat-icon>
      <span>Tipos de asignaci\xF3n</span>
    </div>

    @if (isLoadingAssignmentTypes) {
    <div class="state-row">
      <mat-progress-spinner mode="indeterminate" diameter="28"></mat-progress-spinner>
      <span>Cargando tipos de asignaci\xF3n</span>
    </div>
    }

    @if (!isLoadingAssignmentTypes && assignmentTypesLoadFailed) {
    <div class="state-row state-row--error">
      <mat-icon>error</mat-icon>
      <span>No se pudieron cargar los tipos de asignaci\xF3n</span>
    </div>
    }

    @if (!isLoadingAssignmentTypes && !assignmentTypesLoadFailed && assignmentTypes.length === 0) {
    <div class="state-row">
      <mat-icon>info</mat-icon>
      <span>Sin tipos de asignaci\xF3n</span>
    </div>
    }

    @if (!isLoadingAssignmentTypes && !assignmentTypesLoadFailed && assignmentTypes.length > 0) {
    <div class="permission-actions" aria-label="Acciones r\xE1pidas de permisos">
      <div class="permission-actions__group">
        <span class="permission-actions__label">Selecci\xF3n</span>
        <button mat-stroked-button type="button" (click)="setAllPermissions(true)">
          <mat-icon>done_all</mat-icon>
          Activar todas
        </button>
        <button mat-stroked-button type="button" (click)="setAllPermissions(false)">
          <mat-icon>remove_done</mat-icon>
          Desactivar todas
        </button>
      </div>

      <div class="permission-actions__group">
        <span class="permission-actions__label">Perfiles</span>
        <button mat-stroked-button type="button" (click)="applyBrotherPermissions()">
          <mat-icon>man</mat-icon>
          Hermano
        </button>
        <button mat-stroked-button type="button" (click)="applySisterPermissions()">
          <mat-icon>woman</mat-icon>
          Hermana
        </button>
      </div>

      <div class="permission-actions__group permission-actions__group--configurable">
        <span class="permission-actions__label">Perfiles configurables</span>
        <div class="permission-profile-action">
          <button mat-stroked-button type="button" (click)="applyConfiguredPermissionProfile('elder')">
            <mat-icon>{{ isPermissionProfileConfigured('elder') ? 'verified' : 'person' }}</mat-icon>
            Anciano
          </button>
          <button
            mat-icon-button
            type="button"
            aria-label="Guardar selecci\xF3n como perfil Anciano"
            matTooltip="Guardar la selecci\xF3n actual como perfil Anciano"
            (click)="saveConfiguredPermissionProfile('elder')"
          >
            <mat-icon>save</mat-icon>
          </button>
        </div>

        <div class="permission-profile-action">
          <button mat-stroked-button type="button" (click)="applyConfiguredPermissionProfile('ministerialServant')">
            <mat-icon>{{ isPermissionProfileConfigured('ministerialServant') ? 'verified' : 'person' }}</mat-icon>
            Siervo ministerial
          </button>
          <button
            mat-icon-button
            type="button"
            aria-label="Guardar selecci\xF3n como perfil Siervo ministerial"
            matTooltip="Guardar la selecci\xF3n actual como perfil Siervo ministerial"
            (click)="saveConfiguredPermissionProfile('ministerialServant')"
          >
            <mat-icon>save</mat-icon>
          </button>
        </div>
      </div>
    </div>

    <p class="permission-actions__hint">
      Para configurar Anciano o Siervo ministerial, marca los permisos deseados y pulsa el icono de guardar junto al perfil.
    </p>

    <div class="permission-grid">
      @for (assignmentType of assignmentTypes; track assignmentType.id) {
      <div class="permission-item">
        <div class="permission-copy">
          <span class="permission-number">{{ assignmentType.number }}</span>
          <span class="permission-name">{{ assignmentType.description }} </span> <span
  class="permission-type"
  [ngClass]="{
    'type-ayudante': assignmentType.type === 'Ayudante', 
    'type-encargado': assignmentType.type === 'Encargado' || assignmentType.type === 'Estudiante'
  }"
>
  ({{ assignmentType.type }})
</span>
        </div>

        <mat-slide-toggle
          color="primary"
          [checked]="isPermissionEnabled(assignmentType)"
          (change)="onPermissionChange(assignmentType, $event.checked)"
        ></mat-slide-toggle>
      </div>
      }
    </div>
    }
  </mat-card>

  @if (formulario) {
  <div class="actions">
    <button mat-raised-button color="primary" [disabled]="disabledSave" (click)="save()">
      <mat-icon>save</mat-icon>
      {{ isSaving ? "Guardando" : "Guardar" }}
    </button>
  </div>
  }
</div>
`, styles: ["/* src/app/shared/components/users-create-or-update/users-create-or-update.component.scss */\n.example-form {\n  min-width: 150px;\n  max-width: 500px;\n  width: 100%;\n}\n.example-full-width {\n  width: 100%;\n}\n.page-container {\n  padding: 40px;\n  background: #f5f7fb;\n  min-height: 100vh;\n}\n.page-container--dialog {\n  min-height: auto;\n  max-height: 92vh;\n  overflow: auto;\n  padding: 24px;\n}\n.dialog-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n  margin-bottom: 18px;\n}\n.dialog-header h2 {\n  margin: 0;\n  color: #111827;\n  font-size: 22px;\n  font-weight: 600;\n}\n.section-card {\n  margin-bottom: 30px;\n  padding: 30px;\n  border-radius: 8px;\n  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);\n}\n.section-title {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-size: 20px;\n  font-weight: 600;\n  margin-bottom: 20px;\n  color: #1a237e;\n}\n.form-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 20px;\n}\n.state-row {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  min-height: 40px;\n  color: #374151;\n}\n.state-row--error {\n  color: #b91c1c;\n}\n.permission-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));\n  gap: 12px;\n}\n.permission-actions {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 16px;\n  margin-bottom: 8px;\n}\n.permission-actions__group {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 8px;\n  padding: 12px;\n  border: 1px solid #d6dbe6;\n  border-radius: 10px;\n  background: #f8fafc;\n}\n.permission-actions__group--configurable {\n  flex: 1 1 420px;\n}\n.permission-actions__label {\n  flex-basis: 100%;\n  color: #475569;\n  font-size: 12px;\n  font-weight: 700;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n}\n.permission-profile-action {\n  display: inline-flex;\n  align-items: center;\n  gap: 2px;\n}\n.permission-profile-action button[mat-icon-button] {\n  flex: 0 0 40px;\n  height: 40px;\n  padding: 0;\n  width: 40px;\n}\n.permission-actions__hint {\n  margin: 0 0 16px;\n  color: #64748b;\n  font-size: 13px;\n}\n.permission-item {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n  min-height: 56px;\n  padding: 10px 12px;\n  border: 1px solid #d6dbe6;\n  border-radius: 8px;\n  background: #ffffff;\n}\n.permission-copy {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  min-width: 0;\n}\n.permission-number {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 28px;\n  height: 28px;\n  border-radius: 50%;\n  background: #eef2ff;\n  color: #1a237e;\n  font-weight: 600;\n  font-size: 13px;\n}\n.permission-name {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  color: #111827;\n}\n.actions {\n  margin-top: 30px;\n  display: flex;\n  justify-content: flex-end;\n}\nbutton {\n  padding: 10px 25px;\n  font-size: 15px;\n  border-radius: 8px;\n}\n.permission-type {\n  color: #6b7280;\n  font-size: 13px;\n}\n.type-ayudante {\n  color: red;\n}\n.type-encargado {\n  color: blue;\n}\n@media (max-width: 575.98px) {\n  .page-container {\n    padding: 16px;\n  }\n  .section-card {\n    padding: 18px;\n  }\n  .permission-actions__group,\n  .permission-profile-action,\n  .permission-actions__group button:not([mat-icon-button]) {\n    width: 100%;\n  }\n  .permission-profile-action button:not([mat-icon-button]) {\n    flex: 1;\n  }\n  .permission-grid {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=users-create-or-update.component.css.map */\n"] }]
  }], () => [{ type: DateAdapter }, { type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DATE_LOCALE]
  }] }, { type: DataService }, { type: FormBuilder }, { type: UsersService }, { type: CongregationsService }, { type: AssignmentTypesService }, { type: UserAssignmentTypesService }, { type: NotificationService }, { type: ActivatedRoute }, { type: void 0, decorators: [{
    type: Optional
  }, {
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }, { type: MatDialogRef, decorators: [{
    type: Optional
  }] }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UsersCreateOrUpdateComponent, { className: "UsersCreateOrUpdateComponent", filePath: "src/app/shared/components/users-create-or-update/users-create-or-update.component.ts", lineNumber: 34 });
})();

export {
  CongregationsService,
  UsersCreateOrUpdateComponent
};
//# sourceMappingURL=chunk-5I7EVSHF.js.map
