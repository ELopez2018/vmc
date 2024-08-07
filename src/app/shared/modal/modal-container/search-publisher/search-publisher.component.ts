import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AssignmentService } from '../../../../core/services/assignment/assignment.service';
import { UsersService } from 'src/app/core/services/users/users.service';
import { Assignment, Meeting, Publisher, WeeklyProgram, Congregation } from 'src/app/core/interfaces/reuniones.interface';
import { PublisherDto, ResponsibleCountDTO } from 'src/app/core/interfaces/publishers.interface';
import { OtherAssignment } from 'src/app/core/enums/meetings.enums';
import { MeetingsService } from 'src/app/core/services/meetings/meetings.service';
import { DataService } from 'src/app/core/services/data/data.service';
import { LoaderService } from '../../../../core/services/loader/loader.service';
import { AssignmentType } from 'src/app/core/enums/assignments.enums';
import { Subscription } from 'rxjs';

@Component({
  selector: 'search-publisher',
  templateUrl: './search-publisher.component.html',
  styleUrls: ['./search-publisher.component.scss']
})
export class SearchPublisherComponent implements OnInit, OnDestroy {
  public publishersAll!: Publisher[];
  @Input() public assignment!: WeeklyProgram;
  @Input() public assignmentType: string = "";
  public frequentPublishers!: PublisherDto[];
  @Output() onClicked: EventEmitter<Publisher> = new EventEmitter()
  showSpinner = true;
  public congregation!: Congregation;
  public usedPublishersList: any[] = [];
  public headerText = "Asignacion"
  public usedPublishersListAll: any[] = [];
  public usedPublishersListAllByAssig: ResponsibleCountDTO[] = [];
  public assignmentTypeEnums = AssignmentType
  private subs = new Subscription()
  constructor(
    private dataService: DataService,
    private loaderService: LoaderService,
    private usersService: UsersService
  ) {
    this.subscrp()
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  ngOnInit() {
    console.log("assignmentType", this.assignmentType);
    this.getPublihersByAssignment()
  }

  subscrp() {
    this.subs.add(
      this.dataService.getCongregation$().subscribe(data => {
        this.congregation = data;
      })
    )
    this.subs.add(
      this.dataService.getPubliherList$().subscribe(data => {
        if (data) {
          this.publishersAll = data
        }
      })
    )
    this.subs.add(
      this.loaderService.getLoaderSearchPublisher$().subscribe(data => {
        this.showSpinner = data
      })
    )


  }
  selected(item: any) {
    this.onClicked.emit(item)
  }

  getPublihersByAssignment() {
    this.usersService.getPublihersByAssignment(this.assignmentType, this.congregation.id)
      .subscribe(data => {
        this.usedPublishersListAll = data;
        this.usedPublishersListAllByAssig = data;
        switch (this.assignmentType) {
          case AssignmentType.PRESIDENT:
            this.headerText = "Presidencia"
            this.usedPublishersList = this.usedPublishersListAll.filter(i => i.presidentCount > 0);
            break;
          case AssignmentType.OPENING_PRAYER:
            this.headerText = "Oración Inicial"
            this.usedPublishersList = this.usedPublishersListAll.filter(i => i.openingPrayerCount > 0);
            break;
          case AssignmentType.FINAL_PRAYER:
            this.headerText = "Oración Final"
            this.usedPublishersList = this.usedPublishersListAll.filter(i => i.finalPrayerCount > 0);
            break;
          case AssignmentType.ASSIGNMENT_1:
            this.headerText = "Discurso Tesoros de la Bíblia"
            this.usedPublishersListAllByAssig = data;
            break;
          case AssignmentType.ASSIGNMENT_2:
            this.headerText = "Perlas Escondidas"
            this.usedPublishersListAllByAssig = data;
            break;
          case AssignmentType.ASSIGNMENT_3:
            this.headerText = "Lectura de la Bíblia"
            this.usedPublishersListAllByAssig = data;
            break;
          case AssignmentType.STARTING_A_CONVERSATION:
            this.headerText = "Empiece Conversaciones (Estudiante)"
            this.usedPublishersListAllByAssig = data;
            break;
          case AssignmentType.EXPLAINING_YOUR_BELIEFS:
            this.headerText = "Explique sus creencias"
            this.usedPublishersListAllByAssig = data;
            break;
          case AssignmentType.FOLLOWING_UP:
            this.headerText = "Haga revisitas (Estudiante)"
            this.usedPublishersListAllByAssig = data;
            break;
          case AssignmentType.IMITATE:
            this.headerText = "Imite a..."
            this.usedPublishersListAllByAssig = data;
            break;
          case AssignmentType.WHAT_HE_DID:
            this.headerText = "Lo que hizo..."
            this.usedPublishersListAllByAssig = data;
            break;
          case AssignmentType.MAKING_DISCIPLES:
            this.headerText = "Haga discípulos (Estudiante)"
            this.usedPublishersListAllByAssig = data;
            break;
          case AssignmentType.LOCAL_NEEDS:
            this.headerText = "Necesidades de la congregación"
            this.usedPublishersListAllByAssig = data;
            break;
          case AssignmentType.CONGREGATION_BIBLE_STUDY:
            this.headerText = "Estudio bíblico de la congregación (Conductor)"
            this.usedPublishersListAllByAssig = data;
            break;
          case AssignmentType.STARTING_A_CONVERSATION_ASSISTANT:
            this.headerText = "Empiece Conversaciones (Ayudante)"
            this.usedPublishersListAllByAssig = data;
            break;
          case AssignmentType.EXPLAINING_YOUR_BELIEFS_ASSISTANT:
            this.headerText = "Explique sus creencias (Ayudante)"
            this.usedPublishersListAllByAssig = data;
            break;
          case AssignmentType.FOLLOWING_UP_ASSISTANT:
            this.headerText = "Haga revisitas (Ayudante)"
            this.usedPublishersListAllByAssig = data;
            break;
          case AssignmentType.MAKING_DISCIPLES_ASSISTANT:
            this.headerText = "Haga discípulos (Ayudante)"
            this.usedPublishersListAllByAssig = data;
            break;
          case AssignmentType.CONGREGATION_BIBLE_STUDY_READER:
            this.headerText = "Estudio bíblico de la congregación (Lector)"
            this.usedPublishersListAllByAssig = data;
            break;
        }
      })
  }

  get isAssigment() {
    return this.assignmentType !== AssignmentType.PRESIDENT && this.assignmentType !== AssignmentType.OPENING_PRAYER && this.assignmentType !== AssignmentType.FINAL_PRAYER
  }

  adapter(publisherDto: PublisherDto[]): Publisher[] {
    return publisherDto.map(data => {
      return { ...data.publisher, quantity: data.total }
    }
    )
  }

}
