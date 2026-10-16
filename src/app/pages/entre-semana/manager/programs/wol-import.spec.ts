import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { CongregationsService } from 'src/app/core/services/congregations/congregations.service';
import { MeetingsService, WolWeekImportResponse } from 'src/app/core/services/meetings/meetings.service';
import { ProgramService } from 'src/app/core/services/program/program.service';
import { ProgramsComponent } from './programs.component';

describe('WOL week import', () => {
  let component: ProgramsComponent;
  let response: Subject<WolWeekImportResponse>;
  let meetings: jasmine.SpyObj<MeetingsService>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;
  let alert: jasmine.Spy;

  beforeEach(() => {
    response = new Subject();
    meetings = jasmine.createSpyObj('MeetingsService', ['importWeekFromWol']);
    meetings.importWeekFromWol.and.returnValue(response);
    snackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    TestBed.configureTestingModule({ providers: [
      provideNoopAnimations(),
      { provide: MeetingsService, useValue: meetings },
      { provide: ProgramService, useValue: {} },
      { provide: CongregationsService, useValue: {} },
      { provide: MatSnackBar, useValue: snackBar },
      { provide: MatDialog, useValue: {} },
    ] });
    component = TestBed.runInInjectionContext(() => new ProgramsComponent(
      TestBed.inject(ProgramService), meetings, TestBed.inject(CongregationsService), snackBar, TestBed.inject(MatDialog),
    ));
    spyOn(component, 'loadCatalogs');
    alert = spyOn(Swal, 'fire').and.resolveTo({ isConfirmed: true, isDenied: false, isDismissed: false });
    component.wolUrl.setValue('https://wol.jw.org/es/wol/d/r4/lp-s/202026409');
  });

  it('waits for confirmation and blocks repeat requests until completion', async () => {
    alert.and.resolveTo({ isConfirmed: false, isDenied: false, isDismissed: true });
    await component.importWeek();
    expect(meetings.importWeekFromWol).not.toHaveBeenCalled();
    alert.and.resolveTo({ isConfirmed: true, isDenied: false, isDismissed: false });
    const importing = component.importWeek();
    await component.importWeek();
    await importing;
    await component.importWeek();
    expect(meetings.importWeekFromWol).toHaveBeenCalledTimes(1);
    expect(component.importing).toBeTrue();
    expect(component.wolUrl.disabled).toBeTrue();
    expect(component.loadCatalogs).not.toHaveBeenCalled();
    expect(alert).toHaveBeenCalledWith(jasmine.objectContaining({
      title: 'Importando semana…', allowOutsideClick: false, allowEscapeKey: false, showConfirmButton: false,
    }));
    response.next({ source: '1. Parte | 10', message: 'No hay congregaciones activas para crear programas.' });
    response.complete();
    expect(component.importSource).toBe('1. Parte | 10');
    expect(alert).toHaveBeenCalledWith(jasmine.objectContaining({
      title: 'Importación completada', text: 'No hay congregaciones activas para crear programas.', icon: 'success',
    }));
    expect(snackBar.open).not.toHaveBeenCalled();
    expect(component.loadCatalogs).toHaveBeenCalledTimes(1);
    expect(component.importing).toBeFalse();
    expect(component.wolUrl.enabled).toBeTrue();
  });

  [400, 401, 403, 500].forEach(status => {
    it(`allows retry without success or refresh after HTTP ${status}`, async () => {
      await component.importWeek();
      response.error({ status, error: { message: 'Error del backend' } });
      expect(component.importError).toBe('Error del backend');
      expect(component.importing).toBeFalse();
      expect(component.wolUrl.enabled).toBeTrue();
      expect(component.importSource).toBeNull();
      expect(snackBar.open).not.toHaveBeenCalled();
      expect(component.loadCatalogs).not.toHaveBeenCalled();
      expect(alert).toHaveBeenCalledWith(jasmine.objectContaining({
        title: 'No se pudo importar la semana', text: 'Error del backend', icon: 'error',
      }));
      expect(alert).not.toHaveBeenCalledWith(jasmine.objectContaining({ icon: 'success' }));
    });
  });

  it('rejects a URL outside WOL', async () => {
    component.wolUrl.setValue('https://example.com/');
    await component.importWeek();
    expect(meetings.importWeekFromWol).not.toHaveBeenCalled();
    expect(alert).not.toHaveBeenCalled();
  });

  it('prevents native form navigation and opens confirmation on submit', async () => {
    await TestBed.compileComponents();
    const fixture = TestBed.createComponent(ProgramsComponent);
    spyOn(fixture.componentInstance, 'loadCatalogs');
    fixture.componentInstance.wolUrl.setValue('https://wol.jw.org/es/wol/d/r4/lp-s/202026409');
    alert.and.resolveTo({ isConfirmed: false, isDenied: false, isDismissed: true });
    fixture.detectChanges();

    const form: HTMLFormElement = fixture.nativeElement.querySelector('.program-admin__import');
    const submit = new Event('submit', { bubbles: true, cancelable: true });
    form.dispatchEvent(submit);

    expect(submit.defaultPrevented).toBeTrue();
    expect(alert).toHaveBeenCalledWith(jasmine.objectContaining({ title: '¿Importar semana desde WOL?' }));
    await fixture.whenStable();
    expect(meetings.importWeekFromWol).not.toHaveBeenCalled();
  });
});
