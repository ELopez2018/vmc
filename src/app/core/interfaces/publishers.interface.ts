import { Publisher } from "./reuniones.interface";

export interface PublisherDto {
  total: number;
  publisher: Publisher;
}

export interface ResponsibleCountDTO {
  count: number;
  user: Publisher;
}
