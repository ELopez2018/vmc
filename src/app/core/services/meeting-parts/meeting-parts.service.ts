import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Apis, Servers } from "../../constants/servers";
import { MeetingPart, MeetingPartRequest } from "../../interfaces/meeting-parts.interface";

@Injectable({
  providedIn: "root",
})
export class MeetingPartsService {
  private readonly url = `${Servers.URL}${Apis.MEETING_PARTS}`;

  constructor(private readonly http: HttpClient) {}

  findAll(): Observable<MeetingPart[]> {
    return this.http.get<MeetingPart[]>(this.url);
  }

  findById(id: number): Observable<MeetingPart> {
    return this.http.get<MeetingPart>(`${this.url}/${id}`);
  }

  create(request: MeetingPartRequest): Observable<MeetingPart> {
    return this.http.post<MeetingPart>(this.url, request);
  }

  update(id: number, request: MeetingPartRequest): Observable<MeetingPart> {
    return this.http.put<MeetingPart>(`${this.url}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
