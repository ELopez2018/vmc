import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { from } from 'rxjs';
import { LoginGuard } from './core/guards/login.guard'
import { NotFoundComponent } from './core/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: "full" },
  {
    path: 'inicio', component: HomeComponent,

  },
  {
    path: 'tablero', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [LoginGuard]
  },
  {
    path: '**',
    component: NotFoundComponent,
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
