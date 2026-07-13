import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from "@angular/core";
import { PrintPdfService } from "../../core/services/pdf/print.service";
import { MeetingsService } from "../../core/services/meetings/meetings.service";
import { Meeting, Program } from "src/app/core/interfaces/reuniones.interface";
import { DataService } from "../../core/services/data/data.service";
import { ModalService } from "../../core/services/modal/modal.service";
import { Congregation } from "../../core/interfaces/reuniones.interface";
import { ProgramPdf } from "src/app/core/interfaces/print-pdf.interface";
import { distinctUntilChanged, map, Subscription } from "rxjs";
import { PrintPdfOnePageService } from "src/app/core/services/pdf/print-pdf-one-page.service";
import { LoaderService } from "src/app/core/services/loader/loader.service";
import { PrintPdfLandscapeService } from "src/app/core/services/pdf/print-pdf-landscape.service";
import { ActivatedRoute } from "@angular/router";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-printer",
  templateUrl: "./printer.component.html",
  styleUrls: ["./printer.component.scss"],
  standalone: false,
})
export class PrinterComponent implements OnInit {
  fechaDesde: any;
  fechaHasta: any;

  @ViewChild("pdfViewerOnDemand") pdfViewerOnDemand: any;
  @ViewChild("pdfViewerAutoLoad") pdfViewerAutoLoad: any;
  @Output() onClosed = new EventEmitter();
  @Input() public isModal: boolean = false;
  private congregation!: Congregation;
  private subs: Subscription = new Subscription();
  private filtersModalRef?: NgbModalRef;
  public type: string = "normal";
  public weeks: ProgramPdf[] = [];
  constructor(
    private printService: PrintPdfService,
    private printPDFLandScapeService: PrintPdfLandscapeService,
    private meetingsService: MeetingsService,
    private dataService: DataService,
    private modalService: ModalService,
    private printPdfOnePageService: PrintPdfOnePageService,
    private loaderService: LoaderService,
    private route: ActivatedRoute,
    private ngbModal: NgbModal,
  ) {
    this.modalService.loading();
    this.subs.add(
      this.dataService.getCongregation$().subscribe((data) => {
        this.congregation = data;
      }),
    );
    this.subs.add(
      this.dataService.getMeetingsPDF$().subscribe(
        (data) => {
          if (data && data.length > 0) {
            this.modalService.close();
            this.weeks = data;
            this.printMeetings(this.weeks);
          } else {
            this.getWeeks();
          }
        },
        (error) => {
          this.modalService.errorHandler(error, "Error");
        },
      ),
    );
  }

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(
        map((params) => params.get("tipo")),
        distinctUntilChanged(),
      )
      .subscribe((tipo) => {
        this.type = tipo ?? "normal";
        this.printMeetings(this.weeks);
      });
  }

  getWeeks() {
    if (this.congregation) {
      this.meetingsService.getWeeksValids(this.congregation.id).subscribe(
        (data) => {
          this.modalService.close();
          this.dataService.setMeeting(data);
        },
        (error) => {
          this.modalService.close();
          this.modalService.errorHandler("No se han podido obtener las semanas", "Error");
        },
      );
    }
  }

  printMeetings(weeks: ProgramPdf[]) {
    this.modalService.close();
    if (this.hasAssistantBOrResponsibleB(weeks)) {
      switch (this.type) {
        case "landscape":
          this.printPDFLandScapeService
            .getBlob(weeks)
            .then((data) => {
              this.pdfViewerAutoLoad.pdfSrc = data;
              this.pdfViewerAutoLoad.refresh();
            })
            .catch((error) => {
              console.error(error);
            });
          break;
        default:
          this.printService
            .getBlob(weeks)
            .then((data) => {
              this.pdfViewerAutoLoad.pdfSrc = data;
              this.pdfViewerAutoLoad.refresh();
            })
            .catch((error) => {
              console.error(error);
            });
      }
    } else {
      this.printPdfOnePageService
        .getBlob(weeks)
        .then((data) => {
          this.pdfViewerAutoLoad.pdfSrc = data;
          this.pdfViewerAutoLoad.refresh();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  hasAssistantBOrResponsibleB(data: ProgramPdf[]): boolean {
    return data.some((root) => root.weeklyPrograms.some((program) => program.assistantB !== undefined || program.responsibleB !== undefined));
  }

  download() {
    const dataIpm: any = {};
    this.printService.download(dataIpm);
  }

  onCLose() {
    this.onClosed.emit(true);
  }
  consultar(filtros?: { fechaDesde: any; fechaHasta: any }) {
    if (filtros) {
      this.fechaDesde = filtros.fechaDesde;
      this.fechaHasta = filtros.fechaHasta;
    }

    this.loaderService.showMatspinner();
    this.meetingsService.getProgramsByDateRange(this.fechaDesde, this.fechaHasta, this.congregation.id).subscribe({
      next: (data) => {
        this.loaderService.hideMatspinner();
        this.printMeetings(this.dataService.makePDfVersion(data));
      },
      error: (error) => {
        this.loaderService.hideMatspinner();
        this.modalService.errorHandler("No se han podido obtener los programas", "Error");
      },
    });
  }

  public openFiltersModal(content: TemplateRef<unknown>): void {
    this.filtersModalRef = this.ngbModal.open(content, {
      backdrop: "static",
      centered: true,
      animation: true,
      fullscreen: "sm",
      windowClass: "program-filter-modal-window",
    });
  }

  public closeFiltersModal(): void {
    this.filtersModalRef?.dismiss();
    this.filtersModalRef = undefined;
  }

  public onFiltersSelected(filtros: { fechaDesde: any; fechaHasta: any }): void {
    this.consultar(filtros);
    this.filtersModalRef?.close();
    this.filtersModalRef = undefined;
  }
}
