import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: "full" },
  {
    path: 'tablero', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
  },

  {
    path: 'inicio', component: HomeComponent,
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
