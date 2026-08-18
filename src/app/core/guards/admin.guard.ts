import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router, type CanActivateFn } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { catchError, map, of, take } from "rxjs";
import { Apis, Servers } from "../constants/servers";
import { isAdminEmail } from "../constants/admin.constants";
import { Publisher } from "../interfaces/reuniones.interface";
import { DataService } from "../services/data/data.service";

export const AdminGuard: CanActivateFn = () => {
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

    return httpClient.get<Publisher>(url).pipe(
      map((publisher) => {
        localStorage.setItem("publisher", JSON.stringify(publisher));
        dataService.setPublisher(publisher);

        const admin = isAdminEmail(publisher.email);
        dataService.setIsAdmin(admin);

        return admin ? true : router.createUrlTree(["/tablero/entre-semana"]);
      }),
      catchError(() => of(router.createUrlTree(["/tablero/entre-semana"]))),
    );
  }

  return dataService.getIsAdmin().pipe(
    take(1),
    map((stateAdmin) => (stateAdmin ? true : router.createUrlTree(["/tablero/entre-semana"]))),
  );
};

function readCurrentUserEmail(cookieService: CookieService): string | null {
  const publisher = readStorageObject<{ email?: string | null }>("publisher") ?? readCookieObject<{ email?: string | null }>(cookieService, "publisher");

  if (publisher?.email) {
    return publisher.email;
  }

  const token = readAccessToken();

  if (!token) {
    return null;
  }

  try {
    const decodedToken = decodeTokenPayload<{ email?: string; sub?: string; data?: { email?: string } }>(token);

    return decodedToken?.email ?? decodedToken?.data?.email ?? decodedToken?.sub ?? null;
  } catch {
    return null;
  }
}

function readCurrentUserId(): number | null {
  const token = readAccessToken();

  if (!token) {
    return null;
  }

  try {
    const decodedToken = decodeTokenPayload<{ userId?: number; data?: { id?: number } }>(token);
    return decodedToken?.userId ?? decodedToken?.data?.id ?? null;
  } catch {
    return null;
  }
}

function decodeTokenPayload<T>(token: string): T | null {
  const payload = token.split(".")[1];

  if (!payload) {
    return null;
  }

  const normalizedPayload = payload.replace(/-/g, "+").replace(/_/g, "/");
  const paddedPayload = normalizedPayload.padEnd(normalizedPayload.length + ((4 - (normalizedPayload.length % 4)) % 4), "=");

  try {
    const decodedPayload = atob(paddedPayload);
    const jsonPayload = decodeURIComponent(
      decodedPayload
        .split("")
        .map((character) => `%${character.charCodeAt(0).toString(16).padStart(2, "0")}`)
        .join(""),
    );

    return JSON.parse(jsonPayload) as T;
  } catch {
    return null;
  }
}

function readAccessToken(): string | null {
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

function readStorageObject<T>(storageKey: string): T | null {
  const storageValue = localStorage.getItem(storageKey);

  if (!storageValue) {
    return null;
  }

  try {
    return JSON.parse(storageValue) as T;
  } catch {
    return null;
  }
}

function readCookieObject<T>(cookieService: CookieService, cookieName: string): T | null {
  const cookieValue = cookieService.get(cookieName);

  if (!cookieValue) {
    return null;
  }

  try {
    return JSON.parse(cookieValue) as T;
  } catch {
    return null;
  }
}
