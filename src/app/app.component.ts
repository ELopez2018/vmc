import { ChangeDetectorRef, Component, inject } from "@angular/core";
import { MediaMatcher } from "@angular/cdk/layout";
import { DataService } from "./core/services/data/data.service";
import { LoaderService } from "./core/services/loader/loader.service";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs/operators";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: false,
})
export class AppComponent {
  showMatspinner = false;
  isDashboardRoute = false;
  loaderService = inject(LoaderService);
  title = "vmc";
  showFiller = true;

  mobileQuery: MediaQueryList;

  fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);

  fillerContent = Array.from(
    { length: 50 },
    () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  );

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private dataService: DataService,
    private router: Router,
  ) {
    this.mobileQuery = media.matchMedia("(max-width: 600px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    // Solo configurar si hay sesión válida
    if (this.dataService.hasValidToken()) {
      this.dataService.getConfigs();
      this.dataService.getPublishersFromDB();
    }

    this.loaderService.getShowMatspinner$().subscribe((show) => {
      this.showMatspinner = show;
    });

    this.router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd)).subscribe((event) => {
      this.isDashboardRoute = event.urlAfterRedirects.startsWith("/tablero");
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = true;
}
