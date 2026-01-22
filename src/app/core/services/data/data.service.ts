import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, Subject } from "rxjs";
import { Meeting, Program, Publisher, Congregation, Room } from "../../interfaces/reuniones.interface";
import { UsersService } from "../users/users.service";
import { ConfigsService } from "../configs/configs.service";
import { Generic } from "../../interfaces/configs.interface";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Servers } from "../../constants/servers";
import { RoomsService } from "../rooms/rooms.service";
import { ProgramPdf, WeeklyProgramPdF } from "../../interfaces/print-pdf.interface";
import { CongregationsService } from "../congregations/congregations.service";
import { AuthService } from "../auth/auth.service";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root",
})
export class DataService {
  private meetings$: BehaviorSubject<Program[]> = new BehaviorSubject<Program[]>([]);
  private meetingsPDF$: BehaviorSubject<ProgramPdf[]> = new BehaviorSubject<ProgramPdf[]>([]);
  private weekPrograms: Program[] = [];
  private publisherList: BehaviorSubject<Publisher[]> = new BehaviorSubject<Publisher[]>([]);
  private congregation$: BehaviorSubject<Congregation> = new BehaviorSubject<Congregation>(<Congregation>{});
  private publisherListTemp: Publisher[] = [];
  private congregation!: Congregation;
  private publisher$: BehaviorSubject<Publisher> = new BehaviorSubject<Publisher>(<Publisher>{});
  private designations$: BehaviorSubject<Generic[]> = new BehaviorSubject<Generic[]>([]);
  private rooms$: BehaviorSubject<Room[]> = new BehaviorSubject<Room[]>([]);
  jwtUtils!: JwtHelperService;
  private isAdmin$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private cookieService: CookieService, private usersService: UsersService, private configsService: ConfigsService, private roomsService: RoomsService) {
    this.jwtUtils = new JwtHelperService();
  }

  public setIsAdmin(isAdmin: boolean) {
    this.isAdmin$.next(isAdmin);
  }
  public getIsAdmin(): Observable<boolean> {
    return this.isAdmin$.asObservable();
  }

  public setDesignations(designations: any) {
    this.designations$.next(designations);
  }
  public getDesignations(): Observable<Generic[]> {
    return this.designations$.asObservable();
  }

  public setPublisher(publisher: Publisher) {
    this.publisher$.next(publisher);
  }
  public getPublisher(): Observable<Publisher> {
    return this.publisher$.asObservable();
  }

  public setMeeting(meetings: Program[]) {
    this.weekPrograms = [...meetings];
    this.makePDfVersion([...meetings]);
    this.meetings$.next(meetings);
  }
  public getMeeting(): Observable<Program[]> {
    return this.meetings$.asObservable();
  }
  makePDfVersion(meetings: Program[]): ProgramPdf[] {
    const meetingsPdf: ProgramPdf[] = meetings.map((week) => {
      const weeklyProgramPdf: WeeklyProgramPdF[] = [];
      const arrayTem: any[] = [];

      week.weeklyProgram.forEach((assig: any) => {
        if (!weeklyProgramPdf.some((i) => i.assignment.id === assig.assignment.id) && assig.room === "A") {
          weeklyProgramPdf.push({ ...assig });
        } else {
          arrayTem.push(assig);
        }
      });

      weeklyProgramPdf.forEach((b) => {
        const upd = arrayTem.find((f) => f.assignment.id === b.assignment.id);
        if (upd) {
          b.assistantB = upd.assistant ?? null;
          b.responsibleB = upd.responsible ?? null;
        }
      });

      return { ...week, weeklyProgram: weeklyProgramPdf };
    });

    this.meetingsPDF$.next(meetingsPdf);
    return meetingsPdf;
  }

  public setPubliherList(publisherList: Publisher[]) {
    this.publisherListTemp = [...publisherList];
    this.publisherList.next(publisherList);
  }
  public getPubliherList$(): Observable<Publisher[]> {
    if (!this.publisherListTemp || this.publisherListTemp?.length < 1) {
      this.getPublishersFromDB();
    }
    return this.publisherList.asObservable();
  }
  public getPublishersFromDB() {
    this.usersService.getUsersByCongregation(this.congregation.id).subscribe((data) => {
      this.setPubliherList(data);
    });
  }
  public setCongregation(congregation: Congregation) {
    this.congregation = congregation;
    if (this.congregation) {
      this.roomsService.getAllRoomsByCongregation(this.congregation.id).subscribe((data) => this.rooms$.next(data));
    }
    this.congregation$.next(congregation);
  }
  public getCongregation$(): Observable<Congregation> {
    return this.congregation$.asObservable();
  }

  public getConfigs() {
    this.configsService.getAllDesignations().subscribe((data) => {
      if (data) {
        this.setDesignations(data);
      }
    });
   this.setPublisher(this.cookieService.get('publisher') ? JSON.parse(this.cookieService.get('publisher')) : <Publisher>{});
   this.setCongregation(this.cookieService.get('congregation') ? JSON.parse(this.cookieService.get('congregation')) : <Congregation>{});
  }
  logout() {
    localStorage.clear();
    window.location.href = Servers.home;
  }
  public setRooms(rooms: Room[]) {
    this.rooms$.next(rooms);
  }
  public getRooms$(): Observable<Room[]> {
    return this.rooms$.asObservable();
  }
  public setMeetingsPDF(meetings: ProgramPdf[]) {
    this.meetingsPDF$.next(meetings);
  }
  public getMeetingsPDF$() {
    return this.meetingsPDF$.asObservable();
  }
}
