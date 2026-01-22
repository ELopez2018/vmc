import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "src/app/core/home/home.component";
import { UsersCreateOrUpdateComponent } from "src/app/shared/components/users-create-or-update/users-create-or-update.component";
import { PrinterComponent } from "src/app/shared/printer/printer.component";
import { PublisherListComponent } from "../publisher-list/publisher-list.component";
import { PublisherPrivilegesComponent } from "../publisher-privileges/publisher-privileges.component";
import { DashboardComponent } from "./dashboard.component";
import { ManagerComponent } from "../entre-semana/manager/manager.component";
import { LoginGuard } from "src/app/core/guards/login.guard";
import { CongregationsListComponent } from "../congregations/congregations-list/congregations-list.component";
import { AssignmentSheetPrinterComponent } from "src/app/shared/assignment-sheet-printer/assignment-sheet-printer.component";
import { NotificationsComponent } from "../notifications/notifications.component";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children: [
      {
        path: "",
        redirectTo: "entre-semana",
        pathMatch: "full",
      },
      {
        path: "entre-semana",
        loadChildren: () => import("../entre-semana/entre-semana.module").then((m) => m.EntreSemanaModule),
        canActivate: [LoginGuard],
      },
      {
        path: "imprimir",
        component: PrinterComponent,
        canActivate: [LoginGuard],
      },
      {
        path: "publicador",
        component: UsersCreateOrUpdateComponent,
        canActivate: [LoginGuard],
      },
      {
        path: "publicador/:id",
        component: UsersCreateOrUpdateComponent,
        canActivate: [LoginGuard],
      },
      {
        path: "publicadores",
        component: PublisherListComponent,
        canActivate: [LoginGuard],
      },
      {
        path: "privilegios",
        component: PublisherPrivilegesComponent,
        canActivate: [LoginGuard],
      },
      {
        path: "administrador",
        component: ManagerComponent,
        canActivate: [LoginGuard],
      },
      {
        path: "congregaciones",
        component: CongregationsListComponent,
        canActivate: [LoginGuard],
      },
      {
        path: "hojas-asignacion",
        component: AssignmentSheetPrinterComponent,
        canActivate: [LoginGuard],
      },
            {
        path: "notificaciones",
        loadComponent: () => import("../notifications/notifications.component").then(m => m.NotificationsComponent),
        canActivate: [LoginGuard],
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
