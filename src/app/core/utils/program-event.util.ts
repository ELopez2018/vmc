import { ASSIGNMENT_TITLE } from "../constants/program.constants";

const ASSEMBLY_KEYWORD = "asamblea";

const normalize = (value?: string | null): string =>
  (value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();

export function hasProgramEvent(event?: string | null): boolean {
  return normalize(event).length > 0;
}

/** Los eventos de asamblea reemplazan por completo el programa de la semana. */
export function isAssemblyEvent(event?: string | null): boolean {
  return normalize(event).includes(ASSEMBLY_KEYWORD);
}

/** Evento que conserva el programa semanal, por ejemplo la visita del superintendente. */
export function isSpecialEventWeek(event?: string | null): boolean {
  return hasProgramEvent(event) && !isAssemblyEvent(event);
}

/** El estudio bíblico todavía no fue renombrado con el título del discurso del superintendente. */
export function isPendingOverseerTalkTitle(title?: string | null): boolean {
  return normalize(title) === normalize(ASSIGNMENT_TITLE.CONGREGATION_BIBLE_STUDY);
}

export function needsOverseerTalkTitle(event?: string | null, title?: string | null): boolean {
  return isSpecialEventWeek(event) && isPendingOverseerTalkTitle(title);
}
