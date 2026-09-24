import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from "@angular/core";
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
export class PrinterComponent implements OnInit, AfterViewInit, OnDestroy {
  fechaDesde: any;
  fechaHasta: any;

  @ViewChild("pdfViewerOnDemand") pdfViewerOnDemand: any;
  @ViewChild("pdfViewerAutoLoad") pdfViewerAutoLoad: any;
  @Output() onClosed = new EventEmitter();
  @Input() public isModal: boolean = false;
  @Input() public printOrientation: "normal" | "landscape" = "normal";
  private congregation!: Congregation;
  private subs: Subscription = new Subscription();
  private filtersModalRef?: NgbModalRef;
  private isFilterSearchActive = false;
  private filterSearchRequestId = 0;
  private pdfGenerationRequestId = 0;
  private pendingPdfSource: any = null;
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
  ) {}

  ngOnInit(): void {
    if (this.isModal) {
      this.type = this.printOrientation;
      this.initializePrintData();
      return;
    }

    this.subs.add(
      this.route.queryParamMap
        .pipe(
          map((params) => params.get("tipo")),
          distinctUntilChanged(),
        )
        .subscribe((tipo) => {
          this.type = tipo === "landscape" ? "landscape" : "normal";
          if (this.weeks.length > 0) {
            this.printMeetings(this.weeks);
          }
        }),
    );
    this.initializePrintData();
  }

  private initializePrintData(): void {
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

  ngAfterViewInit(): void {
    if (!this.pdfViewerAutoLoad) {
      return;
    }

    if (this.pendingPdfSource !== null) {
      this.pdfViewerAutoLoad.pdfSrc = this.pendingPdfSource;
      this.pendingPdfSource = null;
      this.pdfViewerAutoLoad.refresh();
    }
  }

  ngOnDestroy(): void {
    // Evita que visores ya cerrados regeneren el PDF cuando se imprime de nuevo.
    this.pdfGenerationRequestId++;
    this.subs.unsubscribe();
    this.filtersModalRef?.dismiss();
  }

  getWeeks() {
    if (this.congregation) {
      this.meetingsService.getWeeksValids(this.congregation.id).subscribe(
        (data) => {
          if (this.isFilterSearchActive) {
            return;
          }

          this.dataService.setMeeting(data);
        },
        (error) => {
          this.modalService.errorHandler("No se han podido obtener las semanas", "Error");
        },
      );
    }
  }

  printMeetings(weeks: ProgramPdf[]) {
    const requestId = ++this.pdfGenerationRequestId;
    const pdf = this.type === "landscape"
      ? this.printPDFLandScapeService.getBlob(weeks)
      : this.hasAssistantBOrResponsibleB(weeks)
        ? this.printService.getBlob(weeks)
        : this.printPdfOnePageService.getBlob(weeks);

    pdf
      .then((data) => {
        if (requestId === this.pdfGenerationRequestId) {
          this.updatePdfViewer(data);
        }
      })
      .catch((error) => {
        if (requestId === this.pdfGenerationRequestId) {
          console.error(error);
        }
      });
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
    this.isFilterSearchActive = true;
    const requestId = ++this.filterSearchRequestId;

    if (filtros) {
      this.fechaDesde = filtros.fechaDesde;
      this.fechaHasta = filtros.fechaHasta;
    }

    this.loaderService.showMatspinner();
    this.weeks = [];
    this.meetingsService.getProgramsByDateRange(this.fechaDesde, this.fechaHasta, this.congregation.id).subscribe({
      next: (data) => {
        if (requestId !== this.filterSearchRequestId) {
          return;
        }

        this.loaderService.hideMatspinner();
        this.weeks = this.dataService.makePDfVersion(data);
        this.printMeetings(this.weeks);
      },
      error: (error) => {
        if (requestId !== this.filterSearchRequestId) {
          return;
        }

        this.loaderService.hideMatspinner();
        this.modalService.errorHandler("No se han podido obtener los programas", "Error");
      },
    });
  }

  private updatePdfViewer(data: any): void {
    if (!this.pdfViewerAutoLoad) {
      this.pendingPdfSource = data;
      return;
    }

    this.pdfViewerAutoLoad.pdfSrc = data;
    this.pdfViewerAutoLoad.refresh();
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
