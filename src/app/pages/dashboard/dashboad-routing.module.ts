import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/core/home/home.component';
import { UsersCreateOrUpdateComponent } from 'src/app/shared/components/users-create-or-update/users-create-or-update.component';
import { PrinterComponent } from 'src/app/shared/printer/printer.component';
import { PublisherListComponent } from '../publisher-list/publisher-list.component';
import { PublisherPrivilegesComponent } from '../publisher-privileges/publisher-privileges.component';

const routes: Routes = [
  { path: '', redirectTo: 'entre-semana', pathMatch: "full" },
  {
    path: 'entre-semana', loadChildren: () => import('../entre-semana/entre-semana.module').then(m => m.EntreSemanaModule),
  },
  {
    path: 'imprimir', component: PrinterComponent,
  },
  {
    path: 'inicio', component: HomeComponent,
  },
  {
    path: 'publicador', component: UsersCreateOrUpdateComponent,
  },
  {
    path: 'publicadores', component: PublisherListComponent,
  },
  {
    path: 'privilegios', component: PublisherPrivilegesComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
