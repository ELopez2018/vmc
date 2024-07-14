import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apis, Servers } from '../../constants/servers';
import { Observable } from 'rxjs';
import { Assignment, Meeting } from '../../interfaces/reuniones.interface';
import { PublisherDto } from '../../interfaces/publishers.interface';
import { Modal } from '../../interfaces/modal.interface';
import { OtherAssignment } from '../../enums/meetings.enums';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  private server = Servers.URL
  private api = Apis
  constructor(private httpClient: HttpClient) { }

  updateAssignment(assignment: Assignment): Observable<any> {
    const url = `${this.server}${this.api.ASSIGNMENT}`
    return this.httpClient.put(url, assignment)
  }
  getPublishersByAssignment(assignment: Meeting): Observable<PublisherDto[]> {
    // const params = `?assignmentNumber=${assignment.number}&numberWeek=${assignment.weekNumber}&sectionMeeting=${assignment.sectionMeeting}`
    const params = ``
    const url = `${this.server}${this.api.ASSIGNMENT}/publisher-by-assignment${params}`
    return this.httpClient.get<PublisherDto[]>(url)
  }
}
