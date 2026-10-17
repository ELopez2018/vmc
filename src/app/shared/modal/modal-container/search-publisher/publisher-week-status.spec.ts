import { Program } from "src/app/core/interfaces/reuniones.interface";
import { previousWeek, publisherWeekStatuses, weekDate } from "./publisher-week-status";

describe("Publisher week status", () => {
  const program = (week: string, values: object = {}) => ({
    meeting: { week }, weeklyPrograms: [], ...values,
  } as unknown as Program);

  it("preserves ISO calendar dates and crosses year boundaries", () => {
    expect(weekDate("2026-01-05")).toBe("2026-01-05");
    expect(weekDate(Date.UTC(2026, 0, 5))).toBe("2026-01-05");
    expect(previousWeek("2026-01-05")).toBe("2025-12-29");
  });

  it("includes people with a single assignment even without duplicate alerts", () => {
    const statuses = publisherWeekStatuses([
      program("2026-10-12", { president: { id: 1 } }),
      program("2026-10-05", { openingPrayer: { id: 2 } }),
      program("2026-09-28", { finalPrayer: { id: 3 } }),
      program("2026-10-19", { president: { id: 4 } }),
    ], "2026-10-12");
    expect(statuses.get(1)).toEqual({ current: ["Presidencia"], previous: [] });
    expect(statuses.get(2)).toEqual({ current: [], previous: ["Oración inicial"] });
    expect(statuses.has(3)).toBeFalse();
    expect(statuses.has(4)).toBeFalse();
  });

  it("includes both rooms, helpers, all program roles and both weeks for the same person", () => {
    const statuses = publisherWeekStatuses([
      program("2026-10-12", {
        finalPrayer: { id: 1 }, assistantAdviser: { id: 2 },
        weeklyPrograms: [
          { assignment: { number: 4, title: "Conversaciones" }, room: "A", responsible: { id: 1 }, assistant: { id: 2 } },
          { assignment: { number: 4, title: "Conversaciones" }, room: "B", responsible: { id: 3 }, assistant: null },
        ],
      }),
      program("2026-10-05", { president: { id: 1 } }),
    ], "2026-10-12");
    expect(statuses.get(1)?.current.length).toBe(2);
    expect(statuses.get(1)?.previous).toEqual(["Presidencia"]);
    expect(statuses.get(2)?.current).toContain("4. Conversaciones (Sala A) · Ayudante");
    expect(statuses.get(2)?.current).toContain("Consejero de la sala auxiliar");
    expect(statuses.get(3)?.current).toContain("4. Conversaciones (Sala B) · Responsable");
  });

  it("does not match people by name or invent assignments from empty programs", () => {
    expect(publisherWeekStatuses([program("2026-10-12")], "2026-10-12").size).toBe(0);
  });
});
