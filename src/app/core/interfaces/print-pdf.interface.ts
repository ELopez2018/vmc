import { Program, Publisher, WeeklyProgram } from "./reuniones.interface";

export interface ProgramPdf extends Program {
  weeklyProgram: WeeklyProgramPdF[]
}
export interface WeeklyProgramPdF extends WeeklyProgram {
  responsible: any;
  assistant: any;
  responsibleB: Publisher | null | undefined;
  assistantB: Publisher | null | undefined;
}
