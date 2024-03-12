import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntreSemanaComponent } from './entre-semana.component';
import { EditEntreSemanaComponent } from './edit-entre-semana/edit-entre-semana.component';

const routes: Routes = [
  { path: '', component: EntreSemanaComponent },
  { path: 'editar', component: EditEntreSemanaComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntreSemanaRoutingModule { }
