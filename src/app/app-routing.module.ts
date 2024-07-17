import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrinterComponent } from './shared/printer/printer.component';
import { UsersCreateOrUpdateComponent } from './shared/components/users-create-or-update/users-create-or-update.component';
import { PublisherPrivilegesComponent } from './pages/publisher-privileges/publisher-privileges.component';

const routes: Routes = [
  { path: '', redirectTo: 'entre-semana', pathMatch: "full" },
  {
    path: 'entre-semana', loadChildren: () => import('./pages/entre-semana/entre-semana.module').then(m => m.EntreSemanaModule),
  },
  {
    path: 'imprimir', component: PrinterComponent,
  },
  {
    path: 'publicador', component: UsersCreateOrUpdateComponent,
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
