import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, QueryList, signal, ViewChildren } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { AssignmentService } from "../../../../core/services/assignment/assignment.service";
import { UsersService } from "src/app/core/services/users/users.service";
import { Assignment, Meeting, Publisher, WeeklyProgram, Congregation, Program, AssignmentTypePermission, AssignmentType as AssignmentTypeModel } from "src/app/core/interfaces/reuniones.interface";
import { PublisherDto, ResponsibleCountDTO } from "src/app/core/interfaces/publishers.interface";
import { OtherAssignment } from "src/app/core/enums/meetings.enums";
import { MeetingsService } from "src/app/core/services/meetings/meetings.service";
import { DataService } from "src/app/core/services/data/data.service";
import { LoaderService } from "../../../../core/services/loader/loader.service";
import { AssignmentType, normalizeAssignmentTypeValue, OTHER_PART_LIVING_AS_CHRISTIANS_DESCRIPTION } from "src/app/core/enums/assignments.enums";
import { Subscription } from "rxjs";
import { PublisherMeetingResposne, PublisherResposne } from "src/app/core/interfaces/publisher-response";
import { Combobox } from "src/app/pages/notifications/notifications.component";
import { AssignmentTypesService } from "src/app/core/services/assignment-types/assignment-types.service";

interface AssignmentTypeMatcher {
  description: string;
  type: "Encargado" | "Estudiante" | "Ayudante" | "Conductor";
  sectionMeetingTitle: string;
}

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
  @Input() public type: string = "responsible";
  @Input() public room: string = "A";
  @Output() onClicked: EventEmitter<Publisher> = new EventEmitter();
  @Output() onClose: EventEmitter<boolean> = new EventEmitter();
  @ViewChildren(MatSort) sorts!: QueryList<MatSort>;

  public frequentPublishers!: PublisherDto[];
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

  // Frecuentes
  public usedPublishersDataSource = new MatTableDataSource<any>([]);
  public usedPublishersAllByAssigDataSource = new MatTableDataSource<ResponsibleCountDTO>([]);
  // hermanos
  public maleDataSource = new MatTableDataSource<any>([]);
  // hermanas
  public femaleDataSource = new MatTableDataSource<any>([]);
  // todos
  public publishersAllDataSource = new MatTableDataSource<Publisher>([]);

  public filteredResponsibles: ResponsibleCountDTO[] = [];

  public allProgram = signal<any[]>([]);
  public valuesComboParticipantes: Combobox[] = [];
  public showSubModal = false;

  public subModalDataSource = new MatTableDataSource<any>([]);
  public subModalDataSourceNamePublisher = "";
  private assignmentTypes: AssignmentTypeModel[] = [];
  private publishersSource: Publisher[] = [];
  private readonly assignmentTypeMatchers: Partial<Record<AssignmentType, AssignmentTypeMatcher>> = {
    [AssignmentType.ASSIGNMENT_1]: this.assignmentTypeMatcher("Tesoros - Discurso", "Encargado", "TESOROS DE LA BIBLIA"),
    [AssignmentType.ASSIGNMENT_2]: this.assignmentTypeMatcher("Perlas Escondidas", "Encargado", "TESOROS DE LA BIBLIA"),
    [AssignmentType.ASSIGNMENT_3]: this.assignmentTypeMatcher("Lectura de la bíblia", "Encargado", "TESOROS DE LA BIBLIA"),
    [AssignmentType.STARTING_A_CONVERSATION]: this.assignmentTypeMatcher("Empiece conversaciones", "Estudiante", "SEAMOS MEJORES MAESTROS"),
    [AssignmentType.STARTING_A_CONVERSATION_ASSISTANT]: this.assignmentTypeMatcher("Empiece conversaciones", "Ayudante", "SEAMOS MEJORES MAESTROS"),
    [AssignmentType.FOLLOWING_UP]: this.assignmentTypeMatcher("Haga revisitas", "Estudiante", "SEAMOS MEJORES MAESTROS"),
    [AssignmentType.FOLLOWING_UP_ASSISTANT]: this.assignmentTypeMatcher("Haga revisitas", "Ayudante", "SEAMOS MEJORES MAESTROS"),
    [AssignmentType.MAKING_DISCIPLES]: this.assignmentTypeMatcher("Haga discípulos", "Estudiante", "SEAMOS MEJORES MAESTROS"),
    [AssignmentType.MAKING_DISCIPLES_ASSISTANT]: this.assignmentTypeMatcher("Haga discípulos", "Ayudante", "NUESTRA VIDA CRISTIANA"),
    [AssignmentType.EXPLAINING_YOUR_BELIEFS]: this.assignmentTypeMatcher("Explique sus creencias", "Estudiante", "SEAMOS MEJORES MAESTROS"),
    [AssignmentType.EXPLAINING_YOUR_BELIEFS_ASSISTANT]: this.assignmentTypeMatcher("Explique sus creencias", "Ayudante", "NUESTRA VIDA CRISTIANA"),
    [AssignmentType.SPEECH]: this.assignmentTypeMatcher("Discurso", "Estudiante", "SEAMOS MEJORES MAESTROS"),
    [AssignmentType.PRESIDENT]: this.assignmentTypeMatcher("Presidencia", "Encargado", "ORACIONES"),
    [AssignmentType.ASSISTANT_ADVISER]: this.assignmentTypeMatcher("Consejero de la sala auxiliar", "Encargado", "ESPECIAL"),
    [AssignmentType.OPENING_PRAYER]: this.assignmentTypeMatcher("Oracion Inicial", "Encargado", "ESPECIAL"),
    [AssignmentType.FINAL_PRAYER]: this.assignmentTypeMatcher("Oracion Final", "Encargado", "ESPECIAL"),
    [AssignmentType.LOCAL_NEEDS]: this.assignmentTypeMatcher("Necesidades de la congregación", "Encargado", "NUESTRA VIDA CRISTIANA"),
    [AssignmentType.CONGREGATION_BIBLE_STUDY]: this.assignmentTypeMatcher("Estudio bíblico de la congregación", "Conductor", "NUESTRA VIDA CRISTIANA"),
    [AssignmentType.CONGREGATION_BIBLE_STUDY_READER]: this.assignmentTypeMatcher("Lectura EBC", "Encargado", "NUESTRA VIDA CRISTIANA"),
    [AssignmentType.OTHER_PART_LIVING_AS_CHRISTIANS]: this.assignmentTypeMatcher(OTHER_PART_LIVING_AS_CHRISTIANS_DESCRIPTION, "Encargado", "NUESTRA VIDA CRISTIANA"),
  };

  constructor(
    private dataService: DataService,
    private loaderService: LoaderService,
    private usersService: UsersService,
    private assignmentTypesService: AssignmentTypesService,
  ) {
    this.subscrp();
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit() {
    this.assignmentType = normalizeAssignmentTypeValue(this.assignmentType);
    this.loadAssignmentTypes();
    // new
    this.dataService.getMeeting().subscribe((data) => {
      this.allProgram.set(this.parseProgram(data));
    });
  }
  parseProgram(program: Program[]): any {
    let users: any[] = [];
    const participantes = new Set<string>();
    program.forEach((item) => {
      const programId = item.id;
      item.weeklyPrograms.forEach((wp) => {
        participantes.add(wp.assistant?.fullName || "");
        participantes.add(wp.responsible?.fullName || "");
        if (wp.assistant) {
          users.push({
            programId: wp.id,
            user: wp.assistant,
            assignmentType: "Ayudante",
            assignment: wp.assignment,
            notificationSentAt: wp.notificationSentAt,
          });
        }

        if (wp.responsible) {
          users.push({
            programId: wp.id,
            user: wp.responsible,
            assignmentType: "Responsable",
            assignment: wp.assignment,
            notificationSentAt: wp.notificationSentAt,
          });
        }
      });
    });
    this.valuesComboParticipantes = Array.from(participantes)
      .map((n) => (n ?? "").trim())
      .filter((n) => n.length > 0)
      .sort((a, b) => a.localeCompare(b, "es", { sensitivity: "base" }))
      .map((name) => ({ value: name, label: name }));
    return users;
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
          this.publishersSource = data;
          this.applyPublisherPermissionFilter();
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

  clean() {
    this.onClicked.emit(null);
  }

  getPublihersByAssignment() {
    this.usedPublishersListAll = [];
    this.usedPublishersListAllByAssig = [];
    const timestamp = this.assignment?.assignment?.meeting?.week;
    const fecha = new Date(timestamp).toISOString().split("T")[0];
    const title = this.assignment?.assignment?.title || "";
    this.showSpinner = true;
    this.usersService.getPublihersByAssignment(this.assignmentType, this.congregation.id, fecha, this.room, title).subscribe((data) => {
      const publishersEnabledForAssignment = this.filterPublishersByAssignmentPermission<ResponsibleCountDTO>(data ?? []);
      this.usedPublishersListAll = publishersEnabledForAssignment;
      this.usedPublishersListAllByAssig = publishersEnabledForAssignment;
      switch (this.assignmentType) {
        case AssignmentType.PRESIDENT:
          this.headerText = "Presidencia";
          this.usedPublishersList = this.usedPublishersListAll.filter((i) => i.presidentCount > 0);
          this.checkFrecuentEspecial();
          this.updateDataSources();
          break;
        case AssignmentType.OPENING_PRAYER:
          this.headerText = "Oración Inicial";
          this.usedPublishersList = this.usedPublishersListAll.filter((i) => i.openingPrayerCount > 0);
          this.checkFrecuentEspecial();
          this.updateDataSources();
          break;
        case AssignmentType.FINAL_PRAYER:
          this.headerText = "Oración Final";
          this.usedPublishersList = [...this.usedPublishersListAll.filter((i) => i.finalPrayerCount > 0)];
          this.checkFrecuentEspecial();
          this.updateDataSources();
          break;
        case AssignmentType.ASSIGNMENT_1:
          this.headerText = "Discurso Tesoros de la Bíblia";
          this.usedPublishersListAllByAssig = [...this.sortByLastDateGlobal([...publishersEnabledForAssignment], true)];
          this.checkIfYouParticipate1();
          this.updateDataSources();
          break;
        case AssignmentType.ASSIGNMENT_2:
          this.headerText = "Perlas Escondidas";
          this.checkIfYouParticipate1();
          this.updateDataSources();
          break;
        case AssignmentType.ASSIGNMENT_3:
          this.headerText = "Lectura de la Bíblia";
          this.checkIfYouParticipate1();
          this.updateDataSources();
          break;
        case AssignmentType.STARTING_A_CONVERSATION:
          this.headerText = "Empiece Conversaciones (Estudiante)";
          this.checkIfYouParticipate1();
          this.updateDataSources();
          break;
        case AssignmentType.EXPLAINING_YOUR_BELIEFS:
          this.headerText = "Explique sus creencias";
          this.checkIfYouParticipate1();
          this.updateDataSources();
          break;
        case AssignmentType.FOLLOWING_UP:
          this.headerText = "Haga revisitas (Estudiante)";
          this.checkIfYouParticipate1();
          this.updateDataSources();
          break;
        case AssignmentType.IMITATE:
          this.headerText = "Imite a...";
          this.checkIfYouParticipate1();
          this.updateDataSources();
          break;
        case AssignmentType.WHAT_HE_DID:
          this.headerText = "Lo que hizo...";
          this.checkIfYouParticipate1();
          this.updateDataSources();
          break;
        case AssignmentType.MAKING_DISCIPLES:
          this.headerText = "Haga discípulos (Estudiante)";
          this.checkIfYouParticipate1();
          this.updateDataSources();
          break;
        case AssignmentType.LOCAL_NEEDS:
          this.headerText = "Necesidades de la congregación";
          this.checkIfYouParticipate1();
          this.updateDataSources();
          break;
        case AssignmentType.CONGREGATION_BIBLE_STUDY:
          this.headerText = "Estudio bíblico de la congregación (Conductor)";
          this.checkIfYouParticipate1();
          this.updateDataSources();
          break;
        case AssignmentType.STARTING_A_CONVERSATION_ASSISTANT:
          this.headerText = "Empiece Conversaciones (Ayudante)";
          this.checkIfYouParticipate1();
          this.updateDataSources();
          break;
        case AssignmentType.EXPLAINING_YOUR_BELIEFS_ASSISTANT:
          this.headerText = "Explique sus creencias (Ayudante)";
          this.checkIfYouParticipate1();
          this.updateDataSources();
          break;
        case AssignmentType.FOLLOWING_UP_ASSISTANT:
          this.headerText = "Haga revisitas (Ayudante)";
          this.checkIfYouParticipate1();
          this.updateDataSources();
          break;
        case AssignmentType.MAKING_DISCIPLES_ASSISTANT:
          this.headerText = "Haga discípulos (Ayudante)";
          this.checkIfYouParticipate1();
          this.updateDataSources();
          break;
        case AssignmentType.CONGREGATION_BIBLE_STUDY_READER:
          this.headerText = "Estudio bíblico de la congregación (Lector)";
          this.checkIfYouParticipate1();
          this.updateDataSources();
          break;
        case AssignmentType.ASSISTANT_ADVISER:
          this.headerText = "Consejero de la sala auxiliar";
          this.checkIfYouParticipate1();
          this.updateDataSources();
          break;
        case AssignmentType.OTHER_PART_LIVING_AS_CHRISTIANS:
          this.headerText = this.assignment.assignment.title;
          this.checkIfYouParticipate1();
          this.updateDataSources();
          break;
        case AssignmentType.SPEECH:
          this.headerText = this.assignment.assignment.title;
          this.checkIfYouParticipate1();
          this.updateDataSources();
          break;
      }
      this.showSpinner = false;
    });
  }

  checkIfYouParticipate1(): void {
    if (!this.usedPublishersListAllByAssig?.length || this.usedPublishersListAllByAssig?.length <= 0) {
      return;
    }

    this.usedPublishersListAllByAssig = this.sortByLastDateGlobal(this.usedPublishersListAllByAssig, true);

    const publisherIds = new Set(this.usedPublishersListAllByAssig.map((pub) => pub.user.id));

    [...this.male, ...this.female].forEach((pub) => {
      pub.participate = publisherIds.has(pub.id);
    });
    this.female.sort((a, b) => {
      // 1. Ordenar por participate (false primero)
      const diff = Number(a.participate) - Number(b.participate);
      if (diff !== 0) return diff;

      // 2. Si son iguales, ordenar por nombre
      return a.fullName.localeCompare(b.fullName);
    });
    this.male.sort((a, b) => {
      // 1. Ordenar por participate (false primero)
      const diff = Number(a.participate) - Number(b.participate);
      if (diff !== 0) return diff;

      // 2. Si son iguales, ordenar por nombre
      return a.fullName.localeCompare(b.fullName);
    });
  }

  checkFrecuentEspecial() {
    //oraciones y presidencias
    if (!this.usedPublishersList || this.usedPublishersList.length <= 0) {
      return;
    }
    const publisherIds = new Set(this.usedPublishersList.map((pub) => pub.id));
    this.male.forEach((pub) => {
      pub.participate = publisherIds.has(pub.id);
    });
    this.male.sort((a, b) => {
      // 1. Ordenar por participate (false primero)
      const diff = Number(a.participate) - Number(b.participate);
      if (diff !== 0) return diff;

      // 2. Si son iguales, ordenar por nombre
      return a.fullName.localeCompare(b.fullName);
    });
  }

  private filterPublishersByAssignmentPermission<T>(items: T[]): T[] {
    const matcher = this.assignmentTypeMatchers[this.assignmentType as AssignmentType];

    if (!matcher) {
      return items;
    }

    const assignmentTypePermissionId = this.assignmentTypes.find((assignmentType) => this.matchesAssignmentType(assignmentType, matcher))?.id;

    return assignmentTypePermissionId
      ? items.filter((item) => this.hasAssignmentTypePermission(item, assignmentTypePermissionId))
      : [];
  }

  private hasAssignmentTypePermission(item: unknown, assignmentTypePermissionId: number): boolean {
    const publisher = this.getPublisherFromItem(item);
    const permissions = publisher?.assignmentTypePermissions ?? [];

    return permissions.some(
      (permission: AssignmentTypePermission) => permission.assignmentTypeId === assignmentTypePermissionId && permission.enabled,
    );
  }

  private getPublisherFromItem(item: any): Publisher | null {
    return item?.user ?? item?.userEnt ?? item ?? null;
  }

  private loadAssignmentTypes(): void {
    this.assignmentTypesService.getAll().subscribe({
      next: (assignmentTypes) => {
        this.assignmentTypes = assignmentTypes ?? [];
        this.applyPublisherPermissionFilter();
        this.getPublihersByAssignment();
      },
      error: () => {
        this.assignmentTypes = [];
        this.applyPublisherPermissionFilter();
        this.getPublihersByAssignment();
      },
    });
  }

  private applyPublisherPermissionFilter(): void {
    this.publishersAll = this.filterPublishersByAssignmentPermission(this.publishersSource);
    this.female = this.publishersAll.filter((publisher) => publisher.gender === "Femenino");
    this.male = this.publishersAll.filter((publisher) => publisher.gender === "Masculino");
    this.updateDataSources();
  }

  private assignmentTypeMatcher(
    description: string,
    type: AssignmentTypeMatcher["type"],
    sectionMeetingTitle: string,
  ): AssignmentTypeMatcher {
    return { description, type, sectionMeetingTitle };
  }

  private matchesAssignmentType(assignmentType: AssignmentTypeModel, matcher: AssignmentTypeMatcher): boolean {
    return (
      this.normalizeText(assignmentType.description) === this.normalizeText(matcher.description) &&
      this.normalizeText(assignmentType.type ?? "") === this.normalizeText(matcher.type) &&
      this.normalizeText(assignmentType.sectionMeetingTitle ?? "") === this.normalizeText(matcher.sectionMeetingTitle)
    );
  }

  private normalizeText(value: string): string {
    return value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s*-\s*/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
  }

  get isAssigment() {
    return this.assignmentType !== AssignmentType.PRESIDENT && this.assignmentType !== AssignmentType.OPENING_PRAYER && this.assignmentType !== AssignmentType.FINAL_PRAYER;
  }

  adapter(publisherDto: PublisherDto[]): Publisher[] {
    return publisherDto.map((data) => {
      return { ...data.publisher, quantity: data.total };
    });
  }

  private sortByLastDateGlobal(data: any[], ascending: boolean = true): PublisherResposne[] {
    return data.sort((a, b) => {
      return ascending ? a.lastAssignGlobal - b.lastAssignGlobal : b.lastAssignGlobal - a.lastAssignGlobal;
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
    if (!timestamp) {
      return "";
    }
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

  onSearch(event: Event, type: string): void {
    const value = (event.target as HTMLInputElement).value.toLowerCase().trim();
    if (value === "") {
      this.usedPublishersDataSource.data = this.usedPublishersList;
      this.usedPublishersAllByAssigDataSource.data = this.usedPublishersListAllByAssig;
      return;
    }
    if (type === "usedPublishersDataSource") {
      this.usedPublishersDataSource.data = this.publishersAll.filter((item) => item.fullName.toLowerCase().startsWith(value)).sort((a, b) => a.fullName.localeCompare(b.fullName));
    } else if (type === "usedPublishersAllByAssigDataSource") {
      this.usedPublishersAllByAssigDataSource.data = this.publishersAll
        .filter((item) => item.fullName.toLowerCase().startsWith(value))
        .sort((a, b) => a.fullName.localeCompare(b.fullName))
        .map((publisher) => {
          const found = this.usedPublishersListAllByAssig.find((p) => p.user.id === publisher.id);
          return found ? { ...found, user: publisher } : { user: publisher, count: 0, lastDate: 0, all: 0 };
        });
    }
  }

  more(item: any, event: any) {
    event.stopPropagation();
    event.preventDefault();
    event.stopImmediatePropagation(); // 🔥 ESTA ES LA CLAVE
    this.subModalDataSourceNamePublisher = item.user?.fullName ?? item.fullName;
    this.subModalDataSource.data = [];
    const participant = item.user?.fullName ?? item.fullName;
    const items = this.allProgram().filter((row) => {
      const okParticipant = !participant || row.user.fullName.toString().trim() == participant.toString().trim();
      return okParticipant /* && okSearch */;
    });
    items.forEach((i) => {
      this.subModalDataSource.data.push({
        date: i.assignment.meeting.week,
        title: `${i.assignment.title}`,
        type: i.assignmentType,
      });
    });
    this.showSubModal = true;
  }

  closeSubModal() {
    this.showSubModal = false;
  }
}
