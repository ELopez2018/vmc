import { Component, OnInit } from '@angular/core';
import { Assignment, Semana } from 'src/app/core/interfaces/reuniones.interface';
import { MeetingsService } from 'src/app/core/services/meetings/meetings.service';

@Component({
  selector: 'vmc-edit-entre-semana',
  templateUrl: './edit-entre-semana.component.html',
  styleUrls: ['./edit-entre-semana.component.scss']
})
export class EditEntreSemanaComponent implements OnInit {
  public semanas: Semana[]=[];
  public assignmentList: Assignment[]=[];
  constructor( private meetingsService: MeetingsService) { }
  ngOnInit(): void {
    this.meetingsService.getByNumberWeek(16).subscribe(data=>{
      this.semanas = [data];
      this.assignmentList = data.assignments;
    })
  }

}
