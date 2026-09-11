import { CommonModule } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { finalize } from "rxjs";
import { Congregation, Program, Publisher } from "src/app/core/interfaces/reuniones.interface";
import { AssignmentLite, WeeklyProgramCreateRequest, WeeklyProgramResponse, WeeklyProgramUpdateRequest } from "src/app/core/interfaces/weekly-programs.interface";
import { UsersService } from "src/app/core/services/users/users.service";
import { WeeklyProgramService } from "src/app/core/services/weeklyProgram/WeeklyProgram.service";
import { MaterialModule } from "src/app/shared/material.module";

export interface WeeklyProgramFormDialogData { row: WeeklyProgramResponse | null; program: Program; congregation?: Congregation; }

@Component({
  selector: "vmc-weekly-program-form-dialog",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MaterialModule],
  templateUrl: "./weekly-program-form-dialog.component.html",
  styleUrls: ["./weekly-program-form-dialog.component.scss"],
})
export class WeeklyProgramFormDialogComponent implements OnInit {
  saving = false;
  users: Publisher[] = [];
  assignments: AssignmentLite[] = [];
  readonly form = new FormGroup({
    assignmentId: new FormControl<number | null>(null, Validators.required),
    responsibleId: new FormControl<number | null>(null),
    assistantId: new FormControl<number | null>(null),
    startTime: new FormControl<string | null>(null),
    room: new FormControl<string | null>(null, [Validators.maxLength(1)]),
    notificationSentAt: new FormControl<string | null>(null),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly data: WeeklyProgramFormDialogData,
    private readonly dialogRef: MatDialogRef<WeeklyProgramFormDialogComponent, boolean>,
    private readonly weeklyProgramService: WeeklyProgramService,
    private readonly usersService: UsersService,
    private readonly snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.assignments = this.uniqueAssignments();
    const row = this.data.row;
    this.form.reset({
      assignmentId: row?.assignment?.id ?? null,
      responsibleId: row?.responsible?.id ?? null,
      assistantId: row?.assistant?.id ?? null,
      startTime: row?.startTime?.slice(0, 5) ?? null,
      room: row?.room ?? null,
      notificationSentAt: this.toDateTimeLocal(row?.notificationSentAt ?? null),
    });
    const congregationId = this.data.congregation?.id ?? this.data.program.congregation?.id;
    if (congregationId) this.loadUsers(congregationId);
  }

  save(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const request = this.buildRequest();
    if (!request) { this.notify("La asignación seleccionada ya no está disponible."); return; }
    this.saving = true;
    const request$ = this.data.row ? this.weeklyProgramService.updateById(this.data.row.id, { ...request, id: this.data.row.id }) : this.weeklyProgramService.create(request);
    request$.pipe(finalize(() => this.saving = false)).subscribe({
      next: () => { this.notify(this.data.row ? "Parte actualizada." : "Parte creada."); this.dialogRef.close(true); },
      error: error => this.notify(this.errorMessage(error, "No se pudo guardar la parte.")),
    });
  }

  assignmentLabel(assignment: AssignmentLite): string {
    return `${assignment.number ?? "—"} · ${assignment.sectionMeeting ?? "Sin sección"} · ${assignment.title ?? "Sin título"}`;
  }

  private loadUsers(congregationId: number): void {
    this.usersService.getUsersByCongregation(congregationId).subscribe({
      next: users => this.users = this.normalizeUsers(users),
      error: () => this.notify("No se pudo cargar el listado de publicadores."),
    });
  }

  private buildRequest(): WeeklyProgramCreateRequest | null {
    const value = this.form.getRawValue();
    const assignmentId = value.assignmentId;
    const congregationId = this.data.program.congregation?.id ?? this.data.congregation?.id;
    if (!assignmentId || !this.assignments.some(assignment => assignment.id === assignmentId) || !this.data.program.id || !congregationId) return null;
    return {
      assignmentId, programId: this.data.program.id, congregationId,
      responsibleId: value.responsibleId ?? null, assistantId: value.assistantId ?? null,
      startTime: value.startTime || null, room: value.room?.trim().toUpperCase() || null,
      notificationSentAt: value.notificationSentAt || null,
    };
  }

  private uniqueAssignments(): AssignmentLite[] {
    const source = [...(this.data.program.weeklyPrograms ?? []).map(item => item.assignment), this.data.row?.assignment].filter(Boolean) as AssignmentLite[];
    return [...new Map(source.map(item => [item.id, item])).values()].sort((a, b) => (a.number ?? 9999) - (b.number ?? 9999));
  }
  private normalizeUsers(value: any): Publisher[] { const users = Array.isArray(value) ? value : Array.isArray(value?.content) ? value.content : []; return users.filter((user: Publisher) => !!user?.id && !user.deletedAt); }
  private toDateTimeLocal(value: string | null): string | null { return value ? value.slice(0, 16) : null; }
  private errorMessage(error: any, fallback: string): string { if (typeof error === "string") return error || fallback; return error?.errors?.map((item: any) => item.message).filter(Boolean).join(" ") || error?.message || fallback; }
  private notify(message: string): void { this.snackBar.open(message, "Cerrar", { duration: 4500, horizontalPosition: "end", verticalPosition: "top" }); }
}
