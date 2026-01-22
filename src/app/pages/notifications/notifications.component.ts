import { AfterViewInit, Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { Assignment, Program, SendNotidicationReques } from "src/app/core/interfaces/reuniones.interface";
import { DataService } from "src/app/core/services/data/data.service";
import { MatIcon } from "@angular/material/icon";
import { Utils } from "src/app/shared/Utils";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatButtonModule } from "@angular/material/button";
import { AssignmentService } from "src/app/core/services/assignment/assignment.service";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { distinctUntilChanged, Subject, takeUntil } from "rxjs";
import { NotificationService } from "src/app/core/services/nofitications/notification.service";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
export interface Designation {
  id: number;
  description: string;
}

export interface UserLite {
  id: number;
  fullName: string;
  email: string;
  documentType?: string | null;
  documentNumber?: number | null;
  enabled?: boolean;
  designations?: Designation[];
  myCongregationId?: number | null;
}

export interface AssignmentRow {
  programId: number;
  assignmentType: string;
  user: UserLite;
  assignment: Assignment;
  notificationSentAt?: string;
}

export interface Combobox {
  value: string;
  label: string;
}
@Component({
  selector: "vmc-notifications",
  imports: [MatIcon, MatTableModule, MatPaginator, MatTooltipModule, MatButtonModule, ReactiveFormsModule, MatProgressSpinner],
  templateUrl: "./notifications.component.html",
  styleUrl: "./notifications.component.scss",
})
export class NotificationsComponent implements OnChanges, AfterViewInit {
  @Input() rows: AssignmentRow[] = [];
  @Input() pageSize = 10;
  @Input() pageSizeOptions: number[] = [5, 10, 25, 50];
  @Output() sendEmail = new EventEmitter<AssignmentRow>();
  @Output() sendReminder = new EventEmitter<AssignmentRow>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public displayedColumns: string[] = ["week", "fullName", "title", "assignmentType", "email", "actions"];
  public dataSource = new MatTableDataSource<AssignmentRow>([]);

  public valuesComboSemanas: Combobox[] = [];
  public valuesComboSecciones: Combobox[] = [];
  public valuesComboParticipantes: Combobox[] = [];
  public dataSourceAllRaws = new MatTableDataSource<AssignmentRow>([]);
  public filtersForm!: FormGroup;
  private destroy$ = new Subject<void>();
  private readonly notify = inject(NotificationService);
  public loadingByKey = new Set<number>();
  constructor(private assignmentService: AssignmentService, private dataService: DataService, private fb: FormBuilder) {}
  ngOnInit(): void {
    this.filtersForm = this.fb.group({
      week: [""],
      section: [""],
      participant: [""],
      search: [""],
    });

    this.dataService.getMeeting().subscribe((data) => {
      this.fitroComboSemanas(data);
      this.fitroComboSeccion(data);
      this.dataSource.data = this.parseProgram(data);
      this.dataSourceAllRaws.data = this.parseProgram(data);
    });

    // ✅ 1) Suscripción Semana
    this.filtersForm
      .get("week")!
      .valueChanges.pipe(distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(() => this.applyFilters());

    // ✅ 2) Suscripción Sección
    this.filtersForm
      .get("section")!
      .valueChanges.pipe(distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(() => this.applyFilters());

    // ✅ 3) Suscripción Participante
    this.filtersForm
      .get("participant")!
      .valueChanges.pipe(distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(() => this.applyFilters());

    // ✅ 4) Suscripción Buscar (recomendado: normalizar y evitar filtrar con espacios)
    this.filtersForm
      .get("search")!
      .valueChanges.pipe(distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(() => this.applyFilters());
  }
  private applyFilters(): void {
    const week = (this.filtersForm.get("week")!.value ?? "").toString().trim();
    const section = (this.filtersForm.get("section")!.value ?? "").toString().trim();
    const participant = (this.filtersForm.get("participant")!.value ?? "").toString().trim();
    // const searchRaw = (this.filtersForm.get("search")!.value ?? "").toString();
    // const search = searchRaw.trim().toLowerCase();


    this.dataSource.data = this.dataSourceAllRaws.data.filter((row) => {
      // Filtros por combos (si vienen vacíos, no filtran)
      const okWeek = !week || row.assignment?.meeting?.week?.toString() == week;
      const okSection = !section || row.assignment?.sectionMeeting == section;
      const okParticipant = !participant || row.user.fullName.toString().trim() == participant.toString().trim();
      return okWeek && okSection && okParticipant /* && okSearch */;
    });
  }

  // Opcional: botón "Limpiar"
  clearFilters(): void {
    this.filtersForm.reset({
      week: "",
      section: "",
      participant: "",
      search: "",
    });
    this.dataSource.data = [...this.dataSourceAllRaws.data];
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  parseProgram(program: Program[]): any {
    let users: any[] = [];
    const participantes = new Set<string>();
    program.forEach((item) => {
      const programId = item.id;
      item.weeklyProgram.forEach((wp) => {
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

  fitroComboSemanas(program: Program[]) {
    this.valuesComboSemanas = program.map((p) => ({ value: p.meeting.week, label: Utils.showDayOfMeeting(p.meeting.week, 3) }));
  }

  fitroComboSeccion(program: Program[]) {
    this.valuesComboSecciones = this.getUniqueSectionMeetings(program);
  }
  getUniqueSectionMeetings(programs: Program[]): Combobox[] {
    const map = new Map<string, Combobox>();
    for (const program of programs ?? []) {
      for (const wp of program?.weeklyProgram ?? []) {
        const value = wp?.assignment?.sectionMeeting?.trim();
        // ignora null/undefined/""
        if (!value) continue;
        // evita repetidos
        if (!map.has(value)) {
          map.set(value, { value, label: value });
        }
      }
    }
    // si quieres orden alfabético por label, descomenta:
    // return Array.from(map.values()).sort((a, b) => a.label.localeCompare(b.label));
    return Array.from(map.values()).sort((a, b) => a.label.localeCompare(b.label));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["rows"]) {
      this.dataSource.data = this.rows ?? [];
      // si ya existe el paginator, re-asignarlo ayuda cuando cambian datos
      if (this.paginator) this.dataSource.paginator = this.paginator;
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  designationsText(row: AssignmentRow): string {
    const list = row?.user?.designations ?? [];
    if (!list.length) return "-";
    return list.map((d) => d.description).join(", ");
  }

  onSendEmail(row: AssignmentRow): void {
    this.loadingByKey.add(row.programId);
    const body: SendNotidicationReques = {
      userId: row.user.id,
      programId: row.programId,
      templateNumber: 1,
      assignmentType: row.assignmentType,
    };
    this.sendNotifications(body);
  }

  onSendReminder(row: AssignmentRow): void {
    this.loadingByKey.add(row.programId);
    const body: SendNotidicationReques = {
      userId: row.user.id,
      programId: row.programId,
      templateNumber: 2,
      assignmentType: row.assignmentType,
    };
    this.sendNotifications(body);
  }

  trackByUserId = (_: number, item: AssignmentRow) => item.user?.id ?? item.programId;
  parceDate(dateStr: string): string {
    return Utils.showDayOfMeeting(dateStr, 3); // TODO: revisar asignar dinamicamente el dia
  }

  sendNotifications(body: SendNotidicationReques): any {
    this.assignmentService.sendNotifications(body).subscribe({
      next: (resp) => {
        this.updateNotificationSentAtInPlace(this.dataSource.data, body.programId);
        this.notify.success("Notificación enviada correctamente", "¡Hecho!");
        this.loadingByKey.delete(body.programId);
      },
      error: (err) => {
        this.loadingByKey.delete(body.programId);
         this.notify.error(err.message, "Ups. algo salió mal");
        console.error( err);
      },
    });
  }
  updateNotificationSentAtInPlace(rows: AssignmentRow[], programId: number): any {
    const row = rows.find((r) => r.programId === programId);
    this.dataSource.data = rows.map((r) => {
      if (r.programId === programId) {
        return { ...r, notificationSentAt: new Date().toISOString() };
      }
      return r;
    });
  }

  isLoading(row: any): boolean {
    return this.loadingByKey.has(row.programId);
  }
}
