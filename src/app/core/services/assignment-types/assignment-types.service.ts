import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Apis, Servers } from "../../constants/servers";
import { AssignmentType } from "../../interfaces/reuniones.interface";

@Injectable({
  providedIn: "root",
})
export class AssignmentTypesService {
  private readonly server = Servers.URL;
  private readonly api = Apis;

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<AssignmentType[]> {
    const url = `${this.server}${this.api.ASSIGNMENT_TYPES}`;
    return this.httpClient.get<AssignmentType[]>(url);
  }
}
