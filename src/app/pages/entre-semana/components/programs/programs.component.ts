import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssignmentType } from 'src/app/core/enums/assignments.enums';
import { Congregation, Meeting, Program, Publisher, WeeklyProgram } from 'src/app/core/interfaces/reuniones.interface';
import { AssignmentService } from 'src/app/core/services/assignment/assignment.service';
import { DataService } from 'src/app/core/services/data/data.service';
import { MeetingsService } from 'src/app/core/services/meetings/meetings.service';
import { ModalService } from 'src/app/core/services/modal/modal.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { Utils } from 'src/app/shared/Utils';
import { CongregationMock } from '../../mocks/congregation.mock';
import { ModalTitleEnums } from 'src/app/core/enums/modal.enums';
import { ModalTypeEnums } from '../../../../core/enums/modal.enums';

@Component({
  selector: 'vmc-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ProgramsComponent implements OnInit {
  @Input() public semanas: Program[] = [];
  @Input() public RoomA = false;
  @Input() public room = "A";
  porAsignar = "por asignar";
  public congregation: Congregation = CongregationMock
  public assignmentType: string = ""
  public Superintendente!: Publisher
  public showSpinner = false;
  private meetingDay = 1;
  constructor(
    private meetingsService: MeetingsService,
    private modalService: ModalService,
    private dataService: DataService,
    private assignmentService: AssignmentService
  ) { }
  ngOnInit(): void {
    this.dataService.getPublisher().subscribe(data => {
      this.Superintendente = data
    })

    this.dataService.getCongregation$().subscribe(data => {
      this.congregation = data
      this.meetingDay = data.day
    })
  }

  showDayOfMeeting(fechaSemana: string) {
    return Utils.showDayOfMeeting(fechaSemana, this.meetingDay)
  }

  adapterTime(dateTime: any) {
    return Utils.adapterTime(dateTime)
  }

  filter(weeks: Meeting[]) {
    return weeks.filter(week => Utils.showFirstDateOfWeek(week.week))
  }
  getDataFromJW() {
    this.meetingsService.getUpdateWeeksFromJW().subscribe(data => {
    })
  }

  changeProgram(item: Program, type: string) {
    switch (type) {
      case "startTimeOpeningSong":
        this.modalService.selectedHour()
          .then(data => {
            if(!data || data == 'close'){return}
            item.startTimeOpeningSong = data
            this.meetingsService.saveOrUpdateProgram(item).subscribe(data => {
            })
          })
          .catch(data => {
            console.info(data);
          })
        break;
      case "startTimeIntro":
        this.modalService.selectedHour()
          .then(data => {
            if(!data || data == 'close'){return}
            item.startTimeIntro = data;
            this.meetingsService.saveOrUpdateProgram(item).subscribe(data => {
              console.log(data);
            })
          })
          .catch(data => {
            console.log(data);
          })
        break;
      case "startTimeIntermediateSong":
        this.modalService.selectedHour()
          .then(data => {
            if(!data || data == 'close'){return}
            item.startTimeIntermediateSong = data;
            this.meetingsService.saveOrUpdateProgram(item).subscribe(data => {
              console.log(data);
            })
          })
          .catch(data => {
            console.log(data);
          })
        break;
      case "startTimeConclusionWords":
        this.modalService.selectedHour()
          .then(data => {
            if(!data || data == 'close'){return}
            item.startTimeConclusionWords = data;
            this.meetingsService.saveOrUpdateProgram(item).subscribe(data => {
              console.log(data);
            })
          })
          .catch(data => {
            console.log(data);
          })
        break;
      case "startTimeFinalSong":
        this.modalService.selectedHour()
          .then(data => {
            if(!data || data == 'close'){return}
            item.startTimeFinalSong = data;
            this.meetingsService.saveOrUpdateProgram(item).subscribe(data => {
            })
          })
          .catch(data => {
            console.log(data);
          })
        break;
      case AssignmentType.OPENING_PRAYER:
        this.modalService.assignPublisherProgram(item, AssignmentType.OPENING_PRAYER)
          .then(data => {
            if(!data || data == 'close'){return}
            console.log('data', data);
            item.openingPrayer = data;
            this.meetingsService.saveOrUpdateProgram(item).subscribe(data => {
            })
          })
          .catch(data => {
            console.log(data);
          })
        break;
      case AssignmentType.FINAL_PRAYER:
        this.modalService.assignPublisherProgram(item, AssignmentType.FINAL_PRAYER)
          .then(data => {
            if(!data || data == 'close'){return}
            item.finalPrayer = data;
            this.meetingsService.saveOrUpdateProgram(item).subscribe(data => {
            })
          })
          .catch(data => {
            console.log(data);
          })
        break;
      case AssignmentType.PRESIDENT:
        this.modalService.assignPublisherProgram(item, AssignmentType.PRESIDENT)
          .then(data => {
            if(!data || data == 'close'){return}
            item.president = data;
            this.meetingsService.saveOrUpdateProgram(item).subscribe(data => {
              console.log(data);
            })
          })
          .catch(data => {
            console.log(data);
          })
        break;
      case "assistantAdviser":
        this.modalService.assignPublisherProgram(item)
          .then(data => {
            if(!data || data == 'close'){return}
            item.assistantAdviser = data;
            this.meetingsService.saveOrUpdateProgram(item).subscribe(data => {
              console.log(data);
            })
          })
          .catch(data => {
            console.log(data);
          })
        break;
      case "openingSong":
        this.modalService.changeSong(item, item.meeting.openingSong)
          .then(data => {
            if(!data || data == 'close'){return}
            item.meeting.openingSong = data;
            this.meetingsService.updateMeeting(item.meeting).subscribe(data => {
              console.log(data);
            })
          })
          .catch(data => {
            console.log(data);
          })
        break;
      case "intermediateSong":
        this.modalService.changeSong(item, item.meeting.intermediateSong)
          .then(data => {
            if(!data || data == 'close'){return}
            item.meeting.intermediateSong = data;
            this.meetingsService.updateMeeting(item.meeting).subscribe(data => {
              console.log(data);
            })
          })
          .catch(data => {
            console.log(data);
          })
        break;
      case "finalSong":
        this.modalService.changeSong(item, item.meeting.finalSong)
          .then(data => {
            if(!data || data == 'close'){return}
            item.meeting.finalSong = data;
            this.meetingsService.updateMeeting(item.meeting).subscribe(data => {
              console.log(data);
            })
          })
          .catch(data => {
            console.log(data);
          })
        break;
      default:
        break;
    }
  }

  selectAssignmentType(item: WeeklyProgram, type: string) {
    switch (item.assignment.number) {
      case 1:
        this.assignmentType = AssignmentType.ASSIGNMENT_1
        break;
      case 2:
        this.assignmentType = AssignmentType.ASSIGNMENT_2
        break;
      case 3:
        this.assignmentType = AssignmentType.ASSIGNMENT_3
        break;
      default:
        this.assignmentType = this.selectAssignmentTypeByTitle(item.assignment.title)
        if (type == "assistant" && this.assignmentType == AssignmentType.CONGREGATION_BIBLE_STUDY) {
          this.assignmentType = AssignmentType.CONGREGATION_BIBLE_STUDY_READER
        } else if (type == "assistant" && this.assignmentType != AssignmentType.CONGREGATION_BIBLE_STUDY) {
          this.assignmentType += "Assistant"
          console.log(this.assignmentType);
        }
    }
  }
  selectAssignmentTypeByTitle(title: string) {
    console.log({title});
    if (title.includes("Lo que hizo")) {
      return AssignmentType.WHAT_HE_DID
    }
    if (title.includes("Imite a")) {
      return AssignmentType.IMITATE
    }
    if (title.includes("Empiece conversaciones")) {
      return AssignmentType.STARTING_A_CONVERSATION
    }
    if (title.includes("Haga revisitas")) {
      return AssignmentType.FOLLOWING_UP
    }
    if (title.includes("Explique sus creencias")) {
      return AssignmentType.EXPLAINING_YOUR_BELIEFS
    }
    if (title.includes("Haga discípulos")) {
      return AssignmentType.MAKING_DISCIPLES
    }
    if (title.includes("Estudio bíblico de la congregación")) {
      return AssignmentType.CONGREGATION_BIBLE_STUDY
    }
    if (title.includes("Necesidades de la congregación")) {
      return AssignmentType.LOCAL_NEEDS
    }
    if (title.includes("Discurso")) {
      return AssignmentType.SPEECH
    }
    return "";
  }
  changeWeeklyProgram(item: WeeklyProgram, type: string) {
    if (
      item.assignment.sectionMeeting.includes("NUESTRA VIDA CRISTIANA")
      && !item.assignment.title.includes("Estudio bíblico de la congregación")
      && !item.assignment.title.includes("Necesidades de la congregación"))
      {
      this.assignmentType = AssignmentType.OTHER_PART_LIVING_AS_CHRISTIANS
    } else {
      this.selectAssignmentType(item, type)
    }

    switch (type) {
      case "responsible":
        this.modalService.assignPublisherWeeklyProgram(item, this.assignmentType)
          .then(data => {
            if(!data || data == 'close'){return}
            item.responsible = data
            this.meetingsService.saveOrUpdateWeeklyProgram(item).subscribe(data => {
              console.info("saved responsible", data);
            })
          })
          .catch(data => {
            console.error(data);
          })
        break;
      case "assistant":
        this.modalService.assignPublisherWeeklyProgram(item, this.assignmentType)
          .then((data: any) => {
            if(!data || data == 'close'){return}
            item.assistant = <Publisher>data
            if(item.assistant.designations?.find(i=>i.description)) {}

            this.meetingsService.saveOrUpdateWeeklyProgram(item).subscribe(data => {
              console.info("saved assistant", data);
            })

            if (this.assignmentType === AssignmentType.CONGREGATION_BIBLE_STUDY_READER) {
              this.modalService.info("Recordatorio","Los hermanos deben ser lectores aprobados por el cuerpo de  Ancianos (sfl 1:2.8). Si ya fué aprobado vaya al modulo PRIVILEGIOS.", ModalTitleEnums.INFORMACION, ModalTypeEnums.INFO)
            }
          })
          .catch(data => {
            console.info(data);
          })
        break;
      case "startTime":
        this.modalService.selectedHour()
          .then(data => {
            if(!data || data == 'close'){return}
            console.log("startTime 1", data);
            item.startTime = data
            this.meetingsService.saveOrUpdateWeeklyProgram(item).subscribe(data => {
              console.log("saved startTime", data);
            })
          })
          .catch(data => {
            console.log(data);
          })
        break;
      case "title":
        console.log("tiempo de assig", item);
        this.modalService.setTitleAndTime(item)
          .then(data => {
            if(!data || data == 'close'){return}
            item = data
            this.assignmentService.updateAssignment(item.assignment).subscribe(data => {
              console.log("saved setTitleAndTime", data);
            })
          })
          .catch(data => {
            console.log(data);
          })
        break;
      default:
        break;
    }
  }
  addAssign(item: Program, sectionMeeting: string) {
    console.log(item, sectionMeeting);
    this.modalService.AddAssignment(item, sectionMeeting)
  }

  print(week: Program) {
    console.log(week);
    this.dataService.setMeeting([week])
    this.modalService.printer()
  }
}
//
