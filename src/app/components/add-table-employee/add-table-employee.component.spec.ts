import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTableEmployeeComponent } from './add-table-employee.component';

describe('AddTableEmployeeComponent', () => {
  let component: AddTableEmployeeComponent;
  let fixture: ComponentFixture<AddTableEmployeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTableEmployeeComponent]
    });
    fixture = TestBed.createComponent(AddTableEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
