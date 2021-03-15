import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'uio-textfield-stepper',
  templateUrl: './textfield-stepper.component.html',
  styleUrls: ['./textfield-stepper.component.scss']
})
export class TextfieldStepperComponent {
  @Input() value: number;
  @Input() step:number;
  @Input() min:number;
  @Input() max:number;

  @Output() valueChange: EventEmitter<number> = new EventEmitter<number>();

  onKeydownHandler(event: KeyboardEvent) {
    const key = event.key;
    if (key === "ArrowDown") {
      this.decreaseValue();
    }
    if (key === "ArrowUp") {
      this.increaseValue();
    }
  }

  increaseValue() {
    if (this.value + this.step <= this.max) {
      this.value = this.value + this.step;
    } 
    this.valueChange.emit(this.value);
  }

  decreaseValue() {
    if (this.value - this.step >= this.min) {
      this.value = this.value - this.step;
    }
    this.valueChange.emit(this.value);
  }
}
