import { Component, inject, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../../core/services/auth/auth.service";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatInputModule } from "@angular/material/input";
import { LoaderService } from "src/app/core/services/loader/loader.service";
@Component({
  selector: "vmc-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  imports: [CommonModule, ReactiveFormsModule, MatProgressSpinnerModule, MatInputModule],
})
export class LoginComponent {
  public credential!: FormGroup;
  public showSpinner = false;
  public error = false;
  loaderService = inject(LoaderService);
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
  ) {
    this.credential = this.fb.group({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
    });
  }
  login() {
    this.error = false;
    this.loaderService.showMatspinner();
    this.authService.login(this.credential.getRawValue()).subscribe({
      next: (data) => {
         this.loaderService.hideMatspinner();
      },
      error: (error) => {
        this.loaderService.hideMatspinner();
        this.error = true;
      },
    });
  }
}
