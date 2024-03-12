import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEntreSemanaComponent } from './edit-entre-semana.component';

describe('EditEntreSemanaComponent', () => {
  let component: EditEntreSemanaComponent;
  let fixture: ComponentFixture<EditEntreSemanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEntreSemanaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEntreSemanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
