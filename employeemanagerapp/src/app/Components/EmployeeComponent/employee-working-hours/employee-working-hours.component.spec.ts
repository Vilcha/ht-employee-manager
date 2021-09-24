import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeWorkingHoursComponent } from './employee-working-hours.component';

describe('EmployeeWorkingHoursComponent', () => {
  let component: EmployeeWorkingHoursComponent;
  let fixture: ComponentFixture<EmployeeWorkingHoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeWorkingHoursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeWorkingHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
