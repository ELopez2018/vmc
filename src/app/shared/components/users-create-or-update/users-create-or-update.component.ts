import { CommonModule } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from "@angular/forms";
import { DateAdapter, MAT_DATE_LOCALE } from "@angular/material/core";
import { ActivatedRoute } from "@angular/router";
import { finalize, map, of, switchMap } from "rxjs";
import { ApiErrorResponse, AssignmentType, AssignmentTypePermission, Congregation, Publisher } from "src/app/core/interfaces/reuniones.interface";
import { AssignmentTypesService } from "src/app/core/services/assignment-types/assignment-types.service";
import { CongregationsService } from "src/app/core/services/congregations/congregations.service";
import { DataService } from "src/app/core/services/data/data.service";
import { NotificationService } from "src/app/core/services/nofitications/notification.service";
import { UserAssignmentTypesService } from "src/app/core/services/user-assignment-types/user-assignment-types.service";
import { UsersService } from "src/app/core/services/users/users.service";
import { SharedModule } from "../../shared.module";

@Component({
  selector: "users-create-or-update",
  templateUrl: "./users-create-or-update.component.html",
  styleUrls: ["./users-create-or-update.component.scss"],
  imports: [SharedModule, FormsModule, ReactiveFormsModule, CommonModule],
})
export class UsersCreateOrUpdateComponent implements OnInit {
  public congregationSelected!: Congregation;
  public formulario!: FormGroup;
  public allCongregations: Congregation[] = [];
  public assignmentTypes: AssignmentType[] = [];
  public isAdmin = false;
  public isSaving = false;
  public isLoadingAssignmentTypes = false;
  public assignmentTypesLoadFailed = false;

  private currentPublisher?: Publisher;
  private userId: number | null = null;

  constructor(
    private adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private locale: string,
    private dataService: DataService,
    private fb: FormBuilder,
    private usersService: UsersService,
    private congregationsService: CongregationsService,
    private assignmentTypesService: AssignmentTypesService,
    private userAssignmentTypesService: UserAssignmentTypesService,
    private notify: NotificationService,
    private routes: ActivatedRoute,
  ) {
    this.locale = "co";
    this.adapter.setLocale(this.locale);
  }

  ngOnInit(): void {
    this.makeForm();
    this.loadCurrentCongregation();
    this.loadAdminState();
    this.getAllCong();
    this.loadAssignmentTypes();
    this.loadPublisherForEdit();
  }

  makeFormWithData(publisher: Publisher): void {
    this.currentPublisher = publisher;
    this.userId = publisher.id;

    this.formulario = this.fb.group({
      id: new FormControl(publisher.id),
      fullName: new FormControl(publisher.fullName),
      image: new FormControl(publisher.image),
      firstName: new FormControl(publisher.firstName, [Validators.required, Validators.maxLength(80)]),
      secondName: new FormControl(publisher.secondName, [Validators.maxLength(80)]),
      lastName: new FormControl(publisher.lastName, [Validators.maxLength(80)]),
      surname: new FormControl(publisher.surname, [Validators.maxLength(80)]),
      birthdate: new FormControl(publisher.birthdate),
      gender: new FormControl(publisher.gender, [Validators.required]),
      documentNumber: new FormControl(publisher.documentNumber),
      documentType: new FormControl(publisher.documentType, [Validators.required]),
      cellPhone: new FormControl(publisher.cellPhone, [Validators.maxLength(30)]),
      phone: new FormControl(publisher.phone, [Validators.maxLength(30)]),
      email: new FormControl(publisher.email, [Validators.email, Validators.maxLength(120)]),
      congregation: new FormControl(publisher.congregation ?? this.congregationSelected ?? null),
      congregationId: new FormControl(this.resolveCongregationId(publisher), [Validators.required]),
      assignmentTypePermissions: new FormControl(this.buildAssignmentTypePermissions(publisher.assignmentTypePermissions), [this.assignmentTypePermissionsValidator.bind(this)]),
    });
  }

  makeForm(): void {
    this.formulario = this.fb.group({
      id: new FormControl(null),
      fullName: new FormControl(null),
      image: new FormControl(null),
      firstName: new FormControl(null, [Validators.required, Validators.maxLength(80)]),
      secondName: new FormControl(null, [Validators.maxLength(80)]),
      lastName: new FormControl(null, [Validators.maxLength(80)]),
      surname: new FormControl(null, [Validators.maxLength(80)]),
      birthdate: new FormControl(null),
      gender: new FormControl("Femenino", [Validators.required]),
      documentNumber: new FormControl(null),
      documentType: new FormControl("CC", [Validators.required]),
      cellPhone: new FormControl(null, [Validators.maxLength(30)]),
      phone: new FormControl(null, [Validators.maxLength(30)]),
      email: new FormControl(null, [Validators.email, Validators.maxLength(120)]),
      congregation: new FormControl(this.congregationSelected ?? null),
      congregationId: new FormControl(this.congregationSelected?.id ?? null, [Validators.required]),
      assignmentTypePermissions: new FormControl(this.buildAssignmentTypePermissions(), [this.assignmentTypePermissionsValidator.bind(this)]),
    });
  }

  get permissions(): AssignmentTypePermission[] {
    return this.formulario?.get("assignmentTypePermissions")?.value ?? [];
  }

  get disabledSave(): boolean {
    return this.isSaving || this.isLoadingAssignmentTypes;
  }

  getAllCong(): void {
    this.congregationsService.getAllCongregations().subscribe({
      next: (data) => (this.allCongregations = data),
      error: (error) => this.notify.error(this.getErrorMessage(error, "No se pudieron cargar las congregaciones."), "Error"),
    });
  }

  save(): void {
    if (this.isLoadingAssignmentTypes) {
      this.notify.warning("Espera a que terminen de cargar los tipos de asignación.", "Cargando");
      return;
    }

    if (this.assignmentTypesLoadFailed) {
      this.notify.error("No se pueden guardar permisos sin cargar los tipos de asignación.", "Error");
      return;
    }

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      this.notify.warning(this.getFormValidationMessage(), "Revisa el formulario", 12000);
      return;
    }

    const publisher = this.buildPublisherPayload();
    this.isSaving = true;

    this.usersService
      .save(publisher)
      .pipe(
        switchMap((savedPublisher: Publisher) => {
          const userId = savedPublisher.id ?? publisher.id;

          if (!userId || this.assignmentTypes.length === 0) {
            return of(savedPublisher);
          }

          return this.userAssignmentTypesService
            .updateBulk({
              userId,
              assignments: this.getAssignmentTypePermissionsForBulk(userId).map((permission) => ({
                assignmentTypeId: permission.assignmentTypeId,
                enabled: permission.enabled,
              })),
            })
            .pipe(
              map((assignmentTypePermissions) => ({
                ...savedPublisher,
                assignmentTypePermissions,
              })),
            );
        }),
        finalize(() => (this.isSaving = false)),
      )
      .subscribe({
        next: (savedPublisher) => {
          this.notify.success("El publicador fue almacenado correctamente.", "Listo");
          this.currentPublisher = savedPublisher;
          this.userId = savedPublisher.id ?? this.userId;
          this.dataService.getPublishersFromDB();

          if (!this.userId) {
            this.formulario.reset();
            this.makeForm();
          } else {
            this.makeFormWithData(savedPublisher);
          }
        },
        error: (error) => this.notify.error(this.getErrorMessage(error, "No se puede guardar."), "No se puede guardar", 12000),
      });
  }

  onChange(): void {
    this.formulario.patchValue({
      congregation: this.congregationSelected,
      congregationId: this.congregationSelected?.id ?? null,
    });
  }

  isPermissionEnabled(assignmentType: AssignmentType): boolean {
    return Boolean(this.permissions.find((permission) => permission.assignmentTypeId === assignmentType.id)?.enabled);
  }

  onPermissionChange(assignmentType: AssignmentType, enabled: boolean): void {
    const permissions = enabled
      ? this.upsertEnabledAssignmentTypePermission(assignmentType)
      : this.permissions.filter((permission) => permission.assignmentTypeId !== assignmentType.id);

    this.formulario.get("assignmentTypePermissions")?.setValue(permissions);
    this.formulario.get("assignmentTypePermissions")?.markAsDirty();
  }

  private loadCurrentCongregation(): void {
    this.dataService.getCongregation$().subscribe((data) => {
      if (!data?.id) {
        return;
      }

      this.congregationSelected = data;
      const currentCongregationId = this.formulario?.get("congregationId")?.value;

      if (this.currentPublisher?.id || currentCongregationId) {
        return;
      }

      this.formulario?.patchValue({
        congregation: data,
        congregationId: data.id,
      });
    });
  }

  private loadAdminState(): void {
    this.dataService.getIsAdmin().subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });
  }

  private loadAssignmentTypes(): void {
    this.isLoadingAssignmentTypes = true;
    this.assignmentTypesLoadFailed = false;

    this.assignmentTypesService
      .getAll()
      .pipe(finalize(() => (this.isLoadingAssignmentTypes = false)))
      .subscribe({
        next: (assignmentTypes) => {
          this.assignmentTypes = assignmentTypes;
          this.syncAssignmentTypePermissions();
        },
        error: (error) => {
          this.assignmentTypesLoadFailed = true;
          this.notify.error(this.getErrorMessage(error, "No se pudieron cargar los tipos de asignación."), "Error");
        },
      });
  }

  private loadPublisherForEdit(): void {
    const routeUserId = Number(this.routes.snapshot.paramMap.get("id"));

    if (!routeUserId) {
      return;
    }

    this.userId = routeUserId;
    this.loadPublisherById(routeUserId);
  }

  private loadPublisherById(userId: number): void {
    this.usersService.getById(userId).subscribe({
      next: (publisher) => this.makeFormWithData(publisher),
      error: (error) => this.notify.error(this.getErrorMessage(error, "No se pudo cargar el publicador."), "Error"),
    });
  }

  private syncAssignmentTypePermissions(): void {
    if (!this.formulario || this.assignmentTypes.length === 0) {
      return;
    }

    const currentPermissions = this.permissions.length > 0 ? this.permissions : this.currentPublisher?.assignmentTypePermissions;

    const control = this.formulario.get("assignmentTypePermissions");
    control?.setValue(this.buildAssignmentTypePermissions(currentPermissions));
    control?.updateValueAndValidity();
  }

  private buildAssignmentTypePermissions(existingPermissions: AssignmentTypePermission[] = []): AssignmentTypePermission[] {
    const existingByAssignmentTypeId = new Map(existingPermissions.map((permission) => [permission.assignmentTypeId, permission]));

    return this.assignmentTypes.reduce<AssignmentTypePermission[]>((permissions, assignmentType) => {
      const existingPermission = existingByAssignmentTypeId.get(assignmentType.id);

      if (!existingPermission?.enabled) {
        return permissions;
      }

      const userId = existingPermission?.userId ?? this.userId ?? this.currentPublisher?.id ?? null;

      permissions.push({
        userId,
        assignmentTypeId: assignmentType.id,
        assignmentTypeDescription: assignmentType.description,
        assignmentTypeNumber: assignmentType.number,
        enabled: true,
      });

      return permissions;
    }, []);
  }

  private getAssignmentTypePermissions(userId?: number): AssignmentTypePermission[] {
    const resolvedUserId = userId ?? this.userId ?? this.currentPublisher?.id ?? null;

    return this.permissions.map((permission) => ({
      ...permission,
      userId: resolvedUserId,
      enabled: true,
    }));
  }

  private getAssignmentTypePermissionsForBulk(userId?: number): AssignmentTypePermission[] {
    const enabledAssignmentTypeIds = new Set(this.getAssignmentTypePermissions(userId).map((permission) => permission.assignmentTypeId));
    const resolvedUserId = userId ?? this.userId ?? this.currentPublisher?.id ?? null;

    return this.assignmentTypes.map((assignmentType) => ({
      userId: resolvedUserId,
      assignmentTypeId: assignmentType.id,
      assignmentTypeDescription: assignmentType.description,
      assignmentTypeNumber: assignmentType.number,
      enabled: enabledAssignmentTypeIds.has(assignmentType.id),
    }));
  }

  private upsertEnabledAssignmentTypePermission(assignmentType: AssignmentType): AssignmentTypePermission[] {
    const existingPermission = this.permissions.find((permission) => permission.assignmentTypeId === assignmentType.id);
    const enabledPermission: AssignmentTypePermission = {
      userId: existingPermission?.userId ?? this.userId ?? this.currentPublisher?.id ?? null,
      assignmentTypeId: assignmentType.id,
      assignmentTypeDescription: assignmentType.description,
      assignmentTypeNumber: assignmentType.number,
      enabled: true,
    };

    if (existingPermission) {
      return this.permissions.map((permission) => (permission.assignmentTypeId === assignmentType.id ? enabledPermission : permission));
    }

    return [...this.permissions, enabledPermission].sort((a, b) => (a.assignmentTypeNumber ?? 0) - (b.assignmentTypeNumber ?? 0));
  }

  private assignmentTypePermissionsValidator(control: AbstractControl): ValidationErrors | null {
    const permissions = control.value as AssignmentTypePermission[] | null;

    if (!Array.isArray(permissions)) {
      return { assignmentTypePermissions: true };
    }

    const hasInvalidPermission = permissions.some(
      (permission) => !permission.assignmentTypeId || !permission.assignmentTypeDescription || typeof permission.enabled !== "boolean",
    );

    return hasInvalidPermission ? { assignmentTypePermissions: true } : null;
  }

  private buildPublisherPayload(): Publisher {
    const values = this.formulario.getRawValue();
    const congregationId = values.congregationId ?? this.currentPublisher?.congregationId ?? this.currentPublisher?.myCongregationId ?? values.congregation?.id ?? this.congregationSelected?.id;
    const congregation =
      values.congregation ??
      this.currentPublisher?.congregation ??
      this.allCongregations.find((item) => item.id === congregationId) ??
      (this.congregationSelected?.id === congregationId ? this.congregationSelected : undefined);

    return {
      ...this.currentPublisher,
      ...values,
      fullName: this.buildFullName(values),
      congregation,
      congregationId,
      myCongregationId: congregationId,
      designations: this.currentPublisher?.designations ?? [],
      assignmentTypePermissions: this.getAssignmentTypePermissions(values.id),
    };
  }

  private resolveCongregationId(publisher?: Publisher): number | null {
    return publisher?.congregation?.id ?? publisher?.congregationId ?? publisher?.myCongregationId ?? this.congregationSelected?.id ?? null;
  }

  private buildFullName(values: any): string {
    const nameParts = [values.firstName, values.secondName, values.surname, values.lastName].filter(Boolean);
    const generatedFullName = nameParts.join(" ").trim();
    const currentFullName = values.fullName ?? this.currentPublisher?.fullName ?? "";
    const hasIncompleteNameParts = !values.surname && !values.lastName;

    if (this.currentPublisher?.id && hasIncompleteNameParts && this.wordCount(currentFullName) > this.wordCount(generatedFullName)) {
      return currentFullName;
    }

    return generatedFullName || currentFullName;
  }

  private wordCount(value: string): number {
    return value.trim().split(/\s+/).filter(Boolean).length;
  }

  private getFormValidationMessage(): string {
    const messages: string[] = [];

    if (this.hasControlError("firstName", "required")) {
      messages.push("El primer nombre es requerido");
    }

    if (this.hasControlError("documentType", "required")) {
      messages.push("El tipo de documento es requerido");
    }

    if (this.hasControlError("gender", "required")) {
      messages.push("El género es requerido");
    }

    if (this.hasControlError("congregationId", "required")) {
      messages.push("La congregación es requerida");
    }

    if (this.hasControlError("email", "email")) {
      messages.push("El correo electrónico no tiene un formato válido");
    }

    if (this.formulario.get("assignmentTypePermissions")?.invalid) {
      messages.push("Los permisos de asignación no están completos");
    }

    return messages.join(". ");
  }

  private hasControlError(controlName: string, errorName: string): boolean {
    return Boolean(this.formulario.get(controlName)?.hasError(errorName));
  }

  private getErrorMessage(error: ApiErrorResponse | string | any, fallback: string): string {
    if (typeof error === "string") {
      return error;
    }

    const fieldErrors = error?.errors;

    if (Array.isArray(fieldErrors) && fieldErrors.length > 0) {
      return fieldErrors.map((item) => item.message).join(". ");
    }

    return error?.message ?? error?.error?.message ?? fallback;
  }
}
