import { Assignment, AssignmentType, Publisher } from "./reuniones.interface";

export type BalancedAssignmentUser = Pick<Publisher, "id" | "fullName" | "email" | "congregationId">;

export interface BalancedAssignmentPairRequest {
  congregationId: number;
  assignmentId?: number;
  responsibleAssignmentTypeId?: number;
  assistantAssignmentTypeId?: number;
  targetDate?: string;
  room?: string;
  periodStartDate?: string;
  periodEndDate?: string;
  recentWeeks?: number;
  limit?: number;
  excludeUserIds?: number[];
  includeIneligible?: boolean;
}

export interface BalancedAssignmentCandidate {
  user: BalancedAssignmentUser;
  eligible: boolean;
  score: number;
  stats: {
    assignmentTypeCount: number;
    globalCount: number;
    roomCount: number;
    recentAssignmentTypeCount: number;
    partnerCount: number;
    recentPartnerCount: number;
    lastAssignmentTypeDate: string | null;
    lastGlobalDate: string | null;
    lastRoomDate: string | null;
    lastPartnerDate: string | null;
  };
  scoreBreakdown: {
    assignmentTypeBalance: number;
    globalBalance: number;
    roomBalance: number;
    recencyPenalty: number;
    repeatedPartnerPenalty: number;
    neverAssignedBonus: number;
    ineligiblePenalty: number;
    total: number;
  };
  restrictions: string[];
}

export interface BalancedAssignmentPairStats {
  partnerCount: number;
  recentPartnerCount: number;
  lastPartnerDate: string | null;
}

export interface BalancedAssignmentPairRotation {
  applies: boolean;
  tier: number;
}

export interface BalancedAssignmentPairCandidate {
  responsible: BalancedAssignmentCandidate;
  assistant: BalancedAssignmentCandidate;
  eligible: boolean;
  score: number;
  pairStats: BalancedAssignmentPairStats;
  repeatedPartnerPenalty: number;
  rotation: BalancedAssignmentPairRotation;
  restrictions: string[];
}

export interface BalancedAssignmentPairResponse {
  congregationId: number;
  assignment: Partial<Assignment> | null;
  responsibleAssignmentType: AssignmentType;
  assistantAssignmentType: AssignmentType;
  targetWeek: string;
  room: string | null;
  effectivePeriod: { startDate: string | null; endDate: string; fullHistory: boolean };
  recentWeeks: number;
  pairs: BalancedAssignmentPairCandidate[];
}

export interface AssignmentPairSelection {
  kind: "pair";
  pair: BalancedAssignmentPairCandidate;
}
