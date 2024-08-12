import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntreSemanaRoutingModule } from './entre-semana-routing.module';
import { EntreSemanaComponent } from './entre-semana.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProgramsComponent } from './components/programs/programs.component';



@NgModule({
  declarations: [
    EntreSemanaComponent,
  ],
  imports: [
    CommonModule,
    EntreSemanaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ProgramsComponent,
    SharedModule
  ]
})
export class EntreSemanaModule { }
