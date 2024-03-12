import { Component, Input, OnInit } from '@angular/core';
import { Assignment } from 'src/app/core/interfaces/reuniones.interface';
import { SemanasMock } from '../../mocks/semanas.mock';

@Component({
  selector: 'vmc-edit-asignaciones-entre-semana',
  templateUrl: './edit-asignaciones-entre-semana.component.html',
  styleUrls: ['./edit-asignaciones-entre-semana.component.scss']
})
export class EditAsignacionesEntreSemanaComponent implements OnInit {
  @Input() public assignmentList: Assignment[] = []
  ngOnInit(): void {
  }

  changeSeccion(section: string): string {
    switch (section) {
      case "NUESTRA VIDA CRISTIANA":
        return "Vida"
        break;
      case "SEAMOS MEJORES MAESTROS":
        return "Maestros"
        break;
      case "TESOROS DE LA BIBLIA":
        return "Tesoros"
        break;
    }
    return "";
  }
}
