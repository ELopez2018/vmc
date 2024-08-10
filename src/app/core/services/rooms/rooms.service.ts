import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Servers } from '../../constants/servers';
import { Room } from '../../interfaces/reuniones.interface';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  private server = Servers.URL
  constructor(private httpClient: HttpClient) { }
  
  getAllRoomsByCongregation(congregationId: number): Observable<Room[]> {
    const url = `${this.server}/rooms/${congregationId}`
    return this.httpClient.get<Room[]>(url)
  }

}
