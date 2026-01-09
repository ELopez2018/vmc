import { Injectable } from "@angular/core";
import { ProgramPdf, WeeklyProgramPdF } from "../../interfaces/print-pdf.interface";
import { Publisher } from "../../interfaces/reuniones.interface";
import { Utils } from "src/app/shared/Utils";
import { DataService } from "../data/data.service";

declare const pdfMake: any;

type RoomType = string;

interface S89InternalForm {
  name: string;
  assistant: string;
  date: string;
  intervention: string;
  room: RoomType;
}

@Injectable({
  providedIn: "root",
})
export class PrintS89FromProgramService {
  // Tamaños afinados para que queden 4 “cards” por hoja (LETTER) como el ejemplo
  private readonly PAGE_MARGINS: [number, number, number, number] = [18, 18, 18, 18];
  private readonly CELL_H = 276; // (792 - 36) / 2
  private readonly CARD_W = 260;
  private readonly CARD_PADDING_X = 10;
  private dayMeet: any = null;
  constructor(private dataService: DataService) {
    this.dataService.getPublisher().subscribe((data) => {
      if (data) {
        this.dayMeet = data.congregation.day;
      }
    });
  }

  /* ===============================
   * PUBLIC API
   * =============================== */

  print(programs: ProgramPdf[]) {
    const forms = this.extractForms(programs);
    pdfMake.createPdf(this.buildDocument(forms)).open();
  }

  download(programs: ProgramPdf[]) {
    const forms = this.extractForms(programs);
    pdfMake.createPdf(this.buildDocument(forms)).download("S-89-S.pdf");
  }

  async getBlob(programs: ProgramPdf[]): Promise<Blob> {
    const forms = this.extractForms(programs);
    return new Promise<Blob>((resolve, reject) => {
      const pdf = pdfMake.createPdf(this.buildDocument(forms));
      pdf.getBlob((data: Blob) => {
        if (!data) return reject("No se generó el PDF");
        resolve(data);
      });
    });
  }

  /* ===============================
   * EXTRACTION
   * =============================== */

  private extractForms(programs: ProgramPdf[]): S89InternalForm[] {
    const out: S89InternalForm[] = [];

    programs?.forEach((program) => {
      const date = this.formatDate(Utils.showDayOfMeeting(program.meeting?.week, this.dayMeet));
      (program.weeklyProgram || []).forEach((wp: WeeklyProgramPdF) => {
        if (!this.isS89Candidate(wp)) {
          return;
        }
        if (wp.responsible) {
          out.push({
            name: this.fullName(wp.responsible),
            assistant: this.fullName(wp.assistant),
            date,
            intervention: String(wp.assignment?.number ?? ""),
            room: "A",
          });
        }
        if (wp.responsibleB) {
          out.push({
            name: this.fullName(wp.responsibleB),
            assistant: this.fullName(wp.assistantB),
            date,
            intervention: String(wp.assignment?.number ?? ""),
            room: "B",
          });
        }
      });
    });

    return out;
  }

  private isS89Candidate(wp: WeeklyProgramPdF): boolean {
    return wp?.assignment?.sectionMeeting === "SEAMOS MEJORES MAESTROS" || wp?.assignment?.sectionMeeting === "TESOROS DE LA BIBLIA";
  }

  private fullName(p?: Publisher | null): string {
    return (p?.fullName ?? "").trim();
  }

  private normalizeRoom(room: any): RoomType {
    const r = String(room ?? "")
      .trim()
      .toUpperCase();
    if (r === "A") return "A";
    if (r === "B") return "B";
    return "C";
  }

  private formatDate(value: any): string {
    // Si ya viene como '05/01/2026' o '05-01-2026', lo dejamos
    const s = String(value ?? "").trim();
    if (s.includes("/") || (s.includes("-") && s.length <= 12)) return s;

    // Si viene timestamp
    const n = Number(s);
    if (!Number.isFinite(n)) return s;

    const d = new Date(n);
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yy = String(d.getFullYear());
    return `${dd}-${mm}-${yy}`;
  }

  /* ===============================
   * DOCUMENT
   * =============================== */

  private buildDocument(forms: S89InternalForm[]) {
    const valid = (forms || []).filter((f) => !!f && !!f.name?.trim());

    // ✅ si no hay nada, NO generes PDF (evita página en blanco)
    if (valid.length === 0) {
      return {
        pageSize: "LETTER",
        pageMargins: this.PAGE_MARGINS,
        content: [{ text: "No hay asignaciones para imprimir.", fontSize: 10 }],
      };
    }

    const pages: any[] = [];

    for (let i = 0; i < valid.length; i += 4) {
      const chunk = valid.slice(i, i + 4);
      if (chunk.length === 0) continue;

      pages.push(this.buildFourPerPage(chunk));

      // ✅ pageBreak SOLO si existe una página siguiente con contenido
      if (i + 4 < valid.length) {
        pages.push({ text: "", pageBreak: "after" });
      }
    }

    return {
      pageSize: "LETTER",
      pageMargins: this.PAGE_MARGINS,
      content: pages,
      defaultStyle: { fontSize: 8 },
      styles: this.styles(),
    };
  }

  /* ===============================
   * GRID 2x2 (estable, sin descuadres)
   * =============================== */

  private buildFourPerPage(forms: S89InternalForm[]) {
    const cells = [...forms];
    while (cells.length < 4) cells.push(null as any);

    return {
      table: {
        widths: ["*", "*"],
        heights: [this.CELL_H, this.CELL_H],
        body: [
          [this.gridCell(cells[0]), this.gridCell(cells[1])],
          [this.gridCell(cells[2]), this.gridCell(cells[3])],
        ],
      },
      layout: this.outerGridLayout(),
    };
  }

  private gridCell(form: S89InternalForm | null) {
    if (!form || !form.name) return "";

    // Card centrada dentro del cuadrante
    return {
      margin: [0, 0, 0, 0],
      alignment: "left",
      stack: [this.buildS89Card(form)],
    };
  }

  private outerGridLayout() {
    // Padding para que se parezca a tu ejemplo (espacio “blanco” alrededor)
    return {
      hLineWidth: () => 0,
      vLineWidth: () => 0,
      paddingLeft: () => 14,
      paddingRight: () => 14,
      paddingTop: () => 14,
      paddingBottom: () => 14,
    };
  }

  /* ===============================
   * CARD S-89 (como el formato real)
   * =============================== */

  private buildS89Card(data: S89InternalForm) {
    return {
      table: {
        widths: [this.CARD_W],
        body: [
          [
            {
              // “Card” con borde gris y fondo suave (igual al ejemplo)
              fillColor: "#ffffff",
              margin: [10, 10, 10, 10], // padding interno
              stack: this.buildS89Content(data),
            },
          ],
        ],
      },
      layout: this.cardLayout(),
    };
  }

  private cardLayout() {
    return {
      hLineWidth: () => 1,
      vLineWidth: () => 1,
      hLineColor: () => "#d9d9d9",
      vLineColor: () => "#d9d9d9",
      paddingLeft: () => 0,
      paddingRight: () => 0,
      paddingTop: () => 0,
      paddingBottom: () => 0,
    };
  }

  private buildS89Content(data: S89InternalForm) {
    // Todo el contenido está “amarrado” por filas con alturas consistentes
    const padd = 10; // ajuste fino para que cuadre mejor
    return [
      { text: "ASIGNACIÓN PARA LA REUNIÓN\nVIDA Y MINISTERIO CRISTIANOS", style: "title", margin: [0, 0, 0, 8] },

      this.dottedFieldRow("Nombre:", data.name, 12 + padd),
      this.dottedFieldRow("Ayudante:", data.assistant, 17 + padd),
      this.dottedFieldRow("Fecha:", data.date, 4 + padd),
      this.dottedFieldRow("Intervención núm.:", data.intervention, 52 + padd),

      { text: "Se presentará en:", style: "label", margin: [0, 10, 0, 6] },

      this.checkboxRow("Sala principal", data.room === "A"),
      this.checkboxRow("Sala auxiliar núm. 1", data.room === "B"),
      this.checkboxRow("Sala auxiliar núm. 2", data.room === "C"),

      {
        text: "Nota al estudiante: En la Guía de actividades encontrará la información que necesita para su intervención. Repase también las indicaciones que se describen en las Instrucciones para la reunión Vida y Ministerio Cristianos (S-38).",
        style: "note",
        margin: [0, 12, 0, 0],
      },

      { text: "S-89-S   11/23", style: "footer", margin: [0, 8, 0, 16] },
    ];
  }

  /* ===============================
   * FIELD ROWS (línea punteada)
   * =============================== */

  private dottedFieldRow(label: string, value: string, size?: number) {
    // ancho útil de la tarjeta (CARD_W - padding interno izq/der)
    const innerWidth = this.CARD_W - this.CARD_PADDING_X * 2 - (size || 0);

    // reservamos el ancho REAL del label midiendo por layout: usamos una celda "auto"
    // pero para que la línea no se salga, dibujamos con un ancho máximo razonable:
    // (innerWidth - 5) porque el canvas está en la celda 2
    const maxLine = innerWidth - 20;

    return {
      table: {
        widths: ["auto", "*"], // ✅ la celda 2 arranca justo al final del label
        body: [
          [
            { text: label, style: "labelField", noWrap: true },
            {
              stack: [
                { text: (value ?? "").trim(), style: "valueField", margin: [0, 0, 0, 2] },
                {
                  canvas: [
                    {
                      type: "line",
                      x1: 0,
                      y1: 0,
                      x2: maxLine, // ✅ nunca se sale del borde
                      y2: 0,
                      lineWidth: 1,
                      dash: { length: 2, space: 2 },
                      lineColor: "#000",
                    },
                  ],
                },
              ],
            },
          ],
        ],
      },
      layout: "noBorders",
      margin: [0, 3, 0, 6],
    };
  }

  /* ===============================
   * CHECKBOX ROWS (como el ejemplo)
   * =============================== */

  private checkboxRow(label: string, checked: boolean) {
    return {
      columns: [
        { width: 10, stack: [this.checkboxCanvas(checked)] }, // ancho fijo del cuadro
        { width: "*", text: label, style: "checkboxLabel", margin: [2, 0, 0, 0] }, // antes 6
      ],
      columnGap: 2,
      margin: [10, 1, 0, 1],
    };
  }

  private checkboxCanvas(checked: boolean) {
    return {
      canvas: [
        { type: "rect", x: 0, y: 0, w: 9, h: 9, lineWidth: 1, lineColor: "#000" },
        ...(checked
          ? [
              // tick estilo formulario
              { type: "line", x1: 1.5, y1: 5, x2: 4, y2: 7.5, lineWidth: 1, lineColor: "#000" },
              { type: "line", x1: 4, y1: 7.5, x2: 8, y2: 1.5, lineWidth: 1, lineColor: "#000" },
            ]
          : []),
      ],
    };
  }

  /* ===============================
   * STYLES
   * =============================== */

  private styles() {
    return {
      value: { fontSize: 8 },
      title: { fontSize: 14, bold: true, alignment: "center" },
      label: { fontSize: 9, bold: true },
      checkboxLabel: { fontSize: 9 },
      note: { fontSize: 10, alignment: "justify" },
      footer: { fontSize: 8 },
      labelField: { fontSize: 9, bold: true },
      valueField: { fontSize: 9 },
    };
  }
}
