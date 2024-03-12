import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'entre-semana', pathMatch: "full" },
  {
    path: 'entre-semana', loadChildren: () => import('./pages/entre-semana/entre-semana.module').then(m => m.EntreSemanaModule),
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
