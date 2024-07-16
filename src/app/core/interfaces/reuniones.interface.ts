export interface Asignacion {
  tips: string;
  showtips: boolean;
  numero: number;
  title: string;
  tiempo: number;
  medida: string;
  puntoConsejo: number;
  encargado: string;
  ayudante: string;
  pos: number;
  seccion: string;
}
export interface Publisher {
  id: number;
  fullName: string;
  image?: any;
  firstName: string;
  secondName: string;
  lastName: string;
  surname: string;
  birthdate?: any;
  gender?: any;
  documentNumber?: any;
  documentType?: any;
  cellPhone?: any;
  phone?: any;
  email?: any;
  designations: any[];
}
/// news
export interface Program {
  id: number;
  meeting: Meeting;
  startTimeOpeningSong: string;
  startTimeIntro: string;
  startTimeIntermediateSong: string;
  startTimeFinalSong: string;
  startTimeConclusionWords: string;
  openingPrayer?: Publisher;
  president?: Publisher;
  assistantAdviser?: Publisher;
  finalPrayer?: Publisher;
  congregation: Congregation;
  weeklyProgram: WeeklyProgram[];
}
export interface WeeklyProgram {
  id: number;
  assignment: Assignment;
  responsible?: Publisher;
  assistant?: Publisher;
  congregation: Congregation;
  program: number;
}
export interface Assignment {
  id: number;
  time?: number | number;
  timeType: string;
  title: string;
  pointNumber?: any;
  tips?: string;
  sectionMeeting: string;
  showTips: boolean;
  number: number;
  position: any;
  startTime: string;
}
export interface Congregation {
  id: number;
  name: string;
  number: string;
  hour: string;
  assistantAdviser?: Publisher | undefined | null;
}
export interface Meeting {
  id: number;
  week: string;
  weekNumber: number;
  openingSong: string;
  introTime: number;
  timeType: string;
  intermediateSong: string;
  finalSong: string;
  url: string;
  assignmentType: any;
}
