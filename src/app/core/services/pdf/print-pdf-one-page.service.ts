import { Injectable } from "@angular/core";
import { Utils } from "src/app/shared/Utils";
import { ProgramPdf, WeeklyProgramPdF } from "../../interfaces/print-pdf.interface";
import { DataService } from "../data/data.service";

declare const pdfMake: any;

@Injectable({
  providedIn: "root",
})
export class PrintPdfOnePageService {
  private congregation = "ALBORADA";
  private colorFontPublisher = "#ea002e";
  private sizeHeader = [0, "auto", "*", 20];
  private sizeBody = [70, 185, 80, 10, "*"];
  private sizeSongs = [20, 235, 80, 10, "*"];
  private sizeHeaderSections = [350, 10, "*"];

  private sizeContenTreasure = [20, 300, 5, 20, "*"];
  private sizeContenTreasureReader = [20, 225, 90, 10, "*"];
  private sizeContenTeachers = [20, 235, 80, 5, "*"];
  private sizeContenLife = [20, 300, 5, 20, "*"];
  private sizeContenLifeEB = [20, 235, 85, 5, "*"];
  private dayMeet: any = null;
  constructor(private dataService: DataService) {
    this.dataService.getPublisher().subscribe((data) => {
      if (data) {
        this.colorFontPublisher = data.congregation.fontColorPublisher ?? "";
        this.dayMeet = data.congregation.day;
      }
    });
  }
  config = {
    subTitleInvoice: "RECIBO DE GIRO",
    sizeQr: "140",
    textQR: "https://aex.com.co/",
    terms: "",
  };
  invoice: any = {
    prefix: "DSTA",
    id: "68467",
    client: "Estarlin enrique lopez",
    doumentNumber: "13206008",
    address: "Colombia",
    cellphone: "3204454846",
    email: "estarlin.elv@gmail.com",
    valueFrom: 50000,
    currencyFrom: "COP",
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
        valueTo: 438.6,
        currencyTo: "VES",
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
        valueTo: 438.6,
        currencyTo: "VES",
      },
    ],
  };

  private makeHeader(pageBreak: boolean) {
    return [
      {
        table: {
          heights: [0],
          widths: this.sizeHeader,
          body: [
            [
              {
                text: "",
                style: "header_a",
                border: [false, false, false, false],
              },
              {
                text: this.congregation,
                style: "header_a",
                border: [false, false, false, true],
              },
              {
                text: "Programa para la reunión de entre semana",
                style: "header_b",
                border: [false, false, false, true],
              },
              {
                text: "",
                style: "header_a",
                border: [false, false, false, false],
              },
            ],
          ],
        },
      },
    ];
  }
  private makeHeaderProgram(week: ProgramPdf) {
    return [
      {
        table: {
          widths: this.sizeBody,
          body: [
            [
              {
                text: Utils.showDayOfMeeting(week.meeting.week, this.dayMeet) + " |",
                style: "sub_title",
                border: [false, false, false, false],
              },
              {
                text: week.meeting.weeklyBibleReading ? week.meeting.weeklyBibleReading : "LECTURA SEMANAL DE LA BIBLIA",
                style: "sub_title",
                border: [false, false, false, false],
              },
              {
                text: "Presidente:",
                style: "tips_r",
                border: [false, false, false, false],
              },
              {
                text: "",
                style: "tips_r",
                border: [false, false, false, false],
              },
              {
                text: week.president?.fullName.trim(),
                style: "tips_l",
                border: [false, false, false, false],
              },
            ],
          ],
        },
      },
      {
        table: {
          widths: this.sizeSongs,
          body: [
            [
              {
                text: Utils.adapterTime(week.startTimeOpeningSong),
                style: "titles",
                border: [false, false, false, false],
              },
              {
                text: "• Canción " + week.meeting.openingSong,
                style: "titles",
                border: [false, false, false, false],
              },
              {
                text: "Oración:",
                style: "tips_r",
                border: [false, false, false, false],
              },
              {
                text: "",
                style: "tips_r",
                border: [false, false, false, false],
              },
              {
                text: week.openingPrayer?.fullName.trim(),
                style: "tips_l",
                border: [false, false, false, false],
              },
            ],
            [
              {
                text: Utils.adapterTime(week.startTimeIntro),
                style: "titles",
                border: [false, false, false, false],
              },
              {
                text: `• Palabras de introducción ( ${week.meeting.introTime} ${week.meeting.timeType})`,
                style: "titles",
                border: [false, false, false, false],
              },
              {
                text: "",
                style: "tips_r",
                border: [false, false, false, false],
              },
              {
                text: "",
                style: "tips_r",
                border: [false, false, false, false],
              },
              {
                text: "",
                style: "tips_l",
                border: [false, false, false, false],
              },
            ],
          ],
        },
      },
    ];
  }
  private makeHeaderTreasures() {
    return [
      {
        table: {
          heights: [0],
          widths: this.sizeHeaderSections,
          body: [
            [
              {
                text: "TESOROS DE LA BIBLIA",
                style: "treasures",
                border: [false, false, false, false],
                fillColor: "#5F6366",
              },
              {
                text: "",
                style: "tips_r",
                border: [false, false, false, false],
              },
              {
                text: "Auditorio principal",
                style: "tips_c",
                border: [false, false, false, false],
              },
            ],
          ],
        },
      },
    ];
  }
  private makeContentTreasures(week: ProgramPdf) {
    const treasures = week.weeklyPrograms.filter((data: WeeklyProgramPdF) => data.assignment.sectionMeeting == "TESOROS DE LA BIBLIA");
    const content: any = [];
    treasures.forEach((asigment: WeeklyProgramPdF) => {
      if (asigment.assignment.number != 3) {
        content.push([
          {
            text: Utils.adapterTime(asigment.startTime),
            style: "titles",
            border: [false, false, false, false],
          },
          {
            text: `${asigment.assignment.number}. ${asigment.assignment.title} (${asigment.assignment.time} ${asigment.assignment.timeType})`,
            style: "fontTreasures",
            border: [false, false, false, false],
          },

          {
            text: asigment.assignment.showTips ? asigment.assignment.tips : null,
            style: "tips_r",
            border: [false, false, false, false],
          },
          {
            text: "",
            style: "tips_l",
            border: [false, false, false, false],
          },
          {
            text: asigment.assistant ? asigment.responsible?.fullName.trim() + " / " + asigment.assistant.fullName.trim() : asigment.responsible?.fullName.trim(),
            style: "tips_l",
            border: [false, false, false, false],
          },
        ]);
      }
    });
    return [
      {
        table: {
          heights: [0],
          widths: this.sizeContenTreasure,
          body: content,
        },
      },
    ];
  }
  private makeContentTreasuresReader(week: ProgramPdf) {
    const treasures = week.weeklyPrograms.filter((data: WeeklyProgramPdF) => data.assignment.sectionMeeting == "TESOROS DE LA BIBLIA");
    const content: any = [];
    treasures.forEach((asigment: WeeklyProgramPdF) => {
      if (asigment.assignment.number == 3) {
        content.push([
          {
            text: Utils.adapterTime(asigment.startTime),
            style: "titles",
            border: [false, false, false, false],
          },
          {
            text: `${asigment.assignment.number}. ${asigment.assignment.title} (${asigment.assignment.time} ${asigment.assignment.timeType})`,
            style: "fontTreasures",
            border: [false, false, false, false],
          },
          {
            text: asigment.assignment.showTips ? asigment.assignment.tips : null,
            style: "tips_r",
            border: [false, false, false, false],
          },
          {
            text: asigment.assistantB ? asigment.responsibleB?.fullName.trim() + " / " + asigment.assistantB.fullName.trim() : asigment.responsibleB?.fullName.trim(),
            style: "tips_l",
            border: [false, false, false, false],
          },
          {
            text: asigment.assistant ? asigment.responsible?.fullName.trim() + " / " + asigment.assistant.fullName.trim() : asigment.responsible?.fullName.trim(),
            style: "tips_l",
            border: [false, false, false, false],
          },
        ]);
      }
    });
    return [
      {
        table: {
          widths: this.sizeContenTreasureReader,
          body: content,
        },
      },
    ];
  }
  private makeHeaderTeachers() {
    return [
      {
        table: {
          heights: [0],
          widths: this.sizeHeaderSections,
          body: [
            [
              {
                text: "SEAMOS MEJORES MAESTROS",
                style: "teachers",
                border: [false, false, false, false],
                fillColor: "#C69200",
              },
              {
                text: "",
                style: "tips_c",
                border: [false, false, false, false],
              },
              {
                text: "Auditorio principal",
                style: "tips_c",
                border: [false, false, false, false],
              },
            ],
          ],
        },
      },
    ];
  }
  private makeContentTeachers(week: ProgramPdf) {
    const treasures = week.weeklyPrograms.filter((data: WeeklyProgramPdF) => data.assignment.sectionMeeting == "SEAMOS MEJORES MAESTROS");
    const content: any = [];
    treasures.forEach((asigment: WeeklyProgramPdF) => {
      content.push([
        {
          text: Utils.adapterTime(asigment.startTime),
          style: "titles",
          border: [false, false, false, false],
        },
        {
          text: `${asigment.assignment.number}. ${asigment.assignment.title} (${asigment.assignment.time} ${asigment.assignment.timeType})`,
          style: "fontTeachers",
          border: [false, false, false, false],
        },

        {
          text: asigment.assignment.showTips ? asigment.assignment.tips : null,
          style: "tips_r",
          border: [false, false, false, false],
        },
        {
          text: asigment.assistantB ? asigment.responsibleB?.fullName.trim() + " / " + asigment.assistantB.fullName.trim() : asigment.responsibleB?.fullName.trim(),
          style: "tips_l",
          border: [false, false, false, false],
        },
        {
          text: asigment.assistant ? asigment.responsible?.fullName.trim() + " / " + asigment.assistant.fullName.trim() : asigment.responsible?.fullName.trim(),
          style: "tips_l",
          border: [false, false, false, false],
        },
      ]);
    });
    return [
      {
        table: {
          widths: this.sizeContenTeachers,
          body: content,
        },
      },
    ];
  }
  private makeHeaderLife() {
    return [
      {
        table: {
          heights: [5],
          widths: this.sizeHeaderSections,
          body: [
            [
              {
                text: "NUESTRA VIDA CRISTIANA",
                style: "life",
                border: [false, false, false, false],
                fillColor: "#7A0026",
              },
              {
                text: "",
                style: "tips_r",
                border: [false, false, false, false],
              },
              {
                text: "",
                style: "tips_c",
                border: [false, false, false, false],
              },
            ],
          ],
        },
      },
    ];
  }
  private makeContentLife(week: ProgramPdf) {
    const treasures = week.weeklyPrograms.filter((data: WeeklyProgramPdF) => data.assignment.sectionMeeting == "NUESTRA VIDA CRISTIANA");
    const content: any = [];
    treasures.forEach((asigment: WeeklyProgramPdF) => {
      // if (asigment.assignment.title !== "Estudio bíblico de la congregación") {
      if (true) {
        content.push([
          {
            text: Utils.adapterTime(asigment.startTime),
            style: "titles",
            border: [false, false, false, false],
          },
          {
            text: `${asigment.assignment.number}. ${asigment.assignment.title} (${asigment.assignment.time} ${asigment.assignment.timeType})`,
            style: "fontLife",
            border: [false, false, false, false],
          },
          {
            text: "",
            style: "tips_r",
            border: [false, false, false, false],
          },
          {
            text: ``,
            style: "fontLife",
            border: [false, false, false, false],
          },
          {
            text: asigment.assistant ? asigment.responsible?.fullName.trim() + " / " + asigment.assistant.fullName.trim() : asigment.responsible?.fullName.trim(),
            style: "tips_l",
            border: [false, false, false, false],
          },
        ]);
      }
    });
    return [
      {
        table: {
          widths: this.sizeContenLife,
          body: content,
        },
      },
    ];
  }
  private makeContentLifeEstudyB(week: ProgramPdf) {
    const treasures = [...week.weeklyPrograms.filter((data: WeeklyProgramPdF) => data.assignment.sectionMeeting == "NUESTRA VIDA CRISTIANA")];
    let content: any[] = [];
    treasures.forEach((asigment: WeeklyProgramPdF) => {
      if (asigment.assignment.title.includes("Estudio bíblico de la congregación")) {
        content.push([
          {
            text: Utils.adapterTime(asigment.startTime),
            style: "titles",
            border: [false, false, false, false],
          },
          {
            text: `${asigment.assignment.number}. ${asigment.assignment.title} (${asigment.assignment.time} ${asigment.assignment.timeType})`,
            style: "fontLife",
            border: [false, false, false, false],
          },
          {
            text: asigment.assignment.showTips ? asigment.assignment.tips : null,
            style: "tips_r",
            border: [false, false, false, false],
          },
          {
            text: ``,
            style: "fontLife",
            border: [false, false, false, false],
          },
          {
            text: asigment.assistant ? asigment.responsible?.fullName.trim() + " / " + asigment.assistant.fullName.trim() : asigment.responsible?.fullName.trim(),
            style: "tips_l",
            border: [false, false, false, false],
          },
        ]);
      }
    });
    return [
      {
        table: {
          widths: this.sizeContenLifeEB,
          body: content,
        },
      },
    ];
  }
  private makeIntermediateSong(week: ProgramPdf) {
    return [
      {
        table: {
          widths: this.sizeSongs,
          body: [
            [
              {
                text: Utils.adapterTime(week.startTimeIntermediateSong),
                style: "titles",
                border: [false, false, false, false],
              },
              {
                text: "• Canción " + week.meeting.intermediateSong,
                style: "titles",
                border: [false, false, false, false],
              },
              {
                text: "",
                style: "tips_r",
                border: [false, false, false, false],
              },
              {
                text: "",
                style: "tips_l",
                border: [false, false, false, false],
              },
            ],
          ],
        },
      },
    ];
  }
  private makeFinalBlock(week: ProgramPdf) {
    return [
      {
        table: {
          widths: this.sizeSongs,
          body: [
            [
              {
                text: Utils.adapterTime(week.startTimeConclusionWords),
                style: "titles",
                border: [false, false, false, false],
              },
              {
                text: "• Palabras de conclusión (3 min.)",
                style: "titles",
                border: [false, false, false, false],
              },
              {
                text: "",
                style: "tips_r",
                border: [false, false, false, false],
              },
              {
                text: "",
                style: "tips_r",
                border: [false, false, false, false],
              },
              {
                text: "",
                style: "tips_l",
                border: [false, false, false, false],
              },
            ],
            [
              {
                text: Utils.adapterTime(week.startTimeFinalSong),
                style: "titles",
                border: [false, false, false, false],
              },
              {
                text: "• Canción " + week.meeting.finalSong,
                style: "titles",
                border: [false, false, false, false],
              },
              {
                text: "Oración",
                style: "tips_r",
                border: [false, false, false, false],
              },
              {
                text: "",
                style: "tips_r",
                border: [false, false, false, false],
              },
              {
                text: week.finalPrayer?.fullName.trim(),
                style: "tips_l",
                border: [false, false, false, false],
              },
            ],
          ],
        },
        //pageBreak: 'after'
      },
    ];
  }

  public print(weeks: ProgramPdf[]) {
    pdfMake.createPdf(this.makeDocumet(weeks)).open();
  }
  public download(weeks: ProgramPdf[]) {
    pdfMake.createPdf(this.makeDocumet(weeks)).download("Nota - " + this.invoice.prefix + this.invoice.id + ".pdf");
  }

  public getStream(weeks: ProgramPdf[]) {
    pdfMake.createPdf(this.makeDocumet(weeks)).getStream();
  }

  public async getBlob(weeks: ProgramPdf[]): Promise<Blob> {
    this.congregation = weeks[0].congregation.name;
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
  private makeDocumet(weeks: any[]): any {
    const contenido: any[] = [];
    let pageBreak = false;
    let count = 0;
    let pageCount = 0;
    if (!weeks || weeks.length < 1) return;

    weeks.forEach((week) => {
      count++;
      pageCount++;
      if (week.assembly == null) {
        contenido.push(
          ...this.makeHeaderProgram(week),
          ...this.makeHeaderTreasures(),
          ...this.makeContentTreasures(week),
          ...this.makeContentTreasuresReader(week),
          ...this.makeHeaderTeachers(),
          ...this.makeContentTeachers(week),
          ...this.makeHeaderLife(),
          ...this.makeIntermediateSong(week),
          ...this.makeContentLife(week),
          ...this.makeFinalBlock(week),
          { text: null, pageBreak: count == 2 && pageCount < weeks.length ? "before" : null, style: count == 1 ? "endPage" : null },
        );
      } else {
        contenido.push([
          {
            table: {
              widths: this.sizeBody,
              body: [
                [
                  {
                    text: Utils.showDayOfMeeting(week.meeting.week, this.dayMeet) + " |",
                    style: "sub_title",
                    border: [false, false, false, false],
                  },
                  {
                    text: "LECTURA SEMANAL DE LA BIBLIA",
                    style: "sub_title",
                    border: [false, false, false, false],
                  },
                ],
              ],
            },
          },
          {
            table: {
              widths: ["*"],
              body: [
                [
                  {
                    text: week.assembly,
                    style: "assembly",
                    border: [true, true, true, true],
                  },
                ],
              ],
            },
          },
          count == 1 ? "\n" : "",
          { text: "", pageBreak: count == 2 && pageCount < weeks.length ? "before" : "", style: count == 1 ? "endPage" : "" },
        ]);
      }

      if (count == 2) {
        count = 0;
      }
    });

    return {
      header: this.makeHeader(pageBreak),
      pageSize: "LETTER",
      // by default we use portrait, you can change it to landscape if you wish
      pageOrientation: "portrait",
      // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
      pageMargins: [20, 30, 20, 0],

      content: [...contenido],
      ...this.styles(),
    };
  }
  private styles() {
    return {
      styles: {
        header_a: {
          fontSize: 15,
          bold: true,
          margin: [0, 6, 0, 0],
        },
        header_b: {
          fontSize: 17,
          bold: true,
          alignment: "right",
          margin: [0, 4, 0, 0],
        },
        sub_title: {
          fontSize: 11,
          alignment: "left",
          bold: true,
        },
        tips_r: {
          fontSize: 7,
          bold: true,
          alignment: "right",
          margin: [0, 3, 0, 0],
        },
        tips_l: {
          fontSize: 9,
          bold: true,
          color: this.colorFontPublisher,
          alignment: "left",
          margin: [0, 2, 0, 0],
        },
        tips_c: {
          fontSize: 8,
          bold: true,
          alignment: "left",
          color: "#b6b4b4",
          margin: [0, 4, 0, 0],
        },
        titles: {
          bold: true,
          fontSize: 9,
          margin: [0, 0, 0, 0],
        },

        treasures: {
          bold: true,
          fontSize: 10,
          color: "#fff",
          margin: [0, 0, 0, 0],
        },
        teachers: {
          bold: true,
          fontSize: 10,
          color: "#fff",
          margin: [0, 0, 0, 0],
        },
        life: {
          bold: true,
          fontSize: 10,
          color: "#fff",
          margin: [0, 0, 0, 0],
        },
        fontTreasures: {
          bold: true,
          fontSize: 9,
          color: "#5F6366",
          margin: [0, 0, 0, 0],
        },
        fontTeachers: {
          bold: true,
          fontSize: 9,
          color: "#C69200",
          margin: [0, 0, 0, 0],
        },
        fontLife: {
          bold: true,
          fontSize: 9,
          color: "#7A0026",
          margin: [0, 0, 0, 0],
        },
        subtitles2: {
          bold: true,
          fontSize: 16,
          alignment: "center",
        },
        tabletitles: {
          fontSize: 10,
          alignment: "center",
          fillColor: "#ddebf7",
        },
        tableItemLeft: {
          fontSize: 9,
          alignment: "left",
        },
        tableItemCenter: {
          fontSize: 9,
          alignment: "center",
        },
        tableItemRight: {
          fontSize: 9,
          alignment: "right",
        },
        bold: {
          bold: true,
        },
        enfasis: {
          alignment: "justify",
          bold: true,
          fontSize: 13,
        },

        normal: {
          alignment: "justify",
          fontSize: 11,
        },
        small: {
          alignment: "justify",
          fontSize: 10,
        },
        anotherStyle: {
          italics: true,
          alignment: "right",
        },
        assembly: {
          fontSize: 30,
          italics: true,
          alignment: "center",
          margin: [10, 50, 10, 50],
        },
        endPage: {
          margin: [0, 0, 0, 0],
        },
      },
    };
  }
}
