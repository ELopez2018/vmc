/** Modelos del CRUD de /weeklyProgram. No reutilizar el modelo legado WeeklyProgram. */
export interface UserLite {
  id: number;
  fullName: string | null;
  email: string | null;
  congregationId: number | null;
}

export interface CongregationLite {
  id: number;
  name: string | null;
  number: string | null;
}

export interface AssignmentLite {
  id: number;
  number: number | null;
  title: string | null;
  sectionMeeting: string | null;
  time: number | null;
  timeType: string | null;
  sourceText: string | null;
  sourceHtml: string | null;
  sourceLinks: string | null;
  sourceUrl: string | null;
}

export interface WeeklyProgramResponse {
  id: number;
  assignment: AssignmentLite | null;
  responsible: UserLite | null;
  assistant: UserLite | null;
  congregation: CongregationLite | null;
  programId: number;
  startTime: string | null;
  room: string | null;
  notificationSentAt: string | null;
}

export interface WeeklyProgramCreateRequest {
  assignmentId: number;
  responsibleId?: number | null;
  assistantId?: number | null;
  congregationId?: number | null;
  programId: number;
  startTime?: string | null;
  room?: string | null;
  notificationSentAt?: string | null;
}

export interface WeeklyProgramUpdateRequest extends WeeklyProgramCreateRequest {
  id: number;
}
