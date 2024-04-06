import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Assignment, Meeting } from 'src/app/core/interfaces/reuniones.interface';
import { MeetingsService } from 'src/app/core/services/meetings/meetings.service';
import { ModalService } from '../../../core/services/modal/modal.service';
import { DataService } from '../../../core/services/data/data.service';

@Component({
  selector: 'vmc-edit-entre-semana',
  templateUrl: './edit-entre-semana.component.html',
  styleUrls: ['./edit-entre-semana.component.scss']
})
export class EditEntreSemanaComponent implements OnInit {
  public semana!: Meeting;
  private id!: number;
  public publishers: any[] = [];
  @Output() onFind: EventEmitter<Meeting> = new EventEmitter()
  constructor(
    private meetingsService: MeetingsService,
    private route: ActivatedRoute,
    private modalService: ModalService,
    private dataService: DataService
  ) { }
  ngOnInit(): void {
    this.getMeeting()
  }

  getMeeting() {
    this.id = <number | null>this.route.snapshot.queryParamMap.get('id') ?? 0;
    if (this.id) {
      this.meetingsService.getByNumberWeek(this.id).subscribe(data => {
        this.semana = data;
        console.log(data);
        this.onFind.emit(this.semana)
      })
    }
  }

  setPublishers(publishers: any[]) {
    this.publishers = publishers
  }
  print() {
    this.dataService.setMeeting([this.semana])
    this.modalService.printer()
  }

  refresData() {
    this.getMeeting()
  }

}
