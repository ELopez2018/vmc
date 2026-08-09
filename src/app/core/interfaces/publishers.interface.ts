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

export interface PublisherHistoryItem {
  user: Publisher;
  userEnt: Publisher;
  count: number;
  lastDate: string | null;
  all: number;
  lastAssignByRoom: string | null;
  lastAssignGlobal: string | null;
}
