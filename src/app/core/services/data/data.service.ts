import { Injectable } from "@angular/core";
import { BehaviorSubject, filter, Observable } from "rxjs";
import { Meeting, Program, Publisher, Congregation, Room, WeeklyProgram } from "../../interfaces/reuniones.interface";
import { MeetingPart } from "../../interfaces/meeting-parts.interface";
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
import { MeetingPartsService } from "../meeting-parts/meeting-parts.service";
import { MeetingRoom, setMeetingPartTitles } from "../../constants/program.constants";
import { isExplainingBeliefsSpeechAssignment } from "../../utils/assignment-eligibility.util";

@Injectable({
  providedIn: "root",
})
export class DataService {
  private readonly tokenStorageKey = "token";
  private readonly publisherStorageKey = "publisher";
  private readonly publisherCookieKey = "publisher";
  private readonly congregationCookieKey = "congregation";
  private meetings$: BehaviorSubject<Program[]> = new BehaviorSubject<Program[]>([]);
  private meetingsPDF$: BehaviorSubject<ProgramPdf[]> = new BehaviorSubject<ProgramPdf[]>([]);
  private weekPrograms: Program[] = [];
  private publisherList: BehaviorSubject<Publisher[]> = new BehaviorSubject<Publisher[]>([]);
  private congregation$: BehaviorSubject<Congregation> = new BehaviorSubject<Congregation>(<Congregation>{});
  private publisherListTemp: Publisher[] = [];
  private congregation!: Congregation;
  private publisher$: BehaviorSubject<Publisher | null> = new BehaviorSubject<Publisher | null>(null);
  private designations$: BehaviorSubject<Generic[]> = new BehaviorSubject<Generic[]>([]);
  private rooms$: BehaviorSubject<Room[]> = new BehaviorSubject<Room[]>([]);
  private meetingParts$: BehaviorSubject<MeetingPart[]> = new BehaviorSubject<MeetingPart[]>([]);
  public meetingParts: MeetingPart[] = [];
  private meetingPartsLoaded = false;
  private meetingPartsLoading = false;
  jwtUtils!: JwtHelperService;
  private isAdmin$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(
    private cookieService: CookieService,
    private usersService: UsersService,
    private configsService: ConfigsService,
    private roomsService: RoomsService,
    private meetingPartsService: MeetingPartsService,
  ) {
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
    return this.publisher$.pipe(filter((publisher): publisher is Publisher => publisher !== null && !!publisher.id));
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
      const programsByAssignment = new Map<string, WeeklyProgram[]>();

      (week.weeklyPrograms ?? []).forEach((weeklyProgram) => {
        const key = this.getWeeklyProgramAssignmentKey(weeklyProgram);
        const programs = programsByAssignment.get(key) ?? [];
        programs.push(weeklyProgram);
        programsByAssignment.set(key, programs);
      });

      const weeklyProgramPdf: WeeklyProgramPdF[] = Array.from(programsByAssignment.values()).map((programs) => {
        const mainRoom = programs.find((weeklyProgram) => weeklyProgram.room?.toUpperCase() === MeetingRoom.MAIN);
        const auxiliaryRoom = programs.find((weeklyProgram) => weeklyProgram.room?.toUpperCase() === MeetingRoom.AUXILIARY);
        const base = mainRoom ?? auxiliaryRoom ?? programs[0];
        const noAssistantAllowed = isExplainingBeliefsSpeechAssignment(base.assignment);

        return {
          ...base,
          room: MeetingRoom.MAIN,
          responsible: mainRoom?.responsible ?? null,
          assistant: noAssistantAllowed ? null : mainRoom?.assistant ?? null,
          responsibleB: auxiliaryRoom?.responsible ?? null,
          assistantB: noAssistantAllowed ? null : auxiliaryRoom?.assistant ?? null,
        };
      });

      return { ...week, weeklyPrograms: weeklyProgramPdf };
    });

    this.meetingsPDF$.next(meetingsPdf);
    return meetingsPdf;
  }

  private getWeeklyProgramAssignmentKey(weeklyProgram: WeeklyProgram): string {
    const assignment = weeklyProgram.assignment;

    return [assignment?.number ?? "", assignment?.sectionMeeting ?? "", assignment?.title ?? ""]
      .map((value) => this.normalizeAssignmentKeyPart(value))
      .join("|");
  }

  private normalizeAssignmentKeyPart(value: unknown): string {
    return String(value ?? "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
  }

  public setPubliherList(publisherList: Publisher[]) {
    this.publisherListTemp = [...publisherList];
    this.publisherList.next(publisherList);
  }
  public getPubliherList$(): Observable<Publisher[]> {
    if (!this.publisherListTemp || this.publisherListTemp?.length < 1) {
      this.getPublishersFromDB();
    } else {
      this.publisherList.next(this.publisherListTemp);
      return this.publisherList.asObservable();
    }
    return this.publisherList.asObservable();
  }
  public getPublishersFromDB() {
    if (!this.hasValidToken() || !this.congregation?.id) {
      return;
    }

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

  public setMeetingParts(meetingParts: MeetingPart[]): void {
    this.meetingParts = [...(meetingParts ?? [])];
    setMeetingPartTitles(this.meetingParts);
    this.meetingParts$.next(this.meetingParts);
  }

  public getMeetingParts$(): Observable<MeetingPart[]> {
    return this.meetingParts$.asObservable();
  }

  public loadMeetingParts(): void {
    if (!this.hasValidToken() || this.meetingPartsLoaded || this.meetingPartsLoading) {
      return;
    }

    this.meetingPartsLoading = true;
    this.meetingPartsService.findAll().subscribe({
      next: (meetingParts) => {
        this.setMeetingParts(meetingParts);
        this.meetingPartsLoaded = true;
        this.meetingPartsLoading = false;
      },
      error: () => {
        this.setMeetingParts([]);
        this.meetingPartsLoading = false;
      },
    });
  }

  public getConfigs() {
    if (!this.hasValidToken()) {
      this.setCongregation(<Congregation>{});
      return;
    }

    this.loadMeetingParts();

    this.configsService.getAllDesignations().subscribe((data) => {
      if (data) {
        this.setDesignations(data);
      }
    });

    const publisher = this.readStorageObject<Publisher>(this.publisherStorageKey) ?? this.readCookieObject<Publisher>(this.publisherCookieKey);
    if (publisher?.id) {
      this.setPublisher(publisher);
    }
    this.setCongregation(this.readCookieObject<Congregation>(this.congregationCookieKey) ?? <Congregation>{});
  }

  public getAccessToken(): string | null {
    const tokenStorage = localStorage.getItem(this.tokenStorageKey);

    if (!tokenStorage) {
      return null;
    }

    try {
      const parsedToken = JSON.parse(tokenStorage);
      return typeof parsedToken?.token === "string" ? parsedToken.token : null;
    } catch {
      return tokenStorage;
    }
  }

  public hasValidToken(): boolean {
    const token = this.getAccessToken();

    if (!token) {
      return false;
    }

    try {
      return !this.jwtUtils.isTokenExpired(token);
    } catch {
      return false;
    }
  }

  public clearSession() {
    localStorage.clear();
    this.cookieService.delete(this.publisherCookieKey);
    this.cookieService.delete(this.publisherCookieKey, "/");
    this.cookieService.delete(this.congregationCookieKey);
    this.cookieService.delete(this.congregationCookieKey, "/");
    this.publisher$.next(null);
    this.congregation$.next(<Congregation>{});
    this.isAdmin$.next(false);
    this.publisherList.next([]);
    this.rooms$.next([]);
    this.meetingPartsLoaded = false;
    this.meetingPartsLoading = false;
    this.setMeetingParts([]);
  }

  logout() {
    this.clearSession();
    window.location.href = Servers.home;
  }

  private readCookieObject<T>(cookieName: string): T | null {
    const cookieValue = this.cookieService.get(cookieName);

    if (!cookieValue) {
      return null;
    }

    try {
      return JSON.parse(cookieValue) as T;
    } catch {
      return null;
    }
  }

  private readStorageObject<T>(storageKey: string): T | null {
    const storageValue = localStorage.getItem(storageKey);

    if (!storageValue) {
      return null;
    }

    try {
      return JSON.parse(storageValue) as T;
    } catch {
      return null;
    }
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
