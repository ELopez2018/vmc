import { Component, OnInit } from '@angular/core';
import { SemanasMock } from './mocks/semanas.mock';
import { MeetingsService } from '../../core/services/meetings/meetings.service';
import { Meeting, Program, WeeklyProgram } from 'src/app/core/interfaces/reuniones.interface';
import { Utils } from 'src/app/shared/Utils';
import { ModalService } from 'src/app/core/services/modal/modal.service';

@Component({
  selector: 'vmc-entre-semana',
  templateUrl: './entre-semana.component.html',
  styleUrls: ['./entre-semana.component.scss']
})
export class EntreSemanaComponent implements OnInit {
  public semanas: Program[] = [];
  porAsignar = "por asignar";
  constructor(
    private meetingsService: MeetingsService,
    private modalService: ModalService,
  ) { }
  ngOnInit(): void {
    this.meetingsService.getWeeksValids().subscribe(data => {
      this.semanas = data
    })
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
    console.log(item);
    console.log(type);
  }

  changeWeeklyProgram(item: WeeklyProgram, type: string) {
    console.log('switch');
    switch (type) {
      case "responsible":
        console.log('intro');
        this.modalService.assignPublisherWeeklyProgram(item)
        break;

      default:
        console.log(item);
        console.log(type);
        break;
    }

  }
}
