import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntreSemanaRoutingModule } from './entre-semana-routing.module';
import { EntreSemanaComponent } from './entre-semana.component';
import { EditEntreSemanaComponent } from './edit-entre-semana/edit-entre-semana.component';
import { ConfigGeneralEntreSemanaComponent } from './edit-entre-semana/config-general-entre-semana/config-general-entre-semana.component';
import { EditAsignacionesEntreSemanaComponent } from './edit-entre-semana/edit-asignaciones-entre-semana/edit-asignaciones-entre-semana.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    EntreSemanaComponent,
    EditEntreSemanaComponent,
    ConfigGeneralEntreSemanaComponent,
    EditAsignacionesEntreSemanaComponent,
  ],
  imports: [
    CommonModule,
    EntreSemanaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class EntreSemanaModule { }
