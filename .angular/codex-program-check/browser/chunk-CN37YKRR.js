import {
  ChangeDetectionStrategy,
  CommonModule,
  Component,
  HostBinding,
  Injectable,
  MAT_SNACK_BAR_DATA,
  MatButton,
  MatButtonModule,
  MatIcon,
  MatIconButton,
  MatIconModule,
  MatSnackBar,
  MatSnackBarRef,
  NgIf,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-MIOFCSIM.js";

// src/app/shared/notification-snackbar/notification-snackbar.component.ts
function NotificationSnackbarComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.data.title);
  }
}
function NotificationSnackbarComponent_button_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 10);
    \u0275\u0275listener("click", function NotificationSnackbarComponent_button_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onAction());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.data.actionText, " ");
  }
}
var NotificationSnackbarComponent = class _NotificationSnackbarComponent {
  constructor() {
    this.data = inject(MAT_SNACK_BAR_DATA);
    this.ref = inject(MatSnackBarRef);
  }
  get durationCssVar() {
    return `${this.data.durationMs}ms`;
  }
  get icon() {
    switch (this.data.type) {
      case "success":
        return "check_circle";
      case "info":
        return "info";
      case "warning":
        return "warning";
      case "error":
        return "error";
      default:
        return "info";
    }
  }
  dismiss() {
    this.ref.dismiss();
  }
  onAction() {
    this.ref.dismissWithAction();
  }
  static {
    this.\u0275fac = function NotificationSnackbarComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NotificationSnackbarComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NotificationSnackbarComponent, selectors: [["vmc-notification-snackbar"]], hostVars: 2, hostBindings: function NotificationSnackbarComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275styleProp("--vmc-toast-duration-ms", ctx.durationCssVar);
      }
    }, decls: 14, vars: 4, consts: [[1, "toast"], [1, "left"], ["aria-hidden", "true", 1, "icon"], [1, "content"], ["class", "title", 4, "ngIf"], [1, "message"], ["mat-button", "", "class", "action", "type", "button", 3, "click", 4, "ngIf"], ["mat-icon-button", "", "type", "button", "aria-label", "Cerrar notificaci\xF3n", 1, "close", 3, "click"], ["aria-hidden", "true", 1, "progress"], [1, "title"], ["mat-button", "", "type", "button", 1, "action", 3, "click"]], template: function NotificationSnackbarComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "mat-icon");
        \u0275\u0275text(4);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(5, "div", 3);
        \u0275\u0275template(6, NotificationSnackbarComponent_div_6_Template, 2, 1, "div", 4);
        \u0275\u0275elementStart(7, "div", 5);
        \u0275\u0275text(8);
        \u0275\u0275elementEnd();
        \u0275\u0275template(9, NotificationSnackbarComponent_button_9_Template, 2, 1, "button", 6);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(10, "button", 7);
        \u0275\u0275listener("click", function NotificationSnackbarComponent_Template_button_click_10_listener() {
          return ctx.dismiss();
        });
        \u0275\u0275elementStart(11, "mat-icon");
        \u0275\u0275text(12, "close");
        \u0275\u0275elementEnd()();
        \u0275\u0275element(13, "div", 8);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate(ctx.icon);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.data.title);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.data.message);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.data.actionText);
      }
    }, dependencies: [CommonModule, NgIf, MatIconModule, MatIcon, MatButtonModule, MatButton, MatIconButton], encapsulation: 2, changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NotificationSnackbarComponent, [{
    type: Component,
    args: [{
      selector: "vmc-notification-snackbar",
      standalone: true,
      imports: [CommonModule, MatIconModule, MatButtonModule],
      template: `
    <div class="toast">
      <div class="left">
        <div class="icon" aria-hidden="true">
          <mat-icon>{{ icon }}</mat-icon>
        </div>

        <div class="content">
          <div class="title" *ngIf="data.title">{{ data.title }}</div>
          <div class="message">{{ data.message }}</div>

          <button
            *ngIf="data.actionText"
            mat-button
            class="action"
            type="button"
            (click)="onAction()"
          >
            {{ data.actionText }}
          </button>
        </div>
      </div>

      <button
        mat-icon-button
        type="button"
        class="close"
        aria-label="Cerrar notificaci\xF3n"
        (click)="dismiss()"
      >
        <mat-icon>close</mat-icon>
      </button>

      <div class="progress" aria-hidden="true"></div>
    </div>
  `,
      changeDetection: ChangeDetectionStrategy.OnPush
    }]
  }], null, { durationCssVar: [{
    type: HostBinding,
    args: ["style.--vmc-toast-duration-ms"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NotificationSnackbarComponent, { className: "NotificationSnackbarComponent", filePath: "src/app/shared/notification-snackbar/notification-snackbar.component.ts", lineNumber: 59 });
})();

// src/app/core/services/nofitications/notification.service.ts
var NotificationService = class _NotificationService {
  constructor() {
    this.snack = inject(MatSnackBar);
  }
  show(options) {
    const type = options.type ?? "info";
    const durationMs = options.durationMs ?? 5e3;
    const ref = this.snack.openFromComponent(NotificationSnackbarComponent, {
      duration: durationMs,
      horizontalPosition: "end",
      verticalPosition: "top",
      panelClass: ["vmc-snackbar", `vmc-snackbar--${type}`],
      data: {
        type,
        title: options.title,
        message: options.message,
        actionText: options.actionText,
        durationMs
      }
    });
    return ref;
  }
  success(message, title = "Listo", durationMs) {
    return this.show({ type: "success", title, message, durationMs });
  }
  info(message, title = "Info", durationMs) {
    return this.show({ type: "info", title, message, durationMs });
  }
  warning(message, title = "Atenci\xF3n", durationMs) {
    return this.show({ type: "warning", title, message, durationMs });
  }
  error(message, title = "Error", durationMs) {
    return this.show({ type: "error", title, message, durationMs: durationMs ?? 1e4 });
  }
  static {
    this.\u0275fac = function NotificationService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NotificationService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _NotificationService, factory: _NotificationService.\u0275fac, providedIn: "root" });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NotificationService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  NotificationService
};
//# sourceMappingURL=chunk-CN37YKRR.js.map
