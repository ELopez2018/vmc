import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Publisher } from 'src/app/core/interfaces/reuniones.interface';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'vmc-table-primeng',
  templateUrl: './table-primeng.component.html',
  styleUrls: ['./table-primeng.component.scss'],
  standalone: true,
  imports:[TableModule, ButtonModule]
})
export class TablePrimengComponent implements OnInit {
  @Input() publisherList:Publisher[]=[];
  @Output() onSelected= new EventEmitter<Publisher>()
  selectedSize: any = '';
  ngOnInit(): void {
  }

  selectedEdit(item: any){
    this.onSelected.emit(item)
  }
}
