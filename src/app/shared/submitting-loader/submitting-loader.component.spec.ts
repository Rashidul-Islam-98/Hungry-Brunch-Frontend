import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmittingLoaderComponent } from './submitting-loader.component';

describe('SubmittingLoaderComponent', () => {
  let component: SubmittingLoaderComponent;
  let fixture: ComponentFixture<SubmittingLoaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubmittingLoaderComponent]
    });
    fixture = TestBed.createComponent(SubmittingLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
