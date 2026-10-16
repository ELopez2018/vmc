import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CongregationsService } from 'src/app/core/services/congregations/congregations.service';
import { Congregation } from 'src/app/core/interfaces/reuniones.interface';
import { MatIconModule } from "@angular/material/icon";
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';

@Component({
  selector: 'vmc-congregations-list',
  templateUrl: './congregations-list.component.html',
  styleUrls: ['./congregations-list.component.scss'],
  standalone : true,
  imports: [MatTableModule, MatIconModule, MatButtonModule, MatSlideToggleModule, MatSnackBarModule]
})
export class CongregationsListComponent implements OnInit {
onAdd() {
throw new Error('Method not implemented.');
}
  displayedColumns: string[] = ['name', 'number', 'day', 'hour', 'acctive', 'fontColorPublisher', 'actions'];
  dataSource = new MatTableDataSource<Congregation>([]);
  readonly savingIds = new Set<number>();

  constructor(private congregationsService: CongregationsService, private snackBar: MatSnackBar) {}

  toggleActivity(congregation: Congregation, event: MatSlideToggleChange): void {
    const acctive = event.checked;
    event.source.checked = congregation.acctive !== false;
    if (this.savingIds.has(congregation.id)) return;
    this.savingIds.add(congregation.id);
    this.congregationsService.updateActivity(congregation, acctive)
      .pipe(finalize(() => this.savingIds.delete(congregation.id)))
      .subscribe({
        next: (updated) => {
          this.dataSource.data = this.dataSource.data.map(item => item.id === updated.id ? updated : item);
          this.snackBar.open('Estado de la congregación actualizado.', 'Cerrar', { duration: 4500 });
        },
        error: (error) => {
          this.dataSource.data = [...this.dataSource.data];
          this.snackBar.open(error?.error?.message || error?.message || 'No se pudo actualizar el estado.', 'Cerrar', { duration: 4500 });
        },
      });
  }

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
