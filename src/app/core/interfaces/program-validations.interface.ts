export type ValidationSeverity = "INFO" | "ERROR";

export interface ParticipationRef {
  programId: number;
  weeklyProgramId: number | null;
  week: string;
  role: string;
  number: number | null;
  title: string | null;
}

export interface ValidationItem {
  code: string;
  severity: ValidationSeverity;
  message: string;
  related: ParticipationRef[];
}

export interface PersonValidation {
  userId: number;
  fullName: string;
  severity: ValidationSeverity;
  items: ValidationItem[];
}

export interface ProgramValidations {
  programId: number;
  week: string;
  persons: PersonValidation[];
}

export interface ProgramDeleteResponse {
  id: number;
  congregationId: number;
  validations: ProgramValidations[];
}

export interface WeeklyProgramDeleteResponse {
  id: number;
  programId: number;
  validations: ProgramValidations[];
}
