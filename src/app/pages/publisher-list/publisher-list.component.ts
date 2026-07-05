import { AfterViewInit, Component, inject, OnInit, viewChild, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Publisher } from "src/app/core/interfaces/reuniones.interface";
import { DataService } from "src/app/core/services/data/data.service";
import { LoaderService } from "src/app/core/services/loader/loader.service";
import { UsersService } from "src/app/core/services/users/users.service";
import Swal from "sweetalert2";
import { MatPaginatorIntl } from "@angular/material/paginator";
import { MatDialog } from "@angular/material/dialog";
import type {
  UsersCreateOrUpdateComponent as UsersCreateOrUpdateComponentType,
  UsersCreateOrUpdateDialogData,
} from "src/app/shared/components/users-create-or-update/users-create-or-update.component";

export function getSpanishPaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();
  paginatorIntl.itemsPerPageLabel = "Items por página";
  paginatorIntl.firstPageLabel = "Primera página";
  paginatorIntl.lastPageLabel = "Última página";
  paginatorIntl.nextPageLabel = "Página siguiente";
  paginatorIntl.previousPageLabel = "Página anterior";
  paginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0) {
      return `0 de ${length}`;
    }
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;

    return `${startIndex + 1} - ${endIndex} de ${length}`;
  };
  return paginatorIntl;
}

@Component({
  selector: "vmc-publisher-list",
  templateUrl: "./publisher-list.component.html",
  styleUrls: ["./publisher-list.component.scss"],
  standalone: false,
  providers: [{ provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() }],
})
export class PublisherListComponent implements AfterViewInit, OnInit {
  showSpinner = true;
  dataSource!: MatTableDataSource<Publisher>;
  displayedColumns: string[] = ["id", "fullName", "cellPhone", "gender"];
  publisherList: Publisher[] = [];
  paginator = viewChild(MatPaginator);
  userService = inject(UsersService);
  constructor(
    private dataService: DataService,
    private loaderService: LoaderService,
    private dialog: MatDialog,
  ) {
    this.subscrp();
  }
  ngOnInit(): void {}
  subscrp() {
    this.dataService.getPubliherList$().subscribe((data) => {
      if (data) {
        this.publisherList = data;
        this.dataSource = new MatTableDataSource<Publisher>(data);
      }
    });
    this.loaderService.getLoaderSearchPublisher$().subscribe((data) => {
      this.showSpinner = data;
    });
  }
  ngAfterViewInit() {}

  get publishersWithEmail(): number {
    return this.publisherList.filter((publisher) => this.hasValue(publisher.email)).length;
  }

  get publishersWithPhone(): number {
    return this.publisherList.filter((publisher) => this.hasValue(publisher.cellPhone ?? publisher.phone)).length;
  }

  private hasValue(value?: string | number | null): boolean {
    return value !== null && value !== undefined && value.toString().trim().length > 0;
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
        this.dataSource.data = this.publisherList;
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
          this.dataSource.data = this.publisherList;
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
