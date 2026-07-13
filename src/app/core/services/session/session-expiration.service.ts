import { Injectable, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ModalIconEnums, ModalResponseEnums, ModalTitleEnums, ModalTypeEnums } from "../../enums/modal.enums";
import { DataService } from "../data/data.service";
import { ModalService } from "../modal/modal.service";

@Injectable({
  providedIn: "root",
})
export class SessionExpirationService {
  private isHandlingExpiredSession = false;

  constructor(
    private dataService: DataService,
    private modalService: ModalService,
    private ngbModal: NgbModal,
    private ngZone: NgZone,
    private router: Router,
  ) {}

  public notifyExpiredSession(): void {
    if (this.isHandlingExpiredSession) {
      return;
    }

    this.isHandlingExpiredSession = true;
    this.dataService.clearSession();
    this.ngbModal.dismissAll("session-expired");

    setTimeout(() => {
      this.ngZone.run(() => {
        this.ngbModal.dismissAll("session-expired");
        this.modalService
          .info(
            "Sesión vencida",
            "Tu sesión venció o el token ya no es válido. Por favor ingresa nuevamente.",
            ModalTitleEnums.INFORMACION,
            ModalTypeEnums.INFO,
            ModalResponseEnums.OK,
            ModalIconEnums.INFO,
          )
          .finally(() => {
            this.ngZone.run(() => {
              this.isHandlingExpiredSession = false;
              this.router.navigate(["/inicio"], { replaceUrl: true });
            });
          });
      });
    });
  }
}
