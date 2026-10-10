import {
  CongregationMock,
  require_sweetalert2_all
} from "./chunk-7XONH5AH.js";
import {
  BaseIcon,
  Button,
  ButtonDirective,
  ButtonModule,
  Calendar,
  CalendarModule,
  ChevronDownIcon,
  ConnectedOverlayScrollHandler,
  DomHandler,
  FilterMatchMode,
  FilterOperator,
  FilterService,
  MatDialog,
  MatListItem,
  MatMenu,
  MatMenuItem,
  MatMenuTrigger,
  MatNavList,
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
  MatToolbar,
  MeetingsService,
  NgbModal,
  ObjectUtils,
  OverlayService,
  PrimeNGConfig,
  PrimeTemplate,
  Ripple,
  RippleModule,
  Router,
  RouterLink,
  RouterModule,
  RouterOutlet,
  SharedModule,
  SpinnerIcon,
  TimesIcon,
  TranslationKeys,
  UniqueComponentId,
  animate,
  animation,
  style,
  takeUntilDestroyed,
  transition,
  trigger,
  useAnimation,
  zindexutils
} from "./chunk-5TOJZSZF.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  CommonModule,
  Component,
  ContentChild,
  ContentChildren,
  DOCUMENT,
  DataService,
  DestroyRef,
  Directive,
  ElementRef,
  EventEmitter,
  FormsModule,
  HostListener,
  Inject,
  Injectable,
  Input,
  LoaderService,
  MatAnchor,
  MatButtonModule,
  MatIcon,
  MatIconButton,
  MatIconModule,
  MatProgressSpinner,
  MediaMatcher,
  NG_VALUE_ACCESSOR,
  NgClass,
  NgControlStatus,
  NgForOf,
  NgIf,
  NgModel,
  NgModule,
  NgStyle,
  NgSwitch,
  NgSwitchCase,
  NgTemplateOutlet,
  NgZone,
  Optional,
  Output,
  PLATFORM_ID,
  Renderer2,
  Subject,
  TemplateRef,
  UsersService,
  ViewChild,
  ViewEncapsulation,
  __async,
  __spreadProps,
  __spreadValues,
  __toESM,
  catchError,
  combineLatest,
  filter,
  forwardRef,
  inject,
  isPlatformBrowser,
  of,
  setClassMetadata,
  switchMap,
  tap,
  ɵsetClassDebugInfo,
  ɵɵInheritDefinitionFeature,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵinject,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵpureFunction3,
  ɵɵpureFunction4,
  ɵɵpureFunction5,
  ɵɵpureFunction6,
  ɵɵpureFunction7,
  ɵɵpureFunctionV,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵresolveDocument,
  ɵɵrestoreView,
  ɵɵstyleMap,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-MIOFCSIM.js";

// src/app/core/services/session/session-expiration.service.ts
var SessionExpirationService = class _SessionExpirationService {
  constructor(dataService, loaderService, ngbModal, ngZone, router) {
    this.dataService = dataService;
    this.loaderService = loaderService;
    this.ngbModal = ngbModal;
    this.ngZone = ngZone;
    this.router = router;
    this.isHandlingExpiredSession = false;
    this.monitoring = false;
    this.hadSession = false;
    this.checkSession = () => this.scheduleExpiration();
    this.onStorage = (event) => {
      if (event.key === "token" || event.key === null) {
        this.scheduleExpiration();
      }
    };
  }
  startMonitoring() {
    if (!this.monitoring) {
      this.monitoring = true;
      window.addEventListener("focus", this.checkSession);
      window.addEventListener("pageshow", this.checkSession);
      window.addEventListener("storage", this.onStorage);
      document.addEventListener("visibilitychange", this.checkSession);
    }
    this.scheduleExpiration();
  }
  scheduleExpiration() {
    clearTimeout(this.expirationTimer);
    const token = this.dataService.getAccessToken();
    if (!token) {
      if (this.hadSession) {
        this.notifyExpiredSession();
      }
      return;
    }
    this.hadSession = true;
    try {
      const expiresAt = this.dataService.jwtUtils.getTokenExpirationDate(token)?.getTime();
      if (!this.dataService.hasValidToken() || !expiresAt || expiresAt <= Date.now()) {
        this.notifyExpiredSession();
        return;
      }
      this.ngZone.runOutsideAngular(() => {
        this.expirationTimer = setTimeout(this.checkSession, Math.min(expiresAt - Date.now(), 2147483647));
      });
    } catch {
      this.notifyExpiredSession();
    }
  }
  ngOnDestroy() {
    clearTimeout(this.expirationTimer);
    window.removeEventListener("focus", this.checkSession);
    window.removeEventListener("pageshow", this.checkSession);
    window.removeEventListener("storage", this.onStorage);
    document.removeEventListener("visibilitychange", this.checkSession);
  }
  notifyExpiredSession() {
    if (this.isHandlingExpiredSession) {
      return;
    }
    this.isHandlingExpiredSession = true;
    clearTimeout(this.expirationTimer);
    this.hadSession = false;
    this.ngZone.run(() => {
      this.dataService.clearSession();
      this.loaderService.hideMatspinner();
      this.loaderService.setLoaderSearchPublisher(false);
      this.ngbModal.dismissAll("session-expired");
      void this.router.navigate(["/inicio"], {
        replaceUrl: true,
        queryParams: { sessionExpired: true }
      }).finally(() => {
        this.isHandlingExpiredSession = false;
      });
    });
  }
  static {
    this.\u0275fac = function SessionExpirationService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _SessionExpirationService)(\u0275\u0275inject(DataService), \u0275\u0275inject(LoaderService), \u0275\u0275inject(NgbModal), \u0275\u0275inject(NgZone), \u0275\u0275inject(Router));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _SessionExpirationService, factory: _SessionExpirationService.\u0275fac, providedIn: "root" });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SessionExpirationService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: DataService }, { type: LoaderService }, { type: NgbModal }, { type: NgZone }, { type: Router }], null);
})();

// src/app/core/guards/login.guard.ts
var LoginGuard = (route, state) => {
  const router = inject(Router);
  const dataService = inject(DataService);
  const sessionExpirationService = inject(SessionExpirationService);
  if (dataService.hasValidToken()) {
    return true;
  }
  if (dataService.getAccessToken()) {
    sessionExpirationService.notifyExpiredSession();
    return false;
  }
  return router.createUrlTree(["/inicio"], {
    queryParams: { returnUrl: state.url }
  });
};

// src/app/core/not-found/not-found.component.ts
var NotFoundComponent = class _NotFoundComponent {
  static {
    this.\u0275fac = function NotFoundComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NotFoundComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NotFoundComponent, selectors: [["vmc-not-found"]], decls: 17, vars: 0, consts: [[1, "not-found"], [1, "not-found__icon"], [1, "not-found__actions"], ["mat-flat-button", "", "color", "primary", "routerLink", "/tablero/entre-semana"], ["mat-button", "", "routerLink", "/inicio"]], template: function NotFoundComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "section", 0)(1, "div", 1)(2, "mat-icon");
        \u0275\u0275text(3, "travel_explore");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(4, "h1");
        \u0275\u0275text(5, "Direccion no encontrada");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "p");
        \u0275\u0275text(7, "La pagina que intentas abrir no existe o la direccion esta escrita de forma incorrecta.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "div", 2)(9, "a", 3)(10, "mat-icon");
        \u0275\u0275text(11, "event");
        \u0275\u0275elementEnd();
        \u0275\u0275text(12, " Ir al programa ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "a", 4)(14, "mat-icon");
        \u0275\u0275text(15, "login");
        \u0275\u0275elementEnd();
        \u0275\u0275text(16, " Inicio ");
        \u0275\u0275elementEnd()()();
      }
    }, dependencies: [CommonModule, RouterModule, RouterLink, MatButtonModule, MatAnchor, MatIconModule, MatIcon], styles: ["\n\n.not-found[_ngcontent-%COMP%] {\n  display: grid;\n  min-height: min(560px, 100vh - 96px);\n  place-items: center;\n  align-content: center;\n  gap: 14px;\n  padding: 32px 18px;\n  text-align: center;\n  color: #172033;\n}\n.not-found__icon[_ngcontent-%COMP%] {\n  display: grid;\n  width: 64px;\n  height: 64px;\n  place-items: center;\n  border-radius: 14px;\n  color: #0f4c81;\n  background: #e6f0fa;\n}\n.not-found__icon[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  font-size: 32px;\n}\nh1[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: clamp(1.6rem, 3vw, 2.2rem);\n  font-weight: 750;\n}\np[_ngcontent-%COMP%] {\n  max-width: 520px;\n  margin: 0;\n  color: #64748b;\n  font-size: 1rem;\n}\n.not-found__actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  gap: 10px;\n  margin-top: 8px;\n}\n/*# sourceMappingURL=not-found.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NotFoundComponent, [{
    type: Component,
    args: [{ selector: "vmc-not-found", standalone: true, imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule], template: '<section class="not-found">\n  <div class="not-found__icon">\n    <mat-icon>travel_explore</mat-icon>\n  </div>\n\n  <h1>Direccion no encontrada</h1>\n  <p>La pagina que intentas abrir no existe o la direccion esta escrita de forma incorrecta.</p>\n\n  <div class="not-found__actions">\n    <a mat-flat-button color="primary" routerLink="/tablero/entre-semana">\n      <mat-icon>event</mat-icon>\n      Ir al programa\n    </a>\n    <a mat-button routerLink="/inicio">\n      <mat-icon>login</mat-icon>\n      Inicio\n    </a>\n  </div>\n</section>\n', styles: ["/* src/app/core/not-found/not-found.component.scss */\n.not-found {\n  display: grid;\n  min-height: min(560px, 100vh - 96px);\n  place-items: center;\n  align-content: center;\n  gap: 14px;\n  padding: 32px 18px;\n  text-align: center;\n  color: #172033;\n}\n.not-found__icon {\n  display: grid;\n  width: 64px;\n  height: 64px;\n  place-items: center;\n  border-radius: 14px;\n  color: #0f4c81;\n  background: #e6f0fa;\n}\n.not-found__icon mat-icon {\n  width: 32px;\n  height: 32px;\n  font-size: 32px;\n}\nh1 {\n  margin: 0;\n  font-size: clamp(1.6rem, 3vw, 2.2rem);\n  font-weight: 750;\n}\np {\n  max-width: 520px;\n  margin: 0;\n  color: #64748b;\n  font-size: 1rem;\n}\n.not-found__actions {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  gap: 10px;\n  margin-top: 8px;\n}\n/*# sourceMappingURL=not-found.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NotFoundComponent, { className: "NotFoundComponent", filePath: "src/app/core/not-found/not-found.component.ts", lineNumber: 14 });
})();

// node_modules/primeng/fesm2020/primeng-autofocus.mjs
var AutoFocus = class {
  constructor(host) {
    this.host = host;
    this.focused = false;
  }
  ngAfterViewChecked() {
    if (!this.focused) {
      if (this.autofocus) {
        const focusableElements = DomHandler.getFocusableElements(this.host.nativeElement);
        if (focusableElements.length === 0) {
          this.host.nativeElement.focus();
        }
        if (focusableElements.length > 0) {
          focusableElements[0].focus();
        }
        this.focused = true;
      }
    }
  }
};
AutoFocus.\u0275fac = function AutoFocus_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || AutoFocus)(\u0275\u0275directiveInject(ElementRef));
};
AutoFocus.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
  type: AutoFocus,
  selectors: [["", "pAutoFocus", ""]],
  hostAttrs: [1, "p-element"],
  inputs: {
    autofocus: "autofocus"
  },
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AutoFocus, [{
    type: Directive,
    args: [{
      selector: "[pAutoFocus]",
      host: {
        class: "p-element"
      }
    }]
  }], function() {
    return [{
      type: ElementRef
    }];
  }, {
    autofocus: [{
      type: Input
    }]
  });
})();
var AutoFocusModule = class {
};
AutoFocusModule.\u0275fac = function AutoFocusModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || AutoFocusModule)();
};
AutoFocusModule.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: AutoFocusModule,
  declarations: [AutoFocus],
  imports: [CommonModule],
  exports: [AutoFocus]
});
AutoFocusModule.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
  imports: [CommonModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AutoFocusModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      exports: [AutoFocus],
      declarations: [AutoFocus]
    }]
  }], null, null);
})();

// node_modules/primeng/fesm2020/primeng-overlay.mjs
var _c0 = ["overlay"];
var _c1 = ["content"];
var _c2 = ["*"];
var _c3 = (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13) => ({
  "p-overlay p-component": true,
  "p-overlay-modal p-component-overlay p-component-overlay-enter": a0,
  "p-overlay-center": a1,
  "p-overlay-top": a2,
  "p-overlay-top-start": a3,
  "p-overlay-top-end": a4,
  "p-overlay-bottom": a5,
  "p-overlay-bottom-start": a6,
  "p-overlay-bottom-end": a7,
  "p-overlay-left": a8,
  "p-overlay-left-start": a9,
  "p-overlay-left-end": a10,
  "p-overlay-right": a11,
  "p-overlay-right-start": a12,
  "p-overlay-right-end": a13
});
var _c4 = (a0, a1, a2) => ({
  showTransitionParams: a0,
  hideTransitionParams: a1,
  transform: a2
});
var _c5 = (a0) => ({
  value: "visible",
  params: a0
});
var _c6 = (a0) => ({
  mode: a0
});
var _c7 = (a0) => ({
  $implicit: a0
});
function Overlay_div_0_div_2_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function Overlay_div_0_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 3, 1);
    \u0275\u0275listener("click", function Overlay_div_0_div_2_Template_div_click_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onOverlayContentClick($event));
    })("@overlayContentAnimation.start", function Overlay_div_0_div_2_Template_div_animation_overlayContentAnimation_start_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onOverlayContentAnimationStart($event));
    })("@overlayContentAnimation.done", function Overlay_div_0_div_2_Template_div_animation_overlayContentAnimation_done_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onOverlayContentAnimationDone($event));
    });
    \u0275\u0275projection(2);
    \u0275\u0275template(3, Overlay_div_0_div_2_ng_container_3_Template, 1, 0, "ng-container", 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(ctx_r1.contentStyleClass);
    \u0275\u0275property("ngStyle", ctx_r1.contentStyle)("ngClass", "p-overlay-content")("@overlayContentAnimation", \u0275\u0275pureFunction1(11, _c5, \u0275\u0275pureFunction3(7, _c4, ctx_r1.showTransitionOptions, ctx_r1.hideTransitionOptions, ctx_r1.transformOptions[ctx_r1.modal ? ctx_r1.overlayResponsiveDirection : "default"])));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngTemplateOutlet", ctx_r1.contentTemplate)("ngTemplateOutletContext", \u0275\u0275pureFunction1(15, _c7, \u0275\u0275pureFunction1(13, _c6, ctx_r1.overlayMode)));
  }
}
function Overlay_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 3, 0);
    \u0275\u0275listener("click", function Overlay_div_0_Template_div_click_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onOverlayClick($event));
    });
    \u0275\u0275template(2, Overlay_div_0_div_2_Template, 4, 17, "div", 2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r1.styleClass);
    \u0275\u0275property("ngStyle", ctx_r1.style)("ngClass", \u0275\u0275pureFunctionV(5, _c3, [ctx_r1.modal, ctx_r1.modal && ctx_r1.overlayResponsiveDirection === "center", ctx_r1.modal && ctx_r1.overlayResponsiveDirection === "top", ctx_r1.modal && ctx_r1.overlayResponsiveDirection === "top-start", ctx_r1.modal && ctx_r1.overlayResponsiveDirection === "top-end", ctx_r1.modal && ctx_r1.overlayResponsiveDirection === "bottom", ctx_r1.modal && ctx_r1.overlayResponsiveDirection === "bottom-start", ctx_r1.modal && ctx_r1.overlayResponsiveDirection === "bottom-end", ctx_r1.modal && ctx_r1.overlayResponsiveDirection === "left", ctx_r1.modal && ctx_r1.overlayResponsiveDirection === "left-start", ctx_r1.modal && ctx_r1.overlayResponsiveDirection === "left-end", ctx_r1.modal && ctx_r1.overlayResponsiveDirection === "right", ctx_r1.modal && ctx_r1.overlayResponsiveDirection === "right-start", ctx_r1.modal && ctx_r1.overlayResponsiveDirection === "right-end"]));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.visible);
  }
}
var OVERLAY_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => Overlay),
  multi: true
};
var showOverlayContentAnimation = animation([style({
  transform: "{{transform}}",
  opacity: 0
}), animate("{{showTransitionParams}}")]);
var hideOverlayContentAnimation = animation([animate("{{hideTransitionParams}}", style({
  transform: "{{transform}}",
  opacity: 0
}))]);
var Overlay = class {
  constructor(document2, platformId, el, renderer, config, overlayService, zone) {
    this.document = document2;
    this.platformId = platformId;
    this.el = el;
    this.renderer = renderer;
    this.config = config;
    this.overlayService = overlayService;
    this.zone = zone;
    this.visibleChange = new EventEmitter();
    this.onBeforeShow = new EventEmitter();
    this.onShow = new EventEmitter();
    this.onBeforeHide = new EventEmitter();
    this.onHide = new EventEmitter();
    this.onAnimationStart = new EventEmitter();
    this.onAnimationDone = new EventEmitter();
    this._visible = false;
    this.modalVisible = false;
    this.isOverlayClicked = false;
    this.isOverlayContentClicked = false;
    this.transformOptions = {
      default: "scaleY(0.8)",
      center: "scale(0.7)",
      top: "translate3d(0px, -100%, 0px)",
      "top-start": "translate3d(0px, -100%, 0px)",
      "top-end": "translate3d(0px, -100%, 0px)",
      bottom: "translate3d(0px, 100%, 0px)",
      "bottom-start": "translate3d(0px, 100%, 0px)",
      "bottom-end": "translate3d(0px, 100%, 0px)",
      left: "translate3d(-100%, 0px, 0px)",
      "left-start": "translate3d(-100%, 0px, 0px)",
      "left-end": "translate3d(-100%, 0px, 0px)",
      right: "translate3d(100%, 0px, 0px)",
      "right-start": "translate3d(100%, 0px, 0px)",
      "right-end": "translate3d(100%, 0px, 0px)"
    };
    this.window = this.document.defaultView;
  }
  get visible() {
    return this._visible;
  }
  set visible(value) {
    this._visible = value;
    if (this._visible && !this.modalVisible) {
      this.modalVisible = true;
    }
  }
  get mode() {
    return this._mode || this.overlayOptions?.mode;
  }
  set mode(value) {
    this._mode = value;
  }
  get style() {
    return ObjectUtils.merge(this._style, this.modal ? this.overlayResponsiveOptions?.style : this.overlayOptions?.style);
  }
  set style(value) {
    this._style = value;
  }
  get styleClass() {
    return ObjectUtils.merge(this._styleClass, this.modal ? this.overlayResponsiveOptions?.styleClass : this.overlayOptions?.styleClass);
  }
  set styleClass(value) {
    this._styleClass = value;
  }
  get contentStyle() {
    return ObjectUtils.merge(this._contentStyle, this.modal ? this.overlayResponsiveOptions?.contentStyle : this.overlayOptions?.contentStyle);
  }
  set contentStyle(value) {
    this._contentStyle = value;
  }
  get contentStyleClass() {
    return ObjectUtils.merge(this._contentStyleClass, this.modal ? this.overlayResponsiveOptions?.contentStyleClass : this.overlayOptions?.contentStyleClass);
  }
  set contentStyleClass(value) {
    this._contentStyleClass = value;
  }
  get target() {
    const value = this._target || this.overlayOptions?.target;
    return value === void 0 ? "@prev" : value;
  }
  set target(value) {
    this._target = value;
  }
  get appendTo() {
    return this._appendTo || this.overlayOptions?.appendTo;
  }
  set appendTo(value) {
    this._appendTo = value;
  }
  get autoZIndex() {
    const value = this._autoZIndex || this.overlayOptions?.autoZIndex;
    return value === void 0 ? true : value;
  }
  set autoZIndex(value) {
    this._autoZIndex = value;
  }
  get baseZIndex() {
    const value = this._baseZIndex || this.overlayOptions?.baseZIndex;
    return value === void 0 ? 0 : value;
  }
  set baseZIndex(value) {
    this._baseZIndex = value;
  }
  get showTransitionOptions() {
    const value = this._showTransitionOptions || this.overlayOptions?.showTransitionOptions;
    return value === void 0 ? ".12s cubic-bezier(0, 0, 0.2, 1)" : value;
  }
  set showTransitionOptions(value) {
    this._showTransitionOptions = value;
  }
  get hideTransitionOptions() {
    const value = this._hideTransitionOptions || this.overlayOptions?.hideTransitionOptions;
    return value === void 0 ? ".1s linear" : value;
  }
  set hideTransitionOptions(value) {
    this._hideTransitionOptions = value;
  }
  get listener() {
    return this._listener || this.overlayOptions?.listener;
  }
  set listener(value) {
    this._listener = value;
  }
  get responsive() {
    return this._responsive || this.overlayOptions?.responsive;
  }
  set responsive(val) {
    this._responsive = val;
  }
  get options() {
    return this._options;
  }
  set options(val) {
    this._options = val;
  }
  get modal() {
    if (isPlatformBrowser(this.platformId)) {
      return this.mode === "modal" || this.overlayResponsiveOptions && this.window?.matchMedia(this.overlayResponsiveOptions.media?.replace("@media", "") || `(max-width: ${this.overlayResponsiveOptions.breakpoint})`).matches;
    }
  }
  get overlayMode() {
    return this.mode || (this.modal ? "modal" : "overlay");
  }
  get overlayOptions() {
    return __spreadValues(__spreadValues({}, this.config?.overlayOptions), this.options);
  }
  get overlayResponsiveOptions() {
    return __spreadValues(__spreadValues({}, this.overlayOptions?.responsive), this.responsive);
  }
  get overlayResponsiveDirection() {
    return this.overlayResponsiveOptions?.direction || "center";
  }
  get overlayEl() {
    return this.overlayViewChild?.nativeElement;
  }
  get contentEl() {
    return this.contentViewChild?.nativeElement;
  }
  get targetEl() {
    return DomHandler.getTargetElement(this.target, this.el?.nativeElement);
  }
  ngAfterContentInit() {
    this.templates?.forEach((item) => {
      switch (item.getType()) {
        case "content":
          this.contentTemplate = item.template;
          break;
        // TODO: new template types may be added.
        default:
          this.contentTemplate = item.template;
          break;
      }
    });
  }
  show(overlay, isFocus = false) {
    this.onVisibleChange(true);
    this.handleEvents("onShow", {
      overlay: overlay || this.overlayEl,
      target: this.targetEl,
      mode: this.overlayMode
    });
    isFocus && DomHandler.focus(this.targetEl);
    this.modal && DomHandler.addClass(this.document?.body, "p-overflow-hidden");
  }
  hide(overlay, isFocus = false) {
    if (!this.visible) {
      return;
    } else {
      this.onVisibleChange(false);
      this.handleEvents("onHide", {
        overlay: overlay || this.overlayEl,
        target: this.targetEl,
        mode: this.overlayMode
      });
      isFocus && DomHandler.focus(this.targetEl);
      this.modal && DomHandler.removeClass(this.document?.body, "p-overflow-hidden");
    }
  }
  alignOverlay() {
    !this.modal && DomHandler.alignOverlay(this.overlayEl, this.targetEl, this.appendTo);
  }
  onVisibleChange(visible) {
    this._visible = visible;
    this.visibleChange.emit(visible);
  }
  onOverlayClick(event) {
    this.isOverlayClicked = true;
  }
  onOverlayContentClick(event) {
    this.overlayService.add({
      originalEvent: event,
      target: this.targetEl
    });
    this.isOverlayContentClicked = true;
  }
  onOverlayContentAnimationStart(event) {
    switch (event.toState) {
      case "visible":
        this.handleEvents("onBeforeShow", {
          overlay: this.overlayEl,
          target: this.targetEl,
          mode: this.overlayMode
        });
        if (this.autoZIndex) {
          zindexutils.set(this.overlayMode, this.overlayEl, this.baseZIndex + this.config?.zIndex[this.overlayMode]);
        }
        DomHandler.appendOverlay(this.overlayEl, this.appendTo === "body" ? this.document.body : this.appendTo, this.appendTo);
        this.alignOverlay();
        break;
      case "void":
        this.handleEvents("onBeforeHide", {
          overlay: this.overlayEl,
          target: this.targetEl,
          mode: this.overlayMode
        });
        this.modal && DomHandler.addClass(this.overlayEl, "p-component-overlay-leave");
        break;
    }
    this.handleEvents("onAnimationStart", event);
  }
  onOverlayContentAnimationDone(event) {
    const container = this.overlayEl || event.element.parentElement;
    switch (event.toState) {
      case "visible":
        this.show(container, true);
        this.bindListeners();
        break;
      case "void":
        this.hide(container, true);
        this.unbindListeners();
        DomHandler.appendOverlay(this.overlayEl, this.targetEl, this.appendTo);
        zindexutils.clear(container);
        this.modalVisible = false;
        break;
    }
    this.handleEvents("onAnimationDone", event);
  }
  handleEvents(name, params) {
    this[name].emit(params);
    this.options && this.options[name] && this.options[name](params);
    this.config?.overlayOptions && (this.config?.overlayOptions)[name] && (this.config?.overlayOptions)[name](params);
  }
  bindListeners() {
    this.bindScrollListener();
    this.bindDocumentClickListener();
    this.bindDocumentResizeListener();
    this.bindDocumentKeyboardListener();
  }
  unbindListeners() {
    this.unbindScrollListener();
    this.unbindDocumentClickListener();
    this.unbindDocumentResizeListener();
    this.unbindDocumentKeyboardListener();
  }
  bindScrollListener() {
    if (!this.scrollHandler) {
      this.scrollHandler = new ConnectedOverlayScrollHandler(this.targetEl, (event) => {
        const valid = this.listener ? this.listener(event, {
          type: "scroll",
          mode: this.overlayMode,
          valid: true
        }) : true;
        valid && this.hide(event, true);
      });
    }
    this.scrollHandler.bindScrollListener();
  }
  unbindScrollListener() {
    if (this.scrollHandler) {
      this.scrollHandler.unbindScrollListener();
    }
  }
  bindDocumentClickListener() {
    if (!this.documentClickListener) {
      this.documentClickListener = this.renderer.listen(this.document, "click", (event) => {
        const isTargetClicked = this.targetEl && (this.targetEl.isSameNode(event.target) || !this.isOverlayClicked && this.targetEl.contains(event.target));
        const isOutsideClicked = !isTargetClicked && !this.isOverlayContentClicked;
        const valid = this.listener ? this.listener(event, {
          type: "outside",
          mode: this.overlayMode,
          valid: event.which !== 3 && isOutsideClicked
        }) : isOutsideClicked;
        valid && this.hide(event);
        this.isOverlayClicked = this.isOverlayContentClicked = false;
      });
    }
  }
  unbindDocumentClickListener() {
    if (this.documentClickListener) {
      this.documentClickListener();
      this.documentClickListener = null;
    }
  }
  bindDocumentResizeListener() {
    if (!this.documentResizeListener) {
      this.documentResizeListener = this.renderer.listen(this.window, "resize", (event) => {
        const valid = this.listener ? this.listener(event, {
          type: "resize",
          mode: this.overlayMode,
          valid: !DomHandler.isTouchDevice()
        }) : !DomHandler.isTouchDevice();
        valid && this.hide(event, true);
      });
    }
  }
  unbindDocumentResizeListener() {
    if (this.documentResizeListener) {
      this.documentResizeListener();
      this.documentResizeListener = null;
    }
  }
  bindDocumentKeyboardListener() {
    if (this.documentKeyboardListener) {
      return;
    }
    this.zone.runOutsideAngular(() => {
      this.documentKeyboardListener = this.renderer.listen(this.window, "keydown", (event) => {
        if (!this.overlayOptions.hideOnEscape || event.keyCode !== 27) {
          return;
        }
        const valid = this.listener ? this.listener(event, {
          type: "keydown",
          mode: this.overlayMode,
          valid: !DomHandler.isTouchDevice()
        }) : !DomHandler.isTouchDevice();
        if (valid) {
          this.zone.run(() => {
            this.hide(event, true);
          });
        }
      });
    });
  }
  unbindDocumentKeyboardListener() {
    if (this.documentKeyboardListener) {
      this.documentKeyboardListener();
      this.documentKeyboardListener = null;
    }
  }
  ngOnDestroy() {
    this.hide(this.overlayEl, true);
    if (this.overlayEl) {
      DomHandler.appendOverlay(this.overlayEl, this.targetEl, this.appendTo);
      zindexutils.clear(this.overlayEl);
    }
    if (this.scrollHandler) {
      this.scrollHandler.destroy();
      this.scrollHandler = null;
    }
    this.unbindListeners();
  }
};
Overlay.\u0275fac = function Overlay_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || Overlay)(\u0275\u0275directiveInject(DOCUMENT), \u0275\u0275directiveInject(PLATFORM_ID), \u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(Renderer2), \u0275\u0275directiveInject(PrimeNGConfig), \u0275\u0275directiveInject(OverlayService), \u0275\u0275directiveInject(NgZone));
};
Overlay.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
  type: Overlay,
  selectors: [["p-overlay"]],
  contentQueries: function Overlay_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      \u0275\u0275contentQuery(dirIndex, PrimeTemplate, 4);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.templates = _t);
    }
  },
  viewQuery: function Overlay_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5);
      \u0275\u0275viewQuery(_c1, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.overlayViewChild = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.contentViewChild = _t.first);
    }
  },
  hostAttrs: [1, "p-element"],
  inputs: {
    visible: "visible",
    mode: "mode",
    style: "style",
    styleClass: "styleClass",
    contentStyle: "contentStyle",
    contentStyleClass: "contentStyleClass",
    target: "target",
    appendTo: "appendTo",
    autoZIndex: "autoZIndex",
    baseZIndex: "baseZIndex",
    showTransitionOptions: "showTransitionOptions",
    hideTransitionOptions: "hideTransitionOptions",
    listener: "listener",
    responsive: "responsive",
    options: "options"
  },
  outputs: {
    visibleChange: "visibleChange",
    onBeforeShow: "onBeforeShow",
    onShow: "onShow",
    onBeforeHide: "onBeforeHide",
    onHide: "onHide",
    onAnimationStart: "onAnimationStart",
    onAnimationDone: "onAnimationDone"
  },
  standalone: false,
  features: [\u0275\u0275ProvidersFeature([OVERLAY_VALUE_ACCESSOR])],
  ngContentSelectors: _c2,
  decls: 1,
  vars: 1,
  consts: [["overlay", ""], ["content", ""], [3, "ngStyle", "class", "ngClass", "click", 4, "ngIf"], [3, "click", "ngStyle", "ngClass"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"]],
  template: function Overlay_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275template(0, Overlay_div_0_Template, 3, 20, "div", 2);
    }
    if (rf & 2) {
      \u0275\u0275property("ngIf", ctx.modalVisible);
    }
  },
  dependencies: [NgClass, NgIf, NgTemplateOutlet, NgStyle],
  styles: [".p-overlay{position:absolute;top:0;left:0}.p-overlay-modal{display:flex;align-items:center;justify-content:center;position:fixed;top:0;left:0;width:100%;height:100%}.p-overlay-content{transform-origin:inherit}.p-overlay-modal>.p-overlay-content{z-index:1;width:90%}.p-overlay-top{align-items:flex-start}.p-overlay-top-start{align-items:flex-start;justify-content:flex-start}.p-overlay-top-end{align-items:flex-start;justify-content:flex-end}.p-overlay-bottom{align-items:flex-end}.p-overlay-bottom-start{align-items:flex-end;justify-content:flex-start}.p-overlay-bottom-end{align-items:flex-end;justify-content:flex-end}.p-overlay-left{justify-content:flex-start}.p-overlay-left-start{justify-content:flex-start;align-items:flex-start}.p-overlay-left-end{justify-content:flex-start;align-items:flex-end}.p-overlay-right{justify-content:flex-end}.p-overlay-right-start{justify-content:flex-end;align-items:flex-start}.p-overlay-right-end{justify-content:flex-end;align-items:flex-end}\n"],
  encapsulation: 2,
  data: {
    animation: [trigger("overlayContentAnimation", [transition(":enter", [useAnimation(showOverlayContentAnimation)]), transition(":leave", [useAnimation(hideOverlayContentAnimation)])])]
  },
  changeDetection: 0
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Overlay, [{
    type: Component,
    args: [{
      selector: "p-overlay",
      template: `
        <div
            *ngIf="modalVisible"
            #overlay
            [ngStyle]="style"
            [class]="styleClass"
            [ngClass]="{
                'p-overlay p-component': true,
                'p-overlay-modal p-component-overlay p-component-overlay-enter': modal,
                'p-overlay-center': modal && overlayResponsiveDirection === 'center',
                'p-overlay-top': modal && overlayResponsiveDirection === 'top',
                'p-overlay-top-start': modal && overlayResponsiveDirection === 'top-start',
                'p-overlay-top-end': modal && overlayResponsiveDirection === 'top-end',
                'p-overlay-bottom': modal && overlayResponsiveDirection === 'bottom',
                'p-overlay-bottom-start': modal && overlayResponsiveDirection === 'bottom-start',
                'p-overlay-bottom-end': modal && overlayResponsiveDirection === 'bottom-end',
                'p-overlay-left': modal && overlayResponsiveDirection === 'left',
                'p-overlay-left-start': modal && overlayResponsiveDirection === 'left-start',
                'p-overlay-left-end': modal && overlayResponsiveDirection === 'left-end',
                'p-overlay-right': modal && overlayResponsiveDirection === 'right',
                'p-overlay-right-start': modal && overlayResponsiveDirection === 'right-start',
                'p-overlay-right-end': modal && overlayResponsiveDirection === 'right-end'
            }"
            (click)="onOverlayClick($event)"
        >
            <div
                *ngIf="visible"
                #content
                [ngStyle]="contentStyle"
                [class]="contentStyleClass"
                [ngClass]="'p-overlay-content'"
                (click)="onOverlayContentClick($event)"
                [@overlayContentAnimation]="{ value: 'visible', params: { showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions, transform: transformOptions[modal ? overlayResponsiveDirection : 'default'] } }"
                (@overlayContentAnimation.start)="onOverlayContentAnimationStart($event)"
                (@overlayContentAnimation.done)="onOverlayContentAnimationDone($event)"
            >
                <ng-content></ng-content>
                <ng-container *ngTemplateOutlet="contentTemplate; context: { $implicit: { mode: overlayMode } }"></ng-container>
            </div>
        </div>
    `,
      animations: [trigger("overlayContentAnimation", [transition(":enter", [useAnimation(showOverlayContentAnimation)]), transition(":leave", [useAnimation(hideOverlayContentAnimation)])])],
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      providers: [OVERLAY_VALUE_ACCESSOR],
      host: {
        class: "p-element"
      },
      styles: [".p-overlay{position:absolute;top:0;left:0}.p-overlay-modal{display:flex;align-items:center;justify-content:center;position:fixed;top:0;left:0;width:100%;height:100%}.p-overlay-content{transform-origin:inherit}.p-overlay-modal>.p-overlay-content{z-index:1;width:90%}.p-overlay-top{align-items:flex-start}.p-overlay-top-start{align-items:flex-start;justify-content:flex-start}.p-overlay-top-end{align-items:flex-start;justify-content:flex-end}.p-overlay-bottom{align-items:flex-end}.p-overlay-bottom-start{align-items:flex-end;justify-content:flex-start}.p-overlay-bottom-end{align-items:flex-end;justify-content:flex-end}.p-overlay-left{justify-content:flex-start}.p-overlay-left-start{justify-content:flex-start;align-items:flex-start}.p-overlay-left-end{justify-content:flex-start;align-items:flex-end}.p-overlay-right{justify-content:flex-end}.p-overlay-right-start{justify-content:flex-end;align-items:flex-start}.p-overlay-right-end{justify-content:flex-end;align-items:flex-end}\n"]
    }]
  }], function() {
    return [{
      type: Document,
      decorators: [{
        type: Inject,
        args: [DOCUMENT]
      }]
    }, {
      type: void 0,
      decorators: [{
        type: Inject,
        args: [PLATFORM_ID]
      }]
    }, {
      type: ElementRef
    }, {
      type: Renderer2
    }, {
      type: PrimeNGConfig
    }, {
      type: OverlayService
    }, {
      type: NgZone
    }];
  }, {
    visible: [{
      type: Input
    }],
    mode: [{
      type: Input
    }],
    style: [{
      type: Input
    }],
    styleClass: [{
      type: Input
    }],
    contentStyle: [{
      type: Input
    }],
    contentStyleClass: [{
      type: Input
    }],
    target: [{
      type: Input
    }],
    appendTo: [{
      type: Input
    }],
    autoZIndex: [{
      type: Input
    }],
    baseZIndex: [{
      type: Input
    }],
    showTransitionOptions: [{
      type: Input
    }],
    hideTransitionOptions: [{
      type: Input
    }],
    listener: [{
      type: Input
    }],
    responsive: [{
      type: Input
    }],
    options: [{
      type: Input
    }],
    visibleChange: [{
      type: Output
    }],
    onBeforeShow: [{
      type: Output
    }],
    onShow: [{
      type: Output
    }],
    onBeforeHide: [{
      type: Output
    }],
    onHide: [{
      type: Output
    }],
    onAnimationStart: [{
      type: Output
    }],
    onAnimationDone: [{
      type: Output
    }],
    templates: [{
      type: ContentChildren,
      args: [PrimeTemplate]
    }],
    overlayViewChild: [{
      type: ViewChild,
      args: ["overlay"]
    }],
    contentViewChild: [{
      type: ViewChild,
      args: ["content"]
    }]
  });
})();
var OverlayModule = class {
};
OverlayModule.\u0275fac = function OverlayModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || OverlayModule)();
};
OverlayModule.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: OverlayModule,
  declarations: [Overlay],
  imports: [CommonModule, SharedModule],
  exports: [Overlay, SharedModule]
});
OverlayModule.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
  imports: [CommonModule, SharedModule, SharedModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OverlayModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, SharedModule],
      exports: [Overlay, SharedModule],
      declarations: [Overlay]
    }]
  }], null, null);
})();

// node_modules/primeng/fesm2020/primeng-scroller.mjs
var _c02 = ["element"];
var _c12 = ["content"];
var _c22 = ["*"];
var _c32 = (a0, a1, a2) => ({
  "p-scroller": true,
  "p-scroller-inline": a0,
  "p-both-scroll": a1,
  "p-horizontal-scroll": a2
});
var _c42 = (a0, a1) => ({
  $implicit: a0,
  options: a1
});
var _c52 = (a0) => ({
  "p-scroller-loading": a0
});
var _c62 = (a0) => ({
  "p-component-overlay": a0
});
var _c72 = (a0) => ({
  numCols: a0
});
var _c8 = (a0) => ({
  options: a0
});
var _c9 = () => ({
  styleClass: "p-scroller-loading-icon"
});
var _c10 = (a0, a1) => ({
  rows: a0,
  columns: a1
});
function Scroller_ng_container_0_ng_container_3_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function Scroller_ng_container_0_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, Scroller_ng_container_0_ng_container_3_ng_container_1_Template, 1, 0, "ng-container", 10);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r1.contentTemplate)("ngTemplateOutletContext", \u0275\u0275pureFunction2(2, _c42, ctx_r1.loadedItems, ctx_r1.getContentOptions()));
  }
}
function Scroller_ng_container_0_ng_template_4_ng_container_2_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function Scroller_ng_container_0_ng_template_4_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, Scroller_ng_container_0_ng_template_4_ng_container_2_ng_container_1_Template, 1, 0, "ng-container", 10);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const index_r4 = ctx.index;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r1.itemTemplate)("ngTemplateOutletContext", \u0275\u0275pureFunction2(2, _c42, item_r3, ctx_r1.getOptions(index_r4)));
  }
}
function Scroller_ng_container_0_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11, 3);
    \u0275\u0275template(2, Scroller_ng_container_0_ng_template_4_ng_container_2_Template, 2, 5, "ng-container", 12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(4, _c52, ctx_r1.d_loading))("ngStyle", ctx_r1.contentStyle);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.loadedItems)("ngForTrackBy", ctx_r1._trackBy || ctx_r1.index);
  }
}
function Scroller_ng_container_0_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 13);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngStyle", ctx_r1.spacerStyle);
  }
}
function Scroller_ng_container_0_div_7_ng_container_1_ng_container_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function Scroller_ng_container_0_div_7_ng_container_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, Scroller_ng_container_0_div_7_ng_container_1_ng_container_1_ng_container_1_Template, 1, 0, "ng-container", 10);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const index_r5 = ctx.index;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r1.loaderTemplate)("ngTemplateOutletContext", \u0275\u0275pureFunction1(4, _c8, ctx_r1.getLoaderOptions(index_r5, ctx_r1.both && \u0275\u0275pureFunction1(2, _c72, ctx_r1._numItemsInViewport.cols))));
  }
}
function Scroller_ng_container_0_div_7_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, Scroller_ng_container_0_div_7_ng_container_1_ng_container_1_Template, 2, 6, "ng-container", 15);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.loaderArr);
  }
}
function Scroller_ng_container_0_div_7_ng_template_2_ng_container_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function Scroller_ng_container_0_div_7_ng_template_2_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, Scroller_ng_container_0_div_7_ng_template_2_ng_container_0_ng_container_1_Template, 1, 0, "ng-container", 10);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r1.loaderIconTemplate)("ngTemplateOutletContext", \u0275\u0275pureFunction1(3, _c8, \u0275\u0275pureFunction0(2, _c9)));
  }
}
function Scroller_ng_container_0_div_7_ng_template_2_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "SpinnerIcon", 16);
  }
  if (rf & 2) {
    \u0275\u0275property("styleClass", "p-scroller-loading-icon");
  }
}
function Scroller_ng_container_0_div_7_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, Scroller_ng_container_0_div_7_ng_template_2_ng_container_0_Template, 2, 5, "ng-container", 6)(1, Scroller_ng_container_0_div_7_ng_template_2_ng_template_1_Template, 1, 1, "ng-template", null, 5, \u0275\u0275templateRefExtractor);
  }
  if (rf & 2) {
    const buildInLoaderIcon_r6 = \u0275\u0275reference(2);
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("ngIf", ctx_r1.loaderIconTemplate)("ngIfElse", buildInLoaderIcon_r6);
  }
}
function Scroller_ng_container_0_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275template(1, Scroller_ng_container_0_div_7_ng_container_1_Template, 2, 1, "ng-container", 6)(2, Scroller_ng_container_0_div_7_ng_template_2_Template, 3, 2, "ng-template", null, 4, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const buildInLoader_r7 = \u0275\u0275reference(3);
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(3, _c62, !ctx_r1.loaderTemplate));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.loaderTemplate)("ngIfElse", buildInLoader_r7);
  }
}
function Scroller_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 7, 1);
    \u0275\u0275listener("scroll", function Scroller_ng_container_0_Template_div_scroll_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onContainerScroll($event));
    });
    \u0275\u0275template(3, Scroller_ng_container_0_ng_container_3_Template, 2, 5, "ng-container", 6)(4, Scroller_ng_container_0_ng_template_4_Template, 3, 6, "ng-template", null, 2, \u0275\u0275templateRefExtractor)(6, Scroller_ng_container_0_div_6_Template, 1, 1, "div", 8)(7, Scroller_ng_container_0_div_7_Template, 4, 5, "div", 9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const buildInContent_r8 = \u0275\u0275reference(5);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1._styleClass);
    \u0275\u0275property("ngStyle", ctx_r1._style)("ngClass", \u0275\u0275pureFunction3(10, _c32, ctx_r1.inline, ctx_r1.both, ctx_r1.horizontal));
    \u0275\u0275attribute("id", ctx_r1._id)("tabindex", ctx_r1.tabindex);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.contentTemplate)("ngIfElse", buildInContent_r8);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1._showSpacer);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.loaderDisabled && ctx_r1._showLoader && ctx_r1.d_loading);
  }
}
function Scroller_ng_template_1_ng_container_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function Scroller_ng_template_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, Scroller_ng_template_1_ng_container_1_ng_container_1_Template, 1, 0, "ng-container", 10);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r1.contentTemplate)("ngTemplateOutletContext", \u0275\u0275pureFunction2(5, _c42, ctx_r1.items, \u0275\u0275pureFunction2(2, _c10, ctx_r1._items, ctx_r1.loadedColumns)));
  }
}
function Scroller_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projection(0);
    \u0275\u0275template(1, Scroller_ng_template_1_ng_container_1_Template, 2, 8, "ng-container", 17);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.contentTemplate);
  }
}
var Scroller = class {
  constructor(document2, platformId, renderer, cd, zone) {
    this.document = document2;
    this.platformId = platformId;
    this.renderer = renderer;
    this.cd = cd;
    this.zone = zone;
    this.onLazyLoad = new EventEmitter();
    this.onScroll = new EventEmitter();
    this.onScrollIndexChange = new EventEmitter();
    this._tabindex = 0;
    this._itemSize = 0;
    this._orientation = "vertical";
    this._step = 0;
    this._delay = 0;
    this._resizeDelay = 10;
    this._appendOnly = false;
    this._inline = false;
    this._lazy = false;
    this._disabled = false;
    this._loaderDisabled = false;
    this._showSpacer = true;
    this._showLoader = false;
    this._autoSize = false;
    this.d_loading = false;
    this.first = 0;
    this.last = 0;
    this.page = 0;
    this.isRangeChanged = false;
    this.numItemsInViewport = 0;
    this.lastScrollPos = 0;
    this.lazyLoadState = {};
    this.loaderArr = [];
    this.spacerStyle = {};
    this.contentStyle = {};
    this.initialized = false;
  }
  get id() {
    return this._id;
  }
  set id(val) {
    this._id = val;
  }
  get style() {
    return this._style;
  }
  set style(val) {
    this._style = val;
  }
  get styleClass() {
    return this._styleClass;
  }
  set styleClass(val) {
    this._styleClass = val;
  }
  get tabindex() {
    return this._tabindex;
  }
  set tabindex(val) {
    this._tabindex = val;
  }
  get items() {
    return this._items;
  }
  set items(val) {
    this._items = val;
  }
  get itemSize() {
    return this._itemSize;
  }
  set itemSize(val) {
    this._itemSize = val;
  }
  get scrollHeight() {
    return this._scrollHeight;
  }
  set scrollHeight(val) {
    this._scrollHeight = val;
  }
  get scrollWidth() {
    return this._scrollWidth;
  }
  set scrollWidth(val) {
    this._scrollWidth = val;
  }
  get orientation() {
    return this._orientation;
  }
  set orientation(val) {
    this._orientation = val;
  }
  get step() {
    return this._step;
  }
  set step(val) {
    this._step = val;
  }
  get delay() {
    return this._delay;
  }
  set delay(val) {
    this._delay = val;
  }
  get resizeDelay() {
    return this._resizeDelay;
  }
  set resizeDelay(val) {
    this._resizeDelay = val;
  }
  get appendOnly() {
    return this._appendOnly;
  }
  set appendOnly(val) {
    this._appendOnly = val;
  }
  get inline() {
    return this._inline;
  }
  set inline(val) {
    this._inline = val;
  }
  get lazy() {
    return this._lazy;
  }
  set lazy(val) {
    this._lazy = val;
  }
  get disabled() {
    return this._disabled;
  }
  set disabled(val) {
    this._disabled = val;
  }
  get loaderDisabled() {
    return this._loaderDisabled;
  }
  set loaderDisabled(val) {
    this._loaderDisabled = val;
  }
  get columns() {
    return this._columns;
  }
  set columns(val) {
    this._columns = val;
  }
  get showSpacer() {
    return this._showSpacer;
  }
  set showSpacer(val) {
    this._showSpacer = val;
  }
  get showLoader() {
    return this._showLoader;
  }
  set showLoader(val) {
    this._showLoader = val;
  }
  get numToleratedItems() {
    return this._numToleratedItems;
  }
  set numToleratedItems(val) {
    this._numToleratedItems = val;
  }
  get loading() {
    return this._loading;
  }
  set loading(val) {
    this._loading = val;
  }
  get autoSize() {
    return this._autoSize;
  }
  set autoSize(val) {
    this._autoSize = val;
  }
  get trackBy() {
    return this._trackBy;
  }
  set trackBy(val) {
    this._trackBy = val;
  }
  get options() {
    return this._options;
  }
  set options(val) {
    this._options = val;
    if (val && typeof val === "object") {
      Object.entries(val).forEach(([k, v]) => this[`_${k}`] !== v && (this[`_${k}`] = v));
    }
  }
  get vertical() {
    return this._orientation === "vertical";
  }
  get horizontal() {
    return this._orientation === "horizontal";
  }
  get both() {
    return this._orientation === "both";
  }
  get loadedItems() {
    if (this._items && !this.d_loading) {
      if (this.both) return this._items.slice(this._appendOnly ? 0 : this.first.rows, this.last.rows).map((item) => this._columns ? item : item.slice(this._appendOnly ? 0 : this.first.cols, this.last.cols));
      else if (this.horizontal && this._columns) return this._items;
      else return this._items.slice(this._appendOnly ? 0 : this.first, this.last);
    }
    return [];
  }
  get loadedRows() {
    return this.d_loading ? this._loaderDisabled ? this.loaderArr : [] : this.loadedItems;
  }
  get loadedColumns() {
    if (this._columns && (this.both || this.horizontal)) {
      return this.d_loading && this._loaderDisabled ? this.both ? this.loaderArr[0] : this.loaderArr : this._columns.slice(this.both ? this.first.cols : this.first, this.both ? this.last.cols : this.last);
    }
    return this._columns;
  }
  get isPageChanged() {
    return this._step ? this.page !== this.getPageByFirst() : true;
  }
  ngOnInit() {
    this.setInitialState();
  }
  ngOnChanges(simpleChanges) {
    let isLoadingChanged = false;
    if (simpleChanges.loading) {
      const {
        previousValue,
        currentValue
      } = simpleChanges.loading;
      if (this.lazy && previousValue !== currentValue && currentValue !== this.d_loading) {
        this.d_loading = currentValue;
        isLoadingChanged = true;
      }
    }
    if (simpleChanges.orientation) {
      this.lastScrollPos = this.both ? {
        top: 0,
        left: 0
      } : 0;
    }
    if (simpleChanges.numToleratedItems) {
      const {
        previousValue,
        currentValue
      } = simpleChanges.numToleratedItems;
      if (previousValue !== currentValue && currentValue !== this.d_numToleratedItems) {
        this.d_numToleratedItems = currentValue;
      }
    }
    if (simpleChanges.options) {
      const {
        previousValue,
        currentValue
      } = simpleChanges.options;
      if (this.lazy && previousValue?.loading !== currentValue?.loading && currentValue?.loading !== this.d_loading) {
        this.d_loading = currentValue.loading;
        isLoadingChanged = true;
      }
      if (previousValue?.numToleratedItems !== currentValue?.numToleratedItems && currentValue?.numToleratedItems !== this.d_numToleratedItems) {
        this.d_numToleratedItems = currentValue.numToleratedItems;
      }
    }
    if (this.initialized) {
      const isChanged = !isLoadingChanged && (simpleChanges.items?.previousValue?.length !== simpleChanges.items?.currentValue?.length || simpleChanges.itemSize || simpleChanges.scrollHeight || simpleChanges.scrollWidth);
      if (isChanged) {
        this.init();
        this.calculateAutoSize();
      }
    }
  }
  ngAfterContentInit() {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case "content":
          this.contentTemplate = item.template;
          break;
        case "item":
          this.itemTemplate = item.template;
          break;
        case "loader":
          this.loaderTemplate = item.template;
          break;
        case "loadericon":
          this.loaderIconTemplate = item.template;
          break;
        default:
          this.itemTemplate = item.template;
          break;
      }
    });
  }
  ngAfterViewInit() {
    Promise.resolve().then(() => {
      this.viewInit();
    });
  }
  ngAfterViewChecked() {
    if (!this.initialized) {
      this.viewInit();
    }
  }
  ngOnDestroy() {
    this.unbindResizeListener();
    this.contentEl = null;
    this.initialized = false;
  }
  viewInit() {
    if (isPlatformBrowser(this.platformId)) {
      if (DomHandler.isVisible(this.elementViewChild?.nativeElement)) {
        this.setInitialState();
        this.setContentEl(this.contentEl);
        this.init();
        this.defaultWidth = DomHandler.getWidth(this.elementViewChild.nativeElement);
        this.defaultHeight = DomHandler.getHeight(this.elementViewChild.nativeElement);
        this.defaultContentWidth = DomHandler.getWidth(this.contentEl);
        this.defaultContentHeight = DomHandler.getHeight(this.contentEl);
        this.initialized = true;
      }
    }
  }
  init() {
    if (!this._disabled) {
      this.setSize();
      this.calculateOptions();
      this.setSpacerSize();
      this.bindResizeListener();
      this.cd.detectChanges();
    }
  }
  setContentEl(el) {
    this.contentEl = el || this.contentViewChild?.nativeElement || DomHandler.findSingle(this.elementViewChild?.nativeElement, ".p-scroller-content");
  }
  setInitialState() {
    this.first = this.both ? {
      rows: 0,
      cols: 0
    } : 0;
    this.last = this.both ? {
      rows: 0,
      cols: 0
    } : 0;
    this.numItemsInViewport = this.both ? {
      rows: 0,
      cols: 0
    } : 0;
    this.lastScrollPos = this.both ? {
      top: 0,
      left: 0
    } : 0;
    this.d_loading = this._loading || false;
    this.d_numToleratedItems = this._numToleratedItems;
    this.loaderArr = [];
    this.spacerStyle = {};
    this.contentStyle = {};
  }
  getElementRef() {
    return this.elementViewChild;
  }
  getPageByFirst() {
    return Math.floor((this.first + this.d_numToleratedItems * 4) / (this._step || 1));
  }
  scrollTo(options) {
    this.lastScrollPos = this.both ? {
      top: 0,
      left: 0
    } : 0;
    this.elementViewChild?.nativeElement?.scrollTo(options);
  }
  scrollToIndex(index, behavior = "auto") {
    const {
      numToleratedItems
    } = this.calculateNumItems();
    const contentPos = this.getContentPosition();
    const calculateFirst = (_index = 0, _numT) => _index <= _numT ? 0 : _index;
    const calculateCoord = (_first, _size, _cpos) => _first * _size + _cpos;
    const scrollTo = (left = 0, top = 0) => this.scrollTo({
      left,
      top,
      behavior
    });
    let newFirst = 0;
    if (this.both) {
      newFirst = {
        rows: calculateFirst(index[0], numToleratedItems[0]),
        cols: calculateFirst(index[1], numToleratedItems[1])
      };
      scrollTo(calculateCoord(newFirst.cols, this._itemSize[1], contentPos.left), calculateCoord(newFirst.rows, this._itemSize[0], contentPos.top));
    } else {
      newFirst = calculateFirst(index, numToleratedItems);
      this.horizontal ? scrollTo(calculateCoord(newFirst, this._itemSize, contentPos.left), 0) : scrollTo(0, calculateCoord(newFirst, this._itemSize, contentPos.top));
    }
    this.isRangeChanged = this.first !== newFirst;
    this.first = newFirst;
  }
  scrollInView(index, to, behavior = "auto") {
    if (to) {
      const {
        first,
        viewport
      } = this.getRenderedRange();
      const scrollTo = (left = 0, top = 0) => this.scrollTo({
        left,
        top,
        behavior
      });
      const isToStart = to === "to-start";
      const isToEnd = to === "to-end";
      if (isToStart) {
        if (this.both) {
          if (viewport.first.rows - first.rows > index[0]) {
            scrollTo(viewport.first.cols * this._itemSize[1], (viewport.first.rows - 1) * this._itemSize[0]);
          } else if (viewport.first.cols - first.cols > index[1]) {
            scrollTo((viewport.first.cols - 1) * this._itemSize[1], viewport.first.rows * this._itemSize[0]);
          }
        } else {
          if (viewport.first - first > index) {
            const pos = (viewport.first - 1) * this._itemSize;
            this.horizontal ? scrollTo(pos, 0) : scrollTo(0, pos);
          }
        }
      } else if (isToEnd) {
        if (this.both) {
          if (viewport.last.rows - first.rows <= index[0] + 1) {
            scrollTo(viewport.first.cols * this._itemSize[1], (viewport.first.rows + 1) * this._itemSize[0]);
          } else if (viewport.last.cols - first.cols <= index[1] + 1) {
            scrollTo((viewport.first.cols + 1) * this._itemSize[1], viewport.first.rows * this._itemSize[0]);
          }
        } else {
          if (viewport.last - first <= index + 1) {
            const pos = (viewport.first + 1) * this._itemSize;
            this.horizontal ? scrollTo(pos, 0) : scrollTo(0, pos);
          }
        }
      }
    } else {
      this.scrollToIndex(index, behavior);
    }
  }
  getRenderedRange() {
    const calculateFirstInViewport = (_pos, _size) => Math.floor(_pos / (_size || _pos));
    let firstInViewport = this.first;
    let lastInViewport = 0;
    if (this.elementViewChild?.nativeElement) {
      const {
        scrollTop,
        scrollLeft
      } = this.elementViewChild.nativeElement;
      if (this.both) {
        firstInViewport = {
          rows: calculateFirstInViewport(scrollTop, this._itemSize[0]),
          cols: calculateFirstInViewport(scrollLeft, this._itemSize[1])
        };
        lastInViewport = {
          rows: firstInViewport.rows + this.numItemsInViewport.rows,
          cols: firstInViewport.cols + this.numItemsInViewport.cols
        };
      } else {
        const scrollPos = this.horizontal ? scrollLeft : scrollTop;
        firstInViewport = calculateFirstInViewport(scrollPos, this._itemSize);
        lastInViewport = firstInViewport + this.numItemsInViewport;
      }
    }
    return {
      first: this.first,
      last: this.last,
      viewport: {
        first: firstInViewport,
        last: lastInViewport
      }
    };
  }
  calculateNumItems() {
    const contentPos = this.getContentPosition();
    const contentWidth = this.elementViewChild?.nativeElement ? this.elementViewChild.nativeElement.offsetWidth - contentPos.left : 0;
    const contentHeight = this.elementViewChild?.nativeElement ? this.elementViewChild.nativeElement.offsetHeight - contentPos.top : 0;
    const calculateNumItemsInViewport = (_contentSize, _itemSize) => Math.ceil(_contentSize / (_itemSize || _contentSize));
    const calculateNumToleratedItems = (_numItems) => Math.ceil(_numItems / 2);
    const numItemsInViewport = this.both ? {
      rows: calculateNumItemsInViewport(contentHeight, this._itemSize[0]),
      cols: calculateNumItemsInViewport(contentWidth, this._itemSize[1])
    } : calculateNumItemsInViewport(this.horizontal ? contentWidth : contentHeight, this._itemSize);
    const numToleratedItems = this.d_numToleratedItems || (this.both ? [calculateNumToleratedItems(numItemsInViewport.rows), calculateNumToleratedItems(numItemsInViewport.cols)] : calculateNumToleratedItems(numItemsInViewport));
    return {
      numItemsInViewport,
      numToleratedItems
    };
  }
  calculateOptions() {
    const {
      numItemsInViewport,
      numToleratedItems
    } = this.calculateNumItems();
    const calculateLast = (_first, _num, _numT, _isCols = false) => this.getLast(_first + _num + (_first < _numT ? 2 : 3) * _numT, _isCols);
    const first = this.first;
    const last = this.both ? {
      rows: calculateLast(this.first.rows, numItemsInViewport.rows, numToleratedItems[0]),
      cols: calculateLast(this.first.cols, numItemsInViewport.cols, numToleratedItems[1], true)
    } : calculateLast(this.first, numItemsInViewport, numToleratedItems);
    this.last = last;
    this.numItemsInViewport = numItemsInViewport;
    this.d_numToleratedItems = numToleratedItems;
    if (this.showLoader) {
      this.loaderArr = this.both ? Array.from({
        length: numItemsInViewport.rows
      }).map(() => Array.from({
        length: numItemsInViewport.cols
      })) : Array.from({
        length: numItemsInViewport
      });
    }
    if (this._lazy) {
      Promise.resolve().then(() => {
        this.lazyLoadState = {
          first: this._step ? this.both ? {
            rows: 0,
            cols: first.cols
          } : 0 : first,
          last: Math.min(this._step ? this._step : this.last, this.items.length)
        };
        this.handleEvents("onLazyLoad", this.lazyLoadState);
      });
    }
  }
  calculateAutoSize() {
    if (this._autoSize && !this.d_loading) {
      Promise.resolve().then(() => {
        if (this.contentEl) {
          this.contentEl.style.minHeight = this.contentEl.style.minWidth = "auto";
          this.contentEl.style.position = "relative";
          this.elementViewChild.nativeElement.style.contain = "none";
          const [contentWidth, contentHeight] = [DomHandler.getWidth(this.contentEl), DomHandler.getHeight(this.contentEl)];
          contentWidth !== this.defaultContentWidth && (this.elementViewChild.nativeElement.style.width = "");
          contentHeight !== this.defaultContentHeight && (this.elementViewChild.nativeElement.style.height = "");
          const [width, height] = [DomHandler.getWidth(this.elementViewChild.nativeElement), DomHandler.getHeight(this.elementViewChild.nativeElement)];
          (this.both || this.horizontal) && (this.elementViewChild.nativeElement.style.width = width < this.defaultWidth ? width + "px" : this._scrollWidth || this.defaultWidth + "px");
          (this.both || this.vertical) && (this.elementViewChild.nativeElement.style.height = height < this.defaultHeight ? height + "px" : this._scrollHeight || this.defaultHeight + "px");
          this.contentEl.style.minHeight = this.contentEl.style.minWidth = "";
          this.contentEl.style.position = "";
          this.elementViewChild.nativeElement.style.contain = "";
        }
      });
    }
  }
  getLast(last = 0, isCols = false) {
    return this._items ? Math.min(isCols ? (this._columns || this._items[0]).length : this._items.length, last) : 0;
  }
  getContentPosition() {
    if (this.contentEl) {
      const style2 = getComputedStyle(this.contentEl);
      const left = parseFloat(style2.paddingLeft) + Math.max(parseFloat(style2.left) || 0, 0);
      const right = parseFloat(style2.paddingRight) + Math.max(parseFloat(style2.right) || 0, 0);
      const top = parseFloat(style2.paddingTop) + Math.max(parseFloat(style2.top) || 0, 0);
      const bottom = parseFloat(style2.paddingBottom) + Math.max(parseFloat(style2.bottom) || 0, 0);
      return {
        left,
        right,
        top,
        bottom,
        x: left + right,
        y: top + bottom
      };
    }
    return {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      x: 0,
      y: 0
    };
  }
  setSize() {
    if (this.elementViewChild?.nativeElement) {
      const parentElement = this.elementViewChild.nativeElement.parentElement.parentElement;
      const width = this._scrollWidth || `${this.elementViewChild.nativeElement.offsetWidth || parentElement.offsetWidth}px`;
      const height = this._scrollHeight || `${this.elementViewChild.nativeElement.offsetHeight || parentElement.offsetHeight}px`;
      const setProp = (_name, _value) => this.elementViewChild.nativeElement.style[_name] = _value;
      if (this.both || this.horizontal) {
        setProp("height", height);
        setProp("width", width);
      } else {
        setProp("height", height);
      }
    }
  }
  setSpacerSize() {
    if (this._items) {
      const contentPos = this.getContentPosition();
      const setProp = (_name, _value, _size, _cpos = 0) => this.spacerStyle = __spreadValues(__spreadValues({}, this.spacerStyle), {
        [`${_name}`]: (_value || []).length * _size + _cpos + "px"
      });
      if (this.both) {
        setProp("height", this._items, this._itemSize[0], contentPos.y);
        setProp("width", this._columns || this._items[1], this._itemSize[1], contentPos.x);
      } else {
        this.horizontal ? setProp("width", this._columns || this._items, this._itemSize, contentPos.x) : setProp("height", this._items, this._itemSize, contentPos.y);
      }
    }
  }
  setContentPosition(pos) {
    if (this.contentEl && !this._appendOnly) {
      const first = pos ? pos.first : this.first;
      const calculateTranslateVal = (_first, _size) => _first * _size;
      const setTransform = (_x = 0, _y = 0) => this.contentStyle = __spreadValues(__spreadValues({}, this.contentStyle), {
        transform: `translate3d(${_x}px, ${_y}px, 0)`
      });
      if (this.both) {
        setTransform(calculateTranslateVal(first.cols, this._itemSize[1]), calculateTranslateVal(first.rows, this._itemSize[0]));
      } else {
        const translateVal = calculateTranslateVal(first, this._itemSize);
        this.horizontal ? setTransform(translateVal, 0) : setTransform(0, translateVal);
      }
    }
  }
  onScrollPositionChange(event) {
    const target = event.target;
    const contentPos = this.getContentPosition();
    const calculateScrollPos = (_pos, _cpos) => _pos ? _pos > _cpos ? _pos - _cpos : _pos : 0;
    const calculateCurrentIndex = (_pos, _size) => Math.floor(_pos / (_size || _pos));
    const calculateTriggerIndex = (_currentIndex, _first, _last, _num, _numT, _isScrollDownOrRight) => {
      return _currentIndex <= _numT ? _numT : _isScrollDownOrRight ? _last - _num - _numT : _first + _numT - 1;
    };
    const calculateFirst = (_currentIndex, _triggerIndex, _first, _last, _num, _numT, _isScrollDownOrRight) => {
      if (_currentIndex <= _numT) return 0;
      else return Math.max(0, _isScrollDownOrRight ? _currentIndex < _triggerIndex ? _first : _currentIndex - _numT : _currentIndex > _triggerIndex ? _first : _currentIndex - 2 * _numT);
    };
    const calculateLast = (_currentIndex, _first, _last, _num, _numT, _isCols = false) => {
      let lastValue = _first + _num + 2 * _numT;
      if (_currentIndex >= _numT) {
        lastValue += _numT + 1;
      }
      return this.getLast(lastValue, _isCols);
    };
    const scrollTop = calculateScrollPos(target.scrollTop, contentPos.top);
    const scrollLeft = calculateScrollPos(target.scrollLeft, contentPos.left);
    let newFirst = this.both ? {
      rows: 0,
      cols: 0
    } : 0;
    let newLast = this.last;
    let isRangeChanged = false;
    let newScrollPos = this.lastScrollPos;
    if (this.both) {
      const isScrollDown = this.lastScrollPos.top <= scrollTop;
      const isScrollRight = this.lastScrollPos.left <= scrollLeft;
      if (!this._appendOnly || this._appendOnly && (isScrollDown || isScrollRight)) {
        const currentIndex = {
          rows: calculateCurrentIndex(scrollTop, this._itemSize[0]),
          cols: calculateCurrentIndex(scrollLeft, this._itemSize[1])
        };
        const triggerIndex = {
          rows: calculateTriggerIndex(currentIndex.rows, this.first.rows, this.last.rows, this.numItemsInViewport.rows, this.d_numToleratedItems[0], isScrollDown),
          cols: calculateTriggerIndex(currentIndex.cols, this.first.cols, this.last.cols, this.numItemsInViewport.cols, this.d_numToleratedItems[1], isScrollRight)
        };
        newFirst = {
          rows: calculateFirst(currentIndex.rows, triggerIndex.rows, this.first.rows, this.last.rows, this.numItemsInViewport.rows, this.d_numToleratedItems[0], isScrollDown),
          cols: calculateFirst(currentIndex.cols, triggerIndex.cols, this.first.cols, this.last.cols, this.numItemsInViewport.cols, this.d_numToleratedItems[1], isScrollRight)
        };
        newLast = {
          rows: calculateLast(currentIndex.rows, newFirst.rows, this.last.rows, this.numItemsInViewport.rows, this.d_numToleratedItems[0]),
          cols: calculateLast(currentIndex.cols, newFirst.cols, this.last.cols, this.numItemsInViewport.cols, this.d_numToleratedItems[1], true)
        };
        isRangeChanged = newFirst.rows !== this.first.rows || newLast.rows !== this.last.rows || newFirst.cols !== this.first.cols || newLast.cols !== this.last.cols || this.isRangeChanged;
        newScrollPos = {
          top: scrollTop,
          left: scrollLeft
        };
      }
    } else {
      const scrollPos = this.horizontal ? scrollLeft : scrollTop;
      const isScrollDownOrRight = this.lastScrollPos <= scrollPos;
      if (!this._appendOnly || this._appendOnly && isScrollDownOrRight) {
        const currentIndex = calculateCurrentIndex(scrollPos, this._itemSize);
        const triggerIndex = calculateTriggerIndex(currentIndex, this.first, this.last, this.numItemsInViewport, this.d_numToleratedItems, isScrollDownOrRight);
        newFirst = calculateFirst(currentIndex, triggerIndex, this.first, this.last, this.numItemsInViewport, this.d_numToleratedItems, isScrollDownOrRight);
        newLast = calculateLast(currentIndex, newFirst, this.last, this.numItemsInViewport, this.d_numToleratedItems);
        isRangeChanged = newFirst !== this.first || newLast !== this.last || this.isRangeChanged;
        newScrollPos = scrollPos;
      }
    }
    return {
      first: newFirst,
      last: newLast,
      isRangeChanged,
      scrollPos: newScrollPos
    };
  }
  onScrollChange(event) {
    const {
      first,
      last,
      isRangeChanged,
      scrollPos
    } = this.onScrollPositionChange(event);
    if (isRangeChanged) {
      const newState = {
        first,
        last
      };
      this.setContentPosition(newState);
      this.first = first;
      this.last = last;
      this.lastScrollPos = scrollPos;
      this.handleEvents("onScrollIndexChange", newState);
      if (this._lazy && this.isPageChanged) {
        const lazyLoadState = {
          first: this._step ? Math.min(this.getPageByFirst() * this._step, this.items.length - this._step) : first,
          last: Math.min(this._step ? (this.getPageByFirst() + 1) * this._step : last, this.items.length)
        };
        const isLazyStateChanged = this.lazyLoadState.first !== lazyLoadState.first || this.lazyLoadState.last !== lazyLoadState.last;
        isLazyStateChanged && this.handleEvents("onLazyLoad", lazyLoadState);
        this.lazyLoadState = lazyLoadState;
      }
    }
  }
  onContainerScroll(event) {
    this.handleEvents("onScroll", {
      originalEvent: event
    });
    if (this._delay && this.isPageChanged) {
      if (this.scrollTimeout) {
        clearTimeout(this.scrollTimeout);
      }
      if (!this.d_loading && this.showLoader) {
        const {
          isRangeChanged
        } = this.onScrollPositionChange(event);
        const changed = isRangeChanged || (this._step ? this.isPageChanged : false);
        if (changed) {
          this.d_loading = true;
          this.cd.detectChanges();
        }
      }
      this.scrollTimeout = setTimeout(() => {
        this.onScrollChange(event);
        if (this.d_loading && this.showLoader && (!this._lazy || this._loading === void 0)) {
          this.d_loading = false;
          this.page = this.getPageByFirst();
          this.cd.detectChanges();
        }
      }, this._delay);
    } else {
      !this.d_loading && this.onScrollChange(event);
    }
  }
  bindResizeListener() {
    if (isPlatformBrowser(this.platformId)) {
      if (!this.windowResizeListener) {
        this.zone.runOutsideAngular(() => {
          const window2 = this.document.defaultView;
          const event = DomHandler.isTouchDevice() ? "orientationchange" : "resize";
          this.windowResizeListener = this.renderer.listen(window2, event, this.onWindowResize.bind(this));
        });
      }
    }
  }
  unbindResizeListener() {
    if (this.windowResizeListener) {
      this.windowResizeListener();
      this.windowResizeListener = null;
    }
  }
  onWindowResize() {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    this.resizeTimeout = setTimeout(() => {
      if (DomHandler.isVisible(this.elementViewChild?.nativeElement)) {
        const [width, height] = [DomHandler.getWidth(this.elementViewChild.nativeElement), DomHandler.getHeight(this.elementViewChild.nativeElement)];
        const [isDiffWidth, isDiffHeight] = [width !== this.defaultWidth, height !== this.defaultHeight];
        const reinit = this.both ? isDiffWidth || isDiffHeight : this.horizontal ? isDiffWidth : this.vertical ? isDiffHeight : false;
        reinit && this.zone.run(() => {
          this.d_numToleratedItems = this._numToleratedItems;
          this.defaultWidth = width;
          this.defaultHeight = height;
          this.defaultContentWidth = DomHandler.getWidth(this.contentEl);
          this.defaultContentHeight = DomHandler.getHeight(this.contentEl);
          this.init();
        });
      }
    }, this._resizeDelay);
  }
  handleEvents(name, params) {
    return this.options && this.options[name] ? this.options[name](params) : this[name].emit(params);
  }
  getContentOptions() {
    return {
      contentStyleClass: `p-scroller-content ${this.d_loading ? "p-scroller-loading" : ""}`,
      items: this.loadedItems,
      getItemOptions: (index) => this.getOptions(index),
      loading: this.d_loading,
      getLoaderOptions: (index, options) => this.getLoaderOptions(index, options),
      itemSize: this._itemSize,
      rows: this.loadedRows,
      columns: this.loadedColumns,
      spacerStyle: this.spacerStyle,
      contentStyle: this.contentStyle,
      vertical: this.vertical,
      horizontal: this.horizontal,
      both: this.both
    };
  }
  getOptions(renderedIndex) {
    const count = (this._items || []).length;
    const index = this.both ? this.first.rows + renderedIndex : this.first + renderedIndex;
    return {
      index,
      count,
      first: index === 0,
      last: index === count - 1,
      even: index % 2 === 0,
      odd: index % 2 !== 0
    };
  }
  getLoaderOptions(index, extOptions) {
    const count = this.loaderArr.length;
    return __spreadValues({
      index,
      count,
      first: index === 0,
      last: index === count - 1,
      even: index % 2 === 0,
      odd: index % 2 !== 0
    }, extOptions);
  }
};
Scroller.\u0275fac = function Scroller_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || Scroller)(\u0275\u0275directiveInject(DOCUMENT), \u0275\u0275directiveInject(PLATFORM_ID), \u0275\u0275directiveInject(Renderer2), \u0275\u0275directiveInject(ChangeDetectorRef), \u0275\u0275directiveInject(NgZone));
};
Scroller.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
  type: Scroller,
  selectors: [["p-scroller"]],
  contentQueries: function Scroller_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      \u0275\u0275contentQuery(dirIndex, PrimeTemplate, 4);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.templates = _t);
    }
  },
  viewQuery: function Scroller_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c02, 5);
      \u0275\u0275viewQuery(_c12, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.elementViewChild = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.contentViewChild = _t.first);
    }
  },
  hostAttrs: [1, "p-scroller-viewport", "p-element"],
  inputs: {
    id: "id",
    style: "style",
    styleClass: "styleClass",
    tabindex: "tabindex",
    items: "items",
    itemSize: "itemSize",
    scrollHeight: "scrollHeight",
    scrollWidth: "scrollWidth",
    orientation: "orientation",
    step: "step",
    delay: "delay",
    resizeDelay: "resizeDelay",
    appendOnly: "appendOnly",
    inline: "inline",
    lazy: "lazy",
    disabled: "disabled",
    loaderDisabled: "loaderDisabled",
    columns: "columns",
    showSpacer: "showSpacer",
    showLoader: "showLoader",
    numToleratedItems: "numToleratedItems",
    loading: "loading",
    autoSize: "autoSize",
    trackBy: "trackBy",
    options: "options"
  },
  outputs: {
    onLazyLoad: "onLazyLoad",
    onScroll: "onScroll",
    onScrollIndexChange: "onScrollIndexChange"
  },
  standalone: false,
  features: [\u0275\u0275NgOnChangesFeature],
  ngContentSelectors: _c22,
  decls: 3,
  vars: 2,
  consts: [["disabledContainer", ""], ["element", ""], ["buildInContent", ""], ["content", ""], ["buildInLoader", ""], ["buildInLoaderIcon", ""], [4, "ngIf", "ngIfElse"], [3, "scroll", "ngStyle", "ngClass"], ["class", "p-scroller-spacer", 3, "ngStyle", 4, "ngIf"], ["class", "p-scroller-loader", 3, "ngClass", 4, "ngIf"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "p-scroller-content", 3, "ngClass", "ngStyle"], [4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "p-scroller-spacer", 3, "ngStyle"], [1, "p-scroller-loader", 3, "ngClass"], [4, "ngFor", "ngForOf"], [3, "styleClass"], [4, "ngIf"]],
  template: function Scroller_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275template(0, Scroller_ng_container_0_Template, 8, 14, "ng-container", 6)(1, Scroller_ng_template_1_Template, 2, 1, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      const disabledContainer_r9 = \u0275\u0275reference(2);
      \u0275\u0275property("ngIf", !ctx._disabled)("ngIfElse", disabledContainer_r9);
    }
  },
  dependencies: () => [NgClass, NgForOf, NgIf, NgTemplateOutlet, NgStyle, SpinnerIcon],
  styles: ["p-scroller{flex:1;outline:0 none}.p-scroller{position:relative;overflow:auto;contain:strict;transform:translateZ(0);will-change:scroll-position;outline:0 none}.p-scroller-content{position:absolute;top:0;left:0;min-height:100%;min-width:100%;will-change:transform}.p-scroller-spacer{position:absolute;top:0;left:0;height:1px;width:1px;transform-origin:0 0;pointer-events:none}.p-scroller-loader{position:sticky;top:0;left:0;width:100%;height:100%}.p-scroller-loader.p-component-overlay{display:flex;align-items:center;justify-content:center}.p-scroller-loading-icon{scale:2}.p-scroller-inline .p-scroller-content{position:static}\n"],
  encapsulation: 2
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Scroller, [{
    type: Component,
    args: [{
      selector: "p-scroller",
      template: `
        <ng-container *ngIf="!_disabled; else disabledContainer">
            <div
                #element
                [attr.id]="_id"
                [attr.tabindex]="tabindex"
                [ngStyle]="_style"
                [class]="_styleClass"
                [ngClass]="{ 'p-scroller': true, 'p-scroller-inline': inline, 'p-both-scroll': both, 'p-horizontal-scroll': horizontal }"
                (scroll)="onContainerScroll($event)"
            >
                <ng-container *ngIf="contentTemplate; else buildInContent">
                    <ng-container *ngTemplateOutlet="contentTemplate; context: { $implicit: loadedItems, options: getContentOptions() }"></ng-container>
                </ng-container>
                <ng-template #buildInContent>
                    <div #content class="p-scroller-content" [ngClass]="{ 'p-scroller-loading': d_loading }" [ngStyle]="contentStyle">
                        <ng-container *ngFor="let item of loadedItems; let index = index; trackBy: _trackBy || index">
                            <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item, options: getOptions(index) }"></ng-container>
                        </ng-container>
                    </div>
                </ng-template>
                <div *ngIf="_showSpacer" class="p-scroller-spacer" [ngStyle]="spacerStyle"></div>
                <div *ngIf="!loaderDisabled && _showLoader && d_loading" class="p-scroller-loader" [ngClass]="{ 'p-component-overlay': !loaderTemplate }">
                    <ng-container *ngIf="loaderTemplate; else buildInLoader">
                        <ng-container *ngFor="let item of loaderArr; let index = index">
                            <ng-container *ngTemplateOutlet="loaderTemplate; context: { options: getLoaderOptions(index, both && { numCols: _numItemsInViewport.cols }) }"></ng-container>
                        </ng-container>
                    </ng-container>
                    <ng-template #buildInLoader>
                        <ng-container *ngIf="loaderIconTemplate; else buildInLoaderIcon">
                            <ng-container *ngTemplateOutlet="loaderIconTemplate; context: { options: { styleClass: 'p-scroller-loading-icon' } }"></ng-container>
                        </ng-container>
                        <ng-template #buildInLoaderIcon>
                            <SpinnerIcon [styleClass]="'p-scroller-loading-icon'"/>
                        </ng-template>
                    </ng-template>
                </div>
            </div>
        </ng-container>
        <ng-template #disabledContainer>
            <ng-content></ng-content>
            <ng-container *ngIf="contentTemplate">
                <ng-container *ngTemplateOutlet="contentTemplate; context: { $implicit: items, options: { rows: _items, columns: loadedColumns } }"></ng-container>
            </ng-container>
        </ng-template>
    `,
      changeDetection: ChangeDetectionStrategy.Default,
      encapsulation: ViewEncapsulation.None,
      host: {
        class: "p-scroller-viewport p-element"
      },
      styles: ["p-scroller{flex:1;outline:0 none}.p-scroller{position:relative;overflow:auto;contain:strict;transform:translateZ(0);will-change:scroll-position;outline:0 none}.p-scroller-content{position:absolute;top:0;left:0;min-height:100%;min-width:100%;will-change:transform}.p-scroller-spacer{position:absolute;top:0;left:0;height:1px;width:1px;transform-origin:0 0;pointer-events:none}.p-scroller-loader{position:sticky;top:0;left:0;width:100%;height:100%}.p-scroller-loader.p-component-overlay{display:flex;align-items:center;justify-content:center}.p-scroller-loading-icon{scale:2}.p-scroller-inline .p-scroller-content{position:static}\n"]
    }]
  }], function() {
    return [{
      type: Document,
      decorators: [{
        type: Inject,
        args: [DOCUMENT]
      }]
    }, {
      type: void 0,
      decorators: [{
        type: Inject,
        args: [PLATFORM_ID]
      }]
    }, {
      type: Renderer2
    }, {
      type: ChangeDetectorRef
    }, {
      type: NgZone
    }];
  }, {
    id: [{
      type: Input
    }],
    style: [{
      type: Input
    }],
    styleClass: [{
      type: Input
    }],
    tabindex: [{
      type: Input
    }],
    items: [{
      type: Input
    }],
    itemSize: [{
      type: Input
    }],
    scrollHeight: [{
      type: Input
    }],
    scrollWidth: [{
      type: Input
    }],
    orientation: [{
      type: Input
    }],
    step: [{
      type: Input
    }],
    delay: [{
      type: Input
    }],
    resizeDelay: [{
      type: Input
    }],
    appendOnly: [{
      type: Input
    }],
    inline: [{
      type: Input
    }],
    lazy: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    loaderDisabled: [{
      type: Input
    }],
    columns: [{
      type: Input
    }],
    showSpacer: [{
      type: Input
    }],
    showLoader: [{
      type: Input
    }],
    numToleratedItems: [{
      type: Input
    }],
    loading: [{
      type: Input
    }],
    autoSize: [{
      type: Input
    }],
    trackBy: [{
      type: Input
    }],
    options: [{
      type: Input
    }],
    elementViewChild: [{
      type: ViewChild,
      args: ["element"]
    }],
    contentViewChild: [{
      type: ViewChild,
      args: ["content"]
    }],
    templates: [{
      type: ContentChildren,
      args: [PrimeTemplate]
    }],
    onLazyLoad: [{
      type: Output
    }],
    onScroll: [{
      type: Output
    }],
    onScrollIndexChange: [{
      type: Output
    }]
  });
})();
var ScrollerModule = class {
};
ScrollerModule.\u0275fac = function ScrollerModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || ScrollerModule)();
};
ScrollerModule.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: ScrollerModule,
  declarations: [Scroller],
  imports: [CommonModule, SharedModule, SpinnerIcon],
  exports: [Scroller, SharedModule]
});
ScrollerModule.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
  imports: [CommonModule, SharedModule, SpinnerIcon, SharedModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ScrollerModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, SharedModule, SpinnerIcon],
      exports: [Scroller, SharedModule],
      declarations: [Scroller]
    }]
  }], null, null);
})();

// node_modules/primeng/fesm2020/primeng-tooltip.mjs
var Tooltip = class {
  constructor(platformId, el, zone, config, renderer, changeDetector) {
    this.platformId = platformId;
    this.el = el;
    this.zone = zone;
    this.config = config;
    this.renderer = renderer;
    this.changeDetector = changeDetector;
    this.escape = true;
    this.autoHide = true;
    this.fitContent = true;
    this.hideOnEscape = true;
    this._tooltipOptions = {
      tooltipPosition: "right",
      tooltipEvent: "hover",
      appendTo: "body",
      tooltipZIndex: "auto",
      escape: true,
      positionTop: 0,
      positionLeft: 0,
      autoHide: true,
      hideOnEscape: false
    };
  }
  get disabled() {
    return this._disabled;
  }
  set disabled(val) {
    this._disabled = val;
    this.deactivate();
  }
  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        if (this.getOption("tooltipEvent") === "hover") {
          this.mouseEnterListener = this.onMouseEnter.bind(this);
          this.mouseLeaveListener = this.onMouseLeave.bind(this);
          this.clickListener = this.onInputClick.bind(this);
          this.el.nativeElement.addEventListener("mouseenter", this.mouseEnterListener);
          this.el.nativeElement.addEventListener("click", this.clickListener);
          this.el.nativeElement.addEventListener("mouseleave", this.mouseLeaveListener);
        } else if (this.getOption("tooltipEvent") === "focus") {
          this.focusListener = this.onFocus.bind(this);
          this.blurListener = this.onBlur.bind(this);
          let target = this.getTarget(this.el.nativeElement);
          target.addEventListener("focus", this.focusListener);
          target.addEventListener("blur", this.blurListener);
        }
      });
    }
  }
  ngOnChanges(simpleChange) {
    if (simpleChange.tooltipPosition) {
      this.setOption({
        tooltipPosition: simpleChange.tooltipPosition.currentValue
      });
    }
    if (simpleChange.tooltipEvent) {
      this.setOption({
        tooltipEvent: simpleChange.tooltipEvent.currentValue
      });
    }
    if (simpleChange.appendTo) {
      this.setOption({
        appendTo: simpleChange.appendTo.currentValue
      });
    }
    if (simpleChange.positionStyle) {
      this.setOption({
        positionStyle: simpleChange.positionStyle.currentValue
      });
    }
    if (simpleChange.tooltipStyleClass) {
      this.setOption({
        tooltipStyleClass: simpleChange.tooltipStyleClass.currentValue
      });
    }
    if (simpleChange.tooltipZIndex) {
      this.setOption({
        tooltipZIndex: simpleChange.tooltipZIndex.currentValue
      });
    }
    if (simpleChange.escape) {
      this.setOption({
        escape: simpleChange.escape.currentValue
      });
    }
    if (simpleChange.showDelay) {
      this.setOption({
        showDelay: simpleChange.showDelay.currentValue
      });
    }
    if (simpleChange.hideDelay) {
      this.setOption({
        hideDelay: simpleChange.hideDelay.currentValue
      });
    }
    if (simpleChange.life) {
      this.setOption({
        life: simpleChange.life.currentValue
      });
    }
    if (simpleChange.positionTop) {
      this.setOption({
        positionTop: simpleChange.positionTop.currentValue
      });
    }
    if (simpleChange.positionLeft) {
      this.setOption({
        positionLeft: simpleChange.positionLeft.currentValue
      });
    }
    if (simpleChange.disabled) {
      this.setOption({
        disabled: simpleChange.disabled.currentValue
      });
    }
    if (simpleChange.text) {
      this.setOption({
        tooltipLabel: simpleChange.text.currentValue
      });
      if (this.active) {
        if (simpleChange.text.currentValue) {
          if (this.container && this.container.offsetParent) {
            this.updateText();
            this.align();
          } else {
            this.show();
          }
        } else {
          this.hide();
        }
      }
    }
    if (simpleChange.autoHide) {
      this.setOption({
        autoHide: simpleChange.autoHide.currentValue
      });
    }
    if (simpleChange.tooltipOptions) {
      this._tooltipOptions = __spreadValues(__spreadValues({}, this._tooltipOptions), simpleChange.tooltipOptions.currentValue);
      this.deactivate();
      if (this.active) {
        if (this.getOption("tooltipLabel")) {
          if (this.container && this.container.offsetParent) {
            this.updateText();
            this.align();
          } else {
            this.show();
          }
        } else {
          this.hide();
        }
      }
    }
  }
  isAutoHide() {
    return this.getOption("autoHide");
  }
  onMouseEnter(e) {
    if (!this.container && !this.showTimeout) {
      this.activate();
    }
  }
  onMouseLeave(e) {
    if (!this.isAutoHide()) {
      const valid = DomHandler.hasClass(e.toElement, "p-tooltip") || DomHandler.hasClass(e.toElement, "p-tooltip-arrow") || DomHandler.hasClass(e.toElement, "p-tooltip-text") || DomHandler.hasClass(e.relatedTarget, "p-tooltip");
      !valid && this.deactivate();
    } else {
      this.deactivate();
    }
  }
  onFocus(e) {
    this.activate();
  }
  onBlur(e) {
    this.deactivate();
  }
  onInputClick(e) {
    this.deactivate();
  }
  onPressEscape() {
    if (this.hideOnEscape) {
      this.deactivate();
    }
  }
  activate() {
    this.active = true;
    this.clearHideTimeout();
    if (this.getOption("showDelay")) this.showTimeout = setTimeout(() => {
      this.show();
    }, this.getOption("showDelay"));
    else this.show();
    if (this.getOption("life")) {
      let duration = this.getOption("showDelay") ? this.getOption("life") + this.getOption("showDelay") : this.getOption("life");
      this.hideTimeout = setTimeout(() => {
        this.hide();
      }, duration);
    }
  }
  deactivate() {
    this.active = false;
    this.clearShowTimeout();
    if (this.getOption("hideDelay")) {
      this.clearHideTimeout();
      this.hideTimeout = setTimeout(() => {
        this.hide();
      }, this.getOption("hideDelay"));
    } else {
      this.hide();
    }
  }
  create() {
    if (this.container) {
      this.clearHideTimeout();
      this.remove();
    }
    this.container = document.createElement("div");
    let tooltipArrow = document.createElement("div");
    tooltipArrow.className = "p-tooltip-arrow";
    this.container.appendChild(tooltipArrow);
    this.tooltipText = document.createElement("div");
    this.tooltipText.className = "p-tooltip-text";
    this.updateText();
    if (this.getOption("positionStyle")) {
      this.container.style.position = this.getOption("positionStyle");
    }
    this.container.appendChild(this.tooltipText);
    if (this.getOption("appendTo") === "body") document.body.appendChild(this.container);
    else if (this.getOption("appendTo") === "target") DomHandler.appendChild(this.container, this.el.nativeElement);
    else DomHandler.appendChild(this.container, this.getOption("appendTo"));
    this.container.style.display = "inline-block";
    if (this.fitContent) {
      this.container.style.width = "fit-content";
    }
    if (!this.isAutoHide()) {
      this.bindContainerMouseleaveListener();
    }
  }
  bindContainerMouseleaveListener() {
    if (!this.containerMouseleaveListener) {
      const targetEl = this.container ?? this.container.nativeElement;
      this.containerMouseleaveListener = this.renderer.listen(targetEl, "mouseleave", (e) => {
        this.deactivate();
      });
    }
  }
  unbindContainerMouseleaveListener() {
    if (this.containerMouseleaveListener) {
      this.bindContainerMouseleaveListener();
      this.containerMouseleaveListener = null;
    }
  }
  show() {
    if (!this.getOption("tooltipLabel") || this.getOption("disabled")) {
      return;
    }
    this.create();
    this.align();
    DomHandler.fadeIn(this.container, 250);
    if (this.getOption("tooltipZIndex") === "auto") zindexutils.set("tooltip", this.container, this.config.zIndex.tooltip);
    else this.container.style.zIndex = this.getOption("tooltipZIndex");
    this.bindDocumentResizeListener();
    this.bindScrollListener();
  }
  hide() {
    if (this.getOption("tooltipZIndex") === "auto") {
      zindexutils.clear(this.container);
    }
    this.remove();
  }
  updateText() {
    if (this.getOption("escape")) {
      this.tooltipText.innerHTML = "";
      this.tooltipText.appendChild(document.createTextNode(this.getOption("tooltipLabel")));
    } else {
      this.tooltipText.innerHTML = this.getOption("tooltipLabel");
    }
  }
  align() {
    let position = this.getOption("tooltipPosition");
    switch (position) {
      case "top":
        this.alignTop();
        if (this.isOutOfBounds()) {
          this.alignBottom();
          if (this.isOutOfBounds()) {
            this.alignRight();
            if (this.isOutOfBounds()) {
              this.alignLeft();
            }
          }
        }
        break;
      case "bottom":
        this.alignBottom();
        if (this.isOutOfBounds()) {
          this.alignTop();
          if (this.isOutOfBounds()) {
            this.alignRight();
            if (this.isOutOfBounds()) {
              this.alignLeft();
            }
          }
        }
        break;
      case "left":
        this.alignLeft();
        if (this.isOutOfBounds()) {
          this.alignRight();
          if (this.isOutOfBounds()) {
            this.alignTop();
            if (this.isOutOfBounds()) {
              this.alignBottom();
            }
          }
        }
        break;
      case "right":
        this.alignRight();
        if (this.isOutOfBounds()) {
          this.alignLeft();
          if (this.isOutOfBounds()) {
            this.alignTop();
            if (this.isOutOfBounds()) {
              this.alignBottom();
            }
          }
        }
        break;
    }
  }
  getHostOffset() {
    if (this.getOption("appendTo") === "body" || this.getOption("appendTo") === "target") {
      let offset = this.el.nativeElement.getBoundingClientRect();
      let targetLeft = offset.left + DomHandler.getWindowScrollLeft();
      let targetTop = offset.top + DomHandler.getWindowScrollTop();
      return {
        left: targetLeft,
        top: targetTop
      };
    } else {
      return {
        left: 0,
        top: 0
      };
    }
  }
  alignRight() {
    this.preAlign("right");
    let hostOffset = this.getHostOffset();
    let left = hostOffset.left + DomHandler.getOuterWidth(this.el.nativeElement);
    let top = hostOffset.top + (DomHandler.getOuterHeight(this.el.nativeElement) - DomHandler.getOuterHeight(this.container)) / 2;
    this.container.style.left = left + this.getOption("positionLeft") + "px";
    this.container.style.top = top + this.getOption("positionTop") + "px";
  }
  alignLeft() {
    this.preAlign("left");
    let hostOffset = this.getHostOffset();
    let left = hostOffset.left - DomHandler.getOuterWidth(this.container);
    let top = hostOffset.top + (DomHandler.getOuterHeight(this.el.nativeElement) - DomHandler.getOuterHeight(this.container)) / 2;
    this.container.style.left = left + this.getOption("positionLeft") + "px";
    this.container.style.top = top + this.getOption("positionTop") + "px";
  }
  alignTop() {
    this.preAlign("top");
    let hostOffset = this.getHostOffset();
    let left = hostOffset.left + (DomHandler.getOuterWidth(this.el.nativeElement) - DomHandler.getOuterWidth(this.container)) / 2;
    let top = hostOffset.top - DomHandler.getOuterHeight(this.container);
    this.container.style.left = left + this.getOption("positionLeft") + "px";
    this.container.style.top = top + this.getOption("positionTop") + "px";
  }
  alignBottom() {
    this.preAlign("bottom");
    let hostOffset = this.getHostOffset();
    let left = hostOffset.left + (DomHandler.getOuterWidth(this.el.nativeElement) - DomHandler.getOuterWidth(this.container)) / 2;
    let top = hostOffset.top + DomHandler.getOuterHeight(this.el.nativeElement);
    this.container.style.left = left + this.getOption("positionLeft") + "px";
    this.container.style.top = top + this.getOption("positionTop") + "px";
  }
  setOption(option) {
    this._tooltipOptions = __spreadValues(__spreadValues({}, this._tooltipOptions), option);
  }
  getOption(option) {
    return this._tooltipOptions[option];
  }
  getTarget(el) {
    return DomHandler.hasClass(el, "p-inputwrapper") ? DomHandler.findSingle(el, "input") : el;
  }
  preAlign(position) {
    this.container.style.left = "-999px";
    this.container.style.top = "-999px";
    let defaultClassName = "p-tooltip p-component p-tooltip-" + position;
    this.container.className = this.getOption("tooltipStyleClass") ? defaultClassName + " " + this.getOption("tooltipStyleClass") : defaultClassName;
  }
  isOutOfBounds() {
    let offset = this.container.getBoundingClientRect();
    let targetTop = offset.top;
    let targetLeft = offset.left;
    let width = DomHandler.getOuterWidth(this.container);
    let height = DomHandler.getOuterHeight(this.container);
    let viewport = DomHandler.getViewport();
    return targetLeft + width > viewport.width || targetLeft < 0 || targetTop < 0 || targetTop + height > viewport.height;
  }
  onWindowResize(e) {
    this.hide();
  }
  bindDocumentResizeListener() {
    this.zone.runOutsideAngular(() => {
      this.resizeListener = this.onWindowResize.bind(this);
      window.addEventListener("resize", this.resizeListener);
    });
  }
  unbindDocumentResizeListener() {
    if (this.resizeListener) {
      window.removeEventListener("resize", this.resizeListener);
      this.resizeListener = null;
    }
  }
  bindScrollListener() {
    if (!this.scrollHandler) {
      this.scrollHandler = new ConnectedOverlayScrollHandler(this.el.nativeElement, () => {
        if (this.container) {
          this.hide();
        }
      });
    }
    this.scrollHandler.bindScrollListener();
  }
  unbindScrollListener() {
    if (this.scrollHandler) {
      this.scrollHandler.unbindScrollListener();
    }
  }
  unbindEvents() {
    if (this.getOption("tooltipEvent") === "hover") {
      this.el.nativeElement.removeEventListener("mouseenter", this.mouseEnterListener);
      this.el.nativeElement.removeEventListener("mouseleave", this.mouseLeaveListener);
      this.el.nativeElement.removeEventListener("click", this.clickListener);
    } else if (this.getOption("tooltipEvent") === "focus") {
      let target = this.getTarget(this.el.nativeElement);
      target.removeEventListener("focus", this.focusListener);
      target.removeEventListener("blur", this.blurListener);
    }
    this.unbindDocumentResizeListener();
  }
  remove() {
    if (this.container && this.container.parentElement) {
      if (this.getOption("appendTo") === "body") document.body.removeChild(this.container);
      else if (this.getOption("appendTo") === "target") this.el.nativeElement.removeChild(this.container);
      else DomHandler.removeChild(this.container, this.getOption("appendTo"));
    }
    this.unbindDocumentResizeListener();
    this.unbindScrollListener();
    this.unbindContainerMouseleaveListener();
    this.clearTimeouts();
    this.container = null;
    this.scrollHandler = null;
  }
  clearShowTimeout() {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
      this.showTimeout = null;
    }
  }
  clearHideTimeout() {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
  }
  clearTimeouts() {
    this.clearShowTimeout();
    this.clearHideTimeout();
  }
  ngOnDestroy() {
    this.unbindEvents();
    if (this.container) {
      zindexutils.clear(this.container);
    }
    this.remove();
    if (this.scrollHandler) {
      this.scrollHandler.destroy();
      this.scrollHandler = null;
    }
  }
};
Tooltip.\u0275fac = function Tooltip_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || Tooltip)(\u0275\u0275directiveInject(PLATFORM_ID), \u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(NgZone), \u0275\u0275directiveInject(PrimeNGConfig), \u0275\u0275directiveInject(Renderer2), \u0275\u0275directiveInject(ChangeDetectorRef));
};
Tooltip.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
  type: Tooltip,
  selectors: [["", "pTooltip", ""]],
  hostAttrs: [1, "p-element"],
  hostBindings: function Tooltip_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("keydown.escape", function Tooltip_keydown_escape_HostBindingHandler($event) {
        return ctx.onPressEscape($event);
      }, false, \u0275\u0275resolveDocument);
    }
  },
  inputs: {
    tooltipPosition: "tooltipPosition",
    tooltipEvent: "tooltipEvent",
    appendTo: "appendTo",
    positionStyle: "positionStyle",
    tooltipStyleClass: "tooltipStyleClass",
    tooltipZIndex: "tooltipZIndex",
    escape: "escape",
    showDelay: "showDelay",
    hideDelay: "hideDelay",
    life: "life",
    positionTop: "positionTop",
    positionLeft: "positionLeft",
    autoHide: "autoHide",
    fitContent: "fitContent",
    hideOnEscape: "hideOnEscape",
    text: [0, "pTooltip", "text"],
    disabled: [0, "tooltipDisabled", "disabled"],
    tooltipOptions: "tooltipOptions"
  },
  standalone: false,
  features: [\u0275\u0275NgOnChangesFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Tooltip, [{
    type: Directive,
    args: [{
      selector: "[pTooltip]",
      host: {
        class: "p-element"
      }
    }]
  }], function() {
    return [{
      type: void 0,
      decorators: [{
        type: Inject,
        args: [PLATFORM_ID]
      }]
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }, {
      type: PrimeNGConfig
    }, {
      type: Renderer2
    }, {
      type: ChangeDetectorRef
    }];
  }, {
    tooltipPosition: [{
      type: Input
    }],
    tooltipEvent: [{
      type: Input
    }],
    appendTo: [{
      type: Input
    }],
    positionStyle: [{
      type: Input
    }],
    tooltipStyleClass: [{
      type: Input
    }],
    tooltipZIndex: [{
      type: Input
    }],
    escape: [{
      type: Input
    }],
    showDelay: [{
      type: Input
    }],
    hideDelay: [{
      type: Input
    }],
    life: [{
      type: Input
    }],
    positionTop: [{
      type: Input
    }],
    positionLeft: [{
      type: Input
    }],
    autoHide: [{
      type: Input
    }],
    fitContent: [{
      type: Input
    }],
    hideOnEscape: [{
      type: Input
    }],
    text: [{
      type: Input,
      args: ["pTooltip"]
    }],
    disabled: [{
      type: Input,
      args: ["tooltipDisabled"]
    }],
    tooltipOptions: [{
      type: Input
    }],
    onPressEscape: [{
      type: HostListener,
      args: ["document:keydown.escape", ["$event"]]
    }]
  });
})();
var TooltipModule = class {
};
TooltipModule.\u0275fac = function TooltipModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || TooltipModule)();
};
TooltipModule.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: TooltipModule,
  declarations: [Tooltip],
  imports: [CommonModule],
  exports: [Tooltip]
});
TooltipModule.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
  imports: [CommonModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TooltipModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      exports: [Tooltip],
      declarations: [Tooltip]
    }]
  }], null, null);
})();

// node_modules/primeng/fesm2020/primeng-icons-search.mjs
var SearchIcon = class extends BaseIcon {
};
SearchIcon.\u0275fac = /* @__PURE__ */ (() => {
  let \u0275SearchIcon_BaseFactory;
  return function SearchIcon_Factory(__ngFactoryType__) {
    return (\u0275SearchIcon_BaseFactory || (\u0275SearchIcon_BaseFactory = \u0275\u0275getInheritedFactory(SearchIcon)))(__ngFactoryType__ || SearchIcon);
  };
})();
SearchIcon.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
  type: SearchIcon,
  selectors: [["SearchIcon"]],
  features: [\u0275\u0275InheritDefinitionFeature],
  decls: 6,
  vars: 5,
  consts: [["width", "14", "height", "14", "viewBox", "0 0 14 14", "fill", "none", "xmlns", "http://www.w3.org/2000/svg"], ["clip-path", "url(#clip0_238_9909)"], ["fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M2.67602 11.0265C3.6661 11.688 4.83011 12.0411 6.02086 12.0411C6.81149 12.0411 7.59438 11.8854 8.32483 11.5828C8.87005 11.357 9.37808 11.0526 9.83317 10.6803L12.9769 13.8241C13.0323 13.8801 13.0983 13.9245 13.171 13.9548C13.2438 13.985 13.3219 14.0003 13.4007 14C13.4795 14.0003 13.5575 13.985 13.6303 13.9548C13.7031 13.9245 13.7691 13.8801 13.8244 13.8241C13.9367 13.7116 13.9998 13.5592 13.9998 13.4003C13.9998 13.2414 13.9367 13.089 13.8244 12.9765L10.6807 9.8328C11.053 9.37773 11.3573 8.86972 11.5831 8.32452C11.8857 7.59408 12.0414 6.81119 12.0414 6.02056C12.0414 4.8298 11.6883 3.66579 11.0268 2.67572C10.3652 1.68564 9.42494 0.913972 8.32483 0.45829C7.22472 0.00260857 6.01418 -0.116618 4.84631 0.115686C3.67844 0.34799 2.60568 0.921393 1.76369 1.76338C0.921698 2.60537 0.348296 3.67813 0.115991 4.84601C-0.116313 6.01388 0.00291375 7.22441 0.458595 8.32452C0.914277 9.42464 1.68595 10.3649 2.67602 11.0265ZM3.35565 2.0158C4.14456 1.48867 5.07206 1.20731 6.02086 1.20731C7.29317 1.20731 8.51338 1.71274 9.41304 2.6124C10.3127 3.51206 10.8181 4.73226 10.8181 6.00457C10.8181 6.95337 10.5368 7.88088 10.0096 8.66978C9.48251 9.45868 8.73328 10.0736 7.85669 10.4367C6.98011 10.7997 6.01554 10.8947 5.08496 10.7096C4.15439 10.5245 3.2996 10.0676 2.62869 9.39674C1.95778 8.72583 1.50089 7.87104 1.31579 6.94046C1.13068 6.00989 1.22568 5.04532 1.58878 4.16874C1.95187 3.29215 2.56675 2.54292 3.35565 2.0158Z", "fill", "currentColor"], ["id", "clip0_238_9909"], ["width", "14", "height", "14", "fill", "white"]],
  template: function SearchIcon_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(0, "svg", 0)(1, "g", 1);
      \u0275\u0275element(2, "path", 2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "defs")(4, "clipPath", 3);
      \u0275\u0275element(5, "rect", 4);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275classMap(ctx.getClassNames());
      \u0275\u0275attribute("aria-label", ctx.ariaLabel)("aria-hidden", ctx.ariaHidden)("role", ctx.role);
    }
  },
  encapsulation: 2
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SearchIcon, [{
    type: Component,
    args: [{
      selector: "SearchIcon",
      standalone: true,
      imports: [BaseIcon],
      template: `
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" [attr.aria-label]="ariaLabel" [attr.aria-hidden]="ariaHidden" [attr.role]="role" [class]="getClassNames()">
            <g clip-path="url(#clip0_238_9909)">
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2.67602 11.0265C3.6661 11.688 4.83011 12.0411 6.02086 12.0411C6.81149 12.0411 7.59438 11.8854 8.32483 11.5828C8.87005 11.357 9.37808 11.0526 9.83317 10.6803L12.9769 13.8241C13.0323 13.8801 13.0983 13.9245 13.171 13.9548C13.2438 13.985 13.3219 14.0003 13.4007 14C13.4795 14.0003 13.5575 13.985 13.6303 13.9548C13.7031 13.9245 13.7691 13.8801 13.8244 13.8241C13.9367 13.7116 13.9998 13.5592 13.9998 13.4003C13.9998 13.2414 13.9367 13.089 13.8244 12.9765L10.6807 9.8328C11.053 9.37773 11.3573 8.86972 11.5831 8.32452C11.8857 7.59408 12.0414 6.81119 12.0414 6.02056C12.0414 4.8298 11.6883 3.66579 11.0268 2.67572C10.3652 1.68564 9.42494 0.913972 8.32483 0.45829C7.22472 0.00260857 6.01418 -0.116618 4.84631 0.115686C3.67844 0.34799 2.60568 0.921393 1.76369 1.76338C0.921698 2.60537 0.348296 3.67813 0.115991 4.84601C-0.116313 6.01388 0.00291375 7.22441 0.458595 8.32452C0.914277 9.42464 1.68595 10.3649 2.67602 11.0265ZM3.35565 2.0158C4.14456 1.48867 5.07206 1.20731 6.02086 1.20731C7.29317 1.20731 8.51338 1.71274 9.41304 2.6124C10.3127 3.51206 10.8181 4.73226 10.8181 6.00457C10.8181 6.95337 10.5368 7.88088 10.0096 8.66978C9.48251 9.45868 8.73328 10.0736 7.85669 10.4367C6.98011 10.7997 6.01554 10.8947 5.08496 10.7096C4.15439 10.5245 3.2996 10.0676 2.62869 9.39674C1.95778 8.72583 1.50089 7.87104 1.31579 6.94046C1.13068 6.00989 1.22568 5.04532 1.58878 4.16874C1.95187 3.29215 2.56675 2.54292 3.35565 2.0158Z"
                    fill="currentColor"
                />
            </g>
            <defs>
                <clipPath id="clip0_238_9909">
                    <rect width="14" height="14" fill="white" />
                </clipPath>
            </defs>
        </svg>
    `
    }]
  }], null, null);
})();

// node_modules/primeng/fesm2020/primeng-dropdown.mjs
var _c03 = (a0) => ({
  height: a0
});
var _c13 = (a0, a1) => ({
  "p-dropdown-item": true,
  "p-highlight": a0,
  "p-disabled": a1
});
var _c23 = (a0) => ({
  $implicit: a0
});
function DropdownItem_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate((tmp_1_0 = ctx_r0.label) !== null && tmp_1_0 !== void 0 ? tmp_1_0 : "empty");
  }
}
function DropdownItem_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
var _c33 = ["container"];
var _c43 = ["filter"];
var _c53 = ["in"];
var _c63 = ["editableInput"];
var _c73 = ["items"];
var _c82 = ["scroller"];
var _c92 = ["overlay"];
var _c102 = (a0, a1, a2, a3) => ({
  "p-dropdown p-component": true,
  "p-disabled": a0,
  "p-dropdown-open": a1,
  "p-focus": a2,
  "p-dropdown-clearable": a3
});
var _c11 = (a0) => ({
  "p-dropdown-label p-inputtext": true,
  "p-dropdown-label-empty": a0
});
var _c122 = (a0) => ({
  "p-dropdown-label p-inputtext p-placeholder": true,
  "p-dropdown-label-empty": a0
});
var _c132 = (a0) => ({
  options: a0
});
var _c14 = (a0, a1) => ({
  $implicit: a0,
  options: a1
});
var _c15 = () => ({});
var _c16 = (a0, a1) => ({
  $implicit: a0,
  selectedOption: a1
});
function Dropdown_span_5_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.label || "empty");
  }
}
function Dropdown_span_5_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function Dropdown_span_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 23);
    \u0275\u0275template(1, Dropdown_span_5_ng_container_1_Template, 2, 1, "ng-container", 18)(2, Dropdown_span_5_ng_container_2_Template, 1, 0, "ng-container", 24);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(9, _c11, ctx_r1.label == null || ctx_r1.label.length === 0))("pTooltip", ctx_r1.tooltip)("tooltipPosition", ctx_r1.tooltipPosition)("positionStyle", ctx_r1.tooltipPositionStyle)("tooltipStyleClass", ctx_r1.tooltipStyleClass);
    \u0275\u0275attribute("id", ctx_r1.labelId);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.selectedItemTemplate);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r1.selectedItemTemplate)("ngTemplateOutletContext", \u0275\u0275pureFunction1(11, _c23, ctx_r1.selectedOption));
  }
}
function Dropdown_span_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(2, _c122, ctx_r1.placeholder == null || ctx_r1.placeholder.length === 0));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.placeholder || "empty");
  }
}
function Dropdown_input_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "input", 26, 3);
    \u0275\u0275listener("input", function Dropdown_input_7_Template_input_input_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onEditableInputChange($event));
    })("focus", function Dropdown_input_7_Template_input_focus_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onEditableInputFocus($event));
    })("blur", function Dropdown_input_7_Template_input_blur_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onInputBlur($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", ctx_r1.disabled);
    \u0275\u0275attribute("maxlength", ctx_r1.maxlength)("placeholder", ctx_r1.placeholder)("aria-expanded", ctx_r1.overlayVisible);
  }
}
function Dropdown_ng_container_8_TimesIcon_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "TimesIcon", 29);
    \u0275\u0275listener("click", function Dropdown_ng_container_8_TimesIcon_1_Template_TimesIcon_click_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.clear($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275property("styleClass", "p-dropdown-clear-icon");
  }
}
function Dropdown_ng_container_8_span_2_1_ng_template_0_Template(rf, ctx) {
}
function Dropdown_ng_container_8_span_2_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, Dropdown_ng_container_8_span_2_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function Dropdown_ng_container_8_span_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 30);
    \u0275\u0275listener("click", function Dropdown_ng_container_8_span_2_Template_span_click_0_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.clear($event));
    });
    \u0275\u0275template(1, Dropdown_ng_container_8_span_2_1_Template, 1, 0, null, 31);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r1.clearIconTemplate);
  }
}
function Dropdown_ng_container_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, Dropdown_ng_container_8_TimesIcon_1_Template, 1, 1, "TimesIcon", 27)(2, Dropdown_ng_container_8_span_2_Template, 2, 1, "span", 28);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.clearIconTemplate);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.clearIconTemplate);
  }
}
function Dropdown_ng_container_10_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 34);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngClass", ctx_r1.dropdownIcon);
  }
}
function Dropdown_ng_container_10_ChevronDownIcon_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "ChevronDownIcon", 35);
  }
  if (rf & 2) {
    \u0275\u0275property("styleClass", "p-dropdown-trigger-icon");
  }
}
function Dropdown_ng_container_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, Dropdown_ng_container_10_span_1_Template, 1, 1, "span", 32)(2, Dropdown_ng_container_10_ChevronDownIcon_2_Template, 1, 1, "ChevronDownIcon", 33);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.dropdownIcon);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.dropdownIcon);
  }
}
function Dropdown_span_11_1_ng_template_0_Template(rf, ctx) {
}
function Dropdown_span_11_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, Dropdown_span_11_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function Dropdown_span_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 36);
    \u0275\u0275template(1, Dropdown_span_11_1_Template, 1, 0, null, 31);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r1.dropdownIconTemplate);
  }
}
function Dropdown_ng_template_14_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function Dropdown_ng_template_14_div_2_ng_container_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function Dropdown_ng_template_14_div_2_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, Dropdown_ng_template_14_div_2_ng_container_1_ng_container_1_Template, 1, 0, "ng-container", 24);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r1.filterTemplate)("ngTemplateOutletContext", \u0275\u0275pureFunction1(2, _c132, ctx_r1.filterOptions));
  }
}
function Dropdown_ng_template_14_div_2_ng_template_2_SearchIcon_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "SearchIcon", 35);
  }
  if (rf & 2) {
    \u0275\u0275property("styleClass", "p-dropdown-filter-icon");
  }
}
function Dropdown_ng_template_14_div_2_ng_template_2_span_4_1_ng_template_0_Template(rf, ctx) {
}
function Dropdown_ng_template_14_div_2_ng_template_2_span_4_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, Dropdown_ng_template_14_div_2_ng_template_2_span_4_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function Dropdown_ng_template_14_div_2_ng_template_2_span_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 46);
    \u0275\u0275template(1, Dropdown_ng_template_14_div_2_ng_template_2_span_4_1_Template, 1, 0, null, 31);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r1.filterIconTemplate);
  }
}
function Dropdown_ng_template_14_div_2_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 43)(1, "input", 44, 6);
    \u0275\u0275listener("keydown.enter", function Dropdown_ng_template_14_div_2_ng_template_2_Template_input_keydown_enter_1_listener($event) {
      \u0275\u0275restoreView(_r7);
      return \u0275\u0275resetView($event.preventDefault());
    })("keydown", function Dropdown_ng_template_14_div_2_ng_template_2_Template_input_keydown_1_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.onKeydown($event, false));
    })("input", function Dropdown_ng_template_14_div_2_ng_template_2_Template_input_input_1_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.onFilterInputChange($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, Dropdown_ng_template_14_div_2_ng_template_2_SearchIcon_3_Template, 1, 1, "SearchIcon", 33)(4, Dropdown_ng_template_14_div_2_ng_template_2_span_4_Template, 2, 1, "span", 45);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx_r1.filterValue || "");
    \u0275\u0275attribute("placeholder", ctx_r1.filterPlaceholder)("aria-label", ctx_r1.ariaFilterLabel)("aria-activedescendant", ctx_r1.overlayVisible ? "p-highlighted-option" : ctx_r1.labelId);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", !ctx_r1.filterIconTemplate);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.filterIconTemplate);
  }
}
function Dropdown_ng_template_14_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 41);
    \u0275\u0275listener("click", function Dropdown_ng_template_14_div_2_Template_div_click_0_listener($event) {
      \u0275\u0275restoreView(_r6);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275template(1, Dropdown_ng_template_14_div_2_ng_container_1_Template, 2, 4, "ng-container", 42)(2, Dropdown_ng_template_14_div_2_ng_template_2_Template, 5, 6, "ng-template", null, 5, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const builtInFilterElement_r8 = \u0275\u0275reference(3);
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.filterTemplate)("ngIfElse", builtInFilterElement_r8);
  }
}
function Dropdown_ng_template_14_p_scroller_4_ng_template_2_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function Dropdown_ng_template_14_p_scroller_4_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, Dropdown_ng_template_14_p_scroller_4_ng_template_2_ng_container_0_Template, 1, 0, "ng-container", 24);
  }
  if (rf & 2) {
    const items_r10 = ctx.$implicit;
    const scrollerOptions_r11 = ctx.options;
    \u0275\u0275nextContext(2);
    const buildInItems_r12 = \u0275\u0275reference(7);
    \u0275\u0275property("ngTemplateOutlet", buildInItems_r12)("ngTemplateOutletContext", \u0275\u0275pureFunction2(2, _c14, items_r10, scrollerOptions_r11));
  }
}
function Dropdown_ng_template_14_p_scroller_4_ng_container_3_ng_template_1_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function Dropdown_ng_template_14_p_scroller_4_ng_container_3_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, Dropdown_ng_template_14_p_scroller_4_ng_container_3_ng_template_1_ng_container_0_Template, 1, 0, "ng-container", 24);
  }
  if (rf & 2) {
    const scrollerOptions_r13 = ctx.options;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275property("ngTemplateOutlet", ctx_r1.loaderTemplate)("ngTemplateOutletContext", \u0275\u0275pureFunction1(2, _c132, scrollerOptions_r13));
  }
}
function Dropdown_ng_template_14_p_scroller_4_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, Dropdown_ng_template_14_p_scroller_4_ng_container_3_ng_template_1_Template, 1, 4, "ng-template", 48);
    \u0275\u0275elementContainerEnd();
  }
}
function Dropdown_ng_template_14_p_scroller_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p-scroller", 47, 7);
    \u0275\u0275listener("onLazyLoad", function Dropdown_ng_template_14_p_scroller_4_Template_p_scroller_onLazyLoad_0_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onLazyLoad.emit($event));
    });
    \u0275\u0275template(2, Dropdown_ng_template_14_p_scroller_4_ng_template_2_Template, 1, 5, "ng-template", 22)(3, Dropdown_ng_template_14_p_scroller_4_ng_container_3_Template, 2, 0, "ng-container", 18);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275styleMap(\u0275\u0275pureFunction1(8, _c03, ctx_r1.scrollHeight));
    \u0275\u0275property("items", ctx_r1.optionsToDisplay)("itemSize", ctx_r1.virtualScrollItemSize || ctx_r1._itemSize)("autoSize", true)("lazy", ctx_r1.lazy)("options", ctx_r1.virtualScrollOptions);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.loaderTemplate);
  }
}
function Dropdown_ng_template_14_ng_container_5_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function Dropdown_ng_template_14_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, Dropdown_ng_template_14_ng_container_5_ng_container_1_Template, 1, 0, "ng-container", 24);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const buildInItems_r12 = \u0275\u0275reference(7);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", buildInItems_r12)("ngTemplateOutletContext", \u0275\u0275pureFunction2(3, _c14, ctx_r1.optionsToDisplay, \u0275\u0275pureFunction0(2, _c15)));
  }
}
function Dropdown_ng_template_14_ng_template_6_ng_container_2_ng_template_1_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const optgroup_r14 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.getOptionGroupLabel(optgroup_r14) || "empty");
  }
}
function Dropdown_ng_template_14_ng_template_6_ng_container_2_ng_template_1_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function Dropdown_ng_template_14_ng_template_6_ng_container_2_ng_template_1_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function Dropdown_ng_template_14_ng_template_6_ng_container_2_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 52);
    \u0275\u0275template(1, Dropdown_ng_template_14_ng_template_6_ng_container_2_ng_template_1_span_1_Template, 2, 1, "span", 18)(2, Dropdown_ng_template_14_ng_template_6_ng_container_2_ng_template_1_ng_container_2_Template, 1, 0, "ng-container", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, Dropdown_ng_template_14_ng_template_6_ng_container_2_ng_template_1_ng_container_3_Template, 1, 0, "ng-container", 24);
  }
  if (rf & 2) {
    const optgroup_r14 = ctx.$implicit;
    const scrollerOptions_r15 = \u0275\u0275nextContext(2).options;
    const itemslist_r16 = \u0275\u0275reference(5);
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngStyle", \u0275\u0275pureFunction1(6, _c03, scrollerOptions_r15.itemSize + "px"));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.groupTemplate);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r1.groupTemplate)("ngTemplateOutletContext", \u0275\u0275pureFunction1(8, _c23, optgroup_r14));
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", itemslist_r16)("ngTemplateOutletContext", \u0275\u0275pureFunction2(10, _c16, ctx_r1.getOptionGroupChildren(optgroup_r14), ctx_r1.selectedOption));
  }
}
function Dropdown_ng_template_14_ng_template_6_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, Dropdown_ng_template_14_ng_template_6_ng_container_2_ng_template_1_Template, 4, 13, "ng-template", 51);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const items_r17 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", items_r17);
  }
}
function Dropdown_ng_template_14_ng_template_6_ng_container_3_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function Dropdown_ng_template_14_ng_template_6_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, Dropdown_ng_template_14_ng_template_6_ng_container_3_ng_container_1_Template, 1, 0, "ng-container", 24);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const items_r17 = \u0275\u0275nextContext().$implicit;
    const itemslist_r16 = \u0275\u0275reference(5);
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", itemslist_r16)("ngTemplateOutletContext", \u0275\u0275pureFunction2(2, _c16, items_r17, ctx_r1.selectedOption));
  }
}
function Dropdown_ng_template_14_ng_template_6_ng_template_4_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p-dropdownItem", 53);
    \u0275\u0275listener("onClick", function Dropdown_ng_template_14_ng_template_6_ng_template_4_ng_template_0_Template_p_dropdownItem_onClick_0_listener($event) {
      \u0275\u0275restoreView(_r18);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.onItemClick($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const option_r19 = ctx.$implicit;
    const selectedOption_r20 = \u0275\u0275nextContext().selectedOption;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("option", option_r19)("selected", selectedOption_r20 == option_r19)("label", ctx_r1.getOptionLabel(option_r19))("disabled", ctx_r1.isOptionDisabled(option_r19))("template", ctx_r1.itemTemplate);
  }
}
function Dropdown_ng_template_14_ng_template_6_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, Dropdown_ng_template_14_ng_template_6_ng_template_4_ng_template_0_Template, 1, 5, "ng-template", 51);
  }
  if (rf & 2) {
    const options_r21 = ctx.$implicit;
    \u0275\u0275property("ngForOf", options_r21);
  }
}
function Dropdown_ng_template_14_ng_template_6_li_6_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.emptyFilterMessageLabel, " ");
  }
}
function Dropdown_ng_template_14_ng_template_6_li_6_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0, null, 10);
  }
}
function Dropdown_ng_template_14_ng_template_6_li_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 54);
    \u0275\u0275template(1, Dropdown_ng_template_14_ng_template_6_li_6_ng_container_1_Template, 2, 1, "ng-container", 42)(2, Dropdown_ng_template_14_ng_template_6_li_6_ng_container_2_Template, 2, 0, "ng-container", 31);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const scrollerOptions_r15 = \u0275\u0275nextContext().options;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngStyle", \u0275\u0275pureFunction1(4, _c03, scrollerOptions_r15.itemSize + "px"));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.emptyFilterTemplate && !ctx_r1.emptyTemplate)("ngIfElse", ctx_r1.emptyFilter);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r1.emptyFilterTemplate || ctx_r1.emptyTemplate);
  }
}
function Dropdown_ng_template_14_ng_template_6_li_7_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.emptyMessageLabel, " ");
  }
}
function Dropdown_ng_template_14_ng_template_6_li_7_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0, null, 11);
  }
}
function Dropdown_ng_template_14_ng_template_6_li_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 54);
    \u0275\u0275template(1, Dropdown_ng_template_14_ng_template_6_li_7_ng_container_1_Template, 2, 1, "ng-container", 42)(2, Dropdown_ng_template_14_ng_template_6_li_7_ng_container_2_Template, 2, 0, "ng-container", 31);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const scrollerOptions_r15 = \u0275\u0275nextContext().options;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngStyle", \u0275\u0275pureFunction1(4, _c03, scrollerOptions_r15.itemSize + "px"));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.emptyTemplate)("ngIfElse", ctx_r1.empty);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r1.emptyTemplate);
  }
}
function Dropdown_ng_template_14_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 49, 8);
    \u0275\u0275template(2, Dropdown_ng_template_14_ng_template_6_ng_container_2_Template, 2, 1, "ng-container", 18)(3, Dropdown_ng_template_14_ng_template_6_ng_container_3_Template, 2, 5, "ng-container", 18)(4, Dropdown_ng_template_14_ng_template_6_ng_template_4_Template, 1, 1, "ng-template", null, 9, \u0275\u0275templateRefExtractor)(6, Dropdown_ng_template_14_ng_template_6_li_6_Template, 3, 6, "li", 50)(7, Dropdown_ng_template_14_ng_template_6_li_7_Template, 3, 6, "li", 50);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const scrollerOptions_r15 = ctx.options;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275styleMap(scrollerOptions_r15.contentStyle);
    \u0275\u0275property("ngClass", scrollerOptions_r15.contentStyleClass);
    \u0275\u0275attribute("id", ctx_r1.listId);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.group);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.group);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.filterValue && ctx_r1.isEmpty());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.filterValue && ctx_r1.isEmpty());
  }
}
function Dropdown_ng_template_14_ng_container_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function Dropdown_ng_template_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 37);
    \u0275\u0275template(1, Dropdown_ng_template_14_ng_container_1_Template, 1, 0, "ng-container", 31)(2, Dropdown_ng_template_14_div_2_Template, 4, 2, "div", 38);
    \u0275\u0275elementStart(3, "div", 39);
    \u0275\u0275template(4, Dropdown_ng_template_14_p_scroller_4_Template, 4, 10, "p-scroller", 40)(5, Dropdown_ng_template_14_ng_container_5_Template, 2, 6, "ng-container", 18)(6, Dropdown_ng_template_14_ng_template_6_Template, 8, 8, "ng-template", null, 4, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
    \u0275\u0275template(8, Dropdown_ng_template_14_ng_container_8_Template, 1, 0, "ng-container", 31);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r1.panelStyleClass);
    \u0275\u0275property("ngClass", "p-dropdown-panel p-component")("ngStyle", ctx_r1.panelStyle);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r1.headerTemplate);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.filter);
    \u0275\u0275advance();
    \u0275\u0275styleProp("max-height", ctx_r1.virtualScroll ? "auto" : ctx_r1.scrollHeight || "auto");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.virtualScroll);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.virtualScroll);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngTemplateOutlet", ctx_r1.footerTemplate);
  }
}
var DROPDOWN_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => Dropdown),
  multi: true
};
var DropdownItem = class {
  constructor() {
    this.onClick = new EventEmitter();
  }
  onOptionClick(event) {
    this.onClick.emit({
      originalEvent: event,
      option: this.option
    });
  }
};
DropdownItem.\u0275fac = function DropdownItem_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || DropdownItem)();
};
DropdownItem.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
  type: DropdownItem,
  selectors: [["p-dropdownItem"]],
  hostAttrs: [1, "p-element"],
  inputs: {
    option: "option",
    selected: "selected",
    label: "label",
    disabled: "disabled",
    visible: "visible",
    itemSize: "itemSize",
    template: "template"
  },
  outputs: {
    onClick: "onClick"
  },
  standalone: false,
  decls: 3,
  vars: 15,
  consts: [["role", "option", "pRipple", "", 3, "click", "ngStyle", "id", "ngClass"], [4, "ngIf"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"]],
  template: function DropdownItem_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "li", 0);
      \u0275\u0275listener("click", function DropdownItem_Template_li_click_0_listener($event) {
        return ctx.onOptionClick($event);
      });
      \u0275\u0275template(1, DropdownItem_span_1_Template, 2, 1, "span", 1)(2, DropdownItem_ng_container_2_Template, 1, 0, "ng-container", 2);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275property("ngStyle", \u0275\u0275pureFunction1(8, _c03, ctx.itemSize + "px"))("id", ctx.selected ? "p-highlighted-option" : "")("ngClass", \u0275\u0275pureFunction2(10, _c13, ctx.selected, ctx.disabled));
      \u0275\u0275attribute("aria-label", ctx.label)("aria-selected", ctx.selected);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.template);
      \u0275\u0275advance();
      \u0275\u0275property("ngTemplateOutlet", ctx.template)("ngTemplateOutletContext", \u0275\u0275pureFunction1(13, _c23, ctx.option));
    }
  },
  dependencies: [NgClass, NgIf, NgTemplateOutlet, NgStyle, Ripple],
  encapsulation: 2
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DropdownItem, [{
    type: Component,
    args: [{
      selector: "p-dropdownItem",
      template: `
        <li
            (click)="onOptionClick($event)"
            role="option"
            pRipple
            [attr.aria-label]="label"
            [attr.aria-selected]="selected"
            [ngStyle]="{ height: itemSize + 'px' }"
            [id]="selected ? 'p-highlighted-option' : ''"
            [ngClass]="{ 'p-dropdown-item': true, 'p-highlight': selected, 'p-disabled': disabled }"
        >
            <span *ngIf="!template">{{ label ?? 'empty' }}</span>
            <ng-container *ngTemplateOutlet="template; context: { $implicit: option }"></ng-container>
        </li>
    `,
      host: {
        class: "p-element"
      }
    }]
  }], null, {
    option: [{
      type: Input
    }],
    selected: [{
      type: Input
    }],
    label: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    visible: [{
      type: Input
    }],
    itemSize: [{
      type: Input
    }],
    template: [{
      type: Input
    }],
    onClick: [{
      type: Output
    }]
  });
})();
var Dropdown = class {
  constructor(el, renderer, cd, zone, filterService, config) {
    this.el = el;
    this.renderer = renderer;
    this.cd = cd;
    this.zone = zone;
    this.filterService = filterService;
    this.config = config;
    this.scrollHeight = "200px";
    this.resetFilterOnHide = false;
    this.optionGroupChildren = "items";
    this.autoDisplayFirst = true;
    this.emptyFilterMessage = "";
    this.emptyMessage = "";
    this.lazy = false;
    this.filterMatchMode = "contains";
    this.tooltip = "";
    this.tooltipPosition = "right";
    this.tooltipPositionStyle = "absolute";
    this.autofocusFilter = true;
    this.overlayDirection = "end";
    this.onChange = new EventEmitter();
    this.onFilter = new EventEmitter();
    this.onFocus = new EventEmitter();
    this.onBlur = new EventEmitter();
    this.onClick = new EventEmitter();
    this.onShow = new EventEmitter();
    this.onHide = new EventEmitter();
    this.onClear = new EventEmitter();
    this.onLazyLoad = new EventEmitter();
    this.onModelChange = () => {
    };
    this.onModelTouched = () => {
    };
    this.id = UniqueComponentId();
  }
  get disabled() {
    return this._disabled;
  }
  set disabled(_disabled) {
    if (_disabled) {
      this.focused = false;
      if (this.overlayVisible) this.hide();
    }
    this._disabled = _disabled;
    if (!this.cd.destroyed) {
      this.cd.detectChanges();
    }
  }
  get itemSize() {
    return this._itemSize;
  }
  set itemSize(val) {
    this._itemSize = val;
    console.warn("The itemSize property is deprecated, use virtualScrollItemSize property instead.");
  }
  get autoZIndex() {
    return this._autoZIndex;
  }
  set autoZIndex(val) {
    this._autoZIndex = val;
    console.warn("The autoZIndex property is deprecated since v14.2.0, use overlayOptions property instead.");
  }
  get baseZIndex() {
    return this._baseZIndex;
  }
  set baseZIndex(val) {
    this._baseZIndex = val;
    console.warn("The baseZIndex property is deprecated since v14.2.0, use overlayOptions property instead.");
  }
  get showTransitionOptions() {
    return this._showTransitionOptions;
  }
  set showTransitionOptions(val) {
    this._showTransitionOptions = val;
    console.warn("The showTransitionOptions property is deprecated since v14.2.0, use overlayOptions property instead.");
  }
  get hideTransitionOptions() {
    return this._hideTransitionOptions;
  }
  set hideTransitionOptions(val) {
    this._hideTransitionOptions = val;
    console.warn("The hideTransitionOptions property is deprecated since v14.2.0, use overlayOptions property instead.");
  }
  ngAfterContentInit() {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case "item":
          this.itemTemplate = item.template;
          break;
        case "selectedItem":
          this.selectedItemTemplate = item.template;
          break;
        case "header":
          this.headerTemplate = item.template;
          break;
        case "filter":
          this.filterTemplate = item.template;
          break;
        case "footer":
          this.footerTemplate = item.template;
          break;
        case "emptyfilter":
          this.emptyFilterTemplate = item.template;
          break;
        case "empty":
          this.emptyTemplate = item.template;
          break;
        case "group":
          this.groupTemplate = item.template;
          break;
        case "loader":
          this.loaderTemplate = item.template;
          break;
        case "dropdownicon":
          this.dropdownIconTemplate = item.template;
          break;
        case "clearicon":
          this.clearIconTemplate = item.template;
          break;
        case "filtericon":
          this.filterIconTemplate = item.template;
          break;
        default:
          this.itemTemplate = item.template;
          break;
      }
    });
  }
  ngOnInit() {
    this.optionsToDisplay = this.options;
    this.updateSelectedOption(null);
    this.labelId = this.id + "_label";
    this.listId = this.id + "_list";
    if (this.filterBy) {
      this.filterOptions = {
        filter: (value) => this.onFilterInputChange(value),
        reset: () => this.resetFilter()
      };
    }
  }
  get options() {
    return this._options;
  }
  set options(val) {
    this._options = val;
    this.optionsToDisplay = this._options;
    this.updateSelectedOption(this.value);
    this.selectedOption = this.findOption(this.value, this.optionsToDisplay);
    if (!this.selectedOption && ObjectUtils.isNotEmpty(this.value) && !this.editable) {
      this.value = null;
      this.onModelChange(this.value);
    }
    this.optionsChanged = true;
    if (this._filterValue && this._filterValue.length) {
      this.activateFilter();
    }
  }
  get filterValue() {
    return this._filterValue;
  }
  set filterValue(val) {
    this._filterValue = val;
    this.activateFilter();
  }
  ngAfterViewInit() {
    if (this.editable) {
      this.updateEditableLabel();
    }
  }
  get label() {
    if (typeof this.selectedOption === "number") {
      this.selectedOption = this.selectedOption.toString();
    }
    return this.selectedOption ? this.getOptionLabel(this.selectedOption) : null;
  }
  get emptyMessageLabel() {
    return this.emptyMessage || this.config.getTranslation(TranslationKeys.EMPTY_MESSAGE);
  }
  get emptyFilterMessageLabel() {
    return this.emptyFilterMessage || this.config.getTranslation(TranslationKeys.EMPTY_FILTER_MESSAGE);
  }
  get filled() {
    if (typeof this.value === "string") return !!this.value;
    return this.value || this.value != null || this.value != void 0;
  }
  get isVisibleClearIcon() {
    return this.value != null && this.value !== "" && this.showClear && !this.disabled;
  }
  updateEditableLabel() {
    if (this.editableInputViewChild && this.editableInputViewChild.nativeElement) {
      this.editableInputViewChild.nativeElement.value = this.selectedOption ? this.getOptionLabel(this.selectedOption) : this.value || "";
    }
  }
  getOptionLabel(option) {
    return this.optionLabel ? ObjectUtils.resolveFieldData(option, this.optionLabel) : option && option.label !== void 0 ? option.label : option;
  }
  getOptionValue(option) {
    return this.optionValue ? ObjectUtils.resolveFieldData(option, this.optionValue) : !this.optionLabel && option && option.value !== void 0 ? option.value : option;
  }
  isOptionDisabled(option) {
    return this.optionDisabled ? ObjectUtils.resolveFieldData(option, this.optionDisabled) : option && option.disabled !== void 0 ? option.disabled : false;
  }
  getOptionGroupLabel(optionGroup) {
    return this.optionGroupLabel ? ObjectUtils.resolveFieldData(optionGroup, this.optionGroupLabel) : optionGroup && optionGroup.label !== void 0 ? optionGroup.label : optionGroup;
  }
  getOptionGroupChildren(optionGroup) {
    return this.optionGroupChildren ? ObjectUtils.resolveFieldData(optionGroup, this.optionGroupChildren) : optionGroup.items;
  }
  onItemClick(event) {
    const option = event.option;
    if (!this.isOptionDisabled(option)) {
      this.selectItem(event.originalEvent, option);
      this.accessibleViewChild.nativeElement.focus({
        preventScroll: true
      });
    }
    setTimeout(() => {
      this.hide();
    }, 1);
  }
  selectItem(event, option) {
    if (this.selectedOption != option) {
      this.selectedOption = option;
      this.value = this.getOptionValue(option);
      this.onModelChange(this.value);
      this.updateEditableLabel();
      this.onChange.emit({
        originalEvent: event,
        value: this.value
      });
    }
  }
  ngAfterViewChecked() {
    if (this.optionsChanged && this.overlayVisible) {
      this.optionsChanged = false;
      this.zone.runOutsideAngular(() => {
        setTimeout(() => {
          if (this.overlayViewChild) {
            this.overlayViewChild.alignOverlay();
          }
        }, 1);
      });
    }
    if (this.selectedOptionUpdated && this.itemsWrapper) {
      let selectedItem = DomHandler.findSingle(this.overlayViewChild.overlayViewChild.nativeElement, "li.p-highlight");
      if (selectedItem) {
        DomHandler.scrollInView(this.itemsWrapper, selectedItem);
      }
      this.selectedOptionUpdated = false;
    }
  }
  writeValue(value) {
    if (this.filter) {
      this.resetFilter();
    }
    this.value = value;
    this.updateSelectedOption(value);
    this.updateEditableLabel();
    this.cd.markForCheck();
  }
  resetFilter() {
    this._filterValue = null;
    if (this.filterViewChild && this.filterViewChild.nativeElement) {
      this.filterViewChild.nativeElement.value = "";
    }
    this.optionsToDisplay = this.options;
  }
  updateSelectedOption(val) {
    this.selectedOption = this.findOption(val, this.optionsToDisplay);
    if (this.autoDisplayFirst && !this.placeholder && !this.selectedOption && this.optionsToDisplay && this.optionsToDisplay.length && !this.editable) {
      if (this.group) {
        this.selectedOption = this.optionsToDisplay[0].items[0];
      } else {
        this.selectedOption = this.optionsToDisplay[0];
      }
      this.value = this.getOptionValue(this.selectedOption);
      this.onModelChange(this.value);
    }
    this.selectedOptionUpdated = true;
  }
  registerOnChange(fn) {
    this.onModelChange = fn;
  }
  registerOnTouched(fn) {
    this.onModelTouched = fn;
  }
  setDisabledState(val) {
    this.disabled = val;
    this.cd.markForCheck();
  }
  onMouseclick(event) {
    if (this.disabled || this.readonly || this.isInputClick(event)) {
      return;
    }
    this.onClick.emit(event);
    this.accessibleViewChild.nativeElement.focus({
      preventScroll: true
    });
    if (this.overlayVisible) this.hide();
    else this.show();
    this.cd.detectChanges();
  }
  isInputClick(event) {
    return DomHandler.hasClass(event.target, "p-dropdown-clear-icon") || event.target.isSameNode(this.accessibleViewChild.nativeElement) || this.editableInputViewChild && event.target.isSameNode(this.editableInputViewChild.nativeElement);
  }
  isEmpty() {
    return !this.optionsToDisplay || this.optionsToDisplay && this.optionsToDisplay.length === 0;
  }
  onEditableInputFocus(event) {
    this.focused = true;
    this.hide();
    this.onFocus.emit(event);
  }
  onEditableInputChange(event) {
    this.value = event.target.value;
    this.updateSelectedOption(this.value);
    this.onModelChange(this.value);
    this.onChange.emit({
      originalEvent: event,
      value: this.value
    });
  }
  show() {
    this.overlayVisible = true;
    this.cd.markForCheck();
  }
  onOverlayAnimationStart(event) {
    if (event.toState === "visible") {
      this.itemsWrapper = DomHandler.findSingle(this.overlayViewChild.overlayViewChild.nativeElement, this.virtualScroll ? ".p-scroller" : ".p-dropdown-items-wrapper");
      this.virtualScroll && this.scroller.setContentEl(this.itemsViewChild.nativeElement);
      if (this.options && this.options.length) {
        if (this.virtualScroll) {
          const selectedIndex = this.selectedOption ? this.findOptionIndex(this.getOptionValue(this.selectedOption), this.optionsToDisplay) : -1;
          if (selectedIndex !== -1) {
            this.scroller.scrollToIndex(selectedIndex);
          }
        } else {
          let selectedListItem = DomHandler.findSingle(this.itemsWrapper, ".p-dropdown-item.p-highlight");
          if (selectedListItem) {
            selectedListItem.scrollIntoView({
              block: "nearest",
              inline: "center"
            });
          }
        }
      }
      if (this.filterViewChild && this.filterViewChild.nativeElement) {
        this.preventModelTouched = true;
        if (this.autofocusFilter) {
          this.filterViewChild.nativeElement.focus();
        }
      }
      this.onShow.emit(event);
    }
    if (event.toState === "void") {
      this.itemsWrapper = null;
      this.onModelTouched();
      this.onHide.emit(event);
    }
  }
  hide() {
    this.overlayVisible = false;
    if (this.filter && this.resetFilterOnHide) {
      this.resetFilter();
    }
    this.cd.markForCheck();
  }
  onInputFocus(event) {
    this.focused = true;
    this.onFocus.emit(event);
  }
  onInputBlur(event) {
    this.focused = false;
    this.onBlur.emit(event);
    if (!this.preventModelTouched) {
      this.onModelTouched();
    }
    this.preventModelTouched = false;
  }
  findPrevEnabledOption(index) {
    let prevEnabledOption;
    if (this.optionsToDisplay && this.optionsToDisplay.length) {
      for (let i = index - 1; 0 <= i; i--) {
        let option = this.optionsToDisplay[i];
        if (this.isOptionDisabled(option)) {
          continue;
        } else {
          prevEnabledOption = option;
          break;
        }
      }
      if (!prevEnabledOption) {
        for (let i = this.optionsToDisplay.length - 1; i >= index; i--) {
          let option = this.optionsToDisplay[i];
          if (this.isOptionDisabled(option)) {
            continue;
          } else {
            prevEnabledOption = option;
            break;
          }
        }
      }
    }
    return prevEnabledOption;
  }
  findNextEnabledOption(index) {
    let nextEnabledOption;
    if (this.optionsToDisplay && this.optionsToDisplay.length) {
      for (let i = index + 1; i < this.optionsToDisplay.length; i++) {
        let option = this.optionsToDisplay[i];
        if (this.isOptionDisabled(option)) {
          continue;
        } else {
          nextEnabledOption = option;
          break;
        }
      }
      if (!nextEnabledOption) {
        for (let i = 0; i < index; i++) {
          let option = this.optionsToDisplay[i];
          if (this.isOptionDisabled(option)) {
            continue;
          } else {
            nextEnabledOption = option;
            break;
          }
        }
      }
    }
    return nextEnabledOption;
  }
  onKeydown(event, search) {
    if (this.readonly || !this.optionsToDisplay || this.optionsToDisplay.length === null) {
      return;
    }
    switch (event.which) {
      //down
      case 40:
        if (!this.overlayVisible && event.altKey) {
          this.show();
        } else {
          if (this.group) {
            let selectedItemIndex = this.selectedOption ? this.findOptionGroupIndex(this.getOptionValue(this.selectedOption), this.optionsToDisplay) : -1;
            if (selectedItemIndex !== -1) {
              let nextItemIndex = selectedItemIndex.itemIndex + 1;
              if (nextItemIndex < this.getOptionGroupChildren(this.optionsToDisplay[selectedItemIndex.groupIndex]).length) {
                this.selectItem(event, this.getOptionGroupChildren(this.optionsToDisplay[selectedItemIndex.groupIndex])[nextItemIndex]);
                this.selectedOptionUpdated = true;
              } else if (this.optionsToDisplay[selectedItemIndex.groupIndex + 1]) {
                this.selectItem(event, this.getOptionGroupChildren(this.optionsToDisplay[selectedItemIndex.groupIndex + 1])[0]);
                this.selectedOptionUpdated = true;
              }
            } else {
              if (this.optionsToDisplay && this.optionsToDisplay.length > 0) {
                this.selectItem(event, this.getOptionGroupChildren(this.optionsToDisplay[0])[0]);
              }
            }
          } else {
            let selectedItemIndex = this.selectedOption ? this.findOptionIndex(this.getOptionValue(this.selectedOption), this.optionsToDisplay) : -1;
            let nextEnabledOption = this.findNextEnabledOption(selectedItemIndex);
            if (nextEnabledOption) {
              this.selectItem(event, nextEnabledOption);
              this.selectedOptionUpdated = true;
            }
          }
        }
        event.preventDefault();
        break;
      //up
      case 38:
        if (this.group) {
          let selectedItemIndex = this.selectedOption ? this.findOptionGroupIndex(this.getOptionValue(this.selectedOption), this.optionsToDisplay) : -1;
          if (selectedItemIndex !== -1) {
            let prevItemIndex = selectedItemIndex.itemIndex - 1;
            if (prevItemIndex >= 0) {
              this.selectItem(event, this.getOptionGroupChildren(this.optionsToDisplay[selectedItemIndex.groupIndex])[prevItemIndex]);
              this.selectedOptionUpdated = true;
            } else if (prevItemIndex < 0) {
              let prevGroup = this.optionsToDisplay[selectedItemIndex.groupIndex - 1];
              if (prevGroup) {
                this.selectItem(event, this.getOptionGroupChildren(prevGroup)[this.getOptionGroupChildren(prevGroup).length - 1]);
                this.selectedOptionUpdated = true;
              }
            }
          }
        } else {
          let selectedItemIndex = this.selectedOption ? this.findOptionIndex(this.getOptionValue(this.selectedOption), this.optionsToDisplay) : -1;
          let prevEnabledOption = this.findPrevEnabledOption(selectedItemIndex);
          if (prevEnabledOption) {
            this.selectItem(event, prevEnabledOption);
            this.selectedOptionUpdated = true;
          }
        }
        event.preventDefault();
        break;
      //space
      case 32:
        if (search) {
          if (!this.overlayVisible) {
            this.show();
          } else {
            this.hide();
          }
          event.preventDefault();
        }
        break;
      //enter
      case 13:
        if (this.overlayVisible && (!this.filter || this.optionsToDisplay && this.optionsToDisplay.length > 0)) {
          this.hide();
        } else if (!this.overlayVisible) {
          this.show();
        }
        event.preventDefault();
        break;
      //escape and tab
      case 27:
      case 9:
        this.hide();
        break;
      //search item based on keyboard input
      default:
        if (search && !event.metaKey && event.which !== 17) {
          this.search(event);
        }
        break;
    }
  }
  search(event) {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    const char = event.key;
    this.previousSearchChar = this.currentSearchChar;
    this.currentSearchChar = char;
    if (this.previousSearchChar === this.currentSearchChar) this.searchValue = this.currentSearchChar;
    else this.searchValue = this.searchValue ? this.searchValue + char : char;
    let newOption;
    if (this.group) {
      let searchIndex = this.selectedOption ? this.findOptionGroupIndex(this.getOptionValue(this.selectedOption), this.optionsToDisplay) : {
        groupIndex: 0,
        itemIndex: 0
      };
      newOption = this.searchOptionWithinGroup(searchIndex);
    } else {
      let searchIndex = this.selectedOption ? this.findOptionIndex(this.getOptionValue(this.selectedOption), this.optionsToDisplay) : -1;
      newOption = this.searchOption(++searchIndex);
    }
    if (newOption && !this.isOptionDisabled(newOption)) {
      this.selectItem(event, newOption);
      this.selectedOptionUpdated = true;
    }
    this.searchTimeout = setTimeout(() => {
      this.searchValue = null;
    }, 250);
  }
  searchOption(index) {
    let option;
    if (this.searchValue) {
      option = this.searchOptionInRange(index, this.optionsToDisplay.length);
      if (!option) {
        option = this.searchOptionInRange(0, index);
      }
    }
    return option;
  }
  searchOptionInRange(start, end) {
    for (let i = start; i < end; i++) {
      let opt = this.optionsToDisplay[i];
      if (this.getOptionLabel(opt).toLocaleLowerCase(this.filterLocale).startsWith(this.searchValue.toLocaleLowerCase(this.filterLocale)) && !this.isOptionDisabled(opt)) {
        return opt;
      }
    }
    return null;
  }
  searchOptionWithinGroup(index) {
    let option;
    if (this.searchValue) {
      for (let i = index.groupIndex; i < this.optionsToDisplay.length; i++) {
        for (let j = index.groupIndex === i ? index.itemIndex + 1 : 0; j < this.getOptionGroupChildren(this.optionsToDisplay[i]).length; j++) {
          let opt = this.getOptionGroupChildren(this.optionsToDisplay[i])[j];
          if (this.getOptionLabel(opt).toLocaleLowerCase(this.filterLocale).startsWith(this.searchValue.toLocaleLowerCase(this.filterLocale)) && !this.isOptionDisabled(opt)) {
            return opt;
          }
        }
      }
      if (!option) {
        for (let i = 0; i <= index.groupIndex; i++) {
          for (let j = 0; j < (index.groupIndex === i ? index.itemIndex : this.getOptionGroupChildren(this.optionsToDisplay[i]).length); j++) {
            let opt = this.getOptionGroupChildren(this.optionsToDisplay[i])[j];
            if (this.getOptionLabel(opt).toLocaleLowerCase(this.filterLocale).startsWith(this.searchValue.toLocaleLowerCase(this.filterLocale)) && !this.isOptionDisabled(opt)) {
              return opt;
            }
          }
        }
      }
    }
    return null;
  }
  findOptionIndex(val, opts) {
    let index = -1;
    if (opts) {
      for (let i = 0; i < opts.length; i++) {
        if (val == null && this.getOptionValue(opts[i]) == null || ObjectUtils.equals(val, this.getOptionValue(opts[i]), this.dataKey)) {
          index = i;
          break;
        }
      }
    }
    return index;
  }
  findOptionGroupIndex(val, opts) {
    let groupIndex, itemIndex;
    if (opts) {
      for (let i = 0; i < opts.length; i++) {
        groupIndex = i;
        itemIndex = this.findOptionIndex(val, this.getOptionGroupChildren(opts[i]));
        if (itemIndex !== -1) {
          break;
        }
      }
    }
    if (itemIndex !== -1) {
      return {
        groupIndex,
        itemIndex
      };
    } else {
      return -1;
    }
  }
  findOption(val, opts, inGroup) {
    if (this.group && !inGroup) {
      let opt;
      if (opts && opts.length) {
        for (let optgroup of opts) {
          opt = this.findOption(val, this.getOptionGroupChildren(optgroup), true);
          if (opt) {
            break;
          }
        }
      }
      return opt;
    } else {
      let index = this.findOptionIndex(val, opts);
      return index != -1 ? opts[index] : null;
    }
  }
  onFilterInputChange(event) {
    let inputValue = event.target.value;
    if (inputValue && inputValue.length) {
      this._filterValue = inputValue;
      this.activateFilter();
    } else {
      this._filterValue = null;
      this.optionsToDisplay = this.options;
    }
    this.virtualScroll && this.scroller.scrollToIndex(0);
    this.optionsChanged = true;
    this.onFilter.emit({
      originalEvent: event,
      filter: this._filterValue
    });
  }
  activateFilter() {
    let searchFields = (this.filterBy || this.optionLabel || "label").split(",");
    if (this.options && this.options.length) {
      if (this.group) {
        let filteredGroups = [];
        for (let optgroup of this.options) {
          let filteredSubOptions = this.filterService.filter(this.getOptionGroupChildren(optgroup), searchFields, this.filterValue, this.filterMatchMode, this.filterLocale);
          if (filteredSubOptions && filteredSubOptions.length) {
            filteredGroups.push(__spreadValues(__spreadValues({}, optgroup), {
              [this.optionGroupChildren]: filteredSubOptions
            }));
          }
        }
        this.optionsToDisplay = filteredGroups;
      } else {
        this.optionsToDisplay = this.filterService.filter(this.options, searchFields, this.filterValue, this.filterMatchMode, this.filterLocale);
      }
      this.optionsChanged = true;
    }
  }
  applyFocus() {
    if (this.editable) DomHandler.findSingle(this.el.nativeElement, ".p-dropdown-label.p-inputtext").focus();
    else DomHandler.findSingle(this.el.nativeElement, "input[readonly]").focus();
  }
  focus() {
    this.applyFocus();
  }
  clear(event) {
    this.value = null;
    this.onModelChange(this.value);
    this.onChange.emit({
      originalEvent: event,
      value: this.value
    });
    this.updateSelectedOption(this.value);
    this.updateEditableLabel();
    this.onClear.emit(event);
  }
};
Dropdown.\u0275fac = function Dropdown_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || Dropdown)(\u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(Renderer2), \u0275\u0275directiveInject(ChangeDetectorRef), \u0275\u0275directiveInject(NgZone), \u0275\u0275directiveInject(FilterService), \u0275\u0275directiveInject(PrimeNGConfig));
};
Dropdown.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
  type: Dropdown,
  selectors: [["p-dropdown"]],
  contentQueries: function Dropdown_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      \u0275\u0275contentQuery(dirIndex, PrimeTemplate, 4);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.templates = _t);
    }
  },
  viewQuery: function Dropdown_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c33, 5);
      \u0275\u0275viewQuery(_c43, 5);
      \u0275\u0275viewQuery(_c53, 5);
      \u0275\u0275viewQuery(_c63, 5);
      \u0275\u0275viewQuery(_c73, 5);
      \u0275\u0275viewQuery(_c82, 5);
      \u0275\u0275viewQuery(_c92, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.containerViewChild = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.filterViewChild = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.accessibleViewChild = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.editableInputViewChild = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.itemsViewChild = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.scroller = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.overlayViewChild = _t.first);
    }
  },
  hostAttrs: [1, "p-element", "p-inputwrapper"],
  hostVars: 4,
  hostBindings: function Dropdown_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("p-inputwrapper-filled", ctx.filled)("p-inputwrapper-focus", ctx.focused || ctx.overlayVisible);
    }
  },
  inputs: {
    scrollHeight: "scrollHeight",
    filter: "filter",
    name: "name",
    style: "style",
    panelStyle: "panelStyle",
    styleClass: "styleClass",
    panelStyleClass: "panelStyleClass",
    readonly: "readonly",
    required: "required",
    editable: "editable",
    appendTo: "appendTo",
    tabindex: "tabindex",
    placeholder: "placeholder",
    filterPlaceholder: "filterPlaceholder",
    filterLocale: "filterLocale",
    inputId: "inputId",
    selectId: "selectId",
    dataKey: "dataKey",
    filterBy: "filterBy",
    autofocus: "autofocus",
    resetFilterOnHide: "resetFilterOnHide",
    dropdownIcon: "dropdownIcon",
    optionLabel: "optionLabel",
    optionValue: "optionValue",
    optionDisabled: "optionDisabled",
    optionGroupLabel: "optionGroupLabel",
    optionGroupChildren: "optionGroupChildren",
    autoDisplayFirst: "autoDisplayFirst",
    group: "group",
    showClear: "showClear",
    emptyFilterMessage: "emptyFilterMessage",
    emptyMessage: "emptyMessage",
    lazy: "lazy",
    virtualScroll: "virtualScroll",
    virtualScrollItemSize: "virtualScrollItemSize",
    virtualScrollOptions: "virtualScrollOptions",
    overlayOptions: "overlayOptions",
    ariaFilterLabel: "ariaFilterLabel",
    ariaLabel: "ariaLabel",
    ariaLabelledBy: "ariaLabelledBy",
    filterMatchMode: "filterMatchMode",
    maxlength: "maxlength",
    tooltip: "tooltip",
    tooltipPosition: "tooltipPosition",
    tooltipPositionStyle: "tooltipPositionStyle",
    tooltipStyleClass: "tooltipStyleClass",
    autofocusFilter: "autofocusFilter",
    overlayDirection: "overlayDirection",
    disabled: "disabled",
    itemSize: "itemSize",
    autoZIndex: "autoZIndex",
    baseZIndex: "baseZIndex",
    showTransitionOptions: "showTransitionOptions",
    hideTransitionOptions: "hideTransitionOptions",
    options: "options",
    filterValue: "filterValue"
  },
  outputs: {
    onChange: "onChange",
    onFilter: "onFilter",
    onFocus: "onFocus",
    onBlur: "onBlur",
    onClick: "onClick",
    onShow: "onShow",
    onHide: "onHide",
    onClear: "onClear",
    onLazyLoad: "onLazyLoad"
  },
  standalone: false,
  features: [\u0275\u0275ProvidersFeature([DROPDOWN_VALUE_ACCESSOR])],
  decls: 15,
  vars: 33,
  consts: [["container", ""], ["in", ""], ["overlay", ""], ["editableInput", ""], ["buildInItems", ""], ["builtInFilterElement", ""], ["filter", ""], ["scroller", ""], ["items", ""], ["itemslist", ""], ["emptyFilter", ""], ["empty", ""], [3, "click", "ngClass", "ngStyle"], [1, "p-hidden-accessible"], ["type", "text", "readonly", "", "aria-haspopup", "listbox", "aria-haspopup", "listbox", "pAutoFocus", "", "role", "combobox", 3, "focus", "blur", "keydown", "disabled", "autofocus"], [3, "ngClass", "pTooltip", "tooltipPosition", "positionStyle", "tooltipStyleClass", 4, "ngIf"], [3, "ngClass", 4, "ngIf"], ["type", "text", "class", "p-dropdown-label p-inputtext", "aria-haspopup", "listbox", 3, "disabled", "input", "focus", "blur", 4, "ngIf"], [4, "ngIf"], ["role", "button", "aria-label", "dropdown trigger", "aria-haspopup", "listbox", 1, "p-dropdown-trigger"], ["class", "p-dropdown-trigger-icon", 4, "ngIf"], [3, "visibleChange", "onAnimationStart", "onHide", "visible", "options", "target", "appendTo", "autoZIndex", "baseZIndex", "showTransitionOptions", "hideTransitionOptions"], ["pTemplate", "content"], [3, "ngClass", "pTooltip", "tooltipPosition", "positionStyle", "tooltipStyleClass"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [3, "ngClass"], ["type", "text", "aria-haspopup", "listbox", 1, "p-dropdown-label", "p-inputtext", 3, "input", "focus", "blur", "disabled"], [3, "styleClass", "click", 4, "ngIf"], ["class", "p-dropdown-clear-icon", 3, "click", 4, "ngIf"], [3, "click", "styleClass"], [1, "p-dropdown-clear-icon", 3, "click"], [4, "ngTemplateOutlet"], ["class", "p-dropdown-trigger-icon", 3, "ngClass", 4, "ngIf"], [3, "styleClass", 4, "ngIf"], [1, "p-dropdown-trigger-icon", 3, "ngClass"], [3, "styleClass"], [1, "p-dropdown-trigger-icon"], [3, "ngClass", "ngStyle"], ["class", "p-dropdown-header", 3, "click", 4, "ngIf"], [1, "p-dropdown-items-wrapper"], [3, "items", "style", "itemSize", "autoSize", "lazy", "options", "onLazyLoad", 4, "ngIf"], [1, "p-dropdown-header", 3, "click"], [4, "ngIf", "ngIfElse"], [1, "p-dropdown-filter-container"], ["type", "text", "autocomplete", "off", 1, "p-dropdown-filter", "p-inputtext", "p-component", 3, "keydown.enter", "keydown", "input", "value"], ["class", "p-dropdown-filter-icon", 4, "ngIf"], [1, "p-dropdown-filter-icon"], [3, "onLazyLoad", "items", "itemSize", "autoSize", "lazy", "options"], ["pTemplate", "loader"], ["role", "listbox", 1, "p-dropdown-items", 3, "ngClass"], ["class", "p-dropdown-empty-message", 3, "ngStyle", 4, "ngIf"], ["ngFor", "", 3, "ngForOf"], [1, "p-dropdown-item-group", 3, "ngStyle"], [3, "onClick", "option", "selected", "label", "disabled", "template"], [1, "p-dropdown-empty-message", 3, "ngStyle"]],
  template: function Dropdown_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 12, 0);
      \u0275\u0275listener("click", function Dropdown_Template_div_click_0_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onMouseclick($event));
      });
      \u0275\u0275elementStart(2, "div", 13)(3, "input", 14, 1);
      \u0275\u0275listener("focus", function Dropdown_Template_input_focus_3_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onInputFocus($event));
      })("blur", function Dropdown_Template_input_blur_3_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onInputBlur($event));
      })("keydown", function Dropdown_Template_input_keydown_3_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onKeydown($event, true));
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275template(5, Dropdown_span_5_Template, 3, 13, "span", 15)(6, Dropdown_span_6_Template, 2, 4, "span", 16)(7, Dropdown_input_7_Template, 2, 4, "input", 17)(8, Dropdown_ng_container_8_Template, 3, 2, "ng-container", 18);
      \u0275\u0275elementStart(9, "div", 19);
      \u0275\u0275template(10, Dropdown_ng_container_10_Template, 3, 2, "ng-container", 18)(11, Dropdown_span_11_Template, 2, 1, "span", 20);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "p-overlay", 21, 2);
      \u0275\u0275twoWayListener("visibleChange", function Dropdown_Template_p_overlay_visibleChange_12_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.overlayVisible, $event) || (ctx.overlayVisible = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275listener("onAnimationStart", function Dropdown_Template_p_overlay_onAnimationStart_12_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onOverlayAnimationStart($event));
      })("onHide", function Dropdown_Template_p_overlay_onHide_12_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.hide());
      });
      \u0275\u0275template(14, Dropdown_ng_template_14_Template, 9, 11, "ng-template", 22);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275classMap(ctx.styleClass);
      \u0275\u0275property("ngClass", \u0275\u0275pureFunction4(28, _c102, ctx.disabled, ctx.overlayVisible, ctx.focused, ctx.showClear && !ctx.disabled))("ngStyle", ctx.style);
      \u0275\u0275advance(3);
      \u0275\u0275property("disabled", ctx.disabled)("autofocus", ctx.autofocus);
      \u0275\u0275attribute("id", ctx.inputId)("placeholder", ctx.placeholder)("aria-label", ctx.ariaLabel)("aria-expanded", false)("aria-labelledby", ctx.ariaLabelledBy)("tabindex", ctx.tabindex)("aria-activedescendant", ctx.overlayVisible ? ctx.labelId : null);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", !ctx.editable && ctx.label != null);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.editable && ctx.label == null);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.editable);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isVisibleClearIcon);
      \u0275\u0275advance();
      \u0275\u0275attribute("aria-expanded", ctx.overlayVisible);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.dropdownIconTemplate);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.dropdownIconTemplate);
      \u0275\u0275advance();
      \u0275\u0275twoWayProperty("visible", ctx.overlayVisible);
      \u0275\u0275property("options", ctx.overlayOptions)("target", "@parent")("appendTo", ctx.appendTo)("autoZIndex", ctx.autoZIndex)("baseZIndex", ctx.baseZIndex)("showTransitionOptions", ctx.showTransitionOptions)("hideTransitionOptions", ctx.hideTransitionOptions);
    }
  },
  dependencies: () => [NgClass, NgForOf, NgIf, NgTemplateOutlet, NgStyle, Overlay, PrimeTemplate, Tooltip, Scroller, AutoFocus, TimesIcon, ChevronDownIcon, SearchIcon, DropdownItem],
  styles: [".p-dropdown{display:inline-flex;cursor:pointer;position:relative;-webkit-user-select:none;user-select:none}.p-dropdown-clear-icon{position:absolute;top:50%;margin-top:-.5rem}.p-dropdown-trigger{display:flex;align-items:center;justify-content:center;flex-shrink:0}.p-dropdown-label{display:block;white-space:nowrap;overflow:hidden;flex:1 1 auto;width:1%;text-overflow:ellipsis;cursor:pointer}.p-dropdown-label-empty{overflow:hidden;visibility:hidden}input.p-dropdown-label{cursor:default}.p-dropdown-items-wrapper{overflow:auto}.p-dropdown-item{cursor:pointer;font-weight:400;white-space:nowrap;position:relative;overflow:hidden}.p-dropdown-items{margin:0;padding:0;list-style-type:none}.p-dropdown-filter{width:100%}.p-dropdown-filter-container{position:relative}.p-dropdown-filter-icon{position:absolute;top:50%;margin-top:-.5rem}.p-fluid .p-dropdown{display:flex}.p-fluid .p-dropdown .p-dropdown-label{width:1%}\n"],
  encapsulation: 2,
  changeDetection: 0
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Dropdown, [{
    type: Component,
    args: [{
      selector: "p-dropdown",
      template: `
        <div
            #container
            [ngClass]="{ 'p-dropdown p-component': true, 'p-disabled': disabled, 'p-dropdown-open': overlayVisible, 'p-focus': focused, 'p-dropdown-clearable': showClear && !disabled }"
            (click)="onMouseclick($event)"
            [ngStyle]="style"
            [class]="styleClass"
        >
            <div class="p-hidden-accessible">
                <input
                    #in
                    [attr.id]="inputId"
                    type="text"
                    readonly
                    (focus)="onInputFocus($event)"
                    aria-haspopup="listbox"
                    [attr.placeholder]="placeholder"
                    aria-haspopup="listbox"
                    [attr.aria-label]="ariaLabel"
                    [attr.aria-expanded]="false"
                    [attr.aria-labelledby]="ariaLabelledBy"
                    (blur)="onInputBlur($event)"
                    (keydown)="onKeydown($event, true)"
                    [disabled]="disabled"
                    [attr.tabindex]="tabindex"
                    pAutoFocus
                    [autofocus]="autofocus"
                    [attr.aria-activedescendant]="overlayVisible ? labelId : null"
                    role="combobox"
                />
            </div>
            <span
                [attr.id]="labelId"
                [ngClass]="{ 'p-dropdown-label p-inputtext': true, 'p-dropdown-label-empty': label == null || label.length === 0 }"
                *ngIf="!editable && label != null"
                [pTooltip]="tooltip"
                [tooltipPosition]="tooltipPosition"
                [positionStyle]="tooltipPositionStyle"
                [tooltipStyleClass]="tooltipStyleClass"
            >
                <ng-container *ngIf="!selectedItemTemplate">{{ label || 'empty' }}</ng-container>
                <ng-container *ngTemplateOutlet="selectedItemTemplate; context: { $implicit: selectedOption }"></ng-container>
            </span>
            <span [ngClass]="{ 'p-dropdown-label p-inputtext p-placeholder': true, 'p-dropdown-label-empty': placeholder == null || placeholder.length === 0 }" *ngIf="!editable && label == null">{{ placeholder || 'empty' }}</span>
            <input
                #editableInput
                type="text"
                [attr.maxlength]="maxlength"
                class="p-dropdown-label p-inputtext"
                *ngIf="editable"
                [disabled]="disabled"
                [attr.placeholder]="placeholder"
                aria-haspopup="listbox"
                [attr.aria-expanded]="overlayVisible"
                (input)="onEditableInputChange($event)"
                (focus)="onEditableInputFocus($event)"
                (blur)="onInputBlur($event)"
            />

            <ng-container *ngIf="isVisibleClearIcon">
                <TimesIcon [styleClass]="'p-dropdown-clear-icon'" (click)="clear($event)" *ngIf="!clearIconTemplate" />
                <span class="p-dropdown-clear-icon" (click)="clear($event)" *ngIf="clearIconTemplate">
                    <ng-template *ngTemplateOutlet="clearIconTemplate"></ng-template>
                </span>
            </ng-container>
           

            <div class="p-dropdown-trigger" role="button" aria-label="dropdown trigger" aria-haspopup="listbox" [attr.aria-expanded]="overlayVisible">
                <ng-container *ngIf="!dropdownIconTemplate">
                    <span class="p-dropdown-trigger-icon" *ngIf="dropdownIcon" [ngClass]="dropdownIcon"></span>
                    <ChevronDownIcon *ngIf="!dropdownIcon" [styleClass]="'p-dropdown-trigger-icon'" />
                </ng-container>
                <span *ngIf="dropdownIconTemplate" class="p-dropdown-trigger-icon">
                    <ng-template *ngTemplateOutlet="dropdownIconTemplate"></ng-template>
                </span>
            </div>
            
            <p-overlay
                #overlay
                [(visible)]="overlayVisible"
                [options]="overlayOptions"
                [target]="'@parent'"
                [appendTo]="appendTo"
                [autoZIndex]="autoZIndex"
                [baseZIndex]="baseZIndex"
                [showTransitionOptions]="showTransitionOptions"
                [hideTransitionOptions]="hideTransitionOptions"
                (onAnimationStart)="onOverlayAnimationStart($event)"
                (onHide)="hide()"
            >
                <ng-template pTemplate="content">
                    <div [ngClass]="'p-dropdown-panel p-component'" [ngStyle]="panelStyle" [class]="panelStyleClass">
                        <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                        <div class="p-dropdown-header" *ngIf="filter" (click)="$event.stopPropagation()">
                            <ng-container *ngIf="filterTemplate; else builtInFilterElement">
                                <ng-container *ngTemplateOutlet="filterTemplate; context: { options: filterOptions }"></ng-container>
                            </ng-container>
                            <ng-template #builtInFilterElement>
                                <div class="p-dropdown-filter-container">
                                    <input
                                        #filter
                                        type="text"
                                        autocomplete="off"
                                        [value]="filterValue || ''"
                                        class="p-dropdown-filter p-inputtext p-component"
                                        [attr.placeholder]="filterPlaceholder"
                                        (keydown.enter)="$event.preventDefault()"
                                        (keydown)="onKeydown($event, false)"
                                        (input)="onFilterInputChange($event)"
                                        [attr.aria-label]="ariaFilterLabel"
                                        [attr.aria-activedescendant]="overlayVisible ? 'p-highlighted-option' : labelId"
                                    />
                                    <SearchIcon *ngIf="!filterIconTemplate" [styleClass]="'p-dropdown-filter-icon'" />
                                    <span *ngIf="filterIconTemplate" class="p-dropdown-filter-icon">
                                        <ng-template *ngTemplateOutlet="filterIconTemplate"></ng-template>
                                    </span>
                                </div>
                            </ng-template>
                        </div>
                        <div class="p-dropdown-items-wrapper" [style.max-height]="virtualScroll ? 'auto' : scrollHeight || 'auto'">
                            <p-scroller
                                *ngIf="virtualScroll"
                                #scroller
                                [items]="optionsToDisplay"
                                [style]="{ height: scrollHeight }"
                                [itemSize]="virtualScrollItemSize || _itemSize"
                                [autoSize]="true"
                                [lazy]="lazy"
                                (onLazyLoad)="onLazyLoad.emit($event)"
                                [options]="virtualScrollOptions"
                            >
                                <ng-template pTemplate="content" let-items let-scrollerOptions="options">
                                    <ng-container *ngTemplateOutlet="buildInItems; context: { $implicit: items, options: scrollerOptions }"></ng-container>
                                </ng-template>
                                <ng-container *ngIf="loaderTemplate">
                                    <ng-template pTemplate="loader" let-scrollerOptions="options">
                                        <ng-container *ngTemplateOutlet="loaderTemplate; context: { options: scrollerOptions }"></ng-container>
                                    </ng-template>
                                </ng-container>
                            </p-scroller>
                            <ng-container *ngIf="!virtualScroll">
                                <ng-container *ngTemplateOutlet="buildInItems; context: { $implicit: optionsToDisplay, options: {} }"></ng-container>
                            </ng-container>

                            <ng-template #buildInItems let-items let-scrollerOptions="options">
                                <ul #items [attr.id]="listId" class="p-dropdown-items" [ngClass]="scrollerOptions.contentStyleClass" [style]="scrollerOptions.contentStyle" role="listbox">
                                    <ng-container *ngIf="group">
                                        <ng-template ngFor let-optgroup [ngForOf]="items">
                                            <li class="p-dropdown-item-group" [ngStyle]="{ height: scrollerOptions.itemSize + 'px' }">
                                                <span *ngIf="!groupTemplate">{{ getOptionGroupLabel(optgroup) || 'empty' }}</span>
                                                <ng-container *ngTemplateOutlet="groupTemplate; context: { $implicit: optgroup }"></ng-container>
                                            </li>
                                            <ng-container *ngTemplateOutlet="itemslist; context: { $implicit: getOptionGroupChildren(optgroup), selectedOption: selectedOption }"></ng-container>
                                        </ng-template>
                                    </ng-container>
                                    <ng-container *ngIf="!group">
                                        <ng-container *ngTemplateOutlet="itemslist; context: { $implicit: items, selectedOption: selectedOption }"></ng-container>
                                    </ng-container>
                                    <ng-template #itemslist let-options let-selectedOption="selectedOption">
                                        <ng-template ngFor let-option let-i="index" [ngForOf]="options">
                                            <p-dropdownItem
                                                [option]="option"
                                                [selected]="selectedOption == option"
                                                [label]="getOptionLabel(option)"
                                                [disabled]="isOptionDisabled(option)"
                                                (onClick)="onItemClick($event)"
                                                [template]="itemTemplate"
                                            ></p-dropdownItem>
                                        </ng-template>
                                    </ng-template>
                                    <li *ngIf="filterValue && isEmpty()" class="p-dropdown-empty-message" [ngStyle]="{ height: scrollerOptions.itemSize + 'px' }">
                                        <ng-container *ngIf="!emptyFilterTemplate && !emptyTemplate; else emptyFilter">
                                            {{ emptyFilterMessageLabel }}
                                        </ng-container>
                                        <ng-container #emptyFilter *ngTemplateOutlet="emptyFilterTemplate || emptyTemplate"></ng-container>
                                    </li>
                                    <li *ngIf="!filterValue && isEmpty()" class="p-dropdown-empty-message" [ngStyle]="{ height: scrollerOptions.itemSize + 'px' }">
                                        <ng-container *ngIf="!emptyTemplate; else empty">
                                            {{ emptyMessageLabel }}
                                        </ng-container>
                                        <ng-container #empty *ngTemplateOutlet="emptyTemplate"></ng-container>
                                    </li>
                                </ul>
                            </ng-template>
                        </div>
                        <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
                    </div>
                </ng-template>
            </p-overlay>
        </div>
    `,
      host: {
        class: "p-element p-inputwrapper",
        "[class.p-inputwrapper-filled]": "filled",
        "[class.p-inputwrapper-focus]": "focused || overlayVisible"
      },
      providers: [DROPDOWN_VALUE_ACCESSOR],
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      styles: [".p-dropdown{display:inline-flex;cursor:pointer;position:relative;-webkit-user-select:none;user-select:none}.p-dropdown-clear-icon{position:absolute;top:50%;margin-top:-.5rem}.p-dropdown-trigger{display:flex;align-items:center;justify-content:center;flex-shrink:0}.p-dropdown-label{display:block;white-space:nowrap;overflow:hidden;flex:1 1 auto;width:1%;text-overflow:ellipsis;cursor:pointer}.p-dropdown-label-empty{overflow:hidden;visibility:hidden}input.p-dropdown-label{cursor:default}.p-dropdown-items-wrapper{overflow:auto}.p-dropdown-item{cursor:pointer;font-weight:400;white-space:nowrap;position:relative;overflow:hidden}.p-dropdown-items{margin:0;padding:0;list-style-type:none}.p-dropdown-filter{width:100%}.p-dropdown-filter-container{position:relative}.p-dropdown-filter-icon{position:absolute;top:50%;margin-top:-.5rem}.p-fluid .p-dropdown{display:flex}.p-fluid .p-dropdown .p-dropdown-label{width:1%}\n"]
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: Renderer2
    }, {
      type: ChangeDetectorRef
    }, {
      type: NgZone
    }, {
      type: FilterService
    }, {
      type: PrimeNGConfig
    }];
  }, {
    scrollHeight: [{
      type: Input
    }],
    filter: [{
      type: Input
    }],
    name: [{
      type: Input
    }],
    style: [{
      type: Input
    }],
    panelStyle: [{
      type: Input
    }],
    styleClass: [{
      type: Input
    }],
    panelStyleClass: [{
      type: Input
    }],
    readonly: [{
      type: Input
    }],
    required: [{
      type: Input
    }],
    editable: [{
      type: Input
    }],
    appendTo: [{
      type: Input
    }],
    tabindex: [{
      type: Input
    }],
    placeholder: [{
      type: Input
    }],
    filterPlaceholder: [{
      type: Input
    }],
    filterLocale: [{
      type: Input
    }],
    inputId: [{
      type: Input
    }],
    selectId: [{
      type: Input
    }],
    dataKey: [{
      type: Input
    }],
    filterBy: [{
      type: Input
    }],
    autofocus: [{
      type: Input
    }],
    resetFilterOnHide: [{
      type: Input
    }],
    dropdownIcon: [{
      type: Input
    }],
    optionLabel: [{
      type: Input
    }],
    optionValue: [{
      type: Input
    }],
    optionDisabled: [{
      type: Input
    }],
    optionGroupLabel: [{
      type: Input
    }],
    optionGroupChildren: [{
      type: Input
    }],
    autoDisplayFirst: [{
      type: Input
    }],
    group: [{
      type: Input
    }],
    showClear: [{
      type: Input
    }],
    emptyFilterMessage: [{
      type: Input
    }],
    emptyMessage: [{
      type: Input
    }],
    lazy: [{
      type: Input
    }],
    virtualScroll: [{
      type: Input
    }],
    virtualScrollItemSize: [{
      type: Input
    }],
    virtualScrollOptions: [{
      type: Input
    }],
    overlayOptions: [{
      type: Input
    }],
    ariaFilterLabel: [{
      type: Input
    }],
    ariaLabel: [{
      type: Input
    }],
    ariaLabelledBy: [{
      type: Input
    }],
    filterMatchMode: [{
      type: Input
    }],
    maxlength: [{
      type: Input
    }],
    tooltip: [{
      type: Input
    }],
    tooltipPosition: [{
      type: Input
    }],
    tooltipPositionStyle: [{
      type: Input
    }],
    tooltipStyleClass: [{
      type: Input
    }],
    autofocusFilter: [{
      type: Input
    }],
    overlayDirection: [{
      type: Input
    }],
    onChange: [{
      type: Output
    }],
    onFilter: [{
      type: Output
    }],
    onFocus: [{
      type: Output
    }],
    onBlur: [{
      type: Output
    }],
    onClick: [{
      type: Output
    }],
    onShow: [{
      type: Output
    }],
    onHide: [{
      type: Output
    }],
    onClear: [{
      type: Output
    }],
    onLazyLoad: [{
      type: Output
    }],
    containerViewChild: [{
      type: ViewChild,
      args: ["container"]
    }],
    filterViewChild: [{
      type: ViewChild,
      args: ["filter"]
    }],
    accessibleViewChild: [{
      type: ViewChild,
      args: ["in"]
    }],
    editableInputViewChild: [{
      type: ViewChild,
      args: ["editableInput"]
    }],
    itemsViewChild: [{
      type: ViewChild,
      args: ["items"]
    }],
    scroller: [{
      type: ViewChild,
      args: ["scroller"]
    }],
    overlayViewChild: [{
      type: ViewChild,
      args: ["overlay"]
    }],
    templates: [{
      type: ContentChildren,
      args: [PrimeTemplate]
    }],
    disabled: [{
      type: Input
    }],
    itemSize: [{
      type: Input
    }],
    autoZIndex: [{
      type: Input
    }],
    baseZIndex: [{
      type: Input
    }],
    showTransitionOptions: [{
      type: Input
    }],
    hideTransitionOptions: [{
      type: Input
    }],
    options: [{
      type: Input
    }],
    filterValue: [{
      type: Input
    }]
  });
})();
var DropdownModule = class {
};
DropdownModule.\u0275fac = function DropdownModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || DropdownModule)();
};
DropdownModule.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: DropdownModule,
  declarations: [Dropdown, DropdownItem],
  imports: [CommonModule, OverlayModule, SharedModule, TooltipModule, RippleModule, ScrollerModule, AutoFocusModule, TimesIcon, ChevronDownIcon, SearchIcon],
  exports: [Dropdown, OverlayModule, SharedModule, ScrollerModule]
});
DropdownModule.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
  imports: [CommonModule, OverlayModule, SharedModule, TooltipModule, RippleModule, ScrollerModule, AutoFocusModule, TimesIcon, ChevronDownIcon, SearchIcon, OverlayModule, SharedModule, ScrollerModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DropdownModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, OverlayModule, SharedModule, TooltipModule, RippleModule, ScrollerModule, AutoFocusModule, TimesIcon, ChevronDownIcon, SearchIcon],
      exports: [Dropdown, OverlayModule, SharedModule, ScrollerModule],
      declarations: [Dropdown, DropdownItem]
    }]
  }], null, null);
})();

// node_modules/primeng/fesm2020/primeng-inputtext.mjs
var InputText = class {
  constructor(el, ngModel, cd) {
    this.el = el;
    this.ngModel = ngModel;
    this.cd = cd;
  }
  ngAfterViewInit() {
    this.updateFilledState();
    this.cd.detectChanges();
  }
  ngDoCheck() {
    this.updateFilledState();
  }
  onInput(e) {
    this.updateFilledState();
  }
  updateFilledState() {
    this.filled = this.el.nativeElement.value && this.el.nativeElement.value.length || this.ngModel && this.ngModel.model;
  }
};
InputText.\u0275fac = function InputText_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || InputText)(\u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(NgModel, 8), \u0275\u0275directiveInject(ChangeDetectorRef));
};
InputText.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
  type: InputText,
  selectors: [["", "pInputText", ""]],
  hostAttrs: [1, "p-inputtext", "p-component", "p-element"],
  hostVars: 2,
  hostBindings: function InputText_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("input", function InputText_input_HostBindingHandler($event) {
        return ctx.onInput($event);
      });
    }
    if (rf & 2) {
      \u0275\u0275classProp("p-filled", ctx.filled);
    }
  },
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InputText, [{
    type: Directive,
    args: [{
      selector: "[pInputText]",
      host: {
        class: "p-inputtext p-component p-element",
        "[class.p-filled]": "filled"
      }
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: NgModel,
      decorators: [{
        type: Optional
      }]
    }, {
      type: ChangeDetectorRef
    }];
  }, {
    onInput: [{
      type: HostListener,
      args: ["input", ["$event"]]
    }]
  });
})();
var InputTextModule = class {
};
InputTextModule.\u0275fac = function InputTextModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || InputTextModule)();
};
InputTextModule.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: InputTextModule,
  declarations: [InputText],
  imports: [CommonModule],
  exports: [InputText]
});
InputTextModule.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
  imports: [CommonModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InputTextModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      exports: [InputText],
      declarations: [InputText]
    }]
  }], null, null);
})();

// node_modules/primeng/fesm2020/primeng-icons-angleup.mjs
var AngleUpIcon = class extends BaseIcon {
};
AngleUpIcon.\u0275fac = /* @__PURE__ */ (() => {
  let \u0275AngleUpIcon_BaseFactory;
  return function AngleUpIcon_Factory(__ngFactoryType__) {
    return (\u0275AngleUpIcon_BaseFactory || (\u0275AngleUpIcon_BaseFactory = \u0275\u0275getInheritedFactory(AngleUpIcon)))(__ngFactoryType__ || AngleUpIcon);
  };
})();
AngleUpIcon.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
  type: AngleUpIcon,
  selectors: [["AngleUpIcon"]],
  features: [\u0275\u0275InheritDefinitionFeature],
  decls: 2,
  vars: 5,
  consts: [["width", "14", "height", "14", "viewBox", "0 0 14 14", "fill", "none", "xmlns", "http://www.w3.org/2000/svg"], ["d", "M10.4134 9.49931C10.3148 9.49977 10.2172 9.48055 10.1262 9.44278C10.0352 9.405 9.95263 9.34942 9.88338 9.27931L6.88338 6.27931L3.88338 9.27931C3.73811 9.34946 3.57409 9.3709 3.41567 9.34044C3.25724 9.30999 3.11286 9.22926 3.00395 9.11025C2.89504 8.99124 2.82741 8.84028 2.8111 8.67978C2.79478 8.51928 2.83065 8.35781 2.91338 8.21931L6.41338 4.71931C6.55401 4.57886 6.74463 4.49997 6.94338 4.49997C7.14213 4.49997 7.33276 4.57886 7.47338 4.71931L10.9734 8.21931C11.1138 8.35994 11.1927 8.55056 11.1927 8.74931C11.1927 8.94806 11.1138 9.13868 10.9734 9.27931C10.9007 9.35315 10.8132 9.41089 10.7168 9.44879C10.6203 9.48669 10.5169 9.5039 10.4134 9.49931Z", "fill", "currentColor"]],
  template: function AngleUpIcon_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(0, "svg", 0);
      \u0275\u0275element(1, "path", 1);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275classMap(ctx.getClassNames());
      \u0275\u0275attribute("aria-label", ctx.ariaLabel)("aria-hidden", ctx.ariaHidden)("role", ctx.role);
    }
  },
  encapsulation: 2
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AngleUpIcon, [{
    type: Component,
    args: [{
      selector: "AngleUpIcon",
      standalone: true,
      imports: [BaseIcon],
      template: `
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" [attr.aria-label]="ariaLabel" [attr.aria-hidden]="ariaHidden" [attr.role]="role" [class]="getClassNames()">
            <path
                d="M10.4134 9.49931C10.3148 9.49977 10.2172 9.48055 10.1262 9.44278C10.0352 9.405 9.95263 9.34942 9.88338 9.27931L6.88338 6.27931L3.88338 9.27931C3.73811 9.34946 3.57409 9.3709 3.41567 9.34044C3.25724 9.30999 3.11286 9.22926 3.00395 9.11025C2.89504 8.99124 2.82741 8.84028 2.8111 8.67978C2.79478 8.51928 2.83065 8.35781 2.91338 8.21931L6.41338 4.71931C6.55401 4.57886 6.74463 4.49997 6.94338 4.49997C7.14213 4.49997 7.33276 4.57886 7.47338 4.71931L10.9734 8.21931C11.1138 8.35994 11.1927 8.55056 11.1927 8.74931C11.1927 8.94806 11.1138 9.13868 10.9734 9.27931C10.9007 9.35315 10.8132 9.41089 10.7168 9.44879C10.6203 9.48669 10.5169 9.5039 10.4134 9.49931Z"
                fill="currentColor"
            />
        </svg>
    `
    }]
  }], null, null);
})();

// node_modules/primeng/fesm2020/primeng-icons-angledown.mjs
var AngleDownIcon = class extends BaseIcon {
};
AngleDownIcon.\u0275fac = /* @__PURE__ */ (() => {
  let \u0275AngleDownIcon_BaseFactory;
  return function AngleDownIcon_Factory(__ngFactoryType__) {
    return (\u0275AngleDownIcon_BaseFactory || (\u0275AngleDownIcon_BaseFactory = \u0275\u0275getInheritedFactory(AngleDownIcon)))(__ngFactoryType__ || AngleDownIcon);
  };
})();
AngleDownIcon.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
  type: AngleDownIcon,
  selectors: [["AngleDownIcon"]],
  features: [\u0275\u0275InheritDefinitionFeature],
  decls: 2,
  vars: 5,
  consts: [["width", "14", "height", "14", "viewBox", "0 0 14 14", "fill", "none", "xmlns", "http://www.w3.org/2000/svg"], ["d", "M3.58659 4.5007C3.68513 4.50023 3.78277 4.51945 3.87379 4.55723C3.9648 4.59501 4.04735 4.65058 4.11659 4.7207L7.11659 7.7207L10.1166 4.7207C10.2619 4.65055 10.4259 4.62911 10.5843 4.65956C10.7427 4.69002 10.8871 4.77074 10.996 4.88976C11.1049 5.00877 11.1726 5.15973 11.1889 5.32022C11.2052 5.48072 11.1693 5.6422 11.0866 5.7807L7.58659 9.2807C7.44597 9.42115 7.25534 9.50004 7.05659 9.50004C6.85784 9.50004 6.66722 9.42115 6.52659 9.2807L3.02659 5.7807C2.88614 5.64007 2.80725 5.44945 2.80725 5.2507C2.80725 5.05195 2.88614 4.86132 3.02659 4.7207C3.09932 4.64685 3.18675 4.58911 3.28322 4.55121C3.37969 4.51331 3.48305 4.4961 3.58659 4.5007Z", "fill", "currentColor"]],
  template: function AngleDownIcon_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(0, "svg", 0);
      \u0275\u0275element(1, "path", 1);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275classMap(ctx.getClassNames());
      \u0275\u0275attribute("aria-label", ctx.ariaLabel)("aria-hidden", ctx.ariaHidden)("role", ctx.role);
    }
  },
  encapsulation: 2
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AngleDownIcon, [{
    type: Component,
    args: [{
      selector: "AngleDownIcon",
      standalone: true,
      imports: [BaseIcon],
      template: `
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" [attr.aria-label]="ariaLabel" [attr.aria-hidden]="ariaHidden" [attr.role]="role" [class]="getClassNames()">
            <path
                d="M3.58659 4.5007C3.68513 4.50023 3.78277 4.51945 3.87379 4.55723C3.9648 4.59501 4.04735 4.65058 4.11659 4.7207L7.11659 7.7207L10.1166 4.7207C10.2619 4.65055 10.4259 4.62911 10.5843 4.65956C10.7427 4.69002 10.8871 4.77074 10.996 4.88976C11.1049 5.00877 11.1726 5.15973 11.1889 5.32022C11.2052 5.48072 11.1693 5.6422 11.0866 5.7807L7.58659 9.2807C7.44597 9.42115 7.25534 9.50004 7.05659 9.50004C6.85784 9.50004 6.66722 9.42115 6.52659 9.2807L3.02659 5.7807C2.88614 5.64007 2.80725 5.44945 2.80725 5.2507C2.80725 5.05195 2.88614 4.86132 3.02659 4.7207C3.09932 4.64685 3.18675 4.58911 3.28322 4.55121C3.37969 4.51331 3.48305 4.4961 3.58659 4.5007Z"
                fill="currentColor"
            />
        </svg>
    `
    }]
  }], null, null);
})();

// node_modules/primeng/fesm2020/primeng-inputnumber.mjs
var _c04 = ["input"];
var _c17 = (a0, a1, a2) => ({
  "p-inputnumber p-component": true,
  "p-inputnumber-buttons-stacked": a0,
  "p-inputnumber-buttons-horizontal": a1,
  "p-inputnumber-buttons-vertical": a2
});
var _c24 = () => ({
  "p-inputnumber-button p-inputnumber-button-up": true
});
var _c34 = () => ({
  "p-inputnumber-button p-inputnumber-button-down": true
});
function InputNumber_ng_container_3_TimesIcon_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "TimesIcon", 8);
    \u0275\u0275listener("click", function InputNumber_ng_container_3_TimesIcon_1_Template_TimesIcon_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.clear());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275property("ngClass", "p-inputnumber-clear-icon");
  }
}
function InputNumber_ng_container_3_span_2_1_ng_template_0_Template(rf, ctx) {
}
function InputNumber_ng_container_3_span_2_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, InputNumber_ng_container_3_span_2_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function InputNumber_ng_container_3_span_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 9);
    \u0275\u0275listener("click", function InputNumber_ng_container_3_span_2_Template_span_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.clear());
    });
    \u0275\u0275template(1, InputNumber_ng_container_3_span_2_1_Template, 1, 0, null, 10);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r2.clearIconTemplate);
  }
}
function InputNumber_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, InputNumber_ng_container_3_TimesIcon_1_Template, 1, 1, "TimesIcon", 6)(2, InputNumber_ng_container_3_span_2_Template, 2, 1, "span", 7);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r2.clearIconTemplate);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.clearIconTemplate);
  }
}
function InputNumber_span_4_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 14);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngClass", ctx_r2.incrementButtonIcon);
  }
}
function InputNumber_span_4_ng_container_3_AngleUpIcon_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "AngleUpIcon");
  }
}
function InputNumber_span_4_ng_container_3_2_ng_template_0_Template(rf, ctx) {
}
function InputNumber_span_4_ng_container_3_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, InputNumber_span_4_ng_container_3_2_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function InputNumber_span_4_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, InputNumber_span_4_ng_container_3_AngleUpIcon_1_Template, 1, 0, "AngleUpIcon", 3)(2, InputNumber_span_4_ng_container_3_2_Template, 1, 0, null, 10);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r2.incrementButtonIconTemplate);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r2.incrementButtonIconTemplate);
  }
}
function InputNumber_span_4_span_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 14);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngClass", ctx_r2.decrementButtonIcon);
  }
}
function InputNumber_span_4_ng_container_6_AngleDownIcon_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "AngleDownIcon");
  }
}
function InputNumber_span_4_ng_container_6_2_ng_template_0_Template(rf, ctx) {
}
function InputNumber_span_4_ng_container_6_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, InputNumber_span_4_ng_container_6_2_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function InputNumber_span_4_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, InputNumber_span_4_ng_container_6_AngleDownIcon_1_Template, 1, 0, "AngleDownIcon", 3)(2, InputNumber_span_4_ng_container_6_2_Template, 1, 0, null, 10);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r2.decrementButtonIconTemplate);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r2.decrementButtonIconTemplate);
  }
}
function InputNumber_span_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 11)(1, "button", 12);
    \u0275\u0275listener("mousedown", function InputNumber_span_4_Template_button_mousedown_1_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onUpButtonMouseDown($event));
    })("mouseup", function InputNumber_span_4_Template_button_mouseup_1_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onUpButtonMouseUp());
    })("mouseleave", function InputNumber_span_4_Template_button_mouseleave_1_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onUpButtonMouseLeave());
    })("keydown", function InputNumber_span_4_Template_button_keydown_1_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onUpButtonKeyDown($event));
    })("keyup", function InputNumber_span_4_Template_button_keyup_1_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onUpButtonKeyUp());
    });
    \u0275\u0275template(2, InputNumber_span_4_span_2_Template, 1, 1, "span", 13)(3, InputNumber_span_4_ng_container_3_Template, 3, 2, "ng-container", 3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 12);
    \u0275\u0275listener("mousedown", function InputNumber_span_4_Template_button_mousedown_4_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onDownButtonMouseDown($event));
    })("mouseup", function InputNumber_span_4_Template_button_mouseup_4_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onDownButtonMouseUp());
    })("mouseleave", function InputNumber_span_4_Template_button_mouseleave_4_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onDownButtonMouseLeave());
    })("keydown", function InputNumber_span_4_Template_button_keydown_4_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onDownButtonKeyDown($event));
    })("keyup", function InputNumber_span_4_Template_button_keyup_4_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onDownButtonKeyUp());
    });
    \u0275\u0275template(5, InputNumber_span_4_span_5_Template, 1, 1, "span", 13)(6, InputNumber_span_4_ng_container_6_Template, 3, 2, "ng-container", 3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r2.incrementButtonClass);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction0(12, _c24))("disabled", ctx_r2.disabled);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.incrementButtonIcon);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r2.incrementButtonIcon);
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r2.decrementButtonClass);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction0(13, _c34))("disabled", ctx_r2.disabled);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.decrementButtonIcon);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r2.decrementButtonIcon);
  }
}
function InputNumber_button_5_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 14);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngClass", ctx_r2.incrementButtonIcon);
  }
}
function InputNumber_button_5_ng_container_2_AngleUpIcon_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "AngleUpIcon");
  }
}
function InputNumber_button_5_ng_container_2_2_ng_template_0_Template(rf, ctx) {
}
function InputNumber_button_5_ng_container_2_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, InputNumber_button_5_ng_container_2_2_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function InputNumber_button_5_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, InputNumber_button_5_ng_container_2_AngleUpIcon_1_Template, 1, 0, "AngleUpIcon", 3)(2, InputNumber_button_5_ng_container_2_2_Template, 1, 0, null, 10);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r2.incrementButtonIconTemplate);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r2.incrementButtonIconTemplate);
  }
}
function InputNumber_button_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 12);
    \u0275\u0275listener("mousedown", function InputNumber_button_5_Template_button_mousedown_0_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onUpButtonMouseDown($event));
    })("mouseup", function InputNumber_button_5_Template_button_mouseup_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onUpButtonMouseUp());
    })("mouseleave", function InputNumber_button_5_Template_button_mouseleave_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onUpButtonMouseLeave());
    })("keydown", function InputNumber_button_5_Template_button_keydown_0_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onUpButtonKeyDown($event));
    })("keyup", function InputNumber_button_5_Template_button_keyup_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onUpButtonKeyUp());
    });
    \u0275\u0275template(1, InputNumber_button_5_span_1_Template, 1, 1, "span", 13)(2, InputNumber_button_5_ng_container_2_Template, 3, 2, "ng-container", 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r2.incrementButtonClass);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction0(6, _c24))("disabled", ctx_r2.disabled);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.incrementButtonIcon);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r2.incrementButtonIcon);
  }
}
function InputNumber_button_6_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 14);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngClass", ctx_r2.decrementButtonIcon);
  }
}
function InputNumber_button_6_ng_container_2_AngleDownIcon_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "AngleDownIcon");
  }
}
function InputNumber_button_6_ng_container_2_2_ng_template_0_Template(rf, ctx) {
}
function InputNumber_button_6_ng_container_2_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, InputNumber_button_6_ng_container_2_2_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function InputNumber_button_6_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, InputNumber_button_6_ng_container_2_AngleDownIcon_1_Template, 1, 0, "AngleDownIcon", 3)(2, InputNumber_button_6_ng_container_2_2_Template, 1, 0, null, 10);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r2.decrementButtonIconTemplate);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r2.decrementButtonIconTemplate);
  }
}
function InputNumber_button_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 12);
    \u0275\u0275listener("mousedown", function InputNumber_button_6_Template_button_mousedown_0_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onDownButtonMouseDown($event));
    })("mouseup", function InputNumber_button_6_Template_button_mouseup_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onDownButtonMouseUp());
    })("mouseleave", function InputNumber_button_6_Template_button_mouseleave_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onDownButtonMouseLeave());
    })("keydown", function InputNumber_button_6_Template_button_keydown_0_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onDownButtonKeyDown($event));
    })("keyup", function InputNumber_button_6_Template_button_keyup_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onDownButtonKeyUp());
    });
    \u0275\u0275template(1, InputNumber_button_6_span_1_Template, 1, 1, "span", 13)(2, InputNumber_button_6_ng_container_2_Template, 3, 2, "ng-container", 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r2.decrementButtonClass);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction0(6, _c34))("disabled", ctx_r2.disabled);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.decrementButtonIcon);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r2.decrementButtonIcon);
  }
}
var INPUTNUMBER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputNumber),
  multi: true
};
var InputNumber = class {
  constructor(document2, el, cd) {
    this.document = document2;
    this.el = el;
    this.cd = cd;
    this.showButtons = false;
    this.format = true;
    this.buttonLayout = "stacked";
    this.readonly = false;
    this.step = 1;
    this.allowEmpty = true;
    this.mode = "decimal";
    this.useGrouping = true;
    this.showClear = false;
    this.onInput = new EventEmitter();
    this.onFocus = new EventEmitter();
    this.onBlur = new EventEmitter();
    this.onKeyDown = new EventEmitter();
    this.onClear = new EventEmitter();
    this.onModelChange = () => {
    };
    this.onModelTouched = () => {
    };
    this.groupChar = "";
    this.prefixChar = "";
    this.suffixChar = "";
  }
  get disabled() {
    return this._disabled;
  }
  set disabled(disabled) {
    if (disabled) this.focused = false;
    this._disabled = disabled;
    if (this.timer) this.clearTimer();
  }
  ngOnChanges(simpleChange) {
    const props = ["locale", "localeMatcher", "mode", "currency", "currencyDisplay", "useGrouping", "minFractionDigits", "maxFractionDigits", "prefix", "suffix"];
    if (props.some((p) => !!simpleChange[p])) {
      this.updateConstructParser();
    }
  }
  ngAfterContentInit() {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case "clearicon":
          this.clearIconTemplate = item.template;
          break;
        case "incrementbuttonicon":
          this.incrementButtonIconTemplate = item.template;
          break;
        case "decrementbuttonicon":
          this.decrementButtonIconTemplate = item.template;
          break;
      }
    });
  }
  ngOnInit() {
    this.constructParser();
    this.initialized = true;
  }
  getOptions() {
    return {
      localeMatcher: this.localeMatcher,
      style: this.mode,
      currency: this.currency,
      currencyDisplay: this.currencyDisplay,
      useGrouping: this.useGrouping,
      minimumFractionDigits: this.minFractionDigits,
      maximumFractionDigits: this.maxFractionDigits
    };
  }
  constructParser() {
    this.numberFormat = new Intl.NumberFormat(this.locale, this.getOptions());
    const numerals = [...new Intl.NumberFormat(this.locale, {
      useGrouping: false
    }).format(9876543210)].reverse();
    const index = new Map(numerals.map((d, i) => [d, i]));
    this._numeral = new RegExp(`[${numerals.join("")}]`, "g");
    this._group = this.getGroupingExpression();
    this._minusSign = this.getMinusSignExpression();
    this._currency = this.getCurrencyExpression();
    this._decimal = this.getDecimalExpression();
    this._suffix = this.getSuffixExpression();
    this._prefix = this.getPrefixExpression();
    this._index = (d) => index.get(d);
  }
  updateConstructParser() {
    if (this.initialized) {
      this.constructParser();
    }
  }
  escapeRegExp(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  }
  getDecimalExpression() {
    const formatter = new Intl.NumberFormat(this.locale, __spreadProps(__spreadValues({}, this.getOptions()), {
      useGrouping: false
    }));
    return new RegExp(`[${formatter.format(1.1).replace(this._currency, "").trim().replace(this._numeral, "")}]`, "g");
  }
  getGroupingExpression() {
    const formatter = new Intl.NumberFormat(this.locale, {
      useGrouping: true
    });
    this.groupChar = formatter.format(1e6).trim().replace(this._numeral, "").charAt(0);
    return new RegExp(`[${this.groupChar}]`, "g");
  }
  getMinusSignExpression() {
    const formatter = new Intl.NumberFormat(this.locale, {
      useGrouping: false
    });
    return new RegExp(`[${formatter.format(-1).trim().replace(this._numeral, "")}]`, "g");
  }
  getCurrencyExpression() {
    if (this.currency) {
      const formatter = new Intl.NumberFormat(this.locale, {
        style: "currency",
        currency: this.currency,
        currencyDisplay: this.currencyDisplay,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
      return new RegExp(`[${formatter.format(1).replace(/\s/g, "").replace(this._numeral, "").replace(this._group, "")}]`, "g");
    }
    return new RegExp(`[]`, "g");
  }
  getPrefixExpression() {
    if (this.prefix) {
      this.prefixChar = this.prefix;
    } else {
      const formatter = new Intl.NumberFormat(this.locale, {
        style: this.mode,
        currency: this.currency,
        currencyDisplay: this.currencyDisplay
      });
      this.prefixChar = formatter.format(1).split("1")[0];
    }
    return new RegExp(`${this.escapeRegExp(this.prefixChar || "")}`, "g");
  }
  getSuffixExpression() {
    if (this.suffix) {
      this.suffixChar = this.suffix;
    } else {
      const formatter = new Intl.NumberFormat(this.locale, {
        style: this.mode,
        currency: this.currency,
        currencyDisplay: this.currencyDisplay,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
      this.suffixChar = formatter.format(1).split("1")[1];
    }
    return new RegExp(`${this.escapeRegExp(this.suffixChar || "")}`, "g");
  }
  formatValue(value) {
    if (value != null) {
      if (value === "-") {
        return value;
      }
      if (this.format) {
        let formatter = new Intl.NumberFormat(this.locale, this.getOptions());
        let formattedValue = formatter.format(value);
        if (this.prefix) {
          formattedValue = this.prefix + formattedValue;
        }
        if (this.suffix) {
          formattedValue = formattedValue + this.suffix;
        }
        return formattedValue;
      }
      return value.toString();
    }
    return "";
  }
  parseValue(text) {
    let filteredText = text.replace(this._suffix, "").replace(this._prefix, "").trim().replace(/\s/g, "").replace(this._currency, "").replace(this._group, "").replace(this._minusSign, "-").replace(this._decimal, ".").replace(this._numeral, this._index);
    if (filteredText) {
      if (filteredText === "-")
        return filteredText;
      let parsedValue = +filteredText;
      return isNaN(parsedValue) ? null : parsedValue;
    }
    return null;
  }
  repeat(event, interval, dir) {
    if (this.readonly) {
      return;
    }
    let i = interval || 500;
    this.clearTimer();
    this.timer = setTimeout(() => {
      this.repeat(event, 40, dir);
    }, i);
    this.spin(event, dir);
  }
  spin(event, dir) {
    let step = this.step * dir;
    let currentValue = this.parseValue(this.input.nativeElement.value) || 0;
    let newValue = this.validateValue(currentValue + step);
    if (this.maxlength && this.maxlength < this.formatValue(newValue).length) {
      return;
    }
    this.updateInput(newValue, null, "spin", null);
    this.updateModel(event, newValue);
    this.handleOnInput(event, currentValue, newValue);
  }
  clear() {
    this.value = null;
    this.onModelChange(this.value);
    this.onClear.emit();
  }
  onUpButtonMouseDown(event) {
    if (event.button === 2) {
      this.clearTimer();
      return;
    }
    this.input.nativeElement.focus();
    this.repeat(event, null, 1);
    event.preventDefault();
  }
  onUpButtonMouseUp() {
    this.clearTimer();
  }
  onUpButtonMouseLeave() {
    this.clearTimer();
  }
  onUpButtonKeyDown(event) {
    if (event.keyCode === 32 || event.keyCode === 13) {
      this.repeat(event, null, 1);
    }
  }
  onUpButtonKeyUp() {
    this.clearTimer();
  }
  onDownButtonMouseDown(event) {
    if (event.button === 2) {
      this.clearTimer();
      return;
    }
    this.input.nativeElement.focus();
    this.repeat(event, null, -1);
    event.preventDefault();
  }
  onDownButtonMouseUp() {
    this.clearTimer();
  }
  onDownButtonMouseLeave() {
    this.clearTimer();
  }
  onDownButtonKeyUp() {
    this.clearTimer();
  }
  onDownButtonKeyDown(event) {
    if (event.keyCode === 32 || event.keyCode === 13) {
      this.repeat(event, null, -1);
    }
  }
  onUserInput(event) {
    if (this.readonly) {
      return;
    }
    if (this.isSpecialChar) {
      event.target.value = this.lastValue;
    }
    this.isSpecialChar = false;
  }
  onInputKeyDown(event) {
    if (this.readonly) {
      return;
    }
    this.lastValue = event.target.value;
    if (event.shiftKey || event.altKey) {
      this.isSpecialChar = true;
      return;
    }
    let selectionStart = event.target.selectionStart;
    let selectionEnd = event.target.selectionEnd;
    let inputValue = event.target.value;
    let newValueStr = null;
    if (event.altKey) {
      event.preventDefault();
    }
    switch (event.which) {
      //up
      case 38:
        this.spin(event, 1);
        event.preventDefault();
        break;
      //down
      case 40:
        this.spin(event, -1);
        event.preventDefault();
        break;
      //left
      case 37:
        if (!this.isNumeralChar(inputValue.charAt(selectionStart - 1))) {
          event.preventDefault();
        }
        break;
      //right
      case 39:
        if (!this.isNumeralChar(inputValue.charAt(selectionStart))) {
          event.preventDefault();
        }
        break;
      //enter
      case 13:
        newValueStr = this.validateValue(this.parseValue(this.input.nativeElement.value));
        this.input.nativeElement.value = this.formatValue(newValueStr);
        this.input.nativeElement.setAttribute("aria-valuenow", newValueStr);
        this.updateModel(event, newValueStr);
        break;
      //backspace
      case 8: {
        event.preventDefault();
        if (selectionStart === selectionEnd) {
          const deleteChar = inputValue.charAt(selectionStart - 1);
          const {
            decimalCharIndex,
            decimalCharIndexWithoutPrefix
          } = this.getDecimalCharIndexes(inputValue);
          if (this.isNumeralChar(deleteChar)) {
            const decimalLength = this.getDecimalLength(inputValue);
            if (this._group.test(deleteChar)) {
              this._group.lastIndex = 0;
              newValueStr = inputValue.slice(0, selectionStart - 2) + inputValue.slice(selectionStart - 1);
            } else if (this._decimal.test(deleteChar)) {
              this._decimal.lastIndex = 0;
              if (decimalLength) {
                this.input.nativeElement.setSelectionRange(selectionStart - 1, selectionStart - 1);
              } else {
                newValueStr = inputValue.slice(0, selectionStart - 1) + inputValue.slice(selectionStart);
              }
            } else if (decimalCharIndex > 0 && selectionStart > decimalCharIndex) {
              const insertedText = this.isDecimalMode() && (this.minFractionDigits || 0) < decimalLength ? "" : "0";
              newValueStr = inputValue.slice(0, selectionStart - 1) + insertedText + inputValue.slice(selectionStart);
            } else if (decimalCharIndexWithoutPrefix === 1) {
              newValueStr = inputValue.slice(0, selectionStart - 1) + "0" + inputValue.slice(selectionStart);
              newValueStr = this.parseValue(newValueStr) > 0 ? newValueStr : "";
            } else {
              newValueStr = inputValue.slice(0, selectionStart - 1) + inputValue.slice(selectionStart);
            }
          }
          this.updateValue(event, newValueStr, null, "delete-single");
        } else {
          newValueStr = this.deleteRange(inputValue, selectionStart, selectionEnd);
          this.updateValue(event, newValueStr, null, "delete-range");
        }
        break;
      }
      // del
      case 46:
        event.preventDefault();
        if (selectionStart === selectionEnd) {
          const deleteChar = inputValue.charAt(selectionStart);
          const {
            decimalCharIndex,
            decimalCharIndexWithoutPrefix
          } = this.getDecimalCharIndexes(inputValue);
          if (this.isNumeralChar(deleteChar)) {
            const decimalLength = this.getDecimalLength(inputValue);
            if (this._group.test(deleteChar)) {
              this._group.lastIndex = 0;
              newValueStr = inputValue.slice(0, selectionStart) + inputValue.slice(selectionStart + 2);
            } else if (this._decimal.test(deleteChar)) {
              this._decimal.lastIndex = 0;
              if (decimalLength) {
                this.input.nativeElement.setSelectionRange(selectionStart + 1, selectionStart + 1);
              } else {
                newValueStr = inputValue.slice(0, selectionStart) + inputValue.slice(selectionStart + 1);
              }
            } else if (decimalCharIndex > 0 && selectionStart > decimalCharIndex) {
              const insertedText = this.isDecimalMode() && (this.minFractionDigits || 0) < decimalLength ? "" : "0";
              newValueStr = inputValue.slice(0, selectionStart) + insertedText + inputValue.slice(selectionStart + 1);
            } else if (decimalCharIndexWithoutPrefix === 1) {
              newValueStr = inputValue.slice(0, selectionStart) + "0" + inputValue.slice(selectionStart + 1);
              newValueStr = this.parseValue(newValueStr) > 0 ? newValueStr : "";
            } else {
              newValueStr = inputValue.slice(0, selectionStart) + inputValue.slice(selectionStart + 1);
            }
          }
          this.updateValue(event, newValueStr, null, "delete-back-single");
        } else {
          newValueStr = this.deleteRange(inputValue, selectionStart, selectionEnd);
          this.updateValue(event, newValueStr, null, "delete-range");
        }
        break;
      default:
        break;
    }
    this.onKeyDown.emit(event);
  }
  onInputKeyPress(event) {
    if (this.readonly) {
      return;
    }
    let code = event.which || event.keyCode;
    let char = String.fromCharCode(code);
    const isDecimalSign = this.isDecimalSign(char);
    const isMinusSign = this.isMinusSign(char);
    if (code != 13) {
      event.preventDefault();
    }
    if (48 <= code && code <= 57 || isMinusSign || isDecimalSign) {
      this.insert(event, char, {
        isDecimalSign,
        isMinusSign
      });
    }
  }
  onPaste(event) {
    if (!this.disabled && !this.readonly) {
      event.preventDefault();
      let data = (event.clipboardData || this.document.defaultView["clipboardData"]).getData("Text");
      if (data) {
        let filteredData = this.parseValue(data);
        if (filteredData != null) {
          this.insert(event, filteredData.toString());
        }
      }
    }
  }
  allowMinusSign() {
    return this.min == null || this.min < 0;
  }
  isMinusSign(char) {
    if (this._minusSign.test(char) || char === "-") {
      this._minusSign.lastIndex = 0;
      return true;
    }
    return false;
  }
  isDecimalSign(char) {
    if (this._decimal.test(char)) {
      this._decimal.lastIndex = 0;
      return true;
    }
    return false;
  }
  isDecimalMode() {
    return this.mode === "decimal";
  }
  getDecimalCharIndexes(val) {
    let decimalCharIndex = val.search(this._decimal);
    this._decimal.lastIndex = 0;
    const filteredVal = val.replace(this._prefix, "").trim().replace(/\s/g, "").replace(this._currency, "");
    const decimalCharIndexWithoutPrefix = filteredVal.search(this._decimal);
    this._decimal.lastIndex = 0;
    return {
      decimalCharIndex,
      decimalCharIndexWithoutPrefix
    };
  }
  getCharIndexes(val) {
    const decimalCharIndex = val.search(this._decimal);
    this._decimal.lastIndex = 0;
    const minusCharIndex = val.search(this._minusSign);
    this._minusSign.lastIndex = 0;
    const suffixCharIndex = val.search(this._suffix);
    this._suffix.lastIndex = 0;
    const currencyCharIndex = val.search(this._currency);
    this._currency.lastIndex = 0;
    return {
      decimalCharIndex,
      minusCharIndex,
      suffixCharIndex,
      currencyCharIndex
    };
  }
  insert(event, text, sign = {
    isDecimalSign: false,
    isMinusSign: false
  }) {
    const minusCharIndexOnText = text.search(this._minusSign);
    this._minusSign.lastIndex = 0;
    if (!this.allowMinusSign() && minusCharIndexOnText !== -1) {
      return;
    }
    let selectionStart = this.input.nativeElement.selectionStart;
    let selectionEnd = this.input.nativeElement.selectionEnd;
    let inputValue = this.input.nativeElement.value.trim();
    const {
      decimalCharIndex,
      minusCharIndex,
      suffixCharIndex,
      currencyCharIndex
    } = this.getCharIndexes(inputValue);
    let newValueStr;
    if (sign.isMinusSign) {
      if (selectionStart === 0) {
        newValueStr = inputValue;
        if (minusCharIndex === -1 || selectionEnd !== 0) {
          newValueStr = this.insertText(inputValue, text, 0, selectionEnd);
        }
        this.updateValue(event, newValueStr, text, "insert");
      }
    } else if (sign.isDecimalSign) {
      if (decimalCharIndex > 0 && selectionStart === decimalCharIndex) {
        this.updateValue(event, inputValue, text, "insert");
      } else if (decimalCharIndex > selectionStart && decimalCharIndex < selectionEnd) {
        newValueStr = this.insertText(inputValue, text, selectionStart, selectionEnd);
        this.updateValue(event, newValueStr, text, "insert");
      } else if (decimalCharIndex === -1 && this.maxFractionDigits) {
        newValueStr = this.insertText(inputValue, text, selectionStart, selectionEnd);
        this.updateValue(event, newValueStr, text, "insert");
      }
    } else {
      const maxFractionDigits = this.numberFormat.resolvedOptions().maximumFractionDigits;
      const operation = selectionStart !== selectionEnd ? "range-insert" : "insert";
      if (decimalCharIndex > 0 && selectionStart > decimalCharIndex) {
        if (selectionStart + text.length - (decimalCharIndex + 1) <= maxFractionDigits) {
          const charIndex = currencyCharIndex >= selectionStart ? currencyCharIndex - 1 : suffixCharIndex >= selectionStart ? suffixCharIndex : inputValue.length;
          newValueStr = inputValue.slice(0, selectionStart) + text + inputValue.slice(selectionStart + text.length, charIndex) + inputValue.slice(charIndex);
          this.updateValue(event, newValueStr, text, operation);
        }
      } else {
        newValueStr = this.insertText(inputValue, text, selectionStart, selectionEnd);
        this.updateValue(event, newValueStr, text, operation);
      }
    }
  }
  insertText(value, text, start, end) {
    let textSplit = text === "." ? text : text.split(".");
    if (textSplit.length === 2) {
      const decimalCharIndex = value.slice(start, end).search(this._decimal);
      this._decimal.lastIndex = 0;
      return decimalCharIndex > 0 ? value.slice(0, start) + this.formatValue(text) + value.slice(end) : value || this.formatValue(text);
    } else if (end - start === value.length) {
      return this.formatValue(text);
    } else if (start === 0) {
      return text + value.slice(end);
    } else if (end === value.length) {
      return value.slice(0, start) + text;
    } else {
      return value.slice(0, start) + text + value.slice(end);
    }
  }
  deleteRange(value, start, end) {
    let newValueStr;
    if (end - start === value.length) newValueStr = "";
    else if (start === 0) newValueStr = value.slice(end);
    else if (end === value.length) newValueStr = value.slice(0, start);
    else newValueStr = value.slice(0, start) + value.slice(end);
    return newValueStr;
  }
  initCursor() {
    let selectionStart = this.input.nativeElement.selectionStart;
    let inputValue = this.input.nativeElement.value;
    let valueLength = inputValue.length;
    let index = null;
    let prefixLength = (this.prefixChar || "").length;
    inputValue = inputValue.replace(this._prefix, "");
    selectionStart = selectionStart - prefixLength;
    let char = inputValue.charAt(selectionStart);
    if (this.isNumeralChar(char)) {
      return selectionStart + prefixLength;
    }
    let i = selectionStart - 1;
    while (i >= 0) {
      char = inputValue.charAt(i);
      if (this.isNumeralChar(char)) {
        index = i + prefixLength;
        break;
      } else {
        i--;
      }
    }
    if (index !== null) {
      this.input.nativeElement.setSelectionRange(index + 1, index + 1);
    } else {
      i = selectionStart;
      while (i < valueLength) {
        char = inputValue.charAt(i);
        if (this.isNumeralChar(char)) {
          index = i + prefixLength;
          break;
        } else {
          i++;
        }
      }
      if (index !== null) {
        this.input.nativeElement.setSelectionRange(index, index);
      }
    }
    return index || 0;
  }
  onInputClick() {
    const currentValue = this.input.nativeElement.value;
    if (!this.readonly && currentValue !== DomHandler.getSelection()) {
      this.initCursor();
    }
  }
  isNumeralChar(char) {
    if (char.length === 1 && (this._numeral.test(char) || this._decimal.test(char) || this._group.test(char) || this._minusSign.test(char))) {
      this.resetRegex();
      return true;
    }
    return false;
  }
  resetRegex() {
    this._numeral.lastIndex = 0;
    this._decimal.lastIndex = 0;
    this._group.lastIndex = 0;
    this._minusSign.lastIndex = 0;
  }
  updateValue(event, valueStr, insertedValueStr, operation) {
    let currentValue = this.input.nativeElement.value;
    let newValue = null;
    if (valueStr != null) {
      newValue = this.parseValue(valueStr);
      newValue = !newValue && !this.allowEmpty ? 0 : newValue;
      this.updateInput(newValue, insertedValueStr, operation, valueStr);
      this.handleOnInput(event, currentValue, newValue);
    }
  }
  handleOnInput(event, currentValue, newValue) {
    if (this.isValueChanged(currentValue, newValue)) {
      this.input.nativeElement.value = this.formatValue(newValue);
      this.input.nativeElement.setAttribute("aria-valuenow", newValue);
      this.updateModel(event, newValue);
      this.onInput.emit({
        originalEvent: event,
        value: newValue,
        formattedValue: currentValue
      });
    }
  }
  isValueChanged(currentValue, newValue) {
    if (newValue === null && currentValue !== null) {
      return true;
    }
    if (newValue != null) {
      let parsedCurrentValue = typeof currentValue === "string" ? this.parseValue(currentValue) : currentValue;
      return newValue !== parsedCurrentValue;
    }
    return false;
  }
  validateValue(value) {
    if (value === "-" || value == null) {
      return null;
    }
    if (this.min != null && value < this.min) {
      return this.min;
    }
    if (this.max != null && value > this.max) {
      return this.max;
    }
    return value;
  }
  updateInput(value, insertedValueStr, operation, valueStr) {
    insertedValueStr = insertedValueStr || "";
    let inputValue = this.input.nativeElement.value;
    let newValue = this.formatValue(value);
    let currentLength = inputValue.length;
    if (newValue !== valueStr) {
      newValue = this.concatValues(newValue, valueStr);
    }
    if (currentLength === 0) {
      this.input.nativeElement.value = newValue;
      this.input.nativeElement.setSelectionRange(0, 0);
      const index = this.initCursor();
      const selectionEnd = index + insertedValueStr.length;
      this.input.nativeElement.setSelectionRange(selectionEnd, selectionEnd);
    } else {
      let selectionStart = this.input.nativeElement.selectionStart;
      let selectionEnd = this.input.nativeElement.selectionEnd;
      if (this.maxlength && this.maxlength < newValue.length) {
        return;
      }
      this.input.nativeElement.value = newValue;
      let newLength = newValue.length;
      if (operation === "range-insert") {
        const startValue = this.parseValue((inputValue || "").slice(0, selectionStart));
        const startValueStr = startValue !== null ? startValue.toString() : "";
        const startExpr = startValueStr.split("").join(`(${this.groupChar})?`);
        const sRegex = new RegExp(startExpr, "g");
        sRegex.test(newValue);
        const tExpr = insertedValueStr.split("").join(`(${this.groupChar})?`);
        const tRegex = new RegExp(tExpr, "g");
        tRegex.test(newValue.slice(sRegex.lastIndex));
        selectionEnd = sRegex.lastIndex + tRegex.lastIndex;
        this.input.nativeElement.setSelectionRange(selectionEnd, selectionEnd);
      } else if (newLength === currentLength) {
        if (operation === "insert" || operation === "delete-back-single") this.input.nativeElement.setSelectionRange(selectionEnd + 1, selectionEnd + 1);
        else if (operation === "delete-single") this.input.nativeElement.setSelectionRange(selectionEnd - 1, selectionEnd - 1);
        else if (operation === "delete-range" || operation === "spin") this.input.nativeElement.setSelectionRange(selectionEnd, selectionEnd);
      } else if (operation === "delete-back-single") {
        let prevChar = inputValue.charAt(selectionEnd - 1);
        let nextChar = inputValue.charAt(selectionEnd);
        let diff = currentLength - newLength;
        let isGroupChar = this._group.test(nextChar);
        if (isGroupChar && diff === 1) {
          selectionEnd += 1;
        } else if (!isGroupChar && this.isNumeralChar(prevChar)) {
          selectionEnd += -1 * diff + 1;
        }
        this._group.lastIndex = 0;
        this.input.nativeElement.setSelectionRange(selectionEnd, selectionEnd);
      } else if (inputValue === "-" && operation === "insert") {
        this.input.nativeElement.setSelectionRange(0, 0);
        const index = this.initCursor();
        const selectionEnd2 = index + insertedValueStr.length + 1;
        this.input.nativeElement.setSelectionRange(selectionEnd2, selectionEnd2);
      } else {
        selectionEnd = selectionEnd + (newLength - currentLength);
        this.input.nativeElement.setSelectionRange(selectionEnd, selectionEnd);
      }
    }
    this.input.nativeElement.setAttribute("aria-valuenow", value);
  }
  concatValues(val1, val2) {
    if (val1 && val2) {
      let decimalCharIndex = val2.search(this._decimal);
      this._decimal.lastIndex = 0;
      if (this.suffixChar) {
        return val1.replace(this.suffixChar, "").split(this._decimal)[0] + val2.replace(this.suffixChar, "").slice(decimalCharIndex) + this.suffixChar;
      } else {
        return decimalCharIndex !== -1 ? val1.split(this._decimal)[0] + val2.slice(decimalCharIndex) : val1;
      }
    }
    return val1;
  }
  getDecimalLength(value) {
    if (value) {
      const valueSplit = value.split(this._decimal);
      if (valueSplit.length === 2) {
        return valueSplit[1].replace(this._suffix, "").trim().replace(/\s/g, "").replace(this._currency, "").length;
      }
    }
    return 0;
  }
  onInputFocus(event) {
    this.focused = true;
    this.onFocus.emit(event);
  }
  onInputBlur(event) {
    this.focused = false;
    let newValue = this.validateValue(this.parseValue(this.input.nativeElement.value));
    this.input.nativeElement.value = this.formatValue(newValue);
    this.input.nativeElement.setAttribute("aria-valuenow", newValue);
    this.updateModel(event, newValue);
    this.onBlur.emit(event);
  }
  formattedValue() {
    const val = !this.value && !this.allowEmpty ? 0 : this.value;
    return this.formatValue(val);
  }
  updateModel(event, value) {
    if (this.value !== value) {
      this.value = value;
      this.onModelChange(value);
    }
    this.onModelTouched();
  }
  writeValue(value) {
    this.value = value;
    this.cd.markForCheck();
  }
  registerOnChange(fn) {
    this.onModelChange = fn;
  }
  registerOnTouched(fn) {
    this.onModelTouched = fn;
  }
  setDisabledState(val) {
    this.disabled = val;
    this.cd.markForCheck();
  }
  get filled() {
    return this.value != null && this.value.toString().length > 0;
  }
  clearTimer() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
  getFormatter() {
    return this.numberFormat;
  }
};
InputNumber.\u0275fac = function InputNumber_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || InputNumber)(\u0275\u0275directiveInject(DOCUMENT), \u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(ChangeDetectorRef));
};
InputNumber.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
  type: InputNumber,
  selectors: [["p-inputNumber"]],
  contentQueries: function InputNumber_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      \u0275\u0275contentQuery(dirIndex, PrimeTemplate, 4);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.templates = _t);
    }
  },
  viewQuery: function InputNumber_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c04, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.input = _t.first);
    }
  },
  hostAttrs: [1, "p-element", "p-inputwrapper"],
  hostVars: 6,
  hostBindings: function InputNumber_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("p-inputwrapper-filled", ctx.filled)("p-inputwrapper-focus", ctx.focused)("p-inputnumber-clearable", ctx.showClear && ctx.buttonLayout != "vertical");
    }
  },
  inputs: {
    showButtons: "showButtons",
    format: "format",
    buttonLayout: "buttonLayout",
    inputId: "inputId",
    styleClass: "styleClass",
    style: "style",
    placeholder: "placeholder",
    size: "size",
    maxlength: "maxlength",
    tabindex: "tabindex",
    title: "title",
    ariaLabel: "ariaLabel",
    ariaRequired: "ariaRequired",
    name: "name",
    required: "required",
    autocomplete: "autocomplete",
    min: "min",
    max: "max",
    incrementButtonClass: "incrementButtonClass",
    decrementButtonClass: "decrementButtonClass",
    incrementButtonIcon: "incrementButtonIcon",
    decrementButtonIcon: "decrementButtonIcon",
    readonly: "readonly",
    step: "step",
    allowEmpty: "allowEmpty",
    locale: "locale",
    localeMatcher: "localeMatcher",
    mode: "mode",
    currency: "currency",
    currencyDisplay: "currencyDisplay",
    useGrouping: "useGrouping",
    minFractionDigits: "minFractionDigits",
    maxFractionDigits: "maxFractionDigits",
    prefix: "prefix",
    suffix: "suffix",
    inputStyle: "inputStyle",
    inputStyleClass: "inputStyleClass",
    showClear: "showClear",
    disabled: "disabled"
  },
  outputs: {
    onInput: "onInput",
    onFocus: "onFocus",
    onBlur: "onBlur",
    onKeyDown: "onKeyDown",
    onClear: "onClear"
  },
  standalone: false,
  features: [\u0275\u0275ProvidersFeature([INPUTNUMBER_VALUE_ACCESSOR]), \u0275\u0275NgOnChangesFeature],
  decls: 7,
  vars: 32,
  consts: [["input", ""], [3, "ngClass", "ngStyle"], ["pInputText", "", "inputmode", "decimal", 3, "input", "keydown", "keypress", "paste", "click", "focus", "blur", "ngClass", "ngStyle", "value", "disabled", "readonly"], [4, "ngIf"], ["class", "p-inputnumber-button-group", 4, "ngIf"], ["type", "button", "pButton", "", "class", "p-button-icon-only", "tabindex", "-1", 3, "ngClass", "class", "disabled", "mousedown", "mouseup", "mouseleave", "keydown", "keyup", 4, "ngIf"], [3, "ngClass", "click", 4, "ngIf"], ["class", "p-inputnumber-clear-icon", 3, "click", 4, "ngIf"], [3, "click", "ngClass"], [1, "p-inputnumber-clear-icon", 3, "click"], [4, "ngTemplateOutlet"], [1, "p-inputnumber-button-group"], ["type", "button", "pButton", "", "tabindex", "-1", 1, "p-button-icon-only", 3, "mousedown", "mouseup", "mouseleave", "keydown", "keyup", "ngClass", "disabled"], [3, "ngClass", 4, "ngIf"], [3, "ngClass"]],
  template: function InputNumber_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "span", 1)(1, "input", 2, 0);
      \u0275\u0275listener("input", function InputNumber_Template_input_input_1_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onUserInput($event));
      })("keydown", function InputNumber_Template_input_keydown_1_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onInputKeyDown($event));
      })("keypress", function InputNumber_Template_input_keypress_1_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onInputKeyPress($event));
      })("paste", function InputNumber_Template_input_paste_1_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onPaste($event));
      })("click", function InputNumber_Template_input_click_1_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onInputClick());
      })("focus", function InputNumber_Template_input_focus_1_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onInputFocus($event));
      })("blur", function InputNumber_Template_input_blur_1_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onInputBlur($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275template(3, InputNumber_ng_container_3_Template, 3, 2, "ng-container", 3)(4, InputNumber_span_4_Template, 7, 14, "span", 4)(5, InputNumber_button_5_Template, 3, 7, "button", 5)(6, InputNumber_button_6_Template, 3, 7, "button", 5);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275classMap(ctx.styleClass);
      \u0275\u0275property("ngClass", \u0275\u0275pureFunction3(28, _c17, ctx.showButtons && ctx.buttonLayout === "stacked", ctx.showButtons && ctx.buttonLayout === "horizontal", ctx.showButtons && ctx.buttonLayout === "vertical"))("ngStyle", ctx.style);
      \u0275\u0275advance();
      \u0275\u0275classMap(ctx.inputStyleClass);
      \u0275\u0275property("ngClass", "p-inputnumber-input")("ngStyle", ctx.inputStyle)("value", ctx.formattedValue())("disabled", ctx.disabled)("readonly", ctx.readonly);
      \u0275\u0275attribute("placeholder", ctx.placeholder)("title", ctx.title)("id", ctx.inputId)("size", ctx.size)("name", ctx.name)("autocomplete", ctx.autocomplete)("maxlength", ctx.maxlength)("tabindex", ctx.tabindex)("aria-label", ctx.ariaLabel)("aria-required", ctx.ariaRequired)("required", ctx.required)("min", ctx.min)("max", ctx.max);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.buttonLayout != "vertical" && ctx.showClear && ctx.value);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showButtons && ctx.buttonLayout === "stacked");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showButtons && ctx.buttonLayout !== "stacked");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showButtons && ctx.buttonLayout !== "stacked");
    }
  },
  dependencies: () => [NgClass, NgIf, NgTemplateOutlet, NgStyle, InputText, ButtonDirective, TimesIcon, AngleUpIcon, AngleDownIcon],
  styles: ["p-inputnumber,.p-inputnumber{display:inline-flex}.p-inputnumber-button{display:flex;align-items:center;justify-content:center;flex:0 0 auto}.p-inputnumber-buttons-stacked .p-button.p-inputnumber-button .p-button-label,.p-inputnumber-buttons-horizontal .p-button.p-inputnumber-button .p-button-label{display:none}.p-inputnumber-buttons-stacked .p-button.p-inputnumber-button-up{border-top-left-radius:0;border-bottom-left-radius:0;border-bottom-right-radius:0;padding:0}.p-inputnumber-buttons-stacked .p-inputnumber-input{border-top-right-radius:0;border-bottom-right-radius:0}.p-inputnumber-buttons-stacked .p-button.p-inputnumber-button-down{border-top-left-radius:0;border-top-right-radius:0;border-bottom-left-radius:0;padding:0}.p-inputnumber-buttons-stacked .p-inputnumber-button-group{display:flex;flex-direction:column}.p-inputnumber-buttons-stacked .p-inputnumber-button-group .p-button.p-inputnumber-button{flex:1 1 auto}.p-inputnumber-buttons-horizontal .p-button.p-inputnumber-button-up{order:3;border-top-left-radius:0;border-bottom-left-radius:0}.p-inputnumber-buttons-horizontal .p-inputnumber-input{order:2;border-radius:0}.p-inputnumber-buttons-horizontal .p-button.p-inputnumber-button-down{order:1;border-top-right-radius:0;border-bottom-right-radius:0}.p-inputnumber-buttons-vertical{flex-direction:column}.p-inputnumber-buttons-vertical .p-button.p-inputnumber-button-up{order:1;border-bottom-left-radius:0;border-bottom-right-radius:0;width:100%}.p-inputnumber-buttons-vertical .p-inputnumber-input{order:2;border-radius:0;text-align:center}.p-inputnumber-buttons-vertical .p-button.p-inputnumber-button-down{order:3;border-top-left-radius:0;border-top-right-radius:0;width:100%}.p-inputnumber-input{flex:1 1 auto}.p-fluid p-inputnumber,.p-fluid .p-inputnumber{width:100%}.p-fluid .p-inputnumber .p-inputnumber-input{width:1%}.p-fluid .p-inputnumber-buttons-vertical .p-inputnumber-input{width:100%}.p-inputnumber-clear-icon{position:absolute;top:50%;margin-top:-.5rem;cursor:pointer}.p-inputnumber-clearable{position:relative}\n"],
  encapsulation: 2,
  changeDetection: 0
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InputNumber, [{
    type: Component,
    args: [{
      selector: "p-inputNumber",
      template: `
        <span
            [ngClass]="{
                'p-inputnumber p-component': true,
                'p-inputnumber-buttons-stacked': this.showButtons && this.buttonLayout === 'stacked',
                'p-inputnumber-buttons-horizontal': this.showButtons && this.buttonLayout === 'horizontal',
                'p-inputnumber-buttons-vertical': this.showButtons && this.buttonLayout === 'vertical'
            }"
            [ngStyle]="style"
            [class]="styleClass"
        >
            <input
                #input
                [ngClass]="'p-inputnumber-input'"
                [ngStyle]="inputStyle"
                [class]="inputStyleClass"
                pInputText
                [value]="formattedValue()"
                [attr.placeholder]="placeholder"
                [attr.title]="title"
                [attr.id]="inputId"
                [attr.size]="size"
                [attr.name]="name"
                [attr.autocomplete]="autocomplete"
                [attr.maxlength]="maxlength"
                [attr.tabindex]="tabindex"
                [attr.aria-label]="ariaLabel"
                [attr.aria-required]="ariaRequired"
                [disabled]="disabled"
                [attr.required]="required"
                [attr.min]="min"
                [attr.max]="max"
                [readonly]="readonly"
                inputmode="decimal"
                (input)="onUserInput($event)"
                (keydown)="onInputKeyDown($event)"
                (keypress)="onInputKeyPress($event)"
                (paste)="onPaste($event)"
                (click)="onInputClick()"
                (focus)="onInputFocus($event)"
                (blur)="onInputBlur($event)"
            />
            <ng-container *ngIf="buttonLayout != 'vertical' && showClear && value">
                <TimesIcon *ngIf="!clearIconTemplate" [ngClass]="'p-inputnumber-clear-icon'" (click)="clear()"/>
                <span *ngIf="clearIconTemplate" (click)="clear()" class="p-inputnumber-clear-icon">
                    <ng-template *ngTemplateOutlet="clearIconTemplate"></ng-template>
                </span>            
            </ng-container>

            <span class="p-inputnumber-button-group" *ngIf="showButtons && buttonLayout === 'stacked'">
                <button
                    type="button"
                    pButton
                    [ngClass]="{ 'p-inputnumber-button p-inputnumber-button-up': true }"
                    class="p-button-icon-only"
                    [class]="incrementButtonClass"
                    [disabled]="disabled"
                    (mousedown)="onUpButtonMouseDown($event)"
                    (mouseup)="onUpButtonMouseUp()"
                    (mouseleave)="onUpButtonMouseLeave()"
                    (keydown)="onUpButtonKeyDown($event)"
                    (keyup)="onUpButtonKeyUp()"
                    tabindex="-1"
                >
                <span *ngIf="incrementButtonIcon" [ngClass]="incrementButtonIcon"></span>
                <ng-container *ngIf="!incrementButtonIcon">
                    <AngleUpIcon *ngIf="!incrementButtonIconTemplate"/>
                    <ng-template *ngTemplateOutlet="incrementButtonIconTemplate"></ng-template>
                </ng-container>
                </button>
                <button
                    type="button"
                    pButton
                    [ngClass]="{ 'p-inputnumber-button p-inputnumber-button-down': true }"
                    class="p-button-icon-only"
                    [class]="decrementButtonClass"
                    [disabled]="disabled"
                    (mousedown)="onDownButtonMouseDown($event)"
                    (mouseup)="onDownButtonMouseUp()"
                    (mouseleave)="onDownButtonMouseLeave()"
                    (keydown)="onDownButtonKeyDown($event)"
                    (keyup)="onDownButtonKeyUp()"
                    tabindex="-1"
                >
                <span *ngIf="decrementButtonIcon" [ngClass]="decrementButtonIcon"></span>
                <ng-container *ngIf="!decrementButtonIcon">
                    <AngleDownIcon *ngIf="!decrementButtonIconTemplate"/>
                    <ng-template *ngTemplateOutlet="decrementButtonIconTemplate"></ng-template>
                </ng-container>
            </button>
            </span>
            <button
                type="button"
                pButton
                [ngClass]="{ 'p-inputnumber-button p-inputnumber-button-up': true }"
                [class]="incrementButtonClass"
                class="p-button-icon-only"
                *ngIf="showButtons && buttonLayout !== 'stacked'"
                [disabled]="disabled"
                (mousedown)="onUpButtonMouseDown($event)"
                (mouseup)="onUpButtonMouseUp()"
                (mouseleave)="onUpButtonMouseLeave()"
                (keydown)="onUpButtonKeyDown($event)"
                (keyup)="onUpButtonKeyUp()"
                tabindex="-1"
            >
                <span *ngIf="incrementButtonIcon" [ngClass]="incrementButtonIcon"></span>
                <ng-container *ngIf="!incrementButtonIcon">
                    <AngleUpIcon *ngIf="!incrementButtonIconTemplate"/>
                    <ng-template *ngTemplateOutlet="incrementButtonIconTemplate"></ng-template>
                </ng-container>
            </button>
            <button
                type="button"
                pButton
                [ngClass]="{ 'p-inputnumber-button p-inputnumber-button-down': true }"
                class="p-button-icon-only"
                [class]="decrementButtonClass"
                *ngIf="showButtons && buttonLayout !== 'stacked'"
                [disabled]="disabled"
                (mousedown)="onDownButtonMouseDown($event)"
                (mouseup)="onDownButtonMouseUp()"
                (mouseleave)="onDownButtonMouseLeave()"
                (keydown)="onDownButtonKeyDown($event)"
                (keyup)="onDownButtonKeyUp()"
                tabindex="-1"
            >
            <span *ngIf="decrementButtonIcon" [ngClass]="decrementButtonIcon"></span>
            <ng-container *ngIf="!decrementButtonIcon">
                <AngleDownIcon *ngIf="!decrementButtonIconTemplate"/>
                <ng-template *ngTemplateOutlet="decrementButtonIconTemplate"></ng-template>
            </ng-container>
        </button>
        </span>
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [INPUTNUMBER_VALUE_ACCESSOR],
      encapsulation: ViewEncapsulation.None,
      host: {
        class: "p-element p-inputwrapper",
        "[class.p-inputwrapper-filled]": "filled",
        "[class.p-inputwrapper-focus]": "focused",
        "[class.p-inputnumber-clearable]": 'showClear && buttonLayout != "vertical"'
      },
      styles: ["p-inputnumber,.p-inputnumber{display:inline-flex}.p-inputnumber-button{display:flex;align-items:center;justify-content:center;flex:0 0 auto}.p-inputnumber-buttons-stacked .p-button.p-inputnumber-button .p-button-label,.p-inputnumber-buttons-horizontal .p-button.p-inputnumber-button .p-button-label{display:none}.p-inputnumber-buttons-stacked .p-button.p-inputnumber-button-up{border-top-left-radius:0;border-bottom-left-radius:0;border-bottom-right-radius:0;padding:0}.p-inputnumber-buttons-stacked .p-inputnumber-input{border-top-right-radius:0;border-bottom-right-radius:0}.p-inputnumber-buttons-stacked .p-button.p-inputnumber-button-down{border-top-left-radius:0;border-top-right-radius:0;border-bottom-left-radius:0;padding:0}.p-inputnumber-buttons-stacked .p-inputnumber-button-group{display:flex;flex-direction:column}.p-inputnumber-buttons-stacked .p-inputnumber-button-group .p-button.p-inputnumber-button{flex:1 1 auto}.p-inputnumber-buttons-horizontal .p-button.p-inputnumber-button-up{order:3;border-top-left-radius:0;border-bottom-left-radius:0}.p-inputnumber-buttons-horizontal .p-inputnumber-input{order:2;border-radius:0}.p-inputnumber-buttons-horizontal .p-button.p-inputnumber-button-down{order:1;border-top-right-radius:0;border-bottom-right-radius:0}.p-inputnumber-buttons-vertical{flex-direction:column}.p-inputnumber-buttons-vertical .p-button.p-inputnumber-button-up{order:1;border-bottom-left-radius:0;border-bottom-right-radius:0;width:100%}.p-inputnumber-buttons-vertical .p-inputnumber-input{order:2;border-radius:0;text-align:center}.p-inputnumber-buttons-vertical .p-button.p-inputnumber-button-down{order:3;border-top-left-radius:0;border-top-right-radius:0;width:100%}.p-inputnumber-input{flex:1 1 auto}.p-fluid p-inputnumber,.p-fluid .p-inputnumber{width:100%}.p-fluid .p-inputnumber .p-inputnumber-input{width:1%}.p-fluid .p-inputnumber-buttons-vertical .p-inputnumber-input{width:100%}.p-inputnumber-clear-icon{position:absolute;top:50%;margin-top:-.5rem;cursor:pointer}.p-inputnumber-clearable{position:relative}\n"]
    }]
  }], function() {
    return [{
      type: Document,
      decorators: [{
        type: Inject,
        args: [DOCUMENT]
      }]
    }, {
      type: ElementRef
    }, {
      type: ChangeDetectorRef
    }];
  }, {
    showButtons: [{
      type: Input
    }],
    format: [{
      type: Input
    }],
    buttonLayout: [{
      type: Input
    }],
    inputId: [{
      type: Input
    }],
    styleClass: [{
      type: Input
    }],
    style: [{
      type: Input
    }],
    placeholder: [{
      type: Input
    }],
    size: [{
      type: Input
    }],
    maxlength: [{
      type: Input
    }],
    tabindex: [{
      type: Input
    }],
    title: [{
      type: Input
    }],
    ariaLabel: [{
      type: Input
    }],
    ariaRequired: [{
      type: Input
    }],
    name: [{
      type: Input
    }],
    required: [{
      type: Input
    }],
    autocomplete: [{
      type: Input
    }],
    min: [{
      type: Input
    }],
    max: [{
      type: Input
    }],
    incrementButtonClass: [{
      type: Input
    }],
    decrementButtonClass: [{
      type: Input
    }],
    incrementButtonIcon: [{
      type: Input
    }],
    decrementButtonIcon: [{
      type: Input
    }],
    readonly: [{
      type: Input
    }],
    step: [{
      type: Input
    }],
    allowEmpty: [{
      type: Input
    }],
    locale: [{
      type: Input
    }],
    localeMatcher: [{
      type: Input
    }],
    mode: [{
      type: Input
    }],
    currency: [{
      type: Input
    }],
    currencyDisplay: [{
      type: Input
    }],
    useGrouping: [{
      type: Input
    }],
    minFractionDigits: [{
      type: Input
    }],
    maxFractionDigits: [{
      type: Input
    }],
    prefix: [{
      type: Input
    }],
    suffix: [{
      type: Input
    }],
    inputStyle: [{
      type: Input
    }],
    inputStyleClass: [{
      type: Input
    }],
    showClear: [{
      type: Input
    }],
    input: [{
      type: ViewChild,
      args: ["input"]
    }],
    onInput: [{
      type: Output
    }],
    onFocus: [{
      type: Output
    }],
    onBlur: [{
      type: Output
    }],
    onKeyDown: [{
      type: Output
    }],
    onClear: [{
      type: Output
    }],
    templates: [{
      type: ContentChildren,
      args: [PrimeTemplate]
    }],
    disabled: [{
      type: Input
    }]
  });
})();
var InputNumberModule = class {
};
InputNumberModule.\u0275fac = function InputNumberModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || InputNumberModule)();
};
InputNumberModule.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: InputNumberModule,
  declarations: [InputNumber],
  imports: [CommonModule, InputTextModule, ButtonModule, TimesIcon, AngleUpIcon, AngleDownIcon],
  exports: [InputNumber, SharedModule]
});
InputNumberModule.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
  imports: [CommonModule, InputTextModule, ButtonModule, TimesIcon, AngleUpIcon, AngleDownIcon, SharedModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InputNumberModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, InputTextModule, ButtonModule, TimesIcon, AngleUpIcon, AngleDownIcon],
      exports: [InputNumber, SharedModule],
      declarations: [InputNumber]
    }]
  }], null, null);
})();

// node_modules/primeng/fesm2020/primeng-icons-angledoubleleft.mjs
var AngleDoubleLeftIcon = class extends BaseIcon {
};
AngleDoubleLeftIcon.\u0275fac = /* @__PURE__ */ (() => {
  let \u0275AngleDoubleLeftIcon_BaseFactory;
  return function AngleDoubleLeftIcon_Factory(__ngFactoryType__) {
    return (\u0275AngleDoubleLeftIcon_BaseFactory || (\u0275AngleDoubleLeftIcon_BaseFactory = \u0275\u0275getInheritedFactory(AngleDoubleLeftIcon)))(__ngFactoryType__ || AngleDoubleLeftIcon);
  };
})();
AngleDoubleLeftIcon.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
  type: AngleDoubleLeftIcon,
  selectors: [["AngleDoubleLeftIcon"]],
  features: [\u0275\u0275InheritDefinitionFeature],
  decls: 2,
  vars: 5,
  consts: [["width", "14", "height", "14", "viewBox", "0 0 14 14", "fill", "none", "xmlns", "http://www.w3.org/2000/svg"], ["fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M5.71602 11.164C5.80782 11.2021 5.9063 11.2215 6.00569 11.221C6.20216 11.2301 6.39427 11.1612 6.54025 11.0294C6.68191 10.8875 6.76148 10.6953 6.76148 10.4948C6.76148 10.2943 6.68191 10.1021 6.54025 9.96024L3.51441 6.9344L6.54025 3.90855C6.624 3.76126 6.65587 3.59011 6.63076 3.42254C6.60564 3.25498 6.525 3.10069 6.40175 2.98442C6.2785 2.86815 6.11978 2.79662 5.95104 2.7813C5.78229 2.76598 5.61329 2.80776 5.47112 2.89994L1.97123 6.39983C1.82957 6.54167 1.75 6.73393 1.75 6.9344C1.75 7.13486 1.82957 7.32712 1.97123 7.46896L5.47112 10.9991C5.54096 11.0698 5.62422 11.1259 5.71602 11.164ZM11.0488 10.9689C11.1775 11.1156 11.3585 11.2061 11.5531 11.221C11.7477 11.2061 11.9288 11.1156 12.0574 10.9689C12.1815 10.8302 12.25 10.6506 12.25 10.4645C12.25 10.2785 12.1815 10.0989 12.0574 9.96024L9.03158 6.93439L12.0574 3.90855C12.1248 3.76739 12.1468 3.60881 12.1204 3.45463C12.0939 3.30045 12.0203 3.15826 11.9097 3.04765C11.7991 2.93703 11.6569 2.86343 11.5027 2.83698C11.3486 2.81053 11.19 2.83252 11.0488 2.89994L7.51865 6.36957C7.37699 6.51141 7.29742 6.70367 7.29742 6.90414C7.29742 7.1046 7.37699 7.29686 7.51865 7.4387L11.0488 10.9689Z", "fill", "currentColor"]],
  template: function AngleDoubleLeftIcon_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(0, "svg", 0);
      \u0275\u0275element(1, "path", 1);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275classMap(ctx.getClassNames());
      \u0275\u0275attribute("aria-label", ctx.ariaLabel)("aria-hidden", ctx.ariaHidden)("role", ctx.role);
    }
  },
  encapsulation: 2
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AngleDoubleLeftIcon, [{
    type: Component,
    args: [{
      selector: "AngleDoubleLeftIcon",
      standalone: true,
      imports: [BaseIcon],
      template: `
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" [attr.aria-label]="ariaLabel" [attr.aria-hidden]="ariaHidden" [attr.role]="role" [class]="getClassNames()">
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.71602 11.164C5.80782 11.2021 5.9063 11.2215 6.00569 11.221C6.20216 11.2301 6.39427 11.1612 6.54025 11.0294C6.68191 10.8875 6.76148 10.6953 6.76148 10.4948C6.76148 10.2943 6.68191 10.1021 6.54025 9.96024L3.51441 6.9344L6.54025 3.90855C6.624 3.76126 6.65587 3.59011 6.63076 3.42254C6.60564 3.25498 6.525 3.10069 6.40175 2.98442C6.2785 2.86815 6.11978 2.79662 5.95104 2.7813C5.78229 2.76598 5.61329 2.80776 5.47112 2.89994L1.97123 6.39983C1.82957 6.54167 1.75 6.73393 1.75 6.9344C1.75 7.13486 1.82957 7.32712 1.97123 7.46896L5.47112 10.9991C5.54096 11.0698 5.62422 11.1259 5.71602 11.164ZM11.0488 10.9689C11.1775 11.1156 11.3585 11.2061 11.5531 11.221C11.7477 11.2061 11.9288 11.1156 12.0574 10.9689C12.1815 10.8302 12.25 10.6506 12.25 10.4645C12.25 10.2785 12.1815 10.0989 12.0574 9.96024L9.03158 6.93439L12.0574 3.90855C12.1248 3.76739 12.1468 3.60881 12.1204 3.45463C12.0939 3.30045 12.0203 3.15826 11.9097 3.04765C11.7991 2.93703 11.6569 2.86343 11.5027 2.83698C11.3486 2.81053 11.19 2.83252 11.0488 2.89994L7.51865 6.36957C7.37699 6.51141 7.29742 6.70367 7.29742 6.90414C7.29742 7.1046 7.37699 7.29686 7.51865 7.4387L11.0488 10.9689Z"
                fill="currentColor"
            />
        </svg>
    `
    }]
  }], null, null);
})();

// node_modules/primeng/fesm2020/primeng-icons-angledoubleright.mjs
var AngleDoubleRightIcon = class extends BaseIcon {
};
AngleDoubleRightIcon.\u0275fac = /* @__PURE__ */ (() => {
  let \u0275AngleDoubleRightIcon_BaseFactory;
  return function AngleDoubleRightIcon_Factory(__ngFactoryType__) {
    return (\u0275AngleDoubleRightIcon_BaseFactory || (\u0275AngleDoubleRightIcon_BaseFactory = \u0275\u0275getInheritedFactory(AngleDoubleRightIcon)))(__ngFactoryType__ || AngleDoubleRightIcon);
  };
})();
AngleDoubleRightIcon.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
  type: AngleDoubleRightIcon,
  selectors: [["AngleDoubleRightIcon"]],
  features: [\u0275\u0275InheritDefinitionFeature],
  decls: 2,
  vars: 5,
  consts: [["width", "14", "height", "14", "viewBox", "0 0 14 14", "fill", "none", "xmlns", "http://www.w3.org/2000/svg"], ["fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M7.68757 11.1451C7.7791 11.1831 7.8773 11.2024 7.9764 11.2019C8.07769 11.1985 8.17721 11.1745 8.26886 11.1312C8.36052 11.088 8.44238 11.0265 8.50943 10.9505L12.0294 7.49085C12.1707 7.34942 12.25 7.15771 12.25 6.95782C12.25 6.75794 12.1707 6.56622 12.0294 6.42479L8.50943 2.90479C8.37014 2.82159 8.20774 2.78551 8.04633 2.80192C7.88491 2.81833 7.73309 2.88635 7.6134 2.99588C7.4937 3.10541 7.41252 3.25061 7.38189 3.40994C7.35126 3.56927 7.37282 3.73423 7.44337 3.88033L10.4605 6.89748L7.44337 9.91463C7.30212 10.0561 7.22278 10.2478 7.22278 10.4477C7.22278 10.6475 7.30212 10.8393 7.44337 10.9807C7.51301 11.0512 7.59603 11.1071 7.68757 11.1451ZM1.94207 10.9505C2.07037 11.0968 2.25089 11.1871 2.44493 11.2019C2.63898 11.1871 2.81949 11.0968 2.94779 10.9505L6.46779 7.49085C6.60905 7.34942 6.68839 7.15771 6.68839 6.95782C6.68839 6.75793 6.60905 6.56622 6.46779 6.42479L2.94779 2.90479C2.80704 2.83757 2.6489 2.81563 2.49517 2.84201C2.34143 2.86839 2.19965 2.94178 2.08936 3.05207C1.97906 3.16237 1.90567 3.30415 1.8793 3.45788C1.85292 3.61162 1.87485 3.76975 1.94207 3.9105L4.95922 6.92765L1.94207 9.9448C1.81838 10.0831 1.75 10.2621 1.75 10.4477C1.75 10.6332 1.81838 10.8122 1.94207 10.9505Z", "fill", "currentColor"]],
  template: function AngleDoubleRightIcon_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(0, "svg", 0);
      \u0275\u0275element(1, "path", 1);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275classMap(ctx.getClassNames());
      \u0275\u0275attribute("aria-label", ctx.ariaLabel)("aria-hidden", ctx.ariaHidden)("role", ctx.role);
    }
  },
  encapsulation: 2
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AngleDoubleRightIcon, [{
    type: Component,
    args: [{
      selector: "AngleDoubleRightIcon",
      standalone: true,
      imports: [BaseIcon],
      template: `
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" [attr.aria-label]="ariaLabel" [attr.aria-hidden]="ariaHidden" [attr.role]="role" [class]="getClassNames()">
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.68757 11.1451C7.7791 11.1831 7.8773 11.2024 7.9764 11.2019C8.07769 11.1985 8.17721 11.1745 8.26886 11.1312C8.36052 11.088 8.44238 11.0265 8.50943 10.9505L12.0294 7.49085C12.1707 7.34942 12.25 7.15771 12.25 6.95782C12.25 6.75794 12.1707 6.56622 12.0294 6.42479L8.50943 2.90479C8.37014 2.82159 8.20774 2.78551 8.04633 2.80192C7.88491 2.81833 7.73309 2.88635 7.6134 2.99588C7.4937 3.10541 7.41252 3.25061 7.38189 3.40994C7.35126 3.56927 7.37282 3.73423 7.44337 3.88033L10.4605 6.89748L7.44337 9.91463C7.30212 10.0561 7.22278 10.2478 7.22278 10.4477C7.22278 10.6475 7.30212 10.8393 7.44337 10.9807C7.51301 11.0512 7.59603 11.1071 7.68757 11.1451ZM1.94207 10.9505C2.07037 11.0968 2.25089 11.1871 2.44493 11.2019C2.63898 11.1871 2.81949 11.0968 2.94779 10.9505L6.46779 7.49085C6.60905 7.34942 6.68839 7.15771 6.68839 6.95782C6.68839 6.75793 6.60905 6.56622 6.46779 6.42479L2.94779 2.90479C2.80704 2.83757 2.6489 2.81563 2.49517 2.84201C2.34143 2.86839 2.19965 2.94178 2.08936 3.05207C1.97906 3.16237 1.90567 3.30415 1.8793 3.45788C1.85292 3.61162 1.87485 3.76975 1.94207 3.9105L4.95922 6.92765L1.94207 9.9448C1.81838 10.0831 1.75 10.2621 1.75 10.4477C1.75 10.6332 1.81838 10.8122 1.94207 10.9505Z"
                fill="currentColor"
            />
        </svg>
    `
    }]
  }], null, null);
})();

// node_modules/primeng/fesm2020/primeng-icons-angleleft.mjs
var AngleLeftIcon = class extends BaseIcon {
};
AngleLeftIcon.\u0275fac = /* @__PURE__ */ (() => {
  let \u0275AngleLeftIcon_BaseFactory;
  return function AngleLeftIcon_Factory(__ngFactoryType__) {
    return (\u0275AngleLeftIcon_BaseFactory || (\u0275AngleLeftIcon_BaseFactory = \u0275\u0275getInheritedFactory(AngleLeftIcon)))(__ngFactoryType__ || AngleLeftIcon);
  };
})();
AngleLeftIcon.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
  type: AngleLeftIcon,
  selectors: [["AngleLeftIcon"]],
  features: [\u0275\u0275InheritDefinitionFeature],
  decls: 2,
  vars: 5,
  consts: [["width", "14", "height", "14", "viewBox", "0 0 14 14", "fill", "none", "xmlns", "http://www.w3.org/2000/svg"], ["d", "M8.75 11.185C8.65146 11.1854 8.55381 11.1662 8.4628 11.1284C8.37179 11.0906 8.28924 11.0351 8.22 10.965L4.72 7.46496C4.57955 7.32433 4.50066 7.13371 4.50066 6.93496C4.50066 6.73621 4.57955 6.54558 4.72 6.40496L8.22 2.93496C8.36095 2.84357 8.52851 2.80215 8.69582 2.81733C8.86312 2.83252 9.02048 2.90344 9.14268 3.01872C9.26487 3.134 9.34483 3.28696 9.36973 3.4531C9.39463 3.61924 9.36303 3.78892 9.28 3.93496L6.28 6.93496L9.28 9.93496C9.42045 10.0756 9.49934 10.2662 9.49934 10.465C9.49934 10.6637 9.42045 10.8543 9.28 10.995C9.13526 11.1257 8.9448 11.1939 8.75 11.185Z", "fill", "currentColor"]],
  template: function AngleLeftIcon_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(0, "svg", 0);
      \u0275\u0275element(1, "path", 1);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275classMap(ctx.getClassNames());
      \u0275\u0275attribute("aria-label", ctx.ariaLabel)("aria-hidden", ctx.ariaHidden)("role", ctx.role);
    }
  },
  encapsulation: 2
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AngleLeftIcon, [{
    type: Component,
    args: [{
      selector: "AngleLeftIcon",
      standalone: true,
      imports: [BaseIcon],
      template: `
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" [attr.aria-label]="ariaLabel" [attr.aria-hidden]="ariaHidden" [attr.role]="role" [class]="getClassNames()">
            <path
                d="M8.75 11.185C8.65146 11.1854 8.55381 11.1662 8.4628 11.1284C8.37179 11.0906 8.28924 11.0351 8.22 10.965L4.72 7.46496C4.57955 7.32433 4.50066 7.13371 4.50066 6.93496C4.50066 6.73621 4.57955 6.54558 4.72 6.40496L8.22 2.93496C8.36095 2.84357 8.52851 2.80215 8.69582 2.81733C8.86312 2.83252 9.02048 2.90344 9.14268 3.01872C9.26487 3.134 9.34483 3.28696 9.36973 3.4531C9.39463 3.61924 9.36303 3.78892 9.28 3.93496L6.28 6.93496L9.28 9.93496C9.42045 10.0756 9.49934 10.2662 9.49934 10.465C9.49934 10.6637 9.42045 10.8543 9.28 10.995C9.13526 11.1257 8.9448 11.1939 8.75 11.185Z"
                fill="currentColor"
            />
        </svg>
    `
    }]
  }], null, null);
})();

// node_modules/primeng/fesm2020/primeng-icons-angleright.mjs
var AngleRightIcon = class extends BaseIcon {
};
AngleRightIcon.\u0275fac = /* @__PURE__ */ (() => {
  let \u0275AngleRightIcon_BaseFactory;
  return function AngleRightIcon_Factory(__ngFactoryType__) {
    return (\u0275AngleRightIcon_BaseFactory || (\u0275AngleRightIcon_BaseFactory = \u0275\u0275getInheritedFactory(AngleRightIcon)))(__ngFactoryType__ || AngleRightIcon);
  };
})();
AngleRightIcon.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
  type: AngleRightIcon,
  selectors: [["AngleRightIcon"]],
  features: [\u0275\u0275InheritDefinitionFeature],
  decls: 2,
  vars: 5,
  consts: [["width", "14", "height", "14", "viewBox", "0 0 14 14", "fill", "none", "xmlns", "http://www.w3.org/2000/svg"], ["d", "M5.25 11.1728C5.14929 11.1694 5.05033 11.1455 4.9592 11.1025C4.86806 11.0595 4.78666 10.9984 4.72 10.9228C4.57955 10.7822 4.50066 10.5916 4.50066 10.3928C4.50066 10.1941 4.57955 10.0035 4.72 9.86283L7.72 6.86283L4.72 3.86283C4.66067 3.71882 4.64765 3.55991 4.68275 3.40816C4.71785 3.25642 4.79932 3.11936 4.91585 3.01602C5.03238 2.91268 5.17819 2.84819 5.33305 2.83149C5.4879 2.81479 5.64411 2.84671 5.78 2.92283L9.28 6.42283C9.42045 6.56346 9.49934 6.75408 9.49934 6.95283C9.49934 7.15158 9.42045 7.34221 9.28 7.48283L5.78 10.9228C5.71333 10.9984 5.63193 11.0595 5.5408 11.1025C5.44966 11.1455 5.35071 11.1694 5.25 11.1728Z", "fill", "currentColor"]],
  template: function AngleRightIcon_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(0, "svg", 0);
      \u0275\u0275element(1, "path", 1);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275classMap(ctx.getClassNames());
      \u0275\u0275attribute("aria-label", ctx.ariaLabel)("aria-hidden", ctx.ariaHidden)("role", ctx.role);
    }
  },
  encapsulation: 2
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AngleRightIcon, [{
    type: Component,
    args: [{
      selector: "AngleRightIcon",
      standalone: true,
      imports: [BaseIcon],
      template: `
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" [attr.aria-label]="ariaLabel" [attr.aria-hidden]="ariaHidden" [attr.role]="role" [class]="getClassNames()">
            <path
                d="M5.25 11.1728C5.14929 11.1694 5.05033 11.1455 4.9592 11.1025C4.86806 11.0595 4.78666 10.9984 4.72 10.9228C4.57955 10.7822 4.50066 10.5916 4.50066 10.3928C4.50066 10.1941 4.57955 10.0035 4.72 9.86283L7.72 6.86283L4.72 3.86283C4.66067 3.71882 4.64765 3.55991 4.68275 3.40816C4.71785 3.25642 4.79932 3.11936 4.91585 3.01602C5.03238 2.91268 5.17819 2.84819 5.33305 2.83149C5.4879 2.81479 5.64411 2.84671 5.78 2.92283L9.28 6.42283C9.42045 6.56346 9.49934 6.75408 9.49934 6.95283C9.49934 7.15158 9.42045 7.34221 9.28 7.48283L5.78 10.9228C5.71333 10.9984 5.63193 11.0595 5.5408 11.1025C5.44966 11.1455 5.35071 11.1694 5.25 11.1728Z"
                fill="currentColor"
            />
        </svg>
    `
    }]
  }], null, null);
})();

// node_modules/primeng/fesm2020/primeng-paginator.mjs
var _c05 = (a0) => ({
  "p-disabled": a0
});
var _c18 = (a0) => ({
  $implicit: a0
});
var _c25 = (a0) => ({
  "p-highlight": a0
});
function Paginator_div_0_div_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function Paginator_div_0_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275template(1, Paginator_div_0_div_1_ng_container_1_Template, 1, 0, "ng-container", 16);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r1.templateLeft)("ngTemplateOutletContext", \u0275\u0275pureFunction1(2, _c18, ctx_r1.paginatorState));
  }
}
function Paginator_div_0_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.currentPageReport);
  }
}
function Paginator_div_0_button_3_AngleDoubleLeftIcon_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "AngleDoubleLeftIcon", 19);
  }
  if (rf & 2) {
    \u0275\u0275property("styleClass", "p-paginator-icon");
  }
}
function Paginator_div_0_button_3_span_2_1_ng_template_0_Template(rf, ctx) {
}
function Paginator_div_0_button_3_span_2_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, Paginator_div_0_button_3_span_2_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function Paginator_div_0_button_3_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 20);
    \u0275\u0275template(1, Paginator_div_0_button_3_span_2_1_Template, 1, 0, null, 21);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r1.firstPageLinkIconTemplate);
  }
}
function Paginator_div_0_button_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 18);
    \u0275\u0275listener("click", function Paginator_div_0_button_3_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.changePageToFirst($event));
    });
    \u0275\u0275template(1, Paginator_div_0_button_3_AngleDoubleLeftIcon_1_Template, 1, 1, "AngleDoubleLeftIcon", 6)(2, Paginator_div_0_button_3_span_2_Template, 2, 1, "span", 7);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r1.isFirstPage() || ctx_r1.empty())("ngClass", \u0275\u0275pureFunction1(4, _c05, ctx_r1.isFirstPage() || ctx_r1.empty()));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.firstPageLinkIconTemplate);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.firstPageLinkIconTemplate);
  }
}
function Paginator_div_0_AngleLeftIcon_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "AngleLeftIcon", 19);
  }
  if (rf & 2) {
    \u0275\u0275property("styleClass", "p-paginator-icon");
  }
}
function Paginator_div_0_span_6_1_ng_template_0_Template(rf, ctx) {
}
function Paginator_div_0_span_6_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, Paginator_div_0_span_6_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function Paginator_div_0_span_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 20);
    \u0275\u0275template(1, Paginator_div_0_span_6_1_Template, 1, 0, null, 21);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r1.previousPageLinkIconTemplate);
  }
}
function Paginator_div_0_span_7_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 24);
    \u0275\u0275listener("click", function Paginator_div_0_span_7_button_1_Template_button_click_0_listener($event) {
      const pageLink_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.onPageLinkClick($event, pageLink_r5 - 1));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const pageLink_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(2, _c25, pageLink_r5 - 1 == ctx_r1.getPage()));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", pageLink_r5, " ");
  }
}
function Paginator_div_0_span_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 22);
    \u0275\u0275template(1, Paginator_div_0_span_7_button_1_Template, 2, 4, "button", 23);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.pageLinks);
  }
}
function Paginator_div_0_p_dropdown_8_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275textInterpolate(ctx_r1.currentPageReport);
  }
}
function Paginator_div_0_p_dropdown_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p-dropdown", 25);
    \u0275\u0275listener("onChange", function Paginator_div_0_p_dropdown_8_Template_p_dropdown_onChange_0_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onPageDropdownChange($event));
    });
    \u0275\u0275template(1, Paginator_div_0_p_dropdown_8_ng_template_1_Template, 1, 1, "ng-template", 26);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("options", ctx_r1.pageItems)("ngModel", ctx_r1.getPage())("disabled", ctx_r1.empty())("appendTo", ctx_r1.dropdownAppendTo)("scrollHeight", ctx_r1.dropdownScrollHeight);
  }
}
function Paginator_div_0_AngleRightIcon_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "AngleRightIcon", 19);
  }
  if (rf & 2) {
    \u0275\u0275property("styleClass", "p-paginator-icon");
  }
}
function Paginator_div_0_span_11_1_ng_template_0_Template(rf, ctx) {
}
function Paginator_div_0_span_11_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, Paginator_div_0_span_11_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function Paginator_div_0_span_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 20);
    \u0275\u0275template(1, Paginator_div_0_span_11_1_Template, 1, 0, null, 21);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r1.nextPageLinkIconTemplate);
  }
}
function Paginator_div_0_button_12_AngleDoubleRightIcon_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "AngleDoubleRightIcon", 19);
  }
  if (rf & 2) {
    \u0275\u0275property("styleClass", "p-paginator-icon");
  }
}
function Paginator_div_0_button_12_span_2_1_ng_template_0_Template(rf, ctx) {
}
function Paginator_div_0_button_12_span_2_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, Paginator_div_0_button_12_span_2_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function Paginator_div_0_button_12_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 20);
    \u0275\u0275template(1, Paginator_div_0_button_12_span_2_1_Template, 1, 0, null, 21);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r1.lastPageLinkIconTemplate);
  }
}
function Paginator_div_0_button_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 27);
    \u0275\u0275listener("click", function Paginator_div_0_button_12_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.changePageToLast($event));
    });
    \u0275\u0275template(1, Paginator_div_0_button_12_AngleDoubleRightIcon_1_Template, 1, 1, "AngleDoubleRightIcon", 6)(2, Paginator_div_0_button_12_span_2_Template, 2, 1, "span", 7);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r1.isLastPage() || ctx_r1.empty())("ngClass", \u0275\u0275pureFunction1(4, _c05, ctx_r1.isLastPage() || ctx_r1.empty()));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.lastPageLinkIconTemplate);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.lastPageLinkIconTemplate);
  }
}
function Paginator_div_0_p_inputNumber_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p-inputNumber", 28);
    \u0275\u0275listener("ngModelChange", function Paginator_div_0_p_inputNumber_13_Template_p_inputNumber_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.changePage($event - 1));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngModel", ctx_r1.currentPage())("disabled", ctx_r1.empty());
  }
}
function Paginator_div_0_p_dropdown_14_ng_container_1_ng_template_1_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function Paginator_div_0_p_dropdown_14_ng_container_1_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, Paginator_div_0_p_dropdown_14_ng_container_1_ng_template_1_ng_container_0_Template, 1, 0, "ng-container", 16);
  }
  if (rf & 2) {
    const item_r10 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275property("ngTemplateOutlet", ctx_r1.dropdownItemTemplate)("ngTemplateOutletContext", \u0275\u0275pureFunction1(2, _c18, item_r10));
  }
}
function Paginator_div_0_p_dropdown_14_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, Paginator_div_0_p_dropdown_14_ng_container_1_ng_template_1_Template, 1, 4, "ng-template", 31);
    \u0275\u0275elementContainerEnd();
  }
}
function Paginator_div_0_p_dropdown_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p-dropdown", 29);
    \u0275\u0275twoWayListener("ngModelChange", function Paginator_div_0_p_dropdown_14_Template_p_dropdown_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.rows, $event) || (ctx_r1.rows = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("onChange", function Paginator_div_0_p_dropdown_14_Template_p_dropdown_onChange_0_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onRppChange($event));
    });
    \u0275\u0275template(1, Paginator_div_0_p_dropdown_14_ng_container_1_Template, 2, 0, "ng-container", 30);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("options", ctx_r1.rowsPerPageItems);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.rows);
    \u0275\u0275property("disabled", ctx_r1.empty())("appendTo", ctx_r1.dropdownAppendTo)("scrollHeight", ctx_r1.dropdownScrollHeight);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.dropdownItemTemplate);
  }
}
function Paginator_div_0_div_15_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function Paginator_div_0_div_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32);
    \u0275\u0275template(1, Paginator_div_0_div_15_ng_container_1_Template, 1, 0, "ng-container", 16);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r1.templateRight)("ngTemplateOutletContext", \u0275\u0275pureFunction1(2, _c18, ctx_r1.paginatorState));
  }
}
function Paginator_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275template(1, Paginator_div_0_div_1_Template, 2, 4, "div", 2)(2, Paginator_div_0_span_2_Template, 2, 1, "span", 3)(3, Paginator_div_0_button_3_Template, 3, 6, "button", 4);
    \u0275\u0275elementStart(4, "button", 5);
    \u0275\u0275listener("click", function Paginator_div_0_Template_button_click_4_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.changePageToPrev($event));
    });
    \u0275\u0275template(5, Paginator_div_0_AngleLeftIcon_5_Template, 1, 1, "AngleLeftIcon", 6)(6, Paginator_div_0_span_6_Template, 2, 1, "span", 7);
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, Paginator_div_0_span_7_Template, 2, 1, "span", 8)(8, Paginator_div_0_p_dropdown_8_Template, 2, 5, "p-dropdown", 9);
    \u0275\u0275elementStart(9, "button", 10);
    \u0275\u0275listener("click", function Paginator_div_0_Template_button_click_9_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.changePageToNext($event));
    });
    \u0275\u0275template(10, Paginator_div_0_AngleRightIcon_10_Template, 1, 1, "AngleRightIcon", 6)(11, Paginator_div_0_span_11_Template, 2, 1, "span", 7);
    \u0275\u0275elementEnd();
    \u0275\u0275template(12, Paginator_div_0_button_12_Template, 3, 6, "button", 11)(13, Paginator_div_0_p_inputNumber_13_Template, 1, 2, "p-inputNumber", 12)(14, Paginator_div_0_p_dropdown_14_Template, 2, 6, "p-dropdown", 13)(15, Paginator_div_0_div_15_Template, 2, 4, "div", 14);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r1.styleClass);
    \u0275\u0275property("ngStyle", ctx_r1.style)("ngClass", "p-paginator p-component");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.templateLeft);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.showCurrentPageReport);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.showFirstLastIcon);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.isFirstPage() || ctx_r1.empty())("ngClass", \u0275\u0275pureFunction1(21, _c05, ctx_r1.isFirstPage() || ctx_r1.empty()));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.previousPageLinkIconTemplate);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.previousPageLinkIconTemplate);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.showPageLinks);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.showJumpToPageDropdown);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.isLastPage() || ctx_r1.empty())("ngClass", \u0275\u0275pureFunction1(23, _c05, ctx_r1.isLastPage() || ctx_r1.empty()));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.nextPageLinkIconTemplate);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.nextPageLinkIconTemplate);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.showFirstLastIcon);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.showJumpToPageInput);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.rowsPerPageOptions);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.templateRight);
  }
}
var Paginator = class {
  constructor(cd) {
    this.cd = cd;
    this.pageLinkSize = 5;
    this.onPageChange = new EventEmitter();
    this.alwaysShow = true;
    this.dropdownScrollHeight = "200px";
    this.currentPageReportTemplate = "{currentPage} of {totalPages}";
    this.showFirstLastIcon = true;
    this.totalRecords = 0;
    this.rows = 0;
    this.showPageLinks = true;
    this._first = 0;
    this._page = 0;
  }
  ngOnInit() {
    this.updatePaginatorState();
  }
  ngAfterContentInit() {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case "firstpagelinkicon":
          this.firstPageLinkIconTemplate = item.template;
          break;
        case "previouspagelinkicon":
          this.previousPageLinkIconTemplate = item.template;
          break;
        case "lastpagelinkicon":
          this.lastPageLinkIconTemplate = item.template;
          break;
        case "nextpagelinkicon":
          this.nextPageLinkIconTemplate = item.template;
          break;
      }
    });
  }
  ngOnChanges(simpleChange) {
    if (simpleChange.totalRecords) {
      this.updatePageLinks();
      this.updatePaginatorState();
      this.updateFirst();
      this.updateRowsPerPageOptions();
    }
    if (simpleChange.first) {
      this._first = simpleChange.first.currentValue;
      this.updatePageLinks();
      this.updatePaginatorState();
    }
    if (simpleChange.rows) {
      this.updatePageLinks();
      this.updatePaginatorState();
    }
    if (simpleChange.rowsPerPageOptions) {
      this.updateRowsPerPageOptions();
    }
  }
  get first() {
    return this._first;
  }
  set first(val) {
    this._first = val;
  }
  updateRowsPerPageOptions() {
    if (this.rowsPerPageOptions) {
      this.rowsPerPageItems = [];
      for (let opt of this.rowsPerPageOptions) {
        if (typeof opt == "object" && opt["showAll"]) {
          this.rowsPerPageItems.unshift({
            label: opt["showAll"],
            value: this.totalRecords
          });
        } else {
          this.rowsPerPageItems.push({
            label: String(opt),
            value: opt
          });
        }
      }
    }
  }
  isFirstPage() {
    return this.getPage() === 0;
  }
  isLastPage() {
    return this.getPage() === this.getPageCount() - 1;
  }
  getPageCount() {
    return Math.ceil(this.totalRecords / this.rows);
  }
  calculatePageLinkBoundaries() {
    let numberOfPages = this.getPageCount(), visiblePages = Math.min(this.pageLinkSize, numberOfPages);
    let start = Math.max(0, Math.ceil(this.getPage() - visiblePages / 2)), end = Math.min(numberOfPages - 1, start + visiblePages - 1);
    var delta = this.pageLinkSize - (end - start + 1);
    start = Math.max(0, start - delta);
    return [start, end];
  }
  updatePageLinks() {
    this.pageLinks = [];
    let boundaries = this.calculatePageLinkBoundaries(), start = boundaries[0], end = boundaries[1];
    for (let i = start; i <= end; i++) {
      this.pageLinks.push(i + 1);
    }
    if (this.showJumpToPageDropdown) {
      this.pageItems = [];
      for (let i = 0; i < this.getPageCount(); i++) {
        this.pageItems.push({
          label: String(i + 1),
          value: i
        });
      }
    }
  }
  changePage(p) {
    var pc = this.getPageCount();
    if (p >= 0 && p < pc) {
      this._first = this.rows * p;
      var state = {
        page: p,
        first: this.first,
        rows: this.rows,
        pageCount: pc
      };
      this.updatePageLinks();
      this.onPageChange.emit(state);
      this.updatePaginatorState();
    }
  }
  updateFirst() {
    const page = this.getPage();
    if (page > 0 && this.totalRecords && this.first >= this.totalRecords) {
      Promise.resolve(null).then(() => this.changePage(page - 1));
    }
  }
  getPage() {
    return Math.floor(this.first / this.rows);
  }
  changePageToFirst(event) {
    if (!this.isFirstPage()) {
      this.changePage(0);
    }
    event.preventDefault();
  }
  changePageToPrev(event) {
    this.changePage(this.getPage() - 1);
    event.preventDefault();
  }
  changePageToNext(event) {
    this.changePage(this.getPage() + 1);
    event.preventDefault();
  }
  changePageToLast(event) {
    if (!this.isLastPage()) {
      this.changePage(this.getPageCount() - 1);
    }
    event.preventDefault();
  }
  onPageLinkClick(event, page) {
    this.changePage(page);
    event.preventDefault();
  }
  onRppChange(event) {
    this.changePage(this.getPage());
  }
  onPageDropdownChange(event) {
    this.changePage(event.value);
  }
  updatePaginatorState() {
    this.paginatorState = {
      page: this.getPage(),
      pageCount: this.getPageCount(),
      rows: this.rows,
      first: this.first,
      totalRecords: this.totalRecords
    };
  }
  empty() {
    return this.getPageCount() === 0;
  }
  currentPage() {
    return this.getPageCount() > 0 ? this.getPage() + 1 : 0;
  }
  get currentPageReport() {
    return this.currentPageReportTemplate.replace("{currentPage}", String(this.currentPage())).replace("{totalPages}", String(this.getPageCount())).replace("{first}", String(this.totalRecords > 0 ? this._first + 1 : 0)).replace("{last}", String(Math.min(this._first + this.rows, this.totalRecords))).replace("{rows}", String(this.rows)).replace("{totalRecords}", String(this.totalRecords));
  }
};
Paginator.\u0275fac = function Paginator_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || Paginator)(\u0275\u0275directiveInject(ChangeDetectorRef));
};
Paginator.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
  type: Paginator,
  selectors: [["p-paginator"]],
  contentQueries: function Paginator_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      \u0275\u0275contentQuery(dirIndex, PrimeTemplate, 4);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.templates = _t);
    }
  },
  hostAttrs: [1, "p-element"],
  inputs: {
    pageLinkSize: "pageLinkSize",
    style: "style",
    styleClass: "styleClass",
    alwaysShow: "alwaysShow",
    templateLeft: "templateLeft",
    templateRight: "templateRight",
    dropdownAppendTo: "dropdownAppendTo",
    dropdownScrollHeight: "dropdownScrollHeight",
    currentPageReportTemplate: "currentPageReportTemplate",
    showCurrentPageReport: "showCurrentPageReport",
    showFirstLastIcon: "showFirstLastIcon",
    totalRecords: "totalRecords",
    rows: "rows",
    rowsPerPageOptions: "rowsPerPageOptions",
    showJumpToPageDropdown: "showJumpToPageDropdown",
    showJumpToPageInput: "showJumpToPageInput",
    showPageLinks: "showPageLinks",
    dropdownItemTemplate: "dropdownItemTemplate",
    first: "first"
  },
  outputs: {
    onPageChange: "onPageChange"
  },
  standalone: false,
  features: [\u0275\u0275NgOnChangesFeature],
  decls: 1,
  vars: 1,
  consts: [[3, "class", "ngStyle", "ngClass", 4, "ngIf"], [3, "ngStyle", "ngClass"], ["class", "p-paginator-left-content", 4, "ngIf"], ["class", "p-paginator-current", 4, "ngIf"], ["type", "button", "pRipple", "", "class", "p-paginator-first p-paginator-element p-link", 3, "disabled", "ngClass", "click", 4, "ngIf"], ["type", "button", "pRipple", "", 1, "p-paginator-prev", "p-paginator-element", "p-link", 3, "click", "disabled", "ngClass"], [3, "styleClass", 4, "ngIf"], ["class", "p-paginator-icon", 4, "ngIf"], ["class", "p-paginator-pages", 4, "ngIf"], ["styleClass", "p-paginator-page-options", 3, "options", "ngModel", "disabled", "appendTo", "scrollHeight", "onChange", 4, "ngIf"], ["type", "button", "pRipple", "", 1, "p-paginator-next", "p-paginator-element", "p-link", 3, "click", "disabled", "ngClass"], ["type", "button", "pRipple", "", "class", "p-paginator-last p-paginator-element p-link", 3, "disabled", "ngClass", "click", 4, "ngIf"], ["class", "p-paginator-page-input", 3, "ngModel", "disabled", "ngModelChange", 4, "ngIf"], ["styleClass", "p-paginator-rpp-options", 3, "options", "ngModel", "disabled", "appendTo", "scrollHeight", "ngModelChange", "onChange", 4, "ngIf"], ["class", "p-paginator-right-content", 4, "ngIf"], [1, "p-paginator-left-content"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "p-paginator-current"], ["type", "button", "pRipple", "", 1, "p-paginator-first", "p-paginator-element", "p-link", 3, "click", "disabled", "ngClass"], [3, "styleClass"], [1, "p-paginator-icon"], [4, "ngTemplateOutlet"], [1, "p-paginator-pages"], ["type", "button", "class", "p-paginator-page p-paginator-element p-link", "pRipple", "", 3, "ngClass", "click", 4, "ngFor", "ngForOf"], ["type", "button", "pRipple", "", 1, "p-paginator-page", "p-paginator-element", "p-link", 3, "click", "ngClass"], ["styleClass", "p-paginator-page-options", 3, "onChange", "options", "ngModel", "disabled", "appendTo", "scrollHeight"], ["pTemplate", "selectedItem"], ["type", "button", "pRipple", "", 1, "p-paginator-last", "p-paginator-element", "p-link", 3, "click", "disabled", "ngClass"], [1, "p-paginator-page-input", 3, "ngModelChange", "ngModel", "disabled"], ["styleClass", "p-paginator-rpp-options", 3, "ngModelChange", "onChange", "options", "ngModel", "disabled", "appendTo", "scrollHeight"], [4, "ngIf"], ["pTemplate", "item"], [1, "p-paginator-right-content"]],
  template: function Paginator_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275template(0, Paginator_div_0_Template, 16, 25, "div", 0);
    }
    if (rf & 2) {
      \u0275\u0275property("ngIf", ctx.alwaysShow ? true : ctx.pageLinks && ctx.pageLinks.length > 1);
    }
  },
  dependencies: () => [NgClass, NgForOf, NgIf, NgTemplateOutlet, NgStyle, Dropdown, PrimeTemplate, InputNumber, NgControlStatus, NgModel, Ripple, AngleDoubleLeftIcon, AngleDoubleRightIcon, AngleLeftIcon, AngleRightIcon],
  styles: [".p-paginator{display:flex;align-items:center;justify-content:center;flex-wrap:wrap}.p-paginator-left-content{margin-right:auto}.p-paginator-right-content{margin-left:auto}.p-paginator-page,.p-paginator-next,.p-paginator-last,.p-paginator-first,.p-paginator-prev,.p-paginator-current{cursor:pointer;display:inline-flex;align-items:center;justify-content:center;line-height:1;-webkit-user-select:none;user-select:none;overflow:hidden;position:relative}.p-paginator-element:focus{z-index:1;position:relative}\n"],
  encapsulation: 2,
  changeDetection: 0
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Paginator, [{
    type: Component,
    args: [{
      selector: "p-paginator",
      template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="'p-paginator p-component'" *ngIf="alwaysShow ? true : pageLinks && pageLinks.length > 1">
            <div class="p-paginator-left-content" *ngIf="templateLeft">
                <ng-container *ngTemplateOutlet="templateLeft; context: { $implicit: paginatorState }"></ng-container>
            </div>
            <span class="p-paginator-current" *ngIf="showCurrentPageReport">{{ currentPageReport }}</span>
            <button *ngIf="showFirstLastIcon" type="button" [disabled]="isFirstPage() || empty()" (click)="changePageToFirst($event)" pRipple class="p-paginator-first p-paginator-element p-link" [ngClass]="{ 'p-disabled': isFirstPage() || empty() }">
                <AngleDoubleLeftIcon *ngIf="!firstPageLinkIconTemplate" [styleClass]="'p-paginator-icon'"/>
                <span class="p-paginator-icon" *ngIf="firstPageLinkIconTemplate">
                    <ng-template *ngTemplateOutlet="firstPageLinkIconTemplate"></ng-template>
                </span>
            </button>
            <button type="button" [disabled]="isFirstPage() || empty()" (click)="changePageToPrev($event)" pRipple class="p-paginator-prev p-paginator-element p-link" [ngClass]="{ 'p-disabled': isFirstPage() || empty() }">
                <AngleLeftIcon *ngIf="!previousPageLinkIconTemplate" [styleClass]="'p-paginator-icon'"/>
                <span class="p-paginator-icon" *ngIf="previousPageLinkIconTemplate">
                    <ng-template *ngTemplateOutlet="previousPageLinkIconTemplate"></ng-template>
                </span>
            </button>
            <span class="p-paginator-pages" *ngIf="showPageLinks">
                <button type="button" *ngFor="let pageLink of pageLinks" class="p-paginator-page p-paginator-element p-link" [ngClass]="{ 'p-highlight': pageLink - 1 == getPage() }" (click)="onPageLinkClick($event, pageLink - 1)" pRipple>
                    {{ pageLink }}
                </button>
            </span>
            <p-dropdown
                [options]="pageItems"
                [ngModel]="getPage()"
                *ngIf="showJumpToPageDropdown"
                [disabled]="empty()"
                styleClass="p-paginator-page-options"
                (onChange)="onPageDropdownChange($event)"
                [appendTo]="dropdownAppendTo"
                [scrollHeight]="dropdownScrollHeight"
            >
                <ng-template pTemplate="selectedItem">{{ currentPageReport }}</ng-template>
            </p-dropdown>
            <button type="button" [disabled]="isLastPage() || empty()" (click)="changePageToNext($event)" pRipple class="p-paginator-next p-paginator-element p-link" [ngClass]="{ 'p-disabled': isLastPage() || empty() }">
                <AngleRightIcon *ngIf="!nextPageLinkIconTemplate" [styleClass]="'p-paginator-icon'"/>
                <span class="p-paginator-icon" *ngIf="nextPageLinkIconTemplate">
                    <ng-template *ngTemplateOutlet="nextPageLinkIconTemplate"></ng-template>
                </span>
            </button>
            <button *ngIf="showFirstLastIcon" type="button" [disabled]="isLastPage() || empty()" (click)="changePageToLast($event)" pRipple class="p-paginator-last p-paginator-element p-link" [ngClass]="{ 'p-disabled': isLastPage() || empty() }">
                <AngleDoubleRightIcon *ngIf="!lastPageLinkIconTemplate" [styleClass]="'p-paginator-icon'"/>
                <span class="p-paginator-icon" *ngIf="lastPageLinkIconTemplate">
                    <ng-template *ngTemplateOutlet="lastPageLinkIconTemplate"></ng-template>
                </span>
            </button>
            <p-inputNumber *ngIf="showJumpToPageInput" [ngModel]="currentPage()" class="p-paginator-page-input" [disabled]="empty()" (ngModelChange)="changePage($event - 1)"></p-inputNumber>
            <p-dropdown
                [options]="rowsPerPageItems"
                [(ngModel)]="rows"
                *ngIf="rowsPerPageOptions"
                styleClass="p-paginator-rpp-options"
                [disabled]="empty()"
                (onChange)="onRppChange($event)"
                [appendTo]="dropdownAppendTo"
                [scrollHeight]="dropdownScrollHeight"
            >
                <ng-container *ngIf="dropdownItemTemplate">
                    <ng-template let-item pTemplate="item">
                        <ng-container *ngTemplateOutlet="dropdownItemTemplate; context: { $implicit: item }"> </ng-container>
                    </ng-template>
                </ng-container>
            </p-dropdown>
            <div class="p-paginator-right-content" *ngIf="templateRight">
                <ng-container *ngTemplateOutlet="templateRight; context: { $implicit: paginatorState }"></ng-container>
            </div>
        </div>
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      host: {
        class: "p-element"
      },
      styles: [".p-paginator{display:flex;align-items:center;justify-content:center;flex-wrap:wrap}.p-paginator-left-content{margin-right:auto}.p-paginator-right-content{margin-left:auto}.p-paginator-page,.p-paginator-next,.p-paginator-last,.p-paginator-first,.p-paginator-prev,.p-paginator-current{cursor:pointer;display:inline-flex;align-items:center;justify-content:center;line-height:1;-webkit-user-select:none;user-select:none;overflow:hidden;position:relative}.p-paginator-element:focus{z-index:1;position:relative}\n"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }];
  }, {
    pageLinkSize: [{
      type: Input
    }],
    onPageChange: [{
      type: Output
    }],
    style: [{
      type: Input
    }],
    styleClass: [{
      type: Input
    }],
    alwaysShow: [{
      type: Input
    }],
    templateLeft: [{
      type: Input
    }],
    templateRight: [{
      type: Input
    }],
    dropdownAppendTo: [{
      type: Input
    }],
    dropdownScrollHeight: [{
      type: Input
    }],
    currentPageReportTemplate: [{
      type: Input
    }],
    showCurrentPageReport: [{
      type: Input
    }],
    showFirstLastIcon: [{
      type: Input
    }],
    totalRecords: [{
      type: Input
    }],
    rows: [{
      type: Input
    }],
    rowsPerPageOptions: [{
      type: Input
    }],
    showJumpToPageDropdown: [{
      type: Input
    }],
    showJumpToPageInput: [{
      type: Input
    }],
    showPageLinks: [{
      type: Input
    }],
    dropdownItemTemplate: [{
      type: Input
    }],
    templates: [{
      type: ContentChildren,
      args: [PrimeTemplate]
    }],
    first: [{
      type: Input
    }]
  });
})();
var PaginatorModule = class {
};
PaginatorModule.\u0275fac = function PaginatorModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || PaginatorModule)();
};
PaginatorModule.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: PaginatorModule,
  declarations: [Paginator],
  imports: [CommonModule, DropdownModule, InputNumberModule, FormsModule, SharedModule, RippleModule, AngleDoubleLeftIcon, AngleDoubleRightIcon, AngleLeftIcon, AngleRightIcon],
  exports: [Paginator, DropdownModule, InputNumberModule, FormsModule, SharedModule]
});
PaginatorModule.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
  imports: [CommonModule, DropdownModule, InputNumberModule, FormsModule, SharedModule, RippleModule, AngleDoubleLeftIcon, AngleDoubleRightIcon, AngleLeftIcon, AngleRightIcon, DropdownModule, InputNumberModule, FormsModule, SharedModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PaginatorModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, DropdownModule, InputNumberModule, FormsModule, SharedModule, RippleModule, AngleDoubleLeftIcon, AngleDoubleRightIcon, AngleLeftIcon, AngleRightIcon],
      exports: [Paginator, DropdownModule, InputNumberModule, FormsModule, SharedModule],
      declarations: [Paginator]
    }]
  }], null, null);
})();

// node_modules/primeng/fesm2020/primeng-selectbutton.mjs
var _c06 = (a0, a1, a2) => ({
  "p-highlight": a0,
  "p-disabled": a1,
  "p-button-icon-only": a2
});
var _c19 = (a0, a1) => ({
  $implicit: a0,
  index: a1
});
function SelectButton_div_1_ng_container_2_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 8);
  }
  if (rf & 2) {
    const option_r3 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275classMap(option_r3.icon);
    \u0275\u0275property("ngClass", "p-button-icon p-button-icon-left");
  }
}
function SelectButton_div_1_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, SelectButton_div_1_ng_container_2_span_1_Template, 1, 3, "span", 6);
    \u0275\u0275elementStart(2, "span", 7);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const option_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", option_r3.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r4.getOptionLabel(option_r3));
  }
}
function SelectButton_div_1_ng_template_3_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function SelectButton_div_1_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, SelectButton_div_1_ng_template_3_ng_container_0_Template, 1, 0, "ng-container", 9);
  }
  if (rf & 2) {
    const ctx_r6 = \u0275\u0275nextContext();
    const option_r3 = ctx_r6.$implicit;
    const i_r4 = ctx_r6.index;
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275property("ngTemplateOutlet", ctx_r4.itemTemplate)("ngTemplateOutletContext", \u0275\u0275pureFunction2(2, _c19, option_r3, i_r4));
  }
}
function SelectButton_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 4, 0);
    \u0275\u0275listener("click", function SelectButton_div_1_Template_div_click_0_listener($event) {
      const ctx_r1 = \u0275\u0275restoreView(_r1);
      const option_r3 = ctx_r1.$implicit;
      const i_r4 = ctx_r1.index;
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.onItemClick($event, option_r3, i_r4));
    })("keydown.enter", function SelectButton_div_1_Template_div_keydown_enter_0_listener($event) {
      const ctx_r5 = \u0275\u0275restoreView(_r1);
      const option_r3 = ctx_r5.$implicit;
      const i_r4 = ctx_r5.index;
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.onItemClick($event, option_r3, i_r4));
    })("blur", function SelectButton_div_1_Template_div_blur_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.onBlur());
    });
    \u0275\u0275template(2, SelectButton_div_1_ng_container_2_Template, 4, 2, "ng-container", 5)(3, SelectButton_div_1_ng_template_3_Template, 1, 5, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const option_r3 = ctx.$implicit;
    const customcontent_r8 = \u0275\u0275reference(4);
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275classMap(option_r3.styleClass);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction3(10, _c06, ctx_r4.isSelected(option_r3), ctx_r4.disabled || ctx_r4.isOptionDisabled(option_r3), option_r3.icon && !ctx_r4.getOptionLabel(option_r3)));
    \u0275\u0275attribute("aria-pressed", ctx_r4.isSelected(option_r3))("title", option_r3.title)("aria-label", option_r3.label)("tabindex", ctx_r4.disabled ? null : ctx_r4.tabindex)("aria-labelledby", ctx_r4.getOptionLabel(option_r3));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", !ctx_r4.itemTemplate)("ngIfElse", customcontent_r8);
  }
}
var SELECTBUTTON_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectButton),
  multi: true
};
var SelectButton = class {
  constructor(cd) {
    this.cd = cd;
    this.tabindex = 0;
    this.onOptionClick = new EventEmitter();
    this.onChange = new EventEmitter();
    this.onModelChange = () => {
    };
    this.onModelTouched = () => {
    };
  }
  getOptionLabel(option) {
    return this.optionLabel ? ObjectUtils.resolveFieldData(option, this.optionLabel) : option.label != void 0 ? option.label : option;
  }
  getOptionValue(option) {
    return this.optionValue ? ObjectUtils.resolveFieldData(option, this.optionValue) : this.optionLabel || option.value === void 0 ? option : option.value;
  }
  isOptionDisabled(option) {
    return this.optionDisabled ? ObjectUtils.resolveFieldData(option, this.optionDisabled) : option.disabled !== void 0 ? option.disabled : false;
  }
  writeValue(value) {
    this.value = value;
    this.cd.markForCheck();
  }
  registerOnChange(fn) {
    this.onModelChange = fn;
  }
  registerOnTouched(fn) {
    this.onModelTouched = fn;
  }
  setDisabledState(val) {
    this.disabled = val;
    this.cd.markForCheck();
  }
  onItemClick(event, option, index) {
    if (this.disabled || this.isOptionDisabled(option)) {
      return;
    }
    if (this.multiple) {
      if (this.isSelected(option)) this.removeOption(option);
      else this.value = [...this.value || [], this.getOptionValue(option)];
      this.onModelChange(this.value);
      this.onChange.emit({
        originalEvent: event,
        value: this.value
      });
    } else {
      let value = this.getOptionValue(option);
      if (this.value !== value) {
        this.value = this.getOptionValue(option);
        this.onModelChange(this.value);
        this.onChange.emit({
          originalEvent: event,
          value: this.value
        });
      }
    }
    this.onOptionClick.emit({
      originalEvent: event,
      option,
      index
    });
  }
  onBlur() {
    this.onModelTouched();
  }
  removeOption(option) {
    this.value = this.value.filter((val) => !ObjectUtils.equals(val, this.getOptionValue(option), this.dataKey));
  }
  isSelected(option) {
    let selected = false;
    let optionValue = this.getOptionValue(option);
    if (this.multiple) {
      if (this.value && Array.isArray(this.value)) {
        for (let val of this.value) {
          if (ObjectUtils.equals(val, optionValue, this.dataKey)) {
            selected = true;
            break;
          }
        }
      }
    } else {
      selected = ObjectUtils.equals(this.getOptionValue(option), this.value, this.dataKey);
    }
    return selected;
  }
};
SelectButton.\u0275fac = function SelectButton_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || SelectButton)(\u0275\u0275directiveInject(ChangeDetectorRef));
};
SelectButton.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
  type: SelectButton,
  selectors: [["p-selectButton"]],
  contentQueries: function SelectButton_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      \u0275\u0275contentQuery(dirIndex, TemplateRef, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.itemTemplate = _t.first);
    }
  },
  hostAttrs: [1, "p-element"],
  inputs: {
    options: "options",
    optionLabel: "optionLabel",
    optionValue: "optionValue",
    optionDisabled: "optionDisabled",
    tabindex: "tabindex",
    multiple: "multiple",
    style: "style",
    styleClass: "styleClass",
    ariaLabelledBy: "ariaLabelledBy",
    disabled: "disabled",
    dataKey: "dataKey"
  },
  outputs: {
    onOptionClick: "onOptionClick",
    onChange: "onChange"
  },
  standalone: false,
  features: [\u0275\u0275ProvidersFeature([SELECTBUTTON_VALUE_ACCESSOR])],
  decls: 2,
  vars: 5,
  consts: [["btn", ""], ["customcontent", ""], ["role", "group", 3, "ngClass", "ngStyle"], ["class", "p-button p-component", "role", "button", "pRipple", "", 3, "class", "ngClass", "click", "keydown.enter", "blur", 4, "ngFor", "ngForOf"], ["role", "button", "pRipple", "", 1, "p-button", "p-component", 3, "click", "keydown.enter", "blur", "ngClass"], [4, "ngIf", "ngIfElse"], [3, "ngClass", "class", 4, "ngIf"], [1, "p-button-label"], [3, "ngClass"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"]],
  template: function SelectButton_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 2);
      \u0275\u0275template(1, SelectButton_div_1_Template, 5, 14, "div", 3);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275classMap(ctx.styleClass);
      \u0275\u0275property("ngClass", "p-selectbutton p-buttonset p-component")("ngStyle", ctx.style);
      \u0275\u0275advance();
      \u0275\u0275property("ngForOf", ctx.options);
    }
  },
  dependencies: [NgClass, NgForOf, NgIf, NgTemplateOutlet, NgStyle, Ripple],
  styles: ['.p-button{margin:0;display:inline-flex;cursor:pointer;-webkit-user-select:none;user-select:none;align-items:center;vertical-align:bottom;text-align:center;overflow:hidden;position:relative}.p-button-label{flex:1 1 auto}.p-button-icon-right{order:1}.p-button:disabled{cursor:default}.p-button-icon-only{justify-content:center}.p-button-icon-only:after{content:"p";visibility:hidden;clip:rect(0 0 0 0);width:0}.p-button-vertical{flex-direction:column}.p-button-icon-bottom{order:2}.p-buttonset .p-button{margin:0}.p-buttonset .p-button:not(:last-child){border-right:0 none}.p-buttonset .p-button:not(:first-of-type):not(:last-of-type){border-radius:0}.p-buttonset .p-button:first-of-type{border-top-right-radius:0;border-bottom-right-radius:0}.p-buttonset .p-button:last-of-type{border-top-left-radius:0;border-bottom-left-radius:0}.p-buttonset .p-button:focus{position:relative;z-index:1}\n'],
  encapsulation: 2,
  changeDetection: 0
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SelectButton, [{
    type: Component,
    args: [{
      selector: "p-selectButton",
      template: `
        <div [ngClass]="'p-selectbutton p-buttonset p-component'" [ngStyle]="style" [class]="styleClass" role="group">
            <div
                *ngFor="let option of options; let i = index"
                #btn
                class="p-button p-component"
                [class]="option.styleClass"
                role="button"
                [attr.aria-pressed]="isSelected(option)"
                [ngClass]="{ 'p-highlight': isSelected(option), 'p-disabled': disabled || isOptionDisabled(option), 'p-button-icon-only': option.icon && !getOptionLabel(option) }"
                (click)="onItemClick($event, option, i)"
                (keydown.enter)="onItemClick($event, option, i)"
                [attr.title]="option.title"
                [attr.aria-label]="option.label"
                (blur)="onBlur()"
                [attr.tabindex]="disabled ? null : tabindex"
                [attr.aria-labelledby]="this.getOptionLabel(option)"
                pRipple
            >
                <ng-container *ngIf="!itemTemplate; else customcontent">
                    <span [ngClass]="'p-button-icon p-button-icon-left'" [class]="option.icon" *ngIf="option.icon"></span>
                    <span class="p-button-label">{{ getOptionLabel(option) }}</span>
                </ng-container>
                <ng-template #customcontent>
                    <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: option, index: i }"></ng-container>
                </ng-template>
            </div>
        </div>
    `,
      providers: [SELECTBUTTON_VALUE_ACCESSOR],
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      host: {
        class: "p-element"
      },
      styles: ['.p-button{margin:0;display:inline-flex;cursor:pointer;-webkit-user-select:none;user-select:none;align-items:center;vertical-align:bottom;text-align:center;overflow:hidden;position:relative}.p-button-label{flex:1 1 auto}.p-button-icon-right{order:1}.p-button:disabled{cursor:default}.p-button-icon-only{justify-content:center}.p-button-icon-only:after{content:"p";visibility:hidden;clip:rect(0 0 0 0);width:0}.p-button-vertical{flex-direction:column}.p-button-icon-bottom{order:2}.p-buttonset .p-button{margin:0}.p-buttonset .p-button:not(:last-child){border-right:0 none}.p-buttonset .p-button:not(:first-of-type):not(:last-of-type){border-radius:0}.p-buttonset .p-button:first-of-type{border-top-right-radius:0;border-bottom-right-radius:0}.p-buttonset .p-button:last-of-type{border-top-left-radius:0;border-bottom-left-radius:0}.p-buttonset .p-button:focus{position:relative;z-index:1}\n']
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }];
  }, {
    options: [{
      type: Input
    }],
    optionLabel: [{
      type: Input
    }],
    optionValue: [{
      type: Input
    }],
    optionDisabled: [{
      type: Input
    }],
    tabindex: [{
      type: Input
    }],
    multiple: [{
      type: Input
    }],
    style: [{
      type: Input
    }],
    styleClass: [{
      type: Input
    }],
    ariaLabelledBy: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    dataKey: [{
      type: Input
    }],
    onOptionClick: [{
      type: Output
    }],
    onChange: [{
      type: Output
    }],
    itemTemplate: [{
      type: ContentChild,
      args: [TemplateRef]
    }]
  });
})();
var SelectButtonModule = class {
};
SelectButtonModule.\u0275fac = function SelectButtonModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || SelectButtonModule)();
};
SelectButtonModule.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: SelectButtonModule,
  declarations: [SelectButton],
  imports: [CommonModule, RippleModule],
  exports: [SelectButton]
});
SelectButtonModule.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
  imports: [CommonModule, RippleModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SelectButtonModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, RippleModule],
      exports: [SelectButton],
      declarations: [SelectButton]
    }]
  }], null, null);
})();

// node_modules/primeng/fesm2020/primeng-icons-check.mjs
var CheckIcon = class extends BaseIcon {
};
CheckIcon.\u0275fac = /* @__PURE__ */ (() => {
  let \u0275CheckIcon_BaseFactory;
  return function CheckIcon_Factory(__ngFactoryType__) {
    return (\u0275CheckIcon_BaseFactory || (\u0275CheckIcon_BaseFactory = \u0275\u0275getInheritedFactory(CheckIcon)))(__ngFactoryType__ || CheckIcon);
  };
})();
CheckIcon.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
  type: CheckIcon,
  selectors: [["CheckIcon"]],
  features: [\u0275\u0275InheritDefinitionFeature],
  decls: 2,
  vars: 5,
  consts: [["width", "14", "height", "14", "viewBox", "0 0 14 14", "fill", "none", "xmlns", "http://www.w3.org/2000/svg"], ["d", "M4.86199 11.5948C4.78717 11.5923 4.71366 11.5745 4.64596 11.5426C4.57826 11.5107 4.51779 11.4652 4.46827 11.4091L0.753985 7.69483C0.683167 7.64891 0.623706 7.58751 0.580092 7.51525C0.536478 7.44299 0.509851 7.36177 0.502221 7.27771C0.49459 7.19366 0.506156 7.10897 0.536046 7.03004C0.565935 6.95111 0.613367 6.88 0.674759 6.82208C0.736151 6.76416 0.8099 6.72095 0.890436 6.69571C0.970973 6.67046 1.05619 6.66385 1.13966 6.67635C1.22313 6.68886 1.30266 6.72017 1.37226 6.76792C1.44186 6.81567 1.4997 6.8786 1.54141 6.95197L4.86199 10.2503L12.6397 2.49483C12.7444 2.42694 12.8689 2.39617 12.9932 2.40745C13.1174 2.41873 13.2343 2.47141 13.3251 2.55705C13.4159 2.64268 13.4753 2.75632 13.4938 2.87973C13.5123 3.00315 13.4888 3.1292 13.4271 3.23768L5.2557 11.4091C5.20618 11.4652 5.14571 11.5107 5.07801 11.5426C5.01031 11.5745 4.9368 11.5923 4.86199 11.5948Z", "fill", "currentColor"]],
  template: function CheckIcon_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(0, "svg", 0);
      \u0275\u0275element(1, "path", 1);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275classMap(ctx.getClassNames());
      \u0275\u0275attribute("aria-label", ctx.ariaLabel)("aria-hidden", ctx.ariaHidden)("role", ctx.role);
    }
  },
  encapsulation: 2
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CheckIcon, [{
    type: Component,
    args: [{
      selector: "CheckIcon",
      standalone: true,
      imports: [BaseIcon],
      template: `
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" [attr.aria-label]="ariaLabel" [attr.aria-hidden]="ariaHidden" [attr.role]="role" [class]="getClassNames()">
            <path
                d="M4.86199 11.5948C4.78717 11.5923 4.71366 11.5745 4.64596 11.5426C4.57826 11.5107 4.51779 11.4652 4.46827 11.4091L0.753985 7.69483C0.683167 7.64891 0.623706 7.58751 0.580092 7.51525C0.536478 7.44299 0.509851 7.36177 0.502221 7.27771C0.49459 7.19366 0.506156 7.10897 0.536046 7.03004C0.565935 6.95111 0.613367 6.88 0.674759 6.82208C0.736151 6.76416 0.8099 6.72095 0.890436 6.69571C0.970973 6.67046 1.05619 6.66385 1.13966 6.67635C1.22313 6.68886 1.30266 6.72017 1.37226 6.76792C1.44186 6.81567 1.4997 6.8786 1.54141 6.95197L4.86199 10.2503L12.6397 2.49483C12.7444 2.42694 12.8689 2.39617 12.9932 2.40745C13.1174 2.41873 13.2343 2.47141 13.3251 2.55705C13.4159 2.64268 13.4753 2.75632 13.4938 2.87973C13.5123 3.00315 13.4888 3.1292 13.4271 3.23768L5.2557 11.4091C5.20618 11.4652 5.14571 11.5107 5.07801 11.5426C5.01031 11.5745 4.9368 11.5923 4.86199 11.5948Z"
                fill="currentColor"
            />
        </svg>
    `
    }]
  }], null, null);
})();

// node_modules/primeng/fesm2020/primeng-tristatecheckbox.mjs
var _c07 = (a0, a1) => ({
  "p-checkbox p-component": true,
  "p-checkbox-disabled": a0,
  "p-checkbox-focused": a1
});
var _c110 = (a0, a1, a2) => ({
  "p-highlight": a0,
  "p-disabled": a1,
  "p-focus": a2
});
var _c26 = (a0, a1, a2) => ({
  "p-checkbox-label-active": a0,
  "p-disabled": a1,
  "p-checkbox-label-focus": a2
});
function TriStateCheckbox_ng_container_5_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 8);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngClass", ctx_r2.checkboxTrueIcon);
  }
}
function TriStateCheckbox_ng_container_5_ng_container_2_CheckIcon_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "CheckIcon", 11);
  }
  if (rf & 2) {
    \u0275\u0275property("styleClass", "p-checkbox-icon");
  }
}
function TriStateCheckbox_ng_container_5_ng_container_2_span_2_1_ng_template_0_Template(rf, ctx) {
}
function TriStateCheckbox_ng_container_5_ng_container_2_span_2_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, TriStateCheckbox_ng_container_5_ng_container_2_span_2_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function TriStateCheckbox_ng_container_5_ng_container_2_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 12);
    \u0275\u0275template(1, TriStateCheckbox_ng_container_5_ng_container_2_span_2_1_Template, 1, 0, null, 13);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r2.checkIconTemplate);
  }
}
function TriStateCheckbox_ng_container_5_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, TriStateCheckbox_ng_container_5_ng_container_2_CheckIcon_1_Template, 1, 1, "CheckIcon", 9)(2, TriStateCheckbox_ng_container_5_ng_container_2_span_2_Template, 2, 1, "span", 10);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r2.checkIconTemplate);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.checkIconTemplate);
  }
}
function TriStateCheckbox_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, TriStateCheckbox_ng_container_5_span_1_Template, 1, 1, "span", 7)(2, TriStateCheckbox_ng_container_5_ng_container_2_Template, 3, 2, "ng-container", 5);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.checkboxTrueIcon);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r2.checkboxTrueIcon);
  }
}
function TriStateCheckbox_ng_container_6_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 8);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngClass", ctx_r2.checkboxFalseIcon);
  }
}
function TriStateCheckbox_ng_container_6_ng_container_2_TimesIcon_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "TimesIcon", 11);
  }
  if (rf & 2) {
    \u0275\u0275property("styleClass", "p-checkbox-icon");
  }
}
function TriStateCheckbox_ng_container_6_ng_container_2_span_2_1_ng_template_0_Template(rf, ctx) {
}
function TriStateCheckbox_ng_container_6_ng_container_2_span_2_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, TriStateCheckbox_ng_container_6_ng_container_2_span_2_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function TriStateCheckbox_ng_container_6_ng_container_2_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 12);
    \u0275\u0275template(1, TriStateCheckbox_ng_container_6_ng_container_2_span_2_1_Template, 1, 0, null, 13);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r2.uncheckIconTemplate);
  }
}
function TriStateCheckbox_ng_container_6_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, TriStateCheckbox_ng_container_6_ng_container_2_TimesIcon_1_Template, 1, 1, "TimesIcon", 9)(2, TriStateCheckbox_ng_container_6_ng_container_2_span_2_Template, 2, 1, "span", 10);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r2.uncheckIconTemplate);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.uncheckIconTemplate);
  }
}
function TriStateCheckbox_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, TriStateCheckbox_ng_container_6_span_1_Template, 1, 1, "span", 7)(2, TriStateCheckbox_ng_container_6_ng_container_2_Template, 3, 2, "ng-container", 5);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.checkboxFalseIcon);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r2.checkboxFalseIcon);
  }
}
function TriStateCheckbox_label_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 14);
    \u0275\u0275listener("click", function TriStateCheckbox_label_7_Template_label_click_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      const input_r2 = \u0275\u0275reference(3);
      return \u0275\u0275resetView(ctx_r2.onClick($event, input_r2));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction3(3, _c26, ctx_r2.value != null, ctx_r2.disabled, ctx_r2.focused));
    \u0275\u0275attribute("for", ctx_r2.inputId);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.label);
  }
}
var TRISTATECHECKBOX_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TriStateCheckbox),
  multi: true
};
var TriStateCheckbox = class {
  constructor(cd) {
    this.cd = cd;
    this.onChange = new EventEmitter();
    this.onModelChange = () => {
    };
    this.onModelTouched = () => {
    };
  }
  onClick(event, input) {
    if (!this.disabled && !this.readonly) {
      this.toggle(event);
      this.focused = true;
      input.focus();
    }
  }
  onKeydown(event) {
    if (event.keyCode == 32) {
      event.preventDefault();
    }
  }
  onKeyup(event) {
    if (event.keyCode == 32 && !this.readonly) {
      this.toggle(event);
      event.preventDefault();
    }
  }
  toggle(event) {
    if (this.value == null || this.value == void 0) this.value = true;
    else if (this.value == true) this.value = false;
    else if (this.value == false) this.value = null;
    this.onModelChange(this.value);
    this.onChange.emit({
      originalEvent: event,
      value: this.value
    });
  }
  ngAfterContentInit() {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case "checkicon":
          this.checkIconTemplate = item.template;
          break;
        case "uncheckicon":
          this.uncheckIconTemplate = item.template;
          break;
      }
    });
  }
  onFocus() {
    this.focused = true;
  }
  onBlur() {
    this.focused = false;
    this.onModelTouched();
  }
  registerOnChange(fn) {
    this.onModelChange = fn;
  }
  registerOnTouched(fn) {
    this.onModelTouched = fn;
  }
  writeValue(value) {
    this.value = value;
    this.cd.markForCheck();
  }
  setDisabledState(disabled) {
    this.disabled = disabled;
    this.cd.markForCheck();
  }
};
TriStateCheckbox.\u0275fac = function TriStateCheckbox_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || TriStateCheckbox)(\u0275\u0275directiveInject(ChangeDetectorRef));
};
TriStateCheckbox.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
  type: TriStateCheckbox,
  selectors: [["p-triStateCheckbox"]],
  contentQueries: function TriStateCheckbox_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      \u0275\u0275contentQuery(dirIndex, PrimeTemplate, 4);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.templates = _t);
    }
  },
  hostAttrs: [1, "p-element"],
  inputs: {
    disabled: "disabled",
    name: "name",
    ariaLabelledBy: "ariaLabelledBy",
    tabindex: "tabindex",
    inputId: "inputId",
    style: "style",
    styleClass: "styleClass",
    label: "label",
    readonly: "readonly",
    checkboxTrueIcon: "checkboxTrueIcon",
    checkboxFalseIcon: "checkboxFalseIcon"
  },
  outputs: {
    onChange: "onChange"
  },
  standalone: false,
  features: [\u0275\u0275ProvidersFeature([TRISTATECHECKBOX_VALUE_ACCESSOR])],
  decls: 8,
  vars: 22,
  consts: [["input", ""], [3, "ngStyle", "ngClass"], [1, "p-hidden-accessible"], ["type", "text", "inputmode", "none", 3, "keyup", "keydown", "focus", "blur", "name", "readonly", "disabled"], ["role", "checkbox", 1, "p-checkbox-box", 3, "click", "ngClass"], [4, "ngIf"], ["class", "p-checkbox-label", 3, "ngClass", "click", 4, "ngIf"], ["class", "p-checkbox-icon", 3, "ngClass", 4, "ngIf"], [1, "p-checkbox-icon", 3, "ngClass"], [3, "styleClass", 4, "ngIf"], ["class", "p-checkbox-icon", 4, "ngIf"], [3, "styleClass"], [1, "p-checkbox-icon"], [4, "ngTemplateOutlet"], [1, "p-checkbox-label", 3, "click", "ngClass"]],
  template: function TriStateCheckbox_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "input", 3, 0);
      \u0275\u0275listener("keyup", function TriStateCheckbox_Template_input_keyup_2_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onKeyup($event));
      })("keydown", function TriStateCheckbox_Template_input_keydown_2_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onKeydown($event));
      })("focus", function TriStateCheckbox_Template_input_focus_2_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onFocus());
      })("blur", function TriStateCheckbox_Template_input_blur_2_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onBlur());
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(4, "div", 4);
      \u0275\u0275listener("click", function TriStateCheckbox_Template_div_click_4_listener($event) {
        \u0275\u0275restoreView(_r1);
        const input_r2 = \u0275\u0275reference(3);
        return \u0275\u0275resetView(ctx.onClick($event, input_r2));
      });
      \u0275\u0275template(5, TriStateCheckbox_ng_container_5_Template, 3, 2, "ng-container", 5)(6, TriStateCheckbox_ng_container_6_Template, 3, 2, "ng-container", 5);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(7, TriStateCheckbox_label_7_Template, 2, 7, "label", 6);
    }
    if (rf & 2) {
      \u0275\u0275classMap(ctx.styleClass);
      \u0275\u0275property("ngStyle", ctx.style)("ngClass", \u0275\u0275pureFunction2(15, _c07, ctx.disabled, ctx.focused));
      \u0275\u0275advance(2);
      \u0275\u0275property("name", ctx.name)("readonly", ctx.readonly)("disabled", ctx.disabled);
      \u0275\u0275attribute("id", ctx.inputId)("tabindex", ctx.tabindex)("aria-labelledby", ctx.ariaLabelledBy);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngClass", \u0275\u0275pureFunction3(18, _c110, ctx.value != null, ctx.disabled, ctx.focused));
      \u0275\u0275attribute("aria-checked", ctx.value === true);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.value === true);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.value === false);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.label);
    }
  },
  dependencies: () => [NgClass, NgIf, NgTemplateOutlet, NgStyle, CheckIcon, TimesIcon],
  encapsulation: 2,
  changeDetection: 0
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TriStateCheckbox, [{
    type: Component,
    args: [{
      selector: "p-triStateCheckbox",
      template: `
        <div [ngStyle]="style" [ngClass]="{ 'p-checkbox p-component': true, 'p-checkbox-disabled': disabled, 'p-checkbox-focused': focused }" [class]="styleClass">
            <div class="p-hidden-accessible">
                <input
                    #input
                    type="text"
                    [attr.id]="inputId"
                    [name]="name"
                    [attr.tabindex]="tabindex"
                    [readonly]="readonly"
                    [disabled]="disabled"
                    (keyup)="onKeyup($event)"
                    (keydown)="onKeydown($event)"
                    (focus)="onFocus()"
                    (blur)="onBlur()"
                    [attr.aria-labelledby]="ariaLabelledBy"
                    inputmode="none"
                />
            </div>
            <div class="p-checkbox-box" (click)="onClick($event, input)" role="checkbox" [attr.aria-checked]="value === true" [ngClass]="{ 'p-highlight': value != null, 'p-disabled': disabled, 'p-focus': focused }">
                <ng-container *ngIf="value === true">
                    <span *ngIf="checkboxTrueIcon" [ngClass]="checkboxTrueIcon" class="p-checkbox-icon"></span>
                    <ng-container *ngIf="!checkboxTrueIcon">
                        <CheckIcon [styleClass]="'p-checkbox-icon'" *ngIf="!checkIconTemplate"/>
                        <span *ngIf="checkIconTemplate" class="p-checkbox-icon">
                            <ng-template *ngTemplateOutlet="checkIconTemplate"></ng-template>
                        </span>
                    </ng-container>
                </ng-container>
                <ng-container *ngIf="value === false">
                    <span *ngIf="checkboxFalseIcon" [ngClass]="checkboxFalseIcon" class="p-checkbox-icon"></span>
                    <ng-container *ngIf="!checkboxFalseIcon">
                        <TimesIcon [styleClass]="'p-checkbox-icon'" *ngIf="!uncheckIconTemplate" />
                        <span class="p-checkbox-icon" *ngIf="uncheckIconTemplate">
                            <ng-template *ngTemplateOutlet="uncheckIconTemplate"></ng-template>
                        </span>
                    </ng-container>
                </ng-container>
        </div>
        </div>
        <label class="p-checkbox-label" (click)="onClick($event, input)" [ngClass]="{ 'p-checkbox-label-active': value != null, 'p-disabled': disabled, 'p-checkbox-label-focus': focused }" *ngIf="label" [attr.for]="inputId">{{ label }}</label>
    `,
      providers: [TRISTATECHECKBOX_VALUE_ACCESSOR],
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      host: {
        class: "p-element"
      }
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }];
  }, {
    disabled: [{
      type: Input
    }],
    name: [{
      type: Input
    }],
    ariaLabelledBy: [{
      type: Input
    }],
    tabindex: [{
      type: Input
    }],
    inputId: [{
      type: Input
    }],
    style: [{
      type: Input
    }],
    styleClass: [{
      type: Input
    }],
    label: [{
      type: Input
    }],
    readonly: [{
      type: Input
    }],
    checkboxTrueIcon: [{
      type: Input
    }],
    checkboxFalseIcon: [{
      type: Input
    }],
    onChange: [{
      type: Output
    }],
    templates: [{
      type: ContentChildren,
      args: [PrimeTemplate]
    }]
  });
})();
var TriStateCheckboxModule = class {
};
TriStateCheckboxModule.\u0275fac = function TriStateCheckboxModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || TriStateCheckboxModule)();
};
TriStateCheckboxModule.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: TriStateCheckboxModule,
  declarations: [TriStateCheckbox],
  imports: [CommonModule, SharedModule, CheckIcon, TimesIcon],
  exports: [TriStateCheckbox, SharedModule]
});
TriStateCheckboxModule.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
  imports: [CommonModule, SharedModule, CheckIcon, TimesIcon, SharedModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TriStateCheckboxModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, SharedModule, CheckIcon, TimesIcon],
      exports: [TriStateCheckbox, SharedModule],
      declarations: [TriStateCheckbox]
    }]
  }], null, null);
})();

// node_modules/primeng/fesm2020/primeng-icons-arrowdown.mjs
var ArrowDownIcon = class extends BaseIcon {
};
ArrowDownIcon.\u0275fac = /* @__PURE__ */ (() => {
  let \u0275ArrowDownIcon_BaseFactory;
  return function ArrowDownIcon_Factory(__ngFactoryType__) {
    return (\u0275ArrowDownIcon_BaseFactory || (\u0275ArrowDownIcon_BaseFactory = \u0275\u0275getInheritedFactory(ArrowDownIcon)))(__ngFactoryType__ || ArrowDownIcon);
  };
})();
ArrowDownIcon.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
  type: ArrowDownIcon,
  selectors: [["ArrowDownIcon"]],
  features: [\u0275\u0275InheritDefinitionFeature],
  decls: 6,
  vars: 5,
  consts: [["width", "14", "height", "14", "viewBox", "0 0 14 14", "fill", "none", "xmlns", "http://www.w3.org/2000/svg"], ["clip-path", "url(#clip0_326_12468)"], ["fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M6.99994 14C6.91097 14.0004 6.82281 13.983 6.74064 13.9489C6.65843 13.9148 6.58387 13.8646 6.52133 13.8013L1.10198 8.38193C0.982318 8.25351 0.917175 8.08367 0.920272 7.90817C0.923368 7.73267 0.994462 7.56523 1.11858 7.44111C1.24269 7.317 1.41014 7.2459 1.58563 7.2428C1.76113 7.23971 1.93098 7.30485 2.0594 7.42451L6.32263 11.6877V0.677419C6.32263 0.497756 6.394 0.325452 6.52104 0.198411C6.64808 0.0713706 6.82039 0 7.00005 0C7.17971 0 7.35202 0.0713706 7.47906 0.198411C7.6061 0.325452 7.67747 0.497756 7.67747 0.677419V11.6877L11.9407 7.42451C12.0691 7.30485 12.2389 7.23971 12.4144 7.2428C12.5899 7.2459 12.7574 7.317 12.8815 7.44111C13.0056 7.56523 13.0767 7.73267 13.0798 7.90817C13.0829 8.08367 13.0178 8.25351 12.8981 8.38193L7.47875 13.8013C7.41621 13.8646 7.34164 13.9148 7.25944 13.9489C7.17727 13.983 7.08912 14.0004 7.00015 14C7.00012 14 7.00009 14 7.00005 14C7.00001 14 6.99998 14 6.99994 14Z", "fill", "currentColor"], ["id", "clip0_326_12468"], ["width", "14", "height", "14", "fill", "white"]],
  template: function ArrowDownIcon_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(0, "svg", 0)(1, "g", 1);
      \u0275\u0275element(2, "path", 2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "defs")(4, "clipPath", 3);
      \u0275\u0275element(5, "rect", 4);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275classMap(ctx.getClassNames());
      \u0275\u0275attribute("aria-label", ctx.ariaLabel)("aria-hidden", ctx.ariaHidden)("role", ctx.role);
    }
  },
  encapsulation: 2
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ArrowDownIcon, [{
    type: Component,
    args: [{
      selector: "ArrowDownIcon",
      standalone: true,
      imports: [BaseIcon],
      template: `
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" [attr.aria-label]="ariaLabel" [attr.aria-hidden]="ariaHidden" [attr.role]="role" [class]="getClassNames()">
            <g clip-path="url(#clip0_326_12468)">
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6.99994 14C6.91097 14.0004 6.82281 13.983 6.74064 13.9489C6.65843 13.9148 6.58387 13.8646 6.52133 13.8013L1.10198 8.38193C0.982318 8.25351 0.917175 8.08367 0.920272 7.90817C0.923368 7.73267 0.994462 7.56523 1.11858 7.44111C1.24269 7.317 1.41014 7.2459 1.58563 7.2428C1.76113 7.23971 1.93098 7.30485 2.0594 7.42451L6.32263 11.6877V0.677419C6.32263 0.497756 6.394 0.325452 6.52104 0.198411C6.64808 0.0713706 6.82039 0 7.00005 0C7.17971 0 7.35202 0.0713706 7.47906 0.198411C7.6061 0.325452 7.67747 0.497756 7.67747 0.677419V11.6877L11.9407 7.42451C12.0691 7.30485 12.2389 7.23971 12.4144 7.2428C12.5899 7.2459 12.7574 7.317 12.8815 7.44111C13.0056 7.56523 13.0767 7.73267 13.0798 7.90817C13.0829 8.08367 13.0178 8.25351 12.8981 8.38193L7.47875 13.8013C7.41621 13.8646 7.34164 13.9148 7.25944 13.9489C7.17727 13.983 7.08912 14.0004 7.00015 14C7.00012 14 7.00009 14 7.00005 14C7.00001 14 6.99998 14 6.99994 14Z"
                    fill="currentColor"
                />
            </g>
            <defs>
                <clipPath id="clip0_326_12468">
                    <rect width="14" height="14" fill="white" />
                </clipPath>
            </defs>
        </svg>
    `
    }]
  }], null, null);
})();

// node_modules/primeng/fesm2020/primeng-icons-arrowup.mjs
var ArrowUpIcon = class extends BaseIcon {
};
ArrowUpIcon.\u0275fac = /* @__PURE__ */ (() => {
  let \u0275ArrowUpIcon_BaseFactory;
  return function ArrowUpIcon_Factory(__ngFactoryType__) {
    return (\u0275ArrowUpIcon_BaseFactory || (\u0275ArrowUpIcon_BaseFactory = \u0275\u0275getInheritedFactory(ArrowUpIcon)))(__ngFactoryType__ || ArrowUpIcon);
  };
})();
ArrowUpIcon.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
  type: ArrowUpIcon,
  selectors: [["ArrowUpIcon"]],
  features: [\u0275\u0275InheritDefinitionFeature],
  decls: 6,
  vars: 5,
  consts: [["width", "14", "height", "14", "viewBox", "0 0 14 14", "fill", "none", "xmlns", "http://www.w3.org/2000/svg"], ["clip-path", "url(#clip0_326_12509)"], ["fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M6.51551 13.799C6.64205 13.9255 6.813 13.9977 6.99193 14C7.17087 13.9977 7.34182 13.9255 7.46835 13.799C7.59489 13.6725 7.66701 13.5015 7.66935 13.3226V2.31233L11.9326 6.57554C11.9951 6.63887 12.0697 6.68907 12.1519 6.72319C12.2341 6.75731 12.3223 6.77467 12.4113 6.77425C12.5003 6.77467 12.5885 6.75731 12.6707 6.72319C12.7529 6.68907 12.8274 6.63887 12.89 6.57554C13.0168 6.44853 13.0881 6.27635 13.0881 6.09683C13.0881 5.91732 13.0168 5.74514 12.89 5.61812L7.48846 0.216594C7.48274 0.210436 7.4769 0.204374 7.47094 0.198411C7.3439 0.0713707 7.1716 0 6.99193 0C6.81227 0 6.63997 0.0713707 6.51293 0.198411C6.50704 0.204296 6.50128 0.210278 6.49563 0.216354L1.09386 5.61812C0.974201 5.74654 0.909057 5.91639 0.912154 6.09189C0.91525 6.26738 0.986345 6.43483 1.11046 6.55894C1.23457 6.68306 1.40202 6.75415 1.57752 6.75725C1.75302 6.76035 1.92286 6.6952 2.05128 6.57554L6.31451 2.31231V13.3226C6.31685 13.5015 6.38898 13.6725 6.51551 13.799Z", "fill", "currentColor"], ["id", "clip0_326_12509"], ["width", "14", "height", "14", "fill", "white"]],
  template: function ArrowUpIcon_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(0, "svg", 0)(1, "g", 1);
      \u0275\u0275element(2, "path", 2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "defs")(4, "clipPath", 3);
      \u0275\u0275element(5, "rect", 4);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275classMap(ctx.getClassNames());
      \u0275\u0275attribute("aria-label", ctx.ariaLabel)("aria-hidden", ctx.ariaHidden)("role", ctx.role);
    }
  },
  encapsulation: 2
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ArrowUpIcon, [{
    type: Component,
    args: [{
      selector: "ArrowUpIcon",
      standalone: true,
      imports: [BaseIcon],
      template: `
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" [attr.aria-label]="ariaLabel" [attr.aria-hidden]="ariaHidden" [attr.role]="role" [class]="getClassNames()">
            <g clip-path="url(#clip0_326_12509)">
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6.51551 13.799C6.64205 13.9255 6.813 13.9977 6.99193 14C7.17087 13.9977 7.34182 13.9255 7.46835 13.799C7.59489 13.6725 7.66701 13.5015 7.66935 13.3226V2.31233L11.9326 6.57554C11.9951 6.63887 12.0697 6.68907 12.1519 6.72319C12.2341 6.75731 12.3223 6.77467 12.4113 6.77425C12.5003 6.77467 12.5885 6.75731 12.6707 6.72319C12.7529 6.68907 12.8274 6.63887 12.89 6.57554C13.0168 6.44853 13.0881 6.27635 13.0881 6.09683C13.0881 5.91732 13.0168 5.74514 12.89 5.61812L7.48846 0.216594C7.48274 0.210436 7.4769 0.204374 7.47094 0.198411C7.3439 0.0713707 7.1716 0 6.99193 0C6.81227 0 6.63997 0.0713707 6.51293 0.198411C6.50704 0.204296 6.50128 0.210278 6.49563 0.216354L1.09386 5.61812C0.974201 5.74654 0.909057 5.91639 0.912154 6.09189C0.91525 6.26738 0.986345 6.43483 1.11046 6.55894C1.23457 6.68306 1.40202 6.75415 1.57752 6.75725C1.75302 6.76035 1.92286 6.6952 2.05128 6.57554L6.31451 2.31231V13.3226C6.31685 13.5015 6.38898 13.6725 6.51551 13.799Z"
                    fill="currentColor"
                />
            </g>
            <defs>
                <clipPath id="clip0_326_12509">
                    <rect width="14" height="14" fill="white" />
                </clipPath>
            </defs>
        </svg>
    `
    }]
  }], null, null);
})();

// node_modules/primeng/fesm2020/primeng-icons-filter.mjs
var FilterIcon = class extends BaseIcon {
};
FilterIcon.\u0275fac = /* @__PURE__ */ (() => {
  let \u0275FilterIcon_BaseFactory;
  return function FilterIcon_Factory(__ngFactoryType__) {
    return (\u0275FilterIcon_BaseFactory || (\u0275FilterIcon_BaseFactory = \u0275\u0275getInheritedFactory(FilterIcon)))(__ngFactoryType__ || FilterIcon);
  };
})();
FilterIcon.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
  type: FilterIcon,
  selectors: [["FilterIcon"]],
  features: [\u0275\u0275InheritDefinitionFeature],
  decls: 6,
  vars: 5,
  consts: [["width", "14", "height", "14", "viewBox", "0 0 14 14", "fill", "none", "xmlns", "http://www.w3.org/2000/svg"], ["clip-path", "url(#clip0_390_17708)"], ["d", "M8.64708 14H5.35296C5.18981 13.9979 5.03395 13.9321 4.91858 13.8167C4.8032 13.7014 4.73745 13.5455 4.73531 13.3824V7L0.329431 0.98C0.259794 0.889466 0.217389 0.780968 0.20718 0.667208C0.19697 0.553448 0.219379 0.439133 0.271783 0.337647C0.324282 0.236453 0.403423 0.151519 0.500663 0.0920138C0.597903 0.0325088 0.709548 0.000692754 0.823548 0H13.1765C13.2905 0.000692754 13.4021 0.0325088 13.4994 0.0920138C13.5966 0.151519 13.6758 0.236453 13.7283 0.337647C13.7807 0.439133 13.8031 0.553448 13.7929 0.667208C13.7826 0.780968 13.7402 0.889466 13.6706 0.98L9.26472 7V13.3824C9.26259 13.5455 9.19683 13.7014 9.08146 13.8167C8.96609 13.9321 8.81022 13.9979 8.64708 14ZM5.97061 12.7647H8.02943V6.79412C8.02878 6.66289 8.07229 6.53527 8.15296 6.43177L11.9412 1.23529H2.05884L5.86355 6.43177C5.94422 6.53527 5.98773 6.66289 5.98708 6.79412L5.97061 12.7647Z", "fill", "currentColor"], ["id", "clip0_390_17708"], ["width", "14", "height", "14", "fill", "white"]],
  template: function FilterIcon_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(0, "svg", 0)(1, "g", 1);
      \u0275\u0275element(2, "path", 2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "defs")(4, "clipPath", 3);
      \u0275\u0275element(5, "rect", 4);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275classMap(ctx.getClassNames());
      \u0275\u0275attribute("aria-label", ctx.ariaLabel)("aria-hidden", ctx.ariaHidden)("role", ctx.role);
    }
  },
  encapsulation: 2
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FilterIcon, [{
    type: Component,
    args: [{
      selector: "FilterIcon",
      standalone: true,
      imports: [BaseIcon],
      template: `
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" [attr.aria-label]="ariaLabel" [attr.aria-hidden]="ariaHidden" [attr.role]="role" [class]="getClassNames()">
            <g clip-path="url(#clip0_390_17708)">
                <path
                    d="M8.64708 14H5.35296C5.18981 13.9979 5.03395 13.9321 4.91858 13.8167C4.8032 13.7014 4.73745 13.5455 4.73531 13.3824V7L0.329431 0.98C0.259794 0.889466 0.217389 0.780968 0.20718 0.667208C0.19697 0.553448 0.219379 0.439133 0.271783 0.337647C0.324282 0.236453 0.403423 0.151519 0.500663 0.0920138C0.597903 0.0325088 0.709548 0.000692754 0.823548 0H13.1765C13.2905 0.000692754 13.4021 0.0325088 13.4994 0.0920138C13.5966 0.151519 13.6758 0.236453 13.7283 0.337647C13.7807 0.439133 13.8031 0.553448 13.7929 0.667208C13.7826 0.780968 13.7402 0.889466 13.6706 0.98L9.26472 7V13.3824C9.26259 13.5455 9.19683 13.7014 9.08146 13.8167C8.96609 13.9321 8.81022 13.9979 8.64708 14ZM5.97061 12.7647H8.02943V6.79412C8.02878 6.66289 8.07229 6.53527 8.15296 6.43177L11.9412 1.23529H2.05884L5.86355 6.43177C5.94422 6.53527 5.98773 6.66289 5.98708 6.79412L5.97061 12.7647Z"
                    fill="currentColor"
                />
            </g>
            <defs>
                <clipPath id="clip0_390_17708">
                    <rect width="14" height="14" fill="white" />
                </clipPath>
            </defs>
        </svg>
    `
    }]
  }], null, null);
})();

// node_modules/primeng/fesm2020/primeng-icons-sortalt.mjs
var SortAltIcon = class extends BaseIcon {
};
SortAltIcon.\u0275fac = /* @__PURE__ */ (() => {
  let \u0275SortAltIcon_BaseFactory;
  return function SortAltIcon_Factory(__ngFactoryType__) {
    return (\u0275SortAltIcon_BaseFactory || (\u0275SortAltIcon_BaseFactory = \u0275\u0275getInheritedFactory(SortAltIcon)))(__ngFactoryType__ || SortAltIcon);
  };
})();
SortAltIcon.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
  type: SortAltIcon,
  selectors: [["SortAltIcon"]],
  features: [\u0275\u0275InheritDefinitionFeature],
  decls: 9,
  vars: 5,
  consts: [["width", "14", "height", "14", "viewBox", "0 0 14 14", "fill", "none", "xmlns", "http://www.w3.org/2000/svg"], ["clip-path", "url(#clip0_378_15529)"], ["d", "M5.64515 3.61291C5.47353 3.61291 5.30192 3.54968 5.16644 3.4142L3.38708 1.63484L1.60773 3.4142C1.34579 3.67613 0.912244 3.67613 0.650309 3.4142C0.388374 3.15226 0.388374 2.71871 0.650309 2.45678L2.90837 0.198712C3.17031 -0.0632236 3.60386 -0.0632236 3.86579 0.198712L6.12386 2.45678C6.38579 2.71871 6.38579 3.15226 6.12386 3.4142C5.98837 3.54968 5.81676 3.61291 5.64515 3.61291Z", "fill", "currentColor"], ["d", "M3.38714 14C3.01681 14 2.70972 13.6929 2.70972 13.3226V0.677419C2.70972 0.307097 3.01681 0 3.38714 0C3.75746 0 4.06456 0.307097 4.06456 0.677419V13.3226C4.06456 13.6929 3.75746 14 3.38714 14Z", "fill", "currentColor"], ["d", "M10.6129 14C10.4413 14 10.2697 13.9368 10.1342 13.8013L7.87611 11.5432C7.61418 11.2813 7.61418 10.8477 7.87611 10.5858C8.13805 10.3239 8.5716 10.3239 8.83353 10.5858L10.6129 12.3652L12.3922 10.5858C12.6542 10.3239 13.0877 10.3239 13.3497 10.5858C13.6116 10.8477 13.6116 11.2813 13.3497 11.5432L11.0916 13.8013C10.9561 13.9368 10.7845 14 10.6129 14Z", "fill", "currentColor"], ["d", "M10.6129 14C10.2426 14 9.93552 13.6929 9.93552 13.3226V0.677419C9.93552 0.307097 10.2426 0 10.6129 0C10.9833 0 11.2904 0.307097 11.2904 0.677419V13.3226C11.2904 13.6929 10.9832 14 10.6129 14Z", "fill", "currentColor"], ["id", "clip0_378_15529"], ["width", "14", "height", "14", "fill", "white"]],
  template: function SortAltIcon_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(0, "svg", 0)(1, "g", 1);
      \u0275\u0275element(2, "path", 2)(3, "path", 3)(4, "path", 4)(5, "path", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "defs")(7, "clipPath", 6);
      \u0275\u0275element(8, "rect", 7);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275classMap(ctx.getClassNames());
      \u0275\u0275attribute("aria-label", ctx.ariaLabel)("aria-hidden", ctx.ariaHidden)("role", ctx.role);
    }
  },
  encapsulation: 2
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SortAltIcon, [{
    type: Component,
    args: [{
      selector: "SortAltIcon",
      standalone: true,
      imports: [BaseIcon],
      template: `
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" [attr.aria-label]="ariaLabel" [attr.aria-hidden]="ariaHidden" [attr.role]="role" [class]="getClassNames()">
            <g clip-path="url(#clip0_378_15529)">
                <path
                    d="M5.64515 3.61291C5.47353 3.61291 5.30192 3.54968 5.16644 3.4142L3.38708 1.63484L1.60773 3.4142C1.34579 3.67613 0.912244 3.67613 0.650309 3.4142C0.388374 3.15226 0.388374 2.71871 0.650309 2.45678L2.90837 0.198712C3.17031 -0.0632236 3.60386 -0.0632236 3.86579 0.198712L6.12386 2.45678C6.38579 2.71871 6.38579 3.15226 6.12386 3.4142C5.98837 3.54968 5.81676 3.61291 5.64515 3.61291Z"
                    fill="currentColor"
                />
                <path d="M3.38714 14C3.01681 14 2.70972 13.6929 2.70972 13.3226V0.677419C2.70972 0.307097 3.01681 0 3.38714 0C3.75746 0 4.06456 0.307097 4.06456 0.677419V13.3226C4.06456 13.6929 3.75746 14 3.38714 14Z" fill="currentColor" />
                <path
                    d="M10.6129 14C10.4413 14 10.2697 13.9368 10.1342 13.8013L7.87611 11.5432C7.61418 11.2813 7.61418 10.8477 7.87611 10.5858C8.13805 10.3239 8.5716 10.3239 8.83353 10.5858L10.6129 12.3652L12.3922 10.5858C12.6542 10.3239 13.0877 10.3239 13.3497 10.5858C13.6116 10.8477 13.6116 11.2813 13.3497 11.5432L11.0916 13.8013C10.9561 13.9368 10.7845 14 10.6129 14Z"
                    fill="currentColor"
                />
                <path d="M10.6129 14C10.2426 14 9.93552 13.6929 9.93552 13.3226V0.677419C9.93552 0.307097 10.2426 0 10.6129 0C10.9833 0 11.2904 0.307097 11.2904 0.677419V13.3226C11.2904 13.6929 10.9832 14 10.6129 14Z" fill="currentColor" />
            </g>
            <defs>
                <clipPath id="clip0_378_15529">
                    <rect width="14" height="14" fill="white" />
                </clipPath>
            </defs>
        </svg>
    `
    }]
  }], null, null);
})();

// node_modules/primeng/fesm2020/primeng-icons-sortamountdown.mjs
var SortAmountDownIcon = class extends BaseIcon {
};
SortAmountDownIcon.\u0275fac = /* @__PURE__ */ (() => {
  let \u0275SortAmountDownIcon_BaseFactory;
  return function SortAmountDownIcon_Factory(__ngFactoryType__) {
    return (\u0275SortAmountDownIcon_BaseFactory || (\u0275SortAmountDownIcon_BaseFactory = \u0275\u0275getInheritedFactory(SortAmountDownIcon)))(__ngFactoryType__ || SortAmountDownIcon);
  };
})();
SortAmountDownIcon.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
  type: SortAmountDownIcon,
  selectors: [["SortAmountDownIcon"]],
  features: [\u0275\u0275InheritDefinitionFeature],
  decls: 11,
  vars: 5,
  consts: [["width", "14", "height", "14", "viewBox", "0 0 14 14", "fill", "none", "xmlns", "http://www.w3.org/2000/svg"], ["clip-path", "url(#clip0_378_15544)"], ["d", "M2.59836 13.2009C2.44634 13.2009 2.29432 13.1449 2.1743 13.0248L0.174024 11.0246C-0.0580081 10.7925 -0.0580081 10.4085 0.174024 10.1764C0.406057 9.94441 0.79011 9.94441 1.02214 10.1764L2.59836 11.7527L4.17458 10.1764C4.40662 9.94441 4.79067 9.94441 5.0227 10.1764C5.25473 10.4085 5.25473 10.7925 5.0227 11.0246L3.02242 13.0248C2.90241 13.1449 2.75038 13.2009 2.59836 13.2009Z", "fill", "currentColor"], ["d", "M2.59836 13.2009C2.27032 13.2009 1.99833 12.9288 1.99833 12.6008V1.39922C1.99833 1.07117 2.27036 0.799133 2.59841 0.799133C2.92646 0.799133 3.19849 1.07117 3.19849 1.39922V12.6008C3.19849 12.9288 2.92641 13.2009 2.59836 13.2009Z", "fill", "currentColor"], ["d", "M13.3999 11.2006H6.99902C6.67098 11.2006 6.39894 10.9285 6.39894 10.6005C6.39894 10.2725 6.67098 10.0004 6.99902 10.0004H13.3999C13.728 10.0004 14 10.2725 14 10.6005C14 10.9285 13.728 11.2006 13.3999 11.2006Z", "fill", "currentColor"], ["d", "M10.1995 6.39991H6.99902C6.67098 6.39991 6.39894 6.12788 6.39894 5.79983C6.39894 5.47179 6.67098 5.19975 6.99902 5.19975H10.1995C10.5275 5.19975 10.7996 5.47179 10.7996 5.79983C10.7996 6.12788 10.5275 6.39991 10.1995 6.39991Z", "fill", "currentColor"], ["d", "M8.59925 3.99958H6.99902C6.67098 3.99958 6.39894 3.72754 6.39894 3.3995C6.39894 3.07145 6.67098 2.79941 6.99902 2.79941H8.59925C8.92729 2.79941 9.19933 3.07145 9.19933 3.3995C9.19933 3.72754 8.92729 3.99958 8.59925 3.99958Z", "fill", "currentColor"], ["d", "M11.7997 8.80025H6.99902C6.67098 8.80025 6.39894 8.52821 6.39894 8.20017C6.39894 7.87212 6.67098 7.60008 6.99902 7.60008H11.7997C12.1277 7.60008 12.3998 7.87212 12.3998 8.20017C12.3998 8.52821 12.1277 8.80025 11.7997 8.80025Z", "fill", "currentColor"], ["id", "clip0_378_15544"], ["width", "14", "height", "14", "fill", "white"]],
  template: function SortAmountDownIcon_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(0, "svg", 0)(1, "g", 1);
      \u0275\u0275element(2, "path", 2)(3, "path", 3)(4, "path", 4)(5, "path", 5)(6, "path", 6)(7, "path", 7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "defs")(9, "clipPath", 8);
      \u0275\u0275element(10, "rect", 9);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275classMap(ctx.getClassNames());
      \u0275\u0275attribute("aria-label", ctx.ariaLabel)("aria-hidden", ctx.ariaHidden)("role", ctx.role);
    }
  },
  encapsulation: 2
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SortAmountDownIcon, [{
    type: Component,
    args: [{
      selector: "SortAmountDownIcon",
      standalone: true,
      imports: [BaseIcon],
      template: `
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" [attr.aria-label]="ariaLabel" [attr.aria-hidden]="ariaHidden" [attr.role]="role" [class]="getClassNames()">
            <g clip-path="url(#clip0_378_15544)">
                <path
                    d="M2.59836 13.2009C2.44634 13.2009 2.29432 13.1449 2.1743 13.0248L0.174024 11.0246C-0.0580081 10.7925 -0.0580081 10.4085 0.174024 10.1764C0.406057 9.94441 0.79011 9.94441 1.02214 10.1764L2.59836 11.7527L4.17458 10.1764C4.40662 9.94441 4.79067 9.94441 5.0227 10.1764C5.25473 10.4085 5.25473 10.7925 5.0227 11.0246L3.02242 13.0248C2.90241 13.1449 2.75038 13.2009 2.59836 13.2009Z"
                    fill="currentColor"
                />
                <path
                    d="M2.59836 13.2009C2.27032 13.2009 1.99833 12.9288 1.99833 12.6008V1.39922C1.99833 1.07117 2.27036 0.799133 2.59841 0.799133C2.92646 0.799133 3.19849 1.07117 3.19849 1.39922V12.6008C3.19849 12.9288 2.92641 13.2009 2.59836 13.2009Z"
                    fill="currentColor"
                />
                <path
                    d="M13.3999 11.2006H6.99902C6.67098 11.2006 6.39894 10.9285 6.39894 10.6005C6.39894 10.2725 6.67098 10.0004 6.99902 10.0004H13.3999C13.728 10.0004 14 10.2725 14 10.6005C14 10.9285 13.728 11.2006 13.3999 11.2006Z"
                    fill="currentColor"
                />
                <path
                    d="M10.1995 6.39991H6.99902C6.67098 6.39991 6.39894 6.12788 6.39894 5.79983C6.39894 5.47179 6.67098 5.19975 6.99902 5.19975H10.1995C10.5275 5.19975 10.7996 5.47179 10.7996 5.79983C10.7996 6.12788 10.5275 6.39991 10.1995 6.39991Z"
                    fill="currentColor"
                />
                <path
                    d="M8.59925 3.99958H6.99902C6.67098 3.99958 6.39894 3.72754 6.39894 3.3995C6.39894 3.07145 6.67098 2.79941 6.99902 2.79941H8.59925C8.92729 2.79941 9.19933 3.07145 9.19933 3.3995C9.19933 3.72754 8.92729 3.99958 8.59925 3.99958Z"
                    fill="currentColor"
                />
                <path
                    d="M11.7997 8.80025H6.99902C6.67098 8.80025 6.39894 8.52821 6.39894 8.20017C6.39894 7.87212 6.67098 7.60008 6.99902 7.60008H11.7997C12.1277 7.60008 12.3998 7.87212 12.3998 8.20017C12.3998 8.52821 12.1277 8.80025 11.7997 8.80025Z"
                    fill="currentColor"
                />
            </g>
            <defs>
                <clipPath id="clip0_378_15544">
                    <rect width="14" height="14" fill="white" />
                </clipPath>
            </defs>
        </svg>
    `
    }]
  }], null, null);
})();

// node_modules/primeng/fesm2020/primeng-icons-sortamountupalt.mjs
var SortAmountUpAltIcon = class extends BaseIcon {
};
SortAmountUpAltIcon.\u0275fac = /* @__PURE__ */ (() => {
  let \u0275SortAmountUpAltIcon_BaseFactory;
  return function SortAmountUpAltIcon_Factory(__ngFactoryType__) {
    return (\u0275SortAmountUpAltIcon_BaseFactory || (\u0275SortAmountUpAltIcon_BaseFactory = \u0275\u0275getInheritedFactory(SortAmountUpAltIcon)))(__ngFactoryType__ || SortAmountUpAltIcon);
  };
})();
SortAmountUpAltIcon.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
  type: SortAmountUpAltIcon,
  selectors: [["SortAmountUpAltIcon"]],
  features: [\u0275\u0275InheritDefinitionFeature],
  decls: 11,
  vars: 5,
  consts: [["width", "14", "height", "14", "viewBox", "0 0 14 14", "fill", "none", "xmlns", "http://www.w3.org/2000/svg"], ["clip-path", "url(#clip0_378_15578)"], ["d", "M4.59864 3.99958C4.44662 3.99958 4.2946 3.94357 4.17458 3.82356L2.59836 2.24734L1.02214 3.82356C0.79011 4.05559 0.406057 4.05559 0.174024 3.82356C-0.0580081 3.59152 -0.0580081 3.20747 0.174024 2.97544L2.1743 0.97516C2.40634 0.743127 2.79039 0.743127 3.02242 0.97516L5.0227 2.97544C5.25473 3.20747 5.25473 3.59152 5.0227 3.82356C4.90268 3.94357 4.75066 3.99958 4.59864 3.99958Z", "fill", "currentColor"], ["d", "M2.59841 13.2009C2.27036 13.2009 1.99833 12.9288 1.99833 12.6008V1.39922C1.99833 1.07117 2.27036 0.799133 2.59841 0.799133C2.92646 0.799133 3.19849 1.07117 3.19849 1.39922V12.6008C3.19849 12.9288 2.92646 13.2009 2.59841 13.2009Z", "fill", "currentColor"], ["d", "M13.3999 11.2006H6.99902C6.67098 11.2006 6.39894 10.9285 6.39894 10.6005C6.39894 10.2725 6.67098 10.0004 6.99902 10.0004H13.3999C13.728 10.0004 14 10.2725 14 10.6005C14 10.9285 13.728 11.2006 13.3999 11.2006Z", "fill", "currentColor"], ["d", "M10.1995 6.39991H6.99902C6.67098 6.39991 6.39894 6.12788 6.39894 5.79983C6.39894 5.47179 6.67098 5.19975 6.99902 5.19975H10.1995C10.5275 5.19975 10.7996 5.47179 10.7996 5.79983C10.7996 6.12788 10.5275 6.39991 10.1995 6.39991Z", "fill", "currentColor"], ["d", "M8.59925 3.99958H6.99902C6.67098 3.99958 6.39894 3.72754 6.39894 3.3995C6.39894 3.07145 6.67098 2.79941 6.99902 2.79941H8.59925C8.92729 2.79941 9.19933 3.07145 9.19933 3.3995C9.19933 3.72754 8.92729 3.99958 8.59925 3.99958Z", "fill", "currentColor"], ["d", "M11.7997 8.80025H6.99902C6.67098 8.80025 6.39894 8.52821 6.39894 8.20017C6.39894 7.87212 6.67098 7.60008 6.99902 7.60008H11.7997C12.1277 7.60008 12.3998 7.87212 12.3998 8.20017C12.3998 8.52821 12.1277 8.80025 11.7997 8.80025Z", "fill", "currentColor"], ["id", "clip0_378_15578"], ["width", "14", "height", "14", "fill", "white"]],
  template: function SortAmountUpAltIcon_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(0, "svg", 0)(1, "g", 1);
      \u0275\u0275element(2, "path", 2)(3, "path", 3)(4, "path", 4)(5, "path", 5)(6, "path", 6)(7, "path", 7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "defs")(9, "clipPath", 8);
      \u0275\u0275element(10, "rect", 9);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275classMap(ctx.getClassNames());
      \u0275\u0275attribute("aria-label", ctx.ariaLabel)("aria-hidden", ctx.ariaHidden)("role", ctx.role);
    }
  },
  encapsulation: 2
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SortAmountUpAltIcon, [{
    type: Component,
    args: [{
      selector: "SortAmountUpAltIcon",
      standalone: true,
      imports: [BaseIcon],
      template: `
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" [attr.aria-label]="ariaLabel" [attr.aria-hidden]="ariaHidden" [attr.role]="role" [class]="getClassNames()">
            <g clip-path="url(#clip0_378_15578)">
                <path
                    d="M4.59864 3.99958C4.44662 3.99958 4.2946 3.94357 4.17458 3.82356L2.59836 2.24734L1.02214 3.82356C0.79011 4.05559 0.406057 4.05559 0.174024 3.82356C-0.0580081 3.59152 -0.0580081 3.20747 0.174024 2.97544L2.1743 0.97516C2.40634 0.743127 2.79039 0.743127 3.02242 0.97516L5.0227 2.97544C5.25473 3.20747 5.25473 3.59152 5.0227 3.82356C4.90268 3.94357 4.75066 3.99958 4.59864 3.99958Z"
                    fill="currentColor"
                />
                <path
                    d="M2.59841 13.2009C2.27036 13.2009 1.99833 12.9288 1.99833 12.6008V1.39922C1.99833 1.07117 2.27036 0.799133 2.59841 0.799133C2.92646 0.799133 3.19849 1.07117 3.19849 1.39922V12.6008C3.19849 12.9288 2.92646 13.2009 2.59841 13.2009Z"
                    fill="currentColor"
                />
                <path
                    d="M13.3999 11.2006H6.99902C6.67098 11.2006 6.39894 10.9285 6.39894 10.6005C6.39894 10.2725 6.67098 10.0004 6.99902 10.0004H13.3999C13.728 10.0004 14 10.2725 14 10.6005C14 10.9285 13.728 11.2006 13.3999 11.2006Z"
                    fill="currentColor"
                />
                <path
                    d="M10.1995 6.39991H6.99902C6.67098 6.39991 6.39894 6.12788 6.39894 5.79983C6.39894 5.47179 6.67098 5.19975 6.99902 5.19975H10.1995C10.5275 5.19975 10.7996 5.47179 10.7996 5.79983C10.7996 6.12788 10.5275 6.39991 10.1995 6.39991Z"
                    fill="currentColor"
                />
                <path
                    d="M8.59925 3.99958H6.99902C6.67098 3.99958 6.39894 3.72754 6.39894 3.3995C6.39894 3.07145 6.67098 2.79941 6.99902 2.79941H8.59925C8.92729 2.79941 9.19933 3.07145 9.19933 3.3995C9.19933 3.72754 8.92729 3.99958 8.59925 3.99958Z"
                    fill="currentColor"
                />
                <path
                    d="M11.7997 8.80025H6.99902C6.67098 8.80025 6.39894 8.52821 6.39894 8.20017C6.39894 7.87212 6.67098 7.60008 6.99902 7.60008H11.7997C12.1277 7.60008 12.3998 7.87212 12.3998 8.20017C12.3998 8.52821 12.1277 8.80025 11.7997 8.80025Z"
                    fill="currentColor"
                />
            </g>
            <defs>
                <clipPath id="clip0_378_15578">
                    <rect width="14" height="14" fill="white" />
                </clipPath>
            </defs>
        </svg>
    `
    }]
  }], null, null);
})();

// node_modules/primeng/fesm2020/primeng-table.mjs
var _c08 = ["container"];
var _c111 = ["resizeHelper"];
var _c27 = ["reorderIndicatorUp"];
var _c35 = ["reorderIndicatorDown"];
var _c44 = ["wrapper"];
var _c54 = ["table"];
var _c64 = ["thead"];
var _c74 = ["tfoot"];
var _c83 = ["scroller"];
var _c93 = (a0, a1, a2) => ({
  "p-datatable p-component": true,
  "p-datatable-hoverable-rows": a0,
  "p-datatable-scrollable": a1,
  "p-datatable-flex-scrollable": a2
});
var _c103 = (a0) => ({
  maxHeight: a0
});
var _c112 = (a0) => ({
  height: a0
});
var _c123 = (a0, a1) => ({
  $implicit: a0,
  options: a1
});
var _c133 = (a0) => ({
  columns: a0
});
var _c142 = (a0, a1, a2) => ({
  "p-datatable-table": true,
  "p-datatable-scrollable-table": a0,
  "p-datatable-resizable-table": a1,
  "p-datatable-resizable-table-fit": a2
});
var _c152 = (a0) => ({
  $implicit: a0
});
function Table_div_2_i_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i");
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap("p-datatable-loading-icon " + ctx_r0.loadingIcon);
  }
}
function Table_div_2_ng_container_2_SpinnerIcon_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "SpinnerIcon", 26);
  }
  if (rf & 2) {
    \u0275\u0275property("spin", true)("styleClass", "p-datatable-loading-icon");
  }
}
function Table_div_2_ng_container_2_span_2_1_ng_template_0_Template(rf, ctx) {
}
function Table_div_2_ng_container_2_span_2_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, Table_div_2_ng_container_2_span_2_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function Table_div_2_ng_container_2_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 27);
    \u0275\u0275template(1, Table_div_2_ng_container_2_span_2_1_Template, 1, 0, null, 28);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.loadingIconTemplate);
  }
}
function Table_div_2_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, Table_div_2_ng_container_2_SpinnerIcon_1_Template, 1, 2, "SpinnerIcon", 24)(2, Table_div_2_ng_container_2_span_2_Template, 2, 1, "span", 25);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.loadingIconTemplate);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.loadingIconTemplate);
  }
}
function Table_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22);
    \u0275\u0275template(1, Table_div_2_i_1_Template, 1, 2, "i", 23)(2, Table_div_2_ng_container_2_Template, 3, 2, "ng-container", 16);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.loadingIcon);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.loadingIcon);
  }
}
function Table_div_3_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function Table_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29);
    \u0275\u0275template(1, Table_div_3_ng_container_1_Template, 1, 0, "ng-container", 28);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.captionTemplate);
  }
}
function Table_p_paginator_4_1_ng_template_0_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function Table_p_paginator_4_1_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, Table_p_paginator_4_1_ng_template_0_ng_container_0_Template, 1, 0, "ng-container", 28);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.paginatorFirstPageLinkIconTemplate);
  }
}
function Table_p_paginator_4_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, Table_p_paginator_4_1_ng_template_0_Template, 1, 1, "ng-template", 31);
  }
}
function Table_p_paginator_4_2_ng_template_0_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function Table_p_paginator_4_2_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, Table_p_paginator_4_2_ng_template_0_ng_container_0_Template, 1, 0, "ng-container", 28);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.paginatorPreviousPageLinkIconTemplate);
  }
}
function Table_p_paginator_4_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, Table_p_paginator_4_2_ng_template_0_Template, 1, 1, "ng-template", 32);
  }
}
function Table_p_paginator_4_3_ng_template_0_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function Table_p_paginator_4_3_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, Table_p_paginator_4_3_ng_template_0_ng_container_0_Template, 1, 0, "ng-container", 28);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.paginatorLastPageLinkIconTemplate);
  }
}
function Table_p_paginator_4_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, Table_p_paginator_4_3_ng_template_0_Template, 1, 1, "ng-template", 33);
  }
}
function Table_p_paginator_4_4_ng_template_0_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function Table_p_paginator_4_4_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, Table_p_paginator_4_4_ng_template_0_ng_container_0_Template, 1, 0, "ng-container", 28);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.paginatorNextPageLinkIconTemplate);
  }
}
function Table_p_paginator_4_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, Table_p_paginator_4_4_ng_template_0_Template, 1, 1, "ng-template", 34);
  }
}
function Table_p_paginator_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p-paginator", 30);
    \u0275\u0275listener("onPageChange", function Table_p_paginator_4_Template_p_paginator_onPageChange_0_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onPageChange($event));
    });
    \u0275\u0275template(1, Table_p_paginator_4_1_Template, 1, 0, null, 16)(2, Table_p_paginator_4_2_Template, 1, 0, null, 16)(3, Table_p_paginator_4_3_Template, 1, 0, null, 16)(4, Table_p_paginator_4_4_Template, 1, 0, null, 16);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("rows", ctx_r0.rows)("first", ctx_r0.first)("totalRecords", ctx_r0.totalRecords)("pageLinkSize", ctx_r0.pageLinks)("alwaysShow", ctx_r0.alwaysShowPaginator)("rowsPerPageOptions", ctx_r0.rowsPerPageOptions)("templateLeft", ctx_r0.paginatorLeftTemplate)("templateRight", ctx_r0.paginatorRightTemplate)("dropdownAppendTo", ctx_r0.paginatorDropdownAppendTo)("dropdownScrollHeight", ctx_r0.paginatorDropdownScrollHeight)("currentPageReportTemplate", ctx_r0.currentPageReportTemplate)("showFirstLastIcon", ctx_r0.showFirstLastIcon)("dropdownItemTemplate", ctx_r0.paginatorDropdownItemTemplate)("showCurrentPageReport", ctx_r0.showCurrentPageReport)("showJumpToPageDropdown", ctx_r0.showJumpToPageDropdown)("showJumpToPageInput", ctx_r0.showJumpToPageInput)("showPageLinks", ctx_r0.showPageLinks);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.paginatorFirstPageLinkIconTemplate);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.paginatorPreviousPageLinkIconTemplate);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.paginatorLastPageLinkIconTemplate);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.paginatorNextPageLinkIconTemplate);
  }
}
function Table_p_scroller_7_ng_template_2_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function Table_p_scroller_7_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, Table_p_scroller_7_ng_template_2_ng_container_0_Template, 1, 0, "ng-container", 37);
  }
  if (rf & 2) {
    const items_r4 = ctx.$implicit;
    const scrollerOptions_r5 = ctx.options;
    \u0275\u0275nextContext(2);
    const buildInTable_r6 = \u0275\u0275reference(10);
    \u0275\u0275property("ngTemplateOutlet", buildInTable_r6)("ngTemplateOutletContext", \u0275\u0275pureFunction2(2, _c123, items_r4, scrollerOptions_r5));
  }
}
function Table_p_scroller_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p-scroller", 35, 3);
    \u0275\u0275listener("onLazyLoad", function Table_p_scroller_7_Template_p_scroller_onLazyLoad_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onLazyItemLoad($event));
    });
    \u0275\u0275template(2, Table_p_scroller_7_ng_template_2_Template, 1, 5, "ng-template", 36);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275styleMap(\u0275\u0275pureFunction1(15, _c112, ctx_r0.scrollHeight !== "flex" ? ctx_r0.scrollHeight : void 0));
    \u0275\u0275property("items", ctx_r0.processedData)("columns", ctx_r0.columns)("scrollHeight", ctx_r0.scrollHeight !== "flex" ? void 0 : "100%")("itemSize", ctx_r0.virtualScrollItemSize || ctx_r0._virtualRowHeight)("step", ctx_r0.rows)("delay", ctx_r0.lazy ? ctx_r0.virtualScrollDelay : 0)("inline", true)("lazy", ctx_r0.lazy)("loaderDisabled", true)("showSpacer", false)("showLoader", ctx_r0.loadingBodyTemplate)("options", ctx_r0.virtualScrollOptions)("autoSize", true);
  }
}
function Table_ng_container_8_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function Table_ng_container_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, Table_ng_container_8_ng_container_1_Template, 1, 0, "ng-container", 37);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    const buildInTable_r6 = \u0275\u0275reference(10);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", buildInTable_r6)("ngTemplateOutletContext", \u0275\u0275pureFunction2(4, _c123, ctx_r0.processedData, \u0275\u0275pureFunction1(2, _c133, ctx_r0.columns)));
  }
}
function Table_ng_template_9_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function Table_ng_template_9_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function Table_ng_template_9_tbody_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tbody", 44);
  }
  if (rf & 2) {
    const scrollerOptions_r7 = \u0275\u0275nextContext().options;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("value", ctx_r0.frozenValue)("frozenRows", true)("pTableBody", scrollerOptions_r7.columns)("pTableBodyTemplate", ctx_r0.frozenBodyTemplate)("frozen", true);
  }
}
function Table_ng_template_9_tbody_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tbody", 45);
  }
  if (rf & 2) {
    const scrollerOptions_r7 = \u0275\u0275nextContext().options;
    \u0275\u0275styleMap("height: calc(" + scrollerOptions_r7.spacerStyle.height + " - " + scrollerOptions_r7.rows.length * scrollerOptions_r7.itemSize + "px);");
  }
}
function Table_ng_template_9_tfoot_9_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function Table_ng_template_9_tfoot_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tfoot", 46, 6);
    \u0275\u0275template(2, Table_ng_template_9_tfoot_9_ng_container_2_Template, 1, 0, "ng-container", 37);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const scrollerOptions_r7 = \u0275\u0275nextContext().options;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.footerGroupedTemplate || ctx_r0.footerTemplate)("ngTemplateOutletContext", \u0275\u0275pureFunction1(2, _c152, scrollerOptions_r7.columns));
  }
}
function Table_ng_template_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 38, 4);
    \u0275\u0275template(2, Table_ng_template_9_ng_container_2_Template, 1, 0, "ng-container", 37);
    \u0275\u0275elementStart(3, "thead", 39, 5);
    \u0275\u0275template(5, Table_ng_template_9_ng_container_5_Template, 1, 0, "ng-container", 37);
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, Table_ng_template_9_tbody_6_Template, 1, 5, "tbody", 40);
    \u0275\u0275element(7, "tbody", 41);
    \u0275\u0275template(8, Table_ng_template_9_tbody_8_Template, 1, 2, "tbody", 42)(9, Table_ng_template_9_tfoot_9_Template, 3, 4, "tfoot", 43);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const scrollerOptions_r7 = ctx.options;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275styleMap(ctx_r0.tableStyle);
    \u0275\u0275classMap(ctx_r0.tableStyleClass);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction3(20, _c142, ctx_r0.scrollable, ctx_r0.resizableColumns, ctx_r0.resizableColumns && ctx_r0.columnResizeMode === "fit"));
    \u0275\u0275attribute("id", ctx_r0.id + "-table");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.colGroupTemplate)("ngTemplateOutletContext", \u0275\u0275pureFunction1(24, _c152, scrollerOptions_r7.columns));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.headerGroupedTemplate || ctx_r0.headerTemplate)("ngTemplateOutletContext", \u0275\u0275pureFunction1(26, _c152, scrollerOptions_r7.columns));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.frozenValue || ctx_r0.frozenBodyTemplate);
    \u0275\u0275advance();
    \u0275\u0275styleMap(scrollerOptions_r7.contentStyle);
    \u0275\u0275property("ngClass", scrollerOptions_r7.contentStyleClass)("value", ctx_r0.dataToRender(scrollerOptions_r7.rows))("pTableBody", scrollerOptions_r7.columns)("pTableBodyTemplate", ctx_r0.bodyTemplate)("scrollerOptions", scrollerOptions_r7);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", scrollerOptions_r7.spacerStyle);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.footerGroupedTemplate || ctx_r0.footerTemplate);
  }
}
function Table_p_paginator_11_1_ng_template_0_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function Table_p_paginator_11_1_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, Table_p_paginator_11_1_ng_template_0_ng_container_0_Template, 1, 0, "ng-container", 28);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.paginatorFirstPageLinkIconTemplate);
  }
}
function Table_p_paginator_11_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, Table_p_paginator_11_1_ng_template_0_Template, 1, 1, "ng-template", 31);
  }
}
function Table_p_paginator_11_2_ng_template_0_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function Table_p_paginator_11_2_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, Table_p_paginator_11_2_ng_template_0_ng_container_0_Template, 1, 0, "ng-container", 28);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.paginatorPreviousPageLinkIconTemplate);
  }
}
function Table_p_paginator_11_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, Table_p_paginator_11_2_ng_template_0_Template, 1, 1, "ng-template", 32);
  }
}
function Table_p_paginator_11_3_ng_template_0_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function Table_p_paginator_11_3_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, Table_p_paginator_11_3_ng_template_0_ng_container_0_Template, 1, 0, "ng-container", 28);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.paginatorLastPageLinkIconTemplate);
  }
}
function Table_p_paginator_11_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, Table_p_paginator_11_3_ng_template_0_Template, 1, 1, "ng-template", 33);
  }
}
function Table_p_paginator_11_4_ng_template_0_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function Table_p_paginator_11_4_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, Table_p_paginator_11_4_ng_template_0_ng_container_0_Template, 1, 0, "ng-container", 28);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.paginatorNextPageLinkIconTemplate);
  }
}
function Table_p_paginator_11_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, Table_p_paginator_11_4_ng_template_0_Template, 1, 1, "ng-template", 34);
  }
}
function Table_p_paginator_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p-paginator", 47);
    \u0275\u0275listener("onPageChange", function Table_p_paginator_11_Template_p_paginator_onPageChange_0_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onPageChange($event));
    });
    \u0275\u0275template(1, Table_p_paginator_11_1_Template, 1, 0, null, 16)(2, Table_p_paginator_11_2_Template, 1, 0, null, 16)(3, Table_p_paginator_11_3_Template, 1, 0, null, 16)(4, Table_p_paginator_11_4_Template, 1, 0, null, 16);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("rows", ctx_r0.rows)("first", ctx_r0.first)("totalRecords", ctx_r0.totalRecords)("pageLinkSize", ctx_r0.pageLinks)("alwaysShow", ctx_r0.alwaysShowPaginator)("rowsPerPageOptions", ctx_r0.rowsPerPageOptions)("templateLeft", ctx_r0.paginatorLeftTemplate)("templateRight", ctx_r0.paginatorRightTemplate)("dropdownAppendTo", ctx_r0.paginatorDropdownAppendTo)("dropdownScrollHeight", ctx_r0.paginatorDropdownScrollHeight)("currentPageReportTemplate", ctx_r0.currentPageReportTemplate)("showFirstLastIcon", ctx_r0.showFirstLastIcon)("dropdownItemTemplate", ctx_r0.paginatorDropdownItemTemplate)("showCurrentPageReport", ctx_r0.showCurrentPageReport)("showJumpToPageDropdown", ctx_r0.showJumpToPageDropdown)("showJumpToPageInput", ctx_r0.showJumpToPageInput)("showPageLinks", ctx_r0.showPageLinks);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.paginatorFirstPageLinkIconTemplate);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.paginatorPreviousPageLinkIconTemplate);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.paginatorLastPageLinkIconTemplate);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.paginatorNextPageLinkIconTemplate);
  }
}
function Table_div_12_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function Table_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 48);
    \u0275\u0275template(1, Table_div_12_ng_container_1_Template, 1, 0, "ng-container", 28);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.summaryTemplate);
  }
}
function Table_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 49, 7);
  }
}
function Table_span_14_ArrowDownIcon_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "ArrowDownIcon");
  }
}
function Table_span_14_3_ng_template_0_Template(rf, ctx) {
}
function Table_span_14_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, Table_span_14_3_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function Table_span_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 50, 8);
    \u0275\u0275template(2, Table_span_14_ArrowDownIcon_2_Template, 1, 0, "ArrowDownIcon", 16)(3, Table_span_14_3_Template, 1, 0, null, 28);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", !ctx_r0.reorderIndicatorUpIconTemplate);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.reorderIndicatorUpIconTemplate);
  }
}
function Table_span_15_ArrowUpIcon_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "ArrowUpIcon");
  }
}
function Table_span_15_3_ng_template_0_Template(rf, ctx) {
}
function Table_span_15_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, Table_span_15_3_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function Table_span_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 51, 9);
    \u0275\u0275template(2, Table_span_15_ArrowUpIcon_2_Template, 1, 0, "ArrowUpIcon", 16)(3, Table_span_15_3_Template, 1, 0, null, 28);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", !ctx_r0.reorderIndicatorDownIconTemplate);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.reorderIndicatorDownIconTemplate);
  }
}
var _c162 = ["pTableBody", ""];
var _c172 = (a0, a1, a2, a3, a4) => ({
  $implicit: a0,
  rowIndex: a1,
  columns: a2,
  editing: a3,
  frozen: a4
});
var _c182 = (a0, a1, a2, a3, a4, a5, a6) => ({
  $implicit: a0,
  rowIndex: a1,
  columns: a2,
  editing: a3,
  frozen: a4,
  rowgroup: a5,
  rowspan: a6
});
var _c192 = (a0, a1, a2, a3, a4, a5) => ({
  $implicit: a0,
  rowIndex: a1,
  columns: a2,
  expanded: a3,
  editing: a4,
  frozen: a5
});
var _c20 = (a0, a1, a2, a3) => ({
  $implicit: a0,
  rowIndex: a1,
  columns: a2,
  frozen: a3
});
var _c21 = (a0, a1) => ({
  $implicit: a0,
  frozen: a1
});
function TableBody_ng_container_0_ng_template_1_ng_container_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function TableBody_ng_container_0_ng_template_1_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0, 3);
    \u0275\u0275template(1, TableBody_ng_container_0_ng_template_1_ng_container_0_ng_container_1_Template, 1, 0, "ng-container", 4);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    const rowData_r2 = ctx_r0.$implicit;
    const rowIndex_r3 = ctx_r0.index;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r3.dt.groupHeaderTemplate)("ngTemplateOutletContext", \u0275\u0275pureFunction5(2, _c172, rowData_r2, ctx_r3.getRowIndex(rowIndex_r3), ctx_r3.columns, ctx_r3.dt.editMode === "row" && ctx_r3.dt.isRowEditing(rowData_r2), ctx_r3.frozen));
  }
}
function TableBody_ng_container_0_ng_template_1_ng_container_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function TableBody_ng_container_0_ng_template_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, TableBody_ng_container_0_ng_template_1_ng_container_1_ng_container_1_Template, 1, 0, "ng-container", 4);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    const rowData_r2 = ctx_r0.$implicit;
    const rowIndex_r3 = ctx_r0.index;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", rowData_r2 ? ctx_r3.template : ctx_r3.dt.loadingBodyTemplate)("ngTemplateOutletContext", \u0275\u0275pureFunction5(2, _c172, rowData_r2, ctx_r3.getRowIndex(rowIndex_r3), ctx_r3.columns, ctx_r3.dt.editMode === "row" && ctx_r3.dt.isRowEditing(rowData_r2), ctx_r3.frozen));
  }
}
function TableBody_ng_container_0_ng_template_1_ng_container_2_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function TableBody_ng_container_0_ng_template_1_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, TableBody_ng_container_0_ng_template_1_ng_container_2_ng_container_1_Template, 1, 0, "ng-container", 4);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    const rowData_r2 = ctx_r0.$implicit;
    const rowIndex_r3 = ctx_r0.index;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", rowData_r2 ? ctx_r3.template : ctx_r3.dt.loadingBodyTemplate)("ngTemplateOutletContext", \u0275\u0275pureFunction7(2, _c182, rowData_r2, ctx_r3.getRowIndex(rowIndex_r3), ctx_r3.columns, ctx_r3.dt.editMode === "row" && ctx_r3.dt.isRowEditing(rowData_r2), ctx_r3.frozen, ctx_r3.shouldRenderRowspan(ctx_r3.value, rowData_r2, rowIndex_r3), ctx_r3.calculateRowGroupSize(ctx_r3.value, rowData_r2, rowIndex_r3)));
  }
}
function TableBody_ng_container_0_ng_template_1_ng_container_3_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function TableBody_ng_container_0_ng_template_1_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0, 3);
    \u0275\u0275template(1, TableBody_ng_container_0_ng_template_1_ng_container_3_ng_container_1_Template, 1, 0, "ng-container", 4);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    const rowData_r2 = ctx_r0.$implicit;
    const rowIndex_r3 = ctx_r0.index;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r3.dt.groupFooterTemplate)("ngTemplateOutletContext", \u0275\u0275pureFunction5(2, _c172, rowData_r2, ctx_r3.getRowIndex(rowIndex_r3), ctx_r3.columns, ctx_r3.dt.editMode === "row" && ctx_r3.dt.isRowEditing(rowData_r2), ctx_r3.frozen));
  }
}
function TableBody_ng_container_0_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, TableBody_ng_container_0_ng_template_1_ng_container_0_Template, 2, 8, "ng-container", 2)(1, TableBody_ng_container_0_ng_template_1_ng_container_1_Template, 2, 8, "ng-container", 0)(2, TableBody_ng_container_0_ng_template_1_ng_container_2_Template, 2, 10, "ng-container", 0)(3, TableBody_ng_container_0_ng_template_1_ng_container_3_Template, 2, 8, "ng-container", 2);
  }
  if (rf & 2) {
    const rowData_r2 = ctx.$implicit;
    const rowIndex_r3 = ctx.index;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngIf", ctx_r3.dt.groupHeaderTemplate && !ctx_r3.dt.virtualScroll && ctx_r3.dt.rowGroupMode === "subheader" && ctx_r3.shouldRenderRowGroupHeader(ctx_r3.value, rowData_r2, rowIndex_r3));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r3.dt.rowGroupMode !== "rowspan");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r3.dt.rowGroupMode === "rowspan");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r3.dt.groupFooterTemplate && !ctx_r3.dt.virtualScroll && ctx_r3.dt.rowGroupMode === "subheader" && ctx_r3.shouldRenderRowGroupFooter(ctx_r3.value, rowData_r2, rowIndex_r3));
  }
}
function TableBody_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, TableBody_ng_container_0_ng_template_1_Template, 4, 4, "ng-template", 1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r3.value)("ngForTrackBy", ctx_r3.dt.rowTrackBy);
  }
}
function TableBody_ng_container_1_ng_template_1_ng_container_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function TableBody_ng_container_1_ng_template_1_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, TableBody_ng_container_1_ng_template_1_ng_container_0_ng_container_1_Template, 1, 0, "ng-container", 4);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext();
    const rowData_r6 = ctx_r4.$implicit;
    const rowIndex_r7 = ctx_r4.index;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r3.template)("ngTemplateOutletContext", \u0275\u0275pureFunction6(2, _c192, rowData_r6, ctx_r3.getRowIndex(rowIndex_r7), ctx_r3.columns, ctx_r3.dt.isRowExpanded(rowData_r6), ctx_r3.dt.editMode === "row" && ctx_r3.dt.isRowEditing(rowData_r6), ctx_r3.frozen));
  }
}
function TableBody_ng_container_1_ng_template_1_ng_container_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function TableBody_ng_container_1_ng_template_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0, 3);
    \u0275\u0275template(1, TableBody_ng_container_1_ng_template_1_ng_container_1_ng_container_1_Template, 1, 0, "ng-container", 4);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext();
    const rowData_r6 = ctx_r4.$implicit;
    const rowIndex_r7 = ctx_r4.index;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r3.dt.groupHeaderTemplate)("ngTemplateOutletContext", \u0275\u0275pureFunction6(2, _c192, rowData_r6, ctx_r3.getRowIndex(rowIndex_r7), ctx_r3.columns, ctx_r3.dt.isRowExpanded(rowData_r6), ctx_r3.dt.editMode === "row" && ctx_r3.dt.isRowEditing(rowData_r6), ctx_r3.frozen));
  }
}
function TableBody_ng_container_1_ng_template_1_ng_container_2_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function TableBody_ng_container_1_ng_template_1_ng_container_2_ng_container_2_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function TableBody_ng_container_1_ng_template_1_ng_container_2_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0, 3);
    \u0275\u0275template(1, TableBody_ng_container_1_ng_template_1_ng_container_2_ng_container_2_ng_container_1_Template, 1, 0, "ng-container", 4);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext(2);
    const rowData_r6 = ctx_r4.$implicit;
    const rowIndex_r7 = ctx_r4.index;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r3.dt.groupFooterTemplate)("ngTemplateOutletContext", \u0275\u0275pureFunction6(2, _c192, rowData_r6, ctx_r3.getRowIndex(rowIndex_r7), ctx_r3.columns, ctx_r3.dt.isRowExpanded(rowData_r6), ctx_r3.dt.editMode === "row" && ctx_r3.dt.isRowEditing(rowData_r6), ctx_r3.frozen));
  }
}
function TableBody_ng_container_1_ng_template_1_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, TableBody_ng_container_1_ng_template_1_ng_container_2_ng_container_1_Template, 1, 0, "ng-container", 4)(2, TableBody_ng_container_1_ng_template_1_ng_container_2_ng_container_2_Template, 2, 9, "ng-container", 2);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext();
    const rowData_r6 = ctx_r4.$implicit;
    const rowIndex_r7 = ctx_r4.index;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r3.dt.expandedRowTemplate)("ngTemplateOutletContext", \u0275\u0275pureFunction4(3, _c20, rowData_r6, ctx_r3.getRowIndex(rowIndex_r7), ctx_r3.columns, ctx_r3.frozen));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r3.dt.groupFooterTemplate && ctx_r3.dt.rowGroupMode === "subheader" && ctx_r3.shouldRenderRowGroupFooter(ctx_r3.value, rowData_r6, ctx_r3.getRowIndex(rowIndex_r7)));
  }
}
function TableBody_ng_container_1_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, TableBody_ng_container_1_ng_template_1_ng_container_0_Template, 2, 9, "ng-container", 0)(1, TableBody_ng_container_1_ng_template_1_ng_container_1_Template, 2, 9, "ng-container", 2)(2, TableBody_ng_container_1_ng_template_1_ng_container_2_Template, 3, 8, "ng-container", 0);
  }
  if (rf & 2) {
    const rowData_r6 = ctx.$implicit;
    const rowIndex_r7 = ctx.index;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngIf", !ctx_r3.dt.groupHeaderTemplate);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r3.dt.groupHeaderTemplate && ctx_r3.dt.rowGroupMode === "subheader" && ctx_r3.shouldRenderRowGroupHeader(ctx_r3.value, rowData_r6, ctx_r3.getRowIndex(rowIndex_r7)));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r3.dt.isRowExpanded(rowData_r6));
  }
}
function TableBody_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, TableBody_ng_container_1_ng_template_1_Template, 3, 3, "ng-template", 1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r3.value)("ngForTrackBy", ctx_r3.dt.rowTrackBy);
  }
}
function TableBody_ng_container_2_ng_template_1_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function TableBody_ng_container_2_ng_template_1_ng_container_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function TableBody_ng_container_2_ng_template_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, TableBody_ng_container_2_ng_template_1_ng_container_1_ng_container_1_Template, 1, 0, "ng-container", 4);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r7 = \u0275\u0275nextContext();
    const rowData_r9 = ctx_r7.$implicit;
    const rowIndex_r10 = ctx_r7.index;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r3.dt.frozenExpandedRowTemplate)("ngTemplateOutletContext", \u0275\u0275pureFunction4(2, _c20, rowData_r9, ctx_r3.getRowIndex(rowIndex_r10), ctx_r3.columns, ctx_r3.frozen));
  }
}
function TableBody_ng_container_2_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, TableBody_ng_container_2_ng_template_1_ng_container_0_Template, 1, 0, "ng-container", 4)(1, TableBody_ng_container_2_ng_template_1_ng_container_1_Template, 2, 7, "ng-container", 0);
  }
  if (rf & 2) {
    const rowData_r9 = ctx.$implicit;
    const rowIndex_r10 = ctx.index;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngTemplateOutlet", ctx_r3.template)("ngTemplateOutletContext", \u0275\u0275pureFunction6(3, _c192, rowData_r9, ctx_r3.getRowIndex(rowIndex_r10), ctx_r3.columns, ctx_r3.dt.isRowExpanded(rowData_r9), ctx_r3.dt.editMode === "row" && ctx_r3.dt.isRowEditing(rowData_r9), ctx_r3.frozen));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r3.dt.isRowExpanded(rowData_r9));
  }
}
function TableBody_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, TableBody_ng_container_2_ng_template_1_Template, 2, 10, "ng-template", 1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r3.value)("ngForTrackBy", ctx_r3.dt.rowTrackBy);
  }
}
function TableBody_ng_container_3_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function TableBody_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, TableBody_ng_container_3_ng_container_1_Template, 1, 0, "ng-container", 4);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r3.dt.loadingBodyTemplate)("ngTemplateOutletContext", \u0275\u0275pureFunction2(2, _c21, ctx_r3.columns, ctx_r3.frozen));
  }
}
function TableBody_ng_container_4_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function TableBody_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, TableBody_ng_container_4_ng_container_1_Template, 1, 0, "ng-container", 4);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r3.dt.emptyMessageTemplate)("ngTemplateOutletContext", \u0275\u0275pureFunction2(2, _c21, ctx_r3.columns, ctx_r3.frozen));
  }
}
function SortIcon_ng_container_0_SortAltIcon_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "SortAltIcon", 4);
  }
  if (rf & 2) {
    \u0275\u0275property("styleClass", "p-sortable-column-icon");
  }
}
function SortIcon_ng_container_0_SortAmountUpAltIcon_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "SortAmountUpAltIcon", 4);
  }
  if (rf & 2) {
    \u0275\u0275property("styleClass", "p-sortable-column-icon");
  }
}
function SortIcon_ng_container_0_SortAmountDownIcon_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "SortAmountDownIcon", 4);
  }
  if (rf & 2) {
    \u0275\u0275property("styleClass", "p-sortable-column-icon");
  }
}
function SortIcon_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, SortIcon_ng_container_0_SortAltIcon_1_Template, 1, 1, "SortAltIcon", 3)(2, SortIcon_ng_container_0_SortAmountUpAltIcon_2_Template, 1, 1, "SortAmountUpAltIcon", 3)(3, SortIcon_ng_container_0_SortAmountDownIcon_3_Template, 1, 1, "SortAmountDownIcon", 3);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.sortOrder === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.sortOrder === 1);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.sortOrder === -1);
  }
}
function SortIcon_span_1_1_ng_template_0_Template(rf, ctx) {
}
function SortIcon_span_1_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, SortIcon_span_1_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function SortIcon_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 5);
    \u0275\u0275template(1, SortIcon_span_1_1_Template, 1, 0, null, 6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.dt.sortIconTemplate)("ngTemplateOutletContext", \u0275\u0275pureFunction1(2, _c152, ctx_r0.sortOrder));
  }
}
function SortIcon_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getBadgeValue());
  }
}
function CellEditor_ng_container_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function CellEditor_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, CellEditor_ng_container_0_ng_container_1_Template, 1, 0, "ng-container", 1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.inputTemplate);
  }
}
function CellEditor_ng_container_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function CellEditor_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, CellEditor_ng_container_1_ng_container_1_Template, 1, 0, "ng-container", 1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.outputTemplate);
  }
}
var _c222 = ["rb"];
var _c232 = (a0, a1, a2) => ({
  "p-radiobutton-focused": a0,
  "p-radiobutton-checked": a1,
  "p-radiobutton-disabled": a2
});
var _c242 = (a0, a1, a2) => ({
  "p-radiobutton-box p-component": true,
  "p-highlight": a0,
  "p-focus": a1,
  "p-disabled": a2
});
var _c252 = (a0, a1) => ({
  "p-checkbox-focused": a0,
  "p-checkbox-disabled": a1
});
var _c262 = (a0, a1, a2) => ({
  "p-checkbox-box p-component": true,
  "p-highlight": a0,
  "p-focus": a1,
  "p-disabled": a2
});
function TableCheckbox_ng_container_5_CheckIcon_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "CheckIcon", 7);
  }
  if (rf & 2) {
    \u0275\u0275property("styleClass", "p-checkbox-icon");
  }
}
function TableCheckbox_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, TableCheckbox_ng_container_5_CheckIcon_1_Template, 1, 1, "CheckIcon", 6);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.checked);
  }
}
function TableCheckbox_span_6_1_ng_template_0_Template(rf, ctx) {
}
function TableCheckbox_span_6_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, TableCheckbox_span_6_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function TableCheckbox_span_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275template(1, TableCheckbox_span_6_1_Template, 1, 0, null, 8);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r1.dt.checkboxIconTemplate)("ngTemplateOutletContext", \u0275\u0275pureFunction1(2, _c152, ctx_r1.checked));
  }
}
var _c272 = (a0, a1, a2) => ({
  "p-checkbox-box": true,
  "p-highlight": a0,
  "p-focus": a1,
  "p-disabled": a2
});
function TableHeaderCheckbox_ng_container_6_CheckIcon_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "CheckIcon", 9);
  }
  if (rf & 2) {
    \u0275\u0275property("styleClass", "p-checkbox-icon");
  }
}
function TableHeaderCheckbox_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, TableHeaderCheckbox_ng_container_6_CheckIcon_1_Template, 1, 1, "CheckIcon", 8);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.checked);
  }
}
function TableHeaderCheckbox_span_7_1_ng_template_0_Template(rf, ctx) {
}
function TableHeaderCheckbox_span_7_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, TableHeaderCheckbox_span_7_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function TableHeaderCheckbox_span_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 10);
    \u0275\u0275template(1, TableHeaderCheckbox_span_7_1_Template, 1, 0, null, 11);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r1.dt.headerCheckboxIconTemplate)("ngTemplateOutletContext", \u0275\u0275pureFunction1(2, _c152, ctx_r1.checked));
  }
}
var _c28 = ["icon"];
var _c29 = (a0, a1) => ({
  "p-column-filter-row": a0,
  "p-column-filter-menu": a1
});
var _c30 = (a0, a1) => ({
  "p-column-filter-menu-button-open": a0,
  "p-column-filter-menu-button-active": a1
});
var _c31 = (a0) => ({
  "p-hidden-space": a0
});
var _c322 = (a0) => ({
  "p-column-filter-overlay p-component p-fluid": true,
  "p-column-filter-overlay-menu": a0
});
var _c332 = (a0) => ({
  "p-highlight": a0
});
function ColumnFilter_p_columnFilterFormElement_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "p-columnFilterFormElement", 7);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("type", ctx_r0.type)("field", ctx_r0.field)("filterConstraint", ctx_r0.dt.filters[ctx_r0.field])("filterTemplate", ctx_r0.filterTemplate)("placeholder", ctx_r0.placeholder)("minFractionDigits", ctx_r0.minFractionDigits)("maxFractionDigits", ctx_r0.maxFractionDigits)("prefix", ctx_r0.prefix)("suffix", ctx_r0.suffix)("locale", ctx_r0.locale)("localeMatcher", ctx_r0.localeMatcher)("currency", ctx_r0.currency)("currencyDisplay", ctx_r0.currencyDisplay)("useGrouping", ctx_r0.useGrouping)("showButtons", ctx_r0.showButtons);
  }
}
function ColumnFilter_button_2_FilterIcon_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "FilterIcon", 11);
  }
  if (rf & 2) {
    \u0275\u0275property("styleClass", "pi-filter-icon");
  }
}
function ColumnFilter_button_2_span_3_1_ng_template_0_Template(rf, ctx) {
}
function ColumnFilter_button_2_span_3_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, ColumnFilter_button_2_span_3_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function ColumnFilter_button_2_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 12);
    \u0275\u0275template(1, ColumnFilter_button_2_span_3_1_Template, 1, 0, null, 13);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.filterIconTemplate);
  }
}
function ColumnFilter_button_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 8, 0);
    \u0275\u0275listener("click", function ColumnFilter_button_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.toggleMenu());
    })("keydown", function ColumnFilter_button_2_Template_button_keydown_0_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onToggleButtonKeyDown($event));
    });
    \u0275\u0275template(2, ColumnFilter_button_2_FilterIcon_2_Template, 1, 1, "FilterIcon", 9)(3, ColumnFilter_button_2_span_3_Template, 2, 1, "span", 10);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(4, _c30, ctx_r0.overlayVisible, ctx_r0.hasFilter()));
    \u0275\u0275attribute("aria-expanded", ctx_r0.overlayVisible);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", !ctx_r0.filterIconTemplate);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.filterIconTemplate);
  }
}
function ColumnFilter_button_3_FilterSlashIcon_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "FilterSlashIcon");
  }
}
function ColumnFilter_button_3_3_ng_template_0_Template(rf, ctx) {
}
function ColumnFilter_button_3_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, ColumnFilter_button_3_3_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function ColumnFilter_button_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 14, 0);
    \u0275\u0275listener("click", function ColumnFilter_button_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.clearFilter());
    });
    \u0275\u0275template(2, ColumnFilter_button_3_FilterSlashIcon_2_Template, 1, 0, "FilterSlashIcon", 15)(3, ColumnFilter_button_3_3_Template, 1, 0, null, 13);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(3, _c31, !ctx_r0.hasRowFilter()));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", !ctx_r0.clearIconTemplate);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.clearFilterIcon);
  }
}
function ColumnFilter_div_4_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function ColumnFilter_div_4_ul_2_li_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 23);
    \u0275\u0275listener("click", function ColumnFilter_div_4_ul_2_li_1_Template_li_click_0_listener() {
      const matchMode_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.onRowMatchModeChange(matchMode_r7.value));
    })("keydown", function ColumnFilter_div_4_ul_2_li_1_Template_li_keydown_0_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.onRowMatchModeKeyDown($event));
    })("keydown.enter", function ColumnFilter_div_4_ul_2_li_1_Template_li_keydown_enter_0_listener() {
      const matchMode_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.onRowMatchModeChange(matchMode_r7.value));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const matchMode_r7 = ctx.$implicit;
    const i_r8 = ctx.index;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(3, _c332, ctx_r0.isRowMatchModeSelected(matchMode_r7.value)));
    \u0275\u0275attribute("tabindex", i_r8 === 0 ? "0" : null);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", matchMode_r7.label, " ");
  }
}
function ColumnFilter_div_4_ul_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "ul", 19);
    \u0275\u0275template(1, ColumnFilter_div_4_ul_2_li_1_Template, 2, 5, "li", 20);
    \u0275\u0275element(2, "li", 21);
    \u0275\u0275elementStart(3, "li", 22);
    \u0275\u0275listener("click", function ColumnFilter_div_4_ul_2_Template_li_click_3_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onRowClearItemClick());
    })("keydown", function ColumnFilter_div_4_ul_2_Template_li_keydown_3_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onRowMatchModeKeyDown($event));
    })("keydown.enter", function ColumnFilter_div_4_ul_2_Template_li_keydown_enter_3_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onRowClearItemClick());
    });
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.matchModes);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.noFilterLabel);
  }
}
function ColumnFilter_div_4_ng_template_3_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 31)(1, "p-dropdown", 32);
    \u0275\u0275listener("ngModelChange", function ColumnFilter_div_4_ng_template_3_div_0_Template_p_dropdown_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.onOperatorChange($event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("options", ctx_r0.operatorOptions)("ngModel", ctx_r0.operator);
  }
}
function ColumnFilter_div_4_ng_template_3_div_2_p_dropdown_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p-dropdown", 37);
    \u0275\u0275listener("ngModelChange", function ColumnFilter_div_4_ng_template_3_div_2_p_dropdown_1_Template_p_dropdown_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r10);
      const fieldConstraint_r11 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.onMenuMatchModeChange($event, fieldConstraint_r11));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const fieldConstraint_r11 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("options", ctx_r0.matchModes)("ngModel", fieldConstraint_r11.matchMode);
  }
}
function ColumnFilter_div_4_ng_template_3_div_2_button_4_TrashIcon_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "TrashIcon");
  }
}
function ColumnFilter_div_4_ng_template_3_div_2_button_4_2_ng_template_0_Template(rf, ctx) {
}
function ColumnFilter_div_4_ng_template_3_div_2_button_4_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, ColumnFilter_div_4_ng_template_3_div_2_button_4_2_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function ColumnFilter_div_4_ng_template_3_div_2_button_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 38);
    \u0275\u0275listener("click", function ColumnFilter_div_4_ng_template_3_div_2_button_4_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r12);
      const fieldConstraint_r11 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.removeConstraint(fieldConstraint_r11));
    });
    \u0275\u0275template(1, ColumnFilter_div_4_ng_template_3_div_2_button_4_TrashIcon_1_Template, 1, 0, "TrashIcon", 15)(2, ColumnFilter_div_4_ng_template_3_div_2_button_4_2_Template, 1, 0, null, 13);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275property("label", ctx_r0.removeRuleButtonLabel);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.removeRuleIconTemplate);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.removeRuleIconTemplate);
  }
}
function ColumnFilter_div_4_ng_template_3_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33);
    \u0275\u0275template(1, ColumnFilter_div_4_ng_template_3_div_2_p_dropdown_1_Template, 1, 2, "p-dropdown", 34);
    \u0275\u0275element(2, "p-columnFilterFormElement", 35);
    \u0275\u0275elementStart(3, "div");
    \u0275\u0275template(4, ColumnFilter_div_4_ng_template_3_div_2_button_4_Template, 3, 3, "button", 36);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const fieldConstraint_r11 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.showMatchModes && ctx_r0.matchModes);
    \u0275\u0275advance();
    \u0275\u0275property("type", ctx_r0.type)("field", ctx_r0.field)("filterConstraint", fieldConstraint_r11)("filterTemplate", ctx_r0.filterTemplate)("placeholder", ctx_r0.placeholder)("minFractionDigits", ctx_r0.minFractionDigits)("maxFractionDigits", ctx_r0.maxFractionDigits)("prefix", ctx_r0.prefix)("suffix", ctx_r0.suffix)("locale", ctx_r0.locale)("localeMatcher", ctx_r0.localeMatcher)("currency", ctx_r0.currency)("currencyDisplay", ctx_r0.currencyDisplay)("useGrouping", ctx_r0.useGrouping);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r0.showRemoveIcon);
  }
}
function ColumnFilter_div_4_ng_template_3_div_3_PlusIcon_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "PlusIcon");
  }
}
function ColumnFilter_div_4_ng_template_3_div_3_3_ng_template_0_Template(rf, ctx) {
}
function ColumnFilter_div_4_ng_template_3_div_3_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, ColumnFilter_div_4_ng_template_3_div_3_3_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function ColumnFilter_div_4_ng_template_3_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 39)(1, "button", 40);
    \u0275\u0275listener("click", function ColumnFilter_div_4_ng_template_3_div_3_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.addConstraint());
    });
    \u0275\u0275template(2, ColumnFilter_div_4_ng_template_3_div_3_PlusIcon_2_Template, 1, 0, "PlusIcon", 15)(3, ColumnFilter_div_4_ng_template_3_div_3_3_Template, 1, 0, null, 13);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("label", ctx_r0.addRuleButtonLabel);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.addRuleIconTemplate);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.addRuleIconTemplate);
  }
}
function ColumnFilter_div_4_ng_template_3_button_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 41);
    \u0275\u0275listener("click", function ColumnFilter_div_4_ng_template_3_button_5_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.clearFilter());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("label", ctx_r0.clearButtonLabel);
  }
}
function ColumnFilter_div_4_ng_template_3_button_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 42);
    \u0275\u0275listener("click", function ColumnFilter_div_4_ng_template_3_button_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.applyFilter());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("label", ctx_r0.applyButtonLabel);
  }
}
function ColumnFilter_div_4_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, ColumnFilter_div_4_ng_template_3_div_0_Template, 2, 2, "div", 24);
    \u0275\u0275elementStart(1, "div", 25);
    \u0275\u0275template(2, ColumnFilter_div_4_ng_template_3_div_2_Template, 5, 16, "div", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, ColumnFilter_div_4_ng_template_3_div_3_Template, 4, 3, "div", 27);
    \u0275\u0275elementStart(4, "div", 28);
    \u0275\u0275template(5, ColumnFilter_div_4_ng_template_3_button_5_Template, 1, 1, "button", 29)(6, ColumnFilter_div_4_ng_template_3_button_6_Template, 1, 1, "button", 30);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngIf", ctx_r0.isShowOperator);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r0.fieldConstraints);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.isShowAddConstraint);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r0.showClearButton);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.showApplyButton);
  }
}
function ColumnFilter_div_4_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function ColumnFilter_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275listener("click", function ColumnFilter_div_4_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onContentClick());
    })("@overlayAnimation.start", function ColumnFilter_div_4_Template_div_animation_overlayAnimation_start_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onOverlayAnimationStart($event));
    })("@overlayAnimation.done", function ColumnFilter_div_4_Template_div_animation_overlayAnimation_done_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onOverlayAnimationEnd($event));
    })("keydown.escape", function ColumnFilter_div_4_Template_div_keydown_escape_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onEscape());
    });
    \u0275\u0275template(1, ColumnFilter_div_4_ng_container_1_Template, 1, 0, "ng-container", 17)(2, ColumnFilter_div_4_ul_2_Template, 5, 2, "ul", 18)(3, ColumnFilter_div_4_ng_template_3_Template, 7, 5, "ng-template", null, 1, \u0275\u0275templateRefExtractor)(5, ColumnFilter_div_4_ng_container_5_Template, 1, 0, "ng-container", 17);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const menu_r16 = \u0275\u0275reference(4);
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(8, _c322, ctx_r0.display === "menu"))("@overlayAnimation", "visible");
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.headerTemplate)("ngTemplateOutletContext", \u0275\u0275pureFunction1(10, _c152, ctx_r0.field));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.display === "row")("ngIfElse", menu_r16);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.footerTemplate)("ngTemplateOutletContext", \u0275\u0275pureFunction1(12, _c152, ctx_r0.field));
  }
}
var _c342 = (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15) => ({
  $implicit: a0,
  filterCallback: a1,
  type: a2,
  field: a3,
  filterConstraint: a4,
  placeholder: a5,
  minFractionDigits: a6,
  maxFractionDigits: a7,
  prefix: a8,
  suffix: a9,
  locale: a10,
  localeMatcher: a11,
  currency: a12,
  currencyDisplay: a13,
  useGrouping: a14,
  showButtons: a15
});
function ColumnFilterFormElement_ng_container_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function ColumnFilterFormElement_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, ColumnFilterFormElement_ng_container_0_ng_container_1_Template, 1, 0, "ng-container", 2);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.filterTemplate)("ngTemplateOutletContext", \u0275\u0275pureFunctionV(2, _c342, [ctx_r0.filterConstraint.value, ctx_r0.filterCallback, ctx_r0.type, ctx_r0.field, ctx_r0.filterConstraint, ctx_r0.placeholder, ctx_r0.minFractionDigits, ctx_r0.maxFractionDigits, ctx_r0.prefix, ctx_r0.suffix, ctx_r0.locale, ctx_r0.localeMatcher, ctx_r0.currency, ctx_r0.currencyDisplay, ctx_r0.useGrouping, ctx_r0.showButtons]));
  }
}
function ColumnFilterFormElement_ng_template_1_input_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "input", 8);
    \u0275\u0275listener("input", function ColumnFilterFormElement_ng_template_1_input_1_Template_input_input_0_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onModelChange($event.target.value));
    })("keydown.enter", function ColumnFilterFormElement_ng_template_1_input_1_Template_input_keydown_enter_0_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onTextInputEnterKeyDown($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("value", ctx_r0.filterConstraint == null ? null : ctx_r0.filterConstraint.value);
    \u0275\u0275attribute("placeholder", ctx_r0.placeholder);
  }
}
function ColumnFilterFormElement_ng_template_1_p_inputNumber_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p-inputNumber", 9);
    \u0275\u0275listener("ngModelChange", function ColumnFilterFormElement_ng_template_1_p_inputNumber_2_Template_p_inputNumber_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onModelChange($event));
    })("onKeyDown", function ColumnFilterFormElement_ng_template_1_p_inputNumber_2_Template_p_inputNumber_onKeyDown_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onNumericInputKeyDown($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngModel", ctx_r0.filterConstraint == null ? null : ctx_r0.filterConstraint.value)("showButtons", ctx_r0.showButtons)("minFractionDigits", ctx_r0.minFractionDigits)("maxFractionDigits", ctx_r0.maxFractionDigits)("prefix", ctx_r0.prefix)("suffix", ctx_r0.suffix)("placeholder", ctx_r0.placeholder)("mode", ctx_r0.currency ? "currency" : "decimal")("locale", ctx_r0.locale)("localeMatcher", ctx_r0.localeMatcher)("currency", ctx_r0.currency)("currencyDisplay", ctx_r0.currencyDisplay)("useGrouping", ctx_r0.useGrouping);
  }
}
function ColumnFilterFormElement_ng_template_1_p_triStateCheckbox_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p-triStateCheckbox", 10);
    \u0275\u0275listener("ngModelChange", function ColumnFilterFormElement_ng_template_1_p_triStateCheckbox_3_Template_p_triStateCheckbox_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onModelChange($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngModel", ctx_r0.filterConstraint == null ? null : ctx_r0.filterConstraint.value);
  }
}
function ColumnFilterFormElement_ng_template_1_p_calendar_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p-calendar", 11);
    \u0275\u0275listener("ngModelChange", function ColumnFilterFormElement_ng_template_1_p_calendar_4_Template_p_calendar_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onModelChange($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("placeholder", ctx_r0.placeholder)("ngModel", ctx_r0.filterConstraint == null ? null : ctx_r0.filterConstraint.value);
  }
}
function ColumnFilterFormElement_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0, 3);
    \u0275\u0275template(1, ColumnFilterFormElement_ng_template_1_input_1_Template, 1, 2, "input", 4)(2, ColumnFilterFormElement_ng_template_1_p_inputNumber_2_Template, 1, 13, "p-inputNumber", 5)(3, ColumnFilterFormElement_ng_template_1_p_triStateCheckbox_3_Template, 1, 1, "p-triStateCheckbox", 6)(4, ColumnFilterFormElement_ng_template_1_p_calendar_4_Template, 1, 2, "p-calendar", 7);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("ngSwitch", ctx_r0.type);
    \u0275\u0275advance();
    \u0275\u0275property("ngSwitchCase", "text");
    \u0275\u0275advance();
    \u0275\u0275property("ngSwitchCase", "numeric");
    \u0275\u0275advance();
    \u0275\u0275property("ngSwitchCase", "boolean");
    \u0275\u0275advance();
    \u0275\u0275property("ngSwitchCase", "date");
  }
}
var TableService = class {
  constructor() {
    this.sortSource = new Subject();
    this.selectionSource = new Subject();
    this.contextMenuSource = new Subject();
    this.valueSource = new Subject();
    this.totalRecordsSource = new Subject();
    this.columnsSource = new Subject();
    this.resetSource = new Subject();
    this.sortSource$ = this.sortSource.asObservable();
    this.selectionSource$ = this.selectionSource.asObservable();
    this.contextMenuSource$ = this.contextMenuSource.asObservable();
    this.valueSource$ = this.valueSource.asObservable();
    this.totalRecordsSource$ = this.totalRecordsSource.asObservable();
    this.columnsSource$ = this.columnsSource.asObservable();
    this.resetSource$ = this.resetSource.asObservable();
  }
  onSort(sortMeta) {
    this.sortSource.next(sortMeta);
  }
  onSelectionChange() {
    this.selectionSource.next(null);
  }
  onResetChange() {
    this.resetSource.next(null);
  }
  onContextMenu(data) {
    this.contextMenuSource.next(data);
  }
  onValueChange(value) {
    this.valueSource.next(value);
  }
  onTotalRecordsChange(value) {
    this.totalRecordsSource.next(value);
  }
  onColumnsChange(columns) {
    this.columnsSource.next(columns);
  }
};
TableService.\u0275fac = function TableService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || TableService)();
};
TableService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
  token: TableService,
  factory: TableService.\u0275fac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TableService, [{
    type: Injectable
  }], null, null);
})();
var Table = class {
  constructor(document2, platformId, renderer, el, zone, tableService, cd, filterService, overlayService) {
    this.document = document2;
    this.platformId = platformId;
    this.renderer = renderer;
    this.el = el;
    this.zone = zone;
    this.tableService = tableService;
    this.cd = cd;
    this.filterService = filterService;
    this.overlayService = overlayService;
    this.pageLinks = 5;
    this.alwaysShowPaginator = true;
    this.paginatorPosition = "bottom";
    this.paginatorDropdownScrollHeight = "200px";
    this.currentPageReportTemplate = "{currentPage} of {totalPages}";
    this.showFirstLastIcon = true;
    this.showPageLinks = true;
    this.defaultSortOrder = 1;
    this.sortMode = "single";
    this.resetPageOnSort = true;
    this.selectAllChange = new EventEmitter();
    this.selectionChange = new EventEmitter();
    this.contextMenuSelectionChange = new EventEmitter();
    this.contextMenuSelectionMode = "separate";
    this.rowTrackBy = (index, item) => item;
    this.lazy = false;
    this.lazyLoadOnInit = true;
    this.compareSelectionBy = "deepEquals";
    this.csvSeparator = ",";
    this.exportFilename = "download";
    this.filters = {};
    this.filterDelay = 300;
    this.expandedRowKeys = {};
    this.editingRowKeys = {};
    this.rowExpandMode = "multiple";
    this.scrollDirection = "vertical";
    this.virtualScrollDelay = 250;
    this.columnResizeMode = "fit";
    this.showLoader = true;
    this.showInitialSortBadge = true;
    this.stateStorage = "session";
    this.editMode = "cell";
    this.groupRowsByOrder = 1;
    this.responsiveLayout = "scroll";
    this.breakpoint = "960px";
    this.onRowSelect = new EventEmitter();
    this.onRowUnselect = new EventEmitter();
    this.onPage = new EventEmitter();
    this.onSort = new EventEmitter();
    this.onFilter = new EventEmitter();
    this.onLazyLoad = new EventEmitter();
    this.onRowExpand = new EventEmitter();
    this.onRowCollapse = new EventEmitter();
    this.onContextMenuSelect = new EventEmitter();
    this.onColResize = new EventEmitter();
    this.onColReorder = new EventEmitter();
    this.onRowReorder = new EventEmitter();
    this.onEditInit = new EventEmitter();
    this.onEditComplete = new EventEmitter();
    this.onEditCancel = new EventEmitter();
    this.onHeaderCheckboxToggle = new EventEmitter();
    this.sortFunction = new EventEmitter();
    this.firstChange = new EventEmitter();
    this.rowsChange = new EventEmitter();
    this.onStateSave = new EventEmitter();
    this.onStateRestore = new EventEmitter();
    this._virtualRowHeight = 28;
    this._value = [];
    this._totalRecords = 0;
    this._first = 0;
    this.selectionKeys = {};
    this._sortOrder = 1;
    this._selectAll = null;
    this.columnResizing = false;
    this.rowGroupHeaderStyleObject = {};
    this.id = UniqueComponentId();
    this.window = this.document.defaultView;
  }
  get responsive() {
    return this._responsive;
  }
  set responsive(val) {
    this._responsive = val;
    console.warn("responsive propery is deprecated as table is always responsive with scrollable behavior.");
  }
  get virtualRowHeight() {
    return this._virtualRowHeight;
  }
  set virtualRowHeight(val) {
    this._virtualRowHeight = val;
    console.warn("The virtualRowHeight property is deprecated, use virtualScrollItemSize property instead.");
  }
  ngOnInit() {
    if (this.lazy && this.lazyLoadOnInit) {
      if (!this.virtualScroll) {
        this.onLazyLoad.emit(this.createLazyLoadMetadata());
      }
      if (this.restoringFilter) {
        this.restoringFilter = false;
      }
    }
    if (this.responsiveLayout === "stack" && !this.scrollable) {
      this.createResponsiveStyle();
    }
    this.initialized = true;
  }
  ngAfterContentInit() {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case "caption":
          this.captionTemplate = item.template;
          break;
        case "header":
          this.headerTemplate = item.template;
          break;
        case "headergrouped":
          this.headerGroupedTemplate = item.template;
          break;
        case "body":
          this.bodyTemplate = item.template;
          break;
        case "loadingbody":
          this.loadingBodyTemplate = item.template;
          break;
        case "footer":
          this.footerTemplate = item.template;
          break;
        case "footergrouped":
          this.footerGroupedTemplate = item.template;
          break;
        case "summary":
          this.summaryTemplate = item.template;
          break;
        case "colgroup":
          this.colGroupTemplate = item.template;
          break;
        case "rowexpansion":
          this.expandedRowTemplate = item.template;
          break;
        case "groupheader":
          this.groupHeaderTemplate = item.template;
          break;
        case "rowspan":
          this.rowspanTemplate = item.template;
          break;
        case "groupfooter":
          this.groupFooterTemplate = item.template;
          break;
        case "frozenrows":
          this.frozenRowsTemplate = item.template;
          break;
        case "frozenheader":
          this.frozenHeaderTemplate = item.template;
          break;
        case "frozenbody":
          this.frozenBodyTemplate = item.template;
          break;
        case "frozenfooter":
          this.frozenFooterTemplate = item.template;
          break;
        case "frozencolgroup":
          this.frozenColGroupTemplate = item.template;
          break;
        case "frozenrowexpansion":
          this.frozenExpandedRowTemplate = item.template;
          break;
        case "emptymessage":
          this.emptyMessageTemplate = item.template;
          break;
        case "paginatorleft":
          this.paginatorLeftTemplate = item.template;
          break;
        case "paginatorright":
          this.paginatorRightTemplate = item.template;
          break;
        case "paginatordropdownitem":
          this.paginatorDropdownItemTemplate = item.template;
          break;
        case "paginatorfirstpagelinkicon":
          this.paginatorFirstPageLinkIconTemplate = item.template;
          break;
        case "paginatorlastpagelinkicon":
          this.paginatorLastPageLinkIconTemplate = item.template;
          break;
        case "paginatorpreviouspagelinkicon":
          this.paginatorPreviousPageLinkIconTemplate = item.template;
          break;
        case "paginatornextpagelinkicon":
          this.paginatorNextPageLinkIconTemplate = item.template;
          break;
        case "loadingicon":
          this.loadingIconTemplate = item.template;
          break;
        case "reorderindicatorupicon":
          this.reorderIndicatorUpIconTemplate = item.template;
          break;
        case "reorderindicatordownicon":
          this.reorderIndicatorDownIconTemplate = item.template;
          break;
        case "sorticon":
          this.sortIconTemplate = item.template;
          break;
        case "checkboxicon":
          this.checkboxIconTemplate = item.template;
          break;
        case "headercheckboxicon":
          this.headerCheckboxIconTemplate = item.template;
          break;
      }
    });
  }
  ngAfterViewInit() {
    if (this.isStateful() && this.resizableColumns) {
      this.restoreColumnWidths();
    }
  }
  ngOnChanges(simpleChange) {
    if (simpleChange.value) {
      if (this.isStateful() && !this.stateRestored) {
        this.restoreState();
      }
      this._value = simpleChange.value.currentValue;
      if (!this.lazy) {
        this.totalRecords = this._value ? this._value.length : 0;
        if (this.sortMode == "single" && (this.sortField || this.groupRowsBy)) this.sortSingle();
        else if (this.sortMode == "multiple" && (this.multiSortMeta || this.groupRowsBy)) this.sortMultiple();
        else if (this.hasFilter())
          this._filter();
      }
      this.tableService.onValueChange(simpleChange.value.currentValue);
    }
    if (simpleChange.columns) {
      this._columns = simpleChange.columns.currentValue;
      this.tableService.onColumnsChange(simpleChange.columns.currentValue);
      if (this._columns && this.isStateful() && this.reorderableColumns && !this.columnOrderStateRestored) {
        this.restoreColumnOrder();
      }
    }
    if (simpleChange.sortField) {
      this._sortField = simpleChange.sortField.currentValue;
      if (!this.lazy || this.initialized) {
        if (this.sortMode === "single") {
          this.sortSingle();
        }
      }
    }
    if (simpleChange.groupRowsBy) {
      if (!this.lazy || this.initialized) {
        if (this.sortMode === "single") {
          this.sortSingle();
        }
      }
    }
    if (simpleChange.sortOrder) {
      this._sortOrder = simpleChange.sortOrder.currentValue;
      if (!this.lazy || this.initialized) {
        if (this.sortMode === "single") {
          this.sortSingle();
        }
      }
    }
    if (simpleChange.groupRowsByOrder) {
      if (!this.lazy || this.initialized) {
        if (this.sortMode === "single") {
          this.sortSingle();
        }
      }
    }
    if (simpleChange.multiSortMeta) {
      this._multiSortMeta = simpleChange.multiSortMeta.currentValue;
      if (this.sortMode === "multiple" && (this.initialized || !this.lazy && !this.virtualScroll)) {
        this.sortMultiple();
      }
    }
    if (simpleChange.selection) {
      this._selection = simpleChange.selection.currentValue;
      if (!this.preventSelectionSetterPropagation) {
        this.updateSelectionKeys();
        this.tableService.onSelectionChange();
      }
      this.preventSelectionSetterPropagation = false;
    }
    if (simpleChange.selectAll) {
      this._selectAll = simpleChange.selectAll.currentValue;
      if (!this.preventSelectionSetterPropagation) {
        this.updateSelectionKeys();
        this.tableService.onSelectionChange();
        if (this.isStateful()) {
          this.saveState();
        }
      }
      this.preventSelectionSetterPropagation = false;
    }
  }
  get value() {
    return this._value;
  }
  set value(val) {
    this._value = val;
  }
  get columns() {
    return this._columns;
  }
  set columns(cols) {
    this._columns = cols;
  }
  get first() {
    return this._first;
  }
  set first(val) {
    this._first = val;
  }
  get rows() {
    return this._rows;
  }
  set rows(val) {
    this._rows = val;
  }
  get totalRecords() {
    return this._totalRecords;
  }
  set totalRecords(val) {
    this._totalRecords = val;
    this.tableService.onTotalRecordsChange(this._totalRecords);
  }
  get sortField() {
    return this._sortField;
  }
  set sortField(val) {
    this._sortField = val;
  }
  get sortOrder() {
    return this._sortOrder;
  }
  set sortOrder(val) {
    this._sortOrder = val;
  }
  get multiSortMeta() {
    return this._multiSortMeta;
  }
  set multiSortMeta(val) {
    this._multiSortMeta = val;
  }
  get selection() {
    return this._selection;
  }
  set selection(val) {
    this._selection = val;
  }
  get selectAll() {
    return this._selection;
  }
  set selectAll(val) {
    this._selection = val;
  }
  get processedData() {
    return this.filteredValue || this.value || [];
  }
  dataToRender(data) {
    const _data = data || this.processedData;
    if (_data && this.paginator) {
      const first = this.lazy ? 0 : this.first;
      return _data.slice(first, first + this.rows);
    }
    return _data;
  }
  updateSelectionKeys() {
    if (this.dataKey && this._selection) {
      this.selectionKeys = {};
      if (Array.isArray(this._selection)) {
        for (let data of this._selection) {
          this.selectionKeys[String(ObjectUtils.resolveFieldData(data, this.dataKey))] = 1;
        }
      } else {
        this.selectionKeys[String(ObjectUtils.resolveFieldData(this._selection, this.dataKey))] = 1;
      }
    }
  }
  onPageChange(event) {
    this.first = event.first;
    this.rows = event.rows;
    this.onPage.emit({
      first: this.first,
      rows: this.rows
    });
    if (this.lazy) {
      this.onLazyLoad.emit(this.createLazyLoadMetadata());
    }
    this.firstChange.emit(this.first);
    this.rowsChange.emit(this.rows);
    this.tableService.onValueChange(this.value);
    if (this.isStateful()) {
      this.saveState();
    }
    this.anchorRowIndex = null;
    if (this.scrollable) {
      this.resetScrollTop();
    }
  }
  sort(event) {
    let originalEvent = event.originalEvent;
    if (this.sortMode === "single") {
      this._sortOrder = this.sortField === event.field ? this.sortOrder * -1 : this.defaultSortOrder;
      this._sortField = event.field;
      if (this.resetPageOnSort) {
        this._first = 0;
        this.firstChange.emit(this._first);
        if (this.scrollable) {
          this.resetScrollTop();
        }
      }
      this.sortSingle();
    }
    if (this.sortMode === "multiple") {
      let metaKey = originalEvent.metaKey || originalEvent.ctrlKey;
      let sortMeta = this.getSortMeta(event.field);
      if (sortMeta) {
        if (!metaKey) {
          this._multiSortMeta = [{
            field: event.field,
            order: sortMeta.order * -1
          }];
          if (this.resetPageOnSort) {
            this._first = 0;
            this.firstChange.emit(this._first);
            if (this.scrollable) {
              this.resetScrollTop();
            }
          }
        } else {
          sortMeta.order = sortMeta.order * -1;
        }
      } else {
        if (!metaKey || !this.multiSortMeta) {
          this._multiSortMeta = [];
          if (this.resetPageOnSort) {
            this._first = 0;
            this.firstChange.emit(this._first);
          }
        }
        this._multiSortMeta.push({
          field: event.field,
          order: this.defaultSortOrder
        });
      }
      this.sortMultiple();
    }
    if (this.isStateful()) {
      this.saveState();
    }
    this.anchorRowIndex = null;
  }
  sortSingle() {
    let field = this.sortField || this.groupRowsBy;
    let order = this.sortField ? this.sortOrder : this.groupRowsByOrder;
    if (this.groupRowsBy && this.sortField && this.groupRowsBy !== this.sortField) {
      this._multiSortMeta = [this.getGroupRowsMeta(), {
        field: this.sortField,
        order: this.sortOrder
      }];
      this.sortMultiple();
      return;
    }
    if (field && order) {
      if (this.restoringSort) {
        this.restoringSort = false;
      }
      if (this.lazy) {
        this.onLazyLoad.emit(this.createLazyLoadMetadata());
      } else if (this.value) {
        if (this.customSort) {
          this.sortFunction.emit({
            data: this.value,
            mode: this.sortMode,
            field,
            order
          });
        } else {
          this.value.sort((data1, data2) => {
            let value1 = ObjectUtils.resolveFieldData(data1, field);
            let value2 = ObjectUtils.resolveFieldData(data2, field);
            let result = null;
            if (value1 == null && value2 != null) result = -1;
            else if (value1 != null && value2 == null) result = 1;
            else if (value1 == null && value2 == null) result = 0;
            else if (typeof value1 === "string" && typeof value2 === "string") result = value1.localeCompare(value2);
            else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
            return order * result;
          });
          this._value = [...this.value];
        }
        if (this.hasFilter()) {
          this._filter();
        }
      }
      let sortMeta = {
        field,
        order
      };
      this.onSort.emit(sortMeta);
      this.tableService.onSort(sortMeta);
    }
  }
  sortMultiple() {
    if (this.groupRowsBy) {
      if (!this._multiSortMeta) this._multiSortMeta = [this.getGroupRowsMeta()];
      else if (this.multiSortMeta[0].field !== this.groupRowsBy) this._multiSortMeta = [this.getGroupRowsMeta(), ...this._multiSortMeta];
    }
    if (this.multiSortMeta) {
      if (this.lazy) {
        this.onLazyLoad.emit(this.createLazyLoadMetadata());
      } else if (this.value) {
        if (this.customSort) {
          this.sortFunction.emit({
            data: this.value,
            mode: this.sortMode,
            multiSortMeta: this.multiSortMeta
          });
        } else {
          this.value.sort((data1, data2) => {
            return this.multisortField(data1, data2, this.multiSortMeta, 0);
          });
          this._value = [...this.value];
        }
        if (this.hasFilter()) {
          this._filter();
        }
      }
      this.onSort.emit({
        multisortmeta: this.multiSortMeta
      });
      this.tableService.onSort(this.multiSortMeta);
    }
  }
  multisortField(data1, data2, multiSortMeta, index) {
    const value1 = ObjectUtils.resolveFieldData(data1, multiSortMeta[index].field);
    const value2 = ObjectUtils.resolveFieldData(data2, multiSortMeta[index].field);
    if (ObjectUtils.compare(value1, value2, this.filterLocale) === 0) {
      return multiSortMeta.length - 1 > index ? this.multisortField(data1, data2, multiSortMeta, index + 1) : 0;
    }
    return this.compareValuesOnSort(value1, value2, multiSortMeta[index].order);
  }
  compareValuesOnSort(value1, value2, order) {
    return ObjectUtils.sort(value1, value2, order, this.filterLocale, this.sortOrder);
  }
  getSortMeta(field) {
    if (this.multiSortMeta && this.multiSortMeta.length) {
      for (let i = 0; i < this.multiSortMeta.length; i++) {
        if (this.multiSortMeta[i].field === field) {
          return this.multiSortMeta[i];
        }
      }
    }
    return null;
  }
  isSorted(field) {
    if (this.sortMode === "single") {
      return this.sortField && this.sortField === field;
    } else if (this.sortMode === "multiple") {
      let sorted = false;
      if (this.multiSortMeta) {
        for (let i = 0; i < this.multiSortMeta.length; i++) {
          if (this.multiSortMeta[i].field == field) {
            sorted = true;
            break;
          }
        }
      }
      return sorted;
    }
  }
  handleRowClick(event) {
    let target = event.originalEvent.target;
    let targetNode = target.nodeName;
    let parentNode = target.parentElement && target.parentElement.nodeName;
    if (targetNode == "INPUT" || targetNode == "BUTTON" || targetNode == "A" || parentNode == "INPUT" || parentNode == "BUTTON" || parentNode == "A" || DomHandler.hasClass(event.originalEvent.target, "p-clickable")) {
      return;
    }
    if (this.selectionMode) {
      let rowData = event.rowData;
      let rowIndex = event.rowIndex;
      this.preventSelectionSetterPropagation = true;
      if (this.isMultipleSelectionMode() && event.originalEvent.shiftKey && this.anchorRowIndex != null) {
        DomHandler.clearSelection();
        if (this.rangeRowIndex != null) {
          this.clearSelectionRange(event.originalEvent);
        }
        this.rangeRowIndex = rowIndex;
        this.selectRange(event.originalEvent, rowIndex);
      } else {
        let selected = this.isSelected(rowData);
        if (!selected && !this.isRowSelectable(rowData, rowIndex)) {
          return;
        }
        let metaSelection = this.rowTouched ? false : this.metaKeySelection;
        let dataKeyValue = this.dataKey ? String(ObjectUtils.resolveFieldData(rowData, this.dataKey)) : null;
        this.anchorRowIndex = rowIndex;
        this.rangeRowIndex = rowIndex;
        if (metaSelection) {
          let metaKey = event.originalEvent.metaKey || event.originalEvent.ctrlKey;
          if (selected && metaKey) {
            if (this.isSingleSelectionMode()) {
              this._selection = null;
              this.selectionKeys = {};
              this.selectionChange.emit(null);
            } else {
              let selectionIndex = this.findIndexInSelection(rowData);
              this._selection = this.selection.filter((val, i) => i != selectionIndex);
              this.selectionChange.emit(this.selection);
              if (dataKeyValue) {
                delete this.selectionKeys[dataKeyValue];
              }
            }
            this.onRowUnselect.emit({
              originalEvent: event.originalEvent,
              data: rowData,
              type: "row"
            });
          } else {
            if (this.isSingleSelectionMode()) {
              this._selection = rowData;
              this.selectionChange.emit(rowData);
              if (dataKeyValue) {
                this.selectionKeys = {};
                this.selectionKeys[dataKeyValue] = 1;
              }
            } else if (this.isMultipleSelectionMode()) {
              if (metaKey) {
                this._selection = this.selection || [];
              } else {
                this._selection = [];
                this.selectionKeys = {};
              }
              this._selection = [...this.selection, rowData];
              this.selectionChange.emit(this.selection);
              if (dataKeyValue) {
                this.selectionKeys[dataKeyValue] = 1;
              }
            }
            this.onRowSelect.emit({
              originalEvent: event.originalEvent,
              data: rowData,
              type: "row",
              index: rowIndex
            });
          }
        } else {
          if (this.selectionMode === "single") {
            if (selected) {
              this._selection = null;
              this.selectionKeys = {};
              this.selectionChange.emit(this.selection);
              this.onRowUnselect.emit({
                originalEvent: event.originalEvent,
                data: rowData,
                type: "row",
                index: rowIndex
              });
            } else {
              this._selection = rowData;
              this.selectionChange.emit(this.selection);
              this.onRowSelect.emit({
                originalEvent: event.originalEvent,
                data: rowData,
                type: "row",
                index: rowIndex
              });
              if (dataKeyValue) {
                this.selectionKeys = {};
                this.selectionKeys[dataKeyValue] = 1;
              }
            }
          } else if (this.selectionMode === "multiple") {
            if (selected) {
              let selectionIndex = this.findIndexInSelection(rowData);
              this._selection = this.selection.filter((val, i) => i != selectionIndex);
              this.selectionChange.emit(this.selection);
              this.onRowUnselect.emit({
                originalEvent: event.originalEvent,
                data: rowData,
                type: "row",
                index: rowIndex
              });
              if (dataKeyValue) {
                delete this.selectionKeys[dataKeyValue];
              }
            } else {
              this._selection = this.selection ? [...this.selection, rowData] : [rowData];
              this.selectionChange.emit(this.selection);
              this.onRowSelect.emit({
                originalEvent: event.originalEvent,
                data: rowData,
                type: "row",
                index: rowIndex
              });
              if (dataKeyValue) {
                this.selectionKeys[dataKeyValue] = 1;
              }
            }
          }
        }
      }
      this.tableService.onSelectionChange();
      if (this.isStateful()) {
        this.saveState();
      }
    }
    this.rowTouched = false;
  }
  handleRowTouchEnd(event) {
    this.rowTouched = true;
  }
  handleRowRightClick(event) {
    if (this.contextMenu) {
      const rowData = event.rowData;
      const rowIndex = event.rowIndex;
      if (this.contextMenuSelectionMode === "separate") {
        this.contextMenuSelection = rowData;
        this.contextMenuSelectionChange.emit(rowData);
        this.onContextMenuSelect.emit({
          originalEvent: event.originalEvent,
          data: rowData,
          index: event.rowIndex
        });
        this.contextMenu.show(event.originalEvent);
        this.tableService.onContextMenu(rowData);
      } else if (this.contextMenuSelectionMode === "joint") {
        this.preventSelectionSetterPropagation = true;
        let selected = this.isSelected(rowData);
        let dataKeyValue = this.dataKey ? String(ObjectUtils.resolveFieldData(rowData, this.dataKey)) : null;
        if (!selected) {
          if (!this.isRowSelectable(rowData, rowIndex)) {
            return;
          }
          if (this.isSingleSelectionMode()) {
            this.selection = rowData;
            this.selectionChange.emit(rowData);
            if (dataKeyValue) {
              this.selectionKeys = {};
              this.selectionKeys[dataKeyValue] = 1;
            }
          } else if (this.isMultipleSelectionMode()) {
            this._selection = this.selection ? [...this.selection, rowData] : [rowData];
            this.selectionChange.emit(this.selection);
            if (dataKeyValue) {
              this.selectionKeys[dataKeyValue] = 1;
            }
          }
        }
        this.tableService.onSelectionChange();
        this.contextMenu.show(event.originalEvent);
        this.onContextMenuSelect.emit({
          originalEvent: event,
          data: rowData,
          index: event.rowIndex
        });
      }
    }
  }
  selectRange(event, rowIndex) {
    let rangeStart, rangeEnd;
    if (this.anchorRowIndex > rowIndex) {
      rangeStart = rowIndex;
      rangeEnd = this.anchorRowIndex;
    } else if (this.anchorRowIndex < rowIndex) {
      rangeStart = this.anchorRowIndex;
      rangeEnd = rowIndex;
    } else {
      rangeStart = rowIndex;
      rangeEnd = rowIndex;
    }
    if (this.lazy && this.paginator) {
      rangeStart -= this.first;
      rangeEnd -= this.first;
    }
    let rangeRowsData = [];
    for (let i = rangeStart; i <= rangeEnd; i++) {
      let rangeRowData = this.filteredValue ? this.filteredValue[i] : this.value[i];
      if (!this.isSelected(rangeRowData)) {
        if (!this.isRowSelectable(rangeRowData, rowIndex)) {
          continue;
        }
        rangeRowsData.push(rangeRowData);
        this._selection = [...this.selection, rangeRowData];
        let dataKeyValue = this.dataKey ? String(ObjectUtils.resolveFieldData(rangeRowData, this.dataKey)) : null;
        if (dataKeyValue) {
          this.selectionKeys[dataKeyValue] = 1;
        }
      }
    }
    this.selectionChange.emit(this.selection);
    this.onRowSelect.emit({
      originalEvent: event,
      data: rangeRowsData,
      type: "row"
    });
  }
  clearSelectionRange(event) {
    let rangeStart, rangeEnd;
    if (this.rangeRowIndex > this.anchorRowIndex) {
      rangeStart = this.anchorRowIndex;
      rangeEnd = this.rangeRowIndex;
    } else if (this.rangeRowIndex < this.anchorRowIndex) {
      rangeStart = this.rangeRowIndex;
      rangeEnd = this.anchorRowIndex;
    } else {
      rangeStart = this.rangeRowIndex;
      rangeEnd = this.rangeRowIndex;
    }
    for (let i = rangeStart; i <= rangeEnd; i++) {
      let rangeRowData = this.value[i];
      let selectionIndex = this.findIndexInSelection(rangeRowData);
      this._selection = this.selection.filter((val, i2) => i2 != selectionIndex);
      let dataKeyValue = this.dataKey ? String(ObjectUtils.resolveFieldData(rangeRowData, this.dataKey)) : null;
      if (dataKeyValue) {
        delete this.selectionKeys[dataKeyValue];
      }
      this.onRowUnselect.emit({
        originalEvent: event,
        data: rangeRowData,
        type: "row"
      });
    }
  }
  isSelected(rowData) {
    if (rowData && this.selection) {
      if (this.dataKey) {
        return this.selectionKeys[ObjectUtils.resolveFieldData(rowData, this.dataKey)] !== void 0;
      } else {
        if (Array.isArray(this.selection)) return this.findIndexInSelection(rowData) > -1;
        else return this.equals(rowData, this.selection);
      }
    }
    return false;
  }
  findIndexInSelection(rowData) {
    let index = -1;
    if (this.selection && this.selection.length) {
      for (let i = 0; i < this.selection.length; i++) {
        if (this.equals(rowData, this.selection[i])) {
          index = i;
          break;
        }
      }
    }
    return index;
  }
  isRowSelectable(data, index) {
    if (this.rowSelectable && !this.rowSelectable({
      data,
      index
    })) {
      return false;
    }
    return true;
  }
  toggleRowWithRadio(event, rowData) {
    this.preventSelectionSetterPropagation = true;
    if (this.selection != rowData) {
      if (!this.isRowSelectable(rowData, event.rowIndex)) {
        return;
      }
      this._selection = rowData;
      this.selectionChange.emit(this.selection);
      this.onRowSelect.emit({
        originalEvent: event.originalEvent,
        index: event.rowIndex,
        data: rowData,
        type: "radiobutton"
      });
      if (this.dataKey) {
        this.selectionKeys = {};
        this.selectionKeys[String(ObjectUtils.resolveFieldData(rowData, this.dataKey))] = 1;
      }
    } else {
      this._selection = null;
      this.selectionChange.emit(this.selection);
      this.onRowUnselect.emit({
        originalEvent: event.originalEvent,
        index: event.rowIndex,
        data: rowData,
        type: "radiobutton"
      });
    }
    this.tableService.onSelectionChange();
    if (this.isStateful()) {
      this.saveState();
    }
  }
  toggleRowWithCheckbox(event, rowData) {
    this.selection = this.selection || [];
    let selected = this.isSelected(rowData);
    let dataKeyValue = this.dataKey ? String(ObjectUtils.resolveFieldData(rowData, this.dataKey)) : null;
    this.preventSelectionSetterPropagation = true;
    if (selected) {
      let selectionIndex = this.findIndexInSelection(rowData);
      this._selection = this.selection.filter((val, i) => i != selectionIndex);
      this.selectionChange.emit(this.selection);
      this.onRowUnselect.emit({
        originalEvent: event.originalEvent,
        index: event.rowIndex,
        data: rowData,
        type: "checkbox"
      });
      if (dataKeyValue) {
        delete this.selectionKeys[dataKeyValue];
      }
    } else {
      if (!this.isRowSelectable(rowData, event.rowIndex)) {
        return;
      }
      this._selection = this.selection ? [...this.selection, rowData] : [rowData];
      this.selectionChange.emit(this.selection);
      this.onRowSelect.emit({
        originalEvent: event.originalEvent,
        index: event.rowIndex,
        data: rowData,
        type: "checkbox"
      });
      if (dataKeyValue) {
        this.selectionKeys[dataKeyValue] = 1;
      }
    }
    this.tableService.onSelectionChange();
    if (this.isStateful()) {
      this.saveState();
    }
  }
  toggleRowsWithCheckbox(event, check) {
    if (this._selectAll !== null) {
      this.selectAllChange.emit({
        originalEvent: event,
        checked: check
      });
    } else {
      const data = this.selectionPageOnly ? this.dataToRender(this.processedData) : this.processedData;
      let selection = this.selectionPageOnly && this._selection ? this._selection.filter((s) => !data.some((d) => this.equals(s, d))) : [];
      if (check) {
        selection = this.frozenValue ? [...selection, ...this.frozenValue, ...data] : [...selection, ...data];
        selection = this.rowSelectable ? selection.filter((data2, index) => this.rowSelectable({
          data: data2,
          index
        })) : selection;
      }
      this._selection = selection;
      this.preventSelectionSetterPropagation = true;
      this.updateSelectionKeys();
      this.selectionChange.emit(this._selection);
      this.tableService.onSelectionChange();
      this.onHeaderCheckboxToggle.emit({
        originalEvent: event,
        checked: check
      });
      if (this.isStateful()) {
        this.saveState();
      }
    }
  }
  equals(data1, data2) {
    return this.compareSelectionBy === "equals" ? data1 === data2 : ObjectUtils.equals(data1, data2, this.dataKey);
  }
  /* Legacy Filtering for custom elements */
  filter(value, field, matchMode) {
    if (this.filterTimeout) {
      clearTimeout(this.filterTimeout);
    }
    if (!this.isFilterBlank(value)) {
      this.filters[field] = {
        value,
        matchMode
      };
    } else if (this.filters[field]) {
      delete this.filters[field];
    }
    this.filterTimeout = setTimeout(() => {
      this._filter();
      this.filterTimeout = null;
    }, this.filterDelay);
    this.anchorRowIndex = null;
  }
  filterGlobal(value, matchMode) {
    this.filter(value, "global", matchMode);
  }
  isFilterBlank(filter2) {
    if (filter2 !== null && filter2 !== void 0) {
      if (typeof filter2 === "string" && filter2.trim().length == 0 || Array.isArray(filter2) && filter2.length == 0) return true;
      else return false;
    }
    return true;
  }
  _filter() {
    if (!this.restoringFilter) {
      this.first = 0;
      this.firstChange.emit(this.first);
    }
    if (this.lazy) {
      this.onLazyLoad.emit(this.createLazyLoadMetadata());
    } else {
      if (!this.value) {
        return;
      }
      if (!this.hasFilter()) {
        this.filteredValue = null;
        if (this.paginator) {
          this.totalRecords = this.value ? this.value.length : 0;
        }
      } else {
        let globalFilterFieldsArray;
        if (this.filters["global"]) {
          if (!this.columns && !this.globalFilterFields) throw new Error("Global filtering requires dynamic columns or globalFilterFields to be defined.");
          else globalFilterFieldsArray = this.globalFilterFields || this.columns;
        }
        this.filteredValue = [];
        for (let i = 0; i < this.value.length; i++) {
          let localMatch = true;
          let globalMatch = false;
          let localFiltered = false;
          for (let prop in this.filters) {
            if (this.filters.hasOwnProperty(prop) && prop !== "global") {
              localFiltered = true;
              let filterField = prop;
              let filterMeta = this.filters[filterField];
              if (Array.isArray(filterMeta)) {
                for (let meta of filterMeta) {
                  localMatch = this.executeLocalFilter(filterField, this.value[i], meta);
                  if (meta.operator === FilterOperator.OR && localMatch || meta.operator === FilterOperator.AND && !localMatch) {
                    break;
                  }
                }
              } else {
                localMatch = this.executeLocalFilter(filterField, this.value[i], filterMeta);
              }
              if (!localMatch) {
                break;
              }
            }
          }
          if (this.filters["global"] && !globalMatch && globalFilterFieldsArray) {
            for (let j = 0; j < globalFilterFieldsArray.length; j++) {
              let globalFilterField = globalFilterFieldsArray[j].field || globalFilterFieldsArray[j];
              globalMatch = this.filterService.filters[this.filters["global"].matchMode](ObjectUtils.resolveFieldData(this.value[i], globalFilterField), this.filters["global"].value, this.filterLocale);
              if (globalMatch) {
                break;
              }
            }
          }
          let matches;
          if (this.filters["global"]) {
            matches = localFiltered ? localFiltered && localMatch && globalMatch : globalMatch;
          } else {
            matches = localFiltered && localMatch;
          }
          if (matches) {
            this.filteredValue.push(this.value[i]);
          }
        }
        if (this.filteredValue.length === this.value.length) {
          this.filteredValue = null;
        }
        if (this.paginator) {
          this.totalRecords = this.filteredValue ? this.filteredValue.length : this.value ? this.value.length : 0;
        }
      }
    }
    this.onFilter.emit({
      filters: this.filters,
      filteredValue: this.filteredValue || this.value
    });
    this.tableService.onValueChange(this.value);
    if (this.isStateful() && !this.restoringFilter) {
      this.saveState();
    }
    if (this.restoringFilter) {
      this.restoringFilter = false;
    }
    this.cd.markForCheck();
    if (this.scrollable) {
      this.resetScrollTop();
    }
  }
  executeLocalFilter(field, rowData, filterMeta) {
    let filterValue = filterMeta.value;
    let filterMatchMode = filterMeta.matchMode || FilterMatchMode.STARTS_WITH;
    let dataFieldValue = ObjectUtils.resolveFieldData(rowData, field);
    let filterConstraint = this.filterService.filters[filterMatchMode];
    return filterConstraint(dataFieldValue, filterValue, this.filterLocale);
  }
  hasFilter() {
    let empty = true;
    for (let prop in this.filters) {
      if (this.filters.hasOwnProperty(prop)) {
        empty = false;
        break;
      }
    }
    return !empty;
  }
  createLazyLoadMetadata() {
    return {
      first: this.first,
      rows: this.rows,
      sortField: this.sortField,
      sortOrder: this.sortOrder,
      filters: this.filters,
      globalFilter: this.filters && this.filters["global"] ? this.filters["global"].value : null,
      multiSortMeta: this.multiSortMeta,
      forceUpdate: () => this.cd.detectChanges()
    };
  }
  clear() {
    this._sortField = null;
    this._sortOrder = this.defaultSortOrder;
    this._multiSortMeta = null;
    this.tableService.onSort(null);
    if (this.filters["global"]) {
      this.filters["global"].value = null;
    }
    this.filteredValue = null;
    this.tableService.onResetChange();
    this.first = 0;
    this.firstChange.emit(this.first);
    if (this.lazy) {
      this.onLazyLoad.emit(this.createLazyLoadMetadata());
    } else {
      this.totalRecords = this._value ? this._value.length : 0;
    }
  }
  reset() {
    this.clear();
  }
  getExportHeader(column) {
    return column[this.exportHeader] || column.header || column.field;
  }
  exportCSV(options) {
    let data;
    let csv = "";
    let columns = this.columns;
    if (options && options.selectionOnly) {
      data = this.selection || [];
    } else if (options && options.allValues) {
      data = this.value || [];
    } else {
      data = this.filteredValue || this.value;
      if (this.frozenValue) {
        data = data ? [...this.frozenValue, ...data] : this.frozenValue;
      }
    }
    for (let i = 0; i < columns.length; i++) {
      let column = columns[i];
      if (column.exportable !== false && column.field) {
        csv += '"' + this.getExportHeader(column) + '"';
        if (i < columns.length - 1) {
          csv += this.csvSeparator;
        }
      }
    }
    data.forEach((record, i) => {
      csv += "\n";
      for (let i2 = 0; i2 < columns.length; i2++) {
        let column = columns[i2];
        if (column.exportable !== false && column.field) {
          let cellData = ObjectUtils.resolveFieldData(record, column.field);
          if (cellData != null) {
            if (this.exportFunction) {
              cellData = this.exportFunction({
                data: cellData,
                field: column.field
              });
            } else cellData = String(cellData).replace(/"/g, '""');
          } else cellData = "";
          csv += '"' + cellData + '"';
          if (i2 < columns.length - 1) {
            csv += this.csvSeparator;
          }
        }
      }
    });
    let blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;"
    });
    let link = this.renderer.createElement("a");
    link.style.display = "none";
    this.renderer.appendChild(this.document.body, link);
    if (link.download !== void 0) {
      link.setAttribute("href", URL.createObjectURL(blob));
      link.setAttribute("download", this.exportFilename + ".csv");
      link.click();
    } else {
      csv = "data:text/csv;charset=utf-8," + csv;
      this.window.open(encodeURI(csv));
    }
    this.renderer.removeChild(this.document.body, link);
  }
  onLazyItemLoad(event) {
    this.onLazyLoad.emit(__spreadProps(__spreadValues(__spreadValues({}, this.createLazyLoadMetadata()), event), {
      rows: event.last - event.first
    }));
  }
  resetScrollTop() {
    if (this.virtualScroll) this.scrollToVirtualIndex(0);
    else this.scrollTo({
      top: 0
    });
  }
  scrollToVirtualIndex(index) {
    this.virtualScroll && this.scroller.scrollToIndex(index);
  }
  scrollTo(options) {
    if (this.virtualScroll) {
      this.scroller.scrollTo(options);
    } else if (this.wrapperViewChild && this.wrapperViewChild.nativeElement) {
      if (this.wrapperViewChild.nativeElement.scrollTo) {
        this.wrapperViewChild.nativeElement.scrollTo(options);
      } else {
        this.wrapperViewChild.nativeElement.scrollLeft = options.left;
        this.wrapperViewChild.nativeElement.scrollTop = options.top;
      }
    }
  }
  updateEditingCell(cell, data, field, index) {
    this.editingCell = cell;
    this.editingCellData = data;
    this.editingCellField = field;
    this.editingCellRowIndex = index;
    this.bindDocumentEditListener();
  }
  isEditingCellValid() {
    return this.editingCell && DomHandler.find(this.editingCell, ".ng-invalid.ng-dirty").length === 0;
  }
  bindDocumentEditListener() {
    if (!this.documentEditListener) {
      this.documentEditListener = this.renderer.listen(this.document, "click", (event) => {
        if (this.editingCell && !this.selfClick && this.isEditingCellValid()) {
          DomHandler.removeClass(this.editingCell, "p-cell-editing");
          this.editingCell = null;
          this.onEditComplete.emit({
            field: this.editingCellField,
            data: this.editingCellData,
            originalEvent: event,
            index: this.editingCellRowIndex
          });
          this.editingCellField = null;
          this.editingCellData = null;
          this.editingCellRowIndex = null;
          this.unbindDocumentEditListener();
          this.cd.markForCheck();
          if (this.overlaySubscription) {
            this.overlaySubscription.unsubscribe();
          }
        }
        this.selfClick = false;
      });
    }
  }
  unbindDocumentEditListener() {
    if (this.documentEditListener) {
      this.documentEditListener();
      this.documentEditListener = null;
    }
  }
  initRowEdit(rowData) {
    let dataKeyValue = String(ObjectUtils.resolveFieldData(rowData, this.dataKey));
    this.editingRowKeys[dataKeyValue] = true;
  }
  saveRowEdit(rowData, rowElement) {
    if (DomHandler.find(rowElement, ".ng-invalid.ng-dirty").length === 0) {
      let dataKeyValue = String(ObjectUtils.resolveFieldData(rowData, this.dataKey));
      delete this.editingRowKeys[dataKeyValue];
    }
  }
  cancelRowEdit(rowData) {
    let dataKeyValue = String(ObjectUtils.resolveFieldData(rowData, this.dataKey));
    delete this.editingRowKeys[dataKeyValue];
  }
  toggleRow(rowData, event) {
    if (!this.dataKey) {
      throw new Error("dataKey must be defined to use row expansion");
    }
    let dataKeyValue = String(ObjectUtils.resolveFieldData(rowData, this.dataKey));
    if (this.expandedRowKeys[dataKeyValue] != null) {
      delete this.expandedRowKeys[dataKeyValue];
      this.onRowCollapse.emit({
        originalEvent: event,
        data: rowData
      });
    } else {
      if (this.rowExpandMode === "single") {
        this.expandedRowKeys = {};
      }
      this.expandedRowKeys[dataKeyValue] = true;
      this.onRowExpand.emit({
        originalEvent: event,
        data: rowData
      });
    }
    if (event) {
      event.preventDefault();
    }
    if (this.isStateful()) {
      this.saveState();
    }
  }
  isRowExpanded(rowData) {
    return this.expandedRowKeys[String(ObjectUtils.resolveFieldData(rowData, this.dataKey))] === true;
  }
  isRowEditing(rowData) {
    return this.editingRowKeys[String(ObjectUtils.resolveFieldData(rowData, this.dataKey))] === true;
  }
  isSingleSelectionMode() {
    return this.selectionMode === "single";
  }
  isMultipleSelectionMode() {
    return this.selectionMode === "multiple";
  }
  onColumnResizeBegin(event) {
    let containerLeft = DomHandler.getOffset(this.containerViewChild.nativeElement).left;
    this.resizeColumnElement = event.target.parentElement;
    this.columnResizing = true;
    this.lastResizerHelperX = event.pageX - containerLeft + this.containerViewChild.nativeElement.scrollLeft;
    this.onColumnResize(event);
    event.preventDefault();
  }
  onColumnResize(event) {
    let containerLeft = DomHandler.getOffset(this.containerViewChild.nativeElement).left;
    DomHandler.addClass(this.containerViewChild.nativeElement, "p-unselectable-text");
    this.resizeHelperViewChild.nativeElement.style.height = this.containerViewChild.nativeElement.offsetHeight + "px";
    this.resizeHelperViewChild.nativeElement.style.top = "0px";
    this.resizeHelperViewChild.nativeElement.style.left = event.pageX - containerLeft + this.containerViewChild.nativeElement.scrollLeft + "px";
    this.resizeHelperViewChild.nativeElement.style.display = "block";
  }
  onColumnResizeEnd() {
    let delta = this.resizeHelperViewChild.nativeElement.offsetLeft - this.lastResizerHelperX;
    let columnWidth = this.resizeColumnElement.offsetWidth;
    let newColumnWidth = columnWidth + delta;
    let minWidth = this.resizeColumnElement.style.minWidth.replace(/[^\d.]/g, "") || 15;
    if (newColumnWidth >= minWidth) {
      if (this.columnResizeMode === "fit") {
        let nextColumn = this.resizeColumnElement.nextElementSibling;
        let nextColumnWidth = nextColumn.offsetWidth - delta;
        if (newColumnWidth > 15 && nextColumnWidth > 15) {
          this.resizeTableCells(newColumnWidth, nextColumnWidth);
        }
      } else if (this.columnResizeMode === "expand") {
        let tableWidth = this.tableViewChild.nativeElement.offsetWidth + delta;
        this.setResizeTableWidth(tableWidth + "px");
        this.resizeTableCells(newColumnWidth, null);
      }
      this.onColResize.emit({
        element: this.resizeColumnElement,
        delta
      });
      if (this.isStateful()) {
        this.saveState();
      }
    }
    this.resizeHelperViewChild.nativeElement.style.display = "none";
    DomHandler.removeClass(this.containerViewChild.nativeElement, "p-unselectable-text");
  }
  resizeTableCells(newColumnWidth, nextColumnWidth) {
    let colIndex = DomHandler.index(this.resizeColumnElement);
    let widths = [];
    const tableHead = DomHandler.findSingle(this.containerViewChild.nativeElement, ".p-datatable-thead");
    let headers = DomHandler.find(tableHead, "tr > th");
    headers.forEach((header) => widths.push(DomHandler.getOuterWidth(header)));
    this.destroyStyleElement();
    this.createStyleElement();
    let innerHTML = "";
    widths.forEach((width, index) => {
      let colWidth = index === colIndex ? newColumnWidth : nextColumnWidth && index === colIndex + 1 ? nextColumnWidth : width;
      let style2 = `width: ${colWidth}px !important; max-width: ${colWidth}px !important;`;
      innerHTML += `
                #${this.id}-table > .p-datatable-thead > tr > th:nth-child(${index + 1}),
                #${this.id}-table > .p-datatable-tbody > tr > td:nth-child(${index + 1}),
                #${this.id}-table > .p-datatable-tfoot > tr > td:nth-child(${index + 1}) {
                    ${style2}
                }
            `;
    });
    this.renderer.setProperty(this.styleElement, "innerHTML", innerHTML);
  }
  onColumnDragStart(event, columnElement) {
    this.reorderIconWidth = DomHandler.getHiddenElementOuterWidth(this.reorderIndicatorUpViewChild.nativeElement);
    this.reorderIconHeight = DomHandler.getHiddenElementOuterHeight(this.reorderIndicatorDownViewChild.nativeElement);
    this.draggedColumn = columnElement;
    event.dataTransfer.setData("text", "b");
  }
  onColumnDragEnter(event, dropHeader) {
    if (this.reorderableColumns && this.draggedColumn && dropHeader) {
      event.preventDefault();
      let containerOffset = DomHandler.getOffset(this.containerViewChild.nativeElement);
      let dropHeaderOffset = DomHandler.getOffset(dropHeader);
      if (this.draggedColumn != dropHeader) {
        let dragIndex = DomHandler.indexWithinGroup(this.draggedColumn, "preorderablecolumn");
        let dropIndex = DomHandler.indexWithinGroup(dropHeader, "preorderablecolumn");
        let targetLeft = dropHeaderOffset.left - containerOffset.left;
        let targetTop = containerOffset.top - dropHeaderOffset.top;
        let columnCenter = dropHeaderOffset.left + dropHeader.offsetWidth / 2;
        this.reorderIndicatorUpViewChild.nativeElement.style.top = dropHeaderOffset.top - containerOffset.top - (this.reorderIconHeight - 1) + "px";
        this.reorderIndicatorDownViewChild.nativeElement.style.top = dropHeaderOffset.top - containerOffset.top + dropHeader.offsetHeight + "px";
        if (event.pageX > columnCenter) {
          this.reorderIndicatorUpViewChild.nativeElement.style.left = targetLeft + dropHeader.offsetWidth - Math.ceil(this.reorderIconWidth / 2) + "px";
          this.reorderIndicatorDownViewChild.nativeElement.style.left = targetLeft + dropHeader.offsetWidth - Math.ceil(this.reorderIconWidth / 2) + "px";
          this.dropPosition = 1;
        } else {
          this.reorderIndicatorUpViewChild.nativeElement.style.left = targetLeft - Math.ceil(this.reorderIconWidth / 2) + "px";
          this.reorderIndicatorDownViewChild.nativeElement.style.left = targetLeft - Math.ceil(this.reorderIconWidth / 2) + "px";
          this.dropPosition = -1;
        }
        this.reorderIndicatorUpViewChild.nativeElement.style.display = "block";
        this.reorderIndicatorDownViewChild.nativeElement.style.display = "block";
      } else {
        event.dataTransfer.dropEffect = "none";
      }
    }
  }
  onColumnDragLeave(event) {
    if (this.reorderableColumns && this.draggedColumn) {
      event.preventDefault();
    }
  }
  onColumnDrop(event, dropColumn) {
    event.preventDefault();
    if (this.draggedColumn) {
      let dragIndex = DomHandler.indexWithinGroup(this.draggedColumn, "preorderablecolumn");
      let dropIndex = DomHandler.indexWithinGroup(dropColumn, "preorderablecolumn");
      let allowDrop = dragIndex != dropIndex;
      if (allowDrop && (dropIndex - dragIndex == 1 && this.dropPosition === -1 || dragIndex - dropIndex == 1 && this.dropPosition === 1)) {
        allowDrop = false;
      }
      if (allowDrop && dropIndex < dragIndex && this.dropPosition === 1) {
        dropIndex = dropIndex + 1;
      }
      if (allowDrop && dropIndex > dragIndex && this.dropPosition === -1) {
        dropIndex = dropIndex - 1;
      }
      if (allowDrop) {
        ObjectUtils.reorderArray(this.columns, dragIndex, dropIndex);
        this.onColReorder.emit({
          dragIndex,
          dropIndex,
          columns: this.columns
        });
        if (this.isStateful()) {
          this.zone.runOutsideAngular(() => {
            setTimeout(() => {
              this.saveState();
            });
          });
        }
      }
      this.reorderIndicatorUpViewChild.nativeElement.style.display = "none";
      this.reorderIndicatorDownViewChild.nativeElement.style.display = "none";
      this.draggedColumn.draggable = false;
      this.draggedColumn = null;
      this.dropPosition = null;
    }
  }
  onRowDragStart(event, index) {
    this.rowDragging = true;
    this.draggedRowIndex = index;
    event.dataTransfer.setData("text", "b");
  }
  onRowDragOver(event, index, rowElement) {
    if (this.rowDragging && this.draggedRowIndex !== index) {
      let rowY = DomHandler.getOffset(rowElement).top + DomHandler.getWindowScrollTop();
      let pageY = event.pageY;
      let rowMidY = rowY + DomHandler.getOuterHeight(rowElement) / 2;
      let prevRowElement = rowElement.previousElementSibling;
      if (pageY < rowMidY) {
        DomHandler.removeClass(rowElement, "p-datatable-dragpoint-bottom");
        this.droppedRowIndex = index;
        if (prevRowElement) DomHandler.addClass(prevRowElement, "p-datatable-dragpoint-bottom");
        else DomHandler.addClass(rowElement, "p-datatable-dragpoint-top");
      } else {
        if (prevRowElement) DomHandler.removeClass(prevRowElement, "p-datatable-dragpoint-bottom");
        else DomHandler.addClass(rowElement, "p-datatable-dragpoint-top");
        this.droppedRowIndex = index + 1;
        DomHandler.addClass(rowElement, "p-datatable-dragpoint-bottom");
      }
    }
  }
  onRowDragLeave(event, rowElement) {
    let prevRowElement = rowElement.previousElementSibling;
    if (prevRowElement) {
      DomHandler.removeClass(prevRowElement, "p-datatable-dragpoint-bottom");
    }
    DomHandler.removeClass(rowElement, "p-datatable-dragpoint-bottom");
    DomHandler.removeClass(rowElement, "p-datatable-dragpoint-top");
  }
  onRowDragEnd(event) {
    this.rowDragging = false;
    this.draggedRowIndex = null;
    this.droppedRowIndex = null;
  }
  onRowDrop(event, rowElement) {
    if (this.droppedRowIndex != null) {
      let dropIndex = this.draggedRowIndex > this.droppedRowIndex ? this.droppedRowIndex : this.droppedRowIndex === 0 ? 0 : this.droppedRowIndex - 1;
      ObjectUtils.reorderArray(this.value, this.draggedRowIndex, dropIndex);
      if (this.virtualScroll) {
        this._value = [...this._value];
      }
      this.onRowReorder.emit({
        dragIndex: this.draggedRowIndex,
        dropIndex
      });
    }
    this.onRowDragLeave(event, rowElement);
    this.onRowDragEnd(event);
  }
  isEmpty() {
    let data = this.filteredValue || this.value;
    return data == null || data.length == 0;
  }
  getBlockableElement() {
    return this.el.nativeElement.children[0];
  }
  getStorage() {
    if (isPlatformBrowser(this.platformId)) {
      switch (this.stateStorage) {
        case "local":
          return window.localStorage;
        case "session":
          return window.sessionStorage;
        default:
          throw new Error(this.stateStorage + ' is not a valid value for the state storage, supported values are "local" and "session".');
      }
    } else {
      throw new Error("Browser storage is not available in the server side.");
    }
  }
  isStateful() {
    return this.stateKey != null;
  }
  saveState() {
    const storage = this.getStorage();
    let state = {};
    if (this.paginator) {
      state.first = this.first;
      state.rows = this.rows;
    }
    if (this.sortField) {
      state.sortField = this.sortField;
      state.sortOrder = this.sortOrder;
    }
    if (this.multiSortMeta) {
      state.multiSortMeta = this.multiSortMeta;
    }
    if (this.hasFilter()) {
      state.filters = this.filters;
    }
    if (this.resizableColumns) {
      this.saveColumnWidths(state);
    }
    if (this.reorderableColumns) {
      this.saveColumnOrder(state);
    }
    if (this.selection) {
      state.selection = this.selection;
    }
    if (Object.keys(this.expandedRowKeys).length) {
      state.expandedRowKeys = this.expandedRowKeys;
    }
    storage.setItem(this.stateKey, JSON.stringify(state));
    this.onStateSave.emit(state);
  }
  clearState() {
    const storage = this.getStorage();
    if (this.stateKey) {
      storage.removeItem(this.stateKey);
    }
  }
  restoreState() {
    const storage = this.getStorage();
    const stateString = storage.getItem(this.stateKey);
    const dateFormat = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/;
    const reviver = function(key, value) {
      if (typeof value === "string" && dateFormat.test(value)) {
        return new Date(value);
      }
      return value;
    };
    if (stateString) {
      let state = JSON.parse(stateString, reviver);
      if (this.paginator) {
        if (this.first !== void 0) {
          this.first = state.first;
          this.firstChange.emit(this.first);
        }
        if (this.rows !== void 0) {
          this.rows = state.rows;
          this.rowsChange.emit(this.rows);
        }
      }
      if (state.sortField) {
        this.restoringSort = true;
        this._sortField = state.sortField;
        this._sortOrder = state.sortOrder;
      }
      if (state.multiSortMeta) {
        this.restoringSort = true;
        this._multiSortMeta = state.multiSortMeta;
      }
      if (state.filters) {
        this.restoringFilter = true;
        this.filters = state.filters;
      }
      if (this.resizableColumns) {
        this.columnWidthsState = state.columnWidths;
        this.tableWidthState = state.tableWidth;
      }
      if (state.expandedRowKeys) {
        this.expandedRowKeys = state.expandedRowKeys;
      }
      if (state.selection) {
        Promise.resolve(null).then(() => this.selectionChange.emit(state.selection));
      }
      this.stateRestored = true;
      this.onStateRestore.emit(state);
    }
  }
  saveColumnWidths(state) {
    let widths = [];
    let headers = DomHandler.find(this.containerViewChild.nativeElement, ".p-datatable-thead > tr > th");
    headers.forEach((header) => widths.push(DomHandler.getOuterWidth(header)));
    state.columnWidths = widths.join(",");
    if (this.columnResizeMode === "expand") {
      state.tableWidth = DomHandler.getOuterWidth(this.tableViewChild.nativeElement);
    }
  }
  setResizeTableWidth(width) {
    this.tableViewChild.nativeElement.style.width = width;
    this.tableViewChild.nativeElement.style.minWidth = width;
  }
  restoreColumnWidths() {
    if (this.columnWidthsState) {
      let widths = this.columnWidthsState.split(",");
      if (this.columnResizeMode === "expand" && this.tableWidthState) {
        this.setResizeTableWidth(this.tableWidthState + "px");
      }
      if (ObjectUtils.isNotEmpty(widths)) {
        this.createStyleElement();
        let innerHTML = "";
        widths.forEach((width, index) => {
          let style2 = `width: ${width}px !important; max-width: ${width}px !important`;
          innerHTML += `
                        #${this.id}-table > .p-datatable-thead > tr > th:nth-child(${index + 1}),
                        #${this.id}-table > .p-datatable-tbody > tr > td:nth-child(${index + 1}),
                        #${this.id}-table > .p-datatable-tfoot > tr > td:nth-child(${index + 1}) {
                            ${style2}
                        }
                    `;
        });
        this.styleElement.innerHTML = innerHTML;
      }
    }
  }
  saveColumnOrder(state) {
    if (this.columns) {
      let columnOrder = [];
      this.columns.map((column) => {
        columnOrder.push(column.field || column.key);
      });
      state.columnOrder = columnOrder;
    }
  }
  restoreColumnOrder() {
    const storage = this.getStorage();
    const stateString = storage.getItem(this.stateKey);
    if (stateString) {
      let state = JSON.parse(stateString);
      let columnOrder = state.columnOrder;
      if (columnOrder) {
        let reorderedColumns = [];
        columnOrder.map((key) => {
          let col = this.findColumnByKey(key);
          if (col) {
            reorderedColumns.push(col);
          }
        });
        this.columnOrderStateRestored = true;
        this.columns = reorderedColumns;
      }
    }
  }
  findColumnByKey(key) {
    if (this.columns) {
      for (let col of this.columns) {
        if (col.key === key || col.field === key) return col;
        else continue;
      }
    } else {
      return null;
    }
  }
  createStyleElement() {
    this.styleElement = this.renderer.createElement("style");
    this.styleElement.type = "text/css";
    this.renderer.appendChild(this.document.head, this.styleElement);
  }
  getGroupRowsMeta() {
    return {
      field: this.groupRowsBy,
      order: this.groupRowsByOrder
    };
  }
  createResponsiveStyle() {
    if (isPlatformBrowser(this.platformId)) {
      if (!this.responsiveStyleElement) {
        this.responsiveStyleElement = this.renderer.createElement("style");
        this.responsiveStyleElement.type = "text/css";
        this.renderer.appendChild(this.document.head, this.responsiveStyleElement);
        let innerHTML = `
    @media screen and (max-width: ${this.breakpoint}) {
        #${this.id}-table > .p-datatable-thead > tr > th,
        #${this.id}-table > .p-datatable-tfoot > tr > td {
            display: none !important;
        }
    
        #${this.id}-table > .p-datatable-tbody > tr > td {
            display: flex;
            width: 100% !important;
            align-items: center;
            justify-content: space-between;
        }
    
        #${this.id}-table > .p-datatable-tbody > tr > td:not(:last-child) {
            border: 0 none;
        }
    
        #${this.id}.p-datatable-gridlines > .p-datatable-wrapper > .p-datatable-table > .p-datatable-tbody > tr > td:last-child {
            border-top: 0;
            border-right: 0;
            border-left: 0;
        }
    
        #${this.id}-table > .p-datatable-tbody > tr > td > .p-column-title {
            display: block;
        }
    }
    `;
        this.renderer.setProperty(this.responsiveStyleElement, "innerHTML", innerHTML);
      }
    }
  }
  destroyResponsiveStyle() {
    if (this.responsiveStyleElement) {
      this.renderer.removeChild(this.document.head, this.responsiveStyleElement);
      this.responsiveStyleElement = null;
    }
  }
  destroyStyleElement() {
    if (this.styleElement) {
      this.renderer.removeChild(this.document.head, this.styleElement);
      this.styleElement = null;
    }
  }
  ngOnDestroy() {
    this.unbindDocumentEditListener();
    this.editingCell = null;
    this.initialized = null;
    this.destroyStyleElement();
    this.destroyResponsiveStyle();
  }
};
Table.\u0275fac = function Table_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || Table)(\u0275\u0275directiveInject(DOCUMENT), \u0275\u0275directiveInject(PLATFORM_ID), \u0275\u0275directiveInject(Renderer2), \u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(NgZone), \u0275\u0275directiveInject(TableService), \u0275\u0275directiveInject(ChangeDetectorRef), \u0275\u0275directiveInject(FilterService), \u0275\u0275directiveInject(OverlayService));
};
Table.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
  type: Table,
  selectors: [["p-table"]],
  contentQueries: function Table_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      \u0275\u0275contentQuery(dirIndex, PrimeTemplate, 4);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.templates = _t);
    }
  },
  viewQuery: function Table_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c08, 5);
      \u0275\u0275viewQuery(_c111, 5);
      \u0275\u0275viewQuery(_c27, 5);
      \u0275\u0275viewQuery(_c35, 5);
      \u0275\u0275viewQuery(_c44, 5);
      \u0275\u0275viewQuery(_c54, 5);
      \u0275\u0275viewQuery(_c64, 5);
      \u0275\u0275viewQuery(_c74, 5);
      \u0275\u0275viewQuery(_c83, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.containerViewChild = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.resizeHelperViewChild = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.reorderIndicatorUpViewChild = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.reorderIndicatorDownViewChild = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.wrapperViewChild = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.tableViewChild = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.tableHeaderViewChild = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.tableFooterViewChild = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.scroller = _t.first);
    }
  },
  hostAttrs: [1, "p-element"],
  inputs: {
    frozenColumns: "frozenColumns",
    frozenValue: "frozenValue",
    style: "style",
    styleClass: "styleClass",
    tableStyle: "tableStyle",
    tableStyleClass: "tableStyleClass",
    paginator: "paginator",
    pageLinks: "pageLinks",
    rowsPerPageOptions: "rowsPerPageOptions",
    alwaysShowPaginator: "alwaysShowPaginator",
    paginatorPosition: "paginatorPosition",
    paginatorDropdownAppendTo: "paginatorDropdownAppendTo",
    paginatorDropdownScrollHeight: "paginatorDropdownScrollHeight",
    currentPageReportTemplate: "currentPageReportTemplate",
    showCurrentPageReport: "showCurrentPageReport",
    showJumpToPageDropdown: "showJumpToPageDropdown",
    showJumpToPageInput: "showJumpToPageInput",
    showFirstLastIcon: "showFirstLastIcon",
    showPageLinks: "showPageLinks",
    defaultSortOrder: "defaultSortOrder",
    sortMode: "sortMode",
    resetPageOnSort: "resetPageOnSort",
    selectionMode: "selectionMode",
    selectionPageOnly: "selectionPageOnly",
    contextMenuSelection: "contextMenuSelection",
    contextMenuSelectionMode: "contextMenuSelectionMode",
    dataKey: "dataKey",
    metaKeySelection: "metaKeySelection",
    rowSelectable: "rowSelectable",
    rowTrackBy: "rowTrackBy",
    lazy: "lazy",
    lazyLoadOnInit: "lazyLoadOnInit",
    compareSelectionBy: "compareSelectionBy",
    csvSeparator: "csvSeparator",
    exportFilename: "exportFilename",
    filters: "filters",
    globalFilterFields: "globalFilterFields",
    filterDelay: "filterDelay",
    filterLocale: "filterLocale",
    expandedRowKeys: "expandedRowKeys",
    editingRowKeys: "editingRowKeys",
    rowExpandMode: "rowExpandMode",
    scrollable: "scrollable",
    scrollDirection: "scrollDirection",
    rowGroupMode: "rowGroupMode",
    scrollHeight: "scrollHeight",
    virtualScroll: "virtualScroll",
    virtualScrollItemSize: "virtualScrollItemSize",
    virtualScrollOptions: "virtualScrollOptions",
    virtualScrollDelay: "virtualScrollDelay",
    frozenWidth: "frozenWidth",
    responsive: "responsive",
    contextMenu: "contextMenu",
    resizableColumns: "resizableColumns",
    columnResizeMode: "columnResizeMode",
    reorderableColumns: "reorderableColumns",
    loading: "loading",
    loadingIcon: "loadingIcon",
    showLoader: "showLoader",
    rowHover: "rowHover",
    customSort: "customSort",
    showInitialSortBadge: "showInitialSortBadge",
    autoLayout: "autoLayout",
    exportFunction: "exportFunction",
    exportHeader: "exportHeader",
    stateKey: "stateKey",
    stateStorage: "stateStorage",
    editMode: "editMode",
    groupRowsBy: "groupRowsBy",
    groupRowsByOrder: "groupRowsByOrder",
    responsiveLayout: "responsiveLayout",
    breakpoint: "breakpoint",
    virtualRowHeight: "virtualRowHeight",
    value: "value",
    columns: "columns",
    first: "first",
    rows: "rows",
    totalRecords: "totalRecords",
    sortField: "sortField",
    sortOrder: "sortOrder",
    multiSortMeta: "multiSortMeta",
    selection: "selection",
    selectAll: "selectAll"
  },
  outputs: {
    selectAllChange: "selectAllChange",
    selectionChange: "selectionChange",
    contextMenuSelectionChange: "contextMenuSelectionChange",
    onRowSelect: "onRowSelect",
    onRowUnselect: "onRowUnselect",
    onPage: "onPage",
    onSort: "onSort",
    onFilter: "onFilter",
    onLazyLoad: "onLazyLoad",
    onRowExpand: "onRowExpand",
    onRowCollapse: "onRowCollapse",
    onContextMenuSelect: "onContextMenuSelect",
    onColResize: "onColResize",
    onColReorder: "onColReorder",
    onRowReorder: "onRowReorder",
    onEditInit: "onEditInit",
    onEditComplete: "onEditComplete",
    onEditCancel: "onEditCancel",
    onHeaderCheckboxToggle: "onHeaderCheckboxToggle",
    sortFunction: "sortFunction",
    firstChange: "firstChange",
    rowsChange: "rowsChange",
    onStateSave: "onStateSave",
    onStateRestore: "onStateRestore"
  },
  standalone: false,
  features: [\u0275\u0275ProvidersFeature([TableService]), \u0275\u0275NgOnChangesFeature],
  decls: 16,
  vars: 22,
  consts: [["container", ""], ["wrapper", ""], ["buildInTable", ""], ["scroller", ""], ["table", ""], ["thead", ""], ["tfoot", ""], ["resizeHelper", ""], ["reorderIndicatorUp", ""], ["reorderIndicatorDown", ""], [3, "ngStyle", "ngClass"], ["class", "p-datatable-loading-overlay p-component-overlay", 4, "ngIf"], ["class", "p-datatable-header", 4, "ngIf"], ["styleClass", "p-paginator-top", 3, "rows", "first", "totalRecords", "pageLinkSize", "alwaysShow", "rowsPerPageOptions", "templateLeft", "templateRight", "dropdownAppendTo", "dropdownScrollHeight", "currentPageReportTemplate", "showFirstLastIcon", "dropdownItemTemplate", "showCurrentPageReport", "showJumpToPageDropdown", "showJumpToPageInput", "showPageLinks", "onPageChange", 4, "ngIf"], [1, "p-datatable-wrapper", 3, "ngStyle"], [3, "items", "columns", "style", "scrollHeight", "itemSize", "step", "delay", "inline", "lazy", "loaderDisabled", "showSpacer", "showLoader", "options", "autoSize", "onLazyLoad", 4, "ngIf"], [4, "ngIf"], ["styleClass", "p-paginator-bottom", 3, "rows", "first", "totalRecords", "pageLinkSize", "alwaysShow", "rowsPerPageOptions", "templateLeft", "templateRight", "dropdownAppendTo", "dropdownScrollHeight", "currentPageReportTemplate", "showFirstLastIcon", "dropdownItemTemplate", "showCurrentPageReport", "showJumpToPageDropdown", "showJumpToPageInput", "showPageLinks", "onPageChange", 4, "ngIf"], ["class", "p-datatable-footer", 4, "ngIf"], ["class", "p-column-resizer-helper", "style", "display:none", 4, "ngIf"], ["class", "p-datatable-reorder-indicator-up", "style", "display: none;", 4, "ngIf"], ["class", "p-datatable-reorder-indicator-down", "style", "display: none;", 4, "ngIf"], [1, "p-datatable-loading-overlay", "p-component-overlay"], [3, "class", 4, "ngIf"], [3, "spin", "styleClass", 4, "ngIf"], ["class", "p-datatable-loading-icon", 4, "ngIf"], [3, "spin", "styleClass"], [1, "p-datatable-loading-icon"], [4, "ngTemplateOutlet"], [1, "p-datatable-header"], ["styleClass", "p-paginator-top", 3, "onPageChange", "rows", "first", "totalRecords", "pageLinkSize", "alwaysShow", "rowsPerPageOptions", "templateLeft", "templateRight", "dropdownAppendTo", "dropdownScrollHeight", "currentPageReportTemplate", "showFirstLastIcon", "dropdownItemTemplate", "showCurrentPageReport", "showJumpToPageDropdown", "showJumpToPageInput", "showPageLinks"], ["pTemplate", "firstpagelinkicon"], ["pTemplate", "previouspagelinkicon"], ["pTemplate", "lastpagelinkicon"], ["pTemplate", "nextpagelinkicon"], [3, "onLazyLoad", "items", "columns", "scrollHeight", "itemSize", "step", "delay", "inline", "lazy", "loaderDisabled", "showSpacer", "showLoader", "options", "autoSize"], ["pTemplate", "content"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], ["role", "table", 3, "ngClass"], [1, "p-datatable-thead"], ["class", "p-datatable-tbody p-datatable-frozen-tbody", 3, "value", "frozenRows", "pTableBody", "pTableBodyTemplate", "frozen", 4, "ngIf"], [1, "p-datatable-tbody", 3, "ngClass", "value", "pTableBody", "pTableBodyTemplate", "scrollerOptions"], ["class", "p-datatable-scroller-spacer", 3, "style", 4, "ngIf"], ["class", "p-datatable-tfoot", 4, "ngIf"], [1, "p-datatable-tbody", "p-datatable-frozen-tbody", 3, "value", "frozenRows", "pTableBody", "pTableBodyTemplate", "frozen"], [1, "p-datatable-scroller-spacer"], [1, "p-datatable-tfoot"], ["styleClass", "p-paginator-bottom", 3, "onPageChange", "rows", "first", "totalRecords", "pageLinkSize", "alwaysShow", "rowsPerPageOptions", "templateLeft", "templateRight", "dropdownAppendTo", "dropdownScrollHeight", "currentPageReportTemplate", "showFirstLastIcon", "dropdownItemTemplate", "showCurrentPageReport", "showJumpToPageDropdown", "showJumpToPageInput", "showPageLinks"], [1, "p-datatable-footer"], [1, "p-column-resizer-helper", 2, "display", "none"], [1, "p-datatable-reorder-indicator-up", 2, "display", "none"], [1, "p-datatable-reorder-indicator-down", 2, "display", "none"]],
  template: function Table_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 10, 0);
      \u0275\u0275template(2, Table_div_2_Template, 3, 2, "div", 11)(3, Table_div_3_Template, 2, 1, "div", 12)(4, Table_p_paginator_4_Template, 5, 21, "p-paginator", 13);
      \u0275\u0275elementStart(5, "div", 14, 1);
      \u0275\u0275template(7, Table_p_scroller_7_Template, 3, 17, "p-scroller", 15)(8, Table_ng_container_8_Template, 2, 7, "ng-container", 16)(9, Table_ng_template_9_Template, 10, 28, "ng-template", null, 2, \u0275\u0275templateRefExtractor);
      \u0275\u0275elementEnd();
      \u0275\u0275template(11, Table_p_paginator_11_Template, 5, 21, "p-paginator", 17)(12, Table_div_12_Template, 2, 1, "div", 18)(13, Table_div_13_Template, 2, 0, "div", 19)(14, Table_span_14_Template, 4, 2, "span", 20)(15, Table_span_15_Template, 4, 2, "span", 21);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275classMap(ctx.styleClass);
      \u0275\u0275property("ngStyle", ctx.style)("ngClass", \u0275\u0275pureFunction3(16, _c93, ctx.rowHover || ctx.selectionMode, ctx.scrollable, ctx.scrollable && ctx.scrollHeight === "flex"));
      \u0275\u0275attribute("id", ctx.id);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.loading && ctx.showLoader);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.captionTemplate);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.paginator && (ctx.paginatorPosition === "top" || ctx.paginatorPosition == "both"));
      \u0275\u0275advance();
      \u0275\u0275property("ngStyle", \u0275\u0275pureFunction1(20, _c103, ctx.virtualScroll ? "" : ctx.scrollHeight));
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.virtualScroll);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.virtualScroll);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngIf", ctx.paginator && (ctx.paginatorPosition === "bottom" || ctx.paginatorPosition == "both"));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.summaryTemplate);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.resizableColumns);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.reorderableColumns);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.reorderableColumns);
    }
  },
  dependencies: () => [NgClass, NgIf, NgTemplateOutlet, NgStyle, Paginator, PrimeTemplate, Scroller, ArrowDownIcon, ArrowUpIcon, SpinnerIcon, TableBody],
  styles: [".p-datatable{position:relative}.p-datatable>.p-datatable-wrapper{overflow:auto}.p-datatable-table{border-spacing:0px;width:100%}.p-datatable .p-sortable-column{cursor:pointer;-webkit-user-select:none;user-select:none}.p-datatable .p-sortable-column .p-column-title,.p-datatable .p-sortable-column .p-sortable-column-icon,.p-datatable .p-sortable-column .p-sortable-column-badge{vertical-align:middle}.p-datatable .p-sortable-column .p-sortable-column-badge{display:inline-flex;align-items:center;justify-content:center}.p-datatable-hoverable-rows .p-selectable-row{cursor:pointer}.p-datatable-scrollable>.p-datatable-wrapper{position:relative}.p-datatable-scrollable-table>.p-datatable-thead{position:sticky;top:0;z-index:1}.p-datatable-scrollable-table>.p-datatable-frozen-tbody{position:sticky;z-index:1}.p-datatable-scrollable-table>.p-datatable-tfoot{position:sticky;bottom:0;z-index:1}.p-datatable-scrollable .p-frozen-column{position:sticky;background:inherit}.p-datatable-scrollable th.p-frozen-column{z-index:1}.p-datatable-flex-scrollable{display:flex;flex-direction:column;height:100%}.p-datatable-flex-scrollable>.p-datatable-wrapper{display:flex;flex-direction:column;flex:1;height:100%}.p-datatable-scrollable-table>.p-datatable-tbody>.p-rowgroup-header{position:sticky;z-index:1}.p-datatable-resizable-table>.p-datatable-thead>tr>th,.p-datatable-resizable-table>.p-datatable-tfoot>tr>td,.p-datatable-resizable-table>.p-datatable-tbody>tr>td{overflow:hidden;white-space:nowrap}.p-datatable-resizable-table>.p-datatable-thead>tr>th.p-resizable-column:not(.p-frozen-column){background-clip:padding-box;position:relative}.p-datatable-resizable-table-fit>.p-datatable-thead>tr>th.p-resizable-column:last-child .p-column-resizer{display:none}.p-datatable .p-column-resizer{display:block;position:absolute!important;top:0;right:0;margin:0;width:.5rem;height:100%;padding:0;cursor:col-resize;border:1px solid transparent}.p-datatable .p-column-resizer-helper{width:1px;position:absolute;z-index:10;display:none}.p-datatable .p-row-editor-init,.p-datatable .p-row-editor-save,.p-datatable .p-row-editor-cancel,.p-datatable .p-row-toggler{display:inline-flex;align-items:center;justify-content:center;overflow:hidden;position:relative}.p-datatable-reorder-indicator-up,.p-datatable-reorder-indicator-down{position:absolute}.p-datatable-reorderablerow-handle,[pReorderableColumn]{cursor:move}.p-datatable .p-datatable-loading-overlay{position:absolute;display:flex;align-items:center;justify-content:center;z-index:2}.p-column-filter-row{display:flex;align-items:center;width:100%}.p-column-filter-menu{display:inline-flex}.p-column-filter-row p-columnfilterformelement{flex:1 1 auto;width:1%}.p-column-filter-menu-button,.p-column-filter-clear-button{display:inline-flex;justify-content:center;align-items:center;cursor:pointer;text-decoration:none;overflow:hidden;position:relative}.p-column-filter-overlay{position:absolute;top:0;left:0}.p-column-filter-row-items{margin:0;padding:0;list-style:none}.p-column-filter-row-item{cursor:pointer}.p-column-filter-add-button,.p-column-filter-remove-button{justify-content:center}.p-column-filter-add-button .p-button-label,.p-column-filter-remove-button .p-button-label{flex-grow:0}.p-column-filter-buttonbar{display:flex;align-items:center;justify-content:space-between}.p-column-filter-buttonbar .p-button{width:auto}.p-datatable-tbody>tr>td>.p-column-title{display:none}.p-datatable-scroller-spacer{display:flex}.p-datatable .p-scroller .p-scroller-loading{transform:none!important;min-height:0;position:sticky;top:0;left:0}\n"],
  encapsulation: 2
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Table, [{
    type: Component,
    args: [{
      selector: "p-table",
      template: `
        <div
            #container
            [ngStyle]="style"
            [class]="styleClass"
            [ngClass]="{ 'p-datatable p-component': true, 'p-datatable-hoverable-rows': rowHover || selectionMode, 'p-datatable-scrollable': scrollable, 'p-datatable-flex-scrollable': scrollable && scrollHeight === 'flex' }"
            [attr.id]="id"
        >
            <div class="p-datatable-loading-overlay p-component-overlay" *ngIf="loading && showLoader">
                <i *ngIf="loadingIcon" [class]="'p-datatable-loading-icon ' + loadingIcon"></i>
                <ng-container *ngIf="!loadingIcon">
                    <SpinnerIcon *ngIf="!loadingIconTemplate" [spin]="true" [styleClass]="'p-datatable-loading-icon'"/>
                    <span *ngIf="loadingIconTemplate" class="p-datatable-loading-icon">
                        <ng-template *ngTemplateOutlet="loadingIconTemplate"></ng-template>
                    </span>
                </ng-container>
            </div>
            <div *ngIf="captionTemplate" class="p-datatable-header">
                <ng-container *ngTemplateOutlet="captionTemplate"></ng-container>
            </div>
            <p-paginator
                [rows]="rows"
                [first]="first"
                [totalRecords]="totalRecords"
                [pageLinkSize]="pageLinks"
                styleClass="p-paginator-top"
                [alwaysShow]="alwaysShowPaginator"
                (onPageChange)="onPageChange($event)"
                [rowsPerPageOptions]="rowsPerPageOptions"
                *ngIf="paginator && (paginatorPosition === 'top' || paginatorPosition == 'both')"
                [templateLeft]="paginatorLeftTemplate"
                [templateRight]="paginatorRightTemplate"
                [dropdownAppendTo]="paginatorDropdownAppendTo"
                [dropdownScrollHeight]="paginatorDropdownScrollHeight"
                [currentPageReportTemplate]="currentPageReportTemplate"
                [showFirstLastIcon]="showFirstLastIcon"
                [dropdownItemTemplate]="paginatorDropdownItemTemplate"
                [showCurrentPageReport]="showCurrentPageReport"
                [showJumpToPageDropdown]="showJumpToPageDropdown"
                [showJumpToPageInput]="showJumpToPageInput"
                [showPageLinks]="showPageLinks"
            >
                <ng-template pTemplate="firstpagelinkicon" *ngIf="paginatorFirstPageLinkIconTemplate">
                    <ng-container *ngTemplateOutlet="paginatorFirstPageLinkIconTemplate"></ng-container>
                </ng-template>

                <ng-template pTemplate="previouspagelinkicon" *ngIf="paginatorPreviousPageLinkIconTemplate">
                    <ng-container *ngTemplateOutlet="paginatorPreviousPageLinkIconTemplate"></ng-container>
                </ng-template>

                <ng-template pTemplate="lastpagelinkicon" *ngIf="paginatorLastPageLinkIconTemplate">
                    <ng-container *ngTemplateOutlet="paginatorLastPageLinkIconTemplate"></ng-container>
                </ng-template>

                <ng-template pTemplate="nextpagelinkicon" *ngIf="paginatorNextPageLinkIconTemplate">
                    <ng-container *ngTemplateOutlet="paginatorNextPageLinkIconTemplate"></ng-container>
                </ng-template>
            </p-paginator>

            <div #wrapper class="p-datatable-wrapper" [ngStyle]="{ maxHeight: virtualScroll ? '' : scrollHeight }">
                <p-scroller
                    #scroller
                    *ngIf="virtualScroll"
                    [items]="processedData"
                    [columns]="columns"
                    [style]="{ height: scrollHeight !== 'flex' ? scrollHeight : undefined }"
                    [scrollHeight]="scrollHeight !== 'flex' ? undefined : '100%'"
                    [itemSize]="virtualScrollItemSize || _virtualRowHeight"
                    [step]="rows"
                    [delay]="lazy ? virtualScrollDelay : 0"
                    [inline]="true"
                    [lazy]="lazy"
                    (onLazyLoad)="onLazyItemLoad($event)"
                    [loaderDisabled]="true"
                    [showSpacer]="false"
                    [showLoader]="loadingBodyTemplate"
                    [options]="virtualScrollOptions"
                    [autoSize]="true"
                >
                    <ng-template pTemplate="content" let-items let-scrollerOptions="options">
                        <ng-container *ngTemplateOutlet="buildInTable; context: { $implicit: items, options: scrollerOptions }"></ng-container>
                    </ng-template>
                </p-scroller>
                <ng-container *ngIf="!virtualScroll">
                    <ng-container *ngTemplateOutlet="buildInTable; context: { $implicit: processedData, options: { columns } }"></ng-container>
                </ng-container>

                <ng-template #buildInTable let-items let-scrollerOptions="options">
                    <table
                        #table
                        role="table"
                        [ngClass]="{ 'p-datatable-table': true, 'p-datatable-scrollable-table': scrollable, 'p-datatable-resizable-table': resizableColumns, 'p-datatable-resizable-table-fit': resizableColumns && columnResizeMode === 'fit' }"
                        [class]="tableStyleClass"
                        [style]="tableStyle"
                        [attr.id]="id + '-table'"
                    >
                        <ng-container *ngTemplateOutlet="colGroupTemplate; context: { $implicit: scrollerOptions.columns }"></ng-container>
                        <thead #thead class="p-datatable-thead">
                            <ng-container *ngTemplateOutlet="headerGroupedTemplate || headerTemplate; context: { $implicit: scrollerOptions.columns }"></ng-container>
                        </thead>
                        <tbody
                            class="p-datatable-tbody p-datatable-frozen-tbody"
                            *ngIf="frozenValue || frozenBodyTemplate"
                            [value]="frozenValue"
                            [frozenRows]="true"
                            [pTableBody]="scrollerOptions.columns"
                            [pTableBodyTemplate]="frozenBodyTemplate"
                            [frozen]="true"
                        ></tbody>
                        <tbody
                            class="p-datatable-tbody"
                            [ngClass]="scrollerOptions.contentStyleClass"
                            [style]="scrollerOptions.contentStyle"
                            [value]="dataToRender(scrollerOptions.rows)"
                            [pTableBody]="scrollerOptions.columns"
                            [pTableBodyTemplate]="bodyTemplate"
                            [scrollerOptions]="scrollerOptions"
                        ></tbody>
                        <tbody *ngIf="scrollerOptions.spacerStyle" [style]="'height: calc(' + scrollerOptions.spacerStyle.height + ' - ' + scrollerOptions.rows.length * scrollerOptions.itemSize + 'px);'" class="p-datatable-scroller-spacer"></tbody>
                        <tfoot *ngIf="footerGroupedTemplate || footerTemplate" #tfoot class="p-datatable-tfoot">
                            <ng-container *ngTemplateOutlet="footerGroupedTemplate || footerTemplate; context: { $implicit: scrollerOptions.columns }"></ng-container>
                        </tfoot>
                    </table>
                </ng-template>
            </div>

            <p-paginator
                [rows]="rows"
                [first]="first"
                [totalRecords]="totalRecords"
                [pageLinkSize]="pageLinks"
                styleClass="p-paginator-bottom"
                [alwaysShow]="alwaysShowPaginator"
                (onPageChange)="onPageChange($event)"
                [rowsPerPageOptions]="rowsPerPageOptions"
                *ngIf="paginator && (paginatorPosition === 'bottom' || paginatorPosition == 'both')"
                [templateLeft]="paginatorLeftTemplate"
                [templateRight]="paginatorRightTemplate"
                [dropdownAppendTo]="paginatorDropdownAppendTo"
                [dropdownScrollHeight]="paginatorDropdownScrollHeight"
                [currentPageReportTemplate]="currentPageReportTemplate"
                [showFirstLastIcon]="showFirstLastIcon"
                [dropdownItemTemplate]="paginatorDropdownItemTemplate"
                [showCurrentPageReport]="showCurrentPageReport"
                [showJumpToPageDropdown]="showJumpToPageDropdown"
                [showJumpToPageInput]="showJumpToPageInput"
                [showPageLinks]="showPageLinks"
            >
                <ng-template pTemplate="firstpagelinkicon" *ngIf="paginatorFirstPageLinkIconTemplate">
                    <ng-container *ngTemplateOutlet="paginatorFirstPageLinkIconTemplate"></ng-container>
                </ng-template>

                <ng-template pTemplate="previouspagelinkicon" *ngIf="paginatorPreviousPageLinkIconTemplate">
                    <ng-container *ngTemplateOutlet="paginatorPreviousPageLinkIconTemplate"></ng-container>
                </ng-template>

                <ng-template pTemplate="lastpagelinkicon" *ngIf="paginatorLastPageLinkIconTemplate">
                    <ng-container *ngTemplateOutlet="paginatorLastPageLinkIconTemplate"></ng-container>
                </ng-template>

                <ng-template pTemplate="nextpagelinkicon" *ngIf="paginatorNextPageLinkIconTemplate">
                    <ng-container *ngTemplateOutlet="paginatorNextPageLinkIconTemplate"></ng-container>
                </ng-template>
            </p-paginator>

            <div *ngIf="summaryTemplate" class="p-datatable-footer">
                <ng-container *ngTemplateOutlet="summaryTemplate"></ng-container>
            </div>

            <div #resizeHelper class="p-column-resizer-helper" style="display:none" *ngIf="resizableColumns"></div>
            <span #reorderIndicatorUp class="p-datatable-reorder-indicator-up" style="display: none;" *ngIf="reorderableColumns">
                <ArrowDownIcon *ngIf="!reorderIndicatorUpIconTemplate"/>
                <ng-template *ngTemplateOutlet="reorderIndicatorUpIconTemplate"></ng-template>
            </span>
            <span #reorderIndicatorDown class="p-datatable-reorder-indicator-down" style="display: none;" *ngIf="reorderableColumns">
                <ArrowUpIcon *ngIf="!reorderIndicatorDownIconTemplate"/>
                <ng-template *ngTemplateOutlet="reorderIndicatorDownIconTemplate"></ng-template>
            </span>
        </div>
    `,
      providers: [TableService],
      changeDetection: ChangeDetectionStrategy.Default,
      encapsulation: ViewEncapsulation.None,
      host: {
        class: "p-element"
      },
      styles: [".p-datatable{position:relative}.p-datatable>.p-datatable-wrapper{overflow:auto}.p-datatable-table{border-spacing:0px;width:100%}.p-datatable .p-sortable-column{cursor:pointer;-webkit-user-select:none;user-select:none}.p-datatable .p-sortable-column .p-column-title,.p-datatable .p-sortable-column .p-sortable-column-icon,.p-datatable .p-sortable-column .p-sortable-column-badge{vertical-align:middle}.p-datatable .p-sortable-column .p-sortable-column-badge{display:inline-flex;align-items:center;justify-content:center}.p-datatable-hoverable-rows .p-selectable-row{cursor:pointer}.p-datatable-scrollable>.p-datatable-wrapper{position:relative}.p-datatable-scrollable-table>.p-datatable-thead{position:sticky;top:0;z-index:1}.p-datatable-scrollable-table>.p-datatable-frozen-tbody{position:sticky;z-index:1}.p-datatable-scrollable-table>.p-datatable-tfoot{position:sticky;bottom:0;z-index:1}.p-datatable-scrollable .p-frozen-column{position:sticky;background:inherit}.p-datatable-scrollable th.p-frozen-column{z-index:1}.p-datatable-flex-scrollable{display:flex;flex-direction:column;height:100%}.p-datatable-flex-scrollable>.p-datatable-wrapper{display:flex;flex-direction:column;flex:1;height:100%}.p-datatable-scrollable-table>.p-datatable-tbody>.p-rowgroup-header{position:sticky;z-index:1}.p-datatable-resizable-table>.p-datatable-thead>tr>th,.p-datatable-resizable-table>.p-datatable-tfoot>tr>td,.p-datatable-resizable-table>.p-datatable-tbody>tr>td{overflow:hidden;white-space:nowrap}.p-datatable-resizable-table>.p-datatable-thead>tr>th.p-resizable-column:not(.p-frozen-column){background-clip:padding-box;position:relative}.p-datatable-resizable-table-fit>.p-datatable-thead>tr>th.p-resizable-column:last-child .p-column-resizer{display:none}.p-datatable .p-column-resizer{display:block;position:absolute!important;top:0;right:0;margin:0;width:.5rem;height:100%;padding:0;cursor:col-resize;border:1px solid transparent}.p-datatable .p-column-resizer-helper{width:1px;position:absolute;z-index:10;display:none}.p-datatable .p-row-editor-init,.p-datatable .p-row-editor-save,.p-datatable .p-row-editor-cancel,.p-datatable .p-row-toggler{display:inline-flex;align-items:center;justify-content:center;overflow:hidden;position:relative}.p-datatable-reorder-indicator-up,.p-datatable-reorder-indicator-down{position:absolute}.p-datatable-reorderablerow-handle,[pReorderableColumn]{cursor:move}.p-datatable .p-datatable-loading-overlay{position:absolute;display:flex;align-items:center;justify-content:center;z-index:2}.p-column-filter-row{display:flex;align-items:center;width:100%}.p-column-filter-menu{display:inline-flex}.p-column-filter-row p-columnfilterformelement{flex:1 1 auto;width:1%}.p-column-filter-menu-button,.p-column-filter-clear-button{display:inline-flex;justify-content:center;align-items:center;cursor:pointer;text-decoration:none;overflow:hidden;position:relative}.p-column-filter-overlay{position:absolute;top:0;left:0}.p-column-filter-row-items{margin:0;padding:0;list-style:none}.p-column-filter-row-item{cursor:pointer}.p-column-filter-add-button,.p-column-filter-remove-button{justify-content:center}.p-column-filter-add-button .p-button-label,.p-column-filter-remove-button .p-button-label{flex-grow:0}.p-column-filter-buttonbar{display:flex;align-items:center;justify-content:space-between}.p-column-filter-buttonbar .p-button{width:auto}.p-datatable-tbody>tr>td>.p-column-title{display:none}.p-datatable-scroller-spacer{display:flex}.p-datatable .p-scroller .p-scroller-loading{transform:none!important;min-height:0;position:sticky;top:0;left:0}\n"]
    }]
  }], function() {
    return [{
      type: Document,
      decorators: [{
        type: Inject,
        args: [DOCUMENT]
      }]
    }, {
      type: void 0,
      decorators: [{
        type: Inject,
        args: [PLATFORM_ID]
      }]
    }, {
      type: Renderer2
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }, {
      type: TableService
    }, {
      type: ChangeDetectorRef
    }, {
      type: FilterService
    }, {
      type: OverlayService
    }];
  }, {
    frozenColumns: [{
      type: Input
    }],
    frozenValue: [{
      type: Input
    }],
    style: [{
      type: Input
    }],
    styleClass: [{
      type: Input
    }],
    tableStyle: [{
      type: Input
    }],
    tableStyleClass: [{
      type: Input
    }],
    paginator: [{
      type: Input
    }],
    pageLinks: [{
      type: Input
    }],
    rowsPerPageOptions: [{
      type: Input
    }],
    alwaysShowPaginator: [{
      type: Input
    }],
    paginatorPosition: [{
      type: Input
    }],
    paginatorDropdownAppendTo: [{
      type: Input
    }],
    paginatorDropdownScrollHeight: [{
      type: Input
    }],
    currentPageReportTemplate: [{
      type: Input
    }],
    showCurrentPageReport: [{
      type: Input
    }],
    showJumpToPageDropdown: [{
      type: Input
    }],
    showJumpToPageInput: [{
      type: Input
    }],
    showFirstLastIcon: [{
      type: Input
    }],
    showPageLinks: [{
      type: Input
    }],
    defaultSortOrder: [{
      type: Input
    }],
    sortMode: [{
      type: Input
    }],
    resetPageOnSort: [{
      type: Input
    }],
    selectionMode: [{
      type: Input
    }],
    selectionPageOnly: [{
      type: Input
    }],
    selectAllChange: [{
      type: Output
    }],
    selectionChange: [{
      type: Output
    }],
    contextMenuSelection: [{
      type: Input
    }],
    contextMenuSelectionChange: [{
      type: Output
    }],
    contextMenuSelectionMode: [{
      type: Input
    }],
    dataKey: [{
      type: Input
    }],
    metaKeySelection: [{
      type: Input
    }],
    rowSelectable: [{
      type: Input
    }],
    rowTrackBy: [{
      type: Input
    }],
    lazy: [{
      type: Input
    }],
    lazyLoadOnInit: [{
      type: Input
    }],
    compareSelectionBy: [{
      type: Input
    }],
    csvSeparator: [{
      type: Input
    }],
    exportFilename: [{
      type: Input
    }],
    filters: [{
      type: Input
    }],
    globalFilterFields: [{
      type: Input
    }],
    filterDelay: [{
      type: Input
    }],
    filterLocale: [{
      type: Input
    }],
    expandedRowKeys: [{
      type: Input
    }],
    editingRowKeys: [{
      type: Input
    }],
    rowExpandMode: [{
      type: Input
    }],
    scrollable: [{
      type: Input
    }],
    scrollDirection: [{
      type: Input
    }],
    rowGroupMode: [{
      type: Input
    }],
    scrollHeight: [{
      type: Input
    }],
    virtualScroll: [{
      type: Input
    }],
    virtualScrollItemSize: [{
      type: Input
    }],
    virtualScrollOptions: [{
      type: Input
    }],
    virtualScrollDelay: [{
      type: Input
    }],
    frozenWidth: [{
      type: Input
    }],
    responsive: [{
      type: Input
    }],
    contextMenu: [{
      type: Input
    }],
    resizableColumns: [{
      type: Input
    }],
    columnResizeMode: [{
      type: Input
    }],
    reorderableColumns: [{
      type: Input
    }],
    loading: [{
      type: Input
    }],
    loadingIcon: [{
      type: Input
    }],
    showLoader: [{
      type: Input
    }],
    rowHover: [{
      type: Input
    }],
    customSort: [{
      type: Input
    }],
    showInitialSortBadge: [{
      type: Input
    }],
    autoLayout: [{
      type: Input
    }],
    exportFunction: [{
      type: Input
    }],
    exportHeader: [{
      type: Input
    }],
    stateKey: [{
      type: Input
    }],
    stateStorage: [{
      type: Input
    }],
    editMode: [{
      type: Input
    }],
    groupRowsBy: [{
      type: Input
    }],
    groupRowsByOrder: [{
      type: Input
    }],
    responsiveLayout: [{
      type: Input
    }],
    breakpoint: [{
      type: Input
    }],
    onRowSelect: [{
      type: Output
    }],
    onRowUnselect: [{
      type: Output
    }],
    onPage: [{
      type: Output
    }],
    onSort: [{
      type: Output
    }],
    onFilter: [{
      type: Output
    }],
    onLazyLoad: [{
      type: Output
    }],
    onRowExpand: [{
      type: Output
    }],
    onRowCollapse: [{
      type: Output
    }],
    onContextMenuSelect: [{
      type: Output
    }],
    onColResize: [{
      type: Output
    }],
    onColReorder: [{
      type: Output
    }],
    onRowReorder: [{
      type: Output
    }],
    onEditInit: [{
      type: Output
    }],
    onEditComplete: [{
      type: Output
    }],
    onEditCancel: [{
      type: Output
    }],
    onHeaderCheckboxToggle: [{
      type: Output
    }],
    sortFunction: [{
      type: Output
    }],
    firstChange: [{
      type: Output
    }],
    rowsChange: [{
      type: Output
    }],
    onStateSave: [{
      type: Output
    }],
    onStateRestore: [{
      type: Output
    }],
    containerViewChild: [{
      type: ViewChild,
      args: ["container"]
    }],
    resizeHelperViewChild: [{
      type: ViewChild,
      args: ["resizeHelper"]
    }],
    reorderIndicatorUpViewChild: [{
      type: ViewChild,
      args: ["reorderIndicatorUp"]
    }],
    reorderIndicatorDownViewChild: [{
      type: ViewChild,
      args: ["reorderIndicatorDown"]
    }],
    wrapperViewChild: [{
      type: ViewChild,
      args: ["wrapper"]
    }],
    tableViewChild: [{
      type: ViewChild,
      args: ["table"]
    }],
    tableHeaderViewChild: [{
      type: ViewChild,
      args: ["thead"]
    }],
    tableFooterViewChild: [{
      type: ViewChild,
      args: ["tfoot"]
    }],
    scroller: [{
      type: ViewChild,
      args: ["scroller"]
    }],
    templates: [{
      type: ContentChildren,
      args: [PrimeTemplate]
    }],
    virtualRowHeight: [{
      type: Input
    }],
    value: [{
      type: Input
    }],
    columns: [{
      type: Input
    }],
    first: [{
      type: Input
    }],
    rows: [{
      type: Input
    }],
    totalRecords: [{
      type: Input
    }],
    sortField: [{
      type: Input
    }],
    sortOrder: [{
      type: Input
    }],
    multiSortMeta: [{
      type: Input
    }],
    selection: [{
      type: Input
    }],
    selectAll: [{
      type: Input
    }]
  });
})();
var TableBody = class {
  constructor(dt, tableService, cd, el) {
    this.dt = dt;
    this.tableService = tableService;
    this.cd = cd;
    this.el = el;
    this.subscription = this.dt.tableService.valueSource$.subscribe(() => {
      if (this.dt.virtualScroll) {
        this.cd.detectChanges();
      }
    });
  }
  get value() {
    return this._value;
  }
  set value(val) {
    this._value = val;
    if (this.frozenRows) {
      this.updateFrozenRowStickyPosition();
    }
    if (this.dt.scrollable && this.dt.rowGroupMode === "subheader") {
      this.updateFrozenRowGroupHeaderStickyPosition();
    }
  }
  ngAfterViewInit() {
    if (this.frozenRows) {
      this.updateFrozenRowStickyPosition();
    }
    if (this.dt.scrollable && this.dt.rowGroupMode === "subheader") {
      this.updateFrozenRowGroupHeaderStickyPosition();
    }
  }
  shouldRenderRowGroupHeader(value, rowData, i) {
    let currentRowFieldData = ObjectUtils.resolveFieldData(rowData, this.dt.groupRowsBy);
    let prevRowData = value[i - 1];
    if (prevRowData) {
      let previousRowFieldData = ObjectUtils.resolveFieldData(prevRowData, this.dt.groupRowsBy);
      return currentRowFieldData !== previousRowFieldData;
    } else {
      return true;
    }
  }
  shouldRenderRowGroupFooter(value, rowData, i) {
    let currentRowFieldData = ObjectUtils.resolveFieldData(rowData, this.dt.groupRowsBy);
    let nextRowData = value[i + 1];
    if (nextRowData) {
      let nextRowFieldData = ObjectUtils.resolveFieldData(nextRowData, this.dt.groupRowsBy);
      return currentRowFieldData !== nextRowFieldData;
    } else {
      return true;
    }
  }
  shouldRenderRowspan(value, rowData, i) {
    let currentRowFieldData = ObjectUtils.resolveFieldData(rowData, this.dt.groupRowsBy);
    let prevRowData = value[i - 1];
    if (prevRowData) {
      let previousRowFieldData = ObjectUtils.resolveFieldData(prevRowData, this.dt.groupRowsBy);
      return currentRowFieldData !== previousRowFieldData;
    } else {
      return true;
    }
  }
  calculateRowGroupSize(value, rowData, index) {
    let currentRowFieldData = ObjectUtils.resolveFieldData(rowData, this.dt.groupRowsBy);
    let nextRowFieldData = currentRowFieldData;
    let groupRowSpan = 0;
    while (currentRowFieldData === nextRowFieldData) {
      groupRowSpan++;
      let nextRowData = value[++index];
      if (nextRowData) {
        nextRowFieldData = ObjectUtils.resolveFieldData(nextRowData, this.dt.groupRowsBy);
      } else {
        break;
      }
    }
    return groupRowSpan === 1 ? null : groupRowSpan;
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  updateFrozenRowStickyPosition() {
    this.el.nativeElement.style.top = DomHandler.getOuterHeight(this.el.nativeElement.previousElementSibling) + "px";
  }
  updateFrozenRowGroupHeaderStickyPosition() {
    if (this.el.nativeElement.previousElementSibling) {
      let tableHeaderHeight = DomHandler.getOuterHeight(this.el.nativeElement.previousElementSibling);
      this.dt.rowGroupHeaderStyleObject.top = tableHeaderHeight + "px";
    }
  }
  getScrollerOption(option, options) {
    if (this.dt.virtualScroll) {
      options = options || this.scrollerOptions;
      return options ? options[option] : null;
    }
    return null;
  }
  getRowIndex(rowIndex) {
    const index = this.dt.paginator ? this.dt.first + rowIndex : rowIndex;
    const getItemOptions = this.getScrollerOption("getItemOptions");
    return getItemOptions ? getItemOptions(index).index : index;
  }
};
TableBody.\u0275fac = function TableBody_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || TableBody)(\u0275\u0275directiveInject(Table), \u0275\u0275directiveInject(TableService), \u0275\u0275directiveInject(ChangeDetectorRef), \u0275\u0275directiveInject(ElementRef));
};
TableBody.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
  type: TableBody,
  selectors: [["", "pTableBody", ""]],
  hostAttrs: [1, "p-element"],
  inputs: {
    columns: [0, "pTableBody", "columns"],
    template: [0, "pTableBodyTemplate", "template"],
    value: "value",
    frozen: "frozen",
    frozenRows: "frozenRows",
    scrollerOptions: "scrollerOptions"
  },
  standalone: false,
  attrs: _c162,
  decls: 5,
  vars: 5,
  consts: [[4, "ngIf"], ["ngFor", "", 3, "ngForOf", "ngForTrackBy"], ["role", "row", 4, "ngIf"], ["role", "row"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"]],
  template: function TableBody_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275template(0, TableBody_ng_container_0_Template, 2, 2, "ng-container", 0)(1, TableBody_ng_container_1_Template, 2, 2, "ng-container", 0)(2, TableBody_ng_container_2_Template, 2, 2, "ng-container", 0)(3, TableBody_ng_container_3_Template, 2, 5, "ng-container", 0)(4, TableBody_ng_container_4_Template, 2, 5, "ng-container", 0);
    }
    if (rf & 2) {
      \u0275\u0275property("ngIf", !ctx.dt.expandedRowTemplate);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.dt.expandedRowTemplate && !(ctx.frozen && ctx.dt.frozenExpandedRowTemplate));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.dt.frozenExpandedRowTemplate && ctx.frozen);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.dt.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.dt.isEmpty() && !ctx.dt.loading);
    }
  },
  dependencies: [NgForOf, NgIf, NgTemplateOutlet],
  encapsulation: 2
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TableBody, [{
    type: Component,
    args: [{
      selector: "[pTableBody]",
      template: `
        <ng-container *ngIf="!dt.expandedRowTemplate">
            <ng-template ngFor let-rowData let-rowIndex="index" [ngForOf]="value" [ngForTrackBy]="dt.rowTrackBy">
                <ng-container *ngIf="dt.groupHeaderTemplate && !dt.virtualScroll && dt.rowGroupMode === 'subheader' && shouldRenderRowGroupHeader(value, rowData, rowIndex)" role="row">
                    <ng-container
                        *ngTemplateOutlet="dt.groupHeaderTemplate; context: { $implicit: rowData, rowIndex: getRowIndex(rowIndex), columns: columns, editing: dt.editMode === 'row' && dt.isRowEditing(rowData), frozen: frozen }"
                    ></ng-container>
                </ng-container>
                <ng-container *ngIf="dt.rowGroupMode !== 'rowspan'">
                    <ng-container
                        *ngTemplateOutlet="rowData ? template : dt.loadingBodyTemplate; context: { $implicit: rowData, rowIndex: getRowIndex(rowIndex), columns: columns, editing: dt.editMode === 'row' && dt.isRowEditing(rowData), frozen: frozen }"
                    ></ng-container>
                </ng-container>
                <ng-container *ngIf="dt.rowGroupMode === 'rowspan'">
                    <ng-container
                        *ngTemplateOutlet="
                            rowData ? template : dt.loadingBodyTemplate;
                            context: {
                                $implicit: rowData,
                                rowIndex: getRowIndex(rowIndex),
                                columns: columns,
                                editing: dt.editMode === 'row' && dt.isRowEditing(rowData),
                                frozen: frozen,
                                rowgroup: shouldRenderRowspan(value, rowData, rowIndex),
                                rowspan: calculateRowGroupSize(value, rowData, rowIndex)
                            }
                        "
                    ></ng-container>
                </ng-container>
                <ng-container *ngIf="dt.groupFooterTemplate && !dt.virtualScroll && dt.rowGroupMode === 'subheader' && shouldRenderRowGroupFooter(value, rowData, rowIndex)" role="row">
                    <ng-container
                        *ngTemplateOutlet="dt.groupFooterTemplate; context: { $implicit: rowData, rowIndex: getRowIndex(rowIndex), columns: columns, editing: dt.editMode === 'row' && dt.isRowEditing(rowData), frozen: frozen }"
                    ></ng-container>
                </ng-container>
            </ng-template>
        </ng-container>
        <ng-container *ngIf="dt.expandedRowTemplate && !(frozen && dt.frozenExpandedRowTemplate)">
            <ng-template ngFor let-rowData let-rowIndex="index" [ngForOf]="value" [ngForTrackBy]="dt.rowTrackBy">
                <ng-container *ngIf="!dt.groupHeaderTemplate">
                    <ng-container
                        *ngTemplateOutlet="template; context: { $implicit: rowData, rowIndex: getRowIndex(rowIndex), columns: columns, expanded: dt.isRowExpanded(rowData), editing: dt.editMode === 'row' && dt.isRowEditing(rowData), frozen: frozen }"
                    ></ng-container>
                </ng-container>
                <ng-container *ngIf="dt.groupHeaderTemplate && dt.rowGroupMode === 'subheader' && shouldRenderRowGroupHeader(value, rowData, getRowIndex(rowIndex))" role="row">
                    <ng-container
                        *ngTemplateOutlet="
                            dt.groupHeaderTemplate;
                            context: { $implicit: rowData, rowIndex: getRowIndex(rowIndex), columns: columns, expanded: dt.isRowExpanded(rowData), editing: dt.editMode === 'row' && dt.isRowEditing(rowData), frozen: frozen }
                        "
                    ></ng-container>
                </ng-container>
                <ng-container *ngIf="dt.isRowExpanded(rowData)">
                    <ng-container *ngTemplateOutlet="dt.expandedRowTemplate; context: { $implicit: rowData, rowIndex: getRowIndex(rowIndex), columns: columns, frozen: frozen }"></ng-container>
                    <ng-container *ngIf="dt.groupFooterTemplate && dt.rowGroupMode === 'subheader' && shouldRenderRowGroupFooter(value, rowData, getRowIndex(rowIndex))" role="row">
                        <ng-container
                            *ngTemplateOutlet="
                                dt.groupFooterTemplate;
                                context: { $implicit: rowData, rowIndex: getRowIndex(rowIndex), columns: columns, expanded: dt.isRowExpanded(rowData), editing: dt.editMode === 'row' && dt.isRowEditing(rowData), frozen: frozen }
                            "
                        ></ng-container>
                    </ng-container>
                </ng-container>
            </ng-template>
        </ng-container>
        <ng-container *ngIf="dt.frozenExpandedRowTemplate && frozen">
            <ng-template ngFor let-rowData let-rowIndex="index" [ngForOf]="value" [ngForTrackBy]="dt.rowTrackBy">
                <ng-container
                    *ngTemplateOutlet="template; context: { $implicit: rowData, rowIndex: getRowIndex(rowIndex), columns: columns, expanded: dt.isRowExpanded(rowData), editing: dt.editMode === 'row' && dt.isRowEditing(rowData), frozen: frozen }"
                ></ng-container>
                <ng-container *ngIf="dt.isRowExpanded(rowData)">
                    <ng-container *ngTemplateOutlet="dt.frozenExpandedRowTemplate; context: { $implicit: rowData, rowIndex: getRowIndex(rowIndex), columns: columns, frozen: frozen }"></ng-container>
                </ng-container>
            </ng-template>
        </ng-container>
        <ng-container *ngIf="dt.loading">
            <ng-container *ngTemplateOutlet="dt.loadingBodyTemplate; context: { $implicit: columns, frozen: frozen }"></ng-container>
        </ng-container>
        <ng-container *ngIf="dt.isEmpty() && !dt.loading">
            <ng-container *ngTemplateOutlet="dt.emptyMessageTemplate; context: { $implicit: columns, frozen: frozen }"></ng-container>
        </ng-container>
    `,
      changeDetection: ChangeDetectionStrategy.Default,
      encapsulation: ViewEncapsulation.None,
      host: {
        class: "p-element"
      }
    }]
  }], function() {
    return [{
      type: Table
    }, {
      type: TableService
    }, {
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }];
  }, {
    columns: [{
      type: Input,
      args: ["pTableBody"]
    }],
    template: [{
      type: Input,
      args: ["pTableBodyTemplate"]
    }],
    value: [{
      type: Input
    }],
    frozen: [{
      type: Input
    }],
    frozenRows: [{
      type: Input
    }],
    scrollerOptions: [{
      type: Input
    }]
  });
})();
var RowGroupHeader = class {
  constructor(dt) {
    this.dt = dt;
  }
  get getFrozenRowGroupHeaderStickyPosition() {
    return this.dt.rowGroupHeaderStyleObject ? this.dt.rowGroupHeaderStyleObject.top : "";
  }
};
RowGroupHeader.\u0275fac = function RowGroupHeader_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || RowGroupHeader)(\u0275\u0275directiveInject(Table));
};
RowGroupHeader.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
  type: RowGroupHeader,
  selectors: [["", "pRowGroupHeader", ""]],
  hostAttrs: [1, "p-rowgroup-header", "p-element"],
  hostVars: 2,
  hostBindings: function RowGroupHeader_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275styleProp("top", ctx.getFrozenRowGroupHeaderStickyPosition);
    }
  },
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RowGroupHeader, [{
    type: Directive,
    args: [{
      selector: "[pRowGroupHeader]",
      host: {
        class: "p-rowgroup-header p-element",
        "[style.top]": "getFrozenRowGroupHeaderStickyPosition"
      }
    }]
  }], function() {
    return [{
      type: Table
    }];
  }, null);
})();
var FrozenColumn = class {
  constructor(el) {
    this.el = el;
    this.alignFrozen = "left";
    this._frozen = true;
  }
  get frozen() {
    return this._frozen;
  }
  set frozen(val) {
    this._frozen = val;
    this.updateStickyPosition();
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.updateStickyPosition();
    }, 1e3);
  }
  updateStickyPosition() {
    if (this._frozen) {
      if (this.alignFrozen === "right") {
        let right = 0;
        let next = this.el.nativeElement.nextElementSibling;
        if (next) {
          right = DomHandler.getOuterWidth(next) + (parseFloat(next.style.right) || 0);
        }
        this.el.nativeElement.style.right = right + "px";
      } else {
        let left = 0;
        let prev = this.el.nativeElement.previousElementSibling;
        if (prev) {
          left = DomHandler.getOuterWidth(prev) + (parseFloat(prev.style.left) || 0);
        }
        this.el.nativeElement.style.left = left + "px";
      }
      let filterRow = this.el.nativeElement.parentElement.nextElementSibling;
      if (filterRow) {
        let index = DomHandler.index(this.el.nativeElement);
        if (filterRow.children && filterRow.children[index]) {
          filterRow.children[index].style.left = this.el.nativeElement.style.left;
          filterRow.children[index].style.right = this.el.nativeElement.style.right;
        }
      }
    }
  }
};
FrozenColumn.\u0275fac = function FrozenColumn_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || FrozenColumn)(\u0275\u0275directiveInject(ElementRef));
};
FrozenColumn.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
  type: FrozenColumn,
  selectors: [["", "pFrozenColumn", ""]],
  hostAttrs: [1, "p-element"],
  hostVars: 2,
  hostBindings: function FrozenColumn_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("p-frozen-column", ctx.frozen);
    }
  },
  inputs: {
    frozen: "frozen",
    alignFrozen: "alignFrozen"
  },
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FrozenColumn, [{
    type: Directive,
    args: [{
      selector: "[pFrozenColumn]",
      host: {
        class: "p-element",
        "[class.p-frozen-column]": "frozen"
      }
    }]
  }], function() {
    return [{
      type: ElementRef
    }];
  }, {
    frozen: [{
      type: Input
    }],
    alignFrozen: [{
      type: Input
    }]
  });
})();
var SortableColumn = class {
  constructor(dt) {
    this.dt = dt;
    if (this.isEnabled()) {
      this.subscription = this.dt.tableService.sortSource$.subscribe((sortMeta) => {
        this.updateSortState();
      });
    }
  }
  ngOnInit() {
    if (this.isEnabled()) {
      this.updateSortState();
    }
  }
  updateSortState() {
    this.sorted = this.dt.isSorted(this.field);
    this.sortOrder = this.sorted ? this.dt.sortOrder === 1 ? "ascending" : "descending" : "none";
  }
  onClick(event) {
    if (this.isEnabled() && !this.isFilterElement(event.target)) {
      this.updateSortState();
      this.dt.sort({
        originalEvent: event,
        field: this.field
      });
      DomHandler.clearSelection();
    }
  }
  onEnterKey(event) {
    this.onClick(event);
  }
  isEnabled() {
    return this.pSortableColumnDisabled !== true;
  }
  isFilterElement(element) {
    return DomHandler.hasClass(element, "pi-filter-icon") || DomHandler.hasClass(element, "p-column-filter-menu-button");
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
};
SortableColumn.\u0275fac = function SortableColumn_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || SortableColumn)(\u0275\u0275directiveInject(Table));
};
SortableColumn.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
  type: SortableColumn,
  selectors: [["", "pSortableColumn", ""]],
  hostAttrs: [1, "p-element"],
  hostVars: 7,
  hostBindings: function SortableColumn_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("click", function SortableColumn_click_HostBindingHandler($event) {
        return ctx.onClick($event);
      })("keydown.enter", function SortableColumn_keydown_enter_HostBindingHandler($event) {
        return ctx.onEnterKey($event);
      });
    }
    if (rf & 2) {
      \u0275\u0275attribute("tabindex", ctx.isEnabled() ? "0" : null)("role", "columnheader")("aria-sort", ctx.sortOrder);
      \u0275\u0275classProp("p-sortable-column", ctx.isEnabled())("p-highlight", ctx.sorted);
    }
  },
  inputs: {
    field: [0, "pSortableColumn", "field"],
    pSortableColumnDisabled: "pSortableColumnDisabled"
  },
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SortableColumn, [{
    type: Directive,
    args: [{
      selector: "[pSortableColumn]",
      host: {
        class: "p-element",
        "[class.p-sortable-column]": "isEnabled()",
        "[class.p-highlight]": "sorted",
        "[attr.tabindex]": 'isEnabled() ? "0" : null',
        "[attr.role]": '"columnheader"',
        "[attr.aria-sort]": "sortOrder"
      }
    }]
  }], function() {
    return [{
      type: Table
    }];
  }, {
    field: [{
      type: Input,
      args: ["pSortableColumn"]
    }],
    pSortableColumnDisabled: [{
      type: Input
    }],
    onClick: [{
      type: HostListener,
      args: ["click", ["$event"]]
    }],
    onEnterKey: [{
      type: HostListener,
      args: ["keydown.enter", ["$event"]]
    }]
  });
})();
var SortIcon = class {
  constructor(dt, cd) {
    this.dt = dt;
    this.cd = cd;
    this.subscription = this.dt.tableService.sortSource$.subscribe((sortMeta) => {
      this.updateSortState();
    });
  }
  ngOnInit() {
    this.updateSortState();
  }
  onClick(event) {
    event.preventDefault();
  }
  updateSortState() {
    if (this.dt.sortMode === "single") {
      this.sortOrder = this.dt.isSorted(this.field) ? this.dt.sortOrder : 0;
    } else if (this.dt.sortMode === "multiple") {
      let sortMeta = this.dt.getSortMeta(this.field);
      this.sortOrder = sortMeta ? sortMeta.order : 0;
    }
    this.cd.markForCheck();
  }
  getMultiSortMetaIndex() {
    let multiSortMeta = this.dt._multiSortMeta;
    let index = -1;
    if (multiSortMeta && this.dt.sortMode === "multiple" && (this.dt.showInitialSortBadge || multiSortMeta.length > 1)) {
      for (let i = 0; i < multiSortMeta.length; i++) {
        let meta = multiSortMeta[i];
        if (meta.field === this.field || meta.field === this.field) {
          index = i;
          break;
        }
      }
    }
    return index;
  }
  getBadgeValue() {
    let index = this.getMultiSortMetaIndex();
    return this.dt.groupRowsBy && index > -1 ? index : index + 1;
  }
  isMultiSorted() {
    return this.dt.sortMode === "multiple" && this.getMultiSortMetaIndex() > -1;
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
};
SortIcon.\u0275fac = function SortIcon_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || SortIcon)(\u0275\u0275directiveInject(Table), \u0275\u0275directiveInject(ChangeDetectorRef));
};
SortIcon.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
  type: SortIcon,
  selectors: [["p-sortIcon"]],
  hostAttrs: [1, "p-element"],
  inputs: {
    field: "field"
  },
  standalone: false,
  decls: 3,
  vars: 3,
  consts: [[4, "ngIf"], ["class", "p-sortable-column-icon", 4, "ngIf"], ["class", "p-sortable-column-badge", 4, "ngIf"], [3, "styleClass", 4, "ngIf"], [3, "styleClass"], [1, "p-sortable-column-icon"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "p-sortable-column-badge"]],
  template: function SortIcon_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275template(0, SortIcon_ng_container_0_Template, 4, 3, "ng-container", 0)(1, SortIcon_span_1_Template, 2, 4, "span", 1)(2, SortIcon_span_2_Template, 2, 1, "span", 2);
    }
    if (rf & 2) {
      \u0275\u0275property("ngIf", !ctx.dt.sortIconTemplate);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.dt.sortIconTemplate);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isMultiSorted());
    }
  },
  dependencies: () => [NgIf, NgTemplateOutlet, SortAltIcon, SortAmountUpAltIcon, SortAmountDownIcon],
  encapsulation: 2,
  changeDetection: 0
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SortIcon, [{
    type: Component,
    args: [{
      selector: "p-sortIcon",
      template: `
        <ng-container *ngIf="!dt.sortIconTemplate">
            <SortAltIcon [styleClass]="'p-sortable-column-icon'" *ngIf="sortOrder === 0"/>
            <SortAmountUpAltIcon [styleClass]="'p-sortable-column-icon'" *ngIf="sortOrder === 1"/>
            <SortAmountDownIcon [styleClass]="'p-sortable-column-icon'" *ngIf="sortOrder === -1"/>
        </ng-container>
        <span *ngIf="dt.sortIconTemplate" class="p-sortable-column-icon">
            <ng-template *ngTemplateOutlet="dt.sortIconTemplate; context: { $implicit: sortOrder }"></ng-template>
        </span>
        <span *ngIf="isMultiSorted()" class="p-sortable-column-badge">{{ getBadgeValue() }}</span>
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      host: {
        class: "p-element"
      }
    }]
  }], function() {
    return [{
      type: Table
    }, {
      type: ChangeDetectorRef
    }];
  }, {
    field: [{
      type: Input
    }]
  });
})();
var SelectableRow = class {
  constructor(dt, tableService) {
    this.dt = dt;
    this.tableService = tableService;
    if (this.isEnabled()) {
      this.subscription = this.dt.tableService.selectionSource$.subscribe(() => {
        this.selected = this.dt.isSelected(this.data);
      });
    }
  }
  ngOnInit() {
    if (this.isEnabled()) {
      this.selected = this.dt.isSelected(this.data);
    }
  }
  onClick(event) {
    if (this.isEnabled()) {
      this.dt.handleRowClick({
        originalEvent: event,
        rowData: this.data,
        rowIndex: this.index
      });
    }
  }
  onTouchEnd(event) {
    if (this.isEnabled()) {
      this.dt.handleRowTouchEnd(event);
    }
  }
  onArrowDownKeyDown(event) {
    if (!this.isEnabled()) {
      return;
    }
    const row = event.currentTarget;
    const nextRow = this.findNextSelectableRow(row);
    if (nextRow) {
      nextRow.focus();
    }
    event.preventDefault();
  }
  onArrowUpKeyDown(event) {
    if (!this.isEnabled()) {
      return;
    }
    const row = event.currentTarget;
    const prevRow = this.findPrevSelectableRow(row);
    if (prevRow) {
      prevRow.focus();
    }
    event.preventDefault();
  }
  onEnterKeyDown(event) {
    if (!this.isEnabled()) {
      return;
    }
    this.dt.handleRowClick({
      originalEvent: event,
      rowData: this.data,
      rowIndex: this.index
    });
  }
  onPageDownKeyDown() {
    if (this.dt.virtualScroll) {
      this.dt.scroller.elementViewChild.nativeElement.focus();
    }
  }
  onSpaceKeydown() {
    if (this.dt.virtualScroll && !this.dt.editingCell) {
      this.dt.scroller.elementViewChild.nativeElement.focus();
    }
  }
  findNextSelectableRow(row) {
    let nextRow = row.nextElementSibling;
    if (nextRow) {
      if (DomHandler.hasClass(nextRow, "p-selectable-row")) return nextRow;
      else return this.findNextSelectableRow(nextRow);
    } else {
      return null;
    }
  }
  findPrevSelectableRow(row) {
    let prevRow = row.previousElementSibling;
    if (prevRow) {
      if (DomHandler.hasClass(prevRow, "p-selectable-row")) return prevRow;
      else return this.findPrevSelectableRow(prevRow);
    } else {
      return null;
    }
  }
  isEnabled() {
    return this.pSelectableRowDisabled !== true;
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
};
SelectableRow.\u0275fac = function SelectableRow_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || SelectableRow)(\u0275\u0275directiveInject(Table), \u0275\u0275directiveInject(TableService));
};
SelectableRow.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
  type: SelectableRow,
  selectors: [["", "pSelectableRow", ""]],
  hostAttrs: [1, "p-element"],
  hostVars: 5,
  hostBindings: function SelectableRow_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("click", function SelectableRow_click_HostBindingHandler($event) {
        return ctx.onClick($event);
      })("touchend", function SelectableRow_touchend_HostBindingHandler($event) {
        return ctx.onTouchEnd($event);
      })("keydown.arrowdown", function SelectableRow_keydown_arrowdown_HostBindingHandler($event) {
        return ctx.onArrowDownKeyDown($event);
      })("keydown.arrowup", function SelectableRow_keydown_arrowup_HostBindingHandler($event) {
        return ctx.onArrowUpKeyDown($event);
      })("keydown.enter", function SelectableRow_keydown_enter_HostBindingHandler($event) {
        return ctx.onEnterKeyDown($event);
      })("keydown.shift.enter", function SelectableRow_keydown_shift_enter_HostBindingHandler($event) {
        return ctx.onEnterKeyDown($event);
      })("keydown.meta.enter", function SelectableRow_keydown_meta_enter_HostBindingHandler($event) {
        return ctx.onEnterKeyDown($event);
      })("keydown.pagedown", function SelectableRow_keydown_pagedown_HostBindingHandler() {
        return ctx.onPageDownKeyDown();
      })("keydown.pageup", function SelectableRow_keydown_pageup_HostBindingHandler() {
        return ctx.onPageDownKeyDown();
      })("keydown.home", function SelectableRow_keydown_home_HostBindingHandler() {
        return ctx.onPageDownKeyDown();
      })("keydown.end", function SelectableRow_keydown_end_HostBindingHandler() {
        return ctx.onPageDownKeyDown();
      })("keydown.space", function SelectableRow_keydown_space_HostBindingHandler() {
        return ctx.onSpaceKeydown();
      });
    }
    if (rf & 2) {
      \u0275\u0275attribute("tabindex", ctx.isEnabled() ? 0 : void 0);
      \u0275\u0275classProp("p-selectable-row", ctx.isEnabled())("p-highlight", ctx.selected);
    }
  },
  inputs: {
    data: [0, "pSelectableRow", "data"],
    index: [0, "pSelectableRowIndex", "index"],
    pSelectableRowDisabled: "pSelectableRowDisabled"
  },
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SelectableRow, [{
    type: Directive,
    args: [{
      selector: "[pSelectableRow]",
      host: {
        class: "p-element",
        "[class.p-selectable-row]": "isEnabled()",
        "[class.p-highlight]": "selected",
        "[attr.tabindex]": "isEnabled() ? 0 : undefined"
      }
    }]
  }], function() {
    return [{
      type: Table
    }, {
      type: TableService
    }];
  }, {
    data: [{
      type: Input,
      args: ["pSelectableRow"]
    }],
    index: [{
      type: Input,
      args: ["pSelectableRowIndex"]
    }],
    pSelectableRowDisabled: [{
      type: Input
    }],
    onClick: [{
      type: HostListener,
      args: ["click", ["$event"]]
    }],
    onTouchEnd: [{
      type: HostListener,
      args: ["touchend", ["$event"]]
    }],
    onArrowDownKeyDown: [{
      type: HostListener,
      args: ["keydown.arrowdown", ["$event"]]
    }],
    onArrowUpKeyDown: [{
      type: HostListener,
      args: ["keydown.arrowup", ["$event"]]
    }],
    onEnterKeyDown: [{
      type: HostListener,
      args: ["keydown.enter", ["$event"]]
    }, {
      type: HostListener,
      args: ["keydown.shift.enter", ["$event"]]
    }, {
      type: HostListener,
      args: ["keydown.meta.enter", ["$event"]]
    }],
    onPageDownKeyDown: [{
      type: HostListener,
      args: ["keydown.pagedown"]
    }, {
      type: HostListener,
      args: ["keydown.pageup"]
    }, {
      type: HostListener,
      args: ["keydown.home"]
    }, {
      type: HostListener,
      args: ["keydown.end"]
    }],
    onSpaceKeydown: [{
      type: HostListener,
      args: ["keydown.space"]
    }]
  });
})();
var SelectableRowDblClick = class {
  constructor(dt, tableService) {
    this.dt = dt;
    this.tableService = tableService;
    if (this.isEnabled()) {
      this.subscription = this.dt.tableService.selectionSource$.subscribe(() => {
        this.selected = this.dt.isSelected(this.data);
      });
    }
  }
  ngOnInit() {
    if (this.isEnabled()) {
      this.selected = this.dt.isSelected(this.data);
    }
  }
  onClick(event) {
    if (this.isEnabled()) {
      this.dt.handleRowClick({
        originalEvent: event,
        rowData: this.data,
        rowIndex: this.index
      });
    }
  }
  isEnabled() {
    return this.pSelectableRowDisabled !== true;
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
};
SelectableRowDblClick.\u0275fac = function SelectableRowDblClick_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || SelectableRowDblClick)(\u0275\u0275directiveInject(Table), \u0275\u0275directiveInject(TableService));
};
SelectableRowDblClick.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
  type: SelectableRowDblClick,
  selectors: [["", "pSelectableRowDblClick", ""]],
  hostAttrs: [1, "p-element"],
  hostVars: 4,
  hostBindings: function SelectableRowDblClick_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("dblclick", function SelectableRowDblClick_dblclick_HostBindingHandler($event) {
        return ctx.onClick($event);
      });
    }
    if (rf & 2) {
      \u0275\u0275classProp("p-selectable-row", ctx.isEnabled())("p-highlight", ctx.selected);
    }
  },
  inputs: {
    data: [0, "pSelectableRowDblClick", "data"],
    index: [0, "pSelectableRowIndex", "index"],
    pSelectableRowDisabled: "pSelectableRowDisabled"
  },
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SelectableRowDblClick, [{
    type: Directive,
    args: [{
      selector: "[pSelectableRowDblClick]",
      host: {
        class: "p-element",
        "[class.p-selectable-row]": "isEnabled()",
        "[class.p-highlight]": "selected"
      }
    }]
  }], function() {
    return [{
      type: Table
    }, {
      type: TableService
    }];
  }, {
    data: [{
      type: Input,
      args: ["pSelectableRowDblClick"]
    }],
    index: [{
      type: Input,
      args: ["pSelectableRowIndex"]
    }],
    pSelectableRowDisabled: [{
      type: Input
    }],
    onClick: [{
      type: HostListener,
      args: ["dblclick", ["$event"]]
    }]
  });
})();
var ContextMenuRow = class {
  constructor(dt, tableService, el) {
    this.dt = dt;
    this.tableService = tableService;
    this.el = el;
    if (this.isEnabled()) {
      this.subscription = this.dt.tableService.contextMenuSource$.subscribe((data) => {
        this.selected = this.dt.equals(this.data, data);
      });
    }
  }
  onContextMenu(event) {
    if (this.isEnabled()) {
      this.dt.handleRowRightClick({
        originalEvent: event,
        rowData: this.data,
        rowIndex: this.index
      });
      this.el.nativeElement.focus();
      event.preventDefault();
    }
  }
  isEnabled() {
    return this.pContextMenuRowDisabled !== true;
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
};
ContextMenuRow.\u0275fac = function ContextMenuRow_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || ContextMenuRow)(\u0275\u0275directiveInject(Table), \u0275\u0275directiveInject(TableService), \u0275\u0275directiveInject(ElementRef));
};
ContextMenuRow.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
  type: ContextMenuRow,
  selectors: [["", "pContextMenuRow", ""]],
  hostAttrs: [1, "p-element"],
  hostVars: 3,
  hostBindings: function ContextMenuRow_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("contextmenu", function ContextMenuRow_contextmenu_HostBindingHandler($event) {
        return ctx.onContextMenu($event);
      });
    }
    if (rf & 2) {
      \u0275\u0275attribute("tabindex", ctx.isEnabled() ? 0 : void 0);
      \u0275\u0275classProp("p-highlight-contextmenu", ctx.selected);
    }
  },
  inputs: {
    data: [0, "pContextMenuRow", "data"],
    index: [0, "pContextMenuRowIndex", "index"],
    pContextMenuRowDisabled: "pContextMenuRowDisabled"
  },
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ContextMenuRow, [{
    type: Directive,
    args: [{
      selector: "[pContextMenuRow]",
      host: {
        class: "p-element",
        "[class.p-highlight-contextmenu]": "selected",
        "[attr.tabindex]": "isEnabled() ? 0 : undefined"
      }
    }]
  }], function() {
    return [{
      type: Table
    }, {
      type: TableService
    }, {
      type: ElementRef
    }];
  }, {
    data: [{
      type: Input,
      args: ["pContextMenuRow"]
    }],
    index: [{
      type: Input,
      args: ["pContextMenuRowIndex"]
    }],
    pContextMenuRowDisabled: [{
      type: Input
    }],
    onContextMenu: [{
      type: HostListener,
      args: ["contextmenu", ["$event"]]
    }]
  });
})();
var RowToggler = class {
  constructor(dt) {
    this.dt = dt;
  }
  onClick(event) {
    if (this.isEnabled()) {
      this.dt.toggleRow(this.data, event);
      event.preventDefault();
    }
  }
  isEnabled() {
    return this.pRowTogglerDisabled !== true;
  }
};
RowToggler.\u0275fac = function RowToggler_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || RowToggler)(\u0275\u0275directiveInject(Table));
};
RowToggler.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
  type: RowToggler,
  selectors: [["", "pRowToggler", ""]],
  hostAttrs: [1, "p-element"],
  hostBindings: function RowToggler_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("click", function RowToggler_click_HostBindingHandler($event) {
        return ctx.onClick($event);
      });
    }
  },
  inputs: {
    data: [0, "pRowToggler", "data"],
    pRowTogglerDisabled: "pRowTogglerDisabled"
  },
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RowToggler, [{
    type: Directive,
    args: [{
      selector: "[pRowToggler]",
      host: {
        class: "p-element"
      }
    }]
  }], function() {
    return [{
      type: Table
    }];
  }, {
    data: [{
      type: Input,
      args: ["pRowToggler"]
    }],
    pRowTogglerDisabled: [{
      type: Input
    }],
    onClick: [{
      type: HostListener,
      args: ["click", ["$event"]]
    }]
  });
})();
var ResizableColumn = class {
  constructor(document2, platformId, renderer, dt, el, zone) {
    this.document = document2;
    this.platformId = platformId;
    this.renderer = renderer;
    this.dt = dt;
    this.el = el;
    this.zone = zone;
  }
  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.isEnabled()) {
        DomHandler.addClass(this.el.nativeElement, "p-resizable-column");
        this.resizer = this.renderer.createElement("span");
        this.renderer.addClass(this.resizer, "p-column-resizer");
        this.renderer.appendChild(this.el.nativeElement, this.resizer);
        this.zone.runOutsideAngular(() => {
          this.resizerMouseDownListener = this.renderer.listen(this.resizer, "mousedown", this.onMouseDown.bind(this));
        });
      }
    }
  }
  bindDocumentEvents() {
    this.zone.runOutsideAngular(() => {
      this.documentMouseMoveListener = this.renderer.listen(this.document, "mousemove", this.onDocumentMouseMove.bind(this));
      this.documentMouseUpListener = this.renderer.listen(this.document, "mouseup", this.onDocumentMouseUp.bind(this));
    });
  }
  unbindDocumentEvents() {
    if (this.documentMouseMoveListener) {
      this.documentMouseMoveListener();
      this.documentMouseMoveListener = null;
    }
    if (this.documentMouseUpListener) {
      this.documentMouseUpListener();
      this.documentMouseUpListener = null;
    }
  }
  onMouseDown(event) {
    if (event.which === 1) {
      this.dt.onColumnResizeBegin(event);
      this.bindDocumentEvents();
    }
  }
  onDocumentMouseMove(event) {
    this.dt.onColumnResize(event);
  }
  onDocumentMouseUp(event) {
    this.dt.onColumnResizeEnd();
    this.unbindDocumentEvents();
  }
  isEnabled() {
    return this.pResizableColumnDisabled !== true;
  }
  ngOnDestroy() {
    if (this.resizerMouseDownListener) {
      this.resizerMouseDownListener();
      this.resizerMouseDownListener = null;
    }
    this.unbindDocumentEvents();
  }
};
ResizableColumn.\u0275fac = function ResizableColumn_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || ResizableColumn)(\u0275\u0275directiveInject(DOCUMENT), \u0275\u0275directiveInject(PLATFORM_ID), \u0275\u0275directiveInject(Renderer2), \u0275\u0275directiveInject(Table), \u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(NgZone));
};
ResizableColumn.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
  type: ResizableColumn,
  selectors: [["", "pResizableColumn", ""]],
  hostAttrs: [1, "p-element"],
  inputs: {
    pResizableColumnDisabled: "pResizableColumnDisabled"
  },
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ResizableColumn, [{
    type: Directive,
    args: [{
      selector: "[pResizableColumn]",
      host: {
        class: "p-element"
      }
    }]
  }], function() {
    return [{
      type: Document,
      decorators: [{
        type: Inject,
        args: [DOCUMENT]
      }]
    }, {
      type: void 0,
      decorators: [{
        type: Inject,
        args: [PLATFORM_ID]
      }]
    }, {
      type: Renderer2
    }, {
      type: Table
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, {
    pResizableColumnDisabled: [{
      type: Input
    }]
  });
})();
var ReorderableColumn = class {
  constructor(platformId, renderer, dt, el, zone) {
    this.platformId = platformId;
    this.renderer = renderer;
    this.dt = dt;
    this.el = el;
    this.zone = zone;
  }
  ngAfterViewInit() {
    if (this.isEnabled()) {
      this.bindEvents();
    }
  }
  bindEvents() {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        this.mouseDownListener = this.renderer.listen(this.el.nativeElement, "mousedown", this.onMouseDown.bind(this));
        this.dragStartListener = this.renderer.listen(this.el.nativeElement, "dragstart", this.onDragStart.bind(this));
        this.dragOverListener = this.renderer.listen(this.el.nativeElement, "dragover", this.onDragOver.bind(this));
        this.dragEnterListener = this.renderer.listen(this.el.nativeElement, "dragenter", this.onDragEnter.bind(this));
        this.dragLeaveListener = this.renderer.listen(this.el.nativeElement, "dragleave", this.onDragLeave.bind(this));
      });
    }
  }
  unbindEvents() {
    if (this.mouseDownListener) {
      this.mouseDownListener();
      this.mouseDownListener = null;
    }
    if (this.dragStartListener) {
      this.dragStartListener();
      this.dragStartListener = null;
    }
    if (this.dragOverListener) {
      this.dragOverListener();
      this.dragOverListener = null;
    }
    if (this.dragEnterListener) {
      this.dragEnterListener();
      this.dragEnterListener = null;
    }
    if (this.dragLeaveListener) {
      this.dragLeaveListener();
      this.dragLeaveListener = null;
    }
  }
  onMouseDown(event) {
    if (event.target.nodeName === "INPUT" || event.target.nodeName === "TEXTAREA" || DomHandler.hasClass(event.target, "p-column-resizer")) this.el.nativeElement.draggable = false;
    else this.el.nativeElement.draggable = true;
  }
  onDragStart(event) {
    this.dt.onColumnDragStart(event, this.el.nativeElement);
  }
  onDragOver(event) {
    event.preventDefault();
  }
  onDragEnter(event) {
    this.dt.onColumnDragEnter(event, this.el.nativeElement);
  }
  onDragLeave(event) {
    this.dt.onColumnDragLeave(event);
  }
  onDrop(event) {
    if (this.isEnabled()) {
      this.dt.onColumnDrop(event, this.el.nativeElement);
    }
  }
  isEnabled() {
    return this.pReorderableColumnDisabled !== true;
  }
  ngOnDestroy() {
    this.unbindEvents();
  }
};
ReorderableColumn.\u0275fac = function ReorderableColumn_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || ReorderableColumn)(\u0275\u0275directiveInject(PLATFORM_ID), \u0275\u0275directiveInject(Renderer2), \u0275\u0275directiveInject(Table), \u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(NgZone));
};
ReorderableColumn.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
  type: ReorderableColumn,
  selectors: [["", "pReorderableColumn", ""]],
  hostAttrs: [1, "p-element"],
  hostBindings: function ReorderableColumn_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("drop", function ReorderableColumn_drop_HostBindingHandler($event) {
        return ctx.onDrop($event);
      });
    }
  },
  inputs: {
    pReorderableColumnDisabled: "pReorderableColumnDisabled"
  },
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReorderableColumn, [{
    type: Directive,
    args: [{
      selector: "[pReorderableColumn]",
      host: {
        class: "p-element"
      }
    }]
  }], function() {
    return [{
      type: void 0,
      decorators: [{
        type: Inject,
        args: [PLATFORM_ID]
      }]
    }, {
      type: Renderer2
    }, {
      type: Table
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, {
    pReorderableColumnDisabled: [{
      type: Input
    }],
    onDrop: [{
      type: HostListener,
      args: ["drop", ["$event"]]
    }]
  });
})();
var EditableColumn = class {
  constructor(dt, el, zone) {
    this.dt = dt;
    this.el = el;
    this.zone = zone;
  }
  ngAfterViewInit() {
    if (this.isEnabled()) {
      DomHandler.addClass(this.el.nativeElement, "p-editable-column");
    }
  }
  onClick(event) {
    if (this.isEnabled()) {
      this.dt.selfClick = true;
      if (this.dt.editingCell) {
        if (this.dt.editingCell !== this.el.nativeElement) {
          if (!this.dt.isEditingCellValid()) {
            return;
          }
          this.closeEditingCell(true, event);
          this.openCell();
        }
      } else {
        this.openCell();
      }
    }
  }
  openCell() {
    this.dt.updateEditingCell(this.el.nativeElement, this.data, this.field, this.rowIndex);
    DomHandler.addClass(this.el.nativeElement, "p-cell-editing");
    this.dt.onEditInit.emit({
      field: this.field,
      data: this.data,
      index: this.rowIndex
    });
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        let focusCellSelector = this.pFocusCellSelector || "input, textarea, select";
        let focusableElement = DomHandler.findSingle(this.el.nativeElement, focusCellSelector);
        if (focusableElement) {
          focusableElement.focus();
        }
      }, 50);
    });
    this.overlayEventListener = (e) => {
      if (this.el && this.el.nativeElement.contains(e.target)) {
        this.dt.selfClick = true;
      }
    };
    this.dt.overlaySubscription = this.dt.overlayService.clickObservable.subscribe(this.overlayEventListener);
  }
  closeEditingCell(completed, event) {
    const eventData = {
      field: this.dt.editingCellField,
      data: this.dt.editingCellData,
      originalEvent: event,
      index: this.dt.editingCellRowIndex
    };
    if (completed) {
      this.dt.onEditComplete.emit(eventData);
    } else {
      this.dt.onEditCancel.emit(eventData);
      this.dt.value.forEach((element) => {
        if (element[this.dt.editingCellField] === this.data) {
          element[this.dt.editingCellField] = this.dt.editingCellData;
        }
      });
    }
    DomHandler.removeClass(this.dt.editingCell, "p-cell-editing");
    this.dt.editingCell = null;
    this.dt.editingCellData = null;
    this.dt.editingCellField = null;
    this.dt.unbindDocumentEditListener();
    if (this.dt.overlaySubscription) {
      this.dt.overlaySubscription.unsubscribe();
    }
  }
  onEnterKeyDown(event) {
    if (this.isEnabled()) {
      if (this.dt.isEditingCellValid()) {
        this.closeEditingCell(true, event);
      }
      event.preventDefault();
    }
  }
  onTabKeyDown(event) {
    if (this.isEnabled()) {
      if (this.dt.isEditingCellValid()) {
        this.closeEditingCell(true, event);
      }
      event.preventDefault();
    }
  }
  onEscapeKeyDown(event) {
    if (this.isEnabled()) {
      if (this.dt.isEditingCellValid()) {
        this.closeEditingCell(false, event);
      }
      event.preventDefault();
    }
  }
  onShiftKeyDown(event) {
    if (this.isEnabled()) {
      if (event.shiftKey) this.moveToPreviousCell(event);
      else {
        this.moveToNextCell(event);
      }
    }
  }
  onArrowDown(event) {
    if (this.isEnabled()) {
      let currentCell = this.findCell(event.target);
      if (currentCell) {
        let cellIndex = DomHandler.index(currentCell);
        let targetCell = this.findNextEditableColumnByIndex(currentCell, cellIndex);
        if (targetCell) {
          if (this.dt.isEditingCellValid()) {
            this.closeEditingCell(true, event);
          }
          DomHandler.invokeElementMethod(event.target, "blur");
          DomHandler.invokeElementMethod(targetCell, "click");
        }
        event.preventDefault();
      }
    }
  }
  onArrowUp(event) {
    if (this.isEnabled()) {
      let currentCell = this.findCell(event.target);
      if (currentCell) {
        let cellIndex = DomHandler.index(currentCell);
        let targetCell = this.findPrevEditableColumnByIndex(currentCell, cellIndex);
        if (targetCell) {
          if (this.dt.isEditingCellValid()) {
            this.closeEditingCell(true, event);
          }
          DomHandler.invokeElementMethod(event.target, "blur");
          DomHandler.invokeElementMethod(targetCell, "click");
        }
        event.preventDefault();
      }
    }
  }
  onArrowLeft(event) {
    if (this.isEnabled()) {
      this.moveToPreviousCell(event);
    }
  }
  onArrowRight(event) {
    if (this.isEnabled()) {
      this.moveToNextCell(event);
    }
  }
  findCell(element) {
    if (element) {
      let cell = element;
      while (cell && !DomHandler.hasClass(cell, "p-cell-editing")) {
        cell = cell.parentElement;
      }
      return cell;
    } else {
      return null;
    }
  }
  moveToPreviousCell(event) {
    let currentCell = this.findCell(event.target);
    if (currentCell) {
      let targetCell = this.findPreviousEditableColumn(currentCell);
      if (targetCell) {
        if (this.dt.isEditingCellValid()) {
          this.closeEditingCell(true, event);
        }
        DomHandler.invokeElementMethod(event.target, "blur");
        DomHandler.invokeElementMethod(targetCell, "click");
        event.preventDefault();
      }
    }
  }
  moveToNextCell(event) {
    let currentCell = this.findCell(event.target);
    if (currentCell) {
      let targetCell = this.findNextEditableColumn(currentCell);
      if (targetCell) {
        if (this.dt.isEditingCellValid()) {
          this.closeEditingCell(true, event);
        }
        DomHandler.invokeElementMethod(event.target, "blur");
        DomHandler.invokeElementMethod(targetCell, "click");
        event.preventDefault();
      }
    }
  }
  findPreviousEditableColumn(cell) {
    let prevCell = cell.previousElementSibling;
    if (!prevCell) {
      let previousRow = cell.parentElement.previousElementSibling;
      if (previousRow) {
        prevCell = previousRow.lastElementChild;
      }
    }
    if (prevCell) {
      if (DomHandler.hasClass(prevCell, "p-editable-column")) return prevCell;
      else return this.findPreviousEditableColumn(prevCell);
    } else {
      return null;
    }
  }
  findNextEditableColumn(cell) {
    let nextCell = cell.nextElementSibling;
    if (!nextCell) {
      let nextRow = cell.parentElement.nextElementSibling;
      if (nextRow) {
        nextCell = nextRow.firstElementChild;
      }
    }
    if (nextCell) {
      if (DomHandler.hasClass(nextCell, "p-editable-column")) return nextCell;
      else return this.findNextEditableColumn(nextCell);
    } else {
      return null;
    }
  }
  findNextEditableColumnByIndex(cell, index) {
    let nextRow = cell.parentElement.nextElementSibling;
    if (nextRow) {
      let nextCell = nextRow.children[index];
      if (nextCell && DomHandler.hasClass(nextCell, "p-editable-column")) {
        return nextCell;
      }
      return null;
    } else {
      return null;
    }
  }
  findPrevEditableColumnByIndex(cell, index) {
    let prevRow = cell.parentElement.previousElementSibling;
    if (prevRow) {
      let prevCell = prevRow.children[index];
      if (prevCell && DomHandler.hasClass(prevCell, "p-editable-column")) {
        return prevCell;
      }
      return null;
    } else {
      return null;
    }
  }
  isEnabled() {
    return this.pEditableColumnDisabled !== true;
  }
  ngOnDestroy() {
    if (this.dt.overlaySubscription) {
      this.dt.overlaySubscription.unsubscribe();
    }
  }
};
EditableColumn.\u0275fac = function EditableColumn_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || EditableColumn)(\u0275\u0275directiveInject(Table), \u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(NgZone));
};
EditableColumn.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
  type: EditableColumn,
  selectors: [["", "pEditableColumn", ""]],
  hostAttrs: [1, "p-element"],
  hostBindings: function EditableColumn_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("click", function EditableColumn_click_HostBindingHandler($event) {
        return ctx.onClick($event);
      })("keydown.enter", function EditableColumn_keydown_enter_HostBindingHandler($event) {
        return ctx.onEnterKeyDown($event);
      })("keydown.tab", function EditableColumn_keydown_tab_HostBindingHandler($event) {
        return ctx.onShiftKeyDown($event);
      })("keydown.escape", function EditableColumn_keydown_escape_HostBindingHandler($event) {
        return ctx.onEscapeKeyDown($event);
      })("keydown.shift.tab", function EditableColumn_keydown_shift_tab_HostBindingHandler($event) {
        return ctx.onShiftKeyDown($event);
      })("keydown.meta.tab", function EditableColumn_keydown_meta_tab_HostBindingHandler($event) {
        return ctx.onShiftKeyDown($event);
      })("keydown.arrowdown", function EditableColumn_keydown_arrowdown_HostBindingHandler($event) {
        return ctx.onArrowDown($event);
      })("keydown.arrowup", function EditableColumn_keydown_arrowup_HostBindingHandler($event) {
        return ctx.onArrowUp($event);
      })("keydown.arrowleft", function EditableColumn_keydown_arrowleft_HostBindingHandler($event) {
        return ctx.onArrowLeft($event);
      })("keydown.arrowright", function EditableColumn_keydown_arrowright_HostBindingHandler($event) {
        return ctx.onArrowRight($event);
      });
    }
  },
  inputs: {
    data: [0, "pEditableColumn", "data"],
    field: [0, "pEditableColumnField", "field"],
    rowIndex: [0, "pEditableColumnRowIndex", "rowIndex"],
    pEditableColumnDisabled: "pEditableColumnDisabled",
    pFocusCellSelector: "pFocusCellSelector"
  },
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EditableColumn, [{
    type: Directive,
    args: [{
      selector: "[pEditableColumn]",
      host: {
        class: "p-element"
      }
    }]
  }], function() {
    return [{
      type: Table
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, {
    data: [{
      type: Input,
      args: ["pEditableColumn"]
    }],
    field: [{
      type: Input,
      args: ["pEditableColumnField"]
    }],
    rowIndex: [{
      type: Input,
      args: ["pEditableColumnRowIndex"]
    }],
    pEditableColumnDisabled: [{
      type: Input
    }],
    pFocusCellSelector: [{
      type: Input
    }],
    onClick: [{
      type: HostListener,
      args: ["click", ["$event"]]
    }],
    onEnterKeyDown: [{
      type: HostListener,
      args: ["keydown.enter", ["$event"]]
    }],
    onTabKeyDown: [{
      type: HostListener,
      args: ["keydown.tab", ["$event"]]
    }],
    onEscapeKeyDown: [{
      type: HostListener,
      args: ["keydown.escape", ["$event"]]
    }],
    onShiftKeyDown: [{
      type: HostListener,
      args: ["keydown.tab", ["$event"]]
    }, {
      type: HostListener,
      args: ["keydown.shift.tab", ["$event"]]
    }, {
      type: HostListener,
      args: ["keydown.meta.tab", ["$event"]]
    }],
    onArrowDown: [{
      type: HostListener,
      args: ["keydown.arrowdown", ["$event"]]
    }],
    onArrowUp: [{
      type: HostListener,
      args: ["keydown.arrowup", ["$event"]]
    }],
    onArrowLeft: [{
      type: HostListener,
      args: ["keydown.arrowleft", ["$event"]]
    }],
    onArrowRight: [{
      type: HostListener,
      args: ["keydown.arrowright", ["$event"]]
    }]
  });
})();
var EditableRow = class {
  constructor(el) {
    this.el = el;
  }
  isEnabled() {
    return this.pEditableRowDisabled !== true;
  }
};
EditableRow.\u0275fac = function EditableRow_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || EditableRow)(\u0275\u0275directiveInject(ElementRef));
};
EditableRow.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
  type: EditableRow,
  selectors: [["", "pEditableRow", ""]],
  hostAttrs: [1, "p-element"],
  inputs: {
    data: [0, "pEditableRow", "data"],
    pEditableRowDisabled: "pEditableRowDisabled"
  },
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EditableRow, [{
    type: Directive,
    args: [{
      selector: "[pEditableRow]",
      host: {
        class: "p-element"
      }
    }]
  }], function() {
    return [{
      type: ElementRef
    }];
  }, {
    data: [{
      type: Input,
      args: ["pEditableRow"]
    }],
    pEditableRowDisabled: [{
      type: Input
    }]
  });
})();
var InitEditableRow = class {
  constructor(dt, editableRow) {
    this.dt = dt;
    this.editableRow = editableRow;
  }
  onClick(event) {
    this.dt.initRowEdit(this.editableRow.data);
    event.preventDefault();
  }
};
InitEditableRow.\u0275fac = function InitEditableRow_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || InitEditableRow)(\u0275\u0275directiveInject(Table), \u0275\u0275directiveInject(EditableRow));
};
InitEditableRow.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
  type: InitEditableRow,
  selectors: [["", "pInitEditableRow", ""]],
  hostAttrs: [1, "p-element"],
  hostBindings: function InitEditableRow_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("click", function InitEditableRow_click_HostBindingHandler($event) {
        return ctx.onClick($event);
      });
    }
  },
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InitEditableRow, [{
    type: Directive,
    args: [{
      selector: "[pInitEditableRow]",
      host: {
        class: "p-element"
      }
    }]
  }], function() {
    return [{
      type: Table
    }, {
      type: EditableRow
    }];
  }, {
    onClick: [{
      type: HostListener,
      args: ["click", ["$event"]]
    }]
  });
})();
var SaveEditableRow = class {
  constructor(dt, editableRow) {
    this.dt = dt;
    this.editableRow = editableRow;
  }
  onClick(event) {
    this.dt.saveRowEdit(this.editableRow.data, this.editableRow.el.nativeElement);
    event.preventDefault();
  }
};
SaveEditableRow.\u0275fac = function SaveEditableRow_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || SaveEditableRow)(\u0275\u0275directiveInject(Table), \u0275\u0275directiveInject(EditableRow));
};
SaveEditableRow.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
  type: SaveEditableRow,
  selectors: [["", "pSaveEditableRow", ""]],
  hostAttrs: [1, "p-element"],
  hostBindings: function SaveEditableRow_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("click", function SaveEditableRow_click_HostBindingHandler($event) {
        return ctx.onClick($event);
      });
    }
  },
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SaveEditableRow, [{
    type: Directive,
    args: [{
      selector: "[pSaveEditableRow]",
      host: {
        class: "p-element"
      }
    }]
  }], function() {
    return [{
      type: Table
    }, {
      type: EditableRow
    }];
  }, {
    onClick: [{
      type: HostListener,
      args: ["click", ["$event"]]
    }]
  });
})();
var CancelEditableRow = class {
  constructor(dt, editableRow) {
    this.dt = dt;
    this.editableRow = editableRow;
  }
  onClick(event) {
    this.dt.cancelRowEdit(this.editableRow.data);
    event.preventDefault();
  }
};
CancelEditableRow.\u0275fac = function CancelEditableRow_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || CancelEditableRow)(\u0275\u0275directiveInject(Table), \u0275\u0275directiveInject(EditableRow));
};
CancelEditableRow.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
  type: CancelEditableRow,
  selectors: [["", "pCancelEditableRow", ""]],
  hostAttrs: [1, "p-element"],
  hostBindings: function CancelEditableRow_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("click", function CancelEditableRow_click_HostBindingHandler($event) {
        return ctx.onClick($event);
      });
    }
  },
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CancelEditableRow, [{
    type: Directive,
    args: [{
      selector: "[pCancelEditableRow]",
      host: {
        class: "p-element"
      }
    }]
  }], function() {
    return [{
      type: Table
    }, {
      type: EditableRow
    }];
  }, {
    onClick: [{
      type: HostListener,
      args: ["click", ["$event"]]
    }]
  });
})();
var CellEditor = class {
  constructor(dt, editableColumn, editableRow) {
    this.dt = dt;
    this.editableColumn = editableColumn;
    this.editableRow = editableRow;
  }
  ngAfterContentInit() {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case "input":
          this.inputTemplate = item.template;
          break;
        case "output":
          this.outputTemplate = item.template;
          break;
      }
    });
  }
  get editing() {
    return this.dt.editingCell && this.editableColumn && this.dt.editingCell === this.editableColumn.el.nativeElement || this.editableRow && this.dt.editMode === "row" && this.dt.isRowEditing(this.editableRow.data);
  }
};
CellEditor.\u0275fac = function CellEditor_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || CellEditor)(\u0275\u0275directiveInject(Table), \u0275\u0275directiveInject(EditableColumn, 8), \u0275\u0275directiveInject(EditableRow, 8));
};
CellEditor.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
  type: CellEditor,
  selectors: [["p-cellEditor"]],
  contentQueries: function CellEditor_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      \u0275\u0275contentQuery(dirIndex, PrimeTemplate, 4);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.templates = _t);
    }
  },
  hostAttrs: [1, "p-element"],
  standalone: false,
  decls: 2,
  vars: 2,
  consts: [[4, "ngIf"], [4, "ngTemplateOutlet"]],
  template: function CellEditor_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275template(0, CellEditor_ng_container_0_Template, 2, 1, "ng-container", 0)(1, CellEditor_ng_container_1_Template, 2, 1, "ng-container", 0);
    }
    if (rf & 2) {
      \u0275\u0275property("ngIf", ctx.editing);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.editing);
    }
  },
  dependencies: [NgIf, NgTemplateOutlet],
  encapsulation: 2
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CellEditor, [{
    type: Component,
    args: [{
      selector: "p-cellEditor",
      template: `
        <ng-container *ngIf="editing">
            <ng-container *ngTemplateOutlet="inputTemplate"></ng-container>
        </ng-container>
        <ng-container *ngIf="!editing">
            <ng-container *ngTemplateOutlet="outputTemplate"></ng-container>
        </ng-container>
    `,
      encapsulation: ViewEncapsulation.None,
      host: {
        class: "p-element"
      }
    }]
  }], function() {
    return [{
      type: Table
    }, {
      type: EditableColumn,
      decorators: [{
        type: Optional
      }]
    }, {
      type: EditableRow,
      decorators: [{
        type: Optional
      }]
    }];
  }, {
    templates: [{
      type: ContentChildren,
      args: [PrimeTemplate]
    }]
  });
})();
var TableRadioButton = class {
  constructor(dt, cd) {
    this.dt = dt;
    this.cd = cd;
    this.subscription = this.dt.tableService.selectionSource$.subscribe(() => {
      this.checked = this.dt.isSelected(this.value);
      this.cd.markForCheck();
    });
  }
  ngOnInit() {
    this.checked = this.dt.isSelected(this.value);
  }
  onClick(event) {
    if (!this.disabled) {
      this.dt.toggleRowWithRadio({
        originalEvent: event,
        rowIndex: this.index
      }, this.value);
      this.inputViewChild.nativeElement?.focus();
    }
    DomHandler.clearSelection();
  }
  onFocus() {
    this.focused = true;
  }
  onBlur() {
    this.focused = false;
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
};
TableRadioButton.\u0275fac = function TableRadioButton_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || TableRadioButton)(\u0275\u0275directiveInject(Table), \u0275\u0275directiveInject(ChangeDetectorRef));
};
TableRadioButton.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
  type: TableRadioButton,
  selectors: [["p-tableRadioButton"]],
  viewQuery: function TableRadioButton_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c222, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.inputViewChild = _t.first);
    }
  },
  hostAttrs: [1, "p-element"],
  inputs: {
    disabled: "disabled",
    value: "value",
    index: "index",
    inputId: "inputId",
    name: "name",
    ariaLabel: "ariaLabel"
  },
  standalone: false,
  decls: 7,
  vars: 16,
  consts: [["rb", ""], ["box", ""], [1, "p-radiobutton", "p-component", 3, "click", "ngClass"], [1, "p-hidden-accessible"], ["type", "radio", 3, "focus", "blur", "checked", "disabled"], ["role", "radio", 3, "ngClass"], [1, "p-radiobutton-icon"]],
  template: function TableRadioButton_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 2);
      \u0275\u0275listener("click", function TableRadioButton_Template_div_click_0_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onClick($event));
      });
      \u0275\u0275elementStart(1, "div", 3)(2, "input", 4, 0);
      \u0275\u0275listener("focus", function TableRadioButton_Template_input_focus_2_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onFocus());
      })("blur", function TableRadioButton_Template_input_blur_2_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onBlur());
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(4, "div", 5, 1);
      \u0275\u0275element(6, "div", 6);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275property("ngClass", \u0275\u0275pureFunction3(8, _c232, ctx.focused, ctx.checked, ctx.disabled));
      \u0275\u0275advance(2);
      \u0275\u0275property("checked", ctx.checked)("disabled", ctx.disabled);
      \u0275\u0275attribute("id", ctx.inputId)("name", ctx.name)("aria-label", ctx.ariaLabel);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngClass", \u0275\u0275pureFunction3(12, _c242, ctx.checked, ctx.focused, ctx.disabled));
      \u0275\u0275attribute("aria-checked", ctx.checked);
    }
  },
  dependencies: [NgClass],
  encapsulation: 2,
  changeDetection: 0
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TableRadioButton, [{
    type: Component,
    args: [{
      selector: "p-tableRadioButton",
      template: `
        <div class="p-radiobutton p-component" [ngClass]="{ 'p-radiobutton-focused': focused, 'p-radiobutton-checked': checked, 'p-radiobutton-disabled': disabled }" (click)="onClick($event)">
            <div class="p-hidden-accessible">
                <input #rb type="radio" [attr.id]="inputId" [attr.name]="name" [checked]="checked" (focus)="onFocus()" (blur)="onBlur()" [disabled]="disabled" [attr.aria-label]="ariaLabel" />
            </div>
            <div #box [ngClass]="{ 'p-radiobutton-box p-component': true, 'p-highlight': checked, 'p-focus': focused, 'p-disabled': disabled }" role="radio" [attr.aria-checked]="checked">
                <div class="p-radiobutton-icon"></div>
            </div>
        </div>
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      host: {
        class: "p-element"
      }
    }]
  }], function() {
    return [{
      type: Table
    }, {
      type: ChangeDetectorRef
    }];
  }, {
    disabled: [{
      type: Input
    }],
    value: [{
      type: Input
    }],
    index: [{
      type: Input
    }],
    inputId: [{
      type: Input
    }],
    name: [{
      type: Input
    }],
    ariaLabel: [{
      type: Input
    }],
    inputViewChild: [{
      type: ViewChild,
      args: ["rb"]
    }]
  });
})();
var TableCheckbox = class {
  constructor(dt, tableService, cd) {
    this.dt = dt;
    this.tableService = tableService;
    this.cd = cd;
    this.subscription = this.dt.tableService.selectionSource$.subscribe(() => {
      this.checked = this.dt.isSelected(this.value);
      this.cd.markForCheck();
    });
  }
  ngOnInit() {
    this.checked = this.dt.isSelected(this.value);
  }
  onClick(event) {
    if (!this.disabled) {
      this.dt.toggleRowWithCheckbox({
        originalEvent: event,
        rowIndex: this.index
      }, this.value);
    }
    DomHandler.clearSelection();
  }
  onFocus() {
    this.focused = true;
  }
  onBlur() {
    this.focused = false;
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
};
TableCheckbox.\u0275fac = function TableCheckbox_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || TableCheckbox)(\u0275\u0275directiveInject(Table), \u0275\u0275directiveInject(TableService), \u0275\u0275directiveInject(ChangeDetectorRef));
};
TableCheckbox.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
  type: TableCheckbox,
  selectors: [["p-tableCheckbox"]],
  hostAttrs: [1, "p-element"],
  inputs: {
    disabled: "disabled",
    value: "value",
    index: "index",
    inputId: "inputId",
    name: "name",
    required: "required",
    ariaLabel: "ariaLabel"
  },
  standalone: false,
  decls: 7,
  vars: 18,
  consts: [["box", ""], [1, "p-checkbox", "p-component", 3, "click", "ngClass"], [1, "p-hidden-accessible"], ["type", "checkbox", 3, "focus", "blur", "checked", "disabled"], ["role", "checkbox", 3, "ngClass"], [4, "ngIf"], [3, "styleClass", 4, "ngIf"], [3, "styleClass"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"]],
  template: function TableCheckbox_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1);
      \u0275\u0275listener("click", function TableCheckbox_Template_div_click_0_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onClick($event));
      });
      \u0275\u0275elementStart(1, "div", 2)(2, "input", 3);
      \u0275\u0275listener("focus", function TableCheckbox_Template_input_focus_2_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onFocus());
      })("blur", function TableCheckbox_Template_input_blur_2_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onBlur());
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(3, "div", 4, 0);
      \u0275\u0275template(5, TableCheckbox_ng_container_5_Template, 2, 1, "ng-container", 5)(6, TableCheckbox_span_6_Template, 2, 4, "span", 5);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(11, _c252, ctx.focused, ctx.disabled));
      \u0275\u0275advance(2);
      \u0275\u0275property("checked", ctx.checked)("disabled", ctx.disabled);
      \u0275\u0275attribute("id", ctx.inputId)("name", ctx.name)("required", ctx.required)("aria-label", ctx.ariaLabel);
      \u0275\u0275advance();
      \u0275\u0275property("ngClass", \u0275\u0275pureFunction3(14, _c262, ctx.checked, ctx.focused, ctx.disabled));
      \u0275\u0275attribute("aria-checked", ctx.checked);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", !ctx.dt.checkboxIconTemplate);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.dt.checkboxIconTemplate);
    }
  },
  dependencies: () => [NgClass, NgIf, NgTemplateOutlet, CheckIcon],
  encapsulation: 2,
  changeDetection: 0
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TableCheckbox, [{
    type: Component,
    args: [{
      selector: "p-tableCheckbox",
      template: `
        <div class="p-checkbox p-component" [ngClass]="{ 'p-checkbox-focused': focused, 'p-checkbox-disabled': disabled }" (click)="onClick($event)">
            <div class="p-hidden-accessible">
                <input type="checkbox" [attr.id]="inputId" [attr.name]="name" [checked]="checked" (focus)="onFocus()" (blur)="onBlur()" [disabled]="disabled" [attr.required]="required" [attr.aria-label]="ariaLabel" />
            </div>
            <div #box [ngClass]="{ 'p-checkbox-box p-component': true, 'p-highlight': checked, 'p-focus': focused, 'p-disabled': disabled }" role="checkbox" [attr.aria-checked]="checked">
                <ng-container *ngIf="!dt.checkboxIconTemplate">
                    <CheckIcon [styleClass]="'p-checkbox-icon'" *ngIf="checked"/>
                </ng-container>
                <span *ngIf="dt.checkboxIconTemplate">
                    <ng-template *ngTemplateOutlet="dt.checkboxIconTemplate; context: { $implicit: checked }"></ng-template>
                </span>
            </div>
        </div>
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      host: {
        class: "p-element"
      }
    }]
  }], function() {
    return [{
      type: Table
    }, {
      type: TableService
    }, {
      type: ChangeDetectorRef
    }];
  }, {
    disabled: [{
      type: Input
    }],
    value: [{
      type: Input
    }],
    index: [{
      type: Input
    }],
    inputId: [{
      type: Input
    }],
    name: [{
      type: Input
    }],
    required: [{
      type: Input
    }],
    ariaLabel: [{
      type: Input
    }]
  });
})();
var TableHeaderCheckbox = class {
  constructor(dt, tableService, cd) {
    this.dt = dt;
    this.tableService = tableService;
    this.cd = cd;
    this.valueChangeSubscription = this.dt.tableService.valueSource$.subscribe(() => {
      this.checked = this.updateCheckedState();
    });
    this.selectionChangeSubscription = this.dt.tableService.selectionSource$.subscribe(() => {
      this.checked = this.updateCheckedState();
    });
  }
  ngOnInit() {
    this.checked = this.updateCheckedState();
  }
  onClick(event) {
    if (!this.disabled) {
      if (this.dt.value && this.dt.value.length > 0) {
        this.dt.toggleRowsWithCheckbox(event, !this.checked);
      }
    }
    DomHandler.clearSelection();
  }
  onFocus() {
    this.focused = true;
  }
  onBlur() {
    this.focused = false;
  }
  isDisabled() {
    return this.disabled || !this.dt.value || !this.dt.value.length;
  }
  ngOnDestroy() {
    if (this.selectionChangeSubscription) {
      this.selectionChangeSubscription.unsubscribe();
    }
    if (this.valueChangeSubscription) {
      this.valueChangeSubscription.unsubscribe();
    }
  }
  updateCheckedState() {
    this.cd.markForCheck();
    if (this.dt._selectAll !== null) {
      return this.dt._selectAll;
    } else {
      const data = this.dt.selectionPageOnly ? this.dt.dataToRender(this.dt.processedData) : this.dt.processedData;
      const val = this.dt.frozenValue ? [...this.dt.frozenValue, ...data] : data;
      const selectableVal = this.dt.rowSelectable ? val.filter((data2, index) => this.dt.rowSelectable({
        data: data2,
        index
      })) : val;
      return ObjectUtils.isNotEmpty(selectableVal) && ObjectUtils.isNotEmpty(this.dt.selection) && selectableVal.every((v) => this.dt.selection.some((s) => this.dt.equals(v, s)));
    }
  }
};
TableHeaderCheckbox.\u0275fac = function TableHeaderCheckbox_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || TableHeaderCheckbox)(\u0275\u0275directiveInject(Table), \u0275\u0275directiveInject(TableService), \u0275\u0275directiveInject(ChangeDetectorRef));
};
TableHeaderCheckbox.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
  type: TableHeaderCheckbox,
  selectors: [["p-tableHeaderCheckbox"]],
  hostAttrs: [1, "p-element"],
  inputs: {
    disabled: "disabled",
    inputId: "inputId",
    name: "name",
    ariaLabel: "ariaLabel"
  },
  standalone: false,
  decls: 8,
  vars: 17,
  consts: [["cb", ""], ["box", ""], [1, "p-checkbox", "p-component", 3, "click", "ngClass"], [1, "p-hidden-accessible"], ["type", "checkbox", 3, "focus", "blur", "checked", "disabled"], ["role", "checkbox", 3, "ngClass"], [4, "ngIf"], ["class", "p-checkbox-icon", 4, "ngIf"], [3, "styleClass", 4, "ngIf"], [3, "styleClass"], [1, "p-checkbox-icon"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"]],
  template: function TableHeaderCheckbox_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 2);
      \u0275\u0275listener("click", function TableHeaderCheckbox_Template_div_click_0_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onClick($event));
      });
      \u0275\u0275elementStart(1, "div", 3)(2, "input", 4, 0);
      \u0275\u0275listener("focus", function TableHeaderCheckbox_Template_input_focus_2_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onFocus());
      })("blur", function TableHeaderCheckbox_Template_input_blur_2_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onBlur());
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(4, "div", 5, 1);
      \u0275\u0275template(6, TableHeaderCheckbox_ng_container_6_Template, 2, 1, "ng-container", 6)(7, TableHeaderCheckbox_span_7_Template, 2, 4, "span", 7);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(10, _c252, ctx.focused, ctx.isDisabled()));
      \u0275\u0275advance(2);
      \u0275\u0275property("checked", ctx.checked)("disabled", ctx.isDisabled());
      \u0275\u0275attribute("id", ctx.inputId)("name", ctx.name)("aria-label", ctx.ariaLabel);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngClass", \u0275\u0275pureFunction3(13, _c272, ctx.checked, ctx.focused, ctx.isDisabled()));
      \u0275\u0275attribute("aria-checked", ctx.checked);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", !ctx.dt.headerCheckboxIconTemplate);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.dt.headerCheckboxIconTemplate);
    }
  },
  dependencies: () => [NgClass, NgIf, NgTemplateOutlet, CheckIcon],
  encapsulation: 2,
  changeDetection: 0
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TableHeaderCheckbox, [{
    type: Component,
    args: [{
      selector: "p-tableHeaderCheckbox",
      template: `
        <div class="p-checkbox p-component" [ngClass]="{ 'p-checkbox-focused': focused, 'p-checkbox-disabled': isDisabled() }" (click)="onClick($event)">
            <div class="p-hidden-accessible">
                <input #cb type="checkbox" [attr.id]="inputId" [attr.name]="name" [checked]="checked" (focus)="onFocus()" (blur)="onBlur()" [disabled]="isDisabled()" [attr.aria-label]="ariaLabel" />
            </div>
            <div #box [ngClass]="{ 'p-checkbox-box': true, 'p-highlight': checked, 'p-focus': focused, 'p-disabled': isDisabled() }" role="checkbox" [attr.aria-checked]="checked">
                <ng-container *ngIf="!dt.headerCheckboxIconTemplate">
                    <CheckIcon *ngIf="checked" [styleClass]="'p-checkbox-icon'"/>
                </ng-container>
                <span class="p-checkbox-icon" *ngIf="dt.headerCheckboxIconTemplate">
                    <ng-template *ngTemplateOutlet="dt.headerCheckboxIconTemplate; context: { $implicit: checked }"></ng-template>
                </span>
            </div>
        </div>
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      host: {
        class: "p-element"
      }
    }]
  }], function() {
    return [{
      type: Table
    }, {
      type: TableService
    }, {
      type: ChangeDetectorRef
    }];
  }, {
    disabled: [{
      type: Input
    }],
    inputId: [{
      type: Input
    }],
    name: [{
      type: Input
    }],
    ariaLabel: [{
      type: Input
    }]
  });
})();
var ReorderableRowHandle = class {
  constructor(el) {
    this.el = el;
  }
  ngAfterViewInit() {
    DomHandler.addClass(this.el.nativeElement, "p-datatable-reorderablerow-handle");
  }
};
ReorderableRowHandle.\u0275fac = function ReorderableRowHandle_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || ReorderableRowHandle)(\u0275\u0275directiveInject(ElementRef));
};
ReorderableRowHandle.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
  type: ReorderableRowHandle,
  selectors: [["", "pReorderableRowHandle", ""]],
  hostAttrs: [1, "p-element"],
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReorderableRowHandle, [{
    type: Directive,
    args: [{
      selector: "[pReorderableRowHandle]",
      host: {
        class: "p-element"
      }
    }]
  }], function() {
    return [{
      type: ElementRef
    }];
  }, null);
})();
var ReorderableRow = class {
  constructor(renderer, dt, el, zone) {
    this.renderer = renderer;
    this.dt = dt;
    this.el = el;
    this.zone = zone;
  }
  ngAfterViewInit() {
    if (this.isEnabled()) {
      this.el.nativeElement.droppable = true;
      this.bindEvents();
    }
  }
  bindEvents() {
    this.zone.runOutsideAngular(() => {
      this.mouseDownListener = this.renderer.listen(this.el.nativeElement, "mousedown", this.onMouseDown.bind(this));
      this.dragStartListener = this.renderer.listen(this.el.nativeElement, "dragstart", this.onDragStart.bind(this));
      this.dragEndListener = this.renderer.listen(this.el.nativeElement, "dragend", this.onDragEnd.bind(this));
      this.dragOverListener = this.renderer.listen(this.el.nativeElement, "dragover", this.onDragOver.bind(this));
      this.dragLeaveListener = this.renderer.listen(this.el.nativeElement, "dragleave", this.onDragLeave.bind(this));
    });
  }
  unbindEvents() {
    if (this.mouseDownListener) {
      this.mouseDownListener();
      this.mouseDownListener = null;
    }
    if (this.dragStartListener) {
      this.dragStartListener();
      this.dragStartListener = null;
    }
    if (this.dragEndListener) {
      this.dragEndListener();
      this.dragEndListener = null;
    }
    if (this.dragOverListener) {
      this.dragOverListener();
      this.dragOverListener = null;
    }
    if (this.dragLeaveListener) {
      this.dragLeaveListener();
      this.dragLeaveListener = null;
    }
  }
  onMouseDown(event) {
    if (DomHandler.hasClass(event.target, "p-datatable-reorderablerow-handle")) this.el.nativeElement.draggable = true;
    else this.el.nativeElement.draggable = false;
  }
  onDragStart(event) {
    this.dt.onRowDragStart(event, this.index);
  }
  onDragEnd(event) {
    this.dt.onRowDragEnd(event);
    this.el.nativeElement.draggable = false;
  }
  onDragOver(event) {
    this.dt.onRowDragOver(event, this.index, this.el.nativeElement);
    event.preventDefault();
  }
  onDragLeave(event) {
    this.dt.onRowDragLeave(event, this.el.nativeElement);
  }
  isEnabled() {
    return this.pReorderableRowDisabled !== true;
  }
  onDrop(event) {
    if (this.isEnabled() && this.dt.rowDragging) {
      this.dt.onRowDrop(event, this.el.nativeElement);
    }
    event.preventDefault();
  }
  ngOnDestroy() {
    this.unbindEvents();
  }
};
ReorderableRow.\u0275fac = function ReorderableRow_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || ReorderableRow)(\u0275\u0275directiveInject(Renderer2), \u0275\u0275directiveInject(Table), \u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(NgZone));
};
ReorderableRow.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
  type: ReorderableRow,
  selectors: [["", "pReorderableRow", ""]],
  hostAttrs: [1, "p-element"],
  hostBindings: function ReorderableRow_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("drop", function ReorderableRow_drop_HostBindingHandler($event) {
        return ctx.onDrop($event);
      });
    }
  },
  inputs: {
    index: [0, "pReorderableRow", "index"],
    pReorderableRowDisabled: "pReorderableRowDisabled"
  },
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReorderableRow, [{
    type: Directive,
    args: [{
      selector: "[pReorderableRow]",
      host: {
        class: "p-element"
      }
    }]
  }], function() {
    return [{
      type: Renderer2
    }, {
      type: Table
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, {
    index: [{
      type: Input,
      args: ["pReorderableRow"]
    }],
    pReorderableRowDisabled: [{
      type: Input
    }],
    onDrop: [{
      type: HostListener,
      args: ["drop", ["$event"]]
    }]
  });
})();
var ColumnFilter = class {
  constructor(document2, el, dt, renderer, config, overlayService) {
    this.document = document2;
    this.el = el;
    this.dt = dt;
    this.renderer = renderer;
    this.config = config;
    this.overlayService = overlayService;
    this.type = "text";
    this.display = "row";
    this.showMenu = true;
    this.operator = FilterOperator.AND;
    this.showOperator = true;
    this.showClearButton = true;
    this.showApplyButton = true;
    this.showMatchModes = true;
    this.showAddButton = true;
    this.hideOnClear = false;
    this.maxConstraints = 2;
    this.useGrouping = true;
    this.showButtons = true;
    this.window = this.document.defaultView;
  }
  ngOnInit() {
    if (!this.dt.filters[this.field]) {
      this.initFieldFilterConstraint();
    }
    this.translationSubscription = this.config.translationObserver.subscribe(() => {
      this.generateMatchModeOptions();
      this.generateOperatorOptions();
    });
    this.resetSubscription = this.dt.tableService.resetSource$.subscribe(() => {
      this.initFieldFilterConstraint();
    });
    this.generateMatchModeOptions();
    this.generateOperatorOptions();
  }
  generateMatchModeOptions() {
    this.matchModes = this.matchModeOptions || this.config.filterMatchModeOptions[this.type]?.map((key) => {
      return {
        label: this.config.getTranslation(key),
        value: key
      };
    });
  }
  generateOperatorOptions() {
    this.operatorOptions = [{
      label: this.config.getTranslation(TranslationKeys.MATCH_ALL),
      value: FilterOperator.AND
    }, {
      label: this.config.getTranslation(TranslationKeys.MATCH_ANY),
      value: FilterOperator.OR
    }];
  }
  ngAfterContentInit() {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case "header":
          this.headerTemplate = item.template;
          break;
        case "filter":
          this.filterTemplate = item.template;
          break;
        case "footer":
          this.footerTemplate = item.template;
          break;
        case "filtericon":
          this.filterIconTemplate = item.template;
          break;
        case "removeruleicon":
          this.removeRuleIconTemplate = item.template;
          break;
        case "addruleicon":
          this.addRuleIconTemplate = item.template;
          break;
        default:
          this.filterTemplate = item.template;
          break;
      }
    });
  }
  initFieldFilterConstraint() {
    let defaultMatchMode = this.getDefaultMatchMode();
    this.dt.filters[this.field] = this.display == "row" ? {
      value: null,
      matchMode: defaultMatchMode
    } : [{
      value: null,
      matchMode: defaultMatchMode,
      operator: this.operator
    }];
  }
  onMenuMatchModeChange(value, filterMeta) {
    filterMeta.matchMode = value;
    if (!this.showApplyButton) {
      this.dt._filter();
    }
  }
  onRowMatchModeChange(matchMode) {
    this.dt.filters[this.field].matchMode = matchMode;
    this.dt._filter();
    this.hide();
  }
  onRowMatchModeKeyDown(event) {
    let item = event.target;
    switch (event.key) {
      case "ArrowDown":
        var nextItem = this.findNextItem(item);
        if (nextItem) {
          item.removeAttribute("tabindex");
          nextItem.tabIndex = "0";
          nextItem.focus();
        }
        event.preventDefault();
        break;
      case "ArrowUp":
        var prevItem = this.findPrevItem(item);
        if (prevItem) {
          item.removeAttribute("tabindex");
          prevItem.tabIndex = "0";
          prevItem.focus();
        }
        event.preventDefault();
        break;
    }
  }
  onRowClearItemClick() {
    this.clearFilter();
    this.hide();
  }
  isRowMatchModeSelected(matchMode) {
    return this.dt.filters[this.field].matchMode === matchMode;
  }
  addConstraint() {
    this.dt.filters[this.field].push({
      value: null,
      matchMode: this.getDefaultMatchMode(),
      operator: this.getDefaultOperator()
    });
  }
  removeConstraint(filterMeta) {
    this.dt.filters[this.field] = this.dt.filters[this.field].filter((meta) => meta !== filterMeta);
    this.dt._filter();
  }
  onOperatorChange(value) {
    this.dt.filters[this.field].forEach((filterMeta) => {
      filterMeta.operator = value;
      this.operator = value;
    });
    if (!this.showApplyButton) {
      this.dt._filter();
    }
  }
  toggleMenu() {
    this.overlayVisible = !this.overlayVisible;
  }
  onToggleButtonKeyDown(event) {
    switch (event.key) {
      case "Escape":
      case "Tab":
        this.overlayVisible = false;
        break;
      case "ArrowDown":
        if (this.overlayVisible) {
          let focusable = DomHandler.getFocusableElements(this.overlay);
          if (focusable) {
            focusable[0].focus();
          }
          event.preventDefault();
        } else if (event.altKey) {
          this.overlayVisible = true;
          event.preventDefault();
        }
        break;
    }
  }
  onEscape() {
    this.overlayVisible = false;
    this.icon.nativeElement.focus();
  }
  findNextItem(item) {
    let nextItem = item.nextElementSibling;
    if (nextItem) return DomHandler.hasClass(nextItem, "p-column-filter-separator") ? this.findNextItem(nextItem) : nextItem;
    else return item.parentElement.firstElementChild;
  }
  findPrevItem(item) {
    let prevItem = item.previousElementSibling;
    if (prevItem) return DomHandler.hasClass(prevItem, "p-column-filter-separator") ? this.findPrevItem(prevItem) : prevItem;
    else return item.parentElement.lastElementChild;
  }
  onContentClick() {
    this.selfClick = true;
  }
  onOverlayAnimationStart(event) {
    switch (event.toState) {
      case "visible":
        this.overlay = event.element;
        this.renderer.appendChild(this.document.body, this.overlay);
        zindexutils.set("overlay", this.overlay, this.config.zIndex.overlay);
        DomHandler.absolutePosition(this.overlay, this.icon.nativeElement);
        this.bindDocumentClickListener();
        this.bindDocumentResizeListener();
        this.bindScrollListener();
        this.overlayEventListener = (e) => {
          if (this.overlay && this.overlay.contains(e.target)) {
            this.selfClick = true;
          }
        };
        this.overlaySubscription = this.overlayService.clickObservable.subscribe(this.overlayEventListener);
        break;
      case "void":
        this.onOverlayHide();
        if (this.overlaySubscription) {
          this.overlaySubscription.unsubscribe();
        }
        break;
    }
  }
  onOverlayAnimationEnd(event) {
    switch (event.toState) {
      case "void":
        zindexutils.clear(event.element);
        break;
    }
  }
  getDefaultMatchMode() {
    if (this.matchMode) {
      return this.matchMode;
    } else {
      if (this.type === "text") return FilterMatchMode.STARTS_WITH;
      else if (this.type === "numeric") return FilterMatchMode.EQUALS;
      else if (this.type === "date") return FilterMatchMode.DATE_IS;
      else return FilterMatchMode.CONTAINS;
    }
  }
  getDefaultOperator() {
    return this.dt.filters ? this.dt.filters[this.field][0].operator : this.operator;
  }
  hasRowFilter() {
    return this.dt.filters[this.field] && !this.dt.isFilterBlank(this.dt.filters[this.field].value);
  }
  get fieldConstraints() {
    return this.dt.filters ? this.dt.filters[this.field] : null;
  }
  get showRemoveIcon() {
    return this.fieldConstraints ? this.fieldConstraints.length > 1 : false;
  }
  get showMenuButton() {
    return this.showMenu && (this.display === "row" ? this.type !== "boolean" : true);
  }
  get isShowOperator() {
    return this.showOperator && this.type !== "boolean";
  }
  get isShowAddConstraint() {
    return this.showAddButton && this.type !== "boolean" && this.fieldConstraints && this.fieldConstraints.length < this.maxConstraints;
  }
  get applyButtonLabel() {
    return this.config.getTranslation(TranslationKeys.APPLY);
  }
  get clearButtonLabel() {
    return this.config.getTranslation(TranslationKeys.CLEAR);
  }
  get addRuleButtonLabel() {
    return this.config.getTranslation(TranslationKeys.ADD_RULE);
  }
  get removeRuleButtonLabel() {
    return this.config.getTranslation(TranslationKeys.REMOVE_RULE);
  }
  get noFilterLabel() {
    return this.config.getTranslation(TranslationKeys.NO_FILTER);
  }
  hasFilter() {
    let fieldFilter = this.dt.filters[this.field];
    if (fieldFilter) {
      if (Array.isArray(fieldFilter)) return !this.dt.isFilterBlank(fieldFilter[0].value);
      else return !this.dt.isFilterBlank(fieldFilter.value);
    }
    return false;
  }
  isOutsideClicked(event) {
    return !(this.overlay.isSameNode(event.target) || this.overlay.contains(event.target) || this.icon.nativeElement.isSameNode(event.target) || this.icon.nativeElement.contains(event.target) || DomHandler.hasClass(event.target, "p-column-filter-add-button") || DomHandler.hasClass(event.target.parentElement, "p-column-filter-add-button") || DomHandler.hasClass(event.target, "p-column-filter-remove-button") || DomHandler.hasClass(event.target.parentElement, "p-column-filter-remove-button"));
  }
  bindDocumentClickListener() {
    if (!this.documentClickListener) {
      const documentTarget = this.el ? this.el.nativeElement.ownerDocument : "document";
      this.documentClickListener = this.renderer.listen(documentTarget, "click", (event) => {
        if (this.overlayVisible && !this.selfClick && this.isOutsideClicked(event)) {
          this.hide();
        }
        this.selfClick = false;
      });
    }
  }
  unbindDocumentClickListener() {
    if (this.documentClickListener) {
      this.documentClickListener();
      this.documentClickListener = null;
      this.selfClick = false;
    }
  }
  bindDocumentResizeListener() {
    if (!this.documentResizeListener) {
      this.documentResizeListener = this.renderer.listen(this.window, "resize", (event) => {
        if (this.overlayVisible && !DomHandler.isTouchDevice()) {
          this.hide();
        }
      });
    }
  }
  unbindDocumentResizeListener() {
    if (this.documentResizeListener) {
      this.documentResizeListener();
      this.documentResizeListener = null;
    }
  }
  bindScrollListener() {
    if (!this.scrollHandler) {
      this.scrollHandler = new ConnectedOverlayScrollHandler(this.icon.nativeElement, () => {
        if (this.overlayVisible) {
          this.hide();
        }
      });
    }
    this.scrollHandler.bindScrollListener();
  }
  unbindScrollListener() {
    if (this.scrollHandler) {
      this.scrollHandler.unbindScrollListener();
    }
  }
  hide() {
    this.overlayVisible = false;
  }
  onOverlayHide() {
    this.unbindDocumentClickListener();
    this.unbindDocumentResizeListener();
    this.unbindScrollListener();
    this.overlay = null;
  }
  clearFilter() {
    this.initFieldFilterConstraint();
    this.dt._filter();
    if (this.hideOnClear) this.hide();
  }
  applyFilter() {
    this.dt._filter();
    this.hide();
  }
  ngOnDestroy() {
    if (this.overlay) {
      this.renderer.appendChild(this.el.nativeElement, this.overlay);
      zindexutils.clear(this.overlay);
      this.onOverlayHide();
    }
    if (this.translationSubscription) {
      this.translationSubscription.unsubscribe();
    }
    if (this.resetSubscription) {
      this.resetSubscription.unsubscribe();
    }
    if (this.overlaySubscription) {
      this.overlaySubscription.unsubscribe();
    }
  }
};
ColumnFilter.\u0275fac = function ColumnFilter_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || ColumnFilter)(\u0275\u0275directiveInject(DOCUMENT), \u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(Table), \u0275\u0275directiveInject(Renderer2), \u0275\u0275directiveInject(PrimeNGConfig), \u0275\u0275directiveInject(OverlayService));
};
ColumnFilter.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
  type: ColumnFilter,
  selectors: [["p-columnFilter"]],
  contentQueries: function ColumnFilter_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      \u0275\u0275contentQuery(dirIndex, PrimeTemplate, 4);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.templates = _t);
    }
  },
  viewQuery: function ColumnFilter_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c28, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.icon = _t.first);
    }
  },
  hostAttrs: [1, "p-element"],
  inputs: {
    field: "field",
    type: "type",
    display: "display",
    showMenu: "showMenu",
    matchMode: "matchMode",
    operator: "operator",
    showOperator: "showOperator",
    showClearButton: "showClearButton",
    showApplyButton: "showApplyButton",
    showMatchModes: "showMatchModes",
    showAddButton: "showAddButton",
    hideOnClear: "hideOnClear",
    placeholder: "placeholder",
    matchModeOptions: "matchModeOptions",
    maxConstraints: "maxConstraints",
    minFractionDigits: "minFractionDigits",
    maxFractionDigits: "maxFractionDigits",
    prefix: "prefix",
    suffix: "suffix",
    locale: "locale",
    localeMatcher: "localeMatcher",
    currency: "currency",
    currencyDisplay: "currencyDisplay",
    useGrouping: "useGrouping",
    showButtons: "showButtons"
  },
  standalone: false,
  decls: 5,
  vars: 8,
  consts: [["icon", ""], ["menu", ""], [1, "p-column-filter", 3, "ngClass"], ["class", "p-fluid", 3, "type", "field", "filterConstraint", "filterTemplate", "placeholder", "minFractionDigits", "maxFractionDigits", "prefix", "suffix", "locale", "localeMatcher", "currency", "currencyDisplay", "useGrouping", "showButtons", 4, "ngIf"], ["type", "button", "class", "p-column-filter-menu-button p-link", "aria-haspopup", "true", 3, "ngClass", "click", "keydown", 4, "ngIf"], ["type", "button", "class", "p-column-filter-clear-button p-link", 3, "ngClass", "click", 4, "ngIf"], [3, "ngClass", "click", "keydown.escape", 4, "ngIf"], [1, "p-fluid", 3, "type", "field", "filterConstraint", "filterTemplate", "placeholder", "minFractionDigits", "maxFractionDigits", "prefix", "suffix", "locale", "localeMatcher", "currency", "currencyDisplay", "useGrouping", "showButtons"], ["type", "button", "aria-haspopup", "true", 1, "p-column-filter-menu-button", "p-link", 3, "click", "keydown", "ngClass"], [3, "styleClass", 4, "ngIf"], ["class", "pi-filter-icon", 4, "ngIf"], [3, "styleClass"], [1, "pi-filter-icon"], [4, "ngTemplateOutlet"], ["type", "button", 1, "p-column-filter-clear-button", "p-link", 3, "click", "ngClass"], [4, "ngIf"], [3, "click", "keydown.escape", "ngClass"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], ["class", "p-column-filter-row-items", 4, "ngIf", "ngIfElse"], [1, "p-column-filter-row-items"], ["class", "p-column-filter-row-item", 3, "ngClass", "click", "keydown", "keydown.enter", 4, "ngFor", "ngForOf"], [1, "p-column-filter-separator"], [1, "p-column-filter-row-item", 3, "click", "keydown", "keydown.enter"], [1, "p-column-filter-row-item", 3, "click", "keydown", "keydown.enter", "ngClass"], ["class", "p-column-filter-operator", 4, "ngIf"], [1, "p-column-filter-constraints"], ["class", "p-column-filter-constraint", 4, "ngFor", "ngForOf"], ["class", "p-column-filter-add-rule", 4, "ngIf"], [1, "p-column-filter-buttonbar"], ["type", "button", "pButton", "", "class", "p-button-outlined p-button-sm", "pRipple", "", 3, "label", "click", 4, "ngIf"], ["type", "button", "pButton", "", "class", "p-button-sm", "pRipple", "", 3, "label", "click", 4, "ngIf"], [1, "p-column-filter-operator"], ["styleClass", "p-column-filter-operator-dropdown", 3, "ngModelChange", "options", "ngModel"], [1, "p-column-filter-constraint"], ["styleClass", "p-column-filter-matchmode-dropdown", 3, "options", "ngModel", "ngModelChange", 4, "ngIf"], [3, "type", "field", "filterConstraint", "filterTemplate", "placeholder", "minFractionDigits", "maxFractionDigits", "prefix", "suffix", "locale", "localeMatcher", "currency", "currencyDisplay", "useGrouping"], ["type", "button", "pButton", "", "class", "p-column-filter-remove-button p-button-text p-button-danger p-button-sm", "pRipple", "", 3, "label", "click", 4, "ngIf"], ["styleClass", "p-column-filter-matchmode-dropdown", 3, "ngModelChange", "options", "ngModel"], ["type", "button", "pButton", "", "pRipple", "", 1, "p-column-filter-remove-button", "p-button-text", "p-button-danger", "p-button-sm", 3, "click", "label"], [1, "p-column-filter-add-rule"], ["type", "button", "pButton", "", "pRipple", "", 1, "p-column-filter-add-button", "p-button-text", "p-button-sm", 3, "click", "label"], ["type", "button", "pButton", "", "pRipple", "", 1, "p-button-outlined", "p-button-sm", 3, "click", "label"], ["type", "button", "pButton", "", "pRipple", "", 1, "p-button-sm", 3, "click", "label"]],
  template: function ColumnFilter_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 2);
      \u0275\u0275template(1, ColumnFilter_p_columnFilterFormElement_1_Template, 1, 15, "p-columnFilterFormElement", 3)(2, ColumnFilter_button_2_Template, 4, 7, "button", 4)(3, ColumnFilter_button_3_Template, 4, 5, "button", 5)(4, ColumnFilter_div_4_Template, 6, 14, "div", 6);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(5, _c29, ctx.display === "row", ctx.display === "menu"));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.display === "row");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showMenuButton);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showClearButton && ctx.display === "row");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showMenu && ctx.overlayVisible);
    }
  },
  dependencies: () => [NgClass, NgForOf, NgIf, NgTemplateOutlet, Dropdown, NgControlStatus, NgModel, ButtonDirective, FilterIcon, ColumnFilterFormElement],
  encapsulation: 2,
  data: {
    animation: [trigger("overlayAnimation", [transition(":enter", [style({
      opacity: 0,
      transform: "scaleY(0.8)"
    }), animate(".12s cubic-bezier(0, 0, 0.2, 1)")]), transition(":leave", [animate(".1s linear", style({
      opacity: 0
    }))])])]
  }
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ColumnFilter, [{
    type: Component,
    args: [{
      selector: "p-columnFilter",
      template: `
        <div class="p-column-filter" [ngClass]="{ 'p-column-filter-row': display === 'row', 'p-column-filter-menu': display === 'menu' }">
            <p-columnFilterFormElement
                *ngIf="display === 'row'"
                class="p-fluid"
                [type]="type"
                [field]="field"
                [filterConstraint]="dt.filters[field]"
                [filterTemplate]="filterTemplate"
                [placeholder]="placeholder"
                [minFractionDigits]="minFractionDigits"
                [maxFractionDigits]="maxFractionDigits"
                [prefix]="prefix"
                [suffix]="suffix"
                [locale]="locale"
                [localeMatcher]="localeMatcher"
                [currency]="currency"
                [currencyDisplay]="currencyDisplay"
                [useGrouping]="useGrouping"
                [showButtons]="showButtons"
            ></p-columnFilterFormElement>
            <button
                #icon
                *ngIf="showMenuButton"
                type="button"
                class="p-column-filter-menu-button p-link"
                aria-haspopup="true"
                [attr.aria-expanded]="overlayVisible"
                [ngClass]="{ 'p-column-filter-menu-button-open': overlayVisible, 'p-column-filter-menu-button-active': hasFilter() }"
                (click)="toggleMenu()"
                (keydown)="onToggleButtonKeyDown($event)"
            >
                <FilterIcon [styleClass]="'pi-filter-icon'" *ngIf="!filterIconTemplate"/>
                <span class="pi-filter-icon" *ngIf="filterIconTemplate">
                    <ng-template *ngTemplateOutlet="filterIconTemplate"></ng-template>
                </span>
            </button>
            <button #icon *ngIf="showClearButton && display === 'row'" [ngClass]="{ 'p-hidden-space': !hasRowFilter() }" type="button" class="p-column-filter-clear-button p-link" (click)="clearFilter()">
                <FilterSlashIcon *ngIf="!clearIconTemplate"/>
                <ng-template *ngTemplateOutlet="clearFilterIcon"></ng-template>
            </button>
            <div
                *ngIf="showMenu && overlayVisible"
                [ngClass]="{ 'p-column-filter-overlay p-component p-fluid': true, 'p-column-filter-overlay-menu': display === 'menu' }"
                (click)="onContentClick()"
                [@overlayAnimation]="'visible'"
                (@overlayAnimation.start)="onOverlayAnimationStart($event)"
                (@overlayAnimation.done)="onOverlayAnimationEnd($event)"
                (keydown.escape)="onEscape()"
            >
                <ng-container *ngTemplateOutlet="headerTemplate; context: { $implicit: field }"></ng-container>
                <ul *ngIf="display === 'row'; else menu" class="p-column-filter-row-items">
                    <li
                        class="p-column-filter-row-item"
                        *ngFor="let matchMode of matchModes; let i = index"
                        (click)="onRowMatchModeChange(matchMode.value)"
                        (keydown)="onRowMatchModeKeyDown($event)"
                        (keydown.enter)="this.onRowMatchModeChange(matchMode.value)"
                        [ngClass]="{ 'p-highlight': isRowMatchModeSelected(matchMode.value) }"
                        [attr.tabindex]="i === 0 ? '0' : null"
                    >
                        {{ matchMode.label }}
                    </li>
                    <li class="p-column-filter-separator"></li>
                    <li class="p-column-filter-row-item" (click)="onRowClearItemClick()" (keydown)="onRowMatchModeKeyDown($event)" (keydown.enter)="onRowClearItemClick()">{{ noFilterLabel }}</li>
                </ul>
                <ng-template #menu>
                    <div class="p-column-filter-operator" *ngIf="isShowOperator">
                        <p-dropdown [options]="operatorOptions" [ngModel]="operator" (ngModelChange)="onOperatorChange($event)" styleClass="p-column-filter-operator-dropdown"></p-dropdown>
                    </div>
                    <div class="p-column-filter-constraints">
                        <div *ngFor="let fieldConstraint of fieldConstraints; let i = index" class="p-column-filter-constraint">
                            <p-dropdown
                                *ngIf="showMatchModes && matchModes"
                                [options]="matchModes"
                                [ngModel]="fieldConstraint.matchMode"
                                (ngModelChange)="onMenuMatchModeChange($event, fieldConstraint)"
                                styleClass="p-column-filter-matchmode-dropdown"
                            ></p-dropdown>
                            <p-columnFilterFormElement
                                [type]="type"
                                [field]="field"
                                [filterConstraint]="fieldConstraint"
                                [filterTemplate]="filterTemplate"
                                [placeholder]="placeholder"
                                [minFractionDigits]="minFractionDigits"
                                [maxFractionDigits]="maxFractionDigits"
                                [prefix]="prefix"
                                [suffix]="suffix"
                                [locale]="locale"
                                [localeMatcher]="localeMatcher"
                                [currency]="currency"
                                [currencyDisplay]="currencyDisplay"
                                [useGrouping]="useGrouping"
                            ></p-columnFilterFormElement>
                            <div>
                                <button
                                    *ngIf="showRemoveIcon"
                                    type="button"
                                    pButton
                                    class="p-column-filter-remove-button p-button-text p-button-danger p-button-sm"
                                    (click)="removeConstraint(fieldConstraint)"
                                    pRipple
                                    [label]="removeRuleButtonLabel"
                                >
                                    <TrashIcon *ngIf="!removeRuleIconTemplate"/>
                                    <ng-template *ngTemplateOutlet="removeRuleIconTemplate"></ng-template>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="p-column-filter-add-rule" *ngIf="isShowAddConstraint">
                        <button type="button" pButton [label]="addRuleButtonLabel" class="p-column-filter-add-button p-button-text p-button-sm" (click)="addConstraint()" pRipple>
                            <PlusIcon *ngIf="!addRuleIconTemplate"/>
                            <ng-template *ngTemplateOutlet="addRuleIconTemplate"></ng-template>
                        </button>
                    </div>
                    <div class="p-column-filter-buttonbar">
                        <button *ngIf="showClearButton" type="button" pButton class="p-button-outlined p-button-sm" (click)="clearFilter()" [label]="clearButtonLabel" pRipple></button>
                        <button *ngIf="showApplyButton" type="button" pButton (click)="applyFilter()" class="p-button-sm" [label]="applyButtonLabel" pRipple></button>
                    </div>
                </ng-template>
                <ng-container *ngTemplateOutlet="footerTemplate; context: { $implicit: field }"></ng-container>
            </div>
        </div>
    `,
      animations: [trigger("overlayAnimation", [transition(":enter", [style({
        opacity: 0,
        transform: "scaleY(0.8)"
      }), animate(".12s cubic-bezier(0, 0, 0.2, 1)")]), transition(":leave", [animate(".1s linear", style({
        opacity: 0
      }))])])],
      encapsulation: ViewEncapsulation.None,
      host: {
        class: "p-element"
      }
    }]
  }], function() {
    return [{
      type: Document,
      decorators: [{
        type: Inject,
        args: [DOCUMENT]
      }]
    }, {
      type: ElementRef
    }, {
      type: Table
    }, {
      type: Renderer2
    }, {
      type: PrimeNGConfig
    }, {
      type: OverlayService
    }];
  }, {
    field: [{
      type: Input
    }],
    type: [{
      type: Input
    }],
    display: [{
      type: Input
    }],
    showMenu: [{
      type: Input
    }],
    matchMode: [{
      type: Input
    }],
    operator: [{
      type: Input
    }],
    showOperator: [{
      type: Input
    }],
    showClearButton: [{
      type: Input
    }],
    showApplyButton: [{
      type: Input
    }],
    showMatchModes: [{
      type: Input
    }],
    showAddButton: [{
      type: Input
    }],
    hideOnClear: [{
      type: Input
    }],
    placeholder: [{
      type: Input
    }],
    matchModeOptions: [{
      type: Input
    }],
    maxConstraints: [{
      type: Input
    }],
    minFractionDigits: [{
      type: Input
    }],
    maxFractionDigits: [{
      type: Input
    }],
    prefix: [{
      type: Input
    }],
    suffix: [{
      type: Input
    }],
    locale: [{
      type: Input
    }],
    localeMatcher: [{
      type: Input
    }],
    currency: [{
      type: Input
    }],
    currencyDisplay: [{
      type: Input
    }],
    useGrouping: [{
      type: Input
    }],
    showButtons: [{
      type: Input
    }],
    icon: [{
      type: ViewChild,
      args: ["icon"]
    }],
    templates: [{
      type: ContentChildren,
      args: [PrimeTemplate]
    }]
  });
})();
var ColumnFilterFormElement = class {
  constructor(dt, colFilter) {
    this.dt = dt;
    this.colFilter = colFilter;
    this.useGrouping = true;
  }
  get showButtons() {
    return this.colFilter.showButtons;
  }
  ngOnInit() {
    this.filterCallback = (value) => {
      this.filterConstraint.value = value;
      this.dt._filter();
    };
  }
  onModelChange(value) {
    this.filterConstraint.value = value;
    if (this.type === "boolean" || value === "") {
      this.dt._filter();
    }
  }
  onTextInputEnterKeyDown(event) {
    this.dt._filter();
    event.preventDefault();
  }
  onNumericInputKeyDown(event) {
    if (event.key === "Enter") {
      this.dt._filter();
      event.preventDefault();
    }
  }
};
ColumnFilterFormElement.\u0275fac = function ColumnFilterFormElement_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || ColumnFilterFormElement)(\u0275\u0275directiveInject(Table), \u0275\u0275directiveInject(ColumnFilter));
};
ColumnFilterFormElement.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
  type: ColumnFilterFormElement,
  selectors: [["p-columnFilterFormElement"]],
  hostAttrs: [1, "p-element"],
  inputs: {
    field: "field",
    type: "type",
    filterConstraint: "filterConstraint",
    filterTemplate: "filterTemplate",
    placeholder: "placeholder",
    minFractionDigits: "minFractionDigits",
    maxFractionDigits: "maxFractionDigits",
    prefix: "prefix",
    suffix: "suffix",
    locale: "locale",
    localeMatcher: "localeMatcher",
    currency: "currency",
    currencyDisplay: "currencyDisplay",
    useGrouping: "useGrouping"
  },
  standalone: false,
  decls: 3,
  vars: 2,
  consts: [["builtInElement", ""], [4, "ngIf", "ngIfElse"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [3, "ngSwitch"], ["type", "text", "pInputText", "", 3, "value", "input", "keydown.enter", 4, "ngSwitchCase"], [3, "ngModel", "showButtons", "minFractionDigits", "maxFractionDigits", "prefix", "suffix", "placeholder", "mode", "locale", "localeMatcher", "currency", "currencyDisplay", "useGrouping", "ngModelChange", "onKeyDown", 4, "ngSwitchCase"], [3, "ngModel", "ngModelChange", 4, "ngSwitchCase"], [3, "placeholder", "ngModel", "ngModelChange", 4, "ngSwitchCase"], ["type", "text", "pInputText", "", 3, "input", "keydown.enter", "value"], [3, "ngModelChange", "onKeyDown", "ngModel", "showButtons", "minFractionDigits", "maxFractionDigits", "prefix", "suffix", "placeholder", "mode", "locale", "localeMatcher", "currency", "currencyDisplay", "useGrouping"], [3, "ngModelChange", "ngModel"], [3, "ngModelChange", "placeholder", "ngModel"]],
  template: function ColumnFilterFormElement_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275template(0, ColumnFilterFormElement_ng_container_0_Template, 2, 19, "ng-container", 1)(1, ColumnFilterFormElement_ng_template_1_Template, 5, 5, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      const builtInElement_r6 = \u0275\u0275reference(2);
      \u0275\u0275property("ngIf", ctx.filterTemplate)("ngIfElse", builtInElement_r6);
    }
  },
  dependencies: [NgIf, NgTemplateOutlet, NgSwitch, NgSwitchCase, InputNumber, NgControlStatus, NgModel, InputText, Calendar, TriStateCheckbox],
  encapsulation: 2
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ColumnFilterFormElement, [{
    type: Component,
    args: [{
      selector: "p-columnFilterFormElement",
      template: `
        <ng-container *ngIf="filterTemplate; else builtInElement">
            <ng-container
                *ngTemplateOutlet="
                    filterTemplate;
                    context: {
                        $implicit: filterConstraint.value,
                        filterCallback: filterCallback,
                        type: type,
                        field: field,
                        filterConstraint: filterConstraint,
                        placeholder: placeholder,
                        minFractionDigits: minFractionDigits,
                        maxFractionDigits: maxFractionDigits,
                        prefix: prefix,
                        suffix: suffix,
                        locale: locale,
                        localeMatcher: localeMatcher,
                        currency: currency,
                        currencyDisplay: currencyDisplay,
                        useGrouping: useGrouping,
                        showButtons: showButtons
                    }
                "
            ></ng-container>
        </ng-container>
        <ng-template #builtInElement>
            <ng-container [ngSwitch]="type">
                <input *ngSwitchCase="'text'" type="text" pInputText [value]="filterConstraint?.value" (input)="onModelChange($event.target.value)" (keydown.enter)="onTextInputEnterKeyDown($event)" [attr.placeholder]="placeholder" />
                <p-inputNumber
                    *ngSwitchCase="'numeric'"
                    [ngModel]="filterConstraint?.value"
                    (ngModelChange)="onModelChange($event)"
                    (onKeyDown)="onNumericInputKeyDown($event)"
                    [showButtons]="showButtons"
                    [minFractionDigits]="minFractionDigits"
                    [maxFractionDigits]="maxFractionDigits"
                    [prefix]="prefix"
                    [suffix]="suffix"
                    [placeholder]="placeholder"
                    [mode]="currency ? 'currency' : 'decimal'"
                    [locale]="locale"
                    [localeMatcher]="localeMatcher"
                    [currency]="currency"
                    [currencyDisplay]="currencyDisplay"
                    [useGrouping]="useGrouping"
                ></p-inputNumber>
                <p-triStateCheckbox *ngSwitchCase="'boolean'" [ngModel]="filterConstraint?.value" (ngModelChange)="onModelChange($event)"></p-triStateCheckbox>
                <p-calendar *ngSwitchCase="'date'" [placeholder]="placeholder" [ngModel]="filterConstraint?.value" (ngModelChange)="onModelChange($event)"></p-calendar>
            </ng-container>
        </ng-template>
    `,
      encapsulation: ViewEncapsulation.None,
      host: {
        class: "p-element"
      }
    }]
  }], function() {
    return [{
      type: Table
    }, {
      type: ColumnFilter
    }];
  }, {
    field: [{
      type: Input
    }],
    type: [{
      type: Input
    }],
    filterConstraint: [{
      type: Input
    }],
    filterTemplate: [{
      type: Input
    }],
    placeholder: [{
      type: Input
    }],
    minFractionDigits: [{
      type: Input
    }],
    maxFractionDigits: [{
      type: Input
    }],
    prefix: [{
      type: Input
    }],
    suffix: [{
      type: Input
    }],
    locale: [{
      type: Input
    }],
    localeMatcher: [{
      type: Input
    }],
    currency: [{
      type: Input
    }],
    currencyDisplay: [{
      type: Input
    }],
    useGrouping: [{
      type: Input
    }]
  });
})();
var TableModule = class {
};
TableModule.\u0275fac = function TableModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || TableModule)();
};
TableModule.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: TableModule,
  declarations: [Table, SortableColumn, FrozenColumn, RowGroupHeader, SelectableRow, RowToggler, ContextMenuRow, ResizableColumn, ReorderableColumn, EditableColumn, CellEditor, TableBody, SortIcon, TableRadioButton, TableCheckbox, TableHeaderCheckbox, ReorderableRowHandle, ReorderableRow, SelectableRowDblClick, EditableRow, InitEditableRow, SaveEditableRow, CancelEditableRow, ColumnFilter, ColumnFilterFormElement],
  imports: [CommonModule, PaginatorModule, InputTextModule, DropdownModule, FormsModule, ButtonModule, SelectButtonModule, CalendarModule, InputNumberModule, TriStateCheckboxModule, ScrollerModule, ArrowDownIcon, ArrowUpIcon, SpinnerIcon, SortAltIcon, SortAmountUpAltIcon, SortAmountDownIcon, CheckIcon, FilterIcon],
  exports: [Table, SharedModule, SortableColumn, FrozenColumn, RowGroupHeader, SelectableRow, RowToggler, ContextMenuRow, ResizableColumn, ReorderableColumn, EditableColumn, CellEditor, SortIcon, TableRadioButton, TableCheckbox, TableHeaderCheckbox, ReorderableRowHandle, ReorderableRow, SelectableRowDblClick, EditableRow, InitEditableRow, SaveEditableRow, CancelEditableRow, ColumnFilter, ColumnFilterFormElement, ScrollerModule]
});
TableModule.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
  imports: [CommonModule, PaginatorModule, InputTextModule, DropdownModule, FormsModule, ButtonModule, SelectButtonModule, CalendarModule, InputNumberModule, TriStateCheckboxModule, ScrollerModule, ArrowDownIcon, ArrowUpIcon, SpinnerIcon, SortAltIcon, SortAmountUpAltIcon, SortAmountDownIcon, CheckIcon, FilterIcon, SharedModule, ScrollerModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TableModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, PaginatorModule, InputTextModule, DropdownModule, FormsModule, ButtonModule, SelectButtonModule, CalendarModule, InputNumberModule, TriStateCheckboxModule, ScrollerModule, ArrowDownIcon, ArrowUpIcon, SpinnerIcon, SortAltIcon, SortAmountUpAltIcon, SortAmountDownIcon, CheckIcon, FilterIcon],
      exports: [Table, SharedModule, SortableColumn, FrozenColumn, RowGroupHeader, SelectableRow, RowToggler, ContextMenuRow, ResizableColumn, ReorderableColumn, EditableColumn, CellEditor, SortIcon, TableRadioButton, TableCheckbox, TableHeaderCheckbox, ReorderableRowHandle, ReorderableRow, SelectableRowDblClick, EditableRow, InitEditableRow, SaveEditableRow, CancelEditableRow, ColumnFilter, ColumnFilterFormElement, ScrollerModule],
      declarations: [Table, SortableColumn, FrozenColumn, RowGroupHeader, SelectableRow, RowToggler, ContextMenuRow, ResizableColumn, ReorderableColumn, EditableColumn, CellEditor, TableBody, SortIcon, TableRadioButton, TableCheckbox, TableHeaderCheckbox, ReorderableRowHandle, ReorderableRow, SelectableRowDblClick, EditableRow, InitEditableRow, SaveEditableRow, CancelEditableRow, ColumnFilter, ColumnFilterFormElement]
    }]
  }], null, null);
})();

// src/app/pages/publisher-list/table-primeng/table-primeng.component.ts
function TablePrimengComponent_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 3)(1, "th");
    \u0275\u0275text(2, "Publicador");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "th");
    \u0275\u0275text(4, "Documento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "Correo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "Tel\xE9fono");
    \u0275\u0275elementEnd();
    \u0275\u0275element(9, "th");
    \u0275\u0275elementEnd();
  }
}
function TablePrimengComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td", 4)(2, "div", 5)(3, "div", 6);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 7)(6, "div", 8);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 9);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(10, "td");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "td", 10)(17, "p-button", 11);
    \u0275\u0275listener("onClick", function TablePrimengComponent_ng_template_2_Template_p_button_onClick_17_listener() {
      const item_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectedEdit(item_r2));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "p-button", 12);
    \u0275\u0275listener("onClick", function TablePrimengComponent_ng_template_2_Template_p_button_onClick_18_listener() {
      const item_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.delete(item_r2));
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275classProp("avatar--female", ctx_r2.isFemale(item_r2.gender));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (item_r2.fullName == null ? null : item_r2.fullName.charAt(0)) || "?", " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r2.fullName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("ID: ", item_r2.id, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r2.documentNumber);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r2.email);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r2.phone);
  }
}
var TablePrimengComponent = class _TablePrimengComponent {
  constructor() {
    this.publisherList = [];
    this.scrollHeight = "650px";
    this.onSelected = new EventEmitter();
    this.onDelete = new EventEmitter();
    this.selectedSize = "";
  }
  isFemale(gender) {
    return gender?.trim().toLocaleLowerCase() === "femenino";
  }
  ngOnInit() {
  }
  selectedEdit(item) {
    this.onSelected.emit(item);
  }
  delete(item) {
    this.onDelete.emit(item);
  }
  static {
    this.\u0275fac = function TablePrimengComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TablePrimengComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TablePrimengComponent, selectors: [["vmc-table-primeng"]], inputs: { publisherList: "publisherList", scrollHeight: "scrollHeight" }, outputs: { onSelected: "onSelected", onDelete: "onDelete" }, decls: 3, vars: 3, consts: [["styleClass", "jw-table", 3, "value", "scrollable", "scrollHeight"], ["pTemplate", "header"], ["pTemplate", "body"], [1, "color"], [1, "publisher-cell"], [1, "publisher-info"], [1, "avatar"], [1, "publisher-text"], [1, "name"], [1, "id"], [1, "actions"], ["icon", "pi pi-user-edit", "styleClass", "p-button-rounded p-button-text action-edit", 3, "onClick"], ["icon", "pi pi-trash", "styleClass", "p-button-rounded p-button-text action-delete", 3, "onClick"]], template: function TablePrimengComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "p-table", 0);
        \u0275\u0275template(1, TablePrimengComponent_ng_template_1_Template, 10, 0, "ng-template", 1)(2, TablePrimengComponent_ng_template_2_Template, 19, 8, "ng-template", 2);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275property("value", ctx.publisherList)("scrollable", true)("scrollHeight", ctx.scrollHeight);
      }
    }, dependencies: [TableModule, Table, PrimeTemplate, ButtonModule, Button], styles: ["\n\n.jw-table[_ngcontent-%COMP%] {\n  border-radius: 12px;\n  overflow: hidden;\n}\n.jw-table[_ngcontent-%COMP%]   .p-datatable-thead[_ngcontent-%COMP%]    > tr[_ngcontent-%COMP%]    > th[_ngcontent-%COMP%] {\n  background: #f5f7fa;\n  color: #3a6ea5;\n  font-weight: 600;\n  padding: 16px;\n  border-bottom: 2px solid #e5e7eb;\n}\n.jw-table[_ngcontent-%COMP%]   .p-datatable-tbody[_ngcontent-%COMP%]    > tr[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 10px;\n  transition: all 0.2s ease;\n}\n.jw-table[_ngcontent-%COMP%]   .p-datatable-tbody[_ngcontent-%COMP%]    > tr[_ngcontent-%COMP%]:hover {\n  background: #f7f9fc;\n  transform: scale(1.002);\n}\n.jw-table[_ngcontent-%COMP%]   .p-datatable-tbody[_ngcontent-%COMP%]    > tr[_ngcontent-%COMP%]    > td[_ngcontent-%COMP%] {\n  padding: 16px;\n  border-bottom: 1px solid #f1f3f5;\n}\n.publisher-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.avatar[_ngcontent-%COMP%] {\n  width: 38px;\n  height: 38px;\n  border-radius: 50%;\n  background: #3a6ea5;\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 600;\n}\n.avatar--female[_ngcontent-%COMP%] {\n  background: #d85b93;\n}\n.publisher-text[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n.publisher-text[_ngcontent-%COMP%]   .id[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #7a7a7a;\n}\n.actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  justify-content: center;\n}\n.action-edit[_ngcontent-%COMP%] {\n  color: #3a6ea5;\n}\n.action-delete[_ngcontent-%COMP%] {\n  color: #d64545;\n}\n.action-edit[_ngcontent-%COMP%]:hover {\n  background: rgba(58, 110, 165, 0.1);\n}\n.action-delete[_ngcontent-%COMP%]:hover {\n  background: rgba(214, 69, 69, 0.1);\n}\n.color[_ngcontent-%COMP%] {\n  background-color: #3a6ea5;\n}\n/*# sourceMappingURL=table-primeng.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TablePrimengComponent, [{
    type: Component,
    args: [{ selector: "vmc-table-primeng", imports: [TableModule, ButtonModule], template: '<p-table [value]="publisherList" styleClass="jw-table" [scrollable]="true" [scrollHeight]="scrollHeight">\n\n  <ng-template pTemplate="header">\n    <tr class="color">\n      <th>Publicador</th>\n      <th>Documento</th>\n      <th>Correo</th>\n      <th>Tel\xE9fono</th>\n      <th></th>\n    </tr>\n  </ng-template>\n\n  <ng-template pTemplate="body" let-item>\n    <tr>\n\n      <td class="publisher-cell">\n        <div class="publisher-info">\n\n          <div class="avatar" [class.avatar--female]="isFemale(item.gender)">\n            {{ item.fullName?.charAt(0) || "?" }}\n          </div>\n\n          <div class="publisher-text">\n            <div class="name">{{ item.fullName }}</div>\n            <div class="id">ID: {{ item.id }}</div>\n          </div>\n\n        </div>\n      </td>\n\n      <td>{{ item.documentNumber }}</td>\n      <td>{{ item.email }}</td>\n      <td>{{ item.phone }}</td>\n\n      <td class="actions">\n\n        <p-button icon="pi pi-user-edit" (onClick)="selectedEdit(item)"\n          styleClass="p-button-rounded p-button-text action-edit">\n        </p-button>\n\n        <p-button icon="pi pi-trash" (onClick)="delete(item)" styleClass="p-button-rounded p-button-text action-delete">\n        </p-button>\n\n      </td>\n\n    </tr>\n  </ng-template>\n\n</p-table>\n', styles: ["/* src/app/pages/publisher-list/table-primeng/table-primeng.component.scss */\n.jw-table {\n  border-radius: 12px;\n  overflow: hidden;\n}\n.jw-table .p-datatable-thead > tr > th {\n  background: #f5f7fa;\n  color: #3a6ea5;\n  font-weight: 600;\n  padding: 16px;\n  border-bottom: 2px solid #e5e7eb;\n}\n.jw-table .p-datatable-tbody > tr {\n  background: white;\n  border-radius: 10px;\n  transition: all 0.2s ease;\n}\n.jw-table .p-datatable-tbody > tr:hover {\n  background: #f7f9fc;\n  transform: scale(1.002);\n}\n.jw-table .p-datatable-tbody > tr > td {\n  padding: 16px;\n  border-bottom: 1px solid #f1f3f5;\n}\n.publisher-info {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.avatar {\n  width: 38px;\n  height: 38px;\n  border-radius: 50%;\n  background: #3a6ea5;\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 600;\n}\n.avatar--female {\n  background: #d85b93;\n}\n.publisher-text .name {\n  font-weight: 600;\n}\n.publisher-text .id {\n  font-size: 12px;\n  color: #7a7a7a;\n}\n.actions {\n  display: flex;\n  gap: 6px;\n  justify-content: center;\n}\n.action-edit {\n  color: #3a6ea5;\n}\n.action-delete {\n  color: #d64545;\n}\n.action-edit:hover {\n  background: rgba(58, 110, 165, 0.1);\n}\n.action-delete:hover {\n  background: rgba(214, 69, 69, 0.1);\n}\n.color {\n  background-color: #3a6ea5;\n}\n/*# sourceMappingURL=table-primeng.component.css.map */\n"] }]
  }], null, { publisherList: [{
    type: Input
  }], scrollHeight: [{
    type: Input
  }], onSelected: [{
    type: Output
  }], onDelete: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TablePrimengComponent, { className: "TablePrimengComponent", filePath: "src/app/pages/publisher-list/table-primeng/table-primeng.component.ts", lineNumber: 12 });
})();

// src/app/pages/publisher-list/publisher-list.component.ts
var import_sweetalert2 = __toESM(require_sweetalert2_all());
function PublisherListComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275element(1, "mat-spinner", 11);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Cargando publicadores");
    \u0275\u0275elementEnd()();
  }
}
function PublisherListComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "mat-icon");
    \u0275\u0275text(2, "person_search");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4, "Sin publicadores");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "No hay registros para mostrar.");
    \u0275\u0275elementEnd()();
  }
}
function PublisherListComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 10)(1, "vmc-table-primeng", 12);
    \u0275\u0275listener("onSelected", function PublisherListComponent_Conditional_25_Template_vmc_table_primeng_onSelected_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.edit($event));
    })("onDelete", function PublisherListComponent_Conditional_25_Template_vmc_table_primeng_onDelete_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.delete($event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("publisherList", ctx_r1.filteredPublisherList);
  }
}
var PublisherListComponent = class _PublisherListComponent {
  constructor(dataService, loaderService, dialog) {
    this.dataService = dataService;
    this.loaderService = loaderService;
    this.dialog = dialog;
    this.showSpinner = true;
    this.publisherList = [];
    this.searchTerm = "";
    this.userService = inject(UsersService);
    this.subscrp();
  }
  subscrp() {
    this.dataService.getPubliherList$().subscribe((data) => {
      if (data) {
        this.publisherList = data;
      }
    });
    this.loaderService.getLoaderSearchPublisher$().subscribe((data) => {
      this.showSpinner = data;
    });
  }
  get filteredPublisherList() {
    const normalizedSearch = this.normalizeText(this.searchTerm);
    if (!normalizedSearch) {
      return this.publisherList;
    }
    return this.publisherList.filter((publisher) => this.normalizeText(publisher.fullName).includes(normalizedSearch));
  }
  normalizeText(value) {
    return (value ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase().trim();
  }
  edit(publisherSelected) {
    return __async(this, null, function* () {
      const { UsersCreateOrUpdateComponent } = yield import("./users-create-or-update.component-475TZ7KU.js");
      this.dialog.open(UsersCreateOrUpdateComponent, {
        data: { publisherId: publisherSelected.id },
        width: "min(1200px, 96vw)",
        maxWidth: "96vw",
        maxHeight: "92vh",
        autoFocus: false
      }).afterClosed().subscribe((savedPublisher) => {
        if (!savedPublisher?.id) {
          return;
        }
        this.publisherList = this.publisherList.map((publisher) => publisher.id === savedPublisher.id ? savedPublisher : publisher);
      });
    });
  }
  delete(publisherSelected) {
    import_sweetalert2.default.fire({
      title: "\xBFEst\xE1s seguro?",
      text: `Esta a punto de Borrar a ${publisherSelected.fullName}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "S\xED, b\xF3rralo!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.delete(publisherSelected).subscribe(() => {
          this.publisherList = this.publisherList.filter((p) => p.id !== publisherSelected.id);
          import_sweetalert2.default.fire({
            title: "Borrado",
            text: "Registro borrado correctamente.",
            icon: "success"
          });
        });
      }
    });
  }
  static {
    this.\u0275fac = function PublisherListComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _PublisherListComponent)(\u0275\u0275directiveInject(DataService), \u0275\u0275directiveInject(LoaderService), \u0275\u0275directiveInject(MatDialog));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PublisherListComponent, selectors: [["vmc-publisher-list"]], standalone: false, decls: 26, vars: 5, consts: [[1, "publisher-list-page"], [1, "publisher-header"], [1, "publisher-header__copy"], [1, "publisher-header__eyebrow"], [1, "directory-panel"], [1, "directory-panel__header"], [1, "publisher-search"], ["type", "search", "placeholder", "Buscar por nombre", "aria-label", "Buscar publicadores por nombre", 3, "input", "value"], ["aria-live", "polite", 1, "state-panel", "state-panel--loading"], [1, "state-panel"], [1, "table-shell"], ["diameter", "44"], ["scrollHeight", "calc(100vh - 300px)", 3, "onSelected", "onDelete", "publisherList"]], template: function PublisherListComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "main", 0)(1, "header", 1)(2, "div", 2)(3, "div", 3)(4, "mat-icon");
        \u0275\u0275text(5, "groups");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "span");
        \u0275\u0275text(7, "Directorio");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(8, "h1");
        \u0275\u0275text(9, "Publicadores");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "p");
        \u0275\u0275text(11);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(12, "section", 4)(13, "div", 5)(14, "div")(15, "h2");
        \u0275\u0275text(16, "Lista de publicadores");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "span");
        \u0275\u0275text(18);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(19, "label", 6)(20, "mat-icon");
        \u0275\u0275text(21, "search");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(22, "input", 7);
        \u0275\u0275listener("input", function PublisherListComponent_Template_input_input_22_listener($event) {
          return ctx.searchTerm = $event.target.value;
        });
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(23, PublisherListComponent_Conditional_23_Template, 4, 0, "div", 8)(24, PublisherListComponent_Conditional_24_Template, 7, 0, "div", 9)(25, PublisherListComponent_Conditional_25_Template, 2, 1, "div", 10);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(11);
        \u0275\u0275textInterpolate1("", ctx.publisherList.length, " registros disponibles");
        \u0275\u0275advance(7);
        \u0275\u0275textInterpolate2("", ctx.filteredPublisherList.length, " de ", ctx.publisherList.length, " registros");
        \u0275\u0275advance(4);
        \u0275\u0275property("value", ctx.searchTerm);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.showSpinner ? 23 : ctx.publisherList.length === 0 ? 24 : 25);
      }
    }, dependencies: [TablePrimengComponent, MatIcon, MatProgressSpinner], styles: ["\n\n.publisher-list-page[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n  height: 100%;\n  min-height: 0;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  padding: 32px;\n  color: var(--vmc-ink);\n  background:\n    linear-gradient(\n      180deg,\n      var(--vmc-accent-soft),\n      #f8fbff 42%,\n      var(--vmc-primary-soft));\n}\n.publisher-list-page[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-inline: auto;\n}\n.publisher-header[_ngcontent-%COMP%] {\n  margin-bottom: 18px;\n}\n.publisher-header__eyebrow[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  color: var(--vmc-primary-800);\n  font-weight: 700;\n  margin-bottom: 10px;\n  font-size: 13px;\n}\n.publisher-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--vmc-ink);\n  font-size: 38px;\n  font-weight: 800;\n}\n.publisher-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.directory-panel__header[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.state-panel[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.state-panel[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  margin: 6px 0 0;\n  color: #667085;\n  font-size: 15px;\n}\n.directory-panel[_ngcontent-%COMP%] {\n  border: 1px solid var(--vmc-line);\n  border-radius: 8px;\n  background: rgba(255, 255, 255, 0.94);\n  box-shadow: 0 14px 34px rgba(16, 24, 40, 0.08);\n}\n.directory-panel[_ngcontent-%COMP%] {\n  flex: 1;\n  min-height: 0;\n  overflow: hidden;\n}\n.directory-panel__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 20px;\n  padding: 20px 24px;\n  border-bottom: 1px solid #e5edf4;\n  background:\n    linear-gradient(\n      90deg,\n      #fff,\n      var(--vmc-accent-soft));\n}\n.publisher-search[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  width: min(100%, 330px);\n  padding: 9px 12px;\n  border: 1px solid #d0dce8;\n  border-radius: 8px;\n  color: #667085;\n  background: #fff;\n}\n.publisher-search[_ngcontent-%COMP%]:focus-within {\n  border-color: var(--vmc-primary);\n  box-shadow: 0 0 0 3px rgba(58, 110, 165, 0.14);\n}\n.publisher-search[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n  font-size: 20px;\n}\n.publisher-search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 0;\n  outline: 0;\n  color: var(--vmc-ink);\n  font: inherit;\n  background: transparent;\n}\n.directory-panel__header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], \n.state-panel[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #101828;\n  font-size: 20px;\n  font-weight: 800;\n}\n.table-shell[_ngcontent-%COMP%] {\n  padding: 8px;\n  overflow: hidden;\n}\n.state-panel[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  gap: 10px;\n  min-height: 360px;\n  padding: 40px 24px;\n  text-align: center;\n}\n.state-panel[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  width: 46px;\n  height: 46px;\n  color: var(--vmc-primary-800);\n  font-size: 46px;\n}\n@media (max-width: 900px) {\n  .publisher-list-page[_ngcontent-%COMP%] {\n    padding: 22px;\n  }\n  .directory-panel__header[_ngcontent-%COMP%] {\n    align-items: stretch;\n    flex-direction: column;\n    gap: 12px;\n  }\n  .publisher-search[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=publisher-list.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PublisherListComponent, [{
    type: Component,
    args: [{ selector: "vmc-publisher-list", standalone: false, template: '<main class="publisher-list-page">\n  <header class="publisher-header">\n    <div class="publisher-header__copy">\n      <div class="publisher-header__eyebrow">\n        <mat-icon>groups</mat-icon>\n        <span>Directorio</span>\n      </div>\n      <h1>Publicadores</h1>\n      <p>{{ publisherList.length }} registros disponibles</p>\n    </div>\n\n  </header>\n\n  <section class="directory-panel">\n    <div class="directory-panel__header">\n      <div>\n        <h2>Lista de publicadores</h2>\n        <span>{{ filteredPublisherList.length }} de {{ publisherList.length }} registros</span>\n      </div>\n      <label class="publisher-search">\n        <mat-icon>search</mat-icon>\n        <input\n          type="search"\n          [value]="searchTerm"\n          (input)="searchTerm = $any($event.target).value"\n          placeholder="Buscar por nombre"\n          aria-label="Buscar publicadores por nombre"\n        />\n      </label>\n    </div>\n\n    @if (showSpinner) {\n    <div class="state-panel state-panel--loading" aria-live="polite">\n      <mat-spinner diameter="44"></mat-spinner>\n      <span>Cargando publicadores</span>\n    </div>\n    } @else if (publisherList.length === 0) {\n    <div class="state-panel">\n      <mat-icon>person_search</mat-icon>\n      <h3>Sin publicadores</h3>\n      <p>No hay registros para mostrar.</p>\n    </div>\n    } @else {\n    <div class="table-shell">\n      <vmc-table-primeng\n        [publisherList]="filteredPublisherList"\n        scrollHeight="calc(100vh - 300px)"\n        (onSelected)="edit($event)"\n        (onDelete)="delete($event)"\n      ></vmc-table-primeng>\n    </div>\n\n    }\n  </section>\n</main>\n', styles: ["/* src/app/pages/publisher-list/publisher-list.component.scss */\n.publisher-list-page {\n  box-sizing: border-box;\n  height: 100%;\n  min-height: 0;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  padding: 32px;\n  color: var(--vmc-ink);\n  background:\n    linear-gradient(\n      180deg,\n      var(--vmc-accent-soft),\n      #f8fbff 42%,\n      var(--vmc-primary-soft));\n}\n.publisher-list-page > * {\n  width: 100%;\n  margin-inline: auto;\n}\n.publisher-header {\n  margin-bottom: 18px;\n}\n.publisher-header__eyebrow {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  color: var(--vmc-primary-800);\n  font-weight: 700;\n  margin-bottom: 10px;\n  font-size: 13px;\n}\n.publisher-header h1 {\n  margin: 0;\n  color: var(--vmc-ink);\n  font-size: 38px;\n  font-weight: 800;\n}\n.publisher-header p,\n.directory-panel__header span,\n.state-panel p,\n.state-panel span {\n  margin: 6px 0 0;\n  color: #667085;\n  font-size: 15px;\n}\n.directory-panel {\n  border: 1px solid var(--vmc-line);\n  border-radius: 8px;\n  background: rgba(255, 255, 255, 0.94);\n  box-shadow: 0 14px 34px rgba(16, 24, 40, 0.08);\n}\n.directory-panel {\n  flex: 1;\n  min-height: 0;\n  overflow: hidden;\n}\n.directory-panel__header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 20px;\n  padding: 20px 24px;\n  border-bottom: 1px solid #e5edf4;\n  background:\n    linear-gradient(\n      90deg,\n      #fff,\n      var(--vmc-accent-soft));\n}\n.publisher-search {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  width: min(100%, 330px);\n  padding: 9px 12px;\n  border: 1px solid #d0dce8;\n  border-radius: 8px;\n  color: #667085;\n  background: #fff;\n}\n.publisher-search:focus-within {\n  border-color: var(--vmc-primary);\n  box-shadow: 0 0 0 3px rgba(58, 110, 165, 0.14);\n}\n.publisher-search mat-icon {\n  width: 20px;\n  height: 20px;\n  font-size: 20px;\n}\n.publisher-search input {\n  width: 100%;\n  border: 0;\n  outline: 0;\n  color: var(--vmc-ink);\n  font: inherit;\n  background: transparent;\n}\n.directory-panel__header h2,\n.state-panel h3 {\n  margin: 0;\n  color: #101828;\n  font-size: 20px;\n  font-weight: 800;\n}\n.table-shell {\n  padding: 8px;\n  overflow: hidden;\n}\n.state-panel {\n  display: grid;\n  place-items: center;\n  gap: 10px;\n  min-height: 360px;\n  padding: 40px 24px;\n  text-align: center;\n}\n.state-panel mat-icon {\n  width: 46px;\n  height: 46px;\n  color: var(--vmc-primary-800);\n  font-size: 46px;\n}\n@media (max-width: 900px) {\n  .publisher-list-page {\n    padding: 22px;\n  }\n  .directory-panel__header {\n    align-items: stretch;\n    flex-direction: column;\n    gap: 12px;\n  }\n  .publisher-search {\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=publisher-list.component.css.map */\n"] }]
  }], () => [{ type: DataService }, { type: LoaderService }, { type: MatDialog }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PublisherListComponent, { className: "PublisherListComponent", filePath: "src/app/pages/publisher-list/publisher-list.component.ts", lineNumber: 19 });
})();

// src/app/core/constants/admin.constants.ts
var ADMIN_EMAILS = ["estarlin.elv@gmail.com"];
function isAdminEmail(email) {
  const normalizedEmail = email?.trim().toLowerCase();
  return Boolean(normalizedEmail && ADMIN_EMAILS.includes(normalizedEmail));
}

// src/app/pages/dashboard/dashboard.component.ts
var _c09 = ["snav"];
var _c113 = () => ({ tipo: "normal" });
var _c210 = () => ({ tipo: "landscape" });
var _forTrack0 = ($index, $item) => $item.label;
var _forTrack1 = ($index, $item) => $item.route + $item.label;
function DashboardComponent_Conditional_0_For_52_For_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 45);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_0_For_52_For_10_Template_button_click_0_listener() {
      const item_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.onMenuItemSelected(item_r5));
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("active", ctx_r2.isMenuItemActive(item_r5));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r5.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r5.label);
  }
}
function DashboardComponent_Conditional_0_For_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "button", 39)(1, "mat-icon", 40);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 41);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "mat-icon", 42);
    \u0275\u0275text(6, "chevron_right");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "mat-menu", 43, 2);
    \u0275\u0275repeaterCreate(9, DashboardComponent_Conditional_0_For_52_For_10_Template, 5, 4, "button", 44, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const group_r6 = ctx.$implicit;
    const groupMenu_r7 = \u0275\u0275reference(8);
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("active", ctx_r2.isMenuGroupActive(group_r6));
    \u0275\u0275property("matMenuTriggerFor", groupMenu_r7);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(group_r6.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(group_r6.label);
    \u0275\u0275advance(3);
    \u0275\u0275property("overlapTrigger", false);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(group_r6.items);
  }
}
function DashboardComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 4)(1, "mat-toolbar", 5)(2, "button", 6);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_0_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r1);
      const snav_r2 = \u0275\u0275reference(40);
      return \u0275\u0275resetView(snav_r2.toggle());
    });
    \u0275\u0275elementStart(3, "mat-icon");
    \u0275\u0275text(4, "menu");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 7)(6, "span", 8);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 9);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 10)(11, "a", 11);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(12, "svg", 12);
    \u0275\u0275element(13, "path", 13);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(14, "button", 14);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(15, "svg", 15);
    \u0275\u0275element(16, "g", 16)(17, "g", 17);
    \u0275\u0275elementStart(18, "g", 18)(19, "g");
    \u0275\u0275element(20, "path", 19)(21, "path", 20)(22, "path", 21)(23, "path", 22)(24, "path", 23)(25, "path", 24);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(26, "mat-menu", null, 0)(28, "button", 25);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_0_Template_button_click_28_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.goToPrint());
    });
    \u0275\u0275elementStart(29, "mat-icon");
    \u0275\u0275text(30, "crop_portrait");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "span");
    \u0275\u0275text(32, "Normal");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "button", 25);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_0_Template_button_click_33_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.goToPrint());
    });
    \u0275\u0275elementStart(34, "mat-icon");
    \u0275\u0275text(35, "crop_landscape");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "span");
    \u0275\u0275text(37, "Landscape");
    \u0275\u0275elementEnd()()()()()();
    \u0275\u0275elementStart(38, "mat-sidenav-container", 26)(39, "mat-sidenav", 27, 1);
    \u0275\u0275listener("backdropClick", function DashboardComponent_Conditional_0_Template_mat_sidenav_backdropClick_39_listener() {
      \u0275\u0275restoreView(_r1);
      const snav_r2 = \u0275\u0275reference(40);
      return \u0275\u0275resetView(snav_r2.close());
    });
    \u0275\u0275elementStart(41, "div", 28)(42, "div", 29)(43, "mat-icon");
    \u0275\u0275text(44, "menu_book");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(45, "div", 30)(46, "span", 31);
    \u0275\u0275text(47, "Vida y Ministerio");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "span", 32);
    \u0275\u0275text(49);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(50, "mat-nav-list", 33);
    \u0275\u0275repeaterCreate(51, DashboardComponent_Conditional_0_For_52_Template, 11, 6, null, null, _forTrack0);
    \u0275\u0275elementStart(53, "button", 34);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_0_Template_button_click_53_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      ctx_r2.logout();
      return \u0275\u0275resetView(ctx_r2.closeMenu());
    });
    \u0275\u0275elementStart(54, "mat-icon");
    \u0275\u0275text(55, "logout");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(56, "span");
    \u0275\u0275text(57, "Salir");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(58, "div", 35);
    \u0275\u0275elementStart(59, "div", 36);
    \u0275\u0275element(60, "img", 37);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(61, "mat-sidenav-content", 38);
    \u0275\u0275element(62, "router-outlet");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const printOptions_r8 = \u0275\u0275reference(27);
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("example-is-mobile", ctx_r2.mobileQuery.matches);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r2.superintendente.fullName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", ctx_r2.superintendente.fullName, " | ", ctx_r2.superintendente.congregation == null ? null : ctx_r2.superintendente.congregation.name, " ");
    \u0275\u0275advance(5);
    \u0275\u0275property("matMenuTriggerFor", printOptions_r8);
    \u0275\u0275advance(14);
    \u0275\u0275property("queryParams", \u0275\u0275pureFunction0(12, _c113));
    \u0275\u0275advance(5);
    \u0275\u0275property("queryParams", \u0275\u0275pureFunction0(13, _c210));
    \u0275\u0275advance(6);
    \u0275\u0275property("fixedInViewport", true)("opened", !ctx_r2.mobileQuery.matches)("mode", ctx_r2.mobileQuery.matches ? "over" : "side");
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(ctx_r2.congregation.name || "Panel");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.getVisibleMenuGroups());
  }
}
var DashboardComponent = class _DashboardComponent {
  constructor(dataService, meetingsService, router) {
    this.dataService = dataService;
    this.meetingsService = meetingsService;
    this.router = router;
    this.changeDetectorRef = inject(ChangeDetectorRef);
    this.mediaMatcher = inject(MediaMatcher);
    this.destroyRef = inject(DestroyRef);
    this.loaderService = inject(LoaderService);
    this.mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery = this.mediaMatcher.matchMedia("(max-width: 1366px)");
    this.shouldRun = true;
    this.programList = [];
    this.congregation = CongregationMock;
    this.isAdmin = false;
    this.menuGroups = [
      {
        label: "Programa",
        icon: "event",
        items: [{ label: "Entre semana", icon: "calendar_month", route: "/tablero/entre-semana" }]
      },
      {
        label: "Imprimir",
        icon: "print",
        items: [
          { label: "Normal", icon: "crop_portrait", route: "/tablero/imprimir", queryParams: { tipo: "normal" } },
          { label: "Landscape", icon: "crop_landscape", route: "/tablero/imprimir", queryParams: { tipo: "landscape" } }
        ]
      },
      {
        label: "Publicadores",
        icon: "groups",
        items: [
          { label: "Registro", icon: "person_add", route: "/tablero/publicador" },
          { label: "Lista", icon: "groups", route: "/tablero/publicadores" },
          { label: "Privilegios", icon: "vpn_key", route: "/tablero/privilegios", adminOnly: true }
        ]
      },
      {
        label: "Asignaciones",
        icon: "assignment",
        items: [
          {
            label: "Hoja de asignacion",
            icon: "assignment_turned_in",
            route: "/tablero/hojas-asignacion",
            beforeNavigate: () => this.goToPrint()
          },
          { label: "Notificaciones", icon: "notifications", route: "/tablero/notificaciones" }
        ]
      },
      {
        label: "Configuraciones",
        icon: "settings",
        adminOnly: true,
        items: [
          { label: "Congregaciones", icon: "holiday_village", route: "/tablero/congregaciones" },
          { label: "Administrador", icon: "admin_panel_settings", route: "/tablero/administrador" }
        ]
      }
    ];
  }
  ngOnInit() {
    this.loaderService.hideMatspinner();
    this.mobileQuery.addEventListener("change", this.mobileQueryListener);
    this.dataService.getConfigs();
    combineLatest([this.dataService.getPublisher(), this.dataService.getIsAdmin()]).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(([publisher, isAdmin]) => {
      this.superintendente = publisher;
      const publisherIsAdmin = isAdminEmail(publisher.email);
      this.isAdmin = Boolean(isAdmin || publisherIsAdmin);
      if (publisherIsAdmin && !isAdmin) {
        this.dataService.setIsAdmin(true);
      }
    });
    this.dataService.getCongregation$().pipe(takeUntilDestroyed(this.destroyRef), filter((congregation) => this.dataService.hasValidCongregation(congregation)), tap((congregation) => {
      this.congregation = congregation;
    }), switchMap((congregation) => this.meetingsService.getWeeksValids(congregation.id).pipe(catchError((error) => {
      console.error(error);
      return of([]);
    })))).subscribe((programs) => {
      this.programList = [...programs];
    });
  }
  ngOnDestroy() {
    this.mobileQuery.removeEventListener("change", this.mobileQueryListener);
  }
  logout() {
    this.dataService.logout();
  }
  goToPrint() {
    this.dataService.setMeeting([...this.programList]);
  }
  getVisibleMenuGroups() {
    return this.menuGroups.filter((group) => this.isVisible(group)).map((group) => __spreadProps(__spreadValues({}, group), {
      items: group.items.filter((item) => this.isVisible(item))
    })).filter((group) => group.items.length > 0);
  }
  onMenuItemSelected(item) {
    return __async(this, null, function* () {
      item.beforeNavigate?.();
      if (this.isAdmin) {
        this.dataService.setIsAdmin(true);
      }
      yield this.router.navigate([item.route], { queryParams: item.queryParams });
      this.closeMenu();
    });
  }
  isMenuItemActive(item) {
    const [currentPath, queryString = ""] = this.router.url.split("?");
    if (currentPath !== item.route) {
      return false;
    }
    if (!item.queryParams) {
      return true;
    }
    const currentParams = new URLSearchParams(queryString);
    return Object.entries(item.queryParams).every(([key, value]) => currentParams.get(key) === value);
  }
  isMenuGroupActive(group) {
    return group.items.some((item) => this.isMenuItemActive(item));
  }
  closeMenu() {
    if (this.mobileQuery.matches) {
      this.snav?.close();
    }
  }
  isVisible(item) {
    return !item.adminOnly || this.isAdmin;
  }
  static {
    this.\u0275fac = function DashboardComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DashboardComponent)(\u0275\u0275directiveInject(DataService), \u0275\u0275directiveInject(MeetingsService), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardComponent, selectors: [["vmc-dashboard"]], viewQuery: function DashboardComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c09, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.snav = _t.first);
      }
    }, standalone: false, decls: 1, vars: 1, consts: [["printOptions", "matMenu"], ["snav", ""], ["groupMenu", "matMenu"], [1, "example-container", 3, "example-is-mobile"], [1, "example-container"], ["color", "primary", 1, "example-toolbar"], ["mat-icon-button", "", 3, "click"], [1, "w-100", "d-flex", "justify-content-between", "align-items-center"], [1, "d-md-none", "pt-1"], [1, "d-none", "d-md-inline", "pt-1"], [1, "w-50", "w-md-25", "d-flex", "justify-content-end"], ["routerLink", "/tablero/entre-semana", 1, "me-5"], ["width", "32px", "height", "32px", "viewBox", "0 0 24 24", "fill", "none", "xmlns", "http://www.w3.org/2000/svg", "stroke", "#ffffff"], ["d", "M8 6L21 6.00078M8 12L21 12.0008M8 18L21 18.0007M3 6.5H4V5.5H3V6.5ZM3 12.5H4V11.5H3V12.5ZM3 18.5H4V17.5H3V18.5Z", "stroke", "#ffffff", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["type", "button", "aria-label", "Imprimir programas", 1, "dashboard-print-trigger", "me-5", 3, "matMenuTriggerFor"], ["version", "1.0", "id", "Layer_1", "xmlns", "http://www.w3.org/2000/svg", 0, "xmlns", "xlink", "http://www.w3.org/1999/xlink", "width", "32px", "height", "32px", "viewBox", "0 0 64.00 64.00", "enable-background", "new 0 0 64 64", 0, "xml", "space", "preserve", "fill", "#ffffff", "stroke", "#ffffff"], ["id", "SVGRepo_bgCarrier", "stroke-width", "0"], ["id", "SVGRepo_tracerCarrier", "stroke-linecap", "round", "stroke-linejoin", "round"], ["id", "SVGRepo_iconCarrier"], ["fill", "#ffffff", "d", "M60,12h-6V2c0-1.105-0.895-2-2-2H12c-1.105,0-2,0.895-2,2v10H4c-2.211,0-4,1.789-4,4v32 c0,2.211,1.789,4,4,4h6v10c0,1.105,0.895,2,2,2h40c1.105,0,2-0.895,2-2V52h6c2.211,0,4-1.789,4-4V16C64,13.789,62.211,12,60,12z M12,3c0-0.553,0.447-1,1-1h38c0.553,0,1,0.447,1,1v9H12V3z M52,61c0,0.553-0.447,1-1,1H13c-0.553,0-1-0.447-1-1V37 c0-0.553,0.447-1,1-1h38c0.553,0,1,0.447,1,1V61z M62,48c0,1.104-0.896,2-2,2h-6V36c0-1.105-0.895-2-2-2H12c-1.105,0-2,0.895-2,2 v14H4c-1.104,0-2-0.896-2-2V16c0-1.104,0.896-2,2-2h56c1.104,0,2,0.896,2,2V48z"], ["fill", "#ffffff", "d", "M19,44h12c0.553,0,1-0.447,1-1s-0.447-1-1-1H19c-0.553,0-1,0.447-1,1S18.447,44,19,44z"], ["fill", "#ffffff", "d", "M45,48H19c-0.553,0-1,0.447-1,1s0.447,1,1,1h26c0.553,0,1-0.447,1-1S45.553,48,45,48z"], ["fill", "#ffffff", "d", "M38,54H19c-0.553,0-1,0.447-1,1s0.447,1,1,1h19c0.553,0,1-0.447,1-1S38.553,54,38,54z"], ["fill", "#ffffff", "d", "M55,18c-1.657,0-3,1.343-3,3s1.343,3,3,3s3-1.343,3-3S56.657,18,55,18z M55,22c-0.553,0-1-0.447-1-1 s0.447-1,1-1s1,0.447,1,1S55.553,22,55,22z"], ["fill", "#ffffff", "d", "M45,18c-1.657,0-3,1.343-3,3s1.343,3,3,3s3-1.343,3-3S46.657,18,45,18z M45,22c-0.553,0-1-0.447-1-1 s0.447-1,1-1s1,0.447,1,1S45.553,22,45,22z"], ["mat-menu-item", "", "type", "button", "routerLink", "/tablero/imprimir", 3, "click", "queryParams"], [1, "sidenav-container"], ["mode", "side", "fixedTopGap", "56", 1, "sidenav", 3, "backdropClick", "fixedInViewport", "opened", "mode"], [1, "sidenav-header"], [1, "sidenav-header__mark"], [1, "sidenav-header__text"], [1, "title"], [1, "subtitle"], [1, "menu-list"], ["mat-list-item", "", "type", "button", 1, "logout", 3, "click"], [1, "divider"], [1, "sidenav-footer"], ["src", "./../../../assets/img/Logo.png", "width", "120", "alt", ""], [1, "content"], ["type", "button", 1, "menu-group__trigger", 3, "matMenuTriggerFor"], [1, "menu-group__icon"], [1, "menu-group__label"], [1, "menu-group__chevron"], ["xPosition", "after", "yPosition", "below", 1, "cascade-menu", 3, "overlapTrigger"], ["mat-menu-item", "", "type", "button", 1, "menu-link", 3, "active"], ["mat-menu-item", "", "type", "button", 1, "menu-link", 3, "click"]], template: function DashboardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, DashboardComponent_Conditional_0_Template, 63, 14, "div", 3);
      }
      if (rf & 2) {
        \u0275\u0275conditional(ctx.shouldRun ? 0 : -1);
      }
    }, dependencies: [RouterOutlet, RouterLink, MatIcon, MatIconButton, MatSidenav, MatSidenavContainer, MatSidenavContent, MatNavList, MatListItem, MatMenu, MatMenuItem, MatMenuTrigger, MatToolbar], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\n.example-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100vh;\n  height: 100dvh;\n  overflow: hidden;\n}\n.example-toolbar[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n}\n.sidenav-container[_ngcontent-%COMP%] {\n  flex: 1 1 0;\n  min-height: 0;\n  background-color: var(--vmc-page);\n}\n.dashboard-print-trigger[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0;\n  border: 0;\n  background: transparent;\n}\n.sidenav[_ngcontent-%COMP%] {\n  width: 268px;\n  background: var(--vmc-surface);\n  border-right: 1px solid #d7e3f1;\n  padding: 18px 14px 12px;\n  overflow-y: auto;\n  scrollbar-width: thin;\n  scrollbar-color: var(--vmc-line) transparent;\n}\n.sidenav-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 0 6px 18px;\n  margin-bottom: 6px;\n}\n.sidenav-header__mark[_ngcontent-%COMP%] {\n  display: grid;\n  flex: 0 0 28px;\n  width: 28px;\n  height: 28px;\n  place-items: center;\n  color: #0b55a6;\n}\n.sidenav-header__mark[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n}\n.sidenav-header__text[_ngcontent-%COMP%] {\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 1px;\n}\n.sidenav-header[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%] {\n  color: #10243a;\n  font-size: 0.92rem;\n  font-weight: 600;\n  letter-spacing: -0.01em;\n  line-height: 1.2;\n}\n.sidenav-header[_ngcontent-%COMP%]   .subtitle[_ngcontent-%COMP%] {\n  color: #667a90;\n  font-size: 0.74rem;\n  line-height: 1.4;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.menu-list[_ngcontent-%COMP%] {\n  padding: 0;\n}\n.menu-group__trigger[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  width: 100%;\n  min-height: 38px;\n  margin: 1px 0;\n  padding: 0 10px;\n  border: 0;\n  border-radius: 8px;\n  background: transparent;\n  color: var(--vmc-muted);\n  font-size: 0.86rem;\n  font-weight: 500;\n  text-align: left;\n  cursor: pointer;\n  transition: background-color 0.16s ease, color 0.16s ease;\n}\n.menu-group__trigger[_ngcontent-%COMP%]:hover, \n.menu-group__trigger[aria-expanded=true][_ngcontent-%COMP%] {\n  background-color: #e8f2ff;\n  color: #10243a;\n}\n.menu-group__label[_ngcontent-%COMP%] {\n  flex: 1 1 auto;\n  min-width: 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.menu-group__icon[_ngcontent-%COMP%], \n.menu-group__chevron[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  color: var(--vmc-muted);\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n  transition: color 0.16s ease;\n}\n.menu-group__chevron[_ngcontent-%COMP%] {\n  font-size: 16px;\n  width: 16px;\n  height: 16px;\n  opacity: 0.65;\n}\n.menu-group__trigger[_ngcontent-%COMP%]:hover   .menu-group__icon[_ngcontent-%COMP%], \n.menu-group__trigger[_ngcontent-%COMP%]:hover   .menu-group__chevron[_ngcontent-%COMP%], \n.menu-group__trigger[aria-expanded=true][_ngcontent-%COMP%]   .menu-group__icon[_ngcontent-%COMP%], \n.menu-group__trigger[aria-expanded=true][_ngcontent-%COMP%]   .menu-group__chevron[_ngcontent-%COMP%] {\n  color: #10243a;\n}\n.menu-group__trigger.active[_ngcontent-%COMP%] {\n  color: #0b55a6;\n}\n.menu-group__trigger.active[_ngcontent-%COMP%]   .menu-group__icon[_ngcontent-%COMP%] {\n  color: #0b55a6;\n}\n  .cascade-menu.mat-mdc-menu-panel {\n  min-width: 208px;\n  padding: 4px;\n  border: 1px solid #d7e3f1;\n  border-radius: 10px;\n  background: var(--vmc-surface);\n  box-shadow: 0 6px 24px rgba(15, 23, 42, 0.08);\n}\n  .cascade-menu .mat-mdc-menu-content {\n  padding: 0;\n}\n  .cascade-menu .menu-link {\n  position: relative;\n  min-height: 36px;\n  border-radius: 8px;\n  color: var(--vmc-muted);\n  font-size: 0.86rem;\n  font-weight: 500;\n  transition: background-color 0.16s ease, color 0.16s ease;\n}\n  .cascade-menu .menu-link mat-icon {\n  margin-right: 10px;\n  color: var(--vmc-muted);\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n  .cascade-menu .menu-link:hover {\n  background-color: #e8f2ff;\n  color: #10243a;\n}\n  .cascade-menu .menu-link:hover mat-icon {\n  color: #10243a;\n}\n  .cascade-menu .menu-link.active, \n  .cascade-menu .menu-link.active span {\n  background-color: var(--vmc-primary-soft);\n  color: #0b55a6;\n  font-weight: 600;\n}\n  .cascade-menu .menu-link.active mat-icon {\n  color: #0b55a6;\n}\n[_nghost-%COMP%]     .logout .mdc-list-item__content {\n  display: flex;\n  align-items: center;\n}\n.divider[_ngcontent-%COMP%] {\n  height: 1px;\n  background-color: #d7e3f1;\n  margin: 10px 6px;\n}\n.logout[_ngcontent-%COMP%] {\n  color: var(--vmc-muted);\n  border-radius: 8px;\n  margin: 12px 2px 2px;\n  min-height: 38px;\n  width: calc(100% - 4px);\n  font-size: 0.86rem;\n  font-weight: 500;\n  text-align: left;\n  transition: background-color 0.16s ease, color 0.16s ease;\n}\n.logout[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  margin-right: 10px;\n  color: var(--vmc-muted);\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.logout[_ngcontent-%COMP%]:hover, \n.logout[_ngcontent-%COMP%]:hover   mat-icon[_ngcontent-%COMP%] {\n  background-color: rgba(220, 38, 38, 0.06);\n  color: #b91c1c;\n}\n.sidenav-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  padding: 6px 8px 10px;\n  opacity: 0.45;\n}\n.content[_ngcontent-%COMP%] {\n  padding: 0px;\n  background-color: var(--vmc-page);\n}\n@media (min-width: 1366px) {\n  .content[_ngcontent-%COMP%] {\n    padding: 0;\n    background-color: var(--vmc-page);\n  }\n  .sidenav[_ngcontent-%COMP%] {\n    margin-top: 8px;\n  }\n}\n@media (max-width: 1365px) {\n  .sidenav[_ngcontent-%COMP%] {\n    width: min(84vw, 280px);\n    padding-bottom: 24px;\n  }\n}\n/*# sourceMappingURL=dashboard.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DashboardComponent, [{
    type: Component,
    args: [{ selector: "vmc-dashboard", standalone: false, template: `@if (shouldRun) {\r
<div class="example-container" [class.example-is-mobile]="mobileQuery.matches">\r
\r
  <mat-toolbar color="primary" class="example-toolbar">\r
    <button mat-icon-button (click)="snav.toggle()">\r
      <mat-icon>menu</mat-icon>\r
    </button>\r
\r
    <div class="w-100 d-flex justify-content-between align-items-center">\r
      <span class="d-md-none pt-1">{{ superintendente.fullName }}</span>\r
\r
      <span class="d-none d-md-inline pt-1">\r
        {{ superintendente.fullName }} | {{ superintendente.congregation?.name }}\r
      </span>\r
\r
      <div class="w-50 w-md-25 d-flex justify-content-end">\r
\r
        <a routerLink="/tablero/entre-semana" class="me-5">\r
          <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"\r
            stroke="#ffffff">\r
            <path\r
              d="M8 6L21 6.00078M8 12L21 12.0008M8 18L21 18.0007M3 6.5H4V5.5H3V6.5ZM3 12.5H4V11.5H3V12.5ZM3 18.5H4V17.5H3V18.5Z"\r
              stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>\r
          </svg>\r
        </a>\r
\r
        <button type="button" class="dashboard-print-trigger me-5" [matMenuTriggerFor]="printOptions"
          aria-label="Imprimir programas">
          <svg version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"\r
            width="32px" height="32px" viewBox="0 0 64.00 64.00" enable-background="new 0 0 64 64" xml:space="preserve"\r
            fill="#ffffff" stroke="#ffffff">\r
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>\r
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>\r
            <g id="SVGRepo_iconCarrier">\r
              <g>\r
                <path fill="#ffffff"\r
                  d="M60,12h-6V2c0-1.105-0.895-2-2-2H12c-1.105,0-2,0.895-2,2v10H4c-2.211,0-4,1.789-4,4v32 c0,2.211,1.789,4,4,4h6v10c0,1.105,0.895,2,2,2h40c1.105,0,2-0.895,2-2V52h6c2.211,0,4-1.789,4-4V16C64,13.789,62.211,12,60,12z M12,3c0-0.553,0.447-1,1-1h38c0.553,0,1,0.447,1,1v9H12V3z M52,61c0,0.553-0.447,1-1,1H13c-0.553,0-1-0.447-1-1V37 c0-0.553,0.447-1,1-1h38c0.553,0,1,0.447,1,1V61z M62,48c0,1.104-0.896,2-2,2h-6V36c0-1.105-0.895-2-2-2H12c-1.105,0-2,0.895-2,2 v14H4c-1.104,0-2-0.896-2-2V16c0-1.104,0.896-2,2-2h56c1.104,0,2,0.896,2,2V48z">\r
                </path>\r
                <path fill="#ffffff"\r
                  d="M19,44h12c0.553,0,1-0.447,1-1s-0.447-1-1-1H19c-0.553,0-1,0.447-1,1S18.447,44,19,44z"></path>\r
                <path fill="#ffffff"\r
                  d="M45,48H19c-0.553,0-1,0.447-1,1s0.447,1,1,1h26c0.553,0,1-0.447,1-1S45.553,48,45,48z"></path>\r
                <path fill="#ffffff"\r
                  d="M38,54H19c-0.553,0-1,0.447-1,1s0.447,1,1,1h19c0.553,0,1-0.447,1-1S38.553,54,38,54z"></path>\r
                <path fill="#ffffff"\r
                  d="M55,18c-1.657,0-3,1.343-3,3s1.343,3,3,3s3-1.343,3-3S56.657,18,55,18z M55,22c-0.553,0-1-0.447-1-1 s0.447-1,1-1s1,0.447,1,1S55.553,22,55,22z">\r
                </path>\r
                <path fill="#ffffff"\r
                  d="M45,18c-1.657,0-3,1.343-3,3s1.343,3,3,3s3-1.343,3-3S46.657,18,45,18z M45,22c-0.553,0-1-0.447-1-1 s0.447-1,1-1s1,0.447,1,1S45.553,22,45,22z">\r
                </path>\r
              </g>\r
            </g>\r
          </svg>\r
        </button>
        <mat-menu #printOptions="matMenu">
          <button mat-menu-item type="button" routerLink="/tablero/imprimir" [queryParams]="{ tipo: 'normal' }"
            (click)="goToPrint()">
            <mat-icon>crop_portrait</mat-icon>
            <span>Normal</span>
          </button>
          <button mat-menu-item type="button" routerLink="/tablero/imprimir" [queryParams]="{ tipo: 'landscape' }"
            (click)="goToPrint()">
            <mat-icon>crop_landscape</mat-icon>
            <span>Landscape</span>
          </button>
        </mat-menu>
\r
      </div>\r
    </div>\r
  </mat-toolbar>\r
\r
  <mat-sidenav-container class="sidenav-container">\r
\r
    <mat-sidenav #snav class="sidenav" mode="side" [fixedInViewport]="true" fixedTopGap="56"\r
      (backdropClick)="snav.close()" [opened]="!mobileQuery.matches" [mode]="mobileQuery.matches ? 'over' : 'side'">\r
\r
      <div class="sidenav-header">\r
        <div class="sidenav-header__mark">\r
          <mat-icon>menu_book</mat-icon>\r
        </div>\r
        <div class="sidenav-header__text">\r
          <span class="title">Vida y Ministerio</span>\r
          <span class="subtitle">{{ congregation.name || "Panel" }}</span>\r
        </div>\r
      </div>\r
\r
      <mat-nav-list class="menu-list">\r
        @for (group of getVisibleMenuGroups(); track group.label) {\r
        <button type="button" class="menu-group__trigger" [class.active]="isMenuGroupActive(group)"\r
          [matMenuTriggerFor]="groupMenu">\r
          <mat-icon class="menu-group__icon">{{ group.icon }}</mat-icon>\r
          <span class="menu-group__label">{{ group.label }}</span>\r
          <mat-icon class="menu-group__chevron">chevron_right</mat-icon>\r
        </button>\r
\r
        <mat-menu #groupMenu="matMenu" class="cascade-menu" xPosition="after" yPosition="below"\r
          [overlapTrigger]="false">\r
          @for (item of group.items; track item.route + item.label) {\r
          <button mat-menu-item type="button" class="menu-link" [class.active]="isMenuItemActive(item)"\r
            (click)="onMenuItemSelected(item)">\r
            <mat-icon>{{ item.icon }}</mat-icon>\r
            <span>{{ item.label }}</span>\r
          </button>\r
          }\r
        </mat-menu>\r
        }\r
\r
        <button mat-list-item type="button" class="logout" (click)="logout(); closeMenu()">\r
          <mat-icon>logout</mat-icon>\r
          <span>Salir</span>\r
        </button>\r
        <div class="divider"></div>\r
\r
\r
        <div class="sidenav-footer">\r
          <img src="./../../../assets/img/Logo.png" width="120" alt="">\r
        </div>\r
\r
\r
      </mat-nav-list>\r
\r
    </mat-sidenav>\r
\r
    <mat-sidenav-content class="content">\r
      <router-outlet></router-outlet>\r
    </mat-sidenav-content>\r
\r
  </mat-sidenav-container>\r
\r
</div>\r
}
`, styles: ["/* src/app/pages/dashboard/dashboard.component.scss */\n:host {\n  display: block;\n}\n.example-container {\n  display: flex;\n  flex-direction: column;\n  height: 100vh;\n  height: 100dvh;\n  overflow: hidden;\n}\n.example-toolbar {\n  flex: 0 0 auto;\n}\n.sidenav-container {\n  flex: 1 1 0;\n  min-height: 0;\n  background-color: var(--vmc-page);\n}\n.dashboard-print-trigger {\n  display: inline-flex;\n  align-items: center;\n  padding: 0;\n  border: 0;\n  background: transparent;\n}\n.sidenav {\n  width: 268px;\n  background: var(--vmc-surface);\n  border-right: 1px solid #d7e3f1;\n  padding: 18px 14px 12px;\n  overflow-y: auto;\n  scrollbar-width: thin;\n  scrollbar-color: var(--vmc-line) transparent;\n}\n.sidenav-header {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 0 6px 18px;\n  margin-bottom: 6px;\n}\n.sidenav-header__mark {\n  display: grid;\n  flex: 0 0 28px;\n  width: 28px;\n  height: 28px;\n  place-items: center;\n  color: #0b55a6;\n}\n.sidenav-header__mark mat-icon {\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n}\n.sidenav-header__text {\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 1px;\n}\n.sidenav-header .title {\n  color: #10243a;\n  font-size: 0.92rem;\n  font-weight: 600;\n  letter-spacing: -0.01em;\n  line-height: 1.2;\n}\n.sidenav-header .subtitle {\n  color: #667a90;\n  font-size: 0.74rem;\n  line-height: 1.4;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.menu-list {\n  padding: 0;\n}\n.menu-group__trigger {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  width: 100%;\n  min-height: 38px;\n  margin: 1px 0;\n  padding: 0 10px;\n  border: 0;\n  border-radius: 8px;\n  background: transparent;\n  color: var(--vmc-muted);\n  font-size: 0.86rem;\n  font-weight: 500;\n  text-align: left;\n  cursor: pointer;\n  transition: background-color 0.16s ease, color 0.16s ease;\n}\n.menu-group__trigger:hover,\n.menu-group__trigger[aria-expanded=true] {\n  background-color: #e8f2ff;\n  color: #10243a;\n}\n.menu-group__label {\n  flex: 1 1 auto;\n  min-width: 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.menu-group__icon,\n.menu-group__chevron {\n  flex: 0 0 auto;\n  color: var(--vmc-muted);\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n  transition: color 0.16s ease;\n}\n.menu-group__chevron {\n  font-size: 16px;\n  width: 16px;\n  height: 16px;\n  opacity: 0.65;\n}\n.menu-group__trigger:hover .menu-group__icon,\n.menu-group__trigger:hover .menu-group__chevron,\n.menu-group__trigger[aria-expanded=true] .menu-group__icon,\n.menu-group__trigger[aria-expanded=true] .menu-group__chevron {\n  color: #10243a;\n}\n.menu-group__trigger.active {\n  color: #0b55a6;\n}\n.menu-group__trigger.active .menu-group__icon {\n  color: #0b55a6;\n}\n::ng-deep .cascade-menu.mat-mdc-menu-panel {\n  min-width: 208px;\n  padding: 4px;\n  border: 1px solid #d7e3f1;\n  border-radius: 10px;\n  background: var(--vmc-surface);\n  box-shadow: 0 6px 24px rgba(15, 23, 42, 0.08);\n}\n::ng-deep .cascade-menu .mat-mdc-menu-content {\n  padding: 0;\n}\n::ng-deep .cascade-menu .menu-link {\n  position: relative;\n  min-height: 36px;\n  border-radius: 8px;\n  color: var(--vmc-muted);\n  font-size: 0.86rem;\n  font-weight: 500;\n  transition: background-color 0.16s ease, color 0.16s ease;\n}\n::ng-deep .cascade-menu .menu-link mat-icon {\n  margin-right: 10px;\n  color: var(--vmc-muted);\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n::ng-deep .cascade-menu .menu-link:hover {\n  background-color: #e8f2ff;\n  color: #10243a;\n}\n::ng-deep .cascade-menu .menu-link:hover mat-icon {\n  color: #10243a;\n}\n::ng-deep .cascade-menu .menu-link.active,\n::ng-deep .cascade-menu .menu-link.active span {\n  background-color: var(--vmc-primary-soft);\n  color: #0b55a6;\n  font-weight: 600;\n}\n::ng-deep .cascade-menu .menu-link.active mat-icon {\n  color: #0b55a6;\n}\n:host ::ng-deep .logout .mdc-list-item__content {\n  display: flex;\n  align-items: center;\n}\n.divider {\n  height: 1px;\n  background-color: #d7e3f1;\n  margin: 10px 6px;\n}\n.logout {\n  color: var(--vmc-muted);\n  border-radius: 8px;\n  margin: 12px 2px 2px;\n  min-height: 38px;\n  width: calc(100% - 4px);\n  font-size: 0.86rem;\n  font-weight: 500;\n  text-align: left;\n  transition: background-color 0.16s ease, color 0.16s ease;\n}\n.logout mat-icon {\n  margin-right: 10px;\n  color: var(--vmc-muted);\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.logout:hover,\n.logout:hover mat-icon {\n  background-color: rgba(220, 38, 38, 0.06);\n  color: #b91c1c;\n}\n.sidenav-footer {\n  display: flex;\n  justify-content: center;\n  padding: 6px 8px 10px;\n  opacity: 0.45;\n}\n.content {\n  padding: 0px;\n  background-color: var(--vmc-page);\n}\n@media (min-width: 1366px) {\n  .content {\n    padding: 0;\n    background-color: var(--vmc-page);\n  }\n  .sidenav {\n    margin-top: 8px;\n  }\n}\n@media (max-width: 1365px) {\n  .sidenav {\n    width: min(84vw, 280px);\n    padding-bottom: 24px;\n  }\n}\n/*# sourceMappingURL=dashboard.component.css.map */\n"] }]
  }], () => [{ type: DataService }, { type: MeetingsService }, { type: Router }], { snav: [{
    type: ViewChild,
    args: ["snav"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardComponent, { className: "DashboardComponent", filePath: "src/app/pages/dashboard/dashboard.component.ts", lineNumber: 37 });
})();

export {
  SessionExpirationService,
  LoginGuard,
  NotFoundComponent,
  TableModule,
  TablePrimengComponent,
  PublisherListComponent,
  isAdminEmail,
  DashboardComponent
};
//# sourceMappingURL=chunk-WGBBHCG5.js.map
