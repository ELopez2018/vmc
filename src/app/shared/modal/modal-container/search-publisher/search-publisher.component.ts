import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, signal } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { AssignmentService } from "../../../../core/services/assignment/assignment.service";
import { UsersService } from "src/app/core/services/users/users.service";
import {
  Assignment,
  Meeting,
  Publisher,
  WeeklyProgram,
  Congregation,
  Program,
  AssignmentTypePermission,
  AssignmentType as AssignmentTypeModel,
} from "src/app/core/interfaces/reuniones.interface";
import { PublisherDto, PublisherHistoryItem, ResponsibleCountDTO } from "src/app/core/interfaces/publishers.interface";
import { OtherAssignment } from "src/app/core/enums/meetings.enums";
import { MeetingsService } from "src/app/core/services/meetings/meetings.service";
import { DataService } from "src/app/core/services/data/data.service";
import { LoaderService } from "../../../../core/services/loader/loader.service";
import { AssignmentType, normalizeAssignmentTypeValue, OTHER_PART_LIVING_AS_CHRISTIANS_DESCRIPTION } from "src/app/core/enums/assignments.enums";
import { Subscription } from "rxjs";
import { Combobox } from "src/app/pages/notifications/notifications.component";
import { AssignmentTypesService } from "src/app/core/services/assignment-types/assignment-types.service";

interface AssignmentTypeMatcher {
  description: string;
  type: "Encargado" | "Estudiante" | "Ayudante" | "Conductor";
  sectionMeetingTitle: string;
}

type SortDirection = "asc" | "desc";
type SortableDataSourceName =
  | "usedPublishersDataSource"
  | "usedPublishersAllByAssigDataSource"
  | "maleDataSource"
  | "femaleDataSource"
  | "publishersAllDataSource"
  | "subModalDataSource";

interface SortState {
  active: string;
  direction: SortDirection;
}

type EmptyStateSection = "frequent" | "history" | "brothers" | "sisters" | "all";

@Component({
  selector: "search-publisher",
  templateUrl: "./search-publisher.component.html",
  styleUrls: ["./search-publisher.component.scss"],
  standalone: false,
})
export class SearchPublisherComponent implements OnInit, OnDestroy {
  public publishersAll!: Publisher[];
  @Input() public assignment!: WeeklyProgram;
  @Input() public assignmentType: string = "";
  @Input() public type: string = "responsible";
  @Input() public room: string = "A";
  @Output() onClicked: EventEmitter<Publisher> = new EventEmitter();
  @Output() onClose: EventEmitter<boolean> = new EventEmitter();
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
  private readonly assignmentHeaderAbbreviations: Record<string, string> = {
    "estudio biblico de la congregacion": "EBC",
    "discurso tesoros de la biblia": "DTB",
    "necesidades de la congregacion": "NC",
    "consejero de la sala auxiliar": "CSA",
  };
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
  private publishersHistorySource: PublisherHistoryItem[] = [];
  private publishersSource: Publisher[] = [];
  private sortStates: Partial<Record<SortableDataSourceName, SortState>> = {};
  private readonly assignmentTypeMatchers: Partial<Record<AssignmentType, AssignmentTypeMatcher>> = {
    [AssignmentType.ASSIGNMENT_1]: this.assignmentTypeMatcher("Tesoros - Discurso", "Encargado", "TESOROS DE LA BIBLIA"),
    [AssignmentType.ASSIGNMENT_2]: this.assignmentTypeMatcher("Perlas Escondidas", "Encargado", "TESOROS DE LA BIBLIA"),
    [AssignmentType.ASSIGNMENT_3]: this.assignmentTypeMatcher("Lectura de la bíblia", "Encargado", "TESOROS DE LA BIBLIA"),
    [AssignmentType.STARTING_A_CONVERSATION]: this.assignmentTypeMatcher("Empiece conversaciones", "Estudiante", "SEAMOS MEJORES MAESTROS"),
    [AssignmentType.STARTING_A_CONVERSATION_ASSISTANT]: this.assignmentTypeMatcher("Empiece conversaciones", "Ayudante", "SEAMOS MEJORES MAESTROS"),
    [AssignmentType.FOLLOWING_UP]: this.assignmentTypeMatcher("Haga revisitas", "Estudiante", "SEAMOS MEJORES MAESTROS"),
    [AssignmentType.FOLLOWING_UP_ASSISTANT]: this.assignmentTypeMatcher("Haga revisitas", "Ayudante", "SEAMOS MEJORES MAESTROS"),
    [AssignmentType.WHAT_WOULD_YOU_SAY]: this.assignmentTypeMatcher("¿Qué diría?", "Estudiante", "SEAMOS MEJORES MAESTROS"),
    [AssignmentType.WHAT_WOULD_YOU_SAY_ASSISTANT]: this.assignmentTypeMatcher("¿Qué diría?", "Ayudante", "SEAMOS MEJORES MAESTROS"),
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
      .map((name) => ({ value: name, label: name }));
    return users;
  }

  private updateDataSources() {
    this.usedPublishersDataSource.data = this.usedPublishersList;
    this.usedPublishersAllByAssigDataSource.data = this.usedPublishersListAllByAssig;
    this.maleDataSource.data = this.male;
    this.femaleDataSource.data = this.female;
    this.publishersAllDataSource.data = this.getPublishersForAllTab();
    this.applyActiveSorts();
  }

  private getPublishersForAllTab(): Publisher[] {
    return this.publishersAll ?? [];
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
    this.loadPublishersHistory(fecha, title);
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
        case AssignmentType.WHAT_WOULD_YOU_SAY:
          this.headerText = "¿Qué diría? (Estudiante)";
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
        case AssignmentType.WHAT_WOULD_YOU_SAY_ASSISTANT:
          this.headerText = "¿Qué diría? (Ayudante)";
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

    const publisherIds = new Set(this.usedPublishersListAllByAssig.map((pub) => pub.user.id));

    [...this.male, ...this.female].forEach((pub) => {
      pub.participate = publisherIds.has(pub.id);
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
  }

  private filterPublishersByAssignmentPermission<T>(items: T[]): T[] {
    const matcher = this.assignmentTypeMatchers[this.assignmentType as AssignmentType];

    if (!matcher) {
      return items;
    }

    const assignmentTypePermissionId = this.assignmentTypes.find((assignmentType) => this.matchesAssignmentType(assignmentType, matcher))?.id;

    return assignmentTypePermissionId ? items.filter((item) => this.hasAssignmentTypePermission(item, assignmentTypePermissionId)) : [];
  }

  private hasAssignmentTypePermission(item: unknown, assignmentTypePermissionId: number): boolean {
    const publisher = this.getPublisherFromItem(item);
    const permissions = publisher?.assignmentTypePermissions ?? [];

    return permissions.some((permission: AssignmentTypePermission) => permission.assignmentTypeId === assignmentTypePermissionId && permission.enabled);
  }

  private getPublisherFromItem(item: any): Publisher | null {
    return item?.userEnt ?? item?.user ?? item ?? null;
  }

  private loadPublishersHistory(fecha: string, assignmentTitle: string): void {
    this.usersService.getPublishersHistoryByCongregation(this.congregation.id, fecha, this.room, assignmentTitle).subscribe({
      next: (history) => {
        this.publishersHistorySource = history ?? [];
        this.applyPublisherPermissionFilter();
      },
      error: () => {
        this.publishersHistorySource = [];
        this.applyPublisherPermissionFilter();
      },
    });
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
    const sourcePublishers = this.publishersHistorySource.length ? this.publishersHistorySource.map((item) => this.toPublisherWithHistory(item)) : this.publishersSource;

    this.publishersAll = this.filterPublishersByAssignmentPermission(sourcePublishers);
    this.female = this.publishersAll.filter((publisher) => publisher.gender === "Femenino");
    this.male = this.publishersAll.filter((publisher) => publisher.gender === "Masculino");
    this.updateDataSources();
  }

  private toPublisherWithHistory(item: PublisherHistoryItem): Publisher {
    const entityPublisher = item.userEnt ?? item.user;

    return {
      ...entityPublisher,
      id: entityPublisher?.id ?? item.user?.id,
      fullName: entityPublisher?.fullName ?? item.user?.fullName ?? "",
      firstName: entityPublisher?.firstName ?? item.user?.firstName ?? "",
      surname: entityPublisher?.surname ?? item.user?.surname ?? "",
      lastAssignGlobal: item.lastAssignGlobal,
    } as Publisher;
  }

  private assignmentTypeMatcher(description: string, type: AssignmentTypeMatcher["type"], sectionMeetingTitle: string): AssignmentTypeMatcher {
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

  private abbreviateAssignmentHeader(value: string): string {
    if (!value) {
      return "";
    }

    const trimmedValue = value.trim();
    const parenthesesMatch = trimmedValue.match(/^(.*?)(\s*\([^)]*\))$/);
    const baseLabel = (parenthesesMatch?.[1] ?? trimmedValue).trim();
    const suffix = (parenthesesMatch?.[2] ?? "").trim();
    const normalizedBase = this.normalizeText(baseLabel);

    let abbreviated = this.assignmentHeaderAbbreviations[normalizedBase];

    if (!abbreviated) {
      if (baseLabel.length <= 24) {
        abbreviated = baseLabel;
      } else {
        const words = baseLabel
          .split(/\s+/)
          .map((word) => word.replace(/[^\p{L}\p{N}]/gu, ""))
          .filter((word) => word.length > 0)
          .filter((word) => !["de", "la", "el", "los", "las", "y", "a", "por", "sus"].includes(word.toLowerCase()));

        const initials = words.map((word) => word.charAt(0).toUpperCase()).join("");
        abbreviated = initials || baseLabel;
      }
    }

    return suffix ? `${abbreviated} ${suffix}` : abbreviated;
  }

  get isAssigment() {
    return this.assignmentType !== AssignmentType.PRESIDENT && this.assignmentType !== AssignmentType.OPENING_PRAYER && this.assignmentType !== AssignmentType.FINAL_PRAYER;
  }

  get compactHeaderText(): string {
    return this.abbreviateAssignmentHeader(this.headerText);
  }

  get shouldShowRoomColumn(): boolean {
    return this.normalizeText(this.assignment?.assignment?.sectionMeeting ?? "") === this.normalizeText("SEAMOS MEJORES MAESTROS");
  }

  get historyTableColumns(): string[] {
    const columns = ["fullName", "count", "all"];

    if (this.shouldShowRoomColumn) {
      columns.push("lastAssignByRoom");
    }

    columns.push("lastDate", "lastAssignGlobal", "more");
    return columns;
  }

  public getEmptyStateMessage(section: EmptyStateSection): string {
    const roleLabel = this.type === "assistant" ? "asistente" : "responsable";

    switch (section) {
      case "frequent":
        return `No hay publicadores frecuentes para asignar como ${roleLabel}.`;
      case "history":
        return `No hay historial de participación para asignar como ${roleLabel}.`;
      case "brothers":
        return `No hay hermanos disponibles para asignar como ${roleLabel}.`;
      case "sisters":
        return `No hay hermanas disponibles para asignar como ${roleLabel}.`;
      case "all":
        return `No hay publicadores registrados para asignar como ${roleLabel}.`;
      default:
        return "No existen registros para mostrar.";
    }
  }

  adapter(publisherDto: PublisherDto[]): Publisher[] {
    return publisherDto.map((data) => {
      return { ...data.publisher, quantity: data.total };
    });
  }

  closeModal() {
    this.onClose.emit(true);
  }
  parseDate(value?: number | string | null): string {
    if (!value) {
      return "";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "";
    }

    // Sumar 4 días
    date.setDate(date.getDate() + this.congregation.day - 1);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses van de 0 a 11
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  sortDataSource(dataSourceName: SortableDataSourceName, key: string): void {
    const currentState = this.sortStates[dataSourceName];
    const direction: SortDirection = currentState?.active === key && currentState.direction === "asc" ? "desc" : "asc";

    this.sortStates[dataSourceName] = { active: key, direction };
    const dataSource = this.getDataSource(dataSourceName);
    dataSource.data = this.sortItems(dataSource.data, key, direction);
  }

  getSortIcon(dataSourceName: SortableDataSourceName, key: string): string {
    const state = this.sortStates[dataSourceName];

    if (state?.active !== key) {
      return "unfold_more";
    }

    return state.direction === "asc" ? "arrow_upward" : "arrow_downward";
  }

  private applyActiveSorts(): void {
    (Object.keys(this.sortStates) as SortableDataSourceName[]).forEach((dataSourceName) => {
      const state = this.sortStates[dataSourceName];

      if (!state) {
        return;
      }

      const dataSource = this.getDataSource(dataSourceName);
      dataSource.data = this.sortItems(dataSource.data, state.active, state.direction);
    });
  }

  private getDataSource(dataSourceName: SortableDataSourceName): MatTableDataSource<any> {
    return this[dataSourceName] as MatTableDataSource<any>;
  }

  private sortItems<T>(items: T[], key: string, direction: SortDirection): T[] {
    return [...items].sort((current, next) => {
      const comparison = this.compareValues(this.getSortValue(current, key), this.getSortValue(next, key));
      return direction === "asc" ? comparison : -comparison;
    });
  }

  private getSortValue(item: any, key: string): unknown {
    switch (key) {
      case "fullName":
        return item?.user?.fullName ?? item?.fullName ?? "";
      case "count":
        return this.getCountValue(item);
      case "estado":
        return item?.participate ? 1 : 0;
      case "date":
        return item?.date ?? 0;
      case "lastAssignGlobal":
        return item?.lastAssignGlobal ?? "";
      default:
        return item?.[key] ?? "";
    }
  }

  private getCountValue(item: any): number {
    if (typeof item?.count === "number") {
      return item.count;
    }

    if (this.assignmentType === AssignmentType.PRESIDENT) {
      return item?.presidentCount ?? 0;
    }

    if (this.assignmentType === AssignmentType.OPENING_PRAYER) {
      return item?.openingPrayerCount ?? 0;
    }

    return item?.finalPrayerCount ?? 0;
  }

  private compareValues(current: unknown, next: unknown): number {
    if (typeof current === "number" && typeof next === "number") {
      return current - next;
    }

    return String(current ?? "").localeCompare(String(next ?? ""), "es", { numeric: true, sensitivity: "base" });
  }

  onSearch(event: Event, type: string): void {
    const value = (event.target as HTMLInputElement).value.toLowerCase().trim();
    if (value === "") {
      this.usedPublishersDataSource.data = this.usedPublishersList;
      this.usedPublishersAllByAssigDataSource.data = this.usedPublishersListAllByAssig;
      this.applyActiveSorts();
      return;
    }
    if (type === "usedPublishersDataSource") {
      this.usedPublishersDataSource.data = this.usedPublishersList.filter((item) => item.fullName.toLowerCase().startsWith(value));
    } else if (type === "usedPublishersAllByAssigDataSource") {
      this.usedPublishersAllByAssigDataSource.data = this.usedPublishersListAllByAssig.filter((item) => item.user.fullName.toLowerCase().startsWith(value));
    }
    this.applyActiveSorts();
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
    this.applyActiveSorts();
    this.showSubModal = true;
  }

  closeSubModal() {
    this.showSubModal = false;
  }
}
