import { Component, OnInit } from '@angular/core';
import { SemanasMock } from './mocks/semanas.mock';
import { MeetingsService } from '../../core/services/meetings/meetings.service';

@Component({
  selector: 'vmc-entre-semana',
  templateUrl: './entre-semana.component.html',
  styleUrls: ['./entre-semana.component.scss']
})
export class EntreSemanaComponent implements OnInit {
  public semanas = SemanasMock;
  constructor( private meetingsService: MeetingsService) { }
  ngOnInit(): void {

  }

}
