import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongregationsListComponent } from './congregations-list.component';

describe('CongregationsListComponent', () => {
  let component: CongregationsListComponent;
  let fixture: ComponentFixture<CongregationsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CongregationsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CongregationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
