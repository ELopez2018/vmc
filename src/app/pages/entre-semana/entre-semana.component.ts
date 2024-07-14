import { Component, OnInit } from '@angular/core';
import { SemanasMock } from './mocks/semanas.mock';
import { MeetingsService } from '../../core/services/meetings/meetings.service';
import { Meeting, Program } from 'src/app/core/interfaces/reuniones.interface';
import { Utils } from 'src/app/shared/Utils';

@Component({
  selector: 'vmc-entre-semana',
  templateUrl: './entre-semana.component.html',
  styleUrls: ['./entre-semana.component.scss']
})
export class EntreSemanaComponent implements OnInit {
  public semanas: Program[] = [];
  porAsignar="Por asignar";
  constructor(private meetingsService: MeetingsService) { }
  ngOnInit(): void {
    this.meetingsService.getWeeksValids().subscribe(data => {
      console.log(data);
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
}
