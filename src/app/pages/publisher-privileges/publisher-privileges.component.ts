import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DataService } from '../../core/services/data/data.service';
import { BaseComponent } from 'src/app/core/Class/base-component';
import { Designation, Publisher } from 'src/app/core/interfaces/reuniones.interface';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { concat, map, Observable, of, startWith, switchMap, toArray, finalize } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { Generic } from 'src/app/core/interfaces/configs.interface';
import { ModalService } from '../../core/services/modal/modal.service';
import { UsersService } from 'src/app/core/services/users/users.service';
import { NotificationService } from 'src/app/core/services/nofitications/notification.service';

@Component({
    selector: 'publisher-privileges',
    templateUrl: './publisher-privileges.component.html',
    styleUrls: ['./publisher-privileges.component.scss'],
    imports: [SharedModule, FormsModule, ReactiveFormsModule, CommonModule]
})
export class PublisherPrivilegesComponent extends BaseComponent implements OnInit {
  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;
  public separatorKeysCodes: number[] = [ENTER, COMMA];
  public fruitCtrl = new FormControl('');
  public filteredFruits!: Observable<string[]>;
  public designations: string[] = [];
  public allDesignations: string[] = [];
  public designationsList: Generic[] = [];
  public publisher!: Publisher;
  public disabledSave = false;
  constructor(
    private dataService: DataService,
    private modalService: ModalService,
    private usersService: UsersService,
    private notify: NotificationService
  ) {
    super()
    this.addSubscription(
      this.dataService.getPublisher().subscribe(data => {
        this.publisher = data
        this.loadDesignations();
      })
    )
    this.addSubscription(
      this.dataService.getDesignations().subscribe(data => {
        this.designationsList = [...data]
        this.allDesignations = data.map(data => data.description)
      })
    )
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allDesignations.slice())),
    );
  }

  ngOnInit() {
  }
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value && !this.designations.includes(value)) {
      this.designations.push(value);
    }
    event.chipInput!.clear();
    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.designations.indexOf(fruit);

    if (index >= 0) {
      this.designations.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.viewValue;
    if (value && !this.designations.includes(value)) {
      this.designations.push(value);
    }
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allDesignations.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }
  save() {
    if (!this.publisher?.id) return;
    const desired = this.designations.map(name => this.designationsList.find(item => item.description === name));
    if (desired.some(item => !item?.id)) {
      this.notify.warning('Selecciona nombramientos del catálogo.', 'Revisa los nombramientos');
      return;
    }
    this.disabledSave = true;
    this.usersService.getDesignations(this.publisher.id).pipe(
      switchMap(current => {
        const desiredIds = new Set(desired.map(item => item!.id));
        const currentIds = new Set(current.map(item => item.id));
        const changes = [
          ...current.filter(item => !desiredIds.has(item.id)).map(item => this.usersService.removeDesignation(this.publisher.id, item.id)),
          ...desired.filter(item => !currentIds.has(item!.id)).map(item => this.usersService.addDesignation(this.publisher.id, item!.id)),
        ];
        return changes.length ? concat(...changes).pipe(toArray()) : of([]);
      }),
      switchMap(() => this.usersService.getDesignations(this.publisher.id)),
      finalize(() => this.disabledSave = false),
    ).subscribe({
      next: designations => {
        this.publisher = { ...this.publisher, designations };
        this.designations = designations.map(item => item.description);
        this.notify.success('Nombramientos guardados.', 'Listo');
      },
      error: error => {
        this.loadDesignations();
        this.notify.error(typeof error?.error === 'string' ? error.error : (error?.error?.message ?? 'No se pudieron guardar los nombramientos.'), 'Error');
      },
    });
  }

  private loadDesignations(): void {
    if (!this.publisher?.id) return;
    this.usersService.getDesignations(this.publisher.id).subscribe({
      next: designations => {
        this.publisher = { ...this.publisher, designations };
        this.designations = designations.map(item => item.description);
      },
      error: () => this.notify.error('No se pudieron cargar los nombramientos.', 'Error'),
    });
  }

  openModal() {
    this.modalService.selectPublisher()
      .then(data => {
        this.publisher = data;
        this.loadDesignations();
      })
  }

  get disabled() {
    return this.disabledSave;
  }
}
