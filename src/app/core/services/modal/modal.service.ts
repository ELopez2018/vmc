import { Injectable } from "@angular/core";
import { NgbModal, NgbModalOptions, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ModalContainerComponent } from "src/app/shared/modal/modal-container/modal-container.component";
import { ModalTitleEnums, ModalIconEnums, ModalResponseEnums, ModalTypeEnums } from "../../enums/modal.enums";
import { Assignment, Program, Publisher, WeeklyProgram } from "../../interfaces/reuniones.interface";
import { AssignmentType, normalizeAssignmentTypeValue } from "../../enums/assignments.enums";
import { MEETING_PARTS } from "../../constants/program.constants";

@Injectable({
  providedIn: "root",
})
export class ModalService {
  constructor(private ngbModal: NgbModal) {}

  private modalOptions: NgbModalOptions = {
    backdrop: "static",
    backdropClass: "customBackdrop",
    centered: true,
    animation: true,
    fullscreen: "sm",
    size: "lg",
    windowClass: "vmc-modal-window",
  };

  private modalRef!: NgbModalRef;

  private openModal(windowClass = ""): NgbModalRef {
    return this.ngbModal.open(ModalContainerComponent, {
      ...this.modalOptions,
      windowClass: ["vmc-modal-window", windowClass].filter(Boolean).join(" "),
    });
  }

  private openWideModal(): NgbModalRef {
    return this.openModal("vmc-modal-window--wide");
  }

  private openPrintModal(): NgbModalRef {
    return this.ngbModal.open(ModalContainerComponent, {
      ...this.modalOptions,
      fullscreen: "lg",
      windowClass: "vmc-modal-window vmc-modal-window--print",
    });
  }

  public yesOrNot(titulo: ModalTitleEnums, mensaje: string, Icon: ModalIconEnums, textButton: ModalResponseEnums = ModalResponseEnums.CONTINUAR) {
    this.modalRef = this.openModal("vmc-modal-window--compact");
    this.modalRef.componentInstance.typeModal = ModalResponseEnums.SI;
    this.modalRef.componentInstance.titulo = titulo;
    this.modalRef.componentInstance.mensaje = mensaje;
    this.modalRef.componentInstance.Icon = Icon;
    this.modalRef.componentInstance.textButton = textButton;
    return this.modalRef.result;
  }

  public assignPublisherWeeklyProgram(assignment?: WeeklyProgram, assignmentType?: string, type?: string, room: string = "A", brothersOnly = false) {
    this.modalRef = this.openWideModal();
    this.modalRef.componentInstance.modalType = ModalTypeEnums.ASSIGN_PUB;
    this.modalRef.componentInstance.assignment = assignment;
    this.modalRef.componentInstance.assignmentType = normalizeAssignmentTypeValue(assignmentType);
    this.modalRef.componentInstance.type = type;
    this.modalRef.componentInstance.room = room;
    this.modalRef.componentInstance.brothersOnly = brothersOnly;
    return this.modalRef.result;
  }

  public assignPublisherProgram(program: Program, assignmentType?: string) {
    this.modalRef = this.openWideModal();
    const normalizedAssignmentType = normalizeAssignmentTypeValue(assignmentType);
    this.modalRef.componentInstance.modalType = ModalTypeEnums.ASSIGN_PUB;
    this.modalRef.componentInstance.assignment = program.weeklyPrograms[0];
    this.modalRef.componentInstance.assignmentType = normalizedAssignmentType;
    this.modalRef.componentInstance.programSelection = true;
    this.modalRef.componentInstance.selectionTitle = this.getProgramSelectionTitle(normalizedAssignmentType);
    this.modalRef.componentInstance.currentPublisher = this.getProgramSelectionPublisher(program, normalizedAssignmentType);
    return this.modalRef.result;
  }

  private getProgramSelectionTitle(assignmentType: string): string {
    switch (assignmentType) {
      case AssignmentType.PRESIDENT:
        return MEETING_PARTS.PRESIDENT;
      case AssignmentType.OPENING_PRAYER:
        return MEETING_PARTS.OPENING_PRAYER;
      case AssignmentType.FINAL_PRAYER:
        return MEETING_PARTS.FINAL_PRAYER;
      case AssignmentType.ASSISTANT_ADVISER:
        return MEETING_PARTS.ASSISTANT_ADVISER;
      default:
        return "Asignación";
    }
  }

  private getProgramSelectionPublisher(program: Program, assignmentType: string): Publisher | null {
    switch (assignmentType) {
      case AssignmentType.PRESIDENT:
        return program.president ?? null;
      case AssignmentType.OPENING_PRAYER:
        return program.openingPrayer ?? null;
      case AssignmentType.FINAL_PRAYER:
        return program.finalPrayer ?? null;
      case AssignmentType.ASSISTANT_ADVISER:
        return program.assistantAdviser ?? null;
      default:
        return null;
    }
  }

  public changeSong(program: Program, song: string) {
    this.modalRef = this.openModal("vmc-modal-window--compact");
    this.modalRef.componentInstance.modalType = ModalTypeEnums.CHANGE_SONGS;
    this.modalRef.componentInstance.program = program;
    this.modalRef.componentInstance.song = song;
    return this.modalRef.result;
  }

  public selectedHour() {
    this.modalRef = this.openModal("vmc-modal-window--compact");
    this.modalRef.componentInstance.modalType = ModalTypeEnums.SELECT_HOUR;
    return this.modalRef.result;
  }
  public setTitleAndTime(item: WeeklyProgram) {
    this.modalRef = this.openModal("vmc-modal-window--form");
    this.modalRef.componentInstance.modalType = ModalTypeEnums.TITLE_AND_TIME;
    this.modalRef.componentInstance.assignment = item;
    return this.modalRef.result;
  }
  public printer() {
    this.modalRef = this.openPrintModal();
    this.modalRef.componentInstance.modalType = ModalTypeEnums.PRINTER;
    this.modalRef.componentInstance.isModal = true;
    return this.modalRef.result;
  }

  public printerAssig() {
    this.modalRef = this.openPrintModal();
    this.modalRef.componentInstance.modalType = ModalTypeEnums.PRINTER_ASSIG;
    this.modalRef.componentInstance.isModal = true;
    return this.modalRef.result;
  }

  public errorHandler(error: any, title: string) {
    this.modalRef = this.openModal("vmc-modal-window--compact");
    this.modalRef.componentInstance.modalType = ModalTypeEnums.ERROR;
    this.modalRef.componentInstance.errorType = ModalTitleEnums.ERROR;
    this.modalRef.componentInstance.errorMessage = error;
    this.modalRef.componentInstance.errorTitle = title;
    return this.modalRef.result;
  }
  public info(
    subtitle: string,
    message: string,
    title: ModalTitleEnums,
    type: ModalTypeEnums,
    textButton: ModalResponseEnums = ModalResponseEnums.CONTINUAR,
    icon: ModalIconEnums = ModalIconEnums.CHECK,
  ) {
    this.modalRef = this.openModal("vmc-modal-window--compact");
    this.modalRef.componentInstance.mensaje = message;
    this.modalRef.componentInstance.subTitle = subtitle;
    this.modalRef.componentInstance.titulo = title;
    this.modalRef.componentInstance.Icon = icon;
    this.modalRef.componentInstance.textButton = textButton;
    this.modalRef.componentInstance.modalType = type;
    return this.modalRef.result;
  }

  public loading() {
    this.modalRef = this.openModal("vmc-modal-window--compact");
    this.modalRef.componentInstance.modalType = ModalTypeEnums.LOADER;
    return this.modalRef.result;
  }
  public AddAssignment(program: Program, sectionMeeting: string) {
    this.modalRef = this.openWideModal();
    this.modalRef.componentInstance.modalType = ModalTypeEnums.ADDASSIG;
    this.modalRef.componentInstance.program = program;
    this.modalRef.componentInstance.sectionMeeting = sectionMeeting;
    return this.modalRef.result;
  }
  public selectPublisher() {
    this.modalRef = this.openWideModal();
    this.modalRef.componentInstance.modalType = ModalTypeEnums.SELECT_PUBLISHER;
    return this.modalRef.result;
  }

  public close() {
    if (this.modalRef) {
      this.modalRef.dismiss();
    }
  }
}
