import { Component, DestroyRef, inject, OnInit } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { SemanasMock } from "./mocks/semanas.mock";
import { MeetingsService } from "../../core/services/meetings/meetings.service";
import { Meeting, Program, Publisher, WeeklyProgram } from "src/app/core/interfaces/reuniones.interface";
import { Utils } from "src/app/shared/Utils";
import { ModalService } from "src/app/core/services/modal/modal.service";
import { DataService } from "../../core/services/data/data.service";
import { Congregation } from "../../core/interfaces/reuniones.interface";
import { CongregationMock } from "./mocks/congregation.mock";
import { AssignmentService } from "src/app/core/services/assignment/assignment.service";
import { AssignmentType } from "src/app/core/enums/assignments.enums";
import { SectionMeeting } from "../../core/enums/meetings.enums";
import { LoaderService } from "src/app/core/services/loader/loader.service";
import { ProgramPdf } from "src/app/core/interfaces/print-pdf.interface";
import { ASSIGNMENT_TITLE, MeetingRoom, ProgramChangeType, WeeklyProgramChangeType } from "src/app/core/constants/program.constants";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "vmc-entre-semana",
  templateUrl: "./entre-semana.component.html",
  styleUrls: ["./entre-semana.component.scss"],
  standalone: false,
})
export class EntreSemanaComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly pageSize = 2;
  private readonly initialForegroundPages = 2;
  private readonly requestedPages = new Set<number>();
  private readonly loadedPages = new Map<number, Program[]>();
  private readonly cancelInitialProgramLoad$ = new Subject<void>();
  private searchRequestId = 0;
  public readonly meetingRoom = MeetingRoom;
  private programList: Program[] = [];
  public semanas: Program[] = [];
  public semanasSalaAuxiliar: Program[] = [];
  public porAsignar = "por asignar";
  public congregation: Congregation = CongregationMock;
  public assignmentType: string = "";
  public superintendente!: Publisher;
  public showSpinner = false;
  private meetingDay = 1;
  public semanasAllRooms: ProgramPdf[] = [];
  loaderService = inject(LoaderService);
  constructor(
    private meetingsService: MeetingsService,
    private modalService: ModalService,
    private dataService: DataService,
    private assignmentService: AssignmentService,
  ) {
    this.loaderService.hideMatspinner();
    this.dataService.getPublisher().subscribe((data) => {
      this.superintendente = data;
    });

    this.dataService.getCongregation$().subscribe((data) => {
      this.congregation = data;
      this.meetingDay = data.day;
    });
  }
  ngOnInit(): void {
    this.semanas = [];
    this.semanasAllRooms = [];
    this.programList = [];
    this.requestedPages.clear();
    this.loadedPages.clear();
    this.loaderService.showMatspinner();
    this.getPrograms();
  }

  getPrograms(page = 0): void {
    if (this.requestedPages.has(page)) {
      return;
    }

    this.requestedPages.add(page);
    this.meetingsService
      .getWeeksValids(this.congregation.id, page, this.pageSize)
      .pipe(takeUntil(this.cancelInitialProgramLoad$), takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => this.onSuccess(data, page),
        error: this.onError.bind(this),
      });
  }

  onSuccess(data: Program[], page: number): void {
    this.loadedPages.set(page, data);
    this.refreshProgramsFromLoadedPages();
    this.hideInitialLoaderIfReady(page, data);

    if (localStorage.getItem("week")) {
      this.filterByWeekNumber(parseInt(localStorage.getItem("week") ?? ""));
    }

    if (data.length === this.pageSize) {
      this.getPrograms(page + 1);
    }
  }

  private refreshProgramsFromLoadedPages(): void {
    const loadedPrograms = [...this.loadedPages.entries()]
      .sort(([currentPage], [nextPage]) => currentPage - nextPage)
      .flatMap(([, programs]) => programs);

    this.programList = loadedPrograms;
    this.semanas = [...this.programList];
    this.semanasAllRooms = this.dataService.makePDfVersion([...this.programList]);
    this.semanasSalaAuxiliar = [...this.filterWeekByRoom(MeetingRoom.AUXILIARY, this.programList)];
    this.dataService.setMeeting([...this.programList]);
  }

  private hideInitialLoaderIfReady(page: number, data: Program[]): void {
    const firstPagesLoaded = page >= this.initialForegroundPages - 1;
    const noMorePages = data.length < this.pageSize;

    if (firstPagesLoaded || noMorePages) {
      this.loaderService.hideMatspinner();
    }
  }

  onError(error: any) {
    console.error(error);
    this.loaderService.hideMatspinner();
  }

  showDayOfMeeting(fechaSemana: string) {
    return Utils.showDayOfMeeting(fechaSemana, this.meetingDay);
  }

  adapterTime(dateTime: any) {
    return Utils.adapterTime(dateTime);
  }

  filter(weeks: Meeting[]) {
    return weeks.filter((week) => Utils.showFirstDateOfWeek(week.week));
  }

  getDataFromJW() {
    this.meetingsService.getUpdateWeeksFromJW().subscribe((data) => {});
  }

  changeProgram(item: Program, type: string) {
    switch (type) {
      case ProgramChangeType.START_TIME_OPENING_SONG:
        this.modalService
          .selectedHour()
          .then((data) => {
            item.startTimeOpeningSong = data;
            this.meetingsService.saveOrUpdateProgram(item).subscribe((data) => {
              console.info(data);
            });
          })
          .catch((data) => {
            console.info(data);
          });
        break;
      case ProgramChangeType.START_TIME_INTRO:
        this.modalService
          .selectedHour()
          .then((data) => {
            item.startTimeIntro = data;
            this.meetingsService.saveOrUpdateProgram(item).subscribe((data) => {
              console.info(data);
            });
          })
          .catch((data) => {
            console.info(data);
          });
        break;
      case ProgramChangeType.START_TIME_INTERMEDIATE_SONG:
        this.modalService
          .selectedHour()
          .then((data) => {
            item.startTimeIntermediateSong = data;
            this.meetingsService.saveOrUpdateProgram(item).subscribe((data) => {
              console.info(data);
            });
          })
          .catch((data) => {
            console.info(data);
          });
        break;
      case ProgramChangeType.START_TIME_CONCLUSION_WORDS:
        this.modalService
          .selectedHour()
          .then((data) => {
            item.startTimeConclusionWords = data;
            this.meetingsService.saveOrUpdateProgram(item).subscribe((data) => {
              console.info(data);
            });
          })
          .catch((data) => {
            console.info(data);
          });
        break;
      case ProgramChangeType.START_TIME_FINAL_SONG:
        this.modalService
          .selectedHour()
          .then((data) => {
            item.startTimeFinalSong = data;
            this.meetingsService.saveOrUpdateProgram(item).subscribe((data) => {});
          })
          .catch((data) => {
            console.info(data);
          });
        break;
      case AssignmentType.OPENING_PRAYER:
        this.modalService
          .assignPublisherProgram(item, AssignmentType.OPENING_PRAYER)
          .then((data) => {
            item.openingPrayer = data;
            this.meetingsService.saveOrUpdateProgram(item).subscribe((data) => {});
          })
          .catch((data) => {
            console.info(data);
          });
        break;
      case AssignmentType.FINAL_PRAYER:
        this.modalService
          .assignPublisherProgram(item, AssignmentType.FINAL_PRAYER)
          .then((data) => {
            item.finalPrayer = data;
            this.meetingsService.saveOrUpdateProgram(item).subscribe((data) => {});
          })
          .catch((data) => {
            console.info(data);
          });
        break;
      case AssignmentType.PRESIDENT:
        this.modalService
          .assignPublisherProgram(item, AssignmentType.PRESIDENT)
          .then((data) => {
            item.president = data;
            this.meetingsService.saveOrUpdateProgram(item).subscribe((data) => {
              console.info(data);
            });
          })
          .catch((data) => {
            console.info(data);
          });
        break;
      case AssignmentType.ASSISTANT_ADVISER:
        this.modalService
          .assignPublisherProgram(item)
          .then((data) => {
            item.assistantAdviser = data;
            this.meetingsService.saveOrUpdateProgram(item).subscribe((data) => {
              console.info(data);
            });
          })
          .catch((data) => {
            console.info(data);
          });
        break;
      case ProgramChangeType.OPENING_SONG:
        this.modalService
          .changeSong(item, item.meeting.openingSong)
          .then((data) => {
            item.meeting.openingSong = data;
            this.meetingsService.updateMeeting(item.meeting).subscribe((data) => {
              console.info(data);
            });
          })
          .catch((data) => {
            console.info(data);
          });
        break;
      case ProgramChangeType.INTERMEDIATE_SONG:
        this.modalService
          .changeSong(item, item.meeting.intermediateSong)
          .then((data) => {
            item.meeting.intermediateSong = data;
            this.meetingsService.updateMeeting(item.meeting).subscribe((data) => {
              console.info(data);
            });
          })
          .catch((data) => {
            console.info(data);
          });
        break;
      case ProgramChangeType.FINAL_SONG:
        this.modalService
          .changeSong(item, item.meeting.finalSong)
          .then((data) => {
            item.meeting.finalSong = data;
            this.meetingsService.updateMeeting(item.meeting).subscribe((data) => {
              console.info(data);
            });
          })
          .catch((data) => {
            console.info(data);
          });
        break;
      default:
        break;
    }
  }

  selectAssignmentType(item: WeeklyProgram, type: string) {
    switch (item.assignment.number) {
      case 1:
        this.assignmentType = AssignmentType.ASSIGNMENT_1;
        break;
      case 2:
        this.assignmentType = AssignmentType.ASSIGNMENT_2;
        break;
      case 3:
        this.assignmentType = AssignmentType.ASSIGNMENT_3;
        break;
      default:
        this.assignmentType = this.selectAssignmentTypeByTitle(item.assignment.title);
        if (type === WeeklyProgramChangeType.ASSISTANT && this.assignmentType === AssignmentType.CONGREGATION_BIBLE_STUDY) {
          this.assignmentType = AssignmentType.CONGREGATION_BIBLE_STUDY_READER;
        } else if (type === WeeklyProgramChangeType.ASSISTANT && this.assignmentType !== AssignmentType.CONGREGATION_BIBLE_STUDY) {
          this.assignmentType += "Assistant";
        }
    }
  }
  selectAssignmentTypeByTitle(title: string) {
    if (title.includes(ASSIGNMENT_TITLE.WHAT_HE_DID)) {
      return AssignmentType.WHAT_HE_DID;
    }
    if (title.includes(ASSIGNMENT_TITLE.IMITATE)) {
      return AssignmentType.IMITATE;
    }
    if (title.includes(ASSIGNMENT_TITLE.STARTING_A_CONVERSATION)) {
      return AssignmentType.STARTING_A_CONVERSATION;
    }
    if (title.includes(ASSIGNMENT_TITLE.FOLLOWING_UP)) {
      return AssignmentType.FOLLOWING_UP;
    }
    if (title.includes(ASSIGNMENT_TITLE.EXPLAINING_YOUR_BELIEFS)) {
      return AssignmentType.EXPLAINING_YOUR_BELIEFS;
    }
    if (title.includes(ASSIGNMENT_TITLE.MAKING_DISCIPLES)) {
      return AssignmentType.MAKING_DISCIPLES;
    }
    if (title.includes(ASSIGNMENT_TITLE.CONGREGATION_BIBLE_STUDY)) {
      return AssignmentType.CONGREGATION_BIBLE_STUDY;
    }
    if (title.includes(ASSIGNMENT_TITLE.LOCAL_NEEDS)) {
      return AssignmentType.LOCAL_NEEDS;
    }
    return "";
  }
  changeWeeklyProgram(item: WeeklyProgram, type: string) {
    if (
      item.assignment.sectionMeeting.includes(SectionMeeting.NUESTRA_VIDA_CRISTIANA) &&
      !item.assignment.title.includes(ASSIGNMENT_TITLE.CONGREGATION_BIBLE_STUDY) &&
      !item.assignment.title.includes(ASSIGNMENT_TITLE.LOCAL_NEEDS)
    ) {
      this.assignmentType = AssignmentType.OTHER_PART_LIVING_AS_CHRISTIANS;
    } else {
      this.selectAssignmentType(item, type);
    }

    switch (type) {
      case WeeklyProgramChangeType.RESPONSIBLE:
        this.modalService
          .assignPublisherWeeklyProgram(item, this.assignmentType)
          .then((data) => {
            item.responsible = data;
            this.meetingsService.saveOrUpdateWeeklyProgram(item).subscribe((data) => {
              console.log("saved responsible", data);
            });
          })
          .catch((data) => {
            console.info(data);
          });
        break;
      case WeeklyProgramChangeType.ASSISTANT:
        this.modalService
          .assignPublisherWeeklyProgram(item, this.assignmentType)
          .then((data) => {
            item.assistant = data;
            this.meetingsService.saveOrUpdateWeeklyProgram(item).subscribe((data) => {
              console.log("saved assistant", data);
            });
          })
          .catch((data) => {
            console.info(data);
          });
        break;
      case WeeklyProgramChangeType.START_TIME:
        this.modalService
          .selectedHour()
          .then((data) => {
            console.log("startTime", data);
            item.startTime = data;
            this.meetingsService.saveOrUpdateWeeklyProgram(item).subscribe((data) => {
              console.log("saved startTime", data);
            });
          })
          .catch((data) => {
            console.info(data);
          });
        break;
      case WeeklyProgramChangeType.TITLE:
        this.modalService
          .setTitleAndTime(item)
          .then((data) => {
            item = data;
            this.assignmentService.updateAssignment(item.assignment).subscribe((data) => {
              console.log("saved setTitleAndTime", data);
            });
          })
          .catch((data) => {
            console.info(data);
          });
        break;
      default:
        break;
    }
  }
  addAssign(item: Program, sectionMeeting: string) {
    console.log(item, sectionMeeting);
    this.modalService.AddAssignment(item, sectionMeeting);
  }

  filterWeekByRoom(room: string, weeks: Program[]) {
    return weeks.filter((i) => {
      return i.weeklyPrograms.filter((b) => b.room == room)?.length > 0;
    });
  }
  select() {
    this.semanasSalaAuxiliar = this.semanasSalaAuxiliar.map((i) => {
      i.weeklyPrograms = i.weeklyPrograms.filter((a) => a.room === MeetingRoom.AUXILIARY);
      return i;
    });
  }

  goToPrint() {
    this.dataService.setMeeting([...this.programList]);
  }
  filterByWeekNumber(event: number) {
    let weeks: Program[] = [...this.programList];
    if (event == 0) {
      weeks = [...this.programList];
    } else {
      weeks = weeks.filter((week) => week.meeting.weekNumber === event);
    }
    this.semanas = this.filterWeekByRoom(MeetingRoom.MAIN, weeks);
    this.semanasSalaAuxiliar = [...this.filterWeekByRoom(MeetingRoom.AUXILIARY, weeks)];
    this.semanasAllRooms = this.dataService.makePDfVersion([...weeks]);
    this.dataService.setMeeting([...weeks]);
  }

  consultar($event: { fechaDesde: any; fechaHasta: any }) {
    this.cancelInitialProgramLoad$.next();
    const requestId = ++this.searchRequestId;

    this.loaderService.showMatspinner();
    this.requestedPages.clear();
    this.loadedPages.clear();
    this.programList = [];
    this.semanas = [];
    this.semanasSalaAuxiliar = [];
    this.semanasAllRooms = [];
    this.dataService.setMeeting([]);

    this.meetingsService
      .getProgramsByDateRange($event.fechaDesde, $event.fechaHasta, this.congregation.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          if (requestId !== this.searchRequestId) {
            return;
          }

          this.programList = [...data];
          this.semanas = [...data];
          this.semanasSalaAuxiliar = [...this.filterWeekByRoom(MeetingRoom.AUXILIARY, data)];
          this.semanasAllRooms = this.dataService.makePDfVersion(data);
          this.dataService.setMeeting([...data]);
          this.loaderService.hideMatspinner();
        },
        error: (error) => {
          if (requestId !== this.searchRequestId) {
            return;
          }

          console.error(error);
          this.loaderService.hideMatspinner();
          this.modalService.errorHandler("No se han podido obtener los programas", "Error");
        },
      });
  }
}
