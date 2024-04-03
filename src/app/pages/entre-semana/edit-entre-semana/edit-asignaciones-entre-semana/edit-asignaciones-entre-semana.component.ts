import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Assignment } from 'src/app/core/interfaces/reuniones.interface';
import { SemanasMock } from '../../mocks/semanas.mock';
import { UsersService } from '../../../../core/services/users/users.service';

@Component({
  selector: 'vmc-edit-asignaciones-entre-semana',
  templateUrl: './edit-asignaciones-entre-semana.component.html',
  styleUrls: ['./edit-asignaciones-entre-semana.component.scss']
})
export class EditAsignacionesEntreSemanaComponent implements OnInit {
  @Input() public assignmentList: Assignment[] = [];
  @Output() onGetPublishers: EventEmitter<any>= new EventEmitter();
  public publishers: any[] = [];
  public oldMens: any[] = [];
  public ministerialSerf: any[] = [];
  constructor(private usersService: UsersService) {

  }
  ngOnInit(): void {
    this.usersService.getAllUsers().subscribe(data => {
      this.publishers = data
      this.onGetPublishers.emit(data)
    })
  }

  filterOldMen() {
    this.oldMens = this.publishers
  }
  filterMinisterialSerf() {
    this.ministerialSerf = this.publishers
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
