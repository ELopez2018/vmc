import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apis, Servers } from '../../constants/servers';
import { Observable } from 'rxjs';
import { Assignment, Meeting, SendNotidicationReques } from '../../interfaces/reuniones.interface';
import { PublisherDto } from '../../interfaces/publishers.interface';
import { Modal } from '../../interfaces/modal.interface';
import { OtherAssignment } from '../../enums/meetings.enums';
import { ResponsePaginated } from '../../interfaces/general.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  private server = Servers.URL
  private api = Apis
  constructor(private httpClient: HttpClient) { }
  getAllAssignment(){
     const url = `${this.server}${this.api.ASSIGNMENT}`
     return this.httpClient.get<ResponsePaginated>(url)
  }
  updateAssignment(assignment: Assignment): Observable<any> {
    const url = `${this.server}${this.api.ASSIGNMENT}`
    return this.httpClient.put(url, assignment)
  }
  getPublishersByAssignment(assignment: Meeting): Observable<PublisherDto[]> {
    const params = ``
    const url = `${this.server}${this.api.ASSIGNMENT}/publisher-by-assignment${params}`
    return this.httpClient.get<PublisherDto[]>(url)
  }

  getDistinctByTitle(): Observable<Assignment[]> {
    const url = `${this.server}${this.api.ASSIGNMENT}/titles`
    return this.httpClient.get<Assignment[]>(url)
  }

  save(assignment: Assignment): Observable<Assignment> {
    const url = `${this.server}${this.api.ASSIGNMENT}`
    return this.httpClient.post<Assignment>(url, assignment)
  }
  sendNotifications(body: SendNotidicationReques): Observable<any> {
    const url = `${this.server}${this.api.ASSIGNMENT}/send-notification`
    return this.httpClient.post<any>(url, body)
  }

}
