import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: '[app-prefs-editor-panel]',
  templateUrl: './prefs-editor-panel.component.html',
  styleUrls: ['./prefs-editor-panel.component.scss']
})
export class PrefsEditorPanelComponent implements OnInit {
  @Input() title: string;
  @Input() description: string;

  constructor() { }

  ngOnInit(): void {
  }

}
