import { Injectable } from '@angular/core';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { SemanasMock } from 'src/app/pages/entre-semana/mocks/semanas.mock';
import { Assignment, Meeting, Program, WeeklyProgram } from '../../interfaces/reuniones.interface';
import { Utils } from 'src/app/shared/Utils';


@Injectable({
  providedIn: 'root'
})
export class PrintPdfService {
  private congregation = "ALBORADA";

  constructor(
  ) {
    (<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
  }
  numOrderService = "0000"
  config = {
    subTitleInvoice: "RECIBO DE GIRO",
    sizeQr: '140',
    textQR: "https://aex.com.co/",
    terms: ""
  }
  invoice: any = {
    prefix: "DSTA",
    id: "68467",
    client: "Estarlin enrique lopez",
    doumentNumber: "13206008",
    address: "Colombia",
    cellphone: "3204454846",
    email: "estarlin.elv@gmail.com",
    valueFrom: 50000,
    currencyFrom: 'COP',
    date: "02/02/2024 10:21am",
    beneficiaries: [
      {
        fullname: "Adriana Lopez",
        addres: "Venezuela",
        email: "adri@gmail.com",
        cellphone: "3204454846",
        doumentNumber: "17347687",
        bankName: "Banesco",
        accountType: "Corriennte",
        accountNumber: "01340327953271040096",
        valueTo: 438.60,
        currencyTo: "VES"

      },
      {
        fullname: "Adriana Lopez",
        addres: "Venezuela",
        email: "adri@gmail.com",
        cellphone: "3204454846",
        doumentNumber: "17347687",
        bankName: "Banesco",
        accountType: "Corriennte",
        accountNumber: "01340327953271040096",
        valueTo: 438.60,
        currencyTo: "VES"

      }
    ]
  }


  private makeHeader(pageBreak: boolean) {
    return [
      {
        table: {
          heights: [25],
          widths: [15, 'auto', '*', 20],
          body: [
            [{
              text: "", style: "header_a", border: [false, false, false, false]
            },
            {
              text: this.congregation, style: "header_a", border: [false, false, false, true]
            },
            {
              text: "Programa para la reunión de entre semana", style: "header_b", border: [false, false, false, true]
            },
            {
              text: "", style: "header_a", border: [false, false, false, false]
            }
            ]
          ]
        },
      },
    ]
  }
  private makeBody(week: Program) {
    return [
      {
        table: {
          widths: ['auto', 200, 110, '*'],
          body: [
            [
              {
                text: Utils.showDayOfMeeting(week.meeting.week) + " |", style: "sub_title", border: [false, false, false, false]
              },
              {
                text: "LECTURA SEMANAL DE LA BIBLIA", style: "sub_title", border: [false, false, false, false]
              },
              {
                text: "Presidente:", style: "tips_r", border: [false, false, false, false]
              },
              {
                text: week.president?.fullName, style: "tips_l", border: [false, false, false, false]
              }
            ],
            [
              {
                text: "", style: "sub_title", border: [false, false, false, false]
              },
              {
                text: "", style: "sub_title", border: [false, false, false, false]
              },
              {
                text: "", style: "tips_r", border: [false, false, false, false]
              },
              {
                text: "", style: "tips_l", border: [false, false, false, false]
              }
            ],
          ]
        },
      },
      {
        table: {
          widths: ['auto', 250, 100, '*'],
          body: [
            [
              {
                text: Utils.adapterTime(week.startTimeOpeningSong), style: "titles", border: [false, false, false, false]
              },
              {
                text: "• Canción " + week.meeting.openingSong, style: "titles", border: [false, false, false, false]
              },
              {
                text: "Oración:", style: "tips_r", border: [false, false, false, false]
              },
              {
                text: week.openingPrayer?.fullName, style: "tips_l", border: [false, false, false, false]
              }
            ],
            [
              {
                text: Utils.adapterTime(week.startTimeIntro), style: "titles", border: [false, false, false, false]
              },
              {
                text: `• Palabras de introducción ( ${week.meeting.introTime} ${week.meeting.timeType})`, style: "titles", border: [false, false, false, false]
              },
              {
                text: "", style: "tips_r", border: [false, false, false, false]
              },
              {
                text: "", style: "tips_l", border: [false, false, false, false]
              }
            ],
          ]
        },
      },
    ]
  }
  private makeHeaderTreasures() {
    return [
      {
        table: {
          heights: [5],
          widths: [270, 110, '*'],
          body: [
            [
              {
                text: "TESOROS DE LA BIBLIA", style: "treasures", border: [false, false, false, false], fillColor: '#2a6b77',
              },
              {
                text: "", style: "tips_r", border: [false, false, false, false]
              },
              {
                text: "Auditorio principal", style: "tips_c", border: [false, false, false, false]
              },
            ],
          ]
        },
      },
    ]
  }
  private makeContentTreasures(week: Program) {
    const treasures = week.weeklyProgram.filter((data: WeeklyProgram) => data.assignment.sectionMeeting == 'TESOROS DE LA BIBLIA')
    const content: any = [];
    treasures.forEach((asigment: WeeklyProgram) => {
      content.push(
        [
          {
            text: Utils.adapterTime(asigment.startTime), style: "titles", border: [false, false, false, false]
          },
          {
            text: `${asigment.assignment.number}. ${asigment.assignment.title} (${asigment.assignment.time} ${asigment.assignment.timeType})`, style: "fontTreasures", border: [false, false, false, false]
          },
          {
            text: asigment.assignment.showTips ? asigment.assignment.tips : null, style: "tips_r", border: [false, false, false, false]
          },
          {
            text: asigment.assistant ? asigment.responsible?.fullName + " / " + asigment.assistant.fullName : asigment.responsible?.fullName, style: "tips_l", border: [false, false, false, false]
          }
        ]
      )
    })
    return [
      {
        table: {
          widths: ['auto', 250, 100, '*'],
          body: content
        },
      },
    ]
  }

  private makeHeaderTeachers() {
    return [
      {
        table: {
          heights: [5],
          widths: [270, 110, '*'],
          body: [
            [
              {
                text: "SEAMOS MEJORES MAESTROS", style: "teachers", border: [false, false, false, false], fillColor: '#9b6d17',
              },
              {
                text: "", style: "tips_r", border: [false, false, false, false]
              },
              {
                text: "Auditorio principal", style: "tips_c", border: [false, false, false, false]
              },
            ],
          ]
        },
      },
    ]
  }
  private makeContentTeachers(week: Program) {
    const treasures = week.weeklyProgram.filter((data: WeeklyProgram) => data.assignment.sectionMeeting == 'SEAMOS MEJORES MAESTROS')
    const content: any = [];
    treasures.forEach((asigment: WeeklyProgram) => {
      content.push(
        [
          {
            text: Utils.adapterTime(asigment.startTime), style: "titles", border: [false, false, false, false]
          },
          {
            text: `${asigment.assignment.number}. ${asigment.assignment.title} (${asigment.assignment.time} ${asigment.assignment.timeType})`, style: "fontTeachers", border: [false, false, false, false]
          },
          {
            text: asigment.assignment.showTips ? asigment.assignment.tips : null, style: "tips_r", border: [false, false, false, false]
          },
          {
            text: asigment.assistant ? asigment.responsible?.fullName + " / " + asigment.assistant.fullName : asigment.responsible?.fullName, style: "tips_l", border: [false, false, false, false]
          }
        ]
      )
    })
    return [
      {
        table: {
          widths: ['auto', 250, 100, '*'],
          body: content
        },
      },
    ]
  }
  private makeHeaderLife() {
    return [
      {
        table: {
          heights: [5],
          widths: [270, 110, '*'],
          body: [
            [
              {
                text: "NUESTRA VIDA CRISTIANA", style: "life", border: [false, false, false, false], fillColor: '#942926',
              },
              {
                text: "", style: "tips_r", border: [false, false, false, false]
              },
              {
                text: "Auditorio principal", style: "tips_c", border: [false, false, false, false]
              },
            ],
          ]
        },
      },
    ]
  }
  private makeContentLife(week: Program) {
    const treasures = week.weeklyProgram.filter((data: WeeklyProgram) => data.assignment.sectionMeeting == 'NUESTRA VIDA CRISTIANA')
    const content: any = [];
    treasures.forEach((asigment: WeeklyProgram) => {
      content.push(
        [
          {
            text: Utils.adapterTime(asigment.startTime), style: "titles", border: [false, false, false, false]
          },
          {
            text: `${asigment.assignment.number}. ${asigment.assignment.title} (${asigment.assignment.time} ${asigment.assignment.timeType})`, style: "fontLife", border: [false, false, false, false]
          },
          {
            text: asigment.assignment.showTips ? asigment.assignment.tips : null, style: "tips_r", border: [false, false, false, false]
          },
          {
            text: asigment.assistant ? asigment.responsible?.fullName + " / " + asigment.assistant.fullName : asigment.responsible?.fullName, style: "tips_l", border: [false, false, false, false]
          }
        ]
      )
    })
    return [
      {
        table: {
          widths: ['auto', 250, 100, '*'],
          body: content
        },
      },
    ]
  }

  private makeIntermediateSong(week: Program) {
    return [
      {
        table: {
          widths: ['auto', 250, 100, '*'],
          body: [
            [
              {
                text: Utils.adapterTime(week.startTimeIntermediateSong), style: "titles", border: [false, false, false, false]
              },
              {
                text: "• Canción " + week.meeting.intermediateSong, style: "titles", border: [false, false, false, false]
              },
              {
                text: "", style: "tips_r", border: [false, false, false, false]
              },
              {
                text: "", style: "tips_l", border: [false, false, false, false]
              }
            ],
          ]
        },
      }
    ]
  }
  private makeFinalBlock(week: Program) {

    return [
      {
        table: {
          widths: ['auto', 250, 100, '*'],
          body: [
            [
              {
                text: Utils.adapterTime(week.startTimeConclusionWords), style: "titles", border: [false, false, false, false]
              },
              {
                text: "• Palabras de conclusión (3 min.)", style: "titles", border: [false, false, false, false]
              },
              {
                text: "", style: "tips_r", border: [false, false, false, false]
              },
              {
                text: "", style: "tips_l", border: [false, false, false, false]
              }
            ],
            [
              {
                text: Utils.adapterTime(week.startTimeFinalSong), style: "titles", border: [false, false, false, false]
              },
              {
                text: "• Canción " + week.meeting.finalSong, style: "titles", border: [false, false, false, false]
              },
              {
                text: "Oración", style: "tips_r", border: [false, false, false, false]
              },
              {
                text: week.finalPrayer?.fullName, style: "tips_l", border: [false, false, false, false]
              }
            ],
          ]
        },
        //pageBreak: 'after'
      },

    ]
  }


  public print(weeks: Program[]) {
    pdfMake.createPdf(this.makeDocumet(weeks)).open()
  }
  public download(weeks: Program[]) {
    pdfMake.createPdf(this.makeDocumet(weeks)).download('Nota - ' + this.invoice.prefix + this.invoice.id + '.pdf')
  }

  public getStream(weeks: Program[]) {
    pdfMake.createPdf(this.makeDocumet(weeks)).getStream()
  }

  public async getBlob(weeks: Program[]): Promise<Blob> {
    this.congregation = weeks[0].congregation.name
    return new Promise<Blob>((resolve, reject) => {
      const pdf = pdfMake.createPdf(this.makeDocumet(weeks));
      pdf.getBlob((data: Blob) => {
        resolve(data);
        if (!data) {
          reject("PrintPdfServiceget->Blob: No sea impreso nada. Revise el servicio");
        }
      });
    });
  }
  private makeDocumet(weeks: Program[]): any {
    const contenido: any[] = []
    let pageBreak = false;
    let count = 0;
    let pageCount=0
    weeks.forEach(week => {
      count++
      pageCount++
      contenido.push(
        ...this.makeBody(week),
        ...this.makeHeaderTreasures(),
        ...this.makeContentTreasures(week),
        "\n",
        ...this.makeHeaderTeachers(),
        ...this.makeContentTeachers(week),
        "\n",
        ...this.makeHeaderLife(),
        ...this.makeIntermediateSong(week),
        ...this.makeContentLife(week),
        ...this.makeFinalBlock(week),
         count == 1 ? "\n":"",
        { text: '', pageBreak: count == 2  && pageCount < weeks.length? 'before' : '', style: 'subheader' },

      )
      if (count == 2) {
        count = 0
      }
    })

    return {
      header: this.makeHeader(pageBreak)[0],
      pageSize: 'LETTER',
      // by default we use portrait, you can change it to landscape if you wish
      pageOrientation: 'portrait',
      // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
      pageMargins: [20, 30, 20, 20],

      content: [
        ...contenido
      ],
      ...this.styles()
    }
  }
  private styles() {
    return {
      styles: {
        header_a: {
          fontSize: 15,
          bold: true,
          margin: [0, 6, 0, 0]
        },
        header_b: {
          fontSize: 17,
          bold: true,
          alignment: 'right',
          margin: [0, 4, 0, 0]
        },
        sub_title: {
          fontSize: 11,
          alignment: 'left',
          bold: true,
        },
        tips_r: {
          fontSize: 7,
          //color: "#ea002e",
          bold: true,
          alignment: 'right',
          margin: [0, 4, 0, 0]
        },
        tips_l: {
          fontSize: 8,
          bold: true,
          color: "#ea002e",
          alignment: 'left',
          margin: [0, 2, 0, 0]
        },
        tips_c: {
          fontSize: 7,
          bold: true,
          alignment: 'left',
          color: "#b6b4b4",
          margin: [0, 0, 0, 0]
        },
        titles: {
          bold: true,
          fontSize: 9,
          margin: [0, 0, 0, 0],
        },

        treasures: {
          bold: true,
          fontSize: 8,
          color: "#fff",
          margin: [0, 0, 0, 0],
        },
        teachers: {
          bold: true,
          fontSize: 8,
          color: "#fff",
          margin: [0, 0, 0, 0],
        },
        life: {
          bold: true,
          fontSize: 8,
          color: "#fff",
          margin: [0, 0, 0, 0],
        },
        fontTreasures: {
          bold: true,
          fontSize: 9,
          color: "#2a6b77",
          margin: [0, 0, 0, 0],
        },
        fontTeachers: {
          bold: true,
          fontSize: 9,
          color: "#9b6d17",
          margin: [0, 0, 0, 0],
        },
        fontLife: {
          bold: true,
          fontSize: 9,
          color: "#942926",
          margin: [0, 3, 0, 0],
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
        tableItemLeft: {
          fontSize: 9,
          alignment: 'left',
        },
        tableItemCenter: {
          fontSize: 9,
          alignment: 'center',
        },
        tableItemRight: {
          fontSize: 9,
          alignment: 'right',
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
  }

}

