import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class SidenavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
