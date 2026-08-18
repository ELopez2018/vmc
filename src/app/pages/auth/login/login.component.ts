import { HttpErrorResponse } from "@angular/common/http";
import { Component, inject } from "@angular/core";
import { AuthService } from "../../../core/services/auth/auth.service";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatInputModule } from "@angular/material/input";
import { LoaderService } from "src/app/core/services/loader/loader.service";
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: "vmc-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  imports: [CommonModule, ReactiveFormsModule, MatProgressSpinnerModule, MatInputModule],
})
export class LoginComponent {
  public credential!: FormGroup;
  public showSpinner = false;
  public errorMessage = "";
  loaderService = inject(LoaderService);
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.credential = this.fb.group({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
    });

    this.credential.valueChanges.subscribe(() => {
      this.errorMessage = "";
    });
  }
  login() {
    this.errorMessage = "";

    if (this.credential.invalid) {
      this.credential.markAllAsTouched();
      this.errorMessage = "Completa el usuario y la contraseña para ingresar.";
      return;
    }

    this.loaderService.showMatspinner();
    this.authService.login(this.credential.getRawValue()).subscribe({
      next: (data) => {
        this.loaderService.hideMatspinner();
        const returnUrl = this.getSafeReturnUrl();
        this.router.navigateByUrl(returnUrl ?? "/tablero");
      },
      error: (error) => {
        this.loaderService.hideMatspinner();
        this.errorMessage = this.resolveLoginErrorMessage(error);
      },
    });
  }

  private resolveLoginErrorMessage(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 401 || error.status === 403) {
        return "El usuario y/o la contraseña no son válidos.";
      }

      if (error.status === 0) {
        return "No pudimos conectar con el servidor. Revisa tu conexión e intenta nuevamente.";
      }

      if (error.status >= 500) {
        return "El servidor no pudo procesar el ingreso en este momento. Intenta nuevamente en unos minutos.";
      }
    }

    return "No pudimos completar el ingreso. Intenta nuevamente o contacta al administrador.";
  }

  private getSafeReturnUrl(): string | null {
    const returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");

    if (!returnUrl || !returnUrl.startsWith("/tablero")) {
      return null;
    }

    return returnUrl;
  }
}
