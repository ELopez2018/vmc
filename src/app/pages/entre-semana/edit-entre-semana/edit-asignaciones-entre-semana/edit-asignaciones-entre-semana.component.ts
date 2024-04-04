import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Assignment, Week } from 'src/app/core/interfaces/reuniones.interface';
import { SemanasMock } from '../../mocks/semanas.mock';
import { UsersService } from '../../../../core/services/users/users.service';
import { AssignmentService } from 'src/app/core/services/assignment/assignment.service';
import { ModalService } from '../../../../core/services/modal/modal.service';

@Component({
  selector: 'vmc-edit-asignaciones-entre-semana',
  templateUrl: './edit-asignaciones-entre-semana.component.html',
  styleUrls: ['./edit-asignaciones-entre-semana.component.scss']
})
export class EditAsignacionesEntreSemanaComponent implements OnInit {
  @Input() public week!: Week;
  @Input() public assignmentList: Assignment[] = [];
  @Output() onGetPublishers: EventEmitter<any>= new EventEmitter();
  public publishers: any[] = [];
  public oldMens: any[] = [];
  public ministerialSerf: any[] = [];
  constructor(
    private usersService: UsersService,
    private assignmentService: AssignmentService,
    private modalService:ModalService
    ) {}
  ngOnInit(): void {
    this.usersService.getAllUsers().subscribe(data => {
      this.publishers = data
      this.onGetPublishers.emit(data)
    })
  }

  filterOldMen() {
    this.oldMens = this.publishers
  }
  filterMinisterialSerf() {
    this.ministerialSerf = this.publishers
  }
  changeSeccion(section: string): string {
    switch (section) {
      case "NUESTRA VIDA CRISTIANA":
        return "Vida"
        break;
      case "SEAMOS MEJORES MAESTROS":
        return "Maestros"
        break;
      case "TESOROS DE LA BIBLIA":
        return "Tesoros"
        break;
    }
    return "";
  }

  update(assignment: Assignment){
    console.log(assignment);
    assignment.meeting ={ id: this.week.id}
    this.assignmentService.updateAssignment(assignment)
    .subscribe(data=>{
      console.log(data);
    })
  }
  assigResponsible(assignment: Assignment){
    console.log("modal");
    this.modalService.assignPublisher().then(data=>{
      console.log(data);
      assignment.responsible = data
    })
  }
}
