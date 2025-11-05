import { Component } from '@angular/core';
import { AssignmentService } from 'src/app/core/services/assignment/assignment.service';

@Component({
  selector: 'vmc-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss']
})
export class AssignmentComponent {
  constructor(private assignmentService: AssignmentService) {
    this.assignmentService.getAllAssignment().subscribe(data => {
      console.log(data);
    });
  }
toDelete(){}
}
