import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';

enum Contrast {
  default = 'default',
  bw = 'bw',
  wb = 'wb',
  yb = 'yb',
  by = 'by',
  lgdg = 'lgdg',
  gg = 'gg'
}

interface Preferences {
  fontSize: number,
  lineSpacing: number,
  textStyle: string,
  contrast: string,
  tocEnabled: boolean,
  enhancedInputs: boolean
}

@Component({
  selector: 'app-separated-panel',
  templateUrl: './separated-panel.component.html',
  styleUrls: ['./separated-panel.component.scss']
})
export class SeparatedPanelComponent implements OnInit {
  
  public visible:boolean = true;
  public preferences:Preferences;

  private baseFontSize: number;
  private baseLineHeight: number;

  togglePanel() {
    this.visible = !this.visible;
  }

  changeFontSize(value) {
    document.body.style.fontSize = (this.baseFontSize * this.preferences.fontSize).toString() + "px";
  }

  changeLineSpacing(value) {
    document.body.style.lineHeight = value;
  }

  changeContrast(value) {
    console.log("CONTRAST", value);
    console.log("THEME ", this.preferences.contrast);
  }

  changeTextStyle(event) {
    this.changeFontFamily(event.target.value);
  }

  changeFontFamily(value) {
    var allClasses = document.body.classList;
    allClasses.forEach(className => {
      if (className.startsWith("fl-font-")) { document.body.classList.remove(className); }
    });
    document.body.classList.add("fl-font-" + value);
  }

  toggleToC(value) {
    console.log("TABLE OF CONTENTS ", value);
    console.log("PREFERENCES TOC", this.preferences.tocEnabled);
  }

  toggleInputs(value) {
    console.log("ENHANCE INPUTS", value);
    console.log("PREFERENCES ENHANCE INPUTS", this.preferences.enhancedInputs);
  }

  constructor() {
    this.baseFontSize = Number(window.getComputedStyle(document.body).getPropertyValue('font-size').match(/\d+/)[0])
   }

  ngOnInit(): void {
    this.preferences = {
      fontSize: 1.2,
      lineSpacing: 1.6,
      textStyle: 'tnr',
      contrast: 'yb',
      tocEnabled: true,
      enhancedInputs: true
    };
    
    this.changeFontSize(this.preferences.fontSize);
    this.changeLineSpacing(this.preferences.lineSpacing);
    this.changeFontFamily(this.preferences.textStyle);
  }
}
