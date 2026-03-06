import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, QueryList, ViewChildren } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { AssignmentService } from "../../../../core/services/assignment/assignment.service";
import { UsersService } from "src/app/core/services/users/users.service";
import { Assignment, Meeting, Publisher, WeeklyProgram, Congregation } from "src/app/core/interfaces/reuniones.interface";
import { PublisherDto, ResponsibleCountDTO } from "src/app/core/interfaces/publishers.interface";
import { OtherAssignment } from "src/app/core/enums/meetings.enums";
import { MeetingsService } from "src/app/core/services/meetings/meetings.service";
import { DataService } from "src/app/core/services/data/data.service";
import { LoaderService } from "../../../../core/services/loader/loader.service";
import { AssignmentType } from "src/app/core/enums/assignments.enums";
import { Subscription } from "rxjs";
import { PublisherMeetingResposne, PublisherResposne } from "src/app/core/interfaces/publisher-response";

@Component({
  selector: "search-publisher",
  templateUrl: "./search-publisher.component.html",
  styleUrls: ["./search-publisher.component.scss"],
  standalone: false,
})
export class SearchPublisherComponent implements OnInit, OnDestroy, AfterViewInit {
  public publishersAll!: Publisher[];
  @Input() public assignment!: WeeklyProgram;
  @Input() public assignmentType: string = "";
  public frequentPublishers!: PublisherDto[];
  @Output() onClicked: EventEmitter<Publisher> = new EventEmitter();
  @Output() onClose: EventEmitter<boolean> = new EventEmitter();
  public showSpinner = true;
  public congregation!: Congregation;
  public usedPublishersList: any[] = [];
  public female: any[] = [];
  public male: any[] = [];
  public headerText = "Asignacion";
  public usedPublishersListAll: any[] = [];
  public usedPublishersListAllByAssig: ResponsibleCountDTO[] = [];
  public assignmentTypeEnums = AssignmentType;
  private subs = new Subscription();

  // MatTableDataSource para ordenamiento
  public usedPublishersDataSource = new MatTableDataSource<any>([]);
  public usedPublishersAllByAssigDataSource = new MatTableDataSource<ResponsibleCountDTO>([]);
  public maleDataSource = new MatTableDataSource<any>([]);
  public femaleDataSource = new MatTableDataSource<any>([]);
  public publishersAllDataSource = new MatTableDataSource<Publisher>([]);

  @ViewChildren(MatSort) sorts!: QueryList<MatSort>;
  constructor(
    private dataService: DataService,
    private loaderService: LoaderService,
    private usersService: UsersService,
  ) {
    this.subscrp();
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit() {
    this.getPublihersByAssignment();
  }

  ngAfterViewInit() {
    this.assignSorts();
    this.sorts.changes.subscribe(() => this.assignSorts());
  }

  private assignSorts() {
    const sortsArray = this.sorts.toArray();
    if (sortsArray.length > 0) {
      this.usedPublishersDataSource.sort = sortsArray[0];
      this.usedPublishersAllByAssigDataSource.sort = sortsArray[0];
    }
    if (sortsArray.length > 1) {
      this.maleDataSource.sort = sortsArray[1];
    }
    if (sortsArray.length > 2) {
      this.femaleDataSource.sort = sortsArray[2];
    }
    if (sortsArray.length > 3) {
      this.publishersAllDataSource.sort = sortsArray[3];
    }
  }

  private updateDataSources() {
    this.usedPublishersDataSource.data = this.usedPublishersList;
    this.usedPublishersAllByAssigDataSource.data = this.usedPublishersListAllByAssig;
    this.maleDataSource.data = this.male;
    this.femaleDataSource.data = this.female;
    this.publishersAllDataSource.data = this.publishersAll || [];

    // Configurar sortingDataAccessor personalizado para nested properties
    this.usedPublishersAllByAssigDataSource.sortingDataAccessor = (item: any, property: string) => {
      switch (property) {
        case "fullName":
          return item.user?.fullName || "";
        case "count":
          return item.count || 0;
        case "all":
          return item.all || 0;
        case "lastDate":
          return item.lastDate || 0;
        default:
          return item[property];
      }
    };

    this.usedPublishersDataSource.sortingDataAccessor = (item: any, property: string) => {
      switch (property) {
        case "fullName":
          return item.fullName || "";
        case "count":
          if (this.assignmentType === AssignmentType.PRESIDENT) return item.presidentCount || 0;
          if (this.assignmentType === AssignmentType.OPENING_PRAYER) return item.openingPrayerCount || 0;
          if (this.assignmentType === AssignmentType.FINAL_PRAYER) return item.finalPrayerCount || 0;
          return 0;
        default:
          return item[property];
      }
    };
  }

  subscrp() {
    this.subs.add(
      this.dataService.getCongregation$().subscribe((data) => {
        this.congregation = data;
      }),
    );
    this.subs.add(
      this.dataService.getPubliherList$().subscribe((data) => {
        this.female = [];
        this.male = [];
        if (data) {
          this.publishersAll = data;
          this.female = this.publishersAll.filter((data) => data.gender === "Femenino");
          this.male = this.publishersAll.filter((data) => data.gender === "Masculino");
          // this.checkIfYouParticipate1();
          // this.checkIfYouParticipate2();
          this.updateDataSources();
        }
      }),
    );
    this.subs.add(
      this.loaderService.getLoaderSearchPublisher$().subscribe((data) => {
        this.showSpinner = data;
      }),
    );
  }
  selected(item: any) {
    if (item.hasOwnProperty("count")) {
      this.onClicked.emit(item.user);
      return;
    }
    this.onClicked.emit(item);
  }

  getPublihersByAssignment() {
    this.usedPublishersListAll = [];
    this.usedPublishersListAllByAssig = [];
    console.log(this.assignment);
    const timestamp = this.assignment?.assignment?.meeting?.week;
    const fecha = new Date(timestamp).toISOString().split('T')[0];
 
    this.usersService.getPublihersByAssignment(this.assignmentType, this.congregation.id,fecha).subscribe((data) => {
      this.usedPublishersListAll = data;
      this.usedPublishersListAllByAssig = data;
      switch (this.assignmentType) {
        case AssignmentType.PRESIDENT:
          this.headerText = "Presidencia";
          this.usedPublishersList = this.usedPublishersListAll.filter((i) => i.presidentCount > 0);
          this.usedPublishersList = this.sortByCountPresident(this.usedPublishersList, true);
          this.checkIfYouParticipate2();
          this.updateDataSources();
          break;
        case AssignmentType.OPENING_PRAYER:
          this.headerText = "Oración Inicial";
          this.usedPublishersList = this.usedPublishersListAll.filter((i) => i.openingPrayerCount > 0);
          this.usedPublishersList = this.sortByCountOpeningPrayer(this.usedPublishersList, true);
          this.checkIfYouParticipate2();
          this.updateDataSources();
          break;
        case AssignmentType.FINAL_PRAYER:
          this.headerText = "Oración Final";
          this.usedPublishersList = [...this.usedPublishersListAll.filter((i) => i.finalPrayerCount > 0)];
          this.usedPublishersList = [...this.sortByCountFinalPrayer(this.usedPublishersList, true)];
          this.checkIfYouParticipate2();
          this.updateDataSources();
          break;
        case AssignmentType.ASSIGNMENT_1:
          this.headerText = "Discurso Tesoros de la Bíblia";
          this.usedPublishersListAllByAssig = [...data];
          this.usedPublishersListAllByAssig = [...this.sortByLastDate(this.usedPublishersListAllByAssig, true)];
          this.checkIfYouParticipate1();
          this.updateDataSources();
          break;
        case AssignmentType.ASSIGNMENT_2:
          this.headerText = "Perlas Escondidas";
          // this.usedPublishersListAllByAssig = [...this.sortByLastDate(data, true)];
          this.checkIfYouParticipate1();
          this.updateDataSources();
          break;
        case AssignmentType.ASSIGNMENT_3:
          this.headerText = "Lectura de la Bíblia";
          // this.usedPublishersListAllByAssig = [...this.sortByLastDate(data, true)];
          this.checkIfYouParticipate1();
          this.updateDataSources();
          break;
        case AssignmentType.STARTING_A_CONVERSATION:
          this.headerText = "Empiece Conversaciones (Estudiante)";
          // this.usedPublishersListAllByAssig = [...this.sortByLastDate(data, true)];
          this.checkIfYouParticipate1();
          this.updateDataSources();
          break;
        case AssignmentType.EXPLAINING_YOUR_BELIEFS:
          this.headerText = "Explique sus creencias";
          // this.usedPublishersListAllByAssig = [...this.sortByLastDate(data, true)];
          this.checkIfYouParticipate1();
          this.updateDataSources();
          break;
        case AssignmentType.FOLLOWING_UP:
          this.headerText = "Haga revisitas (Estudiante)";
          // this.usedPublishersListAllByAssig = [...this.sortByLastDate(data, true)];
          this.checkIfYouParticipate1();
          this.updateDataSources();
          break;
        case AssignmentType.IMITATE:
          this.headerText = "Imite a...";
          // this.usedPublishersListAllByAssig = [...this.sortByLastDate(data, true)];
          this.checkIfYouParticipate1();
          this.updateDataSources();
          break;
        case AssignmentType.WHAT_HE_DID:
          this.headerText = "Lo que hizo...";
          // this.usedPublishersListAllByAssig = [...this.sortByLastDate(data, true)];
          this.checkIfYouParticipate1();
          this.updateDataSources();
          break;
        case AssignmentType.MAKING_DISCIPLES:
          this.headerText = "Haga discípulos (Estudiante)";
          // this.usedPublishersListAllByAssig = [...this.sortByLastDate(data, true)];
          this.checkIfYouParticipate1();
          this.updateDataSources();
          break;
        case AssignmentType.LOCAL_NEEDS:
          this.headerText = "Necesidades de la congregación";
          // this.usedPublishersListAllByAssig = [...this.sortByLastDate(data, true)];
          this.checkIfYouParticipate1();
          this.updateDataSources();
          break;
        case AssignmentType.CONGREGATION_BIBLE_STUDY:
          this.headerText = "Estudio bíblico de la congregación (Conductor)";
          // this.usedPublishersListAllByAssig = [...this.sortByLastDate(data, true)];
          this.checkIfYouParticipate1();
          this.updateDataSources();
          break;
        case AssignmentType.STARTING_A_CONVERSATION_ASSISTANT:
          this.headerText = "Empiece Conversaciones (Ayudante)";
          // this.usedPublishersListAllByAssig = [...this.sortByLastDate(data, true)];
          this.checkIfYouParticipate1();
          this.updateDataSources();
          break;
        case AssignmentType.EXPLAINING_YOUR_BELIEFS_ASSISTANT:
          this.headerText = "Explique sus creencias (Ayudante)";
          // this.usedPublishersListAllByAssig = [...this.sortByLastDate(data, true)];
          this.checkIfYouParticipate1();
          this.updateDataSources();
          break;
        case AssignmentType.FOLLOWING_UP_ASSISTANT:
          this.headerText = "Haga revisitas (Ayudante)";
          // this.usedPublishersListAllByAssig = [...this.sortByLastDate(data, true)];
          this.checkIfYouParticipate1();
          this.updateDataSources();
          break;
        case AssignmentType.MAKING_DISCIPLES_ASSISTANT:
          this.headerText = "Haga discípulos (Ayudante)";
          // this.usedPublishersListAllByAssig = [...this.sortByLastDate(data, true)];
          this.checkIfYouParticipate1();
          this.updateDataSources();
          break;
        case AssignmentType.CONGREGATION_BIBLE_STUDY_READER:
          this.headerText = "Estudio bíblico de la congregación (Lector)";
          // this.usedPublishersListAllByAssig = [...this.sortByLastDate(data, true)];
          this.checkIfYouParticipate1();
          this.updateDataSources();
          break;
        case AssignmentType.ASSISTANT_ADVISER:
          this.headerText = "Consejero de la sala auxiliar";
          // this.usedPublishersListAllByAssig = [...this.sortByLastDate(data, true)];
          this.checkIfYouParticipate1();
          this.updateDataSources();
          break;
      }
    });
  }

  // checkIfYouParticipate1() {
  //   if (!this.usedPublishersListAllByAssig || this.usedPublishersListAllByAssig.length <= 0) {
  //     return;
  //   }
  //   this.usedPublishersListAllByAssig = [...this.sortByLastDate(this.usedPublishersListAllByAssig, true)];
  //   const publisherIds = new Set(this.usedPublishersListAllByAssig.map((pub) => pub.user.id));
  //   this.male.forEach((pub) => {
  //     pub.participate = publisherIds.has(pub.id);
  //   });
  //   this.female.forEach((pub) => {
  //     pub.participate = publisherIds.has(pub.id);
  //   });
  // }

  checkIfYouParticipate1(): void {
    if (!this.usedPublishersListAllByAssig?.length) return;

    // Ordena (asumiendo que sortByLastDate ya devuelve un nuevo array)
    this.usedPublishersListAllByAssig = this.sortByLastDate(this.usedPublishersListAllByAssig, true);

    const publisherIds = new Set(this.usedPublishersListAllByAssig.map((pub) => pub.user.id));

    [...this.male, ...this.female].forEach((pub) => {
      pub.participate = publisherIds.has(pub.id);
    });
  }

  checkIfYouParticipate2() {
    if (!this.usedPublishersList || this.usedPublishersList.length <= 0) {
      return;
    }
    const publisherIds = new Set(this.usedPublishersList.map((pub) => pub.id));

    // this.male.forEach((pub) => {
    //   pub.participate = publisherIds.has(pub.id);
    // });
    // this.female.forEach((pub) => {
    //   pub.participate = publisherIds.has(pub.id);
    // });
    [...this.male, ...this.female].forEach((pub) => {
      pub.participate = publisherIds.has(pub.id);
    });
  }

  get isAssigment() {
    return this.assignmentType !== AssignmentType.PRESIDENT && this.assignmentType !== AssignmentType.OPENING_PRAYER && this.assignmentType !== AssignmentType.FINAL_PRAYER;
  }

  adapter(publisherDto: PublisherDto[]): Publisher[] {
    return publisherDto.map((data) => {
      return { ...data.publisher, quantity: data.total };
    });
  }

  private sortByLastDate(data: any[], ascending: boolean = true): PublisherResposne[] {
    return data.sort((a, b) => {
      return ascending ? a.lastDate - b.lastDate : b.lastDate - a.lastDate;
    });
  }

  private sortByCountFinalPrayer(data: PublisherMeetingResposne[], ascending: boolean = true): PublisherMeetingResposne[] {
    return data.sort((a, b) => {
      return ascending ? a.finalPrayerCount - b.finalPrayerCount : b.finalPrayerCount - a.finalPrayerCount;
    });
  }

  private sortByCountPresident(data: PublisherMeetingResposne[], ascending: boolean = true): PublisherMeetingResposne[] {
    return data.sort((a, b) => {
      return ascending ? a.presidentCount - b.presidentCount : b.presidentCount - a.presidentCount;
    });
  }
  private sortByCountOpeningPrayer(data: PublisherMeetingResposne[], ascending: boolean = true): PublisherMeetingResposne[] {
    return data.sort((a, b) => {
      return ascending ? a.openingPrayerCount - b.openingPrayerCount : b.openingPrayerCount - a.openingPrayerCount;
    });
  }

  closeModal() {
    this.onClose.emit(true);
  }
  parseDate(timestamp: number = 0): string {
    const date = new Date(timestamp);

    // Sumar 4 días
    date.setDate(date.getDate() + this.congregation.day - 1);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses van de 0 a 11
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }
  sortColumn: string = "";
  sortDirection: "asc" | "desc" = "asc";

  get sortedPublishers() {
    if (!this.sortColumn) {
      return this.usedPublishersList;
    }

    return [...this.usedPublishersList].sort((a, b) => {
      const valueA = a[this.sortColumn];
      const valueB = b[this.sortColumn];

      if (valueA < valueB) {
        return this.sortDirection === "asc" ? -1 : 1;
      }
      if (valueA > valueB) {
        return this.sortDirection === "asc" ? 1 : -1;
      }
      return 0;
    });
  }
}
