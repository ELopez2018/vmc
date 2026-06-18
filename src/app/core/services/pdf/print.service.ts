import { Injectable } from "@angular/core";
import { Utils } from "src/app/shared/Utils";
import { ProgramPdf, WeeklyProgramPdF } from "../../interfaces/print-pdf.interface";
import { DataService } from "../data/data.service";
declare const pdfMake: any;

@Injectable({
  providedIn: "root",
})
export class PrintPdfService {
  private congregation = "ALBORADA";
  private colorFontPublisher = "#ea002e";

  private sizeHeader = [10, "auto", "*", 20];
  private sizeBody = [200, "*", 150, 126];
  private sizeSongs = [16, 244, 150, "*"];
  private sizeHeaderSections = [275, 143, "*"];

  private sizeContenTreasure = [16, 238, 0, 146, "*"];
  private sizeContenTreasureReaders = [16, 214, 30, 140, "*"];

  private sizeContenTeachers = [16, 185, 60, 139, "*"];

  private sizeContenLife = [16, 258, 0, 126, "*"];
  private dayMeet: any = null;
  constructor(private dataService: DataService) {
    this.dataService.getPublisher().subscribe((data) => {
      if (data) {
        this.colorFontPublisher = data.congregation.fontColorPublisher ?? "";
        this.dayMeet = data.congregation.day;
      }
    });
  }

  private verifiRoomB(array: WeeklyProgramPdF[]): boolean {
    return array.some((item) => item.responsibleB != null);
  }
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
    const song = week.meeting.initialSong
      ? week.meeting.initialSong.songNumber + " " + week.meeting.initialSong.title + " (" + week.meeting.initialSong.source + ")"
      : week.meeting.openingSong;
    const roomB = this.verifiRoomB(week.weeklyPrograms);
    let conAux = [];
    if (roomB) {
      conAux = [
        [
          {
            text:
              Utils.showDayOfMeeting(week.meeting.week, this.dayMeet, true) +
              " | " +
              (week.meeting.weeklyBibleReading ? week.meeting.weeklyBibleReading : "LECTURA SEMANAL DE LA BIBLIA"),
            style: "sub_title",
            border: [false, false, false, false],
          },
          {
            text: "",
            style: "sub_title",
            border: [false, false, false, false],
          },
          {
            text: "Presidente:",
            style: "tips_r",
            border: [false, false, false, false],
          },
          {
            text: week.president?.fullName,
            style: "tips_l",
            border: [false, false, false, false],
          },
        ],
        [
          {
            text: "",
            style: "sub_title",
            border: [false, false, false, false],
          },
          {
            text: "",
            style: "sub_title",
            border: [false, false, false, false],
          },
          {
            text: "Consejero de la sala auxiliar:",
            style: "tips_r",
            border: [false, false, false, false],
          },
          {
            text: week.assistantAdviser?.fullName,
            style: "tips_l",
            border: [false, false, false, false],
          },
        ],
      ];
    } else {
      conAux = [
        [
          {
            text:
              Utils.showDayOfMeeting(week.meeting.week, this.dayMeet, true) +
              " | " +
              (week.meeting.weeklyBibleReading ? week.meeting.weeklyBibleReading : "LECTURA SEMANAL DE LA BIBLIA"),
            style: "sub_title",
            border: [false, false, false, false],
          },
          {
            text: "",
            style: "sub_title",
            border: [false, false, false, false],
          },
          {
            text: "Presidente:",
            style: "tips_r",
            border: [false, false, false, false],
          },
          {
            text: week.president?.fullName,
            style: "tips_l",
            border: [false, false, false, false],
          },
        ],
      ];
    }

    return [
      {
        table: {
          heights: [0],
          widths: this.sizeBody,
          body: [...conAux],
        },
      },
      {
        table: {
          heights: [0],
          widths: this.sizeSongs,
          body: [
            [
              {
                text: Utils.adapterTime(week.startTimeOpeningSong),
                style: "titles",
                border: [false, false, false, false],
              },
              {
                text: "• Canción " + song,
                style: "titles",
                border: [false, false, false, false],
              },
              {
                text: "Oración:",
                style: "tips_r",
                border: [false, false, false, false],
              },
              {
                text: week.openingPrayer?.fullName,
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
                text: "Sala Auxiliar",
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
            text: asigment.assistantB ? asigment.responsibleB?.fullName + " / " + asigment.assistantB.fullName : asigment.responsibleB?.fullName,
            style: "tips_l",
            border: [false, false, false, false],
          },
          {
            text: asigment.assistant ? asigment.responsible?.fullName + " / " + asigment.assistant.fullName : asigment.responsible?.fullName,
            style: "tips_l",
            border: [false, false, false, false],
          },
        ]);
      }
    });
    return [
      {
        table: {
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
            text: asigment.assistantB ? asigment.responsibleB?.fullName + " / " + asigment.assistantB.fullName : asigment.responsibleB?.fullName,
            style: "tips_l",
            border: [false, false, false, false],
          },
          {
            text: asigment.assistant ? asigment.responsible?.fullName + " / " + asigment.assistant.fullName : asigment.responsible?.fullName,
            style: "tips_l",
            border: [false, false, false, false],
          },
        ]);
      }
    });
    return [
      {
        table: {
          widths: this.sizeContenTreasureReaders,
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
                text: "Sala Auxiliar",
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
          text: asigment.assistantB ? asigment.responsibleB?.fullName + " / " + asigment.assistantB.fullName : asigment.responsibleB?.fullName,
          style: "tips_l",
          border: [false, false, false, false],
        },
        {
          text: asigment.assistant ? asigment.responsible?.fullName + " / " + asigment.assistant.fullName : asigment.responsible?.fullName,
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
          text: ``,
          style: "fontLife",
          border: [false, false, false, false],
        },
        {
          text: asigment.assignment.showTips ? asigment.assignment.tips : null,
          style: "tips_r",
          border: [false, false, false, false],
        },
        {
          text: asigment.assistant ? asigment.responsible?.fullName + " / " + asigment.assistant.fullName : asigment.responsible?.fullName,
          style: "tips_l",
          border: [false, false, false, false],
        },
      ]);
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
  private makeIntermediateSong(week: ProgramPdf) {
    const song = week.meeting.middleSong
      ? week.meeting.middleSong.songNumber + " " + week.meeting.middleSong.title + " (" + week.meeting.middleSong.source + ")"
      : week.meeting.intermediateSong;
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
                text: "• Canción " + song,
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
    const song = week.meeting.lastSong ? week.meeting.lastSong.songNumber + " " + week.meeting.lastSong.title + " (" + week.meeting.lastSong.source + ")" : week.meeting.finalSong;
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
                text: "• Canción " + song,
                style: "titles",
                border: [false, false, false, false],
              },
              {
                text: "Oración",
                style: "tips_r",
                border: [false, false, false, false],
              },
              {
                text: week.finalPrayer?.fullName,
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
    pdfMake.createPdf(this.makeDocument(weeks)).open("Reunion Entre senama VMC.pdf");
  }
  public download(weeks: ProgramPdf[]) {
    pdfMake.createPdf(this.makeDocument(weeks)).download("Reunion Entre senama VMC.pdf");
  }

  public getStream(weeks: ProgramPdf[]) {
    pdfMake.createPdf(this.makeDocument(weeks)).getStream();
  }

  public async getBlob(weeks: ProgramPdf[]): Promise<Blob> {
    this.congregation = weeks[0].congregation.name;
    return new Promise<Blob>((resolve, reject) => {
      const pdf = pdfMake.createPdf(this.makeDocument(weeks));
      pdf.getBlob((data: Blob) => {
        resolve(data);
        if (!data) {
          reject("PrintPdfServiceget->Blob: No sea impreso nada. Revise el servicio");
        }
      });
    });
  }
  private makeDocument(weeks: ProgramPdf[]): any {
    const contenido: any[] = [];

    weeks.forEach((week, index) => {
      const isLast = index === weeks.length - 1;
      const isSecondInPage = (index + 1) % 2 === 0;
      const block = this.buildWeekBlock(week);
      contenido.push(...block, this.buildPageBreak(isSecondInPage, isLast));
    });

    return {
      header: () => this.makeHeader(false),
      pageSize: "LETTER",
      pageOrientation: "portrait",
      pageMargins: [20, 30, 20, 20],
      content: contenido,
      ...this.styles(),
    };
  }
  private buildWeekBlock(week: ProgramPdf): any[] {
    if (!week.assembly) {
      return [
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
        {},
      ];
    }

    return [
      {
        table: {
          widths: this.sizeBody,
          body: [
            [
              {
                text: Utils.showDayOfMeeting(week.meeting.week, this.dayMeet, true) + " | ",
                style: "sub_title",
                border: [false, false, false, false],
              },
              {
                text: week.meeting.weeklyBibleReading || "LECTURA SEMANAL DE LA BIBLIA",
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
                border: [false, false, false, false],
              },
            ],
          ],
        },
      },
      "\n",
    ];
  }
  private buildPageBreak(isSecondInPage: boolean, isLast: boolean) {
    if (isSecondInPage && !isLast) {
      return { text: "", pageBreak: "after" }; // 👈 CAMBIO CLAVE
    }
    return { text: "" };
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
          margin: [0, 0, 0, 0],
        },
        tips_r: {
          fontSize: 6,
          bold: true,
          alignment: "right",
          margin: [0, 3, 0, 0],
        },
        tips_l: {
          fontSize: 7,
          bold: true,
          color: this.colorFontPublisher,
          alignment: "left",
          margin: [0, 2, 0, 0],
        },
        tips_c: {
          fontSize: 7,
          bold: true,
          alignment: "left",
          color: "#b6b4b4",
          margin: [0, 4, 0, 0],
        },
        titles: {
          bold: true,
          fontSize: 8,
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
          fontSize: 8.5,
          color: "#5F6366",
          margin: [0, 0, 0, 0],
        },
        fontTeachers: {
          bold: true,
          fontSize: 8.5,
          color: "#C69200",
          margin: [0, 0, 0, 0],
        },
        fontLife: {
          bold: true,
          fontSize: 8.5,
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
        endPage: {
          margin: [0, 0, 0, 0],
        },
        assembly: {
          fontSize: 40,
          italics: true,
          alignment: "center",
          margin: [10, 100, 10, 100],
        },
      },
    };
  }
}
