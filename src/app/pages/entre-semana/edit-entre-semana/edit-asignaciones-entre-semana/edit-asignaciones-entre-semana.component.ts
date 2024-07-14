import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Assignment, Meeting } from 'src/app/core/interfaces/reuniones.interface';
import { SemanasMock } from '../../mocks/semanas.mock';
import { UsersService } from '../../../../core/services/users/users.service';
import { AssignmentService } from 'src/app/core/services/assignment/assignment.service';
import { ModalService } from '../../../../core/services/modal/modal.service';
import { ActivatedRoute } from '@angular/router';
import { MeetingsService } from 'src/app/core/services/meetings/meetings.service';

@Component({
  selector: 'vmc-edit-asignaciones-entre-semana',
  templateUrl: './edit-asignaciones-entre-semana.component.html',
  styleUrls: ['./edit-asignaciones-entre-semana.component.scss']
})
export class EditAsignacionesEntreSemanaComponent implements OnInit {
  @Input() public week!: Meeting;
  @Input() public assignmentList: Assignment[] = [];
  @Output() onGetPublishers: EventEmitter<any> = new EventEmitter();
  public publishers: any[] = [];
  public oldMens: any[] = [];
  public ministerialSerf: any[] = [];
  private id!: number;
  constructor(
    private usersService: UsersService,
    private assignmentService: AssignmentService,
    private modalService: ModalService,
    private route: ActivatedRoute,
    private meetingsService: MeetingsService,
  ) { }
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

  update(assignment: Assignment) {
    // assignment.meeting = { id: this.week.id }
    // this.assignmentService.updateAssignment(assignment)
    //   .subscribe(data => {
    //     this.refreshMeeting()
    //   })
  }
  assigResponsible(assignment: Assignment) {
    // assignment.numberWeek =this.week.weekNumber
    // this.modalService.assignPublisher(assignment)
    //   .then(data => {
    //     assignment.responsible = data
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   })
  }
  assigAssistant(assignment: Assignment) {
    // assignment.numberWeek =this.week.weekNumber
    // this.modalService.assignPublisher(assignment)
    //   .then(data => {
    //     assignment.assistant = data
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   })
  }
  refreshMeeting() {
    this.id = <number | null>this.route.snapshot.queryParamMap.get('id') ?? 0;
    if (this.id) {
      this.meetingsService.getByNumberWeek(this.id).subscribe(data => {
        this.week = data;
      })
    }
  }
}
