import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Servers, Apis } from '../../constants/servers';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigsService {
  private server = Servers.URL
  private api = Apis
  constructor(private httpClient: HttpClient) { }

  getAllDesignations(): Observable<any[]> {
    const url = `${this.server}${this.api.CONFIGS}/get-all-designations`
    return this.httpClient.get<any[]>(url)
  }
}
