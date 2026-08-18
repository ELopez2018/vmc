import { MediaMatcher } from "@angular/cdk/layout";
import { ChangeDetectorRef, Component, DestroyRef, OnDestroy, OnInit, ViewChild, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Router } from "@angular/router";
import { Congregation, Program, Publisher } from "src/app/core/interfaces/reuniones.interface";
import { DataService } from "src/app/core/services/data/data.service";
import { MeetingsService } from "src/app/core/services/meetings/meetings.service";
import { CongregationMock } from "../entre-semana/mocks/congregation.mock";
import { MatSidenav } from "@angular/material/sidenav";
import { LoaderService } from "src/app/core/services/loader/loader.service";
import { combineLatest, of } from "rxjs";
import { catchError, switchMap, tap } from "rxjs/operators";
import { isAdminEmail } from "src/app/core/constants/admin.constants";

interface DashboardMenuItem {
  label: string;
  icon: string;
  route: string;
  queryParams?: Record<string, string>;
  adminOnly?: boolean;
  beforeNavigate?: () => void;
}

interface DashboardMenuGroup {
  label: string;
  icon: string;
  adminOnly?: boolean;
  items: DashboardMenuItem[];
}

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
  private readonly mobileQueryListener = () => this.changeDetectorRef.detectChanges();

  @ViewChild("snav") snav?: MatSidenav;

  readonly mobileQuery = this.mediaMatcher.matchMedia("(max-width: 1366px)");
  readonly shouldRun = true;

  public superintendente!: Publisher;
  private programList: Program[] = [];
  public congregation: Congregation = CongregationMock;
  public isAdmin = false;
  public readonly menuGroups: DashboardMenuGroup[] = [
    {
      label: "Programa",
      icon: "event",
      items: [{ label: "Entre semana", icon: "calendar_month", route: "/tablero/entre-semana" }],
    },
    {
      label: "Imprimir",
      icon: "print",
      items: [
        { label: "Normal", icon: "crop_portrait", route: "/tablero/imprimir", queryParams: { tipo: "normal" } },
        { label: "Landscape", icon: "crop_landscape", route: "/tablero/imprimir", queryParams: { tipo: "landscape" } },
      ],
    },
    {
      label: "Publicadores",
      icon: "groups",
      items: [
        { label: "Registro", icon: "person_add", route: "/tablero/publicador" },
        { label: "Lista", icon: "groups", route: "/tablero/publicadores" },
        { label: "Privilegios", icon: "vpn_key", route: "/tablero/privilegios", adminOnly: true },
      ],
    },
    {
      label: "Asignaciones",
      icon: "assignment",
      items: [
        {
          label: "Hoja de asignacion",
          icon: "assignment_turned_in",
          route: "/tablero/hojas-asignacion",
          beforeNavigate: () => this.goToPrint(),
        },
        { label: "Notificaciones", icon: "notifications", route: "/tablero/notificaciones" },
      ],
    },
    {
      label: "Configuraciones",
      icon: "settings",
      adminOnly: true,
      items: [
        { label: "Congregaciones", icon: "holiday_village", route: "/tablero/congregaciones" },
        { label: "Administrador", icon: "admin_panel_settings", route: "/tablero/administrador" },
      ],
    },
  ];

  constructor(
    private dataService: DataService,
    private meetingsService: MeetingsService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loaderService.hideMatspinner();
    this.mobileQuery.addEventListener("change", this.mobileQueryListener);
    this.dataService.getConfigs();
    combineLatest([this.dataService.getPublisher(), this.dataService.getIsAdmin()])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([publisher, isAdmin]) => {
        this.superintendente = publisher;
        const publisherIsAdmin = isAdminEmail(publisher.email);
        this.isAdmin = Boolean(isAdmin || publisherIsAdmin);

        if (publisherIsAdmin && !isAdmin) {
          this.dataService.setIsAdmin(true);
        }
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

  getVisibleMenuGroups(): DashboardMenuGroup[] {
    return this.menuGroups
      .filter((group) => this.isVisible(group))
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => this.isVisible(item)),
      }))
      .filter((group) => group.items.length > 0);
  }

  async onMenuItemSelected(item: DashboardMenuItem): Promise<void> {
    item.beforeNavigate?.();

    if (this.isAdmin) {
      this.dataService.setIsAdmin(true);
    }

    await this.router.navigate([item.route], { queryParams: item.queryParams });
    this.closeMenu();
  }

  isMenuItemActive(item: DashboardMenuItem): boolean {
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

  isMenuGroupActive(group: DashboardMenuGroup): boolean {
    return group.items.some((item) => this.isMenuItemActive(item));
  }

  closeMenu(): void {
    if (this.mobileQuery.matches) {
      this.snav?.close();
    }
  }

  private isVisible(item: { adminOnly?: boolean }): boolean {
    return !item.adminOnly || this.isAdmin;
  }
}
