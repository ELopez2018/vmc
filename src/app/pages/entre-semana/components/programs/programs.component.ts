import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { AssignmentType } from "src/app/core/enums/assignments.enums";
import { Congregation, Meeting, Program, Publisher, WeeklyProgram, WeeklyProgramUpsertByTitleRequest } from "src/app/core/interfaces/reuniones.interface";
import { DataService } from "src/app/core/services/data/data.service";
import { MeetingsService } from "src/app/core/services/meetings/meetings.service";
import { ModalService } from "src/app/core/services/modal/modal.service";
import { WeeklyProgramService } from "src/app/core/services/weeklyProgram/WeeklyProgram.service";
import { SharedModule } from "src/app/shared/shared.module";
import { Utils } from "src/app/shared/Utils";
import { CongregationMock } from "../../mocks/congregation.mock";
import { ModalTitleEnums } from "src/app/core/enums/modal.enums";
import { ModalTypeEnums } from "../../../../core/enums/modal.enums";
import { ProgramPdf, WeeklyProgramPdF } from "src/app/core/interfaces/print-pdf.interface";
import Swal from "sweetalert2";
import { ProgramFiltersComponent } from "src/app/shared/components/program-filters/program-filters.component";
import { ProgramWeekComponent } from "./components/program-week/program-week.component";
import { ADMIN_EMAIL, MEETING_PARTS, MeetingRoom, ModalResult, ProgramChangeType, WeeklyProgramChangeType } from "src/app/core/constants/program.constants";
import { SectionMeeting } from "src/app/core/enums/meetings.enums";
import { includesMeetingPartTitle, isCongregationBibleStudyAssignment, isSpeechAssignment, normalizeProgramTitle } from "./program-assignment.util";
import { map, Observable, of } from "rxjs";

type WeeklyPublisherField = "responsible" | "assistant";
type PdfPublisherField = WeeklyPublisherField | "responsibleB" | "assistantB";

interface WeeklyPublisherTarget {
  room: MeetingRoom;
  field: WeeklyPublisherField;
  viewField: PdfPublisherField;
  modalType: WeeklyProgramChangeType;
}

@Component({
  selector: "vmc-programs",
  templateUrl: "./programs.component.html",
  styleUrls: ["./programs.component.scss"],
  imports: [CommonModule, SharedModule, ProgramFiltersComponent, ProgramWeekComponent],
})
export class ProgramsComponent implements OnInit, OnChanges {
  @Output() public filtrar = new EventEmitter<{ fechaDesde: any; fechaHasta: any }>();
  @Input() public semanas: Program[] = [];
  @Input() public semanasAllRooms: ProgramPdf[] = [];
  @Input() public RoomA = false;
  @Input() public room = MeetingRoom.MAIN;
  porAsignar = "por asignar";
  isAdmin = false;
  public congregation: Congregation = CongregationMock;
  public assignmentType: string = "";
  public superintendente!: Publisher;
  public showSpinner = false;
  public meetingDay = 1;
  fechaHasta: any;
  fechaDesde: any;
  constructor(
    private meetingsService: MeetingsService,
    private modalService: ModalService,
    private dataService: DataService,
    private weeklyProgramService: WeeklyProgramService,
    private ngbModal: NgbModal,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["semanas"]) {
      this.updateWeeksForPrint();
    }
  }

  ngOnInit(): void {
    this.dataService.getPublisher().subscribe((data) => {
      this.superintendente = data;
      this.isAdmin = data.email === ADMIN_EMAIL;
    });

    this.dataService.getCongregation$().subscribe((data) => {
      this.congregation = data;
      this.meetingDay = data.day;
    });
    this.updateWeeksForPrint();
  }

  private updateWeeksForPrint(): void {
    this.semanasAllRooms = this.dataService.makePDfVersion(this.semanas);
  }

  showDayOfMeeting(fechaSemana: any) {
    return Utils.showDayOfMeeting(fechaSemana, this.meetingDay);
  }

  adapterTime(dateTime: any) {
    return Utils.adapterTime(dateTime);
  }

  private saveWeeklyProgram(weeklyProgram: WeeklyProgram) {
    return this.weeklyProgramService.upsertByTitle(this.mapWeeklyProgramUpsertByTitleRequest(weeklyProgram));
  }

  private updateWeeklyProgram(weeklyProgram: WeeklyProgram) {
    return this.weeklyProgramService.update(weeklyProgram);
  }

  private mapWeeklyProgramUpsertByTitleRequest(weeklyProgram: WeeklyProgram): WeeklyProgramUpsertByTitleRequest {
    return {
      weeklyProgramId: weeklyProgram.id,
      programId: weeklyProgram.program,
      congregationId: weeklyProgram.congregation.id,
      title: weeklyProgram.assignment.title,
      number: weeklyProgram.assignment.number,
      sectionMeeting: weeklyProgram.assignment.sectionMeeting,
      time: weeklyProgram.assignment.time,
      timeType: weeklyProgram.assignment.timeType,
      showTips: weeklyProgram.assignment.showTips,
      responsibleId: weeklyProgram.responsible?.id ?? null,
      assistantId: weeklyProgram.assistant?.id ?? null,
      startTime: this.mapTimeToSaveRequest(weeklyProgram.startTime),
      room: weeklyProgram.room,
    };
  }

  private mapTimeToSaveRequest(time: unknown): string | null {
    if (!time) {
      return null;
    }

    if (Array.isArray(time)) {
      const [hours, minutes, seconds = 0] = time;

      return `${this.padTimeSegment(hours)}:${this.padTimeSegment(minutes)}:${this.padTimeSegment(seconds)}`;
    }

    if (typeof time === "string") {
      const [hours = "00", minutes = "00", seconds = "00"] = time.split(":");

      return `${this.padTimeSegment(hours)}:${this.padTimeSegment(minutes)}:${this.padTimeSegment(seconds)}`;
    }

    return null;
  }

  private padTimeSegment(value: unknown): string {
    return Number(value ?? 0)
      .toString()
      .padStart(2, "0");
  }

  filter(weeks: Meeting[]) {
    return weeks.filter((week) => Utils.showFirstDateOfWeek(week.week));
  }
  getDataFromJW() {
    this.meetingsService.getUpdateWeeksFromJW().subscribe((data) => {});
  }

  changeProgram(program: Program, type: string) {
    console.log("changeProgram");
    let item = this.filterProgram(program) ?? program;
    switch (type) {
      case ProgramChangeType.START_TIME_OPENING_SONG:
        this.modalService
          .selectedHour()
          .then((data) => {
            if (data === ModalResult.CLOSE) {
              return;
            }
            item.startTimeOpeningSong = data;
            program.startTimeOpeningSong = data;
            this.meetingsService.saveOrUpdateProgram(item).subscribe((data) => {});
          })
          .catch((data) => {
            console.info(data);
          });
        break;
      case ProgramChangeType.START_TIME_INTRO:
        this.modalService
          .selectedHour()
          .then((data) => {
            if (data === ModalResult.CLOSE) {
              return;
            }
            item.startTimeIntro = data;
            program.startTimeIntro = data;
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
            if (data === ModalResult.CLOSE) {
              return;
            }
            item.startTimeIntermediateSong = data;
            program.startTimeIntermediateSong = data;
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
            if (data === ModalResult.CLOSE) {
              return;
            }
            item.startTimeConclusionWords = data;
            program.startTimeConclusionWords = data;
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
            if (data === ModalResult.CLOSE) {
              return;
            }
            item.startTimeFinalSong = data;
            program.startTimeFinalSong = data;
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
            if (data === ModalResult.CLOSE) {
              return;
            }
            if (data) {
              item.openingPrayer = data;
              program.openingPrayer = data;
              this.meetingsService.saveOrUpdateProgram(item).subscribe((data) => {});
              return;
            }
            if (data == null) {
              Swal.fire({
                title: "¿Estás seguro?",
                text: `Esta a punto de borrar la oración inicial del programa semanal`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, bórralo!",
              }).then((result) => {
                if (result.isConfirmed) {
                  item.openingPrayer = data;
                  program.openingPrayer = data;
                  this.meetingsService.saveOrUpdateProgram(item).subscribe((data) => {});
                }
              });
            }
          })
          .catch((data) => {
            console.info(data);
          });
        break;
      case AssignmentType.FINAL_PRAYER:
        this.modalService
          .assignPublisherProgram(item, AssignmentType.FINAL_PRAYER)
          .then((data) => {
            if (data === ModalResult.CLOSE) {
              return;
            }
            if (data) {
              item.finalPrayer = data;
              program.finalPrayer = data;
              this.meetingsService.saveOrUpdateProgram(item).subscribe((data) => {});
              return;
            }
            if (data == null) {
              Swal.fire({
                title: "¿Estás seguro?",
                text: `Esta a punto de borrar la oración final del programa semanal`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, bórralo!",
              }).then((result) => {
                if (result.isConfirmed) {
                  item.finalPrayer = data;
                  program.finalPrayer = data;
                  this.meetingsService.saveOrUpdateProgram(item).subscribe((data) => {});
                }
              });
            }
          })
          .catch((data) => {
            console.info(data);
          });
        break;
      case AssignmentType.PRESIDENT:
        this.modalService
          .assignPublisherProgram(item, AssignmentType.PRESIDENT)
          .then((data) => {
            if (data === ModalResult.CLOSE) {
              return;
            }
            if (data) {
              item.president = data;
              program.president = data;
              this.meetingsService.saveOrUpdateProgram(item).subscribe((data) => {
                console.info(data);
              });
              return;
            }
            if (data == null) {
              Swal.fire({
                title: "¿Estás seguro?",
                text: `Esta a punto de borrar el presidente del programa semanal`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, bórralo!",
              }).then((result) => {
                if (result.isConfirmed) {
                  item.president = data;
                  program.president = data;
                  this.meetingsService.saveOrUpdateProgram(item).subscribe((data) => {
                    console.info(data);
                  });
                }
              });
            }
          })
          .catch((data) => {
            console.info(data);
          });
        break;
      case AssignmentType.ASSISTANT_ADVISER:
        this.modalService
          .assignPublisherProgram(item, AssignmentType.ASSISTANT_ADVISER)
          .then((data) => {
            if (data === ModalResult.CLOSE) {
              return;
            }
            if (data) {
              item.assistantAdviser = data;
              program.assistantAdviser = data;
              this.meetingsService.saveOrUpdateProgram(item).subscribe((data) => {
                console.info(data);
              });
              return;
            }
            if (data == null) {
              Swal.fire({
                title: "¿Estás seguro?",
                text: `Esta a punto de borrar el consejero auxiliar del programa semanal`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, bórralo!",
              }).then((result) => {
                if (result.isConfirmed) {
                  item.assistantAdviser = data;
                  program.assistantAdviser = data;
                  this.meetingsService.saveOrUpdateProgram(item).subscribe((data) => {
                    console.info(data);
                  });
                }
              });
            }
          })
          .catch((data) => {
            console.info(data);
          });
        break;
      case ProgramChangeType.OPENING_SONG:
        this.modalService
          .changeSong(item, item.meeting.openingSong)
          .then((data) => {
            if (data === ModalResult.CLOSE) {
              return;
            }
            if (data) {
              item.meeting.openingSong = data;
              program.meeting.openingSong = data;
              this.meetingsService.updateMeeting(item.meeting).subscribe((data) => {
                console.info(data);
              });
              return;
            }
            if (data == null) {
              Swal.fire({
                title: "¿Estás seguro?",
                text: `Esta a punto de borrar la canción inicial del programa semanal`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, bórralo!",
              }).then((result) => {
                if (result.isConfirmed) {
                  item.meeting.openingSong = data;
                  program.meeting.openingSong = data;
                  this.meetingsService.updateMeeting(item.meeting).subscribe((data) => {
                    console.info(data);
                  });
                }
              });
            }
          })
          .catch((data) => {
            console.info(data);
          });
        break;
      case ProgramChangeType.INTERMEDIATE_SONG:
        this.modalService
          .changeSong(item, item.meeting.intermediateSong)
          .then((data) => {
            if (data === ModalResult.CLOSE) {
              return;
            }
            if (data) {
              item.meeting.intermediateSong = data;
              program.meeting.intermediateSong = data;
              this.meetingsService.updateMeeting(item.meeting).subscribe((data) => {
                console.info(data);
              });
              return;
            }
            if (data == null) {
              Swal.fire({
                title: "¿Estás seguro?",
                text: `Esta a punto de borrar la canción intermedia del programa semanal`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, bórralo!",
              }).then((result) => {
                if (result.isConfirmed) {
                  item.meeting.intermediateSong = data;
                  program.meeting.intermediateSong = data;
                  this.meetingsService.updateMeeting(item.meeting).subscribe((data) => {
                    console.info(data);
                  });
                }
              });
            }
          })
          .catch((data) => {
            console.info(data);
          });
        break;
      case ProgramChangeType.FINAL_SONG:
        this.modalService
          .changeSong(item, item.meeting.finalSong)
          .then((data) => {
            if (data === ModalResult.CLOSE) {
              return;
            }
            if (data) {
              item.meeting.finalSong = data;
              program.meeting.finalSong = data;
              this.meetingsService.updateMeeting(item.meeting).subscribe((data) => {
                console.info(data);
              });
              return;
            }
            if (data == null) {
              Swal.fire({
                title: "¿Estás seguro?",
                text: `Esta a punto de borrar la canción final del programa semanal`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, bórralo!",
              }).then((result) => {
                if (result.isConfirmed) {
                  item.meeting.finalSong = data;
                  program.meeting.finalSong = data;
                  this.meetingsService.updateMeeting(item.meeting).subscribe((data) => {
                    console.info(data);
                  });
                }
              });
            }
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
    if (isSpeechAssignment(item.assignment)) {
      this.assignmentType = AssignmentType.SPEECH;
      return;
    }

    if (isCongregationBibleStudyAssignment(item.assignment)) {
      this.assignmentType = AssignmentType.CONGREGATION_BIBLE_STUDY;
    } else {
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
      }
    }

    if (this.assignmentType === AssignmentType.WHAT_WOULD_YOU_SAY) {
      this.assignmentType = this.resolveWhatWouldYouSayAssignmentType(type);
    } else if (this.isAssistantChange(type) && this.assignmentType === AssignmentType.CONGREGATION_BIBLE_STUDY) {
      this.assignmentType = AssignmentType.CONGREGATION_BIBLE_STUDY_READER;
    } else if (this.isAssistantChange(type) && this.assignmentType !== AssignmentType.CONGREGATION_BIBLE_STUDY) {
      this.assignmentType += "Assistant";
    }
  }

  private isAssistantChange(type: string): boolean {
    return type === WeeklyProgramChangeType.ASSISTANT || type === WeeklyProgramChangeType.ASSISTANT_B;
  }
  selectAssignmentTypeByTitle(title: string) {
    if (includesMeetingPartTitle(title, MEETING_PARTS.WHAT_HE_DID)) {
      return AssignmentType.WHAT_HE_DID;
    }
    if (includesMeetingPartTitle(title, MEETING_PARTS.IMITATE)) {
      return AssignmentType.IMITATE;
    }
    if (includesMeetingPartTitle(title, MEETING_PARTS.STARTING_A_CONVERSATION)) {
      return AssignmentType.STARTING_A_CONVERSATION;
    }
    if (includesMeetingPartTitle(title, MEETING_PARTS.FOLLOWING_UP)) {
      return AssignmentType.FOLLOWING_UP;
    }
    if (includesMeetingPartTitle(title, MEETING_PARTS.EXPLAINING_YOUR_BELIEFS)) {
      return AssignmentType.EXPLAINING_YOUR_BELIEFS;
    }
    if (this.isWhatWouldYouSayTitle(title)) {
      return AssignmentType.WHAT_WOULD_YOU_SAY;
    }
    if (includesMeetingPartTitle(title, MEETING_PARTS.MAKING_DISCIPLES)) {
      return AssignmentType.MAKING_DISCIPLES;
    }
    if (includesMeetingPartTitle(title, MEETING_PARTS.CONGREGATION_BIBLE_STUDY)) {
      return AssignmentType.CONGREGATION_BIBLE_STUDY;
    }
    if (includesMeetingPartTitle(title, MEETING_PARTS.LOCAL_NEEDS)) {
      return AssignmentType.LOCAL_NEEDS;
    }
    if (includesMeetingPartTitle(title, MEETING_PARTS.SPEECH)) {
      return AssignmentType.SPEECH;
    }
    return "";
  }

  private isWhatWouldYouSayTitle(title: string): boolean {
    return includesMeetingPartTitle(title, MEETING_PARTS.WHAT_WOULD_YOU_SAY);
  }

  private resolveWhatWouldYouSayAssignmentType(type: string): AssignmentType {
    return type === WeeklyProgramChangeType.ASSISTANT || type === WeeklyProgramChangeType.ASSISTANT_B
      ? AssignmentType.WHAT_WOULD_YOU_SAY_ASSISTANT
      : AssignmentType.WHAT_WOULD_YOU_SAY;
  }

  changeWeeklyProgram(item: WeeklyProgramPdF, type: string) {
    const target = this.getWeeklyPublisherTarget(type);

    if (target) {
      this.resolveAssignmentType(item, type);
      this.getOrCreateWeeklyProgramForRoom(item, target.room).subscribe({
        next: (weeklyProgram) => {
          if (!weeklyProgram) {
            console.error("No se encontró el programa semanal para la sala", target.room);
            return;
          }

          this.modalService
            .assignPublisherWeeklyProgram(weeklyProgram, this.assignmentType, target.modalType, target.room)
            .then((data: unknown) => this.handlePublisherSelection(item, target, weeklyProgram, data))
            .catch((error) => console.error("No se pudo abrir el selector de publicadores", error));
        },
        error: (error) => console.error("No se pudo preparar la asignación para la sala", target.room, error),
      });
      return;
    }

    switch (type) {
      case WeeklyProgramChangeType.START_TIME:
        this.modalService
          .selectedHour()
          .then((data) => {
            if (data === ModalResult.CLOSE) {
              return;
            }
            item.startTime = data;
            this.saveWeeklyProgram(item).subscribe((data) => {
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
            if (data === ModalResult.CLOSE) {
              return;
            }
            item = data;
            this.saveWeeklyProgram(item).subscribe((data) => {
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

  private resolveAssignmentType(item: WeeklyProgram, type: string): string {
    if (
      item.assignment.sectionMeeting.includes(SectionMeeting.NUESTRA_VIDA_CRISTIANA) &&
      !isCongregationBibleStudyAssignment(item.assignment) &&
      !includesMeetingPartTitle(item.assignment.title, MEETING_PARTS.LOCAL_NEEDS)
    ) {
      this.assignmentType = AssignmentType.OTHER_PART_LIVING_AS_CHRISTIANS;
    } else {
      this.selectAssignmentType(item, type);
    }

    return this.assignmentType;
  }

  private getWeeklyPublisherTarget(type: string): WeeklyPublisherTarget | null {
    switch (type) {
      case WeeklyProgramChangeType.RESPONSIBLE:
        return {
          room: MeetingRoom.MAIN,
          field: "responsible",
          viewField: "responsible",
          modalType: WeeklyProgramChangeType.RESPONSIBLE,
        };
      case WeeklyProgramChangeType.ASSISTANT:
        return {
          room: MeetingRoom.MAIN,
          field: "assistant",
          viewField: "assistant",
          modalType: WeeklyProgramChangeType.ASSISTANT,
        };
      case WeeklyProgramChangeType.RESPONSIBLE_B:
        return {
          room: MeetingRoom.AUXILIARY,
          field: "responsible",
          viewField: "responsibleB",
          modalType: WeeklyProgramChangeType.RESPONSIBLE,
        };
      case WeeklyProgramChangeType.ASSISTANT_B:
        return {
          room: MeetingRoom.AUXILIARY,
          field: "assistant",
          viewField: "assistantB",
          modalType: WeeklyProgramChangeType.ASSISTANT,
        };
      default:
        return null;
    }
  }

  private getOrCreateWeeklyProgramForRoom(item: WeeklyProgramPdF, room: MeetingRoom): Observable<WeeklyProgram | null> {
    const existing = this.filterRoom(item, room);
    if (existing) {
      return of(existing);
    }

    const program = this.findProgramForItem(item);
    if (!program) {
      return of(null);
    }

    const weeklyProgram: WeeklyProgram = {
      assignment: item.assignment,
      congregation: item.congregation,
      program: item.program,
      startTime: item.startTime,
      room,
      responsible: null,
      assistant: null,
    };

    return this.weeklyProgramService.save([weeklyProgram]).pipe(
      map((savedPrograms) => {
        const saved = savedPrograms.find((candidate) => this.matchesWeeklyProgram(candidate, item, room));
        if (!saved) {
          return null;
        }

        const stored = program.weeklyPrograms.find((candidate) => candidate.id === saved.id);
        if (stored) {
          Object.assign(stored, saved);
          return stored;
        }

        program.weeklyPrograms = [...program.weeklyPrograms, saved];
        return saved;
      }),
    );
  }

  private handlePublisherSelection(
    item: WeeklyProgramPdF,
    target: WeeklyPublisherTarget,
    weeklyProgram: WeeklyProgram,
    data: unknown,
  ): void {
    if (data === ModalResult.CLOSE) {
      return;
    }

    if (data) {
      this.persistPublisherAssignment(item, target, weeklyProgram, data as Publisher);
      return;
    }

    if (data == null) {
      const role = target.field === "responsible" ? "responsable" : "ayudante";
      const roomSuffix = target.room === MeetingRoom.AUXILIARY ? " B" : "";

      Swal.fire({
        title: "¿Estás seguro?",
        text: `Esta a punto de borrar el ${role}${roomSuffix} de la asignación`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, bórralo!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.persistPublisherAssignment(item, target, weeklyProgram, null);
        }
      });
    }
  }

  private persistPublisherAssignment(
    item: WeeklyProgramPdF,
    target: WeeklyPublisherTarget,
    weeklyProgram: WeeklyProgram,
    publisher: Publisher | null,
  ): void {
    const request = { ...weeklyProgram, [target.field]: publisher } as WeeklyProgram;

    this.updateWeeklyProgram(request).subscribe({
      next: (saved) => {
        Object.assign(weeklyProgram, saved);
        this.setPdfPublisher(item, target.viewField, publisher);

        if (publisher && target.field === "assistant" && this.assignmentType === AssignmentType.CONGREGATION_BIBLE_STUDY_READER) {
          this.modalService.info(
            "Recordatorio",
            "Los hermanos deben ser lectores aprobados por el cuerpo de Ancianos (sfl 1:2.8). Si ya fue aprobado vaya al modulo PRIVILEGIOS.",
            ModalTitleEnums.INFORMACION,
            ModalTypeEnums.INFO,
          );
        }
      },
      error: (error) => console.error("No se pudo guardar la asignación", error),
    });
  }

  private setPdfPublisher(item: WeeklyProgramPdF, field: PdfPublisherField, publisher: Publisher | null): void {
    item[field] = publisher;
  }

  private findProgramForItem(item: WeeklyProgram): Program | undefined {
    return (
      this.semanas.find((week) => week.id === item.program) ??
      this.semanas.find((week) => week.weeklyPrograms.some((weeklyProgram) => weeklyProgram.id === item.id))
    );
  }

  private matchesWeeklyProgram(candidate: WeeklyProgram, item: WeeklyProgram, room: MeetingRoom): boolean {
    return candidate.room?.toUpperCase() === room && this.matchesAssignment(candidate.assignment, item.assignment);
  }

  private matchesAssignment(left: WeeklyProgram["assignment"], right: WeeklyProgram["assignment"]): boolean {
    if (left?.id != null && right?.id != null) {
      if (left.id === right.id) {
        return true;
      }
    }

    return (
      left?.sectionMeeting === right?.sectionMeeting &&
      left?.number === right?.number &&
      normalizeProgramTitle(left?.title) === normalizeProgramTitle(right?.title)
    );
  }
  addAssign(item: Program, sectionMeeting: string) {
    this.modalService.AddAssignment(item, sectionMeeting);
  }

  print(week: Program) {
    this.dataService.setMeeting([week]);
    this.modalService.printer();
  }
  printAssig(week: Program) {
    this.dataService.setMeeting([week]);
    this.modalService.printerAssig();
  }
  filterRoom(item: WeeklyProgram, room = MeetingRoom.AUXILIARY): WeeklyProgram | undefined {
    const program = this.findProgramForItem(item);

    return program?.weeklyPrograms.find(
      (weeklyProgram) => weeklyProgram.room?.toUpperCase() === room && this.matchesAssignment(weeklyProgram.assignment, item.assignment),
    );
  }

  filterProgram(item: Program, room = MeetingRoom.AUXILIARY) {
    return this.semanas.find((p) => p.id == item.id);
  }
  consultar(filtros: { fechaDesde: any; fechaHasta: any }) {
    this.filtrar.emit(filtros);
  }

  private filtersModalRef?: NgbModalRef;

  public openFiltersModal(content: TemplateRef<unknown>): void {
    this.filtersModalRef = this.ngbModal.open(content, {
      backdrop: "static",
      centered: true,
      animation: true,
      fullscreen: "sm",
      windowClass: "program-filter-modal-window",
    });
  }

  public closeFiltersModal(): void {
    this.filtersModalRef?.dismiss();
    this.filtersModalRef = undefined;
  }

  public onFiltersSelected(filtros: { fechaDesde: any; fechaHasta: any }): void {
    this.consultar(filtros);
    this.filtersModalRef?.close();
    this.filtersModalRef = undefined;
  }
}
