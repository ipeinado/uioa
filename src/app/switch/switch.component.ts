import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'uio-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent implements OnInit {
  @Input() checked: boolean;
  @Output() checkedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  switch() {
    const newValue = !this.checked;
    this.checked = newValue;
    this.checkedChange.emit(newValue);
  }

  onClick(event) {
    // event.preventDefault();
    this.switch();
  }

  onKeydownHandler(event) {
    if (event.code === "Space") {
      this.switch();
    }
  }

  constructor() { }

  ngOnInit(): void {
  }
}
