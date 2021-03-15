import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefsEditorPanelComponent } from './prefs-editor-panel.component';

describe('PrefsEditorPanelComponent', () => {
  let component: PrefsEditorPanelComponent;
  let fixture: ComponentFixture<PrefsEditorPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrefsEditorPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrefsEditorPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
