import { Component, OnInit, ViewChild } from '@angular/core';
import { PrintPdfService } from '../../core/services/pdf/print.service';
import { MeetingsService } from '../../core/services/meetings/meetings.service';
import { Meeting, Program } from 'src/app/core/interfaces/reuniones.interface';
import { DataService } from '../../core/services/data/data.service';
import { ModalService } from '../../core/services/modal/modal.service';
import { Congregation } from '../../core/interfaces/reuniones.interface';
import { ProgramPdf } from 'src/app/core/interfaces/print-pdf.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-printer',
  templateUrl: './printer.component.html',
  styleUrls: ['./printer.component.scss']
})
export class PrinterComponent implements OnInit {
  @ViewChild('pdfViewerOnDemand') pdfViewerOnDemand: any;
  @ViewChild('pdfViewerAutoLoad') pdfViewerAutoLoad: any;
  private congregation!: Congregation
  private subs: Subscription = new Subscription();
  constructor(private printService: PrintPdfService,
    private meetingsService: MeetingsService,
    private dataService: DataService,
    private modalService: ModalService
  ) {
    this.subs.add(
      this.dataService.getCongregation$().subscribe(data => {
        this.congregation = data;
      })
    )
    this.subs.add(
      this.dataService.getMeetingsPDF$().subscribe(data => {
        if (data && data.length > 0) {
          this.printMeetings(data)
        } else {
          this.modalService.loading()
          this.getWeeks()
        }
      }, error => {
        this.modalService.errorHandler(error, "Error")
      })
    )
  }

  ngOnInit(): void {
  }

  getWeeks() {
    if (this.congregation) {
      this.meetingsService.getWeeksValids(this.congregation.id).subscribe(data => {
        this.dataService.setMeeting(data)
        this.modalService.close()
      }, error => {
        this.modalService.close()
        this.modalService.errorHandler("No se han podido obtener las semanas", "Error")
      })
    }
  }

  printMeetings(weeks: ProgramPdf[]) {
    this.printService.getBlob(weeks)
      .then(data => {
        this.pdfViewerAutoLoad.pdfSrc = data
        this.pdfViewerAutoLoad.refresh()
      })
      .catch(error => {
        console.error(error);
      })
  }

  download() {
    const dataIpm: any = {

    }
    this.printService.download(dataIpm)
  }


}
