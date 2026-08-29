import { Publisher } from "./reuniones.interface";

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

export interface UserAssignmentHistory {
  lastAssignment: string | null;
  allAssignments: number;
  dateLastAssignment: string | null;
}

export interface UserByTypeResponse {
  user: Publisher;
  history: UserAssignmentHistory;
}

export interface AssignmentCandidateViewModel {
  user: Publisher;
  lastAssignment: string | null;
  allAssignments: number;
  dateLastAssignment: string | null;
}

export function toAssignmentCandidate(item: UserByTypeResponse): AssignmentCandidateViewModel {
  return {
    user: item.user,
    lastAssignment: item.history.lastAssignment,
    allAssignments: item.history.allAssignments,
    dateLastAssignment: item.history.dateLastAssignment,
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
