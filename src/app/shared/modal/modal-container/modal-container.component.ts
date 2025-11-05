import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalTypeEnums } from 'src/app/core/enums/modal.enums';
import { Assignment, Program, Publisher, WeeklyProgram } from 'src/app/core/interfaces/reuniones.interface';

@Component({
    selector: 'app-modal',
    templateUrl: './modal-container.component.html',
    styleUrls: ['./modal-container.component.scss'],
    standalone: false
})
export class ModalContainerComponent implements OnInit {
  valueExchange($event: any) {
    this.values = $event
  }
  @Input() titulo!: string;
  @Input() mensaje!: string;
  @Input() LabelButton: string = 'Ok';
  @Input() urlSrc!: string;
  @Input() Icon: string = '';
  @Input() textButton: string = 'Crear';
  @Input() modalType: string = 'info';
  @Input() assignment!: WeeklyProgram;
  @Input() program!: Program;
  @Input() song!: string;
  @Input() errorMessage!: string;
  @Input() errorTitle!: string;
  @Input() errorType!: string;
  @Input() title!: string;
  @Input() subTitle!: string;
  @Input() assignmentType!: string;
  @Input() sectionMeeting!: string;

  public typeOfModals = ModalTypeEnums

  private values: any | null = <any>{};
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    // This is intentional
  }

  onClick(opcion: any) {
    this.activeModal.close(opcion);
  }

  close() {
    this.activeModal.close('close');
  }
  onClicked(item: Publisher) {
    this.activeModal.close(item);
  }

}
