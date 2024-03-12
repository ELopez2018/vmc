import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAsignacionesEntreSemanaComponent } from './edit-asignaciones-entre-semana.component';

describe('EditAsignacionesEntreSemanaComponent', () => {
  let component: EditAsignacionesEntreSemanaComponent;
  let fixture: ComponentFixture<EditAsignacionesEntreSemanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAsignacionesEntreSemanaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAsignacionesEntreSemanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
