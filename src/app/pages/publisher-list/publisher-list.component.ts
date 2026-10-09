import { Component, inject } from "@angular/core";
import { Publisher } from "src/app/core/interfaces/reuniones.interface";
import { DataService } from "src/app/core/services/data/data.service";
import { LoaderService } from "src/app/core/services/loader/loader.service";
import { UsersService } from "src/app/core/services/users/users.service";
import Swal from "sweetalert2";
import { MatDialog } from "@angular/material/dialog";
import type {
  UsersCreateOrUpdateComponent as UsersCreateOrUpdateComponentType,
  UsersCreateOrUpdateDialogData,
} from "src/app/shared/components/users-create-or-update/users-create-or-update.component";

@Component({
  selector: "vmc-publisher-list",
  templateUrl: "./publisher-list.component.html",
  styleUrls: ["./publisher-list.component.scss"],
  standalone: false,
})
export class PublisherListComponent {
  showSpinner = true;
  publisherList: Publisher[] = [];
  searchTerm = "";
  userService = inject(UsersService);
  constructor(
    private dataService: DataService,
    private loaderService: LoaderService,
    private dialog: MatDialog,
  ) {
    this.subscrp();
  }
  subscrp() {
    this.dataService.getPubliherList$().subscribe((data) => {
      if (data) {
        this.publisherList = data;
      }
    });
    this.loaderService.getLoaderSearchPublisher$().subscribe((data) => {
      this.showSpinner = data;
    });
  }
  get filteredPublisherList(): Publisher[] {
    const normalizedSearch = this.normalizeText(this.searchTerm);

    if (!normalizedSearch) {
      return this.publisherList;
    }

    return this.publisherList.filter((publisher) => this.normalizeText(publisher.fullName).includes(normalizedSearch));
  }

  private normalizeText(value?: string | null): string {
    return (value ?? "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLocaleLowerCase()
      .trim();
  }

  async edit(publisherSelected: Publisher) {
    const { UsersCreateOrUpdateComponent } = await import(
      "src/app/shared/components/users-create-or-update/users-create-or-update.component"
    );

    this.dialog
      .open<UsersCreateOrUpdateComponentType, UsersCreateOrUpdateDialogData, Publisher>(UsersCreateOrUpdateComponent, {
        data: { publisherId: publisherSelected.id },
        width: "min(1200px, 96vw)",
        maxWidth: "96vw",
        maxHeight: "92vh",
        autoFocus: false,
      })
      .afterClosed()
      .subscribe((savedPublisher) => {
        if (!savedPublisher?.id) {
          return;
        }

        this.publisherList = this.publisherList.map((publisher) => (publisher.id === savedPublisher.id ? savedPublisher : publisher));
      });
  }

  delete(publisherSelected: Publisher) {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `Esta a punto de Borrar a ${publisherSelected.fullName}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, bórralo!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.delete(publisherSelected).subscribe(() => {
          this.publisherList = this.publisherList.filter((p) => p.id !== publisherSelected.id);
          Swal.fire({
            title: "Borrado",
            text: "Registro borrado correctamente.",
            icon: "success",
          });
        });
      }
    });
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
