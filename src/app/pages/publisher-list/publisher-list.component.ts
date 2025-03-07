import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Publisher } from 'src/app/core/interfaces/reuniones.interface';
import { DataService } from 'src/app/core/services/data/data.service';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'vmc-publisher-list',
  templateUrl: './publisher-list.component.html',
  styleUrls: ['./publisher-list.component.scss']
})
export class PublisherListComponent implements AfterViewInit, OnInit {
  showSpinner = true;
  dataSource!: MatTableDataSource<Publisher>;
  displayedColumns: string[] = ['id', 'fullName', 'cellPhone', 'gender'];
  publisherList: Publisher[]=[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private dataService: DataService,
    private loaderService: LoaderService,
    private router:Router
  ) {

    this.subscrp()

  }
  ngOnInit(): void {
    this.paginator._intl.firstPageLabel = "Primera página"
    this.paginator._intl.itemsPerPageLabel = "Items por página"
    this.paginator._intl.lastPageLabel = "Ultima Página"
    this.paginator._intl.nextPageLabel = "Página siguiente"
    this.paginator._intl.previousPageLabel = "Página anterior"
  }
  subscrp() {
    this.dataService.getPubliherList$().subscribe(data => {
      if (data) {
        this.publisherList =data;
        this.dataSource = new MatTableDataSource<Publisher>(data);
        this.paginator._intl.firstPageLabel = "Primera página"
        this.paginator._intl.itemsPerPageLabel = "Items por página"
        this.paginator._intl.lastPageLabel = "Ultima Página"
        this.paginator._intl.nextPageLabel = "Página siguiente"
        this.paginator._intl.previousPageLabel = "Página anterior"
        this.dataSource.paginator = this.paginator;
      }
    })
    this.loaderService.getLoaderSearchPublisher$().subscribe(data => {
      this.showSpinner = data
    })

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  edit(publisherSelected: Publisher){
    this.router.navigateByUrl(`/tablero/publicador/${publisherSelected.id}`)
  }
}



export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

