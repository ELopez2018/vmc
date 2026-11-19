import { Publisher } from "./reuniones.interface";

export type AssignmentParticipantRole = "responsible" | "assistant";
export type AssignmentCandidatesSort =
  | "lastAssignmentAsc"
  | "lastAssignmentDesc"
  | "lastGlobalAssignmentAsc"
  | "lastGlobalAssignmentDesc";

/** Contexto del selector. El título y el número describen la parte actual, no su historial. */
export interface AssignmentCandidatesRequest {
  assignment: string;
  congregationId: number;
  dateAssignment: string;
  room: string;
  assignmentId?: number;
  participantRole?: AssignmentParticipantRole;
  assignmentTitle: string;
  sectionMeeting?: string;
  assignmentNumber?: number | null;
  /** Si se omite, el backend usa lastGlobalAssignmentAsc. */
  sort?: AssignmentCandidatesSort;
}

export interface PublisherDto {
  total: number;
  publisher: Publisher;
}

export interface ResponsibleCountDTO {
  count: number;
  user: Publisher;
  lastDate?: number;
  all?: number;
}

export type AssignmentDate = string | number | [number, number, number] | null;

export interface UserAssignmentHistory {
  /** Última fecha del tipo y rol consultados, considerando ambas salas. */
  lastAssignment: AssignmentDate;
  /** Total global de participaciones; no es el contador del tipo o rol. */
  allAssignments: number;
  /** Última participación global, incluidos los cargos del programa. */
  dateLastAssignment: AssignmentDate;
  daysSinceLastIntervention: number | null;
  // Días desde dateAssignment hasta la próxima participación; null si no hay.
  inNearFuture: number | null;
}

export interface UserByTypeResponse {
  user: Publisher;
  history: UserAssignmentHistory;
}

export interface AssignmentCandidateViewModel {
  user: Publisher;
  lastAssignment: AssignmentDate;
  allAssignments: number;
  dateLastAssignment: AssignmentDate;
  daysSinceLastIntervention: number | null;
  inNearFuture: number | null;
  participate?: boolean;
}

export interface AssignmentCandidatesResponse {
  frequent: UserByTypeResponse[];
  brothers: UserByTypeResponse[];
  sisters: UserByTypeResponse[];
}

export function toAssignmentCandidate(item: UserByTypeResponse): AssignmentCandidateViewModel {
  return {
    user: item.user,
    lastAssignment: item.history.lastAssignment,
    allAssignments: item.history.allAssignments,
    dateLastAssignment: item.history.dateLastAssignment,
    daysSinceLastIntervention: item.history.daysSinceLastIntervention,
    inNearFuture: item.history.inNearFuture ?? null,
  };
}

export interface PublisherHistoryItem {
  user: Publisher;
  userEnt: Publisher;
  count: number;
  lastDate: string | null;
  all: number;
  lastAssignByRoom: string | null;
  lastAssignGlobal: string | null;
}
