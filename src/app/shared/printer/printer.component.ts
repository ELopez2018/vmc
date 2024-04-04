import { Component, OnInit, ViewChild } from '@angular/core';
import { PrintPdfService } from '../../core/services/pdf/print.service';
import { MeetingsService } from '../../core/services/meetings/meetings.service';
import { Week } from 'src/app/core/interfaces/reuniones.interface';

@Component({
  selector: 'app-printer',
  templateUrl: './printer.component.html',
  styleUrls: ['./printer.component.scss']
})
export class PrinterComponent implements OnInit {
  @ViewChild('pdfViewerOnDemand') pdfViewerOnDemand: any;
  @ViewChild('pdfViewerAutoLoad') pdfViewerAutoLoad: any;

  constructor(private printService: PrintPdfService,
    private meetingsService: MeetingsService
    ) { }

  ngOnInit(): void {
    this.meetingsService.getAllWeek().subscribe(data=>{
      this.printVoucher(data)
    })

  }

  printVoucher(weeks: Week[]) {
    this.printService.getBlob(weeks)
      .then(data => {
        this.pdfViewerAutoLoad.pdfSrc = data
        this.pdfViewerAutoLoad.refresh()
      })
      .catch(error => {
        console.error(error);
      })
  }

  download(){
    const dataIpm: any = {

    }
    this.printService.download(dataIpm)
  }


}
