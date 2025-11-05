import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
@Component({
    selector: 'vmc-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [CommonModule, ReactiveFormsModule, MatProgressSpinnerModule, MatInputModule]
})
export class LoginComponent {
  public credential!: FormGroup
  public showSpinner=false;
  public error=false;
  constructor(private router: Router, private authService: AuthService, private fb: FormBuilder) {
    this.credential = this.fb.group({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    })
  }
  login() {
    this.showSpinner=true
    this.authService.login(this.credential.getRawValue()).subscribe(data => {
    this.showSpinner=false
    this.error=false;
      this.router.navigateByUrl("/tablero")
    },error=>{
      this.error=true;
      this.showSpinner=false
    })

  }
}
