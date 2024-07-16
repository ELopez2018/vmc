import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule]
})
export class ErrorModalComponent implements OnInit {
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
