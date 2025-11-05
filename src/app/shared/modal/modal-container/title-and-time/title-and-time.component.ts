import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { WeeklyProgram, Publisher } from 'src/app/core/interfaces/reuniones.interface';

@Component({
    selector: 'title-and-time',
    templateUrl: './title-and-time.component.html',
    styleUrls: ['./title-and-time.component.scss'],
    imports: [ReactiveFormsModule, CommonModule, FormsModule]
})
export class TitleAndTimeComponent implements OnInit {
  @Input() public assignment!: WeeklyProgram;
  @Output() onClicked: EventEmitter<any> = new EventEmitter()
  title = ""
  time = 0
  constructor() { }

  ngOnInit() {
    this.title = this.assignment.assignment.title
    this.time = this.assignment.assignment.time ?? 0
  }
  onClick() {
    this.assignment.assignment.title = this.title
    this.assignment.assignment.time = this.time
    this.onClicked.emit(this.assignment)
  }
}
