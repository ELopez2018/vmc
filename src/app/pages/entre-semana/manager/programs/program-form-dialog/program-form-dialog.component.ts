import { CommonModule } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { finalize } from "rxjs";
import { ApiErrorResponse, BackendTime, Congregation, Meeting, Program, ProgramFormValues } from "src/app/core/interfaces/reuniones.interface";
import { ProgramService } from "src/app/core/services/program/program.service";
import { MaterialModule } from "src/app/shared/material.module";
import { Utils } from "src/app/shared/Utils";

export interface ProgramFormDialogData {
  congregations: Congregation[];
  meetings: Meeting[];
  program?: Program | null;
  congregationId?: number | null;
  meetingId?: number | null;
}

@Component({
  selector: "vmc-program-form-dialog",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MaterialModule],
  templateUrl: "./program-form-dialog.component.html",
  styleUrls: ["./program-form-dialog.component.scss"],
})
export class ProgramFormDialogComponent implements OnInit {
  saving = false;

  readonly programForm = new FormGroup({
    meetingId: new FormControl<number | null>(null, Validators.required),
    congregationId: new FormControl<number | null>(null, Validators.required),
    weekNumber: new FormControl<number | null>(null, [Validators.min(1)]),
    event: new FormControl<string | null>(null, [Validators.maxLength(255)]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ProgramFormDialogData,
    private dialogRef: MatDialogRef<ProgramFormDialogComponent, boolean>,
    private programService: ProgramService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.patchInitialValue();
  }

  onMeetingChange(meetingId: number | null): void {
    const meeting = this.data.meetings.find((item) => item.id === meetingId);
    this.programForm.patchValue({ weekNumber: meeting?.weekNumber ?? null });
  }

  save(): void {
    if (this.programForm.invalid) {
      this.programForm.markAllAsTouched();
      return;
    }

    this.saving = true;
    const request = this.buildRequest();
    const saveRequest$ = this.data.program?.id ? this.programService.update(this.data.program.id, request) : this.programService.create(request);

    saveRequest$
      .pipe(
        finalize(() => {
          this.saving = false;
        }),
      )
      .subscribe({
        next: () => {
          this.notify(this.data.program?.id ? "Programa actualizado." : "Programa creado.");
          this.dialogRef.close(true);
        },
        error: (error) => {
          this.notify(this.getErrorMessage(error, "No se pudo guardar el programa."));
        },
      });
  }

  getMeetingLabel(meeting: Meeting | null | undefined): string {
    if (!meeting) {
      return "Sin reunion";
    }

    return `Semana ${meeting.weekNumber ?? ""}${meeting.week ? " - " + Utils.showDayOfMeeting(meeting.week, this.getSelectedCongregationDay()) : ""}`;
  }

  getProgramError(): string | null {
    if (this.programForm.get("meetingId")?.hasError("required")) {
      return "Selecciona la reunion.";
    }

    if (this.programForm.get("congregationId")?.hasError("required")) {
      return "Selecciona la congregacion.";
    }

    return null;
  }

  private patchInitialValue(): void {
    const program = this.data.program;
    const congregationId = program?.congregation?.id ?? this.data.congregationId ?? null;
    const meetingId = program?.meeting?.id ?? this.data.meetingId ?? null;
    const meeting = this.data.meetings.find((item) => item.id === meetingId);

    this.programForm.reset({
      meetingId,
      congregationId,
      weekNumber: program?.weekNumber ?? meeting?.weekNumber ?? null,
      event: program?.event ?? null,
    });
  }

  private getSelectedCongregationDay(): number {
    const congregationId = this.programForm.get("congregationId")?.value ?? this.data.congregationId;

    return this.data.congregations.find((congregation) => congregation.id === congregationId)?.day ?? 1;
  }

  private buildRequest(): ProgramFormValues {
    const formValue = this.programForm.getRawValue();
    const program = this.data.program;

    return {
      meetingId: Number(formValue.meetingId),
      congregationId: Number(formValue.congregationId),
      weekNumber: formValue.weekNumber ?? null,
      startTimeOpeningSong: this.toApiTime(program?.startTimeOpeningSong),
      startTimeIntro: this.toApiTime(program?.startTimeIntro),
      startTimeIntermediateSong: this.toApiTime(program?.startTimeIntermediateSong),
      startTimeConclusionWords: this.toApiTime(program?.startTimeConclusionWords),
      startTimeFinalSong: this.toApiTime(program?.startTimeFinalSong),
      event: formValue.event?.trim() || null,
      openingPrayerId: program?.openingPrayer?.id ?? null,
      presidentId: program?.president?.id ?? null,
      assistantAdviserId: program?.assistantAdviser?.id ?? null,
      finalPrayerId: program?.finalPrayer?.id ?? null,
    };
  }

  private toApiTime(value: BackendTime | null | undefined): string | null {
    if (!value) {
      return null;
    }

    if (Array.isArray(value)) {
      const [hours = 0, minutes = 0, seconds] = value;
      const normalizedTime = [hours, minutes].map((item) => item.toString().padStart(2, "0")).join(":");

      return seconds === undefined ? normalizedTime : `${normalizedTime}:${seconds.toString().padStart(2, "0")}`;
    }

    return value;
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
}
