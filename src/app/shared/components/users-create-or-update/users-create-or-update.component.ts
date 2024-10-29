import { Component, Inject, OnInit } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { DataService } from '../../../core/services/data/data.service';
import { Congregation, Publisher } from 'src/app/core/interfaces/reuniones.interface';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersService } from 'src/app/core/services/users/users.service';
import { ModalService } from '../../../core/services/modal/modal.service';
import { ModalTitleEnums, ModalTypeEnums } from 'src/app/core/enums/modal.enums';
import { CongregationsService } from 'src/app/core/services/congregations/congregations.service';
import { ActivatedRoute, Routes } from '@angular/router';

@Component({
  selector: 'users-create-or-update',
  templateUrl: './users-create-or-update.component.html',
  styleUrls: ['./users-create-or-update.component.scss'],
  standalone: true,
  imports: [SharedModule, FormsModule, ReactiveFormsModule, CommonModule]
})
export class UsersCreateOrUpdateComponent implements OnInit {
  selected = 'option2';
  public congregationSelected!: Congregation;
  public formulario!: FormGroup;
  public allCongregations: Congregation[] = [];
  public isAdmin=false;
  private userId!: any;
  constructor(
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
    private dataService: DataService,
    private fb: FormBuilder,
    private usersService: UsersService,
    private modalService: ModalService,
    private congregationsService: CongregationsService,
    @Inject(ActivatedRoute) private routes: ActivatedRoute
  ) {
    this._locale = 'co';
    this._adapter.setLocale(this._locale);
    this.getAllCong()
  }

  ngOnInit() {
    if(this.routes.snapshot.paramMap.get('id')){
      this.userId = this.routes.snapshot.paramMap.get('id') ;
      this.dataService.getPubliherList$().subscribe(data=>{
        const publi= data.filter(i=>i.id==this.userId)[0]
        console.log(publi);
        this.makeFormWithData(publi)
      })
    } else {
      this.makeForm()
    }

    this.dataService.getCongregation$().subscribe(data => {
     this.congregationSelected = data
      console.log(this.congregationSelected);
    })
  }
  makeFormWithData(publisher:Publisher){
    this.formulario = this.fb.group({
      id:new FormControl(publisher.id),
      fullName: new FormControl(publisher.fullName),
      image: new FormControl(publisher.image),
      firstName: new FormControl(publisher.firstName),
      secondName: new FormControl(publisher.secondName),
      lastName: new FormControl(publisher.lastName),
      surname: new FormControl(publisher.surname),
      birthdate: new FormControl(publisher.birthdate),
      gender: new FormControl(publisher.gender),
      documentNumber: new FormControl(publisher.documentNumber),
      documentType: new FormControl(publisher.documentType),
      cellPhone: new FormControl(publisher.cellPhone),
      phone: new FormControl(publisher.phone),
      email: new FormControl(publisher.email),
      congregation: new FormControl(this.congregationSelected ?? null)
    })
  }
makeForm(){
  this.formulario = this.fb.group({
    fullName: new FormControl(null),
    image: new FormControl(null),
    firstName: new FormControl(null),
    secondName: new FormControl(null),
    lastName: new FormControl(null),
    surname: new FormControl(null),
    birthdate: new FormControl(null),
    gender: new FormControl("Femenino"),
    documentNumber: new FormControl(null),
    documentType: new FormControl("CC"),
    cellPhone: new FormControl(null),
    phone: new FormControl(null),
    email: new FormControl(null),
    congregation: new FormControl(this.congregationSelected ?? null)
  })
}


  getAllCong() {
    this.congregationsService
      .getAllCongregations()
      .subscribe(data => this.allCongregations = data)
  }

  save() {
    const values: Publisher = this.formulario.getRawValue()
    const nameParts = [values.firstName, values.secondName, values.surname, values.lastName].filter(Boolean);
    values.fullName = nameParts.join(' ').trim();
    values.congregation = this.congregationSelected
    this.usersService.save(values).subscribe(data => {
      this.modalService.info("Se han guardados los datos", "El usuario fue almacenado", ModalTitleEnums.GREAT, ModalTypeEnums.SUCCESS)
      this.formulario.reset()
      this.dataService.getPublishersFromDB()
    }, error => {
      this.modalService.errorHandler(error, "No se puede guardar.".toUpperCase())
      //this.modalService.errorHandler(error.error, "No se puede guardar.".toUpperCase())
    })

  }

  onChange() {
    console.log(this.congregationSelected);
  }

}
/*
    this.formulario = this.fb.group({
      fullName: new FormControl(""),
      image: new FormControl(""),
      firstName: new FormControl(""),
      secondName: new FormControl(""),
      lastName: new FormControl(""),
      surname: new FormControl(""),
      birthdate: new FormControl(""),
      gender: new FormControl(""),
      documentNumber: new FormControl(""),
      documentType: new FormControl(""),
      cellPhone: new FormControl(""),
      phone: new FormControl(""),
      email: new FormControl(""),
      congregationid: new FormControl(this.congregationSelected.id ?? 0)
    })

    this.formulario = this.fb.group({
      fullName: new FormControl(""),
      image: new FormControl(""),
      firstName: new FormControl("Estarlin"),
      secondName: new FormControl("Enrique"),
      lastName: new FormControl("Valero"),
      surname: new FormControl("Lopez"),
      birthdate: new FormControl(""),
      gender: new FormControl("Masculino"),
      documentNumber: new FormControl("1365875"),
      documentType: new FormControl("ce"),
      cellPhone: new FormControl("3204454846"),
      phone: new FormControl(""),
      email: new FormControl("estarlin.elv1@gmail.com"),
      congregation: new FormControl(this.congregationSelected ?? null)
    })

    */
