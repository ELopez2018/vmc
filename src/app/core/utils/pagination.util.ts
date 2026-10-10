import { HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";

export interface PaginationRequest {
  /** Índice de página basado en cero. */
  page?: number;
  size?: number;
}

/** Añade la paginación global conservando los filtros de la consulta. */
export function buildPaginationParams(request: PaginationRequest = {}, params = new HttpParams()): HttpParams {
  const page = Number.isInteger(request.page) && request.page! >= 0
    ? request.page! : environment.pagination.initialPage;
  const size = Number.isInteger(request.size) && request.size! > 0
    ? request.size! : environment.pagination.pageSize;
  return params.set("page", String(page)).set("size", String(size));
}
