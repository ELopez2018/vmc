import { CommonModule } from '@angular/common';
import { Component, Input, type OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Utils } from 'src/app/shared/Utils';

@Component({
    selector: 'vmc-meetings',
    imports: [CommonModule, ButtonModule],
    templateUrl: './meetings.component.html',
    styleUrls: ['./meetings.component.scss']
})
export class MeetingsComponent implements OnInit {
  @Input() programList: any[] = [];
  @Input() congregation: any;
  ngOnInit(): void { }
  parseDate(date: any) {
    return Utils.showDayOfMeeting(date, this.congregation.day)
  }
  selectedEdit(item: any) {
    console.log(item);
  }
}
