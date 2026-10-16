import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongregationsListComponent } from './congregations-list.component';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { MatSlideToggle, MatSlideToggleChange } from '@angular/material/slide-toggle';

describe('CongregationsListComponent', () => {
  let component: CongregationsListComponent;
  let fixture: ComponentFixture<CongregationsListComponent>;
  let http: HttpTestingController;
  const congregation = { id: 5, name: 'Ejemplo', number: '00005', day: 3, hour: '18:30:00', acctive: true };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CongregationsListComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideNoopAnimations()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CongregationsListComponent);
    component = fixture.componentInstance;
    http = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
    http.expectOne(req => req.url.endsWith('/congregations')).flush([congregation]);
  });

  afterEach(() => http.verify());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('sends the literal acctive field and preserves the old state until saved', () => {
    const source = { checked: false } as MatSlideToggle;
    component.toggleActivity(congregation, { checked: false, source } as MatSlideToggleChange);
    expect(component.savingIds.has(5)).toBeTrue();
    expect(source.checked).toBeTrue();
    expect(component.dataSource.data[0].acctive).toBeTrue();
    const request = http.expectOne(req => req.url.endsWith('/congregations/5'));
    expect(request.request.method).toBe('PUT');
    expect(request.request.body).toEqual({ ...congregation, acctive: false });
    request.flush({ ...congregation, acctive: false });
    expect(component.dataSource.data[0].acctive).toBeFalse();
    expect(component.savingIds.has(5)).toBeFalse();
  });

  it('keeps the current activity state on failure and allows retry', () => {
    const source = { checked: false } as MatSlideToggle;
    component.toggleActivity(congregation, { checked: false, source } as MatSlideToggleChange);
    http.expectOne(req => req.url.endsWith('/congregations/5')).flush({ message: 'Error' }, { status: 500, statusText: 'Error' });
    expect(component.dataSource.data[0].acctive).toBeTrue();
    expect(source.checked).toBeTrue();
    expect(component.savingIds.has(5)).toBeFalse();
  });
});
