import { CommonModule } from "@angular/common";
import { Component, DestroyRef, OnInit, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { catchError, finalize, forkJoin, of } from "rxjs";
import { ApiErrorResponse, Congregation, Meeting, Program } from "src/app/core/interfaces/reuniones.interface";
import { CongregationsService } from "src/app/core/services/congregations/congregations.service";
import { MeetingsService } from "src/app/core/services/meetings/meetings.service";
import { ProgramService } from "src/app/core/services/program/program.service";
import { MaterialModule } from "src/app/shared/material.module";
import { Utils } from "src/app/shared/Utils";
import { ProgramFormDialogComponent } from "./program-form-dialog/program-form-dialog.component";

interface WeekFilterOption {
  week: string;
  label: string;
  meetingId: number | null;
}

@Component({
  selector: "vmc-programs",
  imports: [CommonModule, MaterialModule],
  templateUrl: "./programs.component.html",
  styleUrls: ["./programs.component.scss"],
})
export class ProgramsComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  programList: Program[] = [];
  congregations: Congregation[] = [];
  meetings: Meeting[] = [];
  weekOptions: WeekFilterOption[] = [];
  displayedColumns = ["weekNumber", "week", "congregation", "weeklyPrograms", "event", "actions"];
  selectedCongregationId: number | null = null;
  selectedWeek: string | null = null;
  catalogLoading = true;
  loading = false;

  constructor(
    private programService: ProgramService,
    private meetingsService: MeetingsService,
    private congregationsService: CongregationsService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loadCatalogs();
  }

  loadCatalogs(): void {
    this.catalogLoading = true;
    forkJoin({
      congregations: this.congregationsService.getAllCongregations().pipe(catchError(() => of([] as Congregation[]))),
      meetings: this.meetingsService.getAllMeetings().pipe(catchError(() => of([] as Meeting[]))),
    })
      .pipe(
        finalize(() => {
          this.catalogLoading = false;
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(({ congregations, meetings }) => {
        this.congregations = this.normalizeArray<Congregation>(congregations);
        this.meetings = this.normalizeArray<Meeting>(meetings);
        this.weekOptions = this.buildWeekOptions();
        this.selectedWeek = this.resolveDefaultWeek(this.selectedWeek);
        this.selectedCongregationId = this.resolveDefaultCongregationId();
        this.loadPrograms();
      });
  }

  get isLoading(): boolean {
    return this.catalogLoading || this.loading;
  }

  loadPrograms(): void {
    this.loading = true;

    this.programService
      .getProgramsByWeek({ congregationId: this.selectedCongregationId, date: this.selectedWeek })
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (programs) => {
          this.programList = [...programs].sort((a, b) => (a.weekNumber ?? 0) - (b.weekNumber ?? 0));
        },
        error: (error) => this.handleLoadError(error),
      });
  }

  onFilterCongregationChange(congregationId: number | null): void {
    this.selectedCongregationId = congregationId;
    this.loadPrograms();
  }

  onWeekChange(week: string | null): void {
    this.selectedWeek = week;
    this.loadPrograms();
  }

  getProgramCongregationLabel(program: Program): string {
    return program.congregation?.name?.trim() || "Sin congregacion";
  }

  openCreateDialog(): void {
    this.openProgramDialog(null, this.resolveSelectedMeetingId());
  }

  selectedEdit(program: Program): void {
    this.openProgramDialog(program, program.meeting?.id ?? null);
  }

  toDelete(program: Program): void {
    if (!confirm(`Eliminar el programa de la semana ${program.weekNumber}?`)) {
      return;
    }

    this.programService
      .delete(program.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.notify("Programa eliminado.");
          this.loadPrograms();
        },
        error: (error) => {
          this.notify(this.getErrorMessage(error, "No se pudo eliminar el programa."));
        },
      });
  }

  getMeetingLabel(meeting: Meeting | null | undefined, meetingDay = this.getSelectedCongregationDay()): string {
    if (!meeting) {
      return "Sin reunion";
    }

    return `Semana ${meeting.weekNumber ?? ""}${meeting.week ? " - " + Utils.showDayOfMeeting(meeting.week, meetingDay) : ""}`;
  }

  getProgramWeekLabel(program: Program): string {
    const week = program.meeting?.week;

    if (!week) {
      return "Sin fecha";
    }

    return Utils.showDayOfMeeting(week, program.congregation?.day ?? this.getSelectedCongregationDay());
  }

  getEventLabel(program: Program): string {
    return program.event?.trim() || "Sin evento";
  }

  private openProgramDialog(program: Program | null, meetingId: number | null): void {
    this.dialog
      .open(ProgramFormDialogComponent, {
        autoFocus: false,
        width: "min(980px, 96vw)",
        maxWidth: "96vw",
        data: {
          congregations: this.congregations,
          meetings: this.meetings,
          program,
          congregationId: program?.congregation?.id ?? this.selectedCongregationId,
          meetingId,
        },
      })
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((saved) => {
        if (saved) {
          this.loadPrograms();
        }
      });
  }

  private handleLoadError(error: ApiErrorResponse): void {
    this.programList = [];

    if (error?.status === 404) {
      this.selectedCongregationId = null;
      this.notify("La congregacion seleccionada no existe. Se recargo el catalogo.");
      this.loadCatalogs();
      return;
    }

    this.notify(this.getErrorMessage(error, "No se pudieron cargar los programas."));
  }

  private buildWeekOptions(): WeekFilterOption[] {
    const weekMap = new Map<string, WeekFilterOption>();

    this.meetings.forEach((meeting) => {
      const week = this.normalizeWeekValue(meeting.week);

      if (!week || weekMap.has(week)) {
        return;
      }

      weekMap.set(week, {
        week,
        label: this.getMeetingLabel(meeting, this.getSelectedCongregationDay()),
        meetingId: meeting.id ?? null,
      });
    });

    return [...weekMap.values()].sort((a, b) => new Date(a.week).getTime() - new Date(b.week).getTime());
  }

  private resolveDefaultWeek(preferredWeek: string | null): string | null {
    if (preferredWeek && this.weekOptions.some((option) => option.week === preferredWeek)) {
      return preferredWeek;
    }

    const today = new Date();
    const currentWeek = this.weekOptions.find((option) => this.isDateInWeek(today, option.week));

    if (currentWeek) {
      return currentWeek.week;
    }

    return this.weekOptions.find((option) => new Date(option.week).getTime() > today.getTime())?.week ?? this.weekOptions.at(-1)?.week ?? null;
  }

  private resolveSelectedMeetingId(): number | null {
    const weekOptionMeetingId = this.weekOptions.find((option) => option.week === this.selectedWeek)?.meetingId;

    if (weekOptionMeetingId) {
      return weekOptionMeetingId;
    }

    return this.meetings.find((meeting) => this.normalizeWeekValue(meeting.week) === this.selectedWeek)?.id ?? null;
  }

  private getSelectedCongregationDay(): number {
    return this.congregations.find((congregation) => congregation.id === this.selectedCongregationId)?.day ?? 1;
  }

  private resolveDefaultCongregationId(): number | null {
    const storedCongregation = this.readStorageObject<Congregation>("congregation");
    const storedCongregationId = storedCongregation?.id ?? null;

    if (storedCongregationId && this.congregations.some((congregation) => congregation.id === storedCongregationId)) {
      return storedCongregationId;
    }

    return this.congregations[0]?.id ?? null;
  }

  private normalizeWeekValue(week: unknown): string | null {
    if (!week) {
      return null;
    }

    if (typeof week === "string") {
      return week.split("T")[0];
    }

    if (typeof week === "number") {
      return new Date(week).toISOString().split("T")[0];
    }

    if (Array.isArray(week)) {
      const [year, month, day] = week;

      if (typeof year === "number" && typeof month === "number" && typeof day === "number") {
        return `${year.toString().padStart(4, "0")}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
      }
    }

    if (week instanceof Date) {
      return week.toISOString().split("T")[0];
    }

    return null;
  }

  private isDateInWeek(date: Date, week: string): boolean {
    const weekStart = new Date(`${week}T00:00:00`);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);

    return date >= weekStart && date <= weekEnd;
  }

  private normalizeArray<T>(value: unknown): T[] {
    if (Array.isArray(value)) {
      return value as T[];
    }

    if (value && typeof value === "object" && Array.isArray((value as { content?: unknown[] }).content)) {
      return (value as { content: T[] }).content;
    }

    return [];
  }

  private notify(message: string): void {
    this.snackBar.open(message, "Cerrar", {
      duration: 4500,
      horizontalPosition: "end",
      verticalPosition: "top",
    });
  }

  private getErrorMessage(error: ApiErrorResponse | string, fallback: string): string {
    if (typeof error === "string") {
      return error || fallback;
    }

    const fieldErrors = error?.errors
      ?.map((item) => item.message)
      .filter(Boolean)
      .join(" ");

    return fieldErrors || error?.message || fallback;
  }

  private readStorageObject<T>(storageKey: string): T | null {
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
}
