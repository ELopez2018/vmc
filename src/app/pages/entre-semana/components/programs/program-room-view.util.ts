import { MeetingRoom } from "src/app/core/constants/program.constants";
import { ProgramPdf, WeeklyProgramPdF } from "src/app/core/interfaces/print-pdf.interface";
import { Program, WeeklyProgram } from "src/app/core/interfaces/reuniones.interface";
import { SectionMeeting } from "src/app/core/enums/meetings.enums";

/** Proyección de lectura independiente para cada sala. */
export function programViewForRoom(programs: Program[], room: MeetingRoom): ProgramPdf[] {
  return programs.map((program) => ({
    ...program,
    meeting: {
      ...program.meeting,
      initialSong: program.meeting.initialSong ? { ...program.meeting.initialSong, source: "" } : program.meeting.initialSong,
      middleSong: program.meeting.middleSong ? { ...program.meeting.middleSong, source: "" } : program.meeting.middleSong,
      lastSong: program.meeting.lastSong ? { ...program.meeting.lastSong, source: "" } : program.meeting.lastSong,
    },
    weeklyPrograms: (program.weeklyPrograms ?? [])
      .filter((item) => belongsToRoomView(item, room))
      .map((item): WeeklyProgramPdF => ({
        ...item,
        assignment: { ...item.assignment, sourceText: null, sourceHtml: null, sourceLinks: null, sourceUrl: null },
        responsible: item.responsible ?? null,
        assistant: item.assistant ?? null,
        responsibleB: null,
        assistantB: null,
      })),
  }));
}

function belongsToRoomView(item: WeeklyProgram, room: MeetingRoom): boolean {
  if (item.room?.toUpperCase() !== room) return false;
  if (room !== MeetingRoom.AUXILIARY) return true;

  return item.assignment?.sectionMeeting !== SectionMeeting.NUESTRA_VIDA_CRISTIANA &&
    !(item.assignment?.sectionMeeting === SectionMeeting.TESOROS_DE_LA_BIBLIA &&
      (item.assignment.number === 1 || item.assignment.number === 2));
}
