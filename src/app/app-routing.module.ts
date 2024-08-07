import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrinterComponent } from './shared/printer/printer.component';
import { UsersCreateOrUpdateComponent } from './shared/components/users-create-or-update/users-create-or-update.component';
import { PublisherPrivilegesComponent } from './pages/publisher-privileges/publisher-privileges.component';
import { PublisherListComponent } from './pages/publisher-list/publisher-list.component';
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
