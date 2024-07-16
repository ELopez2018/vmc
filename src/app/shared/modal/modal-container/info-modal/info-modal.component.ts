import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss']
})
export class InfoModalComponent implements OnInit {
  @Input() public type: any
  @Input() public message: any
  @Input() public title: any
  @Output() onClicked: EventEmitter<any> = new EventEmitter()
  constructor() { }

  ngOnInit() {
  }
  close() {
    this.onClicked.emit("close")
  }
}
