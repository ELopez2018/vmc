import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Apis, Servers } from "../../constants/servers";
import { finalize, Observable, tap } from "rxjs";
import { Designation, Publisher, Room, UserSaveRequest } from "../../interfaces/reuniones.interface";
import { AssignmentCandidatesRequest, AssignmentCandidatesResponse, PublisherHistoryItem } from "../../interfaces/publishers.interface";
import { LoaderService } from "../loader/loader.service";
import { normalizeAssignmentTypeValue } from "../../enums/assignments.enums";
import { BalancedAssignmentPairRequest, BalancedAssignmentPairResponse } from "../../interfaces/assignment-balancing.interface";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  private server = Servers.URL;
  private api = Apis;
  constructor(
    private httpClient: HttpClient,
    private loaderService: LoaderService,
  ) {}

  getAllUsers(): Observable<any> {
    const url = `${this.server}${this.api.USERS}`;
    return this.httpClient.get(url);
  }

  getBalancedAssignmentPairs(request: BalancedAssignmentPairRequest): Observable<BalancedAssignmentPairResponse> {
    return this.httpClient.post<BalancedAssignmentPairResponse>(`${this.server}/assignment-balancing/pairs`, request);
  }

  getUsersByCongregation(congregationId: number): Observable<any> {
    this.loaderService.setLoaderSearchPublisher(true);
    const url = `${this.server}${this.api.USERS}/by-congregation/${congregationId}`;
    return this.httpClient.get(url).pipe(
      tap((data) => {
        this.loaderService.setLoaderSearchPublisher(false);
      }),
    );
  }

  save(publisher: UserSaveRequest): Observable<Publisher> {
    const url = `${this.server}${this.api.USERS}`;
    return this.httpClient.post<Publisher>(url, publisher);
  }

  delete(publisher: Pick<Publisher, "id">): Observable<Publisher> {
    const url = `${this.server}${this.api.USERS}`;

    return this.httpClient.delete<Publisher>(url, { body: { id: publisher.id } });
  }

  getDesignations(userId: number): Observable<Designation[]> {
    return this.httpClient.get<Designation[]>(`${this.server}${this.api.USERS}/${userId}/designations`);
  }

  addDesignation(userId: number, designationId: number): Observable<Designation[]> {
    return this.httpClient.post<Designation[]>(`${this.server}${this.api.USERS}/${userId}/designations`, { designationId });
  }

  removeDesignation(userId: number, designationId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.server}${this.api.USERS}/${userId}/designations/${designationId}`);
  }

  getPublishersByAssignment(request: AssignmentCandidatesRequest): Observable<AssignmentCandidatesResponse> {
    const { assignment, congregationId, dateAssignment, room, assignmentTitle, sectionMeeting, assignmentNumber } = request;
    this.loaderService.setLoaderSearchPublisher(true);
    const assignmentType = normalizeAssignmentTypeValue(assignment);
    let params = new HttpParams()
      .set("assignment", assignmentType)
      .set("congregationId", String(congregationId))
      .set("dateAssignment", dateAssignment)
      .set("room", room ?? "")
      .set("assignmentTitle", assignmentTitle ?? "");

    if (sectionMeeting?.trim()) {
      params = params.set("sectionMeeting", sectionMeeting.trim());
    }

    if (assignmentNumber != null) {
      params = params.set("assignmentNumber", String(assignmentNumber));
    }

    // La misma asignación se usa en ambas salas; el rol identifica la columna del participante.
    if (request.assignmentId != null) {
      params = params.set("assignmentId", String(request.assignmentId));
    }
    if (request.participantRole) {
      params = params.set("participantRole", request.participantRole);
    }
    if (request.sort) {
      params = params.set("sort", request.sort);
    }

    const url = `${this.server}${this.api.USERS}/by-congregation/participated-and-authorized-by-assignment`;

    return this.httpClient.get<AssignmentCandidatesResponse>(url, { params }).pipe(
      finalize(() => {
        this.loaderService.setLoaderSearchPublisher(false);
      }),
    );
  }

  /** @deprecated Usa getPublishersByAssignment. */
  getPublihersByAssignment(
    assignment: string,
    congregationId: number,
    dateAssignment: string,
    room: string,
    assignmentTitle: string,
    sectionMeeting?: string,
    assignmentNumber?: number | null,
  ): Observable<AssignmentCandidatesResponse> {
    return this.getPublishersByAssignment({ assignment, congregationId, dateAssignment, room, assignmentTitle, sectionMeeting, assignmentNumber });
  }

  getPublishersHistoryByCongregation(congregationId: number, dateAssignment: string, room?: string, assignmentTitle?: string): Observable<PublisherHistoryItem[]> {
    this.loaderService.setLoaderSearchPublisher(true);
    const roomParam = encodeURIComponent(room ?? "");
    const assignmentTitleParam = encodeURIComponent(assignmentTitle ?? "");
    const dateAssignmentParam = encodeURIComponent(dateAssignment);
    const url = `${this.server}${this.api.USERS}/by-congregation/publishers-history?congregationId=${congregationId}&dateAssignment=${dateAssignmentParam}&room=${roomParam}&assignmentTitle=${assignmentTitleParam}`;

    return this.httpClient.get<PublisherHistoryItem[]>(url).pipe(
      finalize(() => {
        this.loaderService.setLoaderSearchPublisher(false);
      }),
    );
  }

  getById(userId: number): Observable<any> {
    this.loaderService.setLoaderSearchPublisher(true);
    const url = `${this.server}${this.api.USERS}/${userId}`;
    return this.httpClient.get<any>(url).pipe(
      finalize(() => {
        this.loaderService.setLoaderSearchPublisher(false);
      }),
    );
  }

  convertUserToSaveRequest(user: Publisher): UserSaveRequest {
    return {
      ...(user.id ? { id: user.id } : {}),
      fullName: user.fullName ?? null,
      firstName: user.firstName ?? null,
      secondName: user.secondName ?? null,
      lastName: user.lastName ?? null,
      surname: user.surname ?? null,
      image: user.image ?? null,
      email: user.email ?? null,
      documentNumber: user.documentNumber ?? null,
      documentType: user.documentType ?? null,
      cellPhone: user.cellPhone ?? null,
      phone: user.phone ?? null,
      gender: user.gender ?? null,
      frequency: user.frequency ?? null,
      birthdate: user.birthdate ?? null,
      congregationId: user.congregationId ?? user.myCongregationId ?? user.congregation?.id ?? 0,
    };
  }
}
//users/by-congregation/by-assignment?assignment=president&congregationId=2
