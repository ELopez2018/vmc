import { firstValueFrom, of } from 'rxjs';
import { ProgramsComponent } from './programs.component';
import { WeeklyProgram } from 'src/app/core/interfaces/reuniones.interface';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { WeeklyProgramService } from 'src/app/core/services/weeklyProgram/WeeklyProgram.service';
import { WeeklyProgramChangeType } from 'src/app/core/constants/program.constants';
import Swal from 'sweetalert2';

describe('Guardados consecutivos de asignaciones semanales', () => {
  it('conserva la reunión al guardar responsable, ayudante y responsable nuevamente', async () => {
    const meeting = { id: 10, week: Date.UTC(2026, 8, 7) };
    const row = {
      id: 901, program: 501, room: 'A',
      assignment: { id: 301, title: 'Empiece conversaciones', meeting, showTips: true },
      congregation: { id: 1, name: 'Congregación', day: 2 },
    } as WeeklyProgram;
    const updateById = jasmine.createSpy('updateById').and.callFake((id, request) => of({
      id,
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
    expect(updateById.calls.allArgs().every((args) => args[1].programId === 501)).toBeTrue();
    expect(updateById.calls.mostRecent().args[1].assistantId).toBe(82);
  });
});

describe('Recuperación de programId al asignar', () => {
  let http: HttpTestingController;
  let component: ProgramsComponent;
  let row: WeeklyProgram;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    http = TestBed.inject(HttpTestingController);
    component = new ProgramsComponent(null!, null!, null!, TestBed.inject(WeeklyProgramService), null!);
    row = { id: 901, room: 'B', assignment: { id: 301 }, congregation: { id: 2 }, responsible: { id: 81 }, assistant: { id: 82 } } as WeeklyProgram;
    component.semanas = [{ id: 501, weeklyPrograms: [row] } as any];
  });

  afterEach(() => http.verify());

  it('recupera el programa de la semana y lo conserva si el PUT no devuelve programId', async () => {
    const saved = firstValueFrom((component as any).updateWeeklyProgram(row)) as Promise<WeeklyProgram>;
    const request = http.expectOne(req => req.method === 'PUT');
    expect(request.request.body.programId).toBe(501);
    expect(request.request.body.responsibleId).toBe(81);
    expect(request.request.body.assistantId).toBe(82);
    request.flush({ id: 901, assignment: { id: 301 }, responsible: { id: 81 }, assistant: { id: 82 } });
    expect((await saved).program).toBe(501);
    http.expectNone(req => req.method === 'GET');
  });

  it('consulta la fila cuando no está en la semana y falta programId', async () => {
    component.semanas = [];
    const saved = firstValueFrom((component as any).updateWeeklyProgram(row)) as Promise<WeeklyProgram>;
    http.expectOne(req => req.method === 'GET' && req.url.endsWith('/weeklyProgram/901')).flush({ id: 901, programId: 501, assignment: { id: 301 } });
    const request = http.expectOne(req => req.method === 'PUT');
    expect(request.request.body.programId).toBe(501);
    expect(request.request.body.assistantId).toBe(82);
    request.flush({ id: 901, assignment: { id: 301 } });
    expect((await saved).program).toBe(501);
  });

  it('prepara la sala faltante sin guardarla antes de seleccionar y conserva el programa', async () => {
    component.semanas[0].weeklyPrograms = [{ ...row, room: 'A' }];
    const saved = firstValueFrom((component as any).getWeeklyProgramForRoom(row, 'B')) as Promise<WeeklyProgram>;
    expect((await saved).program).toBe(501);
    http.expectNone(req => req.method === 'POST');
  });
});

describe('Actualización de la hora de las partes', () => {
  let http: HttpTestingController;
  let component: ProgramsComponent;
  let rows: WeeklyProgram[];

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    http = TestBed.inject(HttpTestingController);
    rows = ['A', 'B'].map((room, index) => ({
      id: 901 + index, program: 501, room, startTime: '19:30:00',
      assignment: { id: 301, title: 'Discurso', number: 6, sectionMeeting: 'SEAMOS MEJORES MAESTROS' },
      congregation: { id: 2 }, responsible: { id: 81 + index }, assistant: null,
    } as WeeklyProgram));
    component = new ProgramsComponent(null!, { selectedHour: () => Promise.resolve('20:15') } as any,
      { makePDfVersion: (): never[] => [] } as any, TestBed.inject(WeeklyProgramService), null!);
    component.semanas = [{ id: 501, weeklyPrograms: rows } as any];
  });

  afterEach(() => http.verify());

  it('guarda por id en ambas salas y conserva sus responsables', fakeAsync(() => {
    const view = { ...rows[0] } as any;
    component.changeWeeklyProgram(view, WeeklyProgramChangeType.START_TIME);
    flushMicrotasks();
    expect(view.startTime).toBe('19:30:00');
    rows.forEach((row) => {
      const save = http.expectOne(req => req.method === 'PUT' && req.url.endsWith(`/weeklyProgram/${row.id}`));
      expect(save.request.body.startTime).toBe('20:15:00');
      expect(save.request.body.responsibleId).toBe(row.responsible!.id);
      expect(save.request.body.assignmentId).toBe(301);
      save.flush({ ...row, programId: 501, startTime: '20:15:00', notificationSentAt: null });
    });
    expect(view.startTime).toBe('20:15:00');
    expect(rows.every(row => row.startTime === '20:15:00')).toBeTrue();
  }));

  it('informa el error sin mostrar una hora que no se guardó', fakeAsync(() => {
    component.semanas[0].weeklyPrograms = [rows[0]];
    const alert = spyOn(Swal, 'fire').and.resolveTo({ isConfirmed: true, isDenied: false, isDismissed: false });
    const view = { ...rows[0] } as any;
    component.changeWeeklyProgram(view, WeeklyProgramChangeType.START_TIME);
    flushMicrotasks();
    http.expectOne(req => req.method === 'PUT').flush({ message: 'No se pudo guardar la hora.' }, { status: 500, statusText: 'Error' });
    expect(view.startTime).toBe('19:30:00');
    expect(rows[0].startTime).toBe('19:30:00');
    expect(alert).toHaveBeenCalledWith(jasmine.objectContaining({ icon: 'error', text: 'No se pudo guardar la hora.' }));
    flushMicrotasks();
  }));
});
