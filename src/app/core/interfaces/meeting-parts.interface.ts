export interface MeetingPart {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface MeetingPartRequest {
  title: string;
}
