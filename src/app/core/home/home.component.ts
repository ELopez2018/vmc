import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../../pages/auth/login/login.component';
import { DataService } from '../services/data/data.service';

@Component({
    selector: 'vmc-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    imports: [LoginComponent]
})
export class HomeComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    if (this.dataService.hasValidToken()) {
      this.router.navigateByUrl('/tablero');
    }
  }
}
