import { CommonModule } from "@angular/common";
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AssignmentType } from "src/app/core/enums/assignments.enums";
import { Congregation, Meeting, Program, Publisher, WeeklyProgram } from "src/app/core/interfaces/reuniones.interface";
import { AssignmentService } from "src/app/core/services/assignment/assignment.service";
import { DataService } from "src/app/core/services/data/data.service";
import { MeetingsService } from "src/app/core/services/meetings/meetings.service";
import { ModalService } from "src/app/core/services/modal/modal.service";
import { SharedModule } from "src/app/shared/shared.module";
import { Utils } from "src/app/shared/Utils";
import { CongregationMock } from "../../mocks/congregation.mock";
import { ModalTitleEnums } from "src/app/core/enums/modal.enums";
import { ModalTypeEnums } from "../../../../core/enums/modal.enums";
import { ProgramPdf, WeeklyProgramPdF } from "src/app/core/interfaces/print-pdf.interface";
import Swal from "sweetalert2";

@Component({
  selector: "vmc-programs",
  templateUrl: "./programs.component.html",
  styleUrls: ["./programs.component.scss"],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule],
})
export class ProgramsComponent implements OnInit, AfterViewInit {
  @Output() public filtrar = new EventEmitter<{ fechaDesde: any; fechaHasta: any }>();
  @Input() public semanas: Program[] = [];
  @Input() public semanasAllRooms: ProgramPdf[] = [];
  @Input() public RoomA = false;
  @Input() public room = "A";
  porAsignar = "por asignar";
  isAdmin = false;
  public congregation: Congregation = CongregationMock;
  public assignmentType: string = "";
  public superintendente!: Publisher;
  public showSpinner = false;
  private meetingDay = 1;
  fechaHasta: any;
  fechaDesde: any;
  constructor(
    private meetingsService: MeetingsService,
    private modalService: ModalService,
    private dataService: DataService,
    private assignmentService: AssignmentService,
  ) {}
  ngAfterViewInit(): void {
    this.semanasAllRooms = this.dataService.makePDfVersion(this.semanas);
    //  console.log(this.semanas);
    //  console.log(this.semanasAllRooms);
  }
  ngOnInit(): void {
    this.dataService.getPublisher().subscribe((data) => {
      this.superintendente = data;
    });

    this.isAdmin = this.superintendente.email === "estarlin.elv@gmail.com";

    this.dataService.getCongregation$().subscribe((data) => {
      this.congregation = data;
      this.meetingDay = data.day;
    });
    // console.log(this.semanasAllRooms);
  }

  showDayOfMeeting(fechaSemana: any) {
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

  changeProgram(program: Program, type: string) {
    let item = this.filterProgram(program) ?? program;
    switch (type) {
      case "startTimeOpeningSong":
        this.modalService
          .selectedHour()
          .then((data) => {
            if (data == "close") {
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
      case "startTimeIntro":
        this.modalService
          .selectedHour()
          .then((data) => {
            if (data == "close") {
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
      case "startTimeIntermediateSong":
        this.modalService
          .selectedHour()
          .then((data) => {
            if (data == "close") {
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
      case "startTimeConclusionWords":
        this.modalService
          .selectedHour()
          .then((data) => {
            if (data == "close") {
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
      case "startTimeFinalSong":
        this.modalService
          .selectedHour()
          .then((data) => {
            if (data == "close") {
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
            if (data == "close") {
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
            if (data == "close") {
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
            if (data == "close") {
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
            if (data == "close") {
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
      case "openingSong":
        this.modalService
          .changeSong(item, item.meeting.openingSong)
          .then((data) => {
            if (data == "close") {
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
      case "intermediateSong":
        this.modalService
          .changeSong(item, item.meeting.intermediateSong)
          .then((data) => {
            if (data == "close") {
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
      case "finalSong":
        this.modalService
          .changeSong(item, item.meeting.finalSong)
          .then((data) => {
            if (data == "close") {
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
        if (type == "assistant" && this.assignmentType == AssignmentType.CONGREGATION_BIBLE_STUDY) {
          this.assignmentType = AssignmentType.CONGREGATION_BIBLE_STUDY_READER;
        } else if ((type == "assistant" || type == "assistantB") && this.assignmentType != AssignmentType.CONGREGATION_BIBLE_STUDY) {
          this.assignmentType += "Assistant";
        }
    }
  }
  selectAssignmentTypeByTitle(title: string) {
    if (title.includes("Lo que hizo")) {
      return AssignmentType.WHAT_HE_DID;
    }
    if (title.includes("Imite a")) {
      return AssignmentType.IMITATE;
    }
    if (title.includes("Empiece conversaciones")) {
      return AssignmentType.STARTING_A_CONVERSATION;
    }
    if (title.includes("Haga revisitas")) {
      return AssignmentType.FOLLOWING_UP;
    }
    if (title.includes("Explique sus creencias")) {
      return AssignmentType.EXPLAINING_YOUR_BELIEFS;
    }
    if (title.includes("Haga discípulos")) {
      return AssignmentType.MAKING_DISCIPLES;
    }
    if (title.includes("Estudio bíblico de la congregación")) {
      return AssignmentType.CONGREGATION_BIBLE_STUDY;
    }
    if (title.includes("Necesidades de la congregación")) {
      return AssignmentType.LOCAL_NEEDS;
    }
    if (title.includes("Discurso")) {
      return AssignmentType.SPEECH;
    }
    return "";
  }
  changeWeeklyProgram(item: WeeklyProgramPdF, type: string) {
    if (
      item.assignment.sectionMeeting.includes("NUESTRA VIDA CRISTIANA") &&
      !item.assignment.title.includes("Estudio bíblico de la congregación") &&
      !item.assignment.title.includes("Necesidades de la congregación")
    ) {
      this.assignmentType = AssignmentType.OTHER_PART_LIVING_AS_CHRISTIANS;
    } else {
      this.selectAssignmentType(item, type);
    }
    let itemA: WeeklyProgram;
    switch (type) {
      case "responsible":
        itemA = this.filterRoom(item, "A") ?? <WeeklyProgram>{};
        this.modalService
          .assignPublisherWeeklyProgram(itemA, this.assignmentType, type)
          .then((data) => {
            if (data == "close") {
              return;
            }
            if (data) {
              console.log("ya paso");
              item.responsible = data;
              itemA.responsible = data;
              this.meetingsService.saveOrUpdateWeeklyProgram(itemA).subscribe((data) => {
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
                  this.meetingsService.saveOrUpdateWeeklyProgram(itemA).subscribe((data) => {
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
      case "assistant":
        itemA = this.filterRoom(item, "A") ?? <WeeklyProgram>{};
        this.modalService
          .assignPublisherWeeklyProgram(itemA, this.assignmentType, type)
          .then((data: any) => {
            if (data == "close") {
              return;
            }
            if (data) {
              item.assistant = <Publisher>data;
              if (item.assistant.designations?.find((i) => i.description)) {
              }
              itemA.assistant = <Publisher>data;

              this.meetingsService.saveOrUpdateWeeklyProgram(itemA).subscribe((data) => {
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
                  this.meetingsService.saveOrUpdateWeeklyProgram(itemA).subscribe((data) => {
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
      case "startTime":
        this.modalService
          .selectedHour()
          .then((data) => {
            if (data == "close") {
              return;
            }
            item.startTime = data;
            this.meetingsService.saveOrUpdateWeeklyProgram(item).subscribe((data) => {
              console.log("saved startTime", data);
            });
          })
          .catch((data) => {
            console.info(data);
          });
        break;
      case "title":
        this.modalService
          .setTitleAndTime(item)
          .then((data) => {
            if (data == "close") {
              return;
            }
            item = data;
            this.assignmentService.updateAssignment(item.assignment).subscribe((data) => {
              console.log("saved setTitleAndTime", data);
            });
          })
          .catch((data) => {
            console.info(data);
          });
        break;
      case "responsibleB":
        console.log("responsibleB", item);
        const itemResponsibleB = this.filterRoom(item);
        if (!itemResponsibleB) {
          console.error("No se encontro el item.");
          return;
        }
        this.modalService
          .assignPublisherWeeklyProgram(itemResponsibleB, this.assignmentType, null, "B")
          .then((data) => {
            if (data == "close") {
              return;
            }
            if (data) {
              item.responsibleB = data;
              itemResponsibleB.responsible = data;
              this.meetingsService.saveOrUpdateWeeklyProgram(itemResponsibleB).subscribe((data) => {
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
                  this.meetingsService.saveOrUpdateWeeklyProgram(itemResponsibleB).subscribe((data) => {
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
      case "assistantB":
        console.log("assistantB", item);
        const itemAssistantB = this.filterRoom(item);
        if (!itemAssistantB) {
          console.error("No se encontro el item.");
          return;
        }
        this.modalService
          .assignPublisherWeeklyProgram(itemAssistantB, this.assignmentType, null, "B")
          .then((data: any) => {
            if (data == "close") {
              return;
            }
            if (data) {
              item.assistantB = <Publisher>data;
              itemAssistantB.assistant = <Publisher>data;
              this.meetingsService.saveOrUpdateWeeklyProgram(itemAssistantB).subscribe((data) => {
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
                  this.meetingsService.saveOrUpdateWeeklyProgram(itemAssistantB).subscribe((data) => {
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
  filterRoom(item: WeeklyProgram, room = "B") {
    return this.semanas.find((i) => i.weeklyProgram.find((j) => j.id === item.id))?.weeklyProgram.find((k) => k.room === room && k.assignment.number === item.assignment.number);
  }

  filterProgram(item: Program, room = "B") {
    return this.semanas.find((p) => p.id == item.id);
  }
    consultar() {
    this.filtrar.emit({ fechaDesde: this.fechaDesde, fechaHasta: this.fechaHasta });
  }
}
