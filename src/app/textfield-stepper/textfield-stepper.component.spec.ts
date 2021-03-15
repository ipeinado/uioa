import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextfieldStepperComponent } from './textfield-stepper.component';

describe('TextfieldStepperComponent', () => {
  let component: TextfieldStepperComponent;
  let fixture: ComponentFixture<TextfieldStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextfieldStepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextfieldStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
