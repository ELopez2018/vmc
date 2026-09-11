import { CommonModule } from "@angular/common";
import { Component, DestroyRef, OnInit, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { catchError, finalize, forkJoin, of } from "rxjs";
import { ApiErrorResponse, Congregation, Meeting, Program } from "src/app/core/interfaces/reuniones.interface";
import { WeeklyProgramResponse } from "src/app/core/interfaces/weekly-programs.interface";
import { CongregationsService } from "src/app/core/services/congregations/congregations.service";
import { MeetingsService } from "src/app/core/services/meetings/meetings.service";
import { ProgramService } from "src/app/core/services/program/program.service";
import { WeeklyProgramService } from "src/app/core/services/weeklyProgram/WeeklyProgram.service";
import { MaterialModule } from "src/app/shared/material.module";
import { Utils } from "src/app/shared/Utils";
import Swal from "sweetalert2";
import { WeeklyProgramFormDialogComponent } from "./weekly-program-form-dialog/weekly-program-form-dialog.component";

interface WeekOption { week: string; label: string; }

@Component({
  selector: "vmc-weekly-programs-admin",
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: "./weekly-programs-admin.component.html",
  styleUrls: ["./weekly-programs-admin.component.scss"],
})
export class WeeklyProgramsAdminComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  congregations: Congregation[] = [];
  meetings: Meeting[] = [];
  weekOptions: WeekOption[] = [];
  programs: Program[] = [];
  rows: WeeklyProgramResponse[] = [];
  selectedCongregationId: number | null = null;
  selectedWeek: string | null = null;
  catalogLoading = true;
  loading = false;
  readonly displayedColumns = ["room", "startTime", "number", "section", "title", "responsible", "assistant", "notification", "actions"];

  constructor(
    private readonly congregationsService: CongregationsService,
    private readonly meetingsService: MeetingsService,
    private readonly programService: ProgramService,
    private readonly weeklyProgramService: WeeklyProgramService,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void { this.loadCatalogs(); }

  loadCatalogs(): void {
    this.catalogLoading = true;
    forkJoin({
      congregations: this.congregationsService.getAllCongregations().pipe(catchError(() => of([] as Congregation[]))),
      meetings: this.meetingsService.getAllMeetings().pipe(catchError(() => of([] as Meeting[]))),
    }).pipe(
      finalize(() => this.catalogLoading = false),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(({ congregations, meetings }) => {
      this.congregations = this.normalizeArray<Congregation>(congregations);
      this.meetings = this.normalizeArray<Meeting>(meetings);
      this.weekOptions = this.buildWeekOptions();
      this.selectedCongregationId = this.resolveCongregation();
      this.selectedWeek = this.resolveWeek();
      this.loadWeek();
    });
  }

  get isLoading(): boolean { return this.catalogLoading || this.loading; }

  loadWeek(): void {
    this.loading = true;
    this.programService.getProgramsByWeek({ congregationId: this.selectedCongregationId, date: this.selectedWeek })
      .pipe(finalize(() => this.loading = false), takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: programs => {
          this.programs = programs ?? [];
          const selected = this.selectedCongregationId == null ? this.programs : this.programs.filter(p => p.congregation?.id === this.selectedCongregationId);
          this.rows = selected.flatMap(program => (program.weeklyPrograms ?? []).map(row => this.toResponse(row, program)));
          this.rows.sort((a, b) => (a.room ?? "").localeCompare(b.room ?? "") || (a.assignment?.number ?? 9999) - (b.assignment?.number ?? 9999));
        },
        error: error => this.handleLoadError(error),
      });
  }

  onCongregationChange(value: number | null): void { this.selectedCongregationId = value; this.loadWeek(); }
  onWeekChange(value: string | null): void { this.selectedWeek = value; this.loadWeek(); }

  create(): void {
    const program = this.getSelectedProgram();
    if (!program) { this.notify("Selecciona una congregación y una semana que tengan programa."); return; }
    this.openDialog(null, program);
  }

  edit(row: WeeklyProgramResponse): void {
    const program = this.programs.find(item => item.id === row.programId);
    if (program) this.openDialog(row, program);
  }

  async remove(row: WeeklyProgramResponse): Promise<void> {
    const confirmation = await Swal.fire({
      title: "¿Eliminar esta parte?",
      text: `Se eliminará ${row.assignment?.title ?? "la parte sin título"} de la sala ${row.room ?? "sin sala"}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
      reverseButtons: true,
    });

    if (!confirmation.isConfirmed) return;

    Swal.fire({
      title: "Eliminando...",
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => Swal.showLoading(),
    });

    this.weeklyProgramService.delete(row.id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        Swal.fire("Eliminada", "La parte semanal fue eliminada.", "success");
        this.loadWeek();
      },
      error: error => Swal.fire("No se pudo eliminar", this.errorMessage(error, "Inténtalo de nuevo."), "error"),
    });
  }

  weekLabel(meeting: Meeting): string { return `Semana ${meeting.weekNumber ?? ""}${meeting.week ? " - " + Utils.showDayOfMeeting(meeting.week, this.selectedCongregation()?.day ?? 1) : ""}`; }
  personName(person: { fullName: string | null } | null): string { return person?.fullName?.trim() || "—"; }
  notificationLabel(row: WeeklyProgramResponse): string { return row.notificationSentAt ? "Enviada" : "Pendiente"; }

  private openDialog(row: WeeklyProgramResponse | null, program: Program): void {
    this.dialog.open(WeeklyProgramFormDialogComponent, {
      width: "min(820px, 96vw)", maxWidth: "96vw", autoFocus: false,
      data: { row, program, congregation: this.selectedCongregation() },
    }).afterClosed().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(saved => { if (saved) this.loadWeek(); });
  }

  private toResponse(row: any, program: Program): WeeklyProgramResponse {
    return {
      id: row.id, assignment: row.assignment ?? null, responsible: row.responsible ?? null, assistant: row.assistant ?? null,
      congregation: row.congregation ?? program.congregation ?? null, programId: row.programId ?? row.program ?? program.id,
      startTime: this.timeValue(row.startTime), room: row.room ?? null, notificationSentAt: this.dateTimeValue(row.notificationSentAt),
    };
  }
  private timeValue(value: unknown): string | null { if (Array.isArray(value)) return value.slice(0, 3).map((v: number) => String(v).padStart(2, "0")).join(":"); return typeof value === "string" ? value.slice(0, 8) : null; }
  private dateTimeValue(value: unknown): string | null { return typeof value === "string" ? value : null; }
  private buildWeekOptions(): WeekOption[] { const seen = new Set<string>(); return this.meetings.map(m => ({ week: this.weekValue(m.week), label: this.weekLabel(m) })).filter(x => !!x.week && !seen.has(x.week) && !!seen.add(x.week)).sort((a,b) => a.week.localeCompare(b.week)); }
  private weekValue(value: unknown): string {
    if (typeof value === "string") return value.split("T")[0];
    // El endpoint histórico /meetings serializa java.sql.Date como timestamp.
    if (typeof value === "number" && Number.isFinite(value)) return new Date(value).toISOString().split("T")[0];
    if (Array.isArray(value) && value.length >= 3) return `${value[0]}-${String(value[1]).padStart(2, "0")}-${String(value[2]).padStart(2, "0")}`;
    return "";
  }
  private resolveCongregation(): number | null { const raw = localStorage.getItem("congregation"); try { const id = raw ? JSON.parse(raw)?.id : null; return this.congregations.some(c => c.id === id) ? id : this.congregations[0]?.id ?? null; } catch { return this.congregations[0]?.id ?? null; } }
  private resolveWeek(): string | null { const today = new Date().toISOString().slice(0,10); return this.weekOptions.find(x => { const start = new Date(x.week); const end = new Date(start); end.setDate(end.getDate()+6); return new Date(today) >= start && new Date(today) <= end; })?.week ?? this.weekOptions.find(x => x.week >= today)?.week ?? this.weekOptions.at(-1)?.week ?? null; }
  private selectedCongregation(): Congregation | undefined { return this.congregations.find(c => c.id === this.selectedCongregationId); }
  private getSelectedProgram(): Program | undefined { return this.programs.find(p => p.congregation?.id === this.selectedCongregationId); }
  private normalizeArray<T>(value: any): T[] { return Array.isArray(value) ? value : Array.isArray(value?.content) ? value.content : []; }
  private handleLoadError(error: ApiErrorResponse): void { this.rows = []; if (error?.status === 404) { this.notify("El programa o catálogo cambió. Se recargaron los datos."); this.loadCatalogs(); } else this.notify(this.errorMessage(error, "No se pudieron cargar las partes de la semana.")); }
  private errorMessage(error: ApiErrorResponse | string, fallback: string): string { if (typeof error === "string") return error || fallback; return error?.errors?.map(item => item.message).filter(Boolean).join(" ") || error?.message || fallback; }
  private notify(message: string): void { this.snackBar.open(message, "Cerrar", { duration: 4500, horizontalPosition: "end", verticalPosition: "top" }); }
}
