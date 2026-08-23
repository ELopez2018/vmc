import { Component, EventEmitter, inject, Input, OnInit, Output, TemplateRef, ViewChild } from "@angular/core";
import { PrintPdfService } from "../../core/services/pdf/print.service";
import { MeetingsService } from "../../core/services/meetings/meetings.service";
import { DataService } from "../../core/services/data/data.service";
import { ModalService } from "../../core/services/modal/modal.service";
import { Congregation } from "../../core/interfaces/reuniones.interface";
import { ProgramPdf } from "src/app/core/interfaces/print-pdf.interface";
import { Subscription } from "rxjs";
import { IconCloseComponent } from "../modal/modal-container/search-publisher/icon-close/icon-close.component";
import { PdfJsViewerModule } from "ng2-pdfjs-viewer";
import { PrintS89FromProgramService } from "src/app/core/services/pdf/print-s89-four-per-page.service";
import { LoaderService } from "src/app/core/services/loader/loader.service";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ProgramFiltersComponent } from "../components/program-filters/program-filters.component";

@Component({
  selector: "app-assignment-sheet-printer",
  templateUrl: "./assignment-sheet-printer.component.html",
  styleUrls: ["./assignment-sheet-printer.component.scss"],
  standalone: true,
  imports: [PdfJsViewerModule, ProgramFiltersComponent],
})
export class AssignmentSheetPrinterComponent implements OnInit {
  loaderService = inject(LoaderService);
  @ViewChild("pdfViewerOnDemand") pdfViewerOnDemand: any;
  @ViewChild("pdfViewerAutoLoad") pdfViewerAutoLoad: any;
  @Output() onClosed = new EventEmitter();
  @Input() public isModal: boolean = false;
  private congregation!: Congregation;
  private subs: Subscription = new Subscription();
  private filtersModalRef?: NgbModalRef;
  private isFilterSearchActive = false;
  private filterSearchRequestId = 0;
  public fechaDesde: any;
  public fechaHasta: any;
  constructor(
    private printService: PrintPdfService,
    private meetingsService: MeetingsService,
    private dataService: DataService,
    private modalService: ModalService,
    private printS89FromProgramService: PrintS89FromProgramService,
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
          if (this.isFilterSearchActive) {
            return;
          }

          if (data && data.length > 0) {
            this.modalService.close();
            this.printMeetings(data);
          } else {
            console.log("No hay data");
            this.getWeeks();
          }
        },
        (error) => {
          this.modalService.errorHandler(error, "Error");
        },
      ),
    );
  }

  ngOnInit(): void {}

  getWeeks() {
    if (this.congregation) {
      this.meetingsService.getWeeksValids(this.congregation.id).subscribe(
        (data) => {
          if (this.isFilterSearchActive) {
            return;
          }

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
    this.printS89FromProgramService
      .getBlob(weeks)
      .then((data) => this.updatePdfViewer(data))
      .catch((error) => {
        console.error(error);
      });
  }

  hasAssistantBOrResponsibleB(data: ProgramPdf[]): boolean {
    return data.some((root) => root.weeklyPrograms.some((program) => program.assistantB !== undefined || program.responsibleB !== undefined));
  }

  updatePdfViewer(data: any) {
    this.pdfViewerAutoLoad.pdfSrc = data;
    this.pdfViewerAutoLoad.refresh();
  }

  download() {
    const dataIpm: any = {};
    this.printService.download(dataIpm);
  }

  onCLose() {
    this.onClosed.emit(true);
  }
  consultar(filtros?: { fechaDesde: any; fechaHasta: any }) {
    this.isFilterSearchActive = true;
    const requestId = ++this.filterSearchRequestId;

    if (filtros) {
      this.fechaDesde = filtros.fechaDesde;
      this.fechaHasta = filtros.fechaHasta;
    }

    this.loaderService.showMatspinner();
    this.updatePdfViewer([]);
    this.meetingsService.getProgramsByDateRange(this.fechaDesde, this.fechaHasta, this.congregation.id).subscribe({
      next: (data) => {
        if (requestId !== this.filterSearchRequestId) {
          return;
        }

        this.printMeetings(this.dataService.makePDfVersion(data));
        this.loaderService.hideMatspinner();
      },
      error: (error) => {
        if (requestId !== this.filterSearchRequestId) {
          return;
        }

        this.updatePdfViewer([]);
        this.loaderService.hideMatspinner();
        this.modalService.errorHandler(error, "Error");
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
