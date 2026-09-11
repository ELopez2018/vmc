import { fakeAsync, flushMicrotasks, TestBed, tick } from "@angular/core/testing";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { JwtHelperService } from "@auth0/angular-jwt";
import { DataService } from "../data/data.service";
import { LoaderService } from "../loader/loader.service";
import { SessionExpirationService } from "./session-expiration.service";

describe("SessionExpirationService", () => {
  let service: SessionExpirationService;
  let token: string | null;
  let router: jasmine.SpyObj<Router>;
  let data: jasmine.SpyObj<DataService>;
  let modals: jasmine.SpyObj<NgbModal>;
  const jwt = new JwtHelperService();
  const createToken = (seconds: number) =>
    `${btoa(JSON.stringify({ alg: "HS256" }))}.${btoa(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + seconds }))}.signature`;

  beforeEach(() => {
    token = null;
    router = jasmine.createSpyObj("Router", ["navigate"]);
    router.navigate.and.returnValue(Promise.resolve(true));
    modals = jasmine.createSpyObj("NgbModal", ["dismissAll"]);
    data = jasmine.createSpyObj("DataService", ["getAccessToken", "hasValidToken", "clearSession"], { jwtUtils: jwt });
    data.getAccessToken.and.callFake(() => token);
    data.hasValidToken.and.callFake(() => !!token && !jwt.isTokenExpired(token));
    data.clearSession.and.callFake(() => { token = null; });
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: router },
        { provide: DataService, useValue: data },
        { provide: NgbModal, useValue: modals },
        { provide: LoaderService, useValue: jasmine.createSpyObj("LoaderService", ["hideMatspinner", "setLoaderSearchPublisher"]) },
      ],
    });
    service = TestBed.inject(SessionExpirationService);
  });

  afterEach(() => service.ngOnDestroy());

  it("redirects at expiration without navigation, requests or user interaction", fakeAsync(() => {
    token = createToken(10);
    service.startMonitoring();
    expect(router.navigate).not.toHaveBeenCalled();
    tick(10_000);
    expect(data.clearSession).toHaveBeenCalledTimes(1);
    expect(modals.dismissAll).toHaveBeenCalledWith("session-expired");
    expect(router.navigate).toHaveBeenCalledWith(["/inicio"], {
      replaceUrl: true, queryParams: { sessionExpired: true },
    });
  }));

  it("redirects immediately when starting with an expired or malformed token", fakeAsync(() => {
    for (const value of [createToken(-10), "invalid-token"]) {
      token = value;
      service.startMonitoring();
      expect(token).toBeNull();
      flushMicrotasks();
    }
    expect(router.navigate).toHaveBeenCalledTimes(2);
  }));

  it("leaves an unauthenticated visitor on the current page", () => {
    service.startMonitoring();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it("reschedules expiration after another login", fakeAsync(() => {
    token = createToken(10);
    service.startMonitoring();
    token = createToken(30);
    service.startMonitoring();
    tick(10_000);
    expect(router.navigate).not.toHaveBeenCalled();
    tick(20_000);
    expect(router.navigate).toHaveBeenCalledTimes(1);
  }));

  it("checks expiration when returning to a suspended tab", fakeAsync(() => {
    token = createToken(60);
    service.startMonitoring();
    token = createToken(-1);
    document.dispatchEvent(new Event("visibilitychange"));
    expect(router.navigate).toHaveBeenCalledTimes(1);
    flushMicrotasks();
  }));

  it("redirects if the session is removed in another tab", fakeAsync(() => {
    token = createToken(60);
    service.startMonitoring();
    token = null;
    window.dispatchEvent(new StorageEvent("storage", { key: "token" }));
    expect(router.navigate).toHaveBeenCalledTimes(1);
    flushMicrotasks();
  }));

  it("handles simultaneous expiration notifications only once", fakeAsync(() => {
    service.notifyExpiredSession();
    service.notifyExpiredSession();
    expect(router.navigate).toHaveBeenCalledTimes(1);
    expect(data.clearSession).toHaveBeenCalledTimes(1);
    flushMicrotasks();
  }));
});
