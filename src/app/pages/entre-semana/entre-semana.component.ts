import { Component, OnInit } from '@angular/core';
import { SemanasMock } from './mocks/semanas.mock';
import { MeetingsService } from '../../core/services/meetings/meetings.service';
import { Meeting, Program, Publisher, WeeklyProgram } from 'src/app/core/interfaces/reuniones.interface';
import { Utils } from 'src/app/shared/Utils';
import { ModalService } from 'src/app/core/services/modal/modal.service';
import { DataService } from '../../core/services/data/data.service';
import { Congregation } from '../../core/interfaces/reuniones.interface';
import { CongregationMock } from './mocks/congregation.mock';
import { AssignmentService } from 'src/app/core/services/assignment/assignment.service';
import { AssignmentType } from 'src/app/core/enums/assignments.enums';
import { SectionMeeting } from '../../core/enums/meetings.enums';

@Component({
    selector: 'vmc-entre-semana',
    templateUrl: './entre-semana.component.html',
    styleUrls: ['./entre-semana.component.scss'],
    standalone: false
})
export class EntreSemanaComponent implements OnInit {
  private programList: Program[] = [];
  public semanas: Program[] = [];
  public semanasSalaAuxiliar: Program[] = [];
  public porAsignar = "por asignar";
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
  ) {
    this.dataService.getPublisher().subscribe(data => {
      this.Superintendente = data
    })

    this.dataService.getCongregation$().subscribe(data => {
      this.congregation = data
      this.meetingDay = data.day
    })
  }
  ngOnInit(): void {
    this.getPrograms();
  }

  getPrograms() {
    this.semanas = [];
    this.showSpinner = true;
    this.meetingsService.getWeeksValids(this.congregation.id).subscribe(data => {
      this.programList = [...data]
      this.semanas = this.filterWeekByRoom("A", this.programList);
      this.semanasSalaAuxiliar = [...this.filterWeekByRoom("B", this.programList)]
      this.dataService.setMeeting([...data])
      this.showSpinner = false;
      if (localStorage.getItem("week")) {
        this.filterByWeekNumber(parseInt(localStorage.getItem("week") ?? ""))
      }
    }, error => {
      console.error(error);
      this.showSpinner = false;
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
            item.startTimeOpeningSong = data
            this.meetingsService.saveOrUpdateProgram(item).subscribe(data => {
              console.log(data);
            })
          })
          .catch(data => {
            console.log(data);
          })
        break;
      case "startTimeIntro":
        this.modalService.selectedHour()
          .then(data => {
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
        }
    }

  }
  selectAssignmentTypeByTitle(title: string) {
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
    return "";
  }
  changeWeeklyProgram(item: WeeklyProgram, type: string) {
    if (
      item.assignment.sectionMeeting.includes("NUESTRA VIDA CRISTIANA")
      && !item.assignment.title.includes("Estudio bíblico de la congregación")
      && !item.assignment.title.includes("Necesidades de la congregación")) {
      this.assignmentType = AssignmentType.OTHER_PART_LIVING_AS_CHRISTIANS
    } else {
      this.selectAssignmentType(item, type)
    }

    switch (type) {
      case "responsible":
        this.modalService.assignPublisherWeeklyProgram(item, this.assignmentType)
          .then(data => {
            item.responsible = data
            this.meetingsService.saveOrUpdateWeeklyProgram(item).subscribe(data => {
              console.log("saved responsible", data);
            })
          })
          .catch(data => {
            console.log(data);
          })
        break;
      case "assistant":
        this.modalService.assignPublisherWeeklyProgram(item, this.assignmentType)
          .then(data => {
            item.assistant = data
            this.meetingsService.saveOrUpdateWeeklyProgram(item).subscribe(data => {
              console.log("saved assistant", data);
            })
          })
          .catch(data => {
            console.log(data);
          })
        break;
      case "startTime":
        this.modalService.selectedHour()
          .then(data => {
            console.log("startTime", data);
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
        this.modalService.setTitleAndTime(item)
          .then(data => {
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

  filterWeekByRoom(room: string, weeks: Program[]) {
    return weeks.filter(i => {
      return i.weeklyProgram.filter(b => b.room == room)?.length > 0
    }
    )
  }
  select() {
    this.semanasSalaAuxiliar = this.semanasSalaAuxiliar.map(i => {
      i.weeklyProgram = i.weeklyProgram.filter(a => a.room == "B")
      return i
    })
  }

  goToPrint() {
    this.dataService.setMeeting([...this.programList])
  }
  filterByWeekNumber(event: number) {
    let weeks: Program[] = [...this.programList]
    if (event == 0) {
      weeks = [...this.programList]
    } else {
      weeks = weeks.filter(week => week.meeting.weekNumber === event)
    }
    this.semanas = this.filterWeekByRoom("A", weeks);
    this.semanasSalaAuxiliar = [...this.filterWeekByRoom("B", weeks)]
    this.dataService.setMeeting([...weeks])
  }
}
//
