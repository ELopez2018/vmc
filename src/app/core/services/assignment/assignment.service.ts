import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apis, Servers } from '../../constants/servers';
import { Observable } from 'rxjs';
import { Assignment } from '../../interfaces/reuniones.interface';

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
}
