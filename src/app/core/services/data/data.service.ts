import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Meeting, Program, Publisher, Congregation } from '../../interfaces/reuniones.interface';
import { UsersService } from '../users/users.service';
import { ConfigsService } from '../configs/configs.service';
import { Generic } from '../../interfaces/configs.interface';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private meetings: BehaviorSubject<Program[]> = new BehaviorSubject<Program[]>([])
  private publisherList: BehaviorSubject<Publisher[]> = new BehaviorSubject<Publisher[]>([])
  private congregation$: BehaviorSubject<Congregation> = new BehaviorSubject<Congregation>(<Congregation>{})
  private publisherListTemp: Publisher[] = [];
  private congregation!: Congregation;
  private publisher$: BehaviorSubject<Publisher> = new BehaviorSubject<Publisher>(<Publisher>{})
  private designations$: BehaviorSubject<Generic[]> = new BehaviorSubject<Generic[]>([])
  jwtUtils!: JwtHelperService;
  constructor(private usersService: UsersService, private configsService: ConfigsService) {
    this.jwtUtils = new JwtHelperService()
   }

  public setDesignations(designations: any) {
    this.designations$.next(designations)
  }
  public getDesignations(): Observable<Generic[]> {
    return this.designations$.asObservable()
  }

  public setPublisher(publisher: Publisher) {
    this.publisher$.next(publisher)
  }
  public getPublisher(): Observable<Publisher> {
    return this.publisher$.asObservable()
  }

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

  public getConfigs() {
    this.configsService.getAllDesignations().subscribe(data => {
      this.setDesignations(data)
    })
  }

  public setConfigFromStorage(){
    const tokenStr = localStorage.getItem("token")
    let tokenObj;
    if(tokenStr){
      tokenObj = JSON.parse(tokenStr)
      this.setPublisher(this.jwtUtils.decodeToken(tokenObj.token).data);
      this.setCongregation(this.jwtUtils.decodeToken(tokenObj.token).data.congregation)
    }
  }
}
