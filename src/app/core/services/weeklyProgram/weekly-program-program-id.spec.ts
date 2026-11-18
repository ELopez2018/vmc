import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { WeeklyProgramService } from './WeeklyProgram.service';
import { WeeklyProgramCreateRequest, WeeklyProgramUpdateRequest } from '../../interfaces/weekly-programs.interface';

describe('programId obligatorio en los guardados semanales', () => {
  let service: WeeklyProgramService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(WeeklyProgramService);
    http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => http.verify());

  it('recupera programId antes del PUT y conserva el id si la respuesta lo omite', async () => {
    const saved = firstValueFrom(service.updateById(901, { assignmentId: 301, responsibleId: 81, assistantId: 82 } as WeeklyProgramUpdateRequest));
    http.expectOne(req => req.method === 'GET').flush({ id: 901, programId: 501 });
    const request = http.expectOne(req => req.method === 'PUT');
    expect(request.request.body).toEqual({ id: 901, assignmentId: 301, responsibleId: 81, assistantId: 82, programId: 501 });
    request.flush({ id: 901 });
    expect((await saved).programId).toBe(501);
  });

  it('no envía PUT si tampoco la consulta devuelve el programa', async () => {
    const saved = firstValueFrom(service.updateById(901, { assignmentId: 301 } as WeeklyProgramUpdateRequest));
    const rejected = expectAsync(saved).toBeRejectedWithError(/programId/);
    http.expectOne(req => req.method === 'GET').flush({ id: 901 });
    await rejected;
    http.expectNone(req => req.method === 'PUT');
  });

  it('no envía una creación sin programId válido', async () => {
    for (const programId of [undefined, null, 0, NaN]) {
      await expectAsync(firstValueFrom(service.create({ assignmentId: 301, programId } as WeeklyProgramCreateRequest))).toBeRejectedWithError(/programId/);
    }
    http.expectNone(req => req.method === 'POST');
  });

  it('no envía upsert-by-title sin identificar el programa', async () => {
    await expectAsync(firstValueFrom(service.upsertByTitle({ title: 'Parte' } as any))).toBeRejectedWithError(/programId/);
    http.expectNone(req => req.method === 'POST');
  });
});
