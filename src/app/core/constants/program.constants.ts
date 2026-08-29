import { MeetingPart } from "../interfaces/meeting-parts.interface";

export enum ProgramChangeType {
  START_TIME_OPENING_SONG = "startTimeOpeningSong",
  START_TIME_INTRO = "startTimeIntro",
  INTRO_TIME = "introTime",
  START_TIME_INTERMEDIATE_SONG = "startTimeIntermediateSong",
  START_TIME_CONCLUSION_WORDS = "startTimeConclusionWords",
  START_TIME_FINAL_SONG = "startTimeFinalSong",
  OPENING_SONG = "openingSong",
  INTERMEDIATE_SONG = "intermediateSong",
  FINAL_SONG = "finalSong",
}

export enum WeeklyProgramChangeType {
  RESPONSIBLE = "responsible",
  ASSISTANT = "assistant",
  RESPONSIBLE_B = "responsibleB",
  ASSISTANT_B = "assistantB",
  START_TIME = "startTime",
  NUMBER = "number",
  TITLE = "title",
  TIPS = "tips",
}

export enum MeetingRoom {
  MAIN = "A",
  AUXILIARY = "B",
}

export enum ModalResult {
  CLOSE = "close",
}

export interface MeetingPartTitles {
  WHAT_HE_DID: string;
  IMITATE: string;
  STARTING_A_CONVERSATION: string;
  FOLLOWING_UP: string;
  EXPLAINING_YOUR_BELIEFS: string;
  MAKING_DISCIPLES: string;
  CONGREGATION_BIBLE_STUDY: string;
  LOCAL_NEEDS: string;
  SPEECH: string;
  WHAT_WOULD_YOU_SAY: string;
  PRESIDENT: string;
  OPENING_PRAYER: string;
  FINAL_PRAYER: string;
  ASSISTANT_ADVISER: string;
}

const DEFAULT_MEETING_PART_TITLES: MeetingPartTitles = {
  WHAT_HE_DID: "Lo que hizo",
  IMITATE: "Imite a",
  STARTING_A_CONVERSATION: "Empiece conversaciones",
  FOLLOWING_UP: "Haga revisitas",
  EXPLAINING_YOUR_BELIEFS: "Explique sus creencias",
  MAKING_DISCIPLES: "Haga discípulos",
  CONGREGATION_BIBLE_STUDY: "Estudio bíblico de la congregación",
  LOCAL_NEEDS: "Necesidades de la congregación",
  SPEECH: "Discurso",
  WHAT_WOULD_YOU_SAY: "¿Qué diría?",
  PRESIDENT: "Presidencia",
  OPENING_PRAYER: "Oración inicial",
  FINAL_PRAYER: "Oración final",
  ASSISTANT_ADVISER: "Consejero de la sala auxiliar",
};

/** Catálogo global usado por las reglas de presentación y asignación. */
export const MEETING_PARTS: MeetingPartTitles = { ...DEFAULT_MEETING_PART_TITLES };

export function setMeetingPartTitles(parts: MeetingPart[]): void {
  const titlesByNormalizedValue = new Map(parts.map((part) => [normalizeMeetingPartTitle(part.title), part.title]));

  (Object.keys(DEFAULT_MEETING_PART_TITLES) as Array<keyof MeetingPartTitles>).forEach((key) => {
    MEETING_PARTS[key] = titlesByNormalizedValue.get(normalizeMeetingPartTitle(DEFAULT_MEETING_PART_TITLES[key])) ?? DEFAULT_MEETING_PART_TITLES[key];
  });
}

function normalizeMeetingPartTitle(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

export const ADMIN_EMAIL = "estarlin.elv@gmail.com";
