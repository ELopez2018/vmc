import { Component, OnInit } from '@angular/core';
import { SemanasMock } from './mocks/semanas.mock';
import { MeetingsService } from '../../core/services/meetings/meetings.service';
import { Meeting, Program, WeeklyProgram } from 'src/app/core/interfaces/reuniones.interface';
import { Utils } from 'src/app/shared/Utils';
import { ModalService } from 'src/app/core/services/modal/modal.service';
import { DataService } from '../../core/services/data/data.service';
import { Congregation } from '../../core/interfaces/reuniones.interface';
import { CongregationMock } from './mocks/congregation.mock';
import { AssignmentService } from 'src/app/core/services/assignment/assignment.service';

@Component({
  selector: 'vmc-entre-semana',
  templateUrl: './entre-semana.component.html',
  styleUrls: ['./entre-semana.component.scss']
})
export class EntreSemanaComponent implements OnInit {
  public semanas: Program[] = [];
  porAsignar = "por asignar";
  public congregation: Congregation = CongregationMock
  constructor(
    private meetingsService: MeetingsService,
    private modalService: ModalService,
    private dataService: DataService,
    private assignmentService: AssignmentService
  ) { }
  ngOnInit(): void {
    this.meetingsService.getWeeksValids().subscribe(data => {
      this.semanas = data
    })
    this.dataService.setCongregation(this.congregation)
  }

  showDayOfMeeting(fechaSemana: string) {
    return Utils.showDayOfMeeting(fechaSemana)
  }

  adapterTime(dateTime: any) {
    return Utils.adapterTime(dateTime)
  }

  filter(weeks: Meeting[]) {
    return weeks.filter(week => Utils.showFirstDateOfWeek(week.week))
  }
  getDataFromJW() {
    this.meetingsService.getUpdateWeeksFromJW().subscribe(data => {
      console.log(data);
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
        break;
      case "startTimeIntro":
        this.modalService.selectedHour()
          .then(data => {
            item.startTimeIntro = data;
            this.meetingsService.saveOrUpdateProgram(item).subscribe(data => {
              console.log(data);
            })
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
        break;
      case "startTimeConclusionWords":
        this.modalService.selectedHour()
          .then(data => {
            item.startTimeConclusionWords = data;
            this.meetingsService.saveOrUpdateProgram(item).subscribe(data => {
              console.log(data);
            })
          })
        break;
      case "startTimeFinalSong":
        this.modalService.selectedHour()
          .then(data => {
            item.startTimeFinalSong = data;
            this.meetingsService.saveOrUpdateProgram(item).subscribe(data => {
              console.log(data);
            })
          })
        break;
      case "openingPrayer":
        this.modalService.assignPublisherProgram(item)
          .then(data => {
            item.openingPrayer = data;
            this.meetingsService.saveOrUpdateProgram(item).subscribe(data => {
              console.log(data);
            })
          })
        break;
      case "president":
        this.modalService.assignPublisherProgram(item)
          .then(data => {
            item.president = data;
            this.meetingsService.saveOrUpdateProgram(item).subscribe(data => {
              console.log(data);
            })
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
        break;
      case "openingSong":
        this.modalService.changeSong(item)
          .then(data => {
            item.meeting.openingSong = data;
            this.meetingsService.updateMeeting(item.meeting).subscribe(data => {
              console.log(data);
            })
          })
        break;
      case "intermediateSong":
        this.modalService.changeSong(item)
          .then(data => {
            item.meeting.intermediateSong = data;
            this.meetingsService.updateMeeting(item.meeting).subscribe(data => {
              console.log(data);
            })
          })
        break;
      case "finalSong":
        this.modalService.changeSong(item)
          .then(data => {
            item.meeting.finalSong = data;
            this.meetingsService.updateMeeting(item.meeting).subscribe(data => {
              console.log(data);
            })
          })
        break;
      default:
        break;
    }
  }


  changeWeeklyProgram(item: WeeklyProgram, type: string) {
    switch (type) {
      case "responsible":
        this.modalService.assignPublisherWeeklyProgram(item)
          .then(data => {
            item.responsible = data
            this.meetingsService.saveOrUpdateWeeklyProgram(item).subscribe(data => {
              console.log("saved responsible", data);
            })
          })
        break;
      case "assistant":
        this.modalService.assignPublisherWeeklyProgram(item)
          .then(data => {
            item.assistant = data
            this.meetingsService.saveOrUpdateWeeklyProgram(item).subscribe(data => {
              console.log("saved assistant", data);
            })
          })
        break;
      case "startTime":
        this.modalService.selectedHour()
          .then(data => {
            item.assignment.startTime = data
            this.assignmentService.updateAssignment(item.assignment).subscribe(data => {
              console.log("saved startTime", data);
            })
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
        break;
      default:
        break;
    }

  }
}
//
