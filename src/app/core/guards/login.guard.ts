import { inject } from "@angular/core";
import { Router, type CanActivateFn } from "@angular/router";
import { DataService } from "../services/data/data.service";

export const LoginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const dataService = inject(DataService);

  if (dataService.hasValidToken()) {
    return true;
  }

  dataService.clearSession();
  router.navigate(["/inicio"], { replaceUrl: true });
  return false;
};
