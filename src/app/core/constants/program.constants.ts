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

export const ASSIGNMENT_TITLE = {
  WHAT_HE_DID: "Lo que hizo",
  IMITATE: "Imite a",
  STARTING_A_CONVERSATION: "Empiece conversaciones",
  FOLLOWING_UP: "Haga revisitas",
  EXPLAINING_YOUR_BELIEFS: "Explique sus creencias",
  MAKING_DISCIPLES: "Haga discípulos",
  CONGREGATION_BIBLE_STUDY: "Estudio bíblico de la congregación",
  LOCAL_NEEDS: "Necesidades de la congregación",
  SPEECH: "Discurso",
} as const;

export const ADMIN_EMAIL = "estarlin.elv@gmail.com";
