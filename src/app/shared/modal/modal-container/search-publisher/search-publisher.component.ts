import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AssignmentService } from '../../../../core/services/assignment/assignment.service';
import { UsersService } from 'src/app/core/services/users/users.service';
import { Assignment, Meeting, Publisher, WeeklyProgram, Congregation } from 'src/app/core/interfaces/reuniones.interface';
import { PublisherDto } from 'src/app/core/interfaces/publishers.interface';
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
  selected(item: Publisher) {
    this.onClicked.emit(item)
  }

  getPublihersByAssignment() {
    this.usersService.getPublihersByAssignment(this.assignmentType, this.congregation.id)
      .subscribe(data => {
        this.usedPublishersListAll = data;
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
        }
      })
  }

  adapter(publisherDto: PublisherDto[]): Publisher[] {
    return publisherDto.map(data => {
      return { ...data.publisher, quantity: data.total }
    }
    )
  }

}
