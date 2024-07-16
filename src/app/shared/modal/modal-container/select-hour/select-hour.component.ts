import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'select-hour',
  templateUrl: './select-hour.component.html',
  styleUrls: ['./select-hour.component.scss'],
  standalone: true
})
export class SelectHourComponent implements OnInit {
  @Output() onSelected: EventEmitter<any> = new EventEmitter()
  constructor() { }

  ngOnInit() {
  }

  onSelect(hour: any) {
    this.onSelected.emit(hour)
  }
}
