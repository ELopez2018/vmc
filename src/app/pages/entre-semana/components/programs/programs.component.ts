import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
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
import { ProgramFiltersComponent } from "./components/program-filters/program-filters.component";
import { ProgramWeekComponent } from "./components/program-week/program-week.component";
import {
  ADMIN_EMAIL,
  ASSIGNMENT_TITLE,
  MeetingRoom,
  ModalResult,
  ProgramChangeType,
  WeeklyProgramChangeType,
} from "src/app/core/constants/program.constants";
import { SectionMeeting } from "src/app/core/enums/meetings.enums";

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
    return Number(value ?? 0).toString().padStart(2, "0");
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
        } else if (
          (type === WeeklyProgramChangeType.ASSISTANT || type === WeeklyProgramChangeType.ASSISTANT_B) &&
          this.assignmentType !== AssignmentType.CONGREGATION_BIBLE_STUDY
        ) {
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
    if (title.includes(ASSIGNMENT_TITLE.SPEECH)) {
      return AssignmentType.SPEECH;
    }
    return "";
  }
  changeWeeklyProgram(item: WeeklyProgramPdF, type: string) {
    console.log("changeWeeklyProgram", item);
    if (
      item.assignment.sectionMeeting.includes(SectionMeeting.NUESTRA_VIDA_CRISTIANA) &&
      !item.assignment.title.includes(ASSIGNMENT_TITLE.CONGREGATION_BIBLE_STUDY) &&
      !item.assignment.title.includes(ASSIGNMENT_TITLE.LOCAL_NEEDS)
    ) {
      this.assignmentType = AssignmentType.OTHER_PART_LIVING_AS_CHRISTIANS;
    } else {
      this.selectAssignmentType(item, type);
    }
    let itemA: WeeklyProgram;
    switch (type) {
      case WeeklyProgramChangeType.RESPONSIBLE:
        itemA = this.filterRoom(item, MeetingRoom.MAIN) ?? <WeeklyProgram>{};
        this.modalService
          .assignPublisherWeeklyProgram(itemA, this.assignmentType, type)
          .then((data) => {
            if (data === ModalResult.CLOSE) {
              return;
            }
            if (data) {
              item.responsible = data;
              itemA.responsible = data;
              this.saveWeeklyProgram(itemA).subscribe((data) => {
                console.info("saved responsible", data);
              });
              return;
            }
            if (data == null) {
              Swal.fire({
                title: "¿Estás seguro?",
                text: `Esta a punto de borrar el responsable de la asignación`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, bórralo!",
              }).then((result) => {
                if (result.isConfirmed) {
                  item.responsible = data;
                  itemA.responsible = data;
                  this.saveWeeklyProgram(itemA).subscribe((data) => {
                    console.info("saved responsible", data);
                  });
                }
              });
            }
          })
          .catch((data) => {
            console.error(data);
          });
        break;
      case WeeklyProgramChangeType.ASSISTANT:
        itemA = this.filterRoom(item, MeetingRoom.MAIN) ?? <WeeklyProgram>{};
        this.modalService
          .assignPublisherWeeklyProgram(itemA, this.assignmentType, type)
          .then((data: any) => {
            if (data === ModalResult.CLOSE) {
              return;
            }
            if (data) {
              item.assistant = <Publisher>data;
              if (item.assistant.designations?.find((i) => i.description)) {
              }
              itemA.assistant = <Publisher>data;

              this.saveWeeklyProgram(itemA).subscribe((data) => {
                console.info("saved assistant", data);
              });

              if (this.assignmentType === AssignmentType.CONGREGATION_BIBLE_STUDY_READER) {
                this.modalService.info(
                  "Recordatorio",
                  "Los hermanos deben ser lectores aprobados por el cuerpo de  Ancianos (sfl 1:2.8). Si ya fué aprobado vaya al modulo PRIVILEGIOS.",
                  ModalTitleEnums.INFORMACION,
                  ModalTypeEnums.INFO,
                );
              }
              return;
            }
            if (data == null) {
              Swal.fire({
                title: "¿Estás seguro?",
                text: `Esta a punto de borrar el ayudante de la asignación`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, bórralo!",
              }).then((result) => {
                if (result.isConfirmed) {
                  item.assistant = <Publisher>data;
                  itemA.assistant = <Publisher>data;
                  this.saveWeeklyProgram(itemA).subscribe((data) => {
                    console.info("saved assistant", data);
                  });
                }
              });
            }
          })
          .catch((data) => {
            console.info(data);
          });
        break;
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
      case WeeklyProgramChangeType.RESPONSIBLE_B:
        console.log("responsibleB", item);
        const itemResponsibleB = this.filterRoom(item);
        if (!itemResponsibleB) {
          console.error("No se encontro el item.");
          return;
        }
        this.modalService
          .assignPublisherWeeklyProgram(itemResponsibleB, this.assignmentType, null, MeetingRoom.AUXILIARY)
          .then((data) => {
            if (data === ModalResult.CLOSE) {
              return;
            }
            if (data) {
              item.responsibleB = data;
              itemResponsibleB.responsible = data;
              this.saveWeeklyProgram(itemResponsibleB).subscribe((data) => {
                console.info("saved responsible", data);
              });
              return;
            }
            if (data == null) {
              Swal.fire({
                title: "¿Estás seguro?",
                text: `Esta a punto de borrar el responsable B de la asignación`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, bórralo!",
              }).then((result) => {
                if (result.isConfirmed) {
                  item.responsibleB = data;
                  itemResponsibleB.responsible = data;
                  this.saveWeeklyProgram(itemResponsibleB).subscribe((data) => {
                    console.info("saved responsible", data);
                  });
                }
              });
            }
          })
          .catch((data) => {
            console.error(data);
          });
        break;
      case WeeklyProgramChangeType.ASSISTANT_B:
        console.log("assistantB", item);
        const itemAssistantB = this.filterRoom(item);
        if (!itemAssistantB) {
          console.error("No se encontro el item.");
          return;
        }
        this.modalService
          .assignPublisherWeeklyProgram(itemAssistantB, this.assignmentType, null, MeetingRoom.AUXILIARY)
          .then((data: any) => {
            if (data === ModalResult.CLOSE) {
              return;
            }
            if (data) {
              item.assistantB = <Publisher>data;
              itemAssistantB.assistant = <Publisher>data;
              this.saveWeeklyProgram(itemAssistantB).subscribe((data) => {
                console.info("saved assistantB", data);
              });

              if (this.assignmentType === AssignmentType.CONGREGATION_BIBLE_STUDY_READER) {
                this.modalService.info(
                  "Recordatorio",
                  "Los hermanos deben ser lectores aprobados por el cuerpo de  Ancianos (sfl 1:2.8). Si ya fué aprobado vaya al modulo PRIVILEGIOS.",
                  ModalTitleEnums.INFORMACION,
                  ModalTypeEnums.INFO,
                );
              }
              return;
            }
            if (data == null) {
              Swal.fire({
                title: "¿Estás seguro?",
                text: `Esta a punto de borrar el ayudante B de la asignación`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, bórralo!",
              }).then((result) => {
                if (result.isConfirmed) {
                  item.assistantB = <Publisher>data;
                  itemAssistantB.assistant = <Publisher>data;
                  this.saveWeeklyProgram(itemAssistantB).subscribe((data) => {
                    console.info("saved assistantB", data);
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
  filterRoom(item: WeeklyProgram, room = MeetingRoom.AUXILIARY) {
    return this.semanas.find((i) => i.weeklyPrograms.find((j) => j.id === item.id))?.weeklyPrograms.find((k) => k.room === room && k.assignment.number === item.assignment.number);
  }

  filterProgram(item: Program, room = MeetingRoom.AUXILIARY) {
    return this.semanas.find((p) => p.id == item.id);
  }
  consultar(filtros: { fechaDesde: any; fechaHasta: any }) {
    this.filtrar.emit(filtros);
  }

  
}
