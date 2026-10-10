import { MEETING_PARTS } from "src/app/core/constants/program.constants";
import { Assignment } from "src/app/core/interfaces/reuniones.interface";
import { SectionMeeting } from "src/app/core/enums/meetings.enums";

export function normalizeProgramTitle(value?: string | null): string {
  return (value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

export function includesMeetingPartTitle(title: string | null | undefined, meetingPartTitle: string): boolean {
  const normalizedTitle = normalizeProgramTitle(title);
  // Reconocer los títulos anteriores y actuales de la fuente tanto al seleccionar
  // el tipo de asignación como al distinguir las partes estudiantiles de discursos.
  const titleVariants = [
    [MEETING_PARTS.STARTING_A_CONVERSATION, "Empiece conversaciones", "Empecemos conversaciones"],
    [MEETING_PARTS.FOLLOWING_UP, "Haga revisitas", "Hagamos revisitas"],
    [MEETING_PARTS.MAKING_DISCIPLES, "Haga discípulos", "Hagamos discípulos"],
    [MEETING_PARTS.WHAT_WOULD_YOU_SAY, "¿Qué diría?", "¿Qué dirías?"],
  ];
  const meetingPartTitles = titleVariants.find(([catalogTitle]) => catalogTitle === meetingPartTitle) ?? [meetingPartTitle];

  return normalizedTitle.length > 0 && meetingPartTitles.some((candidate) => {
    const normalizedCandidate = normalizeProgramTitle(candidate);
    return normalizedCandidate.length > 0 && normalizedTitle.includes(normalizedCandidate);
  });
}

/**
 * El título visible de un discurso puede ser reemplazado por su tema.
 * En ese caso el número y la sección siguen identificando la parte.
 */
export function isSpeechAssignment(assignment?: Pick<Assignment, "title" | "number" | "sectionMeeting" | "tips"> | null): boolean {
  if (!assignment || assignment.sectionMeeting !== SectionMeeting.SEAMOS_MEJORES_MAESTROS) {
    return false;
  }

  const isNamedStudentAssignment = [
    MEETING_PARTS.STARTING_A_CONVERSATION,
    MEETING_PARTS.FOLLOWING_UP,
    MEETING_PARTS.EXPLAINING_YOUR_BELIEFS,
    MEETING_PARTS.WHAT_WOULD_YOU_SAY,
    MEETING_PARTS.MAKING_DISCIPLES,
  ].some((meetingPartTitle) => includesMeetingPartTitle(assignment.title, meetingPartTitle));

  return (
    includesMeetingPartTitle(assignment.title, MEETING_PARTS.SPEECH) ||
    (assignment.sectionMeeting === SectionMeeting.SEAMOS_MEJORES_MAESTROS &&
      [7, 8].includes(assignment.number) &&
      !isNamedStudentAssignment)
  );
}

export function isCongregationBibleStudyAssignment(
  assignment?: Pick<Assignment, "title" | "number" | "sectionMeeting" | "tips"> | null,
): boolean {
  if (!assignment) {
    return false;
  }

  return (
    includesMeetingPartTitle(assignment.title, MEETING_PARTS.CONGREGATION_BIBLE_STUDY) ||
    (assignment.sectionMeeting === SectionMeeting.NUESTRA_VIDA_CRISTIANA &&
      normalizeProgramTitle(assignment.tips).includes("conductor/lector"))
  );
}
