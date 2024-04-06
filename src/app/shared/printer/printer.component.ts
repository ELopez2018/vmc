import { Component, OnInit, ViewChild } from '@angular/core';
import { PrintPdfService } from '../../core/services/pdf/print.service';
import { MeetingsService } from '../../core/services/meetings/meetings.service';
import { Meeting } from 'src/app/core/interfaces/reuniones.interface';
import { DataService } from '../../core/services/data/data.service';

@Component({
  selector: 'app-printer',
  templateUrl: './printer.component.html',
  styleUrls: ['./printer.component.scss']
})
export class PrinterComponent implements OnInit {
  @ViewChild('pdfViewerOnDemand') pdfViewerOnDemand: any;
  @ViewChild('pdfViewerAutoLoad') pdfViewerAutoLoad: any;

  constructor(private printService: PrintPdfService,
    private meetingsService: MeetingsService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.dataService.getMeeting().subscribe(data => {
      if (data && data.length > 0) {
        this.printMeetings(data)
      } else {
        this.meetingsService.getAllWeek().subscribe(data => {
          this.printMeetings(data)
        })

      }
    })

  }

  printMeetings(weeks: Meeting[]) {
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
