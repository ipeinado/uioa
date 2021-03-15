import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'smartwork-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.scss']
})
export class ThemePickerComponent implements OnInit {

  @Input() theme: string;
  @Output() themeChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onInputClicked(event) {
    const allElements = document.querySelectorAll(".flc-prefsEditor-themeInput");
    allElements.forEach(element => {
      element.removeAttribute("checked");
      element.setAttribute("aria-checked", "false");
    });
    event.srcElement.setAttribute("aria-checked", "true");

    this.themeChanged.emit(event.srcElement.value);
  }

}
