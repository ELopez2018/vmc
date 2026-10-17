import { Program } from "src/app/core/interfaces/reuniones.interface";

export interface PublisherWeekStatus {
  current: string[];
  previous: string[];
}

/** Fechas de calendario: evita desplazar un día las fechas ISO por la zona horaria. */
export function weekDate(value: string | number): string {
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value)) return value.slice(0, 10);
  const date = new Date(value);
  return Number.isFinite(date.getTime()) ? date.toISOString().slice(0, 10) : "";
}

export function previousWeek(week: string): string {
  const date = new Date(`${week}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() - 7);
  return date.toISOString().slice(0, 10);
}

export function publisherWeekStatuses(programs: Program[], week: string): Map<number, PublisherWeekStatus> {
  const statuses = new Map<number, PublisherWeekStatus>();
  const previous = previousWeek(week);
  for (const program of programs) {
    const date = weekDate(program.meeting.week);
    if (date !== week && date !== previous) continue;
    const add = (id: number | undefined, description: string) => {
      if (id == null) return;
      const status = statuses.get(id) ?? { current: [], previous: [] };
      const entries = date === week ? status.current : status.previous;
      if (!entries.includes(description)) entries.push(description);
      statuses.set(id, status);
    };
    add(program.president?.id, "Presidencia");
    add(program.openingPrayer?.id, "Oración inicial");
    add(program.finalPrayer?.id, "Oración final");
    add(program.assistantAdviser?.id, "Consejero de la sala auxiliar");
    for (const part of program.weeklyPrograms ?? []) {
      const title = `${part.assignment.number ?? ""}. ${part.assignment.title} (Sala ${part.room})`;
      add(part.responsible?.id, `${title} · Responsable`);
      add(part.assistant?.id, `${title} · Ayudante`);
    }
  }
  return statuses;
}
