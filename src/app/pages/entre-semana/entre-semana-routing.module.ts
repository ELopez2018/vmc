import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntreSemanaComponent } from './entre-semana.component';

const routes: Routes = [
  { path: '', component: EntreSemanaComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntreSemanaRoutingModule { }
