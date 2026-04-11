import { MediaMatcher } from "@angular/cdk/layout";
import { ChangeDetectorRef, Component, DestroyRef, OnDestroy, OnInit, ViewChild, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Congregation, Program, Publisher } from "src/app/core/interfaces/reuniones.interface";
import { DataService } from "src/app/core/services/data/data.service";
import { MeetingsService } from "src/app/core/services/meetings/meetings.service";
import { CongregationMock } from "../entre-semana/mocks/congregation.mock";
import { MatSidenav } from "@angular/material/sidenav";
import { LoaderService } from "src/app/core/services/loader/loader.service";
import { combineLatest, of } from "rxjs";
import { catchError, switchMap, tap } from "rxjs/operators";

@Component({
  selector: "vmc-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  standalone: false,
})
export class DashboardComponent implements OnInit, OnDestroy {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly mediaMatcher = inject(MediaMatcher);
  private readonly destroyRef = inject(DestroyRef);
  private readonly loaderService = inject(LoaderService);
  private readonly adminEmail = "estarlin.elv@gmail.com";
  private readonly mobileQueryListener = () => this.changeDetectorRef.detectChanges();

  @ViewChild("snav") snav?: MatSidenav;

  readonly mobileQuery = this.mediaMatcher.matchMedia("(max-width: 1366px)");
  readonly shouldRun = true;

  public Superintendente!: Publisher;
  private programList: Program[] = [];
  public congregation: Congregation = CongregationMock;
  public isAdmin = false;

  constructor(
    private dataService: DataService,
    private meetingsService: MeetingsService,
  ) {}

  ngOnInit(): void {
    this.loaderService.hideMatspinner();
    this.mobileQuery.addEventListener("change", this.mobileQueryListener);
    this.dataService.getConfigs();

    combineLatest([this.dataService.getPublisher(), this.dataService.getIsAdmin()])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([publisher, isAdmin]) => {
        this.Superintendente = publisher;
        this.isAdmin = Boolean(isAdmin || publisher.email === this.adminEmail);
      });

    this.dataService
      .getCongregation$()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((congregation) => {
          this.congregation = congregation;
        }),
        switchMap((congregation) =>
          this.meetingsService.getWeeksValids(congregation.id).pipe(
            catchError((error) => {
              console.error(error);
              return of([] as Program[]);
            }),
          ),
        ),
      )
      .subscribe((programs) => {
        this.programList = [...programs];
      });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener("change", this.mobileQueryListener);
  }

  logout(): void {
    this.dataService.logout();
  }

  goToPrint(): void {
    this.dataService.setMeeting([...this.programList]);
  }

  closeMenu(): void {
    if (this.mobileQuery.matches) {
      this.snav?.close();
    }
  }
}
