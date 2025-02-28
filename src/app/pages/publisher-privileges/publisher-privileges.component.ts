import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DataService } from '../../core/services/data/data.service';
import { BaseComponent } from 'src/app/core/Class/base-component';
import { Publisher } from 'src/app/core/interfaces/reuniones.interface';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { Generic } from 'src/app/core/interfaces/configs.interface';
import { ModalService } from '../../core/services/modal/modal.service';

@Component({
  selector: 'publisher-privileges',
  templateUrl: './publisher-privileges.component.html',
  styleUrls: ['./publisher-privileges.component.scss'],
  standalone: true,
  imports: [SharedModule, FormsModule, ReactiveFormsModule, CommonModule]
})
export class PublisherPrivilegesComponent extends BaseComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl('');
  filteredFruits!: Observable<string[]>;
  designations: string[] = ['Publicador'];
  allDesignations: string[] = [];
  designationsList: Generic[] = [];
  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;

  public publisher!: Publisher;
  constructor(private dataService: DataService, private modalService:ModalService) {
    super()
    this.addSubscription(
      this.dataService.getPublisher().subscribe(data => {
        this.publisher = data
        console.log({data});
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
    console.log(this.designations);
    const designations = this.designations.map(data => {
      const matchedDesignation = this.designationsList.find(i => i.description === data);
      return matchedDesignation;
    });
    console.log(designations);
  }

  openModal() {
    this.modalService.selectPublisher()
    .then(data=>{
      this.publisher = data;
      this.designations = [...this.publisher.designations.map(i => i.description)]
    })
  }
}
