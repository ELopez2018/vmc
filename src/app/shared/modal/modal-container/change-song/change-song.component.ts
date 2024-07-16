import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Program } from 'src/app/core/interfaces/reuniones.interface';

@Component({
  selector: 'change-song',
  templateUrl: './change-song.component.html',
  styleUrls: ['./change-song.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule]
})
export class ChangeSongComponent implements OnInit {
  @Input() public program!: Program;
  @Output() onClicked: EventEmitter<any> = new EventEmitter()
  @Input() public song: any;
  constructor() {
  }

  ngOnInit() {
  }
  onSelect() {
    this.onClicked.emit(this.song)
  }
}
