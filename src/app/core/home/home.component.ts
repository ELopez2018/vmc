import { Component } from '@angular/core';
import { LoginComponent } from '../../pages/auth/login/login.component';

@Component({
    selector: 'vmc-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    imports: [LoginComponent]
})
export class HomeComponent {

}
