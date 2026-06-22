import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Apis, Servers } from "../../constants/servers";
import { AssignmentTypePermission, UserAssignmentTypeBulkUpdateRequest } from "../../interfaces/reuniones.interface";

@Injectable({
  providedIn: "root",
})
export class UserAssignmentTypesService {
  private readonly server = Servers.URL;
  private readonly api = Apis;

  constructor(private httpClient: HttpClient) {}

  updateBulk(request: UserAssignmentTypeBulkUpdateRequest): Observable<AssignmentTypePermission[]> {
    const url = `${this.server}${this.api.USER_ASSIGNMENT_TYPES}/bulk`;

    return this.httpClient.put<AssignmentTypePermission[]>(url, request);
  }
}
