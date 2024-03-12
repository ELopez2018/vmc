import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntreSemanaComponent } from './entre-semana.component';

describe('EntreSemanaComponent', () => {
  let component: EntreSemanaComponent;
  let fixture: ComponentFixture<EntreSemanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntreSemanaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntreSemanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
