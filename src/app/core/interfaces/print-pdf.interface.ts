import { Program, Publisher, WeeklyProgram } from "./reuniones.interface";

export interface ProgramPdf extends Program {
  weeklyPrograms: WeeklyProgramPdF[];
}
export interface WeeklyProgramPdF extends WeeklyProgram {
  responsible: Publisher;
  assistant: Publisher;
  responsibleB: any;
  assistantB: any;
}
