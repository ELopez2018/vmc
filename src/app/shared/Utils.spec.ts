import { Utils } from "./Utils";

describe("Utils.showDayOfMeeting", () => {
  it("uses Tuesday for a circuit overseer's visit regardless of the configured meeting day", () => {
    const week = "2026-03-01T12:00:00";
    const visit = "VISITA DEL SUPERINTENDENTE DE CIRCUITO";

    expect(Utils.showDayOfMeeting(week, 3, false, visit)).toBe(Utils.showDayOfMeeting(week, 2));
    expect(Utils.showDayOfMeeting(week, 3, false, visit)).not.toBe(Utils.showDayOfMeeting(week, 3));
  });

  it("keeps the configured meeting day for other events", () => {
    const week = "2026-03-01T12:00:00";

    expect(Utils.showDayOfMeeting(week, 3, false, "Conmemoración")).toBe(Utils.showDayOfMeeting(week, 3));
  });
});
