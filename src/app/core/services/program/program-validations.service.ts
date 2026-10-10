import { Injectable, signal } from "@angular/core";
import { PersonValidation, ProgramValidations } from "../../interfaces/program-validations.interface";

@Injectable({ providedIn: "root" })
export class ProgramValidationsService {
  private readonly state = signal<ReadonlyMap<number, PersonValidation[]>>(new Map());
  readonly validationsByProgram = this.state.asReadonly();

  setProgramValidations(programId: number, persons: PersonValidation[]): void {
    this.state.update((current) => new Map(current).set(programId, [...persons]));
  }

  /** Cada respuesta sustituye a las personas del programa, incluso si está vacía. */
  applyValidations(updated: ProgramValidations[] | null | undefined): void {
    if (!updated?.length) return;
    this.state.update((current) => {
      const next = new Map(current);
      for (const program of updated) next.set(program.programId, [...program.persons]);
      return next;
    });
  }

  validationsFor(programId: number, userId: number | null | undefined): PersonValidation | undefined {
    if (userId == null) return undefined;
    return this.state().get(programId)?.find((person) => person.userId === userId);
  }

  removeProgram(programId: number): void {
    this.state.update((current) => {
      const next = new Map(current);
      next.delete(programId);
      return next;
    });
  }
}
