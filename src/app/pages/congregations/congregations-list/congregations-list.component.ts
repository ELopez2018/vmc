import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CongregationsService } from 'src/app/core/services/congregations/congregations.service';
import { Congregation } from 'src/app/core/interfaces/reuniones.interface';
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'vmc-congregations-list',
  templateUrl: './congregations-list.component.html',
  styleUrls: ['./congregations-list.component.scss'],
  standalone : true,
  imports: [MatTableModule, MatIconModule, MatButtonModule]
})
export class CongregationsListComponent implements OnInit {
onAdd() {
throw new Error('Method not implemented.');
}
  displayedColumns: string[] = ['name', 'number', 'day', 'hour', 'fontColorPublisher', 'actions'];
  dataSource = new MatTableDataSource<Congregation>([]);

  constructor(private congregationsService: CongregationsService) {}

  ngOnInit() {
    this.congregationsService.getAllCongregations().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  parseDay(day: number){
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return days[day] || 'Desconocido';
  }
  
  onEdit(congregation: Congregation) {
    // Aquí se abriría el modal de edición
    console.log('Editar', congregation);
  }
  
  onDelete(congregation: Congregation) {
    // Aquí se abriría el modal de confirmación y se eliminaría
    console.log('Eliminar', congregation);
  }
}
