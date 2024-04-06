import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AssignmentService } from '../../../core/services/assignment/assignment.service';
import { UsersService } from 'src/app/core/services/users/users.service';
import { Publisher } from 'src/app/core/interfaces/reuniones.interface';

@Component({
  selector: 'search-publisher',
  templateUrl: './search-publisher.component.html',
  styleUrls: ['./search-publisher.component.scss']
})
export class SearchPublisherComponent implements OnInit {
  public publishers!: Publisher[];
  @Output() onClicked: EventEmitter<Publisher> = new EventEmitter()
  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.getPublisher()
  }

  getPublisher() {
    this.usersService
    .getAllUsers()
    .subscribe(data => {
      this.publishers = data
    })
  }
  selected(item: Publisher){
    this.onClicked.emit(item)
  }
}
