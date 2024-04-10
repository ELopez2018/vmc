import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AssignmentService } from '../../../core/services/assignment/assignment.service';
import { UsersService } from 'src/app/core/services/users/users.service';
import { Assignment, Publisher } from 'src/app/core/interfaces/reuniones.interface';
import { PublisherDto } from 'src/app/core/interfaces/publishers.interface';

@Component({
  selector: 'search-publisher',
  templateUrl: './search-publisher.component.html',
  styleUrls: ['./search-publisher.component.scss']
})
export class SearchPublisherComponent implements OnInit {
  public publishers!: Publisher[];
  @Input() public assignment!: Assignment;
  public frequentPublishers!: PublisherDto[];
  @Output() onClicked: EventEmitter<Publisher> = new EventEmitter()
  constructor(private usersService: UsersService, private assignmentService: AssignmentService) { }

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
    this.assignmentService.getPublishersByAssignment(this.assignment.number)
      .subscribe(data => {
        this.frequentPublishers = data
      })
  }
  adapter(publisherDto: PublisherDto[]): Publisher[] {
    return publisherDto.map(data => {
      return { ...data.publisher, quantity: data.total }
    }
    )
  }

}
