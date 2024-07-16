import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Meeting, Program, Publisher, Congregation } from '../../interfaces/reuniones.interface';
import { UsersService } from '../users/users.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private meetings: BehaviorSubject<Program[]> = new BehaviorSubject<Program[]>([])
  private publisherList: BehaviorSubject<Publisher[]> = new BehaviorSubject<Publisher[]>([])
  private congregation$: BehaviorSubject<Congregation> = new BehaviorSubject<Congregation>(<Congregation>{})
  private publisherListTemp: Publisher[] = [];
  private congregation!: Congregation;
  constructor(private usersService: UsersService) { }

  public setMeeting(meetings: Program[]) {
    this.meetings.next(meetings)
  }
  public getMeeting(): Observable<Program[]> {
    return this.meetings.asObservable()
  }

  public setPubliherList(publisherList: Publisher[]) {
    this.publisherListTemp = [...publisherList]
    this.publisherList.next(publisherList)
  }
  public getPubliherList$(): Observable<Publisher[]> {
    if (!this.publisherListTemp || this.publisherListTemp.length < 1) {
      this.getPublishersFromDB()
    }
    return this.publisherList.asObservable()
  }
  public getPublishersFromDB() {
    this.usersService.getUsersByCongregation(this.congregation.id).subscribe(data => {
      this.setPubliherList(data)
    })
  }
  public setCongregation(congregation: Congregation) {
    this.congregation = congregation
    console.log("congregation", congregation);
    this.congregation$.next(congregation)
  }
  public getCongregation$(): Observable<Congregation> {
    return this.congregation$.asObservable()
  }
}
