import { inject } from "@angular/core";
import { Router, type CanActivateFn } from "@angular/router";
import { DataService } from "../services/data/data.service";
import { SessionExpirationService } from "../services/session/session-expiration.service";

export const LoginGuard: CanActivateFn = (route, state) => {
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

  router.navigate(["/inicio"], { replaceUrl: true });
  return false;
};
