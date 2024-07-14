import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AssignmentService } from '../../../core/services/assignment/assignment.service';
import { UsersService } from 'src/app/core/services/users/users.service';
import { Assignment, Meeting, Publisher } from 'src/app/core/interfaces/reuniones.interface';
import { PublisherDto } from 'src/app/core/interfaces/publishers.interface';
import { OtherAssignment } from 'src/app/core/enums/meetings.enums';
import { MeetingsService } from 'src/app/core/services/meetings/meetings.service';

@Component({
  selector: 'search-publisher',
  templateUrl: './search-publisher.component.html',
  styleUrls: ['./search-publisher.component.scss']
})
export class SearchPublisherComponent implements OnInit {
  public publishers!: Publisher[];
  @Input() public assignment!: Meeting;
  public frequentPublishers!: PublisherDto[];
  @Output() onClicked: EventEmitter<Publisher> = new EventEmitter()
  constructor(
    private usersService: UsersService,
    private assignmentService: AssignmentService,
    private meetingsService: MeetingsService
  ) { }

  ngOnInit() {
    this.getPublisher()
    this.getFrequentPublishers()
  }

  getPublisher() {
    this.usersService
      .getAllUsers()
      .subscribe(data => {
        this.publishers = data
      })
  }
  selected(item: Publisher) {
    this.onClicked.emit(item)
  }

  getFrequentPublishers() {
    console.log("this.assignment.assignmentType=>" + this.assignment.assignmentType);
    switch (this.assignment.assignmentType) {
      case OtherAssignment.PRESIDENT:
        this.meetingsService.getOtherAssigmenList(OtherAssignment.PRESIDENT, this.assignment.weekNumber)
          .subscribe(data => {
            this.frequentPublishers = data
          })
        break
      case OtherAssignment.OPENING_PRAYER:
        this.meetingsService.getOtherAssigmenList(OtherAssignment.OPENING_PRAYER, this.assignment.weekNumber)
          .subscribe(data => {
            this.frequentPublishers = data
          })
        break
      case OtherAssignment.FINAL_PRAYER:
        this.meetingsService.getOtherAssigmenList(OtherAssignment.FINAL_PRAYER, this.assignment.weekNumber)
          .subscribe(data => {
            this.frequentPublishers = data
          })
        break
      default:
        this.assignmentService.getPublishersByAssignment(this.assignment)
          .subscribe(data => {
            this.frequentPublishers = data
          })
    }
  }
  adapter(publisherDto: PublisherDto[]): Publisher[] {
    return publisherDto.map(data => {
      return { ...data.publisher, quantity: data.total }
    }
    )
  }

}
