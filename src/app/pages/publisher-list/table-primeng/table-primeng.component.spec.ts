import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePrimengComponent } from './table-primeng.component';

describe('TablePrimengComponent', () => {
  let component: TablePrimengComponent;
  let fixture: ComponentFixture<TablePrimengComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablePrimengComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablePrimengComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
