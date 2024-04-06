import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Meeting } from '../../interfaces/reuniones.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private meetings: BehaviorSubject<Meeting[]> = new BehaviorSubject<Meeting[]>([])
  constructor() { }



  public setMeeting(meetings: Meeting[]) {
    this.meetings.next(meetings)
  }
  public getMeeting(): Observable<Meeting[]> {
    return this.meetings.asObservable()
  }


}
