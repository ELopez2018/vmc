import { Injectable, NgZone, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DataService } from "../data/data.service";
import { LoaderService } from "../loader/loader.service";

@Injectable({
  providedIn: "root",
})
export class SessionExpirationService implements OnDestroy {
  private isHandlingExpiredSession = false;
  private monitoring = false;
  private hadSession = false;
  private expirationTimer?: ReturnType<typeof setTimeout>;
  private readonly checkSession = () => this.scheduleExpiration();
  private readonly onStorage = (event: StorageEvent) => {
    if (event.key === "token" || event.key === null) {
      this.scheduleExpiration();
    }
  };

  constructor(
    private dataService: DataService,
    private loaderService: LoaderService,
    private ngbModal: NgbModal,
    private ngZone: NgZone,
    private router: Router,
  ) {}

  public startMonitoring(): void {
    if (!this.monitoring) {
      this.monitoring = true;
      window.addEventListener("focus", this.checkSession);
      window.addEventListener("pageshow", this.checkSession);
      window.addEventListener("storage", this.onStorage);
      document.addEventListener("visibilitychange", this.checkSession);
    }
    this.scheduleExpiration();
  }

  private scheduleExpiration(): void {
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
      // Avoid the browser timer limit and re-read the current token when it fires.
      this.ngZone.runOutsideAngular(() => {
        this.expirationTimer = setTimeout(this.checkSession, Math.min(expiresAt - Date.now(), 2_147_483_647));
      });
    } catch {
      this.notifyExpiredSession();
    }
  }

  ngOnDestroy(): void {
    clearTimeout(this.expirationTimer);
    window.removeEventListener("focus", this.checkSession);
    window.removeEventListener("pageshow", this.checkSession);
    window.removeEventListener("storage", this.onStorage);
    document.removeEventListener("visibilitychange", this.checkSession);
  }

  public notifyExpiredSession(): void {
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
        queryParams: { sessionExpired: true },
      }).finally(() => {
        this.isHandlingExpiredSession = false;
      });
    });
  }
}
