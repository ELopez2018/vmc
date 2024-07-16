import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'users-create-or-update',
  templateUrl: './users-create-or-update.component.html',
  styleUrls: ['./users-create-or-update.component.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class UsersCreateOrUpdateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
