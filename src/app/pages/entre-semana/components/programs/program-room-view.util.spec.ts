import { MeetingRoom } from "src/app/core/constants/program.constants";
import { Program, WeeklyProgram } from "src/app/core/interfaces/reuniones.interface";
import { SectionMeeting } from "src/app/core/enums/meetings.enums";
import { programViewForRoom } from "./program-room-view.util";

describe("programViewForRoom", () => {
  it("oculta en la auxiliar las asignaciones 1 y 2 y Nuestra vida cristiana sin modificar el origen", () => {
    const row = (id: number, room: MeetingRoom, sectionMeeting: SectionMeeting, number: number, name: string) => ({
      id, room, assignment: { sectionMeeting, number, sourceText: "Fuente original" }, responsible: { id, fullName: name }, assistant: null,
    }) as WeeklyProgram;
    const shared = row(1, MeetingRoom.MAIN, SectionMeeting.TESOROS_DE_LA_BIBLIA, 1, "Parte común");
    const main = row(2, MeetingRoom.MAIN, SectionMeeting.SEAMOS_MEJORES_MAESTROS, 4, "Principal");
    const auxiliary = row(3, MeetingRoom.AUXILIARY, SectionMeeting.SEAMOS_MEJORES_MAESTROS, 4, "Auxiliar");
    const auxiliaryTreasure = row(4, MeetingRoom.AUXILIARY, SectionMeeting.TESOROS_DE_LA_BIBLIA, 1, "No visible");
    const auxiliaryLiving = row(5, MeetingRoom.AUXILIARY, SectionMeeting.NUESTRA_VIDA_CRISTIANA, 7, "No visible");
    const program = { id: 10, meeting: { initialSong: { title: "Canción", source: "Fuente de canción" } }, weeklyPrograms: [shared, main, auxiliary, auxiliaryTreasure, auxiliaryLiving] } as Program;

    const principal = programViewForRoom([program], MeetingRoom.MAIN)[0];
    const auxiliar = programViewForRoom([program], MeetingRoom.AUXILIARY)[0];

    expect(principal.weeklyPrograms.map(item => item.id)).toEqual([1, 2]);
    expect(auxiliar.weeklyPrograms.map(item => item.id)).toEqual([3]);
    expect(auxiliar.weeklyPrograms[0].responsible?.fullName).toBe("Auxiliar");
    expect(auxiliar.weeklyPrograms[0].assignment.sourceText).toBeNull();
    expect(auxiliar.meeting.initialSong?.source).toBe("");
    expect(program.weeklyPrograms[2].assignment.sourceText).toBe("Fuente original");
    expect(program.meeting.initialSong?.source).toBe("Fuente de canción");
    expect(program.weeklyPrograms).toEqual([shared, main, auxiliary, auxiliaryTreasure, auxiliaryLiving]);
  });
});
