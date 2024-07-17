import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AssignmentService } from '../../../../core/services/assignment/assignment.service';
import { UsersService } from 'src/app/core/services/users/users.service';
import { Assignment, Meeting, Publisher, WeeklyProgram } from 'src/app/core/interfaces/reuniones.interface';
import { PublisherDto } from 'src/app/core/interfaces/publishers.interface';
import { OtherAssignment } from 'src/app/core/enums/meetings.enums';
import { MeetingsService } from 'src/app/core/services/meetings/meetings.service';
import { DataService } from 'src/app/core/services/data/data.service';
import { LoaderService } from '../../../../core/services/loader/loader.service';

@Component({
  selector: 'search-publisher',
  templateUrl: './search-publisher.component.html',
  styleUrls: ['./search-publisher.component.scss']
})
export class SearchPublisherComponent implements OnInit {
  public publishers!: Publisher[];
  @Input() public assignment!: WeeklyProgram;
  public frequentPublishers!: PublisherDto[];
  @Output() onClicked: EventEmitter<Publisher> = new EventEmitter()
  showSpinner = true;
  constructor(
    private dataService: DataService,
    private loaderService: LoaderService
  ) {
    this.subscrp()

  }

  ngOnInit() {
  }

  subscrp() {
    this.dataService.getPubliherList$().subscribe(data => {
      if (data) {
        this.publishers = data
      }
    })
    this.loaderService.getLoaderSearchPublisher$().subscribe(data => {
      this.showSpinner = data
    })

  }
  selected(item: Publisher) {
    this.onClicked.emit(item)
  }

  adapter(publisherDto: PublisherDto[]): Publisher[] {
    return publisherDto.map(data => {
      return { ...data.publisher, quantity: data.total }
    }
    )
  }

}
