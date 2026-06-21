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
  congregation: Congregation;
  designations: Designation[];
  congregationId?: number;
  publisherTooltipText?: string;
}

export interface Designation {
  id: number;
  description: string;
  dateAssigned: string;
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
  weeklyPrograms: WeeklyProgram[];
  assembly: string;
}

interface InitialSong {
  id: number;
  songNumber: number;
  title: string;
  source: string;
  createdAt: number[];
  updatedAt: number[];
}
export interface WeeklyProgram {
  id?: number;
  assignment: Assignment;
  responsible?: Publisher | null;
  assistant?: Publisher | null;
  congregation: Congregation;
  program: number;
  startTime?: string;
  room: string;
  notificationSentAt?: string | null;
}
export interface WeeklyProgramUpsertByTitleRequest {
  weeklyProgramId?: number;
  programId: number;
  congregationId: number;
  title: string;
  number: number;
  sectionMeeting: string;
  time?: number;
  timeType: string;
  showTips: boolean;
  responsibleId?: number | null;
  assistantId?: number | null;
  startTime?: string | null;
  room: string;
}
export interface Assignment {
  id?: number;
  time?: number | number;
  timeType: string;
  title: string;
  tips?: string;
  sectionMeeting: string;
  showTips: boolean;
  number: number;
  meeting: Meeting;
}

export interface Congregation {
  id: number;
  name: string;
  number: string;
  hour: string;
  day: number;
  assistantAdviser?: Publisher | undefined | null;
  fontColorPublisher?: string;
}
export interface Meeting {
  id: number;
  week: number;
  weekNumber: number;
  openingSong: string;
  introTime: number;
  timeType: string;
  intermediateSong: string;
  finalSong: string;
  url: string;
  assignmentType: any;
  weeklyBibleReading: string;
  initialSong?: InitialSong;
  middleSong?: InitialSong;
  lastSong?: InitialSong;
}

export interface Room {
  id: number;
  room: string;
  adviser: Publisher;
  congregation: Congregation;
}
export interface SendNotidicationReques {
  userId: number;
  programId: number;
  templateNumber: number;
  assignmentType: string;
}

export interface DataTable {
  user: Publisher;
  programId: number;
  templateNumber: number;
  assignmentType: string;
}

export type NotifyType = "success" | "info" | "warning" | "error";

export interface NotifyOptions {
  message: string;
  title?: string;
  type?: NotifyType;

  /** default: 3500 */
  durationMs?: number;

  /** Texto del CTA opcional (ej: "Ver") */
  actionText?: string;
}
