import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Apis, Servers } from "../../constants/servers";
import { Observable, tap } from "rxjs";
import { Publisher, Room } from '../../interfaces/reuniones.interface';
import { LoaderService } from "../loader/loader.service";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  private server = Servers.URL;
  private api = Apis;
  constructor(
    private httpClient: HttpClient,
    private loaderService: LoaderService,
  ) {}

  getAllUsers(): Observable<any> {
    const url = `${this.server}${this.api.USERS}`;
    return this.httpClient.get(url);
  }

  getUsersByCongregation(congregationId: number): Observable<any> {
    this.loaderService.setLoaderSearchPublisher(true);
    const url = `${this.server}${this.api.USERS}/by-congregation/${congregationId}`;
    return this.httpClient.get(url).pipe(
      tap((data) => {
        this.loaderService.setLoaderSearchPublisher(false);
      }),
    );
  }

  save(publisher: Publisher): Observable<any> {
    const url = `${this.server}${this.api.USERS}`;
    return this.httpClient.post<Publisher>(url, publisher).pipe(tap((data) => console.log(data)));
  }

delete(publisher: Publisher): Observable<any> {
  const url = `${this.server}${this.api.USERS}`;

  return this.httpClient.delete<Publisher>(url, {
    body: this.convertUserToSaveRequest(publisher)
  }).pipe(
    tap(data => console.log(data))
  );
}

  getPublihersByAssignment(assignment: string, congregationId: number, fechaCadena: any, room: string): Observable<any> {
    this.loaderService.setLoaderSearchPublisher(true);
    const url = `${this.server}${this.api.USERS}/by-congregation/by-assignment?assignment=${assignment}&congregationId=${congregationId}&dateAssignment=${fechaCadena}&room=${room}`;
    return this.httpClient.get<any>(url).pipe(
      tap((data) => {
        this.loaderService.setLoaderSearchPublisher(false);
      }),
    );
  }

  getById(userId: Number): Observable<any> {
    this.loaderService.setLoaderSearchPublisher(true);
    const url = `${this.server}${this.api.USERS}/by-id?userId=${userId}`;
    return this.httpClient.get<any>(url);
  }

  convertUserToSaveRequest(user: any): any {
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    documentNumber: user.documentNumber,
    documentType: user.documentType,
    cellPhone: user.cellPhone,
    phone: user.phone,
    gender: user.gender,
    birthdate: user.birthdate,
    congregationId: user.myCongregationId
  };
}
}
//users/by-congregation/by-assignment?assignment=president&congregationId=2
