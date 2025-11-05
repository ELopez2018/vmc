import { Component } from '@angular/core';

@Component({
    selector: 'vmc-table-material',
    templateUrl: './table-material.component.html',
    styleUrls: ['./table-material.component.scss'],
    standalone: false
})
export class TableMaterialComponent {
  dataSource: any
  displayedColumns: any
}
