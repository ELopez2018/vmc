import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Program } from 'src/app/core/interfaces/reuniones.interface';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'vmc-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class AddAssignmentComponent implements OnInit {
  @Input() public week!: Program
  @Input() public sectionMeeting!: string
  ngOnInit(): void {
  }

}
