import { firstValueFrom, of } from 'rxjs';
import { ProgramsComponent } from './programs.component';
import { WeeklyProgram } from 'src/app/core/interfaces/reuniones.interface';

describe('Guardados consecutivos de asignaciones semanales', () => {
  it('conserva la reunión al guardar responsable, ayudante y responsable nuevamente', async () => {
    const meeting = { id: 10, week: Date.UTC(2026, 8, 7) };
    const row = {
      id: 901, program: 501, room: 'A',
      assignment: { id: 301, title: 'Empiece conversaciones', meeting, showTips: true },
      congregation: { id: 1, name: 'Congregación', day: 2 },
    } as WeeklyProgram;
    const updateById = jasmine.createSpy('updateById').and.callFake((id, request) => of({
      id, programId: request.programId,
      assignment: { id: 301, title: 'Empiece conversaciones' },
      congregation: { id: 1, name: 'Congregación' },
      responsible: request.responsibleId ? { id: request.responsibleId } : null,
      assistant: request.assistantId ? { id: request.assistantId } : null,
      room: 'A', startTime: '19:30:00', notificationSentAt: null,
    }));
    const component = Object.create(ProgramsComponent.prototype) as any;
    component.weeklyProgramService = { updateById };
    for (const change of [{ responsible: { id: 81 } }, { assistant: { id: 82 } }, { responsible: { id: 83 } }]) {
      Object.assign(row, change);
      Object.assign(row, await firstValueFrom(component.updateWeeklyProgram(row)));
      expect(row.assignment.meeting).toBe(meeting as any);
      expect(new Date(row.assignment.meeting.week).toISOString().slice(0, 10)).toBe('2026-09-07');
      expect(row.assignment.showTips).toBeTrue();
      expect(row.congregation.day).toBe(2);
      expect(row.program).toBe(501);
    }
    expect(updateById).toHaveBeenCalledTimes(3);
    expect(updateById.calls.mostRecent().args[1].assistantId).toBe(82);
  });
});
