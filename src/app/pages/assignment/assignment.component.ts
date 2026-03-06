import { Component, Input } from '@angular/core';
import { Assignment } from 'src/app/core/interfaces/reuniones.interface';
import { AssignmentService } from 'src/app/core/services/assignment/assignment.service';
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { DatePipe } from '@angular/common';

@Component({
    selector: 'vmc-assignment',
    templateUrl: './assignment.component.html',
    styleUrls: ['./assignment.component.scss'],
    standalone: true,
    imports: [TableModule, ButtonModule, DatePipe]
})
export class AssignmentComponent {
  @Input() assignment: Assignment[]=[]
  constructor(private assignmentService: AssignmentService) {
    this.assignmentService.getAllAssignment().subscribe(data => {
      this.assignment = <Assignment[]>data.content
    });
  }
toDelete(item: any){}
selectedEdit(item: any){}
}
