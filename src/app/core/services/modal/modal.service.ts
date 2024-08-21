import { Injectable } from "@angular/core";
import { NgbModal, NgbModalOptions, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ModalContainerComponent } from "src/app/shared/modal/modal-container/modal-container.component";
import { ModalTitleEnums, ModalIconEnums, ModalResponseEnums, ModalTypeEnums } from "../../enums/modal.enums";
import { Assignment, Program, WeeklyProgram } from "../../interfaces/reuniones.interface";


@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(
    private ngbModal: NgbModal
  ) { }

  private modalOptions: NgbModalOptions = {
    backdrop: 'static',
    backdropClass: 'customBackdrop',
    centered: true,
  };

  private modalRef!: NgbModalRef;

  public yesOrNot(
    titulo: ModalTitleEnums,
    mensaje: string,
    Icon: ModalIconEnums,
    textButton: ModalResponseEnums = ModalResponseEnums.CONTINUAR
  ) {
    this.modalRef = this.ngbModal.open(ModalContainerComponent, this.modalOptions);
    this.modalRef.componentInstance.typeModal = ModalResponseEnums.SI;
    this.modalRef.componentInstance.titulo = titulo;
    this.modalRef.componentInstance.mensaje = mensaje;
    this.modalRef.componentInstance.Icon = Icon;
    this.modalRef.componentInstance.textButton = textButton;
    return this.modalRef.result
  }

  public assignPublisherWeeklyProgram(assignment?: WeeklyProgram, assignmentType?: string) {
    this.modalRef = this.ngbModal.open(ModalContainerComponent, this.modalOptions);
    this.modalRef.componentInstance.modalType = ModalTypeEnums.ASSIGN_PUB;
    this.modalRef.componentInstance.assignment = assignment;
    this.modalRef.componentInstance.assignmentType = assignmentType;
    return this.modalRef.result
  }

  public assignPublisherProgram(program?: Program, assignmentType?: string) {
    this.modalRef = this.ngbModal.open(ModalContainerComponent, this.modalOptions);
    this.modalRef.componentInstance.modalType = ModalTypeEnums.ASSIGN_PUB;
    this.modalRef.componentInstance.assignment = <WeeklyProgram>{};
    this.modalRef.componentInstance.assignmentType = assignmentType;
    return this.modalRef.result
  }

  public changeSong(program: Program, song: string) {
    this.modalRef = this.ngbModal.open(ModalContainerComponent, this.modalOptions);
    this.modalRef.componentInstance.modalType = ModalTypeEnums.CHANGE_SONGS;
    this.modalRef.componentInstance.program = program;
    this.modalRef.componentInstance.song = song;
    return this.modalRef.result
  }

  public selectedHour() {
    this.modalRef = this.ngbModal.open(ModalContainerComponent, this.modalOptions);
    this.modalRef.componentInstance.modalType = ModalTypeEnums.SELECT_HOUR;
    return this.modalRef.result
  }
  public setTitleAndTime(item: WeeklyProgram) {
    this.modalRef = this.ngbModal.open(ModalContainerComponent, this.modalOptions);
    this.modalRef.componentInstance.modalType = ModalTypeEnums.TITLE_AND_TIME;
    this.modalRef.componentInstance.assignment = item;
    return this.modalRef.result
  }
  public printer() {
    console.log("printer");
    this.modalRef = this.ngbModal.open(ModalContainerComponent, this.modalOptions);
    this.modalRef.componentInstance.modalType = ModalTypeEnums.PRINTER;
    return this.modalRef.result
  }
  public errorHandler(error: any, title: string) {
    this.modalRef = this.ngbModal.open(ModalContainerComponent, this.modalOptions);
    this.modalRef.componentInstance.modalType = ModalTypeEnums.ERROR;
    this.modalRef.componentInstance.errorType = ModalTitleEnums.ERROR;
    this.modalRef.componentInstance.errorMessage = error;
    this.modalRef.componentInstance.errorTitle = title;
    return this.modalRef.result
  }
  public info(subtitle: string, message: string, title: ModalTitleEnums, type: ModalTypeEnums) {
    this.modalRef = this.ngbModal.open(ModalContainerComponent, this.modalOptions);
    this.modalRef.componentInstance.mensaje = message;
    this.modalRef.componentInstance.subTitle = subtitle;
    this.modalRef.componentInstance.title = title;
    this.modalRef.componentInstance.modalType = type;
    return this.modalRef.result
  }

  public loading() {
    this.modalRef = this.ngbModal.open(ModalContainerComponent, this.modalOptions);
    this.modalRef.componentInstance.modalType = ModalTypeEnums.LOADER;
    return this.modalRef.result
  }
  public AddAssignment(program: Program, sectionMeeting: string) {
    this.modalRef = this.ngbModal.open(ModalContainerComponent, this.modalOptions);
    this.modalRef.componentInstance.modalType = ModalTypeEnums.ADDASSIG;
    this.modalRef.componentInstance.program = program;
    this.modalRef.componentInstance.sectionMeeting = sectionMeeting;
    return this.modalRef.result
  }

  public close() {
    if (this.modalRef) {
      this.modalRef.dismiss()
    }
  }
}
