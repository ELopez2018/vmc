import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Assignment, Week } from 'src/app/core/interfaces/reuniones.interface';
import { MeetingsService } from 'src/app/core/services/meetings/meetings.service';

@Component({
  selector: 'vmc-edit-entre-semana',
  templateUrl: './edit-entre-semana.component.html',
  styleUrls: ['./edit-entre-semana.component.scss']
})
export class EditEntreSemanaComponent implements OnInit {
  public semana!: Week;
  private id!: number;
  public publishers: any[]=[];
  @Output() onFind: EventEmitter<Week> = new EventEmitter()
  constructor(private meetingsService: MeetingsService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.id = <number | null>this.route.snapshot.queryParamMap.get('id') ?? 0;
    if (this.id) {
      this.meetingsService.getByNumberWeek(this.id).subscribe(data => {
        this.semana = data;
        console.log(data);
        this.onFind.emit(this.semana)
      })
    }
  }

  setPublishers(publishers: any[]){
    this.publishers= publishers
  }

}
