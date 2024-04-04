import { Component, OnInit } from '@angular/core';
import { SemanasMock } from './mocks/semanas.mock';
import { MeetingsService } from '../../core/services/meetings/meetings.service';
import { Week } from 'src/app/core/interfaces/reuniones.interface';

@Component({
  selector: 'vmc-entre-semana',
  templateUrl: './entre-semana.component.html',
  styleUrls: ['./entre-semana.component.scss']
})
export class EntreSemanaComponent implements OnInit {
  public semanas: Week[] = SemanasMock;
  constructor( private meetingsService: MeetingsService) { }
  ngOnInit(): void {
    this.meetingsService.getAllWeek().subscribe(data=>{
      this.semanas = data
    })
  }

}
