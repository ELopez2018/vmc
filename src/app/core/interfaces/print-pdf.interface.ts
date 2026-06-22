import { Program, Publisher, WeeklyProgram } from "./reuniones.interface";

export interface ProgramPdf extends Program {
  weeklyPrograms: WeeklyProgramPdF[];
}
export interface WeeklyProgramPdF extends WeeklyProgram {
  responsible: Publisher | null;
  assistant: Publisher | null;
  responsibleB: Publisher | null;
  assistantB: Publisher | null;
}
