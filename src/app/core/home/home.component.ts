import { Component } from '@angular/core';
import { LoginComponent } from '../../pages/auth/login/login.component';

@Component({
  selector: 'vmc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [LoginComponent]
})
export class HomeComponent {

}
