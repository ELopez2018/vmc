import { Injectable } from "@angular/core";
import { ProgramPdf, WeeklyProgramPdF } from "../../interfaces/print-pdf.interface";
import { Publisher } from "../../interfaces/reuniones.interface";

declare const pdfMake: any;

type RoomType = "A" | "B" | "C";

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
  private readonly CARD_W = 190;
  private readonly CARD_H = 460;

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
      const date = this.formatDate(program.meeting?.week);

      (program.weeklyProgram || []).forEach((wp: WeeklyProgramPdF) => {
        if (!this.isS89Candidate(wp)) return;

        const room = this.normalizeRoom(wp.room);

        // Para aux: si tu backend usa responsibleB/assistantB, aquí se prioriza cuando no es A
        const responsible =
          room === "A" ? wp.responsible : (wp.responsibleB ?? wp.responsible);
        const assistant =
          room === "A" ? wp.assistant : (wp.assistantB ?? wp.assistant);

        out.push({
          name: this.fullName(responsible),
          assistant: this.fullName(assistant),
          date,
          intervention: String(wp.assignment?.number ?? ""),
          room,
        });
      });
    });

    return out;
  }

  private isS89Candidate(wp: WeeklyProgramPdF): boolean {
    return (
      wp?.assignment?.sectionMeeting === "SEAMOS MEJORES MAESTROS" ||
      wp?.assignment?.sectionMeeting === "TESOROS DE LA BIBLIA"
    );
  }

  private fullName(p?: Publisher | null): string {
    return (p?.fullName ?? "").trim();
  }

  private normalizeRoom(room: any): RoomType {
    const r = String(room ?? "").trim().toUpperCase();
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
    const pages: any[] = [];
    for (let i = 0; i < forms.length; i += 4) {
      pages.push(this.buildFourPerPage(forms.slice(i, i + 4)));
      if (i + 4 < forms.length) pages.push({ text: "", pageBreak: "after" });
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
    if (!form) return "";

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
    return [
      { text: "ASIGNACIÓN PARA LA REUNIÓN\nVIDA Y MINISTERIO CRISTIANOS", style: "title", margin: [0, 0, 0, 8] },

      this.dottedFieldRow("Nombre:", data.name),
      this.dottedFieldRow("Ayudante:", data.assistant),
      this.dottedFieldRow("Fecha:", data.date),
      this.dottedFieldRow("Intervención núm.:", data.intervention),

      { text: "Se presentará en:", style: "label", margin: [0, 10, 0, 6] },

      this.checkboxRow("Sala principal", data.room === "A"),
      this.checkboxRow("Sala auxiliar núm. 1", data.room === "B"),
      this.checkboxRow("Sala auxiliar núm. 2", data.room === "C"),

      {
        text:
          "Nota al estudiante: En la Guía de actividades encontrará la información que necesita para su intervención. Repase también las indicaciones que se describen en las Instrucciones para la reunión Vida y Ministerio Cristianos (S-38).",
        style: "note",
        margin: [0, 12, 0, 0],
      },

      { text: "S-89-S   11/23", style: "footer", margin: [0, 8, 0, 16] },
    ];
  }

  /* ===============================
   * FIELD ROWS (línea punteada)
   * =============================== */

  private dottedFieldRow(label: string, value: string) {
    return {
      table: {
        widths: [75, "*"],
        body: [
          [
            { text: label, style: "label", margin: [0, 2, 0, 0] },
            {
              // valor + línea punteada debajo (como formulario real)
              stack: [
                { text: (value ?? "").trim(), style: "value", margin: [0, 2, 0, 0] },
                {
                  canvas: [
                    {
                      type: "line",
                      x1: 0,
                      y1: 2,
                      x2: 90,
                      y2: 2,
                      lineWidth: 1,
                      dash: { length: 1, space: 1 },
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
      margin: [0, 2, 0, 2],
    };
  }

  /* ===============================
   * CHECKBOX ROWS (como el ejemplo)
   * =============================== */

  private checkboxRow(label: string, checked: boolean) {
    return {
      columns: [
      { width: 10, stack: [this.checkboxCanvas(checked)] },  // ancho fijo del cuadro
      { width: "*", text: label, style: "checkboxLabel", margin: [2, 0, 0, 0] } // antes 6
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
      title: {
        fontSize: 9,
        bold: true,
        alignment: "center",
      },
      label: {
        fontSize: 9,
        bold: true,
      },
      value: {
        fontSize: 8,
      },
      checkboxLabel: {
        fontSize: 8,
      },
      note: {
        fontSize: 7,
        alignment: "justify",
      },
      footer: {
        fontSize: 7,
      },
    };
  }
}
