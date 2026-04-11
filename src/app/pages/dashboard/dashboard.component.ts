import { MediaMatcher } from "@angular/cdk/layout";
import { ChangeDetectorRef, Component, inject, ViewChild } from "@angular/core";
import { Congregation, Program, Publisher } from "src/app/core/interfaces/reuniones.interface";
import { DataService } from "src/app/core/services/data/data.service";
import { MeetingsService } from "src/app/core/services/meetings/meetings.service";
import { CongregationMock } from "../entre-semana/mocks/congregation.mock";
import { MatSidenav } from "@angular/material/sidenav";
import { LoaderService } from "src/app/core/services/loader/loader.service";

@Component({
  selector: "vmc-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  standalone: false,
})
export class DashboardComponent {
  title = "vmc";
  showFiller = true;
  @ViewChild("snav") snav!: MatSidenav;
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
  public Superintendente!: Publisher;
  private programList: Program[] = [];
  public congregation: Congregation = CongregationMock;
  isAdmin: any;
  loaderService = inject(LoaderService);
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private dataService: DataService,
    private meetingsService: MeetingsService,
  ) {
    this.loaderService.hideMatspinner();
    this.mobileQuery = media.matchMedia("(max-width: 1366px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.dataService.getConfigs();
    this.dataService.getPublisher().subscribe((data) => {
      this.Superintendente = data;
    });
    this.dataService.getIsAdmin().subscribe((data) => {
      this.isAdmin = data || this.Superintendente.email === "estarlin.elv@gmail.com";
    });
  }

  ngOnDestroy(): void {
    this.dataService.getCongregation$().subscribe((data) => {
      this.congregation = data;
    });
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.meetingsService.getWeeksValids(this.congregation.id).subscribe(
      (data) => {
        this.programList = [...data];
      },
      (error) => {
        console.error(error);
      },
    );
  }

  shouldRun = true;
  logout() {
    this.dataService.logout();
  }
  goToPrint() {
    this.dataService.setMeeting([...this.programList]);
  }
  closeMenu() {
    if (this.mobileQuery.matches) {
      this.snav.close();
    }
  }
}
