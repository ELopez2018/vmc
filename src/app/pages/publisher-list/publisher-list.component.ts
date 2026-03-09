import { AfterViewInit, Component, inject, OnInit, viewChild, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Publisher } from "src/app/core/interfaces/reuniones.interface";
import { DataService } from "src/app/core/services/data/data.service";
import { LoaderService } from "src/app/core/services/loader/loader.service";
import { Router } from "@angular/router";
import { UsersService } from "src/app/core/services/users/users.service";
import Swal from "sweetalert2";
import { MatPaginatorIntl } from "@angular/material/paginator";

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
    private router: Router,
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

  edit(publisherSelected: Publisher) {
    this.router.navigateByUrl(`/tablero/publicador/${publisherSelected.id}`);
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
