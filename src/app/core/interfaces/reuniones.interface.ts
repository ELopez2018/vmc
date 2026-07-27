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
export type BackendTime = string | number[];
export type BackendDateTime = string | number[];

export interface Publisher {
  id: number;
  fullName: string;
  image?: string | null;
  firstName: string;
  secondName?: string | null;
  lastName?: string | null;
  surname: string;
  birthdate?: string | null;
  gender?: string | null;
  documentNumber?: number | null;
  documentType?: string | null;
  cellPhone?: string | null;
  phone?: string | null;
  email?: string | null;
  password?: string | null;
  accessCode?: string | null;
  deletedAt?: BackendDateTime | null;
  congregation?: Congregation;
  designations: Designation[];
  assignmentTypePermissions?: AssignmentTypePermission[];
  enabled?: boolean;
  authorities?: unknown[];
  accountNonLocked?: boolean;
  accountNonExpired?: boolean;
  credentialsNonExpired?: boolean;
  username?: string | null;
  myCongregationId?: number;
  congregationId?: number;
  publisherTooltipText?: string;
}

export interface Designation {
  id: number;
  description: string;
  dateAssigned?: string | null;
}

export interface AssignmentTypePermission {
  userId?: number | null;
  assignmentTypeId: number;
  assignmentTypeDescription: string;
  assignmentTypeNumber: number | null;
  enabled: boolean;
}

export interface AssignmentType {
  id: number;
  description: string;
  number: number | null;
  type?: string | null;
  sectionMeetingId?: number | null;
  sectionMeetingTitle?: string | null;
}

export interface UserAssignmentTypeBulkUpdateRequest {
  userId: number;
  assignments: UserAssignmentTypeBulkUpdateItem[];
}

export interface UserAssignmentTypeBulkUpdateItem {
  assignmentTypeId: number;
  enabled: boolean;
}

/// news
export interface Program {
  id: number;
  meeting: Meeting;
  weekNumber: number;
  startTimeOpeningSong: BackendTime;
  startTimeIntro: BackendTime;
  startTimeIntermediateSong: BackendTime;
  startTimeFinalSong: BackendTime;
  startTimeConclusionWords: BackendTime;
  openingPrayer?: Publisher | null;
  president?: Publisher | null;
  assistantAdviser?: Publisher | null;
  finalPrayer?: Publisher | null;
  congregation: Congregation;
  weeklyPrograms: WeeklyProgram[];
  assembly: string | null;
}

export interface Song {
  id: number;
  songNumber: number;
  title: string;
  source: string;
  createdAt: BackendDateTime;
  updatedAt: BackendDateTime;
}
export interface WeeklyProgram {
  id?: number;
  assignment: Assignment;
  responsible?: Publisher | null;
  assistant?: Publisher | null;
  congregation: Congregation;
  program: number;
  startTime?: BackendTime | null;
  room: string;
  notificationSentAt?: BackendDateTime | null;
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
export interface AssignmentSourceLink {
  text: string;
  url: string;
}
export interface Assignment {
  id?: number;
  time?: number;
  timeType: string;
  title: string;
  tips?: string | null;
  sectionMeeting: string;
  showTips: boolean;
  number: number;
  sourceText?: string | null;
  sourceHtml?: string | null;
  sourceLinks?: string | null;
  sourceUrl?: string | null;
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
  deletedAt?: BackendDateTime | null;
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
  assignmentType?: any;
  weeklyBibleReading: string;
  initialSong?: Song;
  middleSong?: Song;
  lastSong?: Song;
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

export interface FieldValidationError {
  field: string;
  message: string;
}

export interface ApiErrorResponse {
  timestamp?: number;
  status?: number;
  error?: string;
  message?: string;
  path?: string;
  errors?: FieldValidationError[];
}
