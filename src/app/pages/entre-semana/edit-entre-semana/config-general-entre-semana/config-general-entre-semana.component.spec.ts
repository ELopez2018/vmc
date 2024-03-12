import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigGeneralEntreSemanaComponent } from './config-general-entre-semana.component';

describe('ConfigGeneralEntreSemanaComponent', () => {
  let component: ConfigGeneralEntreSemanaComponent;
  let fixture: ComponentFixture<ConfigGeneralEntreSemanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigGeneralEntreSemanaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigGeneralEntreSemanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
