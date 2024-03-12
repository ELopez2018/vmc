import { Injectable } from '@angular/core';
import { Utils } from '@root/shared/utils';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { Subscription } from 'rxjs';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class PrintService {
  subs: Subscription = new Subscription();
  numOrderService = "0000"
  constructor(
  ) {
  }

  private makeHeader() {
    return [
      { text: 'AEX', style: 'header' },
    ]
  }

  private makeQCodeQr() {
    return [
      {
        qr: 'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines',
        fit: '200',
        eccLevel: 'H'
      }
    ]
  }


  private makeTable() {
    return [{
      //layout: 'lightHorizontalLines', // optional
      table: {
        // headers are automatically repeated if the table spans over multiple pages
        // you can declare how many rows should be treated as headers
        //headerRows: 1,
        //widths: ['*', 'auto', 100, '*'],
        widths: ['*', '*'],
        body: [
          [
            { text: 'DOCUMENTO', style: 'tabletitles', },
            { text: 'qr', style: 'tabletitles', },
          ],
          [
            {
              text: "descripcion", style: 'tableItem'
            },
            ...this.makeQCodeQr(),
          ],

        ]
      }
    }
    ]
  }

  public print() {
    const dd: any = {
      content: [
        ...this.makeHeader(),
        ...this.makeTable(),
        'First paragraph',
        'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
      ],
      styles: {
        header: {
          fontSize: 21,
          bold: true
        },
        titles: {
          bold: true,
          fontSize: 18,
          alignment: 'center',
        },
        subtitles: {
          bold: true,
          fontSize: 16,
          alignment: 'center',
        },
        subtitles2: {
          bold: true,
          fontSize: 16,
          alignment: 'center',
        },
        tabletitles: {
          fontSize: 10,
          alignment: 'center',
          fillColor: '#ddebf7',
        },
        tableItem: {
          fontSize: 10,
          alignment: 'center',
        },
        bold: {
          bold: true,
        },
        enfasis: {
          alignment: 'justify',
          bold: true,
          fontSize: 13,
        },

        normal: {
          alignment: 'justify',
          fontSize: 11,
        },
        small: {
          alignment: 'justify',
          fontSize: 10,
        },
        anotherStyle: {
          italics: true,
          alignment: 'right'
        }
      }
    }
    pdfMake.createPdf(dd).open()
  }
  download() {
    var dd = {
      content: [
        'First paragraph',
        'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
      ]

    }
    pdfMake.createPdf(dd).download('ORDEN DE SERVICIO ' + this.numOrderService + '.pdf')
  }
}

