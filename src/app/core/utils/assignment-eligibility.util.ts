import { MEETING_PARTS } from "../constants/program.constants";
import { Assignment } from "../interfaces/reuniones.interface";
import { AssignmentType } from "../enums/assignments.enums";
import { SectionMeeting } from "../enums/meetings.enums";

/** undefined: registro legado; vacío: identidad recibida incompatible o desconocida. */
export function persistedAssignmentType(assignment: Pick<Assignment, "categoryCode" | "sectionMeeting">, assistant: boolean): string | undefined {
  if (!assignment.categoryCode) return undefined;
  if (assignment.sectionMeeting !== SectionMeeting.SEAMOS_MEJORES_MAESTROS) return "";
  const types: Record<string, AssignmentType> = {
    STARTING_A_CONVERSATION: AssignmentType.STARTING_A_CONVERSATION,
    FOLLOWING_UP: AssignmentType.FOLLOWING_UP,
    MAKING_DISCIPLES: AssignmentType.MAKING_DISCIPLES,
    EXPLAINING_BELIEFS: AssignmentType.EXPLAINING_YOUR_BELIEFS,
    WHAT_WOULD_YOU_SAY: AssignmentType.WHAT_WOULD_YOU_SAY,
    SPEECH: AssignmentType.SPEECH,
  };
  const type = Object.prototype.hasOwnProperty.call(types, assignment.categoryCode) ? types[assignment.categoryCode] : undefined;
  if (!type || (assistant && type === AssignmentType.SPEECH)) return "";
  return assistant ? `${type}Assistant` : type;
}

function normalizeAssignmentText(value?: string | null): string {
  return (value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[¿?]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

/** Mismo contrato semántico que AssignmentIdentity: equivalencias exactas, nunca posición. */
export function teachingAssignmentType(assignment: Pick<Assignment, "categoryCode" | "sectionMeeting" | "title">, assistant: boolean): string | undefined {
  if (assignment.categoryCode) return persistedAssignmentType(assignment, assistant);
  if (assignment.sectionMeeting !== SectionMeeting.SEAMOS_MEJORES_MAESTROS) return undefined;
  const titles: Record<string, string> = {
    'empiece conversaciones': 'STARTING_A_CONVERSATION', 'empecemos conversaciones': 'STARTING_A_CONVERSATION',
    'haga revisitas': 'FOLLOWING_UP', 'hagamos revisitas': 'FOLLOWING_UP',
    'haga discipulos': 'MAKING_DISCIPLES', 'hagamos discipulos': 'MAKING_DISCIPLES',
    'explique sus creencias': 'EXPLAINING_BELIEFS', 'expliquemos nuestras creencias': 'EXPLAINING_BELIEFS',
    'que diria': 'WHAT_WOULD_YOU_SAY', 'que dirias': 'WHAT_WOULD_YOU_SAY',
    'discurso': 'SPEECH',
  };
  const title = normalizeAssignmentText(assignment.title);
  const categoryCode = Object.prototype.hasOwnProperty.call(titles, title) ? titles[title] : undefined;
  return categoryCode ? persistedAssignmentType({ ...assignment, categoryCode }, assistant) : '';
}

export function explainingBeliefsTitleVariants(): string[] {
  return [MEETING_PARTS.EXPLAINING_YOUR_BELIEFS, "Explique sus creencias", "Expliquemos nuestras creencias"];
}

/** Identifica exclusivamente la variante Discurso de "Explique sus creencias". */
export function isExplainingBeliefsSpeechAssignment(
  assignment?: Pick<Assignment, "title" | "sourceText" | "sourceHtml" | "categoryCode" | "participationMode"> | null,
): boolean {
  if (!assignment) {
    return false;
  }

  if (assignment.categoryCode && assignment.categoryCode !== "EXPLAINING_BELIEFS") return false;
  if (assignment.participationMode === "PAIR" || assignment.participationMode === "UNKNOWN") return false;

  const normalizedTitle = normalizeAssignmentText(assignment.title);
  const normalizedSource = normalizeAssignmentText(`${assignment.sourceText ?? ""} ${assignment.sourceHtml ?? ""}`);
  const isExplainingYourBeliefs = assignment.categoryCode === "EXPLAINING_BELIEFS" ||
    explainingBeliefsTitleVariants().some((title) => title.length > 0 && normalizedTitle === normalizeAssignmentText(title));
  const sourceContainsSpeech = normalizedSource.includes("discurso");

  return isExplainingYourBeliefs && sourceContainsSpeech;
}

/** Restricciones explícitas del backend; null conserva la compatibilidad del registro legado. */
export function assignmentAssistantRestriction(
  assignment?: Pick<Assignment, "participationMode" | "categoryCode" | "sectionMeeting"> | null,
): string | null {
  if (assignment?.sectionMeeting !== SectionMeeting.SEAMOS_MEJORES_MAESTROS) return null;
  if (assignment.participationMode === "SOLO" || assignment.categoryCode === "SPEECH") {
    return "Esta asignación es individual y no admite ayudante en ninguna sala.";
  }
  // UNKNOWN conserva la compatibilidad transitoria del backend; no implica PAIR ni concede permisos.
  return null;
}
