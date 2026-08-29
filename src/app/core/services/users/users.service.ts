import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Apis, Servers } from "../../constants/servers";
import { finalize, Observable, tap } from "rxjs";
import { Publisher, Room } from "../../interfaces/reuniones.interface";
import { PublisherHistoryItem, UserByTypeResponse } from "../../interfaces/publishers.interface";
import { LoaderService } from "../loader/loader.service";
import { normalizeAssignmentTypeValue } from "../../enums/assignments.enums";

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

  getUsersByCongregation(congregationId: number): Observable<any> {
    this.loaderService.setLoaderSearchPublisher(true);
    const url = `${this.server}${this.api.USERS}/by-congregation/${congregationId}`;
    return this.httpClient.get(url).pipe(
      tap((data) => {
        this.loaderService.setLoaderSearchPublisher(false);
      }),
    );
  }

  save(publisher: Publisher): Observable<any> {
    const url = `${this.server}${this.api.USERS}`;
    return this.httpClient.post<Publisher>(url, this.convertUserToSaveRequest(publisher)).pipe(tap((data) => console.log(data)));
  }

  delete(publisher: Publisher): Observable<any> {
    const url = `${this.server}${this.api.USERS}`;

    return this.httpClient
      .delete<Publisher>(url, {
        body: this.convertUserToSaveRequest(publisher),
      })
      .pipe(tap((data) => console.log(data)));
  }

  getPublishersByAssignment(
    assignment: string,
    congregationId: number,
    dateAssignment: string,
    room: string,
    assignmentTitle: string,
    sectionMeeting?: string,
    assignmentNumber?: number | null,
  ): Observable<UserByTypeResponse[]> {
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

    const url = `${this.server}${this.api.USERS}/by-congregation/by-assignment`;

    return this.httpClient.get<UserByTypeResponse[]>(url, { params }).pipe(
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
  ): Observable<UserByTypeResponse[]> {
    return this.getPublishersByAssignment(assignment, congregationId, dateAssignment, room, assignmentTitle, sectionMeeting, assignmentNumber);
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

  convertUserToSaveRequest(user: any): any {
    return {
      id: user.id,
      fullName: user.fullName,
      firstName: user.firstName,
      secondName: user.secondName,
      lastName: user.lastName,
      surname: user.surname,
      image: user.image,
      email: user.email,
      documentNumber: user.documentNumber,
      documentType: user.documentType,
      cellPhone: user.cellPhone,
      phone: user.phone,
      gender: user.gender,
      birthdate: user.birthdate,
      congregationId: user.congregationId ?? user.myCongregationId ?? user.congregation?.id,
      assignmentTypePermissions: user.assignmentTypePermissions ?? [],
    };
  }
}
//users/by-congregation/by-assignment?assignment=president&congregationId=2
