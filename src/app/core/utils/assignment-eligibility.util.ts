import { MEETING_PARTS } from "../constants/program.constants";
import { Assignment } from "../interfaces/reuniones.interface";

function normalizeAssignmentText(value?: string | null): string {
  return (value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

/** Identifica exclusivamente la variante Discurso de "Explique sus creencias". */
export function isExplainingBeliefsSpeechAssignment(
  assignment?: Pick<Assignment, "title" | "sourceText" | "sourceHtml"> | null,
): boolean {
  if (!assignment) {
    return false;
  }

  const normalizedTitle = normalizeAssignmentText(assignment.title);
  const explainingBeliefsTitle = normalizeAssignmentText(MEETING_PARTS.EXPLAINING_YOUR_BELIEFS);
  const normalizedSource = normalizeAssignmentText(`${assignment.sourceText ?? ""} ${assignment.sourceHtml ?? ""}`);
  const isExplainingYourBeliefs =
    explainingBeliefsTitle.length > 0 && normalizedTitle === explainingBeliefsTitle;
  const sourceContainsSpeech = normalizedSource.includes("discurso");

  return isExplainingYourBeliefs && sourceContainsSpeech;
}
