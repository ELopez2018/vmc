import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { PrintPdfService } from "../../core/services/pdf/print.service";
import { MeetingsService } from "../../core/services/meetings/meetings.service";
import { Meeting, Program } from "src/app/core/interfaces/reuniones.interface";
import { DataService } from "../../core/services/data/data.service";
import { ModalService } from "../../core/services/modal/modal.service";
import { Congregation } from "../../core/interfaces/reuniones.interface";
import { ProgramPdf } from "src/app/core/interfaces/print-pdf.interface";
import { Subscription } from "rxjs";
import { PrintPdfOnePageService } from "src/app/core/services/pdf/print-pdf-one-page.service";
import { LoaderService } from "src/app/core/services/loader/loader.service";

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
  constructor(
    private printService: PrintPdfService,
    private meetingsService: MeetingsService,
    private dataService: DataService,
    private modalService: ModalService,
    private printPdfOnePageService: PrintPdfOnePageService,
    private loaderService: LoaderService,
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
      // console.log("printService");
      this.printService
        .getBlob(weeks)
        .then((data) => {
          this.pdfViewerAutoLoad.pdfSrc = data;
          this.pdfViewerAutoLoad.refresh();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // console.log("printPdfOnePageService");
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
  consultar() {
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
}
