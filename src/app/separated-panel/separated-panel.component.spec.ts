import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeparatedPanelComponent } from './separated-panel.component';

describe('SeparatedPanelComponent', () => {
  let component: SeparatedPanelComponent;
  let fixture: ComponentFixture<SeparatedPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeparatedPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeparatedPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
